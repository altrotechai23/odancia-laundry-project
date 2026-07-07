"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Shirt,
  Sparkles,
  WashingMachine,
  Truck,
  Clock3,
  ShieldCheck,
} from "lucide-react"

const services = [
  {
    title: "Premium Laundry",
    description:
      "Luxury washing and folding with garment-safe products and precision finishing.",
    icon: Shirt,
    size: "large",
  },
  {
    title: "Dry Cleaning",
    description:
      "Professional fabric care for delicate and premium garments.",
    icon: Sparkles,
    size: "small",
  },
  {
    title: "Express Service",
    description:
      "Same-day and 24-hour turnaround for urgent cleaning needs.",
    icon: Clock3,
    size: "small",
  },
  {
    title: "Pickup & Delivery",
    description:
      "Fast doorstep collection and delivery anywhere across Cape Town.",
    icon: Truck,
    size: "medium",
  },
  {
    title: "Sneaker Restoration",
    description:
      "Deep sneaker cleaning and restoration for premium footwear.",
    icon: WashingMachine,
    size: "medium",
  },
  {
    title: "Fabric Protection",
    description:
      "Advanced fabric-safe treatment to preserve quality and longevity.",
    icon: ShieldCheck,
    size: "large",
  },
]

export function ServicesBento() {
  return (
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
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-5 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-brand-red" />

            <span className="text-sm text-white/70">
              Premium Services
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Luxury Garment Care,
            <span className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Engineered For Modern Living
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white/60">
            Experience a seamless premium laundry solution
            combining speed, precision, technology, and luxury
            care for every garment.
          </p>
        </motion.div>

        {/* SERVICES GRID */}
        <div className="mt-20 grid auto-rows-[260px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              className={`
                group relative overflow-hidden rounded-[32px]
                border border-white/10
                bg-slate-950/40
                backdrop-blur-2xl
                transition-all duration-500

                hover:border-white/20
                hover:bg-slate-900/50
                hover:shadow-[0_25px_60px_rgba(0,0,0,0.45)]
                hover:-translate-y-2

                ${
                  service.size === "large"
                    ? "lg:col-span-2"
                    : ""
                }

                ${
                  service.size === "medium"
                    ? "md:col-span-2 lg:col-span-1"
                    : ""
                }
              `}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-brand-red/[0.10] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Glow Border */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/10 via-transparent to-brand-red/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative flex h-full flex-col justify-between p-8">
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl transition-transform duration-500 group-hover:scale-110">
                  <service.icon className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-md leading-relaxed text-white/60">
                    {service.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80">
                    Learn More

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Bottom Glow */}
              <div className="absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-red/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 flex justify-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-red px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-brand-red/20 transition-all duration-300 hover:scale-105 hover:bg-red-600"
          >
            Explore All Services

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}