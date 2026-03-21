"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState(0);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    video1Ref.current?.play().catch(() => {});
  }, []);

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
    } else {
      v2?.play().catch(() => {});
    }
  }, [activeVideo]);

  return (
    <>
      <style>{`
        .hero-bg-vid {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1.5s ease;
        }
        .hero-bg-vid.active { opacity: 1; }

        .ha-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(40px);
          animation: haSlideUp .7s cubic-bezier(.16,1,.3,1) forwards;
        }
        .ha-heart {
          display: inline-flex; align-items: center;
          opacity: 0;
          margin: 0 4px;
          transform: translateY(-60px) scale(0);
          animation: haHeartDrop .8s cubic-bezier(.34,1.56,.64,1) .6s forwards, haHeartPulse 1.4s ease 1.6s infinite;
        }
        .ha-d1 { animation-delay: .1s; }
        .ha-d2 { animation-delay: .25s; }
        .ha-d3 { animation-delay: .35s; }
        .ha-d4 { animation-delay: .5s; }
        .ha-d5 { animation-delay: .65s; }
        .ha-d6 { animation-delay: .8s; }
        .ha-actions {
          opacity: 0;
          animation: haFadeIn .6s ease 1.3s forwards;
          display: flex; gap: 16px; flex-wrap: wrap;
        }
        .hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2vw, 1.3rem);
          font-weight: 300;
          letter-spacing: 2px;
          text-transform: none;
          color: var(--text-dim);
          opacity: 0;
          animation: haFadeIn .7s ease .9s forwards;
          display: block;
          margin-top: 4px;
        }
        @keyframes haSlideUp { to { opacity:1; transform:translateY(0); } }
        @keyframes haHeartDrop { to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes haHeartPulse {
          0%,100% { transform:scale(1); }
          50% { transform:scale(1.2); }
        }
        @keyframes haFadeIn { to { opacity:1; } }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 18px 48px;
          background: var(--pink); color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; transition: all .3s;
          border: 1px solid var(--pink);
        }
        .btn-primary:hover { background: var(--pink-dim); transform: translateY(-2px); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 18px 48px;
          border: 1px solid rgba(255,255,255,.15);
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--text);
          transition: all .3s;
          background: rgba(255,255,255,.05); backdrop-filter: blur(12px);
        }
        .btn-outline:hover { border-color: var(--pink); color: var(--pink); }
      `}</style>

      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Videos */}
        <video
          ref={video1Ref}
          src="/images/hero-video1.mp4"
          muted loop playsInline autoPlay
          className={`hero-bg-vid${activeVideo === 0 ? " active" : ""}`}
        />
        <video
          ref={video2Ref}
          src="/images/hero-video2.mp4"
          muted loop playsInline
          className={`hero-bg-vid${activeVideo === 1 ? " active" : ""}`}
        />

        {/* Overlay — 135deg wie Original */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          background: "linear-gradient(135deg, rgba(10,10,10,.92) 0%, rgba(10,10,10,.6) 50%, rgba(10,10,10,.8) 100%)",
        }} />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "120px 0 80px",
            maxWidth: "760px",
            margin: "0 max(24px, calc((100vw - 1200px)/2 + 24px))",
          }}
        >
          {/* H1 — Outfit font, like original */}
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(3rem,8vw,6.5rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              color: "#fff",
              marginBottom: "32px",
              letterSpacing: "-1px",
            }}
          >
            {/* Line 1: Willkommen bei */}
            <span style={{ display: "block" }}>
              <span className="ha-word ha-d1">Willkommen</span>{" "}
              <span className="ha-word ha-d2">bei</span>
            </span>
            {/* Line 2: Skin♥Love */}
            <span style={{ display: "flex", alignItems: "center" }}>
              <span className="ha-word ha-d3" style={{ color: "var(--pink)" }}>Skin</span>
              <span className="ha-heart ha-d4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#bb3599" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
              <span className="ha-word ha-d5" style={{ color: "var(--pink)" }}>Love</span>
            </span>
            {/* Subline */}
            <span className="hero-sub">
              Ihr professionelles Tattoo- und Piercing-Studio in Marchtrenk bei Wels
            </span>
          </h1>

          {/* CTAs */}
          <div className="ha-actions">
            <a href="#contact" className="btn-primary">Termin vereinbaren</a>
            <a href="#services" className="btn-outline">Leistungen entdecken</a>
          </div>
        </div>
      </section>
    </>
  );
}
