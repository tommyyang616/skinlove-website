"use client";
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <span className="logo-text" style={{ fontSize: 28 }}>
            <span className="logo-skin">Skin</span>
            <span className="logo-heart" style={{ color: "#bb3599" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#bb3599" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle" }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </span>
            <span className="logo-love">Love</span>
          </span>
        </div>
        <div className="footer-links">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
          <a href="#workshop">Workshop</a>
        </div>
        <p>© 2026 SkinLove Tattoo &amp; Piercing · Inhaberin Eve Paule · Mitgründer Miro Urbanek</p>
      </div>
    </footer>
  );
}
