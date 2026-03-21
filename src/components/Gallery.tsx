"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const GALLERY_IMGS = Array.from({ length: 23 }, (_, i) => `/gallery/gallery-${i + 1}.jpg`);

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);
  const touchStartX = useRef(0);

  const openLB = (i: number) => { setLbIdx(i); setLbOpen(true); };
  const closeLB = () => setLbOpen(false);
  const navLB = useCallback((dir: number) => {
    setLbIdx((prev) => (prev + dir + GALLERY_IMGS.length) % GALLERY_IMGS.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lbOpen) return;
      if (e.key === "ArrowRight") navLB(1);
      if (e.key === "ArrowLeft") navLB(-1);
      if (e.key === "Escape") closeLB();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbOpen, navLB]);

  const scroll = (dir: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 312, behavior: "smooth" });
  };

  return (
    <section id="gallery">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-eyebrow">Meine Arbeit</div>
          <h2 className="section-title">Galerie</h2>
          <div className="section-line" />
        </div>
      </div>

      <div className="gallery-track-wrap">
        <div className="gallery-track" ref={trackRef}>
          {GALLERY_IMGS.map((src, i) => (
            <div key={src} className="gallery-item" onClick={() => openLB(i)}>
              <img src={src} alt={`Galerie ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="gallery-nav">
        <button onClick={() => scroll(-1)} aria-label="Zurück">←</button>
        <button onClick={() => scroll(1)} aria-label="Vor">→</button>
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox${lbOpen ? " open" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeLB(); }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 50) navLB(dx < 0 ? 1 : -1);
        }}
      >
        <button className="lightbox-close" onClick={closeLB}>×</button>
        <button className="lightbox-nav lightbox-prev" onClick={() => navLB(-1)}>‹</button>
        <img className="lightbox-img" src={GALLERY_IMGS[lbIdx]} alt="" />
        <button className="lightbox-nav lightbox-next" onClick={() => navLB(1)}>›</button>
        <div className="lightbox-counter">{lbIdx + 1} / {GALLERY_IMGS.length}</div>
      </div>
    </section>
  );
}
