
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  nextStep: () => void;
}

const benefits = [
  "Professional garment care",
  "Convenient pickup & delivery",
  "Fast turnaround",
];

export function WelcomeStep({ nextStep }: WelcomeStepProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Brand atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-red/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-brand-red/5 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-1 py-2 text-center sm:py-10 lg:py-7">
        

        {/* Brand label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.12,
            duration: 0.45,
          }}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
          </span>

          <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Odancia Laundry
          </span>
        </motion.div>

        

        {/* Premium service card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.28,
            duration: 0.5,
          }}
          className="mt-8 w-full max-w-xl"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 text-left shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-6">
            {/* Top gradient accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-red via-brand-red to-blue-600" />

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red/10 to-blue-500/10 text-brand-red">
                <Sparkles className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-semibold text-slate-950">
                  Premium laundry, without the hassle
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Tell us what you need, where to collect it, and when. We'll
                  handle the rest.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </span>

                  <span className="text-xs font-medium leading-4 text-slate-600">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.38,
            duration: 0.45,
          }}
          className="mt-7 w-full max-w-xl"
        >
          <Button
            type="button"
            onClick={nextStep}
            className="group h-14 w-full rounded-2xl bg-gradient-to-r from-brand-red to-blue-600 px-6 text-base font-semibold text-white shadow-[0_14px_35px_rgba(220,38,38,0.20)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_18px_45px_rgba(220,38,38,0.25)] active:scale-[0.99]"
          >
            <span>Start Your Pickup</span>

            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          <p className="mt-3 text-xs text-slate-400">
            Quick booking · No commitment · We'll confirm your pickup
          </p>
        </motion.div>

        {/* Bottom trust indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.55,
            duration: 0.5,
          }}
          className="mt-8 flex items-center gap-2 text-xs text-slate-400"
        >
          <span className="h-px w-8 bg-slate-200" />
          <span>Simple. Professional. Reliable.</span>
          <span className="h-px w-8 bg-slate-200" />
        </motion.div>
      </div>
    </section>
  );
}

