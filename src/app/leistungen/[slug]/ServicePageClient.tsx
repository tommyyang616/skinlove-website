"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Service = {
  title: string;
  hero: string;
  description: string;
  details: string[];
  faq: { q: string; a: string }[];
};

export default function ServicePageClient({ service }: { service: Service; slug: string }) {
  const [formOpen, setFormOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const msg = msgRef.current?.value.trim() || "";
    if (!name) { if (nameRef.current) nameRef.current.style.borderColor = "#e44"; return; }
    if (!email || !email.includes("@")) { if (emailRef.current) emailRef.current.style.borderColor = "#e44"; return; }

    fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, service: service.title, message: msg || null }),
    }).catch(() => { });

    const waMsg = `📅 *Neue Terminanfrage*%0A%0A*Name:* ${name}%0A*E-Mail:* ${email}%0A*Service:* ${service.title}%0A*Nachricht:* ${msg || "—"}%0A%0A_Gesendet über skinlove-website_`;
    window.open("https://wa.me/436607835346?text=" + waMsg, "_blank");
    setSuccess(true);
  };

  const inp: React.CSSProperties = { width: "100%", padding: 12, background: "#1a1a1a", border: "1px solid rgba(255,255,255,.1)", color: "#fff", fontSize: 14, outline: "none", marginBottom: 12, boxSizing: "border-box", fontFamily: "inherit" };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Outfit',sans-serif" }}>
      {/* Nav */}
      <nav style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: 18, fontWeight: 600 }}>
          Skin<span style={{ color: "#bb3599" }}>Love</span>
        </Link>
        <Link href="/#services" style={{ color: "#bb3599", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>← Alle Leistungen</Link>
      </nav>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ padding: "80px 24px 48px", textAlign: "center", maxWidth: 720, margin: "0 auto" }}
      >
        <span style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#bb3599", fontWeight: 600 }}>{service.title}</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,48px)", color: "#fff", fontWeight: 600, margin: "16px 0", lineHeight: 1.2 }}>{service.hero}</h1>
        <p style={{ color: "#999", fontSize: 15, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>{service.description}</p>
      </motion.div>

      {/* Details */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ display: "grid", gap: 12 }}>
          {service.details.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 18px", background: "#141414", border: "1px solid rgba(255,255,255,.06)" }}
            >
              <span style={{ color: "#bb3599", fontSize: 14, flexShrink: 0, marginTop: 2 }}>✦</span>
              <span style={{ color: "#ddd", fontSize: 14, lineHeight: 1.6 }}>{d}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      {service.faq.length > 0 && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 64px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "#fff", fontWeight: 600, marginBottom: 24 }}>Häufige Fragen</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {service.faq.map((f, i) => (
              <div key={i} style={{ padding: 20, background: "#141414", border: "1px solid rgba(255,255,255,.06)" }}>
                <h3 style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
                <p style={{ fontSize: 13, color: "#999", lineHeight: 1.6, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>

          {/* FAQ schema is rendered server-side in page.tsx */}
        </div>
      )}

      {/* CTA + Inline Form */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 80px", textAlign: "center" }}>
        {!formOpen && !success && (
          <button
            onClick={() => setFormOpen(true)}
            style={{ padding: "14px 40px", background: "#bb3599", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "opacity .3s" }}
          >
            Termin vereinbaren
          </button>
        )}

        {formOpen && !success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: 440, margin: "0 auto", background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 32, textAlign: "left" }}
          >
            <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Termin anfragen</h3>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>für {service.title}</p>
            <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Name</label>
            <input ref={nameRef} type="text" placeholder="Dein Name" style={inp} onChange={e => { e.target.style.borderColor = "rgba(255,255,255,.1)"; }} />
            <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>E-Mail</label>
            <input ref={emailRef} type="email" placeholder="deine@email.at" style={inp} onChange={e => { e.target.style.borderColor = "rgba(255,255,255,.1)"; }} />
            <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Nachricht (optional)</label>
            <textarea ref={msgRef} placeholder="Wunschtermin, Motiv-Idee, Fragen..." style={{ ...inp, minHeight: 80, resize: "vertical" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button onClick={submit} style={{ flex: 1, padding: 12, background: "#bb3599", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Anfrage senden
              </button>
              <button onClick={() => setFormOpen(false)} style={{ padding: "12px 20px", background: "transparent", color: "#888", border: "1px solid rgba(255,255,255,.1)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                Abbrechen
              </button>
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Danke für deine Anfrage!</h3>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>Eve meldet sich so schnell wie möglich bei dir.<br />Mo–Fr 9–18 · Sa 10–17</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
