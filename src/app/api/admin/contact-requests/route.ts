import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    const requests = await prisma.contactRequest.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests);
  } catch (error) {
    console.error("Contact requests error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "id und status erforderlich" }, { status: 400 });
    }
    const updated = await prisma.contactRequest.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update contact request error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}
