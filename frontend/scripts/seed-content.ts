#!/usr/bin/env npx tsx
/**
 * scripts/seed-content.ts
 *
 * Seeds editorial content across all five pillars:
 *   - policyAnalysis  (5 per pillar = 25 total)
 *   - academyModule   (2 courses × 3 modules = 6 modules)
 *   - definition      (30 glossary terms)
 *   - caseStudy       (5 total)
 *   - analystNote     (5 sidebar notes)
 *
 * Usage:
 *   npx tsx scripts/seed-content.ts
 *
 * Prerequisites:
 *   - SANITY_API_TOKEN (write token) in .env.local or shell env
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set
 */

import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ── Portable Text helpers ────────────────────────────────────────────────────

let keyCounter = 0;
const k = () => `k${++keyCounter}`;

function para(text: string) {
  return {
    _type: "block",
    _key: k(),
    style: "normal",
    children: [{ _type: "span", _key: k(), text, marks: [] }],
    markDefs: [],
  };
}

function h2(text: string) {
  return {
    _type: "block",
    _key: k(),
    style: "h2",
    children: [{ _type: "span", _key: k(), text, marks: [] }],
    markDefs: [],
  };
}

function h3(text: string) {
  return {
    _type: "block",
    _key: k(),
    style: "h3",
    children: [{ _type: "span", _key: k(), text, marks: [] }],
    markDefs: [],
  };
}

function slug(s: string) {
  return { _type: "slug", current: s };
}

function dt(year: number, month: number, day: number) {
  return new Date(year, month - 1, day).toISOString();
}

// ── Policy Analyses ─────────────────────────────────────────────────────────

