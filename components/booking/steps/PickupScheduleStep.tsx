"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PickupTime = {
value: string;
title: string;
subtitle: string;
icon: string;
};

type Props = {
pickupDate: string;
setPickupDate: (value: string) => void;
pickupTime: string;
setPickupTime: (value: string) => void;
nextStep: () => void;
prevStep: () => void;
};

const pickupTimes: PickupTime[] = [
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
];

export function PickupScheduleStep({
pickupDate,
setPickupDate,
pickupTime,
setPickupTime,
nextStep,
prevStep,
}: Props) {
const today = new Date().toISOString().split("T")[0];

const canContinue = Boolean(pickupDate && pickupTime);

return (
<motion.div
initial={{ opacity: 0, x: 24 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -24 }}
transition={{ duration: 0.25, ease: "easeOut" }}
className="w-full min-w-0 space-y-7 overflow-hidden"
>
{/* Header */} <div> <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
Schedule Pickup </h2>

```
    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
      Choose when you'd like us to collect your laundry.
    </p>
  </div>

  {/* Date */}
  <div className="min-w-0">
    <label
      htmlFor="pickup-date"
      className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700"
    >
      <CalendarDays className="h-4 w-4 text-brand-red" />
      Preferred Pickup Date
    </label>

    <div className="relative min-w-0">
      <Input
        id="pickup-date"
        type="date"
        min={today}
        value={pickupDate}
        onChange={(event) => setPickupDate(event.target.value)}
        className="
          h-14
          w-full
          min-w-0
          max-w-full
          appearance-none
          rounded-2xl
          border-slate-200
          bg-white
          px-4
          text-slate-900
          shadow-sm
          outline-none
          transition
          focus:border-brand-red
          focus:ring-4
          focus:ring-brand-red/10
          sm:px-5
        "
      />
    </div>

    <p className="mt-2 text-xs text-slate-400">
      Select today or a future date.
    </p>
  </div>

  {/* Time */}
  <div className="min-w-0">
    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
      <Clock3 className="h-4 w-4 text-brand-red" />
      Pickup Time Preference
    </div>

    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
      {pickupTimes.map((slot) => {
        const active = pickupTime === slot.value;

        return (
          <button
            key={slot.value}
            type="button"
            onClick={() => setPickupTime(slot.value)}
            aria-pressed={active}
            className={`
              flex
              min-w-0
              w-full
              items-center
              gap-3
              rounded-2xl
              border
              p-4
              text-left
              transition-all
              duration-200
              ${
                active
                  ? "border-brand-red bg-brand-red/5 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }
            `}
          >
            <span
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-lg
                ${
                  active
                    ? "bg-brand-red text-white"
                    : "bg-slate-100"
                }
              `}
            >
              {slot.icon}
            </span>

            <span className="min-w-0 flex-1">
              <span
                className={`block truncate font-semibold ${
                  active ? "text-brand-red" : "text-slate-900"
                }`}
              >
                {slot.title}
              </span>

              <span className="mt-0.5 block truncate text-xs text-slate-500">
                {slot.subtitle}
              </span>
            </span>

            <span
              className={`
                h-5
                w-5
                shrink-0
                rounded-full
                border
                p-1
                ${
                  active
                    ? "border-brand-red bg-brand-red"
                    : "border-slate-300"
                }
              `}
            >
              {active && (
                <span className="block h-full w-full rounded-full bg-white" />
              )}
            </span>
          </button>
        );
      })}
    </div>
  </div>

  {/* Information */}
  <div className="rounded-2xl border border-brand-red/10 bg-brand-red/[0.04] p-4 sm:p-5">
    <p className="text-sm font-medium text-slate-800">
      Flexible collection
    </p>

    <p className="mt-1 text-sm leading-6 text-slate-500">
      Our team will contact you to confirm the collection time after your
      request is submitted.
    </p>
  </div>

  {/* Actions */}
  <div className="flex min-w-0 gap-3 pt-1">
    <Button
      type="button"
      variant="secondary"
      onClick={prevStep}
      className="
        h-13
        min-w-0
        flex-1
        rounded-2xl
        border-slate-200
        bg-white
        text-slate-700
        hover:bg-slate-50
      "
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>

    <Button
      type="button"
      onClick={nextStep}
      disabled={!canContinue}
      className="
        h-13
        min-w-0
        flex-1
        rounded-2xl
        bg-brand-red
        font-semibold
        text-white
        shadow-lg
        shadow-brand-red/20
        transition-all
        hover:bg-brand-red/90
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      Continue
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
</motion.div>


);
}
