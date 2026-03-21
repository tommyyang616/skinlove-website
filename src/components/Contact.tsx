"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-6 py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Schreib mir
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Kontakt
          </h2>
          <div className="pink-line" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white mb-4">
                📍 Studio
              </h3>
              <p className="text-[var(--text-dim)]">
                SkinLove Tattoo &amp; Piercing
                <br />
                Linzer Straße 35, 1. OG
                <br />
                4614 Marchtrenk
                <br />
                Österreich
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white mb-4">
                📞 Erreichbarkeit
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+436607835346"
                  className="flex items-center gap-3 text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors"
                >
                  <span>📱</span> +43 660 783 5346
                </a>
                <a
                  href="mailto:eve@skinlove-tattoo-piercing.at"
                  className="flex items-center gap-3 text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors"
                >
                  <span>✉️</span> eve@skinlove-tattoo-piercing.at
                </a>
                <a
                  href="https://wa.me/436607835346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors"
                >
                  <span>💬</span> WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/skinlove_tattoopiercing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors"
                >
                  <span>📸</span> Instagram
                </a>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white mb-4">
                💳 Bankverbindung
              </h3>
              <p className="text-[var(--text-dim)] text-sm">
                Für Anzahlungen und Überweisungen:
                <br />
                <span className="text-white font-medium">
                  IBAN: AT37 2032 6000 0123 9441
                </span>
              </p>
            </div>
          </motion.div>

          {/* Map + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Google Maps */}
            <div className="glass-card rounded-2xl overflow-hidden aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d14.125!3d48.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDExJzI0LjAiTiAxNMKwMDcnMzAuMCJF!5e0!3m2!1sde!2sat!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SkinLove Standort"
              />
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/436607835346"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-8 py-4 bg-[var(--pink)] text-white text-sm tracking-[2px] uppercase rounded-full hover:bg-[var(--pink-dim)] transition-all duration-300 hover:scale-[1.02]"
            >
              💬 Jetzt per WhatsApp schreiben
            </a>

            <a
              href="tel:+436607835346"
              className="block w-full text-center px-8 py-4 border border-white/20 text-white text-sm tracking-[2px] uppercase rounded-full hover:border-[var(--pink)] hover:text-[var(--pink)] transition-all duration-300"
            >
              📞 Anrufen: +43 660 783 5346
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
