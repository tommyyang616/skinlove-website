"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const contactInfo = [
  {
    icon: "📍",
    label: "Adresse",
    lines: ["Linzer Straße 52", "4614 Marchtrenk", "Oberösterreich"],
    link: "https://maps.google.com/?q=Linzer+Straße+52,+4614+Marchtrenk",
    linkLabel: "Auf Google Maps",
  },
  {
    icon: "📞",
    label: "Telefon / WhatsApp",
    lines: ["+43 660 792 3606"],
    link: "tel:+436607923606",
    linkLabel: "Jetzt anrufen",
  },
  {
    icon: "📸",
    label: "Instagram",
    lines: ["@skinlove.tattoo"],
    link: "https://instagram.com/skinlove.tattoo",
    linkLabel: "Instagram öffnen",
  },
  {
    icon: "🕐",
    label: "Öffnungszeiten",
    lines: ["Mo–Fr: 9:00–18:00", "Sa: 9:00–14:00", "So: Geschlossen"],
    link: null,
    linkLabel: null,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("sent");
      setForm({ name: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" style={{ padding: "100px 0", background: "#222228" }}>
      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "60px" }}
        >
          <p style={{ fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--pink)", marginBottom: "16px", fontFamily: "'Outfit', sans-serif" }}>
            Kontakt
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 600, color: "#fff", marginBottom: "16px" }}>
            Lass uns reden
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-dim)", maxWidth: "540px", lineHeight: 1.7 }}>
            Kein Termin ohne Rückruf — ich melde mich bei dir!
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px,1fr))", gap: "40px", alignItems: "start" }}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(255,255,255,.04)",
                  padding: "24px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "20px", flexShrink: 0, marginTop: "2px" }}>{info.icon}</span>
                <div>
                  <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--pink)", marginBottom: "8px", fontFamily: "'Outfit', sans-serif" }}>
                    {info.label}
                  </p>
                  {info.lines.map((line, j) => (
                    <p key={j} style={{ fontSize: "14px", color: "var(--text)", marginBottom: "2px" }}>{line}</p>
                  ))}
                  {info.link && (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "12px", color: "var(--pink)", marginTop: "8px", display: "inline-block", letterSpacing: "1px", textTransform: "uppercase" }}
                    >
                      {info.linkLabel} →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Google Maps Embed */}
            <div style={{ overflow: "hidden", border: "1px solid rgba(255,255,255,.04)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.8!2d14.1145!3d48.1962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47740c5b4c3f8c91%3A0x4e5e8b8b4c3f8c91!2sLinzer+Str.+52%2C+4614+Marchtrenk!5e0!3m2!1sde!2sat!4v1"
                width="100%"
                height="220"
                style={{ border: 0, display: "block", filter: "grayscale(0.4) invert(0.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SkinLove Standort"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,.04)", padding: "40px" }}
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 600, color: "#fff", marginBottom: "8px" }}>
              Rückruf-Anfrage
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-dim)", marginBottom: "32px", lineHeight: 1.6 }}>
              Füll das Formular aus — ich ruf dich zurück. Kein Online-Buchen, dafür persönliche Beratung!
            </p>

            {status === "sent" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "48px", color: "var(--pink)", marginBottom: "16px" }}>✓</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#fff", marginBottom: "8px" }}>
                  Anfrage erhalten!
                </h4>
                <p style={{ fontSize: "14px", color: "var(--text-dim)" }}>Eve meldet sich bald bei dir. 💕</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { name: "name", placeholder: "Dein Name *", type: "text", required: true },
                  { name: "phone", placeholder: "Telefon / WhatsApp *", type: "tel", required: true },
                  { name: "service", placeholder: "Gewünschte Leistung (Tattoo, Piercing…)", type: "text", required: false },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={form[field.name as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    style={{
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.08)",
                      padding: "14px 18px",
                      fontSize: "14px",
                      color: "#fff",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                ))}
                <textarea
                  placeholder="Deine Nachricht oder Wunschmotiv"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.08)",
                    padding: "14px 18px",
                    fontSize: "14px",
                    color: "#fff",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.6,
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    background: "var(--pink)",
                    color: "#fff",
                    border: "none",
                    padding: "18px",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all .3s",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {status === "loading" ? "Wird gesendet..." : "Rückruf anfordern"}
                </button>
                {status === "error" && (
                  <p style={{ fontSize: "13px", color: "#ff6b6b", textAlign: "center" }}>
                    Fehler beim Senden. Bitte direkt anrufen: +43 660 792 3606
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
