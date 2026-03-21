"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const piercingCategories = [
  {
    title: "Nase",
    items: [
      { name: "Nasenflügel (Nostril) einfach", price: "53 €" },
      { name: "Bridge", price: "84 €" },
      { name: "Septum", price: "65 €" },
      { name: "Nassallang (mittig durchgehend) / Austin Bar", price: "132 €" },
    ],
  },
  {
    title: "Ohr",
    items: [
      { name: "Lobe / Horizontal Lobe / Standard Lobe / Upper Lobe", price: "42 €" },
      { name: "Forward Helix / Helix Rim / Helix / AntiHelix-Sung", price: "55 €" },
      { name: "Tragus / Anti Tragus", price: "60 €" },
      { name: "Rook / Conch / Flat / Orbital / Snug / Inner Conch", price: "65 €" },
      { name: "Industrial / Vertikal Industrial", price: "75 €" },
      { name: "Daith (Migräne Piercing) / Surface Tragus / Trimix", price: "70 €" },
    ],
  },
  {
    title: "Augenbraue & Surface",
    items: [
      { name: "Augenbraue", price: "60 €" },
      { name: "Anti Eyebrow", price: "62 €" },
      { name: "Oberflächenpiercings (Nacken, Bauch, Brustbein, Finger, Arme...)", price: "72 €" },
    ],
  },
  {
    title: "Bauchnabel",
    items: [
      { name: "Standard / Unten / Seitlich", price: "65 €" },
      { name: "Doppelt (oben & unten)", price: "122 €" },
      { name: "Stern 4-fach (oben, unten, rechts, links)", price: "247 €" },
      { name: "Dreieck", price: "187 €" },
    ],
  },
  {
    title: "Zunge & Oral",
    items: [
      { name: "Zungen-Piercing (Standard)", price: "72 €" },
      { name: "Doppelt / Vertical / Snake / Zungenspitze", price: "88 €" },
      { name: "Zungenbändchen / Scoop / Venom", price: "88 €" },
      { name: "Lippenbändchen", price: "60 €" },
    ],
  },
  {
    title: "Lippe",
    items: [
      { name: "Lippenbereich (Madonna, Labret, Medusa)", price: "64 €" },
      { name: "Angel Bites / Cyber Bites / Daliha Bites / Dimple / Vampire", price: "115 €" },
      { name: "Snake Bites / Horizontal Lips / Shark Bites", price: "117 €" },
      { name: "Triangle Bites & Cheek", price: "112 €" },
      { name: "Eskimo / Horizontal Labret / Jestrum", price: "77 €" },
      { name: "Horizontales Oberlippenpiercing / Ashley", price: "77 €" },
    ],
  },
  {
    title: "Brustwarze (ab 16 Jahre)",
    items: [
      { name: "Horizontal / Vertikal", price: "72 €" },
      { name: "Beide gemeinsam (rechts & links)", price: "132 €" },
    ],
  },
  {
    title: "Intim Damen (ab 16 Jahre)",
    items: [
      { name: "Christina", price: "112 €" },
      { name: "Klitoris Vorhaut / Isabella / Hymen", price: "112 €" },
      { name: "Äußere Schamlippe", price: "112 €" },
      { name: "Innere Schamlippe", price: "112 €" },
      { name: "Anus Piercing / Guiche Piercing / Fourchette", price: "142 €" },
      { name: "Pubic Piercing", price: "242 €" },
      { name: "Keuschheitspiercing", price: "252 €" },
      { name: "Magic Cross / Prinzessin Diana", price: "210 €" },
      { name: "Triangle Piercing", price: "242 €" },
      { name: "Nefertiti Piercing", price: "137 €" },
    ],
  },
  {
    title: "Intim Herren (ab 16 Jahre)",
    items: [
      { name: "Ampallang Piercing", price: "260 €" },
      { name: "Deep Dydoe Piercing", price: "260 €" },
      { name: "Dydoe Piercing", price: "180 €" },
      { name: "Frenulum Piercing", price: "110 €" },
      { name: "Guiche Piercing", price: "160 €" },
      { name: "Hafada Piercing", price: "140 €" },
      { name: "Lorum Piercing", price: "120 €" },
      { name: "Oetang / Vorhaut Piercing", price: "130 €" },
      { name: "Pubic Piercing", price: "190 €" },
      { name: "Schaft-Ampallang Piercing", price: "260 €" },
      { name: "Scrotal Ladder Piercing (3-4 Stück)", price: "290 €" },
    ],
  },
];

