"use client";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about", label: "Über mich" },
  { href: "#services", label: "Leistungen" },
  { href: "#pricing", label: "Preise" },
  { href: "#gallery", label: "Galerie" },
  { href: "#workshop", label: "Workshop" },
  { href: "#info", label: "Wichtige Infos" },
  { href: "#contact", label: "Kontakt" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="nav-container">
        <a href="#hero" className="logo">
          <div className="logo-text">
            <span className="logo-skin">Skin</span>
            <span className="logo-heart">♥</span>
            <span className="logo-love">Love</span>
          </div>
          <span className="logo-sub">Tattoo &amp; Piercing</span>
        </a>
        <nav className="nav-links">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
          <a href="#contact" className="header-cta">Termin</a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü">
          <span /><span /><span />
        </button>
      </div>
      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <a href="#contact" className="header-cta" style={{ display: "inline-block", marginTop: 16 }} onClick={() => setMenuOpen(false)}>
          Termin vereinbaren
        </a>
      </div>
    </header>
  );
}
