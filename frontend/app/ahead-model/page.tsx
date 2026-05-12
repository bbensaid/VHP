import Link from "next/link";

export const metadata = {
  title: "AHEAD Model | HTR States",
  description: "CMS AHEAD Model analysis — state-based total cost of care model participation, global budget design, multi-payer alignment, and performance across participating states.",
};

const participatingStates = [
  {
    name: "Connecticut",
    abbr: "CT",
    status: "Active",
    focus: "Total cost of care reduction with a statewide primary care investment floor and hospital global budgets for participating systems.",
    equity: "Mandated health equity benchmarks targeting Black and Hispanic populations with historically higher preventable hospitalization rates.",
    pciTarget: "$120M",
    color: "bg-sky-50 border-sky-200",
    badge: "bg-sky-100 text-sky-800",
  },
  {
    name: "Hawaii",
    abbr: "HI",
    status: "Active",
    focus: "Island-based care delivery redesign with emphasis on Native Hawaiian health equity and integrated behavioral health in primary care.",
    equity: "Health Equity Benchmark centered on Native Hawaiian and Pacific Islander chronic disease burden, the largest disparity gap in the state.",
    pciTarget: "$85M",
    color: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "Maryland",
    abbr: "MD",
    status: "Active",
    focus: "Extension of Maryland's established all-payer hospital global budget model to full total cost of care accountability under AHEAD.",
    equity: "Builds on the state's existing hospital rate-setting system to address persistent disparities in Baltimore and the Eastern Shore.",
    pciTarget: "$160M",
    color: "bg-indigo-50 border-indigo-200",
    badge: "bg-indigo-100 text-indigo-800",
  },
  {
    name: "Minnesota",
    abbr: "MN",
    status: "Active",
    focus: "Multi-payer alignment across commercial, Medicare, and Medicaid to standardize value-based contracting and reduce administrative complexity.",
    equity: "Health Equity Benchmark targets American Indian and Alaska Native populations, with care navigation investments in tribal health systems.",
    pciTarget: "$140M",
    color: "bg-violet-50 border-violet-200",
    badge: "bg-violet-100 text-violet-800",
  },
  {
    name: "New Hampshire",
    abbr: "NH",
    status: "Active",
    focus: "Statewide primary care transformation with emphasis on behavioral health integration and substance use disorder treatment access.",
    equity: "Health Equity Benchmark addresses the rural-urban care gap and targets populations with highest rates of opioid-related mortality.",
    pciTarget: "$75M",
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-800",
  },
  {
    name: "Vermont",
    abbr: "VT",
    status: "Active",
    focus: "Deepens Vermont's long-standing all-payer model (Act 48 legacy) with a new TCOC accountability framework and primary care investment mandate.",
    equity: "Health Equity Benchmark focuses on income-based disparities in chronic disease management and maternal health outcomes.",
    pciTarget: "$65M",
    color: "bg-rose-50 border-rose-200",
    badge: "bg-rose-100 text-rose-800",
  },
];

const pillars = [
  {
    number: "01",
    title: "Hospital Global Budget (HGB)",
    color: "text-sky-700",
    accent: "bg-sky-600",
    border: "border-sky-200",
    bg: "bg-sky-50",
    body: "Participating hospitals transition from fee-for-service volume incentives to a prospective annual global budget. The budget is set based on historical costs, population need, and quality performance. Hospitals that reduce costs keep a share of the savings; those that exceed their budget absorb a portion of the excess.",
    impact: "Breaks the structural incentive to over-treat, opening space for prevention, primary care, and care coordination investments.",
  },
  {
    number: "02",
    title: "Primary Care Investment (PCI)",
    color: "text-emerald-700",
    accent: "bg-emerald-600",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    body: "States commit a defined percentage of total health expenditure to primary care — a floor that grows over the model period. CMMI provides upfront infrastructure payments to support the build-out of multi-disciplinary primary care teams, behavioral health integration, and care management capabilities.",
    impact: "Addresses the chronic underinvestment in primary care relative to specialty and acute care — a root cause of cost escalation and avoidable hospitalizations.",
  },
  {
    number: "03",
    title: "Health Equity Benchmark (HEB)",
    color: "text-violet-700",
    accent: "bg-violet-600",
    border: "border-violet-200",
    bg: "bg-violet-50",
    body: "Each state must define measurable health equity targets — tied to specific populations, conditions, and disparity gaps — and demonstrate progress annually. Financial performance is partially contingent on equity improvement, making it structurally inseparable from cost and quality.",
    impact: "For the first time in a CMS model, equity is not a reporting checkbox — it is a financial performance dimension. States that ignore disparity gaps cannot succeed under AHEAD.",
  },
  {
    number: "04",
    title: "Total Cost of Care (TCOC) Accountability",
    color: "text-indigo-700",
    accent: "bg-indigo-600",
    border: "border-indigo-200",
    bg: "bg-indigo-50",
    body: "States are held accountable for bending the overall healthcare cost curve — not just Medicare spending. By including commercial and Medicaid expenditure in the TCOC target, AHEAD prevents cost-shifting between payers. States must demonstrate that cost growth is slowing across the entire population, not just Medicare beneficiaries.",
    impact: "The most ambitious scope of any CMS payment model to date. All-payer accountability closes the loopholes that previous single-payer models left open.",
  },
];

