"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const GUEST_WORK = [
  "/gallery/arbeit1.jpg",
  "/gallery/arbeit2.jpg",
  "/gallery/arbeit3.jpg",
  "/gallery/arbeit4.jpg",
  "/gallery/arbeit5.jpg",
  "/gallery/arbeit6.jpg",
];

const guest = {
  name: "Nikola",
  style: "Fine Line · Blackwork",
  bio: "Nikola ist regelmäßiger Guest Artist bei SkinLove. Mit seiner ruhigen Hand und seinem Gespür für filigrane Linien schafft er Tattoos, die sprechen. Termine auf Anfrage.",
  img: "/gallery/guest1-profile.jpg",
};

export default function GuestArtists() {
  const [guestOpen, setGuestOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [workIdx, setWorkIdx] = useState(0);
  const touchStartX = useRef(0);

  const navWork = useCallback((dir: number) => {
    setWorkIdx((prev) => (prev + dir + GUEST_WORK.length) % GUEST_WORK.length);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (workOpen) {
        if (e.key === "ArrowRight") navWork(1);
        if (e.key === "ArrowLeft") navWork(-1);
        if (e.key === "Escape") setWorkOpen(false);
      } else if (guestOpen && e.key === "Escape") {
        setGuestOpen(false);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [guestOpen, workOpen, navWork]);

  return (
    <>
      <div className="guest-section">
        <div className="section-inner">
          <div className="guest-header">
            <h3>Guest Artists</h3>
            <p>Regelmäßige Gastkünstler bei SkinLove</p>
          </div>
          <div className="guest-cards">
            <div className="guest-card" onClick={() => setGuestOpen(true)}>
              <img src={guest.img} alt={guest.name} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <h4>{guest.name}</h4>
              <p>{guest.style}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Profile Modal */}
      <div className={`guest-lb${guestOpen ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setGuestOpen(false); }}>
        <div className="guest-lb-inner">
          <button className="guest-lb-close" onClick={() => setGuestOpen(false)}>×</button>
          <img className="guest-lb-img" src={guest.img} alt={guest.name} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div className="guest-lb-name">{guest.name}</div>
          <div className="guest-lb-style">{guest.style}</div>
          <div className="guest-lb-bio">{guest.bio}</div>
          <button className="guest-lb-btn" onClick={() => { setGuestOpen(false); setWorkIdx(0); setWorkOpen(true); }}>
            Arbeiten ansehen
          </button>
        </div>
      </div>

      {/* Guest Work Lightbox */}
      <div
        className={`guest-work-lb${workOpen ? " open" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) setWorkOpen(false); }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 50) navWork(dx < 0 ? 1 : -1);
        }}
      >
        <button className="lightbox-close" onClick={() => setWorkOpen(false)}>×</button>
        <button className="lightbox-nav lightbox-prev" onClick={() => navWork(-1)}>‹</button>
        <img className="lightbox-img" src={GUEST_WORK[workIdx]} alt="" />
        <button className="lightbox-nav lightbox-next" onClick={() => navWork(1)}>›</button>
        <div className="lightbox-counter">{workIdx + 1} / {GUEST_WORK.length}</div>
      </div>
    </>
  );
}
