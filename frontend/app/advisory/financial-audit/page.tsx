import Link from "next/link";
import { ADVISORY_SERVICES, PILLAR_STYLES } from "@/lib/advisory-data";

export const metadata = {
  title: "Financial Auditing & Revenue Cycle | HTR Advisory",
  description:
    "Deep operational and financial performance reviews for hospitals, payers, and providers. Revenue cycle audits, payer contract optimization, cost benchmarking, and CFO advisory.",
};

const service = ADVISORY_SERVICES.find((s) => s.id === "financial-audit")!;

export default function FinancialAuditPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 text-slate-900 py-24 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
              HTR Advisory
            </span>
            <span className="text-slate-400 text-xs">Economics Pillar</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Financial Auditing & <span className="text-emerald-600">Revenue Cycle</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
            Unlike traditional financial audits focused on GAAP compliance, HTR Advisory targets the <strong>economic leakage points unique to healthcare</strong> — denial rates, payer mix optimization, coding accuracy, cost-per-episode analysis, and staffing efficiency. We find the revenue you&apos;re leaving on the table.
          </p>
          <div className="flex flex-wrap gap-3">
            {service.clientTypes.map((ct) => (
              <span key={ct} className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {ct}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── PILLAR COVERAGE ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl pt-12 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Pillar Coverage</p>
        <div className="flex flex-wrap gap-2">
          {service.pillars.map((p) => (
            <span key={p} className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${PILLAR_STYLES[p].bg} ${PILLAR_STYLES[p].text} ${PILLAR_STYLES[p].border}`}>
              {PILLAR_STYLES[p].label}
            </span>
          ))}
        </div>
      </div>

      {/* ── THE FINANCIAL REALITY ─────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <div className="bg-emerald-950 text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">The Financial Reality Most CFOs Don&apos;t Want to Hear</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-black text-emerald-300 mb-2">$262B</div>
              <p className="text-emerald-100 text-sm leading-relaxed">estimated annual revenue cycle loss for U.S. hospitals from underpayments, denials, and billing errors — per the American Hospital Association.</p>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-300 mb-2">11.1%</div>
              <p className="text-emerald-100 text-sm leading-relaxed">median initial denial rate for hospitals in 2024, up 3x from a decade ago — and most organizations only appeal a fraction of those claims.</p>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-300 mb-2">3–7%</div>
              <p className="text-emerald-100 text-sm leading-relaxed">typical revenue improvement HTR Advisory clients achieve within 90 days of implementing our revenue cycle recommendations.</p>
            </div>
          </div>
          <p className="mt-8 text-emerald-200 text-sm">
            Every HTR financial review is conducted with <strong className="text-white">no vendor relationships or preferred referrals</strong> — our only incentive is to find you the most revenue possible.
          </p>
        </div>
      </div>

      {/* ── 4 AUDIT MODULES ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Four Audit Modules</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-2xl mb-6 border border-emerald-200">💳</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Revenue Cycle Assessment</h3>
            <p className="text-slate-600 text-sm mb-4">End-to-end review from charge capture through final payment. We map every step where revenue leaks and quantify the dollar impact.</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Charge capture accuracy review</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Coding & CDI audit (ICD-10, CPT)</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Denial root cause & appeal rate analysis</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Days-in-AR vs. peer benchmark</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-2xl mb-6 border border-emerald-200">🤝</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Payer Contract Performance</h3>
            <p className="text-slate-600 text-sm mb-4">Are your payer contracts paying what they promised? We analyze actual vs. contracted payments, identify systematic underpayments, and develop renegotiation strategy.</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Contractual vs. actual payment variance</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Rate benchmark vs. Medicare & market</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>VBC contract performance tracking</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Renegotiation talking points & leverage analysis</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-2xl mb-6 border border-emerald-200">📊</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Cost Structure Analysis</h3>
            <p className="text-slate-600 text-sm mb-4">Department-level cost analysis benchmarked against HFMA Peer Comparison data and CMS cost reports. We identify where you&apos;re overspending relative to peers and why.</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Cost-per-discharge & cost-per-episode</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Supply chain & purchased services review</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Overhead allocation analysis</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Service line profitability breakdown</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-2xl mb-6 border border-emerald-200">👥</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Staffing Efficiency Review</h3>
            <p className="text-slate-600 text-sm mb-4">Healthcare labor is the largest operating cost. We benchmark your staffing ratios, labor mix, and productivity against top-quartile performers to identify sustainable savings.</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>FTE per adjusted occupied bed</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Agency & contract labor dependency analysis</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Overtime & premium pay patterns</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Workforce model recommendations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── DELIVERABLES ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">What&apos;s Included</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {service.deliverables.map((d, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-slate-700 text-sm font-medium">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Engagement Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {service.processSteps.map((step) => (
            <div key={step.stepNumber}>
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-lg mb-4">
                {step.stepNumber}
              </div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">{step.duration}</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Engagement Models</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {service.tiers.map((tier) => (
            <div key={tier.name} className={`p-8 rounded-xl border-2 ${tier.highlight ? "border-emerald-600 bg-emerald-50 shadow-xl" : "border-slate-200 bg-white shadow-sm"}`}>
              {tier.highlight && <div className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-3">Best Value</div>}
              <h3 className="text-xl font-bold text-slate-900 mb-1">{tier.name}</h3>
              <div className="text-2xl font-black text-emerald-600 mb-3">{tier.price}</div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-sm text-slate-700">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="bg-linear-to-r from-fuchsia-600 to-emerald-600 text-white rounded-2xl p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl font-black mb-4">Find the Revenue You&apos;re Leaving Behind</h2>
          <p className="text-lg text-fuchsia-100 mb-8 max-w-2xl mx-auto">
            Most HTR Advisory financial reviews pay for themselves within the first 90 days of implementation. Let&apos;s find out what your organization is missing.
          </p>
          <Link
            href="/advisory/contact"
            className="inline-block px-8 py-4 bg-white text-fuchsia-700 font-black text-lg rounded-lg hover:bg-fuchsia-50 transition-colors shadow-lg"
          >
            Request a Financial Review
          </Link>
        </div>
      </div>
    </div>
  );
}
