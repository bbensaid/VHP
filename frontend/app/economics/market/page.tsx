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
      {/* Hospital Financial Stress Test */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🏥</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Hospital Financial Health Benchmarks</h2>
            <p className="text-sm text-slate-500">Key ratios used by bond rating agencies and analysts to assess financial stability</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Metric</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Strong (A/AA rated)</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Adequate (BBB rated)</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Distressed</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">National Median (2024)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { metric: "Operating Margin", strong: ">5%", adequate: "1–3%", distressed: "<0%", national: "1.8%" },
                { metric: "Days Cash on Hand", strong: ">250 days", adequate: "100–200 days", distressed: "<80 days", national: "182 days" },
                { metric: "Debt-to-Capitalization", strong: "<35%", adequate: "35–55%", distressed: ">65%", national: "43%" },
                { metric: "Debt Service Coverage", strong: ">4.0×", adequate: "2.0–3.5×", distressed: "<1.5×", national: "3.1×" },
                { metric: "Days in Accounts Receivable", strong: "<35 days", adequate: "35–50 days", distressed: ">60 days", national: "48 days" },
                { metric: "Labor Cost as % NPR", strong: "<48%", adequate: "50–55%", distressed: ">60%", national: "57%" },
                { metric: "Uncompensated Care %", strong: "<4%", adequate: "4–7%", distressed: ">10%", national: "5.2%" },
              ].map((row) => (
                <tr key={row.metric} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-semibold text-slate-800">{row.metric}</td>
                  <td className="py-3 pr-4 text-emerald-700 font-medium text-xs">{row.strong}</td>
                  <td className="py-3 pr-4 text-amber-700 font-medium text-xs">{row.adequate}</td>
                  <td className="py-3 pr-4 text-rose-600 font-medium text-xs">{row.distressed}</td>
                  <td className="py-3 text-slate-700 font-bold text-xs">{row.national}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Sources: Kaufman Hall National Hospital Flash Report, Moody&apos;s NFP Health System Rating Methodology, CMS Cost Reports. NPR = Net Patient Revenue.</p>
      </div>

      {/* M&A Deal Flow + PE Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Hospital M&A Deal Activity</h3>
          <p className="text-sm text-slate-500 mb-5">Annual announced transactions by acquirer type</p>
          <div className="space-y-4">
            {[
              { year: "2021", strategic: 68, pe: 22, total: 90, color: "bg-emerald-500" },
              { year: "2022", strategic: 71, pe: 18, total: 89, color: "bg-emerald-500" },
              { year: "2023", strategic: 74, pe: 12, total: 86, color: "bg-emerald-500" },
              { year: "2024 (proj)", strategic: 78, pe: 15, total: 93, color: "bg-emerald-400" },
            ].map((row) => (
              <div key={row.year}>
                <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                  <span>{row.year}</span>
                  <span>{row.total} deals</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${(row.strategic / row.total) * 100}%` }} />
                  <div className="bg-indigo-400 h-full" style={{ width: `${(row.pe / row.total) * 100}%` }} />
                </div>
                <div className="flex gap-4 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full inline-block" />{row.strategic} strategic</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-indigo-400 rounded-full inline-block" />{row.pe} PE</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">Sources: Kaufman Hall M&A Quarterly Reports. PE = Private Equity acquirer. Strategic = health system, payer, or corporate buyer.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">PE Physician Group Penetration</h3>
          <p className="text-sm text-slate-500 mb-5">Share of physicians in PE-backed groups by specialty (2024)</p>
          <div className="space-y-3">
            {[
              { specialty: "Dermatology", pct: 52, color: "bg-rose-500" },
              { specialty: "Gastroenterology", pct: 43, color: "bg-orange-500" },
              { specialty: "Ophthalmology", pct: 38, color: "bg-amber-500" },
              { specialty: "Urology", pct: 32, color: "bg-yellow-500" },
              { specialty: "Radiology", pct: 28, color: "bg-emerald-500" },
              { specialty: "Orthopedics", pct: 22, color: "bg-sky-500" },
              { specialty: "Emergency Medicine", pct: 65, color: "bg-rose-600" },
              { specialty: "Anesthesiology", pct: 55, color: "bg-rose-500" },
            ].map((row) => (
              <div key={row.specialty}>
                <div className="flex justify-between ty-body text-slate-700 mb-1">
                  <span>{row.specialty}</span>
                  <span className="font-bold">{row.pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-2 ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">Source: Health Affairs, Anaesthesia journal, JAMA studies 2022–2024. EM/Anesthesia includes staffing company PE-ownership (TeamHealth, Envision/NAPA).</p>
        </div>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🏦",
            title: "Hospital Financial Health",
            items: [
              "Operating margin: national median 1.8% (Kaufman Hall 2024); 30%+ hospitals negative margin",
              "Days Cash on Hand (DCOH): ≥200 days = strong; <100 days = financial distress signal",
              "Debt-to-capitalization: investment grade threshold ≈ <45%; speculative grade >65%",
              "Net Patient Revenue (NPR) growth: inflation + volume — target ≥3.5% to maintain margin",
              "Payer mix shift: Medicaid expansion states absorbing formerly uninsured (margin pressure)",
              "Labor as % of NPR: current national avg 56–60%; pre-COVID target was 45–50%",
            ],
          },
          {
            icon: "🔀",
            title: "Mergers, Acquisitions & Consolidation",
            items: [
              "Hospital M&A volume: ~75 transactions/year (2020–2023 avg); accelerating post-COVID",
              "HHI (Herfindahl-Hirschman Index): FTC flags markets >2,500 HHI or +200 delta post-merger",
              "Vertical integration: payer-PCP acquisitions (UHC/Optum, CVS/Oak Street, Amazon/OneMedical)",
              "PE in physician practices: 50%+ of dermatology, 40%+ GI, 30%+ urology now PE-backed",
              "Antitrust enforcement: FTC blocked 5 hospital mergers 2022–2024; staffing agency scrutiny",
              "Post-merger price effects: hospital mergers increase commercial prices 7–20% avg (NBER)",
            ],
          },
          {
            icon: "💸",
            title: "Private Equity in Healthcare",
            items: [
              "PE deal volume: $100B+ annually in healthcare services (2021–2023 peak)",
              "Target sectors: physician groups, behavioral health, home care, dental (high fragmentation)",
              "Investment thesis: platform + bolt-on acquisitions, EHR rationalization, payer contracting",
              "Revenue cycle optimization: coding intensity, capture rate improvement = primary value driver",
              "Hold period: 5–7 years typical; exit via strategic sale, IPO, or secondary PE buyout",
              "Controversy: PE-owned hospitals show 25% increase in adverse outcomes (JAMA 2023)",
            ],
          },
          {
            icon: "📉",
            title: "Payer-Provider Dynamics",
            items: [
              "Commercial rate negotiation: multi-year contracts (2–5 years), rate escalators 3–6% annually",
              "Prior authorization burden: 94M PA requests/year (AMA); avg 14.4 hours per physician/week",
              "Surprise billing protections: No Surprises Act (2022) — IDR process, QPA methodology",
              "Medicare Advantage penetration: 51% of Medicare beneficiaries in MA plans (2024)",
              "MA payment accuracy: CMS audit recovered $4.7B in improper MA payments (2022–2023)",
              "Direct contracting: payer-agnostic bundles, employer coalitions (Pacific Business Group)",
            ],
          },
          {
            icon: "📊",
            title: "Capital Markets & Healthcare Finance",
            items: [
              "Municipal bond market: NFP hospitals borrow at tax-exempt rates (4.5–5.5% 30-year, 2024)",
              "Credit rating agencies: Moody's, S&P, Fitch — NFP health system ratings key metrics",
              "Revenue bond structures: Series A/B, LOC-backed, synthetic fixed-rate swaps",
              "Bank market: revolving credit facilities ($100M–$2B for large systems), TLA/TLB structures",
              "Digital health VC: $10.7B invested in 2023 (down from $29B peak 2021); AI/RPM leading",
              "Healthcare REIT: Ventas, Welltower — MOB (Medical Office Buildings) vs. LTACH/SNF mix",
            ],
          },
          {
            icon: "🏛️",
            title: "Antitrust & Regulatory",
            items: [
              "FTC Section 5 / DOJ Antitrust: hospital + physician practice merger review",
              "HSR filing threshold: $119.5M (2024) — most large health system deals require filing",
              "Charity care obligations: IRS 501(r) — NFP hospitals must publish community benefit report",
              "Certificate of Need (CON): 35 states still require CON for major capital investments",
              "Price transparency: CMS hospital price transparency (2021) + payer machine-readable files (2022)",
              "Prescription drug pricing: IRA drug negotiation (10 drugs 2026); PBM reform legislation",
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
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Healthcare Market Forces — 2024–2026 Outlook</h2>
        <p className="text-slate-500 text-sm mb-6">Structural trends shaping healthcare economics over the near term</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              force: "Payer Vertical Integration",
              direction: "↑ Accelerating",
              color: "text-amber-600",
              body: "UHC/Optum now employs 90,000+ physicians. CVS/Aetna expanding Oak Street primary care to 300 clinics. Creates closed network leverage and TCOC data advantages.",
            },
            {
              force: "Hospital Distress & Closures",
              direction: "↑ Rising",
              color: "text-rose-600",
              body: "AHA projects 600+ hospitals at risk of closure over next decade. Rural hospitals most vulnerable. Conversion to RTAH (Rural Emergency Hospital) designation as financial lifeline.",
            },
            {
              force: "AI Infrastructure Investment",
              direction: "↑ Accelerating",
              color: "text-emerald-600",
              body: "Health systems allocating $50M–$300M for AI infrastructure (GPUs, data lakes, AI talent). Near-term ROI from ambient documentation; long-term bet on clinical AI.",
            },
            {
              force: "Drug Pricing Pressure (IRA)",
              direction: "↑ Significant",
              color: "text-sky-600",
              body: "IRA Medicare drug negotiation covering 10 drugs by 2026, 60 by 2029. Pharma companies shifting launch strategy to orphan/rare disease to escape negotiation.",
            },
            {
              force: "MA Margin Compression",
              direction: "↑ Rising",
              color: "text-amber-600",
              body: "CMS V28 risk model phaseout reducing RAF scores 5–10%. Combined with medical cost trends, MA plan MLRs deteriorating. UHC/Humana both guided to lower MA margins 2024.",
            },
            {
              force: "Healthcare REIT Activity",
              direction: "→ Stable",
              color: "text-slate-500",
              body: "MOB (Medical Office Building) REITs outperforming skilled nursing REITs. Welltower, Ventas deploying capital in senior housing/PACE as aging population demand rises.",
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
