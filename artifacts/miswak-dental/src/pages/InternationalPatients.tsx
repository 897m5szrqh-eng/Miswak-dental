import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, Clock, HeartPulse, UserCheck, Sparkles, PillBottle, Phone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Globe, title: "Cost effective", desc: "World-class care at a fraction of Western prices." },
  { icon: Clock, title: "Timeliness", desc: "Treatment schedules planned around your stay." },
  { icon: HeartPulse, title: "Quality healthcare", desc: "International protocols, sterilised environments." },
  { icon: UserCheck, title: "Personalised care", desc: "A relationship manager dedicated to you." },
  { icon: Sparkles, title: "Sophisticated technology", desc: "Latest equipment for predictable outcomes." },
  { icon: PillBottle, title: "Quick access to medicines", desc: "Pharmacies and labs within easy reach." },
];

const InternationalPatients = () => {
  useEffect(() => {
    document.title = "International Patients — Miswak Dental Hospital & Implant Centre";
    const meta =
      document.querySelector('meta[name="description"]') ||
      document.head.appendChild(Object.assign(document.createElement("meta"), { name: "description" }));
    meta.setAttribute(
      "content",
      "Hyderabad's premier dental destination for international patients — comprehensive care, dedicated coordination and warm hospitality."
    );
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container max-w-4xl text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">For International Patients</div>
          <h1 className="font-serif text-5xl md:text-6xl text-primary text-balance">
            Your dental destination in Hyderabad
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Miswak Dental Hospital welcomes patients from around the world — combining world-class infrastructure,
            highly experienced clinicians and a personal coordinator for every visitor.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl space-y-8 text-base leading-relaxed text-muted-foreground">
          <p>
            Miswak Dental Hospital and Implant Centre is one of the premier dental hospitals located in Hyderabad.
            Our team of expert dentists believe in educating and helping patients understand the best treatments
            available. We offer a wide range of dental services across general dentistry, cosmetic dentistry and
            dental implants — especially fixing your teeth.
          </p>
          <p>
            We believe your smile is one of your greatest assets. Hence we offer affordable, high-quality dental
            treatment using world-class infrastructure. We deliver the very best patient service from highly
            qualified and experienced doctors using state-of-the-art technology — reducing both treatment time and
            the number of visits required.
          </p>
          <p>
            We offer hassle-free dentistry keeping the convenience of our patients in mind. Along with our patients
            in India, international patients can also avail the services of Miswak Dental Hospital and Implant
            Centre. Our team strongly believes in preventive dental care and educates every patient to do the same.
            Our primary objective is to provide personalised, high-quality dental care in a compassionate and
            friendly environment — and to bring brilliant smiles to patients all over the world.
          </p>
          <p>
            MDH is an international dental clinic in Hyderabad. For our international clientele, we provide all the
            best facilities available and make them feel welcome — factors that attract patients from around the
            world to Hyderabad for both treatment and tourism.
          </p>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-primary">Why patients choose Miswak</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl bg-card p-6 shadow-card"
              >
                <div className="h-12 w-12 rounded-xl bg-accent-soft text-accent grid place-items-center mb-4">
                  <b.icon className="h-6 w-6" />
                </div>
                <div className="font-serif text-xl text-primary mb-2">{b.title}</div>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="font-serif text-4xl text-primary mb-6">How to plan your visit</h2>
          <p className="text-muted-foreground leading-relaxed">
            You can contact our international centre via phone, letter or e-mail. You may also book an appointment
            online by sharing your details — including your medical condition, scans and current medications. Once
            you consult with our specialist, our relationship manager will share a detailed plan covering the
            duration of stay, treatment timelines and recovery.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Please carry your <strong className="text-primary">passport</strong> while registering at our centre — a
            mandatory requirement as per the directives of the Government of India.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="hero" size="lg" className="!shadow-none hover:!shadow-none">
              <Link to="/contact">Book an appointment</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+919000000000" className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" /> Call us now
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default InternationalPatients;