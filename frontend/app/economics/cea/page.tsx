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
      {/* Compensation Benchmarks Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">💰</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Clinical Compensation Benchmarks</h2>
            <p className="text-sm text-slate-500">Median total compensation by role — MGMA / BLS 2024</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Role</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Median Total Comp</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">10th Percentile</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">90th Percentile</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Vacancy Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { role: "Primary Care Physician (MD/DO)", median: "$256,000", p10: "$185,000", p90: "$345,000", vacancy: "14.2%" },
                { role: "Orthopedic Surgeon", median: "$633,000", p10: "$420,000", p90: "$980,000", vacancy: "8.4%" },
                { role: "Cardiologist", median: "$503,000", p10: "$340,000", p90: "$780,000", vacancy: "11.6%" },
                { role: "Emergency Medicine Physician", median: "$387,000", p10: "$275,000", p90: "$520,000", vacancy: "18.3%" },
                { role: "Psychiatrist", median: "$316,000", p10: "$210,000", p90: "$420,000", vacancy: "24.7%" },
                { role: "Nurse Practitioner (NP)", median: "$124,680", p10: "$92,000", p90: "$164,000", vacancy: "15.8%" },
                { role: "Physician Assistant (PA)", median: "$130,020", p10: "$96,000", p90: "$172,000", vacancy: "13.2%" },
                { role: "Registered Nurse (RN)", median: "$89,010", p10: "$64,000", p90: "$122,000", vacancy: "17.2%" },
                { role: "Travel Nurse (all-in cost)", median: "$195,000", p10: "$150,000", p90: "$240,000", vacancy: "N/A" },
                { role: "Certified CRNA", median: "$214,000", p10: "$165,000", p90: "$268,000", vacancy: "16.1%" },
              ].map((row) => (
                <tr key={row.role} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-semibold text-slate-800 text-sm">{row.role}</td>
                  <td className="py-3 pr-4 font-bold text-emerald-700">{row.median}</td>
                  <td className="py-3 pr-4 text-slate-500 text-xs">{row.p10}</td>
                  <td className="py-3 pr-4 text-slate-500 text-xs">{row.p90}</td>
                  <td className="py-3">
                    <span className={`text-xs font-bold ${parseFloat(row.vacancy) > 20 ? "text-rose-600" : parseFloat(row.vacancy) > 15 ? "text-amber-600" : "text-slate-600"}`}>
                      {row.vacancy}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Sources: MGMA 2024 Provider Compensation Report, BLS Occupational Employment Survey 2024, AAMC, ANA. Travel nurse cost = agency bill rate × 2,080 hours. Vacancy rates: Nursing Solutions 2024 NSI Report.</p>
      </div>

      {/* Retention Economics + Automation ROI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Retention Investment ROI</h3>
          <p className="text-sm text-slate-500 mb-5">Cost-benefit of nurse retention programs (per 100-RN unit)</p>
          <div className="space-y-4">
            {[
              { program: "Preceptor/residency program (12-mo new grad)", investment: 85000, benefit: 312000, roi: 267 },
              { program: "Flexible scheduling & self-scheduling tech", investment: 12000, benefit: 95000, roi: 692 },
              { program: "Wellbeing program (EAP + peer support)", investment: 18000, benefit: 72000, roi: 300 },
              { program: "Clinical ladder + certification support", investment: 22000, benefit: 88000, roi: 300 },
              { program: "Tuition assistance / BSN completion", investment: 45000, benefit: 148000, roi: 229 },
            ].map((row) => (
              <div key={row.program} className="p-3 rounded-xl bg-slate-50">
                <div className="font-semibold text-slate-800 text-sm mb-2">{row.program}</div>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-sm font-black text-rose-600">−${(row.investment / 1000).toFixed(0)}k</div>
                    <div className="text-[10px] text-slate-400">Investment</div>
                  </div>
                  <div className="text-slate-300 font-bold">→</div>
                  <div className="text-center">
                    <div className="text-sm font-black text-emerald-600">+${(row.benefit / 1000).toFixed(0)}k</div>
                    <div className="text-[10px] text-slate-400">Avoided Turnover</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-black text-indigo-600">{row.roi}%</div>
                    <div className="text-[10px] text-slate-400">ROI</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">Benefit calculation based on avoided RN turnover cost of $44,400–$65,800 per nurse (NSI 2024). Assumes 15% improvement in retention per program.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Automation Labor Impact</h3>
          <p className="text-sm text-slate-500 mb-5">Estimated FTE reduction potential by department (500-bed hospital)</p>
          <div className="space-y-3">
            {[
              { dept: "Revenue Cycle (coding, claims)", fteImpact: "12–18 FTEs", savings: "$820K–$1.2M/yr", tech: "AI coding + RPA" },
              { dept: "Prior Authorization", fteImpact: "4–8 FTEs", savings: "$280K–$560K/yr", tech: "AI PA automation" },
              { dept: "Medical Scribing", fteImpact: "15–25 FTEs", savings: "$720K–$1.2M/yr", tech: "Ambient AI (DAX)" },
              { dept: "Pharmacy Tech (dispensing)", fteImpact: "6–10 FTEs", savings: "$420K–$700K/yr", tech: "Robotic dispense" },
              { dept: "Scheduling & Registration", fteImpact: "8–14 FTEs", savings: "$400K–$700K/yr", tech: "AI self-scheduling" },
              { dept: "Inpatient Monitoring (virtual RN)", fteImpact: "20–35 FTEs", savings: "$1.4M–$2.4M/yr", tech: "Virtual nursing hub" },
            ].map((row) => (
              <div key={row.dept} className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-semibold text-slate-800 text-sm">{row.dept}</div>
                  <span className="text-[9px] bg-indigo-50 text-indigo-700 border border-indigo-200 rounded px-1.5 py-0.5 font-bold shrink-0">{row.tech}</span>
                </div>
                <div className="flex gap-4 text-xs">
                  <span className="text-amber-700 font-bold">{row.fteImpact}</span>
                  <span className="text-emerald-700 font-bold">{row.savings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "👩‍⚕️",
            title: "Nursing Workforce Economics",
            items: [
              "RN vacancy rate: national avg 17.2% (2024); ICU specialty vacancy 22–28%",
              "Travel nurse bill rate: $85–$120/hr vs. $38–$55/hr for employed RN (all-in cost)",
              "Total travel nursing spend: $13.3B in 2023 (down from $17.6B peak 2022)",
              "Cost of RN turnover: $44,400–$65,800 per nurse (JONA 2023 estimates)",
              "Replacement timeline: average 87 days to fill bedside RN vacancy",
              "CNO survey: 64% report travel nurse ratio >15% of nursing staff in FY2023",
            ],
          },
          {
            icon: "🩺",
            title: "Physician Compensation Trends",
            items: [
              "Physician employment: 74% employed by hospital/health system or corporate entity (AMA 2023)",
              "Median employed primary care: $256,000 (MGMA 2024); specialist range: $350K–$750K",
              "wRVU productivity model: still dominant — avg conversion factor $50–$75/wRVU",
              "Quality incentive pool: 10–20% of compensation at-risk for quality/utilization metrics",
              "Locum tenens cost: 2.5–3.5× employed physician cost per encounter",
              "Physician burnout cost: $4.6B/year to US health systems in turnover + vacancy (AAMC 2022)",
            ],
          },
          {
            icon: "🔥",
            title: "Burnout Economics",
            items: [
              "Physician burnout prevalence: 63% reporting burnout in 2023 (Medscape survey)",
              "Annual cost per burned-out physician: $500K–$1M (recruitment + productivity loss)",
              "Administrative burden: 15.6 hrs/week on EHR/admin for avg primary care physician",
              "Top burnout drivers: excessive documentation, prior auth burden, inefficient workflows",
              "Ambient AI documentation (Nuance DAX, Suki): reduces documentation time 50–70%",
              "ROI of burnout reduction programs: $3–$7 return per $1 invested (NEJM Catalyst 2023)",
            ],
          },
          {
            icon: "📋",
            title: "Scope-of-Practice Economics",
            items: [
              "NP/PA employment: 355,000 NPs + 168,000 PAs practicing (BLS 2023)",
              "Median NP compensation: $124,680 (BLS 2024); vs. PCP MD: $256,000",
              "Full-practice states (FPA): 28 states + DC allow NP independent practice — no physician oversight",
              "Cost savings estimate: full NP scope expansion = $810B savings over 10 years (RAND)",
              "Quality evidence: NP-led primary care equivalent outcomes in RCTs (HTN, diabetes, well-child)",
              "Physician-led pushback: AMA scope-of-practice policy opposes full independent NP practice",
            ],
          },
          {
            icon: "🤖",
            title: "Automation & Labor Substitution",
            items: [
              "Ambient AI documentation: DAX Copilot, Suki, Nabla — estimated 1.5 hrs/day time savings",
              "AI medical scribes: $800–$1,500/month vs. human scribe $3,200–$4,800/month",
              "Robotic process automation (RPA): prior auth, billing, scheduling — 60–80% task automation",
              "Virtual nursing: 1 virtual RN covers 8–15 beds — reduces bedside RN demand 20–30%",
              "Pharmacy automation: BD Pyxis, Omnicell — 90%+ dispense accuracy, reduced tech FTEs",
              "Revenue cycle AI: claim denial prediction, automated appeals — 15–20% denial rate reduction",
            ],
          },
          {
            icon: "🌍",
            title: "International Recruitment & Pipeline",
            items: [
              "IMG (International Medical Graduates): 25% of US physicians are IMGs (AAMC 2023)",
              "H-1B/J-1 visa pathways: J-1 waiver programs (Conrad 30) critical for rural/underserved area MDs",
              "IEN (International Educated Nurses): 20,000+ IEN visas processed annually (CGFNS)",
              "NCLEX passing rates: IEN first-attempt pass rate 42% (vs. 84% domestic grads) — training gap",
              "Nursing school pipeline: 91,938 qualified nursing school applicants rejected in 2023 (AACN)",
              "Medical school expansion: 17 new MD schools opened 2010–2023; residency slots lag behind",
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
        <h2 className="ty-h3 font-bold text-slate-900 mb-2">Workforce Shortage Projections — 2024–2036</h2>
        <p className="text-slate-500 text-sm mb-6">AAMC and HRSA supply-demand gap forecasts for key clinical roles</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-emerald-700 font-bold mb-4 text-sm uppercase tracking-wider">Physician Shortage (AAMC Projections)</h3>
            <div className="space-y-3">
              {[
                { specialty: "Primary Care", shortage: "20,200–40,400", year: "2036", severity: "high" },
                { specialty: "Psychiatry", shortage: "14,280–31,109", year: "2036", severity: "critical" },
                { specialty: "Geriatrics", shortage: "26,968", year: "2036", severity: "critical" },
                { specialty: "General Surgery", shortage: "2,900–4,200", year: "2036", severity: "moderate" },
                { specialty: "Neurology", shortage: "19,000", year: "2036", severity: "high" },
              ].map((row) => (
                <div key={row.specialty} className="flex items-center justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-600 text-sm">{row.specialty}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-800 text-sm">{row.shortage}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${row.severity === "critical" ? "bg-rose-100 text-rose-600" : row.severity === "high" ? "bg-amber-100 text-amber-600" : "bg-sky-100 text-sky-600"}`}>
                      {row.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-emerald-700 font-bold mb-4 text-sm uppercase tracking-wider">Nursing Shortage (HRSA Projections)</h3>
            <div className="space-y-3">
              {[
                { state: "California", shortage: "44,500", year: "2036" },
                { state: "Texas", shortage: "15,900", year: "2036" },
                { state: "New Jersey", shortage: "11,400", year: "2036" },
                { state: "South Carolina", shortage: "10,400", year: "2036" },
                { state: "Alaska", shortage: "5,400", year: "2036" },
              ].map((row) => (
                <div key={row.state} className="flex items-center justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-600 text-sm">{row.state}</span>
                  <span className="font-bold text-slate-800 text-sm">{row.shortage} RN shortage</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-white border border-slate-200 rounded-xl">
              <div className="text-sm font-bold text-slate-800 mb-1">National RN Shortage by 2036</div>
              <div className="text-2xl font-black text-emerald-700">78,610–145,000</div>
              <div className="text-slate-500 text-xs">HRSA conservative-to-high projection range</div>
            </div>
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
