export default function MaintenancePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit',sans-serif", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🔧</div>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Wartungsarbeiten</h1>
        <p style={{ color: "#999", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          Wir arbeiten gerade an Verbesserungen für dich.<br />
          Bitte versuche es in Kürze erneut.
        </p>
        <a href="https://wa.me/436607835346" style={{ display: "inline-block", padding: "12px 32px", background: "#bb3599", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          📱 Kontakt via WhatsApp
        </a>
        <p style={{ color: "#555", fontSize: 12, marginTop: 24 }}>SkinLove Tattoo & Piercing · Marchtrenk</p>
      </div>
    </div>
  );
}
