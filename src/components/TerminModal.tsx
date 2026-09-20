"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Das Anfrage-Popup. Eine Stelle fuer alle Seiten: Startseite und
 * Leistungsseiten benutzen dieselbe Komponente, damit die Formulare nicht
 * wieder auseinanderlaufen.
 *
 * `service` vorbelegen, wenn die Seite die Leistung schon kennt (z. B. auf
 * /leistungen/tattoos) - dann entfaellt die Auswahlliste.
 */
export default function TerminModal({
  open,
  onClose,
  service,
}: {
  open: boolean;
  onClose: () => void;
  service?: string;
}) {
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeModal = () => {
    onClose();
    setTimeout(() => { setSuccess(false); setError(""); }, 400);
  };

  const submit = async () => {
    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const phone = phoneRef.current?.value.trim() || "";
    const gewaehlt = service || serviceRef.current?.value || "";
    const msg = msgRef.current?.value.trim() || "";
    if (!name) { if (nameRef.current) nameRef.current.style.borderColor = "#e44"; return; }
    if (!email || !email.includes("@")) { if (emailRef.current) emailRef.current.style.borderColor = "#e44"; return; }
    if (!phone) { if (phoneRef.current) phoneRef.current.style.borderColor = "#e44"; return; }

    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service: gewaehlt || null, message: msg || null }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Die Anfrage konnte nicht gesendet werden. Bitte ruf uns kurz an: +43 660 78 353 46");
        setSending(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError("Keine Verbindung zum Server. Bitte ruf uns kurz an: +43 660 78 353 46");
    }
    setSending(false);
  };

  return (
    <div
      className={`modal-overlay${open ? " open" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="modal">
        <button className="modal-close" onClick={closeModal} aria-label="Schlie&szlig;en">&times;</button>
        <div className={`modal-form${success ? " hidden" : ""}`} id="bookingForm">
          <h3>Termin anfragen</h3>
          <p>
            {service
              ? `Anfrage für ${service} — füll das Formular aus, Eve meldet sich in Kürze bei dir!`
              : "Fülle das Formular aus und du bekommst eine Bestätigungsmail. Eve meldet sich in Kürze bei dir!"}
          </p>
          <label>Name <span style={{ color: "var(--pink)" }}>*</span></label>
          <input ref={nameRef} type="text" placeholder="Dein Name" required />
          <label>E-Mail <span style={{ color: "var(--pink)" }}>*</span></label>
          <input ref={emailRef} type="email" placeholder="deine@email.at" required />
          <label>Telefonnummer <span style={{ color: "var(--pink)" }}>*</span></label>
          <input ref={phoneRef} type="tel" placeholder="+43 660 ..." required />
          <p style={{ fontSize: 12, color: "var(--text-dim)", margin: "-8px 0 12px 0" }}>
            Pflichtfeld &mdash; wir rufen dich f&uuml;r die Terminbest&auml;tigung zur&uuml;ck.
          </p>
          {!service && (
            <>
              <label>Was m&ouml;chtest du?</label>
              <select ref={serviceRef}>
                <option value="">Bitte w&auml;hlen</option>
                <option>Tattoo</option>
                <option>Piercing</option>
                <option>Permanent Make-up</option>
                <option>Lash &amp; Brow Lifting</option>
                <option>Kinderohrringe</option>
                <option>Sonstiges</option>
              </select>
            </>
          )}
          <label>Nachricht (optional)</label>
          <textarea ref={msgRef} placeholder="Kurze Beschreibung, Wunschtermin..." />
          {error && (
            <p style={{ color: "#ff8080", fontSize: 13, lineHeight: 1.5, margin: "0 0 12px 0" }}>{error}</p>
          )}
          <button
            className="btn-primary"
            onClick={submit}
            disabled={sending}
            style={sending ? { opacity: 0.6, cursor: "wait" } : undefined}
          >
            {sending ? "Wird gesendet…" : "Termin anfragen"}
          </button>
        </div>
        <div className={`modal-success${success ? " show" : ""}`}>
          <div className="check">&#10003;</div>
          <h3>Danke f&uuml;r deine Anfrage!</h3>
          <p>
            Du bekommst in K&uuml;rze eine Best&auml;tigungsmail.<br />
            Eve meldet sich so schnell wie m&ouml;glich bei dir.<br />
            Mo&ndash;Fr 9&ndash;18 &middot; Sa 10&ndash;17
          </p>
        </div>
      </div>
    </div>
  );
}
