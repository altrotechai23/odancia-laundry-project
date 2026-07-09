"use client"
import {motion, Variants} from "framer-motion"
import { Leaf,Star, Bot,  Heart } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

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
export default function StatsBars() {

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden gradient-banner">
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
  )
}
