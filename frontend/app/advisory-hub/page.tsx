import AdvisoryHubClient from './AdvisoryHubClient'

export const metadata = {
  title: 'HTR Advisory Hub | 8 Practice Areas',
  description:
    'Strategic consulting, research, IT advisory, independent review, capability assessment, financial audit, regulatory counsel, and training — all anchored in the HTR Five-Pillar Framework.',
}

export default function AdvisoryHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <AdvisoryHubClient />
    </div>
  )
}
