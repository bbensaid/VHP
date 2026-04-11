import CategoryPage from "@/components/CategoryPage";

function AccessDisparityHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mb-4">
          Equity · Access Disparity
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">Access Disparity & Health Equity</h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          Closing the care access gap across rural, urban safety-net, and underinsured populations —
          provider shortages, Medicaid coverage expansion, FQHC models, and the policy levers that move the needle.
        </p>
      </div>
    </div>
  );
}

function AccessDisparityBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Disparity by Condition */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📉</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Health Outcome Disparities by Race/Ethnicity</h2>
            <p className="text-sm text-slate-500">Key outcome metrics vs. white non-Hispanic baseline (CDC / KFF / AHRQ data)</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Condition / Outcome</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Black (vs. White)</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Hispanic (vs. White)</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">AIAN (vs. White)</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Primary Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { condition: "Maternal mortality rate", black: "3.1× higher", hispanic: "1.4× higher", aian: "2.4× higher", driver: "Access to OB, preeclampsia undertreatment" },
                { condition: "Diabetes prevalence", black: "1.6× higher", hispanic: "1.7× higher", aian: "2.3× higher", driver: "SDOH, diet access, PCM screening gaps" },
                { condition: "Hypertension control", black: "14% lower BP control rate", hispanic: "9% lower", aian: "12% lower", driver: "Medication adherence, access, distrust" },
                { condition: "COVID-19 age-adj. mortality", black: "1.4× higher (peak)", hispanic: "1.8× higher (peak)", aian: "2.4× higher (peak)", driver: "Frontline work exposure, comorbidities" },
                { condition: "Life expectancy (years)", black: "−4.2 yrs", hispanic: "+3.1 yrs (Hispanic Paradox)", aian: "−6.8 yrs", driver: "SDOH, chronic disease, violence, opioids" },
                { condition: "Infant mortality rate", black: "2.2× higher", hispanic: "0.7× (lower than white)", aian: "1.9× higher", driver: "Preterm birth, access to NICU, SDOH" },
              ].map((row) => (
                <tr key={row.condition} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-semibold text-slate-800 text-sm">{row.condition}</td>
                  <td className="py-3 pr-4 font-bold text-rose-600 text-xs">{row.black}</td>
                  <td className="py-3 pr-4 font-bold text-amber-600 text-xs">{row.hispanic}</td>
                  <td className="py-3 pr-4 font-bold text-rose-700 text-xs">{row.aian}</td>
                  <td className="py-3 text-slate-500 text-xs">{row.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">AIAN = American Indian / Alaska Native. Sources: CDC Wonder, KFF State Health Facts, AHRQ National Healthcare Quality and Disparities Report 2023.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🗺️",
            title: "Geographic Access Disparities",
            items: [
              "Health Professional Shortage Areas (HPSAs): 8,128 primary care HPSAs covering 82M Americans",
              "Medically Underserved Areas (MUAs): 2,200+ areas with shortage of primary care, OB, mental health",
              "Rural hospital closures: 140+ rural hospitals closed 2010–2024; 600+ at risk of closure",
              "Drive time analysis: 30% of rural Americans >60-minute drive to nearest trauma center",
              "Mental health deserts: 29% of US counties have zero mental health providers (NAMI)",
              "Ob/Gyn shortage: 47% of US counties are maternity care deserts (March of Dimes 2023)",
            ],
          },
          {
            icon: "💳",
            title: "Insurance Coverage & Medicaid",
            items: [
              "Uninsured rate: 8.0% (26.4M Americans) — ACA reduced from 16.3% in 2010 (CDC 2023)",
              "Medicaid expansion (ACA): 40 states + DC expanded; non-expansion gap = 2.4M uninsured",
              "Medicaid coverage gap: earn too much for Medicaid, too little for ACA subsidies in holdout states",
              "CHIP: 9.7M children enrolled — effective but renewal barriers cause churn",
              "Enhanced ACA subsidies (ARP): benchmark premium reduced 50%+ for 10M+ enrollees",
              "Continuous Medicaid enrollment (COVID unwind): 10M+ disenrollments 2023–2024 — access cliff",
            ],
          },
          {
            icon: "🏥",
            title: "Safety Net & FQHC System",
            items: [
              "FQHCs: 1,400 health centers serving 32M patients at 15,000 sites — sliding scale fees",
              "FQHC reimbursement: Prospective Payment System (PPS) — all-inclusive per-visit rate ($182–$285)",
              "Section 330 grants: $6.5B federal funding for FQHCs (2024) — enables comprehensive care delivery",
              "Critical Access Hospitals (CAH): 1,346 CAHs — cost-based Medicare reimbursement (101% of cost)",
              "Rural Health Clinics (RHC): 4,900+ RHCs — enhanced Medicare/Medicaid rates for rural primary care",
              "Disproportionate Share Hospital (DSH): $19.8B annually for hospitals serving high Medicaid/uninsured",
            ],
          },
          {
            icon: "👩‍⚕️",
            title: "Provider Shortage Solutions",
            items: [
              "National Health Service Corps (NHSC): 22,000+ providers in HPSAs — loan repayment + scholarships",
              "J-1 visa waiver (Conrad 30): 30 IMGs/year per state → practice in underserved areas for 3 years",
              "NP/PA full-practice authority: 28 states allow independent practice — increases rural access",
              "Loan repayment: NHSC up to $75K; NURSE Corps $40K — recruitment lever for shortage areas",
              "Community health workers (CHW): bridges trust gap in underserved communities — $2.47 ROI per $1",
              "Telehealth: rural access supplement — reduces travel burden; no evidence of quality compromise",
            ],
          },
          {
            icon: "🤱",
            title: "Maternal & Infant Health Disparities",
            items: [
              "Maternal mortality rate: Black women 3× higher rate than white women (CDC 2022 — 69.9 vs. 26.6)",
              "Preterm birth disparity: Black infants 1.5× higher preterm rate — highest in developed nations",
              "Maternal mortality causes: 84% preventable; hemorrhage, cardiovascular, mental health leading causes",
              "Maternity care deserts: 36% of US counties have no OB, no midwife, no birthing hospital",
              "Doula access programs: Medicaid doula coverage in 11+ states — reduces C-section + preterm birth",
              "Strong Start initiative: CMS prenatal care enhancement for Medicaid — 16% NICU reduction",
            ],
          },
          {
            icon: "📊",
            title: "Measuring & Reporting Equity",
            items: [
              "CMS Health Equity Stratified Reporting: race/ethnicity breakdown required for QRs (2023+)",
              "HEDIS Stratification: NCQA mandates stratified reporting for 6 clinical domains by 2025",
              "HHS Disparities Report: annual tracking of 250+ measures across race, ethnicity, socioeconomic status",
              "Leapfrog Group: hospital safety grade with equity lens — racial disparity in patient safety outcomes",
              "CMS Star Rating equity adjustment: dual-eligible + LIS adjustment to prevent penalizing safety-net plans",
              "Community Health Needs Assessment (CHNA): required every 3 years; health equity as core priority",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-orange-500 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Policy Solutions */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Evidence-Based Equity Interventions</h2>
        <p className="text-slate-500 text-sm mb-6">Interventions with rigorous evidence of reducing health disparities</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Medicaid Expansion",
              evidence: "Strong (NEJM, Health Affairs)",
              body: "ACA Medicaid expansion reduced uninsured rate 40%, improved cancer screening rates 20–25%, and reduced cardiovascular mortality 6.1% in expansion vs. non-expansion states.",
              badge: "bg-emerald-100 text-emerald-700",
            },
            {
              title: "Community Health Workers",
              evidence: "Strong (RCT evidence)",
              body: "CHW programs reduce diabetes A1c 0.5–1.2%, reduce ED visits 18–24%, and improve hypertension control 15%. ROI: $2.47 per $1 invested across 12 RCTs.",
              badge: "bg-emerald-100 text-emerald-700",
            },
            {
              title: "Doula Support Programs",
              evidence: "Moderate (RCTs + observational)",
              body: "Medicaid-covered doulas reduce C-section rate 25%, preterm birth 14%, and improve breastfeeding initiation 8%. 11+ states have enacted Medicaid doula coverage.",
              badge: "bg-amber-100 text-amber-700",
            },
            {
              title: "Language Concordant Care",
              evidence: "Strong (observational)",
              body: "Patients cared for in their primary language: 40% lower medication errors, 20% higher screening completion, and 2× more likely to have chronic disease controlled.",
              badge: "bg-emerald-100 text-emerald-700",
            },
            {
              title: "FQHC Expansion",
              evidence: "Strong (HRSA program data)",
              body: "FQHCs reduce preventable ED visits 18%, lower uncompensated care costs, and achieve comparable quality to private practices despite serving 3× more complex patients.",
              badge: "bg-emerald-100 text-emerald-700",
            },
            {
              title: "Telehealth for Rural Access",
              evidence: "Moderate (strong for specialty)",
              body: "Telestroke reduces door-to-needle time 35%, tele-dermatology improves biopsy yield, and telepsychiatry in rural EDs reduces transfer rates 35%.",
              badge: "bg-amber-100 text-amber-700",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${item.badge}`}>{item.evidence}</span>
              </div>
              <div className="font-bold text-slate-800 text-sm mb-2">{item.title}</div>
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
      <AccessDisparityHero />
      <CategoryPage
        pillar="Equity"
        title="Access Disparity"
        description="Provider shortages, Medicaid expansion, safety-net systems, and evidence-based equity interventions."
        colorClass="text-amber-700"
        category="Access"
        hideHeader
      />
      <AccessDisparityBody />
    </>
  );
}
