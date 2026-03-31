"use client";
import Image from "next/image";
import { useState } from "react";

const piercings = [
  { name: "Helix", price: "35" },
  { name: "Tragus", price: "40" },
  { name: "Conch", price: "40" },
  { name: "Lobe (Ohrläppchen)", price: "35" },
  { name: "Nostril (Nase)", price: "35" },
  { name: "Septum", price: "45" },
  { name: "Bauchnabel", price: "45" },
];

export default function WalkInFriday() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Animierte Badge im Hero */}
      <button
        className="walkin-badge"
        onClick={() => setOpen(true)}
        aria-label="Walk-In Friday Angebot öffnen"
      >
        {/* Leuchtende Pulse-Ringe */}
        <span className="walkin-ring walkin-ring-1" />
        <span className="walkin-ring walkin-ring-2" />
        <span className="walkin-ring walkin-ring-3" />

        {/* Tür-Szene */}
        <span className="walkin-scene">
          {/* Tür */}
          <svg className="walkin-door-svg" viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Boden/Schwelle */}
            <rect x="2" y="68" width="52" height="3" rx="1" fill="rgba(187,53,153,.2)" />
            {/* Türrahmen außen */}
            <rect x="6" y="3" width="44" height="65" rx="4" stroke="rgba(255,255,255,.5)" strokeWidth="2.5" fill="none" />
            {/* Tür-Fläche */}
            <rect x="9" y="6" width="38" height="59" rx="3" fill="rgba(187,53,153,.12)" stroke="rgba(187,53,153,.4)" strokeWidth="1.5" />
            {/* Oberes Türfenster */}
            <rect x="15" y="12" width="26" height="16" rx="2" fill="rgba(187,53,153,.2)" stroke="rgba(255,255,255,.25)" strokeWidth="1" />
            {/* Fensterkreuz */}
            <line x1="28" y1="12" x2="28" y2="28" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
            <line x1="15" y1="20" x2="41" y2="20" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
            {/* Licht durchs Fenster */}
            <rect x="17" y="14" width="10" height="5" rx="1" fill="rgba(187,53,153,.35)" />
            <rect x="29" y="14" width="10" height="5" rx="1" fill="rgba(187,53,153,.25)" />
            <rect x="17" y="22" width="10" height="4" rx="1" fill="rgba(187,53,153,.2)" />
            <rect x="29" y="22" width="10" height="4" rx="1" fill="rgba(187,53,153,.3)" />
            {/* Unteres Türpanel */}
            <rect x="15" y="34" width="26" height="24" rx="2" fill="rgba(187,53,153,.08)" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
            {/* Türklinke */}
            <ellipse cx="38" cy="40" rx="3" ry="3" fill="#bb3599" />
            <rect x="36" y="40" width="4" height="8" rx="2" fill="rgba(187,53,153,.6)" />
            {/* Klinken-Glanz */}
            <ellipse cx="37" cy="39" rx="1.2" ry="1" fill="rgba(255,255,255,.3)" />
          </svg>

          {/* Klopfende Hand — größer und deutlicher */}
          <span className="walkin-hand">
            <svg viewBox="0 0 36 36" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
              {/* Hand/Faust */}
              <circle cx="18" cy="16" r="10" fill="rgba(255,220,180,1)" />
              {/* Finger */}
              <rect x="10" y="8" width="6" height="14" rx="3" fill="rgba(255,210,170,1)" />
              <rect x="15" y="6" width="6" height="16" rx="3" fill="rgba(255,215,175,1)" />
              <rect x="20" y="7" width="6" height="15" rx="3" fill="rgba(255,210,170,1)" />
              <rect x="25" y="10" width="5" height="12" rx="2.5" fill="rgba(255,205,165,1)" />
              {/* Daumen */}
              <ellipse cx="9" cy="18" rx="4" ry="3" fill="rgba(255,215,175,1)" transform="rotate(-20 9 18)" />
              {/* Knöchel-Linien */}
              <line x1="13" y1="13" x2="13" y2="15" stroke="rgba(200,160,130,.4)" strokeWidth=".8" strokeLinecap="round" />
              <line x1="18" y1="11" x2="18" y2="14" stroke="rgba(200,160,130,.4)" strokeWidth=".8" strokeLinecap="round" />
              <line x1="23" y1="12" x2="23" y2="14" stroke="rgba(200,160,130,.4)" strokeWidth=".8" strokeLinecap="round" />
            </svg>
          </span>

          {/* Klopf-Effekt Wellen */}
          <span className="walkin-knock-wave walkin-knock-wave-1" />
          <span className="walkin-knock-wave walkin-knock-wave-2" />
        </span>

        {/* Text */}
        <span className="walkin-badge-label">
          <span className="walkin-badge-title">Walk-In</span>
          <span className="walkin-badge-day">Friday</span>
          <span className="walkin-badge-sub">Jetzt klopfen!</span>
        </span>

        {/* Klingel-Noten die aufsteigen */}
        <span className="walkin-notes">
          <span className="walkin-note walkin-note-1">🔔</span>
          <span className="walkin-note walkin-note-2">✨</span>
          <span className="walkin-note walkin-note-3">🔔</span>
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div className="walkin-overlay" onClick={() => setOpen(false)}>
          <div className="walkin-modal" onClick={(e) => e.stopPropagation()}>
            <button className="walkin-close" onClick={() => setOpen(false)} aria-label="Schließen">
              ✕
            </button>

            <div className="walkin-image">
              <Image
                src="/images/walkin-friday.jpg"
                alt="Walk-In Friday — Spontan Piercings zum Fixpreis"
                width={400}
                height={500}
                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                quality={85}
              />
            </div>

            <div className="walkin-header">
              <h2>Walk-In Friday</h2>
              <p className="walkin-subtitle">Jeden Freitag — Einfach vorbeikommen!</p>
            </div>

            <div className="walkin-body">
              <p className="walkin-intro">
                Spontan Piercings zum <strong>Fixpreis</strong> — inklusive Erstschmuck aus Titan.
              </p>

              <ul className="walkin-list">
                {piercings.map((p) => (
                  <li key={p.name} className="walkin-item">
                    <span className="walkin-name">{p.name}</span>
                    <span className="walkin-dots" />
                    <span className="walkin-price">ab €{p.price}</span>
                  </li>
                ))}
              </ul>

              <div className="walkin-footer-info">
                <p>✨ Titan-Erstschmuck inklusive</p>
                <p>📍 Einfach vorbeikommen — kein Termin nötig!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
