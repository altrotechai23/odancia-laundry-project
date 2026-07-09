"use client";

import { motion } from "framer-motion";
import { glowVariants } from "./animations";
import { BackgroundEffectsProps } from "./types";

export function BackgroundEffects({
  className = "",
}: BackgroundEffectsProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* -------------------------------- */}
      {/* BASE BACKGROUND */}
      {/* -------------------------------- */}

      <div className="absolute inset-0 bg-[#020617]" />

      {/* -------------------------------- */}
      {/* PREMIUM RADIAL GRADIENTS */}
      {/* -------------------------------- */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,.18),transparent_45%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,.10),transparent_45%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,.03),transparent_50%)]" />

      {/* -------------------------------- */}
      {/* GRID */}
      {/* -------------------------------- */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />

      {/* -------------------------------- */}
      {/* TOP RED GLOW */}
      {/* -------------------------------- */}

      <motion.div
        variants={glowVariants}
        animate="animate"
        className="
          absolute
          -left-40
          -top-40
          h-[520px]
          w-[520px]
          rounded-full
          bg-brand-red/25
          blur-[140px]
        "
      />

      {/* -------------------------------- */}
      {/* BOTTOM BLUE GLOW */}
      {/* -------------------------------- */}

      <motion.div
        variants={glowVariants}
        animate="animate"
        className="
          absolute
          -right-44
          bottom-[-180px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-blue-500/15
          blur-[170px]
        "
      />

      {/* -------------------------------- */}
      {/* CENTER LIGHT */}
      {/* -------------------------------- */}

      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/5
          blur-[150px]
        "
      />

      {/* -------------------------------- */}
      {/* TOP GLASS GRADIENT */}
      {/* -------------------------------- */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-64
          bg-gradient-to-b
          from-white/[0.04]
          to-transparent
        "
      />

      {/* -------------------------------- */}
      {/* BOTTOM FADE */}
      {/* -------------------------------- */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-48
          bg-gradient-to-t
          from-black
          via-black/60
          to-transparent
        "
      />

      {/* -------------------------------- */}
      {/* NOISE OVERLAY */}
      {/* -------------------------------- */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          mix-blend-soft-light
          bg-[url('/noise.png')]
          bg-repeat
        "
      />
    </div>
  );
}