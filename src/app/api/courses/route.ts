import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) return NextResponse.json([]);

    const courses = await prisma.course.findMany({
      where: { tenantId, isActive: true },
      include: { enrollments: { select: { id: true } } },
      orderBy: { startDate: "asc" },
    });

    const mapped = courses.map(c => ({
      id: c.id,
      title: c.title,
      desc: c.description || "",
      date: c.startDate?.toISOString().split("T")[0] || "",
      time: c.timeText || "",
      price: Number(c.price),
      deposit: Number(c.deposit || 0),
      maxSpots: c.maxSpots,
      takenSpots: c.enrollments.length,
      category: c.category || "",
      includes: c.includes || "",
      img: c.imageUrl || "",
    }));

    return NextResponse.json(mapped);
  } catch (e) {
    console.error("Courses fetch error:", e);
    return NextResponse.json([]);
  }
}
