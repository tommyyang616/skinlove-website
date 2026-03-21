"use client";
import { useState } from "react";

const services = [
  {
    title: "Tattoo",
    icon: "✦",
    desc: "Von filigranen Fine-Line-Designs bis zu detailreichen Motiven – ich setze deine Ideen mit ruhiger Hand und Liebe zum Detail um. Jedes Tattoo ist ein Einzelstück.",
    tags: ["Fine Line", "Blackwork", "Ornamental", "Lettering", "Custom"],
  },
  {
    title: "Piercing",
    icon: "◈",
    desc: "Professionelles Piercing mit Titan-Schmuck der höchsten Güte. Von klassischen Ohren bis zu exklusiven Körper-Piercings – alles unter sterilen Bedingungen.",
    tags: ["Ohr", "Nase", "Bauchnabel", "Lippe", "Intim", "Zunge"],
  },
  {
    title: "Lash Lifting",
    icon: "✧",
    desc: "Natürliche Wimpernpflege mit Keratin und Lifting-Effekt. Deine Wimpern werden gebogen, gefärbt und mit Keratin behandelt – für bis zu 8 Wochen strahlende Augen.",
    tags: ["Lash Lifting", "Brow Lifting", "Keratin", "Färben"],
  },
  {
    title: "Permanent Make-up",
    icon: "◇",
    desc: "Dezentes, natürlich aussehendes Permanent Make-up für Augenbrauen, Lippen und Eyeliner. Für einen frischen Look rund um die Uhr – ohne tägliches Schminken.",
    tags: ["Augenbrauen", "Lippen", "Eyeliner", "Microblading"],
  },
  {
    title: "Kinderpiercing",
    icon: "♡",
    desc: "Einfühlsames Kinderpiercing in entspannter Atmosphäre. Mit Erfahrung im Umgang mit kleinen Kunden und einfühlsamer Begleitung. Ab 0 Monaten, immer mit Elternteil.",
    tags: ["Ab 0 Monate", "Ohr", "Titan-Schmuck", "Einfühlsam"],
  },
  {
    title: "Schmuck & Änderungen",
    icon: "◉",
    desc: "Schmuck tauschen, kürzen oder Wildfleisch behandeln – ich helfe bei allen Anliegen rund um bestehende Piercings, auch wenn sie nicht von mir gestochen wurden.",
    tags: ["Schmuck wechseln", "Kürzen", "Dehnen", "Wildfleisch"],
  },
];

export default function Services() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section id="services">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-eyebrow">Was ich anbiete</div>
          <h2 className="section-title">Leistungen</h2>
          <div className="section-line" />
        </div>
        <div className="services-grid reveal">
          {services.map((s, i) => (
            <div key={s.title} className={`service-card${openIdx === i ? " open" : ""}`}>
              <div className="service-header" onClick={() => toggle(i)}>
                <h3>{s.title}</h3>
                <div className="service-icon">{s.icon}</div>
              </div>
              <div className="service-body">
                <div className="service-body-inner">
                  <p>{s.desc}</p>
                  <div className="service-tags">
                    {s.tags.map((t) => (
                      <span key={t} className="service-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
