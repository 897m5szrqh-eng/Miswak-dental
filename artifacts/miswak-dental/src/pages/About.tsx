import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { About as AboutSection } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { CTA } from "@/components/sections/CTA";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About Us — Miswak Dental Hospital & Implant Centre";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 md:pt-40 pb-8 bg-gradient-hero">
        <div className="container">
          <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">About Us</div>
          <h1 className="font-serif text-5xl md:text-7xl text-primary text-balance leading-[0.95] max-w-4xl">
            Two decades of <em className="not-italic text-accent">crafted</em> smiles.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Meet the doctors, the leadership and the team behind Miswak Dental Hospital & Implant Centre.
          </p>
        </div>
      </section>
      <AboutSection />
      <Team />
      <CTA />
      <Footer />
    </main>
  );
};

export default About;
