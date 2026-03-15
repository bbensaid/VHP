import CategoryPage from "@/components/CategoryPage";

function AIMLHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 mb-4">
          Technology · AI & Machine Learning
        </span>
        <h1 className="text-4xl font-black text-slate-900 mb-3">AI & Machine Learning in Healthcare</h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          From generative AI in clinical documentation to FDA-cleared diagnostic algorithms — the practical landscape
          of healthcare AI: what&apos;s proven, what&apos;s hype, and what&apos;s coming next.
        </p>
      </div>
    </div>
  );
}

function AIMLBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* FDA-Cleared AI Devices */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">✅</span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Selected FDA-Cleared AI Devices</h2>
            <p className="text-sm text-slate-500">High-impact AI/ML-enabled devices with FDA 510(k) clearance or PMA approval</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Device / Company</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Indication</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Pathway</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Performance</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { device: "IDx-DR (Digital Diagnostics)", indication: "Diabetic retinopathy screening", pathway: "De Novo", perf: "87% sensitivity, 90% specificity", year: "2018" },
                { device: "Paige Prostate (Paige.AI)", indication: "Prostate cancer DL pathology", pathway: "De Novo", perf: "Reduces false-negative rate 70%", year: "2021" },
                { device: "Viz.ai LVO", indication: "Large vessel occlusion on CT", pathway: "510(k)", perf: "AUC 0.91 vs. radiology read", year: "2018" },
                { device: "ProFound AI (iCAD)", indication: "Mammography cancer detection", pathway: "PMA", perf: "8% more cancers detected vs. unaided", year: "2019" },
                { device: "Eko DUO ECG+Stethoscope", indication: "AFib + murmur detection", pathway: "510(k)", perf: "99% AFib sensitivity, 98% specificity", year: "2023" },
                { device: "Caption Guidance (Caption Health)", indication: "AI-guided echo acquisition", pathway: "De Novo", perf: "Non-expert achieves diagnostic quality", year: "2020" },
              ].map((row) => (
                <tr key={row.device} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-bold text-indigo-700 text-sm">{row.device}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.indication}</td>
                  <td className="py-3 pr-4">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">{row.pathway}</span>
                  </td>
                  <td className="py-3 pr-4 text-slate-700 text-xs">{row.perf}</td>
                  <td className="py-3 text-slate-500 text-xs">{row.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Source: FDA AIML-enabled Medical Devices database (692+ cleared as of 2024). Radiology accounts for ~75% of cleared AI devices.</p>
      </div>

      {/* Investment + GenAI Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">AI Investment Priorities (2024)</h3>
          <p className="text-sm text-slate-500 mb-5">Where health systems are allocating AI budget</p>
          <div className="space-y-3">
            {[
              { area: "Ambient AI documentation", pct: 78, color: "bg-indigo-500" },
              { area: "Revenue cycle automation", pct: 72, color: "bg-indigo-500" },
              { area: "Clinical decision support", pct: 61, color: "bg-indigo-400" },
              { area: "Diagnostic imaging AI", pct: 54, color: "bg-indigo-400" },
              { area: "Operational scheduling AI", pct: 48, color: "bg-indigo-300" },
              { area: "Predictive deterioration models", pct: 43, color: "bg-indigo-300" },
              { area: "GenAI for patient education", pct: 31, color: "bg-indigo-200" },
            ].map((row) => (
              <div key={row.area}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700">{row.area}</span>
                  <span className="font-bold text-indigo-700">{row.pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-2 ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">Source: Reaction Data Health System AI Survey, n=312 leaders, 2024.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">GenAI Use Cases: Proof vs. Promise</h3>
          <p className="text-sm text-slate-500 mb-5">Honest assessment of healthcare LLM applications</p>
          <div className="space-y-3">
            {[
              { useCase: "Ambient clinical documentation", status: "Proven", evidence: "RCT-level evidence, live at 700+ hospitals", badge: "bg-emerald-100 text-emerald-700" },
              { useCase: "Coding & charge capture", status: "Proven", evidence: "15–20% revenue capture improvement in pilots", badge: "bg-emerald-100 text-emerald-700" },
              { useCase: "Patient message drafting", status: "Promising", evidence: "GPT-4 messages rated higher empathy than MDs (JAMA 2023)", badge: "bg-amber-100 text-amber-700" },
              { useCase: "Clinical Q&A (RAG)", status: "Promising", evidence: "82–91% accuracy on USMLE Step 1; hallucination controls required", badge: "bg-amber-100 text-amber-700" },
              { useCase: "Autonomous diagnosis", status: "Caution", evidence: "Misses rare diseases; biases toward common presentations; no FDA clearance", badge: "bg-rose-100 text-rose-700" },
              { useCase: "Treatment recommendation", status: "Caution", evidence: "High hallucination rate on drug interactions; liability unresolved", badge: "bg-rose-100 text-rose-700" },
            ].map((row) => (
              <div key={row.useCase} className="p-3 border border-slate-200 rounded-xl">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-semibold text-slate-800 text-sm">{row.useCase}</span>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${row.badge}`}>{row.status}</span>
                </div>
                <div className="text-xs text-slate-500">{row.evidence}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "✍️",
            title: "Generative AI & Clinical Documentation",
            items: [
              "Ambient AI scribes: Nuance DAX Copilot, Suki, Nabla — 50–70% documentation time reduction",
              "GPT-4 clinical note generation: CMS approved ambient capture as 'technology-assisted'",
              "SOAP note accuracy: ambient AI achieves 94–97% concordance with physician-edited notes",
              "Burnout mitigation: DAX Copilot users report 70% reduction in after-hours charting",
              "EHR integration: Epic SmartTools + Nuance live at 700+ US hospitals",
              "Liability: AI-generated notes require physician attestation — no AI-only sign-off",
            ],
          },
          {
            icon: "🔬",
            title: "Diagnostic AI & Imaging",
            items: [
              "FDA-cleared AI devices: 692 AI/ML-enabled devices cleared as of 2024 (75% radiology)",
              "Chest X-ray triage: Viz.ai, Aidoc — real-time ICH + PE detection, 92–96% sensitivity",
              "Mammography AI: iCAD ProFound, Hologic Genius — FDA PMA cleared, 8% fewer missed cancers",
              "Pathology AI: Paige Prostate (first FDA-approved AI pathology), PathAI HER2 scoring",
              "Retinal AI: IDx-DR — first fully autonomous AI diagnostic (diabetic retinopathy)",
              "ECG AI: Apple Watch AFib detection, Eko DUO — murmur + AFib dual detection",
            ],
          },
          {
            icon: "📊",
            title: "Predictive Analytics & Risk Models",
            items: [
              "Sepsis prediction: Epic Sepsis Model (AUC 0.74); high false positive burden documented",
              "Readmission risk: LACE+, HOSPITAL score, Epic ML 30-day readmission model",
              "Deterioration early warning: Epic EDI, Capsule Vitals — NEWS2 successor algorithms",
              "No-show prediction: ML models predict appointment no-shows with 80–85% accuracy",
              "HCC coding gap identification: CMS uses ML for RAF capture optimization (MA plans)",
              "Supply chain AI: demand forecasting for OR supplies — 15–20% waste reduction",
            ],
          },
          {
            icon: "🧬",
            title: "AI in Genomics & Drug Discovery",
            items: [
              "AlphaFold2 (DeepMind): protein structure prediction — revolutionized structural biology",
              "Generative molecular AI: Insilico Medicine, Recursion — de novo drug candidate design",
              "Variant classification: AI-assisted ACMG scoring (ClinVar, InterVar) — VUS resolution",
              "STAMP (Kather lab): predicts MSI, TMB, molecular subtypes directly from H&E slides",
              "Drug-drug interaction: FDA AI/ML framework for DDI signal detection in FAERS data",
              "Clinical trial matching: Tempus, Flatiron — AI-driven eligibility screening",
            ],
          },
          {
            icon: "⚙️",
            title: "Operational AI",
            items: [
              "OR scheduling: LeanTaaS iQueue — OR block utilization improvement 10–18%",
              "Bed management: TeleTracking, Qventus — AI reduces boarding 20–30%",
              "Staffing prediction: AI-driven nurse staffing (Shift Admin, Legion WFM)",
              "Revenue cycle AI: Waystar, Olive — denial prediction before submission",
              "Prior auth AI: Cohere Health — automated clinical review + voice PA completion",
              "Supply chain: Prodigo — AI-driven formulary management and contract compliance",
            ],
          },
          {
            icon: "⚖️",
            title: "Regulation, Safety & Ethics",
            items: [
              "FDA AI/ML Action Plan: PCCP (predetermined change control plan) for adaptive models",
              "EU AI Act (2024): healthcare AI = 'high risk' — conformity assessment required",
              "Algorithmic bias: PULSE dataset scandal; dermatology AI fails on darker skin tones",
              "ONC Health Data Interoperability Rule: FHIR API requirements enabling AI data access",
              "NIST AI RMF: voluntary AI risk management framework — increasingly used in procurement",
              "Post-market monitoring: FDA draft guidance on performance drift monitoring",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-indigo-500 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Governance Framework */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">AI Governance Framework for Health Systems</h2>
        <p className="text-slate-500 text-sm mb-6">What boards and CMOs must demand before deploying clinical AI</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { num: "01", title: "Clinical Validation", body: "Require peer-reviewed validation on your patient population. Vendor claims ≠ local generalizability. Minimum: prospective shadow mode before go-live.", color: "bg-white border-indigo-200" },
            { num: "02", title: "Bias Auditing", body: "Mandate demographic stratification of model performance. Monitor drift across race, age, sex, payer. Annual re-audit required post-deployment.", color: "bg-white border-amber-200" },
            { num: "03", title: "Human Oversight Loop", body: "No fully autonomous AI clinical decisions without physician attestation. Clear escalation when AI and clinician disagree. Log every override.", color: "bg-white border-emerald-200" },
            { num: "04", title: "Post-Market Monitoring", body: "Track false-positive alert fatigue. Monitor outcomes 6 months post-deployment. FDA PCCP compliance for adaptive AI. Board-level KPI reporting.", color: "bg-white border-rose-200" },
          ].map((item) => (
            <div key={item.num} className={`rounded-xl p-5 border ${item.color}`}>
              <div className="text-2xl font-black text-slate-300 mb-2">{item.num}</div>
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
      <AIMLHero />
      <CategoryPage
        pillar="Technology"
        title="AI & Machine Learning"
        description="FDA-cleared AI, generative documentation, predictive analytics, and governance frameworks."
        colorClass="text-indigo-700"
        category="AI"
        hideHeader
      />
      <AIMLBody />
    </>
  );
}
