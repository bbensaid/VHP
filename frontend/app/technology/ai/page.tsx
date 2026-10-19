import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "AI & Machine Learning in Healthcare | HTR Technology",
  description: "Clinical AI governance, machine learning applications, algorithm accountability, and the regulatory and ethical frameworks shaping AI deployment in health systems.",
};

function AIMLHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 mb-4">
          Technology · AI & Machine Learning
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">AI & Machine Learning in Healthcare</h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
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
            <h2 className="ty-h3 font-bold text-slate-900">Selected FDA-Cleared AI Devices</h2>
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
                { device: "Paige Prostate (Paige.AI)", indication: "Prostate cancer DL pathology", pathway: "De Novo", perf: "Pathologists' cancer detection on slide images improved 7.3% with assistance (FDA, 2021)", year: "2021" },
                { device: "Viz.ai LVO", indication: "Large vessel occlusion on CT", pathway: "De Novo", perf: "AUC 0.91 for LVO detection (FDA De Novo summary)", year: "2018" },
                { device: "ProFound AI (iCAD)", indication: "Digital breast tomosynthesis cancer detection", pathway: "510(k)", perf: "Reader sensitivity up 8% in the pivotal reader study (Conant 2019)", year: "2018" },
                { device: "Eko DUO ECG+Stethoscope", indication: "AFib + murmur detection", pathway: "510(k)", perf: "AFib and murmur detection from a single-lead ECG and phonocardiogram", year: "2023" },
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
        <p className="text-xs text-slate-400 mt-4">Source: FDA list of AI-enabled medical devices — more than 1,000 authorizations by 2025, roughly three-quarters of them in radiology.</p>
      </div>

      {/* Investment + GenAI Assessment */}
      <div className="grid grid-cols-1 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">GenAI Use Cases: Proof vs. Promise</h3>
          <p className="text-sm text-slate-500 mb-5">Honest assessment of healthcare LLM applications</p>
          <div className="space-y-3">
            {[
              { useCase: "Ambient clinical documentation", status: "Proven", evidence: "Randomized trial: 9.5% less time in notes for one product (NEJM AI 2025); 16 fewer documentation minutes per 8 patient hours (JAMA 2026)", badge: "bg-emerald-100 text-emerald-700" },
              { useCase: "Coding & charge capture", status: "Promising", evidence: "Vendor-reported gains; few independent evaluations", badge: "bg-emerald-100 text-emerald-700" },
              { useCase: "Patient message drafting", status: "Promising", evidence: "ChatGPT replies to public-forum questions rated more empathetic than physicians' (Ayers, JAMA Internal Medicine 2023)", badge: "bg-amber-100 text-amber-700" },
              { useCase: "Clinical Q&A (RAG)", status: "Promising", evidence: "Passes licensing-exam-style questions; hallucination controls required in clinical use", badge: "bg-amber-100 text-amber-700" },
              { useCase: "Autonomous diagnosis", status: "Caution", evidence: "Beyond narrow FDA-authorized uses such as IDx-DR, no autonomous diagnostic AI is authorized; LLMs miss rare presentations", badge: "bg-rose-100 text-rose-700" },
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
              "Ambient AI scribes (DAX Copilot, Suki, Nabla, Abridge): 16 fewer documentation minutes per 8 patient hours (JAMA 2026); a UCLA randomized trial found 9.5% less time in notes for one product (NEJM AI 2025)",
              "EHR integration: scribe output lands in the EHR note for clinician review",
              "Liability: AI-generated notes require physician attestation — no AI-only sign-off",
            ],
          },
          {
            icon: "🔬",
            title: "Diagnostic AI & Imaging",
            items: [
              "FDA's list of AI-enabled devices passed 1,000 authorizations, most of them in radiology",
              "CT triage: Viz.ai and Aidoc flag suspected stroke, intracranial hemorrhage and pulmonary embolism",
              "Mammography AI: iCAD ProFound AI — FDA 510(k); higher reader sensitivity in its reader study",
              "Pathology AI: Paige Prostate — first FDA-authorized AI tool for prostate biopsy images (De Novo, 2021)",
              "Retinal AI: IDx-DR — first fully autonomous AI diagnostic (diabetic retinopathy)",
              "ECG AI: Apple Watch AFib detection, Eko DUO — murmur + AFib dual detection",
            ],
          },
          {
            icon: "📊",
            title: "Predictive Analytics & Risk Models",
            items: [
              "Sepsis prediction: external validation of the Epic Sepsis Model found AUC 0.63 and many false alerts (Wong, JAMA Internal Medicine 2021)",
              "Readmission risk: LACE+, HOSPITAL score, Epic ML 30-day readmission model",
              "Deterioration early warning: Epic Deterioration Index, NEWS2 and other early-warning scores — validate locally",
              "HCC coding: MA plans use ML to find undocumented diagnoses — and CMS RADV audits and DOJ cases target unsupported codes",
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
              "OR scheduling: block-utilization tools such as LeanTaaS iQueue",
              "Bed management: capacity tools such as TeleTracking and Qventus",
              "Staffing prediction: AI-driven nurse staffing (Shift Admin, Legion WFM)",
              "Revenue cycle AI: denial prediction before claim submission",
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
              "Algorithmic bias: a widely used care-management algorithm underestimated Black patients' needs by predicting cost (Obermeyer, Science 2019); dermatology models perform worse on darker skin",
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
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">AI Governance Framework for Health Systems</h2>
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
