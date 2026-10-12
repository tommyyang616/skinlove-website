"use client";
import { useRef } from "react";
import { bewertungen, kurzName, BEWERTUNGS_HINWEIS } from "@/lib/bewertungen";

const GoogleSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
);

const GoogleSVG24 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
);

const reviews = bewertungen;

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector(".review-card") as HTMLElement;
    if (card) trackRef.current.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <span className="section-label reveal">Bewertungen</span>
        <h2 className="section-title reveal">Das sagen meine Kunden</h2>
        <div className="reviews-header reveal">
          <GoogleSVG24 />
          <span>4,9 Sterne · Google Bewertungen</span>
        </div>
        <div className="reviews-stars reveal">★★★★★</div>
        <div className="reviews-track-wrap reveal">
          <div className="reviews-track" ref={trackRef}>
            {reviews.map((r, idx) => (
              <div key={idx} className="review-card">
                <div className="review-top">
                  <div className="review-avatar">{r.i}</div>
                  <div><div className="review-name">{kurzName(r.n)}</div><div className="review-date">Google-Bewertung</div></div>
                </div>
                <div className="review-google"><GoogleSVG /><span className="review-stars">★★★★★</span></div>
                <div className="review-text">{r.t}</div>
              </div>
            ))}
          </div>
          <div className="reviews-nav">
            <button onClick={() => scroll(-1)} aria-label="Vorherige Bewertungen">‹</button>
            <button onClick={() => scroll(1)} aria-label="Nächste Bewertungen">›</button>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }} className="reveal">
          <a href="https://www.google.com/search?q=rezensionen+f%C3%BCr+skinlove+tattoo-piercing-permanent+make-up" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: "inline-flex" }}>Alle Bewertungen ansehen</a>
          <p style={{ marginTop: 16, fontSize: 13, color: "#888", lineHeight: 1.6 }}>{BEWERTUNGS_HINWEIS}</p>
        </div>
      </div>
    </section>
  );
}
