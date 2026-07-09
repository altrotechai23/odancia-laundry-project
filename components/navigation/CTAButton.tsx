"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { COMPANY } from "./constants";
import { ctaVariants } from "./animations";
import { CTAButtonProps } from "./types";

export function CTAButton({
  className = "",
  onClick,
}: CTAButtonProps) {
  return (
    <motion.div
      variants={ctaVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={className}
    >
      <Link
        href="/contact"
        onClick={onClick}
        className="  group  relative  inline-flex
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-brand-red
          px-7
          py-3
          text-sm
          font-semibold
          text-white
          shadow-[0_20px_60px_rgba(220,38,38,.30)]
          transition-all
          duration-500
          hover:shadow-[0_30px_80px_rgba(220,38,38,.45)]
        "
      >
        {/* Animated shine */}

        <span
          className="absolute  inset-0  -translate-x-full bg-gradient-to-r  from-transparent  via-white/30 to-transparent transition-transform   duration-1000  group-hover:translate-x-full"
        />

        {/* Glow */}

        <div
          className="absolute  inset-0  rounded-full  bg-brand-red  opacity-0 blur-xl transition-opacity  duration-500   group-hover:opacity-70
          "
        />

        {/* Content */}
        <span className="relative flex items-center gap-3">
          {COMPANY.cta}
          <ArrowRight className=" h-4   w-4 transition-transform  duration-300 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}