
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

import { createPickup } from "@/app/actions/create-pickup";
import { Button } from "@/components/ui/button";

import { DialogHeader } from "./DialogHeader";
import { ProgressBar } from "./ProgressBar";


import { ServicesStep } from "./steps/ServicesStep";
import { PickupDetailsStep } from "./steps/PickupDetailsStep";
import { PickupScheduleStep } from "./steps/PickupScheduleStep";
import { ReviewBookingStep } from "./steps/ReviewBookingStep";
import { WelcomeStep } from "./steps/WelcomeStep";

interface PickupDialogProps {
  open: boolean;
  onClose: () => void;
}

export const services = [
  {
    id: "wash-fold",
    title: "Wash & Fold",
    description: "Professional washing and folding",
    icon: "🧺",
  },
  {
    id: "ironing",
    title: "Ironing",
    description: "Perfectly pressed garments",
    icon: "👔",
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    description: "Premium garment treatment",
    icon: "✨",
  },
  {
    id: "sneakers",
    title: "Sneaker Cleaning",
    description: "Restore your favorite sneakers",
    icon: "👟",
  },
  {
    id: "duvets",
    title: "Duvets & Blankets",
    description: "Large item cleaning",
    icon: "🛏️",
  },
  {
    id: "curtains",
    title: "Curtains",
    description: "Professional curtain care",
    icon: "🏠",
  },
  {
    id: "alterations",
    title: "Alterations",
    description: "Minor repairs & adjustments",
    icon: "✂️",
  },
] as const;

export const suburbs = [
  { name: "Cape Town CBD", fee: 0 },
  { name: "Long Street", fee: 0 },
  { name: "Foreshore", fee: 0 },
  { name: "Gardens", fee: 50 },
  { name: "Woodstock", fee: 50 },
  { name: "Sea Point", fee: 50 },
  { name: "Green Point", fee: 50 },
  { name: "De Waterkant", fee: 50 },
  { name: "Observatory", fee: 100 },
  { name: "Claremont", fee: 100 },
  { name: "Rondebosch", fee: 100 },
  { name: "Century City", fee: 100 },
  { name: "Bellville", fee: 100 },
  { name: "Durbanville", fee: 100 },
] as const;

export const pickupTimes = [
  {
    value: "ASAP",
    title: "ASAP",
    subtitle: "Next available driver",
    icon: "⚡",
  },
  {
    value: "Morning",
    title: "Morning",
    subtitle: "06:00 – 12:00",
    icon: "🌅",
  },
  {
    value: "Afternoon",
    title: "Afternoon",
    subtitle: "12:00 – 17:00",
    icon: "☀️",
  },
  {
    value: "Evening",
    title: "Evening",
    subtitle: "17:00 – 21:00",
    icon: "🌇",
  },
] as const;

const TOTAL_STEPS = 5;

