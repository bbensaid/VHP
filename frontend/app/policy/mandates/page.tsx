import CategoryPage from "@/components/CategoryPage";

function MandatesHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 border border-sky-200 rounded-full px-3 py-1 mb-4">
          Policy · Public Health Mandates
        </span>
        <h1 className="text-4xl font-black text-slate-900 mb-3">Public Health Mandates</h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Federal and state mandates shaping healthcare operations — vaccine policies, emergency preparedness
          requirements, staffing standards, and compliance frameworks with enforcement teeth.
        </p>
      </div>
    </div>
  );
}

function MandatesBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Active Federal Mandates Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">⚖️</span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Active Federal Healthcare Mandates</h2>
            <p className="text-sm text-slate-500">Key compliance requirements with enforcement mechanisms and penalty structures</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Mandate</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Authority</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Who It Applies To</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Penalty</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { mandate: "Hospital Price Transparency", authority: "CMS (ACA §2718)", who: "All hospitals", penalty: "$300–$5,500/day CMPs", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
                { mandate: "No Surprises Act (NSA)", authority: "CAA 2021", who: "Hospitals, group health plans, OON providers", penalty: "Up to $10,000 per violation", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
                { mandate: "CMS Healthcare Worker Vaccine Mandate", authority: "CMS §3", who: "Medicare/Medicaid-certified facilities", penalty: "Termination of Medicare/Medicaid participation", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
                { mandate: "Nursing Home Staffing Minimum", authority: "CMS Final Rule 2024", who: "Skilled nursing facilities", penalty: "Civil monetary penalties; loss of certification", status: "Phased 2026–29", statusColor: "bg-amber-100 text-amber-700" },
                { mandate: "HIPAA Security Rule", authority: "45 CFR §164.300", who: "Covered entities + Business Associates", penalty: "Up to $1.9M/violation category/year", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
                { mandate: "Information Blocking Prohibition", authority: "21st Century Cures Act", who: "EHR developers, HIEs, health systems", penalty: "Up to $1M per violation (info blocking)", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
                { mandate: "Emergency Preparedness Rule", authority: "CMS CoPs 42 CFR §482", who: "17 Medicare/Medicaid provider types", penalty: "Termination from Medicare/Medicaid", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
                { mandate: "EMTALA (Emergency Treatment)", authority: "42 USC §1395dd", who: "Hospitals with emergency departments", penalty: "$119,942 per violation; exclusion from Medicare", status: "Active", statusColor: "bg-emerald-100 text-emerald-700" },
              ].map((row) => (
                <tr key={row.mandate} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-semibold text-slate-800 text-sm">{row.mandate}</td>
                  <td className="py-3 pr-4 text-slate-500 text-xs">{row.authority}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.who}</td>
                  <td className="py-3 pr-4 font-bold text-rose-600 text-xs">{row.penalty}</td>
                  <td className="py-3">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${row.statusColor}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">CMP = Civil Monetary Penalty. Penalty amounts reflect 2024 inflation adjustments. CoPs = Conditions of Participation.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "💉",
            title: "Vaccine Mandates & Immunization Policy",
            items: [
              "CMS healthcare worker vaccine mandate: COVID-19 vaccination required at 76,000+ Medicare/Medicaid facilities",
              "Childhood immunization schedule: CDC ACIP recommendations — 14 vaccines by age 6; state school entry requirements",
              "VFC program: Vaccines for Children — free vaccines for Medicaid, uninsured, underinsured, Native American children",
              "Medicare Part D vaccine coverage: IRA (2023) — all ACIP-recommended adult vaccines $0 cost-sharing",
              "HPV vaccination rates: only 58% of adolescents up to date (CDC 2023) — provider recommendation gap",
              "COVID booster uptake: <20% of adults received updated 2023–24 booster — public health challenge",
            ],
          },
          {
            icon: "🚨",
            title: "Emergency Preparedness Requirements",
            items: [
              "CMS Emergency Preparedness Rule (42 CFR §482.15): all 17 provider types must have 4-part EP plan",
              "FEMA Healthcare Coalition: regional preparedness — 475+ coalitions coordinating hospital surge capacity",
              "HHS ASPR TRACIE: technical resources for healthcare preparedness — national guidance library",
              "Hospital preparedness benchmarks: HCC Tier 1–4 maturity model for surge, decon, mass casualty",
              "Medical countermeasure (MCM) dispensing: SNS distribution to PODs within 48 hours of activation",
              "EMTALA + disaster: EMTALA waiver (1135) allows triage-only screening during declared emergencies",
            ],
          },
          {
            icon: "👩‍⚕️",
            title: "Staffing Mandates",
            items: [
              "Nursing home staffing rule (2024): 0.55 RN hours/resident/day; 2.45 total nurse hours/resident/day",
              "24/7 RN requirement: SNFs must have RN on-site at all times — rural exemption process available",
              "Safe staffing laws: California (1:5 nurse:patient acute care); 14 states have nurse staffing laws/regulations",
              "OSHA Healthcare ETS: infection control, PPE, ventilation standards for healthcare workers (COVID-driven)",
              "Resident duty hour limits: ACGME 80-hour weekly maximum for medical residents — since 2003",
              "CMS certified nursing assistant training: 75-hour federal minimum; states may exceed (CA: 150 hours)",
            ],
          },
          {
            icon: "🏥",
            title: "Hospital Conditions of Participation",
            items: [
              "CoPs (42 CFR §482): 24 conditions — governing board, medical staff, nursing, emergency services, etc.",
              "Joint Commission accreditation: 22,000+ accredited organizations; deemed status exempts from CMS surveys",
              "Patient rights (CoPs §482.13): informed consent, restraint, seclusion — CMS enforcement rising",
              "Discharge planning (§482.43): required for all Medicare/Medicaid patients; patient choice of post-acute",
              "Infection control (§482.42): CMS updated infection prevention CoPs post-COVID with new standards",
              "Quality Assessment and Performance Improvement (QAPI): mandatory for SNFs; voluntary for hospitals",
            ],
          },
          {
            icon: "🔬",
            title: "Clinical Quality & Reporting Mandates",
            items: [
              "Inpatient Quality Reporting (IQR): 60+ measures; failure to report → 2% Medicare payment reduction",
              "Outpatient Quality Reporting (OQR): CMS HOPD quality measures — linked to OPPS payment update",
              "MIPS/APM: MACRA quality payment mandate — all billing physicians must participate or face penalty",
              "HAC Reporting: CMS Hospital Acquired Conditions Reduction Program — bottom 25% → 1% penalty",
              "CMS Promoting Interoperability: EHR/FHIR meaningful use successor — payment tied to ePHI exchange",
              "HEDIS reporting: NCQA measures — required for CHIP, Medicaid managed care quality reporting",
            ],
          },
          {
            icon: "🌍",
            title: "Environmental & Social Mandates",
            items: [
              "HHS Climate & Health Action Plan: hospitals encouraged to reduce greenhouse gas emissions",
              "Joint Commission sustainability: new accreditation standards for environmental sustainability (2025)",
              "Lead poisoning screening: Medicaid mandate for blood lead testing at ages 12 and 24 months",
              "Maternal mortality review: 18 states have MMRCs with mandatory case reporting requirements",
              "CHNA requirement (501(r)): tax-exempt hospitals must assess community health needs every 3 years",
              "Medicaid EPSDT: Early and Periodic Screening — mandatory comprehensive child health benefits",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-sky-500 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Compliance Readiness */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Compliance Readiness Framework</h2>
        <p className="text-slate-500 text-sm mb-6">How healthcare organizations should structure mandate compliance programs</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { phase: "Governance & Tracking", color: "bg-white border-sky-200", steps: ["Regulatory intelligence: subscribe to CMS, OCR, ONC listservs + Federal Register alerts", "Compliance calendar: map all mandate deadlines, comment periods, effective dates", "Board-level compliance committee: quarterly regulatory update reports", "Cross-functional task forces: legal, compliance, clinical, IT per mandate domain"] },
            { phase: "Implementation", color: "bg-white border-amber-200", steps: ["Gap analysis against each CoP, regulation, and reporting requirement", "Policy and procedure updates triggered by each new final rule", "Staff training: mandatory training tied to new compliance requirements", "Vendor contract reviews: BAAs, Business Associate requirements updated"] },
            { phase: "Monitoring & Audit", color: "bg-white border-emerald-200", steps: ["Mock surveys: annual internal survey readiness exercise for Joint Commission/CMS", "HIPAA audit program: OCR Phase 3 focused audit readiness + internal audits", "Quality reporting validation: pre-submission data integrity checks across all programs", "Incident response drills: EMTALA, emergency preparedness tabletop exercises annually"] },
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
      <MandatesHero />
      <CategoryPage
        pillar="Policy"
        title="Public Health Mandates"
        description="Federal mandates, vaccine policy, staffing requirements, and compliance frameworks with enforcement penalties."
        colorClass="text-sky-700"
        category="Mandates"
        hideHeader
      />
      <MandatesBody />
    </>
  );
}
