"use client"
import {motion} from "framer-motion"

export function MotionWrapper({ children } : {
  children: React.ReactNode
}) {
  return (
    <motion.div>
      {children}
    </motion.div>
  )
}