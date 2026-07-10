"use client";

import { Menu } from "lucide-react";

interface MobileMenuButtonProps {
  onOpen: () => void;
}

export function MobileMenuButton({
  onOpen,
}: MobileMenuButtonProps) {
  return (
    <button
      onClick={onOpen}
      className="
        flex
        h-12
        w-12
        items-center
        justify-center

        rounded-full

        transition-colors

        hover:bg-muted

        md:hidden
      "
      aria-label="Open menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}