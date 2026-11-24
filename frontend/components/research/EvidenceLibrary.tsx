"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  X,
  BarChart2,
  FileText,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  Users,
  Star,
  Info,
  Layers,
  Database,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Verdict = "dominant" | "highly-effective" | "cost-effective" | "borderline" | "not-effective";
type EvidenceLevel = "High" | "Moderate" | "Low";
type SortField = "icer" | "year" | "journal" | "title";
type SortDir = "asc" | "desc";

interface CEAStudy {
  id: number;
  title: string;
  journal: string;
  year: number;
  condition: string;
  intervention: string;
  /** As reported, $/QALY. null = cost-saving study with no QALY ratio. */
  icer: number | null;
  evidence: EvidenceLevel;
  /** Author, model, comparator and caveats — what the number means. */
  basis: string;
  url: string;
}

interface CMMIModel {
  id: number;
  name: string;
  status: "Active" | "Ended" | "Cancelled";
  start: number | null;
  end: number | null;
  type: string;
  savings: string;
  lesson: string;
}

interface PolicyBrief {
  id: number;
  title: string;
  area: string;
  stat: string;
  abstract: string;
  body: string;
  asOf: string;
  sources: { label: string; url: string }[];
}

// ─── CEA Studies ──────────────────────────────────────────────────────────────

// Rebuilt 2026-11-23. Every row is a published analysis whose headline ratio was checked
// against the paper, its abstract, or the publisher's own summary. ICERs are as reported, in
// the study's own year dollars, against the comparator named in `basis` — they are NOT
// comparable across rows without adjusting for year, perspective and comparator.
// icer: null = a cost study that found lower total cost with equal or better outcomes
// (no QALY ratio reported); the verdict is then "Dominant" (cost-saving).
// Verdicts are COMPUTED from the ICER by verdictFor(), never hand-set.
const CEA_STUDIES: CEAStudy[] = [
  { id: 1, title: "Intensive vs standard blood-pressure control (SPRINT)", journal: "NEJM", year: 2017, condition: "Cardiovascular", intervention: "SBP target <120 vs <140 mm Hg", icer: 47000, evidence: "High", basis: "Bress et al. Microsimulation on SPRINT trial data; $47,000/QALY if benefits wane after 5 years, $28,000/QALY if they persist.", url: "https://pubmed.ncbi.nlm.nih.gov/28834469/" },
  { id: 2, title: "Statins for primary prevention at the 7.5% ASCVD risk threshold", journal: "JAMA", year: 2015, condition: "Cardiovascular", intervention: "Statin at ≥7.5% 10-yr risk vs ≥10%", icer: 37000, evidence: "Moderate", basis: "Pandya et al. Microsimulation; 4.0% threshold ≈$81,000/QALY and 3.0% ≈$140,000/QALY.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4797634/" },
  { id: 3, title: "PCSK9 inhibitor (evolocumab) for atherosclerotic CVD", journal: "JAMA", year: 2016, condition: "Cardiovascular", intervention: "PCSK9 inhibitor added to statin", icer: 414000, evidence: "Moderate", basis: "Kazi et al. At the 2015 list price (~$14,350/yr); cost-effective below $100,000/QALY only at ≤$4,536/yr. FH population: $503,000/QALY.", url: "https://pubmed.ncbi.nlm.nih.gov/27533159/" },
  { id: 4, title: "Sacubitril/valsartan for heart failure with reduced EF", journal: "JAMA Cardiology", year: 2016, condition: "Cardiovascular", intervention: "Sacubitril/valsartan vs enalapril", icer: 45017, evidence: "High", basis: "Gaziano et al. Markov model on PARADIGM-HF; sensitivity range $35,357–$75,301/QALY.", url: "https://jamanetwork.com/journals/jamacardiology/fullarticle/2529725" },
  { id: 5, title: "Pharmacist-led hypertension care in Black barbershops", journal: "Circulation", year: 2021, condition: "Cardiovascular", intervention: "LA Barbershop BP Study program", icer: 42717, evidence: "High", basis: "Bryant et al. 10-year model of the LABBPS trial, health-sector perspective; $17,162/QALY with generic drugs only.", url: "https://pubmed.ncbi.nlm.nih.gov/33855861/" },
  { id: 6, title: "Low-dose CT lung cancer screening (NLST)", journal: "NEJM", year: 2014, condition: "Oncology", intervention: "LDCT vs chest radiography", icer: 81000, evidence: "High", basis: "Black et al. Within-trial NLST analysis; 95% CI $52,000–$186,000/QALY; highly sensitive to CT cost and smoking status.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4335305/" },
  { id: 7, title: "Colorectal screening from age 45 — colonoscopy", journal: "Gastroenterology", year: 2019, condition: "Oncology", intervention: "Start colonoscopy at 45 vs 50", icer: 33900, evidence: "Moderate", basis: "Ladabaum et al. Markov model; raising screening to 80% at ages 50–75 averts ~3× more deaths at one-third the incremental cost.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7161092/" },
  { id: 8, title: "Colorectal screening from age 45 — FIT", journal: "Gastroenterology", year: 2019, condition: "Oncology", intervention: "Start annual FIT at 45 vs 50", icer: 7700, evidence: "Moderate", basis: "Ladabaum et al., same model as above.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7161092/" },
  { id: 9, title: "Tisagenlecleucel (CAR-T) for relapsed/refractory pediatric B-ALL", journal: "JAMA Pediatrics", year: 2018, condition: "Oncology", intervention: "Tisagenlecleucel vs clofarabine", icer: 46000, evidence: "Moderate", basis: "Whittington et al. (ICER-funded); scenario range $37,000–$78,000/QALY; single-arm trial evidence.", url: "https://doi.org/10.1001/jamapediatrics.2018.2530" },
  { id: 10, title: "Onasemnogene abeparvovec (gene therapy) for SMA type 1", journal: "ICER report", year: 2019, condition: "Rare Disease", intervention: "Gene therapy vs best supportive care", icer: 243000, evidence: "Moderate", basis: "ICER SMA final report at a $2M placeholder price; $139,000/QALY vs nusinersen.", url: "https://icer.org/news-insights/press-releases/sma_evidence_report" },
  { id: 11, title: "Lifestyle intervention for diabetes prevention (DPP)", journal: "Ann Intern Med", year: 2005, condition: "Diabetes", intervention: "Intensive lifestyle vs placebo", icer: 8800, evidence: "High", basis: "Herman et al. Lifetime model on DPP trial data, societal perspective; lifestyle dominated metformin.", url: "https://pubmed.ncbi.nlm.nih.gov/15738451/" },
  { id: 12, title: "Metformin for diabetes prevention (DPP)", journal: "Ann Intern Med", year: 2005, condition: "Diabetes", intervention: "Metformin vs placebo", icer: 29900, evidence: "High", basis: "Herman et al., same lifetime model, societal perspective.", url: "https://pubmed.ncbi.nlm.nih.gov/15738451/" },
  { id: 13, title: "Injectable semaglutide for obesity", journal: "ICER report", year: 2025, condition: "Endocrine", intervention: "Semaglutide + lifestyle vs lifestyle", icer: 66355, evidence: "Moderate", basis: "ICER final report (Dec 2025) at an estimated net price of $6,830/yr; budget impact large — <1% of eligible patients treatable before ICER's threshold.", url: "https://icer.org/assessment/obesity-2025/" },
  { id: 14, title: "Tirzepatide for obesity", journal: "ICER report", year: 2025, condition: "Endocrine", intervention: "Tirzepatide + lifestyle vs lifestyle", icer: 57779, evidence: "Moderate", basis: "ICER final report (Dec 2025) at an estimated net price of $7,973/yr.", url: "https://icer.org/assessment/obesity-2025/" },
  { id: 15, title: "Methadone for opioid use disorder", journal: "JAMA Psychiatry", year: 2021, condition: "Substance Use", intervention: "Methadone vs no treatment", icer: 16000, evidence: "Moderate", basis: "Fairley et al. Health-care-sector costs; every form of medication treatment was cost-saving once criminal-justice costs were included.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8014209/" },
  { id: 16, title: "Buprenorphine + naloxone distribution + contingency management", journal: "JAMA Psychiatry", year: 2021, condition: "Substance Use", intervention: "Buprenorphine with OEND and CM", icer: 42000, evidence: "Moderate", basis: "Fairley et al., health-care-sector perspective, incremental on the efficiency frontier.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8014209/" },
  { id: 17, title: "Naloxone distribution to people who use heroin", journal: "Ann Intern Med", year: 2013, condition: "Substance Use", intervention: "Lay naloxone kits vs none", icer: 438, evidence: "Moderate", basis: "Coffin & Sullivan. Markov model; 95% CI $48–$1,706/QALY; worst case ~$14,000/QALY.", url: "https://pubmed.ncbi.nlm.nih.gov/23277895/" },
  { id: 18, title: "Collaborative care for late-life depression (IMPACT)", journal: "Am J Manag Care", year: 2008, condition: "Mental Health", intervention: "Collaborative care vs usual care", icer: null, evidence: "High", basis: "Unützer et al. RCT follow-up: 4-year total costs $29,422 vs $32,785 (87% probability of lower cost) with better depression outcomes; data from 2 of 8 sites.", url: "https://www.ajmc.com/view/feb08-2835p095-100" },
  { id: 19, title: "Hospital-level care at home", journal: "Ann Intern Med", year: 2020, condition: "Acute Care", intervention: "Home hospital vs inpatient admission", icer: null, evidence: "High", basis: "Levine et al. RCT (n=91): 38% lower direct cost, fewer tests and consults, lower 30-day readmissions. Small trial.", url: "https://pubmed.ncbi.nlm.nih.gov/31842232/" },
  { id: 20, title: "Community health worker program (IMPaCT)", journal: "Health Affairs", year: 2020, condition: "Social Needs", intervention: "Standardized CHW support vs usual care", icer: null, evidence: "High", basis: "Kangovi et al. ROI from RCT outcomes: $2.47 returned to Medicaid per $1 within a year, mainly from fewer admissions. Specific to IMPaCT.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8564553/" },
  { id: 21, title: "Routine childhood immunization schedule (9 vaccines)", journal: "Pediatrics", year: 2014, condition: "Preventive", intervention: "Routine schedule vs no vaccination", icer: null, evidence: "Moderate", basis: "Zhou et al. 2009 US birth cohort: net savings $13.5B direct, $68.8B societal; ~42,000 early deaths prevented.", url: "https://pubmed.ncbi.nlm.nih.gov/24590750/" },
  { id: 22, title: "Recombinant zoster vaccine starting at age 50", journal: "JAMA Intern Med", year: 2018, condition: "Preventive", intervention: "RZV at 50 per ACIP", icer: 151430, evidence: "Moderate", basis: "Le & Rothberg. Falls below $100,000/QALY from age ~53 and below $50,000 from ~57; 23% probability cost-effective at 50.", url: "https://pubmed.ncbi.nlm.nih.gov/29987323/" },
  { id: 23, title: "One-time hepatitis C screening of all adults", journal: "Clin Infect Dis", year: 2018, condition: "Infectious Disease", intervention: "Universal screening ≥18 vs birth-cohort", icer: 28000, evidence: "Moderate", basis: "Barocas et al. HEP-CE simulation; incremental to birth-cohort screening.", url: "https://doi.org/10.1093/cid/ciy098" },
  { id: 24, title: "Sofosbuvir-based hepatitis C treatment", journal: "Ann Intern Med", year: 2015, condition: "Infectious Disease", intervention: "Sofosbuvir regimens vs interferon-based care", icer: 55400, evidence: "Moderate", basis: "Chhatwal et al. Subgroup range $9,700–$284,300/QALY; authors judged it cost-effective but unaffordable at 2015 prices.", url: "https://pubmed.ncbi.nlm.nih.gov/25775312/" },
  { id: 25, title: "Routine HIV screening every 5 years", journal: "NEJM", year: 2005, condition: "Infectious Disease", intervention: "Repeat screening vs one-time screening", icer: 57100, evidence: "Moderate", basis: "Sanders et al. Population with 1% prevalence; published alongside Paltiel et al., which reached the same conclusion.", url: "https://pubmed.ncbi.nlm.nih.gov/15703422/" },
];

