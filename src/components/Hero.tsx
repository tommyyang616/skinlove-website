"use client";
import { useEffect, useRef } from "react";

export default function Hero({ onBook }: { onBook: () => void }) {
  const vid1 = useRef<HTMLVideoElement>(null);
  const vid2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v1 = vid1.current;
    const v2 = vid2.current;
    if (!v1 || !v2) return;
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
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <video ref={vid1} className="hero-bg-vid active" autoPlay muted playsInline>
          <source src="/images/hero-video1.mp4" type="video/mp4" />
        </video>
        <video ref={vid2} className="hero-bg-vid" muted playsInline>
          <source src="/images/hero-video2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" />
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
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </span>
            <span className="ha-word ha-d5 ha-love">Love</span>
          </span>
          <span className="hero-h1-sub ha-line">
            <span className="ha-word ha-d6">Ihr professionelles Tattoo- und Piercing-Studio in Marchtrenk bei Wels</span>
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
