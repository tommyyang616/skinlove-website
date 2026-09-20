"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import LeistungsGalerie from "@/components/LeistungsGalerie";
import TerminModal from "@/components/TerminModal";

type Service = {
  title: string;
  hero: string;
  description: string;
  details: string[];
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

      {/* Bildleiste */}
      {service.bilder && service.bilder.length > 0 && (
        <LeistungsGalerie bilder={service.bilder} titel={service.title} />
      )}

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

      {weitere.length > 0 && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 48px" }}>
          <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 14 }}>
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
                  fontSize: 14,
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
                color: "#bb3599",
                borderRadius: 50,
                fontSize: 14,
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
          style={{ padding: "14px 40px", background: "#bb3599", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "opacity .3s" }}
        >
          Termin vereinbaren
        </button>
      </div>
      <TerminModal open={formOpen} onClose={() => setFormOpen(false)} service={service.title} />
      <Footer />
    </div>
  );
}
