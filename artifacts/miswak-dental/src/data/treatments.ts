export type Treatment = {
  slug: string;
  title: string;
  img: string;
  short: string;
  long: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "advance-gum-treatment",
    title: "Advance Gum Treatment",
    img: "/treatments/gum.jpg",
    short: "Gum disease begins with bacterial growth that inflames the gingiva.",
    long: [
      "Gum disease — also known as periodontal disease — begins with bacterial growth in the mouth. Localised inflammation of the gingiva is initiated by bacteria in the dental plaque, a microbial biofilm that forms on teeth and gums.",
      "Left untreated, periodontal disease can lead to receding gums, bone loss and even tooth loss. Our advanced gum treatment includes scaling, root planing, laser therapy and ongoing periodontal maintenance — tailored to the severity of each case.",
    ],
  },
  {
    slug: "braces-and-aligners",
    title: "Braces & Aligners",
    img: "/treatments/braces.jpg",
    short: "Appliances that align and straighten teeth into the corrected position.",
    long: [
      "Dental braces are appliances used to align or straighten the teeth and guide them into the corrected position.",
      "Our orthodontists offer a range of options — from traditional metal braces to ceramic and lingual systems — designed to fit your lifestyle while delivering precise, long-lasting results.",
    ],
  },
  {
    slug: "bridges-and-crowns",
    title: "Bridges & Crowns",
    img: "/treatments/crowns.jpg",
    short: "Restore the shape, size and appearance of damaged or missing teeth.",
    long: [
      "Dental crowns are placed on the tooth to restore its shape, size, and appearance. If the major part of the tooth is missing, a crown is the best solution for it.",
      "Bridges replace one or more missing teeth by anchoring to the adjacent natural teeth or implants. We craft crowns and bridges from porcelain, zirconia and metal-ceramic materials — colour-matched for a seamless smile.",
    ],
  },
  {
    slug: "clear-aligners",
    title: "Clear Aligners",
    img: "/treatments/aligners.jpg",
    short: "Transparent trays that straighten teeth without metal wires or brackets.",
    long: [
      "Clear aligners are transparent trays made of special material which are used to straighten teeth just like braces. They use gentle and constant force to move the teeth into the required position without the hassles of metal wires and brackets.",
      "They are custom-made for each patient through a digital scan, and worn 20–22 hours a day. Most cases complete in 6 to 18 months, with virtually invisible appearance throughout treatment.",
    ],
  },
  {
    slug: "dental-filling",
    title: "Dental Filling",
    img: "/treatments/filling.jpg",
    short: "Restoring missing tooth structure caused by decay or trauma.",
    long: [
      "Dental filling is a treatment modality to restore missing tooth structure which could have been a result of decay or trauma. Decay makes the tooth hollow.",
      "We offer tooth-coloured composite fillings, glass ionomer cements and ceramic inlays — restoring both function and appearance in a single visit.",
    ],
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    img: "/treatments/implants.jpg",
    short: "The most ideal long-term solution for replacing missing teeth.",
    long: [
      "Dental implants are the most popular and ideal solution for replacing missing tooth/teeth. They have definitely changed the course of dentistry in the last quarter of a century or so.",
      "At Miswak's state-of-the-art Implant Centre, we use leading global implant systems and digital planning to deliver predictable, long-lasting results — from single-tooth implants to full-arch rehabilitation.",
    ],
  },
  {
    slug: "dentures",
    title: "Dentures",
    img: "/treatments/dentures.jpg",
    short: "Removable replacements for missing teeth that restore everyday function.",
    long: [
      "Dentures are removable appliances which are used as a replacement for missing teeth and tissues. They are the artificial teeth which enable the normal functioning of the human mouth.",
      "We offer complete dentures, partial dentures and implant-supported overdentures — each fitted with care for comfort, stability and a natural look.",
    ],
  },
  {
    slug: "kids-dentistry",
    title: "Kids Dentistry",
    img: "/treatments/kids.jpg",
    short: "Gentle, child-friendly care from the very first tooth.",
    long: [
      "It is always advised to start taking care of your baby's teeth in the very early stages of their life. This includes setting an oral hygiene routine and regular visits to a paediatric dentist.",
      "Our paediatric services include preventive cleanings, fluoride treatment, sealants, and child-friendly education — all in a calm, welcoming environment designed for little patients.",
    ],
  },
  {
    slug: "laser-dentistry",
    title: "Laser Dentistry",
    img: "/treatments/laser.jpg",
    short: "Comfortable, precise treatment using advanced laser technology.",
    long: [
      "Laser dentistry is the use of lasers to treat a number of different dental conditions. It potentially offers a more comfortable treatment option for many dental procedures involving hard or soft tissue compared to drills and other non-laser tools.",
      "We use lasers for gum contouring, frenectomy, decay removal, biopsies and teeth whitening — often without the need for anaesthesia or sutures.",
    ],
  },
  {
    slug: "mouth-ulcers",
    title: "Mouth Ulcers",
    img: "/treatments/ulcers.jpg",
    short: "Painful lesions in the mouth — diagnosed and treated quickly.",
    long: [
      "Mouth ulcers, commonly known as canker sores, are painful lesions in the mouth or at the base of the gums or inside cheeks or lips. In scientific terms, it is the loss of tissue lining in the mouth.",
      "Most ulcers heal on their own, but recurring or persistent ulcers may indicate an underlying issue. We offer diagnosis, topical treatment, laser therapy and lifestyle guidance to bring relief and prevent recurrence.",
    ],
  },
  {
    slug: "preventive-dentistry",
    title: "Preventive Dentistry",
    img: "/treatments/preventive.jpg",
    short: "Routine care that keeps your smile healthy for life.",
    long: [
      "The main aim is to avoid cavities, gum infections, enamel wear, tooth loss and more. With the advent of years of refined diet, we have become more susceptible to oral diseases and hence maintaining them has become extremely important.",
      "With advancements in dentistry, prevention of oral diseases has become easier. Maintenance of oral hygiene has to be practiced from an early age — and our preventive programme includes professional cleanings, screenings, fluoride and sealants.",
    ],
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    img: "/treatments/rct.jpg",
    short: "Save and restore an infected tooth with painless endodontic treatment.",
    long: [
      "The outer portion of a tooth is a three-layered structure. In case the tooth decay reaches the third layer and causes inflammation or infection of the pulp, an RCT or endodontic treatment is needed.",
      "We perform single-visit and multi-visit root canal treatments using rotary endodontics and apex locators — making the procedure faster, more accurate and virtually painless.",
    ],
  },
  {
    slug: "smile-makeover",
    title: "Smile Makeover",
    img: "/treatments/makeover.jpg",
    short: "A complete cosmetic transformation tailored to your face and personality.",
    long: [
      "The smile is a reflection of one's oral health! For a smile-makeover, beautifully aligned teeth with healthy gums is an absolute necessity.",
      "A smile makeover may combine veneers, whitening, gum contouring, orthodontics and implants — planned together for a natural, confident result that complements your face.",
    ],
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    img: "/treatments/whitening.jpg",
    short: "Remove stains and restore the natural brightness of your teeth.",
    long: [
      "Teeth whitening is a process of removing stains from the tooth surface and restoring the natural colour of the teeth. Whitening is a one-time procedure performed by a dentist.",
      "We offer in-office whitening for fast, dramatic results, as well as professionally supervised at-home kits for gradual brightening — both safer and far more effective than over-the-counter alternatives.",
    ],
  },
  {
    slug: "wisdom-teeth-removal",
    title: "Wisdom Teeth Removal",
    img: "/treatments/wisdom.jpg",
    short: "Safe extraction of misaligned or impacted third molars.",
    long: [
      "Wisdom teeth — often known as third molars — are the last teeth to erupt. The problem with third molars is that in case they do not erupt properly or are misaligned, they would need to be extracted.",
      "Our oral and maxillofacial surgeons perform wisdom tooth extractions — including impacted cases — under local or sedation anaesthesia, with careful aftercare to ensure a smooth recovery.",
    ],
  },
];

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