const timeline = [
  { year: "2021", event: "CMMI announces AHEAD as a priority model in its strategic refresh, emphasizing equity and total cost of care as the next generation of payment reform." },
  { year: "2022", event: "State applications open. CMS receives proposals from over 20 states, selecting 6 finalists through a competitive review of readiness, existing infrastructure, and equity commitment." },
  { year: "2023", event: "Cooperative agreements signed with CT, HI, MD, MN, NH, and VT. Infrastructure payments begin; states initiate stakeholder alignment with hospitals, payers, and community organizations." },
  { year: "2024", event: "Model officially launches. Hospital Global Budget year one baselines established. Primary Care Investment floors activated. Health Equity Benchmarks formally defined per state." },
  { year: "2026", event: "First performance reconciliation. States report Year 2 TCOC trends, PCI achievement, and HEB progress. Early data indicates CT and MD leading on cost trajectory; HI leading on equity improvement rates." },
  { year: "2034", event: "Model end date. Full 10-year outcomes analysis. CMS determines whether AHEAD framework is eligible for nationwide expansion under the Affordable Care Act's Innovation Center scaling authority." },
];

const stats = [
  { value: "6", label: "Participating States" },
  { value: "$645M+", label: "Infrastructure Investment" },
  { value: "2034", label: "Model End Date" },
  { value: "3", label: "Payer Types Covered" },
];

