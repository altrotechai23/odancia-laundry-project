"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  MessageCircle,
  Truck,
  ShieldCheck,
} from "lucide-react"

const features = [
  {
    title: "Phone or Chat Service",
    description:
      "Make sure you can easily order by phone or chat.",
    icon: MessageCircle,
    color: "red",
  },
  {
    title: "Free Pick Up & Delivery",
    description:
      "This service makes it easy for you to do your laundry.",
    icon: Truck,
    color: "blue",
  },
  {
    title: "Safety & Cleanliness",
    description:
      "Professional handling with premium hygiene standards.",
    icon: ShieldCheck,
    color: "red",
  },
]

export function PickupServicesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">

      {/* Decorative Background */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-100 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-red-100 blur-[120px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT SIDE */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: .8,
            }}
            className="relative"
          >

            {/* Blue Shape */}

            <div
              className="
                absolute
                left-1/2
                top-0
                -translate-x-1/2

                h-44
                w-72

                rounded-[32px]

                bg-[#1E5CB8]
              "
            />

            {/* Images */}

            <div
              className="
                relative
                grid
                grid-cols-2
                gap-5
              "
            >
                      {/* Image 1 */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                  rotate: -2,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: -2,
                }}
                whileHover={{
                  y: -10,
                  rotate: -3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                }}
                className="
                  relative
                  z-20
                  overflow-hidden
                  rounded-[34px]
                  border-[10px]
                  border-white
                  bg-white
                  shadow-[0_30px_80px_rgba(0,0,0,.18)]
                "
              >
                <Image
                  src="/odancia-side-section.png"
                  alt="Laundry Pickup"
                  width={700}
                  height={900}
                  priority
                  className="
                    h-[420px]
                    w-full
                    object-cover
                  "
                />
              </motion.div>

              {/* Image 2 */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                  rotate: 2,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: 2,
                }}
                whileHover={{
                  y: -10,
                  rotate: 3,
                }}
                transition={{
                  delay: .15,
                  type: "spring",
                  stiffness: 140,
                }}
                className="
                  relative
                  mt-12
                  overflow-hidden
                  rounded-[34px]
                  border-[10px]
                  border-white
                  bg-white
                  shadow-[0_30px_80px_rgba(0,0,0,.18)]
                "
              >
                <Image
                  src="/odancia-side-section-5.png"
                  alt="Laundry Delivery"
                  width={700}
                  height={900}
                  priority
                  className="
                    h-[420px]
                    w-full
                    object-cover
                  "
                />
              </motion.div>

            </div>

            {/* Floating Cards */}
            <div
              className="
                relative
                z-30
                -mt-14

                grid
                gap-5

                sm:grid-cols-3
              "
            >
              {features.map((feature, index) => {
                const Icon = feature.icon

                return (
                  <motion.div
                    key={feature.title}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * .15,
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.03,
                    }}
                    className={`
                      rounded-[28px]
                      p-7

                      shadow-[0_25px_70px_rgba(0,0,0,.18)]

                      ${
                        feature.color === "blue"
                          ? "bg-[#1E5CB8]"
                          : "bg-[#C73545]"
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-white/15
                      "
                    >
                      <Icon
                        className="
                          h-8
                          w-8
                          text-white
                        "
                      />
                    </div>

                    <h3
                      className="
                        mt-6
                        text-2xl
                        font-bold
                        leading-tight
                        text-white
                      "
                    >
                      {feature.title}
                    </h3>

                    <p className=" mt-4 text-base leading-7 text-white/90"
                        >
                        {feature.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>

          </motion.div>
                    {/* RIGHT CONTENT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: .8,
              delay: .15,
            }}
            className="relative">
            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-blue-100
                bg-blue-50
                px-5
                py-3
              "
            >
              <span className="h-3 w-3 rounded-full bg-[#1E5CB8]" />

              <span className="text-sm font-semibold tracking-wide text-[#1E5CB8]">
                Premium Laundry Service
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                mt-8
                max-w-xl
                text-4xl
                font-black
                leading-tight
                tracking-tight
                text-[#1E5CB8]

                sm:text-5xl

                lg:text-6xl
              "
            >
              We Pick Up,
              <br />
              Clean &
              <br />
              Deliver.
            </h2>

            {/* Description */}

            <p
              className="
                mt-8
                max-w-xl
                text-lg
                leading-9
                text-slate-600
              "
            >
              Skip the hassle of laundry day. Odancia Laundry
              offers professional washing, dry cleaning,
              ironing, sneaker restoration and free pickup &
              delivery across Cape Town, giving you premium
              garment care without leaving your home.
            </p>

            {/* Benefits */}

            <div className="mt-12 space-y-6">

              {[
                "Free pickup & delivery in selected areas",
                "24-hour turnaround on most garments",
                "Premium detergents safe for luxury fabrics",
                "Real-time order updates via WhatsApp",
                "Commercial & residential laundry services",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4"
                >
                  <div
                    className="
                      mt-1
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-[#1E5CB8]
                    "
                  >
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <p
                    className="
                      text-lg
                      font-medium
                      leading-8
                      text-slate-700
                    "
                  >
                    {item}
                  </p>
                </div>
              ))}

            </div>

            {/* CTA */}

            <div
              className="
                mt-14
                flex
                flex-col
                gap-5

                sm:flex-row
              "
            >
              <button
                className="
                  rounded-full
                  bg-[#C73545]
                  px-9
                  py-5
                  text-lg
                  font-semibold
                  text-white

                  shadow-[0_20px_60px_rgba(199,53,69,.35)]

                  transition-all
                  duration-500

                  hover:-translate-y-1
                  hover:shadow-[0_30px_80px_rgba(199,53,69,.45)]
                "
              >
                Schedule Pickup
              </button>

              <button
                className="
                  rounded-full
                  border-2
                  border-[#1E5CB8]
                  px-9
                  py-5
                  text-lg
                  font-semibold
                  text-[#1E5CB8]

                  transition-all
                  duration-500

                  hover:bg-[#1E5CB8]
                  hover:text-white
                "
              >
                Learn More
              </button>
            </div>

            {/* Bottom Statistics */}

            <div
              className="
                mt-16

                grid

                grid-cols-3

                gap-8

                border-t
                border-slate-200

                pt-10
              "
            >
              <div>
                <h3 className="text-4xl font-black text-[#1E5CB8]">
                  24H
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Average Turnaround
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#C73545]">
                  100%
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Fabric Safe Products
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#1E5CB8]">
                  5★
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Customer Rating
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
          {/* Decorative Floating Shapes */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="
          pointer-events-none
          absolute
          left-10
          top-24
          hidden
          lg:block
        "
      >
        <div
          className="
            h-28
            w-28
            rounded-full
            border
            border-[#1E5CB8]/20
            bg-[#1E5CB8]/5
            backdrop-blur-xl
          "
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: .3 }}
        className="
          pointer-events-none
          absolute
          right-12
          bottom-20
          hidden
          xl:block
        "
      >
        <div
          className="
            h-40
            w-40
            rounded-full
            border
            border-[#C73545]/20
            bg-[#C73545]/5
            backdrop-blur-xl
          "
        />
      </motion.div>

      {/* Decorative Dots */}

      <div className="
          absolute
          left-1/2
          top-24
          hidden
          -translate-x-1/2
          xl:block
        "
      >
        <div className="grid grid-cols-6 gap-3">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="
                h-2
                w-2
                rounded-full
                bg-[#1E5CB8]/15
              "
            />
          ))}
        </div>
      </div>

      {/* Bottom Accent Line */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-1
          w-full
          bg-gradient-to-r
          from-[#1E5CB8]
          via-[#C73545]
          to-[#1E5CB8]
        "
      />
    </section>
  )
}