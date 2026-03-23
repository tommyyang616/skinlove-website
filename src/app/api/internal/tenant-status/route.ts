import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || "skinlove";

export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-internal-secret");
  if (secret !== process.env.MASTERDASHBOARD_SHARED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const tenant = await prisma.tenant.findFirst({
      where: { slug: TENANT_SLUG },
      include: { settings: true },
    });
    if (!tenant) return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
    return NextResponse.json({ tenant });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
