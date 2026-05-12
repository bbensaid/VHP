import { redirect } from 'next/navigation'

export default function ConnectHubRedirect({
  searchParams,
}: {
  searchParams: { tab?: string }
}) {
  const tab = searchParams?.tab
  redirect(tab ? `/connect?tab=${tab}` : '/connect')
}
