'use client'
import { usePathname } from 'next/navigation'
import { ChatWidget } from './ChatWidget'

export function ChatWrapper() {
  const path = usePathname()
  if (path?.startsWith('/admin') || path?.startsWith('/maintenance')) return null
  return <ChatWidget />
}
