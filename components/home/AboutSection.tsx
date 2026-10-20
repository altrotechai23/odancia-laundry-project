"use client"

import { motion } from "framer-motion"
import {
  Check,
  Phone,
  Wallet,
  Leaf,
  Clock3,
} from "lucide-react"

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-24 lg:py-32">
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-50/50 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-24">
          
          {/* IMAGE / VISUAL LEFT SIDE (Spans 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
          >
            {/* Elegant Image Container with thin border accent */}
            <div className="relative p-2 rounded-[36px] bg-white border border-neutral-200/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)]">
              <div className="relative overflow-hidden rounded-[28px]">
                <img 
                  src="/side.jpeg" 
                  alt="Cape Town's Premium Laundry" 
                  className="aspect-[4/5] w-full object-cover grayscale-[15%] transition-all duration-700 hover:scale-102 hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Minimal Floating Badge */}
              <div className="absolute bottom-8 left-8 rounded-full bg-white/95 backdrop-blur-md px-6 py-3 border border-neutral-100 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <p className="text-xs font-semibold tracking-wider text-neutral-900 uppercase flex items-center gap-2">
                  <span className="text-amber-500">★</span> Cape Town's Premium Laundry
                </p>
              </div>
            </div>
          </motion.div>

          {/* CONTENT RIGHT SIDE (Spans 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-xs uppercase tracking-[0.4em] font-semibold text-brand-red/90">
              Est. Many Years Of Experience
            </p>

            <h2 className="mt-5 text-4xl font-light tracking-tight text-blue-900 sm:text-5xl lg:leading-[1.15]">
              We Are Passionate <br />
              <span className="font-serif italic font-normal text-neutral-800">
                About Perfect Garment Care
              </span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-neutral-500 font-light max-w-xl">
              Odancia Laundry provides bespoke garment care, tailored 
              collection & delivery suites, and eco-conscious cleaning innovations 
              crafted around your schedule.
            </p>

            {/* Checklist */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                "100% Client Satisfaction Guaranteed",
                "White-Glove Collection & Delivery",
                "Transparent, Value-Driven Pricing",
                "Artisanal & Premium Fabric Care",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-900">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Unit */}
            <div className="mt-12 flex flex-wrap items-center gap-8 pt-8 border-t border-neutral-200/60">
              <a
                href="tel:+27718385010"
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-red-800
                  px-8
                  py-4
                  text-sm
                  font-medium
                  text-white
                  shadow-lg
                  shadow-neutral-900/10
                  transition-all
                  hover:bg-blue-800
                  hover:shadow-xl
                "
              >
                <Phone className="h-4 w-4" />
                Arrange a Collection
              </a>

              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                  Available Concierge 24/7
                </span>
                <a href="tel:+27718385010" className="text-lg font-medium text-neutral-900 tracking-tight hover:text-brand-red transition-colors">
                  +27 71 838 5010
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards Section */}
        <div className="mt-32 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Clock3,
              title: "Save Time & Energy",
              desc: "Skip the routine laundry days entirely. We gracefully handle the entire transition from doorstep to premium clean and back."
            },
            {
              icon: Wallet,
              title: "Seamless Payments",
              desc: "Effortless transactional flexibility across digital gateways, Secure EFT, card payments or bespoke corporate billing solutions."
            },
            {
              icon: Leaf,
              title: "Sustainable Heritage",
              desc: "Environmentally sound practices that perfectly look after delicate natural silks, cashmeres, and high-performance garments."
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="
                group
                rounded-[24px]
                border
                border-neutral-200/50
                bg-white
                p-8
                shadow-[0_8px_30px_rgb(0,0,0,0.01)]
                transition-all
                hover:shadow-[0_24px_50px_rgba(0,0,0,0.04)]
                hover:border-neutral-200
              "
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 group-hover:bg-brand-red/5 group-hover:border-brand-red/10 transition-colors">
                <card.icon className="h-5 w-5 text-neutral-700 group-hover:text-brand-red transition-colors" />
              </div>

              <h3 className="text-lg font-medium text-neutral-900 tracking-tight">
                {card.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-500 font-light">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
