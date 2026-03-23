import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createClient() {
    const connStr = process.env.DATABASE_URL || ''
    // Remove pgbouncer param as pg Pool doesn't understand it
    const cleanUrl = connStr.replace('?pgbouncer=true', '').replace('&pgbouncer=true', '')
    const pool = new Pool({
        connectionString: cleanUrl,
        ssl: { rejectUnauthorized: false },
        max: 5,
    })
    const adapter = new PrismaPg(pool as unknown as ConstructorParameters<typeof PrismaPg>[0])
    return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}
