const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config({ path: ".env.local" });

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  // Enable features
  const tenant = await prisma.tenant.update({
    where: { slug: "skinlove" },
    data: {
      workshopsEnabled: true,
      contactFormEnabled: true,
      telegramEnabled: true,
    },
  });
  console.log("Updated tenant:", tenant.slug, "workshops:", tenant.workshopsEnabled, "contact:", tenant.contactFormEnabled);

  // Upsert TenantSettings
  const settings = await prisma.tenantSettings.upsert({
    where: { tenantId: tenant.id },
    update: {
      businessName: "SkinLove Tattoo & Piercing",
      businessEmail: "skinlove.marchtrenk@gmail.com",
      businessPhone: "+436607835346",
      businessAddress: "Marchtrenk, Oberösterreich",
      primaryColor: "#bb3599",
    },
    create: {
      tenantId: tenant.id,
      businessName: "SkinLove Tattoo & Piercing",
      businessEmail: "skinlove.marchtrenk@gmail.com",
      businessPhone: "+436607835346",
      businessAddress: "Marchtrenk, Oberösterreich",
      primaryColor: "#bb3599",
    },
  });
  console.log("Settings:", settings.businessName, settings.businessEmail);

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
