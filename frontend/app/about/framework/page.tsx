import Link from "next/link";

const pillars = [
  {
    number: "01",
    label: "Policy",
    question: "Is it permissible?",
    color: "text-sky-700",
    border: "border-sky-200",
    bg: "bg-sky-50",
    accent: "bg-sky-600",
    accentText: "text-sky-600",
    href: "/policy",
    why: "Nothing in healthcare happens outside a regulatory framework. Before evaluating the economics, technology, clinical evidence, or equity implications of any intervention, HTR first establishes whether it is legally permissible at the federal and state level — and under what conditions that permissibility may change.",
    what: [
      "Federal regulatory landscape: CMS, FDA, ONC, FTC, and HHS rulemaking",
      "State-level variation: scope-of-practice laws, certificate of need, Medicaid waiver authority",
      "Legislative trajectory: bills in committee, regulatory comment periods, enforcement priorities",
      "Global comparison: how peer nations have navigated equivalent regulatory decisions",
    ],
    blindspot: "A technology that is clinically effective and financially sustainable is still not deployable if it violates state scope-of-practice law or lacks FDA clearance. Policy analysis is the gate that all other analysis must pass through first.",
  },
  {
    number: "02",
    label: "Economics",
    question: "Is it sustainable?",
    color: "text-emerald-700",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    accent: "bg-emerald-600",
    accentText: "text-emerald-600",
    href: "/economics",
    why: "The history of American healthcare is littered with clinically excellent, politically popular interventions that collapsed when their financial models failed. HTR treats economic sustainability — for health systems, for payers, for patients, and for the capital markets that fund innovation — as a non-negotiable analytical dimension.",
    what: [
      "Value-based care modeling: global budgets, shared savings, risk adjustment, total cost of care",
      "Market structure: payer concentration, health system M&A, independent practice viability",
      "Workforce economics: compensation benchmarking, training pipeline capacity, retention modeling",
      "Capital flows: venture investment, CDFI deployment, federal program capital allocation",
    ],
    blindspot: "A care model that improves outcomes under a grant-funded pilot is not a solution if it cannot sustain itself under standard reimbursement. Economic analysis distinguishes demonstration projects from scalable interventions.",
  },
  {
    number: "03",
    label: "Technology",
    question: "Is it possible?",
    color: "text-indigo-700",
    border: "border-indigo-200",
    bg: "bg-indigo-50",
    accent: "bg-indigo-600",
    accentText: "text-indigo-600",
    href: "/technology",
    why: "The gap between what technology can do in a controlled environment and what it can actually do in a resource-constrained health system is one of the most persistent sources of failed implementation in healthcare. HTR's technology pillar asks not just whether a tool works, but whether it can be deployed at the point of care under real-world conditions.",
    what: [
      "AI and machine learning: model validity, training data quality, clinical decision support evidence",
      "Digital infrastructure: EHR interoperability, broadband access, device compatibility",
      "Data governance: HIPAA compliance, patient consent frameworks, algorithmic bias audits",
      "Implementation feasibility: IT staff capacity, change management, total cost of ownership",
    ],
    blindspot: "AI tools trained on urban academic medical center data may perform poorly when deployed in community health centers with different patient populations and documentation patterns. Technological feasibility must be assessed at the deployment site, not the development lab.",
  },
  {
    number: "04",
    label: "Clinical",
    question: "Is it effective?",
    color: "text-rose-700",
    border: "border-rose-200",
    bg: "bg-rose-50",
    accent: "bg-rose-600",
    accentText: "text-rose-600",
    href: "/clinical",
    why: "Health policy and health economics often advance ahead of the clinical evidence. HTR's clinical pillar exists to hold both accountable to the evidence base — and to identify when promising-sounding interventions lack the rigorous outcomes data needed to justify large-scale adoption.",
    what: [
      "Evidence-based care models: RCT and observational study review, meta-analysis synthesis",
      "Population health: risk stratification, chronic disease management, preventive care protocols",
      "Care delivery innovation: Hospital-at-Home, virtual care, precision medicine access",
      "Workforce and scope: NP and PA practice evidence, care team configuration outcomes",
    ],
    blindspot: "A payment model can create financial incentives for a care delivery change without that change having demonstrated clinical benefit. Clinical analysis prevents economic and policy logic from outrunning the evidence.",
  },
  {
    number: "05",
    label: "Equity",
    question: "Is it just?",
    color: "text-violet-700",
    border: "border-violet-200",
    bg: "bg-violet-50",
    accent: "bg-violet-600",
    accentText: "text-violet-600",
    href: "/equity",
    why: "A health system intervention that improves aggregate outcomes while widening disparity gaps is not a success — it is a failure dressed in favorable statistics. HTR's equity pillar ensures that every analysis is stress-tested against its distributional impact: who benefits, who is left out, and whether the intervention actively narrows or widens existing gaps.",
    what: [
      "SDOH integration: housing, food security, transportation, broadband as health determinants",
      "Algorithmic bias: training data equity audits, disparate impact testing, AI fairness standards",
      "Access disparity: geographic, insurance, linguistic, and cultural barriers to care",
      "Community engagement: co-design with affected populations, trust-building, health literacy",
    ],
    blindspot: "An algorithm that produces accurate predictions on average may produce systematically biased predictions for specific racial, ethnic, or income-defined subgroups. Equity analysis is not a final-step diversity review — it is a foundational requirement that shapes how interventions are designed from the start.",
  },
];