const lashBrowItems = [
  { name: "Lash Lifting inkl. Färben & Keratin", price: "61 €" },
  { name: "Brow Lifting inkl. Färben & Keratin", price: "52 €" },
  { name: "Lash & Brow Lifting inkl. Färben, Keratin & Zupfen", price: "110 €" },
  { name: "Augenbrauen zupfen (nur in Kombination)", price: "15 €" },
];

const extrasItems = [
  { name: "Prontolind Spray", price: "10 €" },
  { name: "Prontolind Gel", price: "7 €" },
  { name: "Stecker kürzen", price: "6 €" },
  { name: "Fremdschmuck wechseln", price: "15 €" },
  { name: "Dehnen bis 4 mm", price: "35 €" },
  { name: "Wildfleischbehandlung inkl. Spezialmaterial", price: "40 €" },
  { name: "Dermal Anker Entfernung (exkl. Schmuck & Pflege)", price: "60 €" },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openCat, setOpenCat] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-24 md:py-32" style={{ background: "#1e1e23" }}>
      <div ref={ref} className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">Preise</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Preisliste
          </h2>
          <div className="w-12 h-0.5 bg-[var(--pink)] mx-auto" />
        </motion.div>

        {/* Piercing Categories */}
        <div className="space-y-3 mb-8">
          {piercingCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-xl border border-white/5 overflow-hidden"
              style={{ background: "var(--bg-card)" }}
            >
              <button
                onClick={() => setOpenCat(openCat === cat.title ? null : cat.title)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-white font-medium hover:bg-white/5 transition-colors"
              >
                <span>{cat.title}</span>
                <span className="text-[var(--pink)] text-lg">{openCat === cat.title ? "−" : "+"}</span>
              </button>
              {openCat === cat.title && (
                <div className="px-5 pb-4 space-y-2">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex justify-between gap-4 text-sm">
                      <span className="text-[var(--text-dim)]">{item.name}</span>
                      <span className="text-white font-medium whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Lash & Brow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-xl border border-white/5 p-5 mb-4"
          style={{ background: "var(--bg-card)" }}
        >
          <h3 className="text-white font-semibold mb-4">Lash & Brow Lifting</h3>
          <div className="space-y-2">
            {lashBrowItems.map((item) => (
              <div key={item.name} className="flex justify-between gap-4 text-sm">
                <span className="text-[var(--text-dim)]">{item.name}</span>
                <span className="text-white font-medium whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--text-dim)] mt-4">
            Preise gültig ab 1.1.2026 · Anzahlung für Kombi Lash & Brow: 40 € · Empfohlen alle 6–9 Wochen
          </p>
        </motion.div>

        {/* Extras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="rounded-xl border border-white/5 p-5 mb-6"
          style={{ background: "var(--bg-card)" }}
        >
          <h3 className="text-white font-semibold mb-4">Extras & Services</h3>
          <div className="space-y-2">
            {extrasItems.map((item) => (
              <div key={item.name} className="flex justify-between gap-4 text-sm">
                <span className="text-[var(--text-dim)]">{item.name}</span>
                <span className="text-white font-medium whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hinweise */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <p className="text-xs text-[var(--text-dim)]">
            Alle Piercings inkl. Schmuck & Kontrolltermin · Gültig ab 1.1.2026
          </p>
          <p className="text-xs text-[var(--text-dim)]">
            Piercen ab 14 Jahre in Anwesenheit eines Erziehungsberechtigten, ab 16 Jahre alleine.
          </p>
          <p className="text-xs text-[var(--text-dim)]">
            Falls du ein Piercing möchtest, was hier nicht aufgezählt ist, ruf mich gerne an!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
