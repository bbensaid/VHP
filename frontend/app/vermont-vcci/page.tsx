import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Vermont VCCI — Chronic Care Initiative | HTR States",
  description: "Vermont Chronic Care Initiative (VCCI) — DVHA's intensive case management program for Vermont's highest-risk, highest-cost Medicaid members. Risk stratification, CDPS scoring, SDOH screening, and care management services.",
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-rose-700 hover:text-rose-900 underline underline-offset-2 transition-colors">
      {children}
      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 shrink-0" />
    </a>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="text-xs font-black uppercase tracking-widest text-rose-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

// ─── Static content ───────────────────────────────────────────────────────────

const VCCI_ELIGIBILITY = [
  { criterion: "Vermont Medicaid primary insurer", detail: "Medicaid is the member's primary payer. Medicare–Medicaid dual eligibles are eligible if Medicaid is the primary for care management purposes." },
  { criterion: "Not in nursing home or assisted living", detail: "Members residing in nursing facilities or licensed assisted living facilities are excluded — they are served by separate long-term care case management programs." },
  { criterion: "Not currently enrolled in another CMS-reimbursed case management", detail: "Prevents duplicate case management. Members in other waiver programs (e.g., CHOICES for Long-Term Care) are excluded." },
  { criterion: "High risk / high cost based on claims analytics", detail: "DVHA runs monthly predictive analytics on all Medicaid claims. The top 5–15% by predicted cost are flagged. Top 5% (with CDPS ≥3.5) triggers Very High; CDPS ≥2.0 triggers High tier. Members can also qualify via referral without meeting the cost threshold if they have complex medical and social needs." },
  { criterion: "Impactable conditions and modifiable risk factors", detail: "VCCI targets members where care management intervention is expected to produce measurable improvement — uncontrolled chronic conditions, medication non-adherence, high ED utilization, and SDOH barriers that can be addressed through case management." },
];

const VCCI_SERVICES = [
  { title: "Telephonic Screening & Enrollment", desc: "Initial outreach call to assess member needs, explain VCCI services, and obtain voluntary enrollment. Includes SDOH screening across 6 domains (housing, food, SUD, mental health, IPV, transportation) using LOINC-coded tools (PHQ-9, AUDIT-C, HITS, AHC HRSN)." },
  { title: "Dedicated Case Manager Assignment", desc: "Every enrolled member is assigned a single VCCI case manager — a registered nurse or licensed social worker with care coordination certification (CCM). Case manager serves as the primary point of contact across all care settings." },
  { title: "Shared Care Plan Development", desc: "The VCCI case manager builds a comprehensive, individualized care plan collaboratively with the member, their PCP, and any specialists. The care plan addresses medical conditions, medications, SDOH needs, and personal health goals. Shared with all providers via secure messaging or care management platform." },
  { title: "Eco-Mapping", desc: "A structured visual mapping of the member's relationships, supports, and barriers — family, healthcare providers, community resources, and social connections. Used to identify gaps in the member's support network and prioritize intervention." },
  { title: "Care Team Conferences", desc: "Facilitated multi-disciplinary meetings bringing together the member's PCP, specialists, behavioral health providers, social workers, and community resources. VCCI case manager chairs the conference and coordinates follow-up." },
  { title: "Medication Reconciliation & Adherence Support", desc: "VCCI case managers coordinate with pharmacists and PCPs on medication reconciliation. For members with PDC <60% on high-priority medications (insulin, cardiac meds, MOUD), the case manager implements adherence coaching, connection to pharmaceutical assistance programs, and 90-day supply protocols." },
  { title: "Community Resource Navigation", desc: "VCCI case managers connect members to 2-1-1 Vermont, food shelves, housing programs, transportation assistance, SNAP enrollment, and heating assistance through Community Action Agencies. Referral completion is tracked and documented in the care plan." },
  { title: "30-Day Transition Care Management (TCM)", desc: "For VCCI members discharged from hospital or SNF, the case manager initiates a 7-day follow-up call and 30-day TCM protocol — medication review, appointment scheduling, red flag monitoring, and care plan update." },
];

