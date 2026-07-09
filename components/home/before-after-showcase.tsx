"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const BeforeAfterSlider = dynamic(
  () =>
    import("@/components/home/before-after-slider").then(
      (mod) => mod.BeforeAfterSlider
    ),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-4/3 w-full animate-pulse rounded-[24px] bg-white/5" />
    ),
  }
)

const showcases = [
  {
    title: "Sneaker Restoration",
    description:
      "Deep cleaning and restoration bringing premium sneakers back to life.",
    before: "/shoe-before.png",
    after: "/shoe-after.png",
  },
  {
    title: "Luxury Garment Care",
    description:
      "Advanced fabric treatment preserving quality, softness, and elegance.",
    before: "/cloth-before.png",
    after: "/cloth-after.png",
  },
]

export function BeforeAfterShowcase() {
  
  return (
    <section className="relative overflow-hidden  py-24 sm:py-32  gradient-banner">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-brand-red/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-white/5 blur-[140px]" />
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
              Transformation Showcase
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            See The
            <span className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Difference Instantly
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white/60">
            Every garment is handled with precision care,
            advanced cleaning technology, and luxury finishing.
          </p>
        </motion.div>

        {/* SHOWCASES */}
        <div className="mt-28 space-y-32">
          {showcases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              className={`grid gap-12 items-center lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              {/* TEXT */}
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
                  Premium Results
                </div>

                <h3 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
                  {item.description}
                </p>

                {/* FEATURES */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Fabric Safe",
                    "Luxury Finish",
                    "Deep Cleaning",
                    "Fast Turnaround",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/70 backdrop-blur-xl"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* SLIDER */}
              <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-black/3 p-3 backdrop-blur-xl">
                {/* GLOW */}
                <div className="absolute inset-0 bg-linear-to-br from-brand-red/10 via-transparent to-white/5" />

                <div className="relative overflow-hidden rounded-[24px]">
                  <BeforeAfterSlider
                    before={item.before}
                    after={item.after}
                  />
                </div>

                {/* LABELS */}
                <div className="pointer-events-none absolute left-6 top-6 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">
                  Before
                </div>

                <div className="pointer-events-none absolute right-6 top-6 rounded-full bg-brand-red px-4 py-2 text-sm font-medium text-white">
                  After
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}