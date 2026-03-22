"use client";
import { useEffect, useState } from "react";

const HeartSVG = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#bb3599" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle" }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const links = [
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
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const close = () => setNavOpen(false);

  return (
    <header id="header" className={scrolled ? "scrolled" : ""}>
      <div className="header-inner">
        <a href="#hero" className="logo-wrap">
          <span className="logo-text">
            <span className="logo-skin">Skin</span>
            <span className="logo-heart"><HeartSVG /></span>
            <span className="logo-love">Love</span>
          </span>
          <span className="logo-sub">Tattoo &amp; Piercing</span>
        </a>
        <nav id="nav" className={navOpen ? "open" : ""}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
          ))}
          <div className="nav-social">
            <a href="https://www.instagram.com/skinlove_tattoopiercing/" target="_blank" rel="noopener noreferrer" onClick={close}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/skinlovetattoopiercing" target="_blank" rel="noopener noreferrer" onClick={close}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </nav>
        <a href="tel:+436607835346" className="header-cta" style={{ textAlign: "center", lineHeight: 1.3, whiteSpace: "nowrap" }}>
          Anrufen<span style={{ display: "block", fontSize: 8, fontWeight: 400, opacity: .7, letterSpacing: 0, textTransform: "none", whiteSpace: "nowrap" }}>+43 660 783 5346</span>
        </a>
        <button className="menu-toggle" onClick={() => setNavOpen(!navOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
