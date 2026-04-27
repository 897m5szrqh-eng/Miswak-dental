import { motion } from "framer-motion";
import { Check } from "lucide-react";

const values = [
  { title: "Patient Trust", desc: "We understand that trust is the foundation of our relationship with our patients." },
  { title: "Respect", desc: "We are dedicated to treating all patients, staff, and visitors with dignity and respect." },
  { title: "Integrity", desc: "We are committed to maintaining the highest levels of integrity in all aspects of our operations." },
  { title: "Responsibility", desc: "We take responsibility for delivering exceptional outcomes and dependable care, every visit." },
];

export const CoreValues = () => (
  <section className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <div className="max-w-2xl mb-14">
        <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Our Core Values</div>
        <h2 className="font-serif text-4xl md:text-5xl text-primary text-balance">The principles we live by.</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-7 rounded-3xl bg-card border border-border"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-accent grid place-items-center text-accent-foreground mb-5">
              <Check className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-2xl text-primary mb-3">{v.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);