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
      {/* Animierte Badge im Hero — Tür mit Klopf-Animation */}
      <button
        className="walkin-badge"
        onClick={() => setOpen(true)}
        aria-label="Walk-In Friday Angebot öffnen"
      >
        {/* Leuchtender Ring-Pulse */}
        <span className="walkin-ring walkin-ring-1" />
        <span className="walkin-ring walkin-ring-2" />
        <span className="walkin-ring walkin-ring-3" />

        {/* Tür-Icon mit klopfender Hand */}
        <span className="walkin-door">
          {/* Tür */}
          <svg className="walkin-door-svg" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Türrahmen */}
            <rect x="4" y="2" width="32" height="48" rx="3" stroke="rgba(255,255,255,.6)" strokeWidth="2" fill="rgba(187,53,153,.15)" />
            {/* Türklinke */}
            <circle cx="28" cy="28" r="2.5" fill="#bb3599" />
            {/* Fenster oben */}
            <rect x="12" y="8" width="16" height="10" rx="1.5" fill="rgba(187,53,153,.25)" stroke="rgba(255,255,255,.3)" strokeWidth="1" />
            {/* Licht durchs Fenster */}
            <rect x="14" y="10" width="5" height="6" rx="1" fill="rgba(187,53,153,.4)" />
            <rect x="21" y="10" width="5" height="6" rx="1" fill="rgba(187,53,153,.3)" />
          </svg>

          {/* Klopfende Hand */}
          <span className="walkin-hand">🤚</span>
        </span>

        {/* Text */}
        <span className="walkin-badge-label">
          <span className="walkin-badge-title">Walk-In</span>
          <span className="walkin-badge-day">Friday</span>
        </span>

        {/* Klingel-Noten */}
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

            {/* Flyer-Bild */}
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
