"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { logoVariants } from "./animations";
import { COMPANY } from "./constants";
import { LogoProps } from "./types";

export function Logo({
  className = "",
}: LogoProps) {
  return (
    <motion.div
      variants={logoVariants}
      initial="initial"
      whileHover="hover"
      className={className}
    >
      <Link
        href="/"
        className="
          group
          relative
          flex
          items-center
          gap-4
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-brand-red/20
            blur-2xl
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* Logo */}

        <div className="relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-izdCA0xx70zF4A7fYXFcRXa8Cfh936.png"
            alt={COMPANY.name}
            width={170}
            height={56}
            priority
            className="
              h-10
              w-auto
              transition-transform
              duration-500
              group-hover:scale-105
              md:h-11
            "
          />
        </div>

        {/* Optional Brand Text */}

        <div
          className="
            hidden
            xl:flex
            flex-col
            leading-none
          "
        >
          <span
            className="
              text-sm
              font-semibold
              tracking-wide
              text-white
            "
          >
            {COMPANY.name}
          </span>

          <span
            className="
              mt-1
              text-[11px]
              uppercase
              tracking-[0.28em]
              text-white/45
            "
          >
            {COMPANY.slogan}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}