const failureModes = [
  {
    title: "The Unfunded Mandate",
    desc: "Policy passes. Economics fails. A regulation that imposes compliance costs without a reimbursement pathway creates financial distress rather than transformation.",
    pillars: ["Policy ✓", "Economics ✗"],
  },
  {
    title: "The Pilot Trap",
    desc: "A grant-funded care model produces excellent outcomes in a demonstration. The grant expires. The model disappears because no payer will reimburse it at scale.",
    pillars: ["Clinical ✓", "Economics ✗"],
  },
  {
    title: "The Deployment Gap",
    desc: "A technology receives FDA clearance and shows strong RCT evidence. Implementation fails because the target health systems lack the IT infrastructure to run it.",
    pillars: ["Policy ✓", "Clinical ✓", "Technology ✗"],
  },
  {
    title: "The Equity Bypass",
    desc: "A new care model improves aggregate outcomes and is financially sustainable — but the patients who benefit most are already the best-resourced. Disparities widen.",
    pillars: ["Policy ✓", "Economics ✓", "Clinical ✓", "Equity ✗"],
  },
  {
    title: "The Complete Failure",
    desc: "All five pillars are interrogated. The intervention fails on equity and economics. It is not published as a recommendation. This is the framework working as intended.",
    pillars: ["Policy ✓", "Economics ✗", "Technology ✓", "Clinical ✓", "Equity ✗"],
  },
];

export default function FrameworkPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-indigo-400 mb-6 border border-indigo-800 bg-indigo-900/40 px-4 py-1.5 rounded-full">
              Our Analytical Framework
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-8">
              Five questions.<br />
              <span className="text-indigo-400">Zero shortcuts.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-6">
              Every analysis HTR publishes must survive interrogation across five dimensions before it reaches you. A recommendation that passes four out of five is not published — because four out of five is how healthcare gets it wrong.
            </p>
            <p className="text-slate-400 max-w-2xl leading-relaxed">
              This is not an editorial checklist. It is the architectural logic of HTR — the structure that makes cross-disciplinary intelligence possible and the mechanism that catches the blind spots that siloed analysis invariably produces.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE FIVE PILLARS ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {pillars.map((p) => (
            <div key={p.label} className={`bg-white border ${p.border} rounded-2xl overflow-hidden shadow-sm`}>
              {/* Header bar */}
              <div className={`${p.bg} border-b ${p.border} px-8 py-6 flex items-center justify-between`}>
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 ${p.accent} rounded-full text-white flex items-center justify-center text-sm font-black shrink-0`}>
                    {p.number}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-black ${p.color}`}>{p.label}</h3>
                    <p className="text-slate-600 font-semibold text-sm">&ldquo;{p.question}&rdquo;</p>
                  </div>
                </div>
                <Link
                  href={p.href}
                  className={`hidden md:inline-flex items-center gap-2 text-xs font-bold ${p.accentText} border ${p.border} px-4 py-2 rounded-lg hover:${p.bg} transition-colors`}
                >
                  Explore {p.label} →
                </Link>
              </div>

              {/* Body */}
              <div className="px-8 py-8 grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Why this question</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{p.why}</p>
                </div>
                <div className="md:col-span-1">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">What we analyze</p>
                  <ul className="space-y-2">
                    {p.what.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-slate-600">
                        <span className={`w-1.5 h-1.5 rounded-full ${p.accent} shrink-0 mt-1.5`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${p.bg} border ${p.border} rounded-xl p-5 md:col-span-1`}>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">The blind spot this catches</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{p.blindspot}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAILURE MODES ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-600 mb-4 block">
              Why Four Out of Five Is Not Enough
            </span>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
              The failure modes the framework prevents.
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl">
              These are not hypothetical scenarios. They are the recurring failure patterns that have defined American healthcare transformation for the past 30 years — and that the five-question standard is specifically designed to catch before they become policy.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {failureModes.map((f) => (
              <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-black text-slate-900 text-base mb-3">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{f.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {f.pillars.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded ${
                        tag.includes("✗")
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-slate-50 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
          See the framework applied.
        </h2>
        <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
          Browse our pillar hubs to see how Policy, Economics, Technology, Clinical, and Equity intersect on the issues shaping healthcare today.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: "Policy", href: "/policy", color: "bg-sky-600" },
            { label: "Economics", href: "/economics", color: "bg-emerald-600" },
            { label: "Technology", href: "/technology", color: "bg-indigo-600" },
            { label: "Clinical", href: "/clinical", color: "bg-rose-600" },
            { label: "Equity", href: "/equity", color: "bg-violet-600" },
          ].map((p) => (
            <Link
              key={p.label}
              href={p.href}
              className={`${p.color} text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity`}
            >
              {p.label} Hub →
            </Link>
          ))}
        </div>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/values" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2">
            Our Core Values
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/about/methodology" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2">
            Our Methodology
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/mission" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2">
            Mission & Vision
          </Link>
        </div>
      </section>
    </div>
  );
}
