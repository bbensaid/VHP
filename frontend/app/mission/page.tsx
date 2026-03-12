import Link from "next/link";
import {
  LightBulbIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const pillars = [
  { label: "Policy", color: "text-sky-700", bg: "bg-sky-600", question: "Is it permissible?", href: "/policy" },
  { label: "Economics", color: "text-emerald-700", bg: "bg-emerald-500", question: "Is it sustainable?", href: "/economics" },
  { label: "Technology", color: "text-indigo-700", bg: "bg-indigo-500", question: "Is it possible?", href: "/technology" },
  { label: "Clinical", color: "text-rose-700", bg: "bg-rose-500", question: "Is it effective?", href: "/clinical" },
  { label: "Equity", color: "text-violet-700", bg: "bg-violet-500", question: "Is it just?", href: "/equity" },
];

const values = [
  {
    icon: MagnifyingGlassIcon,
    color: "text-indigo-600",
    iconBg: "bg-indigo-50",
    title: "Intellectual Rigor",
    body: "Every analysis is grounded in primary sources — CMS filings, legislative text, peer-reviewed evidence, and real financial disclosures. We do not trade in speculation dressed as insight.",
  },
  {
    icon: ShieldCheckIcon,
    color: "text-slate-700",
    iconBg: "bg-slate-100",
    title: "Editorial Independence",
    body: "No sponsored content. No pharma funding. No technology vendor relationships that influence our assessments. Revenue flows from subscribers, advisory clients, and masterclass participants — never from the industries we cover.",
  },
  {
    icon: LightBulbIcon,
    color: "text-amber-600",
    iconBg: "bg-amber-50",
    title: "Systemic Thinking",
    body: "A policy that is permissible but economically unsustainable is not a solution. A technology that is possible but clinically ineffective is not progress. We test every insight across all five pillars before it reaches you.",
  },
  {
    icon: HeartIcon,
    color: "text-rose-600",
    iconBg: "bg-rose-50",
    title: "Community First",
    body: "Transformation is only meaningful if it improves outcomes for the patients in the zip codes that have historically been left behind. We hold every analysis accountable to the rural communities at the center of our mandate.",
  },
  {
    icon: UserGroupIcon,
    color: "text-emerald-600",
    iconBg: "bg-emerald-50",
    title: "Cross-Disciplinary Collaboration",
    body: "Policymakers, economists, clinicians, technologists, and equity advocates do not naturally speak the same language. HTR is the translation layer — and we hold the five-pillar standard for every piece of intelligence we publish.",
  },
  {
    icon: ChartBarIcon,
    color: "text-violet-600",
    iconBg: "bg-violet-50",
    title: "Radical Transparency",
    body: "We publish our methodology, our scoring weights, and our data sources. When we revise a position based on new evidence, we say so explicitly. Accountability is non-negotiable at every level of our work.",
  },
];

const milestones = [
  { year: "2019", event: "HTR founded with a three-pillar framework: Policy, Economics, Technology." },
  { year: "2021", event: "State Performance Index launched, covering all 50 states with composite scoring across 9 sub-metrics." },
  { year: "2022", event: "Advisory practice opens; first enterprise intelligence agreements with rural health systems." },
  { year: "2024", event: "Clinical and Equity pillars formally added, expanding the framework to five dimensions in response to mounting evidence that clinical and equity gaps required dedicated analytical focus." },
  { year: "2025", event: "HTR Academy launches with Executive Masterclasses. Analyst network expands to a dedicated principal per pillar." },
  { year: "2026", event: "50-state RHT program coverage complete. Performance Index extended with SDOH and algorithmic bias sub-metrics." },
];

export default function MissionPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Violet orb */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-indigo-400 mb-6 border border-indigo-800 bg-indigo-900/40 px-4 py-1.5 rounded-full">
              Mission & Vision
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-8">
              A future where<br />
              geography does not<br />
              <span className="text-indigo-400">dictate outcomes.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Rural America is not a niche market. It is 46 million people whose health outcomes are determined not by clinical decisions but by structural failures that HTR exists to expose, explain, and help eliminate.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white border border-slate-200 rounded-2xl p-10 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-2xl" />
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-600 mb-4 block">
              Our Mission
            </span>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
              To accelerate sustainable, value-based rural health transformation by providing the cross-disciplinary intelligence that policymakers, executives, clinicians, and equity advocates need to act with confidence.
            </p>
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-500 leading-relaxed">
                We achieve this through five integrated analytical pillars — Policy, Economics, Technology, Clinical, and Equity — ensuring that no recommendation enters the field having been tested on only one dimension of a structurally complex problem.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-slate-900 text-white rounded-2xl p-10 md:p-12 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-400 mb-4 block">
              Our Vision
            </span>
            <p className="text-2xl md:text-3xl font-bold leading-snug text-white relative z-10">
              A rural health system that is financially resilient, technologically capable, clinically excellent, and equitable by design — not by exception.
            </p>
            <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
              <p className="text-slate-400 leading-relaxed text-sm">
                In this future, the Rural Health Transformation Program is no longer a pilot — it is the standard of care. Small community hospitals operate as high-acuity triage hubs, connected seamlessly to centers of excellence. Equity is built into the algorithm, not patched on afterward. And the intelligence required to sustain this system is accessible to every decision-maker who needs it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FIVE PILLARS INTERROGATION ───────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-600 mb-4 block">
              The Five-Question Standard
            </span>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
              Every insight must answer five questions before it reaches you.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              HTR's original three-pillar framework was built on the premise that Policy, Economics, and Technology are the primary levers of health system transformation. After five years of evidence, we know that framework was incomplete. Clinical effectiveness and equity are not downstream considerations — they are foundational.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {pillars.map((p, i) => (
              <Link
                key={p.label}
                href={p.href}
                className="group block bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full ${p.bg} text-white flex items-center justify-center text-sm font-black`}>
                    {i + 1}
                  </div>
                  <h3 className={`font-black text-lg ${p.color}`}>{p.label}</h3>
                </div>
                <p className="text-slate-700 font-semibold text-sm mb-3">
                  &ldquo;{p.question}&rdquo;
                </p>
                <span className={`text-xs font-bold ${p.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 bg-white border border-indigo-100 rounded-xl p-6 md:p-8 text-center">
            <p className="text-slate-600 text-base max-w-3xl mx-auto leading-relaxed">
              A policy intervention that passes question one but fails questions three, four, and five is not a solution — it is a well-intentioned mistake waiting to be made. HTR&rsquo;s editorial standard requires that every analysis we publish has been interrogated across all five dimensions.
            </p>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-600 mb-4 block">
            Core Values
          </span>
          <h2 className="text-4xl font-black tracking-tight text-slate-900">
            What we stand for.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${v.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                <v.icon className={`w-6 h-6 ${v.color}`} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{v.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MILESTONES ────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-400 mb-4 block">
              Our Journey
            </span>
            <h2 className="text-4xl font-black tracking-tight">
              From three pillars to five. The evolution of HTR.
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative md:pl-16 flex gap-6 md:gap-0 items-start">
                  {/* Dot */}
                  <div className="hidden md:flex absolute left-0 w-8 h-8 bg-indigo-600 rounded-full items-center justify-center shrink-0 border-2 border-slate-900">
                    <span className="text-[10px] font-black text-white">{i + 1}</span>
                  </div>
                  <div className="shrink-0 w-16 md:w-auto">
                    <span className="text-indigo-400 font-black text-lg">{m.year}</span>
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

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-2xl p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, white, transparent 50%), radial-gradient(circle at 80% 50%, white, transparent 50%)",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              The mission begins with intelligence.
            </h2>
            <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
              Explore our methodology, study the state performance index, or connect with our advisory team.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/about/methodology"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-lg font-black hover:bg-indigo-50 transition-colors"
              >
                Read Our Methodology
              </Link>
              <Link
                href="/advisory/contact"
                className="inline-flex items-center gap-2 bg-indigo-700 text-white border border-indigo-500 px-8 py-4 rounded-lg font-black hover:bg-indigo-800 transition-colors"
              >
                Engage Advisory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}