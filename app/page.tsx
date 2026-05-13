"use client";

import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState } from "react";
import {
  Coffee, CreditCard, Leaf, Phone, Sparkles, Truck, Star,
  Bot, ArrowRight, ChevronDown, Quote, Zap, Shield, Clock,
  Droplets, Wind, Heart,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: "-60px" },
};

const staggerItem : Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* --- REVEAL OVERLAY --- */
const RevealOverlay = () => {
  const panelVariants : Variants = {
    initial: { y: 0 },
    animate: { 
      y: "-100%",
      transition: { 
        duration: 1.2, 
        ease: [0.645, 0.045, 0.355, 1],
      } 
    }
  };

  const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="fixed inset-0 z-100 flex pointer-events-none"
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          variants={panelVariants}
          className="h-full w-full backdrop-blur-xl border-r border-white/10"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
        />
      ))}
    </motion.div>
  );
};

/* --- FLOATING ICONS --- */
function FloatingIcon({ icon: Icon, className, delay = 0, duration = 6, x = [0, 15, 0], y = [0, -20, 0], rotate = [0, 10, -10, 0] }: {
  icon: React.ElementType; className: string; delay?: number; duration?: number; x?: number[]; y?: number[]; rotate?: number[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      className={`absolute pointer-events-none z-2 ${className}`}
    >
      <motion.div
        animate={{ x, y, rotate }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className="h-full w-full drop-shadow-lg" />
      </motion.div>
    </motion.div>
  );
}

/* --- HERO --- */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const bullets = [
    "Hassle-free pick-up and delivery service.",
    "Save time & Money",
    "Easy Payments",
    "Eco - Friendly",
  ];

  return (
    <section ref={ref} className="relative flex min-h-[92dvh] items-center overflow-hidden">
      {/* Glass panel reveal overlay */}
      <RevealOverlay />
      
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner1.gif-goL3pznXpm0KsFIzLNE9nNCXxBGCio.jpeg"
          alt="Fresh folded laundry with bubbles"
          className="h-full w-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" /> */}
      </div>

      {/* Floating brand icons */}
      <FloatingIcon icon={Coffee} className="top-[14%] left-[42%] h-9 w-9 text-brand-red/30" delay={1.2} duration={7} y={[0, -25, 0]} rotate={[0, 15, -15, 0]} />
      <FloatingIcon icon={Droplets} className="top-[60%] left-[8%] h-7 w-7 text-primary/30" delay={1.6} duration={6} x={[-10, 10, -10]} />
      <FloatingIcon icon={Sparkles} className="top-[25%] left-[55%] h-6 w-6 text-brand-red/30" delay={2} duration={8} y={[0, -20, 0]} />
      <FloatingIcon icon={Wind} className="bottom-[15%] left-[45%] h-7 w-7 text-primary/25" delay={2.4} duration={9} rotate={[0, 25, -25, 0]} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        {/* LEFT - copy */}
        <motion.div style={{ opacity, y: textY }}>
          <h1
            style={{
              fontFamily: "'Titan One', sans-serif",
              fontWeight: 400,
              color: "#0054A4",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              paddingTop: "10px",
            }}
            className="text-[2.75rem] sm:text-[4rem] md:text-[4.75rem] lg:text-[5rem] xl:text-[6rem]"
          >
            <motion.span
              initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              WELCOME TO
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              ODANCIA LAUNDRY!
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-5 text-xl font-semibold"
            style={{ color: "#E63946", fontFamily: "'Titan One', sans-serif", fontWeight: 400 }}
          >
            Say goodbye to laundry day!
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="mt-8 space-y-3"
          >
            {bullets.map((b) => (
              <motion.li key={b} variants={staggerItem} className="flex items-center gap-3 text-base text-foreground/75">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                {b}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.6 }} className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-md px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: "#5BA8D6" }}
            >
              Our Services
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md border-2 border-primary/30 bg-background px-8 py-3.5 text-base font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5"
            >
              Schedule Pickup
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT - image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          {/* Floating accent badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-10 flex items-center gap-2 rounded-2xl bg-background px-4 py-3 shadow-2xl"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Eco wash</div>
              <div className="text-sm font-semibold">Plant-based</div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 bottom-12 flex items-center gap-2 rounded-2xl bg-background px-4 py-3 shadow-2xl"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
              <Coffee className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Free coffee</div>
              <div className="text-sm font-semibold">Every visit</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* --- MARQUEE TICKER --- */
function MarqueeTicker() {
  return (
    <div className="relative z-20 overflow-hidden">
      <div className="gradient-hero py-5">
        <Marquee
          items={["FREE COFFEE WITH EVERY VISIT", "ECO-FRIENDLY CLEANING", "SAME-DAY EXPRESS", "LOYALTY REWARDS", "24/7 AI PHONE AGENT", "FREE PICKUP & DELIVERY", "105 LONG STREET, CAPE TOWN"]}
          speed={25}
          className="font-heading text-xs sm:text-sm tracking-[0.2em] text-primary-foreground/90"
        />
      </div>
    </div>
  );
}

/* --- SHOP SHOWCASE --- */
function ShopShowcase() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <FloatingIcon icon={Coffee} className="top-[10%] right-[5%] h-12 w-12 text-brand-red/15" delay={0} duration={7} y={[0, -20, 0]} />
      <FloatingIcon icon={Droplets} className="bottom-[15%] left-[3%] h-9 w-9 text-primary/10" delay={0.5} duration={6} x={[0, 20, 0]} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-red">Our Space</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground">Step Inside Odancia</h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-4 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-primary to-brand-red" />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
          {/* Main shop interior */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="group relative overflow-hidden rounded-3xl md:col-span-7 md:row-span-2 min-h-[320px] md:min-h-[500px]"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shop-1-1Ek1Qlzqod6AM80gM8bgB6nd7RVXTL.png"
              alt="Inside Odancia Laundry and Cafe"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-background/20 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-background border border-background/10 mb-3">
                <Coffee className="h-3.5 w-3.5" /> Cafe &amp; Laundry Combined
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl text-background">Laundry, Dry Cleaning &amp; Cafe in One Place</h3>
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-6 right-6 h-10 w-10 text-background/30 pointer-events-none">
              <Coffee className="h-full w-full" />
            </motion.div>
          </motion.div>

          {/* Location gradient card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="group relative overflow-hidden rounded-3xl md:col-span-5 min-h-[200px] gradient-banner p-7 flex flex-col justify-between text-primary-foreground"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-12 -right-12 h-44 w-44 rounded-full border-2 border-dashed border-background/15" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full border border-dashed border-background/10" />
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-background/15 backdrop-blur-sm border border-background/20">
              <Sparkles className="h-7 w-7" />
            </div>
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70">Find Us</p>
              <h3 className="mt-2 font-heading text-xl sm:text-2xl">105 Long Street</h3>
              <p className="mt-1 text-sm text-primary-foreground/70">Cape Town City Centre</p>
            </div>
          </motion.div>

          {/* Free coffee promo card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="group relative overflow-hidden rounded-3xl md:col-span-5 min-h-[200px] bg-gradient-to-br from-brand-red via-brand-red to-brand-red/80 p-7 flex flex-col justify-between text-brand-red-foreground"
          >
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-background/10 blur-2xl" />
            <motion.div animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-background/15 backdrop-blur-sm border border-background/20">
              <Coffee className="h-7 w-7" />
            </motion.div>
            <div className="relative z-10">
              <h3 className="font-heading text-xl sm:text-2xl">Free Coffee</h3>
              <p className="mt-1 text-sm text-brand-red-foreground/80">Complimentary artisan brew with every visit.</p>
            </div>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-5 right-5 rounded-full bg-background/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider">
              ON THE HOUSE
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --- STATS BAR --- */
function StatsBar() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <FloatingIcon icon={Star} className="top-[20%] left-[8%] h-6 w-6 text-brand-red/15" delay={0} duration={5} />
      <FloatingIcon icon={Heart} className="bottom-[20%] right-[6%] h-7 w-7 text-primary/10" delay={0.3} duration={7} rotate={[0, 15, -15, 0]} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...staggerContainer} className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {[
            { target: 1500, suffix: "+", label: "Happy Clients", icon: Heart },
            { target: 24, suffix: "/7", label: "AI Agent", icon: Bot },
            { target: 100, suffix: "%", label: "Eco Friendly", icon: Leaf },
            { target: 10, suffix: "th Free", label: "Loyalty Wash", icon: Star },
          ].map((stat) => (
            <motion.div key={stat.label} {...staggerItem} className="group relative overflow-hidden rounded-3xl border border-border/40 bg-card p-6 text-center transition-all duration-500 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
              <motion.div whileHover={{ rotate: -12, scale: 1.2 }} className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <stat.icon className="h-5 w-5" />
              </motion.div>
              <AnimatedCounter target={stat.target} suffix={stat.suffix} label={stat.label} />
              <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --- BENTO SECTION --- */
function BentoSection() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <FloatingIcon icon={Coffee} className="top-[5%] left-[10%] h-14 w-14 text-brand-red/10" delay={0} duration={8} y={[0, -30, 0]} rotate={[0, 20, -20, 0]} />
      <FloatingIcon icon={Droplets} className="bottom-[10%] right-[8%] h-10 w-10 text-primary/8" delay={1} duration={6} x={[-15, 15, -15]} />
      <FloatingIcon icon={Wind} className="top-[40%] right-[3%] h-8 w-8 text-primary/10" delay={0.5} duration={9} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="mb-16 text-center">
          <motion.p initial={{ opacity: 0, letterSpacing: "0.1em" }} whileInView={{ opacity: 1, letterSpacing: "0.25em" }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-sm font-semibold uppercase text-brand-red">
            The Experience
          </motion.p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground">More Than a Laundry</h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-4 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-primary to-brand-red" />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-3 lg:gap-5">
          {/* Large card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="group relative overflow-hidden rounded-[1.75rem] md:col-span-2 md:row-span-2 min-h-[400px]">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/odancia-ads-2-aSesz5NMqiLw6LvHZknRrQnwhszYbZ.png"
              alt="Odancia Laundry interior with customers"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-background/20 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-background border border-background/10 mb-3">
                <Coffee className="h-3.5 w-3.5" /> Cafe &amp; Laundry
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-background">Laundry Meets Artisan Coffee</h3>
              <p className="mt-2 text-sm text-background/70 max-w-md">Relax with a complimentary premium beverage while we take care of your clothes.</p>
            </motion.div>
            <motion.div animate={{ y: [0, -15, 0], rotate: [0, 8, -8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-8 right-8 pointer-events-none">
              <Coffee className="h-12 w-12 text-background/20 drop-shadow-xl" />
            </motion.div>
          </motion.div>

          {/* Free Coffee card */}
          <motion.div initial={{ opacity: 0, y: 30, rotateX: 5 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} whileHover={{ y: -4, transition: { duration: 0.3 } }} className="group relative overflow-hidden rounded-[1.75rem] bg-surface-warm p-6 flex flex-col justify-between min-h-[240px] border border-border/20">
            <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-brand-red-foreground">
              <Coffee className="h-8 w-8" />
            </motion.div>
            <div>
              <h3 className="font-heading text-xl text-foreground">Free Coffee</h3>
              <p className="mt-1 text-sm text-muted-foreground">Every visit includes a complimentary artisan beverage.</p>
            </div>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-brand-red/8 blur-3xl" />
            <motion.div animate={{ y: [0, -8, 0], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-4 right-4 pointer-events-none">
              <Wind className="h-6 w-6 text-brand-red/20" />
            </motion.div>
          </motion.div>

          {/* Loyalty card */}
          <motion.div initial={{ opacity: 0, y: 30, rotateX: 5 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} whileHover={{ y: -4, transition: { duration: 0.3 } }} className="group relative overflow-hidden rounded-[1.75rem] gradient-banner p-6 text-primary-foreground flex flex-col justify-between min-h-[240px]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background/10 backdrop-blur-sm border border-background/20">
              <Star className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-heading text-xl">Loyalty Rewards</h3>
              <p className="mt-1 text-sm text-primary-foreground/70">Earn points every wash. Your 10th service is on us!</p>
            </div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-10 -right-10 h-40 w-40 rounded-full border border-dashed border-background/10" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full border border-dashed border-background/8" />
          </motion.div>

          {/* AI Agent card */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="group relative overflow-hidden rounded-[1.75rem] bg-foreground text-background p-6 sm:p-8 flex flex-col justify-between min-h-[240px] md:col-span-2">
            <div className="absolute top-6 right-6 pointer-events-none">
              <motion.div animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 h-4 w-4 rounded-full bg-brand-red" />
              <div className="relative h-4 w-4 rounded-full bg-brand-red" />
            </div>
            <div className="flex items-center gap-4">
              <motion.div animate={{ boxShadow: ["0 0 0 0px rgba(232,93,58,0.2)", "0 0 0 12px rgba(232,93,58,0)", "0 0 0 0px rgba(232,93,58,0.2)"] }} transition={{ duration: 2, repeat: Infinity }} className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/20 border border-brand-red/20">
                <Bot className="h-8 w-8 text-brand-red" />
              </motion.div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl">AI Phone Agent</h3>
                <p className="text-sm text-background/50">Available 24/7 - schedule, track, inquire</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} href="tel:+27718385010" className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-brand-red-foreground shadow-lg shadow-brand-red/20">
                <Phone className="h-4 w-4" /> Call Now
              </motion.a>
              <span className="text-sm text-background/40 font-mono">+27 71 838 5010</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --- FEATURES STRIP --- */
function FeaturesStrip() {
  const features = [
    { icon: Truck, title: "Free Pickup & Delivery", desc: "We come to you anywhere in Cape Town.", accent: true },
    { icon: Leaf, title: "Eco-Friendly Cleaning", desc: "100% toxin-free, carbon-neutral ops.", accent: false },
    { icon: Zap, title: "Same-Day Express", desc: "Need it fast? Ready in 3-4 hours.", accent: true },
    { icon: Shield, title: "Garment Insurance", desc: "Your clothes are fully protected.", accent: false },
    { icon: CreditCard, title: "Easy Payments", desc: "Cash, card, or mobile - your choice.", accent: false },
    { icon: Clock, title: "Open 7:00-18:00", desc: "Mon-Fri service, Sat until 14:00.", accent: true },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-warm via-background to-surface-warm" />
        <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[10%] h-96 w-96 rounded-full bg-brand-red/8 blur-[120px]" />
        <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[5%] right-[8%] h-[28rem] w-[28rem] rounded-full bg-primary/8 blur-[140px]" />
      </div>

      <FloatingIcon icon={Sparkles} className="top-[8%] right-[12%] h-10 w-10 text-brand-red/12" delay={0} duration={7} rotate={[0, 25, -25, 0]} />
      <FloatingIcon icon={Coffee} className="bottom-[12%] left-[8%] h-12 w-12 text-primary/8" delay={0.5} duration={8} y={[0, -25, 0]} />
      <FloatingIcon icon={Droplets} className="top-[50%] right-[4%] h-7 w-7 text-primary/10" delay={1} duration={5} x={[-10, 10, -10]} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-red">Why Odancia</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground">Six Reasons to Choose Us</h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-4 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-primary to-brand-red" />
        </motion.div>

        <motion.div {...staggerContainer} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <motion.div key={f.title} {...staggerItem} whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }} className="group relative overflow-hidden rounded-3xl border border-border/30 bg-card/90 backdrop-blur-sm p-8 transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-brand-red/5" />
              <motion.div whileHover={{ rotate: -8, scale: 1.15 }} className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl ${f.accent ? "bg-brand-red/10 text-brand-red" : "bg-primary/10 text-primary"} transition-all duration-300`}>
                <f.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="relative z-10 mt-6 font-heading text-base text-card-foreground">{f.title}</h3>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10 group-hover:scale-150" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --- CAFE SPLIT SECTION --- */
function CafeSplitSection() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden relative">
      <FloatingIcon icon={Coffee} className="top-[5%] right-[15%] h-14 w-14 text-brand-red/8" delay={0} duration={9} y={[0, -25, 0]} rotate={[0, 15, -15, 0]} />
      <FloatingIcon icon={Sparkles} className="bottom-[10%] left-[12%] h-8 w-8 text-primary/10" delay={0.8} duration={6} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div {...fadeUp} className="order-2 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-red">The Cafe Side</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground">Not Your Average Laundromat</h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 h-1 w-16 origin-left rounded-full bg-brand-red" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              At Odancia, we believe doing laundry should be an experience. Settle into our cafe lounge with a freshly brewed artisan coffee - on the house. Read, work, relax while we handle everything from delicates to duvets.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Coffee, label: "Artisan Coffee", desc: "Freshly brewed daily" },
                { icon: Wind, label: "Cozy Lounge", desc: "Wi-Fi & comfy seats" },
                { icon: Leaf, label: "Eco Detergent", desc: "Plant-based, gentle" },
                { icon: Heart, label: "Local Vibe", desc: "Cape Town roots" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-5 transition-shadow hover:shadow-lg"
                >
                  <motion.div whileHover={{ rotate: -10, scale: 1.15 }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                  <div className="mt-3 font-heading text-sm text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                  <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative order-1 lg:order-2">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl shadow-primary/10 aspect-[4/3]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/odancia-ads-gyfAhR5ZVe3YnazeULAVg5ODDFuLuV.png"
                alt="Odancia Laundry and Cafe storefront"
                className="h-full w-full object-cover"
              />
            </div>
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, type: "spring", stiffness: 200 }} className="absolute -bottom-6 -left-4 rounded-2xl glass-card p-5 shadow-xl sm:-left-8">
              <div className="flex items-center gap-3">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <Coffee className="h-6 w-6" />
                </motion.div>
                <div>
                  <div className="font-heading text-sm text-foreground">Complimentary</div>
                  <div className="text-xs text-muted-foreground">With every visit</div>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-8 -right-8 h-40 w-40 rounded-full border-2 border-dashed border-primary/10" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="absolute -bottom-10 -right-10 h-52 w-52 rounded-full border border-dashed border-brand-red/8" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --- TESTIMONIALS --- */
const testimonials = [
  { name: "Sarah M.", role: "Regular Client", text: "The coffee is incredible and my clothes always come back perfect. It's like a spa day but for your wardrobe!", rating: 5 },
  { name: "James K.", role: "Hotel Manager", text: "We switched all our commercial laundry to Odancia. Reliable, eco-friendly, and their AI phone agent makes scheduling effortless.", rating: 5 },
  { name: "Thandi N.", role: "Busy Mom", text: "Free pickup and delivery is a lifesaver! Plus the kids love the loyalty card - they track our free washes.", rating: 5 },
  { name: "Michael R.", role: "Business Owner", text: "Best laundry service in Cape Town, hands down. The quality is unmatched and the cafe vibe is amazing.", rating: 5 },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-warm via-background to-surface-warm" />
      <FloatingIcon icon={Quote} className="top-[8%] left-[5%] h-16 w-16 text-primary/5" delay={0} duration={10} y={[0, -15, 0]} />
      <FloatingIcon icon={Star} className="bottom-[15%] right-[8%] h-8 w-8 text-brand-red/10" delay={0.5} duration={7} rotate={[0, 20, -20, 0]} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-red">Testimonials</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground">What Our Clients Say</h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-4 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-primary to-brand-red" />
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -6 }} onMouseEnter={() => setActive(i)} className={`relative rounded-3xl border p-7 transition-all duration-500 cursor-pointer backdrop-blur-sm ${active === i ? "border-primary/30 bg-card shadow-2xl shadow-primary/10 scale-[1.02]" : "border-border/30 bg-card/60 hover:bg-card"}`}>
              <Quote className={`h-8 w-8 mb-4 transition-colors duration-300 ${active === i ? "text-primary/30" : "text-primary/15"}`} />
              <p className="text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              <div className="mt-5 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-brand-red text-brand-red" />
                ))}
              </div>
              <div className="mt-4 border-t border-border/30 pt-4">
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
              {active === i && (
                <motion.div layoutId="testimonial-glow" className="absolute inset-0 rounded-3xl border-2 border-primary/20" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- DELIVERY SECTION --- */
function DeliverySection() {
  const checkItems = [
    "Free pickup & delivery across Cape Town",
    "Same-day express service available",
    "Real-time order tracking via AI agent",
    "Commercial bulk service for businesses",
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <FloatingIcon icon={Truck} className="top-[10%] right-[10%] h-10 w-10 text-primary/10" delay={0} duration={6} x={[-15, 15, -15]} />
      <FloatingIcon icon={Wind} className="bottom-[20%] left-[5%] h-8 w-8 text-brand-red/10" delay={0.5} duration={8} y={[0, -20, 0]} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl shadow-primary/10 aspect-[4/3]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/odancia-ads-3-oZxohWhQcKrYLN6BCHfdNTrFP7ikkz.png"
                alt="Odancia Laundry services and drinks"
                className="h-full w-full object-cover"
              />
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, type: "spring", stiffness: 200 }} className="absolute -bottom-5 -right-3 rounded-2xl gradient-cta p-5 text-brand-red-foreground shadow-xl shadow-brand-red/20 sm:-right-6">
              <Truck className="h-8 w-8" />
              <div className="mt-1 font-heading text-sm">Free Delivery</div>
            </motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -top-6 -left-6 h-32 w-32 rounded-full border-2 border-dashed border-primary/8" />
          </motion.div>

          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-red">Pickup &amp; Delivery</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground">We Come To You</h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 h-1 w-16 origin-left rounded-full bg-brand-red" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Schedule a pickup from your doorstep. We&apos;ll wash, fold, and deliver fresh - so you never waste another Saturday at a laundromat.
            </p>
            <motion.div {...staggerContainer} className="mt-8 space-y-3">
              {checkItems.map((item) => (
                <motion.div key={item} {...staggerItem} className="flex items-center gap-3 group">
                  <motion.div whileHover={{ scale: 1.3 }} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                    <div className="h-2 w-2 rounded-full bg-primary transition-colors group-hover:bg-primary-foreground" />
                  </motion.div>
                  <span className="text-sm text-foreground/70 transition-colors group-hover:text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact" className="group mt-10 inline-flex items-center gap-2 rounded-full gradient-cta px-8 py-4 text-base font-semibold text-brand-red-foreground shadow-xl shadow-brand-red/20 transition-shadow hover:shadow-2xl hover:shadow-brand-red/30">
                Schedule a Pickup
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --- COMMUNITY CTA --- */
function CommunityCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[550px] sm:min-h-[600px] flex items-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/view-7-2vFxUJkGYUJMIxuGFGq1g5SEK68jqj.jpeg"
          alt="Odancia Laundry storefront exterior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />

        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-[15%] right-[10%] pointer-events-none z-[2]">
          <Coffee className="h-16 w-16 text-background/15 drop-shadow-2xl" />
        </motion.div>
        <motion.div animate={{ y: [0, -15, 0], x: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-[20%] right-[25%] pointer-events-none z-[2]">
          <Droplets className="h-10 w-10 text-background/10" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute top-[30%] right-[40%] pointer-events-none z-[2]">
          <Sparkles className="h-8 w-8 text-background/8" />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-lg text-background">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-6 h-1 w-16 origin-left rounded-full bg-brand-red" />
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl drop-shadow-lg">Join the Odancia Family</h2>
            <p className="mt-4 text-base text-background/80 leading-relaxed">
              Over 1,500 happy customers trust us with their laundry every month. Grab your loyalty card and start earning rewards today.
            </p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full gradient-cta px-8 py-4 font-semibold text-brand-red-foreground shadow-xl shadow-brand-red/25 transition-shadow hover:shadow-2xl">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} href="tel:+27718385010" className="inline-flex items-center gap-2 rounded-full bg-background/10 backdrop-blur-xl border border-background/20 px-8 py-4 font-semibold text-background transition-colors hover:bg-background/20">
                <Phone className="h-4 w-4" /> Call Us
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --- PAGE --- */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MarqueeTicker />
      <ShopShowcase />
      <StatsBar />
      <BentoSection />
      <FeaturesStrip />
      <CafeSplitSection />
      <TestimonialsSection />
      <DeliverySection />
      <CommunityCTA />
    </div>
  );
}
