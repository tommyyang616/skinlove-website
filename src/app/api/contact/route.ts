import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function POST(req: NextRequest) {
  try {
    const tenantId = await getTenantId();
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name und E-Mail sind Pflicht" }, { status: 400 });
    }

    const contactRequest = await prisma.contactRequest.create({
      data: { tenantId, name, email, phone, service, message },
    });

    // Telegram Notification
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      const text = `📋 Neue Terminanfrage!\n\n👤 ${name}\n📧 ${email}${phone ? `\n📞 ${phone}` : ""}${service ? `\n💇 ${service}` : ""}${message ? `\n💬 ${message}` : ""}`;
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, id: contactRequest.id });
  } catch (error) {
    console.error("Contact request error:", error);
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 });
  }
}