/** Thresholds match the legend shown above the table. */
function verdictFor(icer: number | null): Verdict {
  if (icer === null || icer < 0) return "dominant";
  if (icer < 50000) return "highly-effective";
  if (icer <= 150000) return "cost-effective";
  if (icer <= 200000) return "borderline";
  return "not-effective";
}

const CEA_YEAR_MIN = Math.min(...CEA_STUDIES.map((s) => s.year));
const CEA_YEAR_MAX = Math.max(...CEA_STUDIES.map((s) => s.year));

// ─── CMMI Models ──────────────────────────────────────────────────────────────

const CMMI_MODELS: CMMIModel[] = [
  { id: 1, name: "MSSP (Shared Savings Program)", status: "Active", start: 2012, end: null, type: "ACO", savings: "About $2.5B savings in 2024 (476 ACOs, 10.3M beneficiaries), a record (CMS)", lesson: "Largest ACO program; one-sided risk drove modest savings; Enhanced track showing better results. The MSSP has evolved through multiple rule updates, with each iteration pushing participants toward greater financial risk. Two-sided risk models consistently outperform basic tracks on savings generation, though attribution methodology remains a point of contention among ACO operators." },
  { id: 2, name: "Next Generation ACO Model", status: "Ended", start: 2016, end: 2021, type: "ACO", savings: "Mixed — some savings, high admin burden", lesson: "Too complex; replaced by ACO REACH with simpler design. The NextGen model required participants to assume nearly full financial risk, limiting adoption to large, well-capitalized health systems. Administrative reporting requirements were identified as a major barrier; CMS has incorporated these lessons into the streamlined ACO REACH design." },
  { id: 3, name: "ACO REACH", status: "Active", start: 2023, end: 2026, type: "ACO", savings: "Early stage", lesson: "Successor to Direct Contracting; emphasizes health equity; global risk option. ACO REACH introduced mandatory health equity plans and beneficiary engagement requirements; CMS rolled back the health-equity plan requirement in 2025. Early participants include a mix of physician-led and hospital-anchored organizations. ACO REACH ends after performance year 2026; CMS's LEAD model succeeds it in January 2027." },
  { id: 4, name: "BPCI-Advanced", status: "Ended", start: 2018, end: 2025, type: "Episode", savings: "About $800M net Medicare savings over 8 model years (final evaluation)", lesson: "Episode-based model for high-volume procedures and medical conditions. Its final evaluation estimated about $800 million in net Medicare savings across eight model years, concentrated after mid-model design changes, but CMS judged it did not meet the criteria for expansion and carried its lessons into the mandatory TEAM model (from January 2026). Convener organizations emerged as key intermediaries enabling smaller facilities to participate. The model ended December 31, 2025." },
  { id: 5, name: "Comprehensive Primary Care Plus (CPC+)", status: "Ended", start: 2017, end: 2021, type: "Primary Care", savings: "Modest quality improvement, no net savings", lesson: "Practice transformation takes longer than 5 years; insufficient payment for transformation. CPC+ was the largest primary care model ever tested, yet the evaluation found negligible Medicare savings despite measurable quality improvements. The fundamental tension between transformation timeline and model duration has informed subsequent primary care model designs including Making Care Primary." },
  { id: 6, name: "Primary Care First", status: "Ended", start: 2021, end: 2025, type: "Primary Care", savings: "Early stage", lesson: "Simplified payment; serious illness population option. PCF introduced a flat primary care fee structure designed to reward comprehensiveness over visit volume. The Serious Illness Population track specifically targets high-need patients who would otherwise face fragmented care across multiple specialists. CMS ended the model early, on December 31, 2025." },
  { id: 7, name: "Kidney Care Choices (KCC)", status: "Active", start: 2022, end: 2027, type: "Specialty", savings: "See CMS evaluations", lesson: "Kidney-care accountable entities for people with late-stage chronic kidney disease and ESRD. In 2025 CMS extended the model one year, through 2027, revised its financial methodology from performance year 2026, ended the transplant bonus, and terminated the Kidney Care First option early (December 31, 2025)." },
  { id: 8, name: "Enhancing Oncology Model (EOM)", status: "Active", start: 2023, end: null, type: "Specialty", savings: "Early stage", lesson: "Successor to OCM; 6 cancer types; health equity requirements. EOM narrowed the cancer type scope compared to OCM, focusing on high-volume, high-cost chemotherapy episodes. Mandatory SDOH screening and navigator requirements represent a significant advance over the original Oncology Care Model's optional equity provisions." },
  { id: 9, name: "Oncology Care Model (OCM)", status: "Ended", start: 2016, end: 2022, type: "Specialty", savings: "Modest quality improvement; no net savings", lesson: "High complexity; chemotherapy costs difficult to control; lessons inform EOM. OCM demonstrated that episode-based payments can improve care coordination for cancer patients but that chemotherapy drug costs — largely outside physician control — dominate episode spending variation, making savings targets structurally difficult to achieve." },
  { id: 10, name: "CHART (Community Health Access and Rural Transformation)", status: "Ended", start: 2021, end: 2023, type: "State/Rural", savings: "Ended before capitated payments began", lesson: "Planned to give rural hospitals a predictable capitated payment and regulatory flexibilities through a Community Transformation Track. CMS awarded four lead organizations in 2021 (Alabama, South Dakota, Texas, Washington) and dropped the ACO Transformation Track. CMS ended the model early, on September 30, 2023, citing stakeholder feedback and a lack of hospital participation — a direct precedent for how hard voluntary rural global budgets are to fill." },
  { id: 11, name: "Emergency Triage, Treat & Transport (ET3)", status: "Ended", start: 2021, end: 2023, type: "Specialty", savings: "Inconclusive", lesson: "Ambulance alternatives (telehealth, community care) promising but operationally complex. ET3 allowed ambulance providers to bill Medicare for treatment-in-place and referral to non-ED settings, addressing a long-standing regulatory barrier. Implementation was hampered by state EMS scope-of-practice laws and 911 dispatch limitations that CMS lacked authority to waive." },
  { id: 12, name: "Independence at Home", status: "Ended", start: 2012, end: 2023, type: "Primary Care", savings: "Final evaluation (2026): no conclusive evidence of Medicare savings", lesson: "Home-based primary care for frail, chronically ill beneficiaries, run for ten performance years (2012–2023) after Congress extended it. Annual reconciliations reported savings in several years, but CMS's final ten-year evaluation found no conclusive evidence of savings to Medicare — a reminder that year-by-year results and a full independent evaluation can tell different stories." },
  { id: 13, name: "Radiation Oncology Model", status: "Cancelled", start: null, end: null, type: "Specialty", savings: "Never launched", lesson: "Cancelled after stakeholder opposition; site-neutral pricing politically contentious. The Radiation Oncology Model was finalized and then shelved following opposition from radiation oncology societies and hospital systems concerned about site-neutral payment reductions. The episode underscores the political dynamics of mandatory vs. voluntary participation design choices." },
  { id: 14, name: "Integrated Care for Kids (InCK)", status: "Active", start: 2020, end: 2026, type: "State/Pediatric", savings: "Evaluation pending", lesson: "Child-focused state model integrating physical health, behavioral health and social services for children in Medicaid and CHIP. In 2025 CMS announced it would downsize the model; it is scheduled to run through 2026." },
  { id: 15, name: "Vermont All-Payer ACO Model", status: "Ended", start: 2017, end: 2025, type: "State/All-Payer", savings: "Mixed early results", lesson: "Unique state all-payer ACO model built on OneCare Vermont. Participation was voluntary for providers and payers, and Blue Cross Blue Shield of Vermont's exit undercut its all-payer scale. Hospitals received fixed prospective payments through OneCare rather than statutory global budgets; Vermont's mandatory global budgets come later, under Act 68. The agreement sunset December 31, 2025, and OneCare Vermont wound down with it." },
  { id: 16, name: "Pennsylvania Rural Health Model", status: "Ended", start: 2019, end: 2024, type: "State/Rural", savings: "Mixed — steadier revenue for some hospitals; little measured change in spending", lesson: "Global budget for rural hospitals across multiple payers. Pennsylvania's model set prospective annual budgets for participating rural hospitals to remove fee-for-service volume pressure. Participation stayed well below the original target, and evaluations found little measurable change in utilization or spending, though some hospitals reported steadier revenue. The model concluded December 31, 2024." },
  { id: 17, name: "Making Care Primary (MCP)", status: "Ended", start: 2024, end: 2025, type: "Primary Care", savings: "Very early stage", lesson: "Next-generation primary care; 10-year track; VBC progression pathway. MCP establishes a multi-year pathway for primary care practices to advance from infrastructure support to full prospective population payments. The 10-year timeline directly addresses the criticism of shorter models that transformation cannot be achieved within a 5-year contract period. CMS ended MCP early, on December 31, 2025 — so that 10-year pathway was never tested." },
  { id: 18, name: "AHEAD (State Total Cost of Care)", status: "Active", start: 2024, end: 2035, type: "State/All-Payer", savings: "Very early stage", lesson: "Multi-payer state total cost of care model: hospital global budgets, Primary Care AHEAD, and a state cooperative agreement of up to $12M. Renamed Achieving Healthcare Efficiency through Accountable Design (originally States Advancing All-Payer Health Equity Approaches and Development) in September 2025, when CMS also set the end date for all cohorts at December 31, 2035. Current participants: Maryland (Cohort 1, performance from January 2026); Connecticut and Hawaii (Cohort 2); Rhode Island and a downstate New York region (Cohort 3) — Cohort 2 and 3 performance begins January 2028. Vermont signed in January 2025 and withdrew in July 2026 after CMS renegotiation capped its expected EAST Fund near $10M." },
  { id: 19, name: "Transforming Maternity Care", status: "Active", start: 2025, end: null, type: "Specialty", savings: "Very early stage", lesson: "State Medicaid and CHIP maternity model launched January 2025 in 15 states. It funds state Medicaid agencies to improve maternity care access, workforce (including midwives and doulas) and quality, with payment incentives tied to outcomes. Results are not yet available." },
  { id: 20, name: "GUIDE (Dementia Care)", status: "Active", start: 2024, end: null, type: "Specialty", savings: "Very early stage", lesson: "Comprehensive dementia care; caregiver support; community navigation. GUIDE establishes a comprehensive care model for people living with dementia and their caregivers, addressing a population historically underserved by structured care coordination. Monthly care management payments support a dementia care specialist model that integrates clinical management with community navigation and caregiver respite services." },
  { id: 21, name: "Maryland Total Cost of Care Model", status: "Ended", start: 2019, end: 2025, type: "State/All-Payer", savings: "See CMS model evaluations", lesson: "Successor to the Maryland All-Payer Model (2014–2018), built on the Health Services Cost Review Commission's all-payer hospital rate setting: hospital global budgets plus a Medicare total cost of care target for the whole state. CMS announced in March 2025 that it would end the model on December 31, 2025, a year early; Maryland moved into AHEAD (Cohort 1, signed October 2024) with its first performance year in January 2026. The closest operating precedent for Vermont's Act 68 hospital global budgets — and the difference is the 1977-era rate-setting authority Vermont does not have." },
];

