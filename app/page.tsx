// app/page.tsx
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesBento } from "@/components/home/services-bento";
import { BeforeAfterShowcase } from "@/components/home/before-after-showcase"
import { FeaturesSection } from "@/components/home/features-section";
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { ProcessSection } from "@/components/home/process-section";
import { CTASection } from "@/components/home/cta-section";
import { AboutSection } from "@/components/home/AboutSection";
import CustomMarquee from "@/components/CustomMarquee";
import StatsBars from "@/components/home/StatsBars";
import ShopShowcase from "@/components/home/ShopShowcase";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CustomMarquee />
      <AboutSection />
      <BeforeAfterShowcase />
      <ShopShowcase />
      <StatsBars />
      <ServicesBento />  
      <FeaturesSection />
      <TestimonialsSection />
      <ProcessSection />
      <CTASection />
    </>
  )
}