const VCCI_SCORING_DOMAINS = [
  { domain: "Utilization (ED + Inpatient)", weight: "35%", maxPts: 35, triggers: ["≥3 ED visits in 12 months (12 pts)", "≥2 inpatient admissions (10 pts)", "30-day readmission present (8 pts)", "SNF utilization (5 pts)"] },
  { domain: "Chronic Condition Burden (CDPS)", weight: "30%", maxPts: 30, triggers: ["CDPS Very High category (weight ≥4.0) — 12 pts", "2+ CDPS High categories (1.5–3.9) — 10 pts", "Polypharmacy ≥7 medications — 8 pts", "3+ distinct CDPS categories — 7 pts"] },
  { domain: "SDOH Vulnerability", weight: "20%", maxPts: 20, triggers: ["Housing instability / homelessness — 6 pts", "Food insecurity — 4 pts", "Active SUD with treatment gap — 4 pts", "Mental health crisis in prior 6 months — 4 pts", "Rural access barrier (transport/broadband) — 6 pts", "IPV screen positive — 2 pts"] },
  { domain: "Care Gaps & Access Indicators", weight: "15%", maxPts: 15, triggers: ["Medication PDC <60% for ≥2 medications — 5 pts", "HEDIS quality gap present — 3–5 pts", "No PCP visit in 6 months — 5 pts", "Transportation barrier documented — 2–5 pts"] },
];

const RISK_TIERS = [
  { tier: "Very High", score: "≥80", cdps: "≥3.5", pctile: "≥95th", action: "VCCI Intensive Case Management — dedicated case manager, shared care plan, monthly touchpoints, eco-mapping, care team conferences", color: "bg-red-600", light: "bg-red-50 border-red-300", text: "text-red-700" },
  { tier: "High", score: "60–79", cdps: "≥2.0", pctile: "≥80th", action: "VCCI Intensive Case Management — bi-monthly touchpoints, community resource navigation, medication adherence support", color: "bg-orange-500", light: "bg-orange-50 border-orange-300", text: "text-orange-700" },
  { tier: "Medium", score: "35–59", cdps: "≥1.0", pctile: "≥60th", action: "Blueprint CHT Referral — Community Health Team support, peer recovery, care navigation. Re-evaluate for VCCI in 90 days.", color: "bg-amber-400", light: "bg-amber-50 border-amber-300", text: "text-amber-700" },
  { tier: "Low", score: "<35", cdps: "<1.0", pctile: "<60th", action: "Standard Medicaid preventive outreach — wellness visit, annual SDOH screening, care gap notifications", color: "bg-emerald-500", light: "bg-emerald-50 border-emerald-300", text: "text-emerald-700" },
];

