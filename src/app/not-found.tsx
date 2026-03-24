import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <h1 className="text-7xl font-bold font-outfit tracking-tight" style={{ color: "#BB3599" }}>
        404
      </h1>
      <p className="mt-4 text-xl text-gray-300 max-w-md">
        Diese Seite gibt es leider nicht — vielleicht ein alter Link oder ein Tippfehler.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block px-8 py-3 rounded-full text-white font-semibold transition-all hover:scale-105"
        style={{ background: "linear-gradient(135deg, #BB3599, #e855b5)" }}
      >
        Zurück zur Startseite
      </Link>
    </main>
  );
}
