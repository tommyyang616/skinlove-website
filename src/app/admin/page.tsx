"use client";
import { useCallback, useEffect, useState } from "react";

const SB_URL = "https://ebcjdkjrzwjxxwgtzunh.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY2pka2pyendqeHh3Z3R6dW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDY4OTksImV4cCI6MjA4ODQyMjg5OX0.eOeWfKVQ8ZSVvsc0zcZtFQAFtx05Oe6AAukgqRS0zeY";

const sb = (path: string, opts?: RequestInit) =>
  fetch(`${SB_URL}/rest/v1/${path}`, {
    ...opts,
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json", Prefer: "return=representation", ...opts?.headers },
  }).then(r => r.json());

type Course = { id: string; title: string; category: string; description: string; start_date: string; time_text: string; price: number; deposit: number; max_spots: number; includes: string; image_url: string; active: boolean; created_at: string; };
type Booking = { id: string; course_id: string | null; name: string; email: string; phone: string | null; service: string | null; message: string | null; status: string; paid: boolean; created_at: string; };
type Tab = "dashboard" | "anfragen" | "kurse" | "buchungen";

// ============================================================
// ADMIN PAGE
// ============================================================
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [courses, setCourses] = useState<Course[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => { if (sessionStorage.getItem("sl_admin") === "1") setLoggedIn(true); }, []);

  const login = () => {
    if (pw === "skinlove2026!") { setLoggedIn(true); sessionStorage.setItem("sl_admin", "1"); }
    else setErr("Falsches Passwort");
  };
  const logout = () => { sessionStorage.removeItem("sl_admin"); setLoggedIn(false); };

  const load = useCallback(async () => {
    const [c, b] = await Promise.all([
      sb("courses?select=*&order=start_date"),
      sb("bookings?select=*&order=created_at.desc"),
    ]);
    if (Array.isArray(c)) setCourses(c);
    if (Array.isArray(b)) setBookings(b);
  }, []);

  useEffect(() => { if (loggedIn) load(); }, [loggedIn, load]);

  // ===== LOGIN =====
  if (!loggedIn) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>
      <div style={{ width: 360, background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 40 }}>
        <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 24 }}>🔐 SkinLove Admin</h2>
        <input type="password" placeholder="Admin-Passwort" value={pw}
          onChange={e => { setPw(e.target.value); setErr(""); }}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ width: "100%", padding: 12, background: "#1a1a1a", border: "1px solid rgba(255,255,255,.1)", color: "#fff", fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box" }}
        />
        <button onClick={login} style={{ width: "100%", padding: 12, background: "#bb3599", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Anmelden</button>
        {err && <p style={{ color: "#e44", fontSize: 12, marginTop: 12 }}>{err}</p>}
      </div>
    </div>
  );

  const anfragen = bookings.filter(b => !b.course_id);
  const wsBuchungen = bookings.filter(b => b.course_id);
  const pendingAnfragen = anfragen.filter(b => b.status === "pending").length;
  const activeCourses = courses.filter(c => c.active).length;
  const totalSpots = courses.reduce((s, c) => s + c.max_spots, 0);
  const takenSpots = wsBuchungen.filter(b => b.status !== "cancelled").length;

  const tabs: { key: Tab; label: string; badge?: number }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "anfragen", label: "Anfragen", badge: pendingAnfragen },
    { key: "kurse", label: "Kurse" },
    { key: "buchungen", label: "Buchungen" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "'Inter',sans-serif" }}>
      {/* HEADER */}
      <header style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 18, color: "#fff", margin: 0 }}>Skin<span style={{ color: "#bb3599" }}>Love</span> Admin</h1>
        <nav style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: "6px 16px", fontSize: 12, border: `1px solid ${tab === t.key ? "#bb3599" : "rgba(255,255,255,.1)"}`,
              background: tab === t.key ? "#bb3599" : "transparent", color: "#fff", cursor: "pointer", fontFamily: "inherit",
            }}>
              {t.label}{t.badge ? <span style={{ marginLeft: 6, padding: "2px 6px", background: "#e44", borderRadius: 10, fontSize: 10, fontWeight: 700 }}>{t.badge}</span> : null}
            </button>
          ))}
          <button onClick={logout} style={{ padding: "6px 16px", fontSize: 12, border: "1px solid rgba(255,255,255,.1)", background: "transparent", color: "#e44", cursor: "pointer", fontFamily: "inherit" }}>Logout</button>
        </nav>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {tab === "dashboard" && <Dashboard courses={courses} anfragen={anfragen} wsBuchungen={wsBuchungen} activeCourses={activeCourses} totalSpots={totalSpots} takenSpots={takenSpots} pendingAnfragen={pendingAnfragen} />}
        {tab === "anfragen" && <Anfragen anfragen={anfragen} onUpdate={load} />}
        {tab === "kurse" && <Kurse courses={courses} onUpdate={load} />}
        {tab === "buchungen" && <Buchungen buchungen={wsBuchungen} courses={courses} onUpdate={load} />}
      </div>
    </div>
  );
}

