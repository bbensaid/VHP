import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Labor & Workforce Strategy | HTR Economics",
  description: "Healthcare workforce economics — clinician compensation benchmarks, travel nursing costs, burnout ROI, scope-of-practice expansion, and automation strategy.",
};

function LaborWorkforceHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-4">
          Economics · Labor & Workforce
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">
          Labor & Workforce Strategy
        </h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          The economic reality of the clinical workforce crisis — vacancy costs, travel nursing economics,
          burnout ROI, scope-of-practice expansion, and the automation strategies reshaping labor strategy.
        </p>
      </div>
    </div>
  );
}

function LaborWorkforceBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "👩‍⚕️",
            title: "Nursing Workforce Economics",
            items: [
              "RN vacancy 9.6% and turnover 16.4% in 2024 (NSI Nursing Solutions, 2025 report)",
              "Travel nurse bill rates: far above employed-RN cost, though well below their 2022 peak",
              "Cost of RN turnover: tens of thousands of dollars per departing bedside nurse (NSI annual reports)",
              "Replacement timeline: about 83 days to recruit an experienced RN (NSI, 2025)",
            ],
          },
          {
            icon: "🩺",
            title: "Physician Compensation Trends",
            items: [
              "Physician employment: about 78% of physicians are employed by hospitals, health systems or corporate entities (Physicians Advocacy Institute/Avalere, 2024)",
              "Compensation: use current MGMA or AMGA survey data for your specialty and region",
              "wRVU productivity model: still the dominant physician compensation basis",
              "Quality incentive pool: a share of compensation tied to quality and utilization metrics",
              "Locum tenens cost: a large premium over employed physicians, plus continuity costs",
              "Physician burnout cost: about $4.6 billion a year in turnover and reduced hours (Han et al., Annals of Internal Medicine, 2019)",
            ],
          },
          {
            icon: "🔥",
            title: "Burnout Economics",
            items: [
              "Physician burnout prevalence: 48.2% reported at least one symptom in 2023, down from 62.8% in 2021 (AMA)",
              "Administrative burden: EHR and inbox work extend well past clinic hours (Arndt et al., Annals of Family Medicine, 2017)",
              "Top burnout drivers: excessive documentation, prior auth burden, inefficient workflows",
              "Ambient AI documentation: a randomized trial found 9.5% less time in notes for one product (NEJM AI, 2025)",
            ],
          },
          {
            icon: "📋",
            title: "Scope-of-Practice Economics",
            items: [
              "NP/PA workforce: the fastest-growing clinician groups (BLS Occupational Outlook)",
              "Full-practice states (FPA): roughly 27 to 30 states plus DC allow NPs to practice without physician oversight (counts differ by source)",
              "Quality evidence: NP-led primary care equivalent outcomes in RCTs (HTN, diabetes, well-child)",
              "Physician-led pushback: AMA scope-of-practice policy opposes full independent NP practice",
            ],
          },
          {
            icon: "🤖",
            title: "Automation & Labor Substitution",
            items: [
              "Ambient AI documentation: DAX Copilot, Suki, Nabla, Abridge — measured gains are modest (see above)",
              "Robotic process automation (RPA): prior auth, billing and scheduling tasks",
              "Virtual nursing: a remote RN supports bedside staff across several units",
              "Pharmacy automation: automated dispensing cabinets (e.g., BD Pyxis, Omnicell)",
              "Revenue cycle AI: denial prediction and automated appeals",
            ],
          },
          {
            icon: "🌍",
            title: "International Recruitment & Pipeline",
            items: [
              "IMG (International Medical Graduates): 25% of US physicians are IMGs (AAMC 2023)",
              "H-1B/J-1 visa pathways: J-1 waiver programs (Conrad 30) critical for rural/underserved area MDs",
              "IEN (internationally educated nurses): a growing share of new US licenses",
              "NCLEX: internationally educated first-time pass rates run well below US-educated graduates (NCSBN)",
              "Nursing school pipeline: 65,766 qualified applications turned away by US nursing schools in 2023 (AACN)",
              "Medical school expansion: new schools have opened, but residency (GME) slots remain the bottleneck",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-emerald-600 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Workforce Outlook */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Workforce Shortage Projections</h2>
        <p className="text-slate-500 text-sm mb-6">National projections from the two standard sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-sm font-bold text-slate-800 mb-1">Physicians — AAMC (March 2024)</div>
            <div className="text-2xl font-black text-emerald-700 mb-1">Up to 86,000 by 2036</div>
            <div className="text-slate-600 text-xs">Including a primary-care shortfall of 20,200–40,400 physicians.</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-sm font-bold text-slate-800 mb-1">Registered nurses — HRSA (November 2024)</div>
            <div className="text-2xl font-black text-emerald-700 mb-1">10% short in 2027, 6% in 2037</div>
            <div className="text-slate-600 text-xs">Nonmetropolitan areas face a far larger gap — 24% versus 7% in 2027.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <LaborWorkforceHero />
      <CategoryPage
        pillar="Economics"
        title="Labor & Workforce Strategy"
        description="Nursing vacancy economics, physician compensation, burnout ROI, and automation impact."
        colorClass="text-emerald-700"
        category="Workforce"
        hideHeader
      />
      <LaborWorkforceBody />
    </>
  );
}
