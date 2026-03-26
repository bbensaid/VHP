import ConnectHubClient from './ConnectHubClient'

export const metadata = {
  title: 'HTR Connect | Peer Cohorts, Office Hours & Implementation Support',
  description:
    'Peer cohorts by organization type, expert office hours across the Five Pillars, implementation toolkits, grant finder, pillar circles, and direct Q&A with HTR advisors.',
}

export default function ConnectHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <ConnectHubClient />
    </div>
  )
}
