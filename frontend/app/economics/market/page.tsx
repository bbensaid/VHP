import Link from "next/link";
import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Market & Finance | HTR Economics",
  description: "Healthcare market dynamics, payer-provider financial relationships, cost structure analysis, MLR management, and the economics of health system consolidation.",
};

function MarketFinanceHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-4">
          Economics · Market & Finance
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">
          Healthcare Market & Finance
        </h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          Hospital financial health, market consolidation, M&A activity, payer-provider dynamics,
          and the capital flows reshaping healthcare ownership — from PE roll-ups to public market valuations.
        </p>
      </div>
    </div>
  );
}

function MarketFinanceBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-10 text-sm text-slate-600">
        For hospital-level financial ratios — margin, days cash, debt service, labor share — run the{" "}
        <Link href="/research-lab/policy-quality?tab=scorecard" className="text-emerald-700 font-semibold hover:underline">Hospital Financial Stress Test</Link>{" "}
        on your own audited figures and compare against current rating-agency medians (Moody&apos;s, Fitch, S&amp;P), which change every year.
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🏦",
            title: "Hospital Financial Health",
            items: [
              "Operating margin: Kaufman Hall's monthly National Hospital Flash Report tracks the national median; rural and safety-net hospitals run well below it",
              "Days Cash on Hand (DCOH): compare to rating-agency medians for your rating category",
              "Debt-to-capitalization: a core rating-agency leverage test",
              "Payer mix shift: Medicaid expansion states absorbing formerly uninsured (margin pressure)",
              "Labor as % of net patient revenue: the largest expense line, and the one contract labor inflated after 2020",
            ],
          },
          {
            icon: "🔀",
            title: "Mergers, Acquisitions & Consolidation",
            items: [
              "Hospital M&A volume: Kaufman Hall counted 65 announced transactions in 2023 and 72 in 2024",
              "HHI (Herfindahl-Hirschman Index): under the 2023 Merger Guidelines, a market above 1,800 with an increase over 100 is presumed anticompetitive",
              "Vertical integration: payer-PCP acquisitions (UHC/Optum, CVS/Oak Street, Amazon/OneMedical)",
              "PE in physician practices: concentrated in specialties such as dermatology, gastroenterology, ophthalmology and anesthesiology",
              "Antitrust enforcement: FTC challenges hospital mergers in court — e.g., Novant Health/Community Health Systems, abandoned in 2024 after an appeals-court injunction",
              "Post-merger price effects: mergers of hospitals within 5 miles of each other raised prices by more than 5% (Cooper et al., Quarterly Journal of Economics, 2019)",
            ],
          },
          {
            icon: "💸",
            title: "Private Equity in Healthcare",
            items: [
              "Target sectors: physician groups, behavioral health, home care, dental (high fragmentation)",
              "Investment thesis: platform + bolt-on acquisitions, EHR rationalization, payer contracting",
              "Revenue cycle optimization: coding intensity, capture rate improvement = primary value driver",
              "Hold period: 5–7 years typical; exit via strategic sale, IPO, or secondary PE buyout",
              "Controversy: hospital-acquired adverse events rose 25.4% after private-equity acquisition (Kannan et al., JAMA, 2023)",
            ],
          },
          {
            icon: "📉",
            title: "Payer-Provider Dynamics",
            items: [
              "Commercial rate negotiation: multi-year contracts with annual escalators",
              "Prior authorization burden: tracked in the AMA's annual physician survey; CMS-0057-F requires payer prior-auth APIs from January 2027",
              "Surprise billing protections: No Surprises Act (2022) — IDR process, QPA methodology",
              "Medicare Advantage penetration: 54% of eligible Medicare beneficiaries in 2024 (KFF)",
              "Direct contracting: payer-agnostic bundles, employer coalitions (Pacific Business Group)",
            ],
          },
          {
            icon: "📊",
            title: "Capital Markets & Healthcare Finance",
            items: [
              "Municipal bond market: not-for-profit hospitals borrow at tax-exempt rates",
              "Credit rating agencies: Moody's, S&P, Fitch — NFP health system ratings key metrics",
              "Revenue bond structures: Series A/B, LOC-backed, synthetic fixed-rate swaps",
              "Bank market: revolving credit facilities and term loans for large systems",
              "Digital health VC: $10.7B in 2023 and $10.1B in 2024, down from $29.1B in 2021 (Rock Health)",
              "Healthcare REIT: Ventas, Welltower — MOB (Medical Office Buildings) vs. LTACH/SNF mix",
            ],
          },
          {
            icon: "🏛️",
            title: "Antitrust & Regulatory",
            items: [
              "FTC Section 5 / DOJ Antitrust: hospital + physician practice merger review",
              "HSR filing threshold: adjusted each year by the FTC (above $125M in 2025)",
              "Charity care obligations: IRS 501(r) — NFP hospitals must publish community benefit report",
              "Certificate of Need (CON): about 35 states and DC run some CON program (NCSL)",
              "Price transparency: CMS hospital price transparency (2021) + payer machine-readable files (2022)",
              "Prescription drug pricing: IRA negotiation — first 10 negotiated prices effective 2026, 15 more in 2027",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-emerald-600 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Market Outlook */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Healthcare Market Forces — Near-Term Outlook</h2>
        <p className="text-slate-500 text-sm mb-6">Structural trends shaping healthcare economics over the near term</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              force: "Payer Vertical Integration",
              direction: "↑ Accelerating",
              color: "text-amber-600",
              body: "Optum employs or is affiliated with roughly 90,000 physicians; CVS Health owns Oak Street Health primary care. Integration gives payers network leverage and total-cost-of-care data.",
            },
            {
              force: "Hospital Distress & Closures",
              direction: "↑ Rising",
              color: "text-rose-600",
              body: "The Center for Healthcare Quality and Payment Reform counts hundreds of rural hospitals at risk of closure. Conversion to the Rural Emergency Hospital designation (available since 2023) is one lifeline.",
            },
            {
              force: "AI Infrastructure Investment",
              direction: "↑ Accelerating",
              color: "text-emerald-600",
              body: "Large systems are funding data platforms and AI talent. The best-evidenced near-term use is ambient documentation; clinical AI remains a longer bet.",
            },
            {
              force: "Drug Pricing Pressure (IRA)",
              direction: "↑ Significant",
              color: "text-sky-600",
              body: "IRA Medicare negotiation reaches 10 drugs in 2026 and 60 by 2029.",
            },
            {
              force: "MA Margin Compression",
              direction: "↑ Rising",
              color: "text-amber-600",
              body: "The V28 risk model, fully phased in for 2026, cut risk scores about 3.1% on average (CMS). With higher medical cost trends, major MA insurers reported margin pressure in 2024–2025.",
            },
            {
              force: "Healthcare REIT Activity",
              direction: "→ Stable",
              color: "text-slate-500",
              body: "Healthcare REITs such as Welltower and Ventas are concentrating capital in senior housing as the population ages.",
            },
          ].map((item) => (
            <div key={item.force} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className={`text-xs font-black uppercase tracking-widest mb-1 ${item.color}`}>{item.direction}</div>
              <div className="font-bold text-slate-800 text-sm mb-2">{item.force}</div>
              <div className="text-slate-600 text-xs leading-relaxed">{item.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <MarketFinanceHero />
      <CategoryPage
        pillar="Economics"
        title="Market & Finance"
        description="Hospital financial health, M&A activity, PE in healthcare, and payer-provider dynamics."
        colorClass="text-emerald-700"
        category="Market"
        hideHeader
      />
      <MarketFinanceBody />
    </>
  );
}
