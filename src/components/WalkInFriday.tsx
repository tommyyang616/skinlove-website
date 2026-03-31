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
          <svg className="walkin-scene-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* === TÜR mit 3D-Effekt === */}
            {/* Türrahmen-Schatten (3D Tiefe) */}
            <rect x="50" y="8" width="42" height="80" rx="3" fill="rgba(0,0,0,.3)" />
            {/* Türrahmen */}
            <rect x="48" y="6" width="42" height="80" rx="3" fill="rgba(30,15,25,1)" stroke="rgba(255,255,255,.4)" strokeWidth="2" />
            {/* Tür-Fläche mit Gradient */}
            <defs>
              <linearGradient id="doorGrad" x1="48" y1="6" x2="90" y2="86" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(60,20,50,.9)" />
                <stop offset="100%" stopColor="rgba(30,10,25,.95)" />
              </linearGradient>
              <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(187,53,153,.5)" />
                <stop offset="100%" stopColor="rgba(187,53,153,.15)" />
              </linearGradient>
              <radialGradient id="skinGrad" cx=".4" cy=".3" r=".6">
                <stop offset="0%" stopColor="#ffe0c8" />
                <stop offset="100%" stopColor="#e8b89a" />
              </radialGradient>
              <linearGradient id="jacketGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(187,53,153,.7)" />
                <stop offset="100%" stopColor="rgba(120,25,100,.8)" />
              </linearGradient>
              <linearGradient id="pantsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(50,50,60,1)" />
                <stop offset="100%" stopColor="rgba(30,30,40,1)" />
              </linearGradient>
            </defs>
            <rect x="51" y="9" width="36" height="74" rx="2" fill="url(#doorGrad)" />
            {/* Türfenster mit Glow */}
            <rect x="56" y="15" width="26" height="18" rx="2.5" fill="url(#windowGlow)" stroke="rgba(255,255,255,.25)" strokeWidth="1" />
            {/* Fensterkreuz */}
            <line x1="69" y1="15" x2="69" y2="33" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
            <line x1="56" y1="24" x2="82" y2="24" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
            {/* Fenster-Lichtschein */}
            <rect x="58" y="17" width="10" height="6" rx="1" fill="rgba(255,200,230,.25)" />
            <rect x="70" y="17" width="10" height="6" rx="1" fill="rgba(255,180,220,.15)" />
            {/* Unteres Türpanel */}
            <rect x="56" y="40" width="26" height="36" rx="2.5" fill="rgba(187,53,153,.06)" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
            {/* Türklinke 3D */}
            <ellipse cx="78" cy="54" rx="3" ry="2.5" fill="rgba(187,53,153,.9)" />
            <ellipse cx="77.5" cy="53.5" rx="1.5" ry="1" fill="rgba(255,255,255,.35)" />
            <rect x="76" y="55" width="4" height="9" rx="2" fill="rgba(187,53,153,.6)" />
            {/* Türklinken-Schatten */}
            <ellipse cx="78.5" cy="64.5" rx="3" ry="1" fill="rgba(0,0,0,.15)" />

            {/* === PERSON (3D-Look, Seitenansicht) === */}
            {/* Schatten am Boden */}
            <ellipse cx="24" cy="86" rx="14" ry="3" fill="rgba(0,0,0,.25)" />

            {/* Schuhe */}
            <ellipse cx="18" cy="84" rx="5" ry="2.5" fill="rgba(40,40,45,1)" />
            <ellipse cx="30" cy="84" rx="5" ry="2.5" fill="rgba(40,40,45,1)" />
            {/* Schuh-Highlights */}
            <ellipse cx="17" cy="83" rx="2.5" ry="1" fill="rgba(70,70,80,.6)" />
            <ellipse cx="29" cy="83" rx="2.5" ry="1" fill="rgba(70,70,80,.6)" />

            {/* Beine (Hose) */}
            <path d="M16 66 L14 81 L22 81 L21 66 Z" fill="url(#pantsGrad)" />
            <path d="M23 66 L22 81 L30 81 L28 66 Z" fill="url(#pantsGrad)" />
            {/* Hosenschatten Innenseite */}
            <path d="M21 66 L21 81 L23 81 L23 66 Z" fill="rgba(0,0,0,.15)" />

            {/* Oberkörper/Jacke */}
            <path d="M14 38 C13 42 12 56 14 66 L30 66 C32 56 31 42 30 38 Z" fill="url(#jacketGrad)" />
            {/* Jacken-Highlight links */}
            <path d="M15 40 C14 46 14 56 15 64 L18 64 C17 56 17 46 18 40 Z" fill="rgba(255,255,255,.08)" />
            {/* Kragen */}
            <path d="M17 38 L22 42 L27 38" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
            {/* Jacken-Reißverschluss */}
            <line x1="22" y1="42" x2="22" y2="65" stroke="rgba(255,255,255,.1)" strokeWidth=".8" />

            {/* Hals */}
            <rect x="19" y="32" width="6" height="7" rx="2" fill="url(#skinGrad)" />

            {/* Kopf (3D durch Gradient) */}
            <circle cx="22" cy="24" r="9" fill="url(#skinGrad)" />
            {/* Ohr */}
            <ellipse cx="13.5" cy="25" rx="2" ry="3" fill="#e8b89a" stroke="rgba(200,160,130,.5)" strokeWidth=".5" />
            {/* Haare */}
            <path d="M13 20 C13 12 18 10 24 10 C30 10 33 14 32 20 C32 22 30 18 24 17 C18 16 14 18 13 20 Z" fill="rgba(60,30,50,1)" />
            {/* Haar-Highlight */}
            <path d="M18 12 C20 11 24 11 27 13" fill="none" stroke="rgba(100,50,80,.5)" strokeWidth="1" />
            {/* Auge */}
            <ellipse cx="26" cy="23" rx="1.5" ry="1.8" fill="rgba(40,25,35,1)" />
            <circle cx="26.5" cy="22.5" r=".5" fill="rgba(255,255,255,.6)" />
            {/* Augenbraue */}
            <path d="M24 20.5 Q26 19.5 28 20.5" fill="none" stroke="rgba(60,30,50,.8)" strokeWidth="1" strokeLinecap="round" />
            {/* Nase */}
            <path d="M28 24 Q29 25.5 27.5 26" fill="none" stroke="rgba(200,160,130,.6)" strokeWidth=".8" strokeLinecap="round" />
            {/* Leichtes Lächeln */}
            <path d="M25 28 Q27 29.5 29 28" fill="none" stroke="rgba(180,100,120,.5)" strokeWidth=".8" strokeLinecap="round" />

            {/* === KLOPFENDER ARM === */}
            <g className="walkin-arm">
              {/* Oberarm */}
              <path d="M30 42 L36 36" stroke="url(#jacketGrad)" strokeWidth="5" strokeLinecap="round" />
              {/* Unterarm */}
              <path d="M36 36 L44 28" stroke="url(#jacketGrad)" strokeWidth="4.5" strokeLinecap="round" />
              {/* Ärmel-Saum */}
              <circle cx="43" cy="29" r="3" fill="url(#skinGrad)" />
              {/* Faust */}
              <path d="M43 24 C41 22 41 26 43 28 C45 30 47 28 47 26 C47 24 45 22 43 24 Z" fill="url(#skinGrad)" stroke="rgba(200,160,130,.4)" strokeWidth=".5" />
              {/* Knöchel */}
              <circle cx="44" cy="24.5" r=".8" fill="rgba(200,160,130,.6)" />
              <circle cx="45.5" cy="25.5" r=".8" fill="rgba(200,160,130,.6)" />
            </g>

            {/* Klopf-Wellen */}
            <circle className="walkin-wave walkin-wave-1" cx="48" cy="26" r="4" fill="none" stroke="rgba(187,53,153,.5)" strokeWidth="1.5" />
            <circle className="walkin-wave walkin-wave-2" cx="48" cy="26" r="4" fill="none" stroke="rgba(187,53,153,.35)" strokeWidth="1" />
            <circle className="walkin-wave walkin-wave-3" cx="48" cy="26" r="4" fill="none" stroke="rgba(187,53,153,.2)" strokeWidth=".8" />

            {/* Boden-Linie */}
            <rect x="0" y="86" width="100" height="2" rx="1" fill="rgba(255,255,255,.06)" />
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
