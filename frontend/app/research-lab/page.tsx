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
          <UpgradePrompt
            inline
            title="Unlock the full Research Lab"
            description="Subscribe to access all 19 interactive analytical tools — FHIR labs, Monte Carlo models, policy simulators, and more."
            from="/research-lab"
          />
        </div>
      )}
      {isSubscriber && !isAdvisory && (
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <UpgradePrompt
            inline
            title="Upgrade to Advisory for dedicated expert support"
            description="Advisory members get 1-on-1 analyst sessions, custom model runs, and priority access to new research tools."
            from="/research-lab"
          />
        </div>
      )}

      <div className="p-6">
        <ResearchLabHub />
      </div>
    </div>
  )
}
