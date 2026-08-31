"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Suburb = {
  name: string;
  fee?: number;
};

type Props = {
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  suburb: string;
  setSuburb: (value: string) => void;
  suburbs: Suburb[];
  deliveryFee: number;
  nextStep: () => void;
  prevStep: () => void;
};

const inputClassName = `
  h-14
  min-w-0
  w-full
  max-w-full
  rounded-2xl
  border-slate-200
  bg-white
  px-5
  text-slate-900
  shadow-sm
  placeholder:text-slate-400
  transition-all
  focus:border-brand-red
  focus:ring-4
  focus:ring-brand-red/10
`;

export function PickupDetailsStep({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  address,
  setAddress,
  suburb,
  setSuburb,
  suburbs,
  deliveryFee,
  nextStep,
  prevStep,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 30,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -30,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="min-w-0 w-full"
    >
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
          Step 3 of 5
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Pickup details
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Tell us where we should collect your laundry.
        </p>
      </div>

      <div className="min-w-0 space-y-5">
        <div>
          <label
            htmlFor="customer-name"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Full Name
          </label>

          <Input
            id="customer-name"
            autoComplete="name"
            placeholder="Your full name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="customer-phone"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Mobile Number
          </label>

          <Input
            id="customer-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 074 943 3677"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="customer-email"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Email
            <span className="ml-2 font-normal text-slate-400">
              Optional
            </span>
          </label>

          <Input
            id="customer-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="collection-address"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Collection Address
          </label>

          <Input
            id="collection-address"
            autoComplete="street-address"
            placeholder="Street address, building, unit..."
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            className={inputClassName}
          />
        </div>

        <div className="min-w-0">
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Area
          </label>

          <Select
            value={suburb}
            onValueChange={setSuburb}
          >
            <SelectTrigger
              className="
                h-14
                min-w-0
                w-full
                max-w-full
                rounded-2xl
                border-slate-200
                bg-white
                px-5
                text-slate-900
                shadow-sm
              "
            >
              <SelectValue placeholder="Select your area" />
            </SelectTrigger>

            <SelectContent className="z-[10000] max-h-72 rounded-2xl border-slate-200 bg-white p-2 shadow-2xl">
              {suburbs.map((item) => (
                <SelectItem
                  key={item.name}
                  value={item.name}
                  className="rounded-xl"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {suburb && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Pickup & Delivery
            </p>

            <div className="mt-3 flex min-w-0 items-center justify-between gap-4">
              <span className="min-w-0 truncate font-medium text-slate-800">
                {suburb}
              </span>

              <span className="shrink-0 text-lg font-bold text-brand-red">
                {deliveryFee === 0
                  ? "FREE"
                  : `R${deliveryFee}`}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 pb-4 sm:flex-row">
        <Button
          type="button"
          variant="secondary"
          onClick={prevStep}
          className="h-14 w-full rounded-2xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 sm:flex-1"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={nextStep}
          disabled={
            !name.trim() ||
            !phone.trim() ||
            !address.trim() ||
            !suburb
          }
          className="h-14 w-full rounded-2xl bg-brand-red font-semibold text-white shadow-lg shadow-brand-red/20 hover:bg-brand-red/90 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}