export default function AheadModelPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900/30 via-slate-950 to-emerald-900/20 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-20 z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Federal Program
              </span>
              <span className="text-slate-500 text-sm">
                CMS Innovation Center · CMMI
              </span>
            </div>
            <h1 className="ty-h1-xl font-black tracking-tight leading-[0.95] mb-6">
              AHEAD Model
              <br />
              <span className="text-emerald-400">Advancing All-Payer</span>
              <br />
              Health Equity & Reform
            </h1>
            <p className="ty-hero text-slate-300 leading-relaxed max-w-3xl mb-4">
              The most ambitious payment reform model in CMS history. AHEAD holds states accountable for bending the total cost of care curve across all payers — Medicare, Medicaid, and commercial — while requiring measurable progress on health equity as a condition of financial success.
            </p>
            <p className="ty-hero text-slate-400 leading-relaxed max-w-3xl mb-10">
              Six states. One decade. The framework that could define the next era of American healthcare financing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#participating-states"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors"
              >
                View Participating States
                <span aria-hidden>↓</span>
              </Link>
              <Link
                href="#program-pillars"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors"
              >
                Program Architecture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-slate-200">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-4 first:pl-0 last:pr-0">
                <div className="ty-h1 font-black text-slate-900 tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS AHEAD ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-emerald-600 mb-4 block">
              The Big Picture
            </span>
            <h2 className="ty-h1 font-black tracking-tight text-slate-900 leading-tight mb-6">
              Why AHEAD is different from every model before it.
            </h2>
            <p className="ty-hero text-slate-600 leading-relaxed mb-5">
              Every previous CMS payment model operated within a single payer silo — typically Medicare. The result was predictable: health systems would reform their Medicare contracts while shifting costs to commercial payers. Total spending continued rising even as Medicare metrics improved.
            </p>
            <p className="ty-hero text-slate-600 leading-relaxed mb-5">
              AHEAD closes that loophole by holding states accountable for <em>total</em> cost of care — across all payers simultaneously. A state cannot succeed by shifting costs. It must actually reduce the growth rate of healthcare spending for the entire population.
            </p>
            <p className="ty-hero text-slate-600 leading-relaxed">
              Simultaneously, AHEAD makes health equity a financial performance dimension for the first time. States that fail to demonstrate measurable progress on their Health Equity Benchmarks cannot achieve full financial success under the model — regardless of their cost trajectory.
            </p>
          </div>

          {/* Comparison card */}
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">
                How AHEAD compares to prior models
              </p>
              {[
                {
                  dimension: "Payer scope",
                  prior: "Medicare only",
                  ahead: "All payers: Medicare + Medicaid + Commercial",
                  advantage: true,
                },
                {
                  dimension: "Equity accountability",
                  prior: "Voluntary reporting",
                  ahead: "Mandatory Health Equity Benchmark — tied to financial performance",
                  advantage: true,
                },
                {
                  dimension: "Primary care investment",
                  prior: "No floor requirement",
                  ahead: "State-defined PCI floor, growing over 10 years",
                  advantage: true,
                },
                {
                  dimension: "Hospital payment",
                  prior: "Fee-for-service with bonuses",
                  ahead: "Prospective global budget for participating hospitals",
                  advantage: true,
                },
                {
                  dimension: "Model duration",
                  prior: "3–5 year pilots",
                  ahead: "10-year cooperative agreement (2024–2034)",
                  advantage: true,
                },
              ].map((row) => (
                <div key={row.dimension} className="mb-3 last:mb-0">
                  <p className="text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                    {row.dimension}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      <p className="text-[11px] text-red-700 leading-snug">{row.prior}</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                      <p className="text-[11px] text-emerald-800 font-semibold leading-snug">{row.ahead}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200">
                <div className="text-center text-[10px] font-black text-slate-400 uppercase tracking-wider">Prior Models</div>
                <div className="text-center text-[10px] font-black text-emerald-600 uppercase tracking-wider">AHEAD Model</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM PILLARS ───────────────────────────────────────────────── */}
      <section id="program-pillars" className="bg-slate-50 border-y border-slate-200 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-emerald-600 mb-4 block">
              Program Architecture
            </span>
            <h2 className="ty-h1 font-black tracking-tight text-slate-900 mb-4">
              Four interdependent pillars.
            </h2>
            <p className="ty-hero text-slate-500 max-w-2xl mx-auto">
              AHEAD is not a collection of independent initiatives. Its four components are designed to reinforce each other — eliminating the partial-reform loopholes that undermined previous payment models.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div key={p.number} className={`bg-white rounded-xl border ${p.border} p-8 shadow-sm`}>
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-10 h-10 rounded-full ${p.accent} text-white flex items-center justify-center text-sm font-black shrink-0`}>
                    {p.number}
                  </div>
                  <h3 className={`text-xl font-black ${p.color} leading-tight pt-1`}>{p.title}</h3>
                </div>
                <p className="text-slate-600 ty-body leading-relaxed mb-4">{p.body}</p>
                <div className={`${p.bg} border ${p.border} rounded-lg p-4`}>
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">Why it matters</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{p.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTICIPATING STATES ──────────────────────────────────────────── */}
      <section id="participating-states" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-emerald-600 mb-4 block">
            State Profiles
          </span>
          <h2 className="ty-h1 font-black tracking-tight text-slate-900 mb-4">
            Six states. One shared framework.
          </h2>
          <p className="ty-hero text-slate-500 max-w-3xl">
            Each state enters AHEAD with a unique health system context, payer mix, and equity challenge — but all operate under the same TCOC accountability structure and Health Equity Benchmark requirement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participatingStates.map((state) => (
            <div key={state.abbr} className={`bg-white rounded-xl border ${state.color.split(" ")[1]} shadow-sm overflow-hidden`}>
              <div className={`${state.color} px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center font-black text-slate-800 text-sm">
                    {state.abbr}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base leading-tight">{state.name}</h3>
                    <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${state.badge}`}>
                      {state.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">PCI Target</p>
                  <p className="text-lg font-black text-slate-900">{state.pciTarget}</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Reform Focus</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{state.focus}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Equity Benchmark</p>
                  <p className="ty-body text-slate-600 leading-relaxed">{state.equity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-indigo-700 text-white rounded-xl p-6 md:p-8">
          <p className="text-[11px] font-black uppercase tracking-widest text-indigo-200 mb-3">HTR Analyst Note</p>
          <p className="text-slate-300 leading-relaxed max-w-4xl">
            Vermont is the only state participating in both AHEAD and the Rural Health Transformation Program — giving it the most complex, and potentially most instructive, multi-program reform environment in the country. Its performance under both frameworks will be a critical data point for CMS as it evaluates whether RHTP and AHEAD are complementary or require alignment.{" "}
            <Link href="/dashboard/vermont" className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-2">
              View Vermont's full program profile →
            </Link>
          </p>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section className="bg-indigo-700 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-emerald-400 mb-4 block">
              Model Timeline
            </span>
            <h2 className="ty-h1 font-black tracking-tight">
              From concept to nationwide potential: the AHEAD decade.
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
            <div className="space-y-6">
              {timeline.map((m, i) => (
                <div key={m.year} className="relative md:pl-16 flex gap-6 md:gap-0 items-start">
                  <div className="hidden md:flex absolute left-0 w-8 h-8 bg-emerald-600 rounded-full items-center justify-center shrink-0 border-2 border-slate-900">
                    <span className="text-[10px] font-black text-white">{i + 1}</span>
                  </div>
                  <div className="shrink-0 w-16 md:w-auto">
                    <span className="text-emerald-400 font-black text-lg">{m.year}</span>
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                    <p className="text-slate-300 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HTR INTELLIGENCE FRAMING ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-600 mb-4 block">
            HTR Analysis
          </span>
          <h2 className="ty-h1 font-black tracking-tight text-slate-900 mb-4">
            What AHEAD means across the six pillars.
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            {
              pillar: "Policy",
              color: "text-sky-700",
              border: "border-sky-200",
              bg: "bg-sky-50",
              accent: "bg-sky-600",
              insight: "AHEAD requires state legislative and regulatory alignment — from insurance commission approval of payer participation to Medicaid waiver authority. States with unified governance structures have a structural advantage.",
            },
            {
              pillar: "Economics",
              color: "text-emerald-700",
              border: "border-emerald-200",
              bg: "bg-emerald-50",
              accent: "bg-emerald-600",
              insight: "The all-payer TCOC target eliminates the cost-shift escape valve. For the first time, health system executives face a shared accountability environment where reducing Medicare costs at the expense of commercial rates is not viable.",
            },
            {
              pillar: "Technology",
              color: "text-indigo-700",
              border: "border-indigo-200",
              bg: "bg-indigo-50",
              accent: "bg-indigo-600",
              insight: "AHEAD's TCOC measurement requires multi-payer data aggregation infrastructure that most states have not yet built. States that invested in health information exchanges (HIEs) prior to AHEAD have a 12–18 month head start.",
            },
            {
              pillar: "Clinical",
              color: "text-rose-700",
              border: "border-rose-200",
              bg: "bg-rose-50",
              accent: "bg-rose-600",
              insight: "The Primary Care Investment requirement creates a once-in-a-generation opportunity to rebuild the primary care infrastructure that fee-for-service systematically underfinanced. States must now direct capital toward multi-disciplinary primary care — not high-margin specialty expansion.",
            },
            {
              pillar: "Equity",
              color: "text-violet-700",
              border: "border-violet-200",
              bg: "bg-violet-50",
              accent: "bg-violet-600",
              insight: "The Health Equity Benchmark is AHEAD's most consequential — and most novel — feature. Tying financial performance to equity outcomes creates an incentive structure that no prior federal model has attempted. Its rigor will determine whether AHEAD is transformative or performative.",
            },
          ].map((p) => (
            <div key={p.pillar} className={`bg-white rounded-xl border ${p.border} p-6 shadow-sm`}>
              <div className={`w-8 h-1 ${p.accent} rounded-full mb-4`} />
              <h3 className={`font-black text-lg mb-3 ${p.color}`}>{p.pillar}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{p.insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-emerald-700 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="ty-h1 font-black tracking-tight mb-4">
            Track AHEAD as it unfolds.
          </h2>
          <p className="text-emerald-200 text-lg mb-8 max-w-2xl mx-auto">
            HTR monitors CMMI releases, state equity benchmark filings, hospital global budget performance, and primary care investment data across all six participating states.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-white text-emerald-800 px-8 py-4 rounded-lg font-black hover:bg-emerald-50 transition-colors"
            >
              Ask the AI Analyst
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-emerald-800 text-white border border-emerald-600 px-8 py-4 rounded-lg font-black hover:bg-emerald-900 transition-colors"
            >
              View RHTP Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
