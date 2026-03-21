"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "Über mich" },
  { href: "#services", label: "Leistungen" },
  { href: "#gallery", label: "Galerie" },
  { href: "#pricing", label: "Preise" },
  { href: "#reviews", label: "Bewertungen" },
  { href: "#info", label: "Infos" },
  { href: "#contact", label: "Kontakt" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-[rgba(187,53,153,0.08)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt="SkinLove Logo"
              className="h-10 object-contain brightness-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://myhellocash.com/img/salon/website/522/497a0aaf-8a50-4256-819a-e2ab9130dcc9.jpg";
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[2px] uppercase text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="https://wa.me/436607835346"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--pink)] text-white text-xs tracking-[2px] uppercase rounded-full hover:bg-[var(--pink-dim)] transition-all duration-300"
          >
            Termin buchen
          </a>

          {/* Mobile Burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
            aria-label="Menü öffnen"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[rgba(10,10,10,0.98)] backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-2xl font-[family-name:var(--font-cormorant)] text-white hover:text-[var(--pink)] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="https://wa.me/436607835346"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 bg-[var(--pink)] text-white text-sm tracking-[2px] uppercase rounded-full"
            >
              Termin buchen
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
