import Link from "next/link";
import {
  LightBulbIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    icon: MagnifyingGlassIcon,
    color: "text-indigo-600",
    iconBg: "bg-indigo-50",
    border: "border-indigo-100",
    accent: "bg-indigo-600",
    accentLight: "bg-indigo-50",
    number: "01",
    title: "Intellectual Rigor",
    body: "Every analysis is grounded in primary sources — CMS filings, legislative text, peer-reviewed evidence, and real financial disclosures. We do not trade in speculation dressed as insight.",
    detail: "Our principal analysts are required to cite the specific document, filing, or study behind every factual claim. When the evidence is uncertain, we say so. When a position must be revised, we publish the revision alongside the original — with an explicit explanation of what changed and why.",
    standard: "Primary source citation on every factual claim",
  },
  {
    icon: ShieldCheckIcon,
    color: "text-slate-700",
    iconBg: "bg-slate-100",
    border: "border-slate-200",
    accent: "bg-slate-700",
    accentLight: "bg-slate-50",
    number: "02",
    title: "Editorial Independence",
    body: "No sponsored content. No pharma funding. No technology vendor relationships that influence our assessments. Revenue flows from subscribers, advisory clients, and masterclass participants — never from the industries we cover.",
    detail: "HTR operates on a strict separation between editorial and commercial functions. No industry partner has ever reviewed, altered, or approved any piece of analysis before publication. Our advisory clients receive our honest assessment — including when that assessment is unfavorable to their interests.",
    standard: "Zero revenue from covered industries",
  },
  {
    icon: LightBulbIcon,
    color: "text-amber-600",
    iconBg: "bg-amber-50",
    border: "border-amber-100",
    accent: "bg-amber-500",
    accentLight: "bg-amber-50",
    number: "03",
    title: "Systemic Thinking",
    body: "A policy that is permissible but economically unsustainable is not a solution. A technology that is possible but operationally undeliverable is not progress. We test every insight across all six pillars before it reaches you.",
    detail: "This is the core discipline that separates HTR from conventional health policy or business analysis. A recommendation that optimizes for one dimension — cost, or quality, or equity — while creating new failures in another is not a recommendation we will publish. Every insight must survive interrogation across Policy, Economics, Technology, Clinical, Equity, and Operations before it leaves our desk.",
    standard: "Six-pillar stress test on every analysis",
  },
  {
    icon: HeartIcon,
    color: "text-rose-600",
    iconBg: "bg-rose-50",
    border: "border-rose-100",
    accent: "bg-rose-500",
    accentLight: "bg-rose-50",
    number: "04",
    title: "Community First",
    body: "Transformation is only meaningful if it improves outcomes for the patients in the communities that have historically been left behind. We hold every analysis accountable to the populations — underserved, underinsured, and underrepresented — at the center of our mandate.",
    detail: "We measure the success of every health system intervention not by its headline financial metrics, but by what it delivers for the patients who had the least access before it was implemented. When a new care model widens a disparity gap, we say so — regardless of how favorable its aggregate outcomes appear.",
    standard: "Equity impact assessed on every recommendation",
  },
  {
    icon: UserGroupIcon,
    color: "text-emerald-600",
    iconBg: "bg-emerald-50",
    border: "border-emerald-100",
    accent: "bg-emerald-600",
    accentLight: "bg-emerald-50",
    number: "05",
    title: "Cross-Disciplinary Collaboration",
    body: "Policymakers, economists, clinicians, technologists, equity advocates, and operations executives do not naturally speak the same language. HTR is the translation layer — and we hold the six-pillar standard for every piece of intelligence we publish.",
    detail: "Our editorial structure is explicitly cross-functional. Before any analysis is published, it is reviewed by analysts from at least two adjacent disciplines. A technology piece is reviewed by our Economics, Clinical, and Operations leads. A policy analysis passes through our Equity, Operations, and Technology desks. This is not a formality — it is the mechanism by which we catch the blind spots that siloed thinking invariably produces.",
    standard: "Multi-pillar review before publication",
  },
  {
    icon: ChartBarIcon,
    color: "text-violet-600",
    iconBg: "bg-violet-50",
    border: "border-violet-100",
    accent: "bg-violet-600",
    accentLight: "bg-violet-50",
    number: "06",
    title: "Radical Transparency",
    body: "We publish our methodology, our scoring weights, and our data sources. When we revise a position based on new evidence, we say so explicitly. Accountability is non-negotiable at every level of our work.",
    detail: "The State Performance Index publishes every scoring weight, every data source, and every methodological assumption in plain language. When we update a model, we publish a change log. When we were wrong, we say so in print — not in a correction buried at the bottom of a revised page, but in a clearly labeled editorial note at the top.",
    standard: "Full methodology published and versioned",
  },
];

