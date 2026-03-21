import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg)] border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white mb-3">
              SkinLove
            </h3>
            <p className="text-[var(--text-dim)] text-sm leading-relaxed">
              Tattoo, Piercing &amp; Permanent Make-up in Marchtrenk.
              Professionell, hygienisch, mit Herz.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracking-[2px] uppercase text-white mb-4">
              Navigation
            </h4>
            <div className="space-y-2">
              {[
                { href: "#about", label: "Über mich" },
                { href: "#services", label: "Leistungen" },
                { href: "#gallery", label: "Galerie" },
                { href: "#pricing", label: "Preise" },
                { href: "#contact", label: "Kontakt" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs tracking-[2px] uppercase text-white mb-4">
              Rechtliches
            </h4>
            <div className="space-y-2">
              <Link
                href="/impressum"
                className="block text-sm text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="block text-sm text-[var(--text-dim)] hover:text-[var(--pink)] transition-colors"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-dimmer)] text-xs">
            © {new Date().getFullYear()} SkinLove Tattoo &amp; Piercing. Alle
            Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/skinlove_tattoopiercing/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-dimmer)] hover:text-[var(--pink)] transition-colors text-sm"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/436607835346"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-dimmer)] hover:text-[var(--pink)] transition-colors text-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