const policyAnalyses = [
  // POLICY PILLAR
  {
    _id: "policyAnalysis-pol-001",
    _type: "policyAnalysis",
    title: "Vermont's Act 167: Universal Primary Care and Its Fiscal Implications",
    slug: slug("vermont-act-167-universal-primary-care"),
    pillar: "Policy",
    category: "Regulation & Legislation",
    status: "Active",
    impactLevel: "Critical",
    publishedAt: dt(2026, 1, 15),
    summary:
      "Vermont's Act 167 mandates universal primary care coverage for all residents by 2028, creating a $1.2B funding challenge. This analysis examines implementation pathways, federal waiver requirements, and actuarial risk for the state's all-payer model.",
    body: [
      h2("Executive Summary"),
      para(
        "Vermont's Act 167, signed into law in June 2025, represents the most ambitious state-level health coverage expansion since Massachusetts' 2006 Chapter 58. The legislation requires universal primary care enrollment for all Vermont residents by January 1, 2028, regardless of immigration status or employment."
      ),
      h2("Legislative Background"),
      para(
        "The act builds on Vermont's Green Mountain Care Board infrastructure, established under Act 48 (2011). Key provisions include: mandatory enrollment through existing all-payer model networks, a 1.2% payroll surcharge on employers with more than 50 employees, and a federal 1115 waiver application to capture enhanced Medicaid matching funds."
      ),
      h2("Fiscal Analysis"),
      para(
        "The Legislative Joint Fiscal Office estimates first-year costs at $340M, rising to $1.2B by Year 3 as the uninsured population is absorbed. The payroll surcharge is projected to generate $280M annually, leaving a structural gap of approximately $920M that requires federal participation."
      ),
      h3("Federal Waiver Risk"),
      para(
        "CMS approval of the 1115 waiver is not guaranteed. Vermont's previous waiver application for a global budget (2017) was denied under the prior administration. The current CMS leadership has signaled openness to state flexibility, but has not pre-approved universal primary care models."
      ),
      h2("Implementation Timeline"),
      para(
        "Phase 1 (2026): Green Mountain Care Board establishes enrollment infrastructure and contracts with 12 primary care accountable care organizations. Phase 2 (2027): Employer mandate enforcement begins. Phase 3 (2028): Full universal enrollment target."
      ),
      h2("Analyst Recommendation"),
      para(
        "States watching Vermont should monitor the CMS waiver outcome closely. If approved, Act 167 creates a replicable model for universal primary care coverage without full single-payer legislation. If denied, Vermont faces a $920M structural deficit that could force program rollback or tax increases."
      ),
    ],
  },
  {
    _id: "policyAnalysis-pol-002",
    _type: "policyAnalysis",
    title: "PBM Reform Legislation: State-Level Transparency Requirements in 2025-2026",
    slug: slug("pbm-reform-state-transparency-2025-2026"),
    pillar: "Policy",
    category: "Regulation & Legislation",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 1, 28),
    summary:
      "Fourteen states enacted pharmacy benefit manager transparency laws in 2025. This analysis compares spread pricing restrictions, rebate pass-through mandates, and formulary disclosure requirements across enacted legislation.",
    body: [
      h2("The PBM Regulatory Landscape"),
      para(
        "Pharmacy benefit managers process approximately 80% of U.S. prescription drug claims, yet operate with minimal transparency regarding pricing spreads and rebate flows. The 2025 legislative cycle saw unprecedented state-level action, with 14 states enacting PBM transparency bills and 8 more introducing legislation."
      ),
      h2("Key Legislative Provisions"),
      para(
        "The most substantive enacted laws share three core elements: spread pricing prohibition for Medicaid managed care contracts, mandatory rebate pass-through to plan sponsors (typically 85-100%), and annual formulary and network pharmacy disclosure to state insurance commissioners."
      ),
      h2("Market Impact"),
      para(
        "Early data from states that enacted PBM transparency laws in 2023-2024 (New York, Ohio, Arkansas) show 12-18% reduction in net drug costs for state employee health plans in the first year. However, PBMs have responded by restructuring fee arrangements to shift from spread to administrative service fees."
      ),
      h2("Federal Preemption Risk"),
      para(
        "ERISA preemption remains the primary legal vulnerability for state PBM laws. Self-insured employer plans, which cover approximately 61% of privately insured Americans, are exempt from state insurance regulation under ERISA Section 514. States must structure PBM laws to avoid triggering preemption challenges."
      ),
    ],
  },
  {
    _id: "policyAnalysis-pol-003",
    _type: "policyAnalysis",
    title: "Medicaid Redetermination Aftermath: Enrollment Cliff and State Response Strategies",
    slug: slug("medicaid-redetermination-aftermath-state-response"),
    pillar: "Policy",
    category: "Public Health Mandates",
    status: "Active",
    impactLevel: "Critical",
    publishedAt: dt(2026, 2, 5),
    summary:
      "The 2023-2025 Medicaid unwinding disenrolled 23.7M individuals nationally. This analysis examines which state strategies most effectively preserved coverage, and what policy levers remain available for re-enrollment.",
    body: [
      h2("Scale of the Coverage Loss"),
      para(
        "Following the end of continuous enrollment protections, states completed redeterminations between April 2023 and December 2024. Final counts show 23.7M individuals lost Medicaid coverage, with 14.8M estimated to be procedurally disenrolled despite remaining eligible — a significant policy failure."
      ),
      h2("State Performance Variation"),
      para(
        "State outcomes varied dramatically. States with ex parte renewal processes and robust data-sharing with unemployment agencies retained 72% of eligible enrollees. States relying primarily on returned mail as the contact method lost 41% of eligible enrollees. Vermont, notably, achieved the lowest procedural disenrollment rate nationally at 8%."
      ),
      h2("Effective Retention Strategies"),
      para(
        "Evidence-based approaches that minimized eligible disenrollment include: automated income verification through IRS data matches, presumptive eligibility at federally qualified health centers, 12-month continuous eligibility for adults (adopted by 22 states), and partnership with community health workers for outreach."
      ),
    ],
  },
  {
    _id: "policyAnalysis-pol-004",
    _type: "policyAnalysis",
    title: "Certificate of Need Laws in 2026: Expansion, Contraction, and the Rural Hospital Exception",
    slug: slug("certificate-of-need-laws-2026-rural-hospital"),
    pillar: "Policy",
    category: "Regulation & Legislation",
    status: "Active",
    impactLevel: "Medium",
    publishedAt: dt(2026, 2, 14),
    summary:
      "CON laws are being re-evaluated as rural hospital closures accelerate. This analysis tracks the 2025-2026 legislative cycle, where 7 states modified CON programs — some expanding protections, others creating rural exemptions to attract new entrants.",
    body: [
      h2("Background on Certificate of Need"),
      para(
        "Certificate of Need laws, enacted in 36 states and DC, require healthcare providers to obtain state approval before adding beds, acquiring major equipment, or opening new facilities. Originally designed to prevent costly duplication, CON laws have increasingly been criticized for limiting competition and access in underserved markets."
      ),
      h2("2025-2026 Legislative Activity"),
      para(
        "The 2025-2026 legislative cycle represents the most active CON reform period in two decades. Seven states modified their programs: three states narrowed CON requirements for rural facilities (Tennessee, Montana, South Dakota), two states expanded CON to cover outpatient surgery centers (New Jersey, Connecticut), and two states fully repealed their programs (North Carolina rural carve-out, Idaho)."
      ),
      h2("Rural Hospital Exception Model"),
      para(
        "The rural exception model, pioneered by Tennessee's SB 1204, creates a CON-free zone for counties with fewer than 30,000 residents or where the nearest hospital is more than 25 miles away. Early evidence from Tennessee suggests one new Rural Emergency Hospital designation in the first 18 months, with two more applications pending."
      ),
    ],
  },
  {
    _id: "policyAnalysis-pol-005",
    _type: "policyAnalysis",
    title: "Surprise Billing Enforcement: Two Years Under the No Surprises Act",
    slug: slug("surprise-billing-no-surprises-act-enforcement-2026"),
    pillar: "Policy",
    category: "Regulation & Legislation",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 2, 20),
    summary:
      "The No Surprises Act's independent dispute resolution (IDR) process has been overwhelmed — 700,000 disputes filed versus CMS's projected 22,000. This analysis examines arbitration backlog, payer and provider strategies, and reform proposals.",
    body: [
      h2("The IDR System Collapse"),
      para(
        "The No Surprises Act (NSA), effective January 2022, was designed to protect patients from unexpected out-of-network bills. Its independent dispute resolution mechanism allows payers and providers to arbitrate payment disputes. The system has been overwhelmed: CMS projected 22,000 annual disputes; actual filings exceeded 700,000 in 2024 alone."
      ),
      h2("Backlog and Delays"),
      para(
        "The average dispute resolution time has grown from the statutory 30-day window to 14 months as of Q4 2025. Certified IDR entities, licensed to arbitrate disputes, have struggled to staff adequately. Several entities have withdrawn certification, further concentrating caseload."
      ),
      h2("Strategic Behavior"),
      para(
        "Providers — particularly emergency medicine and anesthesiology groups — have used volume IDR filings strategically, anticipating that payers will settle below the qualifying payment amount rather than absorb arbitration costs. Payers have responded by extending network offers to previously non-participating providers to reduce IDR exposure."
      ),
    ],
  },

  // ECONOMICS PILLAR
  {
    _id: "policyAnalysis-eco-001",
    _type: "policyAnalysis",
    title: "Value-Based Care Contract Performance: 2025 Shared Savings Results Across ACO Models",
    slug: slug("value-based-care-aco-shared-savings-2025"),
    pillar: "Economics",
    category: "Value-Based Care Models",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 1, 20),
    summary:
      "CMS released 2025 Medicare Shared Savings Program results showing $2.1B in net savings, with Enhanced Track ACOs generating 4x the savings of Basic Track. This analysis breaks down performance by ACO size, geography, and organizational structure.",
    body: [
      h2("2025 MSSP Results Overview"),
      para(
        "The Medicare Shared Savings Program (MSSP) reported $2.1B in net savings to the Medicare Trust Fund in 2025, the highest since program inception in 2012. Total ACO participation grew to 512 organizations covering 11.4M beneficiaries. The distribution of savings is highly skewed toward Enhanced Track participants."
      ),
      h2("Track-Level Performance"),
      para(
        "Enhanced Track ACOs generated average per-beneficiary savings of $847, versus $212 for Basic Track Level E and minimal savings for lower Basic Track levels. The performance gap reflects Enhanced Track's two-sided risk structure, which incentivizes aggressive care management investment."
      ),
      h2("Organizational Structure Findings"),
      para(
        "Physician-led ACOs without hospital ownership outperformed hospital-led ACOs in per-beneficiary savings by 23%. This confirms prior research suggesting that hospital-led structures face incentive misalignment — hospitals benefit from inpatient volume that ACO contracts reward reducing."
      ),
      h2("Geographic Variation"),
      para(
        "Rural ACOs underperformed urban counterparts by 31% on average savings rates, despite lower baseline costs. Access limitations — particularly specialist availability and transportation — constrain care coordination effectiveness in rural settings. CMS is piloting enhanced rural flex payments in 2026."
      ),
    ],
  },
  {
    _id: "policyAnalysis-eco-002",
    _type: "policyAnalysis",
    title: "Healthcare Private Equity Exit Multiples Compress as Interest Rates Stabilize",
    slug: slug("healthcare-private-equity-exit-multiples-2025"),
    pillar: "Economics",
    category: "Market & Finance",
    status: "Active",
    impactLevel: "Medium",
    publishedAt: dt(2026, 1, 30),
    summary:
      "PE-backed healthcare exits declined 34% by deal count in 2025, with EBITDA multiples compressing from 16x to 11x in physician management organizations. This analysis examines sector-specific dynamics in behavioral health, dental, and urgent care.",
    body: [
      h2("Market Context"),
      para(
        "Healthcare private equity experienced a significant recalibration in 2024-2025 following the interest rate surge of 2022-2023. With the 10-year Treasury stabilizing around 4.2%, leveraged buyout economics have normalized, but the frothy exit environment of 2019-2021 has not returned."
      ),
      h2("Sector-Specific Dynamics"),
      para(
        "Behavioral health remains the most sought-after sub-sector, with 247 transactions in 2025 (down from 312 in 2023 but stable from 2024). Dental services organizations (DSOs) faced the sharpest multiple compression, falling from 14x to 8x EBITDA as Medicaid adult dental expansions have not materialized as projected."
      ),
      h2("Regulatory Headwinds"),
      para(
        "FTC and state attorney general scrutiny of healthcare consolidation has extended deal timelines by an average of 8 months. Three PE-backed transactions were blocked outright in 2025: two anesthesiology roll-ups and one home health acquisition. FTC's 2024 policy statement on physician practice acquisitions explicitly targets roll-up strategies."
      ),
    ],
  },
  {
    _id: "policyAnalysis-eco-003",
    _type: "policyAnalysis",
    title: "Nursing Shortage Economics: Travel Nurse Rate Normalization and Long-Term Workforce Gaps",
    slug: slug("nursing-shortage-travel-nurse-workforce-economics"),
    pillar: "Economics",
    category: "Labor & Workforce Strategy",
    status: "Active",
    impactLevel: "Critical",
    publishedAt: dt(2026, 2, 8),
    summary:
      "Travel nurse rates have declined 52% from 2022 peaks, but underlying structural shortages persist. This analysis projects a 450,000 RN shortfall by 2030 and examines the economics of nursing school expansion, international recruitment, and care team redesign.",
    body: [
      h2("Rate Normalization"),
      para(
        "Travel registered nurse compensation peaked at an average $3,800/week in early 2022 during COVID-driven staffing crises. By Q3 2025, travel RN rates had normalized to $1,820/week — a 52% decline. Hospitals have dramatically reduced reliance on contract labor, with contract RN share of total hours falling from 12% (2022) to 4% (2025)."
      ),
      h2("Structural Shortage Persists"),
      para(
        "Despite rate normalization, the Bureau of Labor Statistics projects 195,000 RN job openings annually through 2031. The American Association of Colleges of Nursing reports that U.S. nursing schools turned away 91,938 qualified applicants in 2024 due to faculty shortages, inadequate clinical placement capacity, and facility constraints."
      ),
      h2("Economic Modeling"),
      para(
        "An HTR analysis projects a net shortage of 450,000 RNs by 2030 under current trajectory. The economic cost of unfilled nursing positions — accounting for vacancy costs, overtime premiums, and quality-of-care impacts — is estimated at $86,000 per unfilled FTE annually, translating to a $38.7B annual burden on U.S. hospitals."
      ),
      h2("Solutions Landscape"),
      para(
        "Three interventions show economic promise: nursing school faculty salary subsidies (ROI of 4.2:1 over 10 years), international nurse recruitment with pathway-to-permanent-residency programs (median 14-month ROI), and team-based care redesign reducing RN task burden by 22% through medical assistant and LPN task redistribution."
      ),
    ],
  },
  {
    _id: "policyAnalysis-eco-004",
    _type: "policyAnalysis",
    title: "Medicare Advantage Risk Adjustment Recalibration: Financial Impact on Health Plans",
    slug: slug("medicare-advantage-risk-adjustment-recalibration"),
    pillar: "Economics",
    category: "Market & Finance",
    status: "Active",
    impactLevel: "Critical",
    publishedAt: dt(2026, 2, 16),
    summary:
      "CMS's 2024-2026 risk adjustment recalibration reduced MA plan payments by an estimated $31B over three years. This analysis examines plan-level financial impacts, benefit reductions, and market exits in rural counties.",
    body: [
      h2("Recalibration Background"),
      para(
        "CMS initiated a risk adjustment model recalibration in 2024, updating the V28 HCC model to reflect more accurate diagnosis coding patterns. The updated model reduced average risk scores by approximately 3.4%, translating to reduced per-member-per-month payments for MA plans."
      ),
      h2("Financial Impact"),
      para(
        "The American Health Insurance Plans (AHIP) estimates cumulative payment reductions of $31B over 2024-2026 across the MA market. Large national plans (UnitedHealth, Humana, CVS/Aetna) have absorbed losses through scale efficiencies and supplemental benefit reductions. Regional plans face existential pressure."
      ),
      h2("Market Exit and Access"),
      para(
        "Forty-three counties — predominantly rural — lost MA plan options for 2026, forcing beneficiaries back to traditional Medicare with limited supplemental coverage options. This represents the highest rural MA exit rate since 2014 and signals potential for further access deterioration."
      ),
    ],
  },
  {
    _id: "policyAnalysis-eco-005",
    _type: "policyAnalysis",
    title: "Hospital Price Transparency Compliance: Three Years After CMS Enforcement",
    slug: slug("hospital-price-transparency-compliance-2026"),
    pillar: "Economics",
    category: "Market & Finance",
    status: "Active",
    impactLevel: "Medium",
    publishedAt: dt(2026, 2, 25),
    summary:
      "CMS has issued $16M in civil monetary penalties for hospital price transparency non-compliance since 2023. This analysis assesses compliance rates by hospital type, the quality of disclosed data, and whether transparency is actually driving price competition.",
    body: [
      h2("Compliance Landscape"),
      para(
        "Three years after CMS began substantive enforcement of hospital price transparency requirements, compliance has reached 82% for large urban hospitals but lags significantly among critical access hospitals (44%) and for-profit multi-site systems (61%). The penalty maximum of $2M per hospital per year has driven compliance among high-revenue institutions."
      ),
      h2("Data Quality Problems"),
      para(
        "Machine-readable file compliance does not equate to usable transparency. An HTR audit of 500 hospital price files found that 67% used non-standard formats incompatible with common price comparison tools, 43% omitted payer-specific negotiated rates for at least one major insurer, and 28% contained pricing errors that would produce misleading consumer information."
      ),
      h2("Price Competition Evidence"),
      para(
        "Early research on whether price transparency drives competition shows mixed results. Markets with high employer concentration and sophisticated benefit consulting show 4-8% price moderation in shoppable services. Markets with limited insurer competition show no measurable price effect. Consumer-facing price shopping remains rare — fewer than 3% of patients report using hospital price tools before seeking care."
      ),
    ],
  },

  // TECHNOLOGY PILLAR
  {
    _id: "policyAnalysis-tech-001",
    _type: "policyAnalysis",
    title: "AI Clinical Decision Support: FDA Regulatory Framework for High-Risk Algorithms",
    slug: slug("ai-clinical-decision-support-fda-regulatory-framework"),
    pillar: "Technology",
    category: "AI & Machine Learning",
    status: "Active",
    impactLevel: "Critical",
    publishedAt: dt(2026, 1, 22),
    summary:
      "FDA's 2025 guidance on predetermined change control plans for AI/ML software as a medical device creates a new regulatory pathway. This analysis examines compliance requirements, the predicate device problem for novel AI, and post-market surveillance obligations.",
    body: [
      h2("FDA's Evolving AI Regulatory Framework"),
      para(
        "The FDA has authorized more than 950 AI-enabled medical devices, with the pace of clearances accelerating to 312 in 2024 alone. The 2025 final guidance on Predetermined Change Control Plans (PCCPs) establishes a framework allowing AI/ML software to learn and adapt post-market without requiring a new 510(k) submission for each modification."
      ),
      h2("High-Risk Algorithm Classification"),
      para(
        "The guidance distinguishes between decision-support software that clinicians are expected to override (lower risk, often exempt from device regulation) and autonomous or locked algorithms driving clinical decisions without independent clinician verification. The latter category faces the most stringent oversight requirements."
      ),
      h2("Predicate Device Challenge"),
      para(
        "Novel AI applications in pathology, radiology, and genomics frequently lack adequate predicate devices for 510(k) substantial equivalence. FDA has pushed 47 applications to the De Novo pathway in 2024-2025, a 340% increase from 2022. De Novo authorization typically requires 18-24 months versus 9-12 months for 510(k) clearance."
      ),
      h2("Post-Market Surveillance"),
      para(
        "PCCPs require manufacturers to establish performance monitoring protocols across diverse patient populations, with mandatory reporting when algorithm performance degrades below pre-specified thresholds. Early implementations have revealed significant performance drops in non-white patient populations for skin condition detection algorithms."
      ),
    ],
  },
  {
    _id: "policyAnalysis-tech-002",
    _type: "policyAnalysis",
    title: "EHR Interoperability: TEFCA Network Participation and Real-World Data Exchange",
    slug: slug("tefca-interoperability-network-participation-2026"),
    pillar: "Technology",
    category: "Digital Health & Telemedicine",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 1, 31),
    summary:
      "The Trusted Exchange Framework and Common Agreement (TEFCA) reached 18 Qualified Health Information Networks by mid-2025. This analysis assesses actual data exchange volume, EHR vendor participation rates, and barriers to clinical workflow integration.",
    body: [
      h2("TEFCA Network Status"),
      para(
        "The Office of the National Coordinator for Health IT (ONC) certified 18 Qualified Health Information Networks (QHINs) under TEFCA by June 2025. Epic, Oracle Health (formerly Cerner), and MEDITECH have all joined at least one QHIN, covering an estimated 73% of U.S. hospital beds."
      ),
      h2("Exchange Volume Reality"),
      para(
        "Despite broad participation, actual clinical data exchange remains limited. ONC's first TEFCA exchange volume report (Q2 2025) showed 2.1M patient record requests per month — significant but a fraction of the 1.3B annual outpatient visits that theoretically benefit from interoperability. Query response rates from some participating organizations remain below 60%."
      ),
      h2("Workflow Integration Barriers"),
      para(
        "The core challenge is not data exchange but workflow integration. Clinicians in HTR's 2025 survey report spending an average 4.2 minutes per patient reconciling information from external sources — a time burden that undermines the efficiency rationale for interoperability. EHR vendors face commercial disincentives to simplify external data integration."
      ),
    ],
  },
  {
    _id: "policyAnalysis-tech-003",
    _type: "policyAnalysis",
    title: "Cybersecurity in Health Systems: Ransomware Trends and Regulatory Response",
    slug: slug("health-system-cybersecurity-ransomware-hipaa-2026"),
    pillar: "Technology",
    category: "Data Security & Governance",
    status: "Active",
    impactLevel: "Critical",
    publishedAt: dt(2026, 2, 10),
    summary:
      "Healthcare ransomware attacks increased 78% in 2024-2025, with average downtime costs of $1.3M per day. This analysis covers HHS's proposed HIPAA Security Rule update, mandatory cyber incident reporting, and essential security controls for clinical environments.",
    body: [
      h2("Ransomware Attack Landscape"),
      para(
        "Healthcare surpassed financial services as the most targeted sector for ransomware attacks in 2024. The Health Information Sharing and Analysis Center (H-ISAC) recorded 847 healthcare ransomware incidents in 2025, a 78% increase from 2023. The Change Healthcare attack (February 2024) demonstrated systemic fragility — a single vendor's compromise disrupted claims processing for 94% of U.S. pharmacies."
      ),
      h2("Financial Impact"),
      para(
        "Average ransomware recovery costs for health systems reached $18.2M in 2025, including ransom payments (where paid), IT remediation, business continuity costs, and regulatory penalties. Average downtime per incident extended to 14 days, with clinical operations costs estimated at $1.3M per day for a 400-bed hospital."
      ),
      h2("HHS Regulatory Response"),
      para(
        "HHS published a proposed HIPAA Security Rule update in December 2024 requiring 72-hour breach notification (reduced from 60 days), mandatory annual penetration testing, multi-factor authentication for all ePHI access, and network segmentation requirements for clinical systems. The rule is expected to be finalized in mid-2026 with an 18-month compliance timeline."
      ),
    ],
  },
  {
    _id: "policyAnalysis-tech-004",
    _type: "policyAnalysis",
    title: "Remote Patient Monitoring Reimbursement: CPT Code Evolution and Adoption Barriers",
    slug: slug("remote-patient-monitoring-reimbursement-cpt-adoption"),
    pillar: "Technology",
    category: "Digital Health & Telemedicine",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 2, 18),
    summary:
      "RPM CPT code utilization grew 340% from 2021-2025, but adoption is concentrated among large integrated systems. This analysis examines reimbursement adequacy, device cost burden, and Medicaid coverage variation across states.",
    body: [
      h2("RPM Utilization Growth"),
      para(
        "Remote patient monitoring billing under CPT codes 99453, 99454, 99457, and 99458 has grown 340% since 2021 when CMS clarified telehealth-era reimbursement policies. An estimated 2.8M Medicare beneficiaries received RPM services in 2025, primarily for chronic conditions including hypertension, diabetes, and heart failure."
      ),
      h2("Adoption Concentration"),
      para(
        "RPM adoption is heavily concentrated among large integrated delivery networks (IDNs) and multi-specialty groups with upfront device procurement capacity. The per-patient device cost of $80-$250 for cellular-enabled monitoring equipment creates a significant capital barrier for independent practices and rural health clinics."
      ),
      h2("Clinical Evidence"),
      para(
        "Meta-analysis of 34 RPM studies in hypertension management shows average systolic blood pressure reduction of 6.8 mmHg versus usual care, with 23% reduction in emergency department visits and 18% reduction in hospitalizations. The clinical evidence base is strongest for hypertension and weakest for behavioral health monitoring, where device-based metrics are less predictive."
      ),
    ],
  },
  {
    _id: "policyAnalysis-tech-005",
    _type: "policyAnalysis",
    title: "Generative AI in Healthcare Administration: Use Cases, Risks, and Governance Frameworks",
    slug: slug("generative-ai-healthcare-administration-governance"),
    pillar: "Technology",
    category: "AI & Machine Learning",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 3, 1),
    summary:
      "Health systems are deploying generative AI for clinical documentation, prior authorization, and revenue cycle management. This analysis examines validated use cases, hallucination risk in clinical contexts, and governance requirements for responsible deployment.",
    body: [
      h2("Deployment Landscape"),
      para(
        "Generative AI adoption in healthcare administration accelerated significantly in 2025, with 61% of health systems reporting at least one production deployment, up from 23% in 2024. Clinical documentation assistance — ambient AI listening and generating structured notes — is the leading use case, followed by prior authorization drafting and coding assistance."
      ),
      h2("Validated Use Cases"),
      para(
        "The strongest evidence for generative AI ROI exists in three areas: ambient clinical documentation (reducing documentation time by 31-47% in validated studies), prior authorization letter drafting (62% reduction in administrative time), and clinical coding assistance (7-12% improvement in coding accuracy for complex cases)."
      ),
      h2("Hallucination Risk in Clinical Contexts"),
      para(
        "Large language model hallucination — generating plausible but incorrect information — poses particular risks in clinical documentation. Studies of ambient AI note-generation show error rates of 2.1-4.7%, including clinically significant errors such as wrong medication doses, incorrect allergy documentation, and symptom omissions."
      ),
      h2("Governance Framework"),
      para(
        "HTR recommends a four-layer governance framework: (1) pre-deployment validation on representative patient populations, (2) mandatory clinician attestation rather than passive acceptance of AI-generated content, (3) ongoing post-deployment monitoring with statistical process control charts, and (4) clear liability policies designating the attending clinician as responsible for AI-assisted documentation."
      ),
    ],
  },

  // CLINICAL PILLAR
  {
    _id: "policyAnalysis-clin-001",
    _type: "policyAnalysis",
    title: "Hospital-at-Home Programs: CMS Acute Hospital Care at Home Waiver Outcomes",
    slug: slug("hospital-at-home-cms-waiver-outcomes-2025"),
    pillar: "Clinical",
    category: "Hospital-at-Home",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 1, 25),
    summary:
      "CMS's Acute Hospital Care at Home waiver covers 330 hospitals in 38 states. This analysis reviews 2024-2025 outcomes data showing comparable clinical quality, 30% lower costs, and patient preference for home-based acute care.",
    body: [
      h2("Program Status"),
      para(
        "The Acute Hospital Care at Home (AHCAH) waiver, initially granted as a COVID-19 emergency measure, was extended through December 2026 by the Further Consolidated Appropriations Act. As of January 2026, 330 hospitals in 38 states are approved to provide acute-level care in patients' homes, covering conditions including pneumonia, cellulitis, COPD exacerbation, and heart failure."
      ),
      h2("Clinical Outcomes"),
      para(
        "The largest published outcomes study, covering 11,246 patients across 12 health systems (2022-2024), shows 30-day readmission rates of 6.8% for hospital-at-home versus 9.4% for matched inpatient controls — a 27.7% reduction. Mortality rates were statistically equivalent. Patient satisfaction scores were 18% higher for hospital-at-home admissions."
      ),
      h2("Cost Analysis"),
      para(
        "Average total episode cost for hospital-at-home is 30-35% below equivalent inpatient stays, driven primarily by reduced overhead allocation, elimination of facility-acquired infection costs, and reduced length-of-stay variation. For a 400-bed system diverting 5% of eligible admissions to home, estimated annual savings range from $8M to $14M."
      ),
      h2("Operational Barriers"),
      para(
        "Scaling hospital-at-home requires significant upfront investment: mobile monitoring equipment ($1,200-$2,400 per patient), clinical logistics infrastructure, and 24/7 rapid-response nursing capacity. The staffing model — requiring in-person visits twice daily plus remote monitoring — is economically viable only at volumes exceeding 150 concurrent patients for most systems."
      ),
    ],
  },
  {
    _id: "policyAnalysis-clin-002",
    _type: "policyAnalysis",
    title: "Precision Medicine and Pharmacogenomics: Payer Coverage Policies in 2025",
    slug: slug("precision-medicine-pharmacogenomics-payer-coverage-2025"),
    pillar: "Clinical",
    category: "Precision Medicine",
    status: "Active",
    impactLevel: "Medium",
    publishedAt: dt(2026, 2, 3),
    summary:
      "Pharmacogenomic testing coverage has expanded significantly, with 78% of commercial plans covering PGx testing for at least one drug-gene pair. This analysis compares coverage policies, clinical utility evidence, and CMS's Medicare coverage determination.",
    body: [
      h2("Pharmacogenomics Coverage Landscape"),
      para(
        "Pharmacogenomic (PGx) testing enables clinicians to select medications and doses based on a patient's genetic profile, reducing adverse drug reactions and improving therapeutic efficacy. Commercial payer coverage has expanded significantly: 78% of large commercial plans cover PGx testing for at least one drug-gene pair, up from 41% in 2021."
      ),
      h2("Most Commonly Covered Tests"),
      para(
        "Drug-gene pairs with the strongest commercial coverage include: CYP2C19 for clopidogrel dosing (cardiovascular), CYP2D6 for codeine and tamoxifen (oncology and pain management), TPMT/NUDT15 for thiopurine dosing (oncology), and HLA-B*57:01 for abacavir hypersensitivity (HIV). Multi-gene panel testing — covering 25+ genes simultaneously — is covered by fewer than 40% of commercial plans."
      ),
      h2("CMS Coverage Status"),
      para(
        "Medicare coverage remains fragmented. CMS issued a Local Coverage Determination (LCD) framework in 2023 establishing coverage for PGx testing in specific oncology contexts but declined to issue a National Coverage Determination for broader PGx panels. This has created geographic variation in Medicare coverage depending on which MAC jurisdiction covers the beneficiary."
      ),
    ],
  },
  {
    _id: "policyAnalysis-clin-003",
    _type: "policyAnalysis",
    title: "Virtual Care Access and Quality: Post-Pandemic Telehealth in Clinical Practice",
    slug: slug("virtual-care-telehealth-post-pandemic-quality-access"),
    pillar: "Clinical",
    category: "Virtual Care Models",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 2, 12),
    summary:
      "Telehealth volumes stabilized at 12% of all outpatient visits in 2025, down from pandemic peaks but 8x pre-COVID levels. This analysis examines specialty variation, quality indicators, no-show rates, and the evidence base for audio-only visits.",
    body: [
      h2("Telehealth Volume Stabilization"),
      para(
        "Following the pandemic-driven surge to 32% of outpatient visits in 2020, telehealth volumes have stabilized at approximately 12% of all outpatient encounters in 2025. This level represents an 8x increase over pre-COVID baseline of 1.4%. The stabilization suggests telehealth has achieved lasting integration into clinical workflow rather than reverting to minimal use."
      ),
      h2("Specialty Variation"),
      para(
        "Telehealth integration varies dramatically by specialty. Behavioral health leads at 38% of visits conducted virtually. Dermatology (28%), neurology (22%), and endocrinology (19%) follow. Primary care averages 14%. Surgical specialties, procedural gastroenterology, and ophthalmology remain below 5%, where hands-on examination is clinically essential."
      ),
      h2("Quality Evidence"),
      para(
        "For behavioral health — the dominant telehealth use case — outcomes data is consistently positive. PHQ-9 depression score improvement rates in telepsychiatry match or exceed in-person benchmarks in four of five published studies. HEDIS performance measures for depression follow-up at 30 and 84 days improved in health plans with high telehealth penetration."
      ),
    ],
  },
  {
    _id: "policyAnalysis-clin-004",
    _type: "policyAnalysis",
    title: "Sepsis Protocol Standardization: SEP-1 Bundle Compliance and Mortality Outcomes",
    slug: slug("sepsis-sep1-bundle-compliance-mortality-outcomes"),
    pillar: "Clinical",
    category: "Population Health",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 2, 22),
    summary:
      "CMS's SEP-1 bundle compliance reached 76% nationally in 2025, but compliance rates show minimal correlation with sepsis mortality. This analysis examines the bundle's clinical evidence base, measurement limitations, and proposed updates from the Surviving Sepsis Campaign.",
    body: [
      h2("SEP-1 Compliance Status"),
      para(
        "CMS's Severe Sepsis and Septic Shock Early Management Bundle (SEP-1) measures compliance with six specific interventions within prescribed time windows. National compliance reached 76% in 2025, up from 49% when the measure was introduced in 2015. Compliance variation by hospital type remains significant: academic medical centers average 84%, while critical access hospitals average 61%."
      ),
      h2("Mortality Correlation Controversy"),
      para(
        "The most significant challenge to SEP-1's validity is the weak correlation between bundle compliance and mortality outcomes. Analysis of 5-year Medicare data shows that hospitals with the highest SEP-1 compliance scores have sepsis mortality rates statistically indistinguishable from low-compliance hospitals. This has fueled debate about whether the bundle measures process improvements that matter clinically."
      ),
      h2("Proposed Bundle Updates"),
      para(
        "The Surviving Sepsis Campaign's 2025 guideline revision proposes replacing the time-anchored SEP-1 bundle with a treat-to-target approach emphasizing lactate-guided resuscitation endpoints. CMS has initiated a public comment period on potential SEP-1 revisions, with implementation of any updated measure not expected before 2028."
      ),
    ],
  },
  {
    _id: "policyAnalysis-clin-005",
    _type: "policyAnalysis",
    title: "Maternal Mortality Crisis: Evidence-Based Interventions and State-Level Performance",
    slug: slug("maternal-mortality-interventions-state-performance-2026"),
    pillar: "Clinical",
    category: "Population Health",
    status: "Active",
    impactLevel: "Critical",
    publishedAt: dt(2026, 3, 5),
    summary:
      "The U.S. maternal mortality rate of 23.8 per 100,000 live births remains the highest among high-income nations. This analysis examines state-level variation from 7.3 to 43.1 per 100,000, evidence-based bundles, and the racial equity dimension of maternal outcomes.",
    body: [
      h2("National Maternal Mortality Status"),
      para(
        "The United States recorded a maternal mortality rate of 23.8 per 100,000 live births in 2024 — the highest among comparably resourced nations and more than triple the rates of Canada, Australia, and the United Kingdom. After a decade of modest progress, rates increased 26% during 2020-2022 before partially recovering."
      ),
      h2("State-Level Variation"),
      para(
        "Maternal mortality variation across states is dramatic and not fully explained by case mix or demographics. California (7.3 per 100,000) leads the nation following 15 years of implementing the California Maternal Quality Care Collaborative's evidence-based toolkits. Mississippi (43.1 per 100,000), Louisiana (38.4), and Oklahoma (35.7) have the worst outcomes, driven by limited access to obstetric care and high rates of chronic conditions."
      ),
      h2("Racial Disparities"),
      para(
        "Black women die from pregnancy-related causes at 3.4 times the rate of white women — a disparity that persists after controlling for income, education, and clinical risk factors. Research increasingly implicates structural racism in healthcare settings, including differential pain assessment and treatment, discharge against patient concerns, and less frequent access to high-volume obstetric centers."
      ),
      h2("Evidence-Based Interventions"),
      para(
        "The Alliance for Innovation on Maternal Health (AIM) bundles — standardized protocols for obstetric emergencies including hemorrhage, hypertension, and venous thromboembolism — have demonstrated 22-38% reduction in severe maternal morbidity in implementing hospitals. As of 2025, 41 states have adopted AIM bundles at the hospital level, though implementation fidelity varies widely."
      ),
    ],
  },

  // EQUITY PILLAR
  {
    _id: "policyAnalysis-equ-001",
    _type: "policyAnalysis",
    title: "Social Determinants Screening in Clinical Settings: Evidence for Population Health ROI",
    slug: slug("sdoh-screening-clinical-population-health-roi"),
    pillar: "Equity",
    category: "SDOH Integration",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 1, 18),
    summary:
      "SDOH screening using tools like PRAPARE and AHC-HRSN is now required by CMS for certain value-based contracts. This analysis examines screening completion rates, referral-to-resolution pathways, and evidence for ROI on community resource investments.",
    body: [
      h2("SDOH Screening Policy Context"),
      para(
        "The Accountable Health Communities Health-Related Social Needs (AHC-HRSN) screening tool is now required for Medicare and Medicaid beneficiaries in 47 CMS Innovation Center models. Commercial payers including UnitedHealth's Optum and Humana have incorporated SDOH screening into chronic disease management programs. Approximately 34% of U.S. health systems report implementing systematic SDOH screening in clinical workflows."
      ),
      h2("Screening Performance"),
      para(
        "Universal SDOH screening completion rates average 61% in health systems with established workflows, with significant variation by care setting: primary care (72%), emergency department (48%), and inpatient (81%). Social need prevalence rates in screened populations: food insecurity (28%), housing instability (19%), transportation barriers (23%), and utility assistance needs (16%)."
      ),
      h2("Referral-to-Resolution Gap"),
      para(
        "The most significant implementation challenge is the referral-to-resolution gap. Among patients screening positive for social needs, 74% receive a referral to a community resource, but only 31% successfully access the resource within 90 days. Barriers include community resource capacity constraints, navigation complexity, and patient engagement challenges."
      ),
      h2("Economic Case"),
      para(
        "HTR's analysis of three published SDOH intervention ROI studies finds a median return of $2.40 per dollar invested in community resource navigation and food security interventions for high-risk Medicaid populations. Returns are concentrated in ED visit reduction and avoidable hospitalization prevention. Payback periods average 18-24 months, requiring payer/provider alignment to capture."
      ),
    ],
  },
  {
    _id: "policyAnalysis-equ-002",
    _type: "policyAnalysis",
    title: "Algorithmic Bias in Clinical AI: Detection Methods and Mitigation Strategies",
    slug: slug("algorithmic-bias-clinical-ai-detection-mitigation"),
    pillar: "Equity",
    category: "Algorithmic Bias",
    status: "Active",
    impactLevel: "Critical",
    publishedAt: dt(2026, 2, 1),
    summary:
      "Commercial clinical algorithms show documented racial and gender bias in sepsis prediction, pain assessment, and nephrology scoring. This analysis covers auditing methodologies, regulatory guidance under HHS Section 1557, and bias mitigation approaches.",
    body: [
      h2("Documented Bias in Clinical Algorithms"),
      para(
        "Multiple high-profile studies have documented racial and gender bias in widely deployed clinical algorithms. The Obermeyer et al. (2019) study in Science demonstrated that a commercial risk-stratification algorithm used by major health systems systematically underestimated the severity of illness in Black patients by assigning lower risk scores relative to clinical need — a bias rooted in using healthcare cost as a proxy for health status."
      ),
      h2("Scope of Affected Algorithms"),
      para(
        "Documented bias exists across multiple clinical domains: sepsis prediction models underperforming in Black patients (4 of 7 published validations), pain assessment algorithms trained predominantly on white patient data showing reduced accuracy for Asian and Hispanic populations, nephrology eGFR equations (now revised) historically overestimating kidney function in Black patients, and pulmonary function tests using race-based reference equations that may be scientifically unfounded."
      ),
      h2("Regulatory Framework"),
      para(
        "HHS Office for Civil Rights has indicated that Section 1557 of the ACA prohibits the use of discriminatory clinical algorithms in covered entities. The 2024 Section 1557 final rule explicitly addresses algorithmic discrimination, requiring health systems to assess AI and decision-support tools for discriminatory impact. Enforcement mechanisms and audit requirements are still being developed."
      ),
      h2("Mitigation Approaches"),
      para(
        "Algorithmic bias mitigation requires action at three stages: (1) development — ensuring diverse and representative training datasets, subgroup performance reporting, and fairness constraints in model optimization; (2) validation — mandatory subgroup performance analysis before deployment; and (3) post-market monitoring — ongoing performance surveillance stratified by race, gender, age, and socioeconomic proxies."
      ),
    ],
  },
  {
    _id: "policyAnalysis-equ-003",
    _type: "policyAnalysis",
    title: "Rural Healthcare Access: Facility Closures, Workforce Gaps, and Broadband Infrastructure",
    slug: slug("rural-healthcare-access-closures-workforce-broadband"),
    pillar: "Equity",
    category: "Access Disparity",
    status: "Active",
    impactLevel: "Critical",
    publishedAt: dt(2026, 2, 9),
    summary:
      "147 rural hospitals have closed since 2010, and 600+ are at risk of closure. This analysis connects facility closure data to workforce shortages, broadband infrastructure gaps limiting telehealth access, and the equity implications for rural populations.",
    body: [
      h2("Rural Hospital Closure Trajectory"),
      para(
        "The Chartis Center for Rural Health documents 147 rural hospital closures since 2010, with an acceleration to 19 closures in 2025 — the highest annual total since 2020. An additional 600+ rural hospitals are classified as financially vulnerable, defined as operating with negative EBITDA margins for two consecutive years."
      ),
      h2("Geographic Impact"),
      para(
        "Rural hospital closures concentrate in the South and Midwest, with 10 states accounting for 68% of closures. Counties with hospital closures experience 5.9% increase in cardiovascular mortality, 3.2% increase in maternal mortality, and 11% reduction in local employment within 5 years of closure — impacts that extend far beyond healthcare access."
      ),
      h2("Workforce Dimension"),
      para(
        "Rural communities face a compounding challenge: not only are facilities closing, but workforce shortages make reopening or replacing closed services increasingly difficult. Rural areas have 63 primary care physicians per 100,000 residents versus 112 per 100,000 in urban areas. Psychiatry shortage is more severe: 9.3 rural psychiatrists per 100,000 versus 24.1 urban."
      ),
      h2("Broadband and Telehealth"),
      para(
        "Federal Communications Commission broadband data shows 19.4M rural Americans lack access to fixed broadband meeting the FCC's 25/3 Mbps threshold — a population that cannot reliably access video telehealth services. The Infrastructure Investment and Jobs Act's $65B broadband investment aims to close this gap by 2030, but construction timelines suggest the coverage gap will persist for 5-7 years."
      ),
    ],
  },
  {
    _id: "policyAnalysis-equ-004",
    _type: "policyAnalysis",
    title: "Language Access in Healthcare: Legal Requirements and Implementation Gaps",
    slug: slug("language-access-healthcare-legal-requirements-gaps"),
    pillar: "Equity",
    category: "Access Disparity",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 2, 19),
    summary:
      "Section 1557 requires language access for LEP patients, but compliance is inconsistent. This analysis examines telephonic versus in-person interpreter quality, the role of machine translation, and language access as a patient safety issue.",
    body: [
      h2("Legal Framework"),
      para(
        "Section 1557 of the ACA prohibits discrimination on the basis of national origin in covered healthcare programs, which HHS interprets to require meaningful access for Limited English Proficient (LEP) patients. Approximately 26M U.S. residents are LEP, including 10.6M who speak Spanish and 9M who speak Asian and Pacific Island languages as their primary language."
      ),
      h2("Compliance Landscape"),
      para(
        "A 2025 Joint Commission review of 200 hospitals found 67% had qualified medical interpreter services available 24/7 for the top three languages spoken in their market, but only 29% had such services for the top 10 languages. Telephone interpreter services are available more broadly, but call connection wait times averaged 8.4 minutes — a significant barrier in urgent clinical situations."
      ),
      h2("Patient Safety Implications"),
      para(
        "Communication failures in LEP patients are associated with adverse event rates 2-3x higher than English-proficient patients. The most common preventable adverse events include medication errors (wrong dose or frequency conveyed in translation), missed follow-up due to discharge instructions not understood, and delayed diagnosis due to symptom history misinterpretation."
      ),
    ],
  },
  {
    _id: "policyAnalysis-equ-005",
    _type: "policyAnalysis",
    title: "Community Health Worker Integration: Certification, Reimbursement, and Outcomes",
    slug: slug("community-health-worker-certification-reimbursement-outcomes"),
    pillar: "Equity",
    category: "Community Engagement",
    status: "Active",
    impactLevel: "High",
    publishedAt: dt(2026, 3, 3),
    summary:
      "Medicaid CHW reimbursement is now available in 33 states under 1905(a)(6) and 1115 waivers. This analysis examines state certification requirements, evidence-based models, and the integration of CHWs into value-based care arrangements.",
    body: [
      h2("Community Health Worker Policy Landscape"),
      para(
        "Community health workers (CHWs) — frontline public health workers who share lived experience with the communities they serve — have emerged as a cost-effective strategy for addressing social determinants and improving health equity. The Affordable Care Act and subsequent state Medicaid expansions have created new reimbursement pathways enabling sustainable CHW employment in clinical settings."
      ),
      h2("Reimbursement Expansion"),
      para(
        "As of January 2026, 33 states have authorized Medicaid reimbursement for CHW services under Section 1905(a)(6) of the Social Security Act or through Section 1115 demonstration waivers. Average Medicaid reimbursement for CHW services ranges from $28 to $67 per hour of direct service, with most states requiring physician or advanced practice provider supervision."
      ),
      h2("Evidence Base"),
      para(
        "The strongest evidence for CHW effectiveness exists in three domains: diabetes self-management support (average A1c reduction of 0.9 percentage points in six published randomized controlled trials), hypertension control (14% improvement in controlled blood pressure in community-based programs), and maternal health outreach (18% reduction in preterm birth in high-risk populations)."
      ),
      h2("Value-Based Care Integration"),
      para(
        "CHWs create the most value in two-sided risk contracts where the plan or ACO captures savings from reduced hospitalizations and ED visits. An HTR financial model for a 50,000-member Medicaid ACO shows CHW program ROI of 3.1:1 over three years, with break-even at 22 months assuming full implementation and adequate caseloads of 80-120 active patients per CHW."
      ),
    ],
  },
];

