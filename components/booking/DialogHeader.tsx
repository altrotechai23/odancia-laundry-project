"use client";

import { X } from "lucide-react";

interface DialogHeaderProps {
  onClose: () => void;
}

export function DialogHeader({
  onClose,
}: DialogHeaderProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between

        px-6
        pt-5
      "
    >
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">
          Odancia Laundry
        </p>

        <h2 className="mt-1 text-lg font-semibold text-white">
          Schedule Pickup
        </h2>
      </div>

      <button
        onClick={onClose}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-full

          border
          border-white/10

          bg-white/5

          text-white
        "
      >
        <X size={18} />
      </button>
    </div>
  );
}