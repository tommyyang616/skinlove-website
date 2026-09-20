"use client";
import { useState } from "react";
import TerminModal from "@/components/TerminModal";

export default function Contact({ bookingOpen, onClose }: { bookingOpen: boolean; onOpen: () => void; onClose: () => void }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <>
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="map-placeholder reveal" style={{ aspectRatio: "16/7", marginBottom: 24, position: "relative", maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
            {mapLoaded ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2670.5!2d14.1168099!3d48.1916365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4773fb5a4c7b8e1d%3A0x0!2sLinzer+Stra%C3%9Fe+35%2C+4614+Marchtrenk!5e0!3m2!1sde!2sat!4v1"
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Standort SkinLove Tattoo & Piercing"
              />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, background: "linear-gradient(135deg, rgba(187,53,153,.12), rgba(10,10,10,.92))", border: "1px solid rgba(255,255,255,.08)" }}>
                <strong style={{ color: "#fff", fontSize: 18 }}>Karte laden</strong>
                <p style={{ color: "var(--text-dim)", fontSize: 13, margin: 0, textAlign: "center", maxWidth: 320 }}>Google Maps wird erst geladen, wenn du die Karte wirklich öffnen willst.</p>
                <button className="btn-outline" type="button" onClick={() => setMapLoaded(true)} style={{ display: "inline-flex" }}>Karte anzeigen</button>
              </div>
            )}
            <a href="https://www.google.com/maps/dir//Linzer+Stra%C3%9Fe+35,+4614+Marchtrenk,+%C3%96sterreich" target="_blank" rel="noopener noreferrer"
              style={{ position: "absolute", top: 10, right: 10, zIndex: 2, fontSize: 10, padding: "5px 10px", background: "rgba(212,75,109,.7)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(212,75,109,.4)", letterSpacing: ".5px" }}>
              Route planen
            </a>
          </div>
          <div className="contact-bottom reveal">
            <div>
              <span className="section-label">Kontakt</span>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <a href="tel:+436607835346">+43 660 783 5346</a>
              </div>
              <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <a href="mailto:eve@skinlove-tattoo-piercing.at">eve@skinlove-tattoo-piercing.at</a>
              </div>
            </div>
            <div>
              <div className="contact-block" style={{ marginBottom: 12 }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  Adresse
                </h3>
                <p>Linzer Straße 35, 1. OG<br />4614 Marchtrenk, Österreich</p>
              </div>
            </div>
            <div>
              <div className="contact-block">
                <h3 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  Öffnungszeiten
                </h3>
                <div className="hours-grid">
                  <div className="hours-row"><span>Montag – Freitag</span><span>09:00 – 18:00</span></div>
                  <div className="hours-row"><span>Samstag</span><span>10:00 – 17:00</span></div>
                  <div className="hours-row"><span>Sonntag</span><span>Geschlossen</span></div>
                </div>
                <p style={{ marginTop: 12, fontSize: 13, color: "var(--pink-text)", fontWeight: 500 }}>⚠️ Termine nur nach vorheriger Vereinbarung!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TerminModal open={bookingOpen} onClose={onClose} />
    </>
  );
}
