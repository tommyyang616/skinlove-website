"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", service: "", message: "" });
      }
    } catch {
      // fail silently
    }
    setSending(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32" style={{ background: "#222228" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Kontakt
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Jetzt Termin vereinbaren
          </h2>
          <div className="w-12 h-0.5 bg-[var(--pink)] mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="tel:+436607835346"
                className="rounded-xl border border-white/5 p-5 hover:border-[var(--pink)]/30 transition-colors block"
                style={{ background: "var(--bg-card)" }}
              >
                <div className="text-2xl mb-2">📞</div>
                <p className="text-sm text-[var(--text-dim)]">Telefon</p>
                <p className="text-white font-medium">+43 660 783 5346</p>
              </a>
              <a
                href="mailto:eve@skinlove-tattoo-piercing.at"
                className="rounded-xl border border-white/5 p-5 hover:border-[var(--pink)]/30 transition-colors block"
                style={{ background: "var(--bg-card)" }}
              >
                <div className="text-2xl mb-2">✉️</div>
                <p className="text-sm text-[var(--text-dim)]">E-Mail</p>
                <p className="text-white font-medium text-sm">eve@skinlove-tattoo-piercing.at</p>
              </a>
              <div
                className="rounded-xl border border-white/5 p-5"
                style={{ background: "var(--bg-card)" }}
              >
                <div className="text-2xl mb-2">📍</div>
                <p className="text-sm text-[var(--text-dim)]">Adresse</p>
                <p className="text-white font-medium text-sm">
                  Linzer Straße 35, 1. OG
                  <br />
                  4614 Marchtrenk, Österreich
                </p>
              </div>
              <div
                className="rounded-xl border border-white/5 p-5"
                style={{ background: "var(--bg-card)" }}
              >
                <div className="text-2xl mb-2">🕐</div>
                <p className="text-sm text-[var(--text-dim)]">Öffnungszeiten</p>
                <div className="text-white text-sm space-y-0.5">
                  <p>Mo–Fr: 09:00–18:00</p>
                  <p>Sa: 10:00–17:00</p>
                  <p className="text-[var(--text-dim)]">So: Geschlossen</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 p-4 text-center text-sm text-yellow-400/90" style={{ background: "var(--bg-card)" }}>
              ⚠️ Termine nur nach vorheriger Vereinbarung!
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2670.5!2d14.1168099!3d48.1916365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477399a62e58e06f%3A0x76a72be82a7a02ff!2sLinzer%20Stra%C3%9Fe%2035%2C%204614%20Marchtrenk%2C%20%C3%96sterreich!5e0!3m2!1sde!2sat!4v1"
                width="100%"
                height="250"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://www.google.com/maps/dir//Linzer+Stra%C3%9Fe+35,+4614+Marchtrenk,+%C3%96sterreich"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--pink)] hover:underline"
            >
              🗺️ Route planen
            </a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {sent ? (
              <div
                className="rounded-2xl border border-white/5 p-10 text-center"
                style={{ background: "var(--bg-card)" }}
              >
                <div className="text-5xl mb-4">💌</div>
                <h3 className="text-xl font-semibold text-white mb-2">Nachricht gesendet!</h3>
                <p className="text-sm text-[var(--text-dim)]">
                  Ich melde mich so schnell wie möglich bei dir.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/5 p-8 space-y-5"
                style={{ background: "var(--bg-card)" }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">Schreib mir</h3>
                <div>
                  <input
                    type="text"
                    placeholder="Dein Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--pink)]/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Deine E-Mail"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--pink)]/50 transition-colors"
                  />
                </div>
                <div>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--pink)]/50 transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#1a1a1a]">
                      Service wählen...
                    </option>
                    <option value="tattoo" className="bg-[#1a1a1a]">Tattoo</option>
                    <option value="piercing" className="bg-[#1a1a1a]">Piercing</option>
                    <option value="pmu" className="bg-[#1a1a1a]">Permanent Make-up</option>
                    <option value="lash" className="bg-[#1a1a1a]">Lash & Brow Lifting</option>
                    <option value="kinder" className="bg-[#1a1a1a]">Kinderohrringe</option>
                    <option value="sonstiges" className="bg-[#1a1a1a]">Sonstiges</option>
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder="Deine Nachricht..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--pink)]/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[var(--pink)] text-white py-3 rounded-lg font-medium hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {sending ? "Wird gesendet..." : "Nachricht senden"}
                </button>
                <div className="text-center">
                  <a
                    href="https://wa.me/436607835346"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    💬 Oder direkt per WhatsApp
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
