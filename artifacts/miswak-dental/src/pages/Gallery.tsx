import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CTA } from "@/components/sections/CTA";
import { galleryItems } from "@/data/gallery";

const Gallery = () => {
  useEffect(() => {
    document.title = "Gallery — Miswak Dental Hospital & Implant Centre";
    const meta =
      document.querySelector('meta[name="description"]') ||
      document.head.appendChild(Object.assign(document.createElement("meta"), { name: "description" }));
    meta.setAttribute(
      "content",
      "A glimpse inside Miswak Dental Hospital — our clinic, our team and the treatments we deliver every day."
    );
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 bg-gradient-hero">
        <div className="container max-w-4xl text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Gallery</div>
          <h1 className="font-serif text-5xl md:text-6xl text-primary text-balance">
            A look inside our hospital
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Moments from our clinic, our team and the modern dental care we deliver every day at Miswak.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((t, i) => (
              <motion.figure
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                className="group relative overflow-hidden rounded-2xl shadow-card bg-card aspect-square"
              >
                <img
                  src={t.img}
                  alt={t.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-4 text-primary-foreground">
                  <div className="font-serif text-base">{t.title}</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default Gallery;