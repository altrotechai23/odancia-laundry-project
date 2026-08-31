import { readFile } from "node:fs/promises";
import path from "node:path";

import { resend } from "@/lib/resend";

interface PickupEmailData {
  bookingId: string;
  customerName: string;
  customerEmail?: string;
  phone: string;
  services: string[];
  area: string;
  address: string;
  pickupDate: string;
  pickupTime: string;
  deliveryFee: number;
  notes?: string;
}

function formatDate(dateString: string) {
  const parts = dateString.split("-");

  if (parts.length !== 3) {
    return dateString;
  }

  const [year, month, day] = parts.map(Number);

  const date = new Date(
    year,
    month - 1,
    day,
  );

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bookingDetails(data: PickupEmailData) {
  const fee =
    data.deliveryFee === 0
      ? "FREE"
      : `R${data.deliveryFee.toFixed(2)}`;

  return `
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="
        border-collapse:collapse;
        width:100%;
      "
    >
      <tr>
        <td style="
          padding:14px 0;
          border-bottom:1px solid #e5e7eb;
          color:#64748b;
          font-size:13px;
        ">
          Services
        </td>

        <td style="
          padding:14px 0;
          border-bottom:1px solid #e5e7eb;
          text-align:right;
          color:#0f172a;
          font-size:14px;
          font-weight:600;
        ">
          ${escapeHtml(data.services.join(", "))}
        </td>
      </tr>

      <tr>
        <td style="
          padding:14px 0;
          border-bottom:1px solid #e5e7eb;
          color:#64748b;
          font-size:13px;
        ">
          Pickup date
        </td>

        <td style="
          padding:14px 0;
          border-bottom:1px solid #e5e7eb;
          text-align:right;
          color:#0f172a;
          font-size:14px;
          font-weight:600;
        ">
          ${escapeHtml(formatDate(data.pickupDate))}
        </td>
      </tr>

      <tr>
        <td style="
          padding:14px 0;
          border-bottom:1px solid #e5e7eb;
          color:#64748b;
          font-size:13px;
        ">
          Pickup window
        </td>

        <td style="
          padding:14px 0;
          border-bottom:1px solid #e5e7eb;
          text-align:right;
          color:#0f172a;
          font-size:14px;
          font-weight:600;
        ">
          ${escapeHtml(data.pickupTime)}
        </td>
      </tr>

      <tr>
        <td style="
          padding:14px 0;
          border-bottom:1px solid #e5e7eb;
          color:#64748b;
          font-size:13px;
        ">
          Collection area
        </td>

        <td style="
          padding:14px 0;
          border-bottom:1px solid #e5e7eb;
          text-align:right;
          color:#0f172a;
          font-size:14px;
          font-weight:600;
        ">
          ${escapeHtml(data.area)}
        </td>
      </tr>

      <tr>
        <td style="
          padding:14px 0;
          color:#64748b;
          font-size:13px;
        ">
          Collection fee
        </td>

        <td style="
          padding:14px 0;
          text-align:right;
          color:#e30613;
          font-size:14px;
          font-weight:700;
        ">
          ${fee ? "Free": "Yes"}
        </td>
      </tr>
    </table>
  `;
}

function emailShell({
  eyebrow,
  title,
  intro,
  content,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  content: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>Odancia Laundry</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#f1f5f9;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Arial,
    sans-serif;
  color:#0f172a;
">

<table
  role="presentation"
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="width:100%;background:#f1f5f9;"
>
<tr>
<td align="center" style="padding:32px 16px;">

<table
  role="presentation"
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    width:100%;
    max-width:640px;
    background:#ffffff;
    border-radius:28px;
    overflow:hidden;
    box-shadow:
      0 20px 60px rgba(15,23,42,0.10);
  "
>

<!-- Header -->

<tr>
<td style="
  padding:32px 32px 28px;
  background:#020617;
">

  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tr>
      <td align="left">

        <img
          src="cid:odancia-logo"
          alt="Odancia Laundry"
          width="170"
          style="
            display:block;
            width:170px;
            max-width:100%;
            height:auto;
            border:0;
          "
        />

      </td>

      <td align="right">
        <span style="
          display:inline-block;
          padding:7px 12px;
          border-radius:999px;
          background:rgba(255,255,255,0.08);
          color:#cbd5e1;
          font-size:10px;
          font-weight:700;
          letter-spacing:1.5px;
          text-transform:uppercase;
        ">
          Pickup Service
        </span>
      </td>
    </tr>
  </table>

  <div style="
    height:1px;
    margin-top:26px;
    background:
      linear-gradient(
        90deg,
        #e30613,
        #2563eb,
        transparent
      );
  "></div>

</td>
</tr>

<!-- Main -->

<tr>
<td style="padding:36px 32px 40px;">

  <p style="
    margin:0;
    color:#e30613;
    font-size:11px;
    font-weight:800;
    letter-spacing:2.5px;
    text-transform:uppercase;
  ">
    ${eyebrow}
  </p>

  <h1 style="
    margin:10px 0 0;
    color:#020617;
    font-size:30px;
    line-height:1.2;
    letter-spacing:-0.7px;
  ">
    ${title}
  </h1>

  <p style="
    margin:16px 0 0;
    color:#64748b;
    font-size:15px;
    line-height:1.7;
  ">
    ${intro}
  </p>

  ${content}

</td>
</tr>

<!-- Footer -->

<tr>
<td style="
  padding:24px 32px;
  background:#f8fafc;
  border-top:1px solid #e2e8f0;
">

  <p style="
    margin:0;
    color:#0f172a;
    font-size:13px;
    font-weight:700;
  ">
    Odancia Laundry
  </p>

  <p style="
    margin:6px 0 0;
    color:#94a3b8;
    font-size:12px;
    line-height:1.6;
  ">
    Professional laundry care. Collected with care.
  </p>

</td>
</tr>

</table>

<p style="
  margin:18px 0 0;
  color:#94a3b8;
  font-size:11px;
  text-align:center;
">
  This is an automated message from Odancia Laundry.
</p>

</td>
</tr>
</table>

</body>
</html>
`;
}

export async function sendPickupEmails(
  data: PickupEmailData,
) {
  const from =
    process.env.RESEND_FROM_EMAIL;

  const adminEmail =
    process.env.ADMIN_EMAIL;

  if (!from) {
    throw new Error(
      "RESEND_FROM_EMAIL is not configured.",
    );
  }

  if (!adminEmail) {
    throw new Error(
      "ADMIN_EMAIL is not configured.",
    );
  }

  /*
   * Read the logo from /public.
   *
   * Using a CID attachment means the logo is embedded
   * inside the email rather than depending on the
   * website being publicly reachable.
   */
  const logoPath = path.join(
    process.cwd(),
    "public",
    "odancia-logo.png",
  );

  const logo = await readFile(logoPath);

  const attachment = {
    filename: "odancia-logo.png",
    content: logo.toString("base64"),
    contentId: "odancia-logo",
    contentType: "image/png",
  };

  const customerEmail =
    data.customerEmail?.trim();

  /*
   * CUSTOMER EMAIL
   */
  const customerHtml = emailShell({
    eyebrow: "Pickup Confirmed",
    title: `We're ready for ${escapeHtml(data.customerName)}.`,
    intro:
      "Thank you for choosing Odancia Laundry. Your pickup request has been received and our team will contact you shortly to confirm the collection details.",
    content: `
      <div style="
        margin-top:28px;
        padding:20px;
        border-radius:20px;
        background:#f8fafc;
        border:1px solid #e2e8f0;
      ">
        <p style="
          margin:0;
          color:#94a3b8;
          font-size:11px;
          font-weight:700;
          letter-spacing:1.5px;
          text-transform:uppercase;
        ">
          Booking reference
        </p>

        <p style="
          margin:7px 0 0;
          color:#020617;
          font-size:22px;
          font-weight:800;
          letter-spacing:0.5px;
          word-break:break-all;
        ">
          ${escapeHtml(data.bookingId)}
        </p>
      </div>

      <div style="
        margin-top:24px;
        padding:24px;
        border-radius:22px;
        border:1px solid #e2e8f0;
      ">
        <p style="
          margin:0 0 4px;
          color:#020617;
          font-size:16px;
          font-weight:700;
        ">
          Your pickup details
        </p>

        ${bookingDetails(data)}
      </div>

      <div style="
        margin-top:22px;
        padding:20px;
        border-radius:20px;
        background:#eff6ff;
        border:1px solid #dbeafe;
      ">
        <p style="
          margin:0;
          color:#1e3a8a;
          font-size:13px;
          line-height:1.7;
        ">
          <strong>What happens next?</strong><br />
          Our team will review your request and contact you
          to confirm your pickup.
        </p>
      </div>

      ${
        data.notes
          ? `
            <div style="
              margin-top:20px;
              padding:18px;
              border-radius:18px;
              background:#fff7ed;
              border:1px solid #fed7aa;
            ">
              <p style="
                margin:0;
                color:#9a3412;
                font-size:12px;
                font-weight:700;
                text-transform:uppercase;
                letter-spacing:1px;
              ">
                Your note
              </p>

              <p style="
                margin:7px 0 0;
                color:#7c2d12;
                font-size:13px;
                line-height:1.6;
              ">
                ${escapeHtml(data.notes)}
              </p>
            </div>
          `
          : ""
      }

      <p style="
        margin:28px 0 0;
        color:#64748b;
        font-size:13px;
        line-height:1.7;
      ">
        Please keep your booking reference for your records.
        We look forward to taking care of your laundry.
      </p>
    `,
  });

  /*
   * ADMIN EMAIL
   */
  const adminHtml = emailShell({
    eyebrow: "New Pickup Request",
    title: "A new pickup has been requested.",
    intro:
      "A customer has just submitted a new pickup request through the Odancia Laundry website. Review the details below.",
    content: `
      <div style="
        margin-top:28px;
        padding:22px;
        border-radius:22px;
        background:#020617;
      ">
        <p style="
          margin:0;
          color:#94a3b8;
          font-size:10px;
          font-weight:700;
          letter-spacing:1.5px;
          text-transform:uppercase;
        ">
          Booking reference
        </p>

        <p style="
          margin:8px 0 0;
          color:#ffffff;
          font-size:22px;
          font-weight:800;
          word-break:break-all;
        ">
          ${escapeHtml(data.bookingId)}
        </p>

        <span style="
          display:inline-block;
          margin-top:12px;
          padding:6px 10px;
          border-radius:999px;
          background:rgba(227,6,19,0.14);
          color:#fb7185;
          font-size:10px;
          font-weight:800;
          letter-spacing:1px;
        ">
          NEW REQUEST
        </span>
      </div>

      <div style="
        margin-top:22px;
        padding:24px;
        border-radius:22px;
        border:1px solid #e2e8f0;
      ">
        <p style="
          margin:0 0 18px;
          color:#020617;
          font-size:16px;
          font-weight:700;
        ">
          Customer information
        </p>

        <p style="
          margin:8px 0;
          color:#475569;
          font-size:14px;
        ">
          <strong>Name:</strong>
          ${escapeHtml(data.customerName)}
        </p>

        <p style="
          margin:8px 0;
          color:#475569;
          font-size:14px;
        ">
          <strong>Phone:</strong>
          ${escapeHtml(data.phone)}
        </p>

        <p style="
          margin:8px 0;
          color:#475569;
          font-size:14px;
        ">
          <strong>Email:</strong>
          ${
            customerEmail
              ? escapeHtml(customerEmail)
              : "Not provided"
          }
        </p>

        <p style="
          margin:8px 0;
          color:#475569;
          font-size:14px;
        ">
          <strong>Address:</strong>
          ${escapeHtml(data.address)}
        </p>
      </div>

      <div style="
        margin-top:22px;
        padding:24px;
        border-radius:22px;
        border:1px solid #e2e8f0;
      ">
        <p style="
          margin:0 0 4px;
          color:#020617;
          font-size:16px;
          font-weight:700;
        ">
          Pickup details
        </p>

        ${bookingDetails(data)}
      </div>

      ${
        data.notes
          ? `
            <div style="
              margin-top:20px;
              padding:18px;
              border-radius:18px;
              background:#fff7ed;
              border:1px solid #fed7aa;
            ">
              <p style="
                margin:0;
                color:#9a3412;
                font-size:12px;
                font-weight:700;
                text-transform:uppercase;
                letter-spacing:1px;
              ">
                Customer notes
              </p>

              <p style="
                margin:7px 0 0;
                color:#7c2d12;
                font-size:13px;
                line-height:1.6;
              ">
                ${escapeHtml(data.notes)}
              </p>
            </div>
          `
          : ""
      }
    `,
  });

  /*
   * Send the admin notification.
   */
  const adminResult =
    await resend.emails.send({
      from,
      to: [adminEmail],
      subject: `New Pickup Request • ${data.bookingId}`,
      html: adminHtml,
      attachments: [attachment],
    });

  /*
   * Send customer confirmation only
   * when they provided an email address.
   */
  let customerResult = null;

  if (customerEmail) {
    customerResult =
      await resend.emails.send({
        from,
        to: [customerEmail],
        subject:
          "Your Odancia Laundry Pickup Is Confirmed",
        html: customerHtml,
        attachments: [attachment],
      });
  }

  return {
    admin: adminResult,
    customer: customerResult,
  };
}