import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Zakir Hussain Syed",
    text: "Full facilities available for dental clinic with latest technology equipment. Well experienced doctors, all staff are helping and well mannered.",
  },
  {
    name: "Mohammed Mazharuddin",
    text: "I have good experience, very professional. Specially Dr. Ismail — he's very polite and giving respect to senior citizens, charging very reasonable. Alhamdulillah, I feel free to go and advising my contact peoples to visit for any dental needs. Always praying for success.",
  },
  {
    name: "Nishat Kausar",
    text: "Dr Ismail's treatment and behaviour with patients is superb. He has magic in his hands, Allah has given shifa in his hands, mashaallah. And moreover this time I got the opportunity to look at his face without our 😷. Thanks a lot sir, hope to meet you for further treatment next time, inshaallah.",
  },
];

export const Reviews = () => (
  <section id="reviews" className="py-24 md:py-32">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Patient Stories</div>
        <h2 className="font-serif text-4xl md:text-5xl text-primary text-balance">
          Rated <span className="text-accent">4.5 ★</span> by 2,000+ patients.
        </h2>
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
              {[...Array(5)].map((_,i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
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
