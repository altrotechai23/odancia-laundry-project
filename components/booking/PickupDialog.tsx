"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Sparkles, Truck, Clock3, Loader2, Check } from "lucide-react";
import { createPickup } from "@/app/actions/create-pickup"
import { Button } from "@/components/ui/button";

interface PickupDialogProps {
  open: boolean
  onClose: () => void
}


const services = [
  {
    id: "wash-fold",
    title: "Wash & Fold",
    description: "Professional washing and folding",
    icon: "🧺",
  },
  {
    id: "ironing",
    title: "Ironing",
    description: "Perfectly pressed garments",
    icon: "👔",
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    description: "Premium garment treatment",
    icon: "✨",
  },
  {
    id: "sneakers",
    title: "Sneaker Cleaning",
    description: "Restore your favorite sneakers",
    icon: "👟",
  },
  {
    id: "duvets",
    title: "Duvets & Blankets",
    description: "Large item cleaning",
    icon: "🛏️",
  },
  {
    id: "curtains",
    title: "Curtains",
    description: "Professional curtain care",
    icon: "🏠",
  },
  {
    id: "alterations",
    title: "Alterations",
    description: "Minor repairs & adjustments",
    icon: "✂️",
  },
]

const suburbs = [
  {
    name: "Cape Town CBD",
    fee: 0,
  },
  {
    name: "Long Street",
    fee: 0,
  },
  {
    name: "Foreshore",
    fee: 0,
  },

  {
    name: "Gardens",
    fee: 50,
  },
  {
    name: "Woodstock",
    fee: 50,
  },
  {
    name: "Sea Point",
    fee: 50,
  },
  {
    name: "Green Point",
    fee: 50,
  },
  {
    name: "De Waterkant",
    fee: 50,
  },

  {
    name: "Observatory",
    fee: 100,
  },
  {
    name: "Claremont",
    fee: 100,
  },
  {
    name: "Rondebosch",
    fee: 100,
  },
  {
    name: "Century City",
    fee: 100,
  },
  {
    name: "Bellville",
    fee: 100,
  },
  {
    name: "Durbanville",
    fee: 100,
  },
];

const pickupOptions = [
  {
    title: "ASAP",
    value: "ASAP",
    subtitle: "Next available driver",
    icon: "⚡",
  },
  {
    title: "Morning",
    value: "Morning",
    subtitle: "06:00 - 12:00",
    icon: "🌅",
  },
  {
    title: "Afternoon",
    value: "Afternoon",
    subtitle: "12:00 - 17:00",
    icon: "☀️",
  },
  {
    title: "Evening",
    value: "Evening",
    subtitle: "17:00 - 21:00",
    icon: "🌇",
  },
  {
    title: "Night",
    value: "Night",
    subtitle: "21:00 - 06:00",
    icon: "🌙",
  },
];

const quickTimes = [
  "Now",
  "30 Min",
  "1 Hour",
  "08:00",
  "12:00",
  "18:00",
  "21:00",
]

