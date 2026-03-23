import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createClient() {
    const connStr = process.env.DIRECT_URL || process.env.DATABASE_URL
    const pool = new Pool({
        connectionString: connStr,
        ssl: { rejectUnauthorized: false },
    })
    const adapter = new PrismaPg(pool as any)
    return new PrismaClient({ adapter } as any)
}

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}
