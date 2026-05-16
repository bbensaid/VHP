import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Vermont SDOH & Social Services | HTR States",
  description: "Vermont's social determinants of health ecosystem — 2-1-1 Vermont, community action agencies, food security programs, housing resources, and how they connect to Blueprint CHTs, VCCI, SASH, and the healthcare system.",
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-orange-700 hover:text-orange-900 underline underline-offset-2 transition-colors">
      {children}
      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 shrink-0" />
    </a>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="text-xs font-black uppercase tracking-widest text-orange-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const SDOH_DOMAINS = [
  {
    domain: "Housing Instability",
    icd10: "Z59.0–Z59.9",
    loincScreen: "71802-3",
    vciFlag: "6 pts",
    prevalence: "18–24% positive screen in Vermont safety-net settings",
    resources: ["Vermont 2-1-1", "Champlain Housing Trust", "Vermont Housing Finance Agency (VHFA)", "Section 8 / Housing Choice Voucher", "Rapid Rehousing programs"],
    healthConnection: "Housing instability is the strongest single predictor of ED overuse in Vermont. VCCI assigns 6 pts (highest SDOH domain weight) for homelessness. Blueprint CHTs carry a housing navigation role in every Health Service Area.",
    color: "border-red-200 bg-red-50",
    textColor: "text-red-800",
  },
  {
    domain: "Food Insecurity",
    icd10: "Z59.41",
    loincScreen: "88122-7",
    vciFlag: "4 pts",
    prevalence: "28–35% positive in Windham, Rutland, and Northeast Kingdom counties",
    resources: ["3SquaresVT (Vermont SNAP)", "Vermont Foodbank", "Community food shelves (statewide)", "WIC Program (DVHA)", "Senior Farm Share"],
    healthConnection: "Food insecurity correlates directly with A1C non-control in T2DM, medication non-adherence (insulin rationing), and MH exacerbations. VCCI SDOH screening uses LOINC 88122-7. CHTs refer to 3SquaresVT enrollment as a standard workflow.",
    color: "border-amber-200 bg-amber-50",
    textColor: "text-amber-800",
  },
  {
    domain: "Transportation Barriers",
    icd10: "Z59.9",
    loincScreen: "93030-5",
    vciFlag: "Up to 6 pts (rural)",
    prevalence: "High in Essex, Orleans, Lamoille, and Grand Isle counties",
    resources: ["Vermont Public Transit Association (VPTA)", "Green Mountain Transit (GMT)", "Medicaid Non-Emergency Medical Transportation (NEMT)", "Volunteer driver programs (RSVP)", "Telehealth as alternative access"],
    healthConnection: "Transportation is the #1 reason for missed primary care appointments in rural Vermont. VCCI case managers document transport barriers in LOINC 93030-5 screeners. Blueprint CHTs schedule telehealth as default for transport-limited members.",
    color: "border-blue-200 bg-blue-50",
    textColor: "text-blue-800",
  },
  {
    domain: "Social Isolation / Loneliness",
    icd10: "Z60.2",
    loincScreen: "93029-7",
    vciFlag: "Up to 4 pts",
    prevalence: "Vermont has among the highest rates of older adult social isolation in New England",
    resources: ["SASH Program (housing community-based)", "Senior centers (statewide)", "RSVP volunteer programs", "Vermont 2-1-1 peer connection referrals", "Designated Agency peer support specialists"],
    healthConnection: "Social isolation is an independent predictor of hospitalization in seniors. SASH was specifically designed to address this — embedded coordinators in housing communities create social connection as a health intervention. DAs provide peer support services for isolated MH/SUD members.",
    color: "border-violet-200 bg-violet-50",
    textColor: "text-violet-800",
  },
  {
    domain: "Substance Use Disorder",
    icd10: "F10–F19",
    loincScreen: "75626-2 (AUDIT-C)",
    vciFlag: "4 pts",
    prevalence: "Vermont has among the highest per-capita opioid treatment rates in the US",
    resources: ["Designated Agencies (MOUD programs, SUD treatment)", "Vermont Hub and Spoke Model", "Brattleboro Retreat", "DVHA buprenorphine waiver prescribers", "Vermont Recovery Network peer centers"],
    healthConnection: "SUD intersects with every other SDOH domain. Vermont's Hub-and-Spoke model connects hospitals (hubs) to primary care practices (spokes) for MOUD delivery. DAs provide the recovery support and outpatient SUD treatment infrastructure. VCCI specifically targets members with active SUD + housing instability.",
    color: "border-rose-200 bg-rose-50",
    textColor: "text-rose-800",
  },
  {
    domain: "Mental Health",
    icd10: "F32–F43",
    loincScreen: "55757-9 (PHQ-9)",
    vciFlag: "4 pts",
    prevalence: "MDD hospitalization rate above national average in Rutland, Windham, and Washington counties",
    resources: ["Designated Agencies (11 regional — community MH services)", "Vermont Psychiatric Care Hospital (VPCH)", "988 Suicide & Crisis Lifeline", "Blueprint Mental Health Integration (MHI)", "School-based mental health programs"],
    healthConnection: "The Blueprint MHI initiative (2023) brings BH screening directly into primary care visits via CHTs. DAs provide the specialty outpatient and crisis services tier. VCCI PHQ-9 ≥10 triggers a 4-point SDOH flag and flags for BH case management coordination.",
    color: "border-indigo-200 bg-indigo-50",
    textColor: "text-indigo-800",
  },
  {
    domain: "Financial Strain / Poverty",
    icd10: "Z59.6–Z59.7",
    loincScreen: "AHC HRSN Module",
    vciFlag: "Embedded across multiple domains",
    prevalence: "Vermont poverty rate 10.2% statewide; significantly higher in Essex (22%), Orleans (18%), Windham (16%)",
    resources: ["Vermont 2-1-1 (benefits screening & enrollment)", "Community Action Agencies (CAAs — all 12 counties)", "Legal Aid — Vermont Legal Aid", "Earned Income Tax Credit (EITC) outreach", "DVHA low-income pharmaceutical programs"],
    healthConnection: "Financial strain drives medication non-adherence (insulin rationing, prescription splitting), delayed care-seeking, and inability to follow treatment plans. Community Action Agencies are Vermont's front-line anti-poverty organizations and are natural partners for CHT SDOH navigation workflows.",
    color: "border-emerald-200 bg-emerald-50",
    textColor: "text-emerald-800",
  },
  {
    domain: "Domestic / Intimate Partner Violence",
    icd10: "Z69.11–Z69.12",
    loincScreen: "96842-0 (HITS tool)",
    vciFlag: "2 pts",
    prevalence: "IPV screen added to VCCI October 2018",
    resources: ["Vermont Network Against Domestic & Sexual Violence", "Regional safe houses (all counties)", "Vermont 2-1-1 (24-hour referral)", "Designated Agency trauma-informed care programs"],
    healthConnection: "IPV is a mandatory SDOH screen under VCCI (HITS tool, LOINC 96842-0). Vermont requires trauma-informed care training for Blueprint CHT staff. IPV positive screens are referred to the Vermont Network's regional safe houses with CHT warm handoff protocols.",
    color: "border-pink-200 bg-pink-50",
    textColor: "text-pink-800",
  },
];

