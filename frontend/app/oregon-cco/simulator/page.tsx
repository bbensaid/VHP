import OregonCCOSimulatorClient from './OregonCCOSimulatorClient'

export const metadata = {
  title: 'Oregon CCO Simulator | HTR',
  description: "Model next-round (CCO 3.0) policy options for Oregon's Coordinated Care Organizations — global budgets, equity metrics, behavioral health integration, and CHW infrastructure across 15 CCOs.",
}

export default function OregonCCOSimulatorPage() {
  return <OregonCCOSimulatorClient />
}