export function PickupDialog({
  open,
  onClose,
}: PickupDialogProps) {

  const [submitting, setSubmitting] = useState(false)

  const [success, setSuccess] = useState(false)
    const [step, setStep] = useState(0);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("");
    const [pickupDate, setPickupDate] = useState("")
    const [pickupTime, setPickupTime] = useState("")
    const [suburb, setSuburb] = useState("");
    const [notes, setNotes] = useState("");
    const [selectedZone, setSelectedZone] = useState("")
    const selectedSuburb = suburbs.find(
    (s) => s.name === suburb
    )

    const deliveryFee = selectedSuburb?.fee ?? 0;

    const toggleService = (id: string) => {
        setSelectedServices((prev) =>
            prev.includes(id)
            ? prev.filter((item) => item !== id)
            : [...prev, id]
        )
    }
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const nextStep = () => {
        setStep((prev) => prev + 1)
    }

    const prevStep = () => {
        setStep((prev) => prev - 1)
    }

    const getZoneFee = () => {
        switch (selectedZone) {
          case "CBD & Long Street":
            return "FREE"

          case "City Bowl":
            return "FREE"

          case "Atlantic Seaboard":
            return "R50"

          case "Southern Suburbs":
            return "R50"

          case "Northern Suburbs":
            return "R100"

          default:
            return "Custom Quote"
        }
    }

    const getServiceLabel = () => {
      if (selectedServices.length === 0)
        return "No services selected"

      return selectedServices.join(", ")
    }
    

const handleSubmit = async () => {
  try {
    setSubmitting(true)

    if (!selectedSuburb) {
      throw new Error("Please select an area")
    }

    await createPickup({
      customer_name: name,
      phone,
      services: selectedServices,

      // FIX HERE
      area: selectedSuburb.name,

      address,

      pickup_date: pickupDate,
      pickup_time: pickupTime,

      delivery_fee: deliveryFee,

      notes,
    })

    setSuccess(true)

  } catch (error) {
    console.error("Pickup submission failed:", error)

  } finally {
    setSubmitting(false)
  }
}

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md"
          />

          {/* SHEET */}
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            className="
              fixed inset-x-0 bottom-0 z-[100]
              h-[92vh]
              overflow-hidden
              rounded-t-[40px]
              border border-white/10
              bg-slate-950
              shadow-2xl
            "
          >
            {/* AMBIENT GLOW */}
            <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-brand-red/20 blur-[120px]" />

            <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-white/5 blur-[100px]" />

            {/* GRABBER */}
            <div className="flex justify-center pt-3">
              <div className="h-1.5 w-14 rounded-full bg-white/20" />
            </div>

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 pt-5">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Odancia Laundry
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  Schedule Pickup
                </h2>
              </div>

              <button
                onClick={onClose}
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/5
                  text-white
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* PROGRESS */}
            <div className="mt-6 px-6">
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
                  >
                    <motion.div
                      animate={{
                        width:
                          step >= item
                            ? "100%"
                            : "0%",
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="h-full bg-brand-red"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CONTENT */}
            <div className="relative h-full overflow-y-auto px-6 pb-32 pt-8">
              <AnimatePresence mode="wait">
                {success ? (

                  <motion.div
                  initial={{
                  opacity:0,
                  scale:.8
                  }}
                  animate={{
                  opacity:1,
                  scale:1
                  }}
                  className="
                  flex
                  h-full
                  flex-col
                  items-center
                  justify-center
                  text-center
                  px-6
                  "
                  >

                  <div
                  className="
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-full
                  bg-green-500/20
                  "
                  >

                  <motion.div
                  initial={{
                  scale:0
                  }}
                  animate={{
                  scale:1
                  }}
                  transition={{
                  delay:.2,
                  type:"spring"
                  }}
                  >

                  <Check
                  className="
                  h-14
                  w-14
                  text-green-400
                  "
                  />

                  </motion.div>

                  </div>


                  <h1
                  className="
                  mt-8
                  text-4xl
                  font-semibold
                  text-white
                  "
                  >
                  Pickup Scheduled
                  </h1>


                  <p
                  className="
                  mt-4
                  max-w-sm
                  text-white/60
                  "
                  >
                  Your laundry pickup request has been received.
                  Our team will contact you shortly.
                  </p>


                  <button
                  onClick={onClose}
                  className="
                  mt-10
                  rounded-full
                  bg-white
                  px-8
                  py-4
                  font-semibold
                  text-black
                  "
                  >
                  Done
                  </button>


                  </motion.div>

                  ) : (
                      <>
                {/* YOUR EXISTING CONTENT */}
                {step === 0 && (
                  <motion.div
                    key="welcome"
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -30,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="mx-auto max-w-md"
                  >
                    {/* ICON */}
                    <div
                      className="
                        mx-auto flex h-28 w-28
                        items-center justify-center
                        rounded-[32px]
                        border border-white/10
                        bg-white/5
                        backdrop-blur-xl
                      "
                    >
                      <Sparkles className="h-12 w-12 text-brand-red" />
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-8 text-center text-4xl font-semibold text-white">
                      Luxury Pickup
                    </h1>

                    <p className="mt-4 text-center text-white/60">
                      Schedule your laundry collection in
                      less than 60 seconds.
                    </p>

                    {/* FEATURES */}
                    <div className="mt-10 space-y-4">
                      <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                        <Truck className="h-5 w-5 text-brand-red" />

                        <div>
                          <p className="font-medium text-white">
                            Free CBD Pickup & Delivery
                          </p>

                          <p className="text-sm text-white/50">
                            Long Street & Cape Town CBD
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                        <Clock3 className="h-5 w-5 text-brand-red" />

                        <div>
                          <p className="font-medium text-white">
                            Open 24 Hours
                          </p>

                          <p className="text-sm text-white/50">
                            Pickup & delivery anytime
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      onClick={nextStep}
                      className="bg-green-500 text-white  mt-10 w-full rounded-2xl"
                    >
                      Start Booking
                    </Button>
                  </motion.div>
                )}

                {/* STEP 1 PLACEHOLDER */}
                {step === 1 && (
                    <motion.div
                        key="services"
                        initial={{
                        opacity: 0,
                        x: 40,
                        }}
                        animate={{
                        opacity: 1,
                        x: 0,
                        }}
                        exit={{
                        opacity: 0,
                        x: -40,
                        }}
                    >
                        <div className="mb-8">
                        <h2 className="text-3xl font-semibold text-white">
                            Select Services
                        </h2>

                        <p className="mt-2 text-white/60">
                            Choose all services required for your order.
                        </p>
                        </div>

                        <div className="space-y-4">
                        {services.map((service) => {
                            const active =
                            selectedServices.includes(service.id)

                            return (
                            <motion.button
                                whileTap={{
                                scale: 0.98,
                                }}
                                key={service.id}
                                onClick={() =>
                                toggleService(service.id)
                                }
                                className={`
                                w-full rounded-[28px]
                                border p-5 text-left
                                transition-all duration-300

                                ${
                                    active
                                    ? "border-brand-red bg-brand-red/10"
                                    : "border-white/10 bg-white/[0.03]"
                                }
                                `}
                            >
                                <div className="flex items-center gap-4">
                                <div
                                    className="
                                    flex h-14 w-14
                                    items-center justify-center
                                    rounded-2xl
                                    bg-white/5
                                    text-2xl
                                    "
                                >
                                    {service.icon}
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-white">
                                    {service.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-white/50">
                                    {service.description}
                                    </p>
                                </div>

                                <div
                                    className={`
                                    flex h-7 w-7 items-center
                                    justify-center rounded-full
                                    border

                                    ${
                                        active
                                        ? "border-brand-red bg-brand-red"
                                        : "border-white/20"
                                    }
                                    `}
                                >
                                    {active && (
                                    <span className="text-xs text-white">
                                        ✓
                                    </span>
                                    )}
                                </div>
                                </div>
                            </motion.button>
                            )
                        })}
                        </div>

                        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-sm text-white/60">
                            Selected Services
                        </p>

                        <p className="mt-1 text-lg font-semibold text-white">
                            {selectedServices.length}
                        </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                        <Button
                            variant="secondary"
                            className="flex-1"
                            onClick={prevStep}
                        >
                            Back
                        </Button>

                        <Button
                            className="flex-1 bg-green-500 text-white"
                            onClick={nextStep}
                            disabled={
                            selectedServices.length === 0
                            }
                        >
                            Continue
                        </Button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="details"
                        initial={{
                        opacity: 0,
                        x: 40,
                        }}
                        animate={{
                        opacity: 1,
                        x: 0,
                        }}
                        exit={{
                        opacity: 0,
                        x: -40,
                        }}
                    >
                        <div className="mb-8">
                        <h2 className="text-3xl font-semibold text-white">
                            Pickup Details
                        </h2>

                        <p className="mt-2 text-white/60">
                            Tell us where to collect your
                            laundry.
                        </p>
                        </div>

                        <div className="space-y-5">
                        <Input
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) =>
                            setName(e.target.value)
                            }
                            className="
                            h-14 rounded-2xl
                            border-white/10
                            bg-white/5
                            text-white
                            "
                        />

                        <Input
                            placeholder="Mobile Number"
                            value={phone}
                            onChange={(e) =>
                            setPhone(e.target.value)
                            }
                            className="
                            h-14 rounded-2xl
                            border-white/10
                            bg-white/5
                            text-white
                            "
                        />

                        <Input
                            placeholder="Email (Optional)"
                            value={email}
                            onChange={(e) =>
                            setEmail(e.target.value)
                            }
                            className="
                            h-14 rounded-2xl
                            border-white/10
                            bg-white/5
                            text-white
                            "
                        />

                        <Input
                            placeholder="Collection Address"
                            value={address}
                            onChange={(e) =>
                            setAddress(e.target.value)
                            }
                            className="
                            h-14 rounded-2xl
                            border-white/10
                            bg-white/5
                            text-white
                            "
                        />

                        <Select
                            value={suburb}
                            onValueChange={setSuburb}
                        >
                            <SelectTrigger
                            className="
                                h-14 w-full rounded-2xl
                                border-white/10
                                bg-white/5
                                text-white
                            "
                            >
                            <SelectValue placeholder="Select Area" />
                            </SelectTrigger>

                            <SelectContent className="bg-slate-900 border border-white/10 text-white z-4000">
                            {suburbs.map((item) => (
                                <SelectItem
                                key={item.name}
                                value={item.name}
                                className="text-white hover:bg-white/10"
                                >
                                {item.name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>

                        {/* DELIVERY CARD */}

                        {suburb && (
                            <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="
                                rounded-[28px]
                                border border-brand-red/20
                                bg-brand-red/10
                                p-5
                            "
                            >
                            <p className="text-sm text-white/60">
                                Pickup & Delivery Fee
                            </p>

                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-white">
                                {suburb}
                                </span>

                                <span className="font-bold text-white">
                                {deliveryFee === 0
                                    ? "FREE"
                                    : `R${deliveryFee}`}
                                </span>
                            </div>
                            </motion.div>
                        )}
                        </div>

                        <div className="mt-8 flex gap-4">
                        <Button
                            variant="secondary"
                            className="flex-1"
                            onClick={prevStep}
                        >
                            Back
                        </Button>

                        <Button
                            className="flex-1 bg-green-500 text-white"
                            onClick={nextStep}
                            disabled={
                            !name ||
                            !phone ||
                            !address ||
                            !suburb
                            }
                        >
                            Continue
                        </Button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    {/* HEADER */}
                    <div>
                      <h2 className="text-3xl font-semibold text-white">
                        Pickup Details
                      </h2>

                      <p className="mt-2 text-white/60">
                        Choose when and where you'd like us to
                        collect your laundry.
                      </p>
                    </div>

                    {/* DATE */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-white/70">
                        Preferred Pickup Date
                      </label>

                      <Input
                        type="date"
                        value={pickupDate}
                        onChange={(e) =>
                          setPickupDate(e.target.value)
                        }
                        className="
                          h-14
                          rounded-2xl
                          border-white/10
                          bg-white/10
                          text-white
                        "
                      />
                    </div>

                    {/* TIME */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-white/70">
                        Pickup Time Preference
                      </label>

                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            label: "ASAP",
                            value: "ASAP",
                          },
                          {
                            label: "Morning",
                            value: "Morning",
                          },
                          {
                            label: "Afternoon",
                            value: "Afternoon",
                          },
                          {
                            label: "Evening",
                            value: "Evening",
                          },
                        ].map((slot) => (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() =>
                              setPickupTime(slot.value)
                            }
                            className={`
                              h-16
                              rounded-2xl
                              border
                              transition-all
                              duration-300

                              ${
                                pickupTime === slot.value
                                  ? "border-brand-red bg-brand-red text-white shadow-lg shadow-brand-red/30"
                                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                              }
                            `}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>

                      <p className="mt-3 text-sm text-white/40">
                        Odancia operates 24 hours a day.
                      </p>
                    </div>

                    {/* COLLECTION ZONE */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-white/70">
                        Collection Zone
                      </label>

                      <div className="space-y-3">
                        {[
                          {
                            area: "CBD & Long Street",
                            fee: "FREE",
                          },
                          {
                            area: "City Bowl",
                            fee: "FREE",
                          },
                          {
                            area: "Atlantic Seaboard",
                            fee: "R50",
                          },
                          {
                            area: "Southern Suburbs",
                            fee: "R50",
                          },
                          {
                            area: "Northern Suburbs",
                            fee: "R100",
                          },
                          {
                            area: "Far Distance",
                            fee: "Custom",
                          },
                        ].map((zone) => (
                          <button
                            key={zone.area}
                            type="button"
                            onClick={() =>
                              setSelectedZone(zone.area)
                            }
                            className={`
                              flex
                              w-full
                              items-center
                              justify-between
                              rounded-2xl
                              border
                              p-4
                              text-left
                              transition-all
                              duration-300

                              ${
                                selectedZone === zone.area
                                  ? "border-brand-red bg-brand-red/10"
                                  : "border-white/10 bg-white/5 hover:bg-white/10"
                              }
                            `}
                          >
                            <div>
                              <div className="font-medium text-white">
                                {zone.area}
                              </div>

                              <div className="mt-1 text-xs text-white/50">
                                Pickup & Delivery
                              </div>
                            </div>

                            <div
                              className={`
                                rounded-full
                                px-3
                                py-1
                                text-sm
                                font-semibold

                                ${
                                  zone.fee === "FREE"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-brand-red/20 text-brand-red"
                                }
                              `}
                            >
                              {zone.fee}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* INFO CARD */}
                    <div
                      className="
                        rounded-3xl
                        border
                        border-brand-red/20
                        bg-brand-red/5
                        p-5
                      "
                    >
                      <h3 className="font-semibold text-white">
                        Pickup Pricing
                      </h3>

                      <ul className="mt-4 space-y-2 text-sm text-white/70">
                        <li>
                          ✓ CBD & Long Street — Free Pickup &
                          Delivery
                        </li>

                        <li>
                          ✓ City Bowl — Free Pickup & Delivery
                        </li>

                        <li>
                          ✓ Atlantic Seaboard — R50 Collection Fee
                        </li>

                        <li>
                          ✓ Southern Suburbs — R50 Collection Fee
                        </li>

                        <li>
                          ✓ Northern Suburbs — R100 Collection Fee
                        </li>

                        <li>
                          ✓ Far Distance Areas — Custom Quote
                        </li>
                      </ul>
                    </div>

                    {/* NAVIGATION */}
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setStep(2)}
                      >
                        Back
                      </Button>

                      <Button
                        type="button"
                        className="
                          flex-1
                          bg-brand-red
                          text-white
                        "
                        onClick={() => setStep(4)}
                      >
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                { step === 4 && (
                  <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  {/* Header */}
                  <div>
                    <h2 className="text-3xl font-semibold text-white">
                      Review Booking
                    </h2>

                    <p className="mt-2 text-white/60">
                      Please review your pickup details before
                      submitting your request.
                    </p>
                  </div>

                  {/* Luxury Summary Card */}
                  <div
                    className="
                      overflow-hidden
                      rounded-[32px]
                      border border-white/10
                      bg-white/[0.04]
                      backdrop-blur-2xl
                    "
                  >
                    {/* TOP */}
                    <div
                      className="
                        border-b border-white/10
                        bg-gradient-to-r
                        from-brand-red/20
                        via-blue-500/10
                        to-white/5
                        p-6
                      "
                    >
                      <div className="text-sm text-white/60">
                        ODANCIA LAUNDRY
                      </div>

                      <div className="mt-2 text-2xl font-semibold text-white">
                        Pickup Request
                      </div>

                      <div className="mt-2 text-white/50">
                        Submitted in under 60 seconds
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="space-y-5 p-6">
                      <div className="flex justify-between">
                        <span className="text-white/50">
                          Service
                        </span>

                        <span className="font-medium text-white">
                          {getServiceLabel()}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white/50">
                          Pickup Date
                        </span>

                        <span className="font-medium text-white">
                          {pickupDate || "Not Selected"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white/50">
                          Pickup Time
                        </span>

                        <span className="font-medium text-white">
                          {pickupTime}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white/50">
                          Collection Zone
                        </span>

                        <span className="font-medium text-white">
                          {selectedZone || "Not Selected"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white/50">
                          Collection Fee
                        </span>

                        <span className="font-semibold text-brand-red">
                          {getZoneFee()}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white/50">
                          Turnaround
                        </span>

                        <span className="font-medium text-white">
                          24 Hours
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Promise Card */}
                  <div
                    className="
                      rounded-3xl
                      border border-emerald-500/20
                      bg-emerald-500/10
                      p-5
                    "
                  >
                    <h3 className="font-semibold text-white">
                      Included With Every Order
                    </h3>

                    <div className="mt-4 space-y-2 text-sm text-white/70">
                      <div>
                        ✓ Professional Garment Care
                      </div>

                      <div>
                        ✓ Quality Inspection
                      </div>

                      <div>
                        ✓ Fresh Folding & Packaging
                      </div>

                      <div>
                        ✓ Pickup & Delivery Tracking
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setStep(3)}
                    >
                      Back
                    </Button>

                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="
                        mt-8
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        bg-brand-red
                        py-4
                        font-semibold
                        text-white
                        transition-all
                        hover:scale-[1.02]
                        disabled:opacity-60
                      "
                    >

{submitting ? (
  <>
    <Loader2 className="h-5 w-5 animate-spin" />
    Confirming Pickup...
  </>
) : (
  <>
    Confirm Pickup
  </>
)}

</button>
                  </div>
                </motion.div>
                )}

                 </>
            )}
              </AnimatePresence>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
      
  )
}