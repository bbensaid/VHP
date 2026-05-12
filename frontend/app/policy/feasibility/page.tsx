import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Policy Feasibility Studies | HTR Policy",
  description: "Rigorous feasibility analysis of proposed healthcare policies — modeling fiscal impact, implementation complexity, and stakeholder alignment before legislation advances.",
};

function FeasibilityHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 border border-sky-200 rounded-full px-3 py-1 mb-4">
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
                { reform: "Public option (Medicare buy-in)", political: "5/10 — passed House; Senate blocked", economic: "7/10 — premium competition reduces costs 5–15%", complexity: "7/10 — network adequacy, risk pool design", timeline: "Possible via reconciliation — 3–5 years" },
                { reform: "Medicare for All (single-payer)", political: "3/10 — no Senate majority; industry opposition", economic: "8/10 — RAND: saves $650B/yr long-term", complexity: "10/10 — eliminates entire private insurance industry", timeline: "15+ years — structural prerequisites missing" },
                { reform: "PBM transparency & reform", political: "7/10 — bipartisan consensus; FTC pressure", economic: "6/10 — savings uncertain; $7.9B Medicaid spread pricing", complexity: "5/10 — contract reform + disclosure requirements", timeline: "1–2 years — advanced in Senate Finance" },
                { reform: "Site-neutral payment expansion", political: "6/10 — physician support; hospital opposition", economic: "7/10 — CBO estimates $150–$200B over 10 years", complexity: "5/10 — regulatory change via CMS rulemaking", timeline: "1–3 years via CMS annual rulemaking" },
                { reform: "No Surprises Act expansion", political: "8/10 — high public support; bipartisan", economic: "5/10 — surprise billing affects <1% of visits", complexity: "4/10 — existing regulatory infrastructure", timeline: "Active — ongoing IDR arbitration reform" },
                { reform: "Admin simplification / uniform billing", political: "6/10 — industry self-interest in status quo", economic: "9/10 — NEJM: $220–$600B administrative savings", complexity: "9/10 — requires all-payer coordination", timeline: "5–10 years — requires industry-wide change" },
              ].map((row) => (
                <tr key={row.reform} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-semibold text-slate-800 text-sm">{row.reform}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.political}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.economic}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{row.complexity}</td>
                  <td className="py-3 text-sky-700 font-semibold text-xs">{row.timeline}</td>
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
              "Medicare for All Act (H.R. 3421 / S.1129): 2-year transition to federal single-payer for all US residents",
              "Estimated federal cost: $30.6T–$40T over 10 years (RAND, Urban Institute) — offset by eliminating premiums + cost-sharing",
              "Economic impact: eliminates $600B+ in private insurance overhead; employer premium savings ~$9,000/employee/yr",
              "Financing options: payroll tax, income tax, financial transaction tax, wealth tax — no consensus proposal",
              "Provider payment: at Medicare rates — many hospitals lose revenue; rural hospitals at greatest risk",
              "Transition challenges: eliminate 1.8M insurance industry jobs; retrain + safety net required for workforce impact",
            ],
          },
          {
            icon: "💊",
            title: "PBM Reform — Current Status",
            items: [
              "Senate Finance Rx Act (2024): passed committee 26-1 — bipartisan; includes PBM transparency + spread pricing ban",
              "Spread pricing: PBM charges payer more than it pays pharmacy — FTC found $7.9B Medicaid spread pricing 2017–2022",
              "Rebate reform: current system: manufacturer → PBM (rebate) → health plan; patients excluded from point-of-sale discounts",
              "Delinking proposal: delink PBM compensation from drug price — flat fee per transaction vs. % of list price",
              "Formulary transparency: HR 19 — require PBMs to disclose formulary placement criteria and rebate amounts",
              "State PBM laws: 40+ states enacted PBM transparency or spread pricing laws 2015–2024",
            ],
          },
          {
            icon: "🌐",
            title: "Public Option Analysis",
            items: [
              "Washington State Cascade Care: first state public option (2021) — standardized plans at 160% Medicare rates",
              "Colorado Option: mandated premium reductions 10%/yr for 3 years; standardized benefits; carrier-administered",
              "Oregon: public option task force (2021) — pursuing waiver-based federal funding mechanism",
              "Federal public option (Biden plan): Medicare buy-in at 60+; expanded subsidized coverage to 400%+ FPL",
              "CBO analysis: public option reduces premiums 8–12%; enrollment shift from private; 3M newly insured",
              "Risk pool dynamics: adverse selection concern — healthier enrollees stay private; public option faces worse risk mix",
            ],
          },
          {
            icon: "💰",
            title: "All-Payer Rate Setting",
            items: [
              "Maryland All-Payer Model: since 1977 — global hospital budget; all payers pay same rates",
              "Maryland results: hospital cost growth 2.3% below national trend; $1.4B Medicare savings 2014–2023",
              "ACO Global Budget: Vermont AHEAD Model — population-based global budget for Medicaid + Medicare",
              "All-payer rate setting (national): could reduce hospital price variation — US prices 3× higher than Canada",
              "Political obstacle: hospital and insurer opposition; requires federal waiver or legislation",
              "Reference pricing (CA): CalPERS reference price for hip/knee replacement — drove 26% price reduction",
            ],
          },
          {
            icon: "⚙️",
            title: "Administrative Simplification",
            items: [
              "ACA §1104: directed HHS to standardize administrative transactions — 25+ years of incremental progress",
              "CORE (CAQH): operating rules for eligibility, claims — standardized 270/271 transactions",
              "Prior auth burden: 35M prior auth requests/year in Medicare; 14% pended or denied initially",
              "CMS Prior Auth FHIR Rule: automates PA via API — could reduce 2-week average PA to same-day",
              "Gold Carding: state laws exempting high-performing physicians from prior auth — 12+ states enacted",
              "Administrative savings potential: HFMA: standardized PA alone saves $9B/year in administrative costs",
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
              "Vermont 2011 lesson: single-payer (Act 48) designed but abandoned — financing + political will failed simultaneously",
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
                "PBM reform — federal legislation advancing in Senate Finance",
                "Site-neutral payment expansion via CMS rulemaking",
                "Gold Carding + Prior Auth FHIR API implementation",
                "Enhanced ACA subsidies permanent extension",
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
                "Administrative cost reduction to OECD-comparable levels (12–14%)",
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
        colorClass="text-sky-700"
        category="Feasibility"
        hideHeader
      />
      <FeasibilityBody />
    </>
  );
}
