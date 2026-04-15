import PopulationEquityClient from './PopulationEquityClient'

export const metadata = {
  title: 'Population & Equity | HTR Research Lab',
  description: 'Model chronic disease progression, epidemic dynamics, health disparities, SDOH impact, and population-scale intervention ROI.',
}

export default function PopulationEquityPage({
  searchParams,
}: {
  searchParams: { tab?: string }
}) {
  return <PopulationEquityClient initialTab={searchParams.tab} />
}
