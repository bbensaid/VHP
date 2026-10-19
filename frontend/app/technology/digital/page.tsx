import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Digital Health & Telemedicine | HTR Technology",
  description: "Analysis of digital health platforms, telehealth regulation and reimbursement, asynchronous and synchronous care models, and RPM program design.",
};

function DigitalHealthHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 mb-4">
          Technology · Digital Health
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">Digital Health & Telemedicine</h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          The digital health ecosystem — remote patient monitoring, virtual care platforms, digital therapeutics,
          wearables, and the evidence base for what actually improves outcomes.
        </p>
      </div>
    </div>
  );
}

function DigitalHealthBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Digital Health Funding */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">💰</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Digital Health Funding Landscape</h2>
            <p className="text-sm text-slate-500">US digital health venture funding by year (Rock Health)</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4">Annual Investment ($B)</h4>
            <div className="space-y-3">
              {[
                { year: "2021 (Peak)", amount: 29.1, color: "bg-indigo-600" },
                { year: "2022", amount: 15.3, color: "bg-indigo-500" },
                { year: "2023", amount: 10.7, color: "bg-indigo-400" },
                { year: "2024", amount: 10.1, color: "bg-indigo-500" },
              ].map((row) => (
                <div key={row.year}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700">{row.year}</span>
                    <span className="font-bold text-indigo-700">${row.amount}B</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-3 ${row.color} rounded-full`} style={{ width: `${(row.amount / 29.1) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        <p className="text-xs text-slate-400 mt-6">Source: Rock Health annual digital health funding reports (US, venture).</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "📡",
            title: "Remote Patient Monitoring (RPM)",
            items: [
              "CMS billing: 99453/99454 setup and supply, 99457/99458 management; new for CY2026: 99445 (2–15 days of data) and 99470 (10-minute management)",
              "Cardiac monitoring: extended-wear ECG patches (e.g., Zio) for arrhythmia detection",
              "Heart failure: non-invasive telemonitoring has mixed evidence — Tele-HF found no readmission benefit (NEJM 2010); implanted pressure monitoring cut HF hospitalizations (CHAMPION, Lancet 2011)",
              "Hypertension: home BP telemonitoring with pharmacist management improved BP control (Margolis et al., JAMA 2013)",
              "CMS requirement: 99454 needs 16+ days of data in a 30-day period",
            ],
          },
          {
            icon: "💊",
            title: "Digital Therapeutics (DTx)",
            items: [
              "FDA Software as a Medical Device (SaMD): Class I–III risk-based classification",
              "Somryst (insomnia CBT-I): FDA-cleared prescription digital therapeutic (510(k), 2020)",
              "reSET (substance use disorder): first FDA-authorized prescription digital therapeutic (De Novo, 2017) — maker Pear Therapeutics went bankrupt in 2023",
              "EndeavorRx: FDA-cleared game-based ADHD treatment for children 8–12",
              "Prescription digital therapeutics (PDT): physician-prescribed, payer-reimbursed DTx pathway",
              "Coverage: Medicare created digital mental health treatment codes (G0552–G0554) in the CY2025 fee schedule; commercial coverage remains patchy",
            ],
          },
          {
            icon: "⌚",
            title: "Wearables & Biometric Data",
            items: [
              "Apple Watch: FDA-cleared ECG app, irregular rhythm notification and AFib History",
              "Continuous glucose monitors: first over-the-counter CGMs cleared in 2024 (Dexcom Stelo, Abbott Lingo)",
              "Garmin/Whoop: HRV, sleep staging — not FDA-cleared but used in clinical research",
              "Consumer wearables (rings, watches): wellness data, not FDA-cleared diagnostics",
              "FDA Digital Health Center of Excellence: streamlined clearance pathway for wearable SaMD",
              "Data integration: Apple HealthKit, Google Fit, CommonHealth → FHIR conversion tools",
            ],
          },
          {
            icon: "🏥",
            title: "Digital Front Door",
            items: [
              "Patient self-scheduling: Zocdoc, Kyruus, Relatient",
              "AI chatbots for intake: Hyro, Orbita — symptom triage + appointment booking automation",
              "Digital check-in: patient intake forms, insurance verification, e-consent — day-of workflow",
              "Patient portals: Epic MyChart is the most widely used",
              "Price transparency tools: Turquoise Health, Healthcare Bluebook — consumer-facing estimates",
              "Patient payment automation: Waystar, Flywire — contactless payment, payment plans",
            ],
          },
          {
            icon: "🧠",
            title: "Behavioral & Mental Health Tech",
            items: [
              "Digital CBT platforms: Headspace Health, Calm for Business, Brightside — employer-facing",
              "Serious mental illness (SMI): Pear Therapeutics reSET-O (opioid SUD) — FDA cleared",
              "Virtual IOP: Equip (eating disorders), Talkspace, BetterHelp — therapist shortage bridge",
              "Collaborative Care Model (CoCM) tools: Osmind, Blueprint — registry + outcomes tracking",
              "PHQ-9/GAD-7 digital tracking: embedded in Epic, Athenahealth — longitudinal trending",
              "Crisis response tech: 988 Lifeline digital chat, Crisis Text Line — AI triage integration",
            ],
          },
          {
            icon: "📊",
            title: "Health Information Technology",
            items: [
              "Acute-care EHR market: Epic leads, followed by Oracle Health and Meditech (KLAS market share reports)",
              "Interoperability: TEFCA — QHINs exchanging under the Common Agreement since December 2023; CommonWell and Carequality networks",
              "SMART on FHIR apps: distributed through vendor marketplaces such as Epic Showroom (formerly App Orchard)",
              "EHR optimization: documentation burden reduction is a top CIO/CMO priority",
              "Cloud EHR hosting: Epic on public cloud, Oracle Health on OCI",
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
    </div>
  );
}

export default function Page() {
  return (
    <>
      <DigitalHealthHero />
      <CategoryPage
        pillar="Technology"
        title="Digital Health & Telemedicine"
        description="RPM, digital therapeutics, wearables, EHR trends, and digital health investment landscape."
        colorClass="text-indigo-700"
        category="Digital"
        hideHeader
      />
      <DigitalHealthBody />
    </>
  );
}
