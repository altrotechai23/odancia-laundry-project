"use client"
import {motion, Variants} from "framer-motion"
import { Coffee, Sparkles, Droplets} from "lucide-react";


const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: "-60px" },
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

const staggerItem : Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export default function ShopShowcase() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden ">
      <FloatingIcon icon={Coffee} className="top-[10%] right-[5%] h-12 w-12 text-brand-red/15" delay={0} duration={7} y={[0, -20, 0]} />
      <FloatingIcon icon={Droplets} className="bottom-[15%] left-[3%] h-9 w-9 text-primary/10" delay={0.5} duration={6} x={[0, 20, 0]} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-white/80">Our Space</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl text-gradient-brand">Step Inside Odancia</h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-4 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-primary to-brand-red" />
        </div>

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
