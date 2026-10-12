"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import LeistungsGalerie from "@/components/LeistungsGalerie";
import TerminModal from "@/components/TerminModal";
import BewertungsLeiste from "@/components/BewertungsLeiste";

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

/** Stichwort vor dem Doppelpunkt hervorheben ("Ohr: Helix, ..." -> **Ohr:**),
 *  damit sich lange Aufzählungen schneller lesen lassen. */
function mitStichwort(text: string) {
  const m = text.match(/^([^:.!?]{2,32}):\s([\s\S]*)$/);
  if (!m) return text;
  return (
    <>
      <strong>{m[1]}:</strong> {m[2]}
    </>
  );
}

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
      <Navigation unterseite onBook={() => setFormOpen(true)} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 24px 0" }}>
        <Link href="/leistungen" style={{ color: "#d95dc0", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>← Alle Leistungen</Link>
      </div>

      {/* Hero */}
      {/* Einblenden per CSS statt framer-motion: kein zusätzliches JavaScript,
          und die Überschrift steht sofort im HTML (für LCP/Google wichtig) */}
      <div className="lp-hero" style={{ padding: "40px 24px 48px", textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <span style={{ fontSize: 13, letterSpacing: 4, textTransform: "uppercase", color: "#d95dc0", fontWeight: 600 }}>{service.title}</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,5vw,50px)", color: "#fff", fontWeight: 600, margin: "16px 0 10px", lineHeight: 1.15 }}>{service.h1}</h1>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#d77fc0", fontSize: "clamp(19px,2.6vw,24px)", margin: "0 0 20px", lineHeight: 1.3 }}>{service.hero}</p>
        <p style={{ color: "#aaa", fontSize: 18, lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>{service.description}</p>
      </div>

      {/* Details */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ display: "grid", gap: 12 }}>
          {service.details.map((d, i) => (
            <div
              key={i}
              className="lp-detail"
              style={{ animationDelay: `${0.1 * i}s`, display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 20px", background: "#141414", border: "1px solid rgba(255,255,255,.06)" }}
            >
              <span aria-hidden="true" style={{ color: "#d95dc0", fontSize: 16, flexShrink: 0, marginTop: 3 }}>✦</span>
              <span style={{ color: "#ddd", fontSize: 17, lineHeight: 1.6 }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bildleiste */}
      {service.bilder && service.bilder.length > 0 && (
        <LeistungsGalerie bilder={service.bilder} titel={service.title} />
      )}

      {/* Ausführliche Abschnitte als Karten */}
      {service.abschnitte && service.abschnitte.length > 0 && (
        <div className="lp-abschnitte">
          {service.abschnitte.map((a, i) => (
            <section key={i} className="lp-karte">
              <span className="lp-nr" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h2>{a.h}</h2>
              {a.text.map((t, j) => (
                <p key={j}>{mitStichwort(t)}</p>
              ))}
            </section>
          ))}
        </div>
      )}

      {/* Echte Google-Bewertungen als wischbare Endlos-Leiste */}
      {service.stimmen && service.stimmen.length > 0 && <BewertungsLeiste stimmen={service.stimmen} />}

      {/* FAQ */}
      {service.faq.length > 0 && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 64px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, color: "#fff", fontWeight: 600, marginBottom: 24 }}>Häufige Fragen</h2>
          <div className="lp-fragen">
            {service.faq.map((f, i) => (
              <details key={i} className="lp-frage">
                <summary>
                  <span>{f.q}</span>
                  <span className="lp-plus" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
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
        <button type="button" className="leucht-knopf" onClick={() => setFormOpen(true)}>
          Termin vereinbaren <span className="leucht-knopf-pfeil" aria-hidden="true">→</span>
        </button>
      </div>
      <TerminModal open={formOpen} onClose={() => setFormOpen(false)} service={service.title} />
      <Footer />
    </div>
  );
}
