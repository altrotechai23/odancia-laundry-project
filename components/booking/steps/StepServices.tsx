"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

interface StepServicesProps {
  services: Service[];
  selectedServices: string[];
  toggleService: (id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function StepServices({
  services,
  selectedServices,
  toggleService,
  nextStep,
  prevStep,
}: StepServicesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-white">
          Select Services
        </h2>

        <p className="mt-2 text-white/60">
          Choose all services required for your order.
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service) => {
          const active = selectedServices.includes(service.id);

          return (
            <motion.button
              whileTap={{ scale: 0.98 }}
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`w-full rounded-[28px] border p-5 text-left transition-all duration-300 ${
                active
                  ? "border-brand-red bg-brand-red/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                  {service.icon}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-1 text-sm text-white/50">
                    {service.description}
                  </p>
                </div>

                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                    active
                      ? "border-brand-red bg-brand-red"
                      : "border-white/20"
                  }`}
                >
                  {active && (
                    <span className="text-xs text-white">✓</span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm text-white/60">
          Selected Services
        </p>

        <p className="mt-1 text-lg font-semibold text-white">
          {selectedServices.length}
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={prevStep}
        >
          Back
        </Button>

        <Button
          className="flex-1 bg-green-500 text-white"
          onClick={nextStep}
          disabled={selectedServices.length === 0}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}