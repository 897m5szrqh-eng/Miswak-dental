import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const treatments = [
  { img: "/treatments/gum.jpg", title: "Advance Gum Treatment", desc: "Gum disease — also known as periodontal disease — begins with bacterial growth in the mouth. Localised inflammation of the gingiva is initiated by bacteria in the dental plaque, a microbial biofilm that forms on teeth and gums." },
  { img: "/treatments/braces.jpg", title: "Braces & Aligners", desc: "Dental braces are appliances used to align or straighten the teeth and guide them into the corrected position." },
  { img: "/treatments/crowns.jpg", title: "Bridges & Crowns", desc: "Dental crowns restore the shape, size, and appearance of a tooth. If a major part of the tooth is missing, a crown is the best solution." },
  { img: "/treatments/aligners.jpg", title: "Clear Aligners", desc: "Transparent trays made of special material to straighten teeth — just like braces, but without metal wires and brackets. Custom-made for each patient through a digital scan." },
  { img: "/treatments/filling.jpg", title: "Dental Filling", desc: "A treatment to restore missing tooth structure caused by decay or trauma. Decay makes the tooth hollow — fillings rebuild it." },
  { img: "/treatments/implants.jpg", title: "Dental Implants", desc: "The most popular and ideal solution for replacing missing teeth. Implants have changed the course of dentistry over the last quarter century." },
  { img: "/treatments/dentures.jpg", title: "Dentures", desc: "Removable appliances used as a replacement for missing teeth and tissues — artificial teeth that enable normal functioning of the mouth." },
  { img: "/treatments/kids.jpg", title: "Kids Dentistry", desc: "It's always advised to start caring for your baby's teeth in the very early stages of life — including a daily oral hygiene routine and regular pediatric visits." },
  { img: "/treatments/laser.jpg", title: "Laser Dentistry", desc: "The use of lasers to treat a number of different dental conditions. A more comfortable treatment option for many procedures involving hard or soft tissue." },
  { img: "/treatments/ulcers.jpg", title: "Mouth Ulcers", desc: "Commonly known as canker sores — painful lesions in the mouth, gums, cheeks or lips. In scientific terms, the loss of tissue lining in the mouth." },
  { img: "/treatments/preventive.jpg", title: "Preventive Dentistry", desc: "The aim is to avoid cavities, gum infections, enamel wear and tooth loss. With advancements in dentistry, preventing oral disease is easier than ever — starting from an early age." },
  { img: "/treatments/rct.jpg", title: "Root Canal Treatment", desc: "When tooth decay reaches the third layer and causes inflammation or infection of the pulp, an RCT (Endodontic Treatment) is needed to save the tooth." },
  { img: "/treatments/makeover.jpg", title: "Smile Makeover", desc: "Your smile is a reflection of your oral health. For a complete makeover, beautifully aligned teeth with healthy gums are an absolute necessity." },
  { img: "/treatments/whitening.jpg", title: "Teeth Whitening", desc: "A process of removing stains from the tooth surface and restoring the natural colour of the teeth — a one-time procedure performed by a dentist." },
  { img: "/treatments/wisdom.jpg", title: "Wisdom Teeth Removal", desc: "Wisdom teeth (third molars) are the last to erupt. If they don't erupt properly or are misaligned, they often need to be extracted." },
];

const coreServices = [
  "General Dentistry",
  "Oral Surgery",
  "Emergency Dentistry",
  "Root Canal Treatment",
  "Dental Implants",
  "Cosmetic Dentistry",
];

export const Services = () => (
  <section id="services" className="py-24 md:py-32">
    <div className="container">
      {/* Heading */}
      <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Our Treatment Plans & Specialities</div>
          <h2 className="font-serif text-4xl md:text-6xl text-primary text-balance">
            Every treatment, <em className="not-italic text-accent">under one roof.</em>
          </h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Fifteen specialised treatments, delivered by experienced doctors with the latest equipment. Tap any card to learn more about your care.
        </p>
      </div>

      {/* Treatment cards with descriptions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((t, i) => (
          <motion.article
            key={t.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group bg-card rounded-3xl border border-border overflow-hidden hover:shadow-soft hover:border-accent/40 transition-smooth flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={t.img}
                alt={t.title}
                loading="lazy"
                width={620}
                height={388}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700"
              />
              <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/90 backdrop-blur grid place-items-center text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-serif text-2xl text-primary leading-tight mb-3">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.desc}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-accent group-hover:gap-3 transition-smooth">
                Learn more <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Core specialities band */}
      <div className="mt-20 rounded-[2rem] bg-secondary p-10 md:p-16">
        <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Our Services</div>
        <h3 className="font-serif text-3xl md:text-4xl text-primary mb-10 max-w-2xl">
          Six core specialities delivered with a personal touch.
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
          {coreServices.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-4 pb-6 border-b border-border"
            >
              <span className="font-serif text-2xl text-accent">0{i + 1}</span>
              <span className="font-serif text-xl text-primary">{s}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