// ── Academy Modules ─────────────────────────────────────────────────────────

const academyModules = [
  // Course 1: Value-Based Care Fundamentals
  {
    _id: "academyModule-vbc-001",
    _type: "academyModule",
    title: "Introduction to Value-Based Care: From Volume to Value",
    slug: slug("intro-value-based-care-volume-to-value"),
    courseTitle: "Value-Based Care Fundamentals",
    moduleNumber: 1,
    totalModules: 3,
    nextModuleSlug: "understanding-risk-contracts-and-shared-savings",
    pillar: "Economics",
    level: "Foundational",
    estimatedReadTime: 20,
    publishedAt: dt(2026, 1, 10),
    learningObjectives: [
      "Explain the core difference between fee-for-service and value-based payment models",
      "Identify the five primary VBC contract structures used in U.S. healthcare",
      "Describe how quality measurement and cost efficiency interact in VBC performance",
      "Evaluate why the shift to value has been slower than projected in the 2010 ACA era",
    ],
    summary:
      "This module introduces the conceptual foundations of value-based care, tracing the policy journey from fee-for-service dominance to today's complex mix of payment models. Learners will understand the core trade-offs, key stakeholders, and measurement frameworks that define VBC success.",
    body: [
      h2("What Is Value-Based Care?"),
      para(
        "Value-based care (VBC) is a healthcare delivery model in which providers are compensated based on patient health outcomes rather than the volume of services provided. The core formula is simple: Value = Quality ÷ Cost. In practice, defining, measuring, and aligning incentives around this formula has proven enormously complex."
      ),
      h2("The Fee-for-Service Problem"),
      para(
        "Under fee-for-service (FFS) reimbursement, providers are paid for each discrete service rendered — each office visit, procedure, test, and hospitalization generates a claim. This creates a structural incentive to provide more services, regardless of whether additional services improve patient outcomes. The U.S. spends $4.5T annually on healthcare — 17% of GDP — with outcomes rankings 30th or lower among high-income nations on key metrics."
      ),
      h2("Primary VBC Contract Structures"),
      para(
        "Five main contract structures have emerged in the shift to value: (1) Pay-for-Performance (P4P) — bonuses or penalties based on quality metric performance. (2) Bundled Payments — single payment for an episode of care across multiple providers. (3) Shared Savings — providers share in savings generated below a benchmark. (4) Shared Risk — providers share in both savings and losses. (5) Global Capitation — fixed per-member-per-month payment regardless of services provided."
      ),
      h2("Why the Transition Has Been Slow"),
      para(
        "Despite the ACA's ambitious targets for alternative payment model adoption, the U.S. healthcare system remains predominantly fee-for-service. Several structural forces slow the transition: provider capital constraints preventing care transformation investment, data infrastructure gaps limiting performance measurement, actuarial uncertainty making risk-based contracts financially dangerous for smaller organizations, and commercial payer reluctance to move faster than Medicare."
      ),
      h2("Module Summary"),
      para(
        "Value-based care represents a fundamental redesign of healthcare incentives — from rewarding volume to rewarding outcomes. Understanding the contract structures, measurement frameworks, and structural barriers is essential for any healthcare professional navigating today's payment landscape. In Module 2, we examine how shared savings and risk contracts are structured and negotiated."
      ),
    ],
  },
  {
    _id: "academyModule-vbc-002",
    _type: "academyModule",
    title: "Understanding Risk Contracts and Shared Savings Models",
    slug: slug("understanding-risk-contracts-and-shared-savings"),
    courseTitle: "Value-Based Care Fundamentals",
    moduleNumber: 2,
    totalModules: 3,
    prevModuleSlug: "intro-value-based-care-volume-to-value",
    nextModuleSlug: "care-management-vbc-strategies",
    pillar: "Economics",
    level: "Intermediate",
    estimatedReadTime: 25,
    publishedAt: dt(2026, 1, 17),
    learningObjectives: [
      "Calculate shared savings distributions under one-sided and two-sided risk models",
      "Identify the actuarial factors that determine benchmark setting methodology",
      "Distinguish between upside-only, downside risk, and global capitation risk structures",
      "Apply minimum savings rate (MSR) and minimum loss rate (MLR) concepts to contract analysis",
    ],
    summary:
      "This module dives into the mechanics of shared savings and risk-bearing contracts, including benchmark methodology, minimum savings/loss rates, and the progression from one-sided to two-sided risk. Learners will develop practical skills in analyzing VBC contract terms.",
    body: [
      h2("One-Sided vs. Two-Sided Risk"),
      para(
        "In a one-sided risk model, the provider organization shares in savings if performance falls below the cost benchmark, but faces no penalty if costs exceed the benchmark. This asymmetric structure reduces provider financial risk but also reduces incentive intensity — providers have less to lose from poor performance."
      ),
      para(
        "Two-sided risk contracts require providers to share in losses when costs exceed the benchmark, in addition to sharing in savings. The stronger financial incentive drives more aggressive care management investment but requires substantial capital reserves to absorb potential losses. Medicare's Enhanced Track ACOs operate under two-sided risk."
      ),
      h2("Benchmark Methodology"),
      para(
        "The cost benchmark is the target against which performance is measured. CMS's MSSP benchmark methodology uses a blend of national expenditure trends and the ACO's own historical costs. The blending formula reduces the penalty for ACOs that start from a high-cost baseline (rewarding regression to the mean) while limiting savings for already-efficient ACOs (the 'efficient ACO problem')."
      ),
      h2("Minimum Savings Rate"),
      para(
        "The minimum savings rate (MSR) is the threshold below which the ACO does not share in savings — a buffer zone protecting CMS from paying savings that fall within normal statistical variation. For smaller ACOs (under 5,000 beneficiaries), the MSR can reach 3.9%, meaning the ACO must reduce costs nearly 4% below benchmark before receiving any payment."
      ),
      h2("Capitation vs. Shared Savings"),
      para(
        "Global capitation — a fixed monthly payment per member — represents the most complete transfer of insurance risk from payer to provider. Unlike shared savings, which settles annually, capitation requires monthly cash flow management. Organizations without actuarial infrastructure and adequate reserve capital face significant financial exposure in capitation arrangements."
      ),
    ],
  },
  {
    _id: "academyModule-vbc-003",
    _type: "academyModule",
    title: "Care Management Strategies for VBC Success",
    slug: slug("care-management-vbc-strategies"),
    courseTitle: "Value-Based Care Fundamentals",
    moduleNumber: 3,
    totalModules: 3,
    prevModuleSlug: "understanding-risk-contracts-and-shared-savings",
    pillar: "Economics",
    level: "Intermediate",
    estimatedReadTime: 22,
    publishedAt: dt(2026, 1, 24),
    learningObjectives: [
      "Apply risk stratification frameworks to identify high-impact patient populations",
      "Design care team structures appropriate for chronic disease management in VBC contexts",
      "Evaluate the evidence base for high-touch care management interventions",
      "Measure the ROI of care management programs using total cost of care methodology",
    ],
    summary:
      "Value-based contracts succeed or fail based on care management execution. This module covers risk stratification, care team design, evidence-based interventions for high-cost patient populations, and financial modeling for care management program investment.",
    body: [
      h2("Risk Stratification: Finding the Right Patients"),
      para(
        "Effective care management begins with identifying patients most likely to generate high costs or experience avoidable adverse events. Risk stratification uses claims data, clinical data, and increasingly social determinants information to segment patients into risk tiers. The top 1% of patients by cost typically account for 22% of total spending; the top 5% account for 50%."
      ),
      h2("Care Team Models"),
      para(
        "High-performing VBC organizations deploy multi-disciplinary care teams aligned to patient risk tier. Complex patients (top 5% risk) typically receive intensive care management: dedicated care manager (RN or social worker), monthly care manager contact, quarterly physician review, and social needs navigation. Moderate-risk patients (5-15%) receive less intensive monitoring with automated outreach and pharmacist medication management."
      ),
      h2("Evidence-Based Interventions"),
      para(
        "The interventions with the strongest evidence for total cost of care reduction in high-risk populations include: transitional care management programs (18-25% 30-day readmission reduction), medication adherence support (12% reduction in diabetes-related hospitalizations), behavioral health integration in primary care (8% total cost reduction in depression-comorbid populations), and home-based palliative care for serious illness patients (31% reduction in ICU utilization in last 6 months of life)."
      ),
      h2("Measuring Care Management ROI"),
      para(
        "Care management programs typically require 12-18 months before generating measurable cost savings. An HTR model for a 1,000-patient high-risk care management program estimates fully loaded cost of $850,000 annually (1.0 FTE care manager, infrastructure, data). Expected savings from avoidable hospitalization prevention: $1.2-1.8M annually, yielding an ROI of 1.4:1 to 2.1:1."
      ),
    ],
  },

  // Course 2: Health Equity Foundations
  {
    _id: "academyModule-heq-001",
    _type: "academyModule",
    title: "Defining Health Equity: Concepts, Frameworks, and Measurement",
    slug: slug("defining-health-equity-concepts-frameworks-measurement"),
    courseTitle: "Health Equity Foundations",
    moduleNumber: 1,
    totalModules: 3,
    nextModuleSlug: "social-determinants-of-health-clinical-integration",
    pillar: "Equity",
    level: "Foundational",
    estimatedReadTime: 18,
    publishedAt: dt(2026, 2, 7),
    learningObjectives: [
      "Distinguish between health equality, equity, and justice as policy frameworks",
      "Identify the primary social determinants of health and their relative contribution to population health outcomes",
      "Apply the Robert Wood Johnson Foundation's County Health Rankings model to local data",
      "Evaluate how CMS and NCQA measure health equity in value-based care programs",
    ],
    summary:
      "Health equity is both a moral imperative and an operational challenge for healthcare organizations. This module establishes the conceptual foundations — distinguishing equality from equity, mapping the social determinants of health, and connecting theory to measurement frameworks used by CMS, NCQA, and leading health systems.",
    body: [
      h2("Equality vs. Equity vs. Justice"),
      para(
        "Three terms are often used interchangeably but carry distinct meanings. Equality means everyone receives the same resources or treatment regardless of need. Equity means resources are distributed according to need, so that everyone has a fair opportunity to achieve the same health outcomes. Justice addresses the structural causes of inequity — the policies, systems, and practices that create differential needs in the first place."
      ),
      para(
        "In healthcare policy, the equity framework requires recognizing that identical care delivered to patients with different social circumstances will produce different outcomes. A hypertension management protocol applied uniformly to a patient with stable housing and food security and to a patient experiencing homelessness and food insecurity will not produce equitable results."
      ),
      h2("Social Determinants of Health"),
      para(
        "The CDC estimates that health behaviors (30%), social and economic factors (40%), and physical environment (10%) account for 80% of health outcomes — with clinical care accounting for only 20%. The primary social determinants include: economic stability (income, employment, poverty), education access and quality, healthcare access and quality, neighborhood and built environment, and social and community context."
      ),
      h2("Measurement Frameworks"),
      para(
        "CMS has embedded health equity into value-based care measurement through the MSSP equity benchmark adjustment, the Health Equity Index in Medicare Star Ratings, and mandatory stratification of quality measure performance by race, ethnicity, and dual eligibility status. NCQA's Health Equity Accreditation program sets standards for health plan equity performance, including HEDIS measure stratification and community partnership requirements."
      ),
    ],
  },
  {
    _id: "academyModule-heq-002",
    _type: "academyModule",
    title: "Social Determinants of Health: Clinical Integration and Community Partnerships",
    slug: slug("social-determinants-of-health-clinical-integration"),
    courseTitle: "Health Equity Foundations",
    moduleNumber: 2,
    totalModules: 3,
    prevModuleSlug: "defining-health-equity-concepts-frameworks-measurement",
    nextModuleSlug: "building-health-equity-programs-roi-measurement",
    pillar: "Equity",
    level: "Intermediate",
    estimatedReadTime: 24,
    publishedAt: dt(2026, 2, 14),
    learningObjectives: [
      "Implement an SDOH screening protocol using validated instruments (PRAPARE, AHC-HRSN)",
      "Design closed-loop referral processes connecting clinical SDOH identification to community resources",
      "Evaluate community benefit investment decisions using a health equity lens",
      "Build a community health worker program integrated with clinical care teams",
    ],
    summary:
      "This module moves from theory to implementation: how health systems screen for social needs, build referral pathways, partner with community-based organizations, and measure the impact of social intervention on health outcomes.",
    body: [
      h2("SDOH Screening Instruments"),
      para(
        "Two instruments dominate clinical SDOH screening: PRAPARE (Protocol for Responding to and Assessing Patients' Assets, Risks, and Experiences) and the AHC-HRSN screening tool developed by CMS. PRAPARE covers 21 social domains including housing, food, transportation, employment, safety, and social isolation. AHC-HRSN focuses on five core needs with a 10-question instrument better suited for high-volume clinical settings."
      ),
      h2("Closed-Loop Referral Systems"),
      para(
        "Identifying social needs without a reliable pathway to resource connection generates patient harm — raising concerns and then failing to address them damages trust. Effective SDOH programs establish closed-loop referral processes using community resource platforms (Unite Us, Findhelp, NowPow) that transmit referrals electronically to community-based organizations and receive confirmation of service delivery."
      ),
      h2("Community Partnership Models"),
      para(
        "Health systems connect to community resources through three partnership models: (1) referral-only partnerships — the health system refers but does not fund community programs; (2) contracted partnerships — the health system contracts with CBOs for defined services with performance metrics; and (3) investment partnerships — the health system makes capital or operating grants to CBOs in exchange for reporting and access commitments."
      ),
      h2("Community Health Worker Integration"),
      para(
        "Community health workers are most effective when embedded within clinical care teams rather than housed in separate community programs. Integration requires: dedicated space in clinical settings, access to the EHR for documentation and care plan review, inclusion in care team huddles and patient rounds, and a defined scope of practice with clear boundaries relative to licensed clinicians."
      ),
    ],
  },
  {
    _id: "academyModule-heq-003",
    _type: "academyModule",
    title: "Building Health Equity Programs: ROI, Accountability, and Organizational Change",
    slug: slug("building-health-equity-programs-roi-measurement"),
    courseTitle: "Health Equity Foundations",
    moduleNumber: 3,
    totalModules: 3,
    prevModuleSlug: "social-determinants-of-health-clinical-integration",
    pillar: "Equity",
    level: "Advanced",
    estimatedReadTime: 26,
    publishedAt: dt(2026, 2, 21),
    learningObjectives: [
      "Develop a health equity program business case using total cost of care and quality improvement methodology",
      "Design governance structures that sustain organizational accountability for equity outcomes",
      "Apply disparity measurement techniques to identify priority populations and gaps",
      "Navigate the political and cultural dynamics of health equity program implementation",
    ],
    summary:
      "This advanced module addresses the organizational challenge of building durable health equity programs — making the financial case, establishing accountability structures, measuring disparities rigorously, and managing the institutional dynamics of equity-focused change.",
    body: [
      h2("The Health Equity Business Case"),
      para(
        "Health equity programs compete for organizational resources with other clinical and operational priorities. Making a compelling business case requires quantifying the financial impact of disparities on total cost of care, revenue, reputation, and regulatory compliance. Disparities in chronic disease management translate directly to higher rates of avoidable hospitalization — a cost that falls partly on value-based contracts."
      ),
      h2("Disparity Measurement"),
      para(
        "Rigorous disparity measurement requires three elements: stratification variables (race, ethnicity, language, dual eligibility, disability status), validated performance measures that are meaningful across populations, and sufficient sample sizes to detect statistically significant differences for smaller demographic subgroups. Most health systems lack adequate data infrastructure for robust disparity measurement, particularly for patients identifying with multiple racial categories or smaller Asian subgroups."
      ),
      h2("Governance and Accountability"),
      para(
        "Health equity programs without executive accountability structures tend to be underfunded and deprioritized when competing demands arise. Best-practice governance includes: a Chief Health Equity Officer with direct access to the CEO, board-level reporting of equity metrics alongside financial performance, equity impact assessment requirements for major strategic decisions, and compensation alignment connecting executive pay to equity outcome improvement."
      ),
      h2("Organizational Change Dynamics"),
      para(
        "Health equity work generates distinctive organizational dynamics: staff who experience the disparities as members of affected communities bring essential perspective but may face emotional burden disproportionate to their role; equity initiatives may be perceived as implicitly critical of current clinical practice; and the systems-level nature of disparities can create fatalism about individual-level intervention. Effective leaders acknowledge these dynamics explicitly and create structures for ongoing dialogue."
      ),
    ],
  },
];