export default function VermontVCCIPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* HERO */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-10 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">Vermont Medicaid — DVHA</span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">1115 Waiver Program</span>
          <span className="bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">Voluntary Enrollment</span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">
          Vermont Chronic Care Initiative
          <span className="block text-xl font-bold text-slate-500 mt-1">VCCI — Intensive Case Management for High-Risk Medicaid Members</span>
        </h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          VCCI is Vermont Medicaid&apos;s intensive case management program targeting the top 5% highest-cost members who account for approximately 39% of all Vermont Medicaid spending. Run by the Department of Vermont Health Access (DVHA) under the Global Commitment to Health 1115 waiver, VCCI assigns a dedicated case manager, builds a shared care plan, and addresses both clinical and social determinants of health.
        </p>
        <div className="flex flex-wrap gap-3">
          <ExternalLink href="https://dvha.vermont.gov/providers/vermont-chronic-care-initiative">VCCI Official Program Page (DVHA)</ExternalLink>
          <ExternalLink href="https://dvha.vermont.gov/providers/vermont-chronic-care-initiative/vcci-services">VCCI Services Detail</ExternalLink>
          <ExternalLink href="https://dvha.vermont.gov/sites/dvha/files/doc_library/VCCI%20Referral%20Form.pdf">VCCI Referral Form (PDF)</ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2018/WorkGroups/House%20Health%20Care/Vermont%20Chronic%20Care%20Initiative/W~Eileen%20Girling~Vermont%20Chronic%20Care%20Initiative~4-6-2017.pdf">2017 House Committee Presentation (PDF)</ExternalLink>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { value: "Top 5%", label: "Target Population", sub: "Highest-cost Medicaid members" },
          { value: "~39%", label: "Medicaid Spend Share", sub: "From the top 5% of members" },
          { value: "4 Tiers", label: "Risk Stratification", sub: "Low / Medium / High / Very High" },
          { value: "Voluntary", label: "Enrollment", sub: "Member consent required" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 text-center">
            <div className="text-2xl font-black text-rose-700 mb-1">{s.value}</div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">{s.label}</div>
            {s.sub && <div className="text-[11px] text-slate-400 mt-1">{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* HOW VCCI WORKS */}
      <div className="mb-12">
        <SectionHeader label="Program Model" title="How VCCI Identifies and Enrolls Members" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {[
            { step: "1", title: "Identification", color: "bg-rose-600", desc: "DVHA runs monthly predictive analytics on all ~230,000 Vermont Medicaid members using claims data. Members in the top 5–15% by predicted annual cost are flagged. Referrals also come from PCPs, hospitals, emergency departments, Blueprint CHTs, social workers, and self-referral." },
            { step: "2", title: "Scoring & Tier Assignment", color: "bg-orange-500", desc: "A multi-domain composite score (0–100) is calculated from claims + telephonic SDOH screening. Four domains: Utilization (35%), CDPS chronic burden (30%), SDOH vulnerability (20%), and Care Gaps (15%). Score + CDPS score + cost percentile determine the risk tier." },
            { step: "3", title: "Enrollment & Case Management", color: "bg-emerald-600", desc: "High and Very High tier members are offered VCCI enrollment (voluntary). Upon consent, a dedicated case manager is assigned within 5 business days. Medium tier members are referred to Blueprint Community Health Teams instead of VCCI." },
          ].map(s => (
            <div key={s.step} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className={`w-8 h-8 rounded-full ${s.color} text-white font-black flex items-center justify-center mb-3`}>{s.step}</div>
              <h3 className="font-black text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ELIGIBILITY */}
      <div className="mb-12">
        <SectionHeader label="Who Qualifies" title="VCCI Eligibility Criteria" />
        <div className="space-y-3">
          {VCCI_ELIGIBILITY.map(e => (
            <div key={e.criterion} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4">
              <div className="w-5 h-5 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{e.criterion}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{e.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPOSITE RISK SCORE */}
      <div className="mb-12">
        <SectionHeader label="Risk Stratification" title="VCCI Composite Risk Score (0–100)" />
        <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
          The composite score combines four weighted domains. A higher score means more intense care management. The score is calculated monthly by DVHA analytics and refreshed when new screening data is received. Two additional eligibility gates — top 5% cost percentile (primary) and CDPS ≥2.0 (secondary) — must also be met for VCCI enrollment.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {VCCI_SCORING_DOMAINS.map(d => (
            <div key={d.domain} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-slate-900 text-sm">{d.domain}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-rose-700 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded">{d.weight}</span>
                  <span className="text-[10px] font-mono text-slate-500">max {d.maxPts} pts</span>
                </div>
              </div>
              <ul className="space-y-1">
                {d.triggers.map(t => (
                  <li key={t} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-rose-300 shrink-0 mt-0.5">•</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Risk tier table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left px-4 py-3 font-bold">Tier</th>
                <th className="px-4 py-3 font-bold text-center">Score</th>
                <th className="px-4 py-3 font-bold text-center">CDPS</th>
                <th className="px-4 py-3 font-bold text-center">Cost %tile</th>
                <th className="text-left px-4 py-3 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {RISK_TIERS.map(t => (
                <tr key={t.tier} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${t.light} ${t.text}`}>{t.tier}</span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-slate-700">{t.score}</td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-slate-700">{t.cdps}</td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-slate-700">{t.pctile}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs leading-relaxed">{t.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center">
          <Link href="/research-lab/vbc-clinical-quality?tab=risk"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-colors">
            Interactive VCCI Risk Scoring Tool — 3 Vermont Patient Scenarios →
          </Link>
        </div>
      </div>

      {/* SDOH SCREENING */}
      <div className="mb-12 bg-orange-50 border border-orange-200 rounded-2xl p-8">
        <h2 className="text-xl font-black text-slate-900 mb-3">SDOH Screening — Added October 2018</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Effective October 2018, VCCI expanded its eligibility process to include structured screening for social determinants of health. Prior to this, VCCI targeting was purely claims-based. The addition recognized that social factors drive utilization as much as clinical diagnoses — particularly housing instability, food insecurity, and SUD.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {[
            { domain: "Housing / Homelessness", loinc: "71802-3", pts: "6 pts", instrument: "AHC HRSN" },
            { domain: "Food Insecurity", loinc: "88122-7", pts: "4 pts", instrument: "AHC HRSN" },
            { domain: "Transportation", loinc: "93030-5", pts: "Up to 6 pts (rural)", instrument: "AHC HRSN" },
            { domain: "Mental Health (PHQ-9)", loinc: "55757-9", pts: "4 pts (score ≥10)", instrument: "PHQ-9" },
            { domain: "Substance Use (AUDIT-C)", loinc: "75626-2", pts: "4 pts (score ≥4)", instrument: "AUDIT-C" },
            { domain: "Intimate Partner Violence", loinc: "96842-0", pts: "2 pts", instrument: "HITS tool" },
          ].map(s => (
            <div key={s.domain} className="bg-white border border-orange-200 rounded-xl p-3">
              <p className="font-bold text-slate-800 mb-1">{s.domain}</p>
              <p className="text-slate-500 font-mono text-[10px]">LOINC {s.loinc}</p>
              <p className="text-[10px] text-slate-500">{s.instrument}</p>
              <p className="text-orange-700 font-bold mt-1">{s.pts}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div className="mb-12">
        <SectionHeader label="What VCCI Provides" title="Intensive Case Management Services" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VCCI_SERVICES.map(s => (
            <div key={s.title} className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-black text-slate-900 text-sm mb-1.5">{s.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VCCI IN THE SYSTEM */}
      <div className="mb-12">
        <SectionHeader label="Vermont Care Ecosystem" title="How VCCI Connects to Other Vermont Programs" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/vermont-blueprint", label: "Blueprint for Health / CHTs", desc: "Medium-risk VCCI-eligible members who score below the VCCI threshold are referred to Blueprint Community Health Teams instead. CHTs share tools, care plan formats, and eco-mapping processes with VCCI, enabling warm handoffs.", color: "border-emerald-200 hover:bg-emerald-50", text: "text-emerald-700" },
            { href: "/vermont-sash", label: "SASH Program", desc: "High-risk VCCI members who are also Medicare beneficiaries living in affordable housing may be SASH participants. VCCI case managers and SASH coordinators coordinate on shared members — SASH handles the housing-based wellness tier, VCCI handles the intensive clinical coordination.", color: "border-teal-200 hover:bg-teal-50", text: "text-teal-700" },
            { href: "/vermont-designated-agencies", label: "Designated Agencies (MH/SUD)", desc: "VCCI case managers route members with identified MH or SUD needs to the appropriate regional Designated Agency. DA staff coordinate with VCCI on shared care plans, particularly for members with co-occurring complex medical and behavioral health conditions.", color: "border-violet-200 hover:bg-violet-50", text: "text-violet-700" },
            { href: "/vermont-sdoh", label: "SDOH & Social Services", desc: "VCCI case managers navigate 2-1-1 Vermont, Community Action Agencies, food shelves, and housing programs as part of every care plan. SDOH screening since 2018 has made social service navigation a formal, scored component of VCCI enrollment.", color: "border-orange-200 hover:bg-orange-50", text: "text-orange-700" },
            { href: "/ahead-model", label: "Vermont AHEAD ACO", desc: "VCCI focuses exclusively on Medicaid members. High-risk members who are dual Medicare/Medicaid enrollees may also be attributed to Vermont AHEAD ACOs — both VCCI and the ACO care management team must coordinate to avoid duplication.", color: "border-sky-200 hover:bg-sky-50", text: "text-sky-700" },
            { href: "/vermont-act-68", label: "Vermont Act 68 (2025)", desc: "Act 68 explicitly references VCCI as a component of Vermont's care management infrastructure. Act 68 AHS monthly transformation reports include VCCI enrollment and performance data as a key Medicaid care management metric.", color: "border-indigo-200 hover:bg-indigo-50", text: "text-indigo-700" },
          ].map(item => (
            <Link key={item.href} href={item.href} className={`block border rounded-xl p-4 transition-all ${item.color} hover:border-opacity-100`}>
              <p className={`font-black text-sm mb-1.5 ${item.text}`}>{item.label}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* INTERACTIVE TOOL CTA */}
      <div className="mb-12 bg-slate-900 text-white rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-widest text-rose-400 mb-2">Platform Research Tool</p>
            <h2 className="text-xl font-black text-white mb-2">VCCI Risk Stratification Lab</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Walk through the full VCCI risk scoring process with three synthetic Vermont Medicaid patients — Raymond Forcier (Very High, CDPS 4.84), Linda Beaupre (High, dual-eligible, rural), and Darnell Washington (Medium — CHT referral, not VCCI). See step-by-step CDPS calculations, composite score breakdowns by domain, SDOH screening with HL7 OBX segments and FHIR Observations, and full HL7 REF^I12 referral messages and FHIR CarePlan resources.
            </p>
          </div>
          <Link href="/research-lab/vbc-clinical-quality?tab=risk"
            className="shrink-0 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap">
            Open VCCI Lab →
          </Link>
        </div>
      </div>

      {/* RESOURCES */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
        <SectionHeader label="Official Resources" title="VCCI Reports & Documentation" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "https://dvha.vermont.gov/providers/vermont-chronic-care-initiative", label: "DVHA VCCI Program Page", desc: "Official DVHA page — eligibility criteria, enrollment process, referral instructions, and contact information" },
            { href: "https://dvha.vermont.gov/providers/vermont-chronic-care-initiative/vcci-services", label: "VCCI Services Detail", desc: "Full description of all VCCI case management services including shared care plan, eco-mapping, and care team conferences" },
            { href: "https://dvha.vermont.gov/providers/vermont-chronic-care-initiative/vcci-case-management-services", label: "VCCI Case Management Services", desc: "Detailed breakdown of the intensive case management model — what case managers do and how often" },
            { href: "https://dvha.vermont.gov/sites/dvha/files/doc_library/VCCI%20Referral%20Form.pdf", label: "Current VCCI Referral Form (PDF)", desc: "The standardized referral form used by PCPs, hospitals, CHTs, and social workers to refer members for VCCI enrollment" },
            { href: "https://legislature.vermont.gov/Documents/2018/WorkGroups/House%20Health%20Care/Vermont%20Chronic%20Care%20Initiative/W~Eileen%20Girling~Vermont%20Chronic%20Care%20Initiative~4-6-2017.pdf", label: "VCCI 2017 House Committee Presentation (PDF)", desc: "The most detailed public description of the VCCI risk stratification methodology, eligibility scoring, and program outcomes — foundational document" },
            { href: "https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Corrections%20and%20Institutions/Department%20of%20Corrections/Vermont%20Medicaid%20Reentry%20Program/W~Aviva%20Tevah~VCCI%20Presentation~1-21-2026.pdf", label: "VCCI Medicaid Reentry Presentation (Jan 2026, PDF)", desc: "VCCI's expansion into Medicaid reentry for individuals leaving incarceration — testimony to House Corrections Committee" },
            { href: "https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/vt-global-commitment-to-health-annl-rpt-2018.pdf", label: "CMS Global Commitment Annual Report (2018, PDF)", desc: "CMS annual monitoring report covering VCCI as a key Vermont 1115 waiver deliverable with enrollment and outcome data" },
          ].map(r => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-rose-300 hover:shadow-sm transition-all group">
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 group-hover:text-rose-700 text-xs transition-colors leading-snug">{r.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
