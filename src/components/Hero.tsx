"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [videoIndex, setVideoIndex] = useState(0);
  const videos = ["/images/hero-video1.mp4", "/images/hero-video2.mp4"];

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0">
        {videos.map((src, i) => (
          <video
            key={src}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
              i === videoIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.6)] via-[rgba(10,10,10,0.3)] to-[var(--bg)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-6"
        >
          Tattoo · Piercing · Permanent Make-up
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-tight mb-8"
        >
          SkinLove
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-[var(--text-dim)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Dein Studio für Tattoo, Piercing &amp; Permanent Make-up in Marchtrenk.
          Professionell, hygienisch, mit Herz.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => window.dispatchEvent(new Event("open-booking"))}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--pink)] text-white text-sm tracking-[2px] uppercase rounded-full hover:bg-[var(--pink-dim)] transition-all duration-300 hover:scale-105"
          >
            📩 Termin anfragen
          </button>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white text-sm tracking-[2px] uppercase rounded-full hover:border-[var(--pink)] hover:text-[var(--pink)] transition-all duration-300"
          >
            Leistungen ansehen
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-[var(--pink)] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
