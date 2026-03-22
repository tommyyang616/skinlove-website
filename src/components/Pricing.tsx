"use client";
import { useState } from "react";

const tabs = ["nase","ohr","surface","bauchnabel","oral","lippe","brustwarze","intim-damen","intim-herren","lash","pflege"];
const tabLabels: Record<string,string> = { nase:"Nase", ohr:"Ohr", surface:"Surface", bauchnabel:"Bauchnabel", oral:"Oral", lippe:"Lippe", brustwarze:"Brustwarze", "intim-damen":"Intim Damen", "intim-herren":"Intim Herren", lash:"Lash & Brow", pflege:"Pflege & Service" };

const prices: Record<string,{ note?: string; noteBottom?: string[]; items: {n:string;p:string}[] }> = {
  nase: { items: [
    {n:"Nasenflügel (Nostril) einfach",p:"53 €"},{n:"Bridge",p:"84 €"},{n:"Septum",p:"65 €"},{n:"Nassallang (mittig durchgehend) / Austin Bar",p:"132 €"},
  ]},
  ohr: { items: [
    {n:"Lobe / Horizontal Lobe / Standard Lobe / Upper Lobe",p:"42 €"},{n:"Forward Helix / Helix Rim / Helix / AntiHelix-Sung",p:"55 €"},{n:"Tragus / Anti Tragus",p:"60 €"},{n:"Rook / Conch / Flat / Orbital / Snug / Inner Conch",p:"65 €"},{n:"Industrial / Vertikal Industrial",p:"75 €"},{n:"Daith (Migräne Piercing) / Surface Tragus / Trimix",p:"70 €"},
  ]},
  surface: { items: [
    {n:"Augenbraue",p:"60 €"},{n:"Anti Eyebrow",p:"62 €"},{n:"Oberflächenpiercings (Nacken, Bauch, Brustbein, Finger, Arme...)",p:"72 €"},
  ]},
  bauchnabel: { items: [
    {n:"Standard / Unten / Seitlich",p:"65 €"},{n:"Doppelt (oben & unten)",p:"122 €"},{n:"Stern 4-fach (oben, unten, rechts, links)",p:"247 €"},{n:"Dreieck",p:"187 €"},
  ]},
  oral: { items: [
    {n:"Zungen-Piercing (Standard)",p:"72 €"},{n:"Doppelt / Vertical / Snake / Zungenspitze",p:"88 €"},{n:"Zungenbändchen / Scoop / Venom",p:"88 €"},
  ]},
  lippe: { items: [
    {n:"Lippenbändchen",p:"60 €"},{n:"Lippenbereich (Madonna, Labret, Medusa)",p:"64 €"},{n:"Angel Bites / Cyber Bites / Daliha Bites / Dimple / Vampire",p:"115 €"},{n:"Snake Bites / Horizontal Lips / Shark Bites",p:"117 €"},{n:"Triangle Bites & Cheek",p:"112 €"},{n:"Eskimo / Horizontal Labret / Jestrum",p:"77 €"},{n:"Horizontales Oberlippenpiercing / Ashley",p:"77 €"},
  ]},
  brustwarze: { note: "Ab 16 Jahre", items: [
    {n:"Horizontal / Vertikal",p:"72 €"},{n:"Beide gemeinsam (rechts & links)",p:"132 €"},
  ]},
  "intim-damen": { note: "Ab 16 Jahre", items: [
    {n:"Christina",p:"112 €"},{n:"Klitoris Vorhaut / Isabella / Hymen",p:"112 €"},{n:"Äußere Schamlippe",p:"112 €"},{n:"Innere Schamlippe",p:"112 €"},{n:"Anus Piercing / Guiche Piercing / Fourchette",p:"142 €"},{n:"Pubic Piercing",p:"242 €"},{n:"Keuschheitspiercing",p:"252 €"},{n:"Magic Cross / Prinzessin Diana",p:"210 €"},{n:"Triangle Piercing",p:"242 €"},{n:"Nefertiti Piercing",p:"137 €"},
  ]},
  "intim-herren": { note: "Ab 16 Jahre", items: [
    {n:"Ampallang Piercing",p:"260 €"},{n:"Deep Dydoe Piercing",p:"260 €"},{n:"Dydoe Piercing",p:"180 €"},{n:"Frenulum Piercing",p:"110 €"},{n:"Guiche Piercing",p:"160 €"},{n:"Hafada Piercing",p:"140 €"},{n:"Lorum Piercing",p:"120 €"},{n:"Oetang / Vorhaut Piercing",p:"130 €"},{n:"Pubic Piercing",p:"190 €"},{n:"Schaft-Ampallang Piercing",p:"260 €"},{n:"Scrotal Ladder Piercing (3-4 Stück)",p:"290 €"},
  ]},
  lash: { items: [
    {n:"Lash Lifting inkl. Färben & Keratin",p:"61 €"},{n:"Brow Lifting inkl. Färben & Keratin",p:"52 €"},{n:"Lash & Brow Lifting inkl. Färben, Keratin & Zupfen",p:"110 €"},{n:"Augenbrauen zupfen (nur in Kombination)",p:"15 €"},
  ], noteBottom: ["Preise gültig ab 1.1.2026 · Anzahlung für Kombi Lash & Brow: 40 € · Empfohlen alle 6–9 Wochen"]},
  pflege: { items: [
    {n:"Prontolind Spray",p:"10 €"},{n:"Prontolind Gel",p:"7 €"},{n:"Stecker kürzen",p:"6 €"},{n:"Fremdschmuck wechseln",p:"15 €"},{n:"Dehnen bis 4 mm",p:"35 €"},{n:"Wildfleischbehandlung inkl. Spezialmaterial",p:"40 €"},{n:"Dermal Anker Entfernung (exkl. Schmuck & Pflege)",p:"60 €"},
  ], noteBottom: ["Alle Piercings inkl. Schmuck & Kontrolltermin · Gültig ab 1.1.2026","Piercen ab 14 Jahre in Anwesenheit eines Erziehungsberechtigten, ab 16 Jahre alleine.","Falls du ein Piercing möchtest, was hier nicht aufgezählt ist, ruf mich gerne an!"]},
};

export default function Pricing() {
  const [active, setActive] = useState("nase");

  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <span className="section-label reveal">Preise</span>
        <h2 className="section-title reveal">Preisliste</h2>
        <div className="pricing-tabs reveal">
          {tabs.map(t => (
            <button key={t} className={`pricing-tab${active === t ? " active" : ""}`} onClick={() => setActive(t)}>{tabLabels[t]}</button>
          ))}
        </div>
        {tabs.map(t => (
          <div key={t} className={`pricing-content${active === t ? " active" : ""}`}>
            {prices[t].note && <p style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 16 }}>{prices[t].note}</p>}
            <div className="price-list">
              {prices[t].items.map((item, j) => (
                <div key={j} className="price-item">
                  <span className="price-name">{item.n}</span>
                  <span className="price-amount">{item.p}</span>
                </div>
              ))}
            </div>
            {prices[t].noteBottom?.map((nb, j) => (
              <p key={j} style={{ marginTop: j === 0 ? 24 : 8, fontSize: 13, color: "var(--text-dim)" }}>{nb}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
