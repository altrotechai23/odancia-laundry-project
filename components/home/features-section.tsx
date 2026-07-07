"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  Clock3,
  Sparkles,
  Truck,
  Shirt,
  Leaf,
  ArrowRight,
} from "lucide-react"

import { PickupDialog } from "@/components/booking/PickupDialog"

const features = [
  {
    title: "Premium Fabric Care",
    description:
      "Every garment is treated with luxury-grade products and advanced care techniques.",
    icon: Sparkles,
  },
  {
    title: "Fast Turnaround",
    description:
      "Same-day and next-day delivery options designed for modern lifestyles.",
    icon: Clock3,
  },
  {
    title: "Free Pickup & Delivery",
    description:
      "Convenient doorstep collection and delivery across Cape Town.",
    icon: Truck,
  },
  {
    title: "Eco-Friendly Process",
    description:
      "Sustainable cleaning solutions that are safe for garments and the environment.",
    icon: Leaf,
  },
  {
    title: "Garment Protection",
    description:
      "Specialized handling to preserve texture, color, and fabric longevity.",
    icon: ShieldCheck,
  },
  {
    title: "Luxury Finishing",
    description:
      "Precision ironing, folding, and finishing for a premium presentation.",
    icon: Shirt,
  },
]

export function FeaturesSection() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden gradient-banner py-24 sm:py-32">
        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-brand-red/10 blur-[120px]" />

          <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-white/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-brand-red" />

              <span className="text-sm text-white/70">
                Why Choose Us
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Premium Laundry Experience
              <span className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                Designed Around You
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-white/60">
              Combining technology, convenience, and expert garment
              care to deliver a seamless modern laundry experience.
            </p>
          </motion.div>

          {/* FEATURES GRID */}
          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]"
              >
                {/* HOVER GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.08] via-transparent to-white/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* ICON */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl">
                  <feature.icon className="h-7 w-7" />
                </div>

                {/* CONTENT */}
                <div className="relative mt-8">
                  <h3 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-white/60">
                    {feature.description}
                  </p>
                </div>

                {/* BOTTOM GLOW */}
                <div className="absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-brand-red/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-20 grid gap-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:grid-cols-3"
          >
            {[
              {
                value: "1.5K+",
                label: "Satisfied Clients",
              },
              {
                value: "24h",
                label: "Average Turnaround",
              },
              {
                value: "4.9★",
                label: "Customer Rating",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white">
                  {stat.value}
                </div>

                <div className="mt-2 text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20 overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl"
          >
            <div className="mx-auto max-w-3xl">
              <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                Ready For A Better Laundry Experience?
              </h3>

              <p className="mt-4 text-lg text-white/60">
                Schedule your pickup in under 60 seconds and let
                Odancia handle the rest.
              </p>

              <button
                onClick={() => setOpen(true)}
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-brand-red px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600"
              >
                Schedule Pickup

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
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