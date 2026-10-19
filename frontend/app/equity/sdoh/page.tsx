import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Social Determinants of Health | HTR Equity",
  description: "SDOH screening and response programs, Z-code documentation, community health needs assessments, and embedding social drivers into value-based care contracts.",
};

function SDOHHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mb-4">
          Equity · SDOH Integration
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">Social Determinants of Health</h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          Addressing the non-clinical factors that population-health models estimate drive most health outcomes — housing, food security,
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
            <h2 className="ty-h3 font-bold text-slate-900">SDOH Screening Domains</h2>
            <p className="text-sm text-slate-500">PRAPARE / AHC HRSN screener domains with typical positive screening rates in safety-net settings</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Domain</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Screener Question Example</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Actionable Resource</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { domain: "Housing Instability", question: "Are you worried about losing your housing?", resource: "HUD-VASH, rapid rehousing programs" },
                { domain: "Food Insecurity", question: "Within the past 12 months, did you worry food would run out?", resource: "SNAP enrollment, food bank referral" },
                { domain: "Transportation", question: "Do you have transportation problems affecting medical care?", resource: "NEMT voucher, Lyft Health" },
                { domain: "Utility Needs", question: "In the past year, have you had trouble paying utility bills?", resource: "LIHEAP, utility assistance programs" },
                { domain: "Interpersonal Safety", question: "Do you feel safe where you currently live?", resource: "DV hotline, safe discharge planning" },
                { domain: "Financial Strain", question: "How often do you worry about being able to pay your bills?", resource: "Financial counseling, charity care" },
                { domain: "Education/Employment", question: "What is your highest level of education?", resource: "Job training, GED programs, ESL" },
              ].map((row) => (
                <tr key={row.domain} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-bold text-orange-700">{row.domain}</td>
                  <td className="py-3 pr-4 text-slate-600 text-xs italic">&ldquo;{row.question}&rdquo;</td>
                  <td className="py-3 text-slate-500 text-xs">{row.resource}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Question wording adapted from the CMS Accountable Health Communities HRSN screening tool and NACHC PRAPARE. Positive rates vary widely by population — measure your own.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🏠",
            title: "Housing & Health",
            items: [
              "Housing instability is linked to higher ED use and readmissions",
              "Medicaid housing supports: CMS's 2023 HRSN framework allowed up to 6 months of transitional rent under 1115 waivers; CMS rescinded that guidance on March 4, 2025",
              "SDOH risk assessment: HCPCS G0136 was created for 2024 but redefined for 2026 as a physical-activity and nutrition assessment; Z55–Z65 are ICD-10-CM diagnosis codes, not CPT",
              "HUD-HHS partnerships: Health Homes model linking housing assistance + primary care",
            ],
          },
          {
            icon: "🥗",
            title: "Food Security & Nutrition",
            items: [
              "Food insecurity: 13.5% of US households in 2023 (USDA Economic Research Service)",
              "Food insecurity → health: higher hospitalization risk and worse glycemic control in type 2 diabetes",
              "Medically tailored meals (MTM): SNAP + Medicare Advantage supplemental benefit",
              "FVRx (Fruit & Vegetable Prescriptions): Wholesome Wave, Produce Rx — clinic-based programs",
              "SNAP: H.R. 1 (2025) expanded work requirements and shifts more program cost to states — expect enrollment losses",
              "WIC program: evidence of improved birth outcomes",
            ],
          },
          {
            icon: "🚗",
            title: "Transportation Access",
            items: [
              "Transportation barriers: about 3.6 million Americans miss or delay care each year for lack of transport (Wallace et al., 2005)",
              "NEMT (Non-Emergency Medical Transportation): a required Medicaid benefit",
              "Lyft/Uber Health partnerships: Epic-integrated ride scheduling at point of care",
              "Virtual care substitution: telehealth removes the trip for suitable visits",
              "Social driver screening: PRAPARE includes a transportation item",
              "CMS Quality Measure: Transportation Domain now included in Star Ratings methodology",
            ],
          },
          {
            icon: "💼",
            title: "Economic Stability & Employment",
            items: [
              "Medical debt: 41% of US adults carry health care debt (KFF, 2022)",
              "Medicaid expansion: reduced uncompensated care costs for hospitals in expansion states",
              "Community health workers (CHW): the IMPaCT model returned $2.47 to Medicaid per $1 invested (Kangovi et al., Health Affairs, 2020)",
            ],
          },
          {
            icon: "🎓",
            title: "Education & Health Literacy",
            items: [
              "Health literacy: 36% of US adults have basic or below-basic health literacy (National Assessment of Adult Literacy, 2003)",
              "Low health literacy → more hospital admissions and medication errors",
              "Plain language: AMA and NIH recommend patient materials at a sixth- to eighth-grade reading level or below",
              "Culturally adapted education: materials in patients' own languages",
              "Digital literacy gap: older adults are least likely to have the skills telehealth assumes",
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
              "CMS AWV: the Annual Wellness Visit (G0438/G0439) can include an optional SDOH risk assessment",
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
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Payment & Policy Framework for SDOH Action</h2>
        <p className="text-slate-500 text-sm mb-6">How payers and CMS are funding social care integration</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "CMS 1115 Waivers — HRSN", body: "Several states won approval under CMS's 2023 health-related social needs framework (transitional housing, meals, other supports). CMS rescinded that guidance on March 4, 2025 and now reviews HRSN requests case by case; existing approvals (about 25 states as of February 2025) are unaffected but face harder renewals." },
            { title: "Medicare Advantage Supplemental Benefits", body: "Special Supplemental Benefits for the Chronically Ill (SSBCI) let MA plans offer non-medical benefits such as food, transportation and home modifications to eligible enrollees." },
            { title: "CMMI Innovation Models", body: "AHEAD's September 2025 redesign replaced its Statewide Health Equity Plan with Population Health Accountability Plans. ACO REACH, which ends in December 2026, includes a health equity benchmark adjustment." },
            { title: "Z-Code Billing (ICD-10)", body: "Z55–Z65 codes document social needs as secondary diagnoses. They support risk stratification and research; payment rarely depends on them." },
            { title: "Community Benefit / CHNA", body: "IRS 501(r): tax-exempt hospitals must conduct a Community Health Needs Assessment every 3 years. Financial assistance and Medicaid shortfalls are the largest community-benefit categories; direct SDOH spending is a small share." },
            { title: "Value-Based SDOH Incentives", body: "NCQA's Social Need Screening and Intervention (SNS-E) HEDIS measure, introduced for measurement year 2023, gives health plans a reporting incentive." },
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
