"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewBookingStepProps {
  name: string;
  phone: string;
  email: string;
  address: string;
  suburb: string;
  serviceLabel: string;
  zoneFee: string;
  pickupDate: string;
  pickupTime: string;
  selectedZone: string;
  submitting: boolean;
  error?: string;
  prevStep: () => void;
  handleSubmit: () => void | Promise<void>;
}

export function ReviewBookingStep({
  name,
  phone,
  email,
  address,
  suburb,
  serviceLabel,
  zoneFee,
  pickupDate,
  pickupTime,
  selectedZone,
  submitting,
  error,
  prevStep,
  handleSubmit,
}: ReviewBookingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="w-full min-w-0 space-y-6"
    >
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          Final Step
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Review Your Pickup
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Everything looks good? Confirm your pickup request and
          we'll take care of the rest.
        </p>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          role="alert"
        >
          {error}
        </motion.div>
      )}

      {/* Confirm button — intentionally near the top */}
      <div className="sticky top-0 z-20 -mx-1 rounded-2xl bg-white/90 p-1 backdrop-blur-xl">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="
            h-14
            w-full
            rounded-2xl
            bg-brand-red
            text-base
            font-semibold
            text-white
            shadow-lg
            shadow-brand-red/20
            transition-all
            hover:bg-brand-red/90
            active:scale-[0.99]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Confirming Pickup...
            </>
          ) : (
            "Confirm Pickup"
          )}
        </Button>
      </div>

      {/* Main booking card */}
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
        {/* Card header */}
        <div className="relative overflow-hidden bg-slate-950 p-6 sm:p-7">
          <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-brand-red/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              Odancia Laundry
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
              Pickup Request
            </h3>

            <p className="mt-1 text-sm text-white/50">
              Please verify your details before confirming.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2">
          <ReviewItem
            label="Services"
            value={serviceLabel}
            wide
          />

          <ReviewItem
            label="Pickup Date"
            value={formatDate(pickupDate)}
          />

          <ReviewItem
            label="Pickup Time"
            value={pickupTime || "Not selected"}
          />

          <ReviewItem
            label="Collection Area"
            value={selectedZone || suburb || "Not selected"}
          />

          <ReviewItem
            label="Collection Fee"
            value={zoneFee}
            accent
          />

          <ReviewItem
            label="Turnaround"
            value="24 Hours"
          />
        </div>
      </div>

      {/* Customer details */}
      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Customer Details
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-950">
            Collection Information
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CustomerItem
            label="Name"
            value={name}
          />

          <CustomerItem
            label="Mobile"
            value={phone}
          />

          {email && (
            <CustomerItem
              label="Email"
              value={email}
            />
          )}

          <CustomerItem
            label="Area"
            value={suburb}
          />

          <CustomerItem
            label="Address"
            value={address}
            wide
          />
        </div>
      </div>

      {/* Included */}
      <div className="rounded-[28px] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
            <span className="text-xl">✨</span>
          </div>

          <div>
            <h3 className="font-bold text-slate-950">
              Included With Your Service
            </h3>

            <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              <div>✓ Professional garment care</div>
              <div>✓ Quality inspection</div>
              <div>✓ Fresh folding & packaging</div>
              <div>✓ Pickup & delivery tracking</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex gap-3 pb-4">
        <Button
          type="button"
          variant="secondary"
          onClick={prevStep}
          disabled={submitting}
          className="
            h-14
            flex-1
            rounded-2xl
            border-slate-200
            bg-white
            font-semibold
            text-slate-700
            shadow-sm
            hover:bg-slate-50
          "
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="
            h-14
            flex-1
            rounded-2xl
            bg-brand-red
            font-semibold
            text-white
            shadow-lg
            shadow-brand-red/20
            hover:bg-brand-red/90
            disabled:opacity-60
          "
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Confirming...
            </>
          ) : (
            "Confirm Pickup"
          )}
        </Button>
      </div>
    </motion.div>
  );
}

function ReviewItem({
  label,
  value,
  accent = false,
  wide = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`
        min-w-0
        bg-white
        p-5
        sm:p-6
        ${wide ? "sm:col-span-2" : ""}
      `}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p
        className={`
          mt-2
          break-words
          text-sm
          font-semibold
          leading-6
          ${
            accent
              ? "text-brand-red"
              : "text-slate-900"
          }
        `}
      >
        {value}
      </p>
    </div>
  );
}

function CustomerItem({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`
        min-w-0
        rounded-2xl
        bg-white
        p-4
        ${wide ? "sm:col-span-2" : ""}
      `}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold leading-6 text-slate-900">
        {value}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  if (!value) {
    return "Not selected";
  }

  const parts = value.split("-");

  if (parts.length !== 3) {
    return value;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
