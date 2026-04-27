import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CEOMessage = () => (
  <section className="py-24 md:py-32">
    <div className="container grid lg:grid-cols-12 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="lg:col-span-4 relative"
      >
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-soft">
          <img
            src="/treatments/doctor.jpg"
            alt="Dr. Majid M. Shaik, Founder and Director"
            className="h-full w-full object-cover"
            loading="lazy"
            width={640}
            height={800}
          />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-card">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Founder & Director</div>
          <div className="font-serif text-base text-primary mt-1">Dr. Majid M. Shaik</div>
          <div className="text-xs text-muted-foreground">BDS, DMD (USA)</div>
        </div>
      </motion.div>
      <div className="lg:col-span-8">
        <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Message from our CEO</div>
        <h2 className="font-serif text-3xl md:text-5xl text-primary text-balance mb-8 leading-tight">
          "We strive to exceed expectations at every visit."
        </h2>
        <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            At Miswak Dental Hospital and Implant Centre, our focus is on delivering high-quality dental care with compassion, professionalism, and excellence. Since 2002, we have been providing world-class dental services, and our commitment to outstanding patient care has remained unwavering.
          </p>
          <p>
            Our team of highly experienced and dedicated dental professionals is passionate about helping patients achieve and maintain optimal oral health. We believe every patient deserves exceptional care — and we strive to exceed expectations at every visit.
          </p>
        </div>
        <Link
          to="/about"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-smooth"
        >
          Read more about us <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);