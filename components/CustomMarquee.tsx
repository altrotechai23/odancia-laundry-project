
import { Marquee } from './Marquee'

export default function() {
  return (
    <section className="relative">
          <div className="relative z-20 overflow-hidden">
            <div className="gradient-hero py-5">
              <Marquee
                items={["FREE COFFEE WITH EVERY VISIT", "ECO-FRIENDLY CLEANING", "SAME-DAY EXPRESS", "LOYALTY REWARDS", "24/7 AI PHONE AGENT", "FREE PICKUP & DELIVERY", "105 LONG STREET, CAPE TOWN"]}
                speed={25}
                className="font-heading text-xs sm:text-sm tracking-[0.2em] text-primary-foreground/90"
              />
            </div>
        </div>
    </section>
  )
}
