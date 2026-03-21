import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 text-center" style={{ background: "var(--pink)" }}>
      <div className="flex justify-center gap-6 mb-4">
        <Link
          href="/impressum"
          className="text-xs tracking-[1px] uppercase text-white/80 hover:text-white transition-colors"
        >
          Impressum
        </Link>
        <Link
          href="/datenschutz"
          className="text-xs tracking-[1px] uppercase text-white/80 hover:text-white transition-colors"
        >
          Datenschutz
        </Link>
      </div>
      <p className="text-xs text-white/70 tracking-[1px]">
        © 2026 SkinLove Tattoo &amp; Piercing · Inhaberin Eve Paule
      </p>
    </footer>
  );
}
