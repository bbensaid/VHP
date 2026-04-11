import CategoryPage from "@/components/CategoryPage";

function SecurityHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 mb-4">
          Technology · Data Security & Governance
        </span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-3">Data Security & Governance</h1>
        <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
          Healthcare cybersecurity threats, ransomware defense, HIPAA enforcement, interoperability mandates,
          and the data governance frameworks needed to protect patients and enable innovation simultaneously.
        </p>
      </div>
    </div>
  );
}

function SecurityBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Breach Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">⚠️</span>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">Major Healthcare Data Breaches (2022–2024)</h2>
            <p className="text-sm text-slate-500">Significant breaches by records exposed and financial impact</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Organization</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Year</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Records Exposed</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Attack Type</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { org: "Change Healthcare (UHC)", year: "2024", records: "~100M+", type: "Ransomware (ALPHV)", impact: "$872M claims disruption; 6-week outage" },
                { org: "HCA Healthcare", year: "2023", records: "11.27M", type: "Data theft (external)", impact: "Patient scheduling data; $3.35B stock drop" },
                { org: "Advocate Aurora Health", year: "2022", records: "3.0M", type: "Pixel tracking (Meta)", impact: "PHI via third-party analytics code" },
                { org: "CommonSpirit Health", year: "2022", records: "623,774", type: "Ransomware", impact: "$160M financial impact; EHR offline 5 weeks" },
                { org: "Shields Health Care Group", year: "2022", records: "2.0M", type: "Data theft", impact: "Imaging center billing data exposure" },
                { org: "Roper St. Francis Healthcare", year: "2023", records: "187,979", type: "Phishing", impact: "Patient portal + payment data" },
              ].map((row) => (
                <tr key={row.org} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-bold text-slate-800">{row.org}</td>
                  <td className="py-3 pr-4 text-slate-500 text-xs">{row.year}</td>
                  <td className="py-3 pr-4 font-bold text-rose-600">{row.records}</td>
                  <td className="py-3 pr-4 text-xs text-slate-600">{row.type}</td>
                  <td className="py-3 text-xs text-slate-500">{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Source: HHS OCR Breach Portal, public disclosures. Records exposed may include duplicates across payer/provider data sharing.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🔒",
            title: "Ransomware & Cyber Threats",
            items: [
              "Healthcare is #1 targeted sector: 725 breaches in 2023 (HHS/OCR breach portal)",
              "Change Healthcare attack (Feb 2024): $872M+ claims processing disruption — largest healthcare cyberattack",
              "Ransomware groups: ALPHV/BlackCat, Rhysida — healthcare-specific RaaS operators",
              "Attack vector: 74% via phishing + credential theft; 22% via unpatched vulnerabilities",
              "Downtime cost: avg $1.3M/day for large hospital system during ransomware lockdown",
              "Cyber insurance: premiums up 300% 2020–2023; healthcare excluded from many standard policies",
            ],
          },
          {
            icon: "🛡️",
            title: "HIPAA & Regulatory Framework",
            items: [
              "HIPAA Security Rule: administrative, physical, technical safeguards — 45 CFR §164.300",
              "OCR enforcement: $135M+ in HIPAA penalties collected 2023; Right of Access cases rising",
              "HIPAA Omnibus (2013): Business Associates directly liable; breach notification ≤60 days",
              "HHS proposed HIPAA Security Rule update (2024): MFA required, 72-hour incident response",
              "FTC Health Breach Notification Rule: applies to non-HIPAA health apps (expanded 2023)",
              "State breach laws: CCPA (CA), NY SHIELD Act — stricter than federal floor in many states",
            ],
          },
          {
            icon: "🔗",
            title: "Interoperability & Data Standards",
            items: [
              "21st Century Cures Act: information blocking prohibition effective April 2021",
              "ONC Interoperability Rule: FHIR R4 API required for certified EHR technology (CHIT)",
              "CMS Interoperability Rule: payer-to-payer data exchange, prior auth APIs (FHIR-based)",
              "TEFCA (Trusted Exchange Framework): nationwide health information exchange — QHIN network",
              "HL7 FHIR R4: dominant API standard; SMART on FHIR for app authorization",
              "Da Vinci Project: HL7 accelerator — coverage requirements, payer data guide, prior auth FHIR IGs",
            ],
          },
          {
            icon: "🏗️",
            title: "Zero Trust Architecture",
            items: [
              "Zero Trust principle: never trust, always verify — network perimeter is obsolete",
              "Identity-centric security: MFA for all users + privileged access management (PAM)",
              "Microsegmentation: isolate clinical devices (infusion pumps, imaging) from EHR network",
              "Endpoint detection & response (EDR): CrowdStrike Falcon, SentinelOne in healthcare",
              "NIST SP 800-207: Zero Trust Architecture — federal standard, adopted in healthcare",
              "Medical device security: FDA pre-market cybersecurity guidance (2022) + SBOM requirements",
            ],
          },
          {
            icon: "☁️",
            title: "Cloud & Data Governance",
            items: [
              "Cloud adoption: 87% of health systems using AWS/Azure/GCP for at least one workload (2024)",
              "BAA requirements: cloud vendors must execute HIPAA Business Associate Agreement",
              "De-identification: Safe Harbor (18 identifiers removed) or Expert Determination methods",
              "Federated learning: train AI models across hospitals without sharing raw patient data",
              "Data lake architecture: Databricks, Snowflake, AWS HealthLake — FHIR-native storage",
              "Data governance: DAMA framework, data stewardship roles, data quality KPIs for analytics",
            ],
          },
          {
            icon: "📋",
            title: "Incident Response & Recovery",
            items: [
              "NIST Cybersecurity Framework: Identify, Protect, Detect, Respond, Recover",
              "Healthcare-specific IR playbooks: HHS 405(d) Task Group — recognized security practices",
              "Downtime procedures: paper-based fallback for EHR, med admin, imaging — tested annually",
              "Cyber recovery: immutable backup (3-2-1-1 strategy) — air-gapped backup critical for ransomware",
              "Third-party risk: vendor risk management program (VRM) for all 3rd-party data access",
              "Tabletop exercises: CISA recommends quarterly cybersecurity drills for health systems",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-slate-900 text-base mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-indigo-500 mt-0.5 shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Defense Controls */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Critical Security Controls for Healthcare</h2>
        <p className="text-slate-500 text-sm mb-6">CIS Controls v8 priority implementation for health systems</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { priority: "Immediate (P1)", color: "bg-white border-rose-200", controls: ["MFA everywhere — no exceptions for VPN, EHR, email", "Privileged Access Management (PAM) for admin accounts", "Immutable off-site backup with tested recovery", "Patch management: critical CVEs patched within 24 hours"] },
            { priority: "Short-Term (P2)", color: "bg-white border-amber-200", controls: ["Endpoint Detection & Response (EDR) on all devices", "Network segmentation: clinical device VLAN isolation", "Security Awareness Training: phishing simulation quarterly", "Vendor risk: MFA + VPN required for all 3rd-party access"] },
            { priority: "Strategic (P3)", color: "bg-white border-sky-200", controls: ["Zero Trust Architecture implementation roadmap", "Medical device security: asset inventory + SBOM", "SIEM/SOAR: 24/7 security operations capability", "Cyber insurance: healthcare-specific coverage review"] },
          ].map((group) => (
            <div key={group.priority} className={`rounded-xl p-5 border ${group.color}`}>
              <div className="font-bold text-slate-800 text-sm mb-3">{group.priority}</div>
              <ul className="space-y-2">
                {group.controls.map((c) => (
                  <li key={c} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-slate-400 mt-0.5">›</span> {c}
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
      <SecurityHero />
      <CategoryPage
        pillar="Technology"
        title="Data Security & Governance"
        description="Ransomware defense, HIPAA enforcement, interoperability mandates, and zero trust architecture."
        colorClass="text-indigo-700"
        category="Security"
        hideHeader
      />
      <SecurityBody />
    </>
  );
}
