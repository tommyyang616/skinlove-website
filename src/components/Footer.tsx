import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--pink)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="text-white font-semibold tracking-wider">SkinLove</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[var(--text-dim)]">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
            <a href="#workshop" className="hover:text-white transition-colors">
              Workshop
            </a>
            <a
              href="https://www.instagram.com/skinlove_tattoopiercing/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--pink)] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="text-center mt-8 text-xs text-[var(--text-dim)]">
          © 2026 SkinLove Tattoo &amp; Piercing · Inhaberin Eve Paule · Mitgründer Miro Urbanek
        </div>
      </div>
    </footer>
  );
}
