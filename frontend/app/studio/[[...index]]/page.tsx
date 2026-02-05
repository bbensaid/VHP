'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import config from '../../../sanity.config'

// 1. Dynamic import with SSR disabled
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((m) => m.NextStudio),
  { ssr: false }
)

export default function StudioPage() {
  const [mounted, setMounted] = useState(false)

  // 2. Only allow rendering after browser mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // 3. Force return null on server
  if (!mounted) return null

  return (
    <div style={{ height: '100vh' }}>
      <NextStudio config={config} />
    </div>
  )
}