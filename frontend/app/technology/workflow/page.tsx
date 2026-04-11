import CategoryPage from "@/components/CategoryPage";

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
      {/* Automation ROI Quick Reference */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">💹</span>
          <div>
            <h2 className="ty-h3 font-bold text-slate-900">Workflow Automation ROI Reference</h2>
            <p className="text-sm text-slate-500">Expected financial impact by automation initiative — 500-bed health system baseline</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Initiative</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Annual Savings</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Implementation Cost</th>
                <th className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wider text-slate-500">Payback</th>
                <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Primary Benefit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { initiative: "Ambient AI documentation (physicians)", savings: "$1.8M–$2.4M", cost: "$450K–$650K", payback: "3–4 months", benefit: "2.5 hrs/MD/day time savings" },
                { initiative: "RPA — prior authorization", savings: "$600K–$900K", cost: "$120K–$180K", payback: "2–3 months", benefit: "4–6 FTEs reallocated" },
                { initiative: "AI claim denial prevention", savings: "$1.2M–$1.8M", cost: "$200K–$350K", payback: "2–3 months", benefit: "40% denial rate reduction" },
                { initiative: "Predictive scheduling + no-show AI", savings: "$400K–$700K", cost: "$80K–$150K", payback: "3–4 months", benefit: "18–22% no-show reduction" },
                { initiative: "EHR alert optimization", savings: "$280K–$420K", cost: "$60K–$100K", payback: "3–5 months", benefit: "63% alert volume reduction" },
                { initiative: "AI bed management / flow", savings: "$900K–$1.4M", cost: "$300K–$500K", payback: "4–6 months", benefit: "0.8 day LOS reduction" },
              ].map((row) => (
                <tr key={row.initiative} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-semibold text-slate-800 text-sm">{row.initiative}</td>
                  <td className="py-3 pr-4 font-bold text-emerald-700">{row.savings}</td>
                  <td className="py-3 pr-4 text-slate-500 text-xs">{row.cost}</td>
                  <td className="py-3 pr-4 font-bold text-indigo-600 text-xs">{row.payback}</td>
                  <td className="py-3 text-slate-500 text-xs">{row.benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-4">Estimates based on published vendor case studies and peer-reviewed implementation reports. Actual results vary by baseline workflows, EHR platform, and organizational readiness.</p>
      </div>

      {/* Core Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: "🖥️",
            title: "EHR Optimization",
            items: [
              "In-basket management: AI-assisted message routing reduces physician in-basket volume 35%",
              "SmartPhrase / SmartText optimization: pre-built documentation templates per specialty",
              "Epic Autocompletion (Dragon Ambient): ambient note + SmartPhrases → completed note",
              "Inbox triage: AI urgency scoring routes patient messages (Low/Medium/High/Urgent)",
              "EHR pajama time: physicians spend 1–2 hrs/night on charts — ambient AI primary solution",
              "Signal vs. noise: EHR alert fatigue — avg physician receives 63 alerts/day, overrides 96%",
            ],
          },
          {
            icon: "🤖",
            title: "Robotic Process Automation (RPA)",
            items: [
              "Revenue cycle automation: prior auth initiation, eligibility verification, claim scrubbing",
              "RPA platforms: UiPath, Automation Anywhere, Blue Prism — healthcare-specific bots",
              "Prior auth automation: 78% of PA requests require no additional information (AMA survey)",
              "Eligibility verification bot: real-time insurance check at scheduling — reduces bad debt",
              "Claims status automation: bot checks payer portals — replaces 4–6 biller FTEs per 500 beds",
              "Discharge summary automation: structured EHR data → draft discharge summary",
            ],
          },
          {
            icon: "💡",
            title: "Clinical Decision Support (CDS)",
            items: [
              "Best Practice Advisories (BPAs): Epic/Cerner alert system — 600+ standard BPAs available",
              "Alert fatigue: reduce BPA volume by 40–60% via relevance scoring + role-based filtering",
              "CDS Hooks: HL7 standard for embedding 3rd-party CDS into EHR workflow (FHIR-based)",
              "Antimicrobial stewardship: CDS-driven antibiotic de-escalation reduces C.diff 18%",
              "Sepsis bundles: time-to-antibiotic alert — PDSA cycles using CDS to meet SEP-1 measure",
              "Drug-drug interaction: precision DDI alerting (eliminate low-risk alerts that cause override fatigue)",
            ],
          },
          {
            icon: "📅",
            title: "Scheduling & Access Optimization",
            items: [
              "AI scheduling optimization: LeanTaaS iQueue, QGenda — reduces OR idle time 12–18%",
              "Patient self-scheduling: 47% of patients prefer online booking (Kyruus 2024)",
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
              "Patient portal activation: Epic MyChart — 73% of health system patients activated (2024)",
              "Automated post-visit surveys: HCAHPS digital collection (Press Ganey, NRC Health)",
              "Population outreach: TACOS (Target, Act, Close, Outreach, Schedule) — Epic population health",
              "Appointment reminders: SMS/email automated workflow — 18–22% no-show reduction",
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
