import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    const enrollments = await prisma.courseEnrollment.findMany({
      where: { course: { tenantId } },
      include: { course: { select: { title: true, startDate: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(enrollments);
  } catch (error) {
    console.error("Enrollments error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "id erforderlich" }, { status: 400 });
    const updated = await prisma.courseEnrollment.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update enrollment error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}
