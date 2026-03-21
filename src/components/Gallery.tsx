"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

const studioImages = [
  { src: "/images/gallery/gallery-1.jpg", alt: "Arbeit 1" },
  { src: "/images/gallery/gallery-2.jpg", alt: "Arbeit 2" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Arbeit 3" },
  { src: "/images/gallery/gallery-4.jpg", alt: "Arbeit 4" },
  { src: "/images/gallery/gallery-5.jpg", alt: "Arbeit 5" },
  { src: "/images/gallery/gallery-6.jpg", alt: "Arbeit 6" },
  { src: "/images/gallery/gallery-7.jpg", alt: "Arbeit 7" },
  { src: "/images/gallery/gallery-8.jpg", alt: "Arbeit 8" },
  { src: "/images/gallery/gallery-9.jpg", alt: "Arbeit 9" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Arbeit 10" },
  { src: "/images/gallery/gallery-11.jpg", alt: "Arbeit 11" },
  { src: "/images/gallery/gallery-12.jpg", alt: "Arbeit 12" },
  { src: "/images/gallery/gallery-13.jpg", alt: "Arbeit 13" },
  { src: "/images/gallery/gallery-14.jpg", alt: "Arbeit 14" },
  { src: "/images/gallery/gallery-15.jpg", alt: "Arbeit 15" },
  { src: "/images/gallery/gallery-16.jpg", alt: "Arbeit 16" },
  { src: "/images/gallery/gallery-17.jpg", alt: "Arbeit 17" },
  { src: "/images/gallery/gallery-18.jpg", alt: "Arbeit 18" },
  { src: "/images/gallery/gallery-19.jpg", alt: "Arbeit 19" },
  { src: "/images/gallery/gallery-20.jpg", alt: "Arbeit 20" },
  { src: "/images/gallery/gallery-21.jpg", alt: "Arbeit 21" },
  { src: "/images/gallery/gallery-22.jpg", alt: "Arbeit 22" },
  { src: "/images/gallery/gallery-23.jpg", alt: "Arbeit 23" },
  { src: "/gallery/arbeit1.png", alt: "Tattoo Arbeit 1" },
  { src: "/gallery/arbeit2.jpeg", alt: "Tattoo Arbeit 2" },
  { src: "/gallery/arbeit3.jpeg", alt: "Tattoo Arbeit 3" },
  { src: "/gallery/arbeit4.png", alt: "Tattoo Arbeit 4" },
  { src: "/gallery/arbeit6.png", alt: "Tattoo Arbeit 5" },
];

const guestImages = [
  { src: "/gallery/guests/guest1-work1.png", alt: "Nikola – Arbeit 1" },
  { src: "/gallery/guests/guest1-work2.png", alt: "Nikola – Arbeit 2" },
  { src: "/gallery/guests/guest1-work3.png", alt: "Nikola – Arbeit 3" },
  { src: "/gallery/guests/guest1-work4.png", alt: "Nikola – Arbeit 4" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [tab, setTab] = useState<"studio" | "guests">("studio");

  const images = tab === "studio" ? studioImages : guestImages;

  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextImage = useCallback(() => {
    setLightbox((p) => (p !== null ? (p + 1) % images.length : null));
  }, [images.length]);
  const prevImage = useCallback(() => {
    setLightbox((p) => (p !== null ? (p - 1 + images.length) % images.length : null));
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, nextImage, prevImage]);

  return (
    <section id="gallery" className="py-24 md:py-32" style={{ background: "#1a1a1e" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[6px] uppercase text-[var(--pink)] mb-4">
            Portfolio
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-semibold text-white mb-6">
            Galerie
          </h2>
          <div className="w-12 h-0.5 bg-[var(--pink)] mx-auto" />
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => { setTab("studio"); setLightbox(null); }}
            className={`px-6 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
              tab === "studio"
                ? "bg-[var(--pink)] text-white"
                : "bg-white/5 border border-white/5 text-[var(--text-dim)] hover:text-white"
            }`}
          >
            Meine Arbeiten
          </button>
          <button
            onClick={() => { setTab("guests"); setLightbox(null); }}
            className={`px-6 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
              tab === "guests"
                ? "bg-[var(--pink)] text-white"
                : "bg-white/5 border border-white/5 text-[var(--text-dim)] hover:text-white"
            }`}
          >
            Guest Artists
          </button>
        </div>

        {/* Guest Artist Info */}
        {tab === "guests" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 justify-center mb-8"
          >
            <img
              src="/gallery/guests/guest1-profile.jpeg"
              alt="Nikola"
              className="w-14 h-14 rounded-full object-cover border-2 border-[var(--pink)]"
            />
            <div>
              <p className="text-white font-medium">Nikola</p>
              <p className="text-sm text-[var(--text-dim)]">Gasttätowierer</p>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.5 }}
              onClick={() => openLightbox(i)}
              className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[10001] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition-colors"
            >
              ‹
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition-colors"
            >
              ›
            </button>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
            <div className="absolute bottom-4 text-white/60 text-sm">
              {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
