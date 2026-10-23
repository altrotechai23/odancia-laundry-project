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
        {/* Main Grid: Set to grid-cols-5 to achieve the clean 3/5 width ratio */}
        <div className="grid items-center gap-16 lg:grid-cols-5 lg:gap-24">
          
          {/* IMAGE / VISUAL LEFT SIDE (Occupies exactly 3/5 of the width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-3 w-full"
          >
            {/* Elegant Image Container with thin border accent */}
            <div className="relative p-2 rounded-[36px] bg-white border border-neutral-200/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)]">
              <div className="relative overflow-hidden rounded-[28px]">
                <img 
                  src="/odancia-laundry-final.jpeg" 
                  alt="Cape Town's Premium Laundry" 
                  className="aspect-[4/3] lg:aspect-[16/10] w-full object-cover grayscale-[15%] transition-all duration-700 hover:scale-[1.02] hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Minimal Floating Badge */}
              <div className="absolute bottom-8 left-8 rounded-full bg-white/95 backdrop-blur-md px-6 py-3 border border-neutral-200 shadow-sm">
                <span className="text-sm font-medium text-neutral-800 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Premium Laundry Care
                </span>
              </div>
            </div>
          </motion.div>

          {/* TEXT CONTENT RIGHT SIDE (Occupies remaining 2/5 of the width) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center lg:col-span-2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red mb-3 block">
              About Us
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-6">
              Eco-Friendly Care For Your Wardrobe
            </h2>
            <p className="text-base leading-relaxed text-neutral-600 mb-8">
              We provide Cape Town with premium, sustainable fabric care. From everyday essentials to delicate couture, our specialized modern processes ensure your clothing looks newer for longer, without harming the environment.
            </p>

            {/* Quick Benefits List */}
            <ul className="space-y-4 mb-8">
              {[
                { icon: Leaf, text: "100% Non-toxic biodegradable detergents" },
                { icon: Clock3, text: "Fast 24-48 hour turnaround options" },
                { icon: Wallet, text: "Transparent pricing with no hidden fees" }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-neutral-700 font-medium">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#booking" 
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800 shadow-md hover:shadow-lg"
              >
                Book a Pickup
              </a>
              <a 
                href="tel:+27210000000" 
                className="inline-flex items-center justify-center rounded-full bg-white border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-neutral-50"
              >
                <Phone className="mr-2 h-4 w-4" /> Call Concierge
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
