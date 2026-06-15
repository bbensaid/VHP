"""
platform_catalog.py
────────────────────
Single source of truth for every user-facing page, tool, simulator, and
lab tab on the HTR platform.

HOW TO KEEP THIS UP TO DATE:
  - When you add a new page/route in the frontend:     add an entry here.
  - When you add a new research lab tab:               add an entry here.
  - When you rename a URL:                             update the url field here.
  - When you add a new standalone simulator:           add an entry here.

This file is imported by routers/chat.py to build the AI tools catalog
and by the API endpoint /api/platform-catalog (used by the frontend card grid).
Nothing else. Do not put business logic here.

ENTRY FIELDS:
  id          — unique slug, kebab-case
  label       — display name shown to users and AI
  url         — absolute path (no domain) OR full URL
  category    — top-level grouping (see CATEGORIES below)
  subcategory — optional finer grouping
  description — one sentence: what the user can DO here (start with a verb)
  keywords    — list of trigger words/phrases the AI uses to match questions to this entry
"""

BASE_URL = "https://healthtransformationreview.org"

CATALOG = [

    # ─────────────────────────────────────────────────────────────────────────
    # VERMONT-SPECIFIC PAGES & SIMULATORS
    # ─────────────────────────────────────────────────────────────────────────
    {
        "id": "bed-capacity",
        "label": "Bed Capacity & Transfer",
        "url": "/bed-capacity",
        "category": "Vermont",
        "description": "Explore Vermont hospital bed capacity data, inpatient transfer patterns, staffed vs. licensed beds, and capacity management across all Vermont hospitals.",
        "keywords": ["bed capacity", "hospital beds", "inpatient transfer", "transfer", "staffed beds", "licensed beds", "vermont hospital capacity", "nvrh", "gifford", "rutland", "brattleboro", "north country hospital"],
    },
    {
        "id": "vermont-medicaid",
        "label": "Vermont Medicaid",
        "url": "/vermont-medicaid",
        "category": "Vermont",
        "description": "Access Vermont Medicaid program overview, eligibility rules, benefits, enrollment, and the latest policy updates.",
        "keywords": ["vermont medicaid", "dvha", "green mountain care", "dr dynasaur", "vhap", "vermont health"],
    },
    {
        "id": "vermont-act-167",
        "label": "Vermont Act 167 (2022)",
        "url": "/vermont-act-167",
        "category": "Vermont",
        "description": "Read the full text and detailed analysis of Vermont's landmark 2022 health reform legislation.",
        "keywords": ["act 167", "vermont act 167", "2022 vermont law", "vermont health reform 2022"],
    },
    {
        "id": "vermont-act-167-simulator",
        "label": "Vermont Act 167 Simulator",
        "url": "/vermont-act-167/simulator",
        "category": "Vermont",
        "subcategory": "Simulator",
        "description": "Model the implementation timeline and multi-pillar impact of Vermont Act 167 (2022).",
        "keywords": ["act 167 simulator", "vermont act 167 model"],
    },
    {
        "id": "vermont-act-68",
        "label": "Vermont Act 68 (2025)",
        "url": "/vermont-act-68",
        "category": "Vermont",
        "description": "Explore Vermont's 2025 health transformation legislation — provisions, timeline, and impact.",
        "keywords": ["act 68", "vermont act 68", "2025 vermont law", "vermont 2025 health"],
    },
    {
        "id": "vermont-act-68-simulator",
        "label": "Vermont Act 68 Simulator",
        "url": "/vermont-act-68/simulator",
        "category": "Vermont",
        "subcategory": "Simulator",
        "description": "Model Vermont Act 68 (2025) health transformation timeline and milestone impacts.",
        "keywords": ["act 68 simulator", "vermont act 68 model", "vermont 2025 simulator"],
    },
    {
        "id": "ahead-model",
        "label": "Vermont AHEAD Model",
        "url": "/ahead-model",
        "category": "Vermont",
        "description": "Understand Vermont's All-Payer Health Expenditure Approach — structure, milestones, payer obligations, and CMMI oversight.",
        "keywords": ["ahead model", "all-payer model", "vermont ahead", "cmmi vermont", "green mountain care board"],
    },
    {
        "id": "vermont-rht-program",
        "label": "Vermont RHT Program",
        "url": "/vermont-rht-program",
        "category": "Vermont",
        "description": "Learn about Vermont's Rural Health Transformation program — eligibility, funding, and participating facilities.",
        "keywords": ["vermont rht", "rural health transformation vermont", "vermont rural health"],
    },
    {
        "id": "vermont-dashboard",
        "label": "Vermont Health Dashboard",
        "url": "/dashboard/vermont",
        "category": "Vermont",
        "description": "Interactive Vermont-specific health transformation dashboard — hospital performance, AHEAD milestones, and population metrics.",
        "keywords": ["vermont dashboard", "vermont hospital performance", "vermont health metrics"],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # STATE PROGRAMS & COMPARISONS
    # ─────────────────────────────────────────────────────────────────────────
    {
        "id": "california-calaim",
        "label": "California CalAIM",
        "url": "/california-calaim",
        "category": "States & Programs",
        "description": "Deep-dive into California's $6.7B CalAIM Medi-Cal transformation — whole-person care, enhanced care management, and community supports.",
        "keywords": ["calaim", "california medicaid", "medi-cal transformation", "whole person care", "california calaim"],
    },
    {
        "id": "california-calaim-simulator",
        "label": "CalAIM Simulator",
        "url": "/california-calaim/simulator",
        "category": "States & Programs",
        "subcategory": "Simulator",
        "description": "Model the multi-pillar impact of California's CalAIM transformation across 58 counties.",
        "keywords": ["calaim simulator", "california medicaid model"],
    },
    {
        "id": "oregon-cco",
        "label": "Oregon CCO 3.0",
        "url": "/oregon-cco",
        "category": "States & Programs",
        "description": "Explore Oregon's third-generation Coordinated Care Organizations — global budgets, equity accountability, and behavioral health integration.",
        "keywords": ["oregon cco", "coordinated care organization", "oregon medicaid", "oregon health plan"],
    },
    {
        "id": "oregon-cco-simulator",
        "label": "Oregon CCO 3.0 Simulator",
        "url": "/oregon-cco/simulator",
        "category": "States & Programs",
        "subcategory": "Simulator",
        "description": "Model multi-pillar impact of Oregon's CCO 3.0 across 16 CCOs.",
        "keywords": ["oregon cco simulator", "oregon health model"],
    },
    {
        "id": "states-explorer",
        "label": "All States Explorer",
        "url": "/states",
        "category": "States & Programs",
        "description": "Compare all 50 states on health transformation metrics — policy activity, Medicaid programs, VBC adoption, and innovation scores.",
        "keywords": ["all states", "state comparison", "50 states", "state explorer", "state health ranking"],
    },
    {
        "id": "50-state-dashboard",
        "label": "50-State Dashboard",
        "url": "/dashboard",
        "category": "States & Programs",
        "description": "Interactive 50-state health transformation dashboard — filter, rank, and compare states across all six pillars.",
        "keywords": ["50 state dashboard", "national dashboard", "state ranking", "state scorecard"],
    },
    {
        "id": "dashboard-compare",
        "label": "State Comparison Tool",
        "url": "/dashboard/compare",
        "category": "States & Programs",
        "description": "Side-by-side comparison of any two states across all health transformation dimensions.",
        "keywords": ["compare states", "state vs state", "state comparison tool"],
    },
    {
        "id": "cms-rural-simulator",
        "label": "CMS Rural Health Transformation Simulator",
        "url": "/dashboard/simulator",
        "category": "States & Programs",
        "subcategory": "Simulator",
        "description": "Model the multi-pillar impact of the $50B CMS Rural Health Transformation Program across participating states.",
        "keywords": ["cms rural health", "rural health transformation", "cms rural simulator", "rural transformation program"],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # STANDALONE SIMULATORS & DASHBOARDS
    # ─────────────────────────────────────────────────────────────────────────
    {
        "id": "medicaid-eligibility-simulator",
        "label": "Medicaid Eligibility Simulator",
        "url": "/medicaid-eligibility-simulator",
        "category": "Tools & Simulators",
        "description": "Screen Vermont Medicaid eligibility step-by-step by income, household size, age, and demographics.",
        "keywords": ["medicaid eligibility", "qualify for medicaid", "medicaid screen", "am i eligible", "medicaid calculator"],
    },
    {
        "id": "htr-simulator",
        "label": "HTR Simulator",
        "url": "/htr-simulator",
        "category": "Tools & Simulators",
        "description": "Model health transformation readiness across all six HTR pillars for any organization or state.",
        "keywords": ["htr simulator", "transformation readiness", "six pillar simulator"],
    },
    {
        "id": "impact-simulation",
        "label": "Impact Simulation",
        "url": "/impact-simulation",
        "category": "Tools & Simulators",
        "description": "Model cross-pillar impact of payment reform, care delivery change, technology adoption, workforce strategy, equity interventions, and policy shifts simultaneously.",
        "keywords": ["impact simulation", "cross pillar impact", "reform simulation", "multi pillar model"],
    },
    {
        "id": "hti-dashboard",
        "label": "HTI Dashboard",
        "url": "/hti-dashboard",
        "category": "Tools & Simulators",
        "description": "Interactive Health Transformation Index scoring engine — explore composite scores, sub-indices, and state rankings.",
        "keywords": ["hti dashboard", "health transformation index", "hti score", "transformation index"],
    },
    {
        "id": "htr-index",
        "label": "HTR Index Methodology",
        "url": "/htr-index",
        "category": "Tools & Simulators",
        "description": "Understand the methodology behind the HTR composite health transformation index.",
        "keywords": ["htr index", "index methodology", "transformation index methodology"],
    },
    {
        "id": "transformation-friction-index",
        "label": "Transformation Friction Index",
        "url": "/transformation-friction-index",
        "category": "Tools & Simulators",
        "description": "Quantify implementation barriers to health transformation across all six pillars for any state or organization.",
        "keywords": ["friction index", "transformation friction", "implementation barriers", "change resistance"],
    },
    {
        "id": "investment-tracker",
        "label": "Investment Tracker",
        "url": "/investment-tracker",
        "category": "Tools & Simulators",
        "description": "Track healthcare M&A, VC, PE, and strategic partnership activity by sector, geography, and deal size.",
        "keywords": ["investment tracker", "m&a healthcare", "venture capital health", "pe healthcare", "acquisition tracker", "deal tracker"],
    },
    {
        "id": "the-wire",
        "label": "The Wire",
        "url": "/the-wire",
        "category": "Tools & Simulators",
        "description": "Real-time curated feed of the most important healthcare policy, economics, and transformation news signals.",
        "keywords": ["the wire", "news feed", "healthcare news", "policy news", "current events health"],
    },
    {
        "id": "trending-topics",
        "label": "Trending Topics",
        "url": "/trending-topics",
        "category": "Tools & Simulators",
        "description": "Centralized hub tracking the most discussed and emerging topics in health transformation.",
        "keywords": ["trending topics", "trending health", "hot topics", "popular topics"],
    },
    {
        "id": "multimedia",
        "label": "Multimedia",
        "url": "/multimedia",
        "category": "Tools & Simulators",
        "description": "Access HTR video content, presentations, and multimedia resources on health transformation.",
        "keywords": ["multimedia", "videos", "presentations", "webinar recordings", "media"],
    },
    {
        "id": "six-pillar-map",
        "label": "Six-Pillar Framework Map",
        "url": "/about/framework",
        "category": "Tools & Simulators",
        "description": "Explore the HTR Six-Pillar Framework — the conceptual map connecting Policy, Economics, Technology, Clinical, Equity, and Operations.",
        "keywords": ["six pillar", "framework", "pillar map", "htr framework", "conceptual framework"],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # RESEARCH LAB — POLICY & QUALITY SCIENCES
    # ─────────────────────────────────────────────────────────────────────────
    {
        "id": "lab-policy-simulator",
        "label": "Policy Simulator",
        "url": "/research-lab/policy-quality?tab=policy",
        "category": "Research Lab",
        "subcategory": "Policy & Quality",
        "description": "Model 1115 waiver types across 6 state scenarios, design Vermont-style global budgets, simulate Medicaid expansion impact, and analyze price transparency policies.",
        "keywords": ["policy simulator", "1115 waiver", "global budget simulator", "medicaid expansion model", "waiver simulation"],
    },
    {
        "id": "lab-medicaid-wr",
        "label": "Medicaid Work Requirements Calculator",
        "url": "/research-lab/policy-quality?tab=medicaid-wr",
        "category": "Research Lab",
        "subcategory": "Policy & Quality",
        "description": "Model coverage loss and hospital revenue impact from H.R. 1 Medicaid work requirements by state.",
        "keywords": ["work requirements", "medicaid work requirement", "coverage loss", "hr1 work", "medicaid work"],
    },
    {
        "id": "lab-hr1-cliff",
        "label": "H.R. 1 Cliff Scenario",
        "url": "/research-lab/policy-quality?tab=hr1-cliff",
        "category": "Research Lab",
        "subcategory": "Policy & Quality",
        "description": "Model the post-2030 Medicaid funding cliff created by H.R. 1 FMAP phase-downs, state-by-state.",
        "keywords": ["hr1 cliff", "medicaid cliff", "fmap phase down", "hr1 scenario", "2030 medicaid cliff"],
    },
    {
        "id": "lab-clinical-quality",
        "label": "Clinical Quality Optimizer",
        "url": "/research-lab/policy-quality?tab=quality",
        "category": "Research Lab",
        "subcategory": "Policy & Quality",
        "description": "Simulate 15 HEDIS measures with NCQA benchmarks, predict CMS Star Ratings across 32 sub-measures, optimize MIPS composite scores, and calculate P4P ROI.",
        "keywords": ["hedis", "cms star rating", "mips", "quality optimizer", "clinical quality", "p4p", "pay for performance"],
    },
    {
        "id": "lab-hospital-stress-test",
        "label": "Hospital Financial Stress Test",
        "url": "/research-lab/policy-quality?tab=scorecard",
        "category": "Research Lab",
        "subcategory": "Policy & Quality",
        "description": "Stress-test hospital financials against payer mix shifts, Medicaid rate cuts, and volume changes — benchmarked against CAH, Rural PPS, and Urban Tertiary peers.",
        "keywords": ["hospital financial", "stress test", "hospital finances", "payer mix", "medicaid cuts hospital", "hospital revenue", "cah financials"],
    },
    {
        "id": "lab-hta-studio",
        "label": "HTA Studio",
        "url": "/research-lab/policy-quality?tab=hta",
        "category": "Research Lab",
        "subcategory": "Policy & Quality",
        "description": "Build budget impact models, run MCDA with 8 criteria, and execute real Monte Carlo PSA with 1,000 stochastic iterations.",
        "keywords": ["hta", "health technology assessment", "budget impact model", "monte carlo", "mcda", "probabilistic sensitivity"],
    },
    {
        "id": "lab-actuarial",
        "label": "Actuarial Lab",
        "url": "/research-lab/policy-quality?tab=actuarial",
        "category": "Research Lab",
        "subcategory": "Policy & Quality",
        "description": "Calculate ACA actuarial value, model adverse selection dynamics, and analyze IRA drug pricing impacts.",
        "keywords": ["actuarial", "actuarial value", "adverse selection", "aca actuarial", "ira drug pricing"],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # RESEARCH LAB — PAYMENT MODELS & VBC
    # ─────────────────────────────────────────────────────────────────────────
    {
        "id": "lab-apm-design",
        "label": "APM Design Lab",
        "url": "/research-lab/payment-models?tab=apm-design",
        "category": "Research Lab",
        "subcategory": "Payment Models",
        "description": "Design novel APMs from scratch — episode bundles, global budgets, benchmark waterfall charts, and AI-generated model recommendations.",
        "keywords": ["apm design", "alternative payment model", "episode bundle", "global budget design", "payment model design"],
    },
    {
        "id": "lab-apm-calc",
        "label": "APM Shared Savings Calculator",
        "url": "/research-lab/payment-models?tab=apm-calc",
        "category": "Research Lab",
        "subcategory": "Payment Models",
        "description": "Model projected shared savings under MSSP, ACO REACH, and custom global budget scenarios with risk corridor and quality withhold impacts.",
        "keywords": ["shared savings", "mssp", "aco reach", "shared savings calculator", "risk corridor", "aco shared savings"],
    },
    {
        "id": "lab-cea",
        "label": "Cost-Effectiveness Analysis Calculator",
        "url": "/research-lab/payment-models?tab=cea",
        "category": "Research Lab",
        "subcategory": "Payment Models",
        "description": "Calculate cost per QALY, NNT, and break-even timeline for any clinical intervention — benchmarked against ICER, NICE, and CMS thresholds.",
        "keywords": ["cea", "cost effectiveness", "cost per qaly", "qaly", "nnt", "icer", "nice threshold", "cost utility"],
    },
    {
        "id": "lab-global-budget",
        "label": "Global Budget Transition Modeler",
        "url": "/research-lab/payment-models?tab=gb-transition",
        "category": "Research Lab",
        "subcategory": "Payment Models",
        "description": "Model revenue and operating margin during the transition from fee-for-service to a global budget payment model.",
        "keywords": ["global budget", "global budget transition", "ffs to global budget", "budget transition", "global payment model"],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # RESEARCH LAB — POPULATION & EQUITY
    # ─────────────────────────────────────────────────────────────────────────
    {
        "id": "lab-population-health",
        "label": "Population Health Modeler",
        "url": "/research-lab/population-equity?tab=population",
        "category": "Research Lab",
        "subcategory": "Population & Equity",
        "description": "Run Markov chain disease progression models for 5 conditions, simulate SIR epidemic dynamics, model preventable hospitalizations, and calculate intervention ROI.",
        "keywords": ["population health", "markov model", "disease progression", "sir model", "preventable hospitalization", "population modeler"],
    },
    {
        "id": "lab-equity-studio",
        "label": "Health Equity Studio",
        "url": "/research-lab/population-equity?tab=equity",
        "category": "Research Lab",
        "subcategory": "Population & Equity",
        "description": "Analyze racial/ethnic disparities across 10 outcomes, map geographic access gaps, score SDOH burden, and compute equity-weighted ICER using HEROI.",
        "keywords": ["health equity", "racial disparity", "ethnic disparity", "equity studio", "sdoh score", "geographic access", "heroi"],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # RESEARCH LAB — TECHNOLOGY & AI
    # ─────────────────────────────────────────────────────────────────────────
    {
        "id": "lab-ai-governance",
        "label": "AI Clinical Governance Lab",
        "url": "/research-lab/technology-ai?tab=ai",
        "category": "Research Lab",
        "subcategory": "Technology & AI",
        "description": "Compare predictive model performance, detect algorithmic bias using Demographic Parity and Equal Opportunity metrics, build AI governance frameworks, and calculate AI ROI.",
        "keywords": ["ai governance", "algorithmic bias", "clinical ai", "ai lab", "predictive model", "demographic parity", "equal opportunity metric"],
    },
    {
        "id": "lab-digital-health",
        "label": "Digital Health Lab",
        "url": "/research-lab/technology-ai?tab=digital",
        "category": "Research Lab",
        "subcategory": "Technology & AI",
        "description": "Calculate RPM ROI using CMS CPT codes, model telehealth utilization under CMS policy scenarios, compare patient engagement platforms, and optimize EHR interoperability.",
        "keywords": ["digital health", "rpm roi", "remote patient monitoring", "telehealth utilization", "ehr interoperability", "digital health lab"],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # RESEARCH LAB — INTEROPERABILITY & RISK
    # ─────────────────────────────────────────────────────────────────────────
    {
        "id": "lab-fhir",
        "label": "FHIR Interoperability Lab",
        "url": "/research-lab/interoperability?tab=fhir",
        "category": "Research Lab",
        "subcategory": "Interoperability & Risk",
        "description": "Build and validate FHIR R4 resources, map clinical terminologies, test CDS Hooks, simulate prior authorization workflows, and check ONC compliance.",
        "keywords": ["fhir", "fhir r4", "interoperability", "cds hooks", "prior authorization", "onc compliance", "hl7"],
    },
    {
        "id": "lab-emr-ehr",
        "label": "EMR/EHR Lab",
        "url": "/research-lab/interoperability?tab=emr",
        "category": "Research Lab",
        "subcategory": "Interoperability & Risk",
        "description": "Compare EHR vendors (Epic, Oracle Health, MEDITECH, athenahealth), model EHR adoption cost and 5-year ROI, audit a record's USCDI data quality, and quantify clinician documentation burden.",
        "keywords": ["emr", "ehr", "electronic health record", "electronic medical record", "ehr vendor", "ehr selection", "epic", "oracle health", "cerner", "meditech", "athenahealth", "ehr cost", "ehr roi", "ehr adoption", "total cost of ownership", "uscdi", "ehr data quality", "documentation burden", "pajama time", "clinician burnout", "ehr business case"],
    },
    {
        "id": "lab-risk-stratification",
        "label": "Risk Stratification Engine",
        "url": "/research-lab/interoperability?tab=risk",
        "category": "Research Lab",
        "subcategory": "Interoperability & Risk",
        "description": "Apply HCC v28 RAF scoring, segment populations by risk tier, build custom risk models, and analyze comorbidity interactions using Elixhauser and Charlson indices.",
        "keywords": ["risk stratification", "hcc scoring", "raf score", "risk tier", "elixhauser", "charlson", "comorbidity", "patient risk"],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # RESEARCH LAB — KNOWLEDGE & WORKSPACE
    # ─────────────────────────────────────────────────────────────────────────
    {
        "id": "lab-vbc-readiness",
        "label": "VBC Readiness Assessment",
        "url": "/research-lab/knowledge-workspace?tab=readiness",
        "category": "Research Lab",
        "subcategory": "Knowledge & Workspace",
        "description": "30-dimension, 6-domain assessment producing an organizational readiness score and prioritized gap analysis for VBC transformation — Vermont AHEAD and CAH presets included.",
        "keywords": ["vbc readiness", "value based care readiness", "readiness assessment", "transformation readiness", "ahead readiness"],
    },
    {
        "id": "lab-transformation-scorecard",
        "label": "Transformation Scorecard",
        "url": "/research-lab/knowledge-workspace?tab=scorecard",
        "category": "Research Lab",
        "subcategory": "Knowledge & Workspace",
        "description": "Executive six-pillar scorecard — self-score Policy, Economics, Technology, Clinical, Equity, and Operations with Vermont AHEAD statutory milestones integrated.",
        "keywords": ["transformation scorecard", "six pillar scorecard", "executive scorecard", "ahead milestones", "organization scorecard"],
    },
    {
        "id": "lab-workforce-modeler",
        "label": "Workforce Modeler",
        "url": "/research-lab/knowledge-workspace?tab=workforce",
        "category": "Research Lab",
        "subcategory": "Knowledge & Workspace",
        "description": "Project physician supply and demand across 12 specialties over 10 years, simulate nurse staffing ratio impacts, calculate turnover costs, and model rural incentive programs.",
        "keywords": ["workforce modeler", "physician supply", "nursing workforce", "staffing model", "physician shortage", "nurse staffing", "rural workforce"],
    },
    {
        "id": "lab-innovation-leaderboard",
        "label": "Innovation Leaderboard",
        "url": "/research-lab/knowledge-workspace?tab=leaderboard",
        "category": "Research Lab",
        "subcategory": "Knowledge & Workspace",
        "description": "Rank all 50 states on a composite health transformation index, score 30 major health systems on VBC maturity, and compare 20 payers on innovation leadership.",
        "keywords": ["innovation leaderboard", "state ranking", "vbc maturity", "health system ranking", "payer innovation"],
    },
    {
        "id": "lab-evidence-library",
        "label": "Evidence Library",
        "url": "/research-lab/knowledge-workspace?tab=evidence",
        "category": "Research Lab",
        "subcategory": "Knowledge & Workspace",
        "description": "Search 25 landmark CEA/CUA studies, track 20 CMMI innovation models with lesson-learned summaries, and browse 15 HTR policy briefs.",
        "keywords": ["evidence library", "cea studies", "cmmi models", "landmark studies", "policy briefs", "evidence base"],
    },
    {
        "id": "lab-research-workspace",
        "label": "Research Workspace",
        "url": "/research-lab/knowledge-workspace?tab=workspace",
        "category": "Research Lab",
        "subcategory": "Knowledge & Workspace",
        "description": "Save and compare analysis scenarios, build structured reports from templates, manage citations in AMA/APA format, and export findings as Markdown or text.",
        "keywords": ["research workspace", "save scenarios", "citation manager", "export report", "structured report"],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # ACADEMY
    # ─────────────────────────────────────────────────────────────────────────
    {
        "id": "personalized-learning",
        "label": "Personalized Learning Path",
        "url": "/academy/personalized-learning",
        "category": "Academy",
        "description": "Get an AI-generated learning path tailored to your role, goals, and knowledge gaps.",
        "keywords": ["personalized learning", "learning path", "custom curriculum", "learning plan"],
    },
    {
        "id": "learning-tracks",
        "label": "Learning Tracks",
        "url": "/academy/tracks",
        "category": "Academy",
        "description": "Browse structured learning tracks by topic — Policy, Economics, Technology, Clinical, Equity, and Operations.",
        "keywords": ["learning tracks", "curriculum tracks", "structured learning"],
    },
    {
        "id": "courses",
        "label": "Courses",
        "url": "/academy/courses",
        "category": "Academy",
        "description": "Access self-paced courses on health policy, economics, value-based care, and health transformation.",
        "keywords": ["courses", "online courses", "health policy course", "vbc course"],
    },
    {
        "id": "webinars",
        "label": "Webinars",
        "url": "/academy/webinars",
        "category": "Academy",
        "description": "Access live and on-demand webinars featuring health transformation experts.",
        "keywords": ["webinars", "live webinar", "on demand webinar", "expert webinar"],
    },
    {
        "id": "case-studies",
        "label": "Case Studies",
        "url": "/academy/case-studies",
        "category": "Academy",
        "description": "Read in-depth case studies on health system transformation, payment model adoption, and policy implementation.",
        "keywords": ["case studies", "health system case study", "transformation case study"],
    },
    {
        "id": "glossary",
        "label": "Glossary",
        "url": "/academy/glossary",
        "category": "Academy",
        "description": "Look up definitions for health policy, economics, and transformation terms.",
        "keywords": ["glossary", "definitions", "health terms", "policy terms"],
    },
    {
        "id": "medicaid-learning-center",
        "label": "Medicaid Learning Center",
        "url": "/academy/medicaid",
        "category": "Academy",
        "description": "Learn the fundamentals of Medicaid — program structure, eligibility, financing, and policy landscape.",
        "keywords": ["medicaid learning", "medicaid basics", "medicaid fundamentals", "learn medicaid"],
    },
    {
        "id": "faculty",
        "label": "Faculty",
        "url": "/academy/faculty",
        "category": "Academy",
        "description": "Meet the health transformation experts and faculty behind HTR's educational content.",
        "keywords": ["faculty", "experts", "instructors", "authors"],
    },
]


def build_ai_catalog_text() -> str:
    """
    Generate the tools catalog string injected into the AI system prompt.
    Auto-derived from CATALOG — add entries above, not here.
    """
    lines = [
        "HTR PLATFORM — COMPLETE CATALOG OF PAGES, TOOLS, AND SIMULATORS:",
        "Before recommending any tool, scan this FULL list. Always prefer the most specific",
        "entry. Never recommend a generic tool when a dedicated one exists for the exact topic.",
        "Format recommendations as: [Label](full_url) — description.",
        "",
    ]

    current_category = None
    for entry in CATALOG:
        cat = entry["category"]
        sub = entry.get("subcategory", "")
        if cat != current_category:
            lines.append(f"\n{cat.upper()}:")
            current_category = cat
        sub_prefix = f"[{sub}] " if sub else ""
        full_url = BASE_URL + entry["url"] if entry["url"].startswith("/") else entry["url"]
        lines.append(f'- {sub_prefix}{entry["label"]}: {full_url} — {entry["description"]}')

    return "\n".join(lines)


def find_relevant_tools(question: str, max_results: int = 5) -> list[dict]:
    """
    Keyword-match the question against catalog keywords.
    Returns the top matching entries, most specific first.
    Used for augmenting tool recommendations when the AI misses something.
    """
    q = question.lower()
    scored = []
    for entry in CATALOG:
        score = sum(1 for kw in entry.get("keywords", []) if kw in q)
        if score > 0:
            scored.append((score, entry))
    scored.sort(key=lambda x: -x[0])
    return [e for _, e in scored[:max_results]]


HTR_TOOLS_CATALOG_TEXT = build_ai_catalog_text()
