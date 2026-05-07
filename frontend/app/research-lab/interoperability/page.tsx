import { Suspense } from 'react'
import InteroperabilityClient from './InteroperabilityClient'

export const metadata = {
  title: 'Interoperability & Risk | HTR Research Lab',
  description: 'Build FHIR R4 resources, test CDS Hooks, validate ONC compliance, and run HCC v28 risk stratification models.',
}

export default function InteroperabilityPage() {
  return (
    <Suspense>
      <InteroperabilityClient />
    </Suspense>
  )
}
