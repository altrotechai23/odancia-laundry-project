"use client";

import { useState } from "react";

import { HeroSection } from "@/components/home/HeroSection";
import { ServicesBento } from "@/components/home/services-bento";
import { BeforeAfterShowcase } from "@/components/home/before-after-showcase";
import { FeaturesSection } from "@/components/home/features-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ProcessSection } from "@/components/home/process-section";
import { CTASection } from "@/components/home/cta-section";
import { AboutSection } from "@/components/home/AboutSection";
import CustomMarquee from "@/components/CustomMarquee";
import ShopShowcase from "@/components/home/ShopShowcase";
import { PickupServicesSection } from "@/components/home/PickupFeaturesSection";
import { PickupDialog } from "@/components/booking/PickupDialog";
import { Header } from "@/components/Header";

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => {
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
  };

  return (
    <>
    
      <HeroSection onSchedulePickup={openBooking} />

      <CustomMarquee />

      {/* ========================================================= */}
      {/* ABOUT */}
      {/* ========================================================= */}

      <AboutSection />

      {/* ========================================================= */}
      {/* PICKUP / DELIVERY */}
      {/* ========================================================= */}

      <PickupServicesSection
        onSchedulePickup={openBooking}
      />

      {/* ========================================================= */}
      {/* BEFORE / AFTER */}
      {/* ========================================================= */}

      <BeforeAfterShowcase />

      {/* ========================================================= */}
      {/* SHOP */}
      {/* ========================================================= */}

      <ShopShowcase />

      {/* ========================================================= */}
      {/* SERVICES */}
      {/* ========================================================= */}

      <ServicesBento />

      {/* ========================================================= */}
      {/* FEATURES */}
      {/* ========================================================= */}

      <FeaturesSection />

      {/* ========================================================= */}
      {/* TESTIMONIALS */}
      {/* ========================================================= */}

      <TestimonialsSection />

      {/* ========================================================= */}
      {/* PROCESS */}
      {/* ========================================================= */}

      <ProcessSection />

      {/* ========================================================= */}
      {/* CTA */}
      {/* ========================================================= */}

      <CTASection />

      {/* ========================================================= */}
      {/* SINGLE BOOKING DIALOG */}
      {/* ========================================================= */}

      <PickupDialog
        open={bookingOpen}
        onClose={closeBooking}
      />
    </>
  );
}

