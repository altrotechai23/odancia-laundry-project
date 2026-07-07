"use client"

import { motion } from "framer-motion"

interface MotionFadeProps {
  children: React.ReactNode
  delay?: number
}

export function MotionFade({
  children,
  delay = 0,
}: MotionFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}