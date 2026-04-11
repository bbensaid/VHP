import CategoryPage from "@/components/CategoryPage";

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
            <p className="text-sm text-slate-500">VC/PE investment by sector and year — Rock Health + CB Insights data</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4">Annual Investment ($B)</h4>
            <div className="space-y-3">
              {[
                { year: "2021 (Peak)", amount: 29.1, color: "bg-indigo-600" },
                { year: "2022", amount: 15.3, color: "bg-indigo-500" },
                { year: "2023", amount: 10.7, color: "bg-indigo-400" },
                { year: "2024 (H1 run rate)", amount: 12.4, color: "bg-indigo-500" },
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
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4">2023 Investment by Category</h4>
            <div className="space-y-2">
              {[
                { category: "Mental Health", amount: 1.8, pct: 17 },
                { category: "Clinical AI & Decision Support", amount: 1.5, pct: 14 },
                { category: "Chronic Disease Management", amount: 1.3, pct: 12 },
                { category: "Telehealth / Virtual Care", amount: 1.1, pct: 10 },
                { category: "Revenue Cycle & Admin", amount: 0.9, pct: 8 },
                { category: "Oncology", amount: 0.8, pct: 7 },
                { category: "Other / Emerging", amount: 3.3, pct: 31 },
              ].map((row) => (
                <div key={row.category} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 text-xs">{row.category}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-2 bg-indigo-400 rounded-full" style={{ width: `${row.pct * 3}%` }} />
                    </div>
                    <span className="font-bold text-slate-700 text-xs w-12 text-right">${row.amount}B</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-6">Sources: Rock Health Digital Health Funding Database, CB Insights State of Digital Health Report 2024.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "📡",
            title: "Remote Patient Monitoring (RPM)",
            items: [
              "CMS billing: CPT 99453/99454 (setup), 99457/99458 (management) — $52–$65/month",
              "Cardiac RPM: iRhythm Zio patch (14-day continuous ECG) — AFib detection rate 6.2%",
              "CHF weight/BP monitoring: 40–50% reduction in 30-day readmissions (NEJM 2023)",
              "Hypertension RPM + virtual visit: −11.6 mmHg SBP improvement vs. usual care (JAMA)",
              "CMS requirement: at least 16 days of data per 30-day period for billing eligibility",
              "Reimbursement growth: RPM claims up 1,294% 2019–2022 (CMS data)",
            ],
          },
          {
            icon: "💊",
            title: "Digital Therapeutics (DTx)",
            items: [
              "FDA Software as a Medical Device (SaMD): Class I–III risk-based classification",
              "Somryst (insomnia CBT-I): FDA De Novo cleared — first FDA-cleared digital therapeutic for sleep",
              "reSET (Pear Therapeutics): first FDA-cleared DTx for substance use disorder (acquired 2023)",
              "EndeavorRx: FDA-cleared game-based ADHD treatment for children 8–12",
              "Prescription digital therapeutics (PDT): physician-prescribed, payer-reimbursed DTx pathway",
              "Coverage challenge: only 7 US payers have formal PDT coverage policies as of 2024",
            ],
          },
          {
            icon: "⌚",
            title: "Wearables & Biometric Data",
            items: [
              "Apple Watch Series 9: FDA-cleared AFib history, irregular rhythm notification, ECG app",
              "Dexcom G7/Libre 3: continuous glucose monitor (CGM) — OTC availability expanding 2024",
              "Garmin/Whoop: HRV, sleep staging — not FDA-cleared but used in clinical research",
              "Oura Ring Gen 3: skin temperature, SpO2, readiness score — validated in COVID detection study",
              "FDA Digital Health Center of Excellence: streamlined clearance pathway for wearable SaMD",
              "Data integration: Apple HealthKit, Google Fit, CommonHealth → FHIR conversion tools",
            ],
          },
          {
            icon: "🏥",
            title: "Digital Front Door",
            items: [
              "Patient self-scheduling: Zocdoc, Kyruus, Relatient — reduces scheduling FTE 30–40%",
              "AI chatbots for intake: Hyro, Orbita — symptom triage + appointment booking automation",
              "Digital check-in: patient intake forms, insurance verification, e-consent — day-of workflow",
              "Epic MyChart adoption: 240M+ patients enrolled (2024); 73% of US health system patients",
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
              "EHR market share: Epic 36.9%, Oracle Cerner 24.3%, Meditech 9.5% (hospital beds, KLAS 2024)",
              "Ambulatory EHR: Epic 30.1%, Athenahealth 9.0%, EClinicalWorks 7.8%",
              "Interoperability: CommonWell Health Alliance + Carequality — 1B+ records linked",
              "SMART on FHIR apps: 500+ apps in Epic App Orchard marketplace",
              "EHR optimization: documentation burden reduction is #1 CIO/CMO priority (CHIME 2024)",
              "Cloud EHR: Epic on AWS, Oracle Cerner on OCI — full cloud migration underway at 40+ systems",
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
