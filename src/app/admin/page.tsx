"use client";
import { useCallback, useEffect, useState } from "react";

const api = (path: string, opts?: RequestInit) =>
  fetch(path, { ...opts, headers: { "Content-Type": "application/json", ...opts?.headers } }).then(r => r.json());

type Course = { id: string; title: string; category: string | null; description: string | null; startDate: string; timeText: string | null; price: any; deposit: any; maxSpots: number; includes: string | null; imageUrl: string | null; isActive: boolean; createdAt: string; enrollments?: any[]; };
type Booking = { id: string; courseId: string | null; name: string; email: string; phone: string | null; status: string; paid: boolean; createdAt: string; course?: { title: string }; };
type ContactReq = { id: string; name: string; email: string; service: string | null; message: string | null; status: string; createdAt: string; };
type Tab = "dashboard" | "anfragen" | "kurse" | "buchungen";

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
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>
      <div style={{ width: 360, background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 40 }}>
        <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 24 }}>🔐 SkinLove Admin</h2>
        <input type="text" placeholder="Benutzername" value={user}
          onChange={e => { setUser(e.target.value); setErr(""); }}
          style={{ width: "100%", padding: 12, background: "#1a1a1a", border: "1px solid rgba(255,255,255,.1)", color: "#fff", fontSize: 14, outline: "none", marginBottom: 12, boxSizing: "border-box" }}
          autoComplete="username"
        />
        <input type="password" placeholder="Passwort" value={pw}
          onChange={e => { setPw(e.target.value); setErr(""); }}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ width: "100%", padding: 12, background: "#1a1a1a", border: "1px solid rgba(255,255,255,.1)", color: "#fff", fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box" }}
          autoComplete="current-password"
        />
        <button onClick={login} style={{ width: "100%", padding: 12, background: "#bb3599", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Anmelden</button>
        {err && <p style={{ color: "#e44", fontSize: 12, marginTop: 12 }}>{err}</p>}
      </div>
    </div>
  );

  const pendingContacts = contacts.filter(c => c.status === "PENDING").length;
  const activeCourses = courses.filter(c => c.isActive).length;
  const totalSpots = courses.reduce((s, c) => s + c.maxSpots, 0);
  const takenSpots = bookings.filter(b => b.status !== "CANCELLED").length;

  const tabs: { key: Tab; label: string; badge?: number }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "anfragen", label: "Anfragen", badge: pendingContacts },
    { key: "kurse", label: "Kurse" },
    { key: "buchungen", label: "Buchungen" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "'Inter',sans-serif" }}>
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
        {tab === "dashboard" && <Dashboard courses={courses} contacts={contacts} bookings={bookings} activeCourses={activeCourses} totalSpots={totalSpots} takenSpots={takenSpots} pendingContacts={pendingContacts} />}
        {tab === "anfragen" && <Anfragen contacts={contacts} onUpdate={load} />}
        {tab === "kurse" && <KurseTab courses={courses} onUpdate={load} />}
        {tab === "buchungen" && <Buchungen buchungen={bookings} courses={courses} onUpdate={load} />}
      </div>
    </div>
  );
}

// SHARED
const fmtDate = (d: string) => new Date(d).toLocaleDateString("de-AT", { day: "numeric", month: "short", year: "numeric" });
const toNum = (v: any) => typeof v === "number" ? v : Number(v) || 0;

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const bg: Record<string, string> = { green: "rgba(34,197,94,.15)", yellow: "rgba(234,179,8,.15)", red: "rgba(239,68,68,.15)", blue: "rgba(59,130,246,.15)" };
  const fg: Record<string, string> = { green: "#4ade80", yellow: "#facc15", red: "#f87171", blue: "#60a5fa" };
  return <span style={{ padding: "2px 8px", fontSize: 11, fontWeight: 600, background: bg[color], color: fg[color] }}>{children}</span>;
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

function StatCard({ num, label }: { num: string | number; label: string }) {
  return (
    <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 20, textAlign: "center" }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>{num}</div>
      <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
    </div>
  );
}

