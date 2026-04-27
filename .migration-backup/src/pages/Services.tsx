import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CTA } from "@/components/sections/CTA";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { treatments } from "@/data/treatments";
import { useEffect } from "react";

const Services = () => {
  useEffect(() => {
    document.title = "Treatments & Services — Miswak Dental";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page header */}
      <section className="pt-32 md:pt-40 pb-12 bg-gradient-hero">
        <div className="container">
          <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Our Treatment Plans & Specialities</div>
          <h1 className="font-serif text-5xl md:text-7xl text-primary text-balance leading-[0.95] max-w-4xl">
            Every treatment, <em className="not-italic text-accent">under one roof.</em>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Fifteen specialised treatments delivered by experienced doctors with the latest equipment. Click any treatment to learn more.
          </p>
        </div>
      </section>

      {/* Treatment grid with full descriptions */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((t, i) => (
              <motion.article
                key={t.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link
                  to={`/services/${t.slug}`}
                  className="group bg-card rounded-3xl border border-border overflow-hidden hover:shadow-soft hover:border-accent/40 transition-smooth flex flex-col h-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={t.img}
                      alt={t.title}
                      loading="lazy"
                      width={620}
                      height={388}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700"
                    />
                    <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/90 backdrop-blur grid place-items-center text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-serif text-2xl text-primary leading-tight mb-3">{t.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.short}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-accent group-hover:gap-3 transition-smooth">
                      Read more <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default Services;
