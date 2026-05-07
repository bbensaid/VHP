import CMSRuralSimulatorClient from './CMSRuralSimulatorClient'

export const metadata = {
  title: 'CMS Rural Health Transformation Simulator | HTR',
  description: "Model the multi-pillar impact of CMS's $50B Rural Health Transformation Program — global budget demonstrations, essential hospital designations, and payment reforms across 50-state rural and critical access hospital networks.",
}

export default function CMSRuralSimulatorPage() {
  return <CMSRuralSimulatorClient />
}
