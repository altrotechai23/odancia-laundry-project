"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./navigation/Logo";
import { PickupDialog } from "./booking/PickupDialog";

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
    <header className="relative z-400 bg-transparent">
     

      <motion.div
        animate={{
          opacity: mobileOpen ? 0 : 1,
          y: mobileOpen ? -20 : 0,
          scale: mobileOpen ? 0.98 : 1,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between md:h-20">    
          <Logo />
          <nav 
          className="
  hidden
  items-center

  rounded-full

  border
  border-white/10

  bg-white/[0.04]

  p-1.5

  shadow-[0_10px_40px_rgba(0,0,0,.18)]

  backdrop-blur-2xl

  supports-[backdrop-filter]:bg-white/[0.05]

  md:flex
"
           
           
           >
            
            
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
  group
  relative
  overflow-hidden

  rounded-full

  px-6
  py-3

  text-sm
  font-medium
  tracking-wide

  transition-all
  duration-300

  ${
    active
      ? "text-primary"
      : "text-foreground/70 hover:text-foreground"
  }
`}
                >
                  {active && (
                    <motion.div
                      layoutId="navbar-active"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                      className="absolute inset-0 rounded-full bg-primary/10"
                    />
                  )}

                  <span className="relative z-10">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

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
                  scale: .97,
                }}
                transition={{
                  duration: .25,
                }}
                onClick={() => setOpen(true)}
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

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.div>

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
              bg-slate-800
              backdrop-blur-3xl
              md:hidden
            "
          >
            {/* Background decorations */}

            <div className="absolute inset-0 overflow-hidden">

              <div
                className="
                  absolute
                  -top-40
                  -right-40

                  h-96
                  w-96

                  rounded-full

                  bg-primary/15

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
                    <X className="h-5 w-5 text-white" />
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
                                    : "text-white group-hover:text-primary"
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

                  <div className="space-y-3">

                    <Link
                      href="tel:+27616375776"
                      className="
                        flex
                        items-center
                        gap-3

                        text-white/80

                        transition-colors

                        hover:text-primary
                      "
                    >
                      <Phone className="h-5 w-5" />

                      <span className="text-lg">
                        +27 61 637 5776
                      </span>
                    </Link>

                    <p className="text-sm text-white/50">
                      Premium Laundry Service
                    </p>

                    <p className="text-sm text-white/40">
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
