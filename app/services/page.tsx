"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shirt, Waves, Footprints, Zap, ArrowRight } from "lucide-react";

type PricingCategory = { name: string; items: { name: string; price: string }[] };

const dryCleaningData: PricingCategory[] = [
  { name: "Tops & Blouses", items: [{ name: "Blouse / Body Suit", price: "R121" }, { name: "Jersey", price: "R126" }, { name: "Shirt / T-Shirt", price: "R81" }, { name: "Silk Blouse", price: "R153" }, { name: "Tie", price: "R89" }] },
  { name: "Dresses", items: [{ name: "Short / Casual", price: "R170" }, { name: "Long Dress", price: "R263" }, { name: "Evening Dress", price: "R381" }, { name: "Wedding Dress", price: "R763" }] },
  { name: "Suits & Formal", items: [{ name: "Suit (2 piece)", price: "R199" }, { name: "Suit (3 piece)", price: "R262" }, { name: "Jacket", price: "R145" }, { name: "Trouser", price: "R131" }, { name: "Waistcoat", price: "R101" }] },
  { name: "Outerwear", items: [{ name: "Coat - Short/Rain", price: "R181" }, { name: "Coat - Long/Winter", price: "R220" }, { name: "Padded Jacket", price: "R256" }] },
];

const laundryData: PricingCategory[] = [
  { name: "Wash & Fold", items: [{ name: "1 Load Wash/Dry/Fold", price: "R175" }, { name: "Stay-soft per load", price: "R20" }, { name: "Drying Per Basket", price: "R100" }] },
  { name: "Ironing", items: [{ name: "Ironing per kg", price: "R120" }, { name: "Steam Iron Suits", price: "R100" }, { name: "Steam Short Dress", price: "R100" }, { name: "Steam Long Dress", price: "R150" }] },
  { name: "Bedding", items: [{ name: "Sheets Single", price: "R35" }, { name: "Sheets Double", price: "R50" }, { name: "Blanket Double", price: "R250" }, { name: "Blanket Queen", price: "R400" }] },
];

const shoeData: PricingCategory[] = [
  { name: "Sneaker Care", items: [{ name: "Classic Care", price: "R130" }, { name: "Premium Care", price: "R180" }, { name: "Midsole Unyellow", price: "R120" }, { name: "Suede Care", price: "R50" }] },
  { name: "Formal & Bags", items: [{ name: "Leather Care", price: "R30" }, { name: "Suede Care", price: "R80" }, { name: "Boots", price: "R50" }, { name: "Bag Care", price: "R135" }] },
];

const tabs = [
  { id: "dry", label: "Dry Cleaning", icon: Shirt, data: dryCleaningData },
  { id: "laundry", label: "Wash & Fold", icon: Waves, data: laundryData },
  { id: "shoes", label: "Shoe & Bag", icon: Footprints, data: shoeData },
] as const;

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>("dry");
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-background blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-background blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground">
              Services & Pricing
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/60 max-w-xl mx-auto">
              Transparent pricing. No hidden fees. Express available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Notes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex flex-wrap justify-center gap-3 text-xs"
          >
            {["Leather & Suede: Quote Required", "Press Only: Half Price", "Kiddies: Half Price"].map((n) => (
              <span key={n} className="rounded-full bg-muted px-4 py-2 text-muted-foreground font-medium">{n}</span>
            ))}
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex gap-1 rounded-2xl bg-muted p-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-10 grid gap-6 md:grid-cols-2"
            >
              {currentTab.data.map((cat) => (
                <div key={cat.name} className="group rounded-2xl border border-border/40 bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
                  <div className="bg-primary/5 px-6 py-4 border-b border-border/40">
                    <h3 className="font-heading text-base text-card-foreground">{cat.name}</h3>
                  </div>
                  <div className="divide-y divide-border/30">
                    {cat.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-primary/3">
                        <span className="text-sm text-card-foreground">{item.name}</span>
                        <span className="font-heading text-sm text-primary">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Express */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 relative overflow-hidden rounded-[1.5rem] gradient-banner p-8 sm:p-12 text-center text-primary-foreground"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-1/4 h-40 w-40 rounded-full bg-background blur-3xl" />
            </div>
            <div className="relative">
              <Zap className="mx-auto h-10 w-10 mb-4" />
              <h3 className="font-heading text-2xl sm:text-3xl">Express Service</h3>
              <p className="mt-3 text-sm text-primary-foreground/70 max-w-md mx-auto">
                Need it fast? Collect within 3-4 hours at double price. Perfect for emergencies.
              </p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-8 py-3.5 font-semibold text-primary shadow-xl transition-all hover:scale-105">
                Book Express <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
