"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { menuItemVariants } from "./animations";
import { NavItemProps } from "./types";

export function NavItem({
  href,
  label,
  active,
  mobile = false,
  onClick,
}: NavItemProps) {
  if (mobile) {
    return (
      <motion.div variants={menuItemVariants}>
        <Link
          href={href}
          onClick={onClick}
          className="
            group
            relative
            flex
            items-center
            justify-between

            overflow-hidden

            rounded-3xl

            border
            border-white/10

            bg-white/[0.03]

            px-7
            py-6

            transition-all
            duration-500

            hover:border-brand-red/30
            hover:bg-white/[0.06]
          "
        >
          {/* Hover Glow */}

          <div
            className="
              absolute
              inset-0

              bg-gradient-to-r
              from-brand-red/10
              via-transparent
              to-transparent

              opacity-0
              transition-opacity
              duration-500

              group-hover:opacity-100
            "
          />

          <span
            className={`
              relative
              text-2xl
              font-semibold
              transition-colors
              duration-300

              ${
                active
                  ? "text-brand-red"
                  : "text-white"
              }
            `}
          >
            {label}
          </span>

          <motion.span
            initial={{
              x: -10,
              opacity: 0,
            }}
            whileHover={{
              x: 0,
              opacity: 1,
            }}
            className="
              relative
              text-3xl
              text-brand-red
            "
          >
            →
          </motion.span>

          {active && (
            <motion.div
              layoutId="active-mobile-nav"
              className="
                absolute
                left-0
                top-0
                h-full
                w-1.5
                rounded-r-full
                bg-brand-red
              "
            />
          )}
        </Link>
      </motion.div>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group
        relative

        px-4
        py-2

        text-sm
        font-medium

        transition-colors
        duration-300
      "
    >
      <span
        className={`
          transition-colors
          duration-300

          ${
            active
              ? "text-white"
              : "text-white/60 group-hover:text-white"
          }
        `}
      >
        {label}
      </span>

      {/* Animated Underline */}

      <motion.span
        layoutId="desktop-nav-indicator"
        className={`
          absolute
          bottom-0
          left-4
          h-[2px]
          rounded-full
          bg-brand-red

          ${
            active
              ? "w-[calc(100%-2rem)]"
              : "w-0 group-hover:w-[calc(100%-2rem)]"
          }

          transition-all
          duration-300
        `}
      />

      {/* Glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2

          h-10
          w-10

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-brand-red/20

          opacity-0

          blur-xl

          transition-opacity
          duration-500

          group-hover:opacity-100
        "
      />
    </Link>
  );
}