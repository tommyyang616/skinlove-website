"use client";
import { useCallback, useEffect, useState } from "react";

const api = (path: string, opts?: RequestInit) =>
  fetch(path, { ...opts, headers: { "Content-Type": "application/json", ...opts?.headers } }).then(r => r.json());

type Course = { id: string; title: string; category: string | null; description: string | null; startDate: string; timeText: string | null; price: any; deposit: any; maxSpots: number; includes: string | null; imageUrl: string | null; isActive: boolean; createdAt: string; enrollments?: any[]; };
type Booking = { id: string; courseId: string | null; name: string; email: string; phone: string | null; status: string; paid: boolean; createdAt: string; course?: { title: string }; };
type ContactReq = { id: string; name: string; email: string; service: string | null; message: string | null; status: string; createdAt: string; };
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

  /* ─── LOGIN ─── */
  if (!loggedIn) return (
    <div style={{ minHeight: "100vh", background: "#09090b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',system-ui,sans-serif" }}>
      <div style={{ width: 380, background: "#111113", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "48px 36px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💎</div>
          <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0 }}>SkinLove Admin</h2>
          <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>Dashboard Login</p>
        </div>
        <input type="text" placeholder="Benutzername" value={user}
          onChange={e => { setUser(e.target.value); setErr(""); }}
          style={{ ...inputStyle, marginBottom: 10 }}
          autoComplete="username"
        />
        <input type="password" placeholder="Passwort" value={pw}
          onChange={e => { setPw(e.target.value); setErr(""); }}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ ...inputStyle, marginBottom: 20 }}
          autoComplete="current-password"
        />
        <button onClick={login} style={{ width: "100%", padding: "12px 0", background: "#bb3599", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Anmelden</button>
        {err && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 12, textAlign: "center" }}>{err}</p>}
      </div>
    </div>
  );

  const pendingContacts = contacts.filter(c => c.status === "PENDING").length;
  const activeCourses = courses.filter(c => c.isActive).length;
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === "CONFIRMED" || b.status === "confirmed").length;
  const revenue = bookings.filter(b => b.status !== "CANCELLED").reduce((s, b) => {
    const c = courses.find(c2 => c2.id === b.courseId);
    return s + toNum(c?.price);
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
      {/* Header */}
      <header style={{ padding: "12px 24px", background: "#111113", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
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
              transition: "all .15s",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              {t.label}
              {t.badge ? <span style={{ padding: "1px 7px", background: "#ef4444", borderRadius: 10, fontSize: 10, fontWeight: 700, color: "#fff" }}>{t.badge}</span> : null}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.08)", margin: "0 8px" }} />
          <button onClick={logout} style={{ padding: "8px 16px", fontSize: 12, border: "none", borderRadius: 6, background: "transparent", color: "#666", cursor: "pointer", fontFamily: "inherit" }}>Logout</button>
        </nav>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>
        {tab === "dashboard" && <Dashboard courses={courses} contacts={contacts} bookings={bookings} activeCourses={activeCourses} totalBookings={totalBookings} confirmedBookings={confirmedBookings} revenue={revenue} pendingContacts={pendingContacts} />}
        {tab === "anfragen" && <Anfragen contacts={contacts} onUpdate={load} />}
        {tab === "workshops" && <Workshops courses={courses} onUpdate={load} />}
        {tab === "buchungen" && <Buchungen buchungen={bookings} courses={courses} onUpdate={load} />}
        {tab === "settings" && <Settings />}
      </div>
    </div>
  );
}

/* ─── STYLES ─── */
const inputStyle: React.CSSProperties = { width: "100%", padding: "11px 14px", background: "#1a1a1e", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const cardStyle: React.CSSProperties = { background: "#111113", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: 24 };
const toNum = (v: any) => typeof v === "number" ? v : Number(v) || 0;
const fmtDate = (d: string) => new Date(d).toLocaleDateString("de-AT", { day: "numeric", month: "short", year: "numeric" });
const tbl: React.CSSProperties = { width: "100%", fontSize: 13, borderCollapse: "collapse" };
const th: React.CSSProperties = { textAlign: "left", padding: "10px 14px", fontSize: 11, color: "#666", letterSpacing: 1, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,.06)" };
const td: React.CSSProperties = { padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,.04)" };
const btnPrimary: React.CSSProperties = { padding: "8px 18px", background: "#bb3599", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" };
const btnDanger: React.CSSProperties = { padding: "8px 18px", background: "rgba(239,68,68,.12)", color: "#f87171", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" };
const btnGhost: React.CSSProperties = { padding: "8px 18px", background: "transparent", color: "#ccc", border: "1px solid rgba(255,255,255,.08)", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "inherit" };
const inp: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "#1a1a1e", border: "1px solid rgba(255,255,255,.08)", borderRadius: 6, color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const bg: Record<string, string> = { green: "rgba(34,197,94,.12)", yellow: "rgba(234,179,8,.12)", red: "rgba(239,68,68,.12)", blue: "rgba(59,130,246,.12)", pink: "rgba(187,53,153,.12)" };
  const fg: Record<string, string> = { green: "#4ade80", yellow: "#facc15", red: "#f87171", blue: "#60a5fa", pink: "#bb3599" };
  return <span style={{ padding: "3px 10px", fontSize: 11, fontWeight: 600, background: bg[color], color: fg[color], borderRadius: 4 }}>{children}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const m: Record<string, { c: string; l: string }> = {
    CONFIRMED: { c: "green", l: "Bestätigt" }, confirmed: { c: "green", l: "Bestätigt" },
    PENDING: { c: "yellow", l: "Ausstehend" }, pending: { c: "yellow", l: "Ausstehend" },
    CANCELLED: { c: "red", l: "Storniert" }, cancelled: { c: "red", l: "Storniert" },
  };
  const v = m[status] || { c: "yellow", l: status };
  return <Badge color={v.c}>{v.l}</Badge>;
}

/* ─── DASHBOARD ─── */
function Dashboard({ courses, contacts, bookings, activeCourses, totalBookings, confirmedBookings, revenue, pendingContacts }: any) {
  const stats = [
    { num: pendingContacts, label: "Neue Anfragen", icon: "📩", color: pendingContacts > 0 ? "#ef4444" : "#4ade80" },
    { num: activeCourses, label: "Aktive Workshops", icon: "🎓", color: "#bb3599" },
    { num: `${confirmedBookings}/${totalBookings}`, label: "Buchungen (bestätigt)", icon: "📅", color: "#60a5fa" },
    { num: `€${revenue}`, label: "Erwarteter Umsatz", icon: "💰", color: "#4ade80" },
  ];
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>📅 Letzte Buchungen</h3>
          {bookings.length === 0 ? <Empty text="Keine Buchungen" /> : bookings.slice(0, 5).map((b: any) => (
            <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 12 }}>
              <span style={{ color: "#fff", fontWeight: 500 }}>{b.name}</span>
              <span style={{ color: "#888" }}>{b.course?.title || "—"}</span>
              <StatusBadge status={b.status} />
            </div>
          ))}
        </div>
        <div style={cardStyle}>
          <h3 style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>📩 Letzte Anfragen</h3>
          {contacts.length === 0 ? <Empty text="Keine Anfragen" /> : contacts.slice(0, 5).map((a: any) => (
            <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 12 }}>
              <span style={{ color: "#fff", fontWeight: 500 }}>{a.name}</span>
              <span style={{ color: "#888" }}>{a.service || "—"}</span>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Empty({ text }: { text: string }) {
  return <p style={{ color: "#555", fontSize: 13, textAlign: "center", padding: "28px 0" }}>{text}</p>;
}

/* ─── ANFRAGEN ─── */
function Anfragen({ contacts, onUpdate }: { contacts: ContactReq[]; onUpdate: () => void }) {
  const update = async (id: string, status: string) => {
    await api("/api/admin/contacts", { method: "PATCH", body: JSON.stringify({ id, status }) });
    onUpdate();
  };
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, color: "#fff", fontWeight: 600, margin: 0 }}>Terminanfragen ({contacts.length})</h3>
      </div>
      {contacts.length === 0 ? <Empty text="Keine Terminanfragen vorhanden" /> : (
        <div style={{ overflowX: "auto" }}>
          <table style={tbl}>
            <thead><tr><th style={th}>Name</th><th style={th}>E-Mail</th><th style={th}>Service</th><th style={th}>Nachricht</th><th style={th}>Datum</th><th style={th}>Status</th><th style={th}>Aktionen</th></tr></thead>
            <tbody>{contacts.map(a => (
              <tr key={a.id}>
                <td style={{ ...td, color: "#fff", fontWeight: 500 }}>{a.name}</td>
                <td style={td}><a href={`mailto:${a.email}`} style={{ color: "#bb3599", textDecoration: "none" }}>{a.email}</a></td>
                <td style={td}>{a.service || "—"}</td>
                <td style={{ ...td, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.message || "—"}</td>
                <td style={td}>{fmtDate(a.createdAt)}</td>
                <td style={td}><StatusBadge status={a.status} /></td>
                <td style={{ ...td }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {a.status === "PENDING" && <button style={btnPrimary} onClick={() => update(a.id, "CONFIRMED")}>✓ Bestätigen</button>}
                    {a.status !== "CANCELLED" && <button style={btnDanger} onClick={() => { if (confirm("Ablehnen?")) update(a.id, "CANCELLED"); }}>✕</button>}
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
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, color: "#fff", fontWeight: 600, margin: 0 }}>Workshops ({courses.length})</h3>
        <button style={btnPrimary} onClick={() => { setEditId(null); setForm(empty); setShowForm(true); }}>+ Neuer Workshop</button>
      </div>

      {showForm && (
        <div style={{ ...cardStyle, marginBottom: 20 }}>
          <h4 style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginBottom: 20 }}>{editId ? "Workshop bearbeiten" : "Neuen Workshop anlegen"}</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={labelStyle}>Workshopname *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inp} placeholder="z.B. Piercing Grundkurs" /></div>
            <div><label style={labelStyle}>Kategorie</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inp}>{cats.map(c => <option key={c}>{c}</option>)}</select></div>
          </div>
          <div style={{ marginBottom: 12 }}><label style={labelStyle}>Beschreibung</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inp, minHeight: 80, resize: "vertical" }} placeholder="Was lernen die Teilnehmer?" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={labelStyle}>Startdatum</label><input type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} style={inp} /></div>
            <div><label style={labelStyle}>Uhrzeit</label><input value={form.time_text} onChange={e => setForm({ ...form, time_text: e.target.value })} placeholder="z.B. Sa 10:00-16:00" style={inp} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div><label style={labelStyle}>Preis (€)</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} style={inp} /></div>
            <div><label style={labelStyle}>Anzahlung (€)</label><input type="number" value={form.deposit} onChange={e => setForm({ ...form, deposit: +e.target.value })} style={inp} /></div>
            <div><label style={labelStyle}>Max. Plätze</label><input type="number" value={form.max_spots} onChange={e => setForm({ ...form, max_spots: +e.target.value })} style={inp} /></div>
          </div>
          <div style={{ marginBottom: 20 }}><label style={labelStyle}>Inklusive</label><input value={form.includes} onChange={e => setForm({ ...form, includes: e.target.value })} placeholder="Material, Zertifikat, Verpflegung..." style={inp} /></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={btnPrimary} onClick={save}>💾 Speichern</button>
            <button style={btnGhost} onClick={() => { setShowForm(false); setEditId(null); }}>Abbrechen</button>
          </div>
        </div>
      )}

      {courses.length === 0 && !showForm ? (
        <div style={{ ...cardStyle, textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 16 }}>Noch keine Workshops angelegt</p>
          <button style={btnPrimary} onClick={() => { setEditId(null); setForm(empty); setShowForm(true); }}>Ersten Workshop erstellen</button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {courses.map(c => (
            <div key={c.id} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>{c.title}</span>
                  {c.isActive ? <Badge color="green">Aktiv</Badge> : <Badge color="yellow">Inaktiv</Badge>}
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#888" }}>
                  {c.category && <span>📂 {c.category}</span>}
                  {c.startDate && <span>📅 {fmtDate(c.startDate)}</span>}
                  {c.timeText && <span>🕐 {c.timeText}</span>}
                  <span>💰 €{toNum(c.price)}</span>
                  <span>👥 {c.maxSpots} Plätze</span>
                </div>
                {c.description && <p style={{ color: "#777", fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>{c.description.substring(0, 120)}{c.description.length > 120 ? "..." : ""}</p>}
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button style={btnGhost} onClick={() => openEdit(c)}>✏️ Bearbeiten</button>
                <button style={btnGhost} onClick={() => toggle(c)}>{c.isActive ? "Deaktivieren" : "Aktivieren"}</button>
                <button style={btnDanger} onClick={() => del(c.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const labelStyle: React.CSSProperties = { fontSize: 11, color: "#888", display: "block", marginBottom: 4, fontWeight: 500 };

/* ─── BUCHUNGEN ─── */
function Buchungen({ buchungen, courses, onUpdate }: { buchungen: Booking[]; courses: Course[]; onUpdate: () => void }) {
  const update = async (id: string, data: Record<string, unknown>) => {
    await api("/api/admin/bookings", { method: "PATCH", body: JSON.stringify({ id, ...data }) });
    onUpdate();
  };

  const exportCSV = () => {
    const header = "Name,E-Mail,Telefon,Kurs,Status,Bezahlt,Datum\n";
    const rows = buchungen.map(b =>
      `"${b.name}","${b.email}","${b.phone || ""}","${b.course?.title || ""}","${b.status}","${b.paid ? "Ja" : "Nein"}","${fmtDate(b.createdAt)}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `buchungen-${new Date().toISOString().split("T")[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, color: "#fff", fontWeight: 600, margin: 0 }}>Workshop-Buchungen ({buchungen.length})</h3>
        {buchungen.length > 0 && <button style={btnGhost} onClick={exportCSV}>📥 CSV Export</button>}
      </div>
      {buchungen.length === 0 ? <Empty text="Keine Buchungen vorhanden" /> : (
        <div style={{ overflowX: "auto" }}>
          <table style={tbl}>
            <thead><tr><th style={th}>Name</th><th style={th}>E-Mail</th><th style={th}>Workshop</th><th style={th}>Datum</th><th style={th}>Bezahlt</th><th style={th}>Status</th><th style={th}>Aktionen</th></tr></thead>
            <tbody>{buchungen.map(b => (
              <tr key={b.id}>
                <td style={{ ...td, color: "#fff", fontWeight: 500 }}>{b.name}</td>
                <td style={td}><a href={`mailto:${b.email}`} style={{ color: "#bb3599", textDecoration: "none" }}>{b.email}</a></td>
                <td style={td}>{b.course?.title || "—"}</td>
                <td style={td}>{fmtDate(b.createdAt)}</td>
                <td style={td}>{b.paid ? <Badge color="green">Ja</Badge> : <Badge color="yellow">Nein</Badge>}</td>
                <td style={td}><StatusBadge status={b.status} /></td>
                <td style={td}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {b.status === "PENDING" && <button style={btnPrimary} onClick={() => update(b.id, { status: "CONFIRMED", paid: true })}>✓ Bestätigen</button>}
                    {!b.paid && b.status !== "CANCELLED" && <button style={btnGhost} onClick={() => update(b.id, { paid: true })}>💰 Bezahlt</button>}
                    {b.status !== "CANCELLED" && <button style={btnDanger} onClick={() => { if (confirm("Stornieren?")) update(b.id, { status: "CANCELLED" }); }}>✕</button>}
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
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={cardStyle}>
        <h3 style={{ fontSize: 15, color: "#fff", fontWeight: 600, marginBottom: 16 }}>⚙️ Studio-Einstellungen</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><label style={labelStyle}>Studioname</label><input defaultValue="SkinLove Tattoo & Piercing" style={inp} /></div>
          <div><label style={labelStyle}>Inhaberin</label><input defaultValue="Eve Paule" style={inp} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><label style={labelStyle}>Telefon</label><input defaultValue="+43 660 7835346" style={inp} /></div>
          <div><label style={labelStyle}>E-Mail</label><input defaultValue="eve@skinlove-tattoo-piercing.at" style={inp} /></div>
        </div>
        <div style={{ marginBottom: 12 }}><label style={labelStyle}>Adresse</label><input defaultValue="Linzer Straße 35, 1. OG, 4614 Marchtrenk" style={inp} /></div>
        <p style={{ fontSize: 11, color: "#555", marginTop: 8 }}>💡 Einstellungen werden über das Master Dashboard verwaltet. Hier nur zur Ansicht.</p>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontSize: 15, color: "#fff", fontWeight: 600, marginBottom: 16 }}>🕐 Öffnungszeiten</h3>
        <div style={{ display: "grid", gap: 8 }}>
          {[
            ["Montag – Freitag", "09:00 – 18:00"],
            ["Samstag", "10:00 – 17:00"],
            ["Sonntag", "Geschlossen"],
          ].map(([day, time]) => (
            <div key={day} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 13 }}>
              <span style={{ color: "#ccc" }}>{day}</span>
              <span style={{ color: time === "Geschlossen" ? "#ef4444" : "#4ade80", fontWeight: 500 }}>{time}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#bb3599", marginTop: 12, fontWeight: 500 }}>⚠️ Termine nur nach vorheriger Vereinbarung!</p>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontSize: 15, color: "#fff", fontWeight: 600, marginBottom: 16 }}>🔗 Schnelllinks</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <a href="https://skinlove-website-one.vercel.app" target="_blank" rel="noopener" style={{ ...cardStyle, background: "rgba(255,255,255,.03)", textDecoration: "none", color: "#ccc", fontSize: 13, display: "flex", alignItems: "center", gap: 8, padding: 14 }}>🌐 Website öffnen</a>
          <a href="https://wa.me/436607835346" target="_blank" rel="noopener" style={{ ...cardStyle, background: "rgba(255,255,255,.03)", textDecoration: "none", color: "#ccc", fontSize: 13, display: "flex", alignItems: "center", gap: 8, padding: 14 }}>💬 WhatsApp</a>
          <a href="https://www.instagram.com/skinlove_tattoopiercing/" target="_blank" rel="noopener" style={{ ...cardStyle, background: "rgba(255,255,255,.03)", textDecoration: "none", color: "#ccc", fontSize: 13, display: "flex", alignItems: "center", gap: 8, padding: 14 }}>📸 Instagram</a>
          <a href="https://vercel.com/tommyyang616-1011s-projects/skinlove-website" target="_blank" rel="noopener" style={{ ...cardStyle, background: "rgba(255,255,255,.03)", textDecoration: "none", color: "#ccc", fontSize: 13, display: "flex", alignItems: "center", gap: 8, padding: 14 }}>▲ Vercel Dashboard</a>
        </div>
      </div>
    </div>
  );
}
