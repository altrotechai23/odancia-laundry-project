"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Bot, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 right-0 h-64 w-64 rounded-full bg-background blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground">Get in Touch</h1>
            <p className="mt-4 text-lg text-primary-foreground/60 max-w-xl mx-auto">
              Schedule a pickup, ask about pricing, or just come say hi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="relative z-10 -mt-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Phone, label: "Call Us", value: "+27 71 838 5010", href: "tel:+27718385010", color: "bg-brand-red/10 text-brand-red" },
              { icon: Mail, label: "Email", value: "info@odancialaundry.co.za", href: "mailto:info@odancialaundry.co.za", color: "bg-primary/10 text-primary" },
              { icon: MapPin, label: "Visit Us", value: "105 Long Street, Cape Town", color: "bg-primary/10 text-primary" },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-border/40 bg-card p-5 shadow-lg text-center"
              >
                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 font-heading text-sm text-card-foreground">{item.label}</div>
                  {item.href ? (
                  <a href={item.href} className="mt-1 text-xs text-muted-foreground hover:text-primary transition-colors">{item.value}</a>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Sidebar */}
            <motion.div {...fadeUp} className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-border/40 bg-card p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-base text-card-foreground">Business Hours</h3>
                </div>
                <div className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Monday - Friday</span><span className="font-medium text-card-foreground">7:00 - 18:00</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="font-medium text-card-foreground">8:00 - 14:00</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="font-medium text-card-foreground">Closed</span></div>
                </div>
              </div>

              <div className="rounded-2xl gradient-hero p-6 text-primary-foreground">
                <div className="flex items-center gap-3">
                  <Bot className="h-6 w-6" />
                  <h3 className="font-heading text-base">AI Phone Agent</h3>
                </div>
                <p className="mt-3 text-sm text-primary-foreground/70">
                  Available 24/7! Our AI assistant handles scheduling, tracking, and pricing questions around the clock.
                </p>
                <a href="tel:+27718385010" className="mt-5 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:scale-105">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...fadeUp} className="lg:col-span-3">
              <div className="rounded-2xl border border-border/40 bg-card p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h2 className="font-heading text-2xl text-card-foreground">Schedule a Pickup</h2>
                </div>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Send className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-6 font-heading text-xl text-card-foreground">Request Received!</h3>
                    <p className="mt-2 text-muted-foreground">We&apos;ll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-card-foreground">Full Name</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-card-foreground">Phone</label>
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="+27..." />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-card-foreground">Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-card-foreground">Service</label>
                      <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20">
                        <option value="">Select a service</option>
                        <option>Dry Cleaning</option>
                        <option>Wash & Fold</option>
                        <option>Ironing</option>
                        <option>Shoe Care</option>
                        <option>Curtain Cleaning</option>
                        <option>Commercial Service</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-card-foreground">Message</label>
                      <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Tell us about your needs..." />
                    </div>
                    <button type="submit" className="w-full rounded-full gradient-cta px-8 py-3.5 text-base font-semibold text-brand-red-foreground shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl">
                      Submit Request
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-muted/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-foreground">Find Us</h2>
            <p className="mt-2 text-sm text-muted-foreground">105 Long Street, Cape Town City Centre</p>
          </motion.div>
          <div className="overflow-hidden rounded-2xl shadow-xl border border-border/40">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.0!2d18.4195!3d-33.9218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s105+Long+Street+Cape+Town!5e0!3m2!1sen!2sza!4v1"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Odancia Laundry Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
