"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/3 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-brand-red/5 blur-[80px]" />

      {/* CTA strip */}
      <div className="border-b border-background/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h3 className="font-heading text-2xl text-background">Ready to ditch laundry day?</h3>
              <p className="mt-1 text-sm text-background/50">Schedule a free pickup or drop in for coffee.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full gradient-cta px-8 py-3.5 font-semibold text-brand-red-foreground shadow-xl transition-all hover:scale-105">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-izdCA0xx70zF4A7fYXFcRXa8Cfh936.png"
              alt="Odancia Laundry"
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-background/50">
              Cape Town&apos;s first laundry &amp; cafe. Premium cleaning, complimentary coffee, eco-friendly from start to finish.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-background/60">Quick Links</h4>
            <nav className="mt-4 flex flex-col gap-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services & Pricing" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-background/50 transition-colors hover:text-background">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-background/60">Contact</h4>
            <div className="mt-4 flex flex-col gap-3">
              <a href="tel:+27718385010" className="flex items-center gap-2.5 text-sm text-background/50 hover:text-background transition-colors">
                <Phone className="h-4 w-4 shrink-0" /> +27 71 838 5010
              </a>
              <a href="mailto:info@odancialaundry.co.za" className="flex items-center gap-2.5 text-sm text-background/50 hover:text-background transition-colors">
                <Mail className="h-4 w-4 shrink-0" /><span>info@odancialaundry.co.za</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-background/50">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> 105 Long Street, Cape Town
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-background/60">Hours</h4>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-background/50">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0" /> Mon-Fri: 7:00-18:00
              </div>
              <div className="pl-6">Sat: 8:00-14:00</div>
              <div className="pl-6">Sun: Closed</div>
            </div>
            <div className="mt-6 text-xs text-background/30">
              AI Phone Agent: 24/7
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-background/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background/30">
          <span>&copy; 2026 Odancia Laundry &amp; Cafe. All rights reserved.</span>
          <span>Made with coffee in Cape Town</span>
        </div>
      </div>
    </footer>
  );
}
