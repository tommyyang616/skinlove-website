import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { ok } = await checkRateLimit(`admin:${ip}`, 5, 300);
  if (!ok) return NextResponse.json({ error: "Zu viele Versuche" }, { status: 429 });

  const { password } = await req.json();
  const correct = (process.env.ADMIN_PASSWORD || "skinlove2026!").trim();

  if (password.trim() === correct) return NextResponse.json({ ok: true });
  return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
}
