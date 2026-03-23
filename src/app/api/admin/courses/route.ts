import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function GET() {
  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json([]);
  const courses = await prisma.course.findMany({
    where: { tenantId },
    include: { enrollments: true },
    orderBy: { startDate: "asc" },
  });
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json({ error: "No tenant" }, { status: 500 });
  const body = await req.json();
  const course = await prisma.course.create({
    data: { tenantId, title: body.title, description: body.description, category: body.category, startDate: body.start_date ? new Date(body.start_date) : null, timeText: body.time_text, price: body.price, deposit: body.deposit, maxSpots: body.max_spots, includes: body.includes, isActive: true },
  });
  return NextResponse.json(course);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, ...data } = body;
  const update: any = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.description !== undefined) update.description = data.description;
  if (data.category !== undefined) update.category = data.category;
  if (data.start_date !== undefined) update.startDate = data.start_date ? new Date(data.start_date) : null;
  if (data.time_text !== undefined) update.timeText = data.time_text;
  if (data.price !== undefined) update.price = data.price;
  if (data.deposit !== undefined) update.deposit = data.deposit;
  if (data.max_spots !== undefined) update.maxSpots = data.max_spots;
  if (data.includes !== undefined) update.includes = data.includes;
  if (data.active !== undefined) update.isActive = data.active;
  const course = await prisma.course.update({ where: { id }, data: update });
  return NextResponse.json(course);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.course.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
