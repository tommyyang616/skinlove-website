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
      <button
        className="walkin-badge"
        onClick={() => setOpen(true)}
        aria-label="Walk-In Friday Angebot öffnen"
      >
        <span className="walkin-ring walkin-ring-1" />
        <span className="walkin-ring walkin-ring-2" />

        <span className="walkin-scene">
          <svg className="walkin-scene-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wDoorFace" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3d1832" />
                <stop offset="100%" stopColor="#1e0d18" />
              </linearGradient>
              <linearGradient id="wWindowGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(187,53,153,.55)" />
                <stop offset="100%" stopColor="rgba(187,53,153,.15)" />
              </linearGradient>
              <radialGradient id="wLightSpill" cx=".3" cy=".5" r=".7">
                <stop offset="0%" stopColor="rgba(255,0,200,.45)" />
                <stop offset="30%" stopColor="rgba(255,0,180,.2)" />
                <stop offset="60%" stopColor="rgba(187,53,153,.08)" />
                <stop offset="100%" stopColor="rgba(187,53,153,0)" />
              </radialGradient>
            </defs>

            {/* Magenta-Neon Licht */}
            <ellipse className="walkin-light-spill" cx="30" cy="40" rx="40" ry="35" fill="url(#wLightSpill)" />

            {/* Wand / Rahmen */}
            <rect x="6" y="4" width="48" height="72" rx="3" fill="#1a0e16" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
            <rect x="9" y="7" width="42" height="66" rx="2" fill="#0d070b" />

            {/* Tür (öffnet sich) */}
            <g className="walkin-door-panel">
              <rect x="10" y="8" width="40" height="64" rx="2" fill="url(#wDoorFace)" />
              {/* Fenster */}
              <rect x="16" y="14" width="28" height="18" rx="2" fill="url(#wWindowGlow)" stroke="rgba(255,255,255,.2)" strokeWidth=".8" />
              <line x1="30" y1="14" x2="30" y2="32" stroke="rgba(255,255,255,.15)" strokeWidth=".8" />
              <line x1="16" y1="23" x2="44" y2="23" stroke="rgba(255,255,255,.15)" strokeWidth=".8" />
              {/* Unteres Panel */}
              <rect x="16" y="38" width="28" height="28" rx="2" fill="rgba(187,53,153,.05)" stroke="rgba(255,255,255,.07)" strokeWidth=".8" />
              {/* Türklinke */}
              <ellipse cx="42" cy="48" rx="2.5" ry="2" fill="#bb3599" />
              <ellipse cx="41.5" cy="47.5" rx="1" ry=".7" fill="rgba(255,255,255,.3)" />
              <rect x="40.5" y="49" width="3" height="7" rx="1.5" fill="rgba(187,53,153,.5)" />
            </g>

            {/* Klopf-Wellen */}
            <circle className="walkin-wave walkin-wave-1" cx="30" cy="35" r="3" fill="none" stroke="rgba(255,0,200,.6)" strokeWidth="1.5" />
            <circle className="walkin-wave walkin-wave-2" cx="30" cy="35" r="3" fill="none" stroke="rgba(255,0,200,.4)" strokeWidth="1" />
            <circle className="walkin-wave walkin-wave-3" cx="30" cy="35" r="3" fill="none" stroke="rgba(255,0,200,.25)" strokeWidth=".7" />

            {/* Boden */}
            <rect x="0" y="76" width="60" height="2" rx="1" fill="rgba(255,255,255,.05)" />
          </svg>
        </span>

        <span className="walkin-badge-label">
          <span className="walkin-badge-title">Walk-In</span>
          <span className="walkin-badge-day">Friday</span>
          <span className="walkin-badge-sub">Anklopfen!</span>
        </span>

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
