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
      {/* Platform Comparison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🖥️</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Virtual Care Platform Comparison</h2>
            <p className="text-sm text-slate-500">Leading enterprise telehealth and virtual nursing platforms</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Platform</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Use Case</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">EHR Integration</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Scale</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Differentiator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { platform: "Teladoc / Livongo", use: "Enterprise telehealth + chronic care", ehr: "Epic, Cerner, Athena", scale: "90M+ members", diff: "Largest commercial network; RPM integration" },
                { platform: "Philips eICU", use: "Tele-ICU command center", ehr: "Epic, Cerner, Meditech", scale: "800+ ICUs globally", diff: "APACHE IV AI + predictive deterioration" },
                { platform: "Caregility (Inpatient)", use: "Virtual nursing + care team rounding", ehr: "Epic (HL7 FHIR)", scale: "150K+ patient rooms", diff: "Ceiling-mounted hardware + ambient sensing" },
                { platform: "AvaSure (Sentinel)", use: "Virtual nursing + fall prevention", ehr: "Epic, Cerner", scale: "1,200+ hospitals", diff: "AI fall detection + virtual sitter + RN hybrid" },
                { platform: "Amwell (Enterprise)", use: "Specialty consult + urgent care", ehr: "Epic, Cerner", scale: "55M+ covered lives", diff: "Multi-specialty marketplace + white-label" },
                { platform: "VSee Health", use: "Hybrid clinic + ED triage", ehr: "HL7 FHIR open API", scale: "500+ health systems", diff: "Low-bandwidth (<200 kbps) rural connectivity" },
              ].map((row) => (
                <tr key={row.platform} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-bold text-rose-700">{row.platform}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.use}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.ehr}</td>
                  <td className="py-3 pr-4 text-slate-700 text-xs font-medium">{row.scale}</td>
                  <td className="py-3 text-slate-500 text-xs">{row.diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial + Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Virtual Nursing ROI Model</h3>
          <p className="text-sm text-slate-500 mb-5">200-bed acute care unit, 12-month projection</p>
          <div className="space-y-4">
            {[
              { label: "Technology investment (cameras, hub)", value: -420000, type: "cost" },
              { label: "Reduced bedside RN FTEs (22% reduction)", value: 890000, type: "savings" },
              { label: "Reduced agency/travel nurse spend", value: 310000, type: "savings" },
              { label: "Reduced fall-related adverse events", value: 180000, type: "savings" },
              { label: "Improved throughput (faster discharge)", value: 145000, type: "savings" },
              { label: "Virtual RN salaries (hub team)", value: -280000, type: "cost" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-sm text-slate-700">{row.label}</span>
                <span className={`font-bold text-sm ${row.value > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {row.value > 0 ? "+" : "−"}${Math.abs(row.value / 1000).toFixed(0)}k
                </span>
              </div>
            ))}
            <div className="border-t border-slate-200 pt-3 flex justify-between font-black text-slate-900">
              <span>Net Year 1 Impact</span>
              <span className="text-emerald-700">+$825k</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>Payback period</span>
              <span className="font-bold">~6.1 months</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Telehealth Billing Quick Reference</h3>
          <p className="text-sm text-slate-500 mb-5">Key Medicare CPT codes and modifiers — 2024</p>
          <div className="space-y-3">
            {[
              { code: "99202–99215", desc: "Office/outpatient E/M (synchronous video)", modifier: "Modifier 95", rate: "100% of in-person rate" },
              { code: "99421–99423", desc: "Online Digital E/M (async messaging)", modifier: "None", rate: "$15–$58 (time-based)" },
              { code: "G0425–G0427", desc: "Telehealth consult (ED or initial inpatient)", modifier: "GT", rate: "Facility rate" },
              { code: "99091", desc: "Remote physiologic monitoring (RPM) — data review ≥30 min/month", modifier: "None", rate: "$57.40/month" },
              { code: "99453/99454", desc: "RPM device setup / monthly supply fee", modifier: "None", rate: "$20/$65/month" },
              { code: "99457/99458", desc: "RPM treatment management (20 + 20 min)", modifier: "None", rate: "$52/$41/additional 20 min" },
            ].map((row) => (
              <div key={row.code} className="p-3 rounded-xl border border-slate-200">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-black text-rose-700 text-sm">{row.code}</span>
                  <span className="text-[9px] bg-slate-100 text-slate-600 rounded px-1.5 py-0.5 font-bold">{row.modifier}</span>
                </div>
                <div className="text-xs text-slate-600 mb-1">{row.desc}</div>
                <div className="text-xs font-bold text-emerald-700">{row.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "👩‍⚕️",
            title: "Virtual Nursing Units",
            items: [
              "Centralized RN hub: 1 virtual nurse covers 8–15 beds (vs. 4–6 for bedside RN)",
              "Model: virtual RN handles admissions/discharges, education, chart review",
              "Bedside tech partner (CNA/tech): hands-on tasks, vital signs, patient comfort",
              "Real-time two-way video: Caregility, Banyan Medical, AvaSure platforms",
              "Median reduction in bedside RN: 20–30% — partially offsets workforce shortage",
              "Caplan Health System model: virtual nursing reduced RN vacancy gap by 18%",
            ],
          },
          {
            icon: "🏥",
            title: "Tele-ICU (eICU)",
            items: [
              "Centralized intensivist coverage: 1 MD monitors 40–150 ICU beds simultaneously",
              "Platforms: Philips eICU, Sickbay (Medical Informatics Corp), InTouch Health",
              "Predictive analytics: APACHE IV, eCareManager proprietary deterioration algorithms",
              "Proven outcomes: 20% reduction in ICU mortality (meta-analysis, Reynolds 2011)",
              "Coverage model: 24/7 off-site intensivist supplement (not replace) on-site team",
              "ROI: $5,400 saved per ICU patient in academic medical center models",
            ],
          },
          {
            icon: "📱",
            title: "Asynchronous Specialty Consults",
            items: [
              "Store-and-forward dermatology: iDoc24, MDacne — image AI triage + specialist review",
              "Asynchronous mental health: Brightside, Done Health (ADHD) — standardized intake",
              "Telestroke: image-based NIHSS scoring + alteplase eligibility (DNT target: ≤45 min)",
              "Evisit platforms: Klara, OhMD — HIPAA-compliant async patient-provider messaging",
              "Specialist turnaround time: 24–72 hours (vs. 6–8 week in-person wait in many markets)",
              "CMS billing: CPT 99421–99423 (online digital E/M), 4/5/7 minutes thresholds",
            ],
          },
          {
            icon: "🏠",
            title: "Hybrid Care Programs",
            items: [
              "Scheduled virtual + in-person: primary care, behavioral health, chronic disease management",
              "RPM-enhanced hybrid: biometric data feeds into EHR between in-person appointments",
              "Cardiology hybrid: remote arrhythmia monitoring (Zio patch, AliveCor) + telemedicine",
              "Oncology virtual: treatment symptom management visits (PRO dashboards) between infusions",
              "Payer quality incentives: HEDIS telehealth encounters now count for preventive care measures",
              "Patient panel expansion: virtual-only panel 30–40% larger than traditional in-person",
            ],
          },
          {
            icon: "⚖️",
            title: "Regulatory & Reimbursement",
            items: [
              "Post-PHE telehealth: Congress extended Medicare flexibilities through Dec 2024",
              "Audio-only parity: maintained for Medicare, Medicaid — 50+ eligible CPT codes",
              "Rural Health Clinic (RHC): can bill telehealth as originating site (fee = $28.84/visit)",
              "Federally Qualified Health Center (FQHC): now eligible as distant and originating site",
              "DEA telehealth prescribing: post-PHE rule requires at least one in-person for controlled Rx",
              "State parity laws: 45 states have commercial insurance telehealth parity requirements",
            ],
          },
          {
            icon: "📊",
            title: "Utilization & Clinical Outcomes",
            items: [
              "Telehealth utilization: 38× increase 2019→2020; stabilized at 8–12× pre-COVID baseline",
              "No-show rates: telehealth ~5% vs. 18–22% in-person — major access improvement",
              "Behavioral health: virtual modality preferred by 68% of established mental health patients",
              "Diabetes: virtual CCM (chronic care management) — equal A1c reduction vs. in-person",
              "Hypertension control: RPM + virtual visit protocol — 11.6 mmHg SBP reduction (JAMA 2022)",
              "ED diversion: virtual triage (VSee, Zipnosis) reduces ED visits 12–18% in enrolled panels",
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
