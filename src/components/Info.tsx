"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Info() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="info" className="py-24 md:py-32" style={{ background: "#1e1e23" }}>
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Gut zu wissen
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Wichtige Infos
          </h2>
          <div className="w-12 h-0.5 bg-[var(--pink)] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Stornierung */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0, duration: 0.5 }}
            className="rounded-2xl border border-white/5 p-6 hover:border-[var(--pink)]/20 transition-colors"
            style={{ background: "var(--bg-card)" }}
          >
            <h3 className="text-white font-semibold mb-4">Stornierung</h3>
            <ul className="space-y-2 text-sm text-[var(--text-dim)] leading-relaxed">
              <li>Bis 48h vorher: kostenlose Verschiebung</li>
              <li>1 Tag vorher: 50 % + Anzahlung</li>
              <li>Am selben Tag / No-Show: voller Preis + Anzahlung</li>
            </ul>
          </motion.div>

          {/* Anzahlung */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-2xl border border-white/5 p-6 hover:border-[var(--pink)]/20 transition-colors"
            style={{ background: "var(--bg-card)" }}
          >
            <h3 className="text-white font-semibold mb-4">Anzahlung</h3>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-3">
              Bei Anfahrt über 1 Stunde + konkretem Motiv: Terminreservierung per Überweisung mit 150 € Anzahlung.
            </p>
            <p className="text-sm text-[var(--text-dim)]">
              IBAN: AT37 2032 6000 0123 9441<br />
              BIC: SPNAKT21XXX
            </p>
          </motion.div>

          {/* Nachstechen & Pflege */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl border border-white/5 p-6 hover:border-[var(--pink)]/20 transition-colors"
            style={{ background: "var(--bg-card)" }}
          >
            <h3 className="text-white font-semibold mb-4">Nachstechen & Pflege</h3>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed">
              Gratis Nachstechen innerhalb von 14 Tagen, wenn übermäßig Farbe ausbricht. Kostenlose Erstberatung jederzeit möglich.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
