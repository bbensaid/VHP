import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Vermont Designated Agencies | HTR States",
  description: "Vermont's 11 Designated Agencies (DAs) — the regional non-profit organizations providing community-based mental health, substance use disorder, and developmental disability services under contract with the Department of Mental Health and DDSD.",
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-violet-700 hover:text-violet-900 underline underline-offset-2 transition-colors">
      {children}
      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 shrink-0" />
    </a>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="text-xs font-black uppercase tracking-widest text-violet-600">{label}</span>
      <h2 className="text-2xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

const DESIGNATED_AGENCIES = [
  {
    name: "Howard Center",
    region: "Chittenden County",
    counties: ["Chittenden"],
    website: "https://howardcenter.org",
    designation: "Mental Health & Developmental Disabilities Designated Agency; Substance Use Preferred Provider",
    highlight: "Vermont's largest DA. Serves greater Burlington metro area — highest-population county. Also manages the Chittenden Unit for Special Investigations (CUSI) and a large residential program network.",
    sustainability: true,
  },
  {
    name: "Washington County Mental Health Services",
    region: "Washington County",
    counties: ["Washington"],
    website: "https://wcmhs.org",
    designation: "Mental Health & Developmental Disabilities Designated Agency",
    highlight: "Serves Montpelier/Barre area. Operates adult outpatient, children's services, crisis services, and residential programs. Coordinates with AHS central offices in Montpelier.",
    sustainability: false,
  },
  {
    name: "Lamoille County Mental Health Services",
    region: "Lamoille County",
    counties: ["Lamoille"],
    website: "https://lcmhsvt.org",
    designation: "Mental Health & Developmental Disabilities Designated Agency",
    highlight: "Serves Morrisville/Stowe area. One of Vermont's smaller DAs by county, but covers a region with growing population and significant tourism economy workforce.",
    sustainability: false,
  },
  {
    name: "Northwestern Counseling & Support Services (NCSS)",
    region: "Franklin & Grand Isle Counties",
    counties: ["Franklin", "Grand Isle"],
    website: "https://ncssvt.org",
    designation: "Mental Health & Developmental Disabilities Designated Agency",
    highlight: "Serves St. Albans and northwestern Vermont including Grand Isle islands. Franklin County has high rates of SUD and opioid-related presentations.",
    sustainability: false,
  },
  {
    name: "Northeast Kingdom Human Services (NKHS)",
    region: "Caledonia, Essex & Orleans Counties",
    counties: ["Caledonia", "Essex", "Orleans"],
    website: "https://nkhs.org",
    designation: "Mental Health & Developmental Disabilities Designated Agency",
    highlight: "Largest geographic DA — covers Vermont's Northeast Kingdom (NEK), the most rural and medically underserved region. St. Johnsbury hub. Essex County has the lowest population density in VT and the most severe access challenges.",
    sustainability: false,
  },
  {
    name: "Counseling Service of Addison County (CSAC)",
    region: "Addison County",
    counties: ["Addison"],
    website: "https://csac-vt.org",
    designation: "Mental Health & Developmental Disabilities Designated Agency",
    highlight: "Serves Middlebury area. Covers the Lake Champlain agricultural region with significant migrant and seasonal agricultural worker population — unique SDOH profile.",
    sustainability: false,
  },
  {
    name: "Rutland Mental Health Services",
    region: "Rutland County",
    counties: ["Rutland"],
    website: "https://rutlandmentalhealth.org",
    designation: "Mental Health & Developmental Disabilities Designated Agency",
    highlight: "Serves Rutland City and county — Vermont's second-largest city, with among the highest rates of MH/SUD burden, opioid overdose, and poverty in the state. One of the highest-acuity DA service areas.",
    sustainability: true,
  },
  {
    name: "United Counseling Service (UCS)",
    region: "Bennington County",
    counties: ["Bennington"],
    website: "https://ucsvt.org",
    designation: "Mental Health & Developmental Disabilities Designated Agency",
    highlight: "Serves Bennington and Manchester areas in southwestern Vermont. Borders Massachusetts — interstate coordination challenges for participants who cross-state-line for services.",
    sustainability: false,
  },
  {
    name: "Health Care and Rehabilitation Services (HCRS)",
    region: "Windham & Windsor Counties",
    counties: ["Windham", "Windsor"],
    website: "https://hcrs.org",
    designation: "Mental Health & Developmental Disabilities Designated Agency",
    highlight: "Serves Brattleboro/Springfield area. Windham County has extremely high rates of SUD, MH, and poverty. Closely coordinated with Brattleboro Retreat (specialized inpatient psychiatric hospital) and Dartmouth-Hitchcock for regional behavioral health capacity.",
    sustainability: false,
  },
  {
    name: "Upper Valley Services",
    region: "Orange County",
    counties: ["Orange"],
    website: "https://uvs-vt.org",
    designation: "Mental Health & Developmental Disabilities Designated Agency",
    highlight: "Serves Bradford/Randolph area in Orange County — a rural county with significant access challenges due to limited transportation and distance from hub services.",
    sustainability: false,
  },
];

