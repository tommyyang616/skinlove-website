"use client";
import { useCallback, useEffect, useState } from "react";

const api = (path: string, opts?: RequestInit) =>
  fetch(path, { ...opts, headers: { "Content-Type": "application/json", ...opts?.headers } }).then(r => r.json());

type Course = { id: string; title: string; category: string | null; description: string | null; startDate: string; timeText: string | null; price: any; deposit: any; maxSpots: number; includes: string | null; imageUrl: string | null; isActive: boolean; createdAt: string; enrollments?: any[]; };
type Booking = { id: string; courseId: string | null; name: string; email: string; phone: string | null; status: string; paid: boolean; createdAt: string; course?: { title: string; price?: any; deposit?: any }; };
type ContactReq = { id: string; name: string; email: string; phone: string | null; service: string | null; message: string | null; status: string; createdAt: string; };
type Tab = "dashboard" | "anfragen" | "workshops" | "buchungen" | "settings";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [courses, setCourses] = useState<Course[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactReq[]>([]);

  useEffect(() => { if (sessionStorage.getItem("sl_admin") === "1") setLoggedIn(true); }, []);

  const login = async () => {
    const res = await fetch("/api/admin-auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: user, password: pw }) });
    if (res.ok) { setLoggedIn(true); sessionStorage.setItem("sl_admin", "1"); }
    else setErr("Falscher Benutzername oder Passwort");
  };
  const logout = () => { sessionStorage.removeItem("sl_admin"); setLoggedIn(false); };

  const load = useCallback(async () => {
    const [c, b, r] = await Promise.all([
      api("/api/admin/courses"),
      api("/api/admin/bookings"),
      api("/api/admin/contacts"),
    ]);
    if (Array.isArray(c)) setCourses(c);
    if (Array.isArray(b)) setBookings(b);
    if (Array.isArray(r)) setContacts(r);
  }, []);

  useEffect(() => { if (loggedIn) load(); }, [loggedIn, load]);

  if (!loggedIn) return (
    <div style={{ minHeight: "100vh", background: "#09090b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',system-ui,sans-serif" }}>
      <div style={{ width: 380, background: "#111113", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "48px 36px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💎</div>
          <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0 }}>SkinLove Admin</h2>
          <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>Dashboard Login</p>
        </div>
        <input type="text" placeholder="Benutzername" value={user} onChange={e => { setUser(e.target.value); setErr(""); }} style={{ ...inp, marginBottom: 10 }} autoComplete="username" />
        <input type="password" placeholder="Passwort" value={pw} onChange={e => { setPw(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && login()} style={{ ...inp, marginBottom: 20 }} autoComplete="current-password" />
        <button onClick={login} style={{ width: "100%", padding: "12px 0", background: "#bb3599", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Anmelden</button>
        {err && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 12, textAlign: "center" }}>{err}</p>}
      </div>
    </div>
  );

  const pendingContacts = contacts.filter(c => c.status === "PENDING").length;
  const activeCourses = courses.filter(c => c.isActive).length;
  const totalBookings = bookings.length;
  const paidBookings = bookings.filter(b => b.paid).length;
  const revenue = bookings.filter(b => b.paid).reduce((s, b) => {
    const c = courses.find(c2 => c2.id === b.courseId);
    return s + toNum(c?.deposit);
  }, 0);

  const tabs: { key: Tab; label: string; icon: string; badge?: number }[] = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "anfragen", label: "Anfragen", icon: "📩", badge: pendingContacts },
    { key: "workshops", label: "Workshops", icon: "🎓" },
    { key: "buchungen", label: "Buchungen", icon: "📅" },
    { key: "settings", label: "Einstellungen", icon: "⚙️" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", color: "#e0e0e0", fontFamily: "'Inter',system-ui,sans-serif" }}>
      <header style={{ padding: "12px 24px", background: "#111113", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>💎</span>
          <h1 style={{ fontSize: 16, color: "#fff", margin: 0, fontWeight: 700 }}>Skin<span style={{ color: "#bb3599" }}>Love</span></h1>
        </div>
        <nav style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: "8px 16px", fontSize: 12, fontWeight: 500, fontFamily: "inherit",
              border: "none", borderRadius: 6, cursor: "pointer",
              background: tab === t.key ? "rgba(187,53,153,.15)" : "transparent",
              color: tab === t.key ? "#bb3599" : "#888",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>{t.label}
              {t.badge ? <span style={{ padding: "1px 7px", background: "#ef4444", borderRadius: 10, fontSize: 10, fontWeight: 700, color: "#fff" }}>{t.badge}</span> : null}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.08)", margin: "0 8px" }} />
          <button onClick={logout} style={{ padding: "8px 16px", fontSize: 12, border: "none", borderRadius: 6, background: "transparent", color: "#666", cursor: "pointer", fontFamily: "inherit" }}>Logout</button>
        </nav>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 64px" }}>
        {tab === "dashboard" && <Dashboard courses={courses} contacts={contacts} bookings={bookings} activeCourses={activeCourses} totalBookings={totalBookings} paidBookings={paidBookings} revenue={revenue} pendingContacts={pendingContacts} />}
        {tab === "anfragen" && <Anfragen contacts={contacts} onUpdate={load} />}
        {tab === "workshops" && <Workshops courses={courses} onUpdate={load} />}
        {tab === "buchungen" && <Buchungen buchungen={bookings} courses={courses} onUpdate={load} />}
        {tab === "settings" && <Settings />}
      </div>
    </div>
  );
}

/* ─── SHARED ─── */
const inp: React.CSSProperties = { width: "100%", padding: "11px 14px", background: "#1a1a1e", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const card: React.CSSProperties = { background: "#111113", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: 24 };
const toNum = (v: any) => typeof v === "number" ? v : Number(v) || 0;
const fmtDate = (d: string) => new Date(d).toLocaleDateString("de-AT", { day: "numeric", month: "short", year: "numeric" });
const fmtDateTime = (d: string) => new Date(d).toLocaleDateString("de-AT", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const tbl: React.CSSProperties = { width: "100%", fontSize: 13, borderCollapse: "collapse" };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 14px", fontSize: 11, color: "#666", letterSpacing: 1, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,.06)" };
const td: React.CSSProperties = { padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,.04)", verticalAlign: "top" };
const btnP: React.CSSProperties = { padding: "8px 18px", background: "#bb3599", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" };
const btnD: React.CSSProperties = { padding: "8px 18px", background: "rgba(239,68,68,.12)", color: "#f87171", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" };
const btnG: React.CSSProperties = { padding: "8px 18px", background: "transparent", color: "#ccc", border: "1px solid rgba(255,255,255,.08)", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "inherit" };
const lbl: React.CSSProperties = { fontSize: 11, color: "#888", display: "block", marginBottom: 4, fontWeight: 500 };

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const bg: Record<string, string> = { green: "rgba(34,197,94,.12)", yellow: "rgba(234,179,8,.12)", red: "rgba(239,68,68,.12)", pink: "rgba(187,53,153,.12)" };
  const fg: Record<string, string> = { green: "#4ade80", yellow: "#facc15", red: "#f87171", pink: "#bb3599" };
  return <span style={{ padding: "3px 10px", fontSize: 11, fontWeight: 600, background: bg[color] || bg.yellow, color: fg[color] || fg.yellow, borderRadius: 4, whiteSpace: "nowrap" }}>{children}</span>;
}

function Empty({ text, icon }: { text: string; icon?: string }) {
  return <div style={{ textAlign: "center", padding: "40px 0" }}>{icon && <div style={{ fontSize: 36, marginBottom: 8, opacity: 0.5 }}>{icon}</div>}<p style={{ color: "#555", fontSize: 13 }}>{text}</p></div>;
}

/* ─── DASHBOARD ─── */
function Dashboard({ courses, contacts, bookings, activeCourses, totalBookings, paidBookings, revenue, pendingContacts }: any) {
  const stats = [
    { num: pendingContacts, label: "Offene Anfragen", icon: "📩", color: pendingContacts > 0 ? "#ef4444" : "#4ade80" },
    { num: activeCourses, label: "Aktive Workshops", icon: "🎓", color: "#bb3599" },
    { num: `${paidBookings}/${totalBookings}`, label: "Buchungen (bezahlt)", icon: "📅", color: "#60a5fa" },
    { num: `€${revenue}`, label: "Anzahlungen erhalten", icon: "💰", color: "#4ade80" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...card, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
            <div><div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.num}</div><div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{s.label}</div></div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={card}>
          <h3 style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 16 }}>📩 Letzte Anfragen</h3>
          {contacts.length === 0 ? <Empty text="Keine Anfragen" /> : contacts.slice(0, 5).map((a: any) => (
            <div key={a.id} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                <span style={{ color: "#fff", fontWeight: 500 }}>{a.name}</span>
                <Badge color={a.status === "PENDING" ? "yellow" : a.status === "CONFIRMED" ? "green" : "red"}>{a.status === "PENDING" ? "Offen" : a.status === "CONFIRMED" ? "Bestätigt" : "Abgelehnt"}</Badge>
              </div>
              <div style={{ color: "#888", fontSize: 11, marginTop: 2 }}>{a.service || "Allgemein"} · {fmtDateTime(a.createdAt)}</div>
              {a.message && <div style={{ color: "#aaa", fontSize: 11, marginTop: 4, fontStyle: "italic" }}>&ldquo;{a.message.substring(0, 60)}{a.message.length > 60 ? "…" : ""}&rdquo;</div>}
            </div>
          ))}
        </div>
        <div style={card}>
          <h3 style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 16 }}>📅 Letzte Buchungen</h3>
          {bookings.length === 0 ? <Empty text="Keine Buchungen" /> : bookings.slice(0, 5).map((b: any) => (
            <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 12 }}>
              <span style={{ color: "#fff", fontWeight: 500 }}>{b.name}</span>
              <span style={{ color: "#888" }}>{b.course?.title || "—"}</span>
              {b.paid ? <Badge color="green">Bezahlt</Badge> : <Badge color="yellow">Offen</Badge>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ANFRAGEN (Termin-Anfragen für Tattoo/Piercing/etc.) ─── */
function Anfragen({ contacts, onUpdate }: { contacts: ContactReq[]; onUpdate: () => void }) {
  const update = async (id: string, status: string) => {
    await api("/api/admin/contacts", { method: "PATCH", body: JSON.stringify({ id, status }) });
    onUpdate();
  };
  const pending = contacts.filter(c => c.status === "PENDING");
  const handled = contacts.filter(c => c.status !== "PENDING");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h3 style={{ fontSize: 17, color: "#fff", fontWeight: 600, margin: 0 }}>📩 Terminanfragen</h3>

      {contacts.length === 0 && <Empty text="Noch keine Terminanfragen eingegangen" icon="📩" />}

      {pending.length > 0 && (
        <div>
          <p style={{ fontSize: 12, color: "#bb3599", fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>🔔 {pending.length} offene Anfrage{pending.length > 1 ? "n" : ""}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pending.map(a => (
              <div key={a.id} style={card}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>{a.name}</div>
                    <div style={{ display: "flex", gap: 12, marginTop: 4, fontSize: 12, color: "#888", flexWrap: "wrap" }}>
                      <a href={`mailto:${a.email}`} style={{ color: "#bb3599", textDecoration: "none" }}>📧 {a.email}</a>
                      {a.phone && <span>📱 {a.phone}</span>}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Badge color="yellow">Offen</Badge>
                    <div style={{ color: "#666", fontSize: 11, marginTop: 4 }}>{fmtDateTime(a.createdAt)}</div>
                  </div>
                </div>
                {/* Service */}
                {a.service && (
                  <div style={{ marginBottom: 10 }}>
                    <span style={{ fontSize: 11, color: "#888" }}>Gewünschter Service:</span>
                    <span style={{ marginLeft: 8, color: "#fff", fontSize: 13, fontWeight: 500 }}>{a.service}</span>
                  </div>
                )}
                {/* Message */}
                {a.message && (
                  <div style={{ padding: "14px 16px", background: "rgba(255,255,255,.03)", borderRadius: 8, borderLeft: "3px solid #bb3599", marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Nachricht vom Kunden:</div>
                    <div style={{ color: "#ddd", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{a.message}</div>
                  </div>
                )}
                {!a.message && (
                  <div style={{ padding: "10px 0", marginBottom: 10, fontSize: 12, color: "#666", fontStyle: "italic" }}>Keine Nachricht hinterlassen</div>
                )}
                {/* Actions */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button style={btnP} onClick={() => update(a.id, "CONFIRMED")}>✓ Termin bestätigen</button>
                  <button style={btnD} onClick={() => { if (confirm("Anfrage ablehnen?")) update(a.id, "CANCELLED"); }}>✕ Ablehnen</button>
                  <a href={`https://wa.me/${a.phone?.replace(/\D/g, "") || "436607835346"}?text=Hallo ${a.name}! Danke für deine Anfrage bei SkinLove. `} target="_blank" rel="noopener" style={{ ...btnG, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>💬 WhatsApp</a>
                  <a href={`mailto:${a.email}?subject=Deine Anfrage bei SkinLove&body=Hallo ${a.name},%0A%0ADanke für deine Anfrage`} style={{ ...btnG, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>📧 E-Mail</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {handled.length > 0 && (
        <div>
          <p style={{ fontSize: 12, color: "#666", fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Bearbeitet ({handled.length})</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {handled.map(a => (
              <div key={a.id} style={{ ...card, padding: 16, opacity: 0.7 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ color: "#fff", fontWeight: 500, fontSize: 13 }}>{a.name}</span>
                    <span style={{ color: "#888", fontSize: 12, marginLeft: 12 }}>{a.service || "Allgemein"}</span>
                    {a.message && <span style={{ color: "#666", fontSize: 11, marginLeft: 12, fontStyle: "italic" }}>&ldquo;{a.message.substring(0, 50)}{a.message.length > 50 ? "…" : ""}&rdquo;</span>}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ color: "#666", fontSize: 11 }}>{fmtDate(a.createdAt)}</span>
                    <Badge color={a.status === "CONFIRMED" ? "green" : "red"}>{a.status === "CONFIRMED" ? "Bestätigt" : "Abgelehnt"}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── WORKSHOPS ─── */
function Workshops({ courses, onUpdate }: { courses: Course[]; onUpdate: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const empty = { title: "", category: "Tattoo", description: "", start_date: "", time_text: "", price: 0, deposit: 0, max_spots: 6, includes: "" };
  const [form, setForm] = useState(empty);

  const openEdit = (c: Course) => {
    setForm({ title: c.title, category: c.category || "Tattoo", description: c.description || "", start_date: c.startDate?.split("T")[0] || "", time_text: c.timeText || "", price: toNum(c.price), deposit: toNum(c.deposit), max_spots: c.maxSpots, includes: c.includes || "" });
    setEditId(c.id); setShowForm(true);
  };

  const save = async () => {
    if (!form.title.trim()) return;
    if (editId) {
      await api("/api/admin/courses", { method: "PATCH", body: JSON.stringify({ id: editId, ...form }) });
    } else {
      await api("/api/admin/courses", { method: "POST", body: JSON.stringify(form) });
    }
    setShowForm(false); setEditId(null); setForm(empty); onUpdate();
  };

  const del = async (id: string) => {
    if (!confirm("Workshop wirklich löschen?")) return;
    await api("/api/admin/courses", { method: "DELETE", body: JSON.stringify({ id }) });
    onUpdate();
  };

  const toggle = async (c: Course) => {
    await api("/api/admin/courses", { method: "PATCH", body: JSON.stringify({ id: c.id, active: !c.isActive }) });
    onUpdate();
  };

  const cats = ["Tattoo", "Piercing", "Lash & Brow", "Permanent Make-up", "Sonstiges"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: 17, color: "#fff", fontWeight: 600, margin: 0 }}>🎓 Workshops ({courses.length})</h3>
        <button style={btnP} onClick={() => { setEditId(null); setForm(empty); setShowForm(true); }}>+ Neuer Workshop</button>
      </div>

      {courses.length === 0 && !showForm && (
        <div style={{ ...card, textAlign: "center", padding: "48px 24px", border: "1px dashed rgba(187,53,153,.3)" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 4 }}>Noch keine Workshops angelegt</p>
          <p style={{ color: "#666", fontSize: 12, marginBottom: 20 }}>Workshops die du hier erstellst erscheinen automatisch auf der Website</p>
          <button style={btnP} onClick={() => { setEditId(null); setForm(empty); setShowForm(true); }}>Ersten Workshop erstellen</button>
        </div>
      )}

      {showForm && (
        <div style={card}>
          <h4 style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginBottom: 20 }}>{editId ? "Workshop bearbeiten" : "Neuen Workshop anlegen"}</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><span style={lbl}>Workshopname *</span><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inp} placeholder="z.B. Piercing Grundkurs" /></div>
            <div><span style={lbl}>Kategorie</span><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inp}>{cats.map(c => <option key={c}>{c}</option>)}</select></div>
          </div>
          <div style={{ marginBottom: 12 }}><span style={lbl}>Beschreibung</span><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inp, minHeight: 80, resize: "vertical" }} placeholder="Was lernen die Teilnehmer?" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><span style={lbl}>Startdatum</span><input type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} style={inp} /></div>
            <div><span style={lbl}>Uhrzeit / Tage</span><input value={form.time_text} onChange={e => setForm({ ...form, time_text: e.target.value })} placeholder="z.B. Mi 17:00-19:00 · Do 17:00-20:00" style={inp} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div><span style={lbl}>Gesamtpreis (€)</span><input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} style={inp} /></div>
            <div><span style={lbl}>Anzahlung (€)</span><input type="number" value={form.deposit} onChange={e => setForm({ ...form, deposit: +e.target.value })} style={inp} /></div>
            <div><span style={lbl}>Max. Plätze</span><input type="number" value={form.max_spots} onChange={e => setForm({ ...form, max_spots: +e.target.value })} style={inp} /></div>
          </div>
          <div style={{ marginBottom: 20 }}><span style={lbl}>Inklusive</span><input value={form.includes} onChange={e => setForm({ ...form, includes: e.target.value })} placeholder="Material, Zertifikat, Verpflegung..." style={inp} /></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={btnP} onClick={save}>💾 Speichern</button>
            <button style={btnG} onClick={() => { setShowForm(false); setEditId(null); }}>Abbrechen</button>
          </div>
        </div>
      )}

      {courses.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {courses.map(c => {
            const enrolled = c.enrollments?.length || 0;
            const spotsLeft = c.maxSpots - enrolled;
            return (
              <div key={c.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>{c.title}</span>
                      {c.isActive ? <Badge color="green">Aktiv</Badge> : <Badge color="red">Inaktiv</Badge>}
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#888", flexWrap: "wrap" }}>
                      {c.category && <span>📂 {c.category}</span>}
                      {c.startDate && <span>📅 {fmtDate(c.startDate)}</span>}
                      {c.timeText && <span>🕐 {c.timeText}</span>}
                      <span>💰 €{toNum(c.price)}{toNum(c.deposit) > 0 ? ` (Anzahlung €${toNum(c.deposit)})` : ""}</span>
                      <span>👥 {enrolled}/{c.maxSpots}{spotsLeft <= 2 && spotsLeft > 0 ? " ⚠️ Fast voll" : spotsLeft <= 0 ? " 🔴 Voll" : ""}</span>
                    </div>
                    {c.description && <p style={{ color: "#777", fontSize: 12, marginTop: 10, lineHeight: 1.6 }}>{c.description}</p>}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button style={btnG} onClick={() => openEdit(c)}>✏️</button>
                    <button style={btnG} onClick={() => toggle(c)}>{c.isActive ? "⏸️" : "▶️"}</button>
                    <button style={btnD} onClick={() => del(c.id)}>🗑️</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── BUCHUNGEN ─── */
function Buchungen({ buchungen, courses, onUpdate }: { buchungen: Booking[]; courses: Course[]; onUpdate: () => void }) {
  const update = async (id: string, data: Record<string, unknown>) => {
    await api("/api/admin/bookings", { method: "PATCH", body: JSON.stringify({ id, ...data }) });
    onUpdate();
  };
  const exportCSV = () => {
    const header = "Name,E-Mail,Telefon,Workshop,Bezahlt,Status,Datum\n";
    const rows = buchungen.map(b => `"${b.name}","${b.email}","${b.phone || ""}","${b.course?.title || ""}","${b.paid ? "Ja" : "Nein"}","${b.status}","${fmtDate(b.createdAt)}"`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `buchungen-${new Date().toISOString().split("T")[0]}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: 17, color: "#fff", fontWeight: 600, margin: 0 }}>📅 Workshop-Buchungen ({buchungen.length})</h3>
        {buchungen.length > 0 && <button style={btnG} onClick={exportCSV}>📥 CSV Export</button>}
      </div>
      <p style={{ fontSize: 12, color: "#888", margin: 0, lineHeight: 1.6, background: "rgba(187,53,153,.06)", padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(187,53,153,.12)" }}>
        💡 Teilnehmer melden sich über die Website an. Sobald die <strong style={{ color: "#fff" }}>Anzahlung</strong> bei dir eingeht, markiere sie als &quot;Bezahlt&quot; — damit ist der Platz fix reserviert.
      </p>
      {buchungen.length === 0 ? <Empty text="Noch keine Workshop-Buchungen" icon="📅" /> : (
        <div style={{ ...card, overflowX: "auto" }}>
          <table style={tbl}>
            <thead><tr><th style={th}>Name</th><th style={th}>Kontakt</th><th style={th}>Workshop</th><th style={th}>Angemeldet</th><th style={th}>Anzahlung</th><th style={th}>Aktionen</th></tr></thead>
            <tbody>{buchungen.map(b => (
              <tr key={b.id}>
                <td style={{ ...td, color: "#fff", fontWeight: 500 }}>{b.name}</td>
                <td style={td}><a href={`mailto:${b.email}`} style={{ color: "#bb3599", textDecoration: "none", fontSize: 12 }}>{b.email}</a>{b.phone && b.phone !== b.email && <div style={{ color: "#888", fontSize: 11 }}>{b.phone}</div>}</td>
                <td style={td}>{b.course?.title || "—"}</td>
                <td style={td}>{fmtDate(b.createdAt)}</td>
                <td style={td}>{b.paid ? <Badge color="green">✓ Bezahlt</Badge> : <Badge color="yellow">Ausstehend</Badge>}</td>
                <td style={td}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {!b.paid && b.status !== "CANCELLED" && <button style={btnP} onClick={() => update(b.id, { paid: true, status: "CONFIRMED" })}>💰 Anzahlung erhalten</button>}
                    {b.status !== "CANCELLED" && <button style={btnD} onClick={() => { if (confirm("Buchung stornieren?")) update(b.id, { status: "CANCELLED", paid: false }); }}>✕</button>}
                    {b.status === "CANCELLED" && <Badge color="red">Storniert</Badge>}
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── SETTINGS ─── */
function Settings() {
  const [hours, setHours] = useState([
    { day: "Montag", from: "09:00", to: "18:00", closed: false },
    { day: "Dienstag", from: "09:00", to: "18:00", closed: false },
    { day: "Mittwoch", from: "09:00", to: "18:00", closed: false },
    { day: "Donnerstag", from: "09:00", to: "18:00", closed: false },
    { day: "Freitag", from: "09:00", to: "18:00", closed: false },
    { day: "Samstag", from: "10:00", to: "17:00", closed: false },
    { day: "Sonntag", from: "", to: "", closed: true },
  ]);
  const [saved, setSaved] = useState(false);
  const updateH = (i: number, f: string, v: string | boolean) => { setHours(p => p.map((h, j) => j === i ? { ...h, [f]: v } : h)); setSaved(false); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={card}>
        <h3 style={{ fontSize: 15, color: "#fff", fontWeight: 600, marginBottom: 20 }}>🕐 Öffnungszeiten</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {hours.map((h, i) => (
            <div key={h.day} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
              <span style={{ color: "#ccc", fontSize: 13, width: 110, flexShrink: 0 }}>{h.day}</span>
              <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 12, color: "#888", width: 100 }}>
                <input type="checkbox" checked={h.closed} onChange={e => updateH(i, "closed", e.target.checked)} style={{ accentColor: "#bb3599" }} /> Geschlossen
              </label>
              {!h.closed && (<><input type="time" value={h.from} onChange={e => updateH(i, "from", e.target.value)} style={{ ...inp, width: 120, padding: "6px 10px", fontSize: 12 }} /><span style={{ color: "#666" }}>–</span><input type="time" value={h.to} onChange={e => updateH(i, "to", e.target.value)} style={{ ...inp, width: 120, padding: "6px 10px", fontSize: 12 }} /></>)}
              {h.closed && <span style={{ color: "#ef4444", fontSize: 12 }}>Geschlossen</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <button style={btnP} onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>💾 Speichern</button>
          {saved && <span style={{ color: "#4ade80", fontSize: 12 }}>✓ Gespeichert</span>}
        </div>
        <p style={{ fontSize: 11, color: "#bb3599", marginTop: 12, fontWeight: 500 }}>⚠️ Termine nur nach vorheriger Vereinbarung!</p>
      </div>

      <div style={card}>
        <h3 style={{ fontSize: 15, color: "#fff", fontWeight: 600, marginBottom: 16 }}>📋 Studio-Info</h3>
        <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
          {[["Studio","SkinLove Tattoo & Piercing"],["Inhaberin","Eve Paule"],["Adresse","Linzer Straße 35, 1. OG, 4614 Marchtrenk"],["Telefon","+43 660 7835346"],["E-Mail","eve@skinlove-tattoo-piercing.at"]].map(([k,v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
              <span style={{ color: "#888" }}>{k}</span><span style={{ color: "#fff" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <h3 style={{ fontSize: 15, color: "#fff", fontWeight: 600, marginBottom: 16 }}>🔗 Schnelllinks</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { href: "https://skinlove-website-one.vercel.app", icon: "🌐", text: "Website" },
            { href: "https://wa.me/436607835346", icon: "💬", text: "WhatsApp" },
            { href: "https://www.instagram.com/skinlove_tattoopiercing/", icon: "📸", text: "Instagram" },
            { href: "https://www.facebook.com/skinlovetattoopiercing", icon: "👍", text: "Facebook" },
          ].map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 8, textDecoration: "none", color: "#ccc", fontSize: 13, display: "flex", alignItems: "center", gap: 8, padding: 14 }}>{l.icon} {l.text}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
