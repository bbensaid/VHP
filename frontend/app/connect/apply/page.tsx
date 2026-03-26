import ConnectEarlyAccess from '@/components/connect/ConnectEarlyAccess'

export const metadata = {
  title: 'Apply for Cohort Membership | HTR Connect',
  description: 'Apply to join an HTR Connect peer cohort — structured quarterly learning groups for healthcare leaders organized by organization type.',
}

export default function ApplyPage() {
  return (
    <ConnectEarlyAccess
      icon="🤝"
      title="Cohort Membership Application"
      subtitle="Apply to join a structured peer-learning group of organizations like yours. Quarterly convenings, shared benchmarking data, and Chatham House rules."
      features={[
        {
          icon: '📊',
          title: 'HTR National Benchmarking Database',
          description: 'Each convening includes benchmarking data from HTR\'s national health system database, giving your cohort a factual baseline for discussion — not just anecdote.',
        },
        {
          icon: '🔒',
          title: 'Chatham House Rules & Standing NDA',
          description: 'All cohort sessions operate under a standing NDA. Members may share what was discussed but never attribute it to a specific person or organization.',
        },
        {
          icon: '🎓',
          title: 'HTR Faculty Facilitation',
          description: 'Every quarterly convening is facilitated by an HTR faculty member or senior advisor who sets the agenda, moderates discussion, and provides expert context.',
        },
        {
          icon: '🚫',
          title: 'No Competing Organizations',
          description: 'HTR reviews each application against existing cohort membership to ensure no directly competing organizations are placed in the same cohort.',
        },
      ]}
      steps={[
        {
          step: 1,
          title: 'Submit your application',
          description: 'Email connect@htr.com with your organization name, organization type (CAH, ACO, FQHC, etc.), the cohort you are applying for, and a primary contact name and title.',
        },
        {
          step: 2,
          title: 'HTR reviews fit and availability',
          description: 'Within 5 business days, the Connect team reviews your application against cohort size limits, competing organization policy, and current enrollment. We will confirm fit or recommend an alternative cohort.',
        },
        {
          step: 3,
          title: 'Onboarding call (30 min)',
          description: 'A Connect team member walks you through the cohort schedule, benchmarking dashboard, NDA process, and what to expect at your first convening.',
        },
        {
          step: 4,
          title: 'Join your first convening',
          description: 'You receive calendar invites for the next four quarterly sessions. Materials and benchmarking data are distributed one week before each convening.',
        },
      ]}
      emailSubject="Cohort Membership Application"
      backTab="cohorts"
      backLabel="Back to Peer Cohorts"
    />
  )
}
