import CMSRuralSimulatorClient from './CMSRuralSimulatorClient'

export const metadata = {
  title: 'Rural Health Transformation Program — State Awards | HTR',
  description: "CMS's FY2026 Rural Health Transformation Program awards for all 50 states ($147M–$281M), how the $10B a year is split, and what states are funding.",
}

export default function CMSRuralSimulatorPage() {
  return <CMSRuralSimulatorClient />
}
