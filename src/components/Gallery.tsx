"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const IMGS = [
  "https://myhellocash.com/img/salon/website/522/94f9725f-f8a1-417f-9b9a-06bc84e7f3b4.jpg",
  "https://myhellocash.com/img/salon/website/522/9f603991-4c06-4b3c-9578-c4ca9ca049f8.jpg",
  "https://myhellocash.com/img/salon/website/522/0570c36e-30f5-4150-b9c5-7625ef22ad3c.jpg",
  "https://myhellocash.com/img/salon/website/522/8f550219-bd44-4d06-b28a-fbf0b59be21a.jpg",
  "https://myhellocash.com/img/salon/website/522/2ca08f21-9fae-49da-a811-0fc6b1966887.jpg",
  "https://myhellocash.com/img/salon/website/522/944a280f-9f38-4b3c-9a9a-2f5b8452dce9.jpg",
  "https://myhellocash.com/img/salon/website/522/8ac2592c-fd7e-423c-845f-706f2b8bdb8e.jpg",
  "https://myhellocash.com/img/salon/website/522/ee77c3aa-f34b-4572-b986-f31a48f4c537.jpg",
  "https://myhellocash.com/img/salon/website/522/ede7b670-4110-44fc-a579-bb75b52bd73c.jpg",
  "https://myhellocash.com/img/salon/website/522/e40f3a3e-6144-4636-aa2c-8d870996804f.jpg",
  "https://myhellocash.com/img/salon/website/522/351b4671-266e-4edf-92ab-1182aace74e4.jpg",
  "https://myhellocash.com/img/salon/website/522/605c5ae4-e823-4407-85cc-7d1af2718727.jpg",
  "https://myhellocash.com/img/salon/website/522/670c8f2c-fcf9-42b7-abbe-eb42e207181b.jpg",
  "https://myhellocash.com/img/salon/website/522/f9163ee0-0d6e-4b70-bbc8-c34da2f3fb9a.jpg",
  "https://myhellocash.com/img/salon/website/522/82b81e3a-f0f8-48ff-8ea4-d1944a729ca7.jpg",
  "https://myhellocash.com/img/salon/website/522/fc042737-abd2-4493-9ca9-0d53ac49cbc3.jpg",
  "https://myhellocash.com/img/salon/website/522/a07ee68d-dbb6-4b68-8360-37e608448efb.jpg",
  "https://myhellocash.com/img/salon/website/522/cbdbcd87-5adb-4158-a66c-e9a5307da901.jpg",
  "https://myhellocash.com/img/salon/website/522/ad48d676-e8d4-494a-bb06-da3c80c00297.jpg",
  "https://myhellocash.com/img/salon/website/522/d4223da4-7999-452f-883b-21eb5626f470.jpg",
  "https://myhellocash.com/img/salon/website/522/52fbbe47-34bd-4979-8e9a-fe947123787a.jpg",
  "https://myhellocash.com/img/salon/website/522/bd4fdc62-a25f-426e-8ff9-c056e616f9b4.jpg",
];

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);
  const touchX = useRef(0);

  const openLB = (i: number) => { setLbIdx(i); setLbOpen(true); };
  const closeLB = () => { setLbOpen(false); };
  const navLB = useCallback((dir: number) => {
    setLbIdx(p => {
      const next = p + dir;
      return Math.max(0, Math.min(IMGS.length - 1, next));
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = lbOpen ? "hidden" : "";

    const onKey = (e: KeyboardEvent) => {
      if (!lbOpen) return;
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowLeft") navLB(-1);
      if (e.key === "ArrowRight") navLB(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lbOpen, navLB]);

  const scroll = (dir: number) => {
    if (!trackRef.current) return;
    const img = trackRef.current.querySelector("img");
    if (img) trackRef.current.scrollBy({ left: dir * (img.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <>
      <section className="section" id="gallery">
        <div className="container">
          <span className="section-label reveal">Galerie</span>
          <h2 className="section-title reveal">Meine Arbeiten</h2>
          <div className="gallery-wrap reveal">
            <div className="gallery-track" ref={trackRef}>
              {IMGS.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="Tattoo"
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 70vw, 320px"
                  onClick={() => openLB(i)}
                  loading="lazy"
                />
              ))}
            </div>
            <div className="gallery-nav">
              <button onClick={() => scroll(-1)} aria-label="Vorherige Bilder">‹</button>
              <button onClick={() => scroll(1)} aria-label="Nächste Bilder">›</button>
            </div>
          </div>
          <div className="gallery-note reveal">
            Mehr auf{" "}
            <a href="https://www.instagram.com/skinlove_tattoopiercing/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div className={`lightbox${lbOpen ? " open" : ""}`} id="lightbox" onClick={(e) => { if (e.target === e.currentTarget) closeLB(); }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 50) navLB(dx < 0 ? 1 : -1); }}>
        <button className="lb-close" onClick={closeLB} aria-label="Galerie schließen">×</button>
        <button className="lb-nav prev" onClick={() => navLB(-1)} aria-label="Vorheriges Bild">‹</button>
        <Image className="lb-main" src={IMGS[lbIdx]} alt="Tattoo vergrößert" width={1200} height={1200} sizes="90vw" />
        <button className="lb-nav next" onClick={() => navLB(1)} aria-label="Nächstes Bild">›</button>
        <div className="lb-counter">{lbIdx + 1} / {IMGS.length}</div>
      </div>
    </>
  );
}
