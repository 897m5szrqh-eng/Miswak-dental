import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How often should I see a dentist?",
    a: "It is recommended that everyone should be visiting a dentist at least twice a year for a check-up and professional cleaning. If you have not seen a dentist for a while, you must schedule an appointment as soon as possible.",
  },
  {
    q: "What does \"painless dentistry\" mean?",
    a: "We understand that going to the dentist can make some people feel anxious. Painless dentistry is a means of ensuring your total experience in our office is as stress-free and as much pain-free as possible.",
  },
  {
    q: "What should I expect during my appointment?",
    a: "When you first arrive at Miswak Dental Hospital and Implant Centre, you will be welcomed by a friendly staff member who will work with you in registering you as a patient. After registration, we gather your medical and dental history. We examine your teeth and gums, screen for oral cancer and make X-rays as needed. If treatment is necessary, your dentist will thoroughly explain why it is recommended and the benefits. Our treatment coordinator will discuss fee payment options and either begin the treatment or set up a treatment appointment. During regular follow-up visits, we examine your teeth and gums, screen for oral cancer, thoroughly clean your teeth and make plans for treatment as needed.",
  },
];

export const FAQ = () => (
  <section id="faq" className="py-24 md:py-32 bg-secondary">
    <div className="container max-w-4xl">
      <div className="text-center mb-14">
        <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">FAQ</div>
        <h2 className="font-serif text-4xl md:text-5xl text-primary">Frequently asked questions</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-2xl px-6 data-[state=open]:shadow-card transition-smooth">
            <AccordionTrigger className="font-serif text-lg md:text-xl text-primary text-left hover:no-underline py-6">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
