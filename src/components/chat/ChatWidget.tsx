'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
    id: string
    role: 'user' | 'assistant'
    content: string
}

const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || 'skinlove'

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hey! 👋 Ich bin die digitale Assistentin von SkinLove. Frag mich was zu Tattoo, Piercing, PMU oder unseren Workshops!',
        },
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    tenantId: TENANT_SLUG,
                }),
            })

            if (!response.ok) throw new Error('Fetch failed')
            const data = await response.json()

            setMessages(prev => [...prev, {
                id: data.id || (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.content,
            }])
        } catch {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Entschuldigung, da ist was schiefgelaufen. Versuch es nochmal oder schreib Eve direkt auf WhatsApp! 📱',
            }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : ''}`}
                style={{ background: '#bb3599' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Chat öffnen"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl shadow-2xl"
                        style={{ border: '1px solid rgba(187,53,153,0.3)', background: '#0a0a0a' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4" style={{ background: 'linear-gradient(135deg, #bb3599, #9b2080)' }}>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
                                    <span className="text-lg">✨</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-sm">SkinLove Assistent</h3>
                                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>Frag mich was!</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-1 hover:bg-white/10 text-white/80 hover:text-white"
                                aria-label="Chat schließen"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4" style={{ background: '#0a0a0a' }}>
                            {messages.map(message => (
                                <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs ${message.role === 'user' ? 'bg-white/10 text-white' : ''}`}
                                        style={message.role === 'assistant' ? { background: 'rgba(187,53,153,0.2)', color: '#bb3599' } : {}}>
                                        {message.role === 'user' ? '👤' : '✨'}
                                    </div>
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${message.role === 'user' ? 'text-white' : 'text-gray-200'}`}
                                        style={message.role === 'user' ? { background: '#bb3599' } : { background: '#1a1a1a' }}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: 'rgba(187,53,153,0.2)' }}>
                                        <span className="text-xs">✨</span>
                                    </div>
                                    <div className="rounded-2xl px-4 py-3" style={{ background: '#1a1a1a' }}>
                                        <div className="flex gap-1.5">
                                            <span className="h-2 w-2 animate-bounce rounded-full" style={{ background: '#bb3599', animationDelay: '0ms' }} />
                                            <span className="h-2 w-2 animate-bounce rounded-full" style={{ background: '#bb3599', animationDelay: '150ms' }} />
                                            <span className="h-2 w-2 animate-bounce rounded-full" style={{ background: '#bb3599', animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="border-t p-4" style={{ borderColor: 'rgba(255,255,255,0.1)', background: '#0a0a0a' }}>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="Deine Frage..."
                                    className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                                    style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
                                    disabled={isLoading}
                                    autoComplete="off"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all disabled:opacity-40"
                                    style={{ background: '#bb3599' }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
