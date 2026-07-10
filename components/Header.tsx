"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./navigation/Logo";
import { DesktopNav } from "./navigation/DesktopNav";
import { DesktopActions } from "./navigation/DesktopActions";
import { MobileMenuButton } from "./navigation/MobileMenuButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const mobileNavVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const mobileNavItemVariants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="relative z-400 bg-transparent px-1 py-4">
     

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex px-0 h-16 items-center justify-between md:h-20">    
          <Logo />
          <DesktopNav
            navLinks={navLinks}
            isActive={isActive}
          />

          <DesktopActions
            onSchedulePickup={() => setOpen(true)}
          />

          <MobileMenuButton
            onOpen={() => setMobileOpen(true)}
          />
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 42px) 42px)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(150% at calc(100% - 42px) 42px)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 42px) 42px)",
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              inset-0
              z-[999]
              bg-white
              backdrop-blur-3xl
              md:hidden
            "
          >
            {/* Background decorations */}

            <div className="absolute inset-0 overflow-hidden">

              <div className="
                  absolute
                  -top-40
                  -right-40

                  h-96
                  w-96

                  rounded-full

                  bg-primary

                  blur-[120px]
                "
              />

              <div className="
                  absolute
                  -bottom-40
                  -left-40

                  h-96
                  w-96

                  rounded-full

                  bg-brand-red/50

                  blur-[120px]
                "
              />

            </div>

            {/* Content */}

            <div className="relative flex h-full flex-col">
              {/* ========================= */}
              {/* TOP BAR */}
              {/* ========================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between

                  border-b
                  border-white/10

                  px-6
                  py-6
                "
              >
                {/* Logo */}

                <Logo />

                {/* Right Side */}

                <div className="flex items-center gap-3">


                  <motion.button
                    whileHover={{
                      rotate: 90,
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    onClick={() => setMobileOpen(false)}
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/10

                      bg-white/5

                      backdrop-blur-xl
                    "
                  >
                    <X className="h-5 w-5 text-primary" />
                  </motion.button>

                </div>

              </div>

              {/* Navigation comes next */}
              {/* ========================= */}
              {/* CENTER NAVIGATION */}
              {/* ========================= */}

              <div
                className="
                  flex
                  flex-1
                  items-center
                  px-8
                "
              >
                <nav className="w-full space-y-2">
                  {navLinks.map((link, index) => {
                    const active = isActive(link.href);

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.15 + index * 0.08,
                          duration: 0.45,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="
                            group
                            flex
                            items-center
                            justify-between

                            rounded-3xl

                            px-6
                            py-5

                            transition-all
                            duration-300

                            hover:bg-white/5
                          "
                        >
                          <div className="flex items-center gap-5">

                            <span
                              className={`
                                text-5xl
                                font-bold
                                tracking-tight
                                transition-colors
                                duration-300

                                ${
                                  active
                                    ? "text-primary"
                                    : "text-primary/80 group-hover:text-primary"
                                }
                              `}
                            >
                              {link.label}
                            </span>

                            {active && (
                              <motion.div
                                layoutId="mobile-active-dot"
                                className="h-3 w-3 rounded-full bg-primary"
                              />
                            )}

                          </div>

                          <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            whileHover={{
                              x: 0,
                              opacity: 1,
                            }}
                            className="
                              text-3xl
                              text-primary
                            "
                          >
                            →
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* ========================= */}
              {/* BOTTOM SECTION */}
              {/* ========================= */}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.55,
                  duration: 0.5,
                }}
                className="
                  border-t
                  border-white/10

                  px-8
                  py-8
                "
              >
                <div className="space-y-6">

                  {/* Contact */}

                  <div className="space-y-3 px-8">

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
                      <Phone className="h-5 w-5" />

                      <span className="text-lg text-primary/80">
                        +27 61 637 5776
                      </span>
                    </Link>

                    <p className="text-sm text-primary/80">
                      Premium Laundry Service
                    </p>

                    <p className="text-sm text-primary/80">
                      Cape Town, South Africa
                    </p>

                  </div>

                  {/* CTA */}

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() => {
                      setMobileOpen(false);
                      setOpen(true);
                    }}
                    className="
                      w-full

                      rounded-2xl

                      gradient-cta

                      py-4 mb-10

                      text-base
                      font-semibold

                      text-brand-red-foreground

                      shadow-[0_20px_60px_rgba(220,38,38,.35)]
                    "
                  >
                    Schedule Pickup
                  </motion.button>

                </div>
              </motion.div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
      
      
    </header>
  );
}
