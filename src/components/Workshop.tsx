"use client";
import { useState } from "react";

export default function Workshop() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section id="workshop">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-eyebrow">Lerne es selbst</div>
          <h2 className="section-title">Workshop</h2>
          <div className="section-line" />
        </div>
        <div className="workshop-card reveal">
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", color: "#fff", marginBottom: 8, fontWeight: 400 }}>
            Piercing Workshop
          </h3>
          <p style={{ color: "var(--text-dim)", fontSize: "14px", lineHeight: 1.8 }}>
            Lerne die Grundlagen des professionellen Piercens in einer kleinen Gruppe. Theorie, Hygiene, Praxis – alles in einem Tag.
          </p>

          <div className="ws-grid">
            <div className="ws-item">
              <span className="ws-label">Datum</span>
              <span className="ws-value">Auf Anfrage</span>
            </div>
            <div className="ws-item">
              <span className="ws-label">Dauer</span>
              <span className="ws-value">1 Tag (ca. 8h)</span>
            </div>
            <div className="ws-item">
              <span className="ws-label">Preis</span>
              <span className="ws-value">
                350 €
                <span
                  className="ws-info-icon"
                  onMouseEnter={() => setShowPopup(true)}
                  onMouseLeave={() => setShowPopup(false)}
                >i</span>
                <span className={`ws-info-popup${showPopup ? " show" : ""}`}>
                  Inkl. Materialien, Mittagessen & Zertifikat
                </span>
              </span>
              <span className="ws-sub">inkl. Materialien</span>
            </div>
            <div className="ws-item">
              <span className="ws-label">Teilnehmer</span>
              <span className="ws-value">Max. 4 Personen</span>
              <span className="ws-sub">Kleine Gruppe, intensive Betreuung</span>
            </div>
            <div className="ws-item">
              <span className="ws-label">Ort</span>
              <span className="ws-value">SkinLove Studio</span>
              <span className="ws-sub">Marchtrenk, OÖ</span>
            </div>
            <div className="ws-item">
              <span className="ws-label">Voraussetzungen</span>
              <span className="ws-value">Keine</span>
              <span className="ws-sub">Anfänger willkommen</span>
            </div>
          </div>

          <div className="ws-includes">
            <h4>Was ist inkludiert</h4>
            <ul className="ws-list">
              <li>Theorie & Hygiene</li>
              <li>Praxisübungen</li>
              <li>Titan-Schmuck</li>
              <li>Pflegeprodukte</li>
              <li>Mittagessen</li>
              <li>Zertifikat</li>
            </ul>
          </div>

          <div className="ws-cta">
            <a href="https://wa.me/436607835346?text=Ich%20interessiere%20mich%20für%20den%20Piercing%20Workshop" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Anfragen via WhatsApp
            </a>
            <a href="#contact" className="btn-outline">Mehr Infos</a>
          </div>
        </div>
      </div>
    </section>
  );
}
