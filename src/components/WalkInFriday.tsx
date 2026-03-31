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
          <svg className="walkin-scene-svg" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wDoorFace" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3d1832" />
                <stop offset="100%" stopColor="#1e0d18" />
              </linearGradient>
              <linearGradient id="wDoorOpen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2a1222" />
                <stop offset="100%" stopColor="#150a10" />
              </linearGradient>
              <linearGradient id="wWindowGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(187,53,153,.55)" />
                <stop offset="100%" stopColor="rgba(187,53,153,.15)" />
              </linearGradient>
              <radialGradient id="wSkin" cx=".4" cy=".35" r=".65">
                <stop offset="0%" stopColor="#ffe4cc" />
                <stop offset="100%" stopColor="#e0aa88" />
              </radialGradient>
              <linearGradient id="wJacket" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c244a0" />
                <stop offset="100%" stopColor="#7a1e65" />
              </linearGradient>
              <linearGradient id="wPants" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a3a48" />
                <stop offset="100%" stopColor="#222230" />
              </linearGradient>
              <radialGradient id="wLightSpill" cx=".3" cy=".5" r=".7">
                <stop offset="0%" stopColor="rgba(187,53,153,.3)" />
                <stop offset="60%" stopColor="rgba(187,53,153,.05)" />
                <stop offset="100%" stopColor="rgba(187,53,153,0)" />
              </radialGradient>
              <clipPath id="wDoorClip">
                <rect x="60" y="8" width="36" height="72" rx="2" />
              </clipPath>
            </defs>

            {/* === LICHT das rausströmt wenn Tür offen === */}
            <ellipse className="walkin-light-spill" cx="78" cy="50" rx="50" ry="40" fill="url(#wLightSpill)" />

            {/* === WAND / RAHMEN === */}
            <rect x="56" y="4" width="44" height="82" rx="3" fill="#1a0e16" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
            {/* Rahmen-Innen */}
            <rect x="59" y="7" width="38" height="76" rx="2" fill="#0d070b" />

            {/* === TÜR (öffnet sich per CSS transform) === */}
            <g className="walkin-door-panel">
              <rect x="60" y="8" width="36" height="74" rx="2" fill="url(#wDoorFace)" />
              {/* Fenster */}
              <rect x="65" y="14" width="26" height="16" rx="2" fill="url(#wWindowGlow)" stroke="rgba(255,255,255,.2)" strokeWidth=".8" />
              <line x1="78" y1="14" x2="78" y2="30" stroke="rgba(255,255,255,.15)" strokeWidth=".8" />
              <line x1="65" y1="22" x2="91" y2="22" stroke="rgba(255,255,255,.15)" strokeWidth=".8" />
              {/* Unteres Panel */}
              <rect x="65" y="38" width="26" height="36" rx="2" fill="rgba(187,53,153,.05)" stroke="rgba(255,255,255,.07)" strokeWidth=".8" />
              {/* Klinke */}
              <ellipse cx="87" cy="52" rx="2.5" ry="2" fill="#bb3599" />
              <ellipse cx="86.5" cy="51.5" rx="1" ry=".7" fill="rgba(255,255,255,.3)" />
              <rect x="85.5" y="53" width="3" height="7" rx="1.5" fill="rgba(187,53,153,.5)" />
            </g>

            {/* === PERSON === */}
            <g className="walkin-person">
              {/* Schatten */}
              <ellipse cx="30" cy="86" rx="12" ry="2.5" fill="rgba(0,0,0,.2)" />

              {/* Schuhe */}
              <ellipse cx="24" cy="84.5" rx="5" ry="2" fill="#2d2d35" />
              <ellipse cx="36" cy="84.5" rx="5" ry="2" fill="#2d2d35" />
              <ellipse cx="23" cy="83.8" rx="2" ry=".8" fill="rgba(80,80,90,.5)" />
              <ellipse cx="35" cy="83.8" rx="2" ry=".8" fill="rgba(80,80,90,.5)" />

              {/* Beine */}
              <path d="M22 68 L20.5 82 L27.5 82 L27 68 Z" fill="url(#wPants)" />
              <path d="M29 68 L28.5 82 L35.5 82 L34 68 Z" fill="url(#wPants)" />
              <path d="M27 68 L27 82 L29 82 L29 68 Z" fill="rgba(0,0,0,.12)" />

              {/* Oberkörper */}
              <path d="M20 40 C19 46 18 58 20 68 L36 68 C38 58 37 46 36 40 Z" fill="url(#wJacket)" />
              {/* Highlight */}
              <path d="M21 42 C20.5 50 20.5 60 21 67 L24 67 C23 60 23 50 23.5 42 Z" fill="rgba(255,255,255,.07)" />
              {/* Reißverschluss */}
              <line x1="28" y1="43" x2="28" y2="67" stroke="rgba(255,255,255,.08)" strokeWidth=".6" />

              {/* Hals */}
              <rect x="25" y="34" width="6" height="7" rx="2.5" fill="url(#wSkin)" />

              {/* Kopf */}
              <circle cx="28" cy="26" r="9.5" fill="url(#wSkin)" />
              {/* Ohr */}
              <ellipse cx="19" cy="27" rx="2" ry="3" fill="#dda880" stroke="rgba(190,140,110,.4)" strokeWidth=".5" />
              {/* Haare */}
              <path d="M19 22 C19 14 23 11 29 11 C35 11 38 15 37 22 C36 24 34 19 29 18 C24 17 20 20 19 22 Z" fill="#3d1e30" />
              <path d="M23 13 C26 12 30 12 33 14" fill="none" stroke="rgba(90,45,70,.5)" strokeWidth=".8" />
              {/* Auge */}
              <ellipse cx="32" cy="25" rx="1.6" ry="2" fill="#2d1a24" />
              <circle cx="32.5" cy="24.5" r=".6" fill="rgba(255,255,255,.5)" />
              {/* Augenbraue */}
              <path d="M30 22.5 Q32 21.5 34 22.5" fill="none" stroke="#3d1e30" strokeWidth=".9" strokeLinecap="round" />
              {/* Nase */}
              <path d="M34 25.5 Q35 27 33.5 28" fill="none" stroke="rgba(190,140,110,.5)" strokeWidth=".7" strokeLinecap="round" />
              {/* Lächeln */}
              <path d="M31 30 Q33 31.5 35 30" fill="none" stroke="rgba(170,90,110,.45)" strokeWidth=".7" strokeLinecap="round" />

              {/* === ARM (klopft) === */}
              <g className="walkin-arm">
                <path d="M36 44 L42 38" stroke="url(#wJacket)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M42 38 L50 30" stroke="url(#wJacket)" strokeWidth="5" strokeLinecap="round" />
                {/* Handgelenk */}
                <circle cx="49" cy="31" r="3.2" fill="url(#wSkin)" />
                {/* Faust */}
                <ellipse cx="52" cy="28" rx="4" ry="3.5" fill="url(#wSkin)" stroke="rgba(190,140,110,.3)" strokeWidth=".5" />
                {/* Knöchel Detail */}
                <circle cx="52" cy="26.5" r=".7" fill="rgba(190,140,110,.5)" />
                <circle cx="53.5" cy="27.5" r=".7" fill="rgba(190,140,110,.5)" />
                <circle cx="50.5" cy="27" r=".6" fill="rgba(190,140,110,.4)" />
              </g>
            </g>

            {/* Klopf-Wellen */}
            <circle className="walkin-wave walkin-wave-1" cx="58" cy="28" r="3" fill="none" stroke="rgba(187,53,153,.6)" strokeWidth="1.5" />
            <circle className="walkin-wave walkin-wave-2" cx="58" cy="28" r="3" fill="none" stroke="rgba(187,53,153,.4)" strokeWidth="1" />
            <circle className="walkin-wave walkin-wave-3" cx="58" cy="28" r="3" fill="none" stroke="rgba(187,53,153,.25)" strokeWidth=".7" />

            {/* Boden */}
            <rect x="0" y="86" width="120" height="2" rx="1" fill="rgba(255,255,255,.05)" />
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
