import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Access Disparity & Health Equity | HTR Equity",
  description: "Analysis of healthcare access gaps across rural, racial, and economic dimensions — network adequacy, transportation barriers, language access, and policy interventions.",
};

function AccessDisparityHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mb-4">
          Equity · Access Disparity
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">Access Disparity & Health Equity</h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          Closing the care access gap across rural, urban safety-net, and underinsured populations —
          provider shortages, Medicaid coverage expansion, FQHC models, and the policy levers that move the needle.
        </p>
      </div>
    </div>
  );
}

function AccessDisparityBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Disparity by Condition */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-4">Health Outcome Disparities — Sourced Examples</h2>
        <ul className="space-y-2">
          {[
            "Maternal mortality, 2023: 50.3 deaths per 100,000 live births for Black women vs. 14.5 for white women — about 3.5 times higher (CDC NCHS)",
            "About 84% of pregnancy-related deaths were judged preventable by maternal mortality review committees (CDC, 2017–2019 data)",
            "Uninsured: 8.0% of Americans (26.4 million) in 2023, down from 16.3% in 2010 (Census Bureau)",
            "For other measures, use the AHRQ National Healthcare Quality and Disparities Report, which tracks disparities by race, ethnicity and income every year",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="text-amber-500 mt-0.5 shrink-0">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🗺️",
            title: "Geographic Access Disparities",
            items: [
              "Health Professional Shortage Areas (HPSAs): HRSA designates thousands of primary care HPSAs — current counts at data.HRSA.gov",
              "Medically Underserved Areas (MUAs): HRSA designations for shortage of primary care services",
              "Rural hospital closures: tracked since 2005 by the UNC Sheps Center, including conversions to Rural Emergency Hospitals",
              "Mental health deserts: most rural counties have shortages of mental health professionals (HRSA HPSA data)",
              "Maternity care deserts: about 35% of US counties have no birthing hospital, birth center or obstetric clinician (March of Dimes, 2024)",
            ],
          },
          {
            icon: "💳",
            title: "Insurance Coverage & Medicaid",
            items: [
              "Uninsured rate: 8.0% (26.4M Americans) in 2023, down from 16.3% in 2010 (Census Bureau)",
              "Medicaid expansion (ACA): 40 states + DC expanded; adults in the 10 non-expansion states fall into a coverage gap",
              "Medicaid coverage gap: earn too much for Medicaid, too little for ACA subsidies in holdout states",
              "CHIP: covers children above Medicaid income limits — renewal barriers cause churn",
              "Enhanced ACA subsidies (ARPA/IRA): expired December 31, 2025, raising net premiums for most marketplace enrollees",
              "Medicaid unwinding: more than 25 million people disenrolled in 2023–2024, many for procedural reasons (KFF)",
            ],
          },
          {
            icon: "🏥",
            title: "Safety Net & FQHC System",
            items: [
              "FQHCs: about 1,400 health centers serving roughly 32 million patients (HRSA UDS) — sliding-scale fees",
              "FQHC reimbursement: Prospective Payment System (PPS) — an all-inclusive per-visit rate",
              "Section 330 grants: federal funding that enables comprehensive care at health centers",
              "Critical Access Hospitals (CAH): cost-based Medicare reimbursement (101% of reasonable cost)",
              "Rural Health Clinics (RHC): enhanced Medicare/Medicaid rates for rural primary care",
              "Disproportionate Share Hospital (DSH): Medicare and Medicaid payments to hospitals serving many low-income patients",
            ],
          },
          {
            icon: "👩‍⚕️",
            title: "Provider Shortage Solutions",
            items: [
              "National Health Service Corps (NHSC): loan repayment and scholarships for clinicians who serve in HPSAs",
              "J-1 visa waiver (Conrad 30): 30 IMGs/year per state → practice in underserved areas for 3 years",
              "NP full practice authority: roughly 27 to 30 states plus DC — linked to more NPs in rural primary care",
              "Loan repayment: NHSC and NURSE Corps programs — a recruitment lever for shortage areas",
              "Community health workers (CHW): the IMPaCT model returned $2.47 to Medicaid for every $1 invested (Kangovi et al., Health Affairs, 2020)",
              "Telehealth: rural access supplement — reduces travel burden; no evidence of quality compromise",
            ],
          },
          {
            icon: "🤱",
            title: "Maternal & Infant Health Disparities",
            items: [
              "Maternal mortality rate: Black women 50.3 vs. white women 14.5 per 100,000 in 2023 (CDC NCHS)",
              "Preterm birth disparity: Black infants are born preterm about 1.5 times as often as white infants (CDC)",
              "Maternal mortality causes: 84% preventable; hemorrhage, cardiovascular, mental health leading causes",
              "Doula access programs: a growing number of state Medicaid programs cover doula care",
            ],
          },
          {
            icon: "📊",
            title: "Measuring & Reporting Equity",
            items: [
              "CMS Health Equity Stratified Reporting: race/ethnicity breakdown required for QRs (2023+)",
              "HEDIS stratification: NCQA requires race and ethnicity stratification on a growing list of measures",
              "AHRQ National Healthcare Quality and Disparities Report: annual tracking across race, ethnicity and income",
              "Leapfrog Group: hospital safety grade with equity lens — racial disparity in patient safety outcomes",
              "CMS Star Rating equity adjustment: dual-eligible + LIS adjustment to prevent penalizing safety-net plans",
              "Community Health Needs Assessment (CHNA): required every 3 years; health equity as core priority",
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

      {/* Policy Solutions */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Evidence-Based Equity Interventions</h2>
        <p className="text-slate-500 text-sm mb-6">Interventions with rigorous evidence of reducing health disparities</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Medicaid Expansion",
              evidence: "Strong (NEJM, Health Affairs)",
              body: "Medicaid expansion was associated with significantly lower mortality among low-income adults (Miller, Johnson & Wherry, Quarterly Journal of Economics, 2021).",
              badge: "bg-emerald-100 text-emerald-700",
            },
            {
              title: "Community Health Workers",
              evidence: "Strong (RCT evidence)",
              body: "In randomized trials, the IMPaCT community health worker model reduced hospital days and returned $2.47 to Medicaid for every dollar invested (Kangovi et al., Health Affairs, 2020).",
              badge: "bg-emerald-100 text-emerald-700",
            },
            {
              title: "Doula Support Programs",
              evidence: "Moderate (RCTs + observational)",
              body: "Doula support is associated with fewer cesarean births and better birth outcomes in observational studies; states are expanding Medicaid coverage.",
              badge: "bg-amber-100 text-amber-700",
            },
            {
              title: "Language Concordant Care",
              evidence: "Strong (observational)",
              body: "Language-concordant care and professional interpreters reduce communication errors and improve outcomes for patients with limited English proficiency.",
              badge: "bg-emerald-100 text-emerald-700",
            },
            {
              title: "FQHC Expansion",
              evidence: "Strong (HRSA program data)",
              body: "Health centers provide comprehensive primary care to low-income and uninsured patients at quality comparable to other providers.",
              badge: "bg-emerald-100 text-emerald-700",
            },
            {
              title: "Telehealth for Rural Access",
              evidence: "Moderate (strong for specialty)",
              body: "Telestroke, tele-dermatology and telepsychiatry extend specialist access to rural hospitals and clinics that cannot staff them.",
              badge: "bg-amber-100 text-amber-700",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${item.badge}`}>{item.evidence}</span>
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
      <AccessDisparityHero />
      <CategoryPage
        pillar="Equity"
        title="Access Disparity"
        description="Provider shortages, Medicaid expansion, safety-net systems, and evidence-based equity interventions."
        colorClass="text-amber-700"
        category="Access"
        hideHeader
      />
      <AccessDisparityBody />
    </>
  );
}
