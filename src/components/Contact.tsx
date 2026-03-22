"use client";
import { useRef, useState } from "react";

const SB_URL = "https://ebcjdkjrzwjxxwgtzunh.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY2pka2pyendqeHh3Z3R6dW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDY4OTksImV4cCI6MjA4ODQyMjg5OX0.eOeWfKVQ8ZSVvsc0zcZtFQAFtx05Oe6AAukgqRS0zeY";

export default function Contact({ bookingOpen, onOpen, onClose }: { bookingOpen: boolean; onOpen: () => void; onClose: () => void }) {
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const closeModal = () => { onClose(); setTimeout(() => setSuccess(false), 400); };

  const submit = () => {
    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const service = serviceRef.current?.value || "";
    const msg = msgRef.current?.value.trim() || "";
    if (!email || !email.includes("@")) { if (emailRef.current) emailRef.current.style.borderColor = "#e44"; return; }
    if (!name) { if (nameRef.current) nameRef.current.style.borderColor = "#e44"; return; }

    // Save to Supabase
    fetch(SB_URL + "/rest/v1/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SB_KEY, Authorization: "Bearer " + SB_KEY },
      body: JSON.stringify({ name, email, phone: null, service: service || null, message: msg || null, status: "pending" }),
    }).catch(() => {});

    // WhatsApp
    const waMsg = `📅 *Neue Terminanfrage*%0A%0A*Name:* ${name}%0A*E-Mail:* ${email}%0A*Service:* ${service || "Nicht angegeben"}%0A*Nachricht:* ${msg || "—"}%0A%0A_Gesendet über skinlove-website_`;
    window.open("https://wa.me/436607835346?text=" + waMsg, "_blank");

    // Email via Edge Function
    fetch(SB_URL + "/functions/v1/send-booking-email", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + SB_KEY },
      body: JSON.stringify({ name, email, service, message: msg }),
    }).catch(() => {});

    setSuccess(true);
  };

  return (
    <>
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="map-placeholder reveal" style={{ aspectRatio: "16/7", marginBottom: 24, position: "relative", maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2670.5!2d14.1168099!3d48.1916365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4773fb5a4c7b8e1d%3A0x0!2sLinzer+Stra%C3%9Fe+35%2C+4614+Marchtrenk!5e0!3m2!1sde!2sat!4v1"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
            <a href="https://www.google.com/maps/dir//Linzer+Stra%C3%9Fe+35,+4614+Marchtrenk,+%C3%96sterreich" target="_blank" rel="noopener noreferrer"
              style={{ position: "absolute", top: 10, right: 10, zIndex: 2, fontSize: 10, padding: "5px 10px", background: "rgba(212,75,109,.7)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(212,75,109,.4)", letterSpacing: ".5px" }}>
              Route planen
            </a>
          </div>
          <div className="contact-bottom reveal">
            <div>
              <span className="section-label">Kontakt</span>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+436607835346">+43 660 783 5346</a>
              </div>
              <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:eve@skinlove-tattoo-piercing.at">eve@skinlove-tattoo-piercing.at</a>
              </div>
            </div>
            <div>
              <div className="contact-block" style={{ marginBottom: 12 }}>
                <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Adresse
                </h4>
                <p>Linzer Straße 35, 1. OG<br />4614 Marchtrenk, Österreich</p>
              </div>
            </div>
            <div>
              <div className="contact-block">
                <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Öffnungszeiten
                </h4>
                <div className="hours-grid">
                  <div className="hours-row"><span>Montag – Freitag</span><span>09:00 – 18:00</span></div>
                  <div className="hours-row"><span>Samstag</span><span>10:00 – 17:00</span></div>
                  <div className="hours-row"><span>Sonntag</span><span>Geschlossen</span></div>
                </div>
                <p style={{ marginTop: 12, fontSize: 13, color: "var(--pink)", fontWeight: 500 }}>⚠️ Termine nur nach vorheriger Vereinbarung!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <div className={`modal-overlay${bookingOpen ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal">
          <button className="modal-close" onClick={closeModal}>×</button>
          <div className={`modal-form${success ? " hidden" : ""}`} id="bookingForm">
            <h3>Termin anfragen</h3>
            <p>Fülle das Formular aus und du bekommst eine Bestätigungsmail. Eve meldet sich in Kürze bei dir!</p>
            <label>Name</label>
            <input ref={nameRef} type="text" placeholder="Dein Name" />
            <label>E-Mail</label>
            <input ref={emailRef} type="email" placeholder="deine@email.at" />
            <label>Was möchtest du?</label>
            <select ref={serviceRef}>
              <option value="">Bitte wählen</option>
              <option>Tattoo</option>
              <option>Piercing</option>
              <option>Permanent Make-up</option>
              <option>Lash &amp; Brow Lifting</option>
              <option>Kinderohrringe</option>
              <option>Sonstiges</option>
            </select>
            <label>Nachricht (optional)</label>
            <textarea ref={msgRef} placeholder="Kurze Beschreibung, Wunschtermin..." />
            <button className="btn-primary" onClick={submit}>Termin anfragen</button>
          </div>
          <div className={`modal-success${success ? " show" : ""}`}>
            <div className="check">✓</div>
            <h3>Danke für deine Anfrage!</h3>
            <p>Du bekommst in Kürze eine Bestätigungsmail.<br />Eve meldet sich so schnell wie möglich bei dir.<br />Mo–Fr 9–18 · Sa 10–17</p>
          </div>
        </div>
      </div>
    </>
  );
}
