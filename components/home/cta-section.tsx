"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Phone,
  Sparkles,
} from "lucide-react"

import { PickupDialog } from "@/components/booking/PickupDialog"

export function CTASection() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden bg-black py-24 text-white">
        {/* Background */}
        <div className="absolute inset-0">
          {/* Gradient Glow */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/20 blur-3xl" />

          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70 backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4 text-brand-red" />
            Premium Pickup & Delivery Service
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-8 font-display text-5xl leading-[1] sm:text-6xl lg:text-7xl"
          >
            Your Laundry.
            <span className="block text-brand-red">
              Perfectly Handled.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            Join hundreds of happy clients across Cape Town
            enjoying premium laundry care with free pickup
            and delivery.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={() => setOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600"
            >
              Schedule Pickup

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href="tel:+27718385010"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Call Us Today
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3"
          >
            <div>
              <div className="text-4xl font-bold text-brand-red">
                1,500+
              </div>

              <p className="mt-2 text-white/60">
                Happy Clients
              </p>
            </div>

            <div>
              <div className="text-4xl font-bold text-brand-red">
                4.9★
              </div>

              <p className="mt-2 text-white/60">
                Average Rating
              </p>
            </div>

            <div>
              <div className="text-4xl font-bold text-brand-red">
                Same-Day
              </div>

              <p className="mt-2 text-white/60">
                Express Service
              </p>
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