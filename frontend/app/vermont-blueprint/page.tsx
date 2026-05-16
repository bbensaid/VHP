import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Vermont Blueprint for Health | HTR States",
  description: "Vermont's Blueprint for Health — the state's primary care transformation initiative. Patient-Centered Medical Homes, Community Health Teams, Mental Health Integration, and the connection to VCCI, AHEAD, and Act 68.",
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 underline underline-offset-2 transition-colors">
      {children}
      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 shrink-0" />
    </a>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="text-xs font-black uppercase tracking-widest text-emerald-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

function StatBox({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
      <div className="text-2xl font-black text-emerald-700 mb-1">{value}</div>
      <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[11px] text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}

const CHT_COMPONENTS = [
  { role: "Community Health Worker (CHW)", desc: "Connects patients to food, housing, transportation, and benefits navigation. Often embedded in primary care practices. Vermont has 34+ FTE CHWs deployed across all health service areas as of 2024." },
  { role: "Care Coordinator / RN", desc: "Manages transitions of care, coordinates specialist referrals, and supports high-risk patient panels. Often the point of contact for patients recently discharged from hospital." },
  { role: "Behavioral Health Specialist", desc: "Co-located BH integration expanded since 2023 under the Mental Health Integration (MHI) initiative. Provides SUD screening, brief intervention, treatment navigation, and warm handoffs within primary care visits." },
  { role: "Health Coach", desc: "Supports patients with chronic disease self-management — diabetes, CHF, COPD — using motivational interviewing and evidence-based coaching protocols." },
  { role: "Administrative Support / Referral Coordinator", desc: "Manages care team communications, specialist scheduling, and referral tracking within and across care settings." },
];

const BLUEPRINT_TIMELINE = [
  { year: "2006", event: "Blueprint for Health codified in Vermont statute — one of the first state-legislated PCMH models in the US." },
  { year: "2010", event: "Act 128 expanded Blueprint statewide. Community Health Teams launched in every Health Service Area. All-payer PCMH payment model activated across Medicare, Medicaid, and commercial payers." },
  { year: "2011", event: "SASH program launched under Blueprint infrastructure — care coordination extended into affordable housing communities for Medicare seniors." },
  { year: "2014", event: "Vermont awarded CMS State Innovation Model (SIM) Round 1 grant to scale Blueprint. CHT capacity expanded significantly." },
  { year: "2019", event: "Vermont All-Payer ACO Model (AHEAD) launched — Blueprint practices become the primary care foundation for ACO attribution and care management." },
  { year: "2022", event: "Act 167 enacted — GMCB authority over hospital budgets strengthened. Blueprint's CHTs become the formal medium-risk referral pathway for VCCI." },
  { year: "2023", event: "Mental Health Integration (MHI) into Primary Care initiative launched — CHTs add BH capacity including SUD screening, SBIRT, and crisis navigation." },
  { year: "2024", event: "128 primary care practices participating. 56+ FTE new staff hired using Pilot funding (34 CHWs, 17 BH/SUD team members). All 14 Health Service Areas staffed." },
  { year: "2025", event: "Act 68 signed — Vermont Steering Committee for Comprehensive Primary Health Care created; Blueprint central to Act 68 primary care transformation strategy. 2025 Annual Report filed February 4 to legislature." },
];

export default function VermontBlueprintPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* HERO */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">State Initiative · Vermont</span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">Established 2006</span>
          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">All-Payer Model</span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">Vermont Blueprint for Health</h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          Vermont's state-led primary care transformation initiative — one of the longest-running and most studied all-payer medical home models in the United States. The Blueprint funds Patient-Centered Medical Homes (PCMHs) and Community Health Teams (CHTs) in every county, and is the clinical backbone connecting VCCI, AHEAD, and Act 68.
        </p>
        <div className="flex flex-wrap gap-3">
          <ExternalLink href="https://blueprintforhealth.vermont.gov/">Blueprint for Health Website</ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/assets/Legislative-Reports/2025_Blueprint_For_Health_Annual_Report.pdf">2025 Annual Report (PDF)</ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/assets/Legislative-Reports/2024-Blueprint-for-Health-Annual-Report-Updated-2.pdf">2024 Annual Report (PDF)</ExternalLink>
          <ExternalLink href="https://blueprintforhealth.vermont.gov/annual-reports">All Annual Reports</ExternalLink>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <StatBox value="128" label="Participating Practices" sub="All health service areas" />
        <StatBox value="14" label="Health Service Areas" sub="All Vermont counties covered" />
        <StatBox value="34+" label="Community Health Workers" sub="FTE deployed statewide (2024)" />
        <StatBox value="2006" label="Year Established" sub="Codified in Vermont statute" />
      </div>

      {/* WHAT IS BLUEPRINT */}
      <div className="mb-12">
        <SectionHeader label="Program Overview" title="What the Blueprint Does" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-black text-slate-900 mb-3">Patient-Centered Medical Homes (PCMHs)</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              Primary care practices that earn NCQA PCMH recognition receive a per-member-per-month capitated payment from all payers — Medicare, Medicaid, and commercial insurers — to support team-based, proactive care. This payment is separate from and on top of standard fee-for-service billing.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              PCMH practices implement same-day access, after-hours care, proactive panel management, and care coordination for high-risk patients. The PCMH model is the primary care foundation on which Vermont's AHEAD ACO and VCCI programs operate.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-black text-slate-900 mb-3">Community Health Teams (CHTs)</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              Regionally organized multidisciplinary teams that extend the reach of primary care into the community. Each Health Service Area has a CHT operating through a regional administrative entity that receives a capitated payment to staff and run the team.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              CHTs are the formal referral destination for medium-risk VCCI-eligible Medicaid members who do not qualify for VCCI intensive case management. They also manage care transitions, SDOH navigation, and BH integration across their region.
            </p>
          </div>
        </div>
      </div>

      {/* CHT TEAM COMPOSITION */}
      <div className="mb-12">
        <SectionHeader label="Community Health Teams" title="CHT Team Member Roles" />
        <div className="space-y-3">
          {CHT_COMPONENTS.map(c => (
            <div key={c.role} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4">
              <div className="w-2 bg-emerald-400 rounded-full shrink-0" />
              <div>
                <p className="font-bold text-slate-900 text-sm">{c.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MENTAL HEALTH INTEGRATION */}
      <div className="mb-12 bg-violet-50 border border-violet-200 rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-black uppercase tracking-widest text-violet-700">New Initiative · 2023</span>
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-3">Mental Health Integration (MHI) into Primary Care</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Launched in 2023, MHI expands CHT capacity to provide co-occurring mental health and substance use disorder (SUD) screening, brief intervention, treatment, and navigation within primary care settings. This is the Blueprint's response to Vermont's behavioral health capacity crisis — bringing BH services directly into the primary care visit rather than requiring a separate referral.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-xl border border-violet-200 p-4">
            <p className="font-bold text-violet-800 mb-1">SBIRT</p>
            <p className="text-slate-600 text-xs">Screening, Brief Intervention, Referral to Treatment — standardized protocol for SUD identification at every primary care visit</p>
          </div>
          <div className="bg-white rounded-xl border border-violet-200 p-4">
            <p className="font-bold text-violet-800 mb-1">Crisis Navigation</p>
            <p className="text-slate-600 text-xs">CHT BH staff provide warm handoffs to Designated Agency crisis services, avoiding unnecessary ED visits for acute MH presentations</p>
          </div>
          <div className="bg-white rounded-xl border border-violet-200 p-4">
            <p className="font-bold text-violet-800 mb-1">Training Scale</p>
            <p className="text-slate-600 text-xs">1,096 people trained in Motivational Interviewing, Structural Competence & Cultural Humility, and CHW in Primary Care settings (2024)</p>
          </div>
        </div>
        <div className="mt-4">
          <ExternalLink href="https://blueprintforhealth.vermont.gov/mental-health-integration-mhi-primary-care">MHI Initiative Details</ExternalLink>
        </div>
      </div>

      {/* PAYMENT MODEL */}
      <div className="mb-12">
        <SectionHeader label="Payment Structure" title="How Blueprint Practices Are Paid" />
        <div className="bg-slate-900 text-white rounded-2xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">PCMH Capitation (to Practice)</p>
              <p className="text-sm text-slate-300 leading-relaxed">A risk-adjusted capitated payment per attributed member per month flows from every payer — Medicare, Medicaid, and commercial — directly to the PCMH-recognized practice. The payment size is tied to the practice's NCQA PCMH score and panel risk level. This is the "advanced primary care" payment that funds the care coordination infrastructure inside the practice.</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">CHT Capitation (to Regional Entity)</p>
              <p className="text-sm text-slate-300 leading-relaxed">A separate capitated payment goes to the regional administrative entity in each Health Service Area to staff and operate the Community Health Team. This payment covers CHW salaries, care coordinator time, BH integration staff, and administrative overhead. The CHT serves all PCMH-affiliated practices in the region.</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-700 text-xs text-slate-400">
            Vermont is one of the only states with a true all-payer PCMH model — all three major payer types (Medicare, Medicaid, commercial) pay Blueprint capitation, which creates aligned incentives for every practice in the program regardless of their patient mix.
          </div>
        </div>
      </div>

      {/* BLUEPRINT ↔ OTHER PROGRAMS */}
      <div className="mb-12">
        <SectionHeader label="System Integration" title="How Blueprint Connects to Other Vermont Programs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/vermont-rht-program", label: "VCCI (Chronic Care Initiative)", color: "border-rose-200 hover:border-rose-400 hover:bg-rose-50", textColor: "text-rose-700", desc: "VCCI's High/Very High risk Medicaid members are identified via claims analytics. When they engage with a Blueprint PCMH practice, the CHT coordinates between VCCI case manager and PCP. CHTs receive VCCI referrals for Medium-risk members who don't qualify for intensive case management." },
            { href: "/ahead-model", label: "Vermont AHEAD ACO", color: "border-sky-200 hover:border-sky-400 hover:bg-sky-50", textColor: "text-sky-700", desc: "Blueprint PCMH practices are the primary care foundation for AHEAD ACO attribution. Attributed Medicare beneficiaries are managed through the PCMH's care coordination infrastructure. ACO global budget calculations assume Blueprint-level primary care investment." },
            { href: "/vermont-act-68", label: "Vermont Act 68 (2025)", color: "border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50", textColor: "text-indigo-700", desc: "Act 68 created the Vermont Steering Committee for Comprehensive Primary Health Care, with Blueprint as a central pillar. Act 68 explicitly charges AHS and Blueprint with expanding primary care access and improving PCMH payment sustainability across all payers." },
            { href: "/vermont-designated-agencies", label: "Designated Agencies (MH/SUD)", color: "border-violet-200 hover:border-violet-400 hover:bg-violet-50", textColor: "text-violet-700", desc: "Blueprint CHTs coordinate warm handoffs to the 11 Designated Agencies for members needing specialty BH or SUD services beyond what MHI integration can provide in-office. Co-location pilots between Blueprint practices and DA staff exist in several regions." },
            { href: "/vermont-sash", label: "SASH Program", color: "border-teal-200 hover:border-teal-400 hover:bg-teal-50", textColor: "text-teal-700", desc: "SASH launched under Blueprint infrastructure and remains closely integrated. SASH Coordinators connect housing-based Medicare seniors to Blueprint PCMH practices for primary care. SASH wellness nurses work alongside CHT care coordinators on shared high-risk members." },
            { href: "/research-lab/vbc-clinical-quality?tab=risk", label: "VCCI Risk Stratification Lab", color: "border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50", textColor: "text-emerald-700", desc: "Explore the CDPS composite risk scoring that DVHA uses to identify VCCI-eligible members and assign them to CHT vs. intensive case management. See synthetic Vermont patient scenarios showing the full risk stratification workflow." },
          ].map(item => (
            <Link key={item.href} href={item.href} className={`block border rounded-xl p-4 transition-all ${item.color}`}>
              <p className={`font-black text-sm mb-1.5 ${item.textColor}`}>{item.label}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mb-12">
        <SectionHeader label="History" title="Blueprint Timeline" />
        <div className="border-l-2 border-emerald-300 pl-6 space-y-4">
          {BLUEPRINT_TIMELINE.map(item => (
            <div key={item.year} className="flex gap-4">
              <span className="text-xs font-black text-emerald-700 w-12 shrink-0 mt-0.5">{item.year}</span>
              <p className="text-sm text-slate-600 leading-relaxed">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RESOURCES */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
        <SectionHeader label="Official Resources" title="Reports, Data & Implementation Materials" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { href: "https://legislature.vermont.gov/assets/Legislative-Reports/2025_Blueprint_For_Health_Annual_Report.pdf", label: "2025 Blueprint Annual Report", desc: "Filed February 4, 2025 — latest program data including CHW deployment, MHI enrollment, PCMH practice counts" },
            { href: "https://legislature.vermont.gov/assets/Legislative-Reports/2024-Blueprint-for-Health-Annual-Report-Updated-2.pdf", label: "2024 Blueprint Annual Report", desc: "2024 program data — practice participation, payment amounts, CHT staffing, quality metrics" },
            { href: "https://blueprintforhealth.vermont.gov/annual-reports", label: "All Blueprint Annual Reports (2008–2025)", desc: "Complete archive at blueprintforhealth.vermont.gov — includes 2022, 2021, 2020 and earlier" },
            { href: "https://blueprintforhealth.vermont.gov/implementation-materials", label: "Implementation Materials", desc: "Practice toolkits, CHT guides, PCMH application materials, and data reporting resources" },
            { href: "https://blueprintforhealth.vermont.gov/program-design-development", label: "Program Design & Development", desc: "Technical documentation of the Blueprint payment model, PCMH scoring, and CHT funding methodology" },
            { href: "https://blueprintforhealth.vermont.gov/mental-health-integration-mhi-primary-care", label: "Mental Health Integration Initiative", desc: "MHI pilot design, expansion plans, training curriculum, and outcome data (2023–present)" },
            { href: "https://legislature.vermont.gov/Documents/2026/Workgroups/Senate%20Health%20and%20Welfare/Reports%20and%20Resources/W~Agency%20of%20Human%20Services~Annual%20Report%20on%20Blueprint%20for%20Health~2-4-2025.pdf", label: "Senate Health & Welfare Committee — Blueprint Testimony 2025", desc: "AHS testimony to the Senate Health & Welfare Committee on Blueprint status (February 2025)" },
            { href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4913508/", label: "NCBI: Blueprint All-Payer Model Reduces Expenditures (PMC)", desc: "Peer-reviewed study: Vermont's community-oriented all-payer medical home model reduces expenditures and utilization while delivering high-quality care" },
          ].map(r => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-sm transition-all group">
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 group-hover:text-emerald-700 text-xs transition-colors">{r.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
