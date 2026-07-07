"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CalendarCheck,
  Bike,
  Sparkles,
  Shirt,
  ArrowRight,
} from "lucide-react"

import { PickupDialog } from "@/components/booking/PickupDialog"

const steps = [
  {
    icon: CalendarCheck,
    number: "01",
    title: "Book a Pickup",
    description:
      "Schedule your laundry pickup online in less than a minute.",
  },
  {
    icon: Bike,
    number: "02",
    title: "We Collect",
    description:
      "Our team arrives at your doorstep for fast and secure collection.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Expert Cleaning",
    description:
      "Your garments are cleaned, treated, and professionally finished.",
  },
  {
    icon: Shirt,
    number: "04",
    title: "Delivered Fresh",
    description:
      "Freshly folded and packaged laundry delivered back to you.",
  },
]

export function ProcessSection() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden py-24 sm:py-32">
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          animate={{
            scale: [1, 1.08, 1],
            x: [0, -20, 0],
            y: [0, 12, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <source src="/bubbles.mp4" type="video/mp4" />
        </motion.video>

        {/* Luxury slate overlay */}
        <div className="absolute inset-0 bg-blue-950/20" />

        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-950/30 to-blue-950/90" />

        {/* Ambient lighting */}
        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-brand-red/15 blur-[150px]" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-white/5 blur-[150px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-brand-red-foreground">
              How It Works
            </p>

            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Laundry Made
              <span className="block text-brand-red-foreground">
                Effortless
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-white/70">
              From pickup to delivery, we handle every step with
              premium care and convenience.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-brand-red/40"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-white/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Number */}
                  <div className="absolute right-6 top-6 text-5xl font-bold text-white/5">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <div className="relative mt-8">
                    <h3 className="text-2xl font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-relaxed text-white/65">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Glow */}
                  <div className="absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-brand-red/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20 flex justify-center"
          >
            <button
              onClick={() => setOpen(true)}
              className="group inline-flex items-center gap-3 rounded-full bg-brand-red px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600"
            >
              Book Your Pickup

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>

      <PickupDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}