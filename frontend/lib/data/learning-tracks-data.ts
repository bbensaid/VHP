/**
 * Learning Tracks — curated module curricula for structured learning paths.
 * Each track groups modules by topic and level. Module slugs map to Sanity
 * academyModule records; description/objectives are used as fallback display
 * content while Sanity is populated.
 */

export type TrackModule = {
  slug: string;          // Sanity academyModule slug
  title: string;
  estimatedMinutes: number;
  level: "Foundational" | "Intermediate" | "Advanced";
  summary: string;
  learningObjectives: string[];
};

export type LearningTrack = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  badgeColor: string;
  targetAudience: string[];
  totalMinutes: number;
  modules: TrackModule[];
};

export const learningTracks: LearningTrack[] = [
  // ── TRACK 1: Health Economics Foundations (Novice) ──────────────────────────
  {
    id: "health-economics-foundations",
    title: "Health Economics Foundations",
    subtitle: "Start here: the essential framework for understanding how money flows in healthcare — from first principles to APM readiness.",
    icon: "🏛️",
    badge: "Foundational",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    targetAudience: ["Clinicians entering healthcare leadership", "New healthcare administrators", "Policy analysts and advocates", "Graduate students in health sciences"],
    totalMinutes: 320,
    modules: [
      {
        slug: "hef-module-01-why-healthcare-costs-so-much",
        title: "Why Does Healthcare Cost So Much?",
        estimatedMinutes: 35,
        level: "Foundational",
        summary: "Demand inelasticity, information asymmetry, and moral hazard — the three structural forces that make healthcare unlike any other market.",
        learningObjectives: [
          "Explain why healthcare demand is price-inelastic compared to other goods",
          "Describe the principal-agent problem between patients, clinicians, and payers",
          "Define moral hazard and explain how insurance design influences utilization",
          "Apply the concept of market failure to justify government intervention in healthcare",
        ],
      },
      {
        slug: "hef-module-02-who-pays-for-what",
        title: "Who Pays for What? The Payer Landscape",
        estimatedMinutes: 40,
        level: "Foundational",
        summary: "A complete map of who pays for healthcare in America — commercial insurance, Medicare, Medicaid, self-pay — and how premium dollars become provider payments.",
        learningObjectives: [
          "Distinguish between commercial, Medicare, and Medicaid payer types and their beneficiary populations",
          "Explain actuarial risk, premium-setting, and underwriting in commercial insurance",
          "Describe cost-sharing mechanisms: deductibles, copays, coinsurance, and out-of-pocket maximums",
          "Trace the flow of a premium dollar from employer to insurer to hospital",
        ],
      },
      {
        slug: "hef-module-03-how-hospitals-make-money",
        title: "How Hospitals Make (and Lose) Money",
        estimatedMinutes: 45,
        level: "Foundational",
        summary: "Revenue cycle basics, case mix index, payer mix, and the operating margin — the financial metrics every healthcare professional should understand.",
        learningObjectives: [
          "Define net patient revenue, operating margin, and days cash on hand",
          "Explain Case Mix Index (CMI) and how DRG-based payment works",
          "Describe how payer mix (% commercial vs. Medicaid) drives financial sustainability",
          "Identify how uncompensated care and 340B drug pricing affect hospital economics",
        ],
      },
      {
        slug: "hef-module-04-medicare-and-medicaid-101",
        title: "Medicare & Medicaid 101",
        estimatedMinutes: 40,
        level: "Foundational",
        summary: "The eligibility rules, benefit structures, and reimbursement mechanisms for America's two largest public payers — covering 160 million Americans.",
        learningObjectives: [
          "Describe Medicare Parts A, B, C (Medicare Advantage), and D with eligibility rules",
          "Explain fee-for-service Medicare payment rates (IPPS, OPPS, MPFS)",
          "Define Medicaid eligibility, federal matching (FMAP), and the impact of expansion",
          "Compare traditional Medicaid managed care vs. fee-for-service delivery",
        ],
      },
      {
        slug: "hef-module-05-value-based-care-basics",
        title: "Value-Based Care: From Volume to Value",
        estimatedMinutes: 45,
        level: "Foundational",
        summary: "What APMs are, why CMS created them, and how shared savings programs fundamentally change provider incentives — the pivot point of modern healthcare economics.",
        learningObjectives: [
          "Define fee-for-service and explain the volume incentive problem it creates",
          "Describe the Triple Aim (cost, quality, experience) and its influence on CMS policy",
          "Explain how Medicare Shared Savings Programs (MSSP) work: benchmark, MSR, shared savings",
          "Distinguish between one-sided (upside only) and two-sided (full risk) APM tracks",
        ],
      },
      {
        slug: "hef-module-06-reading-quality-reports",
        title: "Reading a Quality Report: HEDIS, STARS & CMS Measures",
        estimatedMinutes: 40,
        level: "Foundational",
        summary: "The quality measurement landscape — HEDIS, CMS STAR ratings, MIPS, and CAHPS — decoded so you can interpret performance reports and understand quality incentives.",
        learningObjectives: [
          "Describe HEDIS measures and how NCQA compiles health plan report cards",
          "Explain CMS Medicare Advantage STAR ratings and their financial consequences (bonus payments)",
          "Define MIPS (Merit-based Incentive Payment System) and its four performance categories",
          "Read and interpret a hospital Compare quality scorecard",
        ],
      },
      {
        slug: "hef-module-07-the-policy-cycle-in-healthcare",
        title: "The Policy Cycle: From Idea to National Rollout",
        estimatedMinutes: 40,
        level: "Foundational",
        summary: "How a CMS Innovation Model goes from a CMMI concept paper to mandatory nationwide implementation — the lifecycle of healthcare payment policy.",
        learningObjectives: [
          "Describe the role of CMMI in testing and scaling payment innovations",
          "Trace the lifecycle of a CMS demo model: concept → pilot → evaluation → scaling",
          "Explain how Congress authorizes CMS to implement payment model changes",
          "Identify key regulatory vehicles: proposed rules, final rules, and the Federal Register",
        ],
      },
      {
        slug: "hef-module-08-health-equity-economics",
        title: "Health Equity as an Economic Problem",
        estimatedMinutes: 35,
        level: "Foundational",
        summary: "Healthcare disparities are not just a moral failure — they are a trillion-dollar economic inefficiency. Cost-of-disparity analysis and equitable intervention design.",
        learningObjectives: [
          "Quantify the economic cost of health disparities in the US (Deloitte/LaVeist estimates)",
          "Describe Social Determinants of Health (SDOH) and their pathways to clinical outcomes",
          "Explain risk adjustment methodologies that do — and don't — account for social risk",
          "Apply cost-effectiveness thinking to interventions targeting health equity gaps",
        ],
      },
    ],
  },

  // ── TRACK 2: APM Strategy for Administrators (Intermediate) ─────────────────
  {
    id: "apm-strategy-administrators",
    title: "APM Strategy for Hospital Administrators",
    subtitle: "The operational and financial mechanics of ACOs, bundles, and global budgets — built for leaders making APM participation decisions.",
    icon: "💼",
    badge: "Intermediate",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    targetAudience: ["Hospital CFOs and finance directors", "ACO executives", "Health system strategy officers", "Value-based care program managers"],
    totalMinutes: 240,
    modules: [
      {
        slug: "apm-module-01-aco-financial-mechanics",
        title: "ACO Financial Mechanics: How Shared Savings Really Work",
        estimatedMinutes: 45,
        level: "Intermediate",
        summary: "Risk corridors, benchmark calculations, minimum savings rates, and quality withholds — the complete financial anatomy of an ACO contract.",
        learningObjectives: [
          "Calculate an ACO benchmark using the CMS historical expenditure methodology",
          "Apply minimum savings rate (MSR) thresholds to determine shared savings eligibility",
          "Model quality withhold impact on shared savings distribution",
          "Compare Track 1 (one-sided) vs. MSSP Enhanced (two-sided) financial risk profiles",
        ],
      },
      {
        slug: "apm-module-02-episode-based-payments",
        title: "Episode-Based Payments: BPCI-Advanced & CJR",
        estimatedMinutes: 40,
        level: "Intermediate",
        summary: "How BPCI-Advanced and Comprehensive Joint Replacement (CJR) work — episode target prices, reconciliation, and operational strategies for winning in bundled payment.",
        learningObjectives: [
          "Define an episode of care and explain how CMS calculates episode target prices",
          "Describe the 90-day post-acute episode structure and included services",
          "Identify care redesign strategies that reduce post-acute spend: SNF selection, PT optimization",
          "Model break-even performance and profit margin in a BPCI episode contract",
        ],
      },
      {
        slug: "apm-module-03-global-budgets",
        title: "Global Budgets: Maryland, Vermont & AHEAD",
        estimatedMinutes: 40,
        level: "Intermediate",
        summary: "The three active global budget programs in the US — what they share, where they diverge, and what their performance data reveals about the model's potential.",
        learningObjectives: [
          "Describe the Maryland Total Cost of Care (TCOC) model and its hospital-specific global budget mechanism",
          "Explain Vermont's ACO model and AHEAD Model mechanics",
          "Compare global budget approaches: hospital-only vs. total cost of care vs. all-payer",
          "Analyze Maryland's published outcome data: per capita cost growth vs. national trend",
        ],
      },
      {
        slug: "apm-module-04-risk-adjustment-deep-dive",
        title: "Risk Adjustment Deep Dive: HCC Methodology",
        estimatedMinutes: 45,
        level: "Intermediate",
        summary: "How CMS Hierarchical Condition Categories (HCCs) calculate risk scores — coding accuracy, RAF optimization, and why documentation is a financial strategy.",
        learningObjectives: [
          "Explain the HCC mapping process: ICD-10 code → HCC → Risk Adjustment Factor (RAF)",
          "Describe how RAF scores determine per-member-per-month benchmark spending",
          "Quantify the revenue impact of coding accuracy improvements (typical 3-8% RAF uplift)",
          "Identify compliant vs. non-compliant RAF optimization strategies",
        ],
      },
      {
        slug: "apm-module-05-payer-contract-design",
        title: "Negotiating VBP Payer Contracts",
        estimatedMinutes: 35,
        level: "Intermediate",
        summary: "Commercial payer VBP contract design — rate benchmarking, quality metrics selection, performance corridors, and common negotiation pitfalls.",
        learningObjectives: [
          "Benchmark commercial reimbursement rates against Medicare rates and regional data (HCCI)",
          "Design a VBP contract with quality metrics aligned to organizational performance",
          "Identify unfavorable contract terms: narrow corridors, retrospective benchmarks, skewed attribution",
          "Apply total cost of care (TCOC) methodology to a commercial payer negotiation",
        ],
      },
      {
        slug: "apm-module-06-apm-readiness",
        title: "APM Readiness Assessment Using HTI Metrics",
        estimatedMinutes: 35,
        level: "Intermediate",
        summary: "Using the Health Transformation Index (HTI) framework to assess organizational readiness for APM participation — data infrastructure, culture, and financial capacity.",
        learningObjectives: [
          "Apply HTI domain scores to identify organizational strengths and gaps for APM entry",
          "Conduct a financial readiness assessment: runway, risk tolerance, care management investment",
          "Build a gap closure roadmap: data infrastructure, care management, physician alignment",
          "Select the appropriate APM entry point based on risk appetite and capability maturity",
        ],
      },
    ],
  },

  // ── TRACK 3: Precision Medicine for Clinicians (Intermediate-Advanced) ───────
  {
    id: "precision-medicine-clinicians",
    title: "Precision Medicine for Clinicians",
    subtitle: "From genomics primer to clinical implementation — the molecular tools reshaping diagnosis, treatment, and prevention.",
    icon: "🧬",
    badge: "Intermediate",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    targetAudience: ["Physicians and APPs seeking genomics literacy", "Genetic counselors expanding clinical knowledge", "Oncologists and specialists using NGS panels", "Hospital CMOs and clinical leaders"],
    totalMinutes: 270,
    modules: [
      {
        slug: "pm-module-01-genomics-primer",
        title: "Genomics Primer: From Sequence to Clinical Utility",
        estimatedMinutes: 45,
        level: "Intermediate",
        summary: "Sequencing technologies (Sanger, NGS, WES, WGS), variant types, and the pathway from raw data to actionable clinical finding — no prior genetics background needed.",
        learningObjectives: [
          "Distinguish germline vs. somatic variants and their clinical implications",
          "Describe next-generation sequencing (NGS): library prep, alignment, variant calling",
          "Apply the ACMG/AMP five-tier variant classification system",
          "Identify when to order germline testing vs. somatic tumor profiling vs. carrier screening",
        ],
      },
      {
        slug: "pm-module-02-pharmacogenomics-practice",
        title: "Pharmacogenomics in Practice",
        estimatedMinutes: 45,
        level: "Intermediate",
        summary: "The six highest-impact gene-drug interactions (CYP2D6, CYP2C19, TPMT, SLCO1B1, HLA-B*5701, DPYD) with CPIC-guideline clinical action recommendations.",
        learningObjectives: [
          "Identify patients who would benefit from pre-emptive PGx testing",
          "Apply CPIC guideline recommendations for the top 6 gene-drug pairs",
          "Explain how PGx results are incorporated into EHR clinical decision support",
          "Calculate the economic case for PGx implementation in a 10,000-patient panel",
        ],
      },
      {
        slug: "pm-module-03-polygenic-risk-scores",
        title: "Polygenic Risk Scores: Science and Application",
        estimatedMinutes: 40,
        level: "Intermediate",
        summary: "How PRS are derived from GWAS studies, their clinical utility for coronary artery disease and breast cancer risk stratification, and their limitations by ancestry.",
        learningObjectives: [
          "Describe GWAS methodology and how allele weights are derived for PRS construction",
          "Apply PRS to cardiovascular risk stratification beyond traditional Framingham scoring",
          "Explain why PRS perform differently across ancestral populations (LD structure differences)",
          "Evaluate a PRS clinical utility study using AUC, NRI, and reclassification statistics",
        ],
      },
      {
        slug: "pm-module-04-oncology-genomics",
        title: "Oncology Genomics: Targeted Therapy Selection",
        estimatedMinutes: 50,
        level: "Advanced",
        summary: "TMB, MSI, HER2, EGFR, KRAS/NRAS/BRAF, ALK/ROS1 — the tumor biomarkers driving precision oncology treatment decisions and immunotherapy eligibility.",
        learningObjectives: [
          "Interpret a solid tumor NGS panel report (FoundationOne, MSK-IMPACT format)",
          "Apply TMB and MSI-H status to pembrolizumab eligibility determination",
          "Identify targeted therapy options for EGFR, ALK, ROS1 in NSCLC",
          "Describe ctDNA (liquid biopsy) applications: therapy selection, MRD monitoring",
        ],
      },
      {
        slug: "pm-module-05-genomics-program-economics",
        title: "Building a Genomics Program: Economics & Operations",
        estimatedMinutes: 45,
        level: "Advanced",
        summary: "Infrastructure, consent, return of results, reimbursement, and the financial model for launching a health system genomics program from the ground up.",
        learningObjectives: [
          "Design a genomic screening program: population selection, testing logistics, result delivery",
          "Navigate CMS coverage for hereditary cancer panels (LCD framework, prior auth)",
          "Build a financial model: volume assumptions, reimbursement rates, lab cost structure",
          "Establish an incidental findings policy and secondary findings consent framework",
        ],
      },
      {
        slug: "pm-module-06-ai-clinical-prediction",
        title: "AI Clinical Prediction: Sepsis, Deterioration & Risk Scoring",
        estimatedMinutes: 45,
        level: "Advanced",
        summary: "Validated AI clinical decision support tools — Epic Sepsis Model, deterioration index, and HCC risk scoring — with implementation evidence and alert fatigue mitigation.",
        learningObjectives: [
          "Evaluate AI model performance: AUC, sensitivity, specificity, PPV in clinical context",
          "Describe the Epic Sepsis Model's features, validation performance, and controversy",
          "Design an AI alert implementation strategy that minimizes alert fatigue",
          "Apply population health risk stratification tools to care management program design",
        ],
      },
    ],
  },
];

export function getTrackById(id: string): LearningTrack | undefined {
  return learningTracks.find(t => t.id === id);
}

export function getAllModuleSlugs(): string[] {
  return learningTracks.flatMap(t => t.modules.map(m => m.slug));
}
