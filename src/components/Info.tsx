"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const infoCards = [
  {
    icon: "💰",
    title: "Anzahlung",
    text: "Für jeden Termin ist eine Anzahlung erforderlich. Diese wird vom Gesamtpreis abgezogen und sichert deinen Termin verbindlich. Die Höhe der Anzahlung besprechen wir individuell.",
  },
  {
    icon: "❌",
    title: "Stornierung",
    text: "Termine können bis 48 Stunden vorher kostenlos storniert werden. Bei kurzfristiger Absage oder Nichterscheinen verfällt die Anzahlung. Bitte hab Verständnis — so kann ich dir und anderen Kunden die beste Betreuung bieten.",
  },
  {
    icon: "🔄",
    title: "Nachstechen",
    text: "Ein kostenloses Nachstechen ist innerhalb von 8 Wochen nach dem Termin möglich, sofern die Pflegeanleitung eingehalten wurde. Danach gelten die regulären Preise.",
  },
  {
    icon: "🩹",
    title: "Pflege",
    text: "Nach jedem Termin bekommst du eine ausführliche Pflegeanleitung. Die richtige Nachsorge ist entscheidend für ein perfektes Ergebnis. Bei Fragen bin ich jederzeit erreichbar!",
  },
  {
    icon: "🔞",
    title: "Mindestalter",
    text: "Für Tattoos und Piercings musst du mindestens 18 Jahre alt sein. Unter 18 ist ein Piercing nur mit schriftlicher Einverständniserklärung eines Erziehungsberechtigten möglich.",
  },
  {
    icon: "🤰",
    title: "Kontraindikationen",
    text: "Tattoos und Piercings sind nicht möglich bei Schwangerschaft, Stillzeit, Blutgerinnungsstörungen, akuten Hauterkrankungen oder unter Einfluss von Alkohol/Drogen.",
  },
];

export default function Info() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="info" className="section-3 py-24 md:py-32">
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
          <div className="pink-line" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-6 rounded-2xl"
            >
              <span className="text-3xl mb-4 block">{card.icon}</span>
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-[var(--text-dim)] text-sm leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
