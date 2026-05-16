import { Suspense } from 'react'
import VBCClinicalQualityClient from './VBCClinicalQualityClient'

export const metadata = {
  title: 'VBC & Clinical Quality Lab | HTR Research Lab',
  description: 'Synthetic Vermont patient scenarios covering HL7 v2 / FHIR R4 clinical data exchange, HEDIS quality measures, 30-day readmissions, avoidable ED visits, high vs. low value care, and HCC risk stratification methodology.',
}

export default function Page() {
  return (
    <Suspense>
      <VBCClinicalQualityClient />
    </Suspense>
  )
}
