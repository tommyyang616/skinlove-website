"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pricingCategories = [
  {
    title: "Tattoo",
    icon: "🖊️",
    items: [
      { name: "Kleines Tattoo (bis 5cm)", price: "ab €80" },
      { name: "Mittleres Tattoo (5-15cm)", price: "ab €150" },
      { name: "Großes Tattoo (15-30cm)", price: "ab €300" },
      { name: "Sleeve / Großprojekt", price: "nach Aufwand" },
      { name: "Cover-up", price: "ab €150" },
      { name: "Stundensatz", price: "€100/Std." },
    ],
  },
  {
    title: "Piercing",
    icon: "💎",
    items: [
      { name: "Ohrläppchen (Paar)", price: "€35" },
      { name: "Helix / Tragus / Conch", price: "ab €40" },
      { name: "Nostril (Nasenpiercing)", price: "€40" },
      { name: "Septum", price: "€50" },
      { name: "Labret / Medusa", price: "€50" },
      { name: "Bauchnabel", price: "€50" },
      { name: "Dermal Anchor", price: "ab €60" },
      { name: "Intimpiercing", price: "ab €60" },
    ],
    note: "Alle Preise inkl. Erstschmuck (Titan).",
  },
  {
    title: "Permanent Make-up",
    icon: "✨",
    items: [
      { name: "Powder Brows", price: "€280" },
      { name: "Microblading", price: "€280" },
      { name: "Kombi-Technik (Powder + Micro)", price: "€320" },
      { name: "Lip Blush (Aquarell Lips)", price: "€280" },
      { name: "Lidstrich oben", price: "€200" },
      { name: "Wimpernkranzverdichtung", price: "€180" },
      { name: "Auffrischung (innerhalb 1 Jahr)", price: "ab €150" },
    ],
    note: "Inkl. Beratung, Vorzeichnung und Nachkontrolle.",
  },
  {
    title: "Workshops",
    icon: "🎓",
    items: [
      { name: "Tattoo-Workshop (Beginner, 2 Tage)", price: "€499" },
      { name: "Tattoo-Workshop (Advanced, 1 Tag)", price: "€299" },
      { name: "Piercing-Workshop (1 Tag)", price: "€399" },
      { name: "PMU-Workshop Powder Brows (2 Tage)", price: "€599" },
      { name: "PMU-Workshop Microblading (2 Tage)", price: "€599" },
      { name: "Einzelcoaching (pro Stunde)", price: "€80/Std." },
    ],
    note: "Inkl. Übungsmaterial, Zertifikat und Skript.",
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="section-5 py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Transparent & fair
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Preisliste
          </h2>
          <div className="pink-line" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {pricingCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <span>{cat.icon}</span> {cat.title}
              </h3>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center border-b border-white/5 pb-3"
                  >
                    <span className="text-[var(--text-dim)] text-sm">
                      {item.name}
                    </span>
                    <span className="text-white font-medium text-sm whitespace-nowrap ml-4">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
              {cat.note && (
                <p className="text-[var(--text-dimmer)] text-xs mt-4 italic">
                  {cat.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center text-[var(--text-dimmer)] text-sm mt-8"
        >
          Alle Preise in Euro. Kleinunternehmerregelung — keine USt ausgewiesen.
        </motion.p>
      </div>
    </section>
  );
}
