import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, AlertCircle } from "lucide-react";

const symptoms = [
  { symptom: "Bleeding or swollen gums", treatment: "Advance Gum Treatment", slug: "advance-gum-treatment" },
  { symptom: "Crooked or misaligned teeth", treatment: "Braces & Aligners", slug: "braces-and-aligners" },
  { symptom: "Missing or broken teeth", treatment: "Bridges & Crowns", slug: "bridges-and-crowns" },
  { symptom: "Persistent toothache", treatment: "Root Canal Treatment", slug: "root-canal-treatment" },
  { symptom: "Stained or discoloured teeth", treatment: "Teeth Whitening", slug: "teeth-whitening" },
  { symptom: "Gap from a missing tooth", treatment: "Dental Implants", slug: "dental-implants" },
];

export const Symptoms = () => (
  <section className="py-24 md:py-32">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Symptoms & Treatments</div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary text-balance leading-tight">
            Recognise the signs. <em className="not-italic text-accent">Find the right care.</em>
          </h2>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Many dental issues start small — early action prevents bigger problems. Match what you're feeling to the treatment that helps.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {symptoms.map((s, i) => (
          <motion.div
            key={s.symptom}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
          >
            <Link
              to={`/services/${s.slug}`}
              className="group block h-full p-7 rounded-3xl bg-card border border-border hover:border-accent hover:shadow-card transition-smooth"
            >
              <div className="h-10 w-10 rounded-full bg-accent/10 grid place-items-center text-accent mb-5">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">If you have</div>
              <h3 className="font-serif text-xl text-primary mb-5 leading-snug">{s.symptom}</h3>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Recommended</div>
                  <div className="text-sm font-medium text-primary group-hover:text-accent transition-smooth">{s.treatment}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-accent translate-x-0 group-hover:translate-x-1 transition-smooth" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);