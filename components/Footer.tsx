"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

import { PickupDialog } from "@/components/booking/PickupDialog";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  {
    icon: Instagram,
    href: "#",
  },
  {
    icon: Facebook,
    href: "#",
  },
  {
    icon: Twitter,
    href: "#",
  },
];

export function Footer() {
  const [pickupOpen, setPickupOpen] = useState(false);

  return (
    <>
      <footer className="relative overflow-hidden bg-foreground text-background">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />

          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-brand-red/10 blur-[120px]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* CTA */}
        <div className="relative border-b border-background/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-14 sm:flex-row sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-red">
                Premium Laundry Experience
              </p>

              <h3 className="mt-3 font-heading text-3xl leading-tight text-background sm:text-4xl">
                Ready to ditch laundry day?
              </h3>

              <p className="mt-4 text-background/55">
                Schedule a free pickup or enjoy a fresh coffee
                while we handle your laundry.
              </p>
            </div>

            <button
              onClick={() => setPickupOpen(true)}
              className="inline-flex items-center gap-2 rounded-full gradient-cta px-8 py-4 font-semibold text-brand-red-foreground shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Book Pickup
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Footer */}
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-izdCA0xx70zF4A7fYXFcRXa8Cfh936.png"
                alt="Odancia Laundry"
                width={180}
                height={60}
                className="h-10 w-auto brightness-0 invert"
              />

              <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/55">
                Cape Town&apos;s first laundry & cafe.
                Premium garment care, complimentary coffee,
                and eco-conscious cleaning from start to finish.
              </p>

              {/* Socials */}
              <div className="mt-8 flex gap-3">
                {socials.map((social, index) => {
                  const Icon = social.icon;

                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-background/10 bg-background/5 text-background/60 transition-all duration-300 hover:border-brand-red/40 hover:bg-brand-red hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-heading text-xs uppercase tracking-[0.25em] text-background/40">
                Quick Links
              </h4>

              <nav className="mt-6 flex flex-col gap-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit text-sm text-background/55 transition-all duration-300 hover:translate-x-1 hover:text-background"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-xs uppercase tracking-[0.25em] text-background/40">
                Contact
              </h4>

              <div className="mt-6 space-y-4">
                <a
                  href="tel:+27718385010"
                  className="flex items-center gap-3 text-sm text-background/55 transition-colors hover:text-background"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-red" />
                  +27 71 838 5010
                </a>

                <a
                  href="mailto:info@odancialaundry.co.za"
                  className="flex items-center gap-3 text-sm text-background/55 transition-colors hover:text-background"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-red" />
                  info@odancialaundry.co.za
                </a>

                <div className="flex items-start gap-3 text-sm text-background/55">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  105 Long Street, Cape Town
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-background/60">
                Hours
              </h4>

              <div className="mt-4 flex flex-col gap-2.5 text-sm text-background/50">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 shrink-0" />
                  Mon - Sun: 24 Hours
                </div>

                <div className="pl-6 font-bold">
                  Pickup & Delivery Available Anytime
                </div>
              </div>

              <div className="mt-6 pl-6 text-background/30">
                AI Phone Agent: 24/7
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 text-xs text-background/30 sm:flex-row">
            <span>
              © 2026 Odancia Laundry & Cafe.
              All rights reserved.
            </span>

            <span>
              Designed with coffee in Cape Town
            </span>
          </div>
        </div>
      </footer>

      <PickupDialog
        open={pickupOpen}
        onClose={() => setPickupOpen(false)}
      />
    </>
  );
}