// ============================================================
// SHARED
// ============================================================
const fmtDate = (d: string) => new Date(d).toLocaleDateString("de-AT", { day: "numeric", month: "short", year: "numeric" });

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const colors: Record<string, string> = { green: "rgba(34,197,94,.15)", yellow: "rgba(234,179,8,.15)", red: "rgba(239,68,68,.15)", blue: "rgba(59,130,246,.15)" };
  const texts: Record<string, string> = { green: "#4ade80", yellow: "#facc15", red: "#f87171", blue: "#60a5fa" };
  return <span style={{ padding: "2px 8px", fontSize: 11, fontWeight: 600, background: colors[color], color: texts[color], display: "inline-block" }}>{children}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const m: Record<string, { c: string; l: string }> = {
    confirmed: { c: "green", l: "Bestätigt" }, pending: { c: "yellow", l: "Ausstehend" },
    cancelled: { c: "red", l: "Storniert" }, refunded: { c: "blue", l: "Erstattet" },
  };
  const v = m[status] || { c: "yellow", l: status };
  return <Badge color={v.c}>{v.l}</Badge>;
}

function StatCard({ num, label }: { num: string | number; label: string }) {
  return (
    <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 20, textAlign: "center" }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>{num}</div>
      <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, textTransform: "uppercase" as const, marginTop: 4 }}>{label}</div>
    </div>
  );
}

const tableStyle: React.CSSProperties = { width: "100%", fontSize: 13, borderCollapse: "collapse" as const };
const thStyle: React.CSSProperties = { textAlign: "left", padding: "8px 12px", fontSize: 11, color: "#888", letterSpacing: 1.5, textTransform: "uppercase" as const, borderBottom: "1px solid rgba(255,255,255,.1)" };
const tdStyle: React.CSSProperties = { padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,.04)" };
const btnPink: React.CSSProperties = { padding: "4px 12px", background: "#bb3599", color: "#fff", border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer" };
const btnRed: React.CSSProperties = { padding: "4px 12px", background: "rgba(239,68,68,.15)", color: "#f87171", border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer" };
const btnGhost: React.CSSProperties = { padding: "4px 12px", background: "transparent", color: "#e0e0e0", border: "1px solid rgba(255,255,255,.1)", fontSize: 11, cursor: "pointer" };
const inputStyle: React.CSSProperties = { width: "100%", padding: 10, background: "#1a1a1a", border: "1px solid rgba(255,255,255,.1)", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" };

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({ courses, anfragen, wsBuchungen, activeCourses, totalSpots, takenSpots, pendingAnfragen }: {
  courses: Course[]; anfragen: Booking[]; wsBuchungen: Booking[]; activeCourses: number; totalSpots: number; takenSpots: number; pendingAnfragen: number;
}) {
  const revenue = wsBuchungen.filter(b => b.status !== "cancelled").reduce((s, b) => {
    const c = courses.find(c2 => c2.id === b.course_id);
    return s + (c?.price || 0);
  }, 0);

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard num={activeCourses} label="Aktive Kurse" />
        <StatCard num={wsBuchungen.length} label="Buchungen" />
        <StatCard num={pendingAnfragen} label="Neue Anfragen" />
        <StatCard num={totalSpots - takenSpots} label="Freie Plätze" />
        <StatCard num={`€${revenue}`} label="Erwart. Umsatz" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24 }}>
          <h3 style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>Letzte Buchungen</h3>
          {wsBuchungen.slice(0, 5).map(b => {
            const c = courses.find(c2 => c2.id === b.course_id);
            return (
              <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 12 }}>
                <span style={{ color: "#fff" }}>{b.name}</span>
                <span style={{ color: "#888" }}>{c?.title || "—"}</span>
                <StatusBadge status={b.status} />
              </div>
            );
          })}
          {wsBuchungen.length === 0 && <p style={{ color: "#888", fontSize: 13, textAlign: "center", padding: 20 }}>Keine Buchungen</p>}
        </div>
        <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24 }}>
          <h3 style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>Letzte Terminanfragen {pendingAnfragen > 0 && <span style={{ marginLeft: 8, padding: "2px 8px", background: "#e44", borderRadius: 10, fontSize: 10, color: "#fff", fontWeight: 700 }}>{pendingAnfragen} neu</span>}</h3>
          {anfragen.slice(0, 5).map(a => (
            <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 12 }}>
              <span style={{ color: "#fff" }}>{a.name}</span>
              <span style={{ color: "#888" }}>{a.service || "—"}</span>
              <StatusBadge status={a.status} />
            </div>
          ))}
          {anfragen.length === 0 && <p style={{ color: "#888", fontSize: 13, textAlign: "center", padding: 20 }}>Keine Anfragen</p>}
        </div>
      </div>
    </>
  );
}

