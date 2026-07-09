"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./navigation/Logo";
import { PickupDialog } from "./booking/PickupDialog";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="relative z-40 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">    
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link
                href="tel:+27616375776"
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-foreground/70"
              >
                <Phone className="h-4 w-4" />
                +27 61 637 5776
              </Link>
            <button
              onClick={()=> setOpen(true)}
              className="rounded-full gradient-cta px-6 py-2.5 text-sm font-semibold text-brand-red-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Schedule a Pickup
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-muted hover:text-primary ${
                    isActive(link.href) ? "bg-primary/10 text-primary" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="tel:+27616375776"
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-foreground/70"
              >
                <Phone className="h-4 w-4" />
                +27 61 637 5776
              </Link>
              <button
                onClick={()=> setOpen(true)}
                className="rounded-full gradient-cta px-6 py-2.5 text-sm font-semibold text-brand-red-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Schedule a Pickup
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <PickupDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </header>
  );
}
