"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const infoCards = [
  {
    emoji: "🔞",
    title: "Mindestalter",
    text: "Tattoo & Piercing ab 18 Jahren oder ab 14 mit schriftlicher Einverständniserklärung eines Erziehungsberechtigten.",
  },
  {
    emoji: "🧼",
    title: "Hygiene",
    text: "Alle Werkzeuge werden sterilisiert, Einwegmaterial wird bei jedem Kunden neu verwendet. Deine Sicherheit steht an erster Stelle.",
  },
  {
    emoji: "💊",
    title: "Vor dem Termin",
    text: "Bitte 24h vorher keinen Alkohol trinken, kein Aspirin nehmen und ausreichend essen und trinken.",
  },
  {
    emoji: "🩹",
    title: "Nachsorge",
    text: "Du bekommst von mir eine detaillierte Nachsorge-Anleitung und ein Pflegeset. Bei Fragen bin ich jederzeit erreichbar.",
  },
  {
    emoji: "💳",
    title: "Bezahlung",
    text: "Bar oder Kartenzahlung. Für Tattoos ab 200€ ist eine Anzahlung von 50€ bei der Terminvereinbarung erforderlich.",
  },
  {
    emoji: "📅",
    title: "Termine",
    text: "Bitte buche deinen Termin vorab per WhatsApp, Telefon oder über das Kontaktformular. Walk-ins nur nach Verfügbarkeit.",
  },
];

export default function Info() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="info" className="py-24 md:py-32" style={{ background: "#1e1e23" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Gut zu wissen
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Wichtige Infos
          </h2>
          <div className="w-12 h-0.5 bg-[var(--pink)] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-white/5 p-6 hover:border-[var(--pink)]/20 transition-colors"
              style={{ background: "var(--bg-card)" }}
            >
              <div className="text-3xl mb-4">{card.emoji}</div>
              <h3 className="text-white font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-[var(--text-dim)] leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
