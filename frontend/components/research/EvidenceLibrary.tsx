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
  icer: number;
  verdict: Verdict;
  evidence: EvidenceLevel;
}

interface CMMIModel {
  id: number;
  name: string;
  status: "Active" | "Ended" | "Cancelled";
  start: number | null;
  end: number | null;
  participants: number;
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
}

// ─── CEA Studies ──────────────────────────────────────────────────────────────

const CEA_STUDIES: CEAStudy[] = [
  { id: 1, title: "Metformin for T2D Prevention", journal: "NEJM", year: 2002, condition: "Diabetes", intervention: "Metformin vs Placebo", icer: 11000, verdict: "highly-effective", evidence: "High" },
  { id: 2, title: "Statin Therapy for Primary CVD Prevention", journal: "Lancet", year: 2019, condition: "Cardiovascular", intervention: "Statins", icer: 54000, verdict: "cost-effective", evidence: "High" },
  { id: 3, title: "Colorectal Cancer Screening (Colonoscopy)", journal: "Ann Int Med", year: 2016, condition: "Oncology", intervention: "Colonoscopy", icer: 8000, verdict: "highly-effective", evidence: "High" },
  { id: 4, title: "Cervical Cancer Screening (HPV+Pap)", journal: "Lancet Oncology", year: 2018, condition: "Oncology", intervention: "HPV+Pap cotesting", icer: 15000, verdict: "highly-effective", evidence: "High" },
  { id: 5, title: "Buprenorphine for OUD", journal: "JAMA", year: 2019, condition: "Substance Use", intervention: "Buprenorphine MOUD", icer: 13500, verdict: "highly-effective", evidence: "High" },
  { id: 6, title: "Depression Collaborative Care Model", journal: "JAMA", year: 2012, condition: "Mental Health", intervention: "Collaborative Care", icer: 22000, verdict: "highly-effective", evidence: "High" },
  { id: 7, title: "Mammography Screening 50-74", journal: "Ann Int Med", year: 2016, condition: "Oncology", intervention: "Biennial mammography", icer: 26000, verdict: "highly-effective", evidence: "Moderate" },
  { id: 8, title: "Diabetes Prevention Program", journal: "NEJM", year: 2002, condition: "Diabetes", intervention: "Lifestyle + Metformin", icer: 11000, verdict: "highly-effective", evidence: "High" },
  { id: 9, title: "Childhood Vaccine MMR", journal: "MMWR", year: 2014, condition: "Preventive", intervention: "MMR vaccine", icer: -500, verdict: "dominant", evidence: "High" },
  { id: 10, title: "Lung Cancer Screening (LDCT)", journal: "NEJM", year: 2011, condition: "Oncology", intervention: "Low-dose CT", icer: 52000, verdict: "cost-effective", evidence: "High" },
  { id: 11, title: "Remote Patient Monitoring for CHF", journal: "JAMA Cardiol", year: 2021, condition: "Cardiovascular", intervention: "RPM program", icer: 28000, verdict: "highly-effective", evidence: "Moderate" },
  { id: 12, title: "Telehealth for Mental Health", journal: "Health Affairs", year: 2022, condition: "Mental Health", intervention: "Telepsychiatry", icer: 19000, verdict: "highly-effective", evidence: "Moderate" },
  { id: 13, title: "Hospital at Home", journal: "Ann Int Med", year: 2022, condition: "Acute Care", intervention: "Hospital-at-Home", icer: -14000, verdict: "dominant", evidence: "Moderate" },
  { id: 14, title: "PCSK9 Inhibitors for High CV Risk", journal: "NEJM", year: 2017, condition: "Cardiovascular", intervention: "Evolocumab", icer: 325000, verdict: "not-effective", evidence: "High" },
  { id: 15, title: "CAR-T Therapy (Kymriah) Pediatric ALL", journal: "NEJM", year: 2018, condition: "Oncology", intervention: "Tisagenlecleucel", icer: 610000, verdict: "not-effective", evidence: "High" },
  { id: 16, title: "Gene Therapy Zolgensma SMA", journal: "NEJM", year: 2019, condition: "Rare Disease", intervention: "Onasemnogene", icer: 900000, verdict: "not-effective", evidence: "High" },
  { id: 17, title: "GLP-1 Agonists (Semaglutide) for Obesity", journal: "NEJM", year: 2021, condition: "Endocrine", intervention: "Semaglutide 2.4mg", icer: 175000, verdict: "borderline", evidence: "High" },
  { id: 18, title: "Naltrexone for Alcohol Use Disorder", journal: "Arch Int Med", year: 2005, condition: "Substance Use", intervention: "Naltrexone", icer: 7000, verdict: "highly-effective", evidence: "High" },
  { id: 19, title: "School-Based Asthma Management", journal: "JAMA Pediatrics", year: 2016, condition: "Preventive", intervention: "School asthma program", icer: -2000, verdict: "dominant", evidence: "Moderate" },
  { id: 20, title: "Intensive BP Control (SPRINT)", journal: "NEJM", year: 2021, condition: "Cardiovascular", intervention: "SBP <120 target", icer: 47000, verdict: "cost-effective", evidence: "High" },
  { id: 21, title: "Palliative Care Consultation", journal: "NEJM", year: 2010, condition: "Acute Care", intervention: "Early palliative care", icer: -8000, verdict: "dominant", evidence: "High" },
  { id: 22, title: "Medication Reconciliation at Discharge", journal: "Ann Int Med", year: 2019, condition: "Acute Care", intervention: "Med rec program", icer: -3000, verdict: "dominant", evidence: "Moderate" },
  { id: 23, title: "HPV Vaccination (Boys)", journal: "Pediatrics", year: 2016, condition: "Preventive", intervention: "HPV vaccine males", icer: 29000, verdict: "highly-effective", evidence: "High" },
  { id: 24, title: "Childhood Lead Abatement", journal: "Environ Health", year: 2017, condition: "Preventive", intervention: "Lead abatement program", icer: -50000, verdict: "dominant", evidence: "Moderate" },
  { id: 25, title: "Peer Support for Serious Mental Illness", journal: "Psych Services", year: 2018, condition: "Mental Health", intervention: "Peer support specialists", icer: 19000, verdict: "highly-effective", evidence: "Moderate" },
];

// ─── CMMI Models ──────────────────────────────────────────────────────────────

