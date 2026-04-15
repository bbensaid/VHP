/**
 * Learning Tracks — curated module curricula built from real Sanity CMS content.
 *
 * IMPORTANT: Every slug here must match an `academyModule` document in Sanity.
 * The 18 modules currently published fall into three thematic tracks below.
 * Do NOT add slugs that don't exist in Sanity — the module pages will 404.
 */

export type TrackModule = {
  slug: string;          // Must match Sanity academyModule slug.current
  title: string;
  estimatedMinutes: number;
  level: "Foundational" | "Intermediate" | "Advanced";
  summary: string;
  learningObjectives: string[];
};

export type LearningTrack = {
  id: string;
  pillarId: "policy" | "economics" | "technology" | "clinical" | "equity" | "operations";
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  badgeColor: string;
  targetAudience: string[];
  totalMinutes: number;
  comingSoon?: boolean;
  modules: TrackModule[];
};

export const learningTracks: LearningTrack[] = [
  // ── TRACK 1: Value-Based Care — Foundation to Advanced ──────────────────────
  {
    id: "value-based-care-track",
    pillarId: "economics",
    title: "Value-Based Care: Foundation to Advanced",
    subtitle:
      "From the fundamental paradox of US healthcare spending to the mechanics of ACO contracts, risk adjustment, care management, and technology infrastructure — the complete VBC curriculum.",
    icon: "💡",
    badge: "Foundational → Advanced",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    targetAudience: [
      "Healthcare administrators and executives",
      "Clinicians entering leadership roles",
      "Policy analysts and advocates",
      "ACO program managers and CFOs",
    ],
    totalMinutes: 380,
    modules: [
      {
        slug: "vbc-fundamentals-m1",
        title:
          "Why the Way We Pay for Healthcare Is Breaking the System — And How Paying for Value Could Fix It",
        estimatedMinutes: 40,
        level: "Foundational",
        summary:
          "The United States spends more on healthcare than any nation on earth — yet ranks 37th in health outcomes. This module explains why that paradox exists, how the fee-for-service payment system created it, and how value-based care offers a fundamentally different path forward.",
        learningObjectives: [
          "Explain the US healthcare spending paradox using current data",
          "Describe how fee-for-service payment works and the perverse incentives it creates",
          "Define value-based care and distinguish it from fee-for-service",
          "Identify the four main categories of value-based payment models",
          "Explain why Vermont is a national leader in the shift to value-based care",
        ],
      },
      {
        slug: "intro-value-based-care-volume-to-value",
        title: "Introduction to Value-Based Care: From Volume to Value",
        estimatedMinutes: 35,
        level: "Foundational",
        summary:
          "This module introduces the conceptual foundations of value-based care, tracing the policy journey from fee-for-service dominance to today's complex mix of payment models. Learners will understand the core trade-offs, key stakeholders, and measurement frameworks that define VBC success.",
        learningObjectives: [
          "Explain the core difference between fee-for-service and value-based payment models",
          "Identify the five primary VBC contract structures used in U.S. healthcare",
          "Describe how quality measurement and cost efficiency interact in VBC performance",
          "Evaluate why the shift to value has been slower than projected in the 2010 ACA era",
        ],
      },
      {
        slug: "vbc-fundamentals-module-2-policy-pillar",
        title:
          "Value-Based Care Fundamentals — Module 2: The Policy Pillar — Laws, Rules, and the Regulatory Architecture That Makes (or Breaks) Value-Based Care",
        estimatedMinutes: 45,
        level: "Intermediate",
        summary:
          "This module explains in plain language how MACRA, the ACA's Innovation Center, and state Medicaid waiver programs create the legal and financial scaffolding for VBC models, identifies the regulatory barriers that slow adoption for rural and safety-net providers, and equips learners to read the policy signals that will shape their organization's VBC strategy through 2030.",
        learningObjectives: [
          "Explain MACRA's two-track physician payment architecture and the financial difference between MIPS and Advanced APM participation",
          "Describe how the 2020 Stark Law and Anti-Kickback VBC exceptions enable ACO-physician financial arrangements",
          "Identify the policy signals — RFIs, fee schedule proposed rules, model termination notices — that indicate future VBC direction",
          "Compare state Medicaid VBC adoption using Section 1115 and 1915 waiver frameworks",
          "Summarize the AHEAD Model's all-payer structure and explain why it is architecturally different from single-payer VBC models",
        ],
      },
      {
        slug: "vbc-fundamentals-module-3-economics-pillar",
        title:
          "Value-Based Care Fundamentals — Module 3: The Economics Pillar — Following the Money in Value-Based Care",
        estimatedMinutes: 50,
        level: "Intermediate",
        summary:
          "This module explains how money actually flows in the major VBC contract structures — shared savings, bundled payments, and capitation — and how providers calculate whether a VBC arrangement is financially rational. Learners will leave able to evaluate a VBC contract term sheet and understand the economic case for primary care investment.",
        learningObjectives: [
          "Trace the financial mechanics of a shared savings contract from benchmark calculation through savings distribution",
          "Compare upside-only and two-sided risk tracks and identify the balance sheet conditions that determine which is appropriate",
          "Explain why bundled payment savings in major joint replacement come primarily from post-acute care, not the procedure itself",
          "Model the volume-to-value transition period revenue gap over a five-year planning horizon",
          "Calculate the return on investment for six categories of care management intervention using CMS benchmark data",
        ],
      },
      {
        slug: "understanding-risk-contracts-and-shared-savings",
        title: "Understanding Risk Contracts and Shared Savings Models",
        estimatedMinutes: 40,
        level: "Intermediate",
        summary:
          "A practical deep-dive into benchmark methodology, minimum savings/loss rates, and the progression from one-sided to two-sided risk. Learners develop hands-on skills in analyzing VBC contract terms and calculating shared savings distributions.",
        learningObjectives: [
          "Calculate shared savings distributions under one-sided and two-sided risk models",
          "Identify the actuarial factors that determine benchmark setting methodology",
          "Distinguish between upside-only, downside risk, and global capitation risk structures",
          "Apply minimum savings rate (MSR) and minimum loss rate (MLR) concepts to contract analysis",
        ],
      },
      {
        slug: "care-management-vbc-strategies",
        title: "Care Management Strategies for VBC Success",
        estimatedMinutes: 40,
        level: "Intermediate",
        summary:
          "Value-based contracts succeed or fail based on care management execution. This module covers risk stratification, care team design, evidence-based interventions for high-cost patient populations, and financial modeling for care management program investment.",
        learningObjectives: [
          "Apply risk stratification frameworks to identify high-impact patient populations",
          "Design care team structures appropriate for chronic disease management in VBC contexts",
          "Evaluate the evidence base for high-touch care management interventions",
          "Measure the ROI of care management programs using total cost of care methodology",
        ],
      },
      {
        slug: "vbc-fundamentals-module-4-technology-pillar",
        title:
          "Value-Based Care Fundamentals — Module 4: The Technology Pillar — Data, AI, and the Digital Infrastructure That Makes VBC Work",
        estimatedMinutes: 45,
        level: "Intermediate",
        summary:
          "This module explains what interoperable EHRs, health information exchange, and AI-powered risk stratification tools actually do in a VBC context, why 34% of rural Critical Access Hospitals remain technology-unready for advanced VBC participation, and how the federal interoperability agenda is building the data infrastructure that VBC depends upon.",
        learningObjectives: [
          "Identify the three technology layers VBC requires and explain why each layer depends on the quality of the layer below it",
          "Describe what the 21st Century Cures Act's FHIR mandate and information blocking prohibition changed in health IT",
          "Explain how AI risk stratification improves on claims-based models and why demographic bias auditing is ethically required",
          "Assess an organization's VBC technology readiness using the rural-urban capability gap framework",
          "Apply the five-phase technology investment roadmap to prioritize VBC infrastructure investment sequentially",
        ],
      },
      {
        slug: "vbc-clinical-m5",
        title:
          "From Volume to Value at the Bedside: How Value-Based Care Transforms Clinical Practice",
        estimatedMinutes: 40,
        level: "Intermediate",
        summary:
          "Value-based care is not just a billing change — it reshapes what happens in every exam room, every hospital ward, and every care team huddle. This module explores how the shift from fee-for-service to value changes clinical workflows, team structures, quality measurement, population health management, and care coordination.",
        learningObjectives: [
          "Explain how fee-for-service versus value-based payment creates different clinical incentives and workflows",
          "Identify the four major domains of quality measurement used in VBC contracts",
          "Define population health management and describe how it works in a primary care setting",
          "Explain what care coordination involves and why it reduces both cost and harm",
          "Describe evidence-based interventions that reduce preventable hospitalizations and readmissions",
          "Identify Vermont-specific clinical programs that operationalize value-based care",
        ],
      },
      {
        slug: "vbc-equity-m6",
        title:
          "Who Gets Left Behind: Health Equity, Social Determinants, and Building a VBC System That Works for Everyone",
        estimatedMinutes: 45,
        level: "Advanced",
        summary:
          "VBC was designed, in part, as a health equity intervention. But the research tells a more complicated story. This module examines where VBC has advanced health equity, where it has undermined it, and what specific design choices — in risk adjustment, community health worker programs, panel selection, and rural policy — are required to build a VBC system that actually works for everyone.",
        learningObjectives: [
          "Define health disparities and social determinants of health using current data",
          "Explain three structural equity flaws in how most VBC programs are currently designed",
          "Describe how SDOH risk adjustment works and why the current CMS approach is considered insufficient",
          "Explain the evidence base for community health workers and the reimbursement barriers they face",
          "Identify Vermont-specific equity challenges including rural, refugee, and indigenous populations",
          "Describe what equity-centered VBC design requires beyond good intentions",
        ],
      },
    ],
  },

  // ── TRACK 2: Precision Medicine — Foundation to Advanced ────────────────────
  {
    id: "precision-medicine-track",
    pillarId: "clinical",
    title: "Precision Medicine: From Revolution to Bedside",
    subtitle:
      "From the genomics primer that started the revolution to clinical implementation, regulatory frameworks, economics of targeted therapies, AI in genomics, and equity challenges — the complete precision medicine curriculum.",
    icon: "🧬",
    badge: "Foundational → Advanced",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    targetAudience: [
      "Physicians and advanced practice providers",
      "Clinical informaticists and CMIOs",
      "Health system strategists and executives",
      "Oncologists and specialists using genomic panels",
    ],
    totalMinutes: 255,
    modules: [
      {
        slug: "precision-medicine-m1",
        title:
          "From One-Size-Fits-All to You: The Precision Medicine Revolution",
        estimatedMinutes: 40,
        level: "Foundational",
        summary:
          "For most of medical history, doctors treated patients based on what worked for the average person. Precision medicine rewrites that logic: instead of fitting the patient to the treatment, it fits the treatment to the patient. This module traces the scientific breakthroughs, falling costs, and policy milestones that made precision medicine possible.",
        learningObjectives: [
          "Define precision medicine and distinguish it from traditional population-based treatment approaches",
          "Explain why individual genetic variation matters clinically and how it affects drug response",
          "Describe the cost trajectory of genome sequencing and why falling costs changed everything",
          "Identify the key historical milestones that enabled the precision medicine era",
          "Name and explain the four pillars of precision medicine: genomics, environment, lifestyle, and clinical data",
          "Explain pharmacogenomics as a near-term, practical application of precision medicine",
          "Connect precision medicine principles to value-based care goals and Vermont's health system context",
        ],
      },
      {
        slug: "precision-medicine-m2-policy",
        title:
          "Who Writes the Rules: The Regulatory and Legal Framework for Precision Medicine",
        estimatedMinutes: 45,
        level: "Intermediate",
        summary:
          "Precision medicine's clinical promise operates inside a dense web of federal and state rules governing which tests can be offered, who can perform them, how results are protected, and who pays. This module maps the key regulatory actors and frameworks shaping precision medicine in 2026, with specific attention to Vermont's policy context.",
        learningObjectives: [
          "Distinguish between FDA-approved in vitro diagnostic tests and laboratory-developed tests (LDTs), and explain the regulatory implications of each",
          "Describe CLIA certification requirements and their relevance to genomic laboratory quality",
          "Explain what GINA protects, which contexts it covers, and its critical gap in life and disability insurance",
          "Identify how HIPAA applies to genomic data and what 'de-identification' means in a genomic context",
          "Summarize the key precision medicine provisions of the 21st Century Cures Act",
          "Explain the CMS MolDx program and how Local Coverage Determinations govern genomic test reimbursement",
          "Describe the FDA's Breakthrough Device designation and how it applies to genomic diagnostics",
          "Explain the FDA's evolving regulatory posture toward Direct-to-Consumer genetic testing, using 23andMe as a case study",
          "Describe Vermont-specific genetic privacy statutes and how they extend beyond federal protections",
        ],
      },
      {
        slug: "precision-medicine-m3-economics",
        title:
          "The Billion-Dollar Molecule: Economics of Precision Medicine",
        estimatedMinutes: 40,
        level: "Intermediate",
        summary:
          "Precision medicine drugs carry price tags that shock patients and payers alike — some gene therapies now exceed $3 million per treatment. This module unpacks why targeted therapies cost so much, whether the economics actually justify the price, and how payers and manufacturers are experimenting with radical new payment models including outcomes-based contracts.",
        learningObjectives: [
          "Explain the cost trajectory of genome sequencing and why it matters economically",
          "Describe the key drivers behind the high prices of targeted therapies and gene therapies",
          "Distinguish value-based pricing from traditional drug pricing and give a real-world example",
          "Articulate the economic argument for precision medicine in terms of avoided waste and downstream savings",
          "Identify the major insurance coverage barriers that create a gap between clinical promise and patient access",
          "Explain how outcomes-based contracts between payers and manufacturers work",
          "Describe the economics of companion diagnostics and health technology assessment for genomic tests",
        ],
      },
      {
        slug: "precision-medicine-m4-technology",
        title:
          "The Genomic Stack: Sequencing, AI, and the Digital Infrastructure of Precision Medicine",
        estimatedMinutes: 45,
        level: "Intermediate",
        summary:
          "Modern precision medicine runs on a technology stack that most clinicians have never fully seen: from the sequencing machines that read DNA to the AI algorithms that interpret billions of data points, to the EHR integrations that surface results at the point of care. This module maps that stack from end to end — demystifying the biology, the computation, and the information infrastructure.",
        learningObjectives: [
          "Distinguish the major types of genomic sequencing and explain when each is clinically appropriate",
          "Describe how next-generation sequencing converts biological tissue into actionable variant data",
          "Explain the bioinformatics pipeline from raw sequencing reads to clinical interpretation",
          "Define variant classification categories and explain why variants of uncertain significance present a clinical challenge",
          "Describe how AI and machine learning are applied to genomic data analysis, including polygenic risk scores",
          "Explain the challenges of integrating genomic data into EHR systems and the role of standards like FHIR Genomics",
          "Identify the specific technology gaps that limit precision medicine access in rural and resource-limited settings",
        ],
      },
      {
        slug: "precision-medicine-m5-clinical",
        title:
          "From Mutation to Medicine: How Precision Medicine Is Changing Clinical Practice",
        estimatedMinutes: 45,
        level: "Advanced",
        summary:
          "Precision medicine is no longer a research concept — it is reshaping the clinical encounter in oncology, primary care, and rare disease diagnosis. This module traces how tumor profiling, pharmacogenomics, and whole-exome sequencing are moving from academic medical centers into everyday practice, and what that means for clinical decision support and genetic counseling.",
        learningObjectives: [
          "Explain how tumor profiling and targeted therapies differ from traditional chemotherapy",
          "Identify the key pharmacogenomic gene-drug pairs relevant to primary care prescribing",
          "Describe how whole-exome sequencing is shortening the diagnostic odyssey for rare disease patients",
          "Explain the role of genetic counselors in pre-test and post-test communication",
          "Recognize how newborn screening programs represent population-level precision medicine",
          "Understand liquid biopsy as a tool for cancer monitoring and treatment response",
        ],
      },
      {
        slug: "precision-medicine-m6-equity",
        title:
          "The Diversity Deficit: Why Precision Medicine Must Work for Everyone",
        estimatedMinutes: 40,
        level: "Advanced",
        summary:
          "Precision medicine's promise is undermined by a fundamental problem: the genomic databases that power it are built overwhelmingly from people of European ancestry. This is not just an ethical concern — it is a scientific validity problem that produces less accurate polygenic risk scores, higher rates of ambiguous genetic findings, and systematically worse care for non-European patients.",
        learningObjectives: [
          "Explain why the lack of diversity in genomic databases is a scientific validity problem, not just an ethical concern",
          "Describe how polygenic risk scores perform differently across ancestry groups and why this matters clinically",
          "Identify the historical events that created legitimate distrust of genomic research among marginalized communities",
          "Explain the principles of indigenous data sovereignty and the CARE principles",
          "Describe what the NIH All of Us program is attempting to accomplish and its key design choices",
          "Identify the economic, geographic, and structural barriers that limit precision medicine access for Vermont's underserved populations",
        ],
      },
    ],
  },

  // ── TRACK 3: Health Equity in Practice ──────────────────────────────────────
  {
    id: "health-equity-track",
    pillarId: "equity",
    title: "Health Equity in Practice",
    subtitle:
      "From defining equity and mapping social determinants to building clinical SDOH integration programs, designing equitable VBC systems, and measuring organizational accountability — a rigorous, actionable curriculum.",
    icon: "⚖️",
    badge: "Foundational → Advanced",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    targetAudience: [
      "Population health managers and care coordinators",
      "Community health workers and social service navigators",
      "Health system equity officers and DEI leaders",
      "Clinicians integrating SDOH into care workflows",
    ],
    totalMinutes: 205,
    modules: [
      {
        slug: "defining-health-equity-concepts-frameworks-measurement",
        title:
          "Defining Health Equity: Concepts, Frameworks, and Measurement",
        estimatedMinutes: 35,
        level: "Foundational",
        summary:
          "Health equity is both a moral imperative and an operational challenge for healthcare organizations. This module establishes the conceptual foundations — distinguishing equality from equity, mapping the social determinants of health, and connecting theory to measurement frameworks used by CMS, NCQA, and leading health systems.",
        learningObjectives: [
          "Distinguish between health equality, equity, and justice as policy frameworks",
          "Identify the primary social determinants of health and their relative contribution to population health outcomes",
          "Apply the Robert Wood Johnson Foundation's County Health Rankings model to local data",
          "Evaluate how CMS and NCQA measure health equity in value-based care programs",
        ],
      },
      {
        slug: "social-determinants-of-health-clinical-integration",
        title:
          "Social Determinants of Health: Clinical Integration and Community Partnerships",
        estimatedMinutes: 40,
        level: "Intermediate",
        summary:
          "This module moves from theory to implementation: how health systems screen for social needs, build closed-loop referral pathways, partner with community-based organizations, and measure the impact of social intervention on health outcomes.",
        learningObjectives: [
          "Implement an SDOH screening protocol using validated instruments (PRAPARE, AHC-HRSN)",
          "Design closed-loop referral processes connecting clinical SDOH identification to community resources",
          "Evaluate community benefit investment decisions using a health equity lens",
          "Build a community health worker program integrated with clinical care teams",
        ],
      },
      {
        slug: "vbc-equity-m6",
        title:
          "Who Gets Left Behind: Health Equity, Social Determinants, and Building a VBC System That Works for Everyone",
        estimatedMinutes: 45,
        level: "Intermediate",
        summary:
          "VBC was designed, in part, as a health equity intervention. But the research tells a more complicated story. This module examines where VBC has advanced health equity, where it has undermined it, and what specific design choices in risk adjustment, community health worker programs, panel selection, and rural policy are required to build a VBC system that actually works for everyone.",
        learningObjectives: [
          "Define health disparities and social determinants of health using current data",
          "Explain three structural equity flaws in how most VBC programs are currently designed",
          "Describe how SDOH risk adjustment works and why the current CMS approach is considered insufficient",
          "Explain the evidence base for community health workers and the reimbursement barriers they face",
          "Identify Vermont-specific equity challenges including rural, refugee, and indigenous populations",
          "Describe what equity-centered VBC design requires beyond good intentions",
        ],
      },
      {
        slug: "precision-medicine-m6-equity",
        title:
          "The Diversity Deficit: Why Precision Medicine Must Work for Everyone",
        estimatedMinutes: 40,
        level: "Advanced",
        summary:
          "The genomic databases that power precision medicine are built overwhelmingly from people of European ancestry — a scientific validity problem that produces less accurate risk scores and systematically worse care for non-European patients. This module examines the structural causes of genomic inequity, the historical trauma that makes diverse research participation difficult, and what equitable precision medicine actually requires.",
        learningObjectives: [
          "Explain why the lack of diversity in genomic databases is a scientific validity problem, not just an ethical concern",
          "Describe how polygenic risk scores perform differently across ancestry groups and why this matters clinically",
          "Identify the historical events that created legitimate distrust of genomic research among marginalized communities",
          "Explain the principles of indigenous data sovereignty and the CARE principles",
          "Describe what the NIH All of Us program is attempting to accomplish and its key design choices",
          "Identify the economic, geographic, and structural barriers that limit precision medicine access for Vermont's underserved populations",
        ],
      },
      {
        slug: "building-health-equity-programs-roi-measurement",
        title:
          "Building Health Equity Programs: ROI, Accountability, and Organizational Change",
        estimatedMinutes: 45,
        level: "Advanced",
        summary:
          "This advanced module addresses the organizational challenge of building durable health equity programs — making the financial case, establishing accountability structures, measuring disparities rigorously, and managing the institutional dynamics of equity-focused change.",
        learningObjectives: [
          "Develop a health equity program business case using total cost of care and quality improvement methodology",
          "Design governance structures that sustain organizational accountability for equity outcomes",
          "Apply disparity measurement techniques to identify priority populations and gaps",
          "Navigate the political and cultural dynamics of health equity program implementation",
        ],
      },
    ],
  },
  // ── TRACK 4: Health Policy & Regulatory Architecture (coming soon) ──────────
  {
    id: "policy-track",
    pillarId: "policy",
    title: "Health Policy & Regulatory Architecture",
    subtitle:
      "From federal rulemaking cycles and Medicaid waiver design to state innovation programs and global comparative policy — the complete curriculum for healthcare policy professionals.",
    icon: "🏛️",
    badge: "Foundational → Advanced",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
    targetAudience: [
      "Health policy analysts and advocates",
      "State Medicaid directors and program managers",
      "Government affairs professionals",
      "Health system regulatory and compliance leaders",
    ],
    totalMinutes: 0,
    comingSoon: true,
    modules: [],
  },

  // ── TRACK 5: Health Technology & Digital Infrastructure (coming soon) ────────
  {
    id: "technology-track",
    pillarId: "technology",
    title: "Health Technology & Digital Infrastructure",
    subtitle:
      "From FHIR standards and interoperability mandates to AI governance, algorithmic bias, and digital health ROI — the complete curriculum for health technology leaders.",
    icon: "💻",
    badge: "Foundational → Advanced",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    targetAudience: [
      "Chief Information and Technology Officers",
      "Health IT architects and engineers",
      "Digital health program managers",
      "Clinical informaticists and CMIOs",
    ],
    totalMinutes: 0,
    comingSoon: true,
    modules: [],
  },

  // ── TRACK 6: Healthcare Operations & Revenue Cycle (coming soon) ─────────────
  {
    id: "operations-track",
    pillarId: "operations",
    title: "Healthcare Operations & Revenue Cycle",
    subtitle:
      "From revenue cycle mechanics and denial management to workforce stability, supply chain resilience, and payer network strategy — the complete operational leadership curriculum.",
    icon: "⚙️",
    badge: "Foundational → Advanced",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    targetAudience: [
      "CFOs and revenue cycle leaders",
      "Hospital operations and COO roles",
      "Workforce and human capital directors",
      "Payer contracting and network managers",
    ],
    totalMinutes: 0,
    comingSoon: true,
    modules: [],
  },
];

export function getTrackById(id: string): LearningTrack | undefined {
  return learningTracks.find(t => t.id === id);
}

export function getAllModuleSlugs(): string[] {
  return learningTracks.flatMap(t => t.modules.map(m => m.slug));
}
