import { prisma } from './prisma'
import { cache } from 'react'

const DEFAULT_TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || 'skinlove'

export const getTenant = cache(async () => {
  const tenant = await prisma.tenant.findFirst({
    where: { slug: DEFAULT_TENANT_SLUG },
    include: { settings: true },
  })
  return tenant
})

export const getTenantId = cache(async () => {
  const tenant = await getTenant()
  return tenant?.id || ''
})
