import PolicyQualityClient from './PolicyQualityClient'

export const metadata = {
  title: 'Policy & Quality Sciences | HTR Research Lab',
  description: 'Simulate Medicaid waivers, global budgets, HEDIS/Star ratings, MIPS, actuarial models, and hospital financial stress tests.',
}

export default function PolicyQualityPage({
  searchParams,
}: {
  searchParams: { tab?: string }
}) {
  return <PolicyQualityClient initialTab={searchParams.tab} />
}