const tbl: React.CSSProperties = { width: "100%", fontSize: 13, borderCollapse: "collapse" };
const th: React.CSSProperties = { textAlign: "left", padding: "8px 12px", fontSize: 11, color: "#888", letterSpacing: 1.5, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,.1)" };
const td: React.CSSProperties = { padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,.04)" };
const btnP: React.CSSProperties = { padding: "4px 12px", background: "#bb3599", color: "#fff", border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer" };
const btnR: React.CSSProperties = { padding: "4px 12px", background: "rgba(239,68,68,.15)", color: "#f87171", border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer" };
const btnG: React.CSSProperties = { padding: "4px 12px", background: "transparent", color: "#e0e0e0", border: "1px solid rgba(255,255,255,.1)", fontSize: 11, cursor: "pointer" };
const inp: React.CSSProperties = { width: "100%", padding: 10, background: "#1a1a1a", border: "1px solid rgba(255,255,255,.1)", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" };

// DASHBOARD
function Dashboard({ courses, contacts, bookings, activeCourses, totalSpots, takenSpots, pendingContacts }: any) {
  const revenue = bookings.filter((b: any) => b.status !== "CANCELLED").reduce((s: number, b: any) => {
    const c = courses.find((c2: any) => c2.id === b.courseId);
    return s + toNum(c?.price);
  }, 0);
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard num={activeCourses} label="Aktive Kurse" />
        <StatCard num={bookings.length} label="Buchungen" />
        <StatCard num={pendingContacts} label="Neue Anfragen" />
        <StatCard num={totalSpots - takenSpots} label="Freie Plätze" />
        <StatCard num={`€${revenue}`} label="Erwart. Umsatz" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24 }}>
          <h3 style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>Letzte Buchungen</h3>
          {bookings.slice(0, 5).map((b: any) => (
            <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 12 }}>
              <span style={{ color: "#fff" }}>{b.name}</span>
              <span style={{ color: "#888" }}>{b.course?.title || "—"}</span>
              <StatusBadge status={b.status} />
            </div>
          ))}
          {bookings.length === 0 && <p style={{ color: "#888", fontSize: 13, textAlign: "center", padding: 20 }}>Keine Buchungen</p>}
        </div>
        <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24 }}>
          <h3 style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>Letzte Terminanfragen</h3>
          {contacts.slice(0, 5).map((a: any) => (
            <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: 12 }}>
              <span style={{ color: "#fff" }}>{a.name}</span>
              <span style={{ color: "#888" }}>{a.service || "—"}</span>
              <StatusBadge status={a.status} />
            </div>
          ))}
          {contacts.length === 0 && <p style={{ color: "#888", fontSize: 13, textAlign: "center", padding: 20 }}>Keine Anfragen</p>}
        </div>
      </div>
    </>
  );
}

// ANFRAGEN
function Anfragen({ contacts, onUpdate }: { contacts: ContactReq[]; onUpdate: () => void }) {
  const update = async (id: string, status: string) => {
    await api("/api/admin/contacts", { method: "PATCH", body: JSON.stringify({ id, status }) });
    onUpdate();
  };
  return (
    <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24, overflowX: "auto" }}>
      <h3 style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>Terminanfragen ({contacts.length})</h3>
      {contacts.length === 0 ? <p style={{ color: "#888", textAlign: "center", padding: 32 }}>Keine Terminanfragen</p> : (
        <table style={tbl}>
          <thead><tr><th style={th}>Name</th><th style={th}>E-Mail</th><th style={th}>Service</th><th style={th}>Nachricht</th><th style={th}>Datum</th><th style={th}>Status</th><th style={th}>Aktionen</th></tr></thead>
          <tbody>{contacts.map(a => (
            <tr key={a.id}>
              <td style={{ ...td, color: "#fff" }}>{a.name}</td>
              <td style={td}><a href={`mailto:${a.email}`} style={{ color: "#bb3599" }}>{a.email}</a></td>
              <td style={td}>{a.service || "—"}</td>
              <td style={{ ...td, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.message || "—"}</td>
              <td style={td}>{fmtDate(a.createdAt)}</td>
              <td style={td}><StatusBadge status={a.status} /></td>
              <td style={{ ...td, display: "flex", gap: 4 }}>
                {a.status === "PENDING" && <button style={btnP} onClick={() => update(a.id, "CONFIRMED")}>Bestätigen</button>}
                {a.status !== "CANCELLED" && <button style={btnR} onClick={() => { if (confirm("Ablehnen?")) update(a.id, "CANCELLED"); }}>Ablehnen</button>}
              </td>
            </tr>
          ))}</tbody>
        </table>
      )}
    </div>
  );
}

