"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState(0);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (activeVideo === 0) {
      v1?.play().catch(() => {});
      if (v2) v2.currentTime = 0;
    } else {
      v2?.play().catch(() => {});
      if (v1) v1.currentTime = 0;
    }
  }, [activeVideo]);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Video 1 */}
      <video
        ref={video1Ref}
        src="/images/hero-video1.mp4"
        muted
        loop
        playsInline
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          activeVideo === 0 ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Video 2 */}
      <video
        ref={video2Ref}
        src="/images/hero-video2.mp4"
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          activeVideo === 1 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[var(--bg)]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-xs tracking-[8px] uppercase text-white/60 mb-4">
            SkinLove Tattoo & Piercing
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white mb-4"
            style={{ lineHeight: 1.1 }}
          >
            Dein Style.
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 tracking-wide">
            Tattoo · Piercing · PMU
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#contact"
              className="px-8 py-3.5 bg-[var(--pink)] text-white rounded-full font-medium tracking-wider text-sm hover:brightness-110 transition-all shadow-lg shadow-[var(--pink)]/20"
            >
              Termin buchen
            </a>
            <a
              href="#services"
              className="px-8 py-3.5 border border-white/20 text-white rounded-full font-medium tracking-wider text-sm hover:bg-white/5 transition-all"
            >
              Entdecken
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8"
        >
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
