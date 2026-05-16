import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Vermont Act 167 (2022) | HTR States",
  description: "Analysis of Vermont's Act 167 — the 2022 health care affordability law establishing the Green Mountain Care Board's expanded authority over hospital and insurance spending.",
};

// ── External link helper ──────────────────────────────────────────────────────
function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-violet-700 hover:text-violet-900 underline underline-offset-2 transition-colors"
    >
      {children}
      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 shrink-0" />
    </a>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="text-xs font-black uppercase tracking-widest text-violet-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

// ── Press card ────────────────────────────────────────────────────────────────
function PressCard({
  publication,
  date,
  title,
  summary,
  href,
}: {
  publication: string;
  date: string;
  title: string;
  summary: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-violet-300 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600">{publication}</span>
        <span className="text-[11px] text-slate-400 font-medium">{date}</span>
      </div>
      <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-violet-800 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed">{summary}</p>
    </a>
  );
}

// ── Finding card ─────────────────────────────────────────────────────────────
function FindingCard({ number, title, detail }: { number: string; title: string; detail: string }) {
  return (
    <div className="flex gap-4 bg-white border border-slate-200 rounded-xl p-5">
      <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 font-black text-sm flex items-center justify-center shrink-0">
        {number}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm mb-1">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function VermontAct167Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-violet-100 text-violet-700 border border-violet-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
            State Initiative · Vermont
          </span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">
            Enacted 2022
          </span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">
          Vermont Act 167
        </h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          Vermont's landmark hospital transformation law directing a comprehensive overhaul of
          the state's healthcare delivery system — including an all-payer model agreement
          with the federal government and value-based payment reform across all 14 Vermont hospitals.
        </p>
        <div className="flex flex-wrap gap-3">
          <ExternalLink href="https://legislature.vermont.gov/Documents/2022/Docs/ACTS/ACT167/ACT167%20As%20Enacted.pdf">
            Read Act 167 (Full Text)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/bill/status/2022/S.285">
            Legislative History (S.285)
          </ExternalLink>
          <ExternalLink href="https://gmcboard.vermont.gov/hospitalsustainability">
            GMCB Hub
          </ExternalLink>
          <ExternalLink href="https://healthcarereform.vermont.gov/frequently-asked-questions-act-167-hospital-transformation-report">
            Official FAQ
          </ExternalLink>
        </div>
      </div>

      {/* ── WHAT IS ACT 167 ───────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Legislative Background" title="What Is Act 167?" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-3">The Law</h3>
            <p className="ty-body text-slate-600 leading-relaxed mb-4">
              Formally titled <em>"An Act Relating to Health Care Reform Initiatives, Data Collection,
              and Access to Home- and Community-Based Services,"</em> Act 167 was enacted in 2022
              (originating as S.285) and signed by Governor Phil Scott.
            </p>
            <p className="ty-body text-slate-600 leading-relaxed">
              It represents Vermont's most ambitious statutory framework for hospital transformation
              since the original All-Payer ACO Model, and directly underpins the state's entry into
              the federal <Link href="/ahead-model" className="text-violet-700 hover:text-violet-900 underline underline-offset-2">AHEAD Model</Link>.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-3">Core Directives</h3>
            <ul className="space-y-2 ty-body text-slate-600">
              {[
                "Direct the Agency of Human Services (AHS) to negotiate a new All-Payer Model agreement with CMS",
                "Direct the Green Mountain Care Board (GMCB) to develop value-based payment models for all Vermont hospitals",
                "Conduct robust community and stakeholder engagement across all 14 hospitals",
                "Reduce inefficiencies, lower total cost of care, and address health inequities",
                "Set a reform implementation target date of 2028",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-violet-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-5">Key Milestones</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-violet-100" />
            <div className="space-y-5">
              {[
                { date: "2022", event: "Act 167 enacted (S.285 signed by Gov. Phil Scott)" },
                { date: "Aug 2023", event: "Green Mountain Care Board awards Oliver Wyman Group a $1.05M contract to lead community engagement" },
                { date: "Oct–Nov 2023", event: "Round 1 community engagement: hundreds of interviews, public meetings across Vermont" },
                { date: "Jun 2024", event: "Oliver Wyman publicly characterizes Vermont's health care system as 'badly broken'" },
                { date: "Jul 2, 2024", event: "CMS announces Vermont selected for AHEAD Model Cohort 1 (alongside Maryland)" },
                { date: "Jul–Aug 2024", event: "Round 2 community engagement: statewide meetings, updated data collection" },
                { date: "Sep 18, 2024", event: "Oliver Wyman delivers final 144-page report to GMCB — recommends hospital consolidations, service line closures" },
                { date: "Oct 2024", event: "Gifford Medical Center uncovers major data errors; multiple hospitals push back" },
                { date: "Oct 23, 2024", event: "Oliver Wyman admits errors but holds firm on overall conclusions" },
                { date: "Dec 2024", event: "Vermont Legislature examines EMS reform as near-term priority stemming from Act 167 findings" },
                { date: "Jan 1, 2026", event: "AHEAD Model Cohort 1 implementation officially begins in Vermont" },
              ].map((item) => (
                <div key={item.date} className="flex gap-6 pl-10 relative">
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-violet-500 border-2 border-white shadow-sm" />
                  <div className="w-24 shrink-0 text-xs font-bold text-violet-600 pt-0.5">{item.date}</div>
                  <div className="text-sm text-slate-700">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OLIVER WYMAN REPORT ───────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="The Oliver Wyman Report" title="A System Described as 'Badly Broken'" />

        <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-widest text-violet-600 mb-1">About the Report</p>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Act 167 Community Engagement: Recommendations
              </h3>
              <p className="ty-body text-slate-600 leading-relaxed mb-4">
                Commissioned by the Green Mountain Care Board under a fixed-price $1,050,000 contract
                (August 2023 – September 2024), this 144-page study — led by <strong>Bruce Hamory, MD</strong>,
                a physician-consultant and partner at <strong>Oliver Wyman Group</strong> — represents the
                most comprehensive external assessment of Vermont's hospital system ever undertaken.
              </p>
              <p className="ty-body text-slate-600 leading-relaxed">
                The report synthesized data from two rounds of community engagement involving hundreds
                of interviews, public meetings across the state, and thousands of Vermonters — patients,
                nurses, physicians, hospital administrators, and community advocates.
              </p>
            </div>
            <div className="md:w-56 shrink-0 space-y-3">
              {[
                { label: "Released", value: "September 18, 2024" },
                { label: "Length", value: "144 pages" },
                { label: "Contract Value", value: "$1,050,000" },
                { label: "Lead Consultant", value: "Bruce Hamory, MD" },
                { label: "Firm", value: "Oliver Wyman Group" },
                { label: "Client", value: "Green Mountain Care Board" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-lg px-4 py-2 border border-violet-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</div>
                  <div className="text-sm font-bold text-slate-800">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <ExternalLink href="https://gmcboard.vermont.gov/sites/gmcb/files/documents/Act%20167%20Community%20Engagement_OW%20Exec%20Summary%20Report%20-%20revised%2010.21.2024.pdf">
              Download Executive Summary (PDF)
            </ExternalLink>
            <ExternalLink href="https://gmcboard.vermont.gov/hospitalsustainability">
              GMCB Hospital Sustainability Hub
            </ExternalLink>
          </div>
        </div>

        {/* Five challenges */}
        <h3 className="text-lg font-bold text-slate-900 mb-4">Five Core Challenges Identified</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <FindingCard
            number="1"
            title="Rising Healthcare Costs"
            detail="Vermont already has some of the highest per-capita healthcare costs in the nation, driven by high hospital prices and an aging, high-need population."
          />
          <FindingCard
            number="2"
            title="Hospital Financial Losses"
            detail="Most Vermont hospitals are operating at a loss. By 2028, 13 of Vermont's 14 hospitals are projected to face even deeper deficits without immediate structural changes."
          />
          <FindingCard
            number="3"
            title="Aging Population Pressure"
            detail="Vermont's demographics are driving rising demand and costs simultaneously, straining both clinical capacity and hospital finances."
          />
          <FindingCard
            number="4"
            title="Long Wait Times"
            detail="Access to primary, specialty, and behavioral health care is severely constrained by workforce shortages and geographic barriers across the state."
          />
          <FindingCard
            number="5"
            title="Health Equity Disparities"
            detail="Significant gaps in health outcomes persist between rural and urban areas, and across income levels — particularly for behavioral health and preventive care."
          />
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
            <div className="font-bold text-rose-800 text-sm mb-1">Financial Crisis Projection</div>
            <p className="text-xs text-rose-700 leading-relaxed">
              Without action, Vermont's hospitals could require up to <strong>$3 billion in subsidies</strong> over the
              next five years — funded by commercial insurance increases or taxpayers — to remain solvent.
            </p>
          </div>
        </div>

        {/* Hospitals at risk */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-slate-900 mb-4">Most At-Risk Hospitals</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Grace Cottage Hospital", location: "Townshend", slug: "grace-cottage" },
              { name: "Gifford Medical Center", location: "Randolph", slug: "gifford" },
              { name: "North Country Hospital", location: "Newport", slug: "north-country" },
              { name: "Springfield Hospital", location: "Springfield", slug: "springfield" },
            ].map((h) => (
              <Link
                key={h.name}
                href={`/vermont-act-167/hospitals/${h.slug}`}
                className="block bg-rose-50 border border-rose-100 rounded-lg p-3 text-center hover:border-rose-300 hover:shadow-sm transition-all"
              >
                <div className="text-xs font-bold text-rose-800 leading-snug mb-1">{h.name}</div>
                <div className="text-[10px] text-rose-500 font-medium">{h.location}, VT</div>
                <div className="text-[10px] text-violet-600 font-bold mt-1.5">View profile →</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-8 flex gap-3">
          <Link
            href="/dashboard/vermont/hospitals"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-700 border border-violet-200 bg-violet-50 px-4 py-2 rounded-lg hover:bg-violet-100 transition-colors"
          >
            View All 14 Hospitals & Compare →
          </Link>
        </div>

        {/* Key recommendations */}
        <h3 className="text-lg font-bold text-slate-900 mb-4">Major Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Service Consolidation",
              detail: "Hospitals should consolidate specialty services at designated regional locations rather than maintaining all service lines at every facility.",
            },
            {
              title: "Community Infrastructure Investment",
              detail: "The state should invest in housing, emergency medical services, and broadband connectivity as essential health system supports.",
            },
            {
              title: "Administrative Cost Reduction",
              detail: "Hospitals should hire external consultants to reduce administrative overhead and align physician productivity with national benchmarks.",
            },
            {
              title: "Reference-Based Pricing",
              detail: "Move hospital payment toward reference-based pricing models tied to Medicare rates to reduce total cost of care.",
            },
            {
              title: "Inpatient Reconfiguration",
              detail: "Over three years, hospitals will need to close or reconfigure inpatient units that no longer meet volume or quality thresholds.",
            },
            {
              title: "Shift to Community Settings",
              detail: "Move care out of high-cost hospital settings into community-based, home, and outpatient environments wherever clinically appropriate.",
            },
            {
              title: "UVM Health Network Review",
              detail: "UVM Health Network should evaluate whether its medical education and research programs generate measurable improvements in Vermonter health outcomes.",
            },
            {
              title: "Low-Volume Specialty Programs",
              detail: "Eliminate specialty programs that do not see sufficient patient volumes to maintain clinical quality or financial sustainability.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="text-violet-500 font-black text-lg shrink-0 leading-none">→</span>
              <div>
                <div className="font-bold text-slate-900 text-sm mb-1">{item.title}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTROVERSY ──────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Controversy" title="Data Errors and Hospital Pushback" />

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-amber-900 mb-3">The Data Accuracy Crisis</h3>
          <p className="text-sm text-amber-800 leading-relaxed mb-4">
            Shortly after the report's release, <strong>Gifford Medical Center in Randolph</strong> conducted
            an independent review of the underlying data and uncovered significant discrepancies between
            Oliver Wyman's figures and Gifford's own verified records:
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 border border-amber-200 text-center">
              <div className="text-3xl font-black text-amber-700 mb-1">37%</div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Discrepancy</div>
              <div className="text-xs text-slate-600 mt-1">Acute inpatient admissions</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200 text-center">
              <div className="text-3xl font-black text-amber-700 mb-1">31%</div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Discrepancy</div>
              <div className="text-xs text-slate-600 mt-1">Emergency department visits</div>
            </div>
          </div>
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Root cause:</strong> The discharge data was drawn from Vermont's VHCURES system
            (Vermont Health Care Uniform Reporting and Evaluation System), which covers only approximately
            60% of Vermonters on private insurance — an incomplete dataset that underrepresents actual
            hospital utilization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-900 mb-3">Hospitals That Pushed Back</h4>
            <ul className="space-y-1.5 text-sm text-slate-600">
              {[
                "Gifford Medical Center (most vocal; cited 'broken trust')",
                "Grace Cottage Hospital, Townshend",
                "UVM Health Network",
                "North Country Hospital, Newport",
                "Northeastern Vermont Regional Hospital, St. Johnsbury",
                "Springfield Hospital",
              ].map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="text-rose-400 shrink-0 mt-0.5">✗</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-900 mb-3">Oliver Wyman's Response</h4>
            <p className="ty-body text-slate-600 leading-relaxed mb-3">
              On October 23, 2024, Bruce Hamory and Oliver Wyman publicly acknowledged and apologized
              for some data errors but maintained that the overall conclusions of the report remain valid
              and unchanged.
            </p>
            <p className="ty-body text-slate-600 leading-relaxed">
              GMCB Chair Owen Foster framed the report's recommendations as "options," not mandates,
              emphasizing that the board would work collaboratively with hospitals on the path forward.
            </p>
            <div className="mt-3">
              <ExternalLink href="https://www.vermontpublic.org/local-news/2024-10-23/author-of-landmark-vermont-hospital-report-admits-errors-but-stands-by-conclusions">
                Vermont Public coverage
              </ExternalLink>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h4 className="font-bold text-slate-900 mb-2">Gifford's Position</h4>
          <p className="ty-body text-slate-600 leading-relaxed">
            Gifford Medical Center held a public community forum citing "broken trust" with the consultant
            and announced its intent to fight for its current service lines — particularly its birthing center —
            which Oliver Wyman had recommended for closure or consolidation.
          </p>
          <div className="mt-3 flex gap-3 flex-wrap">
            <ExternalLink href="https://giffordhealthcare.org/gifford-health-care-uncovers-inaccurate-data-in-oliver-wyman-report/">
              Gifford's official statement
            </ExternalLink>
            <ExternalLink href="https://www.compassvermont.com/p/armed-with-bad-data-vermont-regulator">
              Compass Vermont analysis
            </ExternalLink>
          </div>
        </div>
      </section>

      {/* ── CONNECTION TO AHEAD MODEL ─────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Federal Connection" title="Act 167 and the AHEAD Model" />
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <p className="text-sm text-emerald-800 leading-relaxed mb-4">
            Act 167 explicitly directs Vermont's health reform agencies to negotiate a new All-Payer Model
            agreement with the federal government — making it the direct legislative foundation for Vermont's
            selection into the <strong>AHEAD Model (States Advancing All-Payer Health Equity Approaches
            and Development)</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {[
              { label: "CMS Announcement", value: "July 2, 2024" },
              { label: "Vermont Cohort", value: "Cohort 1 (with Maryland)" },
              { label: "Program Length", value: "11 years (2024–2034)" },
              { label: "Grant Funding", value: "Up to $12M per state" },
              { label: "Implementation Start", value: "January 1, 2026" },
              { label: "Model Type", value: "Hospital Global Budgets + Primary Care AHEAD" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-lg p-3 border border-emerald-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Link href="/ahead-model" className="inline-flex items-center gap-1.5 bg-emerald-700 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors">
              Explore the AHEAD Model →
            </Link>
            <ExternalLink href="https://humanservices.vermont.gov/src/ahead-model">
              Vermont AHS AHEAD Model page
            </ExternalLink>
          </div>
        </div>
      </section>

      {/* ── PODCAST ──────────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Audio Analysis" title="HTR Podcast: Unpacking Act 167" />
        <div className="bg-indigo-700 text-white rounded-2xl p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-2xl bg-violet-500 flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3a9 9 0 100 18A9 9 0 0012 3zm-1.5 5.25l6 3.75-6 3.75V8.25z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-black uppercase tracking-widest text-violet-400 mb-2">
                HTR Podcast Series
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Vermont Act 167: The Oliver Wyman Report and the Future of Vermont Hospitals
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                An in-depth analysis of Act 167, the Oliver Wyman Report's findings, the data controversy,
                and what Vermont's hospital transformation means for patients, providers, and policymakers.
              </p>
              {/*
                ── PODCAST LINK PLACEHOLDER ──
                Replace the href below with your actual podcast URL.
                Example formats:
                  Spotify: https://open.spotify.com/episode/...
                  Apple:   https://podcasts.apple.com/...
                  Substack: https://yourname.substack.com/p/...
              */}
              <a
                href="#podcast-link-placeholder"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3a9 9 0 100 18A9 9 0 0012 3zm-1.5 5.25l6 3.75-6 3.75V8.25z" />
                </svg>
                Listen to the Episode
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEOS ───────────────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Video Coverage" title="Watch: Public Hearings & News Reports" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* WCAX news report - Sep 18, 2024 */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="aspect-video bg-slate-100 flex items-center justify-center">
              <a
                href="https://www.wcax.com/2024/09/18/key-report-says-vermonts-health-care-system-is-critical-condition/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 text-slate-500 hover:text-violet-700 transition-colors group p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-slate-200 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-xs font-bold">WCAX News — Watch Report</span>
              </a>
            </div>
            <div className="p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-violet-600 mb-1">WCAX · Sep 18, 2024</div>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                "Key report says Vermont's health care system is in critical condition"
              </p>
            </div>
          </div>

          {/* GMCB YouTube channel */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="aspect-video bg-slate-100 flex items-center justify-center">
              <a
                href="https://www.youtube.com/@GreenMountainCareBoard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 text-slate-500 hover:text-violet-700 transition-colors group p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-slate-200 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c .8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.1c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM10 15V9l5.5 3-5.5 3z" />
                  </svg>
                </div>
                <span className="text-xs font-bold">GMCB YouTube Channel — All Public Hearings</span>
              </a>
            </div>
            <div className="p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-violet-600 mb-1">Green Mountain Care Board · Official</div>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                Full recordings of all Act 167 public board meetings and community hearings
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center">
          All Green Mountain Care Board public meetings are recorded and posted on the{" "}
          <a href="https://www.youtube.com/@GreenMountainCareBoard" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
            GMCB YouTube channel
          </a>.
        </p>
      </section>

      {/* ── PRESS COVERAGE ───────────────────────────────────────────────────── */}
      <section className="mb-16">
        <SectionHeader label="Press Coverage" title="How Vermont Media Covered Act 167" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PressCard
            publication="Vermont Public"
            date="Sep 19, 2024"
            title="Vermont hospitals are heading for bankruptcy — a plan to keep them afloat calls for dramatic changes"
            summary="The first major coverage of the Oliver Wyman report's release, capturing the scale of the financial crisis projections and the recommended restructuring."
            href="https://www.vermontpublic.org/local-news/2024-09-19/vermont-hospitals-are-heading-for-bankruptcy-a-plan-to-keep-them-afloat-calls-for-dramatic-changes"
          />
          <PressCard
            publication="VTDigger"
            date="Jun 20, 2024"
            title="Consultant deems Vermont health care system 'badly broken'"
            summary="Oliver Wyman's mid-process assessment, delivered months before the final report, set the tone for the reform debate that followed."
            href="https://vtdigger.org/2024/06/20/consultant-deems-vermont-health-care-system-badly-broken/"
          />
          <PressCard
            publication="VTDigger"
            date="Oct 29, 2024"
            title="Vermont hospitals report runs into furor over allegations of inaccurate data"
            summary="The data controversy explodes publicly. Multiple hospitals contest the VHCURES-sourced figures used to model their utilization and financial standing."
            href="https://vtdigger.org/2024/10/29/vermont-hospitals-report-runs-into-furor-over-allegations-of-inaccurate-data/"
          />
          <PressCard
            publication="Vermont Public"
            date="Oct 23, 2024"
            title="Author of landmark Vermont hospital report admits errors, but stands by conclusions"
            summary="Bruce Hamory of Oliver Wyman acknowledges data discrepancies but maintains the report's structural recommendations remain valid."
            href="https://www.vermontpublic.org/local-news/2024-10-23/author-of-landmark-vermont-hospital-report-admits-errors-but-stands-by-conclusions"
          />
          <PressCard
            publication="WBUR"
            date="Sep 25, 2024"
            title="Vermont hospitals are heading for bankruptcy — a plan to keep them afloat calls for dramatic changes"
            summary="National public radio coverage of Vermont's hospital crisis, bringing Act 167 to a broader New England audience."
            href="https://www.wbur.org/news/2024/09/25/vermont-hospital-bankruptcy-report"
          />
          <PressCard
            publication="VTDigger"
            date="Dec 10, 2024"
            title="In wake of landmark hospital report, Vermont lawmakers look toward health care reforms"
            summary="Vermont Legislature begins examining specific Act 167 implementation priorities, with EMS reform emerging as a near-term legislative action item."
            href="https://vtdigger.org/2024/12/10/in-wake-of-landmark-hospital-report-vermont-lawmakers-look-toward-health-care-reforms/"
          />
          <PressCard
            publication="Gifford Health Care"
            date="Oct 2024"
            title="Gifford Health Care Uncovers Inaccurate Data in Oliver Wyman Report"
            summary="Gifford's official press statement detailing the data discrepancies they found and their call for corrected analysis before any policy decisions are made."
            href="https://giffordhealthcare.org/gifford-health-care-uncovers-inaccurate-data-in-oliver-wyman-report/"
          />
          <PressCard
            publication="Compass Vermont"
            date="2024"
            title="Armed with Bad Data: Vermont Regulator Wages War on Gifford Hospital"
            summary="Critical policy commentary arguing that regulatory action based on flawed data threatens the viability of rural community hospitals."
            href="https://www.compassvermont.com/p/armed-with-bad-data-vermont-regulator"
          />
          <PressCard
            publication="VTDigger (Op-Ed)"
            date="Jan 26, 2025"
            title="Vermont physicians: We need to support the Green Mountain Care Board in its efforts to improve Vermont's health care delivery"
            summary="Vermont physicians publicly urge support for the GMCB's reform process, pushing back against hospital opposition to the Act 167 recommendations."
            href="https://vtdigger.org/2025/01/26/vermont-physicians-we-need-to-support-the-green-mountain-care-board-in-its-efforts-to-improve-vermonts-health-care-delivery/"
          />
          <PressCard
            publication="Vermont Business Magazine"
            date="Oct 29, 2024"
            title="GMCB, Oliver Wyman statements regarding Act 167 final report"
            summary="Official statements from both the Green Mountain Care Board and Oliver Wyman Group in response to the data accuracy controversy."
            href="https://vermontbiz.com/news/2024/october/29/gmcb-oliver-wyman-statements-regarding-act-167-final-report"
          />
        </div>

        {/* Official resources */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-4">Official Government Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: "GMCB Hospital Sustainability Hub", href: "https://gmcboard.vermont.gov/hospitalsustainability" },
              { label: "GMCB Community Engagement Meetings", href: "https://gmcboard.vermont.gov/Act-167-Community-Meetings" },
              { label: "Vermont Health Care Reform (AHS)", href: "https://healthcarereform.vermont.gov/health-care-transformation" },
              { label: "Act 167 Official FAQ", href: "https://healthcarereform.vermont.gov/frequently-asked-questions-act-167-hospital-transformation-report" },
              { label: "AHS Secretary Statement on Next Steps", href: "https://humanservices.vermont.gov/press-release/statement-ahs-secretary-jenney-samuelson-next-steps-oliver-wyman-health-care-reform" },
              { label: "Vermont Legislature — S.285 Status", href: "https://legislature.vermont.gov/bill/status/2022/S.285" },
              { label: "Act 167 Full Text (PDF)", href: "https://legislature.vermont.gov/Documents/2022/Docs/ACTS/ACT167/ACT167%20As%20Enacted.pdf" },
              { label: "GMCB 2024 Annual Report (PDF)", href: "https://legislature.vermont.gov/assets/Legislative-Reports/GMCB-2024-Annual-Report-Final-revised-01.16.2025A.pdf" },
            ].map((item) => (
              <ExternalLink key={item.label} href={item.href}>
                {item.label}
              </ExternalLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── HTR ANALYSIS ─────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader label="HTR Analysis" title="What This Means for Vermont Healthcare" />
        <div className="bg-indigo-700 text-white rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-violet-400 mb-2">The Stakes</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Vermont's hospital system faces a structural inflection point. Without consolidation and
                payment reform, the math simply does not work — particularly for the state's smallest
                critical access hospitals. Act 167 is the legislative vehicle for the hardest decisions
                Vermont has ever had to make about where and how care is delivered.
              </p>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">The Opportunity</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Vermont's entry into the AHEAD Model, enabled by Act 167, gives the state access to
                federal resources, technical assistance, and a proven framework for total cost-of-care
                reform. The 11-year model duration provides a runway for genuine transformation rather
                than short-cycle policy experiments.
              </p>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2">The Risk</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If the Oliver Wyman data controversy undermines trust in the reform process, Vermont
                risks losing the political will needed to make difficult but necessary structural changes.
                The GMCB must rebuild credibility with hospitals while maintaining momentum — a delicate
                balance with enormous consequences for Vermont communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMULATION LAB ───────────────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader label="Policy Simulation Lab" title="Simulate the Recommendations" />
        <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-900 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="bg-violet-700 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
                  Interactive Tool
                </span>
                <span className="bg-amber-700 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">
                  Synthetic Data
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mb-3 leading-tight">
                Act 167 Healthcare Transformation Simulator
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                Model implementation scenarios for every Oliver Wyman Report recommendation. Analyze the
                5-pillar impact — policy, technology, financial, equity, and clinical — with interactive
                controls, hospital-level simulations, equity analysis, and state benchmarks.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { n: "14", label: "Hospitals Modeled" },
                  { n: "14", label: "Recommendations" },
                  { n: "5", label: "Impact Pillars" },
                  { n: "8", label: "Analysis Modules" },
                ].map(({ n, label }) => (
                  <div key={label} className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-white">{n}</div>
                    <div className="text-[10px] text-violet-300 uppercase tracking-wide">{label}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/vermont-act-167/simulator"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-black text-sm px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Launch Simulation Engine →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { icon: "🎯", title: "Scenario Builder", desc: "Select recommendations and see aggregate 5-pillar impact scores" },
                { icon: "🏥", title: "Hospital Restructuring Simulator", desc: "Model REH, CACC, or closure options for at-risk hospitals with parameter controls" },
                { icon: "💰", title: "Financial Modeling Dashboard", desc: "Hospital-by-hospital financial projections, savings waterfall, ROI analysis" },
                { icon: "⚖️", title: "Equity & Access Analysis", desc: "County-level access scores, vulnerable populations, transportation scenarios" },
                { icon: "🔗", title: "Technology Roadmap", desc: "VITL, telehealth, EMS broadband implementation timeline and investment" },
                { icon: "🌎", title: "State Benchmarks", desc: "Maryland, Oregon, Minnesota, and other state transformation models and lessons" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 bg-white/10 rounded-xl p-3">
                  <span className="text-xl shrink-0">{icon}</span>
                  <div>
                    <div className="text-xs font-black text-white">{title}</div>
                    <div className="text-[11px] text-slate-400">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEGISLATIVE REPORTS & GMCB RESOURCES ─────────────────────────────── */}
      <div className="pt-8 border-t border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-violet-600 whitespace-nowrap">Official Reports & GMCB Resources</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {[
            { href: "https://legislature.vermont.gov/assets/Legislative-Reports/GMCB-2024-Annual-Report-Final-revised-01.16.2025A.pdf", label: "GMCB 2024 Annual Report", desc: "Filed Jan 15, 2025 — hospital budgets, ACO reviews, CON decisions, Act 167 status" },
            { href: "https://gmcboard.vermont.gov/hospitalsustainability", label: "GMCB Act 167 Sustainability Hub", desc: "Oliver Wyman report, community engagement process, and implementation updates" },
            { href: "https://gmcboard.vermont.gov/hospital-budget-review", label: "GMCB Hospital Budget Review Portal", desc: "All hospital budget submissions, decisions, and public hearing materials" },
            { href: "https://gmcboard.vermont.gov/sites/gmcb/files/documents/Press%20Release%20-%20Green%20Mountain%20Care%20Board%20Announces%20FY2025%20Hospital%20Budget%20Decisions%20and%20Enforcement%20of%20FY2023%20Hospital%20Budgets%20-%2009.13.2024.pdf", label: "FY2025 Budget Decisions (Sep 2024)", desc: "Press release announcing FY2025 hospital budget decisions and FY2023 enforcement" },
            { href: "https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Orientation/W~Owen%20Foster~Green%20Mountain%20Care%20Board%20Overview~2-6-2025.pdf", label: "GMCB House Committee Testimony (Feb 2025)", desc: "GMCB overview and Act 167 implementation status presented to the House Health Care Committee" },
            { href: "https://humanservices.vermont.gov/press-release/statement-ahs-secretary-jenney-samuelson-next-steps-oliver-wyman-health-care-reform", label: "AHS Secretary Statement on Oliver Wyman Report", desc: "AHS Secretary Samuelson's response and next steps following the Act 167 hospital sustainability report" },
          ].map(r => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-violet-300 hover:shadow-sm transition-all group">
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 group-hover:text-violet-700 text-xs transition-colors leading-snug">{r.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center">
          <Link href="/vermont-legislative-resources" className="text-sm font-bold text-violet-700 hover:text-violet-900 transition-colors">
            View Full Vermont Legislative Resources Library →
          </Link>
        </div>
      </div>

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200">
        <Link href="/" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
          ← Back to Home
        </Link>
        <div className="flex gap-4 flex-wrap">
          <Link href="/vermont-act-167/simulator" className="text-sm font-bold text-violet-700 hover:text-violet-900 transition-colors">
            Simulation Engine →
          </Link>
          <Link href="/ahead-model" className="text-sm font-bold text-violet-700 hover:text-violet-900 transition-colors">
            AHEAD Model →
          </Link>
          <Link href="/dashboard" className="text-sm font-bold text-violet-700 hover:text-violet-900 transition-colors">
            RHT Dashboard →
          </Link>
        </div>
      </div>

    </div>
  );
}
