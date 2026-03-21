"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  {
    id: "tattoo",
    title: "Tattoo",
    icon: "🖊️",
    description:
      "Von filigranen Finelinetattoos bis zu großflächigen Motiven — jedes Tattoo wird individuell für dich gestaltet. Ich arbeite in verschiedenen Stilen und berate dich gerne zu Motiv, Platzierung und Größe.",
    items: [
      "Fineline & Minimalistisch",
      "Realistic & Portrait",
      "Blackwork & Dotwork",
      "Watercolor",
      "Lettering & Schriftzüge",
      "Cover-ups & Rework",
      "Custom Designs",
    ],
  },
  {
    id: "piercing",
    title: "Piercing",
    icon: "💎",
    description:
      "Professionelles Piercen mit Fokus auf Hygiene und Ästhetik. Ich verwende ausschließlich hochwertigen Erstschmuck aus Titan und berate dich ausführlich zur Pflege.",
    items: [
      "Ohren (Helix, Tragus, Conch, etc.)",
      "Nasenpiercing (Nostril, Septum)",
      "Lippenpiercing (Labret, Medusa)",
      "Augenbraue",
      "Bauchnabel",
      "Surface & Dermal Anchor",
      "Intimpiercings",
    ],
  },
  {
    id: "pmu",
    title: "Permanent Make-up",
    icon: "✨",
    description:
      "Perfekte Augenbrauen, definierte Lippen oder einen sanften Lidstrich — dauerhaft und natürlich. Mit modernsten Techniken für ein Ergebnis, das zu dir passt.",
    items: [
      "Augenbrauen (Powder Brows)",
      "Augenbrauen (Microblading)",
      "Lippen (Aquarell Lips)",
      "Lidstrich (Eyeliner)",
      "Wimpernkranzverdichtung",
      "Narbenkorrektur",
    ],
  },
  {
    id: "workshops",
    title: "Workshops",
    icon: "🎓",
    description:
      "Du willst Tätowieren oder Piercing lernen? In meinen Workshops zeige ich dir alles von Grund auf — Theorie, Hygiene und natürlich viel Praxis.",
    items: [
      "Tattoo-Workshop (Beginner)",
      "Tattoo-Workshop (Advanced)",
      "Piercing-Workshop",
      "PMU-Workshop (Powder Brows)",
      "PMU-Workshop (Microblading)",
      "Einzelcoaching möglich",
    ],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("tattoo");

  const active = categories.find((c) => c.id === activeTab)!;

  return (
    <section id="services" className="section-2 py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Was wir anbieten
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Leistungen
          </h2>
          <div className="pink-line" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                activeTab === cat.id
                  ? "bg-[var(--pink)] text-white"
                  : "glass-card text-[var(--text-dim)] hover:text-white"
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.title}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-white mb-4">
                {active.icon} {active.title}
              </h3>
              <p className="text-[var(--text-dim)] leading-relaxed mb-6">
                {active.description}
              </p>
              <a
                href="https://wa.me/436607835346"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--pink)] text-white text-xs tracking-[2px] uppercase rounded-full hover:bg-[var(--pink-dim)] transition-all duration-300"
              >
                Termin vereinbaren
              </a>
            </div>
            <div>
              <ul className="space-y-3">
                {active.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 text-[var(--text-dim)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink)] shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
