"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Truck,
  ShieldCheck,
} from "lucide-react";

interface PickupServicesSectionProps {
  onSchedulePickup: () => void;
}

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
] as const;

const benefits = [
  "Free pickup & delivery in selected areas",
  "24-hour turnaround on most garments",
  "Premium detergents safe for luxury fabrics",
  "Real-time order updates via WhatsApp",
  "Commercial & residential laundry services",
] as const;

export function PickupServicesSection({
  onSchedulePickup,
}: PickupServicesSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-100/70 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-red-100/70 blur-[120px]" />

        <div className="absolute left-1/2 top-20 hidden -translate-x-1/2 opacity-60 xl:block">
          <div className="grid grid-cols-6 gap-3">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="h-2 w-2 rounded-full bg-[#1E5CB8]/15"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ========================================================= */}
          {/* LEFT — IMAGES + FEATURE CARDS */}
          {/* ========================================================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Blue accent shape */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-0
                h-40
                w-64
                -translate-x-1/2
                rounded-[2rem]
                bg-[#1E5CB8]
                sm:h-44
                sm:w-72
              "
            />

            {/* Images */}
            <div className="relative grid grid-cols-2 gap-3 sm:gap-5">
              {/* Image 1 */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                  rotate: -2,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: -2,
                }}
                whileHover={{
                  y: -8,
                  rotate: -3,
                }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                }}
                className="
                  relative
                  z-20
                  overflow-hidden
                  rounded-[1.75rem]
                  border-[6px]
                  border-white
                  bg-white
                  shadow-[0_30px_80px_rgba(0,0,0,.16)]
                  sm:rounded-[2.1rem]
                  sm:border-[10px]
                "
              >
                <Image
                  src="/odancia-side-section.png"
                  alt="Odancia Laundry pickup service"
                  width={700}
                  height={900}
                  sizes="(max-width: 640px) 45vw, 350px"
                  className="h-[300px] w-full object-cover sm:h-[420px]"
                />
              </motion.div>

              {/* Image 2 */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                  rotate: 2,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: 2,
                }}
                whileHover={{
                  y: -8,
                  rotate: 3,
                }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                }}
                className="
                  relative
                  mt-10
                  overflow-hidden
                  rounded-[1.75rem]
                  border-[6px]
                  border-white
                  bg-white
                  shadow-[0_30px_80px_rgba(0,0,0,.16)]
                  sm:mt-12
                  sm:rounded-[2.1rem]
                  sm:border-[10px]
                "
              >
                <Image
                  src="/odancia-side-section-5.png"
                  alt="Odancia Laundry delivery service"
                  width={700}
                  height={900}
                  sizes="(max-width: 640px) 45vw, 350px"
                  className="h-[300px] w-full object-cover sm:h-[420px]"
                />
              </motion.div>
            </div>

            {/* Feature cards */}
            <div className="relative z-30 -mt-10 grid gap-3 sm:-mt-14 sm:grid-cols-3 sm:gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isBlue = feature.color === "blue";

                return (
                  <motion.div
                    key={feature.title}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.1,
                    }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className={`
                      rounded-[1.5rem]
                      p-5
                      shadow-[0_25px_70px_rgba(0,0,0,.16)]
                      sm:rounded-[1.75rem]
                      sm:p-6
                      ${
                        isBlue
                          ? "bg-[#1E5CB8]"
                          : "bg-[#C73545]"
                      }
                    `}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 sm:h-14 sm:w-14">
                      <Icon
                        className="h-6 w-6 text-white sm:h-7 sm:w-7"
                        strokeWidth={1.8}
                      />
                    </div>

                    <h3 className="mt-5 text-lg font-bold leading-tight text-white sm:text-xl">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/85">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT — CONTENT */}
          {/* ========================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-blue-50 px-4 py-2.5 sm:px-5 sm:py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1E5CB8] shadow-[0_0_0_5px_rgba(30,92,184,.08)]" />

              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1E5CB8] sm:text-sm">
                Premium Laundry Service
              </span>
            </div>

            {/* Heading */}
            <h2
              className="
                mt-7
                max-w-2xl
                text-[2.65rem]
                font-black
                leading-[0.98]
                tracking-[-0.045em]
                text-[#1E5CB8]
                sm:text-5xl
                lg:text-6xl
                xl:text-[4.25rem]
              "
            >
              We Pick Up.
              <br />
              We Clean.
              <br />
              <span className="text-[#C73545]">
                We Deliver.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8">
              Skip the hassle of laundry day. Odancia Laundry
              provides professional washing, dry cleaning,
              ironing, sneaker restoration and convenient
              pickup & delivery across Cape Town.
            </p>

            {/* Benefits */}
            <div className="mt-9 space-y-4 sm:mt-11 sm:space-y-5">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div
                    className="
                      mt-0.5
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#1E5CB8]
                      shadow-[0_8px_20px_rgba(30,92,184,.18)]
                      sm:h-8
                      sm:w-8
                    "
                  >
                    <svg
                      className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4"
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

                  <p className="text-base font-medium leading-7 text-slate-700 sm:text-lg">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-4">
              <motion.button
                type="button"
                onClick={onSchedulePickup}
                whileHover={{
                  y: -2,
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-full
                  bg-[#C73545]
                  px-8
                  py-4
                  text-base
                  font-bold
                  text-white
                  shadow-[0_20px_60px_rgba(199,53,69,.3)]
                  transition-shadow
                  duration-300
                  hover:shadow-[0_25px_70px_rgba(199,53,69,.42)]
                  sm:px-9
                  sm:py-5
                  sm:text-lg
                "
              >
                <span className="relative z-10">
                  Schedule Pickup
                </span>

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-white/10
                    transition-transform
                    duration-500
                    group-hover:translate-x-0
                  "
                />
              </motion.button>

              <motion.a
                href="/services"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-[#1E5CB8]
                  px-8
                  py-4
                  text-base
                  font-bold
                  text-[#1E5CB8]
                  transition-all
                  duration-300
                  hover:bg-[#1E5CB8]
                  hover:text-white
                  sm:px-9
                  sm:py-5
                  sm:text-lg
                "
              >
                Explore Services
              </motion.a>
            </div>

            {/* Statistics */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8 sm:mt-16 sm:gap-8 sm:pt-10">
              <div>
                <h3 className="text-3xl font-black tracking-tight text-[#1E5CB8] sm:text-4xl">
                  24H
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:mt-2 sm:text-sm">
                  Average Turnaround
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black tracking-tight text-[#C73545] sm:text-4xl">
                  100%
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:mt-2 sm:text-sm">
                  Fabric Safe
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black tracking-tight text-[#1E5CB8] sm:text-4xl">
                  5★
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:mt-2 sm:text-sm">
                  Customer Rating
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative floating shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        aria-hidden="true"
        className="pointer-events-none absolute left-10 top-24 hidden lg:block"
      >
        <div className="h-28 w-28 rounded-full border border-[#1E5CB8]/20 bg-[#1E5CB8]/5 backdrop-blur-xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-12 hidden xl:block"
      >
        <div className="h-40 w-40 rounded-full border border-[#C73545]/20 bg-[#C73545]/5 backdrop-blur-xl" />
      </motion.div>

      {/* Bottom brand accent */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#1E5CB8] via-[#C73545] to-[#1E5CB8]"
      />
    </section>
  );
}
