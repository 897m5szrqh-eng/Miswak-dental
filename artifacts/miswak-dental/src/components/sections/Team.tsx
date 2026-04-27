import { motion } from "framer-motion";

const doctors = [
  { img: "/treatments/dr-ismail.jpg", name: "Dr. Ismail Qureshi", creds: "BDS, Associate General Dentist", role: "Assistant Director", years: "18+ Years" },
  { img: "/treatments/dr-lukhman.jpg", name: "Dr. Lukhman Qureshi", creds: "BDS, Associate General Dentist", role: "Assistant Director", years: "15+ Years" },
  { img: "/treatments/dr-asadullah.jpg", name: "Dr. Mohammed Asadullah Khan", creds: "BDS, MDS – Orthodontics, Fellowship in Craniofacial Orthodontics", role: "Orthodontist", years: "17+ Years" },
  { img: "/treatments/dr-taha.jpg", name: "Dr. Taha Siddiqui", creds: "BDS, MDS – Orthodontics, Fellowship in Craniofacial Orthodontics", role: "Orthodontist", years: "14+ Years" },
  { img: "/treatments/dr-azhar.jpg", name: "Dr. Azhar Mohiuddin", creds: "BDS, MDS – Oral and Maxillofacial Surgeon", role: "Oral Surgeon", years: "14+ Years" },
  { img: "/treatments/dr-toufeek.jpg", name: "Dr. Mohammad Toufeek", creds: "BDS, MDS – Oral and Maxillofacial Surgeon", role: "Oral Surgeon", years: "10+ Years" },
  { img: "/treatments/dr-farah.jpg", name: "Dr. Amtul Safia Farah", creds: "BDS, Miswak Associate", role: "General Dentist", years: "10+ Years" },
  { img: "/treatments/dr-shariqa.jpg", name: "Dr. Shariqa Riaz", creds: "BDS, Miswak Associate", role: "General Dentist", years: "6+ Years" },
];

export const Team = () => (
  <section id="team" className="py-24 md:py-32 bg-secondary">
    <div className="container">
      {/* Heading */}
      <div className="grid md:grid-cols-2 gap-10 items-end mb-16">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Meet Our Doctors</div>
          <h2 className="font-serif text-4xl md:text-6xl text-primary text-balance leading-tight">
            A team of <em className="not-italic text-accent">specialists,</em><br />united by care.
          </h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Eight specialists across general dentistry, orthodontics, oral surgery and implantology — each bringing years of experience and a shared commitment to your comfort.
        </p>
      </div>

      {/* Doctor grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {doctors.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            className="group"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-card">
              <img
                src={d.img}
                alt={d.name}
                loading="lazy"
                width={500}
                height={650}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/0 to-transparent" />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-medium uppercase tracking-widest">
                {d.years}
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] uppercase tracking-widest text-primary-foreground/80">{d.role}</div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-lg text-primary leading-tight">{d.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{d.creds}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Admin / Operations */}
      <div className="mt-24 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-soft">
            <img src="/treatments/jaweed.jpg" alt="Jaweed M. Shaik, Partner & Director Operations" className="h-full w-full object-cover" loading="lazy" width={900} height={500} />
          </div>
        </motion.div>
        <div className="lg:col-span-7">
          <div className="text-sm uppercase tracking-[0.25em] text-accent mb-4">Meet Our Admin Team</div>
          <h3 className="font-serif text-3xl md:text-4xl text-primary mb-2 leading-tight">Jaweed M. Shaik</h3>
          <div className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Partner / Director Operations</div>
          <p className="text-muted-foreground leading-relaxed">
            Jaweed Shaik is the Partner and Director of Operations at Miswak Dental Hospital and Implant Centre. A highly qualified and results-driven professional, he brings strong leadership, strategic vision, and operational excellence to the organization. With extensive experience in healthcare management, he oversees daily operations, optimizes systems, and ensures the highest standards of service delivery and patient care. Mr. Jaweed Shaik plays a vital role in fostering a culture of excellence, trust, and continuous growth at Miswak Dental Hospital.
          </p>
        </div>
      </div>

      {/* Full team group photo */}
      <motion.figure
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-20"
      >
        <div className="aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-soft">
          <img src="/treatments/team-group.jpg" alt="The full Miswak Dental team" className="h-full w-full object-cover" loading="lazy" width={1400} height={900} />
        </div>
        <figcaption className="mt-5 text-sm text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
          (Right to left) Dr. Majid Shaik, Dr. Ismail Qureshi, Dr. Luqman Qureshi, Syed Waseemullah Hussaini (Senior Dental Assistant), Syed Abdul Majeed (Manager Front Office), Mohammed Aqueel Ahmed (Senior Manager Front Office), Tauheed (Jr. Dental Assistant). <span className="block mt-1 opacity-70">(Row behind) Ammar Ahmed Khan (Manager IT/Marketing), Jaweed M. Shaik (Partner/Director Operations), Mir Mazher Ali (Manager Admin.).</span>
        </figcaption>
      </motion.figure>
    </div>
  </section>
);
