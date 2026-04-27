import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Reviews as ReviewsSection } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { useEffect } from "react";

const Reviews = () => {
  useEffect(() => {
    document.title = "Patient Reviews & FAQ — Miswak Dental";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 md:pt-40 pb-8 bg-gradient-hero">
        <div className="container">
          <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Patient Stories</div>
          <h1 className="font-serif text-5xl md:text-7xl text-primary text-balance leading-[0.95] max-w-4xl">
            Loved by <em className="not-italic text-accent">2,000+</em> patients.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">Rated 4.5★ on Google. Read what our patients have to say.</p>
        </div>
      </section>
      <ReviewsSection />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default Reviews;
