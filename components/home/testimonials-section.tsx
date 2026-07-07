"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Star,
  Quote,
  ArrowRight,
} from "lucide-react"

import { PickupDialog } from "@/components/booking/PickupDialog"

const testimonials = [
  {
    name: "Sarah M.",
    role: "Busy Professional",
    quote:
      "Absolutely the best laundry service in Cape Town. Fast pickup, perfect folding, and amazing customer service.",
  },
  {
    name: "Daniel K.",
    role: "Restaurant Owner",
    quote:
      "Their same-day turnaround has helped our business tremendously. Reliable and always professional.",
  },
  {
    name: "Lebo T.",
    role: "Fashion Designer",
    quote:
      "They handle delicate fabrics with incredible care. My garments always come back looking brand new.",
  },
]

export function TestimonialsSection() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden bg-neutral-950 py-24 text-white">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-brand-red">
              Testimonials
            </p>

            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Loved by
              <span className="block text-brand-red">
                Cape Town Clients
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Trusted by hundreds of families, professionals,
              and businesses across the city.
            </p>
          </motion.div>

          {/* Testimonials */}
          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
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

                {/* Quote */}
                <div className="absolute right-6 top-6 text-white/10">
                  <Quote className="h-16 w-16" />
                </div>

                {/* Stars */}
                <div className="relative flex gap-1 text-brand-red">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-current"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="relative mt-6 leading-relaxed text-white/75">
                  “{testimonial.quote}”
                </p>

                {/* Client */}
                <div className="relative mt-8 border-t border-white/10 pt-6">
                  <h3 className="text-lg font-semibold">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/50">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-col items-center justify-center text-center"
          >
            <h3 className="text-3xl font-semibold">
              Ready for Stress-Free Laundry?
            </h3>

            <p className="mt-4 max-w-2xl text-white/70">
              Experience premium laundry pickup and delivery
              with unmatched quality and convenience.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-brand-red px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600"
            >
              Schedule Pickup

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