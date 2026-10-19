import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Global & Comparative Health Policy | HTR Policy",
  description: "Comparative analysis of international health systems, universal coverage models, and global policy lessons applicable to U.S. healthcare transformation.",
};

function GlobalPolicyHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-4">
          Policy · Global & Comparative Policy
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">Global & Comparative Health Policy</h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
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
            <h2 className="ty-h3 font-bold text-slate-900">Peer Health System Models</h2>
            <p className="text-sm text-slate-500">How peer nations organize coverage</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Country</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">System Type</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { country: "United States", type: "Multi-payer hybrid", coverage: "92% insured — 26.4M uninsured (Census, 2023)" },
                { country: "Germany", type: "Bismarck (SHI)", coverage: "99.9%" },
                { country: "France", type: "Bismarck + UHC", coverage: "99.9%" },
                { country: "Canada", type: "Single-payer (provincial)", coverage: "100%" },
                { country: "United Kingdom", type: "Beveridge (NHS)", coverage: "100%" },
                { country: "Japan", type: "SHI with tight regulation", coverage: "100%" },
                { country: "Switzerland", type: "Regulated multi-payer", coverage: "100%" },
                { country: "Australia", type: "Medicare + private mix", coverage: "100%" },
              ].map((row) => (
                <tr key={row.country} className={`hover:bg-slate-50 ${row.country === "United States" ? "bg-blue-50" : ""}`}>
                  <td className="py-3 pr-4 font-bold text-slate-800">{row.country}</td>
                  <td className="py-3 pr-4 text-slate-500 text-xs">{row.type}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">US health spending was 18.0% of GDP in 2024 (CMS National Health Expenditure Accounts); US life expectancy was 78.4 years in 2023 (CDC NCHS). For cross-country spending and outcomes, use the current OECD Health Statistics release. SHI = Statutory Health Insurance.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "💊",
            title: "International Drug Pricing Models",
            items: [
              "AMNOG (Germany): new drugs assessed for added benefit vs. standard of care — negotiated price or reference pricing",
              "NICE (UK): cost-effectiveness threshold, historically £20,000–£30,000 per QALY",
              "HTA (Health Technology Assessment): France, Germany, Australia all use HTA gating for formulary entry",
              "Reference pricing: many countries set drug prices against a basket of peer nations",
              "IRA drug negotiation: the first US Medicare price negotiation — 10 drugs from 2026 at 38%–79% below list (CMS)",
              "US vs. peers: US drug prices average 2.56× higher than OECD median (RAND 2021)",
            ],
          },
          {
            icon: "🏥",
            title: "Single-Payer & Universal Coverage Models",
            items: [
              "NHS (UK): government owns most hospitals and employs most physicians — the Beveridge model",
              "Medicare Canada: provincial single-payer for hospital + physician services; private supplemental common",
              "Taiwan NHI: single-payer universal coverage since 1995; smart card at every encounter; global budget",
              "German SHI: competing non-profit sickness funds; income-based contributions; a common benefit package",
              "Medicare for All (US): Sanders/Jayapal bills would replace private insurance; estimated $32–34T in new federal spending over 10 years",
              "Public option models: state-based (WA, CO, OR) — government plan competes alongside private insurance",
            ],
          },
          {
            icon: "📊",
            title: "Commonwealth Fund Rankings",
            items: [
              "2023 Commonwealth Fund Mirror, Mirror: US ranks last of 10 wealthy nations overall",
              "US ranks last: access to care, equity, administrative efficiency — ranks high on specialty care quality",
              "Top performers: Commonwealth Fund Mirror, Mirror 2024 ranked Australia, the Netherlands and the UK highest of 10 countries; the US last",
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
              "Direct Primary Care (US parallel): membership-based practices that avoid insurance billing",
              "Patient-centered medical home (PCMH): US model aligned with UK GP approach — NCQA certification",
              "Primary care spend: the US devotes a smaller share of health spending to primary care than most peers",
            ],
          },
          {
            icon: "🧮",
            title: "Administrative Cost Drivers",
            items: [
              "US administrative costs: 34.2% of health expenditures vs. 17.0% in Canada — $2,497 vs. $551 per capita in 2017 (Himmelstein et al., Annals of Internal Medicine, 2020)",
              "Claims denials: HealthCare.gov insurers denied about 17% of in-network claims in 2021 (KFF)",
              "EHR interoperability: US fragmentation increases admin burden; NHS Spine achieves near-universal data sharing",
            ],
          },
          {
            icon: "🎓",
            title: "Lessons for US Reform",
            items: [
              "Lesson 1 — Primary care investment: peer systems put a larger share of spending into primary care",
              "Lesson 2 — Global budgeting: Canadian/UK global budgets control spending without rationing access",
              "Lesson 3 — Drug price negotiation: all peer nations negotiate or regulate drug prices systematically",
              "Lesson 4 — Administrative simplification: standardized billing and fewer payers lower overhead",
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
                  <span className="text-blue-500 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* US vs Peers Scorecard */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">US vs. Peer Nations: Policy Scorecard</h2>
        <p className="text-slate-500 text-sm mb-6">Where the US leads, lags, and where targeted reform could close the gap</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "US Leads", color: "bg-white border-emerald-200", icon: "✅", items: ["Specialty care quality and innovation output", "Cancer 5-year survival rates (breast, prostate, colon)", "Medical device and biopharma R&D investment", "Rare disease treatment availability + FDA innovation pathway"] },
            { label: "US Lags", color: "bg-white border-rose-200", icon: "⚠️", items: ["Life expectancy (78.4 years in 2023 — below peer nations)", "Maternal and infant mortality rates", "Administrative cost efficiency (34% vs. 17% in Canada)", "Coverage universality (8M+ remain uninsured)"] },
            { label: "Reform Levers", color: "bg-white border-blue-200", icon: "🔧", items: ["Universal coverage: public option or Medicaid expansion in remaining 10 states", "Drug negotiation: IRA precedent → expand to all Medicare + Medicaid drugs", "Admin simplification: single claim form, uniform prior auth standards", "Primary care investment: redirect 2–3% specialty spend to primary + prevention"] },
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
        colorClass="text-blue-700"
        category="Global"
        hideHeader
      />
      <GlobalPolicyBody />
    </>
  );
}
