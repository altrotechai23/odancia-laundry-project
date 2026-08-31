"use client";

import { motion } from "framer-motion";
import { Sparkles, Truck, Clock3 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface WelcomeStepProps {
  nextStep: () => void;
}

export function WelcomeStep({
  nextStep,
}: WelcomeStepProps) {
  return (
    <motion.div
      key="welcome"
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -30,
      }}
      transition={{
        duration: 0.4,
      }}
      className="mx-auto max-w-md"
    >
      
        <Image alt="" src='/logo.png' width={72} height={36} className="mx-auto rounded-32" />
    

      <h1 className="mt-2 text-center text-2xl font-semibold text-white">
        Luxury Pickup
      </h1>

      <p className="mt-4 text-center text-white/60">
        Schedule your laundry collection in less than 60 seconds.
      </p>

      <div className="mt-10 space-y-4">
        <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <Truck className="h-5 w-5 text-brand-red" />

          <div>
            <p className="font-medium text-white">
              Free CBD Pickup & Delivery
            </p>

            <p className="text-sm text-white/50">
              Long Street & Cape Town CBD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <Clock3 className="h-5 w-5 text-brand-red" />

          <div>
            <p className="font-medium text-white">
              Open 24 Hours
            </p>

            <p className="text-sm text-white/50">
              Pickup & delivery anytime
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={nextStep}
        className="my-10 w-full rounded-2xl bg-green-500 text-white"
      >
        Start Booking
      </Button>
    </motion.div>
  );
}