// ── Glossary Definitions ────────────────────────────────────────────────────

const definitions = [
  { term: "ACO (Accountable Care Organization)", description: "A network of doctors, hospitals, and other healthcare providers that voluntarily coordinates care for Medicare patients, with the goal of delivering high-quality care and reducing costs. ACOs that meet quality standards and reduce spending below a benchmark share in the savings with CMS.", pillars: ["Economics", "Policy"] },
  { term: "All-Payer Model", description: "A healthcare payment system in which all payers — commercial insurance, Medicare, Medicaid, and others — pay the same rate for the same services from the same provider. Vermont and Maryland operate the only two all-payer systems in the U.S.", pillars: ["Policy", "Economics"] },
  { term: "Algorithmic Bias", description: "Systematic and repeatable errors in a computer system that create unfair outcomes, such as privileging one race, gender, or socioeconomic group over others. In healthcare, algorithmic bias has been documented in risk stratification, diagnostic imaging AI, and insurance underwriting systems.", pillars: ["Technology", "Equity"] },
  { term: "Benchmark (VBC)", description: "In value-based care, the expected or target cost for a defined population over a specified time period, against which actual spending is compared to determine shared savings or losses. Benchmark methodologies vary significantly across payers and programs.", pillars: ["Economics"] },
  { term: "Bundled Payment", description: "A single combined payment to providers for all services related to a treatment or condition, such as a knee replacement from surgery through rehabilitation. Bundles incentivize coordination across the care continuum and shift episode-level risk to providers.", pillars: ["Economics", "Policy"] },
  { term: "Capitation", description: "A payment model in which a provider or health system receives a fixed amount per enrolled patient per month, regardless of how many services that patient uses. Capitation transfers insurance risk from payer to provider and incentivizes preventive care and care management.", pillars: ["Economics"] },
  { term: "Certificate of Need (CON)", description: "A regulatory requirement in 36 states and Washington DC that healthcare facilities must obtain state approval before adding beds, acquiring major equipment, or opening new facilities. CON laws were designed to prevent duplication and control costs but are debated for limiting competition.", pillars: ["Policy"] },
  { term: "CHW (Community Health Worker)", description: "A frontline public health worker who is a trusted member of and has close understanding of the community served. CHWs bridge the gap between healthcare providers and the community, providing culturally competent health education, advocacy, and referrals to social services.", pillars: ["Equity"] },
  { term: "CMMI (Center for Medicare and Medicaid Innovation)", description: "The federal center within CMS authorized under the ACA to test, evaluate, expand, and implement innovative health care payment and service delivery models. CMMI models include ACOs, bundled payments, direct contracting, and state innovation waivers.", pillars: ["Policy", "Economics"] },
  { term: "CMS (Centers for Medicare and Medicaid Services)", description: "The federal agency within HHS that administers Medicare, Medicaid, the Children's Health Insurance Program (CHIP), and the Health Insurance Marketplace. CMS is the largest single payer in U.S. healthcare, covering approximately 160M Americans.", pillars: ["Policy"] },
  { term: "ERISA", description: "The Employee Retirement Income Security Act of 1974, a federal law that sets minimum standards for most voluntarily established retirement and health plans in private industry. ERISA Section 514 preempts state laws that relate to employee benefit plans, limiting states' ability to regulate self-insured employer health plans.", pillars: ["Policy"] },
  { term: "eGFR (Estimated Glomerular Filtration Rate)", description: "A laboratory value used to assess kidney function, calculated from serum creatinine, age, sex, and historically race. The race-based correction factor was removed in 2021 following evidence that it systematically overestimated kidney function in Black patients, delaying access to transplant evaluation.", pillars: ["Clinical", "Equity"] },
  { term: "Fee-for-Service (FFS)", description: "A payment model in which providers are paid for each service, test, or procedure performed. FFS is the dominant payment model in U.S. healthcare and has been criticized for incentivizing volume over value and contributing to overutilization of low-value services.", pillars: ["Economics", "Policy"] },
  { term: "FQHC (Federally Qualified Health Center)", description: "Community-based healthcare providers that receive funds from the HRSA Health Center Program to provide primary care services in underserved areas. FQHCs serve patients on a sliding-fee scale based on ability to pay and receive enhanced Medicare and Medicaid reimbursement rates.", pillars: ["Equity", "Policy"] },
  { term: "HEDIS (Healthcare Effectiveness Data and Information Set)", description: "A set of standardized performance measures developed by NCQA used by more than 90% of U.S. health plans to measure performance in key areas of care, service, and health. HEDIS measures are used for plan accreditation, provider contracting, and public reporting.", pillars: ["Policy", "Economics"] },
  { term: "HCC (Hierarchical Condition Category)", description: "A risk adjustment methodology used by CMS to estimate expected healthcare costs for Medicare Advantage and ACO beneficiaries. HCC codes derived from ICD-10 diagnoses are used to calculate risk scores that adjust benchmark payments for patient health status.", pillars: ["Economics"] },
  { term: "HIPAA (Health Insurance Portability and Accountability Act)", description: "A 1996 federal law that created national standards for the protection of sensitive patient health information (PHI). The Privacy Rule and Security Rule establish requirements for how covered entities and business associates handle, store, and transmit individually identifiable health information.", pillars: ["Policy", "Technology"] },
  { term: "Hospital-at-Home", description: "A care model in which acute-level hospital services — including IV medications, monitoring, physician visits, and nursing care — are delivered in the patient's home. CMS's Acute Hospital Care at Home waiver allows approved hospitals to bill for home-based acute admissions.", pillars: ["Clinical", "Economics"] },
  { term: "ICD-10-CM", description: "The International Classification of Diseases, 10th Revision, Clinical Modification — the standard diagnostic coding system used for documenting diagnoses in all U.S. healthcare settings. ICD-10-CM contains more than 70,000 codes and is updated annually by CMS and the CDC.", pillars: ["Clinical", "Technology"] },
  { term: "IDR (Independent Dispute Resolution)", description: "The arbitration process established under the No Surprises Act (2022) to resolve payment disputes between out-of-network providers and health plans. The system has been overwhelmed with filings — exceeding 700,000 annually versus CMS's projected 22,000.", pillars: ["Policy", "Economics"] },
  { term: "LEP (Limited English Proficiency)", description: "A designation for individuals who do not speak English as their primary language and have a limited ability to read, speak, write, or understand English. Under Section 1557 of the ACA, healthcare entities receiving federal funds must provide meaningful access to services for LEP individuals.", pillars: ["Equity", "Policy"] },
  { term: "LLM (Large Language Model)", description: "A type of artificial intelligence model trained on large text datasets that can generate, summarize, and reason about natural language. In healthcare, LLMs are being deployed for clinical documentation assistance, prior authorization drafting, coding support, and patient-facing chatbots.", pillars: ["Technology"] },
  { term: "MSSP (Medicare Shared Savings Program)", description: "CMS's primary ACO program, allowing groups of providers to form ACOs that share in savings generated below a Medicare spending benchmark. MSSP offers Basic and Enhanced tracks with different risk levels, quality requirements, and shared savings rates.", pillars: ["Economics", "Policy"] },
  { term: "PBM (Pharmacy Benefit Manager)", description: "Third-party administrators that manage prescription drug benefits on behalf of health insurers, Medicare Part D plans, large employers, and other payers. PBMs negotiate drug prices with manufacturers, develop formularies, process claims, and contract with pharmacy networks. Major PBMs include CVS Caremark, Express Scripts, and OptumRx.", pillars: ["Economics", "Policy"] },
  { term: "PCMH (Patient-Centered Medical Home)", description: "A primary care model that provides comprehensive, coordinated, accessible, patient-centered care facilitated by appropriate use of technology and team-based care. NCQA PCMH recognition is a common standard for primary care practices seeking value-based contracts.", pillars: ["Clinical", "Economics"] },
  { term: "Pharmacogenomics (PGx)", description: "The study of how genes affect a person's response to drugs. PGx testing identifies genetic variants that predict drug metabolism, efficacy, and adverse reactions, enabling more precise prescribing. Drug-gene pairs with strong clinical evidence include CYP2C19/clopidogrel and TPMT/thiopurines.", pillars: ["Clinical", "Technology"] },
  { term: "QHIN (Qualified Health Information Network)", description: "A network certified under the Trusted Exchange Framework and Common Agreement (TEFCA) to enable nationwide health information exchange. QHINs serve as the backbone of ONC's interoperability initiative, connecting EHR systems, payers, public health agencies, and other participants.", pillars: ["Technology", "Policy"] },
  { term: "Risk Adjustment", description: "A statistical process used to account for differences in patient health status when comparing costs and outcomes across plans, providers, or populations. Risk adjustment prevents adverse selection by ensuring that providers or plans serving sicker populations receive higher payments.", pillars: ["Economics", "Policy"] },
  { term: "SDOH (Social Determinants of Health)", description: "The conditions in the environments where people are born, live, learn, work, play, worship, and age that affect a wide range of health, functioning, and quality-of-life outcomes and risks. SDOH are estimated to account for 30-55% of health outcomes, far exceeding the contribution of clinical care.", pillars: ["Equity", "Policy"] },
  { term: "TEFCA (Trusted Exchange Framework and Common Agreement)", description: "ONC's framework for creating a universal floor for interoperability in the U.S. health system. TEFCA establishes common rules, terms, and governance for health information exchange through Qualified Health Information Networks (QHINs).", pillars: ["Technology", "Policy"] },
];

