import { Suspense } from 'react'
import AskHTRClient from './AskHTRClient'

export const metadata = {
  title: 'Ask HTR | HTR Connect',
  description: 'Submit any question on healthcare transformation to HTR\'s advisory team. A named advisor responds within 48 business hours. Browse the public Q&A library.',
}

export default function AskHTRPage() {
  return (
    <Suspense fallback={null}>
      <AskHTRClient />
    </Suspense>
  )
}
