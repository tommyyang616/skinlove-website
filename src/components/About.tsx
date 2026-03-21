"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const highlights = [
  { value: "500+", label: "Happy Clients" },
  { value: "100%", label: "Steril" },
  { value: "5★", label: "Google" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32" style={{ background: "#0e0e0e" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-white/5">
              <img
                src="/images/eve-about.png"
                alt="Eve Paule – SkinLove"
                className="w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[var(--pink)]/20 rounded-2xl" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
              Über mich
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
              Inhaberin & Künstlerin
            </h2>
            <div className="w-12 h-0.5 bg-[var(--pink)] mb-6" />

            <div className="space-y-4 text-[var(--text-dim)] text-sm leading-relaxed">
              <p>
                Meine Leidenschaft für Kunst und Ästhetik begleitet mich seit meiner Kindheit.
                Vom ersten Strich auf Papier über das Experimentieren mit verschiedensten
                Kunstformen hat sich mein Weg stetig weiterentwickelt.
              </p>
              <p>
                Vom ersten Strich auf Papier über das Experimentieren mit verschiedensten
                Kunstformen hat sich mein Weg stetig weiterentwickelt – bis hin zur Arbeit
                auf der schönsten Leinwand der Welt: der Haut.
              </p>
              <p>
                Bei SkinLove steht deine Vision im Mittelpunkt. Ich nehme mir Zeit für eine
                ausführliche Beratung, damit wir gemeinsam dein perfektes Tattoo, Piercing
                oder Permanent Make-up umsetzen.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="rounded-xl border border-white/5 p-4 text-center"
                  style={{ background: "var(--bg-card)" }}
                >
                  <p className="text-2xl font-bold text-[var(--pink)]">{h.value}</p>
                  <p className="text-xs text-[var(--text-dim)] mt-1">{h.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-white font-medium">Eve Paule</p>
              <p className="text-sm text-[var(--text-dim)]">
                Inhaberin · SkinLove Tattoo & Piercing
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
