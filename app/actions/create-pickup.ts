"use server";

import fs from "node:fs/promises";
import path from "node:path";

import { Resend } from "resend";

import { supabase } from "@/lib/supabase/client";

interface CreatePickupInput {
  customer_name: string;
  phone: string;
  email: string;
  services: string[];
  area: string;
  address: string;
  pickup_date: string;
  pickup_time: string;
  delivery_fee: number;
  notes: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Odancia Laundry <bookings@odancialaundry.co.za>";

const ADMIN_EMAIL =
  process.env.ODANCIA_ADMIN_EMAIL ||
  "odancialaundry8@gmail.com";

/**
 * Escape user-provided text before putting it inside HTML.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Format YYYY-MM-DD without timezone shifting.
 */
function formatDate(dateString: string) {
  const parts = dateString.split("-");

  if (parts.length !== 3) {
    return dateString;
  }

  const [year, month, day] = parts.map(Number);

  const date = new Date(year, month - 1, day);

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

/**
 * Convert the service IDs into readable names.
 */
function formatServices(services: string[]) {
  const labels: Record<string, string> = {
    "wash-fold": "Wash & Fold",
    ironing: "Ironing",
    "dry-cleaning": "Dry Cleaning",
    sneakers: "Sneaker Cleaning",
    duvets: "Duvets & Blankets",
    curtains: "Curtains",
    alterations: "Alterations",
  };

  return services.map(
    (service) => labels[service] || service,
  );
}

/**
 * Load the Odancia logo from /public.
 *
 * The logo is embedded directly into the email using CID.
 */
async function getLogoAttachment() {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "odancia-logo.png",
  );

  const logo = await fs.readFile(logoPath);

  return {
    filename: "odancia-logo.png",
    content: logo,
    contentId: "odancia-logo",
  };
}

/**
 * Premium client confirmation email.
 */
function buildClientEmail({
  name,
  bookingId,
  services,
  pickupDate,
  pickupTime,
  area,
  address,
  deliveryFee,
  notes,
}: {
  name: string;
  bookingId: string;
  services: string[];
  pickupDate: string;
  pickupTime: string;
  area: string;
  address: string;
  deliveryFee: number;
  notes: string;
}) {
  const serviceList = services
    .map(
      (service) => `
        <tr>
          <td style="
            padding: 8px 0;
            color: #334155;
            font-size: 14px;
          ">
            ${escapeHtml(service)}
          </td>
        </tr>
      `,
    )
    .join("");

  const fee =
    deliveryFee === 0
      ? "FREE"
      : `R${deliveryFee.toFixed(2)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>Pickup Confirmed — Odancia Laundry</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background: #f1f5f9;
  font-family: Arial, Helvetica, sans-serif;
  color: #0f172a;
">

  <div style="
    width: 100%;
    padding: 40px 16px;
    box-sizing: border-box;
  ">

    <div style="
      max-width: 620px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.10);
    ">

      <!-- Header -->
      <div style="
        position: relative;
        padding: 32px 32px 36px;
        background: linear-gradient(
          135deg,
          #07111f 0%,
          #10294a 55%,
          #b91c1c 140%
        );
      ">

        <div style="
          margin-bottom: 24px;
        ">
          <img
            src="cid:odancia-logo"
            alt="Odancia Laundry"
            width="190"
            style="
              display: block;
              max-width: 190px;
              height: auto;
            "
          />
        </div>

        <div style="
          display: inline-block;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        ">
          Pickup Confirmed
        </div>

        <h1 style="
          margin: 18px 0 8px;
          color: #ffffff;
          font-size: 30px;
          line-height: 1.2;
          font-weight: 700;
        ">
          Your pickup is booked.
        </h1>

        <p style="
          margin: 0;
          color: rgba(255,255,255,0.72);
          font-size: 15px;
          line-height: 1.6;
        ">
          Hi ${escapeHtml(name)}, we've received your
          pickup request and our team will be in touch
          shortly.
        </p>
      </div>

      <!-- Booking reference -->
      <div style="
        margin: 24px 24px 0;
        padding: 20px;
        border-radius: 18px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
      ">

        <div style="
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        ">
          Booking Reference
        </div>

        <div style="
          margin-top: 8px;
          color: #0f172a;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.5px;
        ">
          ${escapeHtml(bookingId)}
        </div>

        <div style="
          margin-top: 8px;
          display: inline-block;
          padding: 5px 10px;
          border-radius: 999px;
          background: #dcfce7;
          color: #15803d;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
        ">
          CONFIRMED
        </div>
      </div>

      <!-- Details -->
      <div style="
        padding: 24px;
      ">

        <h2 style="
          margin: 0 0 16px;
          color: #0f172a;
          font-size: 18px;
        ">
          Pickup Details
        </h2>

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse: collapse;
          "
        >

          <tr>
            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 13px;
            ">
              Pickup Date
            </td>

            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
              color: #0f172a;
              font-size: 13px;
              font-weight: 700;
              text-align: right;
            ">
              ${escapeHtml(formatDate(pickupDate))}
            </td>
          </tr>

          <tr>
            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 13px;
            ">
              Pickup Time
            </td>

            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
              color: #0f172a;
              font-size: 13px;
              font-weight: 700;
              text-align: right;
            ">
              ${escapeHtml(pickupTime)}
            </td>
          </tr>

          <tr>
            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 13px;
            ">
              Collection Area
            </td>

            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
              color: #0f172a;
              font-size: 13px;
              font-weight: 700;
              text-align: right;
            ">
              ${escapeHtml(area)}
            </td>
          </tr>

          <tr>
            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 13px;
            ">
              Collection Fee
            </td>

            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
              color: #b91c1c;
              font-size: 13px;
              font-weight: 700;
              text-align: right;
            ">
              ${fee}
            </td>
          </tr>

          <tr>
            <td style="
              padding: 12px 0;
              color: #64748b;
              font-size: 13px;
            ">
              Address
            </td>

            <td style="
              padding: 12px 0;
              color: #0f172a;
              font-size: 13px;
              font-weight: 700;
              text-align: right;
            ">
              ${escapeHtml(address)}
            </td>
          </tr>

        </table>

        <!-- Services -->
        <div style="
          margin-top: 28px;
          padding: 20px;
          border-radius: 18px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        ">

          <h3 style="
            margin: 0 0 12px;
            color: #0f172a;
            font-size: 15px;
          ">
            Selected Services
          </h3>

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
          >
            ${serviceList}
          </table>

        </div>

        ${
          notes
            ? `
        <div style="
          margin-top: 20px;
          padding: 16px;
          border-left: 4px solid #b91c1c;
          background: #fff7f7;
        ">
          <div style="
            color: #64748b;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          ">
            Your Notes
          </div>

          <div style="
            margin-top: 7px;
            color: #334155;
            font-size: 13px;
            line-height: 1.6;
          ">
            ${escapeHtml(notes)}
          </div>
        </div>
        `
            : ""
        }

      </div>

      <!-- Next steps -->
      <div style="
        margin: 0 24px 24px;
        padding: 20px;
        border-radius: 18px;
        background: linear-gradient(
          135deg,
          #eff6ff,
          #f8fafc
        );
        border: 1px solid #dbeafe;
      ">

        <div style="
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        ">
          What's next?
        </div>

        <p style="
          margin: 8px 0 0;
          color: #334155;
          font-size: 13px;
          line-height: 1.7;
        ">
          Our team will review your request and contact
          you to confirm your pickup details and collection
          time.
        </p>

      </div>

      <!-- Footer -->
      <div style="
        padding: 24px 32px;
        background: #07111f;
        text-align: center;
      ">

        <p style="
          margin: 0;
          color: rgba(255,255,255,0.7);
          font-size: 12px;
          line-height: 1.6;
        ">
          Thank you for choosing Odancia Laundry.
        </p>

        <p style="
          margin: 8px 0 0;
          color: rgba(255,255,255,0.4);
          font-size: 11px;
        ">
          Professional care. Exceptional results.
        </p>

      </div>

    </div>

  </div>

</body>
</html>
`;
}

/**
 * Premium internal admin notification email.
 */
function buildAdminEmail({
  name,
  phone,
  email,
  bookingId,
  services,
  pickupDate,
  pickupTime,
  area,
  address,
  deliveryFee,
  notes,
}: {
  name: string;
  phone: string;
  email: string;
  bookingId: string;
  services: string[];
  pickupDate: string;
  pickupTime: string;
  area: string;
  address: string;
  deliveryFee: number;
  notes: string;
}) {
  const serviceList = services
    .map(
      (service) => `
        <span style="
          display: inline-block;
          margin: 4px 4px 4px 0;
          padding: 7px 10px;
          border-radius: 999px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #1e40af;
          font-size: 12px;
          font-weight: 600;
        ">
          ${escapeHtml(service)}
        </span>
      `,
    )
    .join("");

  const fee =
    deliveryFee === 0
      ? "FREE"
      : `R${deliveryFee.toFixed(2)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>New Pickup Request — Odancia Laundry</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background: #f1f5f9;
  font-family: Arial, Helvetica, sans-serif;
  color: #0f172a;
">

  <div style="
    width: 100%;
    padding: 40px 16px;
    box-sizing: border-box;
  ">

    <div style="
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(15,23,42,0.10);
    ">

      <!-- Header -->
      <div style="
        padding: 28px 32px;
        background: linear-gradient(
          135deg,
          #07111f,
          #10294a
        );
      ">

        <img
          src="cid:odancia-logo"
          alt="Odancia Laundry"
          width="180"
          style="
            display: block;
            max-width: 180px;
            height: auto;
          "
        />

        <div style="
          margin-top: 24px;
          color: #60a5fa;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        ">
          New Booking
        </div>

        <h1 style="
          margin: 8px 0 0;
          color: #ffffff;
          font-size: 28px;
          line-height: 1.2;
        ">
          New Pickup Request
        </h1>

      </div>

      <!-- Alert -->
      <div style="
        margin: 24px 24px 0;
        padding: 18px;
        border-radius: 16px;
        background: #fff7ed;
        border: 1px solid #fed7aa;
      ">

        <div style="
          color: #c2410c;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        ">
          Action Required
        </div>

        <p style="
          margin: 7px 0 0;
          color: #7c2d12;
          font-size: 13px;
          line-height: 1.6;
        ">
          A new customer has submitted a pickup request.
          Please review the details and contact the customer
          to confirm the collection.
        </p>

      </div>

      <!-- Booking reference -->
      <div style="
        margin: 20px 24px 0;
        padding: 18px 20px;
        border-radius: 16px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
      ">

        <div style="
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        ">
          Booking Reference
        </div>

        <div style="
          margin-top: 7px;
          color: #0f172a;
          font-size: 21px;
          font-weight: 800;
        ">
          ${escapeHtml(bookingId)}
        </div>

      </div>

      <!-- Customer -->
      <div style="
        padding: 28px 24px;
      ">

        <h2 style="
          margin: 0 0 16px;
          color: #0f172a;
          font-size: 18px;
        ">
          Customer
        </h2>

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="border-collapse: collapse;"
        >

          <tr>
            <td style="
              padding: 10px 0;
              color: #64748b;
              font-size: 13px;
            ">
              Name
            </td>

            <td style="
              padding: 10px 0;
              color: #0f172a;
              font-size: 13px;
              font-weight: 700;
              text-align: right;
            ">
              ${escapeHtml(name)}
            </td>
          </tr>

          <tr>
            <td style="
              padding: 10px 0;
              color: #64748b;
              font-size: 13px;
            ">
              Phone
            </td>

            <td style="
              padding: 10px 0;
              color: #0f172a;
              font-size: 13px;
              font-weight: 700;
              text-align: right;
            ">
              ${escapeHtml(phone)}
            </td>
          </tr>

          ${
            email
              ? `
          <tr>
            <td style="
              padding: 10px 0;
              color: #64748b;
              font-size: 13px;
            ">
              Email
            </td>

            <td style="
              padding: 10px 0;
              color: #0f172a;
              font-size: 13px;
              font-weight: 700;
              text-align: right;
              word-break: break-word;
            ">
              ${escapeHtml(email)}
            </td>
          </tr>
          `
              : ""
          }

        </table>

        <!-- Pickup -->
        <h2 style="
          margin: 30px 0 16px;
          color: #0f172a;
          font-size: 18px;
        ">
          Pickup Details
        </h2>

        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        ">

          <div style="
            padding: 16px;
            border-radius: 14px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
          ">
            <div style="
              color: #94a3b8;
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
            ">
              Date
            </div>

            <div style="
              margin-top: 6px;
              color: #0f172a;
              font-size: 13px;
              font-weight: 700;
            ">
              ${escapeHtml(formatDate(pickupDate))}
            </div>
          </div>

          <div style="
            padding: 16px;
            border-radius: 14px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
          ">
            <div style="
              color: #94a3b8;
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
            ">
              Time
            </div>

            <div style="
              margin-top: 6px;
              color: #0f172a;
              font-size: 13px;
              font-weight: 700;
            ">
              ${escapeHtml(pickupTime)}
            </div>
          </div>

        </div>

        <div style="
          margin-top: 10px;
          padding: 16px;
          border-radius: 14px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
        ">

          <div style="
            color: #64748b;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          ">
            Collection Address
          </div>

          <div style="
            margin-top: 6px;
            color: #0f172a;
            font-size: 13px;
            font-weight: 700;
            line-height: 1.6;
          ">
            ${escapeHtml(address)}
            <br />
            ${escapeHtml(area)}
          </div>

        </div>

        <!-- Services -->
        <h2 style="
          margin: 30px 0 12px;
          color: #0f172a;
          font-size: 18px;
        ">
          Services
        </h2>

        <div>
          ${serviceList}
        </div>

        <!-- Fee -->
        <div style="
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px;
          border-radius: 16px;
          background: #fff7f7;
          border: 1px solid #fee2e2;
        ">

          <span style="
            color: #64748b;
            font-size: 13px;
          ">
            Collection Fee
          </span>

          <strong style="
            color: #b91c1c;
            font-size: 18px;
          ">
            ${fee}
          </strong>

        </div>

        ${
          notes
            ? `
        <div style="
          margin-top: 24px;
          padding: 18px;
          border-radius: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        ">

          <div style="
            color: #64748b;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
          ">
            Customer Notes
          </div>

          <p style="
            margin: 8px 0 0;
            color: #334155;
            font-size: 13px;
            line-height: 1.7;
          ">
            ${escapeHtml(notes)}
          </p>

        </div>
        `
            : ""
        }

      </div>

      <!-- Footer -->
      <div style="
        padding: 22px 24px;
        background: #07111f;
        text-align: center;
      ">

        <p style="
          margin: 0;
          color: rgba(255,255,255,0.55);
          font-size: 11px;
        ">
          Odancia Laundry • Internal Booking Notification
        </p>

      </div>

    </div>

  </div>

</body>
</html>
`;
}

export async function createPickup(
  data: CreatePickupInput,
) {
  const {
    customer_name,
    phone,
    email,
    services,
    area,
    address,
    pickup_date,
    pickup_time,
    delivery_fee,
    notes,
  } = data;

  /*
   * Server-side validation.
   */
  if (!customer_name.trim()) {
    throw new Error("Please enter your name.");
  }

  if (!phone.trim()) {
    throw new Error("Please enter your mobile number.");
  }

  if (!services.length) {
    throw new Error("Please select at least one service.");
  }

  if (!area.trim()) {
    throw new Error("Please select your area.");
  }

  if (!address.trim()) {
    throw new Error("Please enter your collection address.");
  }

  if (!pickup_date) {
    throw new Error("Please select a pickup date.");
  }

  if (!pickup_time) {
    throw new Error("Please select a pickup time.");
  }

  /*
   * Create the pickup first.
   *
   * This is the critical operation.
   */
  const { data: pickup, error } = await supabase
    .from("pickup_requests")
    .insert({
      customer_name: customer_name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      services,
      area: area.trim(),
      address: address.trim(),
      pickup_date,
      pickup_time,
      delivery_fee,
      notes: notes.trim() || null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    console.error(
      "Supabase pickup creation error:",
      error,
    );

    throw new Error(
      error.message ||
        "Unable to create pickup request.",
    );
  }

  /*
   * Supabase has successfully created the booking.
   */
  const bookingId = pickup.id;

  /*
   * Send transactional emails.
   *
   * IMPORTANT:
   * Email failure must NOT undo the booking.
   */
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn(
        "RESEND_API_KEY is not configured. Skipping emails.",
      );
    } else {
      const readableServices =
        formatServices(services);

      const logoAttachment =
        await getLogoAttachment();

      /*
       * Client confirmation.
       *
       * Only send if the client supplied an email.
       */
      if (email.trim()) {
        const { error: clientEmailError } =
          await resend.emails.send({
            from: FROM_EMAIL,
            to: [email.trim()],
            subject:
              `Pickup Confirmed · ${bookingId} · Odancia Laundry`,
            html: buildClientEmail({
              name: customer_name.trim(),
              bookingId,
              services: readableServices,
              pickupDate: pickup_date,
              pickupTime: pickup_time,
              area: area.trim(),
              address: address.trim(),
              deliveryFee: delivery_fee,
              notes: notes.trim(),
            }),
            attachments: [logoAttachment],
          });

        if (clientEmailError) {
          console.error(
            "Client confirmation email failed:",
            clientEmailError,
          );
        }
      }

      /*
       * Internal Odancia notification.
       */
      const { error: adminEmailError } =
        await resend.emails.send({
          from: FROM_EMAIL,
          to: [ADMIN_EMAIL, "odancialaundry@gmail.com", "odanciakasanda@gmail.com","mbombokasandachris@gmail.com", "info@odancialaundry.co.za",],
          subject:
            `🚨 New Pickup Request · ${bookingId} · ${customer_name.trim()}`,
          html: buildAdminEmail({
            name: customer_name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            bookingId,
            services: readableServices,
            pickupDate: pickup_date,
            pickupTime: pickup_time,
            area: area.trim(),
            address: address.trim(),
            deliveryFee: delivery_fee,
            notes: notes.trim(),
          }),
          attachments: [logoAttachment],
        });

      if (adminEmailError) {
        console.error(
          "Admin notification email failed:",
          adminEmailError,
        );
      }
    }
  } catch (emailError) {
    /*
     * Never turn a successful booking into a failed
     * booking just because the email provider failed.
     */
    console.error(
      "Pickup email notification failed:",
      emailError,
    );
  }

  return {
    success: true,
    bookingId,
  };
}