// ─── Policy Briefs ────────────────────────────────────────────────────────────

// Rebuilt 2026-11-23 from sources opened that day (see each brief's `sources`). The earlier
// set carried unsourced and wrong figures (e.g. a federal PA law that was never enacted, an HRSA
// shortage figure HRSA never published, a Vermont "all-payer rate" system that does not exist).
// Rule for edits: a number goes in only with a source in the same brief; if it can't be sourced,
// it comes out. Each brief is dated by `asOf`.
const POLICY_BRIEFS: PolicyBrief[] = [
  {
    id: 1,
    title: "All-Payer Claims Databases After Gobeille",
    area: "Health IT",
    asOf: "November 2026",
    stat: "Gobeille (2016): states cannot compel self-funded ERISA plans to report claims",
    abstract: "Roughly two dozen states now run an all-payer claims database (APCD), but every one of them has a structural hole: since Gobeille v. Liberty Mutual, self-funded employer plans report only voluntarily. Vermont's VHCURES — the database at the centre of that case — is the analytic backbone of the state's price and utilization work.",
    body: "An APCD pools medical and pharmacy claims from commercial insurers, Medicaid and, where obtainable, Medicare into one statewide dataset. Counts differ by definition: the APCD Council's figures, as reported by the Milbank Memorial Fund, put established state APCDs at about two dozen.\n\nIn Gobeille v. Liberty Mutual (2016) the Supreme Court held that ERISA pre-empts Vermont's reporting requirement as applied to self-funded employer plans. Every state APCD therefore depends on voluntary submission for that segment of the commercial market, which limits how 'all-payer' any of them can be.\n\nIn Vermont, VHCURES is run by the Green Mountain Care Board. Claims are collected quarterly with roughly a six-month run-out, so the most recent quarters are always incomplete — the reason published AHS measures typically trail by about two years. VHCURES is claims data; Vermont's clinical health information exchange (VITL) is a separate system and does not carry it.\n\nImplication for transformation leaders: APCD findings are strongest for fully insured, Medicaid and Medicare populations. Any price or utilization benchmark built on them should state which self-funded lives are missing.",
    sources: [
      { label: "Milbank Memorial Fund — five-state APCD collaboration (Jan 2026)", url: "https://www.milbank.org/2026/01/a-five-state-all-payer-claims-database-collaboration-onpoint-health-datas-multi-state-behavioral-health-initiative/" },
      { label: "Gobeille v. Liberty Mutual Ins. Co., 577 U.S. 312 (2016)", url: "https://supreme.justia.com/cases/federal/us/577/312/" },
      { label: "HTR book, Chapter 4 (VHCURES and VITL)", url: "/read/chapter-04" },
    ],
  },
  {
    id: 2,
    title: "Medicaid and Marketplace Coverage After H.R. 1",
    area: "Access",
    asOf: "November 2026",
    stat: "CMS projects 2.3 million fewer Medicaid enrollees in FY2027 from work requirements",
    abstract: "The 2025 reconciliation law's Medicaid community-engagement requirement must be enforced by January 1, 2027, under a CMS interim final rule issued June 1, 2026. At the same time, the ACA's enhanced premium tax credits expired at the end of 2025. Both shrink coverage; neither has been reversed.",
    body: "Work requirements. CMS's interim final rule (CMS-2454-IFC), published June 3, 2026, requires expansion adults to show 80 hours a month of work, education, community service or a work program — or income equal to 80 hours at the federal minimum wage. Statutory exemptions include pregnant and postpartum people, the medically frail and caregivers. States must enforce by January 1, 2027. CMS's own impact estimate is a 2.3 million reduction in enrollment in FY2027, rising to 3.1–3.3 million a year after that. Vermont begins on January 1, 2027.\n\nThe coverage gap. In the ten states that have not expanded Medicaid, KFF estimates (July 2026, 2024 data) that 1.2 million adults fall into the gap between Medicaid eligibility and Marketplace subsidies. KFF notes the gap is unlikely to close: the 2025 law makes new expansions less likely.\n\nMarketplace subsidies. The enhanced premium tax credits first enacted in the American Rescue Plan expired at the end of 2025 and, as of November 2026, had not been extended; open enrollment for 2027 runs under the original rules, with the subsidy cliff at 400% of the poverty level.\n\nImplication: hospitals' uncompensated care and payer mix move in the wrong direction at the same moment Vermont's Act 68 budgets tighten — a sequencing risk the book treats in Chapter 3.",
    sources: [
      { label: "CMS fact sheet — Medicaid Community Engagement IFC (CMS-2454-IFC)", url: "https://www.cms.gov/newsroom/fact-sheets/medicaid-community-engagement-requirement-certain-individuals-interim-final-rule-comment-period-cms" },
      { label: "AHA News — CMS issues interim final rule (June 1, 2026)", url: "https://www.aha.org/news/headline/2026-06-01-cms-issues-interim-final-rule-medicaid-community-engagement-requirements" },
      { label: "KFF — The coverage gap (2026 update)", url: "https://www.kff.org/medicaid/issue-brief/the-coverage-gap-uninsured-poor-adults-in-states-that-do-not-expand-medicaid/" },
      { label: "KFF — 2026 Marketplace enrollment, premiums and deductibles", url: "https://www.kff.org/affordable-care-act/what-we-know-so-far-about-2026-aca-marketplace-enrollment-premiums-and-deductibles/" },
    ],
  },
  {
    id: 3,
    title: "Site-Neutral Payment: Where Medicare Has Moved",
    area: "Payment Reform",
    asOf: "November 2026",
    stat: "From Jan 1, 2026, off-campus drug administration is paid at 40% of the OPPS rate",
    abstract: "Medicare has extended site-neutral payment one service line at a time. The CY2026 outpatient rule pays the physician-fee-schedule-equivalent rate for drug administration at grandfathered off-campus hospital departments — roughly a 60% cut for those services — with rural sole community hospitals exempt.",
    body: "What changed. The CY2026 OPPS final rule (November 2025) applies the physician-fee-schedule-equivalent rate — 40% of the OPPS rate — to drug administration services furnished in excepted off-campus provider-based departments, starting January 1, 2026. Rural sole community hospitals are exempt. CMS projected $290 million lower OPPS spending in 2026: $220 million to Medicare and $70 million in lower beneficiary coinsurance. KFF reports a CMS estimate of about $8 billion in Medicare savings over 2025–2034.\n\nThe argument. Medicare pays more for the same service in a hospital outpatient department than in a physician office, and that differential rewards hospital acquisition of practices. Hospitals answer that outpatient revenue cross-subsidizes emergency, psychiatric and standby capacity that communities need — especially in rural markets.\n\nVermont context. Medicare's site-neutral rules do not touch commercial prices, which is where Vermont's gap is widest: GMCB analysis puts commercial hospital prices at roughly 250–300% of Medicare on average, with outpatient prices ranging from 279% to 697% of Medicare across hospitals. Act 68's reference-based pricing — methodology by rule in 2027, maximum rates from hospital fiscal year 2028 — is the state's commercial counterpart.",
    sources: [
      { label: "CMS fact sheet — CY2026 OPPS/ASC final rule (Nov 21, 2025)", url: "https://www.cms.gov/newsroom/fact-sheets/calendar-year-2026-hospital-outpatient-prospective-payment-system-opps-ambulatory-surgical-center" },
      { label: "KFF — The Trump Administration moves forward with site-neutral payment reform", url: "https://www.kff.org/quick-take/the-trump-administration-moves-forward-with-medicare-site-neutral-payment-reform/" },
      { label: "GMCB — Hospital reference-based pricing", url: "https://gmcboard.vermont.gov/hospital-reference-based-pricing" },
    ],
  },
  {
    id: 4,
    title: "Interoperability in 2026: TEFCA at Scale",
    area: "Health IT",
    asOf: "November 2026",
    stat: "11 designated QHINs under TEFCA (2026)",
    abstract: "TEFCA has moved from framework to working network: eleven Qualified Health Information Networks are designated, including Epic Nexus, Oracle Health and Surescripts. The binding constraint has shifted from whether data can move nationally to whether it arrives complete and usable.",
    body: "The network. TEFCA's Recognized Coordinating Entity (the Sequoia Project) lists eleven designated QHINs in 2026: eHealth Exchange, CommonWell, Epic Nexus, Health Gorilla, Kno2, KONZA, MedAllies, Surescripts, Oracle Health, eClinicalWorks and Netsmart. ASTP/ONC's own history of TEFCA describes the growth in exchange volume since live exchange began.\n\nThe standards floor. Under ONC's HTI-1 rule, certified health IT had to support USCDI version 3 — which adds standardized demographic and social-needs data elements — by January 1, 2026. That raises what an exchanged record can contain; it does not guarantee the fields are filled.\n\nVermont context. Vermont's clinical exchange is VITL; claims sit separately in VHCURES. Act 68's Unified Health Data Space allows clinical–claims integration no earlier than January 1, 2027, and only on a majority vote of the HIE Steering Committee — a governance gate, not a technical one.\n\nImplication: for a state reform, national exchange is no longer the bottleneck. Data completeness, identity matching and governance of linked clinical–claims data are.",
    sources: [
      { label: "Sequoia Project (TEFCA RCE) — FAQs and QHIN list", url: "https://rce.sequoiaproject.org/rce/faqs/" },
      { label: "ASTP/ONC — The history and growth of TEFCA", url: "https://healthit.gov/resources/data-liquidity-affordability-and-access-the-history-growth-of-tefca/" },
      { label: "Healthcare Dive — Oracle Health designated a QHIN", url: "https://www.healthcaredive.com/news/oracle-health-qhin-designation-tefca/806217/" },
      { label: "HTR book, Chapters 4–5", url: "/read/chapter-04" },
    ],
  },
  {
    id: 5,
    title: "Medicare Advantage Payment Accuracy",
    area: "Payment Reform",
    asOf: "November 2026",
    stat: "MedPAC: MA spending ~14% above fee-for-service in 2026 (≈$76 billion)",
    abstract: "MedPAC's March 2026 report estimates Medicare spends about 14% more for Medicare Advantage enrollees than it would in traditional Medicare — about $76 billion in 2026 — driven mainly by favorable selection, with coding intensity adding the rest. The federal audit tool meant to claw back unsupported coding is tied up in court.",
    body: "Size. In 2025 Medicare Advantage covered 34.9 million beneficiaries — 55% of those with Parts A and B — and Medicare paid plans an estimated $537 billion, excluding Part D (MedPAC, March 2026). MedPAC estimates MA spending about 14% above FFS in 2026, a projected $76 billion: favorable selection raises payments about 11% above FFS, and higher coding intensity makes MA risk scores about 4% higher than for similar FFS beneficiaries. Part B premiums, paid by all beneficiaries, are about $11 billion higher in 2026 as a result. A year earlier MedPAC had projected 20% (about $84 billion) for 2025; insurers dispute the methodology.\n\nAudits. A federal district court in Texas vacated CMS's 2023 risk-adjustment data validation (RADV) rule on September 25, 2025, in a case brought by Humana, on procedural grounds. CMS appealed; as of late 2026 the appeal was pending in the Fifth Circuit.\n\nImplication for states: MA penetration determines how much of the Medicare population a state reform can reach through traditional Medicare models — one reason Medicare participation in Vermont's Act 68 global budgets remains unresolved after the AHEAD withdrawal.",
    sources: [
      { label: "MedPAC — March 2026 Report to the Congress (press release)", url: "https://www.medpac.gov/wp-content/uploads/2026/03/March_2026_MedPAC_Report_Press_Release_SEC.pdf" },
      { label: "MedPAC — March 2025 Report, Ch. 11 (MA status)", url: "https://medpac.gov/wp-content/uploads/2025/03/Mar25_Ch11_MedPAC_Report_To_Congress_SEC.pdf" },
      { label: "Crowell & Moring — Court vacates CMS's 2023 RADV final rule", url: "https://www.crowell.com/en/insights/client-alerts/court-vacates-cmss-2023-final-rule-on-radv-audits" },
    ],
  },
  {
    id: 6,
    title: "Vermont Hospital Budgets and the Road to Global Budgets",
    area: "State Policy",
    asOf: "November 2026",
    stat: "FY2027 budget orders cut commercial rates 2.9% statewide (GMCB, Sept 2026)",
    abstract: "Vermont does not have Maryland-style all-payer rate setting. The Green Mountain Care Board sets each hospital's annual budget and commercial rate changes; Medicare and Medicaid pay their own rates. Act 68 of 2025 moves the state toward reference-based prices and hospital global budgets — on state authority, now that Vermont has withdrawn from AHEAD.",
    body: "What exists today. The GMCB reviews and approves each hospital's budget every year. Its FY2027 orders, issued in September 2026, cut commercial rates by 2.9% statewide. The board's analysis puts Vermont commercial hospital prices at roughly 250–300% of Medicare on average. Enforcement has teeth but is negotiated: after UVM Medical Center exceeded its FY2023 budget by $80.3 million, a 2025 settlement spread the remaining reductions over FY2026–FY2027.\n\nWhat Act 68 adds. Reference-based pricing: the GMCB sets the methodology by rule in 2027, with maximum commercial rates effective in hospital fiscal year 2028. Global budgets: beginning no later than HFY2028 for one or more hospitals that are not critical access hospitals, and all hospitals by HFY2030 — each 'to the extent resources are available'. Global budgets are to include Medicare where federal law permits and, by statute, exclude Medicaid.\n\nWhat changed in 2026. Vermont withdrew from the federal AHEAD model in July 2026 after CMS's renegotiation cut the expected EAST Fund from about $138 million to a cap near $10 million. The same month CMS told the state its Medicaid hospital global budget, launched January 2026, was not approved under the Global Commitment waiver, and those payments stopped. Medicare and Medicaid alignment must now be rebuilt.\n\nThe comparison that matters: Maryland's Health Services Cost Review Commission has set all-payer hospital rates since the 1970s; Vermont is attempting global budgets without that authority.",
    sources: [
      { label: "GMCB — press releases (FY27 hospital budgets, Sept 15, 2026)", url: "https://gmcboard.vermont.gov/press-releases" },
      { label: "Act 68 of 2025, as enacted", url: "https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf" },
      { label: "HTR book, Chapter 6 (Economics pillar; AHEAD withdrawal)", url: "/read/chapter-06" },
    ],
  },
  {
    id: 7,
    title: "AI in Health Care: The Federal Picture",
    area: "Health IT",
    asOf: "November 2026",
    stat: "1,614 devices on FDA's AI-Enabled Medical Device List (Sept 2026)",
    abstract: "FDA authorizes AI as a medical device product by product — 1,614 devices on its public list as of September 2026, most of them radiology tools cleared through 510(k). Outside that device pathway, oversight is split: CMS governs AI in coverage decisions, ONC governs transparency in certified health IT, and states are writing their own rules.",
    body: "Devices. FDA's AI-Enabled Medical Device List held 1,614 entries when it was updated on September 4, 2026. FDA itself cautions that the list is not comprehensive.\n\nCoverage decisions. In February 2024 CMS told Medicare Advantage plans that an algorithm may assist a coverage decision but cannot replace an individual assessment of the patient's circumstances. In traditional Medicare, CMS's WISeR model — running in Arizona, New Jersey, Ohio, Oklahoma, Texas and Washington from January 2026 through 2031 — uses technology vendors, including AI tools, for prior authorization of selected services.\n\nInternationally, the EU AI Act's high-risk obligations for most health uses have been pushed back: the 2026 Digital Omnibus amendment sets 2 December 2027 for Annex III systems and 2 August 2028 for AI embedded in regulated products such as medical devices.\n\nImplication: a health system deploying AI cannot rely on any single regulator. Local governance — validation on its own population, bias monitoring, and clear clinical accountability — is the control that actually exists. The book's Chapter 5 sets out that governance model.",
    sources: [
      { label: "FDA — Artificial Intelligence-Enabled Medical Devices (list)", url: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices" },
      { label: "AAMC — CMS addresses use of AI in Medicare Advantage plans (Feb 2024 FAQ)", url: "https://aamc.org/advocacy-policy/washington-highlights/cms-addresses-use-ai-medicare-advantage-plans" },
      { label: "Congressional Research Service — Overview of the WISeR Model (IF13133)", url: "https://www.congress.gov/crs-product/IF13133" },
      { label: "HTR book, Chapter 5 (AI governance)", url: "/read/chapter-05" },
    ],
  },
  {
    id: 8,
    title: "Prior Authorization: The 2026–2027 Federal Deadlines",
    area: "Payment Reform",
    asOf: "November 2026",
    stat: "From Jan 1, 2026: 72-hour urgent and 7-day standard decisions (CMS-0057-F)",
    abstract: "CMS's Interoperability and Prior Authorization final rule (CMS-0057-F, January 2024) put the first federal clocks on prior authorization. Its decision deadlines and denial-reason requirements took effect January 1, 2026; the FHIR-based prior authorization APIs follow in January 2027.",
    body: "The rule. For Medicare Advantage, Medicaid and CHIP, and Marketplace plans on the federal exchange, CMS-0057-F requires decisions within 72 hours for expedited requests and seven calendar days for standard requests, a specific reason for each denial, and public reporting of prior authorization metrics — all from January 1, 2026. Electronic, FHIR-based prior authorization APIs are required from January 1, 2027.\n\nThe burden. In the AMA's survey released in June 2024, 24% of physicians reported that prior authorization had led to a serious adverse event for a patient in their care, and 94% said it delays access to care.\n\nThe counter-trend. In traditional Medicare, which has historically used little prior authorization, CMS's WISeR model began requiring it for selected services in six states in January 2026.\n\nImplication for Vermont: the federal deadlines bind MA, Medicaid and federal-exchange plans, not every commercial plan; state law governs the rest.",
    sources: [
      { label: "AMA — Survey indicates prior authorization wreaks havoc on patient care (2024)", url: "https://www.ama-assn.org/press-center/ama-press-releases/ama-survey-indicates-prior-authorization-wreaks-havoc-patient-care" },
      { label: "CMS — Interoperability and Prior Authorization Final Rule (CMS-0057-F)", url: "https://www.cms.gov/priorities/key-initiatives/burden-reduction/interoperability/policies-and-regulations/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f" },
      { label: "KFF — Examining the potential impact of Medicare's WISeR model", url: "https://www.kff.org/medicare/examining-the-potential-impact-of-medicares-new-wiser-model/" },
    ],
  },
  {
    id: 9,
    title: "No Surprises Act: The Arbitration Surge",
    area: "Access",
    asOf: "November 2026",
    stat: "Providers won 88% of IDR payment decisions in the first half of 2025",
    abstract: "The No Surprises Act protects patients from most surprise out-of-network bills. The price of that protection is a federal arbitration (IDR) system whose volume keeps rising and whose outcomes increasingly favor providers — which pushes in-network rates, and premiums, upward.",
    body: "Patient protection. Since 2022 the Act bars balance billing for emergency care and for out-of-network clinicians at in-network facilities, limiting patients to in-network cost sharing.\n\nArbitration. Payment disputes between plans and out-of-network providers go to independent dispute resolution. Federal data show providers winning 81% of payment determinations in 2023, 85% in 2024 and 88% in the first half of 2025; in the second half of 2025, more than 1.37 million disputes were filed, 16% more than in the first half. Analyses also show wide variation in outcomes across arbitration entities.\n\nImplication: the IDR process was designed as a backstop and has become a high-volume pricing channel. For a state pursuing reference-based prices, out-of-network arbitration awards are a pressure point to watch.",
    sources: [
      { label: "Health Affairs Forefront — The NSA IDR process: an early look at 2025 data", url: "https://www.healthaffairs.org/content/forefront/no-surprises-act-idr-process-early-look-2025-data" },
      { label: "Healthcare Dive — No Surprises disputes continue to swell, CMS finds", url: "https://www.healthcaredive.com/news/no-surprises-act-disputes-increase-arbiters-progress-speed-backlog-cms/826011/" },
      { label: "Health Affairs Scholar — Arbitrators vary in provider win rates", url: "https://academic.oup.com/healthaffairsscholar/article/4/10/qxag265/8842563" },
    ],
  },
  {
    id: 10,
    title: "Physician Employment and Consolidation",
    area: "Market Structure",
    asOf: "November 2026",
    stat: "82% of physicians employed by hospitals or corporate entities (Jan 1, 2026)",
    abstract: "Independent practice is now the exception. The Physicians Advocacy Institute and Avalere find that 82% of US physicians were employed by hospitals or corporate entities — private equity, insurers and other corporations — as of January 1, 2026, up from 77.6% two years earlier.",
    body: "The numbers. As of January 1, 2026, 59.7% of physicians were employed by hospitals and 22.3% by corporate entities, for 82.0% in total; corporate entities now own a larger share of physician practices than hospitals do (PAI/Avalere, 2026). The 2024 edition of the same study put the total at 77.6%.\n\nWhy it matters for payment reform. Employment changes where services are billed — and Medicare's site-neutral policy (Brief 3) exists because hospital-based billing pays more for the same service. It also concentrates bargaining power in commercial price negotiations, the market Vermont's reference-based pricing targets.\n\nImplication: any reform that sets prices for hospitals but not for hospital-employed physician groups leaves a route for volume and revenue to move.",
    sources: [
      { label: "PAI/Avalere — Physician employment trends and practice acquisitions, 2018–2026", url: "https://www.physiciansadvocacyinstitute.org/PAI-Research/PAI-Avalere-Health-Report-on-Physician-Employment-Trends-and-Practice-Acquisitions-2018-2026" },
      { label: "Healthcare Dive — Corporate ownership of doctors growing (2024 edition)", url: "https://www.healthcaredive.com/news/doctor-corporate-ownership-growing-hospital-insurer-pai-avalere/712988/" },
    ],
  },
  {
    id: 11,
    title: "Rural Hospitals: Closures, Conversions, and the RHT Program",
    area: "Access",
    asOf: "November 2026",
    stat: "198 rural hospital closures and conversions since 2005 (Sheps Center)",
    abstract: "The Sheps Center counts 198 rural hospital closures and conversions since January 2005, not counting more than 50 hospitals that have become Rural Emergency Hospitals since 2023. The $50 billion Rural Health Transformation Program is now the largest federal response — $20 billion awarded across its first two years.",
    body: "Closures. The UNC Sheps Center tracks 198 rural closures and conversions since January 2005 — 110 complete closures and 88 converted closures. Its count excludes Rural Emergency Hospital (REH) conversions; KFF Health News, citing Sheps data, reported in July 2026 that more than 50 rural hospitals have converted to the REH designation since it took effect in January 2023.\n\nFinancial distress. Chartis's 2026 analysis found 41.2% of rural hospitals operating in the red; the Center for Healthcare Quality and Payment Reform estimates more than 700 rural hospitals at risk of closing, 294 of them immediately.\n\nFederal response. CMS awarded $10 billion for the Rural Health Transformation Program's second year on November 9, 2026, bringing awards to $20 billion. Vermont received $195,053,740 for FY2026 and $189,996,036 for FY2027. Earlier federal rural models did not scale: CMS ended the CHART model early, on September 30, 2023, citing a lack of hospital participation, and the Pennsylvania Rural Health Model concluded at the end of 2024.\n\nSee the platform's RHT Review for what each state has funded.",
    sources: [
      { label: "UNC Sheps Center — Rural hospital closures", url: "https://www.shepscenter.unc.edu/programs-projects/rural-health/rural-hospital-closures/" },
      { label: "KFF Health News — Earlier lifeline for rural hospitals faces test", url: "https://kffhealthnews.org/rural-health/rural-hospital-closures-emergency-conversion-model-congress-michigan/" },
      { label: "CMS — $10 billion in second-year RHT awards (Nov 9, 2026)", url: "https://www.cms.gov/newsroom/press-releases/trump-administration-announces-10-billion-second-year-rural-health-transformation-awards-all-50" },
      { label: "CMS — CHART Model (ended Sept 30, 2023)", url: "https://www.cms.gov/priorities/innovation/innovation-models/chart-model" },
      { label: "HTR — RHT Program Review", url: "/rht-review" },
    ],
  },
  {
    id: 12,
    title: "Health Equity Data: Standards Up, Federal Measures Down",
    area: "Health Equity",
    asOf: "November 2026",
    stat: "Personal health care provider: Hispanic Vermonters 78% vs 91% White (VDH, 2023–24)",
    abstract: "The data standards for measuring disparities improved — revised federal race and ethnicity standards in 2024, richer demographic fields in certified EHRs from 2026 — while several federal equity measures were withdrawn. States that want to close gaps now have to measure them themselves.",
    body: "Standards. OMB's revised Statistical Policy Directive No. 15 (March 2024) combines race and ethnicity into one question and adds a Middle Eastern or North African category; federal agencies have five years to comply. ONC's HTI-1 rule required certified health IT to support USCDI version 3, with expanded demographic and social-needs elements, by January 1, 2026.\n\nFederal retreat. CMS removed the hospital social-drivers-of-health screening measures in the FY2026 inpatient payment rule and cancelled the Medicare Advantage Health Equity Index reward.\n\nVermont's measurable gap. The Vermont Department of Health's BRFSS data for 2023–2024 show 91% of white Vermonters with a personal health care provider against 78% of Hispanic Vermonters — the only group statistically below the state rate. AHS's benchmark is 87%.\n\nImplication: with federal reporting incentives reduced, equity measurement in Vermont depends on state choices — the Equity Imperative the book applies to every pillar (Chapter 10).",
    sources: [
      { label: "OMB — Revisions to SPD 15 (Federal Register, March 29, 2024)", url: "https://www.federalregister.gov/documents/2024/03/29/2024-06469/revisions-to-ombs-statistical-policy-directive-no-15-standards-for-maintaining-collecting-and-presenting" },
      { label: "HTR book, Chapter 10 (Equity Imperative)", url: "/read/chapter-10" },
    ],
  },
  {
    id: 13,
    title: "Medicare Drug Price Negotiation: Two Cycles In",
    area: "Payment Reform",
    asOf: "November 2026",
    stat: "Second-cycle prices (from 2027): 15 drugs, ~44% lower cost to Medicare (CMS estimate)",
    abstract: "The Inflation Reduction Act's negotiation program is now operating. Negotiated prices for the first ten drugs took effect January 1, 2026; prices for fifteen more — including semaglutide (Ozempic, Wegovy, Rybelsus) — take effect January 1, 2027.",
    body: "First cycle. Negotiated prices for ten Part D drugs took effect January 1, 2026. The 2025 redesign of Part D also eliminated the coverage gap and capped beneficiaries' annual out-of-pocket drug spending, at $2,100 in 2026.\n\nSecond cycle. CMS announced prices for fifteen more drugs in November 2025, effective January 1, 2027. CMS estimates they cut Medicare's cost for those drugs by about 44% — roughly $12 billion a year against prior spending — and save Part D enrollees about $685 million out of pocket in 2027. Semaglutide's negotiated price is $274 a month. Press accounts using a different baseline report $8.5 billion (36%), so the savings figure depends on the comparison year.\n\nImplication: negotiated Medicare prices do not apply to commercial plans, but they create a public, drug-specific benchmark that state affordability boards and purchasers can reference.",
    sources: [
      { label: "CMS — Negotiated prices for initial price applicability year 2027 (infographic)", url: "https://www.cms.gov/files/document/infographic-negotiated-prices-ipay-2027.pdf" },
      { label: "KFF — Understanding the negotiated drug prices for Medicare", url: "https://www.kff.org/quick-take/understanding-the-trump-administrations-negotiated-drug-prices-for-medicare/" },
      { label: "STAT — Administration unveils new Medicare negotiated prices", url: "https://www.statnews.com/2025/11/25/trump-administration-unveils-new-medicare-negotiated-drug-prices/" },
    ],
  },
  {
    id: 14,
    title: "Nursing Workforce: The Shortage Narrows, the Rural Gap Does Not",
    area: "Workforce",
    asOf: "November 2026",
    stat: "HRSA: RN shortage 10% in 2027 easing to 6% in 2037; 13% in nonmetro areas",
    abstract: "HRSA's projections show the national registered-nurse shortage shrinking over the next decade — but staying twice as deep outside metropolitan areas, and much larger for licensed practical nurses. For a rural state, the national trend is not the planning number.",
    body: "Projections. HRSA's National Center for Health Workforce Analysis projects the RN shortage — demand minus supply, as a share of demand — narrowing from 10% in 2027 to 6% in 2037 nationally, but 13% in nonmetro areas in 2037. Shortages of licensed practical and vocational nurses are projected to be far larger. HRSA's December 2025 update extends projections to 2038.\n\nWhy the measure matters. HRSA's shortage percentages come from modeled supply and demand; they are sensitive to assumptions about utilization and about post-pandemic labour-market behaviour, which HRSA notes its data may not fully capture.\n\nImplication for Vermont: a rural, older state should plan to the nonmetro figure, not the national one. The book's Operations chapter (Chapter 11) treats workforce as a gating constraint on every care-model change.",
    sources: [
      { label: "HRSA — Nursing workforce projections fact sheet", url: "https://bhw.hrsa.gov/sites/default/files/bureau-health-workforce/data-research/nursing-projections-factsheet.pdf" },
      { label: "Becker's — National RN shortage to shrink, LPN demand to swell", url: "https://www.beckershospitalreview.com/quality/nursing/national-rn-shortage-to-shrink-lpn-demand-to-swell-report" },
      { label: "HTR book, Chapter 11 (Operations pillar)", url: "/read/chapter-11" },
    ],
  },
  {
    id: 15,
    title: "Mental Health Parity: The 2024 Rule in Limbo",
    area: "Access",
    asOf: "November 2026",
    stat: "New provisions of the 2024 parity rule unenforced since May 2025",
    abstract: "The September 2024 parity rule tightened how plans must justify limits on mental health and substance use treatment. Since May 2025 the federal Departments have not enforced its new provisions, and in 2026 they told a court they would revise it. The older requirements still apply.",
    body: "What still binds. The Mental Health Parity and Addiction Equity Act, its 2013 regulations, and the Consolidated Appropriations Act 2021 requirement that plans document comparative analyses of non-quantitative treatment limitations (prior authorization, network standards, step therapy) remain enforceable.\n\nWhat is paused. On May 15, 2025, the Departments of Labor, HHS and Treasury announced they would not enforce the portions of the 2024 final rule that are new relative to the 2013 rule, pending litigation brought by an employer group. Legal analyses report that in March 2026 the Departments told the court they would no longer defend the 2024 rule and planned a revised proposal.\n\nImplication: parity enforcement now leans on state regulators and on plans' own comparative analyses. For Vermont, behavioral health access — a recurring theme in the book's Clinical chapters — depends more on state oversight than it did in 2024.",
    sources: [
      { label: "APA Services — Departments announce nonenforcement of 2024 parity rule", url: "https://www.apaservices.org/practice/news/nonenforcement-2024-mental-health-parity-rule" },
      { label: "American Bar Association — Status of the 2024 final parity rule", url: "https://www.americanbar.org/groups/health_law/resources/esource/2025/status-2024-final-mental-health-parity-rule/" },
      { label: "Spencer Fane — Non-enforcement of NQTL 2024 final rule", url: "https://www.spencerfane.com/insight/mental-health-parity-government-announces-non-enforcement-of-nqtl-2024-final-rule/" },
    ],
  },
];

// ─── Utility Helpers ──────────────────────────────────────────────────────────

function fmtICER(icer: number | null): string {
  if (icer === null || icer < 0) return "Cost-saving";
  return "$" + icer.toLocaleString("en-US");
}

function median(nums: number[]): number {
  if (!nums.length) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

// ─── Verdict helpers ──────────────────────────────────────────────────────────

const VERDICT_LABEL: Record<Verdict, string> = {
  dominant: "Dominant",
  "highly-effective": "Highly Effective",
  "cost-effective": "Cost-Effective",
  borderline: "Borderline",
  "not-effective": "Not Cost-Effective",
};

const VERDICT_BADGE: Record<Verdict, string> = {
  dominant: "bg-green-100 text-green-800 border border-green-200",
  "highly-effective": "bg-emerald-100 text-emerald-800 border border-emerald-200",
  "cost-effective": "bg-blue-100 text-blue-800 border border-blue-200",
  borderline: "bg-amber-100 text-amber-800 border border-amber-200",
  "not-effective": "bg-red-100 text-red-800 border border-red-200",
};

const VERDICT_ROW_ACCENT: Record<Verdict, string> = {
  dominant: "border-l-green-500",
  "highly-effective": "border-l-emerald-500",
  "cost-effective": "border-l-blue-500",
  borderline: "border-l-amber-500",
  "not-effective": "border-l-red-500",
};

const EVIDENCE_CHIP: Record<EvidenceLevel, string> = {
  High: "bg-indigo-100 text-indigo-700",
  Moderate: "bg-slate-100 text-slate-600",
  Low: "bg-rose-100 text-rose-600",
};

const STATUS_BADGE: Record<"Active" | "Ended" | "Cancelled", string> = {
  Active: "bg-green-100 text-green-800 border border-green-200",
  Ended: "bg-slate-100 text-slate-600 border border-slate-200",
  Cancelled: "bg-red-100 text-red-700 border border-red-200",
};

const AREA_COLORS: Record<string, string> = {
  "Payment Reform": "bg-indigo-100 text-indigo-700",
  "Access": "bg-blue-100 text-blue-700",
  "Health IT": "bg-violet-100 text-violet-700",
  "State Policy": "bg-teal-100 text-teal-700",
  "Market Structure": "bg-orange-100 text-orange-700",
  "Health Equity": "bg-pink-100 text-pink-700",
  "Workforce": "bg-amber-100 text-amber-700",
};

// ─── CEA Condition categories ─────────────────────────────────────────────────

const CEA_CONDITIONS = ["All", ...Array.from(new Set(CEA_STUDIES.map((s) => s.condition))).sort()];
const CEA_VERDICTS: Verdict[] = ["dominant", "highly-effective", "cost-effective", "borderline", "not-effective"];
const CMMI_TYPES = ["All", ...Array.from(new Set(CMMI_MODELS.map((m) => m.type))).sort()];
const POLICY_AREAS = ["All", ...Array.from(new Set(POLICY_BRIEFS.map((b) => b.area))).sort()];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SortIcon({ field, current, dir }: { field: SortField; current: SortField; dir: SortDir }) {
  if (field !== current) return <ArrowUpDown className="w-3 h-3 opacity-30" />;
  return dir === "asc" ? <ArrowUp className="w-3 h-3 text-indigo-600" /> : <ArrowDown className="w-3 h-3 text-indigo-600" />;
}

// ─── Tab 1: CEA Study Database ─────────────────────────────────────────────────

function CEADatabase() {
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState("All");
  const [verdictFilters, setVerdictFilters] = useState<Set<Verdict>>(new Set());
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceLevel | "All">("All");
  const [yearRange, setYearRange] = useState<[number, number]>([CEA_YEAR_MIN, CEA_YEAR_MAX]);
  const [sortField, setSortField] = useState<SortField>("icer");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showFilters, setShowFilters] = useState(false);

  function toggleVerdict(v: Verdict) {
    setVerdictFilters((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v); else next.add(v);
      return next;
    });
  }

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    const list = CEA_STUDIES.filter((s) => {
      const q = query.toLowerCase();
      if (q && ![s.title, s.intervention, s.journal, s.condition, s.basis].some((f) => f.toLowerCase().includes(q))) return false;
      if (condition !== "All" && s.condition !== condition) return false;
      if (verdictFilters.size > 0 && !verdictFilters.has(verdictFor(s.icer))) return false;
      if (evidenceFilter !== "All" && s.evidence !== evidenceFilter) return false;
      if (s.year < yearRange[0] || s.year > yearRange[1]) return false;
      return true;
    });

    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === "icer") cmp = (a.icer ?? -1) - (b.icer ?? -1);
      else if (sortField === "year") cmp = a.year - b.year;
      else if (sortField === "journal") cmp = a.journal.localeCompare(b.journal);
      else cmp = a.title.localeCompare(b.title);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [query, condition, verdictFilters, evidenceFilter, yearRange, sortField, sortDir]);

  const positiveIcers = filtered.flatMap((s) => (s.icer !== null && s.icer >= 0 ? [s.icer] : []));
  const medianIcer = positiveIcers.length ? median(positiveIcers) : null;
  const costEffectiveCount = filtered.filter((s) => { const v = verdictFor(s.icer); return v === "dominant" || v === "highly-effective" || v === "cost-effective"; }).length;
  const pctCE = filtered.length ? Math.round((costEffectiveCount / filtered.length) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Studies Shown", value: filtered.length.toString(), icon: <Database className="w-4 h-4 text-indigo-500" /> },
          { label: "Median ICER", value: medianIcer !== null ? fmtICER(medianIcer) : "—", icon: <BarChart2 className="w-4 h-4 text-indigo-500" /> },
          { label: "Cost-Effective", value: `${pctCE}%`, icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-lg px-4 py-3 flex items-center gap-3">
            {stat.icon}
            <div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              <div className="text-lg font-bold text-slate-800">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + filter bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search studies, interventions, journals..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700"
          >
            {CEA_CONDITIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={() => setShowFilters((p) => !p)}
            className={`flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${showFilters ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"}`}
          >
            <Filter className="w-3.5 h-3.5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Verdict checkboxes */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Verdict</div>
              <div className="space-y-1.5">
                {CEA_VERDICTS.map((v) => (
                  <label key={v} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verdictFilters.has(v)}
                      onChange={() => toggleVerdict(v)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
                    />
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${VERDICT_BADGE[v]}`}>{VERDICT_LABEL[v]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Evidence quality */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Evidence Quality</div>
              <div className="flex flex-col gap-1.5">
                {(["All", "High", "Moderate", "Low"] as const).map((e) => (
                  <button
                    key={e}
                    onClick={() => setEvidenceFilter(e)}
                    className={`text-left text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${evidenceFilter === e ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                  >
                    {e === "All" ? "All Levels" : `${e} Quality`}
                  </button>
                ))}
              </div>
            </div>

            {/* Year range */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Publication Year: {yearRange[0]} – {yearRange[1]}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>From</span>
                  <input
                    type="range"
                    min={CEA_YEAR_MIN}
                    max={CEA_YEAR_MAX}
                    value={yearRange[0]}
                    onChange={(e) => setYearRange([+e.target.value, yearRange[1]])}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="w-10 text-right font-medium text-slate-700">{yearRange[0]}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>To</span>
                  <input
                    type="range"
                    min={CEA_YEAR_MIN}
                    max={CEA_YEAR_MAX}
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], +e.target.value])}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="w-10 text-right font-medium text-slate-700">{yearRange[1]}</span>
                </div>
              </div>
              {(verdictFilters.size > 0 || evidenceFilter !== "All" || condition !== "All" || query) && (
                <button
                  onClick={() => { setVerdictFilters(new Set()); setEvidenceFilter("All"); setCondition("All"); setQuery(""); setYearRange([CEA_YEAR_MIN, CEA_YEAR_MAX]); }}
                  className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear all filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ICER Legend */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium mr-1">ICER thresholds:</span>
        {[
          { label: "Dominant (saves $)", cls: "bg-green-100 text-green-700" },
          { label: "Highly Effective (<$50K)", cls: "bg-emerald-100 text-emerald-700" },
          { label: "Cost-Effective ($50–150K)", cls: "bg-blue-100 text-blue-700" },
          { label: "Borderline ($150–200K)", cls: "bg-amber-100 text-amber-700" },
          { label: "Not Cost-Effective (>$200K)", cls: "bg-red-100 text-red-700" },
        ].map((item) => (
          <span key={item.label} className={`px-2 py-0.5 rounded-full font-medium ${item.cls}`}>{item.label}</span>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200 px-4 py-2.5">
          <button className="col-span-4 flex items-center gap-1 text-left hover:text-indigo-700 transition-colors" onClick={() => handleSort("title")}>
            Study <SortIcon field="title" current={sortField} dir={sortDir} />
          </button>
          <button className="col-span-2 flex items-center gap-1 hover:text-indigo-700 transition-colors" onClick={() => handleSort("journal")}>
            Journal <SortIcon field="journal" current={sortField} dir={sortDir} />
          </button>
          <div className="col-span-2">Intervention</div>
          <button className="col-span-2 flex items-center gap-1 hover:text-indigo-700 transition-colors" onClick={() => handleSort("icer")}>
            ICER/QALY <SortIcon field="icer" current={sortField} dir={sortDir} />
          </button>
          <div className="col-span-1 text-center">Verdict</div>
          <div className="col-span-1 text-center">Evidence</div>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <div className="text-sm">No studies match your filters.</div>
          </div>
        )}

        <div className="divide-y divide-slate-100">
          {filtered.map((study) => { const verdict = verdictFor(study.icer); return (
            <div
              key={study.id}
              className={`grid grid-cols-12 px-4 py-3 hover:bg-slate-50 transition-colors border-l-4 ${VERDICT_ROW_ACCENT[verdict]}`}
            >
              <div className="col-span-4 pr-3">
                <div className="font-medium text-slate-800 text-sm leading-tight">{study.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{study.condition}</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {study.basis}{" "}
                  <a href={study.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline whitespace-nowrap">Source ↗</a>
                </div>
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <span className="text-sm text-slate-700 font-medium">{study.journal}</span>
                <span className="text-xs text-slate-400">{study.year}</span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-xs text-slate-600 leading-tight">{study.intervention}</span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className={`text-sm font-bold ${study.icer === null || study.icer < 0 ? "text-green-700" : study.icer > 200000 ? "text-red-600" : study.icer > 150000 ? "text-amber-600" : study.icer > 50000 ? "text-blue-600" : "text-emerald-700"}`}>
                  {fmtICER(study.icer)}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${VERDICT_BADGE[verdict]}`}>
                  {verdict === "dominant" ? "Dominant" : verdict === "highly-effective" ? "High-Eff." : verdict === "cost-effective" ? "Cost-Eff." : verdict === "borderline" ? "Borderline" : "Not-Eff."}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${EVIDENCE_CHIP[study.evidence]}`}>{study.evidence}</span>
              </div>
            </div>
          ); })}
        </div>
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed">
        ICERs are shown as each study reported them — in that study&apos;s year dollars, perspective and comparator — so rows are
        not strictly comparable. &quot;Cost-saving&quot; marks a cost study that found lower total cost with equal or better outcomes and
        reported no QALY ratio. Verdict bands follow the legend above; ICER (the Institute) uses $100,000–$150,000/QALY as its usual range.
      </p>
    </div>
  );
}

// ─── Tab 2: CMMI Model Tracker ─────────────────────────────────────────────────

function CMMITracker() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Ended" | "Cancelled">("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return CMMI_MODELS.filter((m) => {
      const q = query.toLowerCase();
      if (q && ![m.name, m.type, m.savings].some((f) => f.toLowerCase().includes(q))) return false;
      if (statusFilter !== "All" && m.status !== statusFilter) return false;
      if (typeFilter !== "All" && m.type !== typeFilter) return false;
      return true;
    });
  }, [query, statusFilter, typeFilter]);

  const activeCount = filtered.filter((m) => m.status === "Active").length;
  const endedCount = filtered.filter((m) => m.status !== "Active").length;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Models Shown", value: filtered.length.toString(), icon: <Layers className="w-4 h-4 text-indigo-500" /> },
          { label: "Active Models", value: activeCount.toString(), icon: <Activity className="w-4 h-4 text-green-500" /> },
          { label: "Ended or Cancelled", value: endedCount.toString(), icon: <Users className="w-4 h-4 text-slate-400" /> },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-lg px-4 py-3 flex items-center gap-3">
            {stat.icon}
            <div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              <div className="text-lg font-bold text-slate-800">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Ended">Ended</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700"
        >
          {CMMI_TYPES.map((t) => (
            <option key={t}>{t === "All" ? "All Types" : t}</option>
          ))}
        </select>
      </div>

      {/* Model list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl py-16 text-center text-slate-400">
            <Layers className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <div className="text-sm">No models match your filters.</div>
          </div>
        )}
        {filtered.map((model) => {
          const isOpen = expandedId === model.id;
          return (
            <div
              key={model.id}
              className={`bg-white border rounded-xl overflow-hidden transition-shadow ${isOpen ? "border-indigo-300 shadow-md" : "border-slate-200 hover:border-slate-300"}`}
            >
              <button
                className="w-full text-left px-5 py-4"
                onClick={() => setExpandedId(isOpen ? null : model.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[model.status]}`}>{model.status}</span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{model.type}</span>
                      {model.start && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {model.start}{model.end ? `–${model.end}` : "–present"}
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-slate-800 leading-tight">{model.name}</div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />{model.savings}</span>
                    </div>
                  </div>
                  <div className={`mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1.5">Key Lesson Learned</div>
                      <p className="ty-body text-slate-600 leading-relaxed">{model.lesson}</p>
                    </div>
                  </div>
                  {model.status === "Active" && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-1.5 w-fit">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Currently active model — monitoring ongoing
                    </div>
                  )}
                  {model.status === "Cancelled" && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-1.5 w-fit">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Model was cancelled before launch
                    </div>
                  )}
                  {model.status === "Ended" && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-fit">
                      <Clock className="w-3.5 h-3.5" />
                      Model concluded {model.end}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab 3: Policy Brief Library ──────────────────────────────────────────────

function PolicyBriefLibrary() {
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return POLICY_BRIEFS.filter((b) => {
      const q = query.toLowerCase();
      if (q && ![b.title, b.abstract, b.area, b.stat].some((f) => f.toLowerCase().includes(q))) return false;
      if (areaFilter !== "All" && b.area !== areaFilter) return false;
      return true;
    });
  }, [query, areaFilter]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search policy briefs..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {POLICY_AREAS.map((area) => (
            <button
              key={area}
              onClick={() => setAreaFilter(area)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${areaFilter === area ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"}`}
            >
              {area === "All" ? "All Areas" : area}
            </button>
          ))}
        </div>
      </div>

      {/* Briefs count */}
      <div className="text-xs text-slate-400 font-medium">
        Showing {filtered.length} of {POLICY_BRIEFS.length} policy briefs
      </div>

      {/* Brief cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl py-16 text-center text-slate-400">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <div className="text-sm">No briefs match your search.</div>
          </div>
        )}

        {filtered.map((brief) => {
          const isOpen = expandedId === brief.id;
          const areaColor = AREA_COLORS[brief.area] || "bg-slate-100 text-slate-600";
          return (
            <div
              key={brief.id}
              className={`bg-white border rounded-xl overflow-hidden transition-all ${isOpen ? "border-indigo-300 shadow-md" : "border-slate-200 hover:border-slate-300 hover:shadow-sm"}`}
            >
              <div className="px-5 py-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${areaColor}`}>{brief.area}</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 leading-tight text-base">{brief.title}</h3>
                  </div>
                </div>

                {/* Key stat */}
                <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2 mb-3 w-fit max-w-full">
                  <Star className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-indigo-700 truncate">{brief.stat}</span>
                </div>

                {/* Abstract */}
                <p className="ty-body text-slate-600 leading-relaxed">{brief.abstract}</p>

                {/* Toggle */}
                <button
                  onClick={() => setExpandedId(isOpen ? null : brief.id)}
                  className="mt-3 flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {isOpen ? "Collapse Brief" : "Read Full Brief"}
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </button>
              </div>

              {/* Expanded body */}
              {isOpen && (
                <div className="border-t border-indigo-100 bg-slate-50 px-5 py-4">
                  <div className="prose prose-sm max-w-none">
                    {brief.body.split("\n\n").map((para, i) => (
                      <p key={i} className="ty-body text-slate-600 leading-relaxed mb-3 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Sources</div>
                    <ul className="space-y-1">
                      {brief.sources.map((s) => (
                        <li key={s.url} className="text-xs">
                          <a href={s.url} target={s.url.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer" className="text-indigo-600 hover:underline">{s.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-400 italic">Health Transformation Review — Policy Brief Library · current as of {brief.asOf}</span>
                    <button
                      onClick={() => setExpandedId(null)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                    >
                      <ChevronUp className="w-3 h-3" /> Collapse
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Tab = "cea" | "cmmi" | "briefs";

const TABS: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
  { id: "cea", label: "CEA/CUA Study Database", icon: <BarChart2 className="w-4 h-4" />, count: CEA_STUDIES.length },
  { id: "cmmi", label: "CMMI Model Tracker", icon: <Activity className="w-4 h-4" />, count: CMMI_MODELS.length },
  { id: "briefs", label: "Policy Brief Library", icon: <FileText className="w-4 h-4" />, count: POLICY_BRIEFS.length },
];

// ─── What kind of source is this? ────────────────────────────────────────────
// Chapter 12 §12.8 sends readers here to check "whether the underlying source is a
// peer-reviewed evaluation, a consultant projection, or an agency self-report — the
// distinction most transformation reading collapses." Each collection below is one
// kind of source, so the label is per collection, stated before the reader cites it.
const SOURCE_TYPE: Record<Tab, { label: string; cls: string; body: string }> = {
  cea: {
    label: "Published evaluation",
    cls: "bg-emerald-50 border-emerald-200 text-emerald-800",
    body: "Every row links to the published analysis — peer-reviewed journal articles plus Institute for Clinical and Economic Review (ICER) evidence reports, which are independent and publicly reviewed rather than journal peer-reviewed. Evidence is High where the analysis is built directly on randomized-trial data, Moderate where it rests mainly on modeling or single-arm evidence.",
  },
  cmmi: {
    label: "Agency self-report",
    cls: "bg-amber-50 border-amber-200 text-amber-800",
    body: "Model status and savings figures come from CMS/CMMI announcements and the evaluations CMS commissions for its own models. Treat a savings figure here as the sponsoring agency's account of its own program until an independent, peer-reviewed evaluation confirms it.",
  },
  briefs: {
    label: "HTR synthesis",
    cls: "bg-sky-50 border-sky-200 text-sky-800",
    body: "These briefs are this platform's own summaries of published evidence — secondary sources. Cite the underlying study or agency report, not the brief.",
  },
};

function SourceTypeNotice({ tab }: { tab: Tab }) {
  const t = SOURCE_TYPE[tab];
  return (
    <div className={`mb-5 rounded-xl border px-4 py-3 ${t.cls}`}>
      <p className="text-[10px] font-black uppercase tracking-widest mb-1">Source type: {t.label}</p>
      <p className="text-xs leading-relaxed">{t.body}</p>
      <p className="text-[11px] leading-relaxed mt-1.5 opacity-80">
        The third kind of source the book distinguishes — the <strong>consultant projection</strong> (for example, the
        Oliver Wyman Act 167 deficit scenarios the GMCB commissioned) — is not collected here. It is a forecast paid for
        by a party to the decision, not an evaluation of results; the book flags each one where it is used.
      </p>
    </div>
  );
}

export default function EvidenceLibrary() {
  const [activeTab, setActiveTab] = useState<Tab>("cea");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Research Evidence & Library</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Landmark cost-effectiveness studies, CMMI innovation model outcomes, and curated health policy briefs for evidence-informed decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-700"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {tab.icon}
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeTab === tab.id ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <SourceTypeNotice tab={activeTab} />
        {activeTab === "cea" && <CEADatabase />}
        {activeTab === "cmmi" && <CMMITracker />}
        {activeTab === "briefs" && <PolicyBriefLibrary />}
      </div>
    </div>
  );
}
