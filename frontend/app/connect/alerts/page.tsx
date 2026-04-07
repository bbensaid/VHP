import ConnectEarlyAccess from '@/components/connect/ConnectEarlyAccess'

export const metadata = {
  title: 'Subscribe to Funding Alerts | HTR Connect',
  description: 'Subscribe to HTR Connect grant and funding alerts — receive email notifications when new federal, state, or philanthropic opportunities are added to the Grant Finder.',
}

export default function AlertsPage() {
  return (
    <ConnectEarlyAccess
      icon="🔔"
      title="Grant & Funding Alerts"
      subtitle="Receive email notifications when new funding opportunities are added that match your organization type and pillar interests. HTR monitors CMS, HRSA, SAMHSA, CDC, and major foundations."
      features={[
        {
          icon: '⚡',
          title: 'Real-Time NOFA Monitoring',
          description: 'HTR researchers monitor CMS, HRSA, SAMHSA, CDC, and major foundation release calendars daily. You will be notified within 24 hours of a relevant new opportunity appearing.',
        },
        {
          icon: '🎯',
          title: 'Pillar-Filtered Alerts',
          description: 'Choose which of the Six Pillars (Policy, Economics, Technology, Clinical, Equity, Operations) are relevant to your organization. You only receive alerts for opportunities in your selected areas.',
        },
        {
          icon: '🏥',
          title: 'Organization-Type Filtering',
          description: 'Alerts are matched to your organization type — CAH, ACO, FQHC, state Medicaid agency, health plan, AMC, or rural health network — so you only see opportunities you are eligible for.',
        },
        {
          icon: '📅',
          title: 'Deadline Reminders',
          description: 'For open opportunities, you receive an automatic reminder 30 days before the application deadline — giving you time to prepare without tracking dates manually.',
        },
      ]}
      steps={[
        {
          step: 1,
          title: 'Email your preferences',
          description: 'Email connect@htr.com with: your organization name, organization type, which Six Pillars are relevant, and your preferred alert frequency (immediate, weekly digest, or monthly digest).',
        },
        {
          step: 2,
          title: 'Receive confirmation',
          description: 'Within 24 hours, the Connect team confirms your alert profile and sends you the current Grant Finder listing as a baseline.',
        },
        {
          step: 3,
          title: 'Receive matched alerts',
          description: 'When new funding opportunities matching your profile are added to the database, you receive an email with the opportunity name, funder, amount, deadline, and eligibility summary.',
        },
        {
          step: 4,
          title: 'Optional: application support',
          description: 'For grant opportunities that require significant preparation, HTR offers grant application support as a scoped advisory engagement. Mention this interest when subscribing.',
        },
      ]}
      emailSubject="Grant Alert Subscription"
      backTab="grants"
      backLabel="Back to Grant Finder"
    />
  )
}