// ── Case Studies ─────────────────────────────────────────────────────────────

const caseStudies = [
  {
    _id: "caseStudy-001",
    _type: "caseStudy",
    title: "Vermont: Building a Statewide All-Payer ACO from the Ground Up",
    slug: slug("vermont-all-payer-aco-case-study"),
    pillar: "Economics",
    clientType: "State Government",
    summary:
      "Vermont's All-Payer ACO Model, operating since 2018, provides lessons on statewide value-based care transformation: what worked, what didn't, and what other states can replicate in the next generation of all-payer models.",
    metrics: ["$112M net savings over 5 years", "4.2% reduction in total cost of care", "12% improvement in primary care access", "32% of Vermonters in value-based arrangements"],
    body: [
      h2("Background"),
      para("Vermont launched the All-Payer ACO Model in 2018 as the first statewide alternative payment model in the U.S. to include Medicare, Medicaid, and commercial payers under a single accountability framework. The model covers approximately 70% of Vermont's insured population under value-based arrangements."),
      h2("Model Structure"),
      para("OneCare Vermont serves as the ACO responsible for managing care for attributed beneficiaries across all payers. The model uses prospective capitation for Medicaid and shared savings for Medicare, with commercial contracts varying by plan. A statewide care management infrastructure supports complex patients across care settings."),
      h2("Outcomes"),
      para("Over five years, the Vermont All-Payer ACO generated $112M in net savings relative to projected expenditure growth, reduced total cost of care by 4.2%, and improved primary care access metrics. However, quality measure performance showed mixed results, with improvements in diabetes and hypertension management offset by stagnation in behavioral health access measures."),
      h2("Lessons for Other States"),
      para("Vermont's experience demonstrates that statewide ACO models require: (1) robust state-level data infrastructure for attribution and measurement, (2) dedicated care management investment beyond what individual provider organizations can sustain, and (3) multi-year financial commitment from all payers before savings materialize. The model's primary limitation has been incomplete commercial payer participation — the two largest commercial plans have remained outside the full risk arrangement."),
    ],
  },
  {
    _id: "caseStudy-002",
    _type: "caseStudy",
    title: "Kaiser Permanente Northern California: AI-Augmented Sepsis Detection at Scale",
    slug: slug("kaiser-permanente-ai-sepsis-detection"),
    pillar: "Technology",
    clientType: "Integrated Delivery Network",
    summary:
      "Kaiser Permanente Northern California deployed an ML-based sepsis early warning system across 21 hospitals, reducing sepsis mortality by 17% over two years through earlier detection and standardized response protocols.",
    metrics: ["17% reduction in sepsis mortality", "21 hospitals deployed", "4.2-hour earlier detection", "$34M estimated annual savings from prevented deaths and complications"],
    body: [
      h2("The Clinical Challenge"),
      para("Sepsis affects 1.7M Americans annually and is responsible for 270,000 deaths — the leading cause of in-hospital mortality. Early identification is the single most important determinant of outcomes, but clinical signs are often subtle in early sepsis, and busy clinical environments create cognitive overload that delays recognition."),
      h2("Algorithm Development"),
      para("KPNC's machine learning sepsis model was trained on 648,000 patient encounters and uses 70+ input variables including vital signs, lab values, nursing assessments, and medication administration patterns. The model produces a risk score updated every 15 minutes with a positive predictive value of 32% for sepsis onset within 12 hours — compared to 7% for SIRS-based criteria."),
      h2("Implementation Approach"),
      para("The implementation team learned from failed earlier alert systems that alert fatigue is the primary barrier to clinical adoption. Key design decisions: alerts fire to the bedside RN rather than through the EHR notification system, alert threshold set to generate no more than 2 alerts per nurse per shift, clear escalation protocol attached to every alert, and daily feedback to clinical units on alert performance."),
      h2("Outcomes"),
      para("At 24-month follow-up, sepsis mortality decreased 17% across the 21-hospital system. Time from first clinical deterioration signal to antibiotic administration decreased by 4.2 hours. The cost-effectiveness analysis estimates $34M in annual savings from prevented mortality, shorter ICU stays, and reduced sepsis complications. Alert acceptance rates exceeded 78%, unusually high for clinical decision support."),
    ],
  },
  {
    _id: "caseStudy-003",
    _type: "caseStudy",
    title: "Camden Coalition: The Original Hotspotting Model for High-Need Patients",
    slug: slug("camden-coalition-hotspotting-complex-patients"),
    pillar: "Equity",
    clientType: "Community Coalition",
    summary:
      "The Camden Coalition of Healthcare Providers pioneered the health 'hotspotting' approach — intensive care management for the highest-cost, highest-need patients — including lessons from a landmark randomized controlled trial that found no reduction in 180-day readmissions.",
    metrics: ["Super-utilizer focus: top 1% of cost", "180-day RCT found null readmission result", "Subsequent redesign targeting most amenable sub-populations", "National replication in 40+ communities"],
    body: [
      h2("The Hotspotting Concept"),
      para("The Camden Coalition, founded by Dr. Jeffrey Brenner in Camden, NJ, pioneered the concept of 'hotspotting' — using claims data to identify patients who cycle repeatedly through emergency departments and hospitals at enormous cost and personal suffering. The top 1% of Camden patients by cost accounted for 30% of all healthcare spending."),
      h2("The RCT Result"),
      para("A 2020 New England Journal of Medicine RCT tested the Camden Coalition's intensive care management intervention against usual care in 800 super-utilizers. The primary finding: no statistically significant difference in 180-day readmissions. This result generated significant attention and soul-searching about what intensive care management can and cannot achieve."),
      h2("What the RCT Taught"),
      para("Post-trial analysis revealed important nuance: the intervention showed significant benefit for patients with behavioral health comorbidities and unstable housing — populations where social needs were driving utilization — but no benefit for patients whose repeated utilization reflected purely clinical complexity. The null overall result masked heterogeneous treatment effects."),
      h2("Redesign and Legacy"),
      para("The Coalition redesigned its intervention to focus explicitly on patients with modifiable social needs driving utilization, and has documented improved outcomes in this sub-population. More broadly, the hotspotting model has been replicated in 40+ communities nationally. The NEJM RCT's honest reporting — even a null result — became a model for the field's willingness to learn from rigorously evaluated failures."),
    ],
  },
  {
    _id: "caseStudy-004",
    _type: "caseStudy",
    title: "Intermountain Health: Hospital-at-Home Program Design and Operations",
    slug: slug("intermountain-hospital-at-home-operations"),
    pillar: "Clinical",
    clientType: "Health System",
    summary:
      "Intermountain Health's Advanced Care at Home program, one of the largest Hospital-at-Home programs in the U.S., provides operational detail on patient selection, clinical logistics, technology infrastructure, and the economics of scaling home-based acute care.",
    metrics: ["400+ concurrent patients at scale", "32% lower cost vs. inpatient", "6.2% 30-day readmission (vs. 9.8% inpatient matched)", "97% patient satisfaction"],
    body: [
      h2("Program Overview"),
      para("Intermountain Health's Advanced Care at Home (ACH) program treats patients with acute-level medical conditions in their home environment. Approved under the CMS Acute Hospital Care at Home waiver, the program covers conditions including pneumonia, COPD exacerbation, cellulitis, heart failure, UTI, and post-operative monitoring."),
      h2("Patient Selection"),
      para("Not all acute admissions are appropriate for home-based care. Intermountain's inclusion criteria require: clinical stability appropriate for twice-daily in-person nursing visits, home environment meeting safety and space requirements, caregiver availability for 8+ hours daily, reliable cellular connectivity for monitoring devices, and patient and family preference for home-based care. Approximately 15-18% of eligible acute admissions are enrolled."),
      h2("Clinical Operations Model"),
      para("Each ACH patient receives: twice-daily in-person visits from a mobile nurse or advanced practice provider, real-time continuous monitoring via a cellular hub transmitting vitals to a clinical operations center, 24/7 physician telemedicine coverage with in-person rapid response backup, daily physician review, and same-day laboratory and medication delivery through contracted pharmacy and laboratory partners."),
      h2("Economics"),
      para("Intermountain's published cost analysis shows ACH episodes average 32% below matched inpatient stays. The savings source is primarily reduced overhead allocation (no room-and-board cost), shorter length of stay (4.1 days ACH vs. 5.8 days inpatient for comparable DRGs), and near-elimination of hospital-acquired conditions. The program requires $8-12M in infrastructure investment to reach the 400-patient concurrent census needed for operational efficiency."),
    ],
  },
  {
    _id: "caseStudy-005",
    _type: "caseStudy",
    title: "California Maternal Quality Care Collaborative: Reducing Maternal Mortality Through Clinical Bundles",
    slug: slug("california-cmqcc-maternal-mortality-bundles"),
    pillar: "Clinical",
    clientType: "Quality Collaborative",
    summary:
      "California achieved the lowest maternal mortality rate in the U.S. (7.3/100K) through 15 years of CMQCC clinical bundles, real-time surveillance, and a culture of safety. This case study details the bundle development, implementation, and measurement approach that other states are now replicating.",
    metrics: ["7.3/100K maternal mortality (lowest in U.S.)", "55% reduction in hemorrhage deaths", "40% reduction in VTE-related deaths", "15 years of sustained implementation"],
    body: [
      h2("CMQCC Background"),
      para("The California Maternal Quality Care Collaborative (CMQCC) was established in 2006 as a public-private partnership to improve maternal outcomes in California's 250+ birthing hospitals. California's maternal mortality rate at inception was 17.2 per 100,000 — comparable to the national average. By 2024, California achieved 7.3 per 100,000 — the lowest in the nation and approaching European benchmarks."),
      h2("The Bundle Approach"),
      para("CMQCC's clinical toolkits — now adopted nationally as the Alliance for Innovation on Maternal Health (AIM) bundles — provide standardized, evidence-based protocols for the leading causes of maternal death: obstetric hemorrhage, severe hypertension and preeclampsia, venous thromboembolism, and peripartum cardiomyopathy. Each toolkit includes: recognition triggers, standardized response protocols, simulation training materials, and measurement tools."),
      h2("Implementation Infrastructure"),
      para("CMQCC's model includes a real-time mortality surveillance system that identifies every maternal death within 30 days and conducts structured case review. This rapid feedback loop — unusual in quality improvement — allows identification of emerging safety signals before they become trends. The surveillance system also enabled California to identify that COVID-19 significantly increased maternal mortality risk 18 months before national data showed the trend."),
      h2("Replication Strategy"),
      para("The AIM program has now been adopted in 41 states, with CMQCC providing technical assistance and training. Early adopter states show 20-35% reduction in severe maternal morbidity within 24 months of full bundle implementation. States with the weakest outcomes — primarily those without state-level perinatal quality collaboratives — are the least engaged with AIM, creating a troubling quality gap that maps directly onto the states with highest maternal mortality."),
    ],
  },
];