export default function ValuesPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-indigo-700 text-white overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-100 h-100 bg-violet-600/10 rounded-full blur-3xl -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-125 h-125 bg-indigo-600/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-indigo-400 mb-6 border border-indigo-800 bg-indigo-900/40 px-4 py-1.5 rounded-full">
              Core Values
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-8">
              What we<br />
              <span className="text-indigo-400">stand for.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Six principles that govern every analysis, every recommendation, and every relationship we hold with the people who trust our intelligence. These are not aspirations — they are operating standards, each with a measurable commitment attached.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALUES GRID ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((v) => (
            <div key={v.title} className={`bg-white border ${v.border} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
              {/* Card header */}
              <div className={`${v.accentLight} border-b ${v.border} px-8 py-6 flex items-center gap-5`}>
                <div className={`w-14 h-14 ${v.iconBg} rounded-xl flex items-center justify-center shrink-0 border ${v.border}`}>
                  <v.icon className={`w-7 h-7 ${v.color}`} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{v.number}</span>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">{v.title}</h3>
                </div>
              </div>
              {/* Card body */}
              <div className="px-8 py-6 space-y-4">
                <p className="text-base font-semibold text-slate-800 leading-relaxed">{v.body}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{v.detail}</p>
                <div className={`flex items-center gap-2 pt-2`}>
                  <div className={`w-2 h-2 rounded-full ${v.accent} shrink-0`} />
                  <span className={`text-xs font-black uppercase tracking-wider ${v.color}`}>
                    Our standard: {v.standard}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY VALUES MATTER ─────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-600 mb-4 block">
                Why This Matters
              </span>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6">
                Values without accountability are marketing.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                The healthcare intelligence market is saturated with analysis that is funded by, shaped by, or distributed through the very industries it purports to evaluate. Vendor-sponsored research, industry-funded think tanks, and conference-circuit consensus masquerade as independent insight.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                HTR was built as a structural corrective to that problem. Our values are not a brand positioning exercise — they are the operational architecture of a business model that is deliberately designed to produce intelligence that the industry cannot buy, suppress, or spin.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "Who funds us",
                  value: "Subscribers, advisory clients, Academy enrollees",
                  status: "clean",
                },
                {
                  label: "Who does NOT fund us",
                  value: "Pharma, device manufacturers, health IT vendors, payers, hospital systems",
                  status: "clean",
                },
                {
                  label: "Who reviews our analysis before publication",
                  value: "Internal multi-pillar editorial review — never external industry partners",
                  status: "clean",
                },
                {
                  label: "What happens when we get something wrong",
                  value: "We publish a labeled correction at the top of the original piece, with full explanation",
                  status: "clean",
                },
              ].map((row) => (
                <div key={row.label} className="bg-white border border-slate-200 rounded-xl p-5">
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">{row.label}</p>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
          Values inform methodology. Methodology produces intelligence.
        </h2>
        <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
          Understand how our values are operationalized in the six-question framework we apply to every analysis.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/about/framework" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-indigo-700 transition-colors">
            Our Analytical Framework
          </Link>
          <Link href="/mission" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors">
            Mission & Vision
          </Link>
        </div>
      </section>
    </div>
  );
}
