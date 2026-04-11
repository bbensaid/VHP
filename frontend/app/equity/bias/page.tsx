import CategoryPage from "@/components/CategoryPage";

function AlgorithmicBiasHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mb-4">
          Equity · Algorithmic Bias
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">Algorithmic Bias in Healthcare</h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          How bias enters clinical algorithms, risk scores, and AI systems — documented harms, regulatory
          responses, audit methodologies, and the practical steps to build more equitable healthcare AI.
        </p>
      </div>
    </div>
  );
}

function AlgorithmicBiasBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Race-Corrected Formula Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🔬</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Race-Corrected Clinical Formulas — Status Tracker</h2>
            <p className="text-sm text-slate-500">Algorithms that used race as a variable and their current status in clinical guidelines</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Algorithm</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Historical Bias</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Current Guideline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { algo: "eGFR (CKD-EPI 2009)", bias: "Race adjustment inflated GFR for Black patients → delayed CKD staging", status: "Removed", statusColor: "bg-emerald-100 text-emerald-700", guideline: "CKD-EPI 2021 race-free equation — KDIGO/NKF endorsed" },
                { algo: "VBAC Success Calculator", bias: "Race/ethnicity lowered predicted success for Black + Hispanic women", status: "Removed", statusColor: "bg-emerald-100 text-emerald-700", guideline: "ACOG 2021 guidance: remove race from VBAC counseling" },
                { algo: "Spirometry Reference Values", bias: "Race-based lung function 'correction' reduced disability recognition for Black patients", status: "Revised", statusColor: "bg-amber-100 text-amber-700", guideline: "ATS 2022: race/ethnicity-neutral GLI reference equations recommended" },
                { algo: "Cardiac Surgery Risk (STS)", bias: "Race included as risk variable in STS mortality model", status: "Under Review", statusColor: "bg-amber-100 text-amber-700", guideline: "STS reviewing racial variable inclusion — interim guidance issued" },
                { algo: "Pulse Oximetry (SpO2)", bias: "Melanin absorbs IR light → SpO2 overestimation in darker skin", status: "Device Issue", statusColor: "bg-rose-100 text-rose-700", guideline: "FDA Safety Communication 2021; device manufacturers updating validation" },
                { algo: "ASCVD 10-Year Risk (PCE)", bias: "Pooled Cohort Equations: race-specific equations may overestimate in some populations", status: "Evolving", statusColor: "bg-amber-100 text-amber-700", guideline: "ACC/AHA 2023: assess individual patient context; race not required input" },
              ].map((row) => (
                <tr key={row.algo} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-bold text-slate-800 text-sm">{row.algo}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.bias}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${row.statusColor}`}>{row.status}</span>
                  </td>
                  <td className="py-3 text-slate-500 text-xs">{row.guideline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "⚠️",
            title: "Documented Algorithmic Bias Cases",
            items: [
              "Optum Health algorithm (2019): used cost as proxy for health need — reduced care referrals for Black patients by 50% at equal actual need (Science 2019)",
              "Pulse oximetry: SpO2 overestimates O2 saturation in darker skin tones → 3× higher undetected hypoxemia in Black patients (NEJM 2020)",
              "Dermatology AI: trained on predominantly light-skin datasets — lower sensitivity on Fitzpatrick skin types V–VI",
              "Epic Sepsis Model: Black patients 50% less likely to receive sepsis care bundle despite equal ESM score",
              "eGFR race correction: race-adjusted GFR formula delayed CKD diagnosis for Black patients; removed 2021",
              "VBAC calculator: included race/ethnicity as input — systematically underestimated VBAC success in Black + Hispanic women",
            ],
          },
          {
            icon: "🔍",
            title: "Sources of Algorithmic Bias",
            items: [
              "Training data bias: historical data encodes past discriminatory care patterns",
              "Label bias: proxy labels (cost, hospitalization) reflect access barriers, not true need",
              "Feature selection bias: including race as input variable rather than as stratification check",
              "Representation gaps: clinical trial datasets 72% white male — generalizability failures",
              "Feedback loops: biased model → biased care → biased outcome data → retrained biased model",
              "Measurement bias: pulse ox, spirometry, GFR — physiological tools not validated across populations",
            ],
          },
          {
            icon: "📋",
            title: "Regulatory Response",
            items: [
              "FDA Action Plan (2021): bias and equity as explicit pre-market submission requirement for AI/ML SaMD",
              "ONC HTI-1 Rule (2024): information blocking + decision support algorithm transparency requirements",
              "HHS Civil Rights Office: Section 1557 (ACA) prohibits discriminatory algorithms in covered entities",
              "EU AI Act (2024): prohibited AI practices include discriminatory decision systems; health AI = high risk",
              "NIST AI RMF Playbook: GOVERN, MAP, MEASURE, MANAGE — bias as explicit risk category",
              "CMS conditions: health equity data collection required for hospital inpatient quality reporting (2023)",
            ],
          },
          {
            icon: "🧪",
            title: "Bias Audit Methodology",
            items: [
              "Stratified performance analysis: AUC, sensitivity, PPV by race/ethnicity, sex, age, zip code",
              "Counterfactual fairness testing: change protected attribute only — does prediction change?",
              "Disparate impact analysis: 80% rule — minority group outcome rate ≥80% of majority group rate",
              "Calibration by subgroup: predicted vs. observed outcome rates disaggregated by race",
              "Intersectionality testing: Black women, elderly Hispanic men — compound subgroup analysis",
              "Tools: IBM AI Fairness 360, Google What-If Tool, Aequitas (CMU), FairML open-source",
            ],
          },
          {
            icon: "🏗️",
            title: "Equitable AI Design",
            items: [
              "Diverse training data: mandate demographic representation matching deployment population",
              "Decouple race from biological variables: race is social, not biological — use ancestry if needed",
              "Causal modeling: identify and block spurious correlations between race and target variable",
              "Participatory design: community engagement in algorithm development (community advisory boards)",
              "Federated learning: train on diverse distributed datasets without centralizing sensitive data",
              "Ongoing post-deployment monitoring: quarterly equity audits with transparent public reporting",
            ],
          },
          {
            icon: "🏥",
            title: "Clinical Implementation",
            items: [
              "EHR race/ethnicity data quality: improve self-reported collection; 32% of EHRs have incomplete race data",
              "Physician education: implicit bias training + algorithm transparency CME requirements",
              "Remove race from clinical equations: eGFR, VBAC, ASCVD risk — race-free alternatives available",
              "Alert for equity gaps: EHR dashboard showing care gap disparities by patient demographics",
              "Health system equity reports: required disclosure of outcome disparities by race in Joint Commission accreditation",
              "Community trust rebuilding: research governance including community co-investigators",
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

      {/* Equity AI Framework */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Equitable AI Deployment Framework</h2>
        <p className="text-slate-500 text-sm mb-6">What health systems must do before, during, and after deploying clinical AI</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { phase: "Before Deployment", color: "bg-white border-indigo-200", steps: ["Audit training data for demographic representation", "Stratified validation across race, sex, age, SES", "Community advisory board review of use case", "Equity impact assessment: who benefits, who is excluded?"] },
            { phase: "At Deployment", color: "bg-white border-amber-200", steps: ["Shadow mode monitoring: flag subgroup performance gaps", "Clinician training on algorithm limitations + known biases", "Clear documentation of validation demographics in UI", "Override logging: track who overrides and for which patient"] },
            { phase: "Post-Deployment", color: "bg-white border-emerald-200", steps: ["Quarterly equity audits: performance by protected characteristic", "Outcome disparity monitoring: downstream care + outcomes", "Transparent public reporting of equity metrics", "Retrain on diverse local data; retire if bias uncorrectable"] },
          ].map((phase) => (
            <div key={phase.phase} className={`rounded-xl p-5 border ${phase.color}`}>
              <div className="font-bold text-slate-800 text-sm mb-3">{phase.phase}</div>
              <ul className="space-y-2">
                {phase.steps.map((s) => (
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
      <AlgorithmicBiasHero />
      <CategoryPage
        pillar="Equity"
        title="Algorithmic Bias"
        description="Documented AI bias cases, race-corrected formula status, audit methodology, and equitable AI design."
        colorClass="text-amber-700"
        category="Bias"
        hideHeader
      />
      <AlgorithmicBiasBody />
    </>
  );
}
