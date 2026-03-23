import Link from "next/link";
import CategoryPage from "@/components/CategoryPage";

// Rich population health tools embedded above the article feed
function PopulationHealthTools() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      {/* Hero */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 rounded-full px-3 py-1 mb-4">
          Clinical · Population Health
        </span>
        <h1 className="text-4xl font-black text-slate-900 mb-3">Population Health Management</h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Evidence-based strategies for managing chronic disease at scale, improving preventive care
          delivery, and applying risk stratification to drive measurable population outcomes.
        </p>
      </div>

      {/* Core Topic Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🫀",
            title: "Chronic Disease Management",
            color: "rose",
            items: [
              "Diabetes: ADA standards, HEDIS glycemic control measures",
              "Heart failure: evidence-based bundles, 30-day readmission reduction",
              "COPD: exacerbation prevention, pulmonary rehab ROI",
              "CKD: early identification, nephrology co-management models",
              "Hypertension: population-wide BP control program design",
            ],
          },
          {
            icon: "🔬",
            title: "Preventive Screenings & Immunization",
            color: "rose",
            items: [
              "Cancer screening rates: mammography, colonoscopy, lung CT, cervical",
              "USPSTF Grade A/B recommendations and CMS quality measure linkage",
              "Immunization registry integration and gap closure workflows",
              "Social needs screening (SDOH): PRAPARE, AHC Health-Related Social Needs",
              "Depression screening (PHQ-9): population-level tracking and intervention",
            ],
          },
          {
            icon: "📊",
            title: "Risk Stratification & Analytics",
            color: "rose",
            items: [
              "CMS Hierarchical Condition Category (HCC) coding accuracy",
              "Predictive risk scoring: LACE+, HOSPITAL score, readmission models",
              "Care gap identification: EMR-integrated population dashboards",
              "High-utilizer programs: ED super-utilizer identification and intervention",
              "Social risk adjustment: incorporating ZIP-code-level SVI into models",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-rose-500 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* HEDIS Quality Measures Reference */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📋</span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Key HEDIS Measures — Quick Reference</h2>
            <p className="text-sm text-slate-500">NCQA Healthcare Effectiveness Data & Information Set — population health benchmarks</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Measure</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Condition</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">National 50th %ile</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">National 90th %ile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { measure: "Glycemic Control (HbA1c < 8%)", condition: "Diabetes", p50: "73%", p90: "83%" },
                { measure: "Controlling High Blood Pressure", condition: "Hypertension", p50: "72%", p90: "82%" },
                { measure: "30-Day Readmission Rate (CHF)", condition: "Heart Failure", p50: "22%", p90: "16%" },
                { measure: "Breast Cancer Screening", condition: "Prevention", p50: "74%", p90: "83%" },
                { measure: "Colorectal Cancer Screening", condition: "Prevention", p50: "65%", p90: "77%" },
                { measure: "Depression Screening (PHQ-9)", condition: "Behavioral Health", p50: "78%", p90: "90%" },
                { measure: "Medication Adherence (Statins)", condition: "Cardiovascular", p50: "85%", p90: "91%" },
                { measure: "COPD All-Cause Readmission", condition: "COPD", p50: "20%", p90: "14%" },
              ].map((row) => (
                <tr key={row.measure} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-medium text-slate-800">{row.measure}</td>
                  <td className="py-3 pr-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                      {row.condition}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{row.p50}</td>
                  <td className="py-3 font-semibold text-emerald-700">{row.p90}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Source: NCQA HEDIS 2024 National Averages & Benchmarks. Readmission rates: lower is better; all others: higher is better.</p>
      </div>

      {/* Risk Stratification Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* LACE+ Score Guide */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">LACE+ Readmission Risk Index</h3>
          <p className="text-sm text-slate-500 mb-5">Validated tool for predicting 30-day unplanned readmission</p>
          <div className="space-y-3">
            {[
              { label: "L — Length of stay", max: "up to 7 pts", note: "1 day = 1pt; ≥14 days = 7pts" },
              { label: "A — Acuity (ED admission)", max: "3 pts", note: "Unplanned ED admission via ED = 3pts" },
              { label: "C — Comorbidity (Charlson score)", max: "up to 5 pts", note: "Each comorbidity weighted by mortality risk" },
              { label: "E — ED visits in prior 6 months", max: "up to 4 pts", note: "0 visits = 0; ≥4 visits = 4pts" },
            ].map((row) => (
              <div key={row.label} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="shrink-0 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm">
                  {row.label[0]}
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">{row.label}</div>
                  <div className="text-xs text-slate-500">{row.note} · <span className="font-medium text-rose-600">{row.max}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
            <strong>Interpretation:</strong> Score ≥10 = High risk (consider intensive post-discharge follow-up). Score 5–9 = Moderate. Score &lt;5 = Low.
          </div>
        </div>

        {/* Population Segmentation Model */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Population Segmentation Framework</h3>
          <p className="text-sm text-slate-500 mb-5">Kaiser Permanente-derived stratification pyramid</p>
          <div className="space-y-3">
            {[
              {
                tier: "Tier 4",
                label: "Complex / High-Need",
                pct: "1–5%",
                desc: "Multiple chronic conditions, high utilization, active care management",
                bg: "bg-rose-100",
                text: "text-rose-800",
                border: "border-rose-300",
              },
              {
                tier: "Tier 3",
                label: "High Risk",
                pct: "15–20%",
                desc: "2+ chronic conditions or rising risk; care coordination + proactive outreach",
                bg: "bg-orange-100",
                text: "text-orange-800",
                border: "border-orange-300",
              },
              {
                tier: "Tier 2",
                label: "Moderate Risk",
                pct: "25–30%",
                desc: "1 chronic condition or SDOH risk; disease management programs",
                bg: "bg-amber-100",
                text: "text-amber-800",
                border: "border-amber-300",
              },
              {
                tier: "Tier 1",
                label: "Healthy / Low Risk",
                pct: "50–60%",
                desc: "Preventive care, wellness programs, population health campaigns",
                bg: "bg-emerald-100",
                text: "text-emerald-800",
                border: "border-emerald-300",
              },
            ].map((tier) => (
              <div key={tier.tier} className={`flex items-start gap-3 p-3 ${tier.bg} border ${tier.border} rounded-lg`}>
                <div className={`shrink-0 text-xs font-bold ${tier.text}`}>{tier.tier}<br />{tier.pct}</div>
                <div>
                  <div className={`font-semibold text-sm ${tier.text}`}>{tier.label}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{tier.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ED Super-Utilizer Programs */}
      <div className="bg-indigo-700 text-white rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-bold mb-2">ED Super-Utilizer Intervention Framework</h2>
        <p className="text-indigo-100 text-sm mb-6">
          The top 5% of ED users account for 40–60% of all ED visits. Evidence-based intervention pathways:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Identify",
              desc: "≥4 ED visits in 12 months OR ≥2 admits in 30 days. Flag in EMR via real-time ADT feed.",
            },
            {
              step: "02",
              title: "Assess",
              desc: "Complex care needs assessment: medical, behavioral, SDOH. Motivational interviewing.",
            },
            {
              step: "03",
              title: "Connect",
              desc: "Assign complex care coordinator. Link to PCP, BH services, housing, food resources.",
            },
            {
              step: "04",
              title: "Measure",
              desc: "Track ED utilization at 30/90/180 days. Target ≥40% reduction in high-risk cohort.",
            },
          ].map((step) => (
            <div key={step.step} className="bg-white/10 rounded-xl p-4">
              <div className="text-rose-400 font-black text-2xl mb-2">{step.step}</div>
              <div className="font-bold text-white mb-1">{step.title}</div>
              <div className="text-slate-300 text-sm">{step.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-4">Evidence: Camden Coalition, Hennepin Healthcare, NEJM Catalyst 2023 meta-analysis</p>
      </div>

      {/* Section divider before article feed */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Latest Analysis & Research</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <PopulationHealthTools />
      <CategoryPage
        pillar="Clinical"
        title="Population Health"
        description="Managing chronic disease and preventive care at scale."
        colorClass="text-rose-700"
        category="Population"
        hideHeader
      />
    </>
  );
}
