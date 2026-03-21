"use client";
import { useState } from "react";

const piercingData = [
  {
    cat: "Nase",
    items: [
      { name: "Nasenflügel (Nostril) einfach", price: "53 €" },
      { name: "Bridge", price: "84 €" },
      { name: "Septum", price: "65 €" },
      { name: "Nassallang (mittig durchgehend) / Austin Bar", price: "132 €" },
    ],
  },
  {
    cat: "Ohr",
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
    cat: "Augenbraue & Surface",
    items: [
      { name: "Augenbraue", price: "60 €" },
      { name: "Anti Eyebrow", price: "62 €" },
      { name: "Oberflächenpiercings (Nacken, Bauch, Brustbein, Finger, Arme…)", price: "72 €" },
    ],
  },
  {
    cat: "Bauchnabel",
    items: [
      { name: "Standard / Unten / Seitlich", price: "65 €" },
      { name: "Doppelt (oben & unten)", price: "122 €" },
      { name: "Stern 4-fach (oben, unten, rechts, links)", price: "247 €" },
      { name: "Dreieck", price: "187 €" },
    ],
  },
  {
    cat: "Zunge & Oral",
    items: [
      { name: "Zungen-Piercing (Standard)", price: "72 €" },
      { name: "Doppelt / Vertical / Snake / Zungenspitze", price: "88 €" },
      { name: "Zungenbändchen / Scoop / Venom", price: "88 €" },
      { name: "Lippenbändchen", price: "60 €" },
    ],
  },
  {
    cat: "Lippe",
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
    cat: "Brustwarze (ab 16 Jahre)",
    items: [
      { name: "Horizontal / Vertikal", price: "72 €" },
      { name: "Beide gemeinsam (rechts & links)", price: "132 €" },
    ],
  },
  {
    cat: "Intim Damen (ab 16 Jahre)",
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
    cat: "Intim Herren (ab 16 Jahre)",
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
      { name: "Scrotal Ladder Piercing (3–4 Stück)", price: "290 €" },
    ],
  },
];

const lashBrow = [
  { name: "Lash Lifting inkl. Färben & Keratin", price: "61 €" },
  { name: "Brow Lifting inkl. Färben & Keratin", price: "52 €" },
  { name: "Lash & Brow Lifting inkl. Färben, Keratin & Zupfen", price: "110 €" },
  { name: "Augenbrauen zupfen (nur in Kombination)", price: "15 €" },
];

const extras = [
  { name: "Prontolind Spray", price: "10 €" },
  { name: "Prontolind Gel", price: "7 €" },
  { name: "Stecker kürzen", price: "6 €" },
  { name: "Fremdschmuck wechseln", price: "15 €" },
  { name: "Dehnen bis 4 mm", price: "35 €" },
  { name: "Wildfleischbehandlung inkl. Spezialmaterial", price: "40 €" },
  { name: "Dermal Anker Entfernung (exkl. Schmuck & Pflege)", price: "60 €" },
];

const TABS = ["Piercing", "Lash & Brow", "Extras"];

export default function Pricing() {
  const [tab, setTab] = useState(0);

  return (
    <section id="pricing">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-eyebrow">Transparenz</div>
          <h2 className="section-title">Preisliste</h2>
          <div className="section-line" />
        </div>
        <div className="pricing-tabs">
          {TABS.map((t, i) => (
            <button key={t} className={`pricing-tab${tab === i ? " active" : ""}`} onClick={() => setTab(i)}>
              {t}
            </button>
          ))}
        </div>

        {/* Piercing Panel */}
        <div className={`pricing-panel${tab === 0 ? " active" : ""}`}>
          {piercingData.map((cat) => (
            <div key={cat.cat} className="pricing-category">
              <div className="pricing-cat-title">{cat.cat}</div>
              {cat.items.map((item) => (
                <div key={item.name} className="pricing-row">
                  <span className="pricing-name">{item.name}</span>
                  <span className="pricing-price">{item.price}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="pricing-note">
            Alle Piercings inkl. Schmuck & Kontrolltermin · Preise gültig ab 1.1.2026<br />
            Piercen ab 14 Jahre in Anwesenheit eines Erziehungsberechtigten, ab 16 Jahre alleine.<br />
            Falls du ein Piercing möchtest, was hier nicht aufgezählt ist, ruf mich gerne an!
          </div>
        </div>

        {/* Lash & Brow Panel */}
        <div className={`pricing-panel${tab === 1 ? " active" : ""}`}>
          <div className="pricing-category">
            <div className="pricing-cat-title">Lash & Brow Lifting</div>
            {lashBrow.map((item) => (
              <div key={item.name} className="pricing-row">
                <span className="pricing-name">{item.name}</span>
                <span className="pricing-price">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="pricing-note">
            Preise gültig ab 1.1.2026 · Anzahlung für Kombi Lash & Brow: 40 €<br />
            Empfohlen alle 6–9 Wochen
          </div>
        </div>

        {/* Extras Panel */}
        <div className={`pricing-panel${tab === 2 ? " active" : ""}`}>
          <div className="pricing-category">
            <div className="pricing-cat-title">Extras & Services</div>
            {extras.map((item) => (
              <div key={item.name} className="pricing-row">
                <span className="pricing-name">{item.name}</span>
                <span className="pricing-price">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
