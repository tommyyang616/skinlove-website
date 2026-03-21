"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-1 py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Das Studio
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Über mich
          </h2>
          <div className="pink-line" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/images/eve-about.png"
                alt="Eve Paule – SkinLove"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/eve.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-white">
              Eve Paule
            </h3>
            <p className="text-[var(--text-dim)] leading-relaxed">
              Hey, ich bin Eve — Gründerin und Inhaberin von SkinLove Tattoo &amp; Piercing
              in Marchtrenk. Was als Leidenschaft begann, ist heute mein Beruf und
              meine Berufung.
            </p>
            <p className="text-[var(--text-dim)] leading-relaxed">
              In meinem Studio verbinde ich Kreativität mit höchsten Hygienestandards.
              Jedes Tattoo, jedes Piercing und jedes Permanent Make-up wird mit Liebe
              zum Detail und vollem Fokus auf deine Wünsche umgesetzt.
            </p>
            <p className="text-[var(--text-dim)] leading-relaxed">
              Mir ist wichtig, dass du dich bei mir wohlfühlst — egal ob es dein erstes
              Tattoo ist oder du schon Erfahrung hast. Gemeinsam machen wir dein Projekt
              zu etwas Besonderem.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 glass-card rounded-xl">
                <p className="text-2xl font-semibold text-[var(--pink)]">4.6</p>
                <p className="text-xs text-[var(--text-dim)] mt-1">Google ★</p>
              </div>
              <div className="text-center p-4 glass-card rounded-xl">
                <p className="text-2xl font-semibold text-[var(--pink)]">500+</p>
                <p className="text-xs text-[var(--text-dim)] mt-1">Kunden</p>
              </div>
              <div className="text-center p-4 glass-card rounded-xl">
                <p className="text-2xl font-semibold text-[var(--pink)]">Marchtrenk</p>
                <p className="text-xs text-[var(--text-dim)] mt-1">Standort</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
