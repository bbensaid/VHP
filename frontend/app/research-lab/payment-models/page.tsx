import PaymentModelsClient from './PaymentModelsClient'

export const metadata = {
  title: 'Payment Models & VBC | HTR Research Lab',
  description: 'Design alternative payment models, episode bundles, global budgets, shared savings scenarios, and cost-effectiveness analyses.',
}

export default function PaymentModelsPage({
  searchParams,
}: {
  searchParams: { tab?: string }
}) {
  return <PaymentModelsClient initialTab={searchParams.tab} />
}