const CMMI_MODELS: CMMIModel[] = [
  { id: 1, name: "MSSP (Shared Savings Program)", status: "Active", start: 2012, end: null, participants: 485, type: "ACO", savings: "$1.8B net savings through 2022", lesson: "Largest ACO program; one-sided risk drove modest savings; Enhanced track showing better results. The MSSP has evolved through multiple rule updates, with each iteration pushing participants toward greater financial risk. Two-sided risk models consistently outperform basic tracks on savings generation, though attribution methodology remains a point of contention among ACO operators." },
  { id: 2, name: "Next Generation ACO Model", status: "Ended", start: 2016, end: 2021, participants: 53, type: "ACO", savings: "Mixed — some savings, high admin burden", lesson: "Too complex; replaced by ACO REACH with simpler design. The NextGen model required participants to assume nearly full financial risk, limiting adoption to large, well-capitalized health systems. Administrative reporting requirements were identified as a major barrier; CMS has incorporated these lessons into the streamlined ACO REACH design." },
  { id: 3, name: "ACO REACH", status: "Active", start: 2023, end: null, participants: 150, type: "ACO", savings: "Early stage", lesson: "Successor to Direct Contracting; emphasizes health equity; global risk option. ACO REACH introduced mandatory health equity plans and beneficiary engagement requirements, making equity a core structural element rather than an optional reporting category. Early participants include a mix of physician-led and hospital-anchored organizations." },
  { id: 4, name: "BPCI-Advanced", status: "Active", start: 2018, end: null, participants: 1000, type: "Episode", savings: "$600M gross savings", lesson: "Episode-based model working for high-volume orthopedic/cardiac procedures. BPCI-A has demonstrated consistent savings for joint replacement and cardiac care bundles, with the 90-day episode window proving more effective than the original 30-day design. Convener organizations have emerged as key infrastructure intermediaries enabling smaller facilities to participate." },
  { id: 5, name: "Comprehensive Primary Care Plus (CPC+)", status: "Ended", start: 2017, end: 2021, participants: 3000, type: "Primary Care", savings: "Modest quality improvement, no net savings", lesson: "Practice transformation takes longer than 5 years; insufficient payment for transformation. CPC+ was the largest primary care model ever tested, yet the evaluation found negligible Medicare savings despite measurable quality improvements. The fundamental tension between transformation timeline and model duration has informed subsequent primary care model designs including Making Care Primary." },
  { id: 6, name: "Primary Care First", status: "Active", start: 2021, end: null, participants: 1000, type: "Primary Care", savings: "Early stage", lesson: "Simplified payment; serious illness population option. PCF introduced a flat primary care fee structure designed to reward comprehensiveness over visit volume. The Serious Illness Population track specifically targets high-need patients who would otherwise face fragmented care across multiple specialists." },
  { id: 7, name: "Kidney Care Choices (KCC)", status: "Active", start: 2022, end: null, participants: 200, type: "Specialty", savings: "Early stage", lesson: "Focused on home dialysis and transplant; integrated ESRD care. KCC incentivizes kidney disease progression management, with payment bonuses tied to home dialysis initiation rates and preemptive transplant listings. The model addresses a long-standing misalignment in which in-center dialysis is reimbursed far more generously than home alternatives." },
  { id: 8, name: "Enhancing Oncology Model (EOM)", status: "Active", start: 2023, end: null, participants: 200, type: "Specialty", savings: "Early stage", lesson: "Successor to OCM; 6 cancer types; health equity requirements. EOM narrowed the cancer type scope compared to OCM, focusing on high-volume, high-cost chemotherapy episodes. Mandatory SDOH screening and navigator requirements represent a significant advance over the original Oncology Care Model's optional equity provisions." },
  { id: 9, name: "Oncology Care Model (OCM)", status: "Ended", start: 2016, end: 2022, participants: 175, type: "Specialty", savings: "Modest quality improvement; no net savings", lesson: "High complexity; chemotherapy costs difficult to control; lessons inform EOM. OCM demonstrated that episode-based payments can improve care coordination for cancer patients but that chemotherapy drug costs — largely outside physician control — dominate episode spending variation, making savings targets structurally difficult to achieve." },
  { id: 10, name: "CHART (Rural Transformation)", status: "Active", start: 2021, end: null, participants: 30, type: "State/Rural", savings: "Early stage", lesson: "Flexible global budget for rural hospitals and communities. CHART provides rural hospitals with a prospective population-based budget, freeing them from fee-for-service billing constraints. Early implementation has focused on workforce stabilization and care redesign; financial performance data remain limited given the model's early stage." },
  { id: 11, name: "Emergency Triage, Treat & Transport (ET3)", status: "Ended", start: 2021, end: 2023, participants: 200, type: "Specialty", savings: "Inconclusive", lesson: "Ambulance alternatives (telehealth, community care) promising but operationally complex. ET3 allowed ambulance providers to bill Medicare for treatment-in-place and referral to non-ED settings, addressing a long-standing regulatory barrier. Implementation was hampered by state EMS scope-of-practice laws and 911 dispatch limitations that CMS lacked authority to waive." },
  { id: 12, name: "Independence at Home", status: "Ended", start: 2012, end: 2023, participants: 14, type: "Primary Care", savings: "$2,700 savings per beneficiary", lesson: "House call model for frail elderly highly effective; scalability limited. Over its 11-year run, IAH consistently generated Medicare savings by providing primary care to homebound beneficiaries, reducing hospitalizations and ED visits. The model's inability to attract sufficient practices at scale reflects primary care workforce constraints and the capital intensity of building house-call infrastructure." },
  { id: 13, name: "Radiation Oncology Model", status: "Cancelled", start: null, end: null, participants: 0, type: "Specialty", savings: "Never launched", lesson: "Cancelled after stakeholder opposition; site-neutral pricing politically contentious. The Radiation Oncology Model was finalized and then shelved following opposition from radiation oncology societies and hospital systems concerned about site-neutral payment reductions. The episode underscores the political dynamics of mandatory vs. voluntary participation design choices." },
  { id: 14, name: "Integrated Care for Kids (InCK)", status: "Active", start: 2020, end: null, participants: 8, type: "State/Pediatric", savings: "Early stage", lesson: "First child-focused alternative payment model; focuses on SDOH. InCK represents a landmark expansion of CMMI's portfolio into pediatric Medicaid populations, requiring participating states to integrate physical health, behavioral health, and social services for children. The model's emphasis on SDOH screening and community-based intervention infrastructure is informing broader pediatric payment reform discussions." },
  { id: 15, name: "Vermont All-Payer ACO Model", status: "Active", start: 2018, end: null, participants: 1, type: "State/All-Payer", savings: "Mixed early results", lesson: "Unique state-based model; all payers aligned; hospital global budget; strong SDOH focus. Vermont's model is the nation's only all-payer ACO arrangement, requiring commercial insurers, Medicaid, and Medicare to align behind a single ACO structure with a hospital global budget. Results have been mixed, with global budget discipline maintained but quality target performance variable across measures." },
  { id: 16, name: "Pennsylvania Rural Health Model", status: "Active", start: 2019, end: null, participants: 17, type: "State/Rural", savings: "Early positive results", lesson: "Global budget for rural hospitals; reduced financial pressure; quality stable. PA RHMO operates through all-payer global budgets for participating rural hospitals, eliminating the volume pressure inherent in fee-for-service. Early evaluation data show financial stability improvements and maintained quality, with hospitals redirecting capacity toward community health and prevention activities." },
  { id: 17, name: "Making Care Primary (MCP)", status: "Active", start: 2024, end: null, participants: 200, type: "Primary Care", savings: "Very early stage", lesson: "Next-generation primary care; 10-year track; VBC progression pathway. MCP establishes a multi-year pathway for primary care practices to advance from infrastructure support to full prospective population payments. The 10-year timeline directly addresses the criticism of shorter models that transformation cannot be achieved within a 5-year contract period." },
  { id: 18, name: "States Advancing All-Payer HEA", status: "Active", start: 2024, end: null, participants: 9, type: "State/Equity", savings: "Very early stage", lesson: "First equity-centered state model; SDOH investment pools. This model explicitly centers health equity as the primary design objective, requiring states to establish cross-sector investment pools funded by payer contributions and directed toward community-identified SDOH priorities. It represents the most direct federal attempt to use payment reform as a tool for structural equity intervention." },
  { id: 19, name: "Transforming Maternity Care", status: "Active", start: 2024, end: null, participants: 150, type: "Specialty", savings: "Very early stage", lesson: "Episode-based maternity bundles; equity focus; doula integration. The maternity care model bundles payment across prenatal, delivery, and postpartum periods, with explicit quality measures tied to racial equity in maternal outcomes. Doula integration as a reimbursable care team member is a nationally significant policy precedent with implications beyond the model's footprint." },
  { id: 20, name: "GUIDE (Dementia Care)", status: "Active", start: 2024, end: null, participants: 400, type: "Specialty", savings: "Very early stage", lesson: "Comprehensive dementia care; caregiver support; community navigation. GUIDE establishes a comprehensive care model for people living with dementia and their caregivers, addressing a population historically underserved by structured care coordination. Monthly care management payments support a dementia care specialist model that integrates clinical management with community navigation and caregiver respite services." },
];

