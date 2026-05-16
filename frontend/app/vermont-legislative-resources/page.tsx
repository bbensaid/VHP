import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Vermont Health Reform — Legislative Resources | HTR",
  description: "Centralized library of Vermont health reform legislative reports, GMCB annual reports, hospital budget decisions, AHS Act 68 transformation reports, Blueprint annual reports, and House Health Care Committee testimony. Direct links to official documents.",
};

function ExternalLink({ href, children, desc }: { href: string; children: React.ReactNode; desc?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-all group hover:border-indigo-300">
      <ArrowTopRightOnSquareIcon className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-bold text-slate-800 group-hover:text-indigo-700 text-xs transition-colors leading-snug">{children}</p>
        {desc && <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{desc}</p>}
      </div>
    </a>
  );
}

function SectionHeader({ label, title, color = "text-indigo-600" }: { label: string; title: string; color?: string }) {
  return (
    <div className="mb-5">
      <span className={`text-xs font-black uppercase tracking-widest ${color}`}>{label}</span>
      <h2 className="text-xl font-black text-slate-900 mt-1">{title}</h2>
    </div>
  );
}

export default function VermontLegislativeResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* HERO */}
      <div className="bg-slate-900 text-white rounded-2xl p-10 mb-12">
        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-3">Vermont Health Reform</span>
        <h1 className="ty-h1 font-black text-white mb-4 leading-tight">Legislative Reports & Testimony Library</h1>
        <p className="ty-hero text-slate-300 leading-relaxed max-w-3xl mb-4">
          A centralized library of official Vermont health reform documents — GMCB hospital budget decisions, AHS Act 68 monthly reports, Blueprint for Health annual reports, House Health Care Committee testimony, and more. All links go directly to official Vermont government sources.
        </p>
        <p className="text-sm text-slate-400">
          Sources: <span className="text-slate-300">legislature.vermont.gov · gmcboard.vermont.gov · blueprintforhealth.vermont.gov · humanservices.vermont.gov · healthcarereform.vermont.gov · mentalhealth.vermont.gov</span>
        </p>
      </div>

      {/* GMCB */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-violet-600 whitespace-nowrap">Green Mountain Care Board (GMCB)</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          The Green Mountain Care Board is Vermont's independent health care regulatory body. It reviews and approves annual budgets for all 14 Vermont hospitals, issues Certificates of Need, reviews insurance rates, and oversees ACO budgets. Under Act 167 (2022), GMCB's authority was significantly expanded to include hospital sustainability planning and enforcement powers for excessive rate increases.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <ExternalLink href="https://legislature.vermont.gov/assets/Legislative-Reports/GMCB-2024-Annual-Report-Final-revised-01.16.2025A.pdf"
            desc="Filed January 15, 2025. Covers FY2024 hospital budget review, ACO budgets, Certificate of Need decisions, and Act 167 implementation status.">
            GMCB 2024 Annual Report (Filed Jan 15, 2025)
          </ExternalLink>
          <ExternalLink href="https://gmcboard.vermont.gov/hospital-budget-review"
            desc="Official GMCB portal for all hospital budget submissions, review decisions, public hearing materials, and FY2025/FY2026 guidance documents.">
            GMCB Hospital Budget Review Hub
          </ExternalLink>
          <ExternalLink href="https://gmcboard.vermont.gov/hospitalsustainability"
            desc="Dedicated GMCB page for Act 167 hospital sustainability work — Oliver Wyman report, community engagement process, and implementation updates.">
            Act 167 Hospital Sustainability — GMCB Hub
          </ExternalLink>
          <ExternalLink href="https://gmcboard.vermont.gov/sites/gmcb/files/documents/Press%20Release%20-%20Green%20Mountain%20Care%20Board%20Announces%20FY2025%20Hospital%20Budget%20Decisions%20and%20Enforcement%20of%20FY2023%20Hospital%20Budgets%20-%2009.13.2024.pdf"
            desc="September 13, 2024 press release announcing FY2025 hospital budget decisions and FY2023 enforcement actions.">
            FY2025 Hospital Budget Decisions (Press Release, Sep 2024)
          </ExternalLink>
          <ExternalLink href="https://gmcboard.vermont.gov/FY25-HB-Guidance"
            desc="FY2025 hospital budget guidance materials including methodology, benchmarks, and submission requirements.">
            FY2025 Hospital Budget Guidance Materials
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Orientation/W~Owen%20Foster~Green%20Mountain%20Care%20Board%20Overview~2-6-2025.pdf"
            desc="January 30, 2025 GMCB overview presented to the House Health Care Committee as orientation testimony. Covers GMCB's full scope, Act 167 status, and upcoming priorities.">
            GMCB Overview — House Health Care Committee (Feb 2025)
          </ExternalLink>
          <ExternalLink href="https://gmcboard.vermont.gov/2026-decisions-issued"
            desc="GMCB decisions issued for FY2026 hospital budgets — approved, modified, and denied budget requests with rationale.">
            FY2026 Decisions Issued
          </ExternalLink>
          <ExternalLink href="https://gmcboard.vermont.gov/archived-public-comment"
            desc="Archive of all public comments submitted to GMCB on hospital budget and insurance rate proceedings (2014–2025).">
            Archived Public Comments (2014–2025)
          </ExternalLink>
        </div>
      </div>

      {/* AHS / HEALTH CARE REFORM */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-sky-600 whitespace-nowrap">AHS Office of Health Care Reform — Act 68 Reports</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          The Vermont Agency of Human Services (AHS) Office of Health Care Reform (OHCR) files monthly Health Care System Transformation Reports to the legislature under Act 68 of 2025. These reports track hospital transformation planning, primary care reform, global budget progress, and AHEAD ACO performance. AHS Secretary Jenney Samuelson also provides direct testimony to legislative committees.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <ExternalLink href="https://legislature.vermont.gov/assets/Legislative-Reports/Aug-2025_Act-68-HC-System-Transformation-Report-from-AHS.pdf"
            desc="August 2025 Act 68 Health Care System Transformation Report from AHS — monthly legislative report on system transformation progress.">
            AHS Act 68 Transformation Report — August 2025
          </ExternalLink>
          <ExternalLink href="https://ljfo.vermont.gov/assets/Meetings/Health-Reform-Oversight-Committee/2025-12-04/Dec-2025_Act-68-HC-System-Transformation-Report-from-AHS.pdf"
            desc="December 2025 Act 68 report — filed with the Health Reform Oversight Committee. Covers hospital planning, primary care access, and DVHA program updates.">
            AHS Act 68 Transformation Report — December 2025
          </ExternalLink>
          <ExternalLink href="https://ljfo.vermont.gov/assets/Meetings/Health-Reform-Oversight-Committee/2024-12-06/Vermonts-Health-Care-Reform-Efforts-AHS.pdf"
            desc="December 2024 AHS presentation on Vermont's Health Care Reform Efforts — full system overview including AHEAD, Blueprint, and Act 167 status.">
            Vermont Health Care Reform Efforts — AHS (Dec 2024)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Health%20Care%20Reform/W~Brendan%20Krause~Vermont%27s%20Health%20Care%20Reform%20Efforts%20~1-31-2025.pdf"
            desc="January 31, 2025 testimony to the House Health Care Committee on Vermont's health care reform efforts — primary care, hospital transformation, and AHEAD status.">
            Vermont Health Care Reform — House Committee Testimony (Jan 2025)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/assets/Legislative-Reports/ahs-report-samuelson-act119-update-20250201.pdf"
            desc="February 2025 AHS reorganization status update pursuant to Act 119 of 2024 — covers AHS restructuring and the new OHCR mandate.">
            AHS Act 119 Reorganization Update (Feb 2025)
          </ExternalLink>
          <ExternalLink href="https://humanservices.vermont.gov/press-release/statement-ahs-secretary-jenney-samuelson-next-steps-oliver-wyman-health-care-reform"
            desc="AHS Secretary Samuelson's statement on next steps following the Oliver Wyman Act 167 Report — AHS's official response and implementation framework.">
            AHS Secretary Statement on Oliver Wyman Report
          </ExternalLink>
          <ExternalLink href="https://healthcarereform.vermont.gov/health-care-transformation"
            desc="Vermont Office of Health Care Reform official portal — policy initiatives, program summaries, and transformation reports organized by initiative.">
            AHS Health Care Transformation Portal
          </ExternalLink>
          <ExternalLink href="https://humanservices.vermont.gov/our-work/reports"
            desc="AHS complete legislative reports archive — all statutory reports filed by AHS across all program areas.">
            AHS All Legislative Reports Archive
          </ExternalLink>
        </div>
      </div>

      {/* BLUEPRINT */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 whitespace-nowrap">Blueprint for Health Annual Reports</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <ExternalLink href="https://legislature.vermont.gov/assets/Legislative-Reports/2025_Blueprint_For_Health_Annual_Report.pdf"
            desc="Filed February 4, 2025 with the House and Senate Health committees. Includes practice participation, CHW deployment data, MHI enrollment, and payment statistics.">
            Blueprint Annual Report 2025 (Filed Feb 4, 2025)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/assets/Legislative-Reports/2024-Blueprint-for-Health-Annual-Report-Updated-2.pdf"
            desc="2024 annual report — covers 128 PCMH practices, CHT staffing levels, quality metrics, and Pilot program progress.">
            Blueprint Annual Report 2024
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2022/WorkGroups/House%20Health%20Care/Reports%20and%20Resources/W~Agency%20of%20Human%20Services~Annual%20Report%20on%20the%20Vermont%20Blueprint%20for%20Health~2-19-2022.pdf"
            desc="2022 Blueprint annual report — pre-Act 167 baseline for program scale and performance.">
            Blueprint Annual Report 2022
          </ExternalLink>
          <ExternalLink href="https://blueprintforhealth.vermont.gov/annual-reports"
            desc="Complete archive of all Blueprint annual reports from 2008 to present — useful for longitudinal trend analysis.">
            All Blueprint Annual Reports (2008–2025)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2026/Workgroups/Senate%20Health%20and%20Welfare/Reports%20and%20Resources/W~Agency%20of%20Human%20Services~Annual%20Report%20on%20Blueprint%20for%20Health~2-4-2025.pdf"
            desc="AHS testimony to the Senate Health & Welfare Committee accompanying the 2025 Blueprint annual report submission.">
            Senate Health & Welfare: Blueprint Testimony (Feb 2025)
          </ExternalLink>
          <ExternalLink href="https://blueprintforhealth.vermont.gov/mental-health-integration-mhi-primary-care"
            desc="Official MHI initiative page — background, expansion plan, training curriculum, and outcome data for the 2023 mental health integration into primary care program.">
            Mental Health Integration (MHI) — Official Page
          </ExternalLink>
        </div>
      </div>

      {/* ACT 167 */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-violet-600 whitespace-nowrap">Act 167 (2022) — Hospital Transformation</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <ExternalLink href="https://legislature.vermont.gov/Documents/2022/Docs/ACTS/ACT167/ACT167%20As%20Enacted.pdf"
            desc="Full text of Act 167 as enacted — the authorizing legislation for expanded GMCB authority, hospital sustainability review, and all-payer model agreement.">
            Act 167 Full Text (As Enacted, 2022)
          </ExternalLink>
          <ExternalLink href="https://healthcarereform.vermont.gov/frequently-asked-questions-act-167-hospital-transformation-report"
            desc="Official AHS FAQ on the Act 167 hospital transformation report — intended for hospital leaders, legislators, and public stakeholders.">
            Official Act 167 FAQ — AHS
          </ExternalLink>
          <ExternalLink href="https://gmcboard.vermont.gov/hospitalsustainability"
            desc="GMCB's Act 167 hub — Oliver Wyman report, community engagement process, and ongoing hospital sustainability workstream.">
            GMCB Act 167 Implementation Hub
          </ExternalLink>
        </div>
      </div>

      {/* HOUSE HEALTH CARE COMMITTEE TESTIMONY */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-rose-600 whitespace-nowrap">House Health Care Committee — Key Testimony</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          The Vermont House Health Care Committee holds regular hearings on health system reform, hospital sustainability, Medicaid programs, and behavioral health. Testimony documents (PDF) from these hearings are publicly available at legislature.vermont.gov and provide real-time insight into legislative priorities and program performance data.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ExternalLink href="https://legislature.vermont.gov/Documents/2024/WorkGroups/House%20Health%20Care/Designated%20and%20Specialized%20Service%20Agencies/W~Julie%20Tessler~Vermont%20Care%20Partners%20(VCP)%20and%20the%20Designated%20and%20Specialized%20Service%20Agencies%20(DAs-SSAs)%20-%20Overview~2-3-2023.pdf"
            desc="Vermont Care Partners testimony to the House Health Care Committee — full overview of the DA/SSA system, funding structure, and sustainability challenges.">
            Vermont Care Partners DA/SSA Overview Testimony (2023)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2024/WorkGroups/House%20Health%20Care/Designated%20and%20Specialized%20Service%20Agencies/W~Kelly%20Deforge~Howard%20Center%20-%20Overview~4-25-2024.pdf"
            desc="Howard Center presentation to the House Health Care Committee — overview of Chittenden County DA operations and sustainability concerns (April 2024).">
            Howard Center Overview Testimony (April 2024)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2024/WorkGroups/House%20Health%20Care/Mental%20Health/W~Amy%20Johnson~Vermont%20Care%20Partners%20-%20Presentation%20-%20The%20Mental%20Health%20Continuum~1-31-2024.pdf"
            desc="Vermont Care Partners presentation on the Mental Health Continuum — full spectrum from prevention through inpatient, with DA system data (January 2024).">
            VCP: Mental Health Continuum Presentation (Jan 2024)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Health%20Care%20Reform/W~Brendan%20Krause~Vermont%27s%20Health%20Care%20Reform%20Efforts%20~1-31-2025.pdf"
            desc="AHS January 31, 2025 testimony on Vermont health care reform efforts — comprehensive update on Act 167, Act 68, AHEAD, Blueprint, and VCCI status.">
            AHS Health Care Reform Overview Testimony (Jan 2025)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2024/WorkGroups/House%20Health%20Care/Health%20Care%20Workforce/W~Wendy%20Trafton~Agency%20of%20Human%20Services%20Office%20of%20Health%20Care%20Reform%20-%20Follow-up%20Testimony%20-%20Joint%20Meeting%20re%20Health%20Care%20Workforce%20Strategic%20Plan%20Report~1-24-2024.pdf"
            desc="AHS OHCR follow-up testimony on the Health Care Workforce Strategic Plan — joint hearing with Senate committee (January 2024).">
            AHS Workforce Strategic Plan Testimony (Jan 2024)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Corrections%20and%20Institutions/Department%20of%20Corrections/Vermont%20Medicaid%20Reentry%20Program/W~Aviva%20Tevah~VCCI%20Presentation~1-21-2026.pdf"
            desc="VCCI presentation to the House Corrections Committee on the Vermont Medicaid Reentry Initiative — VCCI's role in Medicaid re-entry for individuals leaving incarceration (January 2026).">
            VCCI Medicaid Reentry Presentation (Jan 2026)
          </ExternalLink>
        </div>
      </div>

      {/* VCCI REPORTS */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-rose-600 whitespace-nowrap">VCCI & Medicaid Program Reports</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ExternalLink href="https://dvha.vermont.gov/providers/vermont-chronic-care-initiative"
            desc="DVHA's official VCCI page — enrollment criteria, referral process, case management services, and contact information.">
            DVHA VCCI Official Program Page
          </ExternalLink>
          <ExternalLink href="https://dvha.vermont.gov/providers/vermont-chronic-care-initiative/vcci-services"
            desc="Detailed description of all VCCI services — intensive case management, shared care plans, eco-mapping, and care team conference protocols.">
            VCCI Services Detail
          </ExternalLink>
          <ExternalLink href="https://dvha.vermont.gov/sites/dvha/files/doc_library/VCCI%20Referral%20Form.pdf"
            desc="Current VCCI referral form — the standardized document used by PCPs, hospitals, social workers, and CHTs to refer members for VCCI enrollment.">
            VCCI Referral Form (Current PDF)
          </ExternalLink>
          <ExternalLink href="https://legislature.vermont.gov/Documents/2018/WorkGroups/House%20Health%20Care/Vermont%20Chronic%20Care%20Initiative/W~Eileen%20Girling~Vermont%20Chronic%20Care%20Initiative~4-6-2017.pdf"
            desc="2017 House Health Care Committee presentation on VCCI — foundational program description including eligibility methodology, risk stratification approach, and outcomes data. Still the most detailed public description of the VCCI scoring model.">
            VCCI House Committee Presentation (2017 — foundational)
          </ExternalLink>
          <ExternalLink href="https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/vt-global-commitment-to-health-annl-rpt-2018.pdf"
            desc="CMS annual monitoring report on Vermont's Global Commitment to Health 1115 waiver — covers VCCI as a key waiver deliverable with outcome data.">
            CMS: Vermont Global Commitment Annual Report (2018)
          </ExternalLink>
        </div>
      </div>

      {/* AHEAD / ALL-PAYER MODEL */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600 whitespace-nowrap">AHEAD & All-Payer ACO Model Reports</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ExternalLink href="https://www.cms.gov/priorities/innovation/innovation-models/vermont-all-payer-aco-model"
            desc="CMS CMMI official page for the Vermont All-Payer ACO Model — model design, evaluation reports, and performance data through the end of the demonstration period.">
            CMS: Vermont All-Payer ACO Model (CMMI)
          </ExternalLink>
          <ExternalLink href="https://www.cms.gov/priorities/innovation/data-and-reports/2024/vtapm-4th-eval-report-aag"
            desc="4th independent evaluation report on the Vermont All-Payer ACO Model (2024) — performance findings on total cost of care, quality, and utilization.">
            Vermont APM 4th Evaluation Report (2024)
          </ExternalLink>
          <ExternalLink href="https://dvha.vermont.gov/quality/medicaid-performance-measures"
            desc="DVHA Medicaid quality performance measures — the quality scorecard used to evaluate Vermont Medicaid managed care and ACO performance.">
            DVHA Medicaid Performance Measures
          </ExternalLink>
          <ExternalLink href="https://gmcboard.vermont.gov/data-and-analytics/analytics-rpts"
            desc="GMCB data and analytics reports — hospital financial data, utilization trends, and population health analytics published by the Care Board.">
            GMCB Analytics Reports & Data
          </ExternalLink>
        </div>
      </div>

      {/* HOW TO USE THIS PAGE */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
        <h2 className="text-xl font-black text-slate-900 mb-3">How to Use This Library</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-600">
          <div>
            <p className="font-bold text-slate-800 mb-1">For real-time legislative tracking</p>
            <p className="leading-relaxed">Vermont's legislature.vermont.gov posts testimony documents within 24–48 hours of hearings. The House Health Care Committee workgroup pages are organized by session and topic. AHS Act 68 monthly reports are filed to both the Health Reform Oversight Committee and the main legislature site.</p>
          </div>
          <div>
            <p className="font-bold text-slate-800 mb-1">For historical context</p>
            <p className="leading-relaxed">The Blueprint annual reports (2008–2025) provide the longest longitudinal view of Vermont's primary care transformation. GMCB's archived public comments (2014–2025) show stakeholder perspectives across 11 years of hospital budget review. The 2017 VCCI House Committee presentation remains the most detailed public description of the VCCI risk scoring methodology.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
