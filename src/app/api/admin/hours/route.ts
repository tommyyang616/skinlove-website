import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json(null);
  const settings = await prisma.tenantSettings.findUnique({
    where: { tenantId },
    select: { openingHours: true },
  });
  const hours = settings?.openingHours ? JSON.parse(settings.openingHours as string) : null;
  return NextResponse.json(hours);
}

export async function PUT(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json({ error: "No tenant" }, { status: 500 });
  const body = await req.json();
  if (!Array.isArray(body) || body.length !== 7) {
    return NextResponse.json({ error: "Invalid hours format" }, { status: 400 });
  }
  await prisma.tenantSettings.update({
    where: { tenantId },
    data: { openingHours: JSON.stringify(body) },
  });
  return NextResponse.json({ ok: true });
}