// ── Analyst Notes ─────────────────────────────────────────────────────────────

function analystNoteBody(text: string) {
  return [
    {
      _type: "block",
      _key: k(),
      style: "normal",
      children: [{ _type: "span", _key: k(), text, marks: [] }],
      markDefs: [],
    },
  ];
}

const analystNotes = [
  {
    _id: "analystNote-001",
    _type: "analystNote",
    isActive: true,
    headline: "CMS Risk Adjustment V28",
    content: analystNoteBody(
      "The V28 HCC model recalibration is materially compressing MA plan margins. Watch for benefit cuts in 2027 plan filings — particularly vision, dental, and OTC benefits — as plans absorb $31B in payment reductions over 3 years."
    ),
    author: "HTR Analytics Desk",
  },
  {
    _id: "analystNote-002",
    _type: "analystNote",
    isActive: true,
    headline: "Sepsis Bundle Reform Coming",
    content: analystNoteBody(
      "CMS is actively reviewing SEP-1 in response to mounting evidence that strict bundle compliance doesn't correlate with mortality outcomes. Expect proposed rule changes by Q3 2026 shifting toward treat-to-target lactate protocols. Hospitals should avoid over-investing in current SEP-1 workflow automation."
    ),
    author: "HTR Clinical Intelligence",
  },
  {
    _id: "analystNote-003",
    _type: "analystNote",
    isActive: true,
    headline: "Travel Nurse Market: Watch Floors",
    content: analystNoteBody(
      "Travel RN rates have stabilized around $1,820/week but may find a new floor. Healthcare staffing agencies report contract volumes up 8% sequentially — early signal of demand recovery. The structural nursing shortage (450K gap projected by 2030) suggests rates won't return to 2021 lows."
    ),
    author: "HTR Economics Desk",
  },
  {
    _id: "analystNote-004",
    _type: "analystNote",
    isActive: true,
    headline: "GenAI Hallucination Risk",
    content: analystNoteBody(
      "Ambient AI documentation tools show 2.1-4.7% error rates in clinical note generation — including clinically significant errors. Mandatory clinician attestation (not passive sign-off) should be a non-negotiable governance requirement before any health system goes live. Passive acceptance creates liability exposure."
    ),
    author: "HTR Technology Watch",
  },
  {
    _id: "analystNote-005",
    _type: "analystNote",
    isActive: true,
    headline: "Vermont Act 167: Watch Waiver",
    content: analystNoteBody(
      "Vermont's universal primary care mandate (Act 167) hinges on a CMS 1115 waiver approval worth ~$920M in federal matching funds. CMS has not pre-approved. If denied, Vermont faces a structural deficit that could force program rollback before 2028 implementation. This is the most consequential state health policy experiment of 2026."
    ),
    author: "HTR Policy Intelligence",
  },
];

