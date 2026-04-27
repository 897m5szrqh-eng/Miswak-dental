import { motion } from "framer-motion";

const stats = [
  { value: "1 Lac+", label: "Happy Patients" },
  { value: "10K+", label: "Implants Placed" },
  { value: "25K+", label: "Successful Ortho Cases" },
  { value: "4.5★", label: "2K+ Patient Reviews" },
];

export const Stats = () => (
  <section className="py-16 bg-primary text-primary-foreground">
    <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="text-center md:text-left"
        >
          <div className="font-serif text-5xl md:text-6xl text-accent">{s.value}</div>
          <div className="mt-2 text-sm uppercase tracking-widest opacity-70">{s.label}</div>
        </motion.div>
      ))}
    </div>
  </section>
);
