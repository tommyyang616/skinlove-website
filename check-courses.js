const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()

async function main() {
    // Get skinlove tenant
    const tenant = await p.tenant.findFirst({ where: { slug: 'skinlove' } })
    console.log('SkinLove tenant:', tenant?.id, tenant?.name)
    
    // Get all courses
    const allCourses = await p.course.findMany({
        select: { id: true, title: true, tenantId: true, isActive: true, startDate: true }
    })
    console.log('\nAll courses in DB:', allCourses.length)
    allCourses.forEach(c => {
        console.log(`  - "${c.title}" | tenantId: ${c.tenantId} | active: ${c.isActive} | date: ${c.startDate}`)
    })

    // Get courses for skinlove specifically
    if (tenant) {
        const skinloveCourses = await p.course.findMany({
            where: { tenantId: tenant.id },
            select: { id: true, title: true, isActive: true }
        })
        console.log(`\nSkinLove courses (tenantId=${tenant.id}):`, skinloveCourses.length)
        skinloveCourses.forEach(c => console.log(`  - "${c.title}" active: ${c.isActive}`))
    }

    await p['$disconnect']()
}

main().catch(e => { console.error(e); process.exit(1) })
