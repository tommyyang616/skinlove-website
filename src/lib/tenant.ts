import { prisma } from "./prisma";

let cachedTenantId: string | null = null;

export async function getTenantId(): Promise<string> {
  if (cachedTenantId) return cachedTenantId;
  
  const slug = process.env.NEXT_PUBLIC_TENANT_SLUG;
  if (!slug) throw new Error("NEXT_PUBLIC_TENANT_SLUG not set");
  
  const tenant = await prisma.tenant.findUnique({
    where: { slug },
  });
  
  if (!tenant) throw new Error(`Tenant '${slug}' not found`);
  cachedTenantId = tenant.id;
  return tenant.id;
}
