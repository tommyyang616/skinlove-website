import { NextRequest, NextResponse } from 'next/server'
import { getRelevantContext, generateAIResponse } from '@/lib/ai'
import { checkRateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    const { ok } = await checkRateLimit(`chat:${ip}`, 7, 60)
    if (!ok) {
        return NextResponse.json(
            { error: 'Zu viele Anfragen. Bitte warte kurz. ⏳' },
            { status: 429 }
        )
    }

    try {
        const { messages, tenantId } = await request.json()

        if (!tenantId) {
            return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 })
        }

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Messages required' }, { status: 400 })
        }

        const lastMessage = messages[messages.length - 1].content

        if (typeof lastMessage !== 'string' || lastMessage.trim().length === 0) {
            return NextResponse.json({ error: 'Ungültige Nachricht' }, { status: 400 })
        }

        if (lastMessage.length > 200) {
            return NextResponse.json({
                id: Date.now().toString(),
                role: 'assistant',
                content: 'Deine Nachricht ist etwas lang! 😅 Fass deine Frage bitte kürzer zusammen — ich helfe dir gerne! 💕'
            })
        }

        if (/[<>{}[\]\\]/.test(lastMessage) || lastMessage.includes('```')) {
            return NextResponse.json({
                id: Date.now().toString(),
                role: 'assistant',
                content: 'Hmm, das sieht nicht nach einer Frage aus! 🤔 Wie kann ich dir bei Tattoo, Piercing oder PMU helfen? ✨'
            })
        }

        const context = await getRelevantContext(lastMessage, tenantId)
        const response = await generateAIResponse(lastMessage, context, tenantId)

        return NextResponse.json({
            id: Date.now().toString(),
            role: 'assistant',
            content: response
        })

    } catch (error) {
        console.error('[Chat API] Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
