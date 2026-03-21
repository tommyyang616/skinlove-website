"use client";
export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo">
          Skin<span>Love</span>
        </div>
        <div className="footer-links">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
          <a href="https://instagram.com/skinlove.tattoo.piercing" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://wa.me/436607835346" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} SkinLove Tattoo &amp; Piercing · Inhaberin Eve Paule
        </div>
      </div>
    </footer>
  );
}
