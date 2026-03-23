import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || "skinlove";

type ConfigSyncSettings = {
  primaryColor?: string;
  logoUrl?: string | null;
  logoAlt?: string | null;
  mobileHeroUrl?: string | null;
  mobileHeroAlt?: string | null;
  businessName?: string;
  businessAddress?: string | null;
  businessPhone?: string | null;
  businessEmail?: string;
  telegramUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  tiktokUrl?: string | null;
  twitterUrl?: string | null;
  legalName?: string | null;
  legalRepresentedBy?: string | null;
  vatId?: string | null;
  courtRegister?: string | null;
  impressum?: string | null;
  datenschutz?: string | null;
  openingHours?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  ogImage?: string | null;
  ogImageAlt?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  landingPageConfig?: string | null;
};

type ValidConfigSyncSettings = Omit<ConfigSyncSettings, "businessName" | "businessEmail"> & {
  businessName: string;
  businessEmail: string;
};

const ALLOWED_SETTINGS_FIELDS = new Set<keyof ConfigSyncSettings>([
  "primaryColor",
  "logoUrl",
  "logoAlt",
  "mobileHeroUrl",
  "mobileHeroAlt",
  "businessName",
  "businessAddress",
  "businessPhone",
  "businessEmail",
  "telegramUrl",
  "instagramUrl",
  "facebookUrl",
  "linkedinUrl",
  "tiktokUrl",
  "twitterUrl",
  "legalName",
  "legalRepresentedBy",
  "vatId",
  "courtRegister",
  "impressum",
  "datenschutz",
  "openingHours",
  "seoTitle",
  "seoDescription",
  "seoKeywords",
  "ogImage",
  "ogImageAlt",
  "ogTitle",
  "ogDescription",
  "landingPageConfig",
]);

function sanitizeSettings(input: unknown): ConfigSyncSettings | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;

  const sanitized: ConfigSyncSettings = {};

  for (const [key, value] of Object.entries(input)) {
    if (!ALLOWED_SETTINGS_FIELDS.has(key as keyof ConfigSyncSettings)) continue;

    if (value === null) {
      sanitized[key as keyof ConfigSyncSettings] = null as never;
      continue;
    }

    if (typeof value === "string") {
      sanitized[key as keyof ConfigSyncSettings] = value;
      continue;
    }

    if (typeof value === "object") {
      sanitized[key as keyof ConfigSyncSettings] = JSON.stringify(value);
    }
  }

  return sanitized;
}

function isValidConfigSyncSettings(settings: ConfigSyncSettings): settings is ValidConfigSyncSettings {
  return typeof settings.businessName === "string" && settings.businessName.length > 0
    && typeof settings.businessEmail === "string" && settings.businessEmail.length > 0;
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-internal-secret");
  if (secret !== process.env.MASTERDASHBOARD_SHARED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const tenant = await prisma.tenant.findFirst({ where: { slug: TENANT_SLUG } });
    if (!tenant) return NextResponse.json({ error: "Tenant not found" }, { status: 404 });

    if (body.settings) {
      const settings = sanitizeSettings(body.settings);

      if (!settings) {
        return NextResponse.json({ error: "Invalid settings payload" }, { status: 400 });
      }

      if (!isValidConfigSyncSettings(settings)) {
        return NextResponse.json({ error: "businessName and businessEmail are required" }, { status: 400 });
      }

      await prisma.tenantSettings.upsert({
        where: { tenantId: tenant.id },
        update: settings,
        create: { tenantId: tenant.id, ...settings },
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
