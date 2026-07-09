"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { BackgroundEffects } from "./BackgroundEffects";
import { ThemeToggle } from "../ThemeToggle";
import { Logo } from "./Logo";

import {
  menuVariants,
  menuItemVariants,
} from "./animations";

interface FullscreenMenuProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
}

export function FullscreenMenu({
  open,
  pathname,
  onClose,
}: FullscreenMenuProps) {
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.aside
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="
            fixed
            inset-0
            z-[999]
            overflow-hidden
            bg-[#020617]
          "
        >
          {/* Animated Background */}
          <BackgroundEffects />

          {/* Glass Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-black/10
              via-transparent
              to-black/30
              backdrop-blur-3xl
            "
          />

          {/* Content */}
          <div
            className="
              relative
              flex
              h-full
              flex-col
            "
          >
           
        
            {/* TOP BAR */}
            {/* ========================================= */}
            <motion.header
            variants={menuItemVariants}
            className="
                flex
                items-center
                justify-between

                border-b
                border-white/10

                px-6
                py-6

                md:px-10
            "
            >
            {/* Logo */}

            <Logo />

            {/* Right Side */}

            <div className="flex items-center gap-3">
                <div
                className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-1
                    backdrop-blur-xl
                "
                >
                <ThemeToggle />
                </div>

                <motion.button
                type="button"
                onClick={onClose}
                whileHover={{
                    rotate: 90,
                    scale: 1.05,
                }}
                whileTap={{
                    scale: 0.92,
                }}
                transition={{
                    duration: 0.3,
                }}
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/10

                    bg-white/[0.04]

                    text-white

                    backdrop-blur-xl

                    transition-colors

                    hover:bg-white/10
                "
                aria-label="Close menu"
                >
                <X className="h-5 w-5" />
                </motion.button>
            </div>
            </motion.header>
            {/* ========================================= */}
            {/* NAVIGATION */}
            {/* ========================================= */}

            <motion.nav
            variants={menuItemVariants}
            className="
                flex-1

                flex
                flex-col
                justify-center

                px-6
                md:px-10
            "
            >
            <div className="space-y-3">
                {[
                {
                    href: "/",
                    label: "HOME",
                    subtitle: "Luxury Laundry Experience",
                },
                {
                    href: "/about",
                    label: "ABOUT",
                    subtitle: "Our Story & Vision",
                },
                {
                    href: "/services",
                    label: "SERVICES",
                    subtitle: "Premium Garment Care",
                },
                {
                    href: "/contact",
                    label: "CONTACT",
                    subtitle: "Book Your Pickup",
                },
                ].map((item, index) => {
                const active =
                    item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                    <motion.div
                    key={item.href}
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: index * 0.08,
                    }}
                    >
                    <Link
                        href={item.href}
                        onClick={onClose}
                        className="
                            group

                            relative
                            isolate
                            overflow-hidden

                            flex
                            items-center
                            justify-between

                            rounded-[36px]

                            px-6
                            py-8

                            transition-all
                            duration-700

                            hover:bg-white/[0.04]
                        "
                        >
                            <motion.div
                            animate={{
                                x: active ? 0 : -30,
                                opacity: active ? 1 : 0.15,
                                scale: active ? 1 : 0.9,
                            }}
                            transition={{
                                duration: 0.7,
                            }}
                            className="
                                pointer-events-none

                                absolute

                                -right-6
                                top-1/2

                                -translate-y-1/2

                                select-none

                                text-[120px]
                                font-black
                                leading-none

                                text-white/[0.03]

                                md:text-[180px]
                            "
                            >
                             {String(index + 1).padStart(2, "0")}
                            </motion.div>
                            <div className="relative z-10">
                                <h2
                                className={`
                                    font-black
                                    tracking-[-0.05em]
                                    leading-none

                                    transition-all
                                    duration-700

                                    ${
                                    active
                                        ? `
                                        text-white
                                        text-5xl
                                        md:text-7xl
                                        lg:text-8xl
                                        `
                                        : `
                                        text-white/35
                                        text-4xl
                                        md:text-5xl
                                        lg:text-6xl

                                        group-hover:text-white
                                        group-hover:translate-x-2
                                        `
                                    }
                                `}
                                >
                                {item.label}
                                </h2>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: active ? 1 : 0.7 }}
                                    className="
                                        mt-3

                                        max-w-sm

                                        text-sm
                                        leading-7

                                        text-white/50

                                        md:text-base
                                    "
                                    >
                                    {item.subtitle}
                                </motion.p>
                            </div>

                            <motion.div
                                className="
                                    relative
                                    z-10

                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center

                                    rounded-full

                                    border
                                    border-white/10

                                    bg-white/[0.03]

                                    text-2xl

                                    text-white/40

                                    transition-all
                                    duration-500

                                    group-hover:border-brand-red/30
                                    group-hover:bg-brand-red/10
                                    group-hover:text-brand-red
                                "
                            >
                            →
                            </motion.div>
                    </Link>
                    </motion.div>
                );
                })}
            </div>
            </motion.nav>
           
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}