// ── Seeding Functions ─────────────────────────────────────────────────────────

async function seedCollection(name: string, docs: any[]) {
  console.log(`\nSeeding ${docs.length} ${name}…`);
  let succeeded = 0;
  for (const doc of docs) {
    try {
      await sanity.createOrReplace(doc);
      console.log(`  ✓ ${doc.title ?? doc.headline ?? doc.term ?? doc._id}`);
      succeeded++;
    } catch (err: any) {
      console.error(`  ✗ ${doc._id}: ${err.message}`);
    }
  }
  console.log(`  ${succeeded}/${docs.length} seeded successfully.`);
}

async function main() {
  console.log("Vermont Health Platform — Content Seed Script");
  console.log("==============================================");
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}\n`);

  await seedCollection("policyAnalysis documents", policyAnalyses);
  await seedCollection("academyModule documents", academyModules);
  await seedCollection("definition documents", definitions.map((d, i) => ({
    _id: `definition-${String(i + 1).padStart(3, "0")}`,
    _type: "definition",
    term: d.term,
    description: d.description,
    pillars: d.pillars,
  })));
  await seedCollection("caseStudy documents", caseStudies);
  await seedCollection("analystNote documents", analystNotes);

  console.log("\n==============================================");
  console.log("Seed complete. Summary:");
  console.log(`  Policy Analyses: ${policyAnalyses.length}`);
  console.log(`  Academy Modules: ${academyModules.length}`);
  console.log(`  Definitions:     ${definitions.length}`);
  console.log(`  Case Studies:    ${caseStudies.length}`);
  console.log(`  Analyst Notes:   ${analystNotes.length}`);
  console.log(`  TOTAL:           ${policyAnalyses.length + academyModules.length + definitions.length + caseStudies.length + analystNotes.length} documents`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
