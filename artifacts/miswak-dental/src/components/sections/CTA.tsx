import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => (
  <section id="contact" className="py-24 md:py-32">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary text-primary-foreground p-10 md:p-20"
      >
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">For Online Appointments</div>
            <h2 className="font-serif text-4xl md:text-6xl text-balance leading-tight">
              Discover the confidence of a radiant smile.
            </h2>
            <p className="mt-6 text-lg opacity-80 max-w-lg">
              Experience comprehensive dental services tailored to your needs. Book an appointment today.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">Book An Appointment <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <a href="tel:+919000000000" className="inline-flex items-center gap-2 px-8 h-14 rounded-full border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-smooth">
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "Established", v: "Nov 2002" },
              { k: "Patients", v: "1 Lac+" },
              { k: "Implants", v: "10K+" },
              { k: "Rating", v: "4.5 ★" },
            ].map(b => (
              <div key={b.k} className="p-5 rounded-2xl bg-primary-foreground/10 backdrop-blur border border-primary-foreground/10">
                <div className="text-xs uppercase tracking-widest opacity-60">{b.k}</div>
                <div className="mt-1 font-serif text-2xl">{b.v}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
