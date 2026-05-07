import VermontAct68SimulatorClient from './VermontAct68SimulatorClient'

export const metadata = {
  title: 'Vermont Act 68 Simulator | HTR',
  description: "Model the multi-pillar impact of Vermont Act 68 of 2025 — reference-based pricing, hospital global budgets, and the Statewide Health Care Delivery Strategic Plan across Vermont's 14-hospital network.",
}

export default function VermontAct68SimulatorPage() {
  return <VermontAct68SimulatorClient />
}
