import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CTA } from "@/components/sections/CTA";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTreatment, treatments } from "@/data/treatments";
import { useEffect } from "react";
import { motion } from "framer-motion";

const TreatmentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const t = slug ? getTreatment(slug) : undefined;

  useEffect(() => {
    if (t) {
      document.title = `${t.title} — Miswak Dental`;
      const meta = document.querySelector('meta[name="description"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description' }));
      meta.setAttribute('content', t.short);
    }
    window.scrollTo(0, 0);
  }, [t]);

  if (!t) return <Navigate to="/services" replace />;

  const related = treatments.filter((x) => x.slug !== t.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-28 md:pt-32">
        {/* Hero */}
        <section className="bg-gradient-hero pb-12 md:pb-20">
          <div className="container">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-smooth mb-8 mt-4">
              <ArrowLeft className="h-4 w-4" /> All treatments
            </Link>
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Treatment</div>
                <h1 className="font-serif text-5xl md:text-7xl text-primary text-balance leading-[0.95]">{t.title}</h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl">{t.short}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild variant="hero" size="lg">
                    <Link to="/contact">Book consultation</Link>
                  </Button>
                  <a href="tel:+919000000000" className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth">
                    <Phone className="h-4 w-4" /> Call us
                  </a>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-soft">
                  <img src={t.img} alt={t.title} className="h-full w-full object-cover" width={800} height={800} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Body copy */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl">
            <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Overview</div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary text-balance mb-8 leading-tight">
              What you should know about {t.title.toLowerCase()}.
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              {t.long.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Related Treatments</div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-10">You might also explore</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/services/${r.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card hover:border-accent/40 transition-smooth"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={r.img} alt={r.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-serif text-lg text-primary">{r.title}</h3>
                      <ArrowUpRight className="h-4 w-4 text-accent shrink-0" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CTA />
      <Footer />
    </main>
  );
};

export default TreatmentDetail;
