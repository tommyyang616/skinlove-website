"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const galleryImages = [
  { src: "/gallery/arbeit1.png", alt: "Tattoo Arbeit 1" },
  { src: "/gallery/arbeit2.jpeg", alt: "Tattoo Arbeit 2" },
  { src: "/gallery/arbeit3.jpeg", alt: "Tattoo Arbeit 3" },
  { src: "/gallery/arbeit4.png", alt: "Tattoo Arbeit 4" },
  { src: "/gallery/arbeit6.png", alt: "Tattoo Arbeit 5" },
];

const guestImages = [
  { src: "/gallery/guests/guest1-profile.jpeg", alt: "Guest Artist Profil" },
  { src: "/gallery/guests/guest1-work1.png", alt: "Guest Artist Arbeit 1" },
  { src: "/gallery/guests/guest1-work2.png", alt: "Guest Artist Arbeit 2" },
  { src: "/gallery/guests/guest1-work3.png", alt: "Guest Artist Arbeit 3" },
  { src: "/gallery/guests/guest1-work4.png", alt: "Guest Artist Arbeit 4" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [tab, setTab] = useState<"studio" | "guests">("studio");

  const images = tab === "studio" ? galleryImages : guestImages;

  const openLightbox = useCallback((index: number) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextImage = useCallback(() => {
    setLightbox((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);
  const prevImage = useCallback(() => {
    setLightbox((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  return (
    <section id="gallery" className="section-3 py-24 md:py-32">
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
          <div className="pink-line" />
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setTab("studio")}
            className={`px-6 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
              tab === "studio"
                ? "bg-[var(--pink)] text-white"
                : "glass-card text-[var(--text-dim)] hover:text-white"
            }`}
          >
            Meine Arbeiten
          </button>
          <button
            onClick={() => setTab("guests")}
            className={`px-6 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
              tab === "guests"
                ? "bg-[var(--pink)] text-white"
                : "glass-card text-[var(--text-dim)] hover:text-white"
            }`}
          >
            Guest Artists
          </button>
        </div>

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
              transition={{ delay: i * 0.05, duration: 0.5 }}
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full glass text-white text-2xl hover:bg-white/10 transition-colors"
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
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full glass text-white text-2xl hover:bg-white/10 transition-colors"
            >
              ›
            </button>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full glass text-white text-xl hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
