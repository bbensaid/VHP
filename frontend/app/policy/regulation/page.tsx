import CategoryPage from "@/components/CategoryPage";

function RegulationHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 border border-sky-200 rounded-full px-3 py-1 mb-4">
          Policy · Regulation & Legislation
        </span>
        <h1 className="text-4xl font-black text-slate-900 mb-3">Regulation & Legislation</h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
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
      {/* 2024 Regulatory Rule Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📜</span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">2024–2025 CMS Final Rules Tracker</h2>
            <p className="text-sm text-slate-500">Major rules finalized or proposed by CMS, ONC, and HHS in the current rulemaking cycle</p>
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
                { rule: "IPPS FY2025 Final Rule", agency: "CMS", status: "Final", statusColor: "bg-emerald-100 text-emerald-700", effective: "Oct 2024", provision: "+3.5% hospital payment update; nursing home staffing mandate" },
                { rule: "Medicare Physician Fee Schedule 2025", agency: "CMS", status: "Final", statusColor: "bg-emerald-100 text-emerald-700", effective: "Jan 2025", provision: "−2.8% conversion factor; new behavioral health codes" },
                { rule: "MA & Part D Rate Notice 2025", agency: "CMS", status: "Final", statusColor: "bg-emerald-100 text-emerald-700", effective: "Jan 2025", provision: "+3.7% MA revenue; IRA IRA drug negotiation phase-in" },
                { rule: "HTI-1 (ONC Health Data Rule)", agency: "ONC", status: "Final", statusColor: "bg-emerald-100 text-emerald-700", effective: "Jun 2024", provision: "USCDI v3, SMART on FHIR, algorithm transparency requirement" },
                { rule: "Prior Authorization FHIR Rule", agency: "CMS", status: "Final", statusColor: "bg-emerald-100 text-emerald-700", effective: "Jan 2026", provision: "Payers must expose prior auth via FHIR API; 72-hr urgent PA turnaround" },
                { rule: "HIPAA Security Rule Update", agency: "HHS OCR", status: "Proposed", statusColor: "bg-amber-100 text-amber-700", effective: "TBD 2025", provision: "MFA required; 72-hr incident response; inventory of all ePHI systems" },
                { rule: "Nursing Home Staffing Final Rule", agency: "CMS", status: "Final", statusColor: "bg-emerald-100 text-emerald-700", effective: "Phased 2026–2029", provision: "0.55 RN hrs/resident/day minimum; 24/7 RN on-site requirement" },
                { rule: "Short-Term Limited Duration Plans", agency: "HHS/DOL/Treasury", status: "Final", statusColor: "bg-emerald-100 text-emerald-700", effective: "Sep 2024", provision: "STLD plans limited to 3 months; closed loophole on bare-bones plans" },
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
              "ACA Section 1557: nondiscrimination rule — HHS 2024 rule restores sex ≡ gender identity protections",
              "Essential Health Benefits (EHBs): benchmark plan update cycle — states select 2027 EHB benchmark",
              "ACA marketplace enrollment: 21.4M enrolled in 2024 OEP — record high since ACA passage",
              "Enhanced PTCs (ARP/IRA): extended through 2025; zero-premium silver plan for ≤150% FPL",
              "Short-term plans rollback: 2024 rule limits STLD to 3 months + 3-month extension maximum",
              "ACA Section 1332 waivers: state innovation waivers — reinsurance programs in 15+ states",
            ],
          },
          {
            icon: "💊",
            title: "Drug Pricing Legislation",
            items: [
              "IRA drug negotiation: CMS negotiated 10 drugs in 2026 (first round) — 64%–79% list price reduction",
              "IRA inflation rebates: manufacturers pay rebates when drug prices exceed CPI-U — effective 2023",
              "Part D redesign (IRA): $2,000 OOP cap for Medicare enrollees effective Jan 2025",
              "PBM reform (pending): multiple bills targeting spread pricing, rebate pass-through, transparency",
              "FTC PBM report (2024): 3 PBMs control 80% market; spread pricing cost Medicaid $7.9B 2017–2022",
              "Drug importation: FDA final rule (2024) allows state programs to import drugs from Canada",
            ],
          },
          {
            icon: "🏥",
            title: "Provider Payment Rules",
            items: [
              "IPPS update formula: market basket minus productivity adjustment — FY2025 net +3.5% for hospitals",
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
              "Advanced APM pathway: qualifying participation exempts from MIPS; 5% bonus (expired 2022)",
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
              "COVID telehealth flexibilities: extended through Dec 2024 by Congress — permanent extension pending",
              "Ryan Haight Act: DEA special telemedicine registration for controlled substance prescribing (proposed)",
              "Audio-only telehealth: permanently covered under Medicare for rural/underserved (Consolidated Appropriations Act 2023)",
              "FHIR mandate: ONC HTI-1 requires USCDI v3 + SMART on FHIR for certified EHR technology",
              "AI/ML SaMD: FDA pre-market guidance for AI-based software; predetermined change control plan",
              "Digital therapeutics (DTx): FDA cleared 100+ DTx products; payer coverage remains fragmented",
            ],
          },
          {
            icon: "🗺️",
            title: "State Legislative Landscape",
            items: [
              "Medicaid expansion: 40 states + DC expanded; NC (2023) and SD (2022) most recent adopters",
              "State drug pricing transparency: 47 states passed drug pricing transparency laws 2016–2024",
              "Certificate of Need (CON): 36 states retain CON laws for hospital/facility capacity control",
              "Balance billing laws: 33 states have surprise billing protections in addition to federal NSA",
              "Scope of practice: 28 states allow NP full practice authority; PA Modernization Act advancing in states",
              "All-payer claims databases (APCD): 22 states operate APCDs for price + quality transparency",
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

      {/* Legislative Calendar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">2025 Congressional Healthcare Calendar</h2>
        <p className="text-slate-500 text-sm mb-6">Key legislative deadlines and must-pass vehicles for healthcare policy</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { quarter: "Q1 2025", color: "bg-white border-sky-200", items: ["Reconciliation budget instructions — healthcare spending targets", "IRA drug negotiation Round 2 (15 drugs) — price publication", "HIPAA Security Rule comment period closes", "Telehealth extension expiration trigger — Congress must act"] },
            { quarter: "Q2–Q3 2025", color: "bg-white border-amber-200", items: ["Medicare physician payment fix — conversion factor cliff", "CHIP reauthorization — expires Sep 2027 but funding debate ongoing", "340B repayment implementation — CMS guidance expected", "PBM reform legislation — markup in Senate Finance Committee"] },
            { quarter: "Q4 2025", color: "bg-white border-emerald-200", items: ["FY2026 IPPS proposed rule — comment period", "MA 2026 advance notice and rate notice cycle", "No Surprises Act IDR arbitration — potential statutory fix", "ARP enhanced PTCs extension vote — must-pass by Dec 2025"] },
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
        colorClass="text-sky-700"
        category="Regulation"
        hideHeader
      />
      <RegulationBody />
    </>
  );
}
