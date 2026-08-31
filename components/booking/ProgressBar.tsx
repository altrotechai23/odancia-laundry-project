"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  step: number;
}

export function ProgressBar({
  step,
}: ProgressBarProps) {
  return (
    <div className="mt-6 px-6">
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              animate={{
                width: step >= item ? "100%" : "0%",
              }}
              transition={{
                duration: 0.4,
              }}
              className="h-full bg-brand-red"
            />
          </div>
        ))}
      </div>
    </div>
  );
}