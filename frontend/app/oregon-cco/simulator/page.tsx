import OregonCCOSimulatorClient from './OregonCCOSimulatorClient'

export const metadata = {
  title: 'Oregon CCO 3.0 Simulator | HTR',
  description: "Model the multi-pillar impact of Oregon's third-generation Coordinated Care Organizations — global budgets, equity metrics, behavioral health integration, and CHW infrastructure across 16 CCOs.",
}

export default function OregonCCOSimulatorPage() {
  return <OregonCCOSimulatorClient />
}
