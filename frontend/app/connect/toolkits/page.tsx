import ConnectEarlyAccess from '@/components/connect/ConnectEarlyAccess'

export const metadata = {
  title: 'Implementation Toolkits | HTR Connect',
  description: 'Access HTR Connect implementation toolkits — ready-to-deploy templates, calculators, and workbooks built from real advisory engagements.',
}

export default function ToolkitsPage() {
  return (
    <ConnectEarlyAccess
      icon="🛠️"
      title="Implementation Toolkits"
      subtitle="Ready-to-deploy templates, calculators, and structured workbooks built from real HTR advisory engagements — stripped of client data and ready for your organization."
      features={[
        {
          icon: '📝',
          title: 'Value-Based Care Contract Template Library',
          description: 'Annotated contract language for shared savings, shared risk, full capitation, and episode-based payment models. Includes risk corridors, quality withholds, and dispute resolution clauses.',
        },
        {
          icon: '🔌',
          title: 'FHIR R4 Implementation Checklist',
          description: 'End-to-end compliance checklist for CMS interoperability rules: Patient Access API, Provider Directory API, Prior Auth API, and Payer-to-Payer data exchange.',
        },
        {
          icon: '📊',
          title: 'Total Cost of Care Benchmarking Workbook',
          description: 'Actuarially-structured Excel model for TCOC baselines, trend projections, risk-adjustment factors, and PMPM targets aligned with CMS benchmarking methodology.',
        },
        {
          icon: '💰',
          title: 'Global Budget Modeling Workbook',
          description: 'Multi-year global budget model calibrated to Vermont GMCB and AHEAD model structures — includes trend decomposition, hospital allocation, and sensitivity analysis.',
        },
        {
          icon: '📋',
          title: '1115 Waiver Application Framework',
          description: 'Annotated template covering STCs structure, budget neutrality demonstration, evaluation design, and public comment process for Section 1115 waiver applications.',
        },
        {
          icon: '👥',
          title: 'Workforce Capacity Planning Tool',
          description: 'Primary care staffing model: panel size optimization, care team configuration, clinician productivity benchmarking, and workforce gap projection.',
        },
      ]}
      steps={[
        {
          step: 1,
          title: 'Request the toolkit by name',
          description: 'Email connect@htr.com with the name of the toolkit(s) you need and a brief description of your use case. Connect members receive access to all 8 current toolkits.',
        },
        {
          step: 2,
          title: 'Verify Connect membership',
          description: 'Toolkit access is a Connect member benefit. If you are not yet a member, the Connect team will explain membership options alongside your toolkit request.',
        },
        {
          step: 3,
          title: 'Receive secure download link',
          description: 'Within 24 hours, you receive a secure, time-limited download link for the requested toolkit files (Excel, Word, or PDF depending on the toolkit).',
        },
        {
          step: 4,
          title: 'Optional: toolkit orientation call',
          description: 'For complex toolkits (e.g., Global Budget Model, TCOC Benchmarking Workbook), a 30-minute orientation call with the authoring advisor is available on request.',
        },
      ]}
      emailSubject="Toolkit Access Request"
      backTab="toolkits"
      backLabel="Back to Toolkits"
    />
  )
}
