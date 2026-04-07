'use client'

import Link from 'next/link'
import HubPageTemplate from '@/components/templates/HubPageTemplate'

// ─── Peer Cohorts ─────────────────────────────────────────────────────────────

const COHORTS = [
  {
    id: 'medicaid',
    emoji: '🏛️',
    name: 'State Medicaid & CHIP Agencies',
    description:
      'Directors, deputy directors, and senior policy staff navigating all-payer model design, 1115 waivers, managed care procurement, and CMS reporting requirements.',
    seats: '12 agencies',
    schedule: 'Quarterly convenings · February, May, August, November',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    accentText: 'text-sky-700',
  },
  {
    id: 'cah',
    emoji: '🏥',
    name: 'Critical Access Hospitals',
    description:
      'CEOs and CFOs of CAHs managing cost-per-discharge benchmarking, rural emergency hospital conversion decisions, and CMS flex program compliance.',
    seats: '18 hospitals',
    schedule: 'Quarterly convenings · January, April, July, October',
    accentBg: 'bg-rose-50',
    accentBorder: 'border-rose-200',
    accentText: 'text-rose-700',
  },
  {
    id: 'aco',
    emoji: '🔗',
    name: 'Accountable Care Organizations',
    description:
      'ACO Executive Directors and CMOs in MSSP, ACO REACH, and state-based programs — shared savings strategy, benchmark management, quality scoring, and attribution modeling.',
    seats: '24 ACOs',
    schedule: 'Quarterly convenings · March, June, September, December',
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-200',
    accentText: 'text-indigo-700',
  },
  {
    id: 'plans',
    emoji: '📋',
    name: 'Health Plans — Commercial & Medicaid',
    description:
      'Medical directors and VP-level plan executives addressing VBC contract design, HEDIS/Stars performance, network adequacy, and MLR management.',
    seats: '16 plans',
    schedule: 'Quarterly convenings · February, May, August, November',
    accentBg: 'bg-violet-50',
    accentBorder: 'border-violet-200',
    accentText: 'text-violet-700',
  },
  {
    id: 'fqhc',
    emoji: '🌱',
    name: 'Federally Qualified Health Centers',
    description:
      'FQHC CEOs and CMOs navigating UDS reporting, PCMH recognition, 330 grant management, sliding fee compliance, and community health needs assessments.',
    seats: '20 centers',
    schedule: 'Quarterly convenings · January, April, July, October',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    accentText: 'text-emerald-700',
  },
  {
    id: 'amc',
    emoji: '🎓',
    name: 'Academic Medical Centers',
    description:
      'CMOs, CIOs, and VP-Strategy leaders at teaching hospitals managing dual-mission economics, graduate medical education funding, research commercialization, and health system integration.',
    seats: '10 AMCs',
    schedule: 'Quarterly convenings · March, June, September, December',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    accentText: 'text-amber-700',
  },
  {
    id: 'rural',
    emoji: '🌾',
    name: 'Rural Health Networks & Systems',
    description:
      'Rural network directors and system CEOs working through Rural Health Transformation Program participation, AHEAD model eligibility, telehealth strategy, and workforce pipeline development.',
    seats: '14 networks',
    schedule: 'Quarterly convenings · February, May, August, November',
    accentBg: 'bg-teal-50',
    accentBorder: 'border-teal-200',
    accentText: 'text-teal-700',
  },
]

