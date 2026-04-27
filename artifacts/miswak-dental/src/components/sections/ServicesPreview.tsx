import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { treatments } from "@/data/treatments";

export const ServicesPreview = () => (
  <section className="py-24 md:py-32">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Our Services</div>
          <h2 className="font-serif text-4xl md:text-6xl text-primary text-balance">
            Every treatment, <em className="not-italic text-accent">under one roof.</em>
          </h2>
        </div>
        <div className="flex md:justify-end">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-smooth"
          >
            View all 15 treatments <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {treatments.map((t, i) => (
          <motion.div
            key={t.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
          >
            <Link
              to={`/services/${t.slug}`}
              className="group relative aspect-square rounded-2xl overflow-hidden block shadow-card"
            >
              <img
                src={t.img}
                alt={t.title}
                loading="lazy"
                width={480}
                height={480}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90 group-hover:opacity-95 transition-smooth" />
              <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/90 backdrop-blur grid place-items-center text-primary opacity-0 group-hover:opacity-100 transition-smooth">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-serif text-base md:text-lg text-primary-foreground leading-tight">{t.title}</h3>
                <div className="mt-1.5 h-px w-6 bg-accent group-hover:w-12 transition-smooth" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