// ─── Policy Briefs ────────────────────────────────────────────────────────────

const POLICY_BRIEFS: PolicyBrief[] = [
  {
    id: 1,
    title: "All-Payer Claims Databases: State Policy Landscape 2024",
    area: "Payment Reform",
    stat: "$0 federal support for APCD infrastructure",
    abstract: "APCDs hold enormous promise for transparency and value-based care analytics, yet only 18 states have operational APCDs with wide variation in data completeness and public accessibility. The 2016 Supreme Court ruling in Gobeille v. Liberty Mutual limited mandatory ERISA plan reporting, creating a persistent gap in claims coverage.",
    body: "All-Payer Claims Databases represent one of the most powerful tools available to health policy researchers and payers, consolidating medical, pharmacy, and dental claims from commercial insurers, Medicaid, and Medicare into a single statewide repository. As of 2024, 18 states operate functional APCDs, with Vermont, Colorado, and New Hampshire recognized as leading examples of data quality and public use file accessibility.\n\nThe Gobeille v. Liberty Mutual (2016) Supreme Court decision fundamentally altered the APCD landscape by ruling that states cannot mandate ERISA-governed employer self-insured plans to report claims data. This ruling created an estimated 30–50% gap in commercial claims coverage for many state APCDs, undermining the 'all-payer' designation. Legislative responses have varied: some states pursued voluntary reporting agreements with large self-insured employers, while Congress has considered but not enacted federal APCD enabling legislation.\n\nFunding represents the other central challenge. APCDs are expensive to build and operate — infrastructure, data governance, privacy compliance, and public use file production can cost $2–8M annually. No dedicated federal funding stream exists; states rely on assessment fees levied on payers, general fund appropriations, or federal grant carve-outs. The result is chronic underfunding and staffing constraints at state APCD programs.\n\nPolicy recommendations include: (1) federal legislation establishing a floor for ERISA plan reporting to state APCDs; (2) creation of a federal-state APCD matching fund similar to the HITECH Act's HIT incentive structure; (3) standardized data elements across state APCDs to enable multi-state analytics; and (4) enhanced public use file access with appropriate de-identification standards. Without these structural investments, APCDs will remain underutilized assets in an increasingly data-dependent health system."
  },
  {
    id: 2,
    title: "Medicaid Expansion: 10-Year Impact Assessment",
    area: "Access",
    stat: "4.1M adults still in coverage gap in non-expansion states",
    abstract: "A decade of Medicaid expansion under the ACA reveals consistent patterns of coverage gains, improved financial protection, and measurable mortality reductions in expansion states, while 10 remaining holdout states leave millions in a coverage gap. The evidence base now comprises over 300 peer-reviewed studies across multiple methodological frameworks.",
    body: "The ACA's Medicaid expansion, made optional by NFIB v. Sebelius (2012), has produced one of the most extensively studied natural experiments in American health policy. As of 2024, 40 states and DC have expanded Medicaid to adults up to 138% FPL, leaving 10 states — concentrated in the South — outside expansion.\n\nCoverage impact has been unambiguous: expansion states saw uninsured rates among low-income adults fall by an average of 50%, with 20+ million individuals gaining coverage over the decade. The coverage gains were most pronounced among Black adults and rural populations who had historically faced the greatest access barriers.\n\nFinancial protection outcomes have been robustly documented. Multiple studies using credit bureau data, bankruptcy records, and medical debt collection data show significant reductions in catastrophic medical expenditures, medical debt, and personal bankruptcy rates in expansion states. The Consumer Financial Protection Bureau's 2023 analysis found a 44% reduction in medical bill collections in expansion relative to non-expansion states.\n\nMortality effects, initially contested, are now supported by a substantial body of evidence. Studies using difference-in-differences designs estimate expansion prevented 15,000–20,000 deaths annually from all-causes, with cardiovascular disease and cancer mortality showing the largest reductions attributable to earlier diagnosis and sustained treatment.\n\nThe coverage gap — adults with incomes above state Medicaid thresholds but below the ACA marketplace subsidy floor — has persisted because the ACA assumed all states would expand. Enhanced Premium Tax Credits enacted in the ARP partially address the gap for marketplace enrollees but cannot substitute for Medicaid's comprehensive benefit package. Closing the remaining gap requires either state-level expansion decisions or federal legislative action to extend coverage directly to gap-population adults."
  },
  {
    id: 3,
    title: "Site-Neutral Payment: Evidence For and Against",
    area: "Payment Reform",
    stat: "Hospital outpatient pays 2.2x more than physician office for identical services",
    abstract: "Site-neutral payment policies — equalizing Medicare rates across care settings for identical services — have emerged as a major cost containment strategy, with CBO estimating $180B in 10-year savings potential. Proponents cite market distortions from differential payment; opponents warn of hospital financial instability and access reductions for vulnerable patients.",
    body: "Site-neutral payment refers to Medicare (and potentially Medicaid and commercial) reimbursement policies that pay the same rate for equivalent services regardless of whether delivered in a hospital outpatient department (HOPD), ambulatory surgical center (ASC), or physician office. The current payment differential is substantial: Medicare pays HOPDs approximately 2.2 times the physician office rate for evaluation and management visits, cardiology procedures, and many other services.\n\nThe policy case for site-neutral payment rests on several pillars. First, there is no evidence that identical services delivered in HOPDs produce superior clinical outcomes — multiple analyses confirm equivalent quality for evaluation, management, and many procedural services. Second, the payment differential has directly incentivized hospital acquisition of physician practices and off-campus outpatient facilities, a major driver of healthcare consolidation. Third, CBO estimates full site-neutral payment for Medicare would save $180B over ten years, representing one of the largest available payment reform levers.\n\nOpponents raise legitimate concerns. Rural and safety-net hospitals rely disproportionately on HOPD revenue to cross-subsidize emergency departments, inpatient psychiatric units, and other money-losing but community-essential services. Blunt site-neutral policies could accelerate rural hospital closures and reduce access for patients who depend on hospital-affiliated outpatient settings. Additionally, HOPDs genuinely face higher overhead costs — 24/7 staffing, regulatory compliance, trauma readiness — that physician office rates do not account for.\n\nA balanced policy framework would implement site-neutral payment for off-campus provider-based departments (as CMS has begun), preserve differential payment for services genuinely requiring hospital infrastructure, and pair payment reform with explicit financial support for safety-net and rural hospital functions currently cross-subsidized by HOPD revenue. Phased implementation with financial impact monitoring is essential given the structural dependencies that have developed under the current payment regime."
  },
  {
    id: 4,
    title: "FHIR Interoperability: Status 2025",
    area: "Health IT",
    stat: "91% of hospitals have certified FHIR R4 APIs as of 2024",
    abstract: "The ONC 21st Century Cures Act Final Rule mandated FHIR R4 API adoption across certified EHR systems, achieving remarkable infrastructure penetration by 2024, yet real-world interoperability — the ability to exchange clinically useful data seamlessly — remains far from realized. Information blocking enforcement, standardized app ecosystems, and longitudinal data access remain critical gaps.",
    body: "The health interoperability landscape has been transformed by the ONC Cures Act Final Rule (2020) and CMS Interoperability Rule (2020), which established FHIR R4 as the technical standard for patient data access and required certified EHRs to expose standardized patient data APIs. By 2024, ONC data confirm that over 91% of hospitals and 82% of office-based physicians operate on certified EHR systems with FHIR API capability.\n\nHowever, infrastructure availability has not translated into functional interoperability. The ONC's 2024 interoperability measurement framework identifies three persistent gaps: (1) data completeness — FHIR APIs surface administrative and clinical summary data but rarely expose full encounter documentation, imaging results, or behavioral health records; (2) query reliability — latency, authentication complexity, and API version inconsistencies create friction that limits third-party developer adoption; and (3) semantic standardization — even FHIR-compliant data uses inconsistent coding systems, terminology versions, and data element definitions that require expensive normalization.\n\nInformation blocking enforcement, administered by the OIG, has proceeded slowly. As of early 2025, the OIG has imposed fines in a handful of cases involving vendor and health system practices that restricted patient data access, but enforcement capacity relative to the scale of potential violations remains limited.\n\nThe TEFCA (Trusted Exchange Framework and Common Agreement) framework represents the most significant structural advance, establishing a national interoperability framework through Qualified Health Information Networks (QHINs). Initial QHIN deployment has begun, with CommonWell, Epic, and Sequoia among early participants. Achieving TEFCA's vision of seamless nationwide data exchange requires sustained federal investment in governance infrastructure and more aggressive enforcement of information blocking prohibitions."
  },
  {
    id: 5,
    title: "Medicare Advantage: Overpayment and Risk Coding Practices",
    area: "Payment Reform",
    stat: "MedPAC estimates MA overpayment at $88B cumulatively through 2023",
    abstract: "Medicare Advantage has grown to cover more than half of Medicare beneficiaries, yet longstanding concerns about risk score manipulation and overpayment relative to traditional Medicare have intensified, with CMS implementing risk adjustment data validation (RADV) audits after years of delay. The policy tension between MA market stability and payment accuracy is central to Medicare's long-term fiscal trajectory.",
    body: "Medicare Advantage now enrolls over 33 million beneficiaries — more than half the Medicare population — representing a fundamental structural shift in how Medicare coverage is delivered. MA plans receive prospective capitated payments risk-adjusted using the Hierarchical Condition Category (HCC) model, theoretically calibrated to expected costs based on beneficiary health status.\n\nMedPAC has documented consistent overpayment of MA plans relative to projected FFS costs, driven primarily by two factors: favorable selection (MA plans tend to enroll healthier-than-average beneficiaries) and risk score manipulation (diagnoses coded exclusively in plan encounters, not backed by FFS utilization patterns). MedPAC's cumulative overpayment estimate through 2023 exceeds $88B, representing a significant structural subsidy to MA plans embedded in Medicare payment policy.\n\nCMS's Risk Adjustment Data Validation (RADV) audit program, designed to recoup overpayments from unsupported diagnosis codes, was administratively blocked for years through litigation. A 2023 final rule established the auditing methodology and extrapolation approach going forward, but the decision to apply audits only prospectively — rather than retroactively to 2011 — forfeited billions in potential recoveries.\n\nThe policy implications are profound. MA's growth is partially driven by the overpayment-funded supplemental benefits (dental, vision, hearing, fitness) that plans offer to attract enrollees. Accurate risk adjustment would reduce plan revenues and likely contract benefit generosity, potentially triggering disenrollment. Policymakers face a difficult choice between actuarial integrity and market stability in a program that half of Medicare beneficiaries now depend upon. A phased approach to correcting risk scores — combined with enhanced quality incentives — represents the most viable path to payment accuracy without market disruption."
  },
  {
    id: 6,
    title: "Vermont Global Budget: Lessons Learned",
    area: "State Policy",
    stat: "Vermont GMCB regulated $4.2B in hospital spending in FY2024",
    abstract: "Vermont's Green Mountain Care Board has regulated hospital budgets since 2012, providing the longest-running laboratory for all-payer hospital global budgeting in the United States. Early evidence shows financial discipline and quality preservation, though concerns about innovation incentives and rural facility sustainability have emerged as the model matures.",
    body: "Vermont's global budget system, administered by the Green Mountain Care Board (GMCB), requires all hospitals in the state to submit annual budget requests subject to regulatory review and approval. The GMCB sets prospective global budgets that determine each hospital's revenue cap, applied across all payers through a uniform rate structure negotiated with commercial insurers and enforced through the Medicaid and Medicare waiver framework.\n\nAfter more than a decade of operation, Vermont's system demonstrates that hospital global budgeting is operationally viable in a small state with a mature regulatory infrastructure. Hospital spending growth has averaged approximately 3.5% annually under GMCB oversight, compared to a national average of 5-6%, representing meaningful expenditure discipline. Quality metrics — readmission rates, adverse event reporting, patient experience — have remained stable or improved, consistent with the global budget design's intent to promote care redesign rather than volume reduction.\n\nThe Vermont All-Payer ACO Model (2018), which overlays ACO-style accountability on the global budget structure, has added complexity. Hospitals operate simultaneously under GMCB budget constraints and OneCare Vermont ACO financial arrangements, creating administrative burden and occasional misalignment between budget and ACO incentive structures.\n\nKey lessons for other states: (1) regulatory infrastructure — specifically an independent, technically capable rate-setting body — is prerequisite to global budgeting; (2) transition from FFS volume dependence requires a minimum 5-year runway with financial bridge support; (3) rural hospital viability under global budgets requires supplemental community benefit payments; and (4) aligning hospital, physician, and insurance sector incentives simultaneously is more powerful than hospital-only regulation. Vermont's experience is directly informing global budget discussions in Pennsylvania, Massachusetts, and Maryland."
  },
  {
    id: 7,
    title: "AI Regulation in Healthcare: Federal Policy Gap Analysis",
    area: "Health IT",
    stat: "FDA cleared 882 AI/ML-enabled medical devices through 2023",
    abstract: "Artificial intelligence in healthcare has advanced from research novelty to clinical deployment at scale, yet the regulatory framework governing AI-enabled clinical decision support, diagnostic algorithms, and care management tools remains fragmented across FDA, ONC, CMS, and FTC jurisdictions. The absence of a unified AI accountability framework creates patient safety risks and market uncertainty.",
    body: "Healthcare AI regulation in the United States is characterized by overlapping jurisdictional claims, definitional ambiguity, and significant gaps. The FDA regulates AI-enabled software as a medical device (SaMD) when the software meets the device definition — influencing clinical decision-making in ways that cannot be independently verified by the clinician. The FDA's AI/ML-based SaMD Action Plan (2021) and subsequent draft guidance outline a framework for continuous learning algorithms, but implementation remains incomplete.\n\nClinical decision support (CDS) software occupies a contested regulatory space. The 21st Century Cures Act carved out certain CDS from FDA device regulation — specifically software that displays or analyzes information from EHRs without replacing clinical judgment. However, the boundary between non-device CDS and regulated SaMD is interpreted inconsistently across the industry, leaving many deployed algorithms in a regulatory gray zone.\n\nONC has authority over CDS transparency through the information blocking and interoperability rules but lacks direct product safety authority. CMS has begun requiring AI algorithm disclosure in certain contexts — MA plans must report when AI is used in prior authorization decisions — but lacks comprehensive authority over clinical AI deployment across the broader health system.\n\nKey unaddressed risks include algorithmic bias (AI systems trained on non-representative datasets that underperform for Black, Latino, and low-income patients), model drift (performance degradation as clinical practice and patient populations evolve), and liability ambiguity (unclear responsibility allocation between algorithm developers, EHR vendors, and clinicians). A unified federal AI safety framework — combining FDA's product safety authority, ONC's interoperability and transparency tools, and CMS's coverage and payment leverage — is essential for responsible AI integration in clinical care."
  },
  {
    id: 8,
    title: "Prior Authorization Reform: Legislative and Regulatory Landscape",
    area: "Payment Reform",
    stat: "1 in 4 physicians report a patient harm event attributable to prior authorization delays",
    abstract: "Prior authorization — the requirement that insurers approve certain services before they are provided — has grown dramatically in scope and administrative burden, prompting major federal legislative and regulatory action in 2024. CMS's interoperability rule requiring electronic PA and response timelines represents the most significant structural change in decades, though implementation challenges loom.",
    body: "Prior authorization originated as a utilization management tool to prevent inappropriate care, but has evolved into a pervasive administrative burden that delays care, increases physician burnout, and imposes billions in administrative costs across the health system. The AMA's annual physician surveys document that 94% of physicians report PA delays causing care disruption, with 34% reporting hospitalizations directly attributable to PA-related care interruptions.\n\nFederal legislative activity accelerated in 2023-2024 with the Improving Seniors' Timely Access to Care Act signed into law, establishing real-time electronic PA standards for certain Medicare Advantage services and requiring plans to publish PA data transparently. CMS's January 2024 interoperability rule extended electronic PA requirements to Medicaid, CHIP, and QHP issuers, requiring FHIR-based API integration between payer and provider systems for PA submission and response.\n\nThe CMS rule also established response time floors: 72 hours for urgent requests, 7 calendar days for standard requests. These requirements, taking effect in 2026, represent a significant constraint on the opaque timelines that have historically characterized PA processes. Concurrent gold-carding provisions — requiring plans to exempt high-performing physicians from PA for services with historically high approval rates — address the inappropriate uniform application of PA requirements regardless of physician track record.\n\nImplementation challenges are substantial. Small and medium-sized practices lack the EHR infrastructure to support FHIR-based electronic PA without vendor investment. Health plans face technical and workflow redesign costs estimated at $500M industry-wide for API-compliant PA systems. Monitoring and enforcement mechanisms remain underdeveloped; the rule's success depends on CMS's willingness to impose penalties for non-compliant payer behavior at a scale sufficient to drive compliance."
  },
  {
    id: 9,
    title: "No Surprises Act: Implementation Assessment",
    area: "Access",
    stat: "Over 490,000 surprise billing disputes filed in first 18 months",
    abstract: "The No Surprises Act (2022) established federal protections against surprise medical billing from out-of-network providers in emergency settings and certain non-emergency contexts, a landmark consumer protection reform. Implementation has been significantly disrupted by litigation from physician groups challenging the independent dispute resolution process, with courts issuing multiple injunctions that have complicated enforcement.",
    body: "The No Surprises Act represents the most significant federal consumer protection legislation affecting medical billing since the ACA. The law prohibits balance billing in emergency settings and non-emergency out-of-network care at in-network facilities where patients had no meaningful opportunity to choose their provider — a common source of unexpected bills from anesthesiologists, radiologists, and hospitalists.\n\nFor services covered by the Act, providers may not bill patients beyond in-network cost-sharing amounts. Disputes over payment between insurers and out-of-network providers are resolved through a federal Independent Dispute Resolution (IDR) process administered by certified IDR entities.\n\nThe IDR process has been overwhelmed by volume — over 490,000 disputes filed in the first 18 months versus projections of 22,000 annually. The administrative backlog has created processing delays averaging 10+ months, leaving payment disputes unresolved and creating cash flow strain for providers. Physician groups have filed multiple successful lawsuits challenging the rule's instruction to IDR arbiters to presumptively use the qualifying payment amount (QPA — the insurer's median contracted rate) as the starting point for dispute resolution, arguing this provision tilts the process systematically in favor of insurers.\n\nFederal courts have issued multiple injunctions vacating portions of the IDR guidance, creating significant regulatory uncertainty. The CFPB has separately reported that surprise billing complaints and medical debt remain elevated despite the Act, suggesting gaps between the law's consumer protections and real-world billing practices.\n\nImplementation priorities: (1) IDR capacity scaling through additional certified entity authorization; (2) clear regulatory guidance consistent with court rulings; (3) enhanced enforcement against providers billing in violation of NSA prohibitions; and (4) expanded state-federal coordination for states with pre-existing surprise billing laws."
  },
  {
    id: 10,
    title: "Physician Consolidation Trends: Implications for Cost and Quality",
    area: "Market Structure",
    stat: "74% of physicians now employed by hospitals or corporate entities (2023)",
    abstract: "The rapid consolidation of physician practices into hospital systems, private equity portfolio companies, and corporate health conglomerates has fundamentally altered the structure of physician services markets. Evidence consistently associates consolidation with higher prices and mixed effects on quality, raising antitrust and regulatory questions that current federal enforcement infrastructure struggles to address.",
    body: "Physician employment by hospitals and corporate entities has accelerated dramatically, with AMA data showing 74% of physicians employed in non-independent settings in 2023 versus 42% in 2012. Driving forces include administrative burden from billing and regulatory compliance, malpractice cost volatility, capital requirements for EHR systems, and compensation stability preferences among younger physicians.\n\nPrivate equity acquisition of physician practices has emerged as a distinct consolidation pathway, particularly in anesthesiology, emergency medicine, dermatology, and gastroenterology. PE-backed practice acquisitions totaled an estimated 8,000+ practices between 2012-2022, characterized by rapid add-on acquisitions to achieve market dominance in defined geographic areas.\n\nThe economic consequences are well-documented. Health economist studies consistently find that hospital acquisition of physician practices increases commercial prices for those services by 14-31%, reflecting both elimination of competition and conversion to higher hospital outpatient rates. Private equity acquisitions show similar price effects, with additional evidence of cost-cutting through staffing ratios that may affect care quality.\n\nQuality effects are less consistently documented. Some integration models — particularly those embedding primary care within health systems with advanced care management infrastructure — show quality improvements. However, PE-backed practices in emergency medicine and staffing contexts have been associated with adverse quality indicators in multiple studies.\n\nFTC and DOJ antitrust enforcement has begun addressing physician consolidation, with increased scrutiny of PE roll-up strategies and hospital-physician acquisitions in concentrated markets. However, the agencies' merger review threshold ($119.5M HSR filing threshold as of 2024) exempts a large share of physician practice acquisitions from pre-merger review. Legislative proposals to lower HSR thresholds for healthcare mergers and extend state AG oversight have gained bipartisan support but not yet enacted."
  },
  {
    id: 11,
    title: "Rural Hospital Closures: Drivers, Impacts, and Policy Response",
    area: "Access",
    stat: "186 rural hospitals closed between 2010–2024; 700+ at high closure risk",
    abstract: "Rural hospital closures have accelerated to historic rates over the past decade, driven by payer mix deterioration, workforce shortages, and declining inpatient volume, with disproportionate impact on Southern states that declined Medicaid expansion. Federal and state policy responses have diversified, with global budgets and Rural Emergency Hospital designation representing the most significant structural innovations.",
    body: "Rural hospitals occupy a unique position in the American health system: they provide essential emergency access and anchor community health infrastructure in areas where no market substitute exists, yet their financial model — dependent on an increasingly elderly, government-insured, and medically complex patient population — is structurally challenged under volume-based reimbursement.\n\nThe closure epidemic — 186 rural hospitals since 2010, with Chartis Center data identifying 700+ at high closure risk — is concentrated but not uniform. Non-expansion states account for a disproportionate share of closures, reflecting the role of Medicaid revenue in rural hospital financial sustainability. Southern rural hospitals face compound challenges: highest poverty rates, lowest commercial insurance penetration, most severe physician workforce shortages, and non-expansion Medicaid status.\n\nFederal policy responses have proliferated. The Rural Emergency Hospital (REH) designation, created by Congress in 2020 and implemented in 2023, establishes a new provider type for rural facilities that cannot sustain inpatient services, enabling continued ED and outpatient operation with enhanced Medicare payment rates. Early REH conversion rates have been modest, reflecting community opposition to inpatient service elimination and uncertainty about long-term financial viability under the new designation.\n\nGlobal budget models — led by the Pennsylvania Rural Health Model and CHART — represent a more fundamental structural response, decoupling hospital revenue from inpatient volume and enabling care redesign toward community health investment. These models show early promise but have reached only a small fraction of vulnerable rural facilities.\n\nState-level responses vary widely: some states have created rural hospital stabilization funds, rural workforce incentive programs, and certificate of need reforms specifically calibrated to rural market dynamics. Comprehensive rural hospital policy must address the interdependency of financial sustainability, workforce availability, broadband infrastructure for telehealth, and Medicaid expansion status simultaneously."
  },
  {
    id: 12,
    title: "Health Equity Data Collection Standards: Progress and Gaps",
    area: "Health Equity",
    stat: "Only 36% of hospitals collect SDOH data at the patient level",
    abstract: "Meaningful health equity improvement requires granular, standardized data on race, ethnicity, language, disability status, and social determinants of health across all health system touchpoints. Despite significant federal investment and regulatory pressure, data collection remains inconsistent, underpowered for small populations, and inadequately linked across clinical, social service, and public health systems.",
    body: "Health equity data infrastructure — the collection, stratification, and public reporting of health outcomes by race, ethnicity, language, disability status, and socioeconomic determinants — is foundational to identifying disparities and measuring intervention effectiveness. Federal commitment to equity data has expanded significantly since 2020, with HHS issuing an action plan for equity data collection and CMMI embedding equity requirements into new payment models.\n\nONC's HTI-1 rule (2024) includes USCDI Version 3 requirements that expand standardized demographic and SDOH data elements in certified EHR systems, representing a meaningful advance in data standardization. However, standardized collection capability does not guarantee actual data capture — clinician workflow integration, patient trust, and organizational commitment determine real-world completeness.\n\nRace and ethnicity data quality remains problematic. Hospital discharge data collected under UB-04 billing standards uses an outdated race/ethnicity category structure that inadequately captures multiracial individuals, disaggregated Asian and Pacific Islander populations, and MENA (Middle Eastern and North African) identity. The OMB Statistical Policy Directive 15 revision process — underway as of 2024 — will update federal race/ethnicity standards, requiring subsequent updates across health system data systems at significant operational cost.\n\nSDOH data collection faces different challenges: lack of standardized screening tools, absence of payment to support screening and navigation, privacy concerns about data use and potential discriminatory applications, and limited infrastructure to connect identified needs with community resources. The PRAPARE and Accountable Health Communities screening tools have emerged as de facto standards, but adoption remains below 40% in hospital settings.\n\nLinking clinical data with community-level SDOH measures (neighborhood deprivation indices, housing data, food access metrics) requires multi-sector data governance infrastructure that few communities have developed. The HHS Bridge Access Program and CDC's Social Vulnerability Index represent federal investments in community-level data, but granularity for small geographic areas and small racial/ethnic populations remains insufficient for rigorous equity measurement."
  },
  {
    id: 13,
    title: "Value-Based Drug Contracting: Evidence and Implementation",
    area: "Payment Reform",
    stat: "IRA drug price negotiation projected to save Medicare $98.5B through 2031",
    abstract: "Value-based drug contracts — payment arrangements that tie drug reimbursement to patient outcomes — have gained policy momentum as a mechanism for aligning pharmaceutical payment with clinical value. The IRA's direct Medicare drug price negotiation represents the most significant structural shift, while outcomes-based contracts between payers and manufacturers remain operationally constrained by data and administrative barriers.",
    body: "Value-based drug contracting encompasses a spectrum of arrangements linking pharmaceutical payment to clinical outcomes — from simple formulary placement agreements to complex outcomes-based contracts that rebate a portion of payment if patients fail to achieve specified endpoints. The underlying logic is compelling: aligning payment with value should improve formulary access for effective drugs, reduce overpayment for underperforming therapies, and incentivize manufacturer investment toward clinically meaningful outcomes.\n\nThe Inflation Reduction Act (2022) created the most significant structural shift in US drug payment: direct Medicare drug price negotiation for high-cost drugs without generic competition. CMS completed first-cycle negotiations for 10 drugs in 2024, with negotiated prices taking effect in 2026. Projected savings of $98.5B over 10 years reflect the scale of the pricing misalignment between launch prices and clinical value for the negotiated drugs.\n\nCommercial outcomes-based contracts have proliferated in rhetoric but remain limited in practice. Novartis's Kymriah (CAR-T) launch included a public outcomes-based pricing arrangement with CMS that became a landmark demonstration but has not been widely replicated. Key operational barriers include: (1) lack of real-world outcomes data infrastructure to measure contract endpoints; (2) attribution complexity when multiple treatments and care factors affect patient outcomes; (3) administrative burden of tracking, adjudicating, and reconciling outcomes-based payments; and (4) gross-to-net rebate opacity that makes headline prices disconnected from actual payer payments.\n\nState Medicaid programs have been more active outcomes-based contract adopters, driven by the rebate-after-payment structure that aligns with Medicaid's best price requirements. Arkansas, Louisiana, and Michigan have executed outcomes-based contracts for hepatitis C, multiple sclerosis, and gene therapy products. The Medicaid Drug Rebate Program's technical barriers to outcomes-based pricing — specifically best price calculation for outcomes-contingent rebates — have been partially addressed through CMS guidance but remain a structural constraint."
  },
  {
    id: 14,
    title: "Nursing Workforce Crisis: Projections to 2030",
    area: "Workforce",
    stat: "Projected shortage of 450,000 RNs by 2025 per HHS HRSA modeling",
    abstract: "The United States faces a compound nursing workforce crisis driven by pandemic-era attrition, accelerating retirements among the Baby Boomer nursing cohort, inadequate domestic training pipeline capacity, and chronic wage compression in outpatient and long-term care settings. HRSA projects a shortage of 450,000 RNs by 2025, with disproportionate impact on rural communities, long-term care, and behavioral health settings.",
    body: "The nursing workforce crisis has structural roots predating the COVID-19 pandemic but was dramatically accelerated by the healthcare system's pandemic response. The National Council of State Boards of Nursing's 2023 study documented that 100,000 nurses left the workforce during the pandemic period, with 610,000 additional nurses expressing intent to leave by 2027 due to burnout, moral distress, and inadequate staffing conditions.\n\nBaby Boomer retirement represents the largest single driver of projected shortfall. Approximately 50% of the current RN workforce is over age 50; the coming decade will see large-scale retirement from a cohort that constitutes the bedrock of experienced bedside nursing. Replacement supply through nursing education pipelines is constrained by clinical training site availability, nursing faculty shortages (themselves driven by BSN-to-faculty compensation differentials), and state-by-state variation in nursing school capacity.\n\nThe distribution crisis compounds the aggregate shortage. Rural and underserved communities face acute shortages that cannot be resolved by national aggregate supply improvements. Long-term care settings — nursing homes, assisted living, and home health agencies — compete at a structural disadvantage with hospital wages, creating chronic LTC nurse vacancies that directly affect care quality for frail elderly and disabled populations.\n\nTravel nurse reliance — which expanded dramatically during the pandemic — has partially addressed acute acute-care shortages but at enormous cost. Hospitals in rural and safety-net markets spent $24B on supplemental nurse staffing in 2022, tripling pre-pandemic expenditures, diverting resources from care delivery and capital investment.\n\nPolicy responses include: federal nursing education capacity grants under Title VIII (chronically under-appropriated at 40% of authorized levels); state nurse staffing ratio legislation (California model with limited multistate adoption); immigration pathway expansion for internationally educated nurses; and scope-of-practice reform enabling nurse practitioners to function at full scope without physician supervision in shortage areas."
  },
  {
    id: 15,
    title: "Behavioral Health Parity Enforcement: Persistent Implementation Gap",
    area: "Access",
    stat: "Less than 1% of parity violations result in regulatory sanction",
    abstract: "The Mental Health Parity and Addiction Equity Act (MHPAEA) and its 2008 and 2023 amendments require insurers to apply no more restrictive requirements to behavioral health benefits than to comparable medical/surgical benefits. Despite 15 years of regulatory effort, systematic non-compliance with the law's non-quantitative treatment limitation (NQTL) requirements remains pervasive and enforcement is structurally limited.",
    body: "The Mental Health Parity and Addiction Equity Act (MHPAEA, 2008) established a foundational principle: health insurers covering mental health and substance use disorder (MH/SUD) benefits must apply no more restrictive financial requirements or treatment limitations than those applied to comparable medical/surgical benefits. The ACA extended parity to individual and small group markets, and a 2023 final rule required plans to perform and document comparative analyses of non-quantitative treatment limitations (NQTLs).\n\nNQTLs — prior authorization requirements, step therapy protocols, provider network standards, and care management criteria — represent the primary mechanism through which parity violations occur in practice. Unlike quantitative limits (day limits, visit counts), NQTLs are structural and often embedded in proprietary utilization management criteria that are opaque to plan members and regulators alike.\n\nThe 2023 final rule, implementing 2021 MHPAEA amendments, required plans to perform documented comparative analyses of NQTLs and made those analyses available to federal regulators upon request. DOL, HHS, and OPM have begun using this authority to review plan analyses, but enforcement actions remain extremely rare — less than 1% of identified violations result in regulatory sanction.\n\nSystematic violations documented by state insurance regulators and federal agencies include: prior authorization applied to SUD treatment at rates 3-4x higher than comparable medical conditions; provider network adequacy failures that result in effective out-of-network utilization rates 5-10x higher for MH/SUD than medical/surgical benefits; and step therapy protocols for psychiatric medications that have no equivalent for comparable medical treatments.\n\nEnforcement infrastructure is fundamentally inadequate. DOL has approximately 900 investigators for all ERISA compliance functions across 2.5 million ERISA plans. State insurance departments, which cover non-ERISA markets, vary enormously in parity enforcement capacity and commitment. Consumer remedies — plan grievances and appeals — are available in principle but require individual members to navigate complex administrative processes to vindicate rights that require technical expertise to identify. Structural enforcement reform — including mandatory external parity audits, enhanced penalties, and state-federal coordination — is essential to move from formal rights to functional access."
  },
];

