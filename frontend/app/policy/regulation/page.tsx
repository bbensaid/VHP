import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Regulation & Legislation | HTR Policy",
  description: "Analysis of federal and state healthcare regulation, CMS rule-making, ONC compliance, and legislative strategy for health system leaders.",
};

function RegulationHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-4">
          Policy · Regulation & Legislation
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">Regulation & Legislation</h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          Federal rulemaking, congressional legislation, and state-level healthcare laws — tracking
          what passed, what&apos;s pending, and what it means for providers, payers, and patients.
        </p>
      </div>
    </div>
  );
}

function RegulationBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Regulatory Rule Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📜</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Federal Rules & Laws Tracker</h2>
            <p className="text-sm text-slate-500">Major laws and rules in force or pending as of October 2026</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Rule</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Agency</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Effective</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Key Provision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { rule: "One Big Beautiful Bill Act (H.R. 1)", agency: "Congress", status: "Enacted", statusColor: "bg-emerald-100 text-emerald-700", effective: "Jul 2025", provision: "Medicaid work requirements from Jan 2027; provider-tax limits; $50B Rural Health Transformation Program FY2026–2030; nursing-home staffing rule enforcement barred to 2034" },
                { rule: "Consolidated Appropriations Act, 2026", agency: "Congress", status: "Enacted", statusColor: "bg-emerald-100 text-emerald-700", effective: "Feb 2026", provision: "Medicare telehealth flexibilities through Dec 31, 2027; Hospital-at-Home waiver through Sep 30, 2030" },
                { rule: "Physician Fee Schedule CY2026", agency: "CMS", status: "Final", statusColor: "bg-emerald-100 text-emerald-700", effective: "Jan 2026", provision: "Separate APM and non-APM conversion factors with a one-year increase; −2.5% efficiency adjustment; new RPM codes 99445/99470" },
                { rule: "IPPS FY2026", agency: "CMS", status: "Final", statusColor: "bg-emerald-100 text-emerald-700", effective: "Oct 2025", provision: "Net inpatient payment update of about 2.6%" },
                { rule: "Interoperability & Prior Authorization (CMS-0057-F)", agency: "CMS", status: "Final", statusColor: "bg-emerald-100 text-emerald-700", effective: "Jan 2026 / Jan 2027", provision: "72-hour urgent and 7-day standard decision deadlines from 2026; FHIR prior-auth APIs from 2027" },
                { rule: "HIPAA Security Rule update", agency: "HHS OCR", status: "Proposed", statusColor: "bg-amber-100 text-amber-700", effective: "Not final", provision: "MFA, encryption, restoring critical systems within 72 hours" },
                { rule: "Nursing home staffing minimums", agency: "CMS", status: "Vacated", statusColor: "bg-rose-100 text-rose-700", effective: "—", provision: "Struck down (N.D. Tex., April 2025); H.R. 1 bars enforcement through September 2034" },
                { rule: "Enhanced premium tax credits", agency: "Congress", status: "Expired", statusColor: "bg-rose-100 text-rose-700", effective: "Dec 31, 2025", provision: "House passed a three-year extension in January 2026; not enacted" },
              ].map((row) => (
                <tr key={row.rule} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-semibold text-slate-800 text-sm">{row.rule}</td>
                  <td className="py-3 pr-4 text-slate-500 text-xs">{row.agency}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${row.statusColor}`}>{row.status}</span>
                  </td>
                  <td className="py-3 pr-4 text-slate-500 text-xs">{row.effective}</td>
                  <td className="py-3 text-slate-500 text-xs">{row.provision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Sources: Federal Register, CMS.gov, ONC.HHS.gov. Effective dates subject to legal challenge. IPPS = Inpatient Prospective Payment System.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🏛️",
            title: "ACA & Coverage Regulation",
            items: [
              "ACA Section 1557: nondiscrimination rule — parts of the 2024 rule enjoined or vacated in court",
              "ACA marketplace: 24.3 million plan selections in the 2025 open enrollment, a record (CMS)",
              "Enhanced premium tax credits (ARPA/IRA) expired December 31, 2025; the 400% FPL eligibility cap returned for 2026",
              "ACA Section 1332 waivers: state reinsurance programs are the most common use",
            ],
          },
          {
            icon: "💊",
            title: "Drug Pricing Legislation",
            items: [
              "IRA drug negotiation: first 10 negotiated prices took effect January 2026, 38%–79% below list price (CMS)",
              "IRA inflation rebates: manufacturers pay rebates when drug prices exceed CPI-U — effective 2023",
              "Part D redesign (IRA): $2,000 OOP cap for Medicare enrollees effective Jan 2025",
              "PBM reform (pending): multiple bills targeting spread pricing, rebate pass-through, transparency",
              "FTC PBM reports (2024–2025): the three largest PBMs handle nearly 80% of US prescriptions",
              "Drug importation: FDA authorized Florida's Canadian importation program (January 2024)",
            ],
          },
          {
            icon: "🏥",
            title: "Provider Payment Rules",
            items: [
              "IPPS update formula: market basket minus productivity adjustment — FY2026 net update about 2.6%",
              "340B controversy: SCOTUS (2022) ruled CMS improperly cut 340B reimbursement — $9B+ repayment ordered",
              "Physician payment fix: SGR repealed (MACRA 2015); MIPS + APM pathways remain underfunded",
              "Site-neutral payment: CMS expanding site-neutral rules — reduces HOPD premium vs. physician office",
              "Hospital price transparency: CMS enforcement ramp-up 2024; civil monetary penalties $300–$5,500/day",
              "No Surprises Act: surprise billing protections; IDR arbitration costs → ongoing legal challenges",
            ],
          },
          {
            icon: "📊",
            title: "Quality & Value-Based Regulation",
            items: [
              "MIPS (Merit-based Incentive Payment System): composite score 0–100; +9%/−9% Medicare payment at stake",
              "Advanced APM pathway: QPs are exempt from MIPS; the incentive fell from 5% to 3.5% and then 1.88% (2026 payment) before a higher fee-schedule update replaces it",
              "ACO REACH model: risk-adjusted global capitation; health equity benchmark adjustment",
              "CMS Star Ratings: 5-star hospital, nursing home, MA plan ratings — public reporting + financial stakes",
              "Hospital Acquired Conditions Reduction Program: bottom 25% quality hospitals → 1% payment penalty",
              "Hospital Readmission Reduction Program: excess readmission penalties for 6 conditions; max −3%",
            ],
          },
          {
            icon: "📡",
            title: "Telehealth & Digital Health Policy",
            items: [
              "Medicare telehealth flexibilities: extended through December 31, 2027 (Consolidated Appropriations Act, 2026)",
              "Ryan Haight Act: DEA special telemedicine registration for controlled substance prescribing (proposed)",
              "Audio-only telehealth: covered through December 31, 2027; permanent for behavioral health from the home",
              "FHIR mandate: ONC HTI-1 requires USCDI v3 + SMART on FHIR for certified EHR technology",
              "AI/ML SaMD: FDA pre-market guidance for AI-based software; predetermined change control plan",
              "Digital therapeutics (DTx): Medicare digital mental health treatment codes since 2025; other coverage remains fragmented",
            ],
          },
          {
            icon: "🗺️",
            title: "State Legislative Landscape",
            items: [
              "Medicaid expansion: 40 states + DC expanded; NC (2023) and SD (2022) most recent adopters",
              "State drug pricing transparency: most states have enacted transparency laws",
              "Certificate of Need (CON): about 35 states and DC run some CON program (NCSL)",
              "Balance billing laws: many states layer their own surprise-billing protections on the federal No Surprises Act",
              "Scope of practice: roughly 27 to 30 states plus DC allow NP full practice authority",
              "All-payer claims databases (APCD): 24 states have one (APCD Council)",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-blue-500 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legislative Calendar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Healthcare Policy Watchlist, 2026–2027</h2>
        <p className="text-slate-500 text-sm mb-6">Dated deadlines already set in law or rule</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { quarter: "Late 2026", color: "bg-white border-blue-200", items: ["Rural Health Transformation Program FY2027 awards (CMS)", "ACO REACH ends December 31, 2026", "IRA round-two negotiated prices (15 drugs) take effect January 1, 2027"] },
            { quarter: "2027", color: "bg-white border-amber-200", items: ["Medicaid work requirements due from January 1, 2027 (states may seek extensions)", "LEAD Model replaces ACO REACH from January 2027", "Payer prior-authorization FHIR APIs due January 2027 (CMS-0057-F)"] },
            { quarter: "End of 2027", color: "bg-white border-emerald-200", items: ["Medicare telehealth flexibilities expire December 31, 2027 unless extended", "Vermont: reference-pricing maximum rates and first hospital global budgets in FY2028", "Enhanced premium tax credits: no extension enacted as of October 2026"] },
          ].map((q) => (
            <div key={q.quarter} className={`rounded-xl p-5 border ${q.color}`}>
              <div className="font-bold text-slate-800 text-sm mb-3">{q.quarter}</div>
              <ul className="space-y-2">
                {q.items.map((s) => (
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
      <RegulationHero />
      <CategoryPage
        pillar="Policy"
        title="Regulation & Legislation"
        description="Federal rulemaking, CMS final rules, drug pricing legislation, and state healthcare laws."
        colorClass="text-blue-700"
        category="Regulation"
        hideHeader
      />
      <RegulationBody />
    </>
  );
}
