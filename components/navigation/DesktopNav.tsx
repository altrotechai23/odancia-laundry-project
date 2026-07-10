"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
}

interface DesktopNavProps {
  navLinks: NavLink[];
  isActive: (href: string) => boolean;
}

export function DesktopNav({
  navLinks,
  isActive,
}: DesktopNavProps) {
  return (
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
  );
}