import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getTenantId();

    const [activeCourses, totalEnrollments, pendingRequests, courses] = await Promise.all([
      prisma.course.count({ where: { tenantId, isActive: true } }),
      prisma.courseEnrollment.count({
        where: { course: { tenantId }, status: { not: "CANCELLED" } },
      }),
      prisma.contactRequest.count({ where: { tenantId, status: "PENDING" } }),
      prisma.course.findMany({
        where: { tenantId, isActive: true },
        include: { _count: { select: { enrollments: true } } },
      }),
    ]);

    let freeSpots = 0;
    let revenue = 0;
    courses.forEach((c: { maxSpots: number; price: unknown; _count: { enrollments: number } }) => {
      const booked = c._count.enrollments;
      freeSpots += c.maxSpots - booked;
      revenue += booked * Number(c.price);
    });

    return NextResponse.json({
      activeCourses,
      totalEnrollments,
      pendingRequests,
      freeSpots,
      revenue,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}
