import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { WhyUs } from "@/components/sections/WhyUs";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { CEOMessage } from "@/components/sections/CEOMessage";
import { CoreValues } from "@/components/sections/CoreValues";
import { Symptoms } from "@/components/sections/Symptoms";
import { ReviewsPreview } from "@/components/sections/ReviewsPreview";
import { FAQ } from "@/components/sections/FAQ";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Miswak Dental Hospital & Implant Centre — Crafted Smiles, Compassionate Care";
    const meta = document.querySelector('meta[name="description"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description' }));
    meta.setAttribute('content', "Hyderabad's trusted dental hospital since 2002. Implants, aligners, laser dentistry & more — delivered with world-class care and warmth.");
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <AboutPreview />
      <CEOMessage />
      <CoreValues />
      <Symptoms />
      <ServicesPreview />
      <WhyUs />
      <ReviewsPreview />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
