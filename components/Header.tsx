"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";

import { Logo } from "./navigation/Logo";
import { DesktopNav } from "./navigation/DesktopNav";
import { DesktopActions } from "./navigation/DesktopActions";
import { MobileMenuButton } from "./navigation/MobileMenuButton";
import { PickupDialog } from "@/components/booking/PickupDialog";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }

      return pathname.startsWith(href);
    },
    [pathname],
  );

  /**
   * Open the booking flow from either desktop or mobile.
   *
   * Mobile navigation is closed first so the booking dialog
   * becomes the only active overlay.
   */
  const openBooking = useCallback(() => {
    setMobileOpen(false);
    setBookingOpen(true);
  }, []);

  /**
   * Close booking dialog.
   */
  const closeBooking = useCallback(() => {
    setBookingOpen(false);
  }, []);

  /**
   * Prevent the page behind the mobile menu from scrolling.
   *
   * PickupDialog manages its own scroll lock when bookingOpen
   * is true, so we intentionally skip modifying body overflow
   * while the booking dialog is open.
   */
  useEffect(() => {
    if (bookingOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior =
      document.body.style.overscrollBehavior;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior =
        previousOverscrollBehavior;
    };
  }, [mobileOpen, bookingOpen]);

  /**
   * Escape key closes the mobile menu.
   *
   * The booking dialog handles its own interaction separately.
   */
  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="relative z-40 bg-transparent px-1 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between px-0 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop navigation */}
            <DesktopNav
              navLinks={navLinks}
              isActive={isActive}
            />

            {/* Desktop actions */}
            <DesktopActions
              onSchedulePickup={openBooking}
            />

            {/* Mobile menu button */}
            <MobileMenuButton
              onOpen={() => setMobileOpen(true)}
            />
          </div>
        </div>

        {/* ================================
            MOBILE NAVIGATION
        ================================= */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                opacity: 0,
                clipPath:
                  "circle(0% at calc(100% - 42px) 42px)",
              }}
              animate={{
                opacity: 1,
                clipPath:
                  "circle(150% at calc(100% - 42px) 42px)",
              }}
              exit={{
                opacity: 0,
                clipPath:
                  "circle(0% at calc(100% - 42px) 42px)",
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                inset-0
                z-[999]
                h-[100dvh]
                overflow-hidden
                bg-white
                md:hidden
              "
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Background decoration */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div
                  className="
                    absolute
                    -right-40
                    -top-40
                    h-96
                    w-96
                    rounded-full
                    bg-primary/20
                    blur-[120px]
                  "
                />

                <div
                  className="
                    absolute
                    -bottom-40
                    -left-40
                    h-96
                    w-96
                    rounded-full
                    bg-brand-red/20
                    blur-[120px]
                  "
                />

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-72
                    w-72
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-primary/5
                    blur-[100px]
                  "
                />
              </div>

              {/* Mobile content */}
              <div className="relative flex h-full flex-col">
                {/* ================================
                    TOP BAR
                ================================= */}
                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    justify-between
                    border-b
                    border-slate-200/80
                    px-6
                    py-6
                  "
                >
                  <Logo />

                  <motion.button
                    type="button"
                    whileHover={{
                      rotate: 90,
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      bg-white/80
                      shadow-sm
                      backdrop-blur-xl
                    "
                  >
                    <X className="h-5 w-5 text-primary" />
                  </motion.button>
                </div>

                {/* ================================
                    NAVIGATION
                ================================= */}
                <div className="flex min-h-0 flex-1 items-center overflow-y-auto px-6">
                  <nav className="w-full space-y-2 py-8">
                    {navLinks.map((link, index) => {
                      const active = isActive(link.href);

                      return (
                        <motion.div
                          key={link.href}
                          initial={{
                            opacity: 0,
                            x: -50,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: 0.1 + index * 0.07,
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Link
                            href={link.href}
                            onClick={() =>
                              setMobileOpen(false)
                            }
                            className="
                              group
                              flex
                              items-center
                              justify-between
                              rounded-3xl
                              px-6
                              py-5
                              transition-colors
                              duration-300
                              hover:bg-slate-100/70
                            "
                          >
                            <div className="flex items-center gap-5">
                              <span
                                className={`
                                  text-4xl
                                  font-bold
                                  tracking-tight
                                  transition-colors
                                  duration-300
                                  sm:text-5xl
                                  ${
                                    active
                                      ? "text-primary"
                                      : "text-primary/70 group-hover:text-primary"
                                  }
                                `}
                              >
                                {link.label}
                              </span>

                              {active && (
                                <motion.div
                                  layoutId="mobile-active-dot"
                                  className="h-3 w-3 rounded-full bg-brand-red"
                                />
                              )}
                            </div>

                            <motion.span
                              initial={{
                                x: -10,
                                opacity: 0,
                              }}
                              whileHover={{
                                x: 0,
                                opacity: 1,
                              }}
                              className="text-3xl text-primary"
                            >
                              →
                            </motion.span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>

                {/* ================================
                    BOTTOM CTA
                ================================= */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.45,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    shrink-0
                    border-t
                    border-slate-200/80
                    bg-white/70
                    px-8
                    py-7
                    backdrop-blur-xl
                  "
                >
                  <div className="space-y-5">
                    {/* Contact */}
                    <div className="space-y-3">
                      <Link
                        href="tel:+27616375776"
                        className="
                          flex
                          items-center
                          gap-3
                          text-primary/80
                          transition-colors
                          hover:text-primary
                        "
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-primary/10
                          "
                        >
                          <Phone className="h-5 w-5" />
                        </div>

                        <span className="text-lg font-medium">
                          +27 61 637 5776
                        </span>
                      </Link>

                      <p className="text-sm text-slate-500">
                        Premium Laundry Service
                      </p>

                      <p className="text-sm text-slate-500">
                        Cape Town, South Africa
                      </p>
                    </div>

                    {/* Booking CTA */}
                    <motion.button
                      type="button"
                      whileHover={{
                        scale: 1.015,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      onClick={openBooking}
                      className="
                        relative
                        w-full
                        overflow-hidden
                        rounded-2xl
                        bg-primary
                        py-4
                        text-base
                        font-semibold
                        text-white
                        shadow-[0_20px_60px_rgba(37,99,235,.25)]
                        transition-shadow
                        duration-300
                        hover:shadow-[0_25px_70px_rgba(199,53,69,.28)]
                      "
                    >
                      {/* Animated red accent */}
                      <motion.span
                        aria-hidden="true"
                        className="
                          absolute
                          inset-y-0
                          right-0
                          w-1/3
                          bg-brand-red
                        "
                        initial={{
                          x: "100%",
                        }}
                        animate={{
                          x: 0,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />

                      <span className="relative z-10">
                        Schedule Pickup
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 
       * SINGLE BOOKING DIALOG
       *
       * Both desktop and mobile Schedule Pickup buttons
       * open this exact same booking flow.
       */}
      <PickupDialog
        open={bookingOpen}
        onClose={closeBooking}
      />
    </>
  );
}
