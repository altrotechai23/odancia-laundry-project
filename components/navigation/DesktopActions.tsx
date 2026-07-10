"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

interface DesktopActionsProps {
  onSchedulePickup: () => void;
}

export function DesktopActions({
  onSchedulePickup,
}: DesktopActionsProps) {
  return (
    <div className="hidden items-center gap-4 md:flex">

      {/* Phone */}

      <Link
        href="tel:+27616375776"
        className="
          group
          flex
          items-center
          gap-3

          rounded-full

          border
          border-border/60

          bg-background/60

          px-5
          py-2.5

          backdrop-blur-xl

          transition-all
          duration-300

          hover:border-primary/40
          hover:bg-primary/5
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center

            rounded-full

            bg-primary/10

            transition-colors

            group-hover:bg-primary/20
          "
        >
          <Phone className="h-4 w-4 text-primary" />
        </div>

        <span className="text-sm font-medium text-foreground/80">
          +27 61 637 5776
        </span>
      </Link>

      {/* CTA */}

      <motion.button
        whileHover={{
          scale: 1.04,
        }}
        whileTap={{
          scale: 0.97,
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={onSchedulePickup}
        className="
          rounded-full

          gradient-cta

          px-7
          py-3

          text-sm
          font-semibold

          text-brand-red-foreground

          shadow-[0_15px_40px_rgba(220,38,38,.35)]

          transition-shadow
          duration-300

          hover:shadow-[0_20px_60px_rgba(220,38,38,.5)]
        "
      >
        Schedule Pickup
      </motion.button>

    </div>
  );
}