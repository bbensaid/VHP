import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Value-Based Care Models | HTR Economics",
  description: "Analysis of APMs, bundled payments, shared savings, MSSP, ACO REACH, and the full spectrum of value-based care contract structures and outcomes models.",
};

function ValueBasedCareHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-4">
          Economics · Value-Based Care
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">
          Value-Based Care Models
        </h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          The financial mechanics of shifting from fee-for-service to outcomes-based reimbursement —
          APM structure, risk adjustment methodology, shared savings calculations, and what it takes to win in downside risk.
        </p>
      </div>
    </div>
  );
}

function ValueBasedCareBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* APM Model Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📋</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">CMS APM Model Comparison</h2>
            <p className="text-sm text-slate-500">Key financial parameters across major CMS value-based payment models</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Model</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Upside Sharing</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Downside Risk</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Risk Cap</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">AAPM Qualifying</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { model: "MSSP Basic A/B", upside: "40–50%", downside: "None (upside only)", cap: "N/A", aapm: false },
                { model: "MSSP Basic C/D/E", upside: "40–50%", downside: "30% of losses", cap: "4–8% of benchmark", aapm: true },
                { model: "MSSP Enhanced", upside: "60%", downside: "60% of losses", cap: "8% of benchmark", aapm: true },
                { model: "ACO REACH (Pro/Gbl)", upside: "Up to 100%", downside: "Up to 100% of losses", cap: "Corridor mechanism", aapm: true },
                { model: "BPCI-A (bundles)", upside: "Gain vs. target price", downside: "Repay vs. target price", cap: "Stop-loss option", aapm: true },
                { model: "Medicare Advantage", upside: "Full capitation retained", downside: "Full insurance risk", cap: "MLR ≥85% floor", aapm: false },
              ].map((row) => (
                <tr key={row.model} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-bold text-slate-800">{row.model}</td>
                  <td className="py-3 pr-4 text-emerald-700 font-semibold text-xs">{row.upside}</td>
                  <td className="py-3 pr-4 text-rose-600 text-xs">{row.downside}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.cap}</td>
                  <td className="py-3">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${row.aapm ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500"}`}>
                      {row.aapm ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">AAPM = Advanced APM (qualifies for QP bonus of +3.5% of Medicare payments). Risk cap = maximum loss exposure as % of benchmark expenditures. Sources: CMS Innovation Center, MSSP program specifications.</p>
      </div>

      {/* Shared Savings Math + VBC Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Shared Savings Worked Example</h3>
          <p className="text-sm text-slate-500 mb-5">Hypothetical 15,000-life MSSP Enhanced ACO, PY2024</p>
          <div className="space-y-4">
            {[
              { label: "Attributed lives", value: "15,000", note: "Part A + B beneficiaries" },
              { label: "Benchmark PMPM", value: "$1,050", note: "Risk-adjusted 3-year blend" },
              { label: "Total benchmark", value: "$189M", note: "15,000 × $1,050 × 12 mo" },
              { label: "Actual expenditure", value: "$176M", note: "Claims paid by CMS" },
              { label: "Gross savings", value: "$13M", note: "Benchmark − Actual" },
              { label: "MSR threshold (2%)", value: "$3.78M", note: "Must exceed to earn savings" },
              { label: "ACO share (60%)", value: "$7.8M", note: "60% × $13M (if quality = 100%)" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                <div>
                  <div className="text-sm font-semibold text-slate-800">{row.label}</div>
                  <div className="text-xs text-slate-400">{row.note}</div>
                </div>
                <div className="font-black text-emerald-700">{row.value}</div>
              </div>
            ))}
            <div className="border-t border-slate-200 pt-3 flex justify-between font-black text-slate-900 text-lg">
              <span>ACO Net Shared Savings</span>
              <span className="text-emerald-700">$7.8M</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">VBC Performance Benchmarks</h3>
          <p className="text-sm text-slate-500 mb-5">Top-quartile ACO performance metrics (CMS program data)</p>
          <div className="space-y-4">
            {[
              { metric: "Total cost savings vs. benchmark", top: "8–12%", median: "3–5%", unit: "%" },
              { metric: "30-day readmission rate reduction", top: "18–24%", median: "8–12%", unit: "%" },
              { metric: "Preventable ED visit reduction", top: "15–20%", median: "5–9%", unit: "%" },
              { metric: "Generic dispensing rate", top: ">92%", median: "82–87%", unit: "%" },
              { metric: "HCC coding accuracy (RAF delta)", top: "+0.12–0.18", median: "+0.04–0.08", unit: "RAF" },
              { metric: "Quality composite score (MSSP)", top: "95–100%", median: "75–85%", unit: "%" },
            ].map((row) => (
              <div key={row.metric} className="p-3 bg-slate-50 rounded-xl">
                <div className="font-semibold text-slate-800 text-sm mb-2">{row.metric}</div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-black text-emerald-600 text-base">{row.top}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Top Quartile</div>
                  </div>
                  <div className="h-8 w-px bg-slate-200" />
                  <div className="text-center">
                    <div className="font-bold text-slate-500 text-base">{row.median}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Median ACO</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "📊",
            title: "Alternative Payment Model (APM) Spectrum",
            items: [
              "Category 1: FFS with reporting — quality bonuses, no financial risk",
              "Category 2: FFS with performance linkage — MIPS, PCMH incentives",
              "Category 3: APM with upside risk only — shared savings Track 1, Track 1+",
              "Category 4: APM with two-sided risk — MSSP Enhanced, REACH, direct contracting",
              "Category 5: Capitation — Medicare Advantage, FIDE-SNP, full-risk global budgets",
              "Advanced APM (AAPM): threshold: ≥50% Medicare payments in AAPM for QP bonus",
            ],
          },
          {
            icon: "🏥",
            title: "Medicare ACO Models",
            items: [
              "MSSP (Medicare Shared Savings Program): 480+ ACOs, 10.8M attributed beneficiaries",
              "MSSP Basic: 5-year glide path from shared savings to two-sided risk (B/C/D/E tracks)",
              "MSSP Enhanced: immediate two-sided risk; 60% sharing rate; risk cap: 8% of benchmark",
              "ACO REACH (Realizing Equity, Access, Coordination): global capitation option",
              "Performance year benchmark: 3-year blended historical expenditure (risk-adjusted)",
              "Minimum savings rate (MSR): 2–3.9% before ACO earns any shared savings",
            ],
          },
          {
            icon: "⚖️",
            title: "Risk Adjustment Methodology",
            items: [
              "CMS-HCC model: Hierarchical Condition Categories — 86 HCCs from ICD-10 codes",
              "RAF score: average beneficiary = 1.0; complex patients = 2.0–4.0+",
              "Encounter data: Part A/B claims + Part D data — accurate coding critical for benchmark",
              "Coding intensity adjustment: CMS applies 3.3–5.9% downward adjustment to MA plans",
              "Prospective vs. concurrent risk scoring: REACH uses prospective (prior year) model",
              "Risk score normalization: prevents gaming through aggressive HCC coding",
            ],
          },
          {
            icon: "💰",
            title: "Shared Savings Calculation",
            items: [
              "Benchmark = prior 3-year risk-adjusted per capita expenditures (blend ratio: 25/25/50)",
              "Actual expenditure = PBPM × attributed lives (Parts A + B, excluding Part D)",
              "Savings = Benchmark − Actual (if positive). Losses = Actual − Benchmark (two-sided)",
              "Sharing rate: 40–60% of savings (MSSP Enhanced: 60%; Basic Track A: 40%)",
              "Quality performance multiplier: high-quality ACO earns full sharing rate",
              "Typical ACO net shared savings: $300–$800 PMPY for high-performing ACOs",
            ],
          },
          {
            icon: "🔬",
            title: "Capitation & Global Budgets",
            items: [
              "Medicare Advantage: CMS pays plan fixed PMPM; plan bears full insurance risk",
              "PMPM benchmark: county-level FFS rate × plan bid factor (adjusted for quality)",
              "Medical Loss Ratio (MLR): CMS requires ≥85% MLR for Medicare Advantage plans",
              "Global budgeting (Vermont All-Payer): hospital-level global budget caps annual revenue",
              "FIDE-SNP (Fully Integrated Dual Eligible Special Needs Plans): Medicare + Medicaid capitation",
              "Provider-sponsored risk-sharing: capitation sub-contracts from plan to PCP group",
            ],
          },
          {
            icon: "📈",
            title: "VBC Success Factors",
            items: [
              "Total Cost of Care (TCOC) strategy: referral pattern optimization, post-acute network",
              "Attribution: CMS assigns beneficiaries to ACO based on plurality of E/M visits",
              "Care management infrastructure: high-risk stratification, transition care programs",
              "Population health analytics: predictive modeling for prospective outreach",
              "Specialist alignment: compact with high-utilization specialties (cardiology, orthopedics)",
              "Quality performance: HEDIS composite score drives full sharing rate access",
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

      {/* Strategic Framework */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Total Cost of Care Strategy Framework</h2>
        <p className="text-slate-500 text-sm mb-6">The operational levers that drive ACO and VBC financial performance</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Demand Management",
              icon: "📉",
              levers: [
                "Care management: high-risk outreach, nurse navigator programs",
                "Chronic disease management: CCM (CPT 99490) at scale",
                "Behavioral health integration: collaborative care model (CoCM)",
                "Medication adherence: MTM, 90-day supply, synchronization",
              ],
            },
            {
              title: "Utilization Management",
              icon: "⚙️",
              levers: [
                "Post-acute network: preferred SNF, home health, hospice contracting",
                "Readmission prevention: 72-hour post-discharge follow-up protocol",
                "Avoidable ED reduction: after-hours access, telehealth triage",
                "Referral management: closed-loop specialist network + prior auth",
              ],
            },
            {
              title: "Revenue Optimization",
              icon: "💹",
              levers: [
                "Annual Wellness Visits (AWV): HCC capture at scale — $300–$600/patient",
                "Hierarchical Condition Category (HCC) coding accuracy",
                "Quality performance: HEDIS gap closure = full sharing rate retention",
                "AAPM qualification: QP bonus = 3.5% of Medicare revenue",
              ],
            },
          ].map((cat) => (
            <div key={cat.title} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="font-bold text-slate-800 mb-3">{cat.title}</div>
              <ul className="space-y-2">
                {cat.levers.map((l) => (
                  <li key={l} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-emerald-600 mt-0.5">›</span> {l}
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
      <ValueBasedCareHero />
      <CategoryPage
        pillar="Economics"
        title="Value-Based Care Models"
        description="APM structure, risk adjustment, shared savings mechanics, and total cost of care strategy."
        colorClass="text-emerald-700"
        category="Value"
        hideHeader
      />
      <ValueBasedCareBody />
    </>
  );
}