const SSA_AGENCIES = [
  { name: "Brattleboro Retreat", role: "Specialized inpatient psychiatric hospital — private, non-profit. Vermont's only private psychiatric hospital. 138 adult and adolescent beds. Closely connected to HCRS DA for Windham/Windsor discharge planning.", website: "https://brattlebororetreat.org" },
  { name: "Vermont Psychiatric Care Hospital (VPCH)", role: "State-operated inpatient psychiatric hospital — 25 beds. The hospital of last resort for highest-acuity, forensic, and treatment-resistant cases. Located in Berlin, VT.", website: "https://mentalhealth.vermont.gov/services/vermont-psychiatric-care-hospital" },
  { name: "Clara Martin Center", role: "Specialized Service Agency for Orange County — also covers some developmental disability services alongside Upper Valley Services.", website: "https://claramartincenter.org" },
];

export default function VermontDesignatedAgenciesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* HERO */}
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-10 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-violet-100 text-violet-700 border border-violet-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">State System · Vermont</span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">11 Regional Agencies</span>
          <span className="bg-violet-100 text-violet-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">Vermont Care Partners Network</span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">Vermont Designated Agencies</h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-4">
          Vermont's 11 Designated Agencies (DAs) are the regional non-profit organizations that provide all community-based mental health, substance use disorder (SUD), and developmental disability services under contract with the Vermont Department of Mental Health (DMH) and the Developmental Disabilities Services Division (DDSD). Together they form the backbone of Vermont's behavioral health system.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          The DAs are organized under <strong>Vermont Care Partners</strong> — the statewide collaboration and advocacy organization for the DA network. Each DA is the sole designated provider for its geographic region — meaning if your DA is in crisis, there is no backup provider in your county.
        </p>
        <div className="flex flex-wrap gap-3">
          <ExternalLink href="https://mentalhealth.vermont.gov/services/designated-agencies-and-specialized-service-agencies">VT Dept. of Mental Health: DA Overview</ExternalLink>
          <ExternalLink href="https://vermontcarepartners.org/agencies/">Vermont Care Partners — Agency Directory</ExternalLink>
          <ExternalLink href="https://ddsd.vermont.gov/designated-agencies-listed-countyregion">DDSD: DAs by County/Region</ExternalLink>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { value: "11", label: "Designated Agencies", sub: "One per geographic region" },
          { value: "14", label: "Counties Covered", sub: "Every Vermont county" },
          { value: "16", label: "Vermont Care Partners Members", sub: "DAs + SSAs + affiliates" },
          { value: "100K+", label: "Vermonters Served", sub: "MH, SUD & DD services annually" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 text-center">
            <div className="text-2xl font-black text-violet-700 mb-1">{s.value}</div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">{s.label}</div>
            {s.sub && <div className="text-[11px] text-slate-400 mt-1">{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* WHAT DAs DO */}
      <div className="mb-12">
        <SectionHeader label="Program Overview" title="What Designated Agencies Do" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-black text-slate-900 mb-3">Mental Health Services</h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {["Outpatient individual and group therapy", "Psychiatric medication management", "Crisis services and mobile crisis response", "Inpatient referral and discharge coordination", "Intensive residential and community rehabilitation", "Supported employment and housing programs", "Children's mental health services and school-based support", "Emergency services (including 988 Lifeline participation)"].map(s => (
                <li key={s} className="flex items-start gap-2"><span className="text-violet-400 shrink-0">•</span>{s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-black text-slate-900 mb-3">Substance Use & Developmental Disability Services</h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {["Substance use disorder assessment and treatment", "Medication-Assisted Treatment (MOUD) coordination", "Recovery support and peer services", "Developmental disability services and supports", "Supported living and residential programs for adults with DD", "Family support and respite care", "Vocational rehabilitation and day programs", "Coordination with Blueprint CHTs and VCCI case managers"].map(s => (
                <li key={s} className="flex items-start gap-2"><span className="text-violet-400 shrink-0">•</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm">
          <p className="font-bold text-amber-800 mb-1">Chronic Underfunding Crisis</p>
          <p className="text-amber-700 leading-relaxed">A 2024 Vermont Public report documented chronic underfunding of Vermont's designated agency system. Howard Center, for example, was carrying 100+ vacant positions due to non-competitive wages, creating unsustainable operating conditions. Vermont Care Partners testified before the House Health Care Committee in April 2024 that the DA system's fiscal viability is at risk without sustainable Medicaid rate increases. This is Vermont's most significant behavioral health policy challenge.</p>
          <div className="mt-2">
            <ExternalLink href="https://vpr.org/post/report-details-chronic-underfunding-vermonts-mental-health-agencies">Vermont Public: Report Details Chronic Underfunding of Vermont's Mental Health Agencies</ExternalLink>
          </div>
        </div>
      </div>

      {/* AGENCY LIST */}
      <div className="mb-12">
        <SectionHeader label="Regional Directory" title="The 11 Designated Agencies" />
        <div className="space-y-3">
          {DESIGNATED_AGENCIES.map(da => (
            <div key={da.name} className={`bg-white border rounded-xl p-5 ${da.sustainability ? 'border-amber-300' : 'border-slate-200'}`}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <a href={da.website} target="_blank" rel="noopener noreferrer"
                      className="font-black text-slate-900 hover:text-violet-700 transition-colors flex items-center gap-1">
                      {da.name}
                      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 opacity-50" />
                    </a>
                    {da.sustainability && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-200 rounded-full">Sustainability concerns noted</span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-violet-700 mt-0.5">{da.region}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {da.counties.map(c => (
                    <span key={c} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{c} County</span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-1"><span className="font-bold">Designation:</span> {da.designation}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{da.highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SPECIALIZED SERVICE AGENCIES */}
      <div className="mb-12">
        <SectionHeader label="Related Facilities" title="Specialized Service Agencies & Inpatient Facilities" />
        <div className="space-y-3">
          {SSA_AGENCIES.map(ssa => (
            <div key={ssa.name} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div>
                  <a href={ssa.website} target="_blank" rel="noopener noreferrer"
                    className="font-black text-slate-900 hover:text-violet-700 transition-colors flex items-center gap-1">
                    {ssa.name}
                    <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 opacity-50" />
                  </a>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{ssa.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VERMONT CARE PARTNERS */}
      <div className="mb-12 bg-slate-900 text-white rounded-2xl p-8">
        <p className="text-xs font-black uppercase tracking-widest text-violet-400 mb-2">Umbrella Organization</p>
        <h2 className="text-xl font-black text-white mb-3">Vermont Care Partners</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          Vermont Care Partners is the statewide membership organization representing the 16 DAs and SSAs. It conducts policy advocacy, collective contracting, workforce development, data reporting through the Vermont Care Data Repository (vtcare.net), and legislative testimony on behalf of the DA network. Vermont Care Partners is the primary voice for the behavioral health provider community in Vermont legislative proceedings.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <ExternalLink href="https://vermontcarepartners.org/">Vermont Care Partners Website</ExternalLink>
          <ExternalLink href="https://vtcare.net/">Vermont Care Data Repository (vtcare.net)</ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2024/WorkGroups/House%20Health%20Care/Designated%20and%20Specialized%20Service%20Agencies/W~Julie%20Tessler~Vermont%20Care%20Partners%20(VCP)%20and%20the%20Designated%20and%20Specialized%20Service%20Agencies%20(DAs-SSAs)%20-%20Overview~2-3-2023.pdf">VCP Legislative Overview Testimony (2023 PDF)</ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2024/WorkGroups/House%20Health%20Care/Designated%20and%20Specialized%20Service%20Agencies/W~Kelly%20Deforge~Howard%20Center%20-%20Overview~4-25-2024.pdf">Howard Center House Health Care Committee Testimony (April 2024)</ExternalLink>
        </div>
      </div>

      {/* CONNECTION TO VCCI & BLUEPRINT */}
      <div className="mb-12">
        <SectionHeader label="System Integration" title="How DAs Connect to Vermont's Health Reform Programs" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/vermont-blueprint", label: "Blueprint for Health / CHTs", desc: "Blueprint's Mental Health Integration (MHI) initiative routes BH screening and brief treatment within primary care visits, with warm handoffs to DAs for patients needing specialty BH services. Co-location pilots exist in several regions.", color: "border-emerald-200 hover:bg-emerald-50", text: "text-emerald-700" },
            { href: "/vermont-rht-program", label: "VCCI Case Management", desc: "VCCI case managers coordinate with DA staff for members with co-occurring MH/SUD and medical complexity. The PHQ-9 (depression screen) and AUDIT-C (alcohol screen) that feed VCCI SDOH scoring are often administered by DA-affiliated CHT staff.", color: "border-rose-200 hover:bg-rose-50", text: "text-rose-700" },
            { href: "/vermont-act-68", label: "Act 68 (2025)", desc: "Act 68 includes provisions for mental health payment reform and expanded BH integration into primary care. DA Medicaid rate sustainability is a central Act 68 implementation challenge tracked by the AHS Office of Health Care Reform.", color: "border-indigo-200 hover:bg-indigo-50", text: "text-indigo-700" },
          ].map(item => (
            <Link key={item.href} href={item.href} className={`block border rounded-xl p-4 transition-all ${item.color} hover:border-opacity-100`}>
              <p className={`font-black text-sm mb-1.5 ${item.text}`}>{item.label}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* RESOURCES */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
        <SectionHeader label="Official Resources" title="Reports & Legislative Materials" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "https://mentalhealth.vermont.gov/services/designated-agencies-and-specialized-service-agencies", label: "VT Dept. of Mental Health: Designated Agencies", desc: "Official DMH list of all DAs and SSAs with contact information and service descriptions" },
            { href: "https://mentalhealth.vermont.gov/about-us/department-initiatives/mental-health-payment-reform", label: "Mental Health Payment Reform Initiative", desc: "DMH's payment reform work for DA system sustainability — Medicaid rate structures and VBC integration" },
            { href: "https://vermontcarepartners.org/agencies/", label: "Vermont Care Partners Agency Directory", desc: "Full directory of all member agencies with links and service descriptions" },
            { href: "https://ddsd.vermont.gov/designated-agencies-listed-countyregion", label: "DDSD: DAs by County/Region", desc: "Developmental Disabilities Services Division listing of DAs by county for DD-specific services" },
            { href: "https://ago.vermont.gov/community-justice-unit/mental-health-crisis-response-commission", label: "Mental Health Crisis Response Commission", desc: "VT Attorney General's commission examining the intersection of mental health, crisis response, and law enforcement — directly relevant to DA emergency services" },
            { href: "https://vpr.org/post/report-details-chronic-underfunding-vermonts-mental-health-agencies", label: "Vermont Public: Chronic Underfunding Report", desc: "Investigative reporting on the fiscal sustainability crisis facing Vermont's DA network in 2024" },
          ].map(r => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-violet-300 hover:shadow-sm transition-all group">
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 group-hover:text-violet-700 text-xs transition-colors">{r.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
