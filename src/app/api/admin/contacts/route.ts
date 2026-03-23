import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function GET() {
  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json([]);
  const requests = await prisma.contactRequest.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(requests);
}

export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  const request = await prisma.contactRequest.update({ where: { id }, data });
  return NextResponse.json(request);
}
