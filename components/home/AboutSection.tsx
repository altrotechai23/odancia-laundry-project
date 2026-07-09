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
    <section className="relative overflow-hidden bg-white py-32">
      {/* Animated Background Circle */}
      <motion.div
        animate={{
            x: [-180, 80, -180],
            y: [-30, 30, -30],
        }}
        transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className="absolute  left-[-250px] top-[-100px]  h-900  w-900  rounded-full  bg-blue-200  pointer-events-none
        "
        />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* VIDEO */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[40px] bg-brand-red/10 blur-2xl" />
            <div className="relative  overflow-hidden  rounded-[32px]  border border-black/5 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.12)]">
              <video
                autoPlay  muted  loop  playsInline  className="aspect-video w-full object-cover">
                <source src="/odancia-vid.mp4" type="video/mp4" />
              </video>

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 rounded-full bg-white px-5 py-3 shadow-xl">
                <p className="font-medium text-black">
                  ★ Cape Town's Premium Laundry
                </p>
              </div>
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-brand-red">
              With Many Years Of Experience
            </p>

            <h2 className="mt-4 text-5xl font-bold leading-tight text-black lg:text-4xl">
              We Are Passionate
              <span className="block text-brand-red">
                About Laundry
              </span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-black/60">
              Odancia Laundry provides premium garment care,
              collection & delivery services, eco-friendly
              cleaning solutions, and exceptional customer
              support so you can focus on what matters most.
            </p>

            {/* Checklist */}
            <div className="mt-10 grid gap-4">
              {[
                "100% Customer Satisfaction",
                "Collection & Delivery",
                "Affordable Pricing",
                "Premium Garment Care",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10">
                    <Check className="h-5 w-5 text-brand-red" />
                  </div>

                  <span className="font-medium text-black">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <a
                href="tel:+27718385010"
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-brand-red
                  px-8
                  py-4
                  font-semibold
                  text-white
                  transition-all
                  hover:scale-105
                "
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>

              <div>
                <p className="text-sm text-black/50">
                  Available 24/7
                </p>

                <p className="text-lg font-semibold text-black">
                  +27 71 838 5010
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="mt-28 grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="
              rounded-3xl
              border
              border-black/5
              bg-white
              p-8
              shadow-lg
              transition-all
            "
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10">
              <Clock3 className="h-7 w-7 text-brand-red" />
            </div>

            <h3 className="text-2xl font-semibold text-black">
              Save Time & Money
            </h3>

            <p className="mt-4 leading-relaxed text-black/60">
              Skip the laundromat. We collect, clean,
              and deliver your garments back to your
              doorstep.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="
              rounded-3xl
              border
              border-black/5
              bg-white
              p-8
              shadow-lg
              transition-all
            "
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10">
              <Wallet className="h-7 w-7 text-brand-red" />
            </div>

            <h3 className="text-2xl font-semibold text-black">
              Easy Payments
            </h3>

            <p className="mt-4 leading-relaxed text-black/60">
              Multiple payment methods including card,
              EFT, mobile payment, and cash on delivery.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="
              rounded-3xl
              border
              border-black/5
              bg-white
              p-8
              shadow-lg
              transition-all
            "
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10">
              <Leaf className="h-7 w-7 text-brand-red" />
            </div>

            <h3 className="text-2xl font-semibold text-black">
              Eco-Friendly Care
            </h3>

            <p className="mt-4 leading-relaxed text-black/60">
              Environmentally responsible cleaning
              processes that are safe for garments,
              people, and the planet.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}