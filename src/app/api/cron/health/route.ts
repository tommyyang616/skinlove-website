import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegram } from "@/lib/telegram";
import { getTenant } from "@/lib/tenant";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // DB check
    const dbOk = await prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false);

    // Tenant check
    const tenant = await getTenant();

    // Count pending items
    const [pendingContacts, pendingEnrollments, activeCourses] = await Promise.all([
      prisma.contactRequest.count({ where: { tenantId: tenant?.id || "", status: "PENDING" } }),
      prisma.courseEnrollment.count({ where: { course: { tenantId: tenant?.id || "" }, status: "PENDING" } }),
      prisma.course.count({ where: { tenantId: tenant?.id || "", isActive: true } }),
    ]);

    const healthy = dbOk && !!tenant;

    // Alert via Telegram if unhealthy
    if (!healthy) {
      await sendTelegram(
        `⚠️ <b>SkinLove Health Check FAILED</b>\n\n` +
        `<b>DB:</b> ${dbOk ? "✅" : "❌"}\n` +
        `<b>Tenant:</b> ${tenant ? "✅" : "❌"}\n` +
        `<b>Time:</b> ${new Date().toISOString()}`
      );
    }

    return NextResponse.json({
      status: healthy ? "healthy" : "unhealthy",
      database: dbOk ? "connected" : "error",
      tenant: tenant?.slug || "not found",
      pendingContacts,
      pendingEnrollments,
      activeCourses,
      timestamp: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: e?.message || String(e), timestamp: new Date().toISOString() }, { status: 500 });
  }
}
