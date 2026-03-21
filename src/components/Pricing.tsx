"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const tabs = [
  { id: "nase", label: "👃 Nase" },
  { id: "ohr", label: "👂 Ohr" },
  { id: "surface", label: "📌 Surface" },
  { id: "bauchnabel", label: "💎 Bauchnabel" },
  { id: "oral", label: "👅 Oral" },
  { id: "lippe", label: "💋 Lippe" },
  { id: "brustwarze", label: "⭕ Brustwarze" },
  { id: "intim-damen", label: "♀️ Intim Damen" },
  { id: "intim-herren", label: "♂️ Intim Herren" },
  { id: "lash", label: "👁️ Lash & Brow" },
  { id: "pflege", label: "🛠️ Pflege & Service" },
];

const prices: Record<string, { name: string; price: string; note?: string }[]> = {
  nase: [
    { name: "Nostril", price: "40 €" },
    { name: "Septum", price: "45 €" },
    { name: "Bridge", price: "50 €" },
    { name: "Nasallang", price: "55 €" },
    { name: "High Nostril", price: "45 €" },
    { name: "Austin Bar", price: "55 €" },
  ],
  ohr: [
    { name: "Helix", price: "35 €" },
    { name: "Industrial", price: "50 €" },
    { name: "Tragus", price: "40 €" },
    { name: "Daith", price: "40 €" },
    { name: "Rook", price: "40 €" },
    { name: "Conch", price: "40 €" },
    { name: "Snug", price: "45 €" },
    { name: "Forward Helix", price: "40 €" },
    { name: "Anti-Tragus", price: "45 €" },
    { name: "Orbital", price: "50 €" },
    { name: "Lobe", price: "30 €" },
    { name: "Upper Lobe", price: "35 €" },
    { name: "Flat", price: "40 €" },
    { name: "Stacked Lobe", price: "40 €" },
  ],
  surface: [
    { name: "Nape", price: "55 €" },
    { name: "Surface Tragus", price: "55 €" },
    { name: "Anti-Eyebrow", price: "50 €" },
    { name: "Chest Surface", price: "55 €" },
    { name: "Wrist Surface", price: "55 €" },
    { name: "Hip Surface", price: "55 €" },
  ],
  bauchnabel: [
    { name: "Klassisch", price: "45 €" },
    { name: "Double / Floating", price: "50 €" },
    { name: "Inverse", price: "50 €" },
  ],
  oral: [
    { name: "Zunge", price: "45 €" },
    { name: "Smiley", price: "40 €" },
    { name: "Frenulum", price: "40 €" },
    { name: "Labret", price: "40 €" },
    { name: "Medusa", price: "45 €" },
    { name: "Jestrum", price: "50 €" },
    { name: "Philtrum", price: "45 €" },
    { name: "Dahlia", price: "55 €", note: "×2" },
    { name: "Spider Bites", price: "45 €", note: "×2" },
    { name: "Angel Bites", price: "45 €", note: "×2" },
    { name: "Snake Bites", price: "45 €", note: "×2" },
    { name: "Shark Bites", price: "55 €", note: "×4" },
    { name: "Canine Bites", price: "55 €", note: "×4" },
    { name: "Ashley", price: "50 €" },
  ],
  lippe: [
    { name: "Labret", price: "40 €" },
    { name: "Monroe / Madonna", price: "45 €" },
    { name: "Medusa", price: "45 €" },
    { name: "Vertical Labret", price: "50 €" },
    { name: "Jestrum", price: "50 €" },
    { name: "Dahlia", price: "55 €" },
    { name: "Spider Bites", price: "45 €", note: "×2" },
    { name: "Angel Bites", price: "45 €", note: "×2" },
    { name: "Snake Bites", price: "45 €", note: "×2" },
    { name: "Shark Bites", price: "55 €", note: "×4" },
    { name: "Canine Bites", price: "55 €", note: "×4" },
    { name: "Ashley", price: "50 €" },
  ],
  brustwarze: [
    { name: "Einzeln", price: "45 €" },
    { name: "Paar", price: "80 €" },
  ],
  "intim-damen": [
    { name: "Christina", price: "55 €" },
    { name: "Nefertiti", price: "60 €" },
    { name: "VCH", price: "50 €" },
    { name: "HCH", price: "50 €" },
    { name: "Inner Labia", price: "50 €" },
    { name: "Outer Labia", price: "55 €" },
    { name: "Princess Albertina", price: "55 €" },
    { name: "Fourchette", price: "55 €" },
  ],
  "intim-herren": [
    { name: "Prince Albert", price: "50 €" },
    { name: "Reverse PA", price: "55 €" },
    { name: "Frenum", price: "50 €" },
    { name: "Lorum", price: "50 €" },
    { name: "Hafada", price: "50 €" },
    { name: "Guiche", price: "55 €" },
    { name: "Dydoe", price: "55 €" },
    { name: "Apadravya", price: "60 €" },
    { name: "Ampallang", price: "60 €" },
  ],
  lash: [
    { name: "Lash Lifting", price: "45 €" },
    { name: "Brow Lifting", price: "40 €" },
    { name: "Kombi (Lash + Brow)", price: "75 €", note: "statt 85 €" },
  ],
  pflege: [
    { name: "Piercingwechsel", price: "10 €" },
    { name: "Erstschmuck Upgrade", price: "ab 15 €" },
    { name: "Schmuckberatung", price: "Gratis" },
    { name: "Pflegeset", price: "12 €" },
  ],
};

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState("nase");

  return (
    <section id="pricing" className="py-24 md:py-32" style={{ background: "#161619" }}>
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Preise
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Piercing & Beauty Preise
          </h2>
          <div className="w-12 h-0.5 bg-[var(--pink)] mx-auto mb-6" />
          <p className="text-sm text-[var(--text-dim)] max-w-xl mx-auto">
            Alle Piercing-Preise inkl. Erstschmuck (Titan G23) &amp; Pflegemittel
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm tracking-wider transition-all duration-300 whitespace-nowrap ${
                active === tab.id
                  ? "bg-[var(--pink)] text-white shadow-lg shadow-[var(--pink)]/20"
                  : "bg-white/5 text-[var(--text-dim)] hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Price Table */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-white/5 overflow-hidden"
          style={{ background: "var(--bg-card)" }}
        >
          {prices[active]?.map((item, i) => (
            <div
              key={item.name}
              className={`flex items-center justify-between px-6 py-4 ${
                i < (prices[active]?.length ?? 0) - 1 ? "border-b border-white/5" : ""
              } hover:bg-white/[0.03] transition-colors`}
            >
              <div className="flex items-center gap-3">
                <span className="text-white text-sm sm:text-base">{item.name}</span>
                {item.note && (
                  <span className="text-xs text-[var(--text-dim)] bg-white/5 px-2 py-0.5 rounded-full">
                    {item.note}
                  </span>
                )}
              </div>
              <span className="text-[var(--pink)] font-semibold text-sm sm:text-base whitespace-nowrap">
                {item.price}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Kinderohrringe Hinweis */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-sm text-[var(--text-dim)] mt-8"
        >
          Kinderohrringe (Studex System) ab 25 €
        </motion.p>
      </div>
    </section>
  );
}
