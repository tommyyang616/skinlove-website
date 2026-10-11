"use client";
import Image from "next/image";
import { useState } from "react";

export default function WalkInFriday({ onBook }: { onBook?: () => void }) {
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
          {/* Ablauf in einem 6-Sekunden-Takt: dreimal klopfen, die Tür
              schwingt an der linken Angel nach innen auf (Klinke rechts),
              Licht fällt heraus, Tür schließt wieder. */}
          <svg className="walkin-scene-svg" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wDoorFace" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4a1d3d" />
                <stop offset="100%" stopColor="#1e0d18" />
              </linearGradient>
              <linearGradient id="wWindowGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,120,220,.6)" />
                <stop offset="100%" stopColor="rgba(187,53,153,.18)" />
              </linearGradient>
              <radialGradient id="wInside" cx=".5" cy=".45" r=".75">
                <stop offset="0%" stopColor="#ff7ad9" />
                <stop offset="45%" stopColor="#bb3599" />
                <stop offset="100%" stopColor="#3a0f2e" />
              </radialGradient>
              <radialGradient id="wLightSpill" cx=".5" cy=".5" r=".6">
                <stop offset="0%" stopColor="rgba(255,90,210,.5)" />
                <stop offset="45%" stopColor="rgba(187,53,153,.18)" />
                <stop offset="100%" stopColor="rgba(187,53,153,0)" />
              </radialGradient>
            </defs>

            {/* Licht, das aus der offenen Tür fällt */}
            <ellipse className="walkin-light-spill" cx="30" cy="44" rx="34" ry="38" fill="url(#wLightSpill)" />

            {/* Rahmen */}
            <rect x="6" y="4" width="48" height="72" rx="3" fill="#1a0e16" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
            {/* Innenraum: leuchtet, sobald die Tür aufgeht */}
            <rect x="9" y="7" width="42" height="66" rx="2" fill="url(#wInside)" />
            {/* Angeln links am Rahmen */}
            <rect x="8" y="15" width="3" height="6" rx="1" fill="rgba(255,255,255,.45)" />
            <rect x="8" y="58" width="3" height="6" rx="1" fill="rgba(255,255,255,.45)" />

            {/* Boden */}
            <rect x="0" y="76" width="60" height="2" rx="1" fill="rgba(255,255,255,.06)" />
          </svg>
          {/* Tür als eigenes Element: nur so dreht der Browser sie mit echter
              Tiefe. In einer SVG-Grafik wird die 3D-Drehung flach gedrückt. */}
          <span className="walkin-door">
            <svg viewBox="10 8 40 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="8" width="40" height="64" rx="2" fill="url(#wDoorFace)" stroke="rgba(255,255,255,.12)" strokeWidth=".6" />
              <rect x="16" y="14" width="28" height="18" rx="2" fill="url(#wWindowGlow)" stroke="rgba(255,255,255,.22)" strokeWidth=".8" />
              <line x1="30" y1="14" x2="30" y2="32" stroke="rgba(255,255,255,.15)" strokeWidth=".8" />
              <line x1="16" y1="23" x2="44" y2="23" stroke="rgba(255,255,255,.15)" strokeWidth=".8" />
              <rect x="16" y="38" width="28" height="28" rx="2" fill="rgba(187,53,153,.06)" stroke="rgba(255,255,255,.08)" strokeWidth=".8" />
              {/* Klinke rechts, gegenüber den Angeln */}
              <rect x="42" y="42" width="3" height="9" rx="1.5" fill="rgba(187,53,153,.45)" />
              <rect x="38.5" y="44" width="6.5" height="2.4" rx="1.2" fill="#e04bb8" />
              <circle cx="44" cy="45.2" r="1.6" fill="#ff8fdc" />
            </svg>
          </span>
          <svg className="walkin-scene-front" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Klopfen: drei Schläge nacheinander */}
            <circle className="walkin-wave walkin-wave-1" cx="30" cy="40" r="3" fill="none" stroke="rgba(255,90,210,.8)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            <circle className="walkin-wave walkin-wave-2" cx="30" cy="40" r="3" fill="none" stroke="rgba(255,90,210,.8)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            <circle className="walkin-wave walkin-wave-3" cx="30" cy="40" r="3" fill="none" stroke="rgba(255,90,210,.8)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
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
          <div className="walkin-modal walkin-modal--image-only" onClick={(e) => e.stopPropagation()}>

            {/* v3 ist v2 ohne den grauen Instagram-Rand (oben 124 px, unten
                101 px, links 8 px weggeschnitten). width/height muessen die
                echten Masse der Datei sein - standen hier vorher 400x500,
                wurde das hohe Bild in einen falsch geformten Rahmen
                gezwungen. Neuer Dateiname statt Austausch, sonst sehen
                wiederkehrende Besucher wegen des Caches tagelang das alte. */}
            <div className="walkin-image">
              {/* Schließen sitzt im Bild, damit es bei jeder Bildgröße an
                  dessen Ecke klebt und nicht am breiteren Fenster. */}
              <button className="walkin-close" onClick={() => setOpen(false)} aria-label="Schließen">
                ✕
              </button>
              <Image
                src="/images/walkin-friday-v3.webp"
                alt="Walk-In Friday — Spontan Piercings zum Fixpreis"
                width={712}
                height={1055}
                style={{
                  display: "block",
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "calc(100dvh - 100px)",
                }}
                quality={85}
              />
            </div>
            {onBook && (
              <button
                type="button"
                className="btn-primary walkin-cta"
                onClick={() => { setOpen(false); setTimeout(onBook, 250); }}
              >
                Termin vereinbaren
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
