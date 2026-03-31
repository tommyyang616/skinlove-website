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
  const lbTrackRef = useRef<HTMLDivElement>(null);

  const openLB = (i: number) => { setLbIdx(i); setLbOpen(true); };
  const closeLB = () => { setLbOpen(false); };
  const navLB = useCallback((dir: number) => {
    setLbIdx(p => {
      const next = p + dir;
      return Math.max(0, Math.min(IMGS.length - 1, next));
    });
  }, []);

  // Scroll to current image when index changes or lightbox opens
  useEffect(() => {
    if (!lbOpen || !lbTrackRef.current) return;
    const el = lbTrackRef.current.children[lbIdx] as HTMLElement;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [lbIdx, lbOpen]);

  // Sync index from native scroll
  useEffect(() => {
    const track = lbTrackRef.current;
    if (!track || !lbOpen) return;
    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const scrollLeft = track.scrollLeft;
        const w = track.clientWidth;
        const idx = Math.round(scrollLeft / w);
        if (idx >= 0 && idx < IMGS.length) setLbIdx(idx);
      }, 100);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); clearTimeout(timeout); };
  }, [lbOpen]);

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
          <div className="gallery-note reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <span style={{ marginBottom: 4 }}>Mehr auf</span>
            <a href="https://www.instagram.com/skinlove_tattoopiercing/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <defs>
                  <linearGradient id="igGradGallery" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#feda75" />
                    <stop offset="35%" stopColor="#fa7e1e" />
                    <stop offset="65%" stopColor="#d62976" />
                    <stop offset="100%" stopColor="#4f5bd5" />
                  </linearGradient>
                </defs>
                <path fill="url(#igGradGallery)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
            <a href="https://www.facebook.com/skinlovetattoopiercing" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              Facebook
            </a>
            <a href="https://www.tiktok.com/@eveskinlovetattoo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#25F4EE" d="M16.708 0h3.418a6.862 6.862 0 004.218 4.573v3.48a10.27 10.27 0 01-4.26-1.163v5.292A8.182 8.182 0 1112.192 4h3.322v3.48a4.7 4.7 0 103.308 4.502V0h-2.114z" />
                <path fill="#FE2C55" d="M15.402 0h3.418a6.862 6.862 0 004.218 4.573v3.48a10.27 10.27 0 01-4.26-1.163v5.292A8.182 8.182 0 1110.886 4h3.322v3.48a4.7 4.7 0 103.308 4.502V0h-2.114z" />
                <path fill="#fff" d="M16.055.653h3.418a6.862 6.862 0 004.218 4.573v3.48a10.27 10.27 0 01-4.26-1.163v5.292a8.182 8.182 0 11-7.892-8.182h3.322v3.48a4.7 4.7 0 103.308 4.502V.653h-2.114z" />
              </svg>
              TikTok
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div className={`lightbox${lbOpen ? " open" : ""}`} id="lightbox" onClick={(e) => { if (e.target === e.currentTarget) closeLB(); }}>
        <button className="lb-close" onClick={closeLB} aria-label="Galerie schließen">×</button>
        <button className="lb-nav prev" onClick={() => navLB(-1)} aria-label="Vorheriges Bild">‹</button>
        <div className="lb-track" ref={lbTrackRef}>
          {IMGS.map((src, i) => (
            <div key={i} className="lb-slide">
              <Image src={src} alt="Tattoo vergrößert" width={1200} height={1200} sizes="90vw" />
            </div>
          ))}
        </div>
        <button className="lb-nav next" onClick={() => navLB(1)} aria-label="Nächstes Bild">›</button>
        <div className="lb-counter">{lbIdx + 1} / {IMGS.length}</div>
      </div>
    </>
  );
}
