import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Quote, ArrowRight } from "lucide-react";

const reviews = [
  {
    name: "Zakir Hussain Syed",
    text: "Full facilities available for dental clinic with latest technology equipment. Well experienced doctors, all staff are helping and well mannered.",
  },
  {
    name: "Mohammed Mazharuddin",
    text: "Very professional. Specially Dr. Ismail — polite, respectful to senior citizens, and reasonable charges. I always advise my contacts to visit Miswak for any dental needs.",
  },
  {
    name: "Nishat Kausar",
    text: "Dr Ismail's treatment and behaviour with patients is superb. He has magic in his hands, mashaallah. Thanks a lot — hope to meet you for further treatment, inshaallah.",
  },
];

export const ReviewsPreview = () => (
  <section className="py-24 md:py-32 bg-secondary">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Patient Stories</div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary text-balance leading-tight">
            Rated <span className="text-accent">4.5 ★</span> by 2,000+ patients.
          </h2>
        </div>
        <div className="flex md:justify-end">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-smooth"
          >
            Read all reviews <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.figure
            key={r.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative p-8 rounded-3xl bg-card border border-border shadow-card"
          >
            <Quote className="absolute top-6 right-6 h-8 w-8 text-accent/30" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="text-base text-foreground/80 leading-relaxed mb-6">"{r.text}"</blockquote>
            <figcaption>
              <div className="font-medium text-primary">{r.name}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);