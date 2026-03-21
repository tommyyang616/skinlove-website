"use client";
import { useRef, useState } from "react";

const SERVICES_OPTIONS = [
  "Tattoo",
  "Piercing",
  "Lash Lifting",
  "Brow Lifting",
  "Lash & Brow Kombination",
  "Permanent Make-up",
  "Workshop",
  "Sonstiges",
];

export default function Contact({ bookingOpen, onOpen, onClose }: {
  bookingOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const service = data.get("service") as string;
    const msg = data.get("message") as string;
    const phone = data.get("phone") as string;
    const text = encodeURIComponent(`Terminanfrage von ${name}\nLeistung: ${service}\nTelefon: ${phone}\n\n${msg}`);
    window.open(`https://wa.me/436607835346?text=${text}`, "_blank");
    setSuccess(true);
  };

  const closeModal = () => { onClose(); setTimeout(() => setSuccess(false), 400); };

  return (
    <>
      <section id="contact">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-eyebrow">Jetzt buchen</div>
            <h2 className="section-title">Kontakt</h2>
            <div className="section-line" />
          </div>

          <div className="contact-grid reveal">
            <div className="contact-info">
              <h3>Komm vorbei oder meld dich</h3>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Adresse</div>
                  <div className="contact-value">Marchtrenk, Oberösterreich</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">Telefon</div>
                  <div className="contact-value">
                    <a href="tel:+436607835346">+43 660 7835346</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📸</div>
                <div>
                  <div className="contact-label">Instagram</div>
                  <div className="contact-value">
                    <a href="https://instagram.com/skinlove.tattoo.piercing" target="_blank" rel="noopener noreferrer">
                      @skinlove.tattoo.piercing
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">💬</div>
                <div>
                  <div className="contact-label">WhatsApp</div>
                  <div className="contact-value">
                    <a href="https://wa.me/436607835346" target="_blank" rel="noopener noreferrer">
                      Direkt schreiben
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-side">
              <h3>Termin vereinbaren</h3>
              <a
                href="https://wa.me/436607835346?text=Hallo%20Eve%2C%20ich%20möchte%20gerne%20einen%20Termin%20vereinbaren."
                target="_blank"
                rel="noopener noreferrer"
                className="wa-book-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                Via WhatsApp buchen
              </a>
              <button className="book-btn" onClick={onOpen}>
                Buchungsformular öffnen
              </button>
              <p className="contact-note">
                Ich melde mich in der Regel innerhalb von 24 Stunden.<br />
                Für dringende Anfragen bitte direkt anrufen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <div className={`booking-modal${bookingOpen ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="booking-inner">
          <button className="booking-close" onClick={closeModal}>×</button>

          <div className={`booking-form${success ? " hide" : ""}`}>
            <h2>Termin anfragen</h2>
            <p>Füll das Formular aus – ich melde mich bei dir.</p>
            <form ref={formRef} onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Dein Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Telefon / WhatsApp</label>
                <input id="phone" name="phone" type="tel" placeholder="+43 ..." />
              </div>
              <div className="form-group">
                <label htmlFor="service">Leistung</label>
                <select id="service" name="service" required>
                  <option value="">Bitte wählen…</option>
                  {SERVICES_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Deine Nachricht / Wunschtermin</label>
                <textarea id="message" name="message" placeholder="Beschreibe dein Wunsch-Tattoo, Piercing oder Anliegen…" />
              </div>
              <button type="submit" className="form-submit">Anfrage via WhatsApp senden</button>
            </form>
          </div>

          <div className={`booking-success${success ? " show" : ""}`}>
            <h3>Danke für deine Anfrage!</h3>
            <p>WhatsApp wurde geöffnet. Ich melde mich so schnell wie möglich bei dir. 💖</p>
          </div>
        </div>
      </div>
    </>
  );
}
