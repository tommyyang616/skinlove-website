"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Hero({ onBook }: { onBook: () => void }) {
  const vid1 = useRef<HTMLVideoElement>(null);
  const vid2 = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [videosReady, setVideosReady] = useState(false);
  const [activeDesktopImage, setActiveDesktopImage] = useState<1 | 2>(1);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    setIsDesktop(window.matchMedia("(min-width: 769px)").matches);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 769px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const syncViewport = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", syncViewport);

    if (mediaQuery.matches || reducedMotion) {
      return () => {
        mediaQuery.removeEventListener("change", syncViewport);
      };
    }

    // Delay video loading until after the initial content is stable
    const timer = setTimeout(() => setVideosReady(true), 2500);
    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const interval = window.setInterval(() => {
      setActiveDesktopImage((current) => (current === 1 ? 2 : 1));
    }, 3500);

    return () => window.clearInterval(interval);
  }, [isDesktop]);

  useEffect(() => {
    if (!videosReady) return;
    const v1 = vid1.current;
    const v2 = vid2.current;
    if (!v1 || !v2) return;

    // Start playing video 1
    v1.play().catch(() => { });

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
        {isDesktop ? (
          <>
            <Image
              src="/images/hero.jpg"
              alt="SkinLove Tattoo Studio"
              priority
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
                zIndex: 0,
                opacity: activeDesktopImage === 1 ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            />
            <Image
              src="/images/hero2.jpg"
              alt="SkinLove Tattoo Studio bei der Arbeit"
              priority
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
                zIndex: 0,
                opacity: activeDesktopImage === 2 ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            />
          </>
        ) : (
          <Image
            src="/images/hero.jpg"
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
        )}
        {!isDesktop && videosReady && (
          <>
            <video ref={vid1} className="hero-bg-vid active" muted playsInline preload="auto">
              <source src="/images/hero-video1.mp4" type="video/mp4" />
            </video>
            <video ref={vid2} className="hero-bg-vid" muted playsInline preload="none">
              <source src="/images/hero-video2.mp4" type="video/mp4" />
            </video>
          </>
        )}
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
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
