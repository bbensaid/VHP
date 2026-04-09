import ConnectEarlyAccess from '@/components/connect/ConnectEarlyAccess'

export const metadata = {
  title: 'Join a Pillar Circle | HTR Connect',
  description: 'Join an HTR Connect Pillar Circle — moderated asynchronous discussion forums organized by the Six-Pillar Framework, with HTR expert responses within 48 hours.',
}

export default function ForumsPage() {
  return (
    <ConnectEarlyAccess
      icon="💬"
      title="Join a Pillar Circle"
      subtitle="Six moderated discussion forums — one per pillar — where healthcare leaders exchange questions, analysis, and experience. Every question answered by a named HTR expert within 48 hours."
      features={[
        {
          icon: '⚖️',
          title: 'Policy & Regulatory Circle',
          description: 'CMS rule-making, 1115 waivers, state plan amendments, GMCB proceedings, and legislative strategy. The most active circle during notice-and-comment periods.',
        },
        {
          icon: '📈',
          title: 'Economics & Finance Circle',
          description: 'TCOC benchmarking, actuarial methods, VBC contract economics, global budgets, risk adjustment, MLR management, and healthcare cost trend analysis.',
        },
        {
          icon: '💻',
          title: 'Technology & Data Circle',
          description: 'FHIR implementation, EHR optimization, AI governance, ONC information blocking, data infrastructure strategy, and digital health evaluation.',
        },
        {
          icon: '🩺',
          title: 'Clinical Quality Circle',
          description: 'HEDIS measure performance, CMS Star Ratings strategy, patient safety frameworks, clinical integration design, quality reporting, and NCQA accreditation.',
        },
        {
          icon: '🌍',
          title: 'Health Equity Circle',
          description: 'SDOH screening and response, CMS health equity measures, disparity data analysis, community benefit strategy, language access, and DEI in clinical settings.',
        },
        {
          icon: '⚙️',
          title: 'Operations Circle',
          description: 'Revenue cycle management, workforce capacity planning, compliance infrastructure, payer network operations, and supply chain strategy for health system transformation.',
        },
      ]}
      steps={[
        {
          step: 1,
          title: 'Choose your circle(s)',
          description: 'Email connect@htr.com with the circle name(s) you want to join and your professional role and organization. Members may join multiple circles.',
        },
        {
          step: 2,
          title: 'Identity verification',
          description: 'The Connect team verifies your professional identity — all circle members engage under their real name and organization. Anonymous participation is not permitted.',
        },
        {
          step: 3,
          title: 'Receive access credentials',
          description: 'Once verified, you receive login credentials for the forum platform, onboarding notes, and a link to the circle\'s pinned resources and recent discussion highlights.',
        },
        {
          step: 4,
          title: 'Post and respond',
          description: 'Ask questions, share analysis, and respond to peers. An HTR moderator reviews all posts and a named HTR expert responds to questions within 48 hours.',
        },
      ]}
      emailSubject="Pillar Circle Access Request"
      backTab="forums"
      backLabel="Back to Pillar Circles"
    />
  )
}
