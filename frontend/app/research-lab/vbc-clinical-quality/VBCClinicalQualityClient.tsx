'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const HL7FHIRExplorer           = dynamic(() => import('@/components/research/HL7FHIRExplorer'),           { ssr: false })
const VBCQualityDashboard       = dynamic(() => import('@/components/research/VBCQualityDashboard'),       { ssr: false })
const HighLowValueCare          = dynamic(() => import('@/components/research/HighLowValueCare'),          { ssr: false })
const RiskStratificationMethodology = dynamic(() => import('@/components/research/RiskStratificationMethodology'), { ssr: false })

function ToolHeader({ icon, label, badge, desc }: { icon: string; label: string; badge: string; desc: string }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="ty-h3 font-black text-slate-900">{label}</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
          {badge}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-9">{desc}</p>
    </div>
  )
}

const TABS = [
  {
    id: 'hl7',
    icon: '🔌',
    label: 'Clinical Data Exchange',
    badge: 'HL7 · FHIR · USCDI',
    desc: 'Annotated HL7 v2 messages (ADT/ORU), FHIR R4 resource bundles, HL7↔FHIR side-by-side bridge, and USCDI v3 data element browser — all anchored to 8 Vermont patient scenarios.',
  },
  {
    id: 'quality',
    icon: '📋',
    label: 'VBC Quality Measures',
    badge: 'HEDIS · Readmissions · ACSC',
    desc: 'HEDIS measure panel with numerator/denominator logic, 30-day readmission analysis using CMS RSRR methodology, and AHRQ Prevention Quality Indicator (PQI) avoidable ED classification.',
  },
  {
    id: 'value',
    icon: '💰',
    label: 'High vs. Low Value Care',
    badge: 'A1C · BP · Choosing Wisely · TCOC',
    desc: 'A1C and blood pressure panel management with VBC shared savings calculations, Choosing Wisely low-value care scan, and total cost of care decomposition by service category.',
  },
  {
    id: 'risk',
    icon: '📊',
    label: 'Risk Stratification',
    badge: 'HCC v28 · ACG · CDPS · Charlson',
    desc: 'Step-by-step HCC v28 RAF score calculation for each patient, population tier stratification pyramid, and comparative analysis of major risk adjustment algorithms including Johns Hopkins ACG.',
  },
]

const VALID_TABS = TABS.map(t => t.id)
const DEFAULT_TAB = 'hl7'

export default function VBCClinicalQualityClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const rawTab = searchParams.get('tab') ?? ''
  const activeTab = VALID_TABS.includes(rawTab) ? rawTab : DEFAULT_TAB

  function setTab(id: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', id)
    router.push(`${pathname}?${params.toString()}`)
  }

  const activeTabMeta = TABS.find(t => t.id === activeTab)!

  return (
    <LabPageShell
      icon="🏥"
      label="VBC & Clinical Quality Lab"
      desc="Synthetic Vermont patient scenarios covering clinical data exchange (HL7/FHIR/USCDI), HEDIS quality measures, 30-day readmissions, avoidable ED visits, high vs. low value care analysis, and HCC risk stratification methodology."
      accentClass="bg-rose-600"
      accentLight="bg-rose-100 text-rose-700"
      currentHref="/research-lab/vbc-clinical-quality"
      practiceHref="/advisory/it-consulting"
      practiceLabel="Clinical Quality Consulting"
      practiceIcon="🩺"
      toolParam="VBC & Clinical Quality Lab"
      advisoryBullets={[
        'Design and implement a HEDIS gap closure program for your attributed population',
        'Build HCC-accurate coding and documentation programs to optimize VBC risk adjustment',
        'Develop a 30-day readmission reduction strategy with TCM protocols and care transitions infrastructure',
        'Implement high vs. low value care analysis to identify $1M+ in modifiable spend in your ACO',
      ]}
    >
      {/* Tab navigation */}
      <nav className="flex flex-wrap items-end border border-slate-200 rounded-t-xl px-2 bg-slate-50/80 backdrop-blur-sm pt-2 gap-y-1 mb-8">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-1 ${
              activeTab === tab.id
                ? 'bg-slate-100 border-slate-800 text-slate-900 z-10 -mb-px'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 mt-1.5 shadow-sm'
            }`}
          >
            <span className="hidden sm:inline">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Active tool */}
      <ToolHeader
        icon={activeTabMeta.icon}
        label={activeTabMeta.label}
        badge={activeTabMeta.badge}
        desc={activeTabMeta.desc}
      />

      {activeTab === 'hl7'     && <HL7FHIRExplorer />}
      {activeTab === 'quality' && <VBCQualityDashboard />}
      {activeTab === 'value'   && <HighLowValueCare />}
      {activeTab === 'risk'    && <RiskStratificationMethodology />}
    </LabPageShell>
  )
}
