import { Suspense } from 'react'
import PolicyQualityClient from './PolicyQualityClient'

export const metadata = {
  title: 'Policy & Quality Sciences | HTR Research Lab',
  description: 'Simulate Medicaid waivers, global budgets, HEDIS/Star ratings, MIPS, actuarial models, and hospital financial stress tests.',
}

export default function PolicyQualityPage() {
  return (
    <Suspense>
      <PolicyQualityClient />
    </Suspense>
  )
}
