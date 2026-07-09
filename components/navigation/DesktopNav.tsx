"use client";

import { NavItem } from "./NavItem";
import { NAV_LINKS } from "./constants";
import { DesktopNavProps } from "./types";

export function DesktopNav({
  pathname,
}: DesktopNavProps) {
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="
        hidden
        lg:flex
        items-center
      "
    >
      {/* Glass Container */}

      <div
        className="relative
          flex
          items-center
          gap-2

          rounded-full

          border
          border-white/10

          bg-white/[0.03]

          px-3
          py-2

          backdrop-blur-2xl

          shadow-[0_20px_80px_rgba(0,0,0,.25)]
        "
      >
        {/* Background Glow */}

        <div className="absolute inset-0  rounded-full  bg-gradient-to-r from-brand-red/5  via-transparent to-blue-500/5  pointer-events-none"
        />

        {NAV_LINKS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            active={isActive(item.href)}
          />
        ))}
      </div>
    </nav>
  );
}