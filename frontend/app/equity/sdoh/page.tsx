import CategoryPage from "@/components/CategoryPage";

function SDOHHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mb-4">
          Equity · SDOH Integration
        </span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-3">Social Determinants of Health</h1>
        <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
          Addressing the non-medical factors driving 80% of health outcomes — housing, food security,
          transportation, economic stability, and the clinical workflows and payment models to act on them.
        </p>
      </div>
    </div>
  );
}

function SDOHBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* PRAPARE Screening Tool */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📋</span>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">SDOH Screening Domains & Prevalence</h2>
            <p className="text-sm text-slate-500">PRAPARE / AHC HRSN screener domains with typical positive screening rates in safety-net settings</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Domain</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Screener Question Example</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Positive Rate (Safety Net)</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Actionable Resource</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { domain: "Housing Instability", question: "Are you worried about losing your housing?", rate: "18–24%", resource: "HUD-VASH, rapid rehousing programs" },
                { domain: "Food Insecurity", question: "Within the past 12 months, did you worry food would run out?", rate: "28–35%", resource: "SNAP enrollment, food bank referral" },
                { domain: "Transportation", question: "Do you have transportation problems affecting medical care?", rate: "22–30%", resource: "NEMT voucher, Lyft Health" },
                { domain: "Utility Needs", question: "In the past year, have you had trouble paying utility bills?", rate: "20–28%", resource: "LIHEAP, utility assistance programs" },
                { domain: "Interpersonal Safety", question: "Do you feel safe where you currently live?", rate: "12–18%", resource: "DV hotline, safe discharge planning" },
                { domain: "Financial Strain", question: "How often do you worry about being able to pay your bills?", rate: "38–45%", resource: "Financial counseling, charity care" },
                { domain: "Education/Employment", question: "What is your highest level of education?", rate: "Varies", resource: "Job training, GED programs, ESL" },
              ].map((row) => (
                <tr key={row.domain} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-bold text-orange-700">{row.domain}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs italic">&ldquo;{row.question}&rdquo;</td>
                  <td className="py-3 pr-4 font-bold text-rose-600">{row.rate}</td>
                  <td className="py-3 text-slate-500 text-xs">{row.resource}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Source: NACHC PRAPARE implementation studies, CMS AHC HRSN pilot data. Safety-net setting = FQHC, safety-net hospital, or Medicaid-dominant primary care.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🏠",
            title: "Housing & Health",
            items: [
              "Housing instability linked to 3× higher ED utilization vs. stable-housed patients",
              "Medicaid supportive housing: CMS 1115 waiver authority — 6 months housing coverage approved",
              "Health-related social needs (HRSN): CMS expanded Medicaid HRSN benefit framework (2023)",
              "Housing CPT codes: CMS new SDOH risk assessment codes effective Jan 2024 (Z55–Z65)",
              "Permanent supportive housing (PSH) ROI: $3,600 Medicaid savings per person annually",
              "HUD-HHS partnerships: Health Homes model linking housing assistance + primary care",
            ],
          },
          {
            icon: "🥗",
            title: "Food Security & Nutrition",
            items: [
              "Food insecurity prevalence: 13.5% of US households (44.2M people) — USDA 2023",
              "Food insecurity → health: 2× higher hospitalization risk, worse glycemic control in T2D",
              "Medically tailored meals (MTM): SNAP + Medicare Advantage supplemental benefit",
              "FVRx (Fruit & Vegetable Prescriptions): Wholesome Wave, Produce Rx — clinic-based programs",
              "SNAP enrollment barriers: 18% of eligible households not enrolled — outreach opportunity",
              "WIC program: 7.3M participants; evidence of improved birth outcomes + reduced preterm birth",
            ],
          },
          {
            icon: "🚗",
            title: "Transportation Access",
            items: [
              "Transportation barriers: 3.6M Americans miss medical appointments annually due to transport",
              "NEMT (Non-Emergency Medical Transportation): Medicaid-covered — $5.5B/year federal spend",
              "Lyft/Uber Health partnerships: Epic-integrated ride scheduling at point of care",
              "Virtual care substitution: telehealth reduces transport burden for 22% of rural patients",
              "Social driver screening: PRAPARE tool includes transportation domain (one of 7 core domains)",
              "CMS Quality Measure: Transportation Domain now included in Star Ratings methodology",
            ],
          },
          {
            icon: "💼",
            title: "Economic Stability & Employment",
            items: [
              "Poverty health burden: below 100% FPL → 60% higher all-cause mortality risk",
              "Medical debt: 41% of US adults carry healthcare debt; #1 driver of personal bankruptcy",
              "ACA Medicaid expansion: 14.5M newly insured; reduced uncompensated care by $6.2B annually",
              "SNAP/Medicaid dual enrollment: 62% of Medicaid enrollees also receive SNAP (targeted outreach)",
              "Community health workers (CHW): $2.47 return per $1 invested in economic stability navigation",
              "Employer wellness programs: financial wellness + EAP integration — 23% productivity improvement",
            ],
          },
          {
            icon: "🎓",
            title: "Education & Health Literacy",
            items: [
              "Health literacy: 36% of US adults have below basic health literacy (NCES data)",
              "Low health literacy → 2× higher hospital admissions, 4× more medication errors",
              "Plain language standards: AHA requires 6th grade reading level for patient materials",
              "Culturally adapted education: patient education in ≥150 languages at FQHC systems",
              "Numeracy in health decisions: 22% of patients cannot calculate medication dosing correctly",
              "Digital literacy gap: 25% of adults ≥65 lack basic digital skills — telehealth access barrier",
            ],
          },
          {
            icon: "🔧",
            title: "Clinical SDOH Integration",
            items: [
              "SDOH screening tools: PRAPARE, AHC HRSN, WE CARE — validated multi-domain screeners",
              "Epic Social Care Network: closed-loop referral to community-based organizations (CBO)",
              "Unite Us / FindHelp: social care coordination platforms — EHR-embedded CBO referral network",
              "Z-codes (ICD-10-CM): Z55–Z65 — social determinants billable as secondary diagnoses",
              "CMS AWV: Annual Wellness Visit includes SDOH assessment — billable G0438/G0439",
              "Value-based SDOH incentives: CMS AHEAD Model includes SDOH performance domain",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-orange-500 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Payment Models for SDOH */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Payment & Policy Framework for SDOH Action</h2>
        <p className="text-slate-500 text-sm mb-6">How payers and CMS are funding social care integration</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "CMS 1115 Waivers — HRSN", body: "15+ states approved for health-related social needs coverage: up to 6 months of transitional housing, meals, utility assistance, transportation for high-risk Medicaid enrollees." },
            { title: "Medicare Advantage Supplemental Benefits", body: "Chronically Ill Enrollee benefits: food, transportation, home modifications. 94% of MA plans offer ≥1 supplemental benefit addressing SDOH (KFF 2024)." },
            { title: "CMMI Innovation Models", body: "AHEAD Model global budget includes SDOH performance domain. ACO REACH includes equity bonus. Health Equity Benchmark Adjustment in MA rates (2024)." },
            { title: "Z-Code Billing (ICD-10)", body: "Z55–Z65 codes document social determinants as secondary diagnoses. CMS added Z-codes to PHE/quality reporting. Payer coverage inconsistent but growing." },
            { title: "Community Benefit / CHNA", body: "IRS 501(r): tax-exempt hospitals must conduct Community Health Needs Assessment every 3 years. SDOH intervention often largest community benefit expenditure category." },
            { title: "Value-Based SDOH Incentives", body: "Some commercial payers offer P4P bonuses for SDOH screening completion rates. HEDIS Social Need Screening measure (2024) drives employer plan reporting." },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-4">
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
      <SDOHHero />
      <CategoryPage
        pillar="Equity"
        title="SDOH Integration"
        description="Housing, food, transportation, and the clinical and payment frameworks to address social drivers."
        colorClass="text-amber-700"
        category="SDOH"
        hideHeader
      />
      <SDOHBody />
    </>
  );
}
