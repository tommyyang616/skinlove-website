"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import LeistungsGalerie from "@/components/LeistungsGalerie";
import TerminModal from "@/components/TerminModal";

type Service = {
  title: string;
  h1: string;
  hero: string;
  description: string;
  details: string[];
  abschnitte?: { h: string; text: string[] }[];
  stimmen?: { i: string; n: string; d: string; t: string }[];
  faq: { q: string; a: string }[];
  bilder?: { src: string; alt: string }[];
};

export default function ServicePageClient({
  service,
  weitere = [],
}: {
  service: Service;
  slug: string;
  weitere?: { slug: string; titel: string }[];
}) {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Outfit',sans-serif" }}>
      <Navigation unterseite />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 24px 0" }}>
        <Link href="/leistungen" style={{ color: "#d95dc0", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>← Alle Leistungen</Link>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ padding: "40px 24px 48px", textAlign: "center", maxWidth: 720, margin: "0 auto" }}
      >
        <span style={{ fontSize: 13, letterSpacing: 4, textTransform: "uppercase", color: "#d95dc0", fontWeight: 600 }}>{service.title}</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,5vw,50px)", color: "#fff", fontWeight: 600, margin: "16px 0 10px", lineHeight: 1.15 }}>{service.h1}</h1>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#d77fc0", fontSize: "clamp(19px,2.6vw,24px)", margin: "0 0 20px", lineHeight: 1.3 }}>{service.hero}</p>
        <p style={{ color: "#aaa", fontSize: 18, lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>{service.description}</p>
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
              style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 20px", background: "#141414", border: "1px solid rgba(255,255,255,.06)" }}
            >
              <span aria-hidden="true" style={{ color: "#d95dc0", fontSize: 16, flexShrink: 0, marginTop: 3 }}>✦</span>
              <span style={{ color: "#ddd", fontSize: 17, lineHeight: 1.6 }}>{d}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bildleiste */}
      {service.bilder && service.bilder.length > 0 && (
        <LeistungsGalerie bilder={service.bilder} titel={service.title} />
      )}

      {/* Ausführliche Abschnitte */}
      {service.abschnitte && service.abschnitte.length > 0 && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "8px 24px 40px" }}>
          {service.abschnitte.map((a, i) => (
            <section key={i} style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, color: "#fff", fontWeight: 600, marginBottom: 12, lineHeight: 1.2 }}>{a.h}</h2>
              {a.text.map((t, j) => (
                <p key={j} style={{ color: "#c8c8c8", fontSize: 17, lineHeight: 1.8, margin: "0 0 12px" }}>{t}</p>
              ))}
            </section>
          ))}
        </div>
      )}

      {/* Echte Google-Bewertungen */}
      {service.stimmen && service.stimmen.length > 0 && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 56px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, color: "#fff", fontWeight: 600, marginBottom: 20 }}>Das sagen Kundinnen und Kunden</h2>
          <div style={{ display: "grid", gap: 14 }}>
            {service.stimmen.map((r, i) => (
              <figure key={i} style={{ margin: 0, padding: "20px 22px", background: "#141414", border: "1px solid rgba(187,53,153,.18)" }}>
                <div style={{ color: "#f5b400", fontSize: 15, letterSpacing: 2, marginBottom: 8 }} aria-label="5 von 5 Sternen">★★★★★</div>
                <blockquote style={{ margin: 0, color: "#ddd", fontSize: 16, lineHeight: 1.7 }}>&bdquo;{r.t}&ldquo;</blockquote>
                <figcaption style={{ marginTop: 10, color: "#999", fontSize: 14 }}>{r.n} · Google-Bewertung, {r.d}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {service.faq.length > 0 && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 64px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, color: "#fff", fontWeight: 600, marginBottom: 24 }}>Häufige Fragen</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {service.faq.map((f, i) => (
              <div key={i} style={{ padding: 20, background: "#141414", border: "1px solid rgba(255,255,255,.06)" }}>
                <h3 style={{ fontSize: 17, color: "#fff", fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
                <p style={{ fontSize: 16, color: "#aaa", lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>

          {/* FAQ schema is rendered server-side in page.tsx */}
        </div>
      )}

      {weitere.length > 0 && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 48px" }}>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 600, marginBottom: 14 }}>
            Weitere Leistungen
          </h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {weitere.map((w) => (
              <Link
                key={w.slug}
                href={`/leistungen/${w.slug}`}
                style={{
                  padding: "10px 18px",
                  border: "1px solid rgba(255,255,255,.14)",
                  color: "#ddd",
                  borderRadius: 50,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                {w.titel}
              </Link>
            ))}
            <Link
              href="/anfahrt"
              style={{
                padding: "10px 18px",
                border: "1px solid rgba(187,53,153,.5)",
                color: "#d95dc0",
                borderRadius: 50,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Anfahrt aus Wels &amp; Linz
            </Link>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 80px", textAlign: "center" }}>
        <button
          onClick={() => setFormOpen(true)}
          style={{ padding: "16px 44px", background: "#bb3599", color: "#fff", border: "none", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "opacity .3s" }}
        >
          Termin vereinbaren
        </button>
      </div>
      <TerminModal open={formOpen} onClose={() => setFormOpen(false)} service={service.title} />
      <Footer />
    </div>
  );
}
