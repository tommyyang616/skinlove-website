"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "6+", label: "Jahre Erfahrung" },
  { value: "OÖ", label: "Linz · Wels · Region" },
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
            className="relative max-w-sm mx-auto lg:mx-0"
          >
            <div className="overflow-hidden border border-white/5">
              <img
                src="/images/eve-about.png"
                alt="Eve Paule – SkinLove"
                className="w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://myhellocash.com/img/salon/website/522/ede7b670-4110-44fc-a579-bb75b52bd73c.jpg";
                }}
              />
            </div>
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
              Eve Paule
            </h2>
            <div className="w-12 h-0.5 bg-[var(--pink)] mb-6" />

            <div className="space-y-4 text-[var(--text-dim)] text-sm leading-relaxed">
              <p>
                Ich bin Eve, Gründerin von SkinLove. Vom Einzelhandel und der Krankenpflege
                zur Körperkunst — heute lebe ich meinen Traum als selbstständige Tätowiererin,
                Piercerin und Permanent Make-up-Artistin.
              </p>
              <p>
                Ob Fine-Line, Mandala, Black &amp; Grey oder Watercolor — jedes Tattoo ist für mich
                eine Herzensangelegenheit. Ich nehme mir Zeit für deine Geschichte und gestalte
                ein Motiv, das zu dir passt.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="border border-white/5 p-5 text-center"
                  style={{ background: "var(--bg-card)" }}
                >
                  <p
                    className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold"
                    style={{ color: "var(--pink)" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs text-[var(--text-dim)] mt-1 tracking-wide">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
