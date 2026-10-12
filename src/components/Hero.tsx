"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import WalkInFriday from "./WalkInFriday";

const heroImages = [
  { src: "/images/hero-strip1-v2.webp", alt: "SkinLove Tattoo Studio", w: 1140, h: 1200 },
  { src: "/images/hero-strip2-v2.webp", alt: "SkinLove Studio Arbeit", w: 1140, h: 1200 },
  { src: "/images/hero-strip3-v2.webp", alt: "Eve Paule Tattoo", w: 969, h: 1200 },
  { src: "/images/hero-strip4-v2.webp", alt: "SkinLove Piercing", w: 1001, h: 1200 },
];

/** 1×1 transparentes GIF - Platzhalter, wenn keine <source> passt. */
const LEER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function HeroStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const raf = useRef(0);
  const speed = 0.5; // px per frame (~30px/s at 60fps)

  // Die Schleife liegt im Effekt statt in einem useCallback: Dort rief sich
  // `animate` selbst auf, bevor es deklariert war — der Linter hielt das an
  // und verhinderte damit jedes Gate. Der Ablauf ist unveraendert.
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const schritt = () => {
      offset.current += speed;
      // Once we've scrolled past the first set of 4 images, reset to 0
      const halfWidth = el.scrollWidth / 2;
      if (offset.current >= halfWidth) {
        offset.current -= halfWidth;
      }
      el.style.transform = `translateX(-${offset.current}px)`;
      raf.current = requestAnimationFrame(schritt);
    };

    raf.current = requestAnimationFrame(schritt);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  // Render 3x for plenty of buffer
  const loopImages = [...heroImages, ...heroImages, ...heroImages];

  // Der Streifen ist nur am Rechner sichtbar (ab 769 px). Vorladen deshalb
  // nur dort - vorher holte jedes Handy vier große Bilder (~470 KB), die es
  // nie anzeigte.
  heroImages.slice(0, 2).forEach((img) =>
    preload(img.src, { as: "image", media: "(min-width: 769px)", fetchPriority: "high" }),
  );

  return (
    <div className="hero-strip" ref={stripRef}>
      {loopImages.map((img, i) => (
        <div key={i} className="hero-strip-item" style={{ aspectRatio: `${img.w}/${img.h}` }}>
          {/* <picture> statt next/image: Am Handy greift die <source> nicht,
              dann lädt nur der 1-Pixel-Platzhalter. */}
          <picture>
            <source media="(min-width: 769px)" srcSet={img.src} />
            <img
              src={LEER}
              alt={i < heroImages.length ? img.alt : ""}
              aria-hidden={i >= heroImages.length}
              loading={i < 4 ? "eager" : "lazy"}
              fetchPriority={i < 4 ? "high" : "auto"}
              decoding="async"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </picture>
        </div>
      ))}
    </div>
  );
}

export default function Hero({ onBook }: { onBook: () => void }) {
  const vid1 = useRef<HTMLVideoElement>(null);
  const vid2 = useRef<HTMLVideoElement>(null);
  const [videosReady, setVideosReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    // Die Videos gibt es nur in der Handy-Ansicht. Am Rechner und bei
    // Datensparmodus oder langsamer Verbindung bleibt es beim Standbild -
    // die zwei Videos wiegen zusammen über 5 MB.
    if (!window.matchMedia("(max-width: 768px)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || (conn?.effectiveType && conn.effectiveType !== "4g")) return;
    const timer = setTimeout(() => setVideosReady(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!videosReady) return;
    const v1 = vid1.current;
    const v2 = vid2.current;
    if (!v1 || !v2) return;
    v1.play().catch(() => {});
    const swap = () => {
      if (v1.classList.contains("active")) {
        v1.classList.remove("active");
        v2.currentTime = 0;
        v2.play();
        v2.classList.add("active");
      } else {
        v2.classList.remove("active");
        v1.currentTime = 0;
        v1.play();
        v1.classList.add("active");
      }
    };
    v1.addEventListener("ended", swap);
    v2.addEventListener("ended", swap);
    return () => { v1.removeEventListener("ended", swap); v2.removeEventListener("ended", swap); };
  }, [videosReady]);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        {/* Desktop: scrolling strip */}
        <div className="hero-desktop-media">
          <HeroStrip />
        </div>
        {/* Mobile: video swap */}
        <div className="hero-mobile-media">
          <Image
            src="/images/hero-mobil.webp"
            alt="SkinLove Tattoo & Piercing Studio"
            priority
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              zIndex: 0,
              opacity: videosReady ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          />
          {videosReady && (
            <>
              <video ref={vid1} className="hero-bg-vid active" muted playsInline preload="metadata" poster="/images/hero-mobil.webp">
                <source src="/images/hero-video1.mp4" type="video/mp4" />
                <track kind="descriptions" label="Dekoratives Hintergrundvideo" />
              </video>
              <video ref={vid2} className="hero-bg-vid" muted playsInline preload="none" poster="/images/hero2-mobil.webp">
                <source src="/images/hero-video2.mp4" type="video/mp4" />
                <track kind="descriptions" label="Dekoratives Hintergrundvideo" />
              </video>
            </>
          )}
        </div>
      </div>
      <div className="hero-overlay" />
      <WalkInFriday onBook={onBook} />
      <div className="hero-content" style={{ margin: 0, paddingLeft: 48, paddingRight: 24, width: "100%" }}>
        <h1 className="hero-anim">
          <span className="ha-line">
            <span className="ha-word ha-d1">Willkommen</span>{" "}
            <span className="ha-word ha-d2">bei</span>
          </span>
          <span className="ha-line ha-brand">
            <span className="ha-word ha-d3 ha-skin">Skin</span>
            <span className="ha-heart ha-d4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#bb3599" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle" }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="ha-word ha-d5 ha-love">Love</span>
          </span>
          <span className="hero-h1-sub ha-line">
            <span className="ha-word ha-d6">Ihr Tattoo- und Piercingstudio in Marchtrenk – zwischen Wels und Linz</span>
          </span>
        </h1>
        <div className="hero-actions ha-actions">
          <a href="#" className="btn-primary" onClick={(e) => { e.preventDefault(); onBook(); }}>Termin vereinbaren</a>
          <a href="#services" className="btn-outline">Leistungen entdecken</a>
        </div>
      </div>
    </section>
  );
}
