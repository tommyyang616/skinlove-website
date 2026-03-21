"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    emoji: "🎨",
    title: "Tattoo",
    desc: "Von filigranen Fine-Lines bis hin zu großflächigen Pieces – jedes Tattoo wird individuell für dich designt.",
    points: [
      "Individuelle Beratung & Design",
      "Fine Line & Micro Realism",
      "Cover-Ups & Rework",
      "Farbige & Blackwork Tattoos",
    ],
  },
  {
    emoji: "💎",
    title: "Piercing",
    desc: "Professionelles Piercing mit sterilen Einwegnadeln und hochwertigem Titan G23 Erstschmuck.",
    points: [
      "Titan G23 Erstschmuck",
      "Sterile Einwegnadeln",
      "Umfassende Nachsorge",
      "Große Schmuckauswahl",
    ],
  },
  {
    emoji: "✨",
    title: "Permanent Make-up",
    desc: "Permanent Make-up für einen natürlich perfekten Look – sanft, präzise und langanhaltend.",
    points: ["Powder Brows", "Lip Blush", "Eyeliner", "Auffrischung"],
  },
  {
    emoji: "🎓",
    title: "Workshops",
    desc: "Lerne die Kunst des Tätowierens und Piercens in professionellen Workshops mit Zertifikat.",
    points: [
      "2-Tages-Intensivkurs",
      "Hygiene & Sicherheit",
      "Praxis an Kunsthaut",
      "Zertifikat",
    ],
  },
  {
    emoji: "🌟",
    title: "Guest Artists",
    desc: "Regelmäßig begrüßen wir talentierte Gastkünstler mit besonderen Styles und Techniken.",
    points: [
      "Wechselnde Styles",
      "Spezielle Techniken",
      "Limitierte Termine",
      "Folge uns für Ankündigungen",
    ],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32" style={{ background: "#121215" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Leistungen
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Mein Angebot
          </h2>
          <div className="w-12 h-0.5 bg-[var(--pink)] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="rounded-2xl border border-white/5 p-6 cursor-pointer transition-all duration-300 hover:border-[var(--pink)]/30 group"
              style={{ background: "var(--bg-card)" }}
            >
              <div className="text-3xl mb-4">{s.emoji}</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[var(--pink)] transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-4">
                {s.desc}
              </p>

              <AnimatePresence>
                {openIdx === i && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-sm text-[var(--text-dim)]"
                      >
                        <span className="text-[var(--pink)] text-xs">●</span>
                        {p}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              <div className="mt-4 flex items-center gap-1 text-xs text-[var(--pink)]">
                <span>{openIdx === i ? "Weniger" : "Mehr erfahren"}</span>
                <span
                  className="transition-transform duration-300"
                  style={{ transform: openIdx === i ? "rotate(180deg)" : "none" }}
                >
                  ▼
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
