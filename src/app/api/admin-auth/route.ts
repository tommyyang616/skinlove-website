import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

const ADMIN_USERS: Record<string, string> = {
  eve: (process.env.ADMIN_PASSWORD || "skinlove2026!").trim(),
  admin: (process.env.ADMIN_PASSWORD || "skinlove2026!").trim(),
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { ok } = await checkRateLimit(`admin:${ip}`, 5, 300);
  if (!ok) return NextResponse.json({ error: "Zu viele Versuche" }, { status: 429 });

  const { username, password } = await req.json();
  const user = (username || "").trim().toLowerCase();
  const pw = (password || "").trim();

  const correctPw = ADMIN_USERS[user];
  if (correctPw && pw === correctPw) {
    return NextResponse.json({ ok: true, user });
  }

  return NextResponse.json({ error: "Falscher Benutzername oder Passwort" }, { status: 401 });
}
