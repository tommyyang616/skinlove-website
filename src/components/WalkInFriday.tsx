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
        <span className="walkin-ring walkin-ring-3" />

        {/* Szene: Person klopft an Tür */}
        <span className="walkin-scene">
          <svg className="walkin-scene-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Tür */}
            <rect x="38" y="8" width="34" height="64" rx="3" fill="rgba(187,53,153,.12)" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
            {/* Türfenster */}
            <rect x="44" y="14" width="22" height="14" rx="2" fill="rgba(187,53,153,.25)" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
            {/* Licht im Fenster */}
            <rect x="46" y="16" width="8" height="10" rx="1" fill="rgba(187,53,153,.4)" />
            <rect x="56" y="16" width="8" height="10" rx="1" fill="rgba(187,53,153,.3)" />
            {/* Türpanel unten */}
            <rect x="44" y="34" width="22" height="28" rx="2" fill="rgba(187,53,153,.08)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
            {/* Türklinke */}
            <circle cx="64" cy="44" r="2.5" fill="#bb3599" />
            <rect x="62.5" y="44" width="3" height="7" rx="1.5" fill="rgba(187,53,153,.5)" />

            {/* Person — Silhouette von der Seite */}
            {/* Kopf */}
            <circle cx="20" cy="24" r="7" fill="rgba(255,255,255,.85)" />
            {/* Haare oben */}
            <ellipse cx="20" cy="20" rx="7.5" ry="5" fill="rgba(187,53,153,.7)" />
            {/* Körper */}
            <path d="M14 31 C14 31 12 48 13 62 L16 62 L18 46 L22 46 L24 62 L27 62 C28 48 26 31 26 31 Z" fill="rgba(255,255,255,.75)" />
            {/* Jacke/Oberkörper */}
            <path d="M14 31 C14 31 13 40 14 44 L26 44 C27 40 26 31 26 31 Z" fill="rgba(187,53,153,.5)" />

            {/* Arm der klopft — gebeugt zur Tür */}
            <g className="walkin-arm">
              {/* Oberarm */}
              <line x1="26" y1="34" x2="32" y2="30" stroke="rgba(255,255,255,.8)" strokeWidth="3.5" strokeLinecap="round" />
              {/* Unterarm */}
              <line x1="32" y1="30" x2="38" y2="26" stroke="rgba(255,255,255,.85)" strokeWidth="3" strokeLinecap="round" />
              {/* Faust */}
              <circle cx="38" cy="25" r="3.5" fill="rgba(255,220,185,1)" />
              {/* Knöchel */}
              <circle cx="38.5" cy="23.5" r="1" fill="rgba(230,195,160,.8)" />
              <circle cx="37" cy="24" r="1" fill="rgba(230,195,160,.8)" />
            </g>

            {/* Klopf-Wellen an der Tür */}
            <circle className="walkin-wave walkin-wave-1" cx="40" cy="25" r="4" fill="none" stroke="rgba(187,53,153,.5)" strokeWidth="1.5" />
            <circle className="walkin-wave walkin-wave-2" cx="40" cy="25" r="4" fill="none" stroke="rgba(187,53,153,.4)" strokeWidth="1" />

            {/* Boden-Schatten */}
            <ellipse cx="20" cy="64" rx="10" ry="2" fill="rgba(0,0,0,.25)" />

            {/* Schwelle */}
            <rect x="36" y="70" width="38" height="3" rx="1" fill="rgba(255,255,255,.1)" />
          </svg>
        </span>

        {/* Text */}
        <span className="walkin-badge-label">
          <span className="walkin-badge-title">Walk-In</span>
          <span className="walkin-badge-day">Friday</span>
          <span className="walkin-badge-sub">Anklopfen!</span>
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
