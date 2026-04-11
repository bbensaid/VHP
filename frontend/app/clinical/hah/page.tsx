import Link from "next/link";
import CategoryPage from "@/components/CategoryPage";

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
      {/* Program Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🏆</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Leading Hospital-at-Home Programs</h2>
            <p className="text-sm text-slate-500">Operational benchmarks from high-volume published programs</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-6 text-xs font-bold uppercase tracking-wider text-slate-500">Program</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Annual Volume</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Avg LOS (days)</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">30-Day Readmit</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Cost Reduction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { program: "Brigham & Women's (Boston)", volume: "1,200+", los: "3.2", readmit: "8.6%", reduction: 52 },
                { program: "Mount Sinai (New York)", volume: "2,500+", los: "3.8", readmit: "11.2%", reduction: 38 },
                { program: "Presbyterian Healthcare (NM)", volume: "800", los: "4.1", readmit: "9.4%", reduction: 44 },
                { program: "Mayo Clinic (Rochester)", volume: "600", los: "2.9", readmit: "7.8%", reduction: 47 },
                { program: "Intermountain Health (UT)", volume: "1,100", los: "3.6", readmit: "10.1%", reduction: 41 },
                { program: "Kaiser Permanente (CA)", volume: "3,200+", los: "3.4", readmit: "8.9%", reduction: 49 },
              ].map((row) => (
                <tr key={row.program} className="hover:bg-slate-50">
                  <td className="py-3 pr-6 font-semibold text-slate-800">{row.program}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.volume}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.los}</td>
                  <td className="py-3 pr-4">
                    <span className={`font-bold ${parseFloat(row.readmit) <= 9 ? "text-emerald-600" : parseFloat(row.readmit) <= 11 ? "text-amber-600" : "text-rose-600"}`}>
                      {row.readmit}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-slate-100 rounded-full w-24 overflow-hidden">
                        <div className="h-2 bg-emerald-500 rounded-full" style={{ width: `${row.reduction * 2}%` }} />
                      </div>
                      <span className="font-bold text-emerald-700">{row.reduction}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Sources: Published literature, CMS ACHAH waiver data, program press releases. LOS = Length of Stay. Readmit = 30-day all-cause readmission.</p>
      </div>

      {/* Financial Model + Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">HaH Episode Cost Structure</h3>
          <p className="text-sm text-slate-500 mb-5">Typical per-episode costs for a 3.5-day CHF admission</p>
          <div className="space-y-3">
            {[
              { item: "Nursing visits (2/day × 3.5 days)", cost: 840, pct: 18 },
              { item: "Remote monitoring equipment & connectivity", cost: 620, pct: 13 },
              { item: "Pharmacy / IV medications & delivery", cost: 480, pct: 10 },
              { item: "Lab & diagnostic (courier + point-of-care)", cost: 390, pct: 8 },
              { item: "Physician / NP telemedicine oversight", cost: 720, pct: 15 },
              { item: "Logistics (equipment, transport, supply chain)", cost: 560, pct: 12 },
              { item: "Program overhead (coordination, tech ops)", cost: 1100, pct: 23 },
            ].map((row) => (
              <div key={row.item}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700">{row.item}</span>
                  <span className="font-bold text-slate-800">${row.cost.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-1.5 bg-rose-400 rounded-full" style={{ width: `${row.pct * 4}%` }} />
                </div>
              </div>
            ))}
            <div className="border-t border-slate-200 pt-3 flex justify-between font-black text-slate-900">
              <span>Total HaH Episode</span>
              <span className="text-rose-700">~$4,710</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>vs. Inpatient (same DRG, fully loaded)</span>
              <span className="line-through">~$14,200</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Implementation Roadmap</h3>
          <p className="text-sm text-slate-500 mb-5">Typical launch timeline for a 50-concurrent-patient HaH program</p>
          <div className="space-y-4">
            {[
              {
                phase: "Phase 1 — Foundation (Months 1–3)",
                color: "border-l-rose-400 bg-rose-50",
                steps: ["CMS waiver application & legal review", "Clinical eligibility protocol development", "Remote monitoring vendor RFP & selection"],
              },
              {
                phase: "Phase 2 — Pilot (Months 4–6)",
                color: "border-l-amber-400 bg-amber-50",
                steps: ["Soft launch: 5 concurrent patients", "ED enrollment workflow integration", "Field nursing team training & dispatch protocols"],
              },
              {
                phase: "Phase 3 — Scale (Months 7–12)",
                color: "border-l-emerald-400 bg-emerald-50",
                steps: ["Expand to 30+ concurrent patients", "Community paramedicine partnership live", "Quality dashboard & 30-day readmit monitoring"],
              },
              {
                phase: "Phase 4 — Optimize (Year 2+)",
                color: "border-l-sky-400 bg-sky-50",
                steps: ["Payer contracting: Medicare Advantage, Medicaid", "Expand eligible DRG list", "AI-assisted patient selection & deterioration alerting"],
              },
            ].map((phase) => (
              <div key={phase.phase} className={`border-l-4 rounded-r-xl p-4 ${phase.color}`}>
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
        </div>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🏥",
            title: "CMS Acute Hospital Care at Home Waiver",
            items: [
              "CMS approved >300 hospitals under the ACHAH waiver (COVID PHE-era, extended to 2024)",
              "Eligible diagnoses: CHF, COPD, pneumonia, cellulitis, UTI, PE (select DRGs)",
              "Mandatory daily nurse visit (in-person or remote) + 24/7 physician availability",
              "CMS reimbursement: facility-equivalent DRG rate (not a lower site-of-service rate)",
              "Hospital must maintain ≥0.8 nurse FTE capacity at home for in-person response",
              "Current legislative push: ACHAH Extension Act (bipartisan, ≥5-year extension sought)",
            ],
          },
          {
            icon: "🩺",
            title: "Clinical Eligibility & Triage",
            items: [
              "Stability criteria: O2 sat ≥92% on ≤4L NC, HR 60–120, SBP 90–180, afebrile or low-grade",
              "Social determinants: caregiver availability, WIFI/cell connectivity, home safety assessment",
              "Exclusions: altered mental status, active septic shock, code status requiring resuscitation",
              "PARQ tool (Patient Acuity at Risk Questionnaire): validated 6-question eligibility screen",
              "Nurse practitioner-driven bedside enrollment at ED/observation decision point",
              "Average time to enrollment decision: 45–90 minutes at high-volume programs",
            ],
          },
          {
            icon: "📡",
            title: "Remote Monitoring Technology",
            items: [
              "Continuous vitals: pulse oximetry, BP cuff, temperature, weight scale (Bluetooth)",
              "Wearables: Biofourmis Everest, Current Health, Philips Tempus — FDA-cleared for acute",
              "2-way video visit platforms: Teladoc, SnapMD, proprietary hospital integrations",
              "RPM + cellular hub: Verizon/AT&T LTE backup prevents WiFi dependency",
              "AI deterioration alerts: MEWS-H (modified for home) with real-time nurse queue",
              "EHR integration: Epic at Home (OpTime not required), Cerner Home Health modules",
            ],
          },
          {
            icon: "🚑",
            title: "Logistics & Rapid Response",
            items: [
              "Dispatch ambulance response time target: ≤20 minutes median for clinical escalation",
              "Field nursing models: employed RN, contracted agency hybrid, paramedicine integration",
              "Community paramedicine (CP): expanded scope — IV placement, blood draw, point-of-care labs",
              "Pharmacy delivery: same-day IV antibiotics, home infusion vendor partnerships",
              "Lab courier: phlebotomist visit within 2 hours for ordered blood work (STAT routing)",
              "Equipment logistics: IV pole, infusion pump, suction delivered by supply chain team",
            ],
          },
          {
            icon: "💰",
            title: "Financial Model & Economics",
            items: [
              "Typical cost per HaH episode: $4,000–$6,500 vs. $12,000–$18,000 for inpatient",
              "CMS reimbursement: full DRG rate — margin advantage vs. fully-loaded inpatient cost",
              "Bed liberation value: freed capacity for higher-acuity patients (orthopedic, cardiac surgery)",
              "Avoided observation billing risk: HaH = inpatient admission (counts toward 3-night SNF rule)",
              "Readmission penalty exposure: ~8–12% 30-day readmission rate in published trials",
              "Brigham & Women's model: 52% cost reduction vs. matched inpatient controls (NEJM 2022)",
            ],
          },
          {
            icon: "📊",
            title: "Quality & Outcomes Evidence",
            items: [
              "30-day mortality: HaH non-inferior to inpatient in RCT meta-analyses (OR 0.68, Caplan 2012)",
              "Patient satisfaction (HCAHPS analogue): 93–97% would choose HaH again",
              "Falls and adverse events: lower in-home rate vs. inpatient hospital falls (1.4 vs. 3.2/1000 pt-days)",
              "Delirium incidence: 14% vs. 24% inpatient (sensory-friendly home environment benefit)",
              "Functional decline: less physical deconditioning — ambulation rates 40% higher at home",
              "Antibiotic resistance: lower MRSA/CDIFF acquisition rates (no shared hospital surfaces)",
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

      {/* Regulatory Landscape */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Regulatory & Legislative Landscape</h2>
        <p className="text-slate-500 text-sm mb-6">Key policy developments shaping the future of acute home care</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "CMS ACHAH Waiver", status: "Active", color: "bg-emerald-500", body: "Extended through Dec 2024. 325+ hospitals approved nationally. CMS reviews every 6 months. Daily nurse + 24/7 physician required." },
            { title: "ACHAH Extension Act (S. 2648)", status: "Pending", color: "bg-amber-500", body: "Bipartisan legislation to extend the waiver 5 years post-PHE. Passed Senate HELP Committee. Strong hospital lobby support." },
            { title: "State Medicaid Coverage", status: "Varies", color: "bg-sky-500", body: "32 states have some HaH coverage for Medicaid. Reimbursement rates vary (60–100% of inpatient DRG). CA and NY most advanced." },
            { title: "Joint Commission Accreditation", status: "Available", color: "bg-indigo-400", body: "JCHO launched HaH Accreditation 2023. Voluntary but increasingly required by commercial payers. Standards mirror inpatient CoPs." },
            { title: "Staffing CoPs (42 CFR §482.23)", status: "Applies", color: "bg-rose-500", body: "CMS confirmed inpatient CoPs apply to HaH. Daily RN assessment (in-person or remote video) and 24/7 physician coverage required." },
            { title: "Commercial Payer Contracting", status: "Emerging", color: "bg-purple-500", body: "UHC, Cigna, Humana offering HaH benefit carve-ins. Typically 80–90% of inpatient DRG. Network requirements: JCHO accreditation + waiver." },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${item.color} text-white`}>{item.status}</span>
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
