import { Suspense } from "react";
import MultimediaClientPage from "./MultimediaClientPage";
import VideosPage from "@/app/media/videos/page";
import Link from "next/link";

const PODCAST_SERIES = [
  {
    id: "pillars",
    emoji: "🏛️",
    title: "Six Pillars Podcast",
    desc: "Deep-dive conversations on Policy, Economics, Technology, Clinical, Equity, and Operations — one episode per pillar per month, featuring HTR analysts and field practitioners.",
    frequency: "Monthly · 6 episodes per cycle",
    status: "Launching Q3 2025",
    accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-200",
    accentText: "text-indigo-700",
  },
  {
    id: "vermont",
    emoji: "🏔️",
    title: "Vermont Health Lab",
    desc: "On-the-ground reporting from Vermont's health system transformation — Act 167, Act 68, the AHEAD model, and what's actually working for rural hospitals.",
    frequency: "Bi-weekly · ~30 minutes",
    status: "Launching Q3 2025",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    accentText: "text-emerald-700",
  },
  {
    id: "wire",
    emoji: "⚡",
    title: "The Wire: Weekly Briefing",
    desc: "A 15-minute audio digest of the week's top healthcare policy and economics news — everything from The Wire, curated and narrated by an HTR analyst.",
    frequency: "Weekly · ~15 minutes",
    status: "Launching Q2 2025",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200",
    accentText: "text-amber-700",
  },
];

