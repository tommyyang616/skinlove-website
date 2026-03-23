'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChatWidget } from './ChatWidget'

export function ChatWrapper() {
  const path = usePathname()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setEnabled(true), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  if (path?.startsWith('/admin') || path?.startsWith('/maintenance')) return null
  if (!enabled) return null
  return <ChatWidget />
}
