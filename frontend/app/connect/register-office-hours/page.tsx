import ConnectEarlyAccess from '@/components/connect/ConnectEarlyAccess'

export const metadata = {
  title: 'Register for Office Hours | HTR Connect',
  description: 'Register for HTR Connect expert office hours — monthly open-access sessions with HTR faculty and senior advisors across all Six Pillars.',
}

export default function RegisterOfficeHoursPage() {
  return (
    <ConnectEarlyAccess
      icon="📅"
      title="Office Hours Registration"
      subtitle="Reserve your spot in an upcoming HTR expert session. No agenda required — bring any question across the Six Pillars."
      features={[
        {
          icon: '🎤',
          title: 'No Engagement Required',
          description: 'Office hours are open to all Connect members regardless of whether you have an active advisory engagement. There is no agenda to submit — just show up and ask.',
        },
        {
          icon: '🔴',
          title: 'Live with Senior Advisors',
          description: 'Every session is staffed by at least one HTR principal-level advisor. The Open HTR Expert Session always has two. These are not junior staff or moderators.',
        },
        {
          icon: '🎬',
          title: 'Recorded — 90-Day Access',
          description: 'All sessions are recorded. Registered participants receive access to the recording within 24 hours and can re-watch it for 90 days.',
        },
        {
          icon: '📋',
          title: 'Five-Pillar Schedule',
          description: 'Six sessions monthly, each anchored to one of the Six Pillars (Policy, Economics, Technology, Clinical, Equity) plus one open cross-pillar session every other week.',
        },
      ]}
      steps={[
        {
          step: 1,
          title: 'Choose your session',
          description: 'Email connect@htr.com with the session name and date you want to attend (e.g., "Policy & Regulatory Office Hours — next available"). We will confirm availability.',
        },
        {
          step: 2,
          title: 'Receive calendar invite',
          description: 'Within 24 hours you will receive a calendar invite with the video conference link, session facilitator, and any relevant pre-reading materials.',
        },
        {
          step: 3,
          title: 'Attend and ask',
          description: 'Join the session at the scheduled time. Questions are taken live — no pre-submission required. Sessions run 60 minutes.',
        },
        {
          step: 4,
          title: 'Receive recording',
          description: 'Within 24 hours of the session, registered participants receive a link to the recording. Access remains active for 90 days.',
        },
      ]}
      emailSubject="Office Hours Registration"
      backTab="office-hours"
      backLabel="Back to Office Hours"
    />
  )
}
