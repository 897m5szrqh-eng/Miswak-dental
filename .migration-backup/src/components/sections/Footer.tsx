import { Link } from "react-router-dom";
import logo from "@/assets/miswak-logo.png";
import { contactInfo } from "@/data/contact";

export const Footer = () => (
  <footer className="bg-primary text-primary-foreground/80 py-16">
    <div className="container">
      <div className="grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Miswak Dental Hospital logo" width={40} height={40} loading="lazy" className="h-10 w-10 object-contain bg-primary-foreground/10 rounded-full p-1" />
            <div className="font-serif text-2xl text-primary-foreground">Miswak Dental Hospital & Implant Centre</div>
          </div>
          <p className="max-w-md text-sm leading-relaxed">
            A premium dental healthcare facility established in November 2002 by Dr Shaik Mohammed Majid — providing world-class dental care with the latest equipment and innovative technology.
          </p>
        </div>
        <div>
          <div className="text-primary-foreground font-medium mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-accent transition-smooth">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-accent transition-smooth">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-accent transition-smooth">About Us</Link></li>
            <li><Link to="/international-patients" className="hover:text-accent transition-smooth">International Patients</Link></li>
            <li><Link to="/reviews" className="hover:text-accent transition-smooth">Reviews & FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-smooth">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-primary-foreground font-medium mb-4">Connect</div>
          <ul className="space-y-2 text-sm">
            <li><a href={contactInfo.phoneHref} className="hover:text-accent transition-smooth">{contactInfo.phone}</a></li>
            <li><a href={contactInfo.emergencyPhoneHref} className="hover:text-accent transition-smooth">Emergency: {contactInfo.emergencyPhone}</a></li>
            <li><a href={`mailto:${contactInfo.email}`} className="hover:text-accent transition-smooth">{contactInfo.email}</a></li>
            <li><a href={contactInfo.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-smooth">Masab Tank, Hyderabad</a></li>
            <li><Link to="/contact" className="hover:text-accent transition-smooth">Book Online</Link></li>
            <li><Link to="/terms" className="hover:text-accent transition-smooth">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between gap-4 text-xs">
        <div>© {new Date().getFullYear()} Miswak Dental Hospital & Implant Centre. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <Link to="/terms" className="hover:text-accent transition-smooth">Terms & Conditions</Link>
          <span>Bringing smiles to people's lives for over 24 years.</span>
        </div>
      </div>
    </div>
  </footer>
);
