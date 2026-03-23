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
      select: { id: true, slug: true, name: true, status: true, maintenanceModeEnabled: true },
    });
    if (!tenant) return NextResponse.json({ error: "Tenant not found" }, { status: 404 });

    const dbOk = await prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false);
    const courseCount = await prisma.course.count({ where: { tenantId: tenant.id, isActive: true } });
    const enrollmentCount = await prisma.courseEnrollment.count({ where: { course: { tenantId: tenant.id }, status: { in: ["PENDING", "CONFIRMED"] } } });

    return NextResponse.json({
      status: "healthy",
      tenant: { slug: tenant.slug, name: tenant.name, status: tenant.status, maintenance: tenant.maintenanceModeEnabled },
      database: dbOk ? "connected" : "error",
      courses: courseCount,
      enrollments: enrollmentCount,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ status: "error", message: "Health check failed", timestamp: new Date().toISOString() }, { status: 500 });
  }
}
