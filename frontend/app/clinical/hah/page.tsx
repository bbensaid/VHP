import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Hospital-at-Home | HTR Clinical",
  description: "Acute care delivery outside hospital walls — clinical models, CMS waiver programs, reimbursement design, and implementation strategy for hospital-at-home programs.",
};

function HospitalAtHomeHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 rounded-full px-3 py-1 mb-4">
          Clinical · Hospital-at-Home
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">
          Hospital-at-Home Programs
        </h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          Acute-level care delivered in the home setting — CMS waiver programs, clinical eligibility
          frameworks, remote monitoring infrastructure, and the operational playbook for scaling HaH safely.
        </p>
      </div>
    </div>
  );
}

function HospitalAtHomeBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Evidence */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">What the Evidence Shows</h2>
            <p className="text-sm text-slate-500">Peer-reviewed findings only — program-level benchmarks vary too widely to publish as a league table</p>
          </div>
        </div>
        <ul className="space-y-3">
          {[
            "Randomized trial, Brigham and Women's Hospital: home-hospital patients had an adjusted cost of acute care 38% lower than usual hospital care, and a 30-day readmission rate of 7% versus 23% (Levine et al., Annals of Internal Medicine, 2020).",
            "A meta-analysis of randomized trials of hospital-in-the-home care found lower mortality, fewer readmissions and lower cost than inpatient care (Caplan et al., Medical Journal of Australia, 2012).",
            "Results come from selected, clinically stable patients. They do not show that hospital-at-home is safe for every acute admission, and rural programs face travel-time constraints the urban trials did not.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="text-rose-500 mt-0.5 shrink-0">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🏥",
            title: "CMS Acute Hospital Care at Home Waiver",
            items: [
              "Launched November 2020; extended through September 30, 2030 by the Consolidated Appropriations Act, 2026 (P.L. 119-75, signed February 3, 2026)",
              "Patients are admitted from the emergency department or an inpatient bed and must need acute inpatient care",
              "At least two in-person visits a day by a registered nurse or mobile integrated health paramedic, plus daily physician or advanced-practice evaluation (in person or remote)",
              "Capacity for an in-person emergency response to the home within 30 minutes",
              "Medicare pays the same inpatient DRG rate as a hospital stay",
            ],
          },
          {
            icon: "🩺",
            title: "Clinical Eligibility & Triage",
            items: [
              "Clinical stability and a diagnosis the program's protocol covers (commonly heart failure, COPD, pneumonia, cellulitis, urinary infection)",
              "Home suitability: a safe environment, reliable connectivity, and a caregiver where the protocol requires one",
              "Exclusions for patients likely to need ICU-level care or rapid escalation",
              "Enrollment decided at the ED or admission point by the admitting team",
            ],
          },
          {
            icon: "📡",
            title: "Remote Monitoring Technology",
            items: [
              "Vital-sign monitoring (pulse oximetry, blood pressure, temperature, weight) with alerts to a central nursing team",
              "Two-way video for physician and nursing visits",
              "Cellular backup so monitoring does not depend on home broadband",
              "EHR integration so the home admission is documented as an inpatient stay",
            ],
          },
          {
            icon: "🚑",
            title: "Logistics & Rapid Response",
            items: [
              "Field nursing from employed staff, agency partners, or community paramedicine",
              "Home delivery of IV medications, equipment and supplies; courier or in-home phlebotomy for labs",
              "Escalation pathway back to the hospital, with EMS response inside the waiver's 30-minute requirement",
              "In rural service areas, drive time — not bed supply — is usually the binding constraint on how many patients a team can carry",
            ],
          },
          {
            icon: "💰",
            title: "Financial Model & Economics",
            items: [
              "Revenue: the Medicare inpatient DRG, unchanged from a hospital stay",
              "Margin depends on the program's variable cost per episode versus the hospital's cost of an inpatient day — model it on your own cost data",
              "Freed beds create capacity for higher-acuity admissions, which is often the larger financial benefit",
              "Fixed costs (command center, monitoring, logistics) need enough volume to spread — the core difficulty for small hospitals",
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

      {/* Implementation */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Implementation Sequence</h2>
        <p className="text-slate-500 text-sm mb-6">An illustrative order of work, not a benchmark timeline</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { phase: "1 — Foundation", steps: ["CMS waiver request and legal review", "Eligibility protocol", "Monitoring and logistics vendors"] },
            { phase: "2 — Pilot", steps: ["Small concurrent census", "ED enrollment workflow", "Field team training and dispatch"] },
            { phase: "3 — Scale", steps: ["Larger census", "Community paramedicine partnership", "Readmission and safety monitoring"] },
            { phase: "4 — Sustain", steps: ["Medicare Advantage and Medicaid contracting", "Broaden covered diagnoses", "Plan for payment after September 2030"] },
          ].map((phase) => (
            <div key={phase.phase} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="font-bold text-slate-800 text-sm mb-2">{phase.phase}</div>
              <ul className="space-y-1">
                {phase.steps.map((s) => (
                  <li key={s} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-slate-400 mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4">Sources: CMS Acute Hospital Care at Home program requirements; Consolidated Appropriations Act, 2026 §6210; Levine et al., Ann Intern Med 2020; Caplan et al., Med J Aust 2012.</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <HospitalAtHomeHero />
      <CategoryPage
        pillar="Clinical"
        title="Hospital-at-Home"
        description="Acute care delivery in the home setting — CMS waiver, remote monitoring, and program economics."
        colorClass="text-rose-700"
        category="Hospital-at-Home"
        hideHeader
      />
      <HospitalAtHomeBody />
    </>
  );
}
