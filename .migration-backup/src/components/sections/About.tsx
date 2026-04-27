import { motion } from "framer-motion";
import { Check } from "lucide-react";

const values = [
  { title: "Patient Trust", desc: "We understand that trust is the foundation of our relationship with our patients." },
  { title: "Respect", desc: "At Miswak, we are dedicated to treating all patients, staff, and visitors with dignity and respect." },
  { title: "Integrity", desc: "We are committed to maintaining the highest levels of integrity in all aspects of our operations." },
  { title: "Responsibility", desc: "We are committed to maintaining the highest levels of responsibility in all aspects of our operations." },
];

export const About = () => (
  <>
    <section id="about" className="py-24 md:py-32 bg-secondary">
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
            <div className="mt-2 text-xs opacity-90">— Dr. Majid M. Shaik, BDS, DMD (USA)</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Founder & Director</div>
          </div>
        </motion.div>

        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Get to Know Miswak</div>
          <h2 className="font-serif text-4xl md:text-5xl text-primary text-balance leading-tight">
            A premium dental healthcare facility, since November 2002.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Established by <strong className="text-primary">Dr Shaik Mohammed Majid</strong> in the heart of the city, Miswak provides world-class dental care. Through his deep-rooted architectural skills in dental ergonomics, Dr Majid designed his clinical set-up with the latest equipment and innovative dental technology. Miswak has since grown rapidly to handle a wide range of indigenous and international outpatient services.
          </p>
        </div>
      </div>
    </section>

    {/* CEO message */}
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
            <img src="/treatments/doctor.jpg" alt="Dr. Majid M. Shaik, Founder and Director" className="h-full w-full object-cover" loading="lazy" width={640} height={800} />
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
              Our team of highly experienced and dedicated dental professionals is passionate about helping patients achieve and maintain optimal oral health. We understand that visiting the dentist can sometimes feel stressful, which is why we are committed to creating a comfortable, welcoming, and relaxed environment.
            </p>
            <p>
              At Miswak Dental Hospital, we believe every patient deserves exceptional dental care, and we strive to exceed expectations at every visit.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Core values */}
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
  </>
);
