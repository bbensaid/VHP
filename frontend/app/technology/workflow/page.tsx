import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Tech-Enabled Workflow | HTR Technology",
  description: "Clinical and administrative workflow automation, EHR optimization, prior authorization technology, and AI-assisted care coordination across health system operations.",
};

function WorkflowHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 mb-4">
          Technology · Tech-Enabled Workflow
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mb-3">Tech-Enabled Workflow</h1>
        <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
          EHR optimization, robotic process automation, clinical decision support, and the technology stack
          that reduces administrative burden while enabling clinical teams to work at the top of their license.
        </p>
      </div>
    </div>
  );
}

function WorkflowBody() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-0 pb-12">
      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🖥️",
            title: "EHR Optimization",
            items: [
              "In-basket management: AI-assisted message routing and drafted replies",
              "SmartPhrase / SmartText optimization: pre-built documentation templates per specialty",
              "Epic Autocompletion (Dragon Ambient): ambient note + SmartPhrases → completed note",
              "Inbox triage: AI urgency scoring routes patient messages (Low/Medium/High/Urgent)",
              "EHR after-hours work: primary care physicians spent about 1.4 hours a day in the EHR after clinic (Arndt et al., Annals of Family Medicine, 2017)",
              "Alert fatigue: clinicians override roughly half to over 90% of drug-safety alerts in published studies (van der Sijs et al., JAMIA, 2006)",
            ],
          },
          {
            icon: "🤖",
            title: "Robotic Process Automation (RPA)",
            items: [
              "Revenue cycle automation: prior auth initiation, eligibility verification, claim scrubbing",
              "RPA platforms: UiPath, Automation Anywhere, Blue Prism — healthcare-specific bots",
              "Prior auth automation: electronic prior authorization APIs required of Medicare Advantage, Medicaid and ACA plans from January 2027 (CMS-0057-F)",
              "Eligibility verification bot: real-time insurance check at scheduling — reduces bad debt",
              "Claims status automation: bots check payer portals instead of billers",
              "Discharge summary automation: structured EHR data → draft discharge summary",
            ],
          },
          {
            icon: "💡",
            title: "Clinical Decision Support (CDS)",
            items: [
              "Best Practice Advisories (BPAs): vendor-built and locally built interruptive alerts",
              "Alert governance: retire low-value alerts using override data and role-based targeting",
              "CDS Hooks: HL7 standard for embedding 3rd-party CDS into EHR workflow (FHIR-based)",
              "Antimicrobial stewardship: CDS-driven antibiotic de-escalation",
              "Sepsis bundles: time-to-antibiotic alert — PDSA cycles using CDS to meet SEP-1 measure",
              "Drug-drug interaction: precision DDI alerting (eliminate low-risk alerts that cause override fatigue)",
            ],
          },
          {
            icon: "📅",
            title: "Scheduling & Access Optimization",
            items: [
              "AI scheduling optimization: OR block and infusion-chair scheduling tools (e.g., LeanTaaS iQueue)",
              "Patient self-scheduling: online booking integrated with the EHR",
              "No-show prediction: ML model triggers proactive reminder at 48–72 hours pre-appointment",
              "Demand forecasting: AI predicts daily ED census by hour — staffing optimization",
              "Referral management: Epic Referral Tracking + Salesforce Health Cloud CRM integration",
              "Wait time optimization: care team inbox → digital waitlist → auto-schedule open slots",
            ],
          },
          {
            icon: "🏥",
            title: "Care Team Coordination",
            items: [
              "Secure messaging: TigerConnect, Vocera (now Stryker) — HIPAA-compliant team communication",
              "Role-based communication: escalation pathways in Epic, Cerner — closed-loop task completion",
              "Multidisciplinary rounds support: rounding tools (Rounds, Cardex) with EHR integration",
              "Nurse call system integration: Rauland, Hillrom — call type analytics + response time tracking",
              "Fall prevention workflow: EHR-triggered fall precaution protocol + CNA task assignment",
              "Patient flow technology: TeleTracking, Capacity Planner — real-time bed management",
            ],
          },
          {
            icon: "💬",
            title: "Patient Engagement Tools",
            items: [
              "Patient portal activation: track and raise MyChart (or other portal) activation",
              "Automated post-visit surveys: HCAHPS digital collection (Press Ganey, NRC Health)",
              "Population outreach: TACOS (Target, Act, Close, Outreach, Schedule) — Epic population health",
              "Appointment reminders: automated SMS/email workflows",
              "Patient education: health literacy-adjusted content delivery via Healthwise, Krames",
              "Shared decision-making tools: Staywell, Emmi — video + decision aid integration at point of care",
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
    </div>
  );
}

export default function Page() {
  return (
    <>
      <WorkflowHero />
      <CategoryPage
        pillar="Technology"
        title="Tech-Enabled Workflow"
        description="EHR optimization, RPA, clinical decision support, and automation ROI for health systems."
        colorClass="text-indigo-700"
        category="Workflow"
        hideHeader
      />
      <WorkflowBody />
    </>
  );
}
