import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const AboutPreview = () => (
  <section className="py-24 md:py-32 bg-secondary">
    <div className="container grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-soft">
          <img src="/treatments/clinic.jpg" alt="Miswak Dental Hospital" className="h-full w-full object-cover" loading="lazy" width={1600} height={900} />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-glow max-w-xs hidden md:block">
          <div className="font-serif text-xl leading-tight">"Caring for your smile is our privilege."</div>
          <div className="mt-2 text-xs opacity-90">— Dr. Majid M. Shaik, Founder</div>
        </div>
      </motion.div>

      <div>
        <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">About Miswak</div>
        <h2 className="font-serif text-4xl md:text-5xl text-primary text-balance leading-tight">
          A premium dental healthcare facility, since November 2002.
        </h2>
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          Established by Dr Shaik Mohammed Majid, Miswak provides world-class dental care delivered by a team of eight specialists. Through deep-rooted expertise in dental ergonomics, our clinical set-up combines the latest equipment with innovative dental technology.
        </p>
        <Link
          to="/about"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-smooth"
        >
          Meet our doctors & team <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);
