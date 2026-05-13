"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

export function Marquee({ items, speed = 30, className = "" }: MarqueeProps) {
  const content = items.join(" * ") + " * ";
  const doubled = content + " " + content;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={{ x: [0, `-50%`] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="inline-block"
      >
        <span className="inline-block">{doubled}</span>
      </motion.div>
    </div>
  );
}
