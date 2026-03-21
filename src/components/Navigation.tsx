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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .logo-skin {
          opacity: 0;
          animation: logoIn .6s ease forwards, logoLoop 3s ease 1.2s infinite;
        }
        .logo-heart {
          color: #bb3599 !important;
          font-size: 20px;
          margin: 0 3px;
          display: inline-block;
          opacity: 0;
          animation: logoIn .5s ease .4s forwards, heartBeat 1s ease 1.2s infinite;
        }
        .logo-love {
          opacity: 0;
          animation: logoIn .6s ease .7s forwards, logoLoop 3s ease 1.5s infinite;
        }
        .logo-sub {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-dim);
          opacity: 0;
          animation: logoIn .5s ease 1.1s forwards;
          margin-left: 12px;
        }
        @keyframes logoIn { to { opacity: 1; } }
        @keyframes logoLoop {
          0%,100% { opacity:1; transform:translateY(0); }
          50% { opacity:.6; transform:translateY(-2px); }
        }
        @keyframes heartBeat {
          0%,100% { transform:scale(1); }
          50% { transform:scale(1.3); }
        }
        nav a {
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-dim);
          transition: color .3s;
          position: relative;
        }
        nav a:hover { color: var(--pink); }
        nav a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: var(--pink);
          transition: width .3s;
        }
        nav a:hover::after { width: 100%; }
        .header-cta {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 20px;
          border: 1px solid var(--pink);
          color: #fff;
          background: var(--pink);
          transition: all .3s;
        }
        .header-cta:hover { background: var(--pink-dim); }
        .menu-toggle span {
          width: 24px;
          height: 1.5px;
          background: var(--text);
          transition: all .3s;
          display: block;
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          padding: scrolled ? "12px 0" : "20px 0",
          transition: "all .4s",
          background: scrolled ? "rgba(10,10,10,.95)" : "rgba(10,10,10,.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(187,53,153,.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {/* Logo */}
          <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 0, textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span className="logo-skin">Skin</span>
              <span className="logo-heart">♥</span>
              <span className="logo-love">Love</span>
            </span>
            <span className="logo-sub">Tattoo &amp; Piercing</span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: "32px", alignItems: "center" }} className="hidden lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="header-cta">
              Termin
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden"
            style={{ display: "flex", flexDirection: "column", gap: "5px", cursor: "pointer", padding: "8px", background: "none", border: "none" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: "rgba(10,10,10,.98)",
              borderTop: "1px solid rgba(187,53,153,.1)",
              padding: "24px",
            }}
            className="lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: "13px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  borderBottom: "1px solid rgba(255,255,255,.04)",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="header-cta"
              style={{ display: "inline-block", marginTop: "16px" }}
            >
              Termin vereinbaren
            </a>
          </div>
        )}
      </header>
    </>
  );
}
