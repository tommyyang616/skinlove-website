import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json([]);
  const enrollments = await prisma.courseEnrollment.findMany({
    where: { course: { tenantId } },
    include: { course: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(enrollments);
}

export async function PATCH(req: NextRequest) {
  if (!checkAdminAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await req.json();
  const enrollment = await prisma.courseEnrollment.update({ where: { id }, data });
  return NextResponse.json(enrollment);
}
