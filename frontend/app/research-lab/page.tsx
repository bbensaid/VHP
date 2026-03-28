import { getUser, roleAtLeast } from '@/lib/auth'
import UpgradePrompt from '@/components/UpgradePrompt'
import ResearchLabHub from './ResearchLabHub'

export const metadata = {
  title: 'HTR Research Lab | Health Transformation Review',
  description:
    'The most comprehensive health transformation research environment — 19 interactive sandboxes spanning interoperability, payment models, population health, policy, AI, and workforce.',
}

export default async function ResearchLabPage() {
  const user = await getUser()
  const isSubscriber = user ? roleAtLeast(user.role, 'subscriber') : false
  const isAdvisory   = user ? roleAtLeast(user.role, 'advisory')    : false

  return (
    <div className="min-h-screen bg-slate-50">
      {!isSubscriber && (
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <UpgradePrompt required="subscriber" feature="Research Lab" />
        </div>
      )}
      {isSubscriber && !isAdvisory && (
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <UpgradePrompt required="advisory" feature="Research Lab Expert Support" />
        </div>
      )}

      <div className="p-6">
        <ResearchLabHub />
      </div>
    </div>
  )
}
