import CategoryPage from "@/components/CategoryPage";

function GlobalPolicyHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 border border-sky-200 rounded-full px-3 py-1 mb-4">
          Policy · Global & Comparative Policy
        </span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-3">Global & Comparative Health Policy</h1>
        <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
          How the US compares to peer nations on outcomes, spending, and coverage — and what policies
          from single-payer, Bismarck, Beveridge, and hybrid systems offer as lessons for US reform.
        </p>
      </div>
    </div>
  );
}

function GlobalPolicyBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* OECD Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🌍</span>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">OECD Health System Comparison (2023 Data)</h2>
            <p className="text-sm text-slate-500">Key performance metrics across peer nations — GDP spend, life expectancy, coverage, and administrative burden</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Country</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">System Type</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">% GDP on Health</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Life Expectancy</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Coverage</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Admin Cost % Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { country: "United States", type: "Multi-payer hybrid", gdp: "16.6%", le: "76.4 yrs", coverage: "~92% (8M+ uninsured)", admin: "~34%" },
                { country: "Germany", type: "Bismarck (SHI)", gdp: "12.8%", le: "80.6 yrs", coverage: "99.9%", admin: "~14%" },
                { country: "France", type: "Bismarck + UHC", gdp: "12.1%", le: "82.1 yrs", coverage: "99.9%", admin: "~12%" },
                { country: "Canada", type: "Single-payer (provincial)", gdp: "11.9%", le: "81.3 yrs", coverage: "100%", admin: "~12%" },
                { country: "United Kingdom", type: "Beveridge (NHS)", gdp: "10.9%", le: "80.7 yrs", coverage: "100%", admin: "~13%" },
                { country: "Japan", type: "SHI with tight regulation", gdp: "11.5%", le: "84.3 yrs", coverage: "100%", admin: "~11%" },
                { country: "Switzerland", type: "Regulated multi-payer", gdp: "11.3%", le: "83.4 yrs", coverage: "100%", admin: "~16%" },
                { country: "Australia", type: "Medicare + private mix", gdp: "9.8%", le: "83.2 yrs", coverage: "100%", admin: "~13%" },
              ].map((row) => (
                <tr key={row.country} className={`hover:bg-slate-50 ${row.country === "United States" ? "bg-sky-50" : ""}`}>
                  <td className="py-3 pr-4 font-bold text-slate-800">{row.country}</td>
                  <td className="py-3 pr-4 text-slate-500 text-xs">{row.type}</td>
                  <td className={`py-3 pr-4 font-bold text-xs ${row.country === "United States" ? "text-rose-600" : "text-emerald-700"}`}>{row.gdp}</td>
                  <td className={`py-3 pr-4 font-bold text-xs ${row.country === "United States" ? "text-rose-600" : "text-slate-700"}`}>{row.le}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.coverage}</td>
                  <td className={`py-3 font-bold text-xs ${row.country === "United States" ? "text-rose-600" : "text-slate-600"}`}>{row.admin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Sources: OECD Health Statistics 2023, Commonwealth Fund Mirror, Mirror 2023. US life expectancy from CDC National Vital Statistics 2023. SHI = Statutory Health Insurance.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "💊",
            title: "International Drug Pricing Models",
            items: [
              "AMNOG (Germany): new drugs assessed for added benefit vs. standard of care — negotiated price or reference pricing",
              "NICE (UK): cost-effectiveness threshold £20K–£30K per QALY — drugs above threshold must negotiate",
              "HTA (Health Technology Assessment): France, Germany, Australia all use HTA gating for formulary entry",
              "Reference pricing: 35+ countries use external reference pricing vs. a basket of peer nations",
              "IRA drug negotiation: US first attempt at Medicare price negotiation — 10 drugs in 2026 at 64%–79% discounts",
              "US vs. peers: US drug prices average 2.56× higher than OECD median (RAND 2021)",
            ],
          },
          {
            icon: "🏥",
            title: "Single-Payer & Universal Coverage Models",
            items: [
              "NHS (UK): government owns hospitals, employs physicians — Beveridge model; per-capita spend $4,315 vs. US $12,318",
              "Medicare Canada: provincial single-payer for hospital + physician services; private supplemental common",
              "Taiwan NHI: single-payer universal coverage since 1995; smart card at every encounter; global budget",
              "German SHI: 100+ non-profit sickness funds; income-based premiums; all funds cover same benefits",
              "Medicare for All (US): Sanders/Jayapal bill — eliminates private insurance; $30–$40T federal cost 10yr",
              "Public option models: state-based (WA, CO, OR) — government plan competes alongside private insurance",
            ],
          },
          {
            icon: "📊",
            title: "Commonwealth Fund Rankings",
            items: [
              "2023 Commonwealth Fund Mirror, Mirror: US ranks last of 10 wealthy nations overall",
              "US ranks last: access to care, equity, administrative efficiency — ranks high on specialty care quality",
              "Top performers (2023): Australia, Netherlands, New Zealand — strong primary care, lower admin burden",
              "Access dimension: US worst on affordability and timeliness — cost barriers unique in peer group",
              "Equity dimension: US last — largest income-based disparities in care access and quality outcomes",
              "Health outcomes: US 10th of 10 — life expectancy, infant mortality, preventable deaths all lag peers",
            ],
          },
          {
            icon: "🔄",
            title: "Primary Care Models Abroad",
            items: [
              "UK GP gatekeeping: registered GP required for specialist referral — controls specialist utilization + cost",
              "Dutch family medicine: all citizens register with a GP; capitation payment model per registered patient",
              "Canadian fee-for-service primary care transitioning to capitation — family health teams in Ontario",
              "Direct Primary Care (US parallel): membership-based; avoids insurance billing; 1,000+ DPC practices",
              "Patient-centered medical home (PCMH): US model aligned with UK GP approach — NCQA certification",
              "Primary care spend: US 5–7% of health spend on primary care vs. 10–12% in UK/Canada/Australia",
            ],
          },
          {
            icon: "🧮",
            title: "Administrative Cost Drivers",
            items: [
              "US administrative costs: 34% of health spend — $1,055 per capita vs. Canada $551 (NEJM 2019)",
              "Billing complexity: US payers require 1,800+ unique prior auth forms vs. 1 form in single-payer systems",
              "CATO/McKinsey: simplified billing in single-payer could save $220B–$600B annually",
              "Physician admin time: US physicians spend 16.6% of professional time on admin vs. 2.5% in Canada",
              "Claims denials: 17% of in-network claims initially denied in US — no parallel in single-payer systems",
              "EHR interoperability: US fragmentation increases admin burden; NHS Spine achieves near-universal data sharing",
            ],
          },
          {
            icon: "🎓",
            title: "Lessons for US Reform",
            items: [
              "Lesson 1 — Primary care investment: universal systems spend 2× more on primary care relative to specialty",
              "Lesson 2 — Global budgeting: Canadian/UK global budgets control spending without rationing access",
              "Lesson 3 — Drug price negotiation: all peer nations negotiate or regulate drug prices systematically",
              "Lesson 4 — Administrative simplification: standardized billing + single payer reduces overhead 20–30%",
              "Lesson 5 — Universal coverage: 100% coverage correlates with better outcomes at lower per-capita cost",
              "Lesson 6 — Social safety net: health outcomes correlated with housing, food, childcare spending levels",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-sky-500 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* US vs Peers Scorecard */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-2">US vs. Peer Nations: Policy Scorecard</h2>
        <p className="text-slate-500 text-sm mb-6">Where the US leads, lags, and where targeted reform could close the gap</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "US Leads", color: "bg-white border-emerald-200", icon: "✅", items: ["Specialty care quality and innovation output", "Cancer 5-year survival rates (breast, prostate, colon)", "Medical device and biopharma R&D investment", "Rare disease treatment availability + FDA innovation pathway"] },
            { label: "US Lags", color: "bg-white border-rose-200", icon: "⚠️", items: ["Life expectancy (76.4 yrs — last in peer group)", "Maternal and infant mortality rates", "Administrative cost efficiency (34% vs. 11–16%)", "Coverage universality (8M+ remain uninsured)"] },
            { label: "Reform Levers", color: "bg-white border-sky-200", icon: "🔧", items: ["Universal coverage: public option or Medicaid expansion in remaining 10 states", "Drug negotiation: IRA precedent → expand to all Medicare + Medicaid drugs", "Admin simplification: single claim form, uniform prior auth standards", "Primary care investment: redirect 2–3% specialty spend to primary + prevention"] },
          ].map((col) => (
            <div key={col.label} className={`rounded-xl p-5 border ${col.color}`}>
              <div className="font-bold text-slate-800 text-sm mb-3">{col.icon} {col.label}</div>
              <ul className="space-y-2">
                {col.items.map((s) => (
                  <li key={s} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-slate-400 mt-0.5">›</span> {s}
                  </li>
                ))}
              </ul>
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
      <GlobalPolicyHero />
      <CategoryPage
        pillar="Policy"
        title="Global & Comparative Policy"
        description="OECD comparisons, international drug pricing, single-payer models, and lessons for US healthcare reform."
        colorClass="text-sky-700"
        category="Global"
        hideHeader
      />
      <GlobalPolicyBody />
    </>
  );
}
