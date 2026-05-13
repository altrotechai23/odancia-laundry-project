"use client";

import Link from "next/link";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { motion } from "framer-motion";
import { Check, Award, Heart, Users, Leaf, Coffee, MapPin } from "lucide-react";

export default function AboutPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner1.gif-Cr7x5ud5IYNmDEzK6NjhveRFgjpmyd.jpeg"
            alt="Fresh folded laundry"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/80 to-foreground/95" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-background/10 backdrop-blur-sm border border-background/10 px-5 py-2 text-sm text-background/80 mb-6">
              <MapPin className="h-4 w-4" /> 105 Long Street, Cape Town
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-background">Our Story</h1>
            <p className="mt-4 text-lg text-background/60 max-w-xl mx-auto">
              Where laundry care meets cafe culture - redefining what clean means.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <AnimatedCounter target={1500} suffix="+" label="Happy Clients" />
            <AnimatedCounter target={100} suffix="%" label="Eco Friendly" />
            <AnimatedCounter target={24} suffix="/7" label="AI Agent" />
            <AnimatedCounter target={5} suffix="★" label="Google Rating" />
          </div>
        </div>
      </section>

      {/* Story Split */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <motion.div {...fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">Who We Are</p>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-foreground">
                More Than Just Clean Clothes
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Odancia Laundry has been serving Cape Town with dedication and passion. From our location
                at 105 Long Street in the heart of the City Centre, we&apos;ve created something unique -
                a place where you can drop off your laundry and enjoy a complimentary artisan coffee.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Our commitment to eco-friendly practices, combined with cutting-edge cleaning technology,
                ensures your garments receive the best care possible. We use 100% toxin-free, perc-free
                solvents and proudly operate as a carbon-neutral business.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: Leaf, label: "Carbon Neutral" },
                  { icon: Coffee, label: "Free Coffee" },
                  { icon: Heart, label: "Community First" },
                ].map((tag) => (
                  <div key={tag.label} className="inline-flex items-center gap-2 rounded-full bg-primary/5 border border-primary/10 px-4 py-2 text-sm text-primary">
                    <tag.icon className="h-4 w-4" /> {tag.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/odancia-ads-gyfAhR5ZVe3YnazeULAVg5ODDFuLuV.png"
                  alt="Inside Odancia Laundry and Cafe"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-brand-red/10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">Our Values</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-foreground">What Drives Us</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Quality First", desc: "Every garment gets meticulous attention and care." },
              { icon: Leaf, title: "Sustainability", desc: "100% toxin-free solvents, carbon-neutral operations." },
              { icon: Heart, title: "Community", desc: "We invest in Cape Town - our team, our neighborhood." },
              { icon: Users, title: "Service", desc: "1,500+ clients trust us. That trust is everything." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border/40 bg-card p-7 text-center transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-heading text-base text-card-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">B2B Solutions</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-foreground">Commercial Clients</h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">Scalable laundry solutions for businesses across Cape Town.</p>
          </motion.div>
          <motion.div {...fadeUp} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Salons & Spas", "Restaurants & Caterers", "Hotels & Motels", "Athletic Facilities",
              "Daycare Centers", "Nursing Homes", "Nail Salons", "Religious Organizations",
            ].map((c) => (
              <div key={c} className="flex items-center gap-3 rounded-xl bg-card border border-border/40 p-4 transition-colors hover:border-primary/20 hover:bg-primary/5">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-card-foreground">{c}</span>
              </div>
            ))}
          </motion.div>
          <motion.div {...fadeUp} className="mt-12 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full gradient-cta px-8 py-4 font-semibold text-brand-red-foreground shadow-xl transition-all hover:scale-105">
              Get a Commercial Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
