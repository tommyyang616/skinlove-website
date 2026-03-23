"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Service = {
  title: string;
  hero: string;
  description: string;
  details: string[];
  faq: { q: string; a: string }[];
};

export default function ServicePageClient({ service, slug }: { service: Service; slug: string }) {
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
                <p style={{ fontSize: 13, color: "#999", lineHeight: 1.6 }}>{f.a}</p>
              </div>
            ))}
          </div>

          {/* FAQ Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faq.map(f => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}} />
        </div>
      )}

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "0 24px 80px" }}>
        <a
          href="https://wa.me/436607835346"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", padding: "14px 40px", background: "#bb3599", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600, transition: "opacity .3s" }}
        >
          📱 Termin vereinbaren via WhatsApp
        </a>
        <p style={{ color: "#666", fontSize: 12, marginTop: 12 }}>Oder ruf an: +43 660 7835346</p>
      </div>
    </div>
  );
}
