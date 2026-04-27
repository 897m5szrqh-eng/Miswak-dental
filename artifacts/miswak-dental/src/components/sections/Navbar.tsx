import { motion } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/miswak-logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "International Patients", to: "/international-patients" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  useLocation(); // re-render on route change

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50"
    >
      <nav className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Miswak Dental Hospital logo" width={40} height={40} className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <div className="font-serif text-lg text-primary">Miswak</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Dental & Implant Centre</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-smooth ${isActive ? "text-accent" : "text-foreground/80 hover:text-accent"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:+914023346260" className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary">
            <Phone className="h-4 w-4" /> Call
          </a>
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex !shadow-none hover:!shadow-none">
            <Link to="/contact">Book Visit</Link>
          </Button>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm py-3 px-2 rounded-md ${isActive ? "text-accent font-medium" : "text-foreground/80"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild variant="hero" size="sm" className="mt-3 !shadow-none hover:!shadow-none">
              <Link to="/contact" onClick={() => setOpen(false)}>Book Visit</Link>
            </Button>
          </div>
        </div>
      )}
    </motion.header>
  );
};
