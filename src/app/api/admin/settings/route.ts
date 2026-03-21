import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getTenantId();
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { settings: true },
    });
    if (!tenant) return NextResponse.json({ error: "Tenant nicht gefunden" }, { status: 404 });

    return NextResponse.json({
      name: tenant.name,
      slug: tenant.slug,
      workshopsEnabled: tenant.workshopsEnabled,
      contactFormEnabled: tenant.contactFormEnabled,
      settings: tenant.settings ? {
        phone: tenant.settings.businessPhone,
        email: tenant.settings.businessEmail,
        address: tenant.settings.businessAddress,
        openingHours: tenant.settings.openingHours,
      } : null,
    });
  } catch (error) {
    console.error("Settings error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const tenantId = await getTenantId();
    const body = await req.json();

    // Update tenant toggles
    if (body.workshopsEnabled !== undefined || body.contactFormEnabled !== undefined) {
      const tenantUpdate: Record<string, boolean> = {};
      if (body.workshopsEnabled !== undefined) tenantUpdate.workshopsEnabled = body.workshopsEnabled;
      if (body.contactFormEnabled !== undefined) tenantUpdate.contactFormEnabled = body.contactFormEnabled;
      await prisma.tenant.update({ where: { id: tenantId }, data: tenantUpdate });
    }

    // Update settings
    if (body.settings) {
      const settingsData: Record<string, string> = {};
      if (body.settings.phone !== undefined) settingsData.businessPhone = body.settings.phone;
      if (body.settings.email !== undefined) settingsData.businessEmail = body.settings.email;
      if (body.settings.address !== undefined) settingsData.businessAddress = body.settings.address;
      if (body.settings.openingHours !== undefined) settingsData.openingHours = body.settings.openingHours;

      await prisma.tenantSettings.upsert({
        where: { tenantId },
        update: settingsData,
        create: { tenantId, businessName: body.settings.name || "SkinLove", businessEmail: body.settings.email || "", ...settingsData },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}