const COMMUNITY_ACTION_AGENCIES = [
  { name: "Addison County Community Action Group (ACORN)", counties: ["Addison"] },
  { name: "Bennington County Community Action Program", counties: ["Bennington"] },
  { name: "Central Vermont Community Action Council (CVCAC)", counties: ["Washington", "Lamoille", "Orange"] },
  { name: "Champlain Valley Office of Economic Opportunity (CVOEO)", counties: ["Chittenden", "Grand Isle", "Franklin"] },
  { name: "Community Action Partnership (CAPSTONE)", counties: ["Windsor", "Windham"] },
  { name: "Northeast Kingdom Community Action (NEKCA)", counties: ["Caledonia", "Essex", "Orleans"] },
  { name: "Rutland Community Programs (RCP)", counties: ["Rutland"] },
];

export default function VermontSDOHPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* HERO */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-10 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-orange-100 text-orange-700 border border-orange-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">Vermont · Social Determinants</span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">8 Domains Covered</span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">Vermont SDOH & Social Services</h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-4">
          Social determinants drive an estimated 80% of health outcomes. Vermont&apos;s healthcare system has invested heavily in connecting clinical care to social services — through VCCI SDOH screening, Blueprint Community Health Teams, SASH, and a network of community action agencies and 2-1-1 Vermont. This page maps Vermont&apos;s social services ecosystem to the clinical programs that use it.
        </p>
        <div className="flex flex-wrap gap-3">
          <ExternalLink href="https://211vt.org/">2-1-1 Vermont (statewide resource navigation)</ExternalLink>
          <ExternalLink href="https://mentalhealth.vermont.gov/individuals-and-families">VT Dept. of Mental Health</ExternalLink>
          <ExternalLink href="https://vermontcarepartners.org/">Vermont Care Partners</ExternalLink>
        </div>
      </div>

      {/* WHY SDOH MATTERS IN VBC */}
      <div className="mb-12 bg-slate-900 text-white rounded-2xl p-8">
        <p className="text-xs font-black uppercase tracking-widest text-orange-400 mb-2">Why SDOH Is a VBC Priority</p>
        <h2 className="text-xl font-black text-white mb-4">Social Factors Drive Cost More Than Clinical Factors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-bold text-orange-300 mb-1">VCCI Risk Scoring</p>
            <p className="text-slate-300 leading-relaxed">Vermont&apos;s VCCI composite risk score allocates 20% weight to SDOH domains — housing (6 pts), food insecurity (4 pts), SUD (4 pts), mental health crisis (4 pts), IPV (2 pts). SDOH screening was added to VCCI in October 2018 after evidence showed social factors predicted ED utilization as strongly as clinical diagnoses.</p>
          </div>
          <div>
            <p className="font-bold text-orange-300 mb-1">Z-Code Documentation</p>
            <p className="text-slate-300 leading-relaxed">ICD-10-CM Z55–Z65 codes capture social determinants in the medical record. These Z-codes are what make SDOH data flow through claims and into risk models. Vermont AHEAD explicitly requires ACO participants to document Z-codes for attributed patients with identified social needs — making SDOH documentation a VBC contract obligation.</p>
          </div>
          <div>
            <p className="font-bold text-orange-300 mb-1">FHIR SDOH Representation</p>
            <p className="text-slate-300 leading-relaxed">USCDI v3 (2023) added SDOH Assessment and SDOH Goal as required data classes. In FHIR R4, each SDOH finding is an Observation with a LOINC code from the Accountable Health Communities (AHC) screening tool. Vermont&apos;s Medicaid FHIR API must support SDOH Observation exchange under ONC 21st Century Cures Act requirements.</p>
          </div>
        </div>
      </div>

      {/* SDOH DOMAINS */}
      <div className="mb-12">
        <SectionHeader label="Eight SDOH Domains" title="Vermont Social Needs — Clinical Links & Community Resources" />
        <div className="space-y-4">
          {SDOH_DOMAINS.map(d => (
            <details key={d.domain} className={`group border rounded-xl overflow-hidden ${d.color}`}>
              <summary className="flex items-start gap-4 px-5 py-4 cursor-pointer list-none hover:brightness-95 transition-all">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className={`font-black text-slate-900 text-base`}>{d.domain}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">{d.icd10}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600">LOINC {d.loincScreen}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 bg-white border rounded ${d.color.replace('bg-', 'border-').replace('-50', '-300')} ${d.textColor}`}>VCCI: {d.vciFlag}</span>
                  </div>
                  <p className="text-xs text-slate-600">{d.prevalence}</p>
                </div>
                <span className="text-slate-400 group-open:rotate-90 transition-transform shrink-0 mt-1">▶</span>
              </summary>
              <div className="px-5 pb-5 bg-white border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${d.textColor} mb-2`}>Vermont Community Resources</p>
                    <ul className="space-y-1">
                      {d.resources.map(r => (
                        <li key={r} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className="text-slate-300 shrink-0 mt-0.5">•</span>{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${d.textColor} mb-2`}>Healthcare System Connection</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{d.healthConnection}</p>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* 2-1-1 VERMONT */}
      <div className="mb-12 bg-orange-50 border border-orange-200 rounded-2xl p-8">
        <h2 className="text-xl font-black text-slate-900 mb-3">2-1-1 Vermont — The Central SDOH Navigation Hub</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          2-1-1 Vermont is the statewide, 24/7 information and referral service connecting Vermonters to health, human services, and crisis resources. It is the single most important infrastructure tool for SDOH referral workflows in Vermont. Blueprint CHTs, VCCI case managers, and hospital social workers all use 2-1-1 Vermont as their primary community resource database.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-4">
          <div className="bg-white border border-orange-200 rounded-xl p-4">
            <p className="font-bold text-orange-800 mb-1">Coverage</p>
            <p className="text-slate-600">All 14 Vermont counties. Available by phone (dial 2-1-1), text, and online at 211vt.org. Available in multiple languages.</p>
          </div>
          <div className="bg-white border border-orange-200 rounded-xl p-4">
            <p className="font-bold text-orange-800 mb-1">Searchable Database</p>
            <p className="text-slate-600">Comprehensive database of 4,000+ Vermont community programs including food, housing, utilities, mental health, SUD treatment, transportation, and more.</p>
          </div>
          <div className="bg-white border border-orange-200 rounded-xl p-4">
            <p className="font-bold text-orange-800 mb-1">Healthcare Integration</p>
            <p className="text-slate-600">Blueprint CHTs use 2-1-1 as their referral platform. VCCI case managers close the loop on 2-1-1 referrals through care plan follow-up. SASH coordinators use 2-1-1 for housing community resource navigation.</p>
          </div>
        </div>
        <ExternalLink href="https://211vt.org/">Visit 2-1-1 Vermont →</ExternalLink>
      </div>

      {/* COMMUNITY ACTION AGENCIES */}
      <div className="mb-12">
        <SectionHeader label="Anti-Poverty Infrastructure" title="Vermont Community Action Agencies" />
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Vermont&apos;s 7 Community Action Agencies (CAAs) are federally funded anti-poverty organizations serving all 14 counties. They are the front-line organizations for SNAP enrollment, LIHEAP (heating assistance), weatherization, legal aid navigation, childcare support, and emergency financial assistance. Blueprint CHTs partner with CAAs as the primary referral pathway for financial strain SDOH needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COMMUNITY_ACTION_AGENCIES.map(a => (
            <div key={a.name} className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="font-bold text-slate-800 text-sm">{a.name}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {a.counties.map(c => (
                  <span key={c} className="text-[10px] font-bold px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full">{c} County</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW SDOH FLOWS THROUGH THE CLINICAL SYSTEM */}
      <div className="mb-12">
        <SectionHeader label="System Integration" title="How SDOH Data Flows Through Vermont's Healthcare System" />
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-xs text-center">
            {[
              { step: "1", label: "Screen", desc: "PRAPARE / AHC HRSN screening at PCP visit, ED discharge, or VCCI telephonic assessment. Produces LOINC-coded OBX segments or FHIR Observations.", color: "bg-orange-100 text-orange-800" },
              { step: "2", label: "Document", desc: "Social needs documented as ICD-10 Z-codes in the problem list and FHIR Condition resources. Required for AHEAD VBC contract quality reporting and VCCI composite score.", color: "bg-amber-100 text-amber-800" },
              { step: "3", label: "Refer", desc: "CHT care coordinator makes warm referral to community resource (2-1-1, food shelf, housing authority, CAA). Referral documented in shared care plan.", color: "bg-emerald-100 text-emerald-800" },
              { step: "4", label: "Close Loop", desc: "VCCI case manager or CHT follows up within 30 days to confirm referral was completed. Loop closure documented in FHIR CarePlan.activity.detail.status.", color: "bg-indigo-100 text-indigo-800" },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full ${s.color} font-black text-lg flex items-center justify-center`}>{s.step}</div>
                <p className={`font-black text-sm ${s.color.replace('bg-', 'text-').replace('-100', '-800')}`}>{s.label}</p>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RELATED PAGES */}
      <div className="mb-12">
        <SectionHeader label="Related Programs" title="Vermont SDOH-Connected Programs" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/vermont-sash", label: "SASH Program", desc: "Housing-based care coordination — the ultimate SDOH integration model. SASH coordinators are embedded in affordable housing and address SDOH as part of every care plan.", color: "border-teal-200 hover:bg-teal-50", text: "text-teal-700" },
            { href: "/vermont-blueprint", label: "Blueprint for Health / CHTs", desc: "Community Health Teams carry SDOH navigation as a core role. CHTs connect patients to 2-1-1, CAAs, and Designated Agencies from within primary care visits.", color: "border-emerald-200 hover:bg-emerald-50", text: "text-emerald-700" },
            { href: "/vermont-designated-agencies", label: "Designated Agencies (MH/SUD)", desc: "Vermont's 11 DAs provide MH and SUD services — the clinical response tier for mental health and substance use SDOH needs identified through VCCI screening.", color: "border-violet-200 hover:bg-violet-50", text: "text-violet-700" },
            { href: "/vermont-rht-program", label: "VCCI (via RHT program)", desc: "VCCI SDOH screening (housing, food, SUD, MH, IPV, transport) feeds directly into the composite risk score. VCCI case managers address SDOH through shared care plans and community referrals.", color: "border-rose-200 hover:bg-rose-50", text: "text-rose-700" },
            { href: "/equity/sdoh", label: "SDOH Intelligence Hub (Platform)", desc: "The platform's broader SDOH content — PRAPARE screening framework, Z-code documentation guide, VBC contract SDOH integration, and national SDOH policy analysis.", color: "border-orange-200 hover:bg-orange-50", text: "text-orange-700" },
            { href: "/research-lab/vbc-clinical-quality?tab=risk", label: "VCCI Risk Stratification Lab", desc: "Interactive VCCI scoring walkthrough showing how SDOH screening data (housing, food, SUD, MH, IPV) translates into composite risk score points and tier assignment.", color: "border-indigo-200 hover:bg-indigo-50", text: "text-indigo-700" },
          ].map(item => (
            <Link key={item.href} href={item.href} className={`block border rounded-xl p-4 transition-all ${item.color} hover:border-opacity-100`}>
              <p className={`font-black text-sm mb-1.5 ${item.text}`}>{item.label}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* RESOURCES */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
        <SectionHeader label="Resources" title="SDOH Tools & Reference Materials" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "https://211vt.org/", label: "2-1-1 Vermont — Online Search", desc: "Statewide 24/7 resource database — find food, housing, health, and social services by county" },
            { href: "https://dvha.vermont.gov/providers/vermont-chronic-care-initiative/vcci-services", label: "VCCI SDOH Screening Protocol", desc: "DVHA description of the VCCI SDOH screening domains and eligibility modification (Oct 2018)" },
            { href: "https://blueprintforhealth.vermont.gov/", label: "Blueprint for Health", desc: "Community Health Teams and SDOH navigation as part of Vermont's primary care infrastructure" },
            { href: "https://mentalhealth.vermont.gov/individuals-and-families", label: "VT Dept. of Mental Health — Individuals & Families", desc: "Mental health and SUD services resource directory by county" },
            { href: "https://sashvt.org/", label: "SASH Vermont", desc: "Housing-based care coordination — SDOH integration model serving 13,000+ Vermont seniors" },
            { href: "https://vermontcarepartners.org/", label: "Vermont Care Partners", desc: "The DA network umbrella organization — behavioral health and SUD community services" },
          ].map(r => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-300 hover:shadow-sm transition-all group">
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 group-hover:text-orange-700 text-xs transition-colors">{r.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
