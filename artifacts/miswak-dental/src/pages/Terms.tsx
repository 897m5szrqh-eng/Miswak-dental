import { useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

const consentItems: { title: string; body: string }[] = [
  {
    title: "1. Examination and X-rays",
    body: "I understand that the initial visit may require radiographs in order to complete the examination, diagnosis, and treatment plan.",
  },
  {
    title: "2. Drugs, Medication and Sedation",
    body: "I have been informed and understand that antibiotics, analgesics and other medications can cause allergic reactions causing redness, swelling of tissues, pain, itching, vomiting and/or anaphylactic shock. They may cause drowsiness and lack of awareness and coordination, which can be increased by the use of alcohol or other drugs. I agree not to operate any vehicle or hazardous device for at least 12 hours or until fully recovered from the effects of medication. Failure to take medications as prescribed may risk continued or aggravated infection. I understand that antibiotics can reduce the effectiveness of oral contraceptives.",
  },
  {
    title: "3. Changes in Treatment Plan",
    body: "I understand that during treatment it may be necessary to change or add procedures because of conditions found while working on teeth that were not discovered during examination — the most common being root canal therapy following routine restorative procedures. I give my permission to the Dentist to make any or all changes and additions as necessary.",
  },
  {
    title: "4. Temporomandibular Joint Dysfunction (TMJ)",
    body: "I understand that symptoms of popping, clicking, locking and pain can intensify or develop in the joint of the lower jaw subsequent to routine dental treatment wherein the mouth is held in the open position. Symptoms of TMJ associated with dental treatment are usually transitory and well tolerated. Should treatment be required, I will be referred to a specialist at my own cost.",
  },
  {
    title: "5. Fillings",
    body: "I understand that care must be exercised in chewing on a filling during the first 24 hours to avoid breakage, and tooth sensitivity is a common after-effect of a newly placed filling.",
  },
  {
    title: "6. Removal of Teeth (Extraction)",
    body: "Alternatives to removal have been explained to me (root canal therapy, crowns, periodontal surgery, etc.). I authorise the Dentist to remove the agreed teeth and any others necessary. I understand the risks involved including pain, swelling, infection, dry socket, loss of feeling in teeth, lips, tongue and surrounding tissue, or fractured jaw. Further specialist treatment or hospitalisation may be required at my own cost.",
  },
  {
    title: "7. Crowns, Bridges, Veneers and Bonding",
    body: "I understand it is sometimes not possible to match the colour of natural teeth exactly with artificial teeth. Temporary crowns may come off easily and must be kept on until the permanent crowns are delivered. The final opportunity to make changes will be done before cementation. In rare cases, cosmetic procedures may result in the need for future root canal treatment.",
  },
  {
    title: "8. Dentures – Complete or Partial",
    body: "I realise that full or partial dentures are artificial. The problems of wearing these appliances — including looseness, soreness and possible breakage — have been explained to me. The final opportunity to make changes will be at the 'teeth in wax' try-in visit. Most dentures require relining approximately three to twelve months after initial placement, the cost of which is not included in the initial fee.",
  },
  {
    title: "9. Endodontic Treatment (Root Canal)",
    body: "I realise there is no guarantee that root canal treatment will save my tooth and complications can occur. Occasionally, additional surgical procedures (apicoectomy) may be necessary following root canal treatment.",
  },
  {
    title: "10. Periodontal Treatment",
    body: "I understand that gum inflammation and bone loss can lead to the loss of teeth. Alternative plans — including non-surgical cleaning, gum surgery and extractions — have been explained. Treatment success depends in part on my efforts to brush and floss daily, attend regular cleanings, follow a healthy diet and avoid tobacco.",
  },
];

const Terms = () => {
  useEffect(() => {
    document.title = "Terms & Conditions — Miswak Dental Hospital & Implant Centre";
    const meta =
      document.querySelector('meta[name="description"]') ||
      document.head.appendChild(Object.assign(document.createElement("meta"), { name: "description" }));
    meta.setAttribute(
      "content",
      "Terms of service, patient consent and privacy policy for Miswak Dental Hospital & Implant Centre, Hyderabad."
    );
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 bg-gradient-hero">
        <div className="container max-w-4xl text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Legal</div>
          <h1 className="font-serif text-5xl md:text-6xl text-primary text-balance">
            Terms & Conditions
          </h1>
          <p className="mt-6 text-muted-foreground">
            Terms of Service and Privacy Policy applicable to miswakdental.com
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl space-y-12 text-muted-foreground leading-relaxed">
          <div className="space-y-4">
            <p>
              Miswakdental.com recognises the importance of maintaining your privacy. This Policy describes how we
              treat user information we collect on{" "}
              <a href="https://www.miswakdental.com" className="text-accent hover:underline">www.miswakdental.com</a>
              {" "}and other offline sources. By visiting and/or using our website, you agree to this Privacy Policy
              and Terms of Service.
            </p>
            <p>
              Miswakdental.com is a property of Miswak Dental Hospital, an Indian company registered under the
              Companies Act, 2013, with its registered office at 10-3-15, Muhammad Mansion, Opp. NMDC building,
              below Tapadia Diagnostics / MS College, Masab Tank, Hyderabad, Telangana 500028.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-primary mb-4">Foreign Nationals</h2>
            <p>MDH requires a passport and visa copy of patients and their attendants to issue any letters.</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-primary mb-4">Terms & Conditions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                For insurance claims, copies of medical letters, discharge summaries, billing and invoices are
                issued only once treatment is completed and full payments are made.
              </li>
              <li>Miswak Dental Hospital is not responsible for any failure of an insurance claim.</li>
              <li>
                MDH will not issue any letters if treatment is incomplete, payment is unpaid, or false personal
                information / treatment plans / payment amounts are provided.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-primary mb-6">Patient's Consent to Treatment</h2>
            <div className="space-y-6">
              {consentItems.map((c) => (
                <div key={c.title}>
                  <h3 className="font-serif text-lg text-primary mb-2">{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-primary mb-4">Privacy Policy</h2>
            <p className="mb-3"><strong className="text-primary">Information we collect:</strong> contact details (name, email, phone, address, IP), payment & billing information (we never store credit card numbers — payments are handled by our online payment partners), information you post in public spaces on our website, demographic information, and technical information about your device and browsing behaviour.</p>
            <p className="mb-3"><strong className="text-primary">How we use it:</strong> to confirm appointments, respond to your queries, improve our services, analyse trends, secure our systems, send promotional and transactional communications, and as otherwise permitted by law.</p>
            <p className="mb-3"><strong className="text-primary">Sharing:</strong> with vendors performing services on our behalf, within our organisation, with business partners, where legally required, and with any successor to our business. We will tell you before sharing for any other reason.</p>
            <p><strong className="text-primary">Email opt-out:</strong> you can unsubscribe from our marketing emails at any time by emailing{" "}
              <a href="mailto:info@miswakdental.com" className="text-accent hover:underline">info@miswakdental.com</a>{" "}or
              clicking the unsubscribe link. We will continue to send transactional messages relating to your treatment.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-primary mb-4">Grievance Officer</h2>
            <p>
              In accordance with the Information Technology Act 2000 and the rules made thereunder:
            </p>
            <div className="mt-4 rounded-2xl bg-secondary p-6">
              <div className="font-serif text-lg text-primary">Dr. Shaik Mohammed Majid</div>
              <p className="mt-2 text-sm">
                #10-3-15, Muhammad Mansion, Opp. NMDC,<br />
                Masab Tank, Hyderabad, Telangana, 500028<br />
                Phone: <a href="tel:+914066366260" className="text-accent hover:underline">(040) 6636 6260</a><br />
                Email: <a href="mailto:info@miswakdental.com" className="text-accent hover:underline">info@miswakdental.com</a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-primary mb-4">Jurisdiction</h2>
            <p>
              If you choose to visit the website, your visit and any dispute over privacy is subject to this Policy
              and the website's terms of use. Any disputes arising under this Policy shall be governed by the laws
              of India.
            </p>
          </div>

          <p className="text-xs">This policy was last updated on 10 March 2023.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Terms;