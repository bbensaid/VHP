import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Policy Feasibility Studies | HTR Policy",
  description: "Rigorous feasibility analysis of proposed healthcare policies — modeling fiscal impact, implementation complexity, and stakeholder alignment before legislation advances.",
};

function FeasibilityHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-4">
          Policy · Feasibility Studies
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">Policy Feasibility Studies</h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          Rigorous analysis of proposed healthcare reforms — political viability, economic impact,
          implementation complexity, and the realistic pathways from proposal to legislation to effect.
        </p>
      </div>
    </div>
  );
}

function FeasibilityBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Reform Feasibility Scorecard */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📐</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Healthcare Reform Feasibility Scorecard</h2>
            <p className="text-sm text-slate-500">Major proposed reforms scored on political viability, economic impact, and implementation complexity (1–10 scale)</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Reform Proposal</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Political Viability</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Economic Benefit</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Implementation Complexity</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Realistic Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { reform: "Medicare drug price negotiation (IRA)", political: "7/10 — enacted; expansion contested", economic: "9/10 — $98.5B savings over 10yr (CBO)", complexity: "6/10 — complex negotiation process", timeline: "Active — expanding to 15 drugs by 2027" },
                { reform: "Medicaid expansion (remaining 10 states)", political: "5/10 — state-level political resistance", economic: "8/10 — reduces uncompensated care + mortality", complexity: "4/10 — established playbook from 40 states", timeline: "2–4 years if political conditions shift" },
                { reform: "Public option (Medicare buy-in)", political: "4/10 — never passed either chamber", economic: "7/10 — premium competition could lower costs", complexity: "7/10 — network adequacy, risk pool design", timeline: "Uncertain — no active federal vehicle" },
                { reform: "Medicare for All (single-payer)", political: "3/10 — no Senate majority; industry opposition", economic: "Estimates range from net savings to net cost, depending on payment rates", complexity: "10/10 — eliminates entire private insurance industry", timeline: "15+ years — structural prerequisites missing" },
                { reform: "PBM transparency & reform", political: "7/10 — bipartisan consensus; FTC pressure", economic: "6/10 — savings uncertain", complexity: "5/10 — contract reform + disclosure requirements", timeline: "Recurring bipartisan bills; state laws moving faster" },
                { reform: "Site-neutral payment expansion", political: "6/10 — physician support; hospital opposition", economic: "7/10 — CBO scores vary widely by design", complexity: "5/10 — regulatory change via CMS rulemaking", timeline: "1–3 years via CMS annual rulemaking" },
                { reform: "No Surprises Act expansion", political: "8/10 — high public support; bipartisan", economic: "5/10 — main gains already captured by the 2022 law", complexity: "4/10 — existing regulatory infrastructure", timeline: "Active — ongoing IDR arbitration reform" },
                { reform: "Admin simplification / uniform billing", political: "6/10 — industry self-interest in status quo", economic: "9/10 — US administrative costs far exceed peers'", complexity: "9/10 — requires all-payer coordination", timeline: "5–10 years — requires industry-wide change" },
              ].map((row) => (
                <tr key={row.reform} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-semibold text-slate-800 text-sm">{row.reform}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.political}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.economic}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.complexity}</td>
                  <td className="py-3 text-blue-700 font-semibold text-xs">{row.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Scores reflect HTR editorial assessment synthesizing CBO, RAND, KFF, and Urban Institute analyses. Political viability scored for current Congress and administration context.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🏥",
            title: "Medicare for All — Deep Dive",
            items: [
              "Medicare for All Act of 2023 (H.R. 3421 / S. 1655): two-year transition to federal single-payer for all US residents",
              "Estimated new federal spending: roughly $32–34 trillion over 10 years (Mercatus Center 2018; Urban Institute 2019), offset by eliminated premiums and cost-sharing",
              "Financing options: payroll tax, income tax, financial transaction tax, wealth tax — no consensus proposal",
              "Provider payment: at Medicare rates — many hospitals lose revenue; rural hospitals at greatest risk",
              "Transition challenges: large displacement of insurance and billing jobs; retraining and a safety net required",
            ],
          },
          {
            icon: "💊",
            title: "PBM Reform — Current Status",
            items: [
              "PBM reform: bipartisan bills targeting spread pricing and delinking PBM pay from list prices have advanced repeatedly in Congress",
              "Spread pricing: the PBM charges the payer more than it pays the pharmacy and keeps the difference",
              "Rebate reform: current system: manufacturer → PBM (rebate) → health plan; patients excluded from point-of-sale discounts",
              "Delinking proposal: delink PBM compensation from drug price — flat fee per transaction vs. % of list price",
              "State PBM laws: most states have enacted PBM transparency or spread-pricing laws",
            ],
          },
          {
            icon: "🌐",
            title: "Public Option Analysis",
            items: [
              "Washington State Cascade Care: first state public option (2021) — standardized plans at 160% Medicare rates",
              "Colorado Option: required a 15% premium reduction over three years (2023–2025) versus 2021 rates; standardized benefits; carrier-administered",
              "Federal public option: proposed (Medicare buy-in, expanded subsidies) but never enacted",
              "Risk pool dynamics: adverse selection concern — healthier enrollees stay private; public option faces worse risk mix",
            ],
          },
          {
            icon: "💰",
            title: "All-Payer Rate Setting",
            items: [
              "Maryland All-Payer Model: since 1977 — global hospital budget; all payers pay same rates",
              "Maryland results (CMS/RTI evaluation, 2019): Medicare spending $975M lower over the first 4.5 years, $796M of it hospital spending",
              "Hospital Global Budget: Vermont Act 68 — statutory global budgets from FY2028 (Vermont withdrew from the federal AHEAD Model in July 2026)",
              "All-payer rate setting (national): would reduce hospital price variation across payers",
              "Political obstacle: hospital and insurer opposition; requires federal waiver or legislation",
              "Reference pricing (CA): CalPERS reference price for hip/knee replacement lowered prices paid (Robinson & Brown, Health Affairs, 2013)",
            ],
          },
          {
            icon: "⚙️",
            title: "Administrative Simplification",
            items: [
              "ACA §1104 (2010): mandated operating rules and standards for administrative transactions",
              "CORE (CAQH): operating rules for eligibility, claims — standardized 270/271 transactions",
              "Prior auth burden: Medicare Advantage plans processed nearly 50 million prior authorization requests in 2023 and denied 6.4% (KFF)",
              "CMS prior-auth rule (CMS-0057-F): 72-hour urgent and 7-day standard decisions from 2026; FHIR APIs from 2027",
              "Gold carding: state laws exempting high-approval physicians from prior auth (Texas first, 2021)",
            ],
          },
          {
            icon: "📈",
            title: "Incremental Reform Pathway",
            items: [
              "Sequencing logic: coverage expansion → primary care → chronic disease → cost control → systemic reform",
              "Low-hanging fruit: Medicaid expansion in 10 states, site-neutral payment, PBM reform — achievable in 1 Congress",
              "Medium-term: public option, drug importation, uniform billing standard — requires Senate threshold or reconciliation",
              "Long-term: all-payer rate setting, global budgets, meaningful admin simplification — decade-scale implementation",
              "Path dependence: each incremental reform shapes constituency and political economy for next step",
              "Vermont lesson: the Act 48 (2011) single-payer plan was abandoned in December 2014 when financing and political will failed together",
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

      {/* Reform Continuum */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Reform Continuum: From Incremental to Systemic</h2>
        <p className="text-slate-500 text-sm mb-6">Mapping the spectrum of US healthcare reform proposals by ambition and implementation horizon</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              horizon: "Near-Term (1–3 yrs)",
              color: "bg-white border-emerald-200",
              items: [
                "Medicaid expansion — 10 remaining states (state-by-state basis)",
                "PBM reform — federal bills and state laws",
                "Site-neutral payment expansion via CMS rulemaking",
                "Gold Carding + Prior Auth FHIR API implementation",
                "Restoring the enhanced ACA subsidies (expired December 31, 2025)",
              ],
            },
            {
              horizon: "Medium-Term (3–7 yrs)",
              color: "bg-white border-amber-200",
              items: [
                "Federal or state-based public option (Medicare/Medicaid buy-in)",
                "Administrative simplification — uniform billing + PA standards",
                "Drug negotiation expansion to all Part B/D drugs",
                "All-payer claims database national standard",
                "Primary care investment — mandatory spend floor",
              ],
            },
            {
              horizon: "Long-Term (10+ yrs)",
              color: "bg-white border-rose-200",
              items: [
                "National all-payer rate setting (Maryland model scaled)",
                "Medicare for All or universal public option",
                "Global hospital budgeting (AHEAD model national expansion)",
                "Social insurance model for long-term care",
                "Administrative cost reduction toward peer-country levels",
              ],
            },
          ].map((col) => (
            <div key={col.horizon} className={`rounded-xl p-5 border ${col.color}`}>
              <div className="font-bold text-slate-800 text-sm mb-3">{col.horizon}</div>
              <ul className="space-y-2">
                {col.items.map((s) => (
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
      <FeasibilityHero />
      <CategoryPage
        pillar="Policy"
        title="Policy Feasibility Studies"
        description="Reform scorecard, Medicare for All analysis, PBM reform, public option, and incremental reform pathways."
        colorClass="text-blue-700"
        category="Feasibility"
        hideHeader
      />
      <FeasibilityBody />
    </>
  );
}
