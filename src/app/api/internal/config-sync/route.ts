import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || "skinlove";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-internal-secret");
  if (secret !== process.env.MASTERDASHBOARD_SHARED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const tenant = await prisma.tenant.findFirst({ where: { slug: TENANT_SLUG } });
    if (!tenant) return NextResponse.json({ error: "Tenant not found" }, { status: 404 });

    if (body.settings) {
      await prisma.tenantSettings.upsert({
        where: { tenantId: tenant.id },
        update: body.settings,
        create: { tenantId: tenant.id, ...body.settings },
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
