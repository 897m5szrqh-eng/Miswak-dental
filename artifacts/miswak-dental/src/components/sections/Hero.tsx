import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-20 -left-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 backdrop-blur border border-border text-xs font-medium text-primary mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Established November 2002 · 24+ years of trust
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary leading-[0.95] text-balance"
          >
            Bringing smiles<br />
            to people's lives,<br />
            <em className="text-accent not-italic font-normal">for over 24 years.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg text-muted-foreground max-w-xl text-balance"
          >
            Experience comprehensive dental services with a personal touch. Miswak Dental Hospital & Implant Centre delivers world-class dental care with compassion, professionalism and excellence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button asChild variant="hero" size="xl" className="!shadow-none hover:!shadow-none">
              <Link to="/contact">Book an appointment <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outlineDark" size="xl">
              <Link to="/services">Our services</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_,i) => <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-accent text-accent' : 'fill-accent/50 text-accent'}`} />)}
                <span className="ml-1 font-semibold text-primary">4.5</span>
              </div>
              <div className="text-xs text-muted-foreground">2K+ patient reviews</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-soft">
            <img src="/treatments/anniversary.jpg" alt="Miswak Dental — celebrating over 24 years of care" className="h-full w-full object-cover" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -left-4 md:-left-12 top-12 bg-card rounded-2xl shadow-card p-4 border border-border"
          >
            <div className="text-3xl font-serif text-primary">10K+</div>
            <div className="text-xs text-muted-foreground">Implants placed</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute -right-2 md:-right-8 bottom-16 bg-primary text-primary-foreground rounded-2xl shadow-glow p-5"
          >
            <div className="text-xs uppercase tracking-widest opacity-70">Since</div>
            <div className="text-4xl font-serif">2002</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