export function PickupDialog({
  open,
  onClose,
}: PickupDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");

  const [selectedServices, setSelectedServices] = useState<string[]>(
    [],
  );

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingId, setBookingId] = useState("");
  /*
   * Find the selected suburb.
   */
  const selectedSuburb = useMemo(
    () => suburbs.find((item) => item.name === suburb),
    [suburb],
  );

  /*
   * Delivery / collection fee is determined by the selected suburb.
   */
  const deliveryFee = selectedSuburb?.fee ?? 0;

  /*
   * Scroll every new step back to the top.
   *
   * requestAnimationFrame makes this reliable after React
   * has committed the new step to the DOM.
   */
  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      const element = contentRef.current;

      if (element) {
        element.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [step, open]);

  /*
   * Prevent the page behind the full-screen dialog
   * from scrolling.
   */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior =
      document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior =
        previousOverscrollBehavior;
    };
  }, [open]);

  /*
   * Reset the entire booking.
   */
  const resetBooking = useCallback(() => {
  setStep(0);
  setSubmitting(false);
  setSuccess(false);
  setBookingId("");
  setError("");

  setName("");
  setPhone("");
  setEmail("");
  setAddress("");
  setSuburb("");
  setSelectedServices([]);
  setPickupDate("");
  setPickupTime("");
  setNotes("");
}, []);

  /*
   * Close dialog.
   */
  const handleClose = useCallback(() => {
    if (submitting) return;

    resetBooking();
    onClose();
  }, [onClose, resetBooking, submitting]);

  /*
   * Toggle services.
   */
  const toggleService = useCallback((id: string) => {
    setSelectedServices((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }, []);

  /*
   * Next step.
   */
  const nextStep = useCallback(() => {
    setError("");

    setStep((current) =>
      Math.min(current + 1, TOTAL_STEPS - 1),
    );
  }, []);

  /*
   * Previous step.
   */
  const prevStep = useCallback(() => {
    setError("");

    setStep((current) =>
      Math.max(current - 1, 0),
    );
  }, []);

  /*
   * Human-readable service names.
   */
  const serviceLabel = useMemo(() => {
    if (selectedServices.length === 0) {
      return "No services selected";
    }

    return selectedServices
      .map(
        (id) =>
          services.find(
            (service) => service.id === id,
          )?.title ?? id,
      )
      .join(", ");
  }, [selectedServices]);

  /*
   * Collection-zone pricing.
   */
  const zoneFeeLabel = useMemo(() => {
    switch (selectedZone) {
      case "CBD & Long Street":
      case "City Bowl":
        return "FREE";

      case "Atlantic Seaboard":
      case "Southern Suburbs":
        return "R50";

      case "Northern Suburbs":
        return "R100";

      case "Far Distance":
        return "Custom Quote";

      default:
        return "Not selected";
    }
  }, [selectedZone]);

  /*
   * Format date safely without timezone shifting.
   */
  const formattedDate = useMemo(() => {
    if (!pickupDate) {
      return "Not selected";
    }

    const parts = pickupDate.split("-");

    if (parts.length !== 3) {
      return pickupDate;
    }

    const [year, month, day] = parts.map(Number);

    const date = new Date(
      year,
      month - 1,
      day,
    );

    if (Number.isNaN(date.getTime())) {
      return pickupDate;
    }

    return new Intl.DateTimeFormat("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  }, [pickupDate]);

  /*
   * Submit booking.
   */
const handleSubmit = useCallback(async () => {
  if (submitting) return;

  setError("");

  if (!name.trim()) {
    setError("Please enter your name.");
    return;
  }

  if (!phone.trim()) {
    setError("Please enter your mobile number.");
    return;
  }

  if (!address.trim()) {
    setError("Please enter your collection address.");
    return;
  }

  if (!suburb) {
    setError("Please select your area.");
    return;
  }

  if (selectedServices.length === 0) {
    setError("Please select at least one service.");
    return;
  }

  if (!pickupDate) {
    setError("Please select a pickup date.");
    return;
  }

  if (!pickupTime) {
    setError("Please select a pickup time.");
    return;
  }

  try {
    setSubmitting(true);

    const result = await createPickup({
      customer_name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      services: selectedServices,
      area: suburb,
      address: address.trim(),
      pickup_date: pickupDate,
      pickup_time: pickupTime,
      delivery_fee: deliveryFee,
      notes: notes.trim(),
    });

    if (!result.success || !result.bookingId) {
      throw new Error(
        "Pickup was submitted but no booking reference was returned.",
      );
    }

    setBookingId(result.bookingId);
    setSuccess(true);
  } catch (err) {
    console.error("Pickup submission failed:", err);

    setError(
      err instanceof Error
        ? err.message
        : "Something went wrong. Please try again.",
    );
  } finally {
    setSubmitting(false);
  }
}, [
  address,
  deliveryFee,
  email,
  name,
  notes,
  phone,
  pickupDate,
  pickupTime,
  selectedServices,
  suburb,
  submitting,
]);

  if (!open) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="pickup-dialog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] h-[100dvh] w-full overflow-hidden bg-white"
        role="dialog"
        aria-modal="true"
        aria-label="Schedule pickup"
      >
        {/* Ambient background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-brand-red/10 blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-slate-200/70 blur-[120px]"
        />

        <div className="relative flex h-[100dvh] min-h-0 w-full flex-col overflow-hidden">
          {/* Header */}
          <header className="shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
            <DialogHeader onClose={handleClose} />
            <ProgressBar step={step} />
          </header>

          {/* Scrollable content */}
          <div
            ref={contentRef}
            className="
              min-h-0
              flex-1
              overflow-y-auto
              overflow-x-hidden
              overscroll-contain
              bg-white
              [scrollbar-width:thin]
            "
          >
            <div
              className="
                mx-auto
                w-full
                max-w-4xl
                overflow-x-hidden
                px-5
                py-8
                sm:px-8
                sm:py-10
                lg:px-10
                lg:py-12
              "
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
              
{success ? (
  <motion.div
    key="success"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    className="mx-auto flex w-full max-w-2xl flex-col items-center px-1 py-6 text-center sm:py-10"
  >
    {/* Success icon */}
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        delay: 0.15,
        type: "spring",
        stiffness: 220,
        damping: 16,
      }}
      className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/70"
    >
      <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-xl" />

      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20">
        <Check className="h-8 w-8 text-white" strokeWidth={2.5} />
      </div>
    </motion.div>

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mt-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
        Odancia Laundry
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Pickup Request Confirmed
      </h1>

      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
        Your pickup request has been received successfully.
        Our team will contact you shortly to confirm your
        collection.
      </p>
    </motion.div>

    {/* Booking reference */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="mt-8 w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)]"
    >
      <div className="relative overflow-hidden bg-slate-950 px-6 py-7 text-left">
        {/* Brand glow */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            Booking Reference
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="break-all text-xl font-bold tracking-wide text-white sm:text-2xl">
              {bookingId}
            </span>

            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              CONFIRMED
            </span>
          </div>
        </div>
      </div>

      {/* Booking summary */}
      <div className="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2">
        <ConfirmationItem
          label="Services"
          value={serviceLabel}
        />

        <ConfirmationItem
          label="Pickup Date"
          value={formattedDate}
        />

        <ConfirmationItem
          label="Pickup Time"
          value={pickupTime || "Not selected"}
        />

        <ConfirmationItem
          label="Collection Area"
          value={suburb || "Not selected"}
        />

        <ConfirmationItem
          label="Collection Fee"
          value={
            deliveryFee === 0
              ? "FREE"
              : `R${deliveryFee}`
          }
        />

        <ConfirmationItem
          label="Turnaround"
          value="24 Hours"
        />
      </div>
    </motion.div>

    {/* Next steps */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="mt-5 w-full rounded-[24px] border border-blue-100 bg-blue-50/70 p-5 text-left"
    >
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <span className="text-lg">📦</span>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            What happens next?
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Our team will review your request and contact
            you to confirm the pickup details and collection
            time.
          </p>
        </div>
      </div>
    </motion.div>

    {/* Done */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="mt-8 w-full sm:w-auto"
    >
      <Button
        type="button"
        onClick={handleClose}
        className="h-14 w-full rounded-2xl bg-slate-950 px-10 text-sm font-semibold text-white shadow-xl shadow-slate-950/10 transition-all hover:bg-slate-800 sm:w-auto"
      >
        Done
      </Button>
    </motion.div>

    <p className="mt-5 text-xs text-slate-400">
      Please keep your booking reference for your records.
    </p>
  </motion.div>
) : (


                  <>
                    {step === 0 && (
                      <motion.div
                        key="welcome"
                        initial={{
                          opacity: 0,
                          x: 30,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -30,
                        }}
                        className="w-full min-w-0"
                      >
                        <WelcomeStep
                          nextStep={nextStep}
                        />
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div
                        key="services"
                        initial={{
                          opacity: 0,
                          x: 30,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -30,
                        }}
                        className="w-full min-w-0"
                      >
                        <ServicesStep
                          services={services.map(
                            (service) => ({
                              ...service,
                              icon: service.icon,
                            }),
                          )}
                          selectedServices={
                            selectedServices
                          }
                          toggleService={
                            toggleService
                          }
                          nextStep={nextStep}
                          prevStep={prevStep}
                        />
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="details"
                        initial={{
                          opacity: 0,
                          x: 30,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -30,
                        }}
                        className="w-full min-w-0"
                      >
                        <PickupDetailsStep
                          name={name}
                          setName={setName}
                          phone={phone}
                          setPhone={setPhone}
                          email={email}
                          setEmail={setEmail}
                          address={address}
                          setAddress={setAddress}
                          suburb={suburb}
                          setSuburb={setSuburb}
                          suburbs={[...suburbs]}
                          deliveryFee={deliveryFee}
                          nextStep={nextStep}
                          prevStep={prevStep}
                        />
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="schedule"
                        initial={{
                          opacity: 0,
                          x: 30,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -30,
                        }}
                        className="w-full min-w-0"
                      >
                        <PickupScheduleStep
                          pickupDate={pickupDate}
                          setPickupDate={setPickupDate}
                          pickupTime={pickupTime}
                          setPickupTime={setPickupTime}
                          nextStep={nextStep}
                          prevStep={prevStep}
                        />
                      </motion.div>
                    )}

                   
                  
{step === 4 && (
  <motion.div
    key="review"
    initial={{
      opacity: 0,
      x: 30,
    }}
    animate={{
      opacity: 1,
      x: 0,
    }}
    exit={{
      opacity: 0,
      x: -30,
    }}
    className="w-full min-w-0"
  >
    <ReviewBookingStep
      name={name}
      phone={phone}
      email={email}
      address={address}
      suburb={suburb}
      serviceLabel={serviceLabel}
      zoneFee={zoneFeeLabel}
      pickupDate={pickupDate}
      pickupTime={pickupTime}
      selectedZone={suburb}
      submitting={submitting}
      error={error}
      prevStep={prevStep}
      handleSubmit={handleSubmit}
    />
  </motion.div>
)}




                  </>
                )}
              </AnimatePresence>

              {/* Validation / submission error */}
              {!success && error && step !== 4 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-6
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-red-600
                  "
                  role="alert"
                >
                  {error}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}


function ConfirmationItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 bg-white p-5 text-left">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold leading-6 text-slate-900">
        {value}
      </p>
    </div>
  );
}



