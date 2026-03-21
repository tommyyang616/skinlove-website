"use client";
import { useEffect, useRef, useState } from "react";

export default function Hero({ onBook }: { onBook: () => void }) {
  const vid1Ref = useRef<HTMLVideoElement>(null);
  const vid2Ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const v1 = vid1Ref.current;
    const v2 = vid2Ref.current;
    if (!v1 || !v2) return;
    v1.classList.add("active");

    const interval = setInterval(() => {
      setActive((prev) => {
        const next = prev === 0 ? 1 : 0;
        if (next === 0) {
          v1.classList.add("active");
          v2.classList.remove("active");
          v2.currentTime = 0;
          v2.pause();
          v1.play().catch(() => {});
        } else {
          v2.classList.add("active");
          v1.classList.remove("active");
          v1.currentTime = 0;
          v1.pause();
          v2.play().catch(() => {});
        }
        return next;
      });
    }, 8000);

    v1.play().catch(() => {});
    return () => clearInterval(interval);
  }, []);

  const switchTo = (idx: number) => {
    const v1 = vid1Ref.current;
    const v2 = vid2Ref.current;
    if (!v1 || !v2) return;
    setActive(idx);
    if (idx === 0) {
      v1.classList.add("active"); v2.classList.remove("active");
      v1.currentTime = 0; v1.play().catch(() => {});
    } else {
      v2.classList.add("active"); v1.classList.remove("active");
      v2.currentTime = 0; v2.play().catch(() => {});
    }
  };

  return (
    <section id="hero">
      <div className="hero-video-wrap">
        <video ref={vid1Ref} src="/hero-video1.mp4" muted loop playsInline />
        <video ref={vid2Ref} src="/hero-video2.mp4" muted loop playsInline />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-eyebrow">Marchtrenk · OÖ</div>
        <h1 className="hero-title">
          Tattoo, Piercing<br />&amp; <span>Lash Lifting</span>
        </h1>
        <div className="hero-subtitle">by Eve Paule</div>
        <div className="hero-btns">
          <button className="btn-primary" onClick={onBook}>Termin vereinbaren</button>
          <a href="#services" className="btn-outline">Leistungen</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
      <div className="hero-dots">
        <div className={`hero-dot${active === 0 ? " active" : ""}`} onClick={() => switchTo(0)} />
        <div className={`hero-dot${active === 1 ? " active" : ""}`} onClick={() => switchTo(1)} />
      </div>
    </section>
  );
}
