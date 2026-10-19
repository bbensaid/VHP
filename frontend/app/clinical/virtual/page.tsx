import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Virtual Care Models | HTR Clinical",
  description: "Design and implementation of virtual care programs — synchronous and asynchronous telehealth, hybrid care models, reimbursement optimization, and patient engagement.",
};

function VirtualCareHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 rounded-full px-3 py-1 mb-4">
          Clinical · Virtual Care
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">
          Virtual Care Models
        </h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          Beyond basic telehealth — virtual nursing units, tele-ICU command centers, asynchronous
          specialty consults, and hybrid care architectures transforming care delivery economics.
        </p>
      </div>
    </div>
  );
}

function VirtualCareBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Telehealth billing */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🧾</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Telehealth & Remote Monitoring Billing</h2>
            <p className="text-sm text-slate-500">Medicare code families. Payment amounts change every year — take current rates from the CMS Physician Fee Schedule lookup, not from this page.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { code: "99202–99215", desc: "Office/outpatient E/M delivered by real-time video (telehealth place-of-service and modifier rules apply)" },
            { code: "99421–99423", desc: "Online digital E/M — patient-initiated, asynchronous portal communication over 7 days" },
            { code: "99453 / 99454", desc: "Remote physiologic monitoring device setup and supply (16+ days of readings in 30)" },
            { code: "99445", desc: "RPM device supply for 2–15 days of readings — new for CY2026" },
            { code: "99457 / 99458 / 99470", desc: "RPM treatment management — 20 minutes, each additional 20, and (new for CY2026) the first 10 minutes" },
            { code: "99091", desc: "Collection and interpretation of physiologic data, 30 minutes a month" },
          ].map((row) => (
            <div key={row.code} className="p-3 rounded-xl border border-slate-200">
              <div className="font-black text-rose-700 text-sm mb-1">{row.code}</div>
              <div className="text-xs text-slate-600">{row.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "👩‍⚕️",
            title: "Virtual Nursing",
            items: [
              "A remote RN handles admissions, discharges, education and documentation for several units' patients",
              "Bedside nurses and technicians keep the hands-on work",
              "Two-way video in the patient room, integrated with the EHR",
              "Typically funded as a staffing investment — there is no fee-for-service code for a hub nurse",
            ],
          },
          {
            icon: "🏥",
            title: "Tele-ICU",
            items: [
              "Off-site intensivists and critical-care nurses monitor ICU patients across hospitals",
              "Supplements — does not replace — the on-site team",
              "Most valuable where a small hospital cannot staff an intensivist around the clock",
              "Evidence on mortality is mixed and depends on how the remote team is used",
            ],
          },
          {
            icon: "📱",
            title: "Asynchronous Specialty Consults",
            items: [
              "Store-and-forward dermatology, ophthalmology and wound care",
              "Telestroke: remote neurologist assessment to support thrombolysis decisions at small hospitals",
              "eConsults between primary care and specialists, without a patient visit",
              "Shortens specialty access for rural patients who would otherwise travel",
            ],
          },
          {
            icon: "🏠",
            title: "Hybrid Care Programs",
            items: [
              "Scheduled virtual and in-person visits for primary care, behavioral health and chronic disease",
              "Remote monitoring data feeding the EHR between visits",
              "Remote cardiac rhythm monitoring with telemedicine follow-up",
              "Virtual symptom-management visits between oncology infusions",
            ],
          },
          {
            icon: "⚖️",
            title: "Regulatory & Reimbursement",
            items: [
              "Medicare telehealth flexibilities — the home as originating site, no rural geographic limit, audio-only, FQHCs and RHCs as distant sites — extended through December 31, 2027 (Consolidated Appropriations Act, 2026)",
              "After that date, unless Congress acts again, most non-behavioral Medicare telehealth reverts to rural, facility-based originating sites",
              "Behavioral and mental health telehealth from the home is permanent in Medicare (in-person visit requirements apply)",
              "Controlled-substance prescribing by telemedicine depends on DEA's current temporary rule — check it before relying on it",
              "Commercial parity rules are set state by state",
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

      {/* Future State */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">The Virtual Care Maturity Curve</h2>
        <p className="text-slate-500 text-sm mb-6">Where health systems are on the virtual care journey — and where the frontier is</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { level: "Level 1", title: "Basic Telehealth", color: "bg-white border-slate-200", items: ["Synchronous video visits", "Primary care urgent triage", "Single-vendor platform", "Reactive (patient initiates)"] },
            { level: "Level 2", title: "Integrated Virtual Programs", color: "bg-white border-sky-200", items: ["EHR-integrated telehealth", "Specialty consult workflows", "RPM for 1–2 conditions", "Virtual nursing pilots"] },
            { level: "Level 3", title: "Virtual-First Architecture", color: "bg-white border-indigo-200", items: ["Virtual hospital command center", "Tele-ICU + tele-stroke 24/7", "Multi-condition RPM programs", "AI deterioration alerting"] },
            { level: "Level 4", title: "Ambient Intelligence", color: "bg-white border-emerald-200", items: ["Ambient AI documentation (Nuance DAX)", "Continuous passive monitoring (radar vitals)", "Autonomous virtual rounding bots", "Predictive pre-emption of crises"] },
          ].map((tier) => (
            <div key={tier.level} className={`rounded-xl p-5 border ${tier.color}`}>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{tier.level}</div>
              <div className="font-bold text-slate-800 text-sm mb-3">{tier.title}</div>
              <ul className="space-y-1.5">
                {tier.items.map((i) => (
                  <li key={i} className="text-slate-600 text-xs flex items-start gap-1.5">
                    <span className="text-slate-400 mt-0.5">›</span> {i}
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
      <VirtualCareHero />
      <CategoryPage
        pillar="Clinical"
        title="Virtual Care Models"
        description="Virtual nursing, tele-ICU, asynchronous specialty consults, and hybrid care architectures."
        colorClass="text-rose-700"
        category="Virtual"
        hideHeader
      />
      <VirtualCareBody />
    </>
  );
}
