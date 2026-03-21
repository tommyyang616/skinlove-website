import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    const courses = await prisma.course.findMany({
      where: { tenantId },
      include: { _count: { select: { enrollments: true } } },
      orderBy: { startDate: "asc" },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Courses error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tenantId = await getTenantId();
    const body = await req.json();
    const course = await prisma.course.create({
      data: {
        tenantId,
        title: body.title,
        description: body.description,
        category: body.category,
        startDate: body.startDate ? new Date(body.startDate) : null,
        timeText: body.timeText,
        price: body.price,
        deposit: body.deposit,
        maxSpots: body.maxSpots || 6,
        includes: body.includes,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.error("Create course error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "id erforderlich" }, { status: 400 });
    if (data.startDate) data.startDate = new Date(data.startDate);
    const updated = await prisma.course.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update course error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id erforderlich" }, { status: 400 });
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete course error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}