const PodcastsTab = () => (
  <div className="space-y-8">
    <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-8">
      <div className="flex items-start gap-4 mb-5">
        <span className="text-5xl">🎙️</span>
        <div>
          <h2 className="text-2xl font-black text-indigo-700 mb-1">HTR Podcast Network</h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            Three podcast series covering healthcare transformation from policy to practice.
            Episodes are produced by HTR analysts and feature practitioners, researchers, and
            executives working at the frontier of health system change. Subscribe to get notified
            at launch.
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {PODCAST_SERIES.map(s => (
        <div key={s.id} className={`rounded-xl border ${s.accentBorder} ${s.accentBg} p-5 flex flex-col`}>
          <span className="text-3xl mb-3">{s.emoji}</span>
          <h3 className={`font-black text-base ${s.accentText} mb-2`}>{s.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-3">{s.desc}</p>
          <div className="border-t border-slate-200 pt-3 space-y-1">
            <p className="text-xs text-slate-500 font-semibold">{s.frequency}</p>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded">
              {s.status}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="flex-1">
        <h3 className="font-black text-slate-900 text-lg mb-1">Get Notified at Launch</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Subscribe to receive an email when the first episodes drop. Subscribers also get
          early access to episode transcripts and show notes.
        </p>
      </div>
      <Link
        href="/connect/alerts"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow whitespace-nowrap"
      >
        Subscribe to Alerts →
      </Link>
    </div>
  </div>
);

const LIBRARY_CATEGORIES = [
  { emoji: "📋", label: "Policy Briefs", count: "Planned 2026", desc: "Downloadable PDF briefs on CMS rule-making, state Medicaid policy, and legislative analysis." },
  { emoji: "📊", label: "Data Reports", count: "Planned 2026", desc: "State-level data reports, benchmarking analyses, and research findings from the HTR Index." },
  { emoji: "🎓", label: "Webinar Recordings", count: "Available now", desc: "Full recordings from HTR webinars and expert sessions.", href: "/academy/webinars" },
  { emoji: "📖", label: "Case Studies", count: "Available now", desc: "In-depth case studies on health system transformation initiatives.", href: "/academy/case-studies" },
  { emoji: "🗒️", label: "White Papers", count: "Planned 2026", desc: "Long-form analytical papers on Six-Pillar topics, co-authored with academic and policy partners." },
  { emoji: "🔬", label: "Research Summaries", count: "Planned 2026", desc: "Structured summaries of peer-reviewed research relevant to health system transformation." },
];

const INTERACTIVE_TOOLS = [
  { emoji: "🔌", label: "Clinical Data Exchange Lab", desc: "Annotated HL7 v2 messages, FHIR R4 bundles, HL7↔FHIR bridge, and USCDI v3 browser — 8 Vermont patient scenarios.", href: "/research-lab/vbc-clinical-quality?tab=hl7" },
  { emoji: "📋", label: "VBC Quality Measures", desc: "HEDIS panel (14 measures), 30-day readmission analysis (CMS RSRR), avoidable ED tracker (AHRQ PQI).", href: "/research-lab/vbc-clinical-quality?tab=quality" },
  { emoji: "💰", label: "High vs. Low Value Care", desc: "A1C/BP panel management with VBC savings math, Choosing Wisely scan, TCOC waterfall decomposition.", href: "/research-lab/vbc-clinical-quality?tab=value" },
  { emoji: "📊", label: "Risk Stratification Methodology", desc: "HCC v28 RAF walkthrough, population tiers, algorithm comparison (HCC vs ACG vs CDPS), Vermont VCCI scenario.", href: "/research-lab/vbc-clinical-quality?tab=risk" },
  { emoji: "🔗", label: "FHIR Interoperability Lab", desc: "Build and validate FHIR R4 resources, test CDS Hooks, check ONC compliance.", href: "/research-lab/interoperability?tab=fhir" },
  { emoji: "🤖", label: "AI Clinical Governance Lab", desc: "Compare predictive models, detect algorithmic bias, build AI governance frameworks.", href: "/research-lab/technology-ai?tab=ai" },
];

// Full Vermont government document library — mirrors /vermont-legislative-resources
const VERMONT_DOCS: { group: string; color: string; items: { label: string; desc: string; href: string }[] }[] = [
  {
    group: "Green Mountain Care Board (GMCB)",
    color: "text-violet-700",
    items: [
      { label: "GMCB 2024 Annual Report", desc: "Hospital budgets, ACO reviews, CON decisions, Act 167 status (PDF)", href: "https://legislature.vermont.gov/assets/Legislative-Reports/GMCB-2024-Annual-Report-Final-revised-01.16.2025A.pdf" },
      { label: "GMCB Act 167 Hospital Sustainability Hub", desc: "Oliver Wyman report, community engagement process, implementation updates", href: "https://gmcboard.vermont.gov/hospitalsustainability" },
      { label: "GMCB Hospital Budget Review Portal", desc: "All hospital budget submissions, decisions, and public hearing materials", href: "https://gmcboard.vermont.gov/hospital-budget-review" },
      { label: "FY2025 Hospital Budget Decisions (Sep 2024)", desc: "Press release announcing FY2025 hospital budget decisions and FY2023 enforcement", href: "https://gmcboard.vermont.gov/sites/gmcb/files/documents/Press%20Release%20-%20Green%20Mountain%20Care%20Board%20Announces%20FY2025%20Hospital%20Budget%20Decisions%20and%20Enforcement%20of%20FY2023%20Hospital%20Budgets%20-%2009.13.2024.pdf" },
      { label: "FY2026 Decisions Issued", desc: "GMCB decisions for FY2026 hospital budgets — approved, modified, and denied", href: "https://gmcboard.vermont.gov/2026-decisions-issued" },
      { label: "GMCB House Committee Testimony (Feb 2025)", desc: "GMCB overview and Act 167 implementation status — House Health Care Committee", href: "https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Orientation/W~Owen%20Foster~Green%20Mountain%20Care%20Board%20Overview~2-6-2025.pdf" },
      { label: "GMCB Analytics Reports & Data", desc: "Hospital financial data, utilization trends, and population health analytics", href: "https://gmcboard.vermont.gov/data-and-analytics/analytics-rpts" },
    ],
  },
  {
    group: "AHS Office of Health Care Reform — Act 68 Reports",
    color: "text-sky-700",
    items: [
      { label: "AHS Act 68 Transformation Report — August 2025", desc: "Monthly AHS legislative report on Health Care System Transformation (PDF)", href: "https://legislature.vermont.gov/assets/Legislative-Reports/Aug-2025_Act-68-HC-System-Transformation-Report-from-AHS.pdf" },
      { label: "AHS Act 68 Transformation Report — December 2025", desc: "Monthly report — hospital planning, primary care, DVHA program updates (PDF)", href: "https://ljfo.vermont.gov/assets/Meetings/Health-Reform-Oversight-Committee/2025-12-04/Dec-2025_Act-68-HC-System-Transformation-Report-from-AHS.pdf" },
      { label: "Vermont Health Care Reform Efforts — AHS (Dec 2024)", desc: "Full AHS system overview — AHEAD, Blueprint, Act 167 status", href: "https://ljfo.vermont.gov/assets/Meetings/Health-Reform-Oversight-Committee/2024-12-06/Vermonts-Health-Care-Reform-Efforts-AHS.pdf" },
      { label: "Vermont Health Care Reform — House Testimony (Jan 2025)", desc: "AHS testimony to House Health Care Committee (PDF)", href: "https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Health%20Care%20Reform/W~Brendan%20Krause~Vermont%27s%20Health%20Care%20Reform%20Efforts%20~1-31-2025.pdf" },
      { label: "AHS Act 119 Reorganization Update (Feb 2025)", desc: "AHS restructuring and new OHCR mandate status update (PDF)", href: "https://legislature.vermont.gov/assets/Legislative-Reports/ahs-report-samuelson-act119-update-20250201.pdf" },
      { label: "AHS Secretary Statement on Oliver Wyman Report", desc: "Secretary Samuelson's response and next steps on Act 167 hospital sustainability", href: "https://humanservices.vermont.gov/press-release/statement-ahs-secretary-jenney-samuelson-next-steps-oliver-wyman-health-care-reform" },
      { label: "AHS Health Care Transformation Portal", desc: "All AHS Office of Health Care Reform policy initiatives and reports", href: "https://healthcarereform.vermont.gov/health-care-transformation" },
      { label: "AHS All Legislative Reports Archive", desc: "Complete AHS statutory reports library — all programs", href: "https://humanservices.vermont.gov/our-work/reports" },
    ],
  },
  {
    group: "Blueprint for Health Annual Reports",
    color: "text-emerald-700",
    items: [
      { label: "Blueprint Annual Report 2025", desc: "Filed Feb 4, 2025 — 128 PCMHs, CHW deployment, MHI enrollment, payment data (PDF)", href: "https://legislature.vermont.gov/assets/Legislative-Reports/2025_Blueprint_For_Health_Annual_Report.pdf" },
      { label: "Blueprint Annual Report 2024", desc: "128 PCMH practices, CHT staffing, quality metrics, Pilot program progress (PDF)", href: "https://legislature.vermont.gov/assets/Legislative-Reports/2024-Blueprint-for-Health-Annual-Report-Updated-2.pdf" },
      { label: "Blueprint Annual Report 2022", desc: "Pre-Act 167 baseline for program scale and performance (PDF)", href: "https://legislature.vermont.gov/Documents/2022/WorkGroups/House%20Health%20Care/Reports%20and%20Resources/W~Agency%20of%20Human%20Services~Annual%20Report%20on%20the%20Vermont%20Blueprint%20for%20Health~2-19-2022.pdf" },
      { label: "All Blueprint Annual Reports (2008–2025)", desc: "Complete archive at blueprintforhealth.vermont.gov", href: "https://blueprintforhealth.vermont.gov/annual-reports" },
      { label: "Senate Health & Welfare: Blueprint Testimony (Feb 2025)", desc: "AHS testimony to Senate Health & Welfare Committee on Blueprint status (PDF)", href: "https://legislature.vermont.gov/Documents/2026/Workgroups/Senate%20Health%20and%20Welfare/Reports%20and%20Resources/W~Agency%20of%20Human%20Services~Annual%20Report%20on%20Blueprint%20for%20Health~2-4-2025.pdf" },
      { label: "Mental Health Integration (MHI) Initiative", desc: "MHI pilot design, expansion plans, training curriculum, outcome data (2023–present)", href: "https://blueprintforhealth.vermont.gov/mental-health-integration-mhi-primary-care" },
    ],
  },
  {
    group: "Act 167 (2022) — Hospital Transformation",
    color: "text-violet-700",
    items: [
      { label: "Act 167 Full Text (As Enacted)", desc: "Full text of Act 167 — authorizing legislation for expanded GMCB authority (PDF)", href: "https://legislature.vermont.gov/Documents/2022/Docs/ACTS/ACT167/ACT167%20As%20Enacted.pdf" },
      { label: "Official Act 167 FAQ — AHS", desc: "AHS FAQ on the Act 167 hospital transformation report", href: "https://healthcarereform.vermont.gov/frequently-asked-questions-act-167-hospital-transformation-report" },
    ],
  },
  {
    group: "House Health Care Committee Testimony",
    color: "text-rose-700",
    items: [
      { label: "Vermont Care Partners DA/SSA Overview (2023)", desc: "Full overview of the DA/SSA system, funding structure, and sustainability challenges (PDF)", href: "https://legislature.vermont.gov/Documents/2024/WorkGroups/House%20Health%20Care/Designated%20and%20Specialized%20Service%20Agencies/W~Julie%20Tessler~Vermont%20Care%20Partners%20(VCP)%20and%20the%20Designated%20and%20Specialized%20Service%20Agencies%20(DAs-SSAs)%20-%20Overview~2-3-2023.pdf" },
      { label: "Howard Center Overview Testimony (April 2024)", desc: "Howard Center — Chittenden County DA operations and sustainability concerns (PDF)", href: "https://legislature.vermont.gov/Documents/2024/WorkGroups/House%20Health%20Care/Designated%20and%20Specialized%20Service%20Agencies/W~Kelly%20Deforge~Howard%20Center%20-%20Overview~4-25-2024.pdf" },
      { label: "VCP: Mental Health Continuum (Jan 2024)", desc: "Vermont Care Partners — full MH continuum with DA system data (PDF)", href: "https://legislature.vermont.gov/Documents/2024/WorkGroups/House%20Health%20Care/Mental%20Health/W~Amy%20Johnson~Vermont%20Care%20Partners%20-%20Presentation%20-%20The%20Mental%20Health%20Continuum~1-31-2024.pdf" },
      { label: "AHS Workforce Strategic Plan Testimony (Jan 2024)", desc: "AHS OHCR follow-up testimony on the Health Care Workforce Strategic Plan (PDF)", href: "https://legislature.vermont.gov/Documents/2024/WorkGroups/House%20Health%20Care/Health%20Care%20Workforce/W~Wendy%20Trafton~Agency%20of%20Human%20Services%20Office%20of%20Health%20Care%20Reform%20-%20Follow-up%20Testimony%20-%20Joint%20Meeting%20re%20Health%20Care%20Workforce%20Strategic%20Plan%20Report~1-24-2024.pdf" },
    ],
  },
  {
    group: "VCCI & Medicaid Program Reports",
    color: "text-rose-700",
    items: [
      { label: "DVHA VCCI Official Program Page", desc: "Enrollment criteria, referral process, case management services, and contact info", href: "https://dvha.vermont.gov/providers/vermont-chronic-care-initiative" },
      { label: "VCCI Referral Form (Current PDF)", desc: "Standardized referral form used by PCPs, hospitals, CHTs, and social workers", href: "https://dvha.vermont.gov/sites/dvha/files/doc_library/VCCI%20Referral%20Form.pdf" },
      { label: "VCCI 2017 House Committee Presentation", desc: "Most detailed public description of the VCCI risk stratification methodology (PDF)", href: "https://legislature.vermont.gov/Documents/2018/WorkGroups/House%20Health%20Care/Vermont%20Chronic%20Care%20Initiative/W~Eileen%20Girling~Vermont%20Chronic%20Care%20Initiative~4-6-2017.pdf" },
      { label: "VCCI Medicaid Reentry Presentation (Jan 2026)", desc: "VCCI's expansion into Medicaid reentry for individuals leaving incarceration (PDF)", href: "https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Corrections%20and%20Institutions/Department%20of%20Corrections/Vermont%20Medicaid%20Reentry%20Program/W~Aviva%20Tevah~VCCI%20Presentation~1-21-2026.pdf" },
    ],
  },
  {
    group: "AHEAD & All-Payer ACO Model",
    color: "text-indigo-700",
    items: [
      { label: "CMS: Vermont All-Payer ACO Model (CMMI)", desc: "Official CMS CMMI page — model design, evaluation reports, performance data", href: "https://www.cms.gov/priorities/innovation/innovation-models/vermont-all-payer-aco-model" },
      { label: "Vermont APM 4th Evaluation Report (2024)", desc: "Independent evaluation — total cost of care, quality, and utilization findings", href: "https://www.cms.gov/priorities/innovation/data-and-reports/2024/vtapm-4th-eval-report-aag" },
      { label: "DVHA Medicaid Performance Measures", desc: "Quality scorecard for Vermont Medicaid managed care and ACO performance", href: "https://dvha.vermont.gov/quality/medicaid-performance-measures" },
    ],
  },
];

const LibraryTab = () => (
  <div className="space-y-10">
    {/* Media library header */}
    <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-8">
      <div className="flex items-start gap-4 mb-5">
        <span className="text-5xl">📚</span>
        <div>
          <h2 className="text-2xl font-black text-slate-700 mb-1">Full Multimedia Library</h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            A unified archive of all HTR media assets — policy briefs, data reports, webinar
            recordings, case studies, white papers, interactive analytical tools, and Vermont
            government reports. Organized by content type.
          </p>
        </div>
      </div>
    </div>

    {/* Standard media categories */}
    <div>
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Media Formats</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LIBRARY_CATEGORIES.map(c => (
          <div key={c.label} className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{c.emoji}</span>
              <div>
                <h3 className="font-black text-slate-900 text-sm">{c.label}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${c.count === "Available now" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {c.count}
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
            {c.href && (
              <Link href={c.href} className="inline-flex items-center gap-1 text-xs font-black text-indigo-600 hover:underline mt-3">
                Browse →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Interactive analytical tools */}
    <div>
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Interactive Analytical Tools — Research Lab</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTERACTIVE_TOOLS.map(t => (
          <Link key={t.href} href={t.href} className="flex flex-col bg-white border border-indigo-100 hover:border-indigo-400 hover:bg-indigo-50 rounded-xl p-5 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{t.emoji}</span>
              <h3 className="font-black text-slate-900 text-sm group-hover:text-indigo-700 transition-colors">{t.label}</h3>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed flex-1">{t.desc}</p>
            <span className="text-xs font-black text-indigo-600 mt-3 group-hover:text-indigo-800">Open tool →</span>
          </Link>
        ))}
      </div>
    </div>

    {/* Vermont government reports — full library */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Vermont Government Reports & Official Documents</h3>
        <Link href="/vermont-legislative-resources" className="text-xs font-bold text-indigo-600 hover:underline">
          View full library →
        </Link>
      </div>
      <div className="space-y-6">
        {VERMONT_DOCS.map(group => (
          <div key={group.group}>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${group.color}`}>{group.group}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {group.items.map(r => (
                <a key={r.href} href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined}
                  rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-2.5 p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all group">
                  <span className="text-slate-400 shrink-0 mt-0.5 text-xs">📄</span>
                  <div>
                    <p className="font-bold text-slate-800 group-hover:text-indigo-700 text-xs transition-colors leading-snug">{r.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{r.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const metadata = {
  title: "HTR Multimedia | Podcasts, Videos & Library",
  description: "Podcasts, video briefings, policy briefs, and the full HTR media library — organized by the Six-Pillar Framework.",
};

export default function MultimediaHubPage() {
  return (
    <Suspense>
      <MultimediaClientPage
        podcastsTab={<PodcastsTab />}
        videosTab={<VideosPage />}
        libraryTab={<LibraryTab />}
      />
    </Suspense>
  );
}
