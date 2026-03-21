"use client";

import { useEffect, useState, useCallback } from "react";

type Tab = "dashboard" | "anfragen" | "kurse" | "buchungen" | "einstellungen";

type ContactRequest = {
  id: string; name: string; email: string; phone?: string;
  service?: string; message?: string; status: string; createdAt: string;
};

type Course = {
  id: string; title: string; description?: string; category?: string;
  startDate?: string; timeText?: string; price: number; deposit?: number;
  maxSpots: number; includes?: string; isActive: boolean;
  _count?: { enrollments: number };
};

type Enrollment = {
  id: string; courseId: string; name: string; email: string; phone?: string;
  status: string; paid: boolean; createdAt: string;
  course?: { title: string; startDate?: string };
};

type Stats = {
  activeCourses: number; totalEnrollments: number; pendingRequests: number;
  freeSpots: number; revenue: number;
};

type Settings = {
  name: string; workshopsEnabled: boolean; contactFormEnabled: boolean;
  settings: {
    phone?: string; email?: string; address?: string;
    openingHours?: unknown; cancellationPolicy?: string; socialLinks?: unknown;
  } | null;
};

async function api(path: string, opts?: RequestInit) {
  const res = await fetch(`/api/admin/${path}`, opts);
  return res.json();
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");

  const [stats, setStats] = useState<Stats>({ activeCourses: 0, totalEnrollments: 0, pendingRequests: 0, freeSpots: 0, revenue: 0 });
  const [anfragen, setAnfragen] = useState<ContactRequest[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);

  const [showKursForm, setShowKursForm] = useState(false);
  const [editKurs, setEditKurs] = useState<Course | null>(null);

  // Simple password auth (admin password from env or hardcoded for now)
  const doLogin = () => {
    if (password === "skinlove2026!") {
      setLoggedIn(true);
      localStorage.setItem("sl_admin", "1");
    } else {
      setLoginError("Falsches Passwort");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("sl_admin") === "1") setLoggedIn(true);
  }, []);

  const doLogout = () => {
    localStorage.removeItem("sl_admin");
    setLoggedIn(false);
  };

  const loadAll = useCallback(async () => {
    const [s, a, c, e, st] = await Promise.all([
      api("stats"), api("contact-requests"), api("courses"),
      api("enrollments"), api("settings"),
    ]);
    if (s && !s.error) setStats(s);
    if (Array.isArray(a)) setAnfragen(a);
    if (Array.isArray(c)) setCourses(c);
    if (Array.isArray(e)) setEnrollments(e);
    if (st && !st.error) setSettings(st);
  }, []);

  useEffect(() => { if (loggedIn) loadAll(); }, [loggedIn, loadAll]);

  // ===== LOGIN =====
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-[#141414] border border-white/10 p-8">
          <h2 className="text-xl font-bold text-white mb-6">🔐 SkinLove Admin</h2>
          <input
            type="password"
            placeholder="Admin-Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doLogin()}
            className="w-full p-3 bg-[#1a1a1a] border border-white/10 text-white mb-4 text-sm outline-none focus:border-[#bb3599] transition-colors"
          />
          <button onClick={doLogin} className="w-full p-3 bg-[#bb3599] text-white font-semibold text-sm hover:bg-[#a02d85] transition-colors cursor-pointer">
            Anmelden
          </button>
          {loginError && <p className="text-red-400 text-xs mt-3">{loginError}</p>}
        </div>
      </div>
    );
  }

  const pendingAnfragen = anfragen.filter((a) => a.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className="px-6 py-4 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
        <h1 className="text-lg text-white font-medium">
          Skin<span className="text-[#bb3599]">Love</span> Admin
        </h1>
        <nav className="flex flex-wrap gap-2 items-center">
          {(["dashboard", "anfragen", "kurse", "buchungen", "einstellungen"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-xs border transition-all cursor-pointer ${
                tab === t ? "bg-[#bb3599] border-[#bb3599] text-white" : "border-white/10 text-[#e0e0e0] hover:bg-[#bb3599] hover:border-[#bb3599] hover:text-white"
              }`}
            >
              {t === "anfragen" ? (
                <>Anfragen{pendingAnfragen > 0 && <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">{pendingAnfragen}</span>}</>
              ) : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
          <button onClick={doLogout} className="px-3 py-1.5 text-xs border border-white/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer">Logout</button>
        </nav>
      </header>

      <div className="max-w-[1100px] mx-auto p-6 md:p-8">
        {tab === "dashboard" && <DashboardTab stats={stats} anfragen={anfragen} enrollments={enrollments} />}
        {tab === "anfragen" && <AnfragenTab anfragen={anfragen} onUpdate={loadAll} />}
        {tab === "kurse" && <KurseTab courses={courses} showForm={showKursForm} setShowForm={setShowKursForm} editKurs={editKurs} setEditKurs={setEditKurs} onUpdate={loadAll} />}
        {tab === "buchungen" && <BuchungenTab enrollments={enrollments} onUpdate={loadAll} />}
        {tab === "einstellungen" && settings && <EinstellungenTab settings={settings} onUpdate={loadAll} />}
      </div>
    </div>
  );
}

/* ====== HELPERS ====== */
function StatCard({ num, label }: { num: string | number; label: string }) {
  return (
    <div className="bg-[#141414] border border-white/10 p-5 text-center">
      <div className="text-3xl font-bold text-white">{num}</div>
      <div className="text-[11px] text-[#888] uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

function Badge({ type, children }: { type: "green" | "red" | "yellow" | "blue"; children: React.ReactNode }) {
  const c = { green: "bg-green-500/15 text-green-400", red: "bg-red-500/15 text-red-400", yellow: "bg-yellow-500/15 text-yellow-400", blue: "bg-blue-500/15 text-blue-400" };
  return <span className={`px-2 py-0.5 text-[11px] font-semibold inline-block ${c[type]}`}>{children}</span>;
}

function statusBadge(status: string) {
  const m: Record<string, { type: "green" | "yellow" | "red" | "blue"; label: string }> = {
    CONFIRMED: { type: "green", label: "Bestätigt" }, PENDING: { type: "yellow", label: "Ausstehend" },
    CANCELLED: { type: "red", label: "Storniert" }, REFUNDED: { type: "blue", label: "Erstattet" },
  };
  const v = m[status] || { type: "yellow" as const, label: status };
  return <Badge type={v.type}>{v.label}</Badge>;
}

function fmtDate(d?: string) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("de-AT", { day: "numeric", month: "short", year: "numeric" });
}

/* ====== DASHBOARD ====== */
function DashboardTab({ stats, anfragen, enrollments }: { stats: Stats; anfragen: ContactRequest[]; enrollments: Enrollment[] }) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard num={stats.activeCourses} label="Aktive Kurse" />
        <StatCard num={stats.totalEnrollments} label="Buchungen" />
        <StatCard num={stats.pendingRequests} label="Neue Anfragen" />
        <StatCard num={stats.freeSpots} label="Freie Plätze" />
        <StatCard num={`€${stats.revenue}`} label="Erwart. Umsatz" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#141414] border border-white/10 p-6">
          <h3 className="text-sm font-medium text-white mb-4">Letzte Buchungen</h3>
          {enrollments.length === 0 ? <p className="text-[#888] text-sm text-center py-4">Keine Buchungen</p> : (
            <div className="space-y-2">{enrollments.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-white">{e.name}</span><span className="text-[#888]">{e.course?.title || "-"}</span>{statusBadge(e.status)}
              </div>
            ))}</div>
          )}
        </div>
        <div className="bg-[#141414] border border-white/10 p-6">
          <h3 className="text-sm font-medium text-white mb-4">Letzte Terminanfragen{stats.pendingRequests > 0 && <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">{stats.pendingRequests} neu</span>}</h3>
          {anfragen.length === 0 ? <p className="text-[#888] text-sm text-center py-4">Keine Anfragen</p> : (
            <div className="space-y-2">{anfragen.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-white">{a.name}</span><span className="text-[#888]">{a.service || "-"}</span>{statusBadge(a.status)}
              </div>
            ))}</div>
          )}
        </div>
      </div>
    </>
  );
}

/* ====== ANFRAGEN ====== */
function AnfragenTab({ anfragen, onUpdate }: { anfragen: ContactRequest[]; onUpdate: () => void }) {
  const update = async (id: string, status: string) => {
    await api("contact-requests", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    onUpdate();
  };
  return (
    <div className="bg-[#141414] border border-white/10 p-6">
      <h3 className="text-sm font-medium text-white mb-4">Terminanfragen ({anfragen.length})</h3>
      {anfragen.length === 0 ? <p className="text-[#888] text-sm text-center py-8">Keine Terminanfragen</p> : (
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="text-[#888] text-[11px] uppercase tracking-wider border-b border-white/10">
          <th className="text-left p-2.5">Name</th><th className="text-left p-2.5">E-Mail</th><th className="text-left p-2.5">Telefon</th>
          <th className="text-left p-2.5">Service</th><th className="text-left p-2.5">Nachricht</th><th className="text-left p-2.5">Datum</th>
          <th className="text-left p-2.5">Status</th><th className="text-left p-2.5">Aktionen</th>
        </tr></thead><tbody>{anfragen.map((a) => (
          <tr key={a.id} className="border-b border-white/5">
            <td className="p-2.5 text-white">{a.name}</td>
            <td className="p-2.5"><a href={`mailto:${a.email}`} className="text-[#bb3599] hover:underline">{a.email}</a></td>
            <td className="p-2.5">{a.phone ? <a href={`tel:${a.phone}`} className="text-[#bb3599] hover:underline">{a.phone}</a> : "-"}</td>
            <td className="p-2.5">{a.service || "-"}</td>
            <td className="p-2.5 max-w-[200px] truncate" title={a.message || ""}>{a.message || "-"}</td>
            <td className="p-2.5">{fmtDate(a.createdAt)}</td>
            <td className="p-2.5">{statusBadge(a.status)}</td>
            <td className="p-2.5 space-x-1">
              {a.status === "PENDING" && <button onClick={() => update(a.id, "CONFIRMED")} className="px-2 py-1 bg-[#bb3599] text-white text-[10px] font-semibold hover:bg-[#a02d85] cursor-pointer transition-colors">Bestätigen</button>}
              {a.status !== "CANCELLED" && <button onClick={() => { if (confirm("Ablehnen?")) update(a.id, "CANCELLED"); }} className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-semibold hover:bg-red-500/40 cursor-pointer transition-colors">Ablehnen</button>}
            </td>
          </tr>
        ))}</tbody></table></div>
      )}
    </div>
  );
}

/* ====== KURSE ====== */
function KurseTab({ courses, showForm, setShowForm, editKurs, setEditKurs, onUpdate }: {
  courses: Course[]; showForm: boolean; setShowForm: (v: boolean) => void; editKurs: Course | null; setEditKurs: (v: Course | null) => void; onUpdate: () => void;
}) {
  const empty = { title: "", category: "Tattoo", description: "", startDate: "", timeText: "", price: 0, deposit: 0, maxSpots: 6, includes: "" };
  const [form, setForm] = useState(empty);
  const cats = ["Tattoo", "Piercing", "Lash & Brow", "Permanent Make-up", "Sonstiges"];

  useEffect(() => {
    if (editKurs) {
      setForm({
        title: editKurs.title, category: editKurs.category || "Tattoo", description: editKurs.description || "",
        startDate: editKurs.startDate ? editKurs.startDate.split("T")[0] : "", timeText: editKurs.timeText || "",
        price: editKurs.price, deposit: editKurs.deposit || 0, maxSpots: editKurs.maxSpots, includes: editKurs.includes || "",
      });
      setShowForm(true);
    }
  }, [editKurs, setShowForm]);

  const save = async () => {
    const method = editKurs ? "PATCH" : "POST";
    const body = editKurs ? { id: editKurs.id, ...form } : form;
    await api("courses", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setShowForm(false); setEditKurs(null); setForm(empty); onUpdate();
  };

  const del = async (id: string) => {
    if (!confirm("Kurs löschen?")) return;
    await api("courses", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    onUpdate();
  };

  const toggle = async (id: string, isActive: boolean) => {
    await api("courses", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isActive: !isActive }) });
    onUpdate();
  };

  return (
    <>
      <div className="mb-6">
        <button onClick={() => { setEditKurs(null); setForm(empty); setShowForm(true); }} className="px-4 py-2 bg-[#bb3599] text-white text-xs font-semibold hover:bg-[#a02d85] transition-colors cursor-pointer">+ Neuen Kurs</button>
      </div>
      {showForm && (
        <div className="bg-[#141414] border border-white/10 p-6 mb-6">
          <h3 className="text-sm font-medium text-white mb-4">{editKurs ? "Kurs bearbeiten" : "Neuen Kurs anlegen"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div><label className="text-[11px] text-[#888] block mb-1">Kursname</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]" /></div>
            <div><label className="text-[11px] text-[#888] block mb-1">Kategorie</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]">{cats.map((c) => <option key={c}>{c}</option>)}</select></div>
          </div>
          <div className="mb-3"><label className="text-[11px] text-[#888] block mb-1">Beschreibung</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599] min-h-[80px] resize-y" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div><label className="text-[11px] text-[#888] block mb-1">Startdatum</label><input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]" /></div>
            <div><label className="text-[11px] text-[#888] block mb-1">Uhrzeit</label><input value={form.timeText} onChange={(e) => setForm({ ...form, timeText: e.target.value })} placeholder="z.B. Mi 17:00-19:00" className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div><label className="text-[11px] text-[#888] block mb-1">Preis (€)</label><input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]" /></div>
            <div><label className="text-[11px] text-[#888] block mb-1">Anzahlung (€)</label><input type="number" value={form.deposit} onChange={(e) => setForm({ ...form, deposit: Number(e.target.value) })} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div><label className="text-[11px] text-[#888] block mb-1">Max. Teilnehmer</label><input type="number" value={form.maxSpots} onChange={(e) => setForm({ ...form, maxSpots: Number(e.target.value) })} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]" /></div>
            <div><label className="text-[11px] text-[#888] block mb-1">Inklusive</label><input value={form.includes} onChange={(e) => setForm({ ...form, includes: e.target.value })} placeholder="Material, Zertifikat" className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]" /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="px-4 py-2 bg-[#bb3599] text-white text-xs font-semibold hover:bg-[#a02d85] cursor-pointer transition-colors">Speichern</button>
            <button onClick={() => { setShowForm(false); setEditKurs(null); }} className="px-4 py-2 border border-white/10 text-[#e0e0e0] text-xs hover:bg-white/5 cursor-pointer transition-colors">Abbrechen</button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="text-[#888] text-[11px] uppercase tracking-wider border-b border-white/10">
        <th className="text-left p-2.5">Kurs</th><th className="text-left p-2.5">Datum</th><th className="text-left p-2.5">Plätze</th>
        <th className="text-left p-2.5">Preis</th><th className="text-left p-2.5">Status</th><th className="text-left p-2.5">Aktionen</th>
      </tr></thead><tbody>
        {courses.length === 0 ? <tr><td colSpan={6} className="text-center py-8 text-[#888]">Keine Kurse</td></tr> : courses.map((k) => {
          const booked = k._count?.enrollments || 0;
          const left = k.maxSpots - booked;
          return (
            <tr key={k.id} className="border-b border-white/5">
              <td className="p-2.5"><strong className="text-white">{k.title}</strong><br /><span className="text-[11px] text-[#888]">{k.category}</span></td>
              <td className="p-2.5">{fmtDate(k.startDate)}<br /><span className="text-[11px] text-[#888]">{k.timeText}</span></td>
              <td className="p-2.5">{booked}/{k.maxSpots} {left <= 0 ? <Badge type="red">VOLL</Badge> : <Badge type="green">{left} frei</Badge>}</td>
              <td className="p-2.5">€{k.price}</td>
              <td className="p-2.5">{k.isActive ? <Badge type="green">Aktiv</Badge> : <Badge type="yellow">Inaktiv</Badge>}</td>
              <td className="p-2.5 space-x-1">
                <button onClick={() => setEditKurs(k)} className="px-2 py-1 border border-white/10 text-[10px] hover:bg-white/5 cursor-pointer transition-colors">Bearbeiten</button>
                <button onClick={() => toggle(k.id, k.isActive)} className="px-2 py-1 border border-white/10 text-[10px] hover:bg-white/5 cursor-pointer transition-colors">{k.isActive ? "Deaktivieren" : "Aktivieren"}</button>
                <button onClick={() => del(k.id)} className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-semibold hover:bg-red-500/40 cursor-pointer transition-colors">×</button>
              </td>
            </tr>
          );
        })}
      </tbody></table></div>
    </>
  );
}

/* ====== BUCHUNGEN ====== */
function BuchungenTab({ enrollments, onUpdate }: { enrollments: Enrollment[]; onUpdate: () => void }) {
  const update = async (id: string, data: Record<string, unknown>) => {
    await api("enrollments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...data }) });
    onUpdate();
  };
  return (
    <div className="bg-[#141414] border border-white/10 p-6">
      <h3 className="text-sm font-medium text-white mb-4">Workshop-Buchungen ({enrollments.length})</h3>
      {enrollments.length === 0 ? <p className="text-[#888] text-sm text-center py-8">Keine Buchungen</p> : (
        <div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="text-[#888] text-[11px] uppercase tracking-wider border-b border-white/10">
          <th className="text-left p-2.5">Name</th><th className="text-left p-2.5">E-Mail</th><th className="text-left p-2.5">Kurs</th>
          <th className="text-left p-2.5">Datum</th><th className="text-left p-2.5">Bezahlt</th><th className="text-left p-2.5">Status</th><th className="text-left p-2.5">Aktionen</th>
        </tr></thead><tbody>{enrollments.map((e) => (
          <tr key={e.id} className="border-b border-white/5">
            <td className="p-2.5 text-white">{e.name}</td>
            <td className="p-2.5"><a href={`mailto:${e.email}`} className="text-[#bb3599] hover:underline">{e.email}</a></td>
            <td className="p-2.5">{e.course?.title || "-"}</td>
            <td className="p-2.5">{fmtDate(e.createdAt)}</td>
            <td className="p-2.5">{e.paid ? <Badge type="green">Ja</Badge> : <Badge type="yellow">Nein</Badge>}</td>
            <td className="p-2.5">{statusBadge(e.status)}</td>
            <td className="p-2.5 space-x-1">
              {e.status === "PENDING" && <button onClick={() => update(e.id, { status: "CONFIRMED", paid: true })} className="px-2 py-1 bg-[#bb3599] text-white text-[10px] font-semibold hover:bg-[#a02d85] cursor-pointer transition-colors">Bestätigen</button>}
              {e.status !== "CANCELLED" && <button onClick={() => { if (confirm("Stornieren?")) update(e.id, { status: "CANCELLED" }); }} className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-semibold hover:bg-red-500/40 cursor-pointer transition-colors">Stornieren</button>}
            </td>
          </tr>
        ))}</tbody></table></div>
      )}
    </div>
  );
}

/* ====== EINSTELLUNGEN ====== */
function EinstellungenTab({ settings, onUpdate }: { settings: Settings; onUpdate: () => void }) {
  const [phone, setPhone] = useState(settings.settings?.phone || "");
  const [email, setEmail] = useState(settings.settings?.email || "");
  const [address, setAddress] = useState(settings.settings?.address || "");
  const [cancellation, setCancellation] = useState(settings.settings?.cancellationPolicy || "14+ Tage: 100% Erstattung\n7-14 Tage: 50% Erstattung\nUnter 7 Tage: Keine Erstattung");
  const [workshops, setWorkshops] = useState(settings.workshopsEnabled);
  const [contactForm, setContactForm] = useState(settings.contactFormEnabled);

  const save = async () => {
    await api("settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workshopsEnabled: workshops,
        contactFormEnabled: contactForm,
        settings: { phone, email, address, cancellationPolicy: cancellation },
      }),
    });
    alert("Gespeichert!");
    onUpdate();
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#141414] border border-white/10 p-6">
        <h3 className="text-sm font-medium text-white mb-4">Feature-Toggles</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={workshops} onChange={(e) => setWorkshops(e.target.checked)} className="accent-[#bb3599]" />
            <span className="text-sm text-white">Workshops / Kurse aktiviert</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={contactForm} onChange={(e) => setContactForm(e.target.checked)} className="accent-[#bb3599]" />
            <span className="text-sm text-white">Kontaktformular / Terminanfragen aktiviert</span>
          </label>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 p-6">
        <h3 className="text-sm font-medium text-white mb-4">Kontaktdaten</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div><label className="text-[11px] text-[#888] block mb-1">Telefon</label><input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]" /></div>
          <div><label className="text-[11px] text-[#888] block mb-1">E-Mail</label><input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]" /></div>
        </div>
        <div className="mb-3"><label className="text-[11px] text-[#888] block mb-1">Adresse</label><input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599]" /></div>
      </div>

      <div className="bg-[#141414] border border-white/10 p-6">
        <h3 className="text-sm font-medium text-white mb-4">Stornierungsregeln</h3>
        <textarea value={cancellation} onChange={(e) => setCancellation(e.target.value)} className="w-full p-2.5 bg-[#1a1a1a] border border-white/10 text-white text-xs outline-none focus:border-[#bb3599] min-h-[100px] resize-y" />
      </div>

      <button onClick={save} className="px-6 py-3 bg-[#bb3599] text-white text-sm font-semibold hover:bg-[#a02d85] transition-colors cursor-pointer">Alle Einstellungen speichern</button>
    </div>
  );
}