// KURSE
function KurseTab({ courses, onUpdate }: { courses: Course[]; onUpdate: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const empty = { title: "", category: "Tattoo", description: "", start_date: "", time_text: "", price: 0, deposit: 0, max_spots: 6, includes: "" };
  const [form, setForm] = useState(empty);

  const openEdit = (c: Course) => {
    setForm({ title: c.title, category: c.category || "Tattoo", description: c.description || "", start_date: c.startDate?.split("T")[0] || "", time_text: c.timeText || "", price: toNum(c.price), deposit: toNum(c.deposit), max_spots: c.maxSpots, includes: c.includes || "" });
    setEditId(c.id); setShowForm(true);
  };

  const save = async () => {
    if (editId) {
      await api("/api/admin/courses", { method: "PATCH", body: JSON.stringify({ id: editId, ...form }) });
    } else {
      await api("/api/admin/courses", { method: "POST", body: JSON.stringify(form) });
    }
    setShowForm(false); setEditId(null); setForm(empty); onUpdate();
  };

  const del = async (id: string) => {
    if (!confirm("Kurs wirklich löschen?")) return;
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
      <div style={{ marginBottom: 24 }}><button style={btnP} onClick={() => { setEditId(null); setForm(empty); setShowForm(true); }}>+ Neuen Kurs</button></div>
      {showForm && (
        <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>{editId ? "Kurs bearbeiten" : "Neuen Kurs anlegen"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Kursname</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inp} /></div>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Kategorie</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inp}>{cats.map(c => <option key={c}>{c}</option>)}</select></div>
          </div>
          <div style={{ marginBottom: 12 }}><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Beschreibung</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inp, minHeight: 80, resize: "vertical" }} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Startdatum</label><input type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} style={inp} /></div>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Uhrzeit</label><input value={form.time_text} onChange={e => setForm({ ...form, time_text: e.target.value })} placeholder="z.B. Mi 17:00-19:00" style={inp} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Preis (€)</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} style={inp} /></div>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Anzahlung (€)</label><input type="number" value={form.deposit} onChange={e => setForm({ ...form, deposit: +e.target.value })} style={inp} /></div>
            <div><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Max. Plätze</label><input type="number" value={form.max_spots} onChange={e => setForm({ ...form, max_spots: +e.target.value })} style={inp} /></div>
          </div>
          <div style={{ marginBottom: 16 }}><label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 4 }}>Inklusive</label><input value={form.includes} onChange={e => setForm({ ...form, includes: e.target.value })} placeholder="Material, Zertifikat..." style={inp} /></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={btnP} onClick={save}>Speichern</button>
            <button style={btnG} onClick={() => { setShowForm(false); setEditId(null); }}>Abbrechen</button>
          </div>
        </div>
      )}
      <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24, overflowX: "auto" }}>
        <table style={tbl}>
          <thead><tr><th style={th}>Kurs</th><th style={th}>Datum</th><th style={th}>Preis</th><th style={th}>Plätze</th><th style={th}>Status</th><th style={th}>Aktionen</th></tr></thead>
          <tbody>{courses.length === 0 ? <tr><td colSpan={6} style={{ ...td, textAlign: "center", color: "#888", padding: 32 }}>Keine Kurse</td></tr> : courses.map(c => (
            <tr key={c.id}>
              <td style={td}><strong style={{ color: "#fff" }}>{c.title}</strong><br /><span style={{ fontSize: 11, color: "#888" }}>{c.category}</span></td>
              <td style={td}>{c.startDate ? fmtDate(c.startDate) : "—"}<br /><span style={{ fontSize: 11, color: "#888" }}>{c.timeText}</span></td>
              <td style={td}>€{toNum(c.price)}</td>
              <td style={td}>{c.maxSpots} max</td>
              <td style={td}>{c.isActive ? <Badge color="green">Aktiv</Badge> : <Badge color="yellow">Inaktiv</Badge>}</td>
              <td style={{ ...td, display: "flex", gap: 4, flexWrap: "wrap" }}>
                <button style={btnG} onClick={() => openEdit(c)}>Bearbeiten</button>
                <button style={btnG} onClick={() => toggle(c)}>{c.isActive ? "Deaktivieren" : "Aktivieren"}</button>
                <button style={btnR} onClick={() => del(c.id)}>×</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}

// BUCHUNGEN
function Buchungen({ buchungen, courses, onUpdate }: { buchungen: Booking[]; courses: Course[]; onUpdate: () => void }) {
  const update = async (id: string, data: Record<string, unknown>) => {
    await api("/api/admin/bookings", { method: "PATCH", body: JSON.stringify({ id, ...data }) });
    onUpdate();
  };
  return (
    <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,.1)", padding: 24, overflowX: "auto" }}>
      <h3 style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>Workshop-Buchungen ({buchungen.length})</h3>
      {buchungen.length === 0 ? <p style={{ color: "#888", textAlign: "center", padding: 32 }}>Keine Buchungen</p> : (
        <table style={tbl}>
          <thead><tr><th style={th}>Name</th><th style={th}>E-Mail</th><th style={th}>Kurs</th><th style={th}>Datum</th><th style={th}>Bezahlt</th><th style={th}>Status</th><th style={th}>Aktionen</th></tr></thead>
          <tbody>{buchungen.map(b => (
            <tr key={b.id}>
              <td style={{ ...td, color: "#fff" }}>{b.name}</td>
              <td style={td}><a href={`mailto:${b.email}`} style={{ color: "#bb3599" }}>{b.email}</a></td>
              <td style={td}>{b.course?.title || "—"}</td>
              <td style={td}>{fmtDate(b.createdAt)}</td>
              <td style={td}>{b.paid ? <Badge color="green">Ja</Badge> : <Badge color="yellow">Nein</Badge>}</td>
              <td style={td}><StatusBadge status={b.status} /></td>
              <td style={{ ...td, display: "flex", gap: 4, flexWrap: "wrap" }}>
                {b.status === "PENDING" && <button style={btnP} onClick={() => update(b.id, { status: "CONFIRMED", paid: true })}>Bestätigen</button>}
                {!b.paid && b.status !== "CANCELLED" && <button style={btnG} onClick={() => update(b.id, { paid: true })}>Bezahlt</button>}
                {b.status !== "CANCELLED" && <button style={btnR} onClick={() => { if (confirm("Stornieren?")) update(b.id, { status: "CANCELLED" }); }}>Stornieren</button>}
              </td>
            </tr>
          ))}</tbody>
        </table>
      )}
    </div>
  );
}
