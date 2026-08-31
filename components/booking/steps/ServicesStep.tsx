
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type Props = {
  services: Service[];
  selectedServices: string[];
  toggleService: (id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export function ServicesStep({
  services,
  selectedServices,
  toggleService,
  nextStep,
  prevStep,
}: Props) {
  return (
    <motion.div
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
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="min-w-0 w-full"
    >
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
          Step 2 of 5
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Select services
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
          Choose everything you'd like us to take care of.
        </p>
      </div>

      {/* Horizontal service rail */}
      <div className="relative min-w-0">
        <div
          className="
            -mx-5
            flex
            min-w-0
            gap-4
            overflow-x-auto
            px-5
            pb-5
            snap-x
            snap-mandatory
            overscroll-x-contain
            sm:-mx-8
            sm:px-8
            lg:-mx-10
            lg:px-10
            [scrollbar-width:none]
            [-ms-overflow-style:none]
          "
        >
          {services.map((service) => {
            const active = selectedServices.includes(
              service.id,
            );

            return (
              <motion.button
                key={service.id}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleService(service.id)}
                className={`
                  flex
                  h-[230px]
                  w-[270px]
                  shrink-0
                  snap-start
                  flex-col
                  rounded-[28px]
                  border
                  p-5
                  text-left
                  transition-all
                  duration-200
                  ${
                    active
                      ? "border-brand-red bg-brand-red/[0.05] shadow-lg shadow-brand-red/10"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                  }
                `}
              >
                <div
                  className={`
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    text-2xl
                    ${
                      active
                        ? "bg-brand-red/10"
                        : "bg-slate-100"
                    }
                  `}
                >
                  {service.icon}
                </div>

                <div className="mt-5 min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 flex justify-end">
                  <div
                    className={`
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      ${
                        active
                          ? "border-brand-red bg-brand-red"
                          : "border-slate-300 bg-white"
                      }
                    `}
                  >
                    {active && (
                      <span className="text-xs font-bold text-white">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selection count */}
      <div className="mt-2 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Selected Services
          </span>

          <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-slate-950 px-3 text-sm font-semibold text-white">
            {selectedServices.length}
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 pb-4 sm:flex-row">
        <Button
          type="button"
          variant="secondary"
          onClick={prevStep}
          className="h-14 w-full rounded-2xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 sm:flex-1"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={nextStep}
          disabled={selectedServices.length === 0}
          className="h-14 w-full rounded-2xl bg-brand-red font-semibold text-white shadow-lg shadow-brand-red/20 hover:bg-brand-red/90 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}

