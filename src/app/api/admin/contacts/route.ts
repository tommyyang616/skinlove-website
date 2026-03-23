import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) return NextResponse.json([]);
    const requests = await prisma.contactRequest.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();
    const request = await prisma.contactRequest.update({ where: { id }, data });
    return NextResponse.json(request);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