// ============================================================
// ANFRAGEN
// ============================================================
function Anfragen({ anfragen, onUpdate }: { anfragen: Booking[]; onUpdate: () => void }) {
  const update = async (id: string, status: string) => {
    await sb(`bookings?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    onUpdate();
  };
  return (
    <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24, overflowX: "auto" }}>
      <h3 style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>Terminanfragen ({anfragen.length})</h3>
      {anfragen.length === 0 ? <p style={{ color: "#888", textAlign: "center", padding: 32 }}>Keine Terminanfragen</p> : (
        <table style={tableStyle}>
          <thead><tr>
            <th style={thStyle}>Name</th><th style={thStyle}>E-Mail</th><th style={thStyle}>Service</th>
            <th style={thStyle}>Nachricht</th><th style={thStyle}>Datum</th><th style={thStyle}>Status</th><th style={thStyle}>Aktionen</th>
          </tr></thead>
          <tbody>{anfragen.map(a => (
            <tr key={a.id}>
              <td style={{ ...tdStyle, color: "#fff" }}>{a.name}</td>
              <td style={tdStyle}><a href={`mailto:${a.email}`} style={{ color: "#bb3599" }}>{a.email}</a></td>
              <td style={tdStyle}>{a.service || "—"}</td>
              <td style={{ ...tdStyle, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={a.message || ""}>{a.message || "—"}</td>
              <td style={tdStyle}>{fmtDate(a.created_at)}</td>
              <td style={tdStyle}><StatusBadge status={a.status} /></td>
              <td style={{ ...tdStyle, display: "flex", gap: 4 }}>
                {a.status === "pending" && <button style={btnPink} onClick={() => update(a.id, "confirmed")}>Bestätigen</button>}
                {a.status !== "cancelled" && <button style={btnRed} onClick={() => { if (confirm("Ablehnen?")) update(a.id, "cancelled"); }}>Ablehnen</button>}
              </td>
            </tr>
          ))}</tbody>
        </table>
      )}
    </div>
  );
}

// ============================================================
// KURSE
// ============================================================
function Kurse({ courses, onUpdate }: { courses: Course[]; onUpdate: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const empty = { title: "", category: "Tattoo", description: "", start_date: "", time_text: "", price: 0, deposit: 0, max_spots: 6, includes: "" };
  const [form, setForm] = useState(empty);

  const openEdit = (c: Course) => {
    setForm({ title: c.title, category: c.category, description: c.description, start_date: c.start_date?.split("T")[0] || "", time_text: c.time_text, price: c.price, deposit: c.deposit, max_spots: c.max_spots, includes: c.includes });
    setEditId(c.id); setShowForm(true);
  };

  const save = async () => {
    if (editId) {
      await sb(`courses?id=eq.${editId}`, { method: "PATCH", body: JSON.stringify(form) });
    } else {
      await sb("courses", { method: "POST", body: JSON.stringify({ ...form, active: true }) });
    }
    setShowForm(false); setEditId(null); setForm(empty); onUpdate();
  };

  const del = async (id: string) => {
    if (!confirm("Kurs wirklich löschen?")) return;
    await sb(`courses?id=eq.${id}`, { method: "DELETE" });
    onUpdate();
  };

  const toggle = async (c: Course) => {
    await sb(`courses?id=eq.${c.id}`, { method: "PATCH", body: JSON.stringify({ active: !c.active }) });
    onUpdate();
  };

  const cats = ["Tattoo", "Piercing", "Lash & Brow", "Permanent Make-up", "Sonstiges"];

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <button style={btnPink} onClick={() => { setEditId(null); setForm(empty); setShowForm(true); }}>+ Neuen Kurs</button>
      </div>

      {showForm && (
        <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>{editId ? "Kurs bearbeiten" : "Neuen Kurs anlegen"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Kursname</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} /></div>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Kategorie</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ ...inputStyle, appearance: "none" as const }}>{cats.map(c => <option key={c}>{c}</option>)}</select></div>
          </div>
          <div style={{ marginBottom: 12 }}><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Beschreibung</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Startdatum</label><input type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} style={inputStyle} /></div>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Uhrzeit</label><input value={form.time_text} onChange={e => setForm({ ...form, time_text: e.target.value })} placeholder="z.B. Mi 17:00-19:00" style={inputStyle} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Preis (€)</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} style={inputStyle} /></div>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Anzahlung (€)</label><input type="number" value={form.deposit} onChange={e => setForm({ ...form, deposit: +e.target.value })} style={inputStyle} /></div>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Max. Plätze</label><input type="number" value={form.max_spots} onChange={e => setForm({ ...form, max_spots: +e.target.value })} style={inputStyle} /></div>
          </div>
          <div style={{ marginBottom: 16 }}><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Inklusive</label><input value={form.includes} onChange={e => setForm({ ...form, includes: e.target.value })} placeholder="Material, Zertifikat..." style={inputStyle} /></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={btnPink} onClick={save}>Speichern</button>
            <button style={btnGhost} onClick={() => { setShowForm(false); setEditId(null); }}>Abbrechen</button>
          </div>
        </div>
      )}

      <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24, overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead><tr>
            <th style={thStyle}>Kurs</th><th style={thStyle}>Datum</th><th style={thStyle}>Preis</th>
            <th style={thStyle}>Plätze</th><th style={thStyle}>Status</th><th style={thStyle}>Aktionen</th>
          </tr></thead>
          <tbody>{courses.length === 0 ? <tr><td colSpan={6} style={{ ...tdStyle, textAlign: "center", color: "#888", padding: 32 }}>Keine Kurse</td></tr> : courses.map(c => (
            <tr key={c.id}>
              <td style={tdStyle}><strong style={{ color: "#fff" }}>{c.title}</strong><br /><span style={{ fontSize: 11, color: "#888" }}>{c.category}</span></td>
              <td style={tdStyle}>{c.start_date ? fmtDate(c.start_date) : "—"}<br /><span style={{ fontSize: 11, color: "#888" }}>{c.time_text}</span></td>
              <td style={tdStyle}>€{c.price}</td>
              <td style={tdStyle}>{c.max_spots} max</td>
              <td style={tdStyle}>{c.active ? <Badge color="green">Aktiv</Badge> : <Badge color="yellow">Inaktiv</Badge>}</td>
              <td style={{ ...tdStyle, display: "flex", gap: 4, flexWrap: "wrap" }}>
                <button style={btnGhost} onClick={() => openEdit(c)}>Bearbeiten</button>
                <button style={btnGhost} onClick={() => toggle(c)}>{c.active ? "Deaktivieren" : "Aktivieren"}</button>
                <button style={btnRed} onClick={() => del(c.id)}>×</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}

// ============================================================
// BUCHUNGEN
// ============================================================
function Buchungen({ buchungen, courses, onUpdate }: { buchungen: Booking[]; courses: Course[]; onUpdate: () => void }) {
  const update = async (id: string, data: Record<string, unknown>) => {
    await sb(`bookings?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(data) });
    onUpdate();
  };
  return (
    <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24, overflowX: "auto" }}>
      <h3 style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>Workshop-Buchungen ({buchungen.length})</h3>
      {buchungen.length === 0 ? <p style={{ color: "#888", textAlign: "center", padding: 32 }}>Keine Buchungen</p> : (
        <table style={tableStyle}>
          <thead><tr>
            <th style={thStyle}>Name</th><th style={thStyle}>E-Mail</th><th style={thStyle}>Kurs</th>
            <th style={thStyle}>Datum</th><th style={thStyle}>Bezahlt</th><th style={thStyle}>Status</th><th style={thStyle}>Aktionen</th>
          </tr></thead>
          <tbody>{buchungen.map(b => {
            const c = courses.find(c2 => c2.id === b.course_id);
            return (
              <tr key={b.id}>
                <td style={{ ...tdStyle, color: "#fff" }}>{b.name}</td>
                <td style={tdStyle}><a href={`mailto:${b.email}`} style={{ color: "#bb3599" }}>{b.email}</a></td>
                <td style={tdStyle}>{c?.title || "—"}</td>
                <td style={tdStyle}>{fmtDate(b.created_at)}</td>
                <td style={tdStyle}>{b.paid ? <Badge color="green">Ja</Badge> : <Badge color="yellow">Nein</Badge>}</td>
                <td style={tdStyle}><StatusBadge status={b.status} /></td>
                <td style={{ ...tdStyle, display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {b.status === "pending" && <button style={btnPink} onClick={() => update(b.id, { status: "confirmed", paid: true })}>Bestätigen</button>}
                  {!b.paid && b.status !== "cancelled" && <button style={btnGhost} onClick={() => update(b.id, { paid: true })}>Bezahlt</button>}
                  {b.status !== "cancelled" && <button style={btnRed} onClick={() => { if (confirm("Stornieren?")) update(b.id, { status: "cancelled" }); }}>Stornieren</button>}
                </td>
              </tr>
            );
          })}</tbody>
        </table>
      )}
    </div>
  );
}
