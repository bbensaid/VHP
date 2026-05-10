export interface RoleContent {
  label: string;
  icon: string;
  headline: string;
  tagline: string;
  pillar: string;
  content: { title: string; description: string; href: string }[];
  tools: { title: string; description: string; href: string }[];
  aiPrompt: string;
}

export const ROLE_CONTENT: Record<string, RoleContent> = {
  executive: {
    label: "Hospital / Health System Executive",
    icon: "🏥",
    headline: "Built for health system leaders",
    tagline: "Strategy, finance, operations, and value-based care transformation.",
    pillar: "Operations",
    content: [
      { title: "Vermont AHEAD Model Overview", description: "All-payer, all-condition model implications for health systems.", href: "/ahead-model" },
      { title: "Value-Based Care Intelligence", description: "APM trends, shared savings, and global budget readiness.", href: "/economics/value" },
      { title: "Operations & Workforce", description: "Revenue cycle, payer networks, and workforce strategy.", href: "/operations" },
      { title: "Hospital Financial Stress Test", description: "Model your financials against Medicaid cuts and payer shifts.", href: "/research-lab/policy-quality?tab=scorecard" },
      { title: "Vermont Act 167 Deep Dive", description: "What the reform means for your organization.", href: "/vermont-act-167" },
    ],
    tools: [
      { title: "Hospital Financial Stress Test", description: "Stress-test against payer mix changes and Medicaid cuts.", href: "/research-lab/policy-quality?tab=scorecard" },
      { title: "VBC Readiness Assessment", description: "30-dimension gap analysis for value-based care transition.", href: "/research-lab/knowledge-workspace?tab=readiness" },
      { title: "Global Budget Transition Modeler", description: "Model revenue trajectory during FFS-to-global-budget shift.", href: "/research-lab/payment-models?tab=gb-transition" },
    ],
    aiPrompt: "I'm a hospital executive. What are the most important strategic priorities for health systems navigating Vermont's AHEAD model and value-based care transformation?",
  },

  policy: {
    label: "Policy Analyst / Government Official",
    icon: "🏛️",
    headline: "Built for policy professionals",
    tagline: "Regulation, legislation, Medicaid, and state & federal reform.",
    pillar: "Policy",
    content: [
      { title: "Vermont Act 167 Analysis", description: "Comprehensive breakdown of Vermont's landmark reform.", href: "/vermont-act-167" },
      { title: "Vermont Act 68 (2025)", description: "Latest health transformation legislation analysis.", href: "/vermont-act-68" },
      { title: "Federal Policy & Mandates", description: "CMS rules, ACA, and Medicaid waiver intelligence.", href: "/policy/mandates" },
      { title: "H.R. 1 Cliff Scenario", description: "Post-2030 Medicaid cliff and state budget impact.", href: "/research-lab/policy-quality?tab=hr1-cliff" },
      { title: "Global Policy Landscape", description: "International health system comparisons.", href: "/policy/global" },
    ],
    tools: [
      { title: "Policy Simulator", description: "Model 1115 waivers, global budgets, Medicaid expansion.", href: "/research-lab/policy-quality?tab=policy" },
      { title: "Medicaid Work Requirements Calculator", description: "Model coverage loss from H.R. 1 work requirements.", href: "/research-lab/policy-quality?tab=medicaid-wr" },
      { title: "Vermont Act 68 Simulator", description: "Interactive timeline for Act 68 implementation.", href: "/vermont-act-68/simulator" },
    ],
    aiPrompt: "I'm a policy analyst. What are the most significant federal and Vermont-specific policy developments I should be tracking right now?",
  },

  clinician: {
    label: "Clinician",
    icon: "🩺",
    headline: "Built for clinical professionals",
    tagline: "Care delivery innovation, precision medicine, and health equity.",
    pillar: "Clinical",
    content: [
      { title: "Hospital-at-Home Programs", description: "Evidence, policy, and implementation guidance.", href: "/clinical/hah" },
      { title: "Precision Medicine & Genomics", description: "Latest advances in personalized care.", href: "/clinical/precision" },
      { title: "Virtual Care & Telehealth", description: "Policy, reimbursement, and clinical outcomes.", href: "/clinical/virtual" },
      { title: "Health Equity & SDOH", description: "Addressing disparities in clinical practice.", href: "/equity/sdoh" },
      { title: "Clinical Quality Optimization", description: "HEDIS, Star Ratings, and MIPS performance.", href: "/research-lab/policy-quality?tab=quality" },
    ],
    tools: [
      { title: "Clinical Quality Optimizer", description: "Simulate HEDIS measures and CMS Star Ratings.", href: "/research-lab/policy-quality?tab=quality" },
      { title: "Risk Stratification Engine", description: "HCC v28 RAF scoring and population segmentation.", href: "/research-lab/interoperability?tab=risk" },
      { title: "Population Health Modeler", description: "Disease progression models and intervention ROI.", href: "/research-lab/population-equity?tab=population" },
    ],
    aiPrompt: "I'm a clinician. What are the most important developments in care delivery innovation, hospital-at-home, and clinical quality improvement I should know about?",
  },

  economist: {
    label: "Health Economist / Actuary",
    icon: "📊",
    headline: "Built for health economists",
    tagline: "Payment models, cost-effectiveness, and actuarial analysis.",
    pillar: "Economics",
    content: [
      { title: "Value-Based Care Economics", description: "APM design, shared savings, and global budgets.", href: "/economics/value" },
      { title: "Market Dynamics & Trends", description: "M&A, consolidation, and investment flows.", href: "/economics/market" },
      { title: "Cost-Effectiveness Analysis", description: "QALY, NNT, and CEA methodology.", href: "/economics/cea" },
      { title: "Investment & PE Trends", description: "Private equity and venture activity in healthcare.", href: "/economics/investment" },
      { title: "Actuarial Lab", description: "ACA actuarial value and adverse selection modeling.", href: "/research-lab/policy-quality?tab=actuarial" },
    ],
    tools: [
      { title: "Cost-Effectiveness Analysis Calculator", description: "Calculate cost per QALY, NNT, break-even timelines.", href: "/research-lab/payment-models?tab=cea" },
      { title: "APM Shared Savings Calculator", description: "Model shared savings under MSSP, ACO REACH.", href: "/research-lab/payment-models?tab=apm-calc" },
      { title: "Actuarial Lab", description: "Model ACA actuarial value and IRA drug pricing impacts.", href: "/research-lab/policy-quality?tab=actuarial" },
    ],
    aiPrompt: "I'm a health economist. What are the most important trends in payment model design, cost-effectiveness, and health economics I should be tracking?",
  },

  tech: {
    label: "Health Tech Professional",
    icon: "💻",
    headline: "Built for health tech leaders",
    tagline: "AI, interoperability, digital health, and data governance.",
    pillar: "Technology",
    content: [
      { title: "AI & Machine Learning in Healthcare", description: "Clinical AI governance, bias, and implementation.", href: "/technology/ai" },
      { title: "Digital Health Innovation", description: "RPM, telehealth, and EHR optimization.", href: "/technology/digital" },
      { title: "Data Security & Privacy", description: "HIPAA, cybersecurity, and compliance.", href: "/technology/security" },
      { title: "FHIR & Interoperability", description: "ONC rules, SMART on FHIR, and CDS Hooks.", href: "/technology/workflow" },
      { title: "Workflow Automation", description: "RPA, AI-assisted documentation, and efficiency.", href: "/technology/workflow" },
    ],
    tools: [
      { title: "FHIR Interoperability Lab", description: "Build and validate FHIR R4 resources, test CDS Hooks.", href: "/research-lab/interoperability?tab=fhir" },
      { title: "AI Clinical Governance Lab", description: "Compare models, detect bias, build governance frameworks.", href: "/research-lab/technology-ai?tab=ai" },
      { title: "Digital Health Lab", description: "Calculate RPM ROI and model telehealth utilization.", href: "/research-lab/technology-ai?tab=digital" },
    ],
    aiPrompt: "I'm a health tech professional. What are the most critical developments in healthcare AI, interoperability, and digital health I should be aware of?",
  },

  compliance: {
    label: "Medicaid / Compliance Officer",
    icon: "📋",
    headline: "Built for Medicaid and compliance professionals",
    tagline: "Vermont Medicaid rules, eligibility, compliance, and operations.",
    pillar: "Policy",
    content: [
      { title: "Vermont Medicaid Program", description: "Eligibility rules, enrollment, and program updates.", href: "/vermont-medicaid" },
      { title: "Vermont Act 167 Compliance", description: "Regulatory requirements and implementation timeline.", href: "/vermont-act-167" },
      { title: "Vermont Act 68 (2025)", description: "New compliance obligations and deadlines.", href: "/vermont-act-68" },
      { title: "Regulation & Mandates", description: "Federal and state regulatory landscape.", href: "/policy/regulation" },
      { title: "Operations & Revenue Cycle", description: "Billing, compliance, and payer network management.", href: "/operations/revenue-cycle" },
    ],
    tools: [
      { title: "Medicaid Eligibility Simulator", description: "Screen Vermont Medicaid eligibility interactively.", href: "/medicaid-eligibility-simulator" },
      { title: "Vermont Act 68 Simulator", description: "Model Act 68 compliance timeline and requirements.", href: "/vermont-act-68/simulator" },
      { title: "Transformation Scorecard", description: "Track Vermont AHEAD milestone compliance.", href: "/research-lab/knowledge-workspace?tab=scorecard" },
    ],
    aiPrompt: "I'm a Medicaid compliance officer in Vermont. What are the most important regulatory changes and compliance requirements I need to be tracking right now?",
  },

  researcher: {
    label: "Student / Researcher",
    icon: "🎓",
    headline: "Built for learners and researchers",
    tagline: "Structured learning, evidence, case studies, and deep analysis.",
    pillar: "Economics",
    content: [
      { title: "Academy Learning Tracks", description: "Structured courses by role and specialty.", href: "/academy/tracks" },
      { title: "Case Studies", description: "Real-world health transformation stories.", href: "/academy/case-studies" },
      { title: "Glossary", description: "Healthcare terminology A to Z.", href: "/academy/glossary" },
      { title: "Evidence Library", description: "25+ landmark CEA/CUA studies and CMMI models.", href: "/research-lab/knowledge-workspace?tab=evidence" },
      { title: "Medicaid Learning Center", description: "Vermont Medicaid specialized curriculum.", href: "/academy/medicaid" },
    ],
    tools: [
      { title: "Personalized Learning Path", description: "AI-generated curriculum tailored to your goals.", href: "/academy/personalized-learning" },
      { title: "Evidence Library", description: "Search landmark studies and innovation models.", href: "/research-lab/knowledge-workspace?tab=evidence" },
      { title: "HTR Simulator", description: "Model transformation scenarios across all six pillars.", href: "/htr-simulator" },
    ],
    aiPrompt: "I'm a student studying healthcare transformation. Can you recommend the best place to start learning about health policy and value-based care on this platform?",
  },

  investor: {
    label: "Investor / Consultant",
    icon: "💼",
    headline: "Built for investors and consultants",
    tagline: "Market intelligence, M&A, PE activity, and strategic analysis.",
    pillar: "Economics",
    content: [
      { title: "Investment & PE Trends", description: "Private equity and venture capital in healthcare.", href: "/economics/investment" },
      { title: "Market Dynamics", description: "Consolidation, competitive landscape, and pricing.", href: "/economics/market" },
      { title: "Advisory Services", description: "Custom research, financial audit, and strategic consulting.", href: "/advisory" },
      { title: "Innovation Leaderboard", description: "50-state health transformation rankings.", href: "/research-lab/knowledge-workspace?tab=leaderboard" },
      { title: "HTI Dashboard", description: "Health Transformation Index metrics and benchmarks.", href: "/hti-dashboard" },
    ],
    tools: [
      { title: "Investment Tracker", description: "Track M&A, VC, and PE activity by sector and geography.", href: "/investment-tracker" },
      { title: "Transformation Scorecard", description: "Six-pillar executive scorecard and benchmarking.", href: "/research-lab/knowledge-workspace?tab=scorecard" },
      { title: "Hospital Financial Stress Test", description: "Model target financials against market scenarios.", href: "/research-lab/policy-quality?tab=scorecard" },
    ],
    aiPrompt: "I'm a healthcare investor and consultant. What are the most significant market trends, M&A activity, and investment opportunities in health transformation right now?",
  },

  other: {
    label: "Other",
    icon: "🌐",
    headline: "Welcome to Health Transformation Review",
    tagline: "Everything you need to understand and drive healthcare transformation.",
    pillar: "",
    content: [
      { title: "Six Pillars of Intelligence", description: "Our framework for understanding health transformation.", href: "/about/framework" },
      { title: "Vermont Health Initiatives", description: "Vermont-specific programs and reform efforts.", href: "/vermont-medicaid" },
      { title: "Academy & Learning", description: "Courses, webinars, case studies, and glossary.", href: "/academy" },
      { title: "Research Lab", description: "20+ analytical tools and simulators.", href: "/research-lab" },
      { title: "The Wire", description: "Real-time healthcare news and intelligence.", href: "/the-wire" },
    ],
    tools: [
      { title: "HTR Simulator", description: "Model health transformation across all six pillars.", href: "/htr-simulator" },
      { title: "Medicaid Eligibility Simulator", description: "Screen Vermont Medicaid eligibility.", href: "/medicaid-eligibility-simulator" },
      { title: "Personalized Learning Path", description: "AI-generated learning path for your goals.", href: "/academy/personalized-learning" },
    ],
    aiPrompt: "Give me an overview of what this platform offers and where I should start to understand health transformation in Vermont and nationally.",
  },
};