// ─── Utility Helpers ──────────────────────────────────────────────────────────

function fmtICER(icer: number): string {
  if (icer < 0) return "Dominant";
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
  const [yearRange, setYearRange] = useState<[number, number]>([2002, 2022]);
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
    let list = CEA_STUDIES.filter((s) => {
      const q = query.toLowerCase();
      if (q && ![s.title, s.intervention, s.journal, s.condition].some((f) => f.toLowerCase().includes(q))) return false;
      if (condition !== "All" && s.condition !== condition) return false;
      if (verdictFilters.size > 0 && !verdictFilters.has(s.verdict)) return false;
      if (evidenceFilter !== "All" && s.evidence !== evidenceFilter) return false;
      if (s.year < yearRange[0] || s.year > yearRange[1]) return false;
      return true;
    });

    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === "icer") cmp = a.icer - b.icer;
      else if (sortField === "year") cmp = a.year - b.year;
      else if (sortField === "journal") cmp = a.journal.localeCompare(b.journal);
      else cmp = a.title.localeCompare(b.title);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [query, condition, verdictFilters, evidenceFilter, yearRange, sortField, sortDir]);

  const positiveIcers = filtered.filter((s) => s.icer >= 0).map((s) => s.icer);
  const medianIcer = positiveIcers.length ? median(positiveIcers) : null;
  const costEffectiveCount = filtered.filter((s) => s.verdict === "dominant" || s.verdict === "highly-effective" || s.verdict === "cost-effective").length;
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
                    min={2002}
                    max={2022}
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
                    min={2002}
                    max={2022}
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], +e.target.value])}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="w-10 text-right font-medium text-slate-700">{yearRange[1]}</span>
                </div>
              </div>
              {(verdictFilters.size > 0 || evidenceFilter !== "All" || condition !== "All" || query) && (
                <button
                  onClick={() => { setVerdictFilters(new Set()); setEvidenceFilter("All"); setCondition("All"); setQuery(""); setYearRange([2002, 2022]); }}
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
          {filtered.map((study) => (
            <div
              key={study.id}
              className={`grid grid-cols-12 px-4 py-3 hover:bg-slate-50 transition-colors border-l-4 ${VERDICT_ROW_ACCENT[study.verdict]}`}
            >
              <div className="col-span-4 pr-3">
                <div className="font-medium text-slate-800 text-sm leading-tight">{study.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{study.condition}</div>
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <span className="text-sm text-slate-700 font-medium">{study.journal}</span>
                <span className="text-xs text-slate-400">{study.year}</span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-xs text-slate-600 leading-tight">{study.intervention}</span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className={`text-sm font-bold ${study.icer < 0 ? "text-green-700" : study.icer > 200000 ? "text-red-600" : study.icer > 150000 ? "text-amber-600" : study.icer > 50000 ? "text-blue-600" : "text-emerald-700"}`}>
                  {fmtICER(study.icer)}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${VERDICT_BADGE[study.verdict]}`}>
                  {study.verdict === "dominant" ? "Dominant" : study.verdict === "highly-effective" ? "High-Eff." : study.verdict === "cost-effective" ? "Cost-Eff." : study.verdict === "borderline" ? "Borderline" : "Not-Eff."}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${EVIDENCE_CHIP[study.evidence]}`}>{study.evidence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
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
  const totalParticipants = filtered.reduce((acc, m) => acc + m.participants, 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Models Shown", value: filtered.length.toString(), icon: <Layers className="w-4 h-4 text-indigo-500" /> },
          { label: "Active Models", value: activeCount.toString(), icon: <Activity className="w-4 h-4 text-green-500" /> },
          { label: "Total Participants", value: totalParticipants.toLocaleString(), icon: <Users className="w-4 h-4 text-indigo-500" /> },
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
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{model.participants.toLocaleString()} participants</span>
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
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-400 italic">Vermont Health Platform — Research & Policy Library</span>
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
  { id: "cea", label: "CEA/CUA Study Database", icon: <BarChart2 className="w-4 h-4" />, count: 25 },
  { id: "cmmi", label: "CMMI Model Tracker", icon: <Activity className="w-4 h-4" />, count: 20 },
  { id: "briefs", label: "Policy Brief Library", icon: <FileText className="w-4 h-4" />, count: 15 },
];

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
        {activeTab === "cea" && <CEADatabase />}
        {activeTab === "cmmi" && <CMMITracker />}
        {activeTab === "briefs" && <PolicyBriefLibrary />}
      </div>
    </div>
  );
}
