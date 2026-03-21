"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    title: "Tattoos",
    short: "Fine-Line, Black & Grey, Mandala, Watercolor, Mini-Tattoos, Finger-Tattoos, Cover-Ups, Auffrischung & Narbenüberdeckung.",
    details: [
      "Farbtattoos & Schwarz-Weiß-Tattoos — detailreiche Farbarbeiten oder klassische Black & Grey",
      "Mini-Tattoos — kleine Kunstwerke mit großer Bedeutung, perfekt für dezente Designs",
      "Finger-Tattoos — wenige Studios bieten es an, ich schon!",
      "Cover-Ups für kleinere Motive — kostenloses Beratungsgespräch",
      "Tattoo-Auffrischung — Farben auffrischen oder Linien nachziehen, egal von welchem Studio",
      "Narbenüberdeckungen — kleinere Narben kunstvoll kaschieren",
      "Individuelle Zeichnungen — Wunschmotiv persönlich im Studio besprechen",
      "Nachstechen innerhalb 14 Tagen kostenlos bei übermäßigem Farbverlust",
    ],
  },
  {
    title: "Piercings",
    short: "Professionell, hygienisch, mit Feingefühl. Nase, Ohr, Surface, Bauchnabel, Oral, Lippe, Brustwarze & Intimbereich.",
    details: [
      "Nase: Nostril, Septum, Bridge, Nassallang",
      "Ohr: Lobe, Helix, Tragus, Conch/Rook, Industrial, Daith/Migräne",
      "Surface: Augenbraue, Anti Eyebrow, Oberflächen",
      "Bauchnabel: Standard, Doppelt, 4-fach",
      "Oral: Zunge, Doppelt/Snake, Lippenbändchen",
      "Lippe: Madonna/Labret/Medusa, Bites, Ashley",
      "Brustwarze: Einzel oder Beide",
      "Intimbereich Damen & Herren — komplettes Angebot",
      "Alles inkl. Schmuck & Kontrolltermin",
    ],
  },
  {
    title: "Permanent Make-up",
    short: "Natürliche Schönheit unterstreichen: Fein gezeichnete Augenbrauen und dezente Lippen, die lange halten.",
    details: [
      "Augenbrauen — natürlich gezeichnet, typgerecht angepasst",
      "Lippen — dezente Schattierung für mehr Ausdruck",
      "Langanhaltend — erleichtert den Alltag, kein tägliches Nachziehen",
      "Präzise Arbeit mit modernstem Equipment",
      "Individuelle Beratung vor jeder Behandlung",
    ],
  },
  {
    title: "Lash & Brow Lifting",
    short: "Naturwimpern sanft nach oben geformt — länger & voller. Brow Lifting für ausdrucksstarke Augenbrauen.",
    details: [
      "Lash Lifting inkl. Färben & Keratin",
      "Brow Lifting inkl. Färben & Keratin",
      "Kombi Lash & Brow inkl. Zupfen",
      "Empfohlen alle 6–9 Wochen für dauerhaften WOW-Effekt",
    ],
  },
  {
    title: "Kinderohrringe",
    short: "Studex-System — sanft, schmerzarm & sicher. Ab 6 Monaten.",
    details: [
      "Studex-System — kein Schießen, speziell für empfindliche Kinderhaut",
      "Ab 6 Monaten möglich",
      "Ab 8 Jahren auch andere Ohrringe mit Nadel möglich",
      "Verschiedene Motiv-Designs verfügbar",
      "Entspannte Atmosphäre für Kinder und Eltern",
    ],
  },
  {
    title: "Spezialleistungen",
    short: "Wildfleischbehandlung, Dermal Anker Entfernung, kostenlose Erstberatung & mehr.",
    details: [
      "Wildfleischbehandlung",
      "Dermal Anker Entfernung — fachgerecht mit minimalem Narbenrisiko",
      "Nachstechen gratis innerhalb von 14 Tagen",
      "Kostenlose Beratung & Erstgespräche jederzeit",
      "Piercing-Korrekturen bei Fehlstichen aus anderen Studios",
      "Prontolind Spray & Gel für optimale Pflege",
      "Stecker kürzen, Fremdschmuck wechseln, Dehnen",
    ],
  },
];

function ServiceCard({ svc, index, inView }: { svc: typeof services[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={() => setOpen(!open)}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${open ? "rgba(187,53,153,.3)" : "rgba(255,255,255,.04)"}`,
        padding: "32px",
        cursor: "pointer",
        transition: "all .3s",
      }}
      className="hover:border-[rgba(187,53,153,.2)] hover:-translate-y-0.5"
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#fff",
          marginBottom: "12px",
        }}
      >
        {svc.title}
      </h3>
      <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.7, marginBottom: "16px" }}>
        {svc.short}
      </p>
      <span
        style={{
          fontSize: "12px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "var(--pink)",
          fontWeight: 500,
        }}
      >
        {open ? "Weniger anzeigen ↑" : "Mehr erfahren ↓"}
      </span>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: "20px", overflow: "hidden" }}
        >
          <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {svc.details.map((item, i) => (
              <li
                key={i}
                style={{
                  fontSize: "13px",
                  color: "var(--text-dim)",
                  paddingLeft: "16px",
                  position: "relative",
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "8px",
                    width: "4px",
                    height: "4px",
                    background: "var(--pink)",
                    borderRadius: "50%",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" style={{ padding: "100px 0", background: "#121215" }}>
      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "60px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "var(--pink)",
              marginBottom: "16px",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Leistungen
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            Was ich für dich mache
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
          }}
        >
          {services.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
