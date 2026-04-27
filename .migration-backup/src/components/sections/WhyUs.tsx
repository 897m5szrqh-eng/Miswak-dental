import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Microscope, Award } from "lucide-react";

const items = [
  { icon: Award, title: "24+ Years Established", desc: "Premium dental healthcare since November 2002 in the heart of the city." },
  { icon: HeartHandshake, title: "Personal Touch", desc: "Comprehensive dental services delivered with personalised attention and genuine care." },
  { icon: Microscope, title: "Latest Technology", desc: "State-of-the-art Implant Centre with the latest equipment and innovative dental technology." },
  { icon: ShieldCheck, title: "Painless Dentistry", desc: "Stress-free, pain-free experience designed around your comfort." },
];

export const WhyUs = () => (
  <section id="why" className="py-24 md:py-32">
    <div className="container">
      <div className="max-w-2xl mb-16">
        <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Why Miswak</div>
        <h2 className="font-serif text-4xl md:text-6xl text-primary text-balance">
          Comprehensive care, with a <em className="not-italic text-accent">personal touch.</em>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-8 rounded-3xl bg-gradient-primary text-primary-foreground hover:shadow-glow transition-smooth"
          >
            <it.icon className="h-8 w-8 text-accent mb-6" />
            <h3 className="font-serif text-2xl mb-3">{it.title}</h3>
            <p className="text-sm opacity-80 leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
