import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getAdminPassword, hasAdminAuthConfigured } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { ok } = await checkRateLimit(`admin:${ip}`, 5, 300);
  if (!ok) return NextResponse.json({ error: "Zu viele Versuche" }, { status: 429 });

  if (!hasAdminAuthConfigured()) {
    return NextResponse.json({ error: "Admin-Zugang ist nicht konfiguriert" }, { status: 503 });
  }

  const { username, password } = await req.json();
  const user = (username || "").trim().toLowerCase();
  const pw = (password || "").trim();

  const adminPassword = getAdminPassword();
  const ADMIN_USERS: Record<string, string> = {
    eve: adminPassword,
    admin: adminPassword,
  };

  const correctPw = ADMIN_USERS[user];
  if (correctPw && pw === correctPw) {
    return NextResponse.json({ ok: true, user });
  }

  return NextResponse.json({ error: "Falscher Benutzername oder Passwort" }, { status: 401 });
}