function PeerCohortsPanel() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-8">
        <div className="flex items-start gap-4 mb-5">
          <span className="text-5xl">🤝</span>
          <div>
            <h2 className="text-2xl font-black text-teal-700 mb-1">Peer Cohorts</h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              Structured peer-learning groups organized by organization type. Each cohort meets
              quarterly — virtually — with a shared agenda, benchmarking data from HTR&apos;s
              national health system database, and facilitated discussion led by an HTR faculty
              member. What happens in cohort stays in cohort: all sessions operate under a standing
              NDA and Chatham House rules.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-4">
          {[
            { value: '7', label: 'cohorts available' },
            { value: '4×', label: 'per year, each cohort' },
            { value: 'Chatham House', label: 'rules apply' },
            { value: 'Open', label: 'accepting applications' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-teal-200">
              <span className="text-teal-600 font-black">{stat.value}</span>
              <span className="text-slate-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COHORTS.map(c => (
          <div key={c.id} className={`rounded-xl border ${c.accentBorder} ${c.accentBg} p-5`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{c.emoji}</span>
              <div>
                <h3 className={`font-black text-base ${c.accentText}`}>{c.name}</h3>
                <span className="text-xs text-slate-500 font-semibold">{c.seats} capacity</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">{c.description}</p>
            <div className="text-xs text-slate-500 font-semibold border-t border-slate-200 pt-2">
              {c.schedule}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <h3 className="font-black text-slate-900 text-lg mb-1">Apply for Cohort Membership</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Cohorts maintain 10–25 members per group to preserve candor. New applications are
            reviewed each quarter. HTR reserves the right to decline competing organizations within
            the same cohort.
          </p>
        </div>
        <Link
          href="/connect/apply"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow whitespace-nowrap"
        >
          Apply for Membership →
        </Link>
      </div>
    </div>
  )
}

// ─── Office Hours ─────────────────────────────────────────────────────────────

const OFFICE_HOURS = [
  {
    id: 'policy',
    emoji: '⚖️',
    pillar: 'Policy',
    title: 'Policy & Regulatory Office Hours',
    frequency: '1st Tuesday of each month · 12:00–1:00 PM ET',
    description:
      "Open Q&A on CMS rule-making, 1115 waivers, state plan amendments, legislative strategy, and regulatory compliance. Facilitated by HTR's Policy practice lead.",
    audience: 'Medicaid directors, compliance officers, government affairs staff, hospital regulatory leads',
    pillarCls: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'economics',
    emoji: '📈',
    pillar: 'Economics',
    title: 'Health Economics & Finance Office Hours',
    frequency: '2nd Wednesday of each month · 1:00–2:00 PM ET',
    description:
      'Deep dives into TCOC benchmarking, global budget design, actuarial methods, VBC contract economics, and healthcare cost trend analysis.',
    audience: 'CFOs, actuaries, health economists, revenue cycle directors, finance VPs',
    pillarCls: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'technology',
    emoji: '💻',
    pillar: 'Technology',
    title: 'Technology & Data Governance Office Hours',
    frequency: '3rd Thursday of each month · 2:00–3:00 PM ET',
    description:
      "FHIR interoperability, EHR optimization, AI governance, ONC compliance, and health data infrastructure. Facilitated by HTR's Health IT practice lead.",
    audience: 'CIOs, CDOs, data engineers, EHR project managers, informatics directors',
    pillarCls: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'clinical',
    emoji: '🩺',
    pillar: 'Clinical',
    title: 'Clinical Quality & Safety Office Hours',
    frequency: '4th Tuesday of each month · 11:00 AM–12:00 PM ET',
    description:
      'HEDIS measure performance, CMS Star Ratings strategy, patient safety frameworks, clinical integration design, and quality reporting optimization.',
    audience: 'CMOs, quality officers, patient safety directors, clinical informaticists, NCQA staff',
    pillarCls: 'bg-red-100 text-red-700',
  },
  {
    id: 'equity',
    emoji: '🌍',
    pillar: 'Equity',
    title: 'Health Equity Office Hours',
    frequency: 'Last Friday of each month · 12:00–1:00 PM ET',
    description:
      'SDOH screening implementation, CMS health equity measures, disparity data analysis, community benefit strategy, and DEI frameworks in clinical settings.',
    audience:
      'Chief Equity Officers, community health directors, population health leads, SDOH program managers',
    pillarCls: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'open',
    emoji: '🎤',
    pillar: 'Open',
    title: 'Open HTR Expert Session',
    frequency: 'Every other Monday · 4:00–5:00 PM ET',
    description:
      'No fixed topic — bring any question across all six pillars. Two HTR senior advisors on every call. Recorded and distributed to registered participants.',
    audience: 'All Connect members — no restriction by role or org type',
    pillarCls: 'bg-slate-200 text-slate-700',
  },
]

function OfficeHoursPanel() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-8">
        <div className="flex items-start gap-4 mb-5">
          <span className="text-5xl">📅</span>
          <div>
            <h2 className="text-2xl font-black text-teal-700 mb-1">Expert Office Hours</h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              Open-access sessions with HTR faculty and senior advisors — no engagement required, no
              agenda to submit in advance. Ask anything. Sessions are organized by the Five-Pillar
              Framework with a rotating monthly schedule. All sessions are recorded; recordings are
              available to registered Connect members for 90 days.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-4">
          {[
            { value: '6', label: 'session types monthly' },
            { value: '60 min', label: 'each session' },
            { value: 'Recorded', label: '90-day access' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-teal-200">
              <span className="text-teal-600 font-black">{stat.value}</span>
              <span className="text-slate-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {OFFICE_HOURS.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shrink-0">
                {s.emoji}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-black text-slate-900 text-base">{s.title}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${s.pillarCls}`}>
                    {s.pillar}
                  </span>
                </div>
                <p className="text-xs font-bold text-teal-700 mb-2">{s.frequency}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-2">{s.description}</p>
                <p className="text-xs text-slate-500">
                  <span className="font-semibold">Best for:</span> {s.audience}
                </p>
              </div>
              <Link
                href="/connect/register-office-hours"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow whitespace-nowrap self-start"
              >
                Register →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Implementation Toolkits ──────────────────────────────────────────────────

const TOOLKITS = [
  {
    id: 'vbc-contracts',
    emoji: '📝',
    name: 'Value-Based Care Contract Template Library',
    description:
      'Annotated contract language for shared savings, shared risk, full capitation, and episode-based payment models — with guidance on risk corridors, quality withholds, and dispute resolution.',
    formats: ['Word', 'PDF'],
    pillars: ['Economics', 'Policy'],
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    accentText: 'text-emerald-700',
    pillarCls: ['bg-emerald-100 text-emerald-700', 'bg-sky-100 text-sky-700'],
  },
  {
    id: 'fhir',
    emoji: '🔌',
    name: 'FHIR R4 Implementation Checklist',
    description:
      'End-to-end compliance checklist for CMS interoperability rules: Patient Access API, Provider Directory API, Prior Auth API, and Payer-to-Payer data exchange requirements.',
    formats: ['Excel', 'PDF'],
    pillars: ['Technology', 'Policy'],
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-200',
    accentText: 'text-indigo-700',
    pillarCls: ['bg-indigo-100 text-indigo-700', 'bg-sky-100 text-sky-700'],
  },
  {
    id: 'equity',
    emoji: '⚖️',
    name: 'Health Equity Action Plan Builder',
    description:
      'Structured workbook for stratifying HEDIS/CMS measures by race, ethnicity, and language; setting disparity reduction targets; and tracking SDOH screening deployment.',
    formats: ['Excel'],
    pillars: ['Equity', 'Clinical'],
    accentBg: 'bg-orange-50',
    accentBorder: 'border-orange-200',
    accentText: 'text-orange-700',
    pillarCls: ['bg-orange-100 text-orange-700', 'bg-red-100 text-red-700'],
  },
  {
    id: 'tcoc',
    emoji: '📊',
    name: 'Total Cost of Care Benchmarking Workbook',
    description:
      "Actuarially-structured Excel model for building TCOC baselines, trend projections, risk-adjustment factors, and per-member per-month targets aligned with CMS benchmarking methodology.",
    formats: ['Excel'],
    pillars: ['Economics'],
    accentBg: 'bg-green-50',
    accentBorder: 'border-green-200',
    accentText: 'text-green-700',
    pillarCls: ['bg-emerald-100 text-emerald-700'],
  },
  {
    id: '1115-waiver',
    emoji: '📋',
    name: '1115 Waiver Application Framework',
    description:
      'Annotated template for Section 1115 Research and Demonstration Waiver applications: STCs structure, budget neutrality demonstration, evaluation design, and public comment process.',
    formats: ['Word', 'PDF'],
    pillars: ['Policy', 'Economics'],
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    accentText: 'text-sky-700',
    pillarCls: ['bg-sky-100 text-sky-700', 'bg-emerald-100 text-emerald-700'],
  },
  {
    id: 'aco-reach',
    emoji: '🎯',
    name: 'ACO REACH Quality Reporting Templates',
    description:
      'Pre-formatted reporting templates for all ACO REACH quality measures: CAHPS for ACOs, readmission rates, unplanned admissions, and the Whole-Person Care measures introduced in 2024.',
    formats: ['Excel', 'Word'],
    pillars: ['Clinical', 'Economics'],
    accentBg: 'bg-red-50',
    accentBorder: 'border-red-200',
    accentText: 'text-red-700',
    pillarCls: ['bg-red-100 text-red-700', 'bg-emerald-100 text-emerald-700'],
  },
  {
    id: 'global-budget',
    emoji: '💰',
    name: 'Global Budget Modeling Workbook',
    description:
      'Multi-year global budget model with trend decomposition, hospital-specific spending allocation, performance corridor design, and sensitivity analysis — calibrated to the Vermont GMCB and AHEAD model structures.',
    formats: ['Excel'],
    pillars: ['Economics', 'Policy'],
    accentBg: 'bg-fuchsia-50',
    accentBorder: 'border-fuchsia-200',
    accentText: 'text-fuchsia-700',
    pillarCls: ['bg-emerald-100 text-emerald-700', 'bg-sky-100 text-sky-700'],
  },
  {
    id: 'workforce',
    emoji: '👥',
    name: 'Workforce Capacity Planning Tool',
    description:
      'Staffing model for primary care transformation: panel size optimization, care team configuration, visit-type distribution, clinician productivity benchmarking, and workforce gap projection.',
    formats: ['Excel'],
    pillars: ['Clinical', 'Economics'],
    accentBg: 'bg-violet-50',
    accentBorder: 'border-violet-200',
    accentText: 'text-violet-700',
    pillarCls: ['bg-red-100 text-red-700', 'bg-emerald-100 text-emerald-700'],
  },
]

function ToolkitsPanel() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-8">
        <div className="flex items-start gap-4 mb-5">
          <span className="text-5xl">🛠️</span>
          <div>
            <h2 className="text-2xl font-black text-teal-700 mb-1">Implementation Toolkits</h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              Ready-to-deploy templates, calculators, and structured workbooks built by HTR&apos;s
              advisory teams from real engagements. These are the actual tools — stripped of
              client-identifiable data — that our advisors use on projects. Access is included with
              Connect membership; custom toolkit development is available as an add-on.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-4">
          {[
            { value: '8', label: 'toolkits available' },
            { value: 'Quarterly', label: 'new additions' },
            { value: 'Members only', label: 'full access' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-teal-200">
              <span className="text-teal-600 font-black">{stat.value}</span>
              <span className="text-slate-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TOOLKITS.map(t => (
          <div key={t.id} className={`rounded-xl border ${t.accentBorder} ${t.accentBg} p-5`}>
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{t.emoji}</span>
              <div className="flex-1">
                <h3 className={`font-black text-sm ${t.accentText} mb-1`}>{t.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {t.formats.map(f => (
                    <span
                      key={f}
                      className="text-[10px] font-bold bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded"
                    >
                      {f}
                    </span>
                  ))}
                  {t.pillars.map((p, i) => (
                    <span
                      key={p}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${t.pillarCls[i] ?? 'bg-slate-100 text-slate-600'}`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">{t.description}</p>
            <Link
              href="/connect/toolkits"
              className={`inline-flex items-center gap-1.5 text-xs font-black ${t.accentText} hover:underline`}
            >
              Access Toolkit →
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <h3 className="font-black text-slate-900 text-lg mb-1">Need a Custom Toolkit?</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            HTR can develop organization-specific toolkits grounded in your data, contract
            structures, and operating environment. Custom toolkit development is scoped as a
            lightweight advisory engagement.
          </p>
        </div>
        <Link
          href="/advisory/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow whitespace-nowrap"
        >
          Request Custom Toolkit →
        </Link>
      </div>
    </div>
  )
}

// ─── Grant & Funding Finder ───────────────────────────────────────────────────

const GRANTS = [
  {
    id: 'aco-reach',
    name: 'CMS ACO REACH Model',
    agency: 'Centers for Medicare & Medicaid Services',
    amount: 'Performance-based — no upfront award',
    deadline: 'Rolling — next application window: Q2 2025',
    eligibility: 'Physician group practices, ACOs, and conveners with ≥500 aligned Medicare beneficiaries',
    pillars: ['Economics', 'Clinical'],
    status: 'Open',
    statusCls: 'bg-emerald-100 text-emerald-700',
    pillarCls: ['bg-emerald-100 text-emerald-700', 'bg-red-100 text-red-700'],
  },
  {
    id: 'rhtp',
    name: 'Rural Health Transformation Program',
    agency: 'HRSA / CMS',
    amount: 'Up to $25M per state · 50-state program',
    deadline: 'State applications open — contact HRSA regional office',
    eligibility: 'State Medicaid agencies and designated rural health networks',
    pillars: ['Policy', 'Economics'],
    status: 'Open',
    statusCls: 'bg-emerald-100 text-emerald-700',
    pillarCls: ['bg-sky-100 text-sky-700', 'bg-emerald-100 text-emerald-700'],
  },
  {
    id: 'ahead',
    name: 'AHEAD Model Participation',
    agency: 'CMS Innovation Center (CMMI)',
    amount: 'Quality incentive payments · $1B+ committed across 6 states',
    deadline: 'Current cohort closed; next state intake TBD',
    eligibility: 'State Medicaid agencies and multi-payer collaboratives in eligible states',
    pillars: ['Policy', 'Economics'],
    status: 'Watch',
    statusCls: 'bg-amber-100 text-amber-700',
    pillarCls: ['bg-sky-100 text-sky-700', 'bg-emerald-100 text-emerald-700'],
  },
  {
    id: 'ccbhc',
    name: 'SAMHSA CCBHC Expansion Grants',
    agency: 'Substance Abuse and Mental Health Services Administration',
    amount: '$2M–$4M per grantee · $200M total program',
    deadline: 'Fiscal year grant cycles — check SAMHSA.gov for active NOFAs',
    eligibility: 'Certified Community Behavioral Health Clinics and state-designated applicants',
    pillars: ['Clinical', 'Equity'],
    status: 'Recurring',
    statusCls: 'bg-indigo-100 text-indigo-700',
    pillarCls: ['bg-red-100 text-red-700', 'bg-orange-100 text-orange-700'],
  },
  {
    id: 'hrsa-hcqi',
    name: 'HRSA Health Center Quality Improvement',
    agency: 'HRSA Bureau of Primary Health Care',
    amount: 'Quality improvement bonus payments — performance-based',
    deadline: 'Annual cycle tied to UDS reporting period',
    eligibility: 'Section 330 Health Center grantees in good standing',
    pillars: ['Clinical', 'Equity'],
    status: 'Recurring',
    statusCls: 'bg-indigo-100 text-indigo-700',
    pillarCls: ['bg-red-100 text-red-700', 'bg-orange-100 text-orange-700'],
  },
  {
    id: 'cdc-phig',
    name: 'CDC Public Health Infrastructure Grants',
    agency: 'Centers for Disease Control and Prevention',
    amount: '$3.5B program · state and local health department allocations',
    deadline: 'Formula-based; supplemental competitive components announced annually',
    eligibility: 'State, territorial, local, and tribal health departments',
    pillars: ['Policy', 'Equity'],
    status: 'Recurring',
    statusCls: 'bg-indigo-100 text-indigo-700',
    pillarCls: ['bg-sky-100 text-sky-700', 'bg-orange-100 text-orange-700'],
  },
  {
    id: 'rwjf',
    name: 'RWJF Health Systems Innovation Initiative',
    agency: 'Robert Wood Johnson Foundation',
    amount: '$500K–$2M per project',
    deadline: 'LOI cycles — typically March and September',
    eligibility: 'Non-profit health systems, research institutions, and community organizations',
    pillars: ['Equity', 'Clinical', 'Policy'],
    status: 'Open',
    statusCls: 'bg-emerald-100 text-emerald-700',
    pillarCls: ['bg-orange-100 text-orange-700', 'bg-red-100 text-red-700', 'bg-sky-100 text-sky-700'],
  },
  {
    id: 'commonwealth',
    name: 'Commonwealth Fund — State Health System Performance',
    agency: 'The Commonwealth Fund',
    amount: 'Up to $1M for multi-year projects',
    deadline: 'Invitation-based; unsolicited proposals accepted via online portal',
    eligibility: 'State health agencies, non-profits, and research organizations focused on state-level reform',
    pillars: ['Policy', 'Economics', 'Equity'],
    status: 'Watch',
    statusCls: 'bg-amber-100 text-amber-700',
    pillarCls: ['bg-sky-100 text-sky-700', 'bg-emerald-100 text-emerald-700', 'bg-orange-100 text-orange-700'],
  },
]

function GrantFinderPanel() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-8">
        <div className="flex items-start gap-4 mb-5">
          <span className="text-5xl">💵</span>
          <div>
            <h2 className="text-2xl font-black text-teal-700 mb-1">Grant & Funding Finder</h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              A curated, continuously updated database of federal, state, and philanthropic funding
              opportunities relevant to health system transformation. HTR researchers monitor CMS
              NOFA releases, HRSA grant cycles, and foundation program announcements — so you
              don&apos;t have to. Connect members can subscribe to pillar-specific alerts.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 items-center">
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-emerald-100 text-emerald-700 border-emerald-200">
            ● Open
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-indigo-100 text-indigo-700 border-indigo-200">
            ↺ Recurring
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-amber-100 text-amber-700 border-amber-200">
            ◎ Watch
          </span>
          <span className="text-xs text-slate-500 ml-1">Status legend</span>
        </div>
      </div>

      <div className="space-y-3">
        {GRANTS.map(g => (
          <div key={g.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-black text-slate-900 text-base">{g.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${g.statusCls}`}>
                    {g.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mb-3">{g.agency}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-600 mb-3">
                  <div>
                    <span className="font-bold text-slate-700 block text-xs uppercase tracking-wide mb-0.5">Amount</span>
                    {g.amount}
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block text-xs uppercase tracking-wide mb-0.5">Deadline</span>
                    {g.deadline}
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block text-xs uppercase tracking-wide mb-0.5">Eligibility</span>
                    {g.eligibility}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {g.pillars.map((p, i) => (
                    <span
                      key={p}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${g.pillarCls[i] ?? 'bg-slate-100 text-slate-600'}`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <h3 className="font-black text-slate-900 text-lg mb-1">Subscribe to Funding Alerts</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Receive email notifications when new funding opportunities are added that match your
            organization type and pillar interests. HTR also offers grant application support as a
            scoped advisory engagement.
          </p>
        </div>
        <Link
          href="/connect/alerts"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow whitespace-nowrap"
        >
          Subscribe to Alerts →
        </Link>
      </div>
    </div>
  )
}

// ─── Pillar Circles (Forums) ──────────────────────────────────────────────────

const CIRCLES = [
  {
    id: 'policy',
    emoji: '⚖️',
    name: 'Policy & Regulatory Circle',
    description:
      'CMS rule-making, 1115 waivers, state plan amendments, legislative strategy, GMCB proceedings, and all things regulatory. The most active circle during notice-and-comment periods.',
    members: 342,
    recentPosts: 89,
    topicExample: 'Latest: "1115 waiver STCs — what language is CMS actually approving in 2025?"',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    accentText: 'text-sky-700',
    statCls: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'economics',
    emoji: '📈',
    name: 'Economics & Finance Circle',
    description:
      'TCOC benchmarking, actuarial methods, VBC contract economics, global budgets, risk adjustment, MLR management, and healthcare cost trend analysis.',
    members: 218,
    recentPosts: 56,
    topicExample: "Latest: \"HCC risk adjustment validation — what's the audit exposure under ACO REACH?\"",
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    accentText: 'text-emerald-700',
    statCls: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'technology',
    emoji: '💻',
    name: 'Technology & Data Circle',
    description:
      'FHIR implementation, EHR optimization, AI governance, ONC information blocking, data infrastructure strategy, and digital health evaluation.',
    members: 267,
    recentPosts: 71,
    topicExample: "Latest: \"Prior Auth API compliance — who's actually done it and what did it cost?\"",
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-200',
    accentText: 'text-indigo-700',
    statCls: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'clinical',
    emoji: '🩺',
    name: 'Clinical Quality Circle',
    description:
      'HEDIS measure performance, CMS Star Ratings strategy, patient safety frameworks, clinical integration design, quality reporting, and NCQA accreditation.',
    members: 195,
    recentPosts: 48,
    topicExample: "Latest: \"HEDIS MY2025 spec changes — which measures are organizations struggling with?\"",
    accentBg: 'bg-red-50',
    accentBorder: 'border-red-200',
    accentText: 'text-red-700',
    statCls: 'bg-red-100 text-red-700',
  },
  {
    id: 'equity',
    emoji: '🌍',
    name: 'Health Equity Circle',
    description:
      'SDOH screening and response, CMS health equity measures, disparity data analysis, community benefit strategy, language access, and DEI in clinical settings.',
    members: 283,
    recentPosts: 94,
    topicExample: "Latest: \"AHC screening deployment — what's the referral close-out rate in your market?\"",
    accentBg: 'bg-orange-50',
    accentBorder: 'border-orange-200',
    accentText: 'text-orange-700',
    statCls: 'bg-orange-100 text-orange-700',
  },
]

function ForumsPanel() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-8">
        <div className="flex items-start gap-4 mb-5">
          <span className="text-5xl">💬</span>
          <div>
            <h2 className="text-2xl font-black text-teal-700 mb-1">Pillar Circles</h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              Asynchronous discussion forums organized by the Five-Pillar Framework — moderated by
              HTR faculty and senior advisors. Each circle maintains a topic focus and a minimum
              standard for discourse. An HTR expert responds to questions within 48 hours. Anonymous
              posting is not permitted; members engage under their professional identity.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-4">
          {[
            { value: '5', label: 'pillar circles' },
            { value: '48h', label: 'HTR expert response SLA' },
            { value: 'Real names', label: 'only — no anonymous posts' },
            { value: 'Open', label: 'accepting founding members' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-teal-200">
              <span className="text-teal-600 font-black">{stat.value}</span>
              <span className="text-slate-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {CIRCLES.map(f => (
          <div key={f.id} className={`rounded-2xl border ${f.accentBorder} ${f.accentBg} p-6`}>
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shrink-0">
                {f.emoji}
              </div>
              <div className="flex-1">
                <h3 className={`font-black text-lg ${f.accentText} mb-1`}>{f.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{f.description}</p>
                <p className="text-xs text-slate-500 italic mb-3">{f.topicExample}</p>
                <div className="flex flex-wrap gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${f.statCls}`}>
                    Open · founding members
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                    Named HTR moderator
                  </span>
                </div>
              </div>
              <Link
                href="/connect/forums"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow whitespace-nowrap self-start"
              >
                Join Circle →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Ask HTR ──────────────────────────────────────────────────────────────────

const FEATURED_QA = [
  {
    id: 'aco-rural',
    pillar: 'Policy',
    pillarCls: 'bg-sky-100 text-sky-700',
    q: 'What are the key regulatory considerations for launching an MSSP ACO in a predominantly rural state?',
    a: "Rural MSSP ACOs face three compounding challenges: (1) minimum beneficiary thresholds — the 5,000 Medicare beneficiary floor is difficult to meet in low-density markets, making regional convener models worth exploring; (2) attribution methodology — claims-based attribution consistently under-counts rural patient panels where multiple providers share care across long distances; (3) benchmark design — CMS's regional expenditure benchmarks disadvantage historically low-cost rural markets, a structural inequity that HTR's testimony to CMS has flagged repeatedly. For a rural state launch, we typically recommend a phased approach: start with a Track 1 shared-savings model using a convener structure, build the data infrastructure for 18–24 months, then apply for advanced track participation.",
    askedBy: 'Medicaid Director, New England State Agency',
    answeredBy: 'HTR Policy Practice Lead',
  },
  {
    id: 'fhir-roadmap',
    pillar: 'Technology',
    pillarCls: 'bg-indigo-100 text-indigo-700',
    q: 'How should we sequence our FHIR R4 compliance roadmap given CMS interoperability and prior authorization rules?',
    a: 'The 2024 CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F) creates a sequenced compliance ladder: Patient Access API and Provider Directory API were enforcement-priority in 2026; the Prior Authorization API and the Payer-to-Payer exchange requirements phase in through 2027. For sequencing, we recommend: first, audit your current HL7 v2 and CDA infrastructure to identify FHIR R4 translation gaps; second, prioritize the Patient Access API because it has the widest audit surface and patient complaint risk; third, build a SMART on FHIR authorization layer before touching Prior Auth API since that dependency will block you otherwise. The ONC Information Blocking rules run parallel — do not treat them as a separate workstream; they share the same data availability requirements.',
    askedBy: 'Chief Information Officer, Regional Health Plan',
    answeredBy: 'HTR Health IT Practice Lead',
  },
  {
    id: 'global-budget',
    pillar: 'Economics',
    pillarCls: 'bg-emerald-100 text-emerald-700',
    q: 'What financial benchmarking methodology does HTR use when helping a state design a hospital global budget?',
    a: "HTR's global budget framework draws from three primary data sources: HCRIS (Medicare cost reports), AHRQ HCUP state inpatient databases, and CMS Medicare claims — triangulated against GMCB public data where available. For benchmark construction, we use a base-period expenditure approach (typically a 3-year average, weighted for trend), then apply a growth rate cap derived from state GDP growth or a negotiated percentage — whichever is lower. The critical technical question is risk adjustment: global budgets should adjust for changes in case mix index and population demographics over time, or hospitals will face structural underpayment in aging markets. We also recommend building explicit carve-out categories for pass-through payments (capital, DSH, GME) so the global budget operates on a clean operating-cost base. The Vermont GMCB model is the most mature reference point; the AHEAD model builds on it with modifications for multi-payer all-inclusive populations.",
    askedBy: 'Deputy Director, State Office of Health Care Affordability',
    answeredBy: 'HTR Health Economics Practice Lead',
  },
]

function AskHTRPanel() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-8">
        <div className="flex items-start gap-4 mb-5">
          <span className="text-5xl">❓</span>
          <div>
            <h2 className="text-2xl font-black text-teal-700 mb-1">Ask HTR</h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              Submit any question on healthcare transformation to HTR&apos;s advisory team. We
              respond within 48 business hours. Answered questions — with permission — are added to
              the searchable Q&amp;A library below, organized by pillar. This is not a chatbot:
              every answer is written by a named HTR advisor who puts their credentials behind the
              response. Think of it as free access to the first 20 minutes of an advisory
              engagement.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-4">
          {[
            { value: '48h', label: 'response commitment' },
            { value: 'Named', label: 'HTR advisor on every answer' },
            { value: 'Public', label: 'Q&A library (launching soon)' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-teal-200">
              <span className="text-teal-600 font-black">{stat.value}</span>
              <span className="text-slate-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-teal-200 rounded-2xl p-6">
        <h3 className="font-black text-slate-900 text-lg mb-2">Submit a Question</h3>
        <p className="text-slate-600 text-sm mb-4">
          Questions can be submitted by Connect members. If your question involves confidential
          organizational data, mark it as private — it will be answered but not added to the public
          library.
        </p>
        <div className="flex flex-col md:flex-row gap-3">
          <Link
            href="/connect/ask"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow"
          >
            Submit a Question →
          </Link>
          <Link
            href="/connect/ask?browse=true"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors"
          >
            Browse Full Q&amp;A Library
          </Link>
        </div>
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-xl mb-4">Featured Q&amp;A</h3>
        <div className="space-y-6">
          {FEATURED_QA.map(qa => (
            <div key={qa.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-black text-sm shrink-0">
                    Q
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${qa.pillarCls}`}>
                        {qa.pillar}
                      </span>
                      <span className="text-xs text-slate-400">{qa.askedBy}</span>
                    </div>
                    <p className="text-slate-800 font-semibold text-base leading-relaxed">{qa.q}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 font-black text-sm shrink-0">
                    A
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-teal-700 mb-2">{qa.answeredBy}</p>
                    <p className="text-slate-700 text-sm leading-relaxed">{qa.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

const CONNECT_STATS = [
  { value: '7', label: 'peer cohorts' },
  { value: '6', label: 'monthly office hours sessions' },
  { value: '8', label: 'toolkits available' },
  { value: '5', label: 'pillar circles' },
]

export default function ConnectHubClient() {
  const statsStr = CONNECT_STATS.map(s => `${s.value} ${s.label}`).join(' · ')

  return (
    <HubPageTemplate
      badgeLabel="HTR Connect · Early Access"
      badgeClass="bg-teal-50 text-teal-700 border border-teal-100"
      title="HTR Connect"
      subtitle={`Peer cohorts, expert office hours, implementation toolkits, and direct access to HTR advisors — ${statsStr}`}
      backLink="/"
      backLabel="← Home"
      backLinkHoverClass="hover:text-teal-600"
      tabs={[
        {
          id: 'cohorts',
          icon: <span>🤝</span>,
          label: 'Peer Cohorts',
          content: <PeerCohortsPanel />,
        },
        {
          id: 'office-hours',
          icon: <span>📅</span>,
          label: 'Office Hours',
          content: <OfficeHoursPanel />,
        },
        {
          id: 'toolkits',
          icon: <span>🛠️</span>,
          label: 'Toolkits',
          content: <ToolkitsPanel />,
        },
        {
          id: 'grants',
          icon: <span>💵</span>,
          label: 'Grant Finder',
          content: <GrantFinderPanel />,
        },
        {
          id: 'forums',
          icon: <span>💬</span>,
          label: 'Pillar Circles',
          content: <ForumsPanel />,
        },
        {
          id: 'ask',
          icon: <span>❓</span>,
          label: 'Ask HTR',
          content: <AskHTRPanel />,
        },
      ]}
    />
  )
}
