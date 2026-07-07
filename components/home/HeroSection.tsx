"use client"

import Link from "next/link"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { useRef, useState } from "react"
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Wind,
  Droplets,
  Shirt,
} from "lucide-react"
import { Button } from "../ui/button"
import { PickupDialog } from "../booking/PickupDialog"


/* --- REVEAL OVERLAY --- */
const RevealOverlay = () => {
  const panelVariants : Variants = {
    initial: { y: 0 },
    animate: { 
      y: "-100%",
      transition: { 
        duration: 1.2, 
        ease: [0.645, 0.045, 0.355, 1],
      } 
    }
  };

  const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="fixed inset-0 z-100 flex pointer-events-none"
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          variants={panelVariants}
          className="h-full w-full backdrop-blur-xl border-r border-white/10"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
        />
      ))}
    </motion.div>
  );
};


function FloatingIcon({
  icon: Icon,
  className,
  delay = 0,
}: {
  icon: React.ElementType
  className: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon className="h-full w-full" />
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* Glass panel reveal overlay */}
      <RevealOverlay />
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover scale-105"
        >
          <source src="/odancia-vid.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/30 to-brand-red/20" />

        {/* SPOTLIGHT */}
        <div className="absolute left-1/2 top-0 h-500 w-500 -translate-x-1/2 rounded-full bg-brand-red/20 blur-[140px]" />
      </div>

      {/* GRID OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[80px_80px]" />

      {/* FLOATING ICONS */}
      <FloatingIcon
        icon={Sparkles}
        className="left-[10%] top-[30%] h-6 w-6 text-white/20"
      />

      <FloatingIcon
        icon={Wind}
        className="right-[12%] top-[25%] h-10 w-10 text-white/20"
        delay={0.4}
      />

      <FloatingIcon
        icon={Droplets}
        className="bottom-[18%] left-[12%] h-8 w-8 text-white/20"
        delay={0.8}
      />

      <FloatingIcon
        icon={Shirt}
        className="bottom-[20%] right-[15%] h-10 w-10 text-white/20"
        delay={1}
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          style={{ y }}
          className="max-w-4xl"
        >
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-xl"
          >
            <span className="h-2 w-2 rounded-full bg-brand-red" />
            <span className="text-sm font-medium tracking-wide text-white/80">
              Cape Town’s Premium Laundry Service
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-display text-5xl font-semibold leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[8rem]"
          >
            Laundry
            <span className="block bg-linear-to-r from-brand-red to-red-300 bg-clip-text text-transparent">
              Reimagined
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Experience luxury garment care with premium washing,
            dry cleaning, sneaker restoration, and free pickup &
            delivery across Cape Town.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-5"
          >

             <Button
                variant="primary"
                className="group"
                onClick={() => setOpen(true)}
              >
                Schedule Pickup

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-14 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4"
          >
            {[
              {
                value: "4.9★",
                label: "Client Rating",
              },
              {
                value: "1.5K+",
                label: "Happy Clients",
              },
              {
                value: "24h",
                label: "Fast Delivery",
              },
              {
                value: "100%",
                label: "Premium Care",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <div className="text-2xl font-bold text-white">
                  {item.value}
                </div>

                <div className="mt-1 text-sm text-white/60">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
      <PickupDialog
              open={open}
              onClose={() => setOpen(false)}
            />
    </section>
  )
}