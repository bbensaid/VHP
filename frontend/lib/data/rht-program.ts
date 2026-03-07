export type Initiative = {
  title: string;
  description: string;
};

export type Metric = {
  label: string;
  status: "Pending" | "In Progress" | "Achieved";
  target?: string;
};

export type RHTProfile = {
  id: string;
  stateName: string;
  awardAmount: string;
  status?: "Active" | "Pending" | "At Risk";
  strategicFocus: string | string[];
  description: string;
  initiatives: Initiative[];
  metrics: Metric[];
};

export const rhtProgramData: Record<string, RHTProfile> = {

  // ── NORTHEAST ────────────────────────────────────────────────────────────────

  vermont: {
    id: "vermont",
    stateName: "Vermont",
    awardAmount: "$195,000,000",
    status: "At Risk",
    strategicFocus: "Regionalization & Innovative Care Strategies",
    description:
      "The Vermont RHT Program seeks to advance a cohesive suite of health care innovations and reforms that address the State's rural health care access, quality, and affordability challenges. The Program is designed to ensure long-term health care system sustainability in the face of rising costs and population health needs.",
    initiatives: [
      {
        title: "Regionalization & Innovative Care Strategies",
        description:
          "Implementing a statewide transformation planning initiative to ensure non-duplication of services. The vision is that essential services remain local, while other services move to regional hubs or a single statewide location for complex care.",
      },
      {
        title: "Clinically Integrated Network (CIN)",
        description:
          "Fostering collaboration across independent providers to produce operational efficiencies, facilitate patient choice, and promote patient-facing technologies that deliver care closer to home.",
      },
      {
        title: "Strengthening Primary Care",
        description:
          "Enhancing the 'Blueprint for Health' initiative to improve team-based chronic disease care, deliver workforce training, and create a statewide quality improvement learning network.",
      },
      {
        title: "Health Care Workforce Development",
        description:
          "Strategic investments in workforce programs to strengthen the rural pipeline and address housing shortages, enabling providers to practice at the top of their license.",
      },
      {
        title: "Price Transparency & Insurance Competition",
        description:
          "Investments in new accountability tools and strategies to address rising health care costs and affordability barriers.",
      },
    ],
    metrics: [
      { label: "Regional Hubs Designated", status: "Pending", target: "Implementation Phase" },
      { label: "Primary Care Transformation", status: "In Progress", target: "Blueprint Expansion" },
      { label: "Workforce Housing Units", status: "Pending", target: "Pipeline Active" },
    ],
  },

  maine: {
    id: "maine",
    stateName: "Maine",
    awardAmount: "$190,000,000",
    strategicFocus: "AI Innovation & Paramedicine",
    description:
      "Maine is partnering with Duke University to create a Rural AI Hub while simultaneously expanding community paramedicine to address its aging, geographically dispersed population.",
    initiatives: [
      { title: "Rural AI Hub", description: "Innovation institute for deploying AI tools in rural clinics." },
      { title: "Community Paramedicine", description: "Strengthened reimbursement models for EMS home visits." },
    ],
    metrics: [
      { label: "AI Pilots Launched", status: "Pending", target: "5 Pilots" },
      { label: "EMS Home Visits", status: "In Progress", target: "5,000/yr" },
    ],
  },

  new_hampshire: {
    id: "new_hampshire",
    stateName: "New Hampshire",
    awardAmount: "$204,000,000",
    strategicFocus: "Pharmacy Lockboxes & Prevention",
    description:
      "New Hampshire is tackling polypharmacy risks in seniors via community lockboxes and expanding prevention access points in schools and libraries.",
    initiatives: [
      { title: "Pharmacy Transformation", description: "Community lockboxes and AI tools for polypharmacy risk reduction." },
      { title: "Prevention-First Model", description: "Community access points in libraries and schools." },
    ],
    metrics: [
      { label: "Lockboxes Deployed", status: "In Progress", target: "50 Sites" },
      { label: "Adverse Drug Events", status: "Pending", target: "-10%" },
    ],
  },

  massachusetts: {
    id: "massachusetts",
    stateName: "Massachusetts",
    awardAmount: "$162,000,000",
    strategicFocus: "Mobile ROI & Bed Tracking",
    description:
      "Focusing on high-tech Mobile Health Units with a projected $36:1 ROI and a 'Beds Not Buildings' platform for behavioral health tracking.",
    initiatives: [
      { title: "Mobile Health Units", description: "High-tech units with diagnostic/AI capabilities." },
      { title: "Beds Not Buildings", description: "Live cross-agency platform to track behavioral health bed availability." },
    ],
    metrics: [
      { label: "Mobile Unit ROI", status: "Pending", target: "$36:1" },
      { label: "BH Boarding Time", status: "In Progress", target: "-20%" },
    ],
  },

  connecticut: {
    id: "connecticut",
    stateName: "Connecticut",
    awardAmount: "$154,000,000",
    strategicFocus: "Crisis Stabilization & Home Visits",
    description:
      "Implementing universal nurse home-visiting for newborns and 23-hour crisis stabilization centers to offload rural EDs.",
    initiatives: [
      { title: "Universal Nurse Home-Visits", description: "Expansion of home visiting for all new/expecting rural families." },
      { title: "23-Hour Crisis Centers", description: "Stabilization centers linked to rural hospitals." },
    ],
    metrics: [
      { label: "Nurse Visits", status: "In Progress", target: "100% Eligible" },
      { label: "ED Psych Diversion", status: "Pending", target: "40%" },
    ],
  },

  rhode_island: {
    id: "rhode_island",
    stateName: "Rhode Island",
    awardAmount: "$156,000,000",
    strategicFocus: "Island EMS & Hospital-at-Home",
    description:
      "Specific infrastructure for Block Island and Narragansett Tribe, combined with a Hospital-at-Home program.",
    initiatives: [
      { title: "Island/Tribal Support", description: "Infrastructure hardening for Block Island and Narragansett." },
      { title: "Hospital-at-Home", description: "Enabling acute care in home settings." },
    ],
    metrics: [
      { label: "HaH Admissions", status: "Pending", target: "200/yr" },
    ],
  },

  new_york: {
    id: "new_york",
    stateName: "New York",
    awardAmount: "$212,000,000",
    strategicFocus: "Rural Roots & eConsult",
    description:
      "Addressing maternal deserts with the 'Rural Roots' workforce model and scaling a statewide eConsult platform.",
    initiatives: [
      { title: "Rural Roots", description: "Workforce model focusing on maternal care deserts and simulation training." },
      { title: "eConsult Platform", description: "Statewide implementation to address specialty access." },
    ],
    metrics: [
      { label: "OB Simulation Training", status: "In Progress", target: "500 Staff" },
      { label: "eConsult Volume", status: "Pending", target: "50,000/yr" },
    ],
  },

  pennsylvania: {
    id: "pennsylvania",
    stateName: "Pennsylvania",
    awardAmount: "$193,000,000",
    strategicFocus: "Regional Hubs & Value-Based Care",
    description:
      "Establishing 8 Regional Hubs to provide technical expertise and competitive grants for Value-Based Care adoption.",
    initiatives: [
      { title: "Regional Hub Model", description: "8 hubs providing technical expertise (IT, workflow) to local providers." },
      { title: "Value-Based Care Grants", description: "Competitive grants building on the PA Rural Health Model." },
    ],
    metrics: [
      { label: "Hubs Operational", status: "Pending", target: "8 Hubs" },
      { label: "VBC Adoption", status: "In Progress", target: "60% Providers" },
    ],
  },

  new_jersey: {
    id: "new_jersey",
    stateName: "New Jersey",
    awardAmount: "$147,000,000",
    strategicFocus: "CCBHC Transition & Telehealth Points",
    description:
      "Transitioning mental health centers to the CCBHC model and installing public telehealth access points.",
    initiatives: [
      { title: "CCBHC Support", description: "Transitioning centers from federal to Medicaid funding." },
      { title: "Public Telehealth Points", description: "Developing telehealth access in public areas." },
    ],
    metrics: [
      { label: "CCBHC Transition", status: "Pending", target: "100%" },
      { label: "Public Telehealth Use", status: "In Progress", target: "1,000 Sessions" },
    ],
  },

  delaware: {
    id: "delaware",
    stateName: "Delaware",
    awardAmount: "$157,000,000",
    strategicFocus: "Integrated Behavioral Health & Care Navigation",
    description:
      "Delaware is leveraging its compact geography to build a fully integrated behavioral health network co-located in primary care settings, supported by a statewide care navigation platform to reduce avoidable ED utilization.",
    initiatives: [
      {
        title: "Behavioral Health Integration",
        description: "Embedding licensed behavioral health clinicians in rural primary care practices statewide.",
      },
      {
        title: "Care Navigation Platform",
        description: "A centralized digital platform connecting patients to community resources and specialist referrals.",
      },
      {
        title: "Rural FQHC Expansion",
        description: "Capital grants for Federally Qualified Health Centers to expand access in underserved Sussex County.",
      },
    ],
    metrics: [
      { label: "BH Co-Location Sites", status: "In Progress", target: "25 Practices" },
      { label: "Avoidable ED Visits", status: "Pending", target: "-18%" },
      { label: "FQHC Capacity", status: "Pending", target: "+2,000 Patients" },
    ],
  },

  maryland: {
    id: "maryland",
    stateName: "Maryland",
    awardAmount: "$168,000,000",
    strategicFocus: "Global Budget Expansion & Rural Equity",
    description:
      "Building on Maryland's unique all-payer global budget model, the RHT program extends its reach to underserved rural communities on the Eastern Shore, pairing financial reform with targeted health equity investments.",
    initiatives: [
      {
        title: "Rural Global Budget Pilots",
        description: "Extending the Maryland Total Cost of Care model to smaller rural hospitals not yet participating in global budgets.",
      },
      {
        title: "Eastern Shore Equity Initiative",
        description: "Targeted workforce recruitment, mobile health units, and broadband expansion for the underserved Eastern Shore region.",
      },
      {
        title: "Workforce Housing & Retention",
        description: "Subsidized housing and loan forgiveness programs to retain clinicians in rural Maryland counties.",
      },
    ],
    metrics: [
      { label: "New Global Budget Hospitals", status: "Pending", target: "8 Facilities" },
      { label: "Eastern Shore Screenings", status: "In Progress", target: "+15,000/yr" },
      { label: "Clinician Retention Rate", status: "Pending", target: "+12%" },
    ],
  },

  west_virginia: {
    id: "west_virginia",
    stateName: "West Virginia",
    awardAmount: "$199,000,000",
    strategicFocus: "SUD Recovery Networks & Primary Care Stabilization",
    description:
      "West Virginia confronts the nation's most acute opioid crisis alongside severe rural hospital financial distress. The RHT program focuses on a dual strategy: stabilizing critical access hospitals through shared service networks while building a comprehensive SUD recovery continuum.",
    initiatives: [
      {
        title: "Recovery Community Networks",
        description: "Funding peer recovery coaches, mobile MAT units, and community recovery centers in the hardest-hit counties.",
      },
      {
        title: "Critical Access Hospital Collaborative",
        description: "Shared credentialing, group purchasing, and IT infrastructure support for financially distressed CAHs.",
      },
      {
        title: "Primary Care PMPM Model",
        description: "Per-member-per-month prospective payments to stabilize rural primary care practices.",
      },
      {
        title: "Broadband & Telehealth Infrastructure",
        description: "Co-investment with the state broadband office to connect unserved hollows and enable telehealth delivery.",
      },
    ],
    metrics: [
      { label: "MAT Access Points", status: "In Progress", target: "40 Sites" },
      { label: "CAH Shared Services", status: "Pending", target: "12 Hospitals" },
      { label: "Primary Care PMPM Enrollees", status: "Pending", target: "50,000" },
    ],
  },

  // ── SOUTH ─────────────────────────────────────────────────────────────────────

  texas: {
    id: "texas",
    stateName: "Texas",
    awardAmount: "$281,000,000",
    strategicFocus: "AI Specialty Networks & Wellness",
    description:
      "Texas proposes a massive technological overhaul to address the severe fragmentation of specialty care in its vast rural regions. The state is leveraging its RHT award to build a unified 'Lone Star' digital backbone while simultaneously investing in physical 'Wellness Centers' to address upstream social determinants of health.",
    initiatives: [
      {
        title: "Lone Star Advanced AI Network",
        description:
          "Connecting fragmented specialty telehealth services into a unified statewide AI-driven network. This allows rural primary care providers to instantly consult with urban specialists, reducing unnecessary transfers.",
      },
      {
        title: "Community Wellness Centers",
        description:
          "Converting underutilized rural spaces into 'Wellness Centers' that offer preventative screenings, nutrition classes, and physical fitness programs to address chronic disease roots.",
      },
      {
        title: "Unified Care Cyber Infrastructure",
        description:
          "Deploying a statewide cybersecurity shield for rural hospitals to protect patient data and ensure continuity of operations during cyberattacks.",
      },
      {
        title: "Next Gen Doctor Pipeline",
        description:
          "Aggressive workforce expansion focused on retaining medical students in rural areas through residency stipends and housing support.",
      },
    ],
    metrics: [
      { label: "AI Consult Volume", status: "Pending", target: "10,000/yr" },
      { label: "Wellness Centers Opened", status: "Pending", target: "12 Sites" },
      { label: "Cybersecurity Compliance", status: "In Progress", target: "100% Rural Hospitals" },
    ],
  },

  florida: {
    id: "florida",
    stateName: "Florida",
    awardAmount: "$210,000,000",
    strategicFocus: "Regional Collaboratives & Paramedicine",
    description:
      "Using Community Paramedicine for post-discharge care and formalizing Regional Collaboratives for shared infrastructure.",
    initiatives: [
      { title: "Community Paramedicine", description: "Paramedics providing on-site support for minor illnesses and post-discharge." },
      { title: "Regional Collaboratives", description: "Formal sharing of planning and infrastructure among local providers." },
    ],
    metrics: [
      { label: "Readmissions", status: "Pending", target: "-15%" },
      { label: "Collaboratives Formed", status: "In Progress", target: "5 Regions" },
    ],
  },

  georgia: {
    id: "georgia",
    stateName: "Georgia",
    awardAmount: "$219,000,000",
    strategicFocus: "Obstetric Access & AHEAD Model",
    description:
      "Preparing rural hospitals for the CMS AHEAD global budget model and deploying Obstetric Carts to emergency departments.",
    initiatives: [
      { title: "Obstetric Carts", description: "Deploying carts with hemorrhage/neonatal supplies to rural EDs." },
      { title: "AHEAD Model Readiness", description: "Preparing hospitals to adopt the CMS AHEAD global budget model." },
    ],
    metrics: [
      { label: "AHEAD Participation", status: "Pending", target: "10 Hospitals" },
      { label: "OB Cart Deployment", status: "In Progress", target: "40 EDs" },
    ],
  },

  north_carolina: {
    id: "north_carolina",
    stateName: "North Carolina",
    awardAmount: "$213,000,000",
    strategicFocus: "ROOTS Hubs & SUD",
    description:
      "Establishing 6 'ROOTS' regional hubs and deploying mobile opioid treatment units.",
    initiatives: [
      { title: "ROOTS Hubs", description: "6 regional hubs for medical/social/behavioral integration." },
      { title: "Mobile Opioid Treatment", description: "Mobile units for SUD treatment in rural counties." },
    ],
    metrics: [
      { label: "ROOTS Hubs", status: "Pending", target: "6 Operational" },
      { label: "SUD Treatment Access", status: "In Progress", target: "+25%" },
    ],
  },

  virginia: {
    id: "virginia",
    stateName: "Virginia",
    awardAmount: "$190,000,000",
    strategicFocus: "CareIQ & Food Prescriptions",
    description:
      "Investing in health tech startups via 'CareIQ' and scaling 'Food as Medicine' produce prescriptions.",
    initiatives: [
      { title: "CareIQ", description: "Investing in health tech startups and modernizing EHRs." },
      { title: "Food as Medicine", description: "Produce prescriptions for food-insecure patients." },
    ],
    metrics: [
      { label: "Tech Startups Funded", status: "Pending", target: "10 Startups" },
      { label: "A1C Improvement", status: "Pending", target: "-1.5 pts" },
    ],
  },

  alabama: {
    id: "alabama",
    stateName: "Alabama",
    awardAmount: "$203,000,000",
    strategicFocus: "Maternal & Cancer Digital Regionalization",
    description:
      "Deploying telerobotic ultrasound for high-risk pregnancy and establishing cancer prevention hubs.",
    initiatives: [
      { title: "Telerobotic Ultrasound", description: "Remote-controlled ultrasound units for high-risk pregnancy monitoring." },
      { title: "Cancer Digital Hubs", description: "Establishing 5 IT/telehealth hubs for cancer prevention." },
    ],
    metrics: [
      { label: "Telerobotic Sites", status: "Pending", target: "15 Sites" },
      { label: "Cancer Screening", status: "In Progress", target: "+20%" },
    ],
  },

  mississippi: {
    id: "mississippi",
    stateName: "Mississippi",
    awardAmount: "$206,000,000",
    strategicFocus: "CRIS & Regional Integration",
    description:
      "Creating 'Rural Healthcare Districts' (CRIS) and piloting EMS Treat-in-Place protocols.",
    initiatives: [
      { title: "CRIS Initiative", description: "Coordinated Regional Integrated Systems creating Healthcare Districts." },
      { title: "EMS Treat-in-Place", description: "Pilot program for on-site EMS care without transport." },
    ],
    metrics: [
      { label: "Districts Formed", status: "Pending", target: "3 Districts" },
      { label: "EMS Diversion", status: "In Progress", target: "15%" },
    ],
  },

  louisiana: {
    id: "louisiana",
    stateName: "Louisiana",
    awardAmount: "$208,000,000",
    strategicFocus: "Digital Equity & Smartphones",
    description:
      "Providing subsidized smartphones with health apps to rural residents and offering tax credits to clinicians.",
    initiatives: [
      { title: "Rural Tech Fund", description: "Providing subsidized smartphones with health apps/data to residents." },
      { title: "Clinician Credit Bank", description: "Tax-credit incentives for high-need parishes." },
    ],
    metrics: [
      { label: "App Activation", status: "In Progress", target: "50,000 Users" },
      { label: "Clinician Vacancy", status: "Pending", target: "-10%" },
    ],
  },

  tennessee: {
    id: "tennessee",
    stateName: "Tennessee",
    awardAmount: "$207,000,000",
    strategicFocus: "Memory Care & NEMT",
    description:
      "Hub-and-spoke model for dementia care and a tech-enabled non-emergency transport system.",
    initiatives: [
      { title: "Memory Care Network", description: "Hub-and-spoke model for dementia diagnosis/treatment." },
      { title: "Rural NEMT System", description: "Tech-enabled non-emergency transportation coordination." },
    ],
    metrics: [
      { label: "Dementia Screening", status: "Pending", target: "+30%" },
      { label: "Transport Volume", status: "In Progress", target: "10,000 Rides" },
    ],
  },

  kentucky: {
    id: "kentucky",
    stateName: "Kentucky",
    awardAmount: "$213,000,000",
    strategicFocus: "Maternal Teams & Diabetes Hubs",
    description:
      "Community-based maternal teams for 1-year postpartum support and Diabetes Hubs.",
    initiatives: [
      { title: "PoWERing Maternal Health", description: "Community teams supporting women through 1 year post-partum." },
      { title: "Rural Community Hubs", description: "Interventions focused on the diabetes continuum." },
    ],
    metrics: [
      { label: "Postpartum Visits", status: "Pending", target: "80% Attendance" },
      { label: "A1C Control", status: "In Progress", target: "Improved" },
    ],
  },

  south_carolina: {
    id: "south_carolina",
    stateName: "South Carolina",
    awardAmount: "$200,000,000",
    strategicFocus: "Digital Literacy & Startups",
    description:
      "Investing in rural health tech startups and a statewide digital literacy campaign.",
    initiatives: [
      { title: "Connections to Care", description: "Digital health literacy improvement." },
      { title: "Tech Catalyst Fund", description: "Investment in rural health technology startups." },
    ],
    metrics: [
      { label: "Digital Literacy", status: "In Progress", target: "10,000 Certified" },
      { label: "Startups Funded", status: "Pending", target: "5 Companies" },
    ],
  },

  arkansas: {
    id: "arkansas",
    stateName: "Arkansas",
    awardAmount: "$209,000,000",
    strategicFocus: "System Stabilization & Heart Health",
    description:
      "Shared service agreements to stabilize vulnerable hospitals (SAFE) and a 6-pronged heart health initiative.",
    initiatives: [
      { title: "SAFE Initiative", description: "Shared service agreements to stabilize financially vulnerable hospitals." },
      { title: "HEART Initiative", description: "Focus on local food access and recreation infrastructure." },
    ],
    metrics: [
      { label: "Hospital Solvency", status: "Pending", target: "Stabilized" },
      { label: "HEART Participation", status: "In Progress", target: "High" },
    ],
  },

  oklahoma: {
    id: "oklahoma",
    stateName: "Oklahoma",
    awardAmount: "$223,000,000",
    strategicFocus: "Upstream Prevention & Microgrants",
    description:
      "'Moving Upstream' consumer tech and $50k wellness microgrants for local departments.",
    initiatives: [
      { title: "Moving Upstream", description: "Consumer-facing tech and remote monitoring." },
      { title: "Wellness Microgrants", description: "Grants up to $50k for local health departments." },
    ],
    metrics: [
      { label: "App Adoption", status: "In Progress", target: "High" },
      { label: "Projects Launched", status: "Pending", target: "All Counties" },
    ],
  },

  // ── MIDWEST ───────────────────────────────────────────────────────────────────

  ohio: {
    id: "ohio",
    stateName: "Ohio",
    awardAmount: "$202,000,000",
    strategicFocus: "School Clinics & Mobile Vision",
    description:
      "Expanding School-Based Health Centers and 'OH SEE' mobile vision clinics.",
    initiatives: [
      { title: "School-Based Health", description: "Clinics on K-12 and college campuses." },
      { title: "OH SEE", description: "Statewide expansion of mobile vision/hearing/dental clinics." },
    ],
    metrics: [
      { label: "School Clinics", status: "Pending", target: "20 New Sites" },
      { label: "Children Screened", status: "In Progress", target: "50,000" },
    ],
  },

  michigan: {
    id: "michigan",
    stateName: "Michigan",
    awardAmount: "$173,000,000",
    strategicFocus: "Aging in Place & Pipelines",
    description:
      "High School to Health Care workforce pipelines and an 'Aging in Place' blueprint for the Upper Peninsula.",
    initiatives: [
      { title: "Workforce Pipeline", description: "Funding to transition high school students into local health professions." },
      { title: "Healthy Aging Blueprint", description: "Community-based care focus for the Upper Peninsula." },
    ],
    metrics: [
      { label: "Student Pipeline", status: "In Progress", target: "500 Students" },
      { label: "Nursing Home Avoidance", status: "Pending", target: "Increased" },
    ],
  },

  indiana: {
    id: "indiana",
    stateName: "Indiana",
    awardAmount: "$207,000,000",
    strategicFocus: "Coordination Center & ED Readiness",
    description:
      "Centralized Medical Operations Coordination Center and meds at outpatient prices post-discharge.",
    initiatives: [
      { title: "Coordination Center", description: "Centralized transfer coordination and diversion management." },
      { title: "Post-Discharge Meds", description: "Providing meds to patients before they leave hospital at outpatient prices." },
    ],
    metrics: [
      { label: "Transfer Time", status: "Pending", target: "-30 Minutes" },
      { label: "Med Adherence", status: "In Progress", target: "+15%" },
    ],
  },

  illinois: {
    id: "illinois",
    stateName: "Illinois",
    awardAmount: "$193,000,000",
    strategicFocus: "EMS Transformation & Infrastructure",
    description:
      "'Treat-Not-Transport' payment models for EMS and community care infrastructure.",
    initiatives: [
      { title: "Treat-Not-Transport", description: "Expanding payment models to allow EMS to treat patients on-site." },
      { title: "Community Infrastructure", description: "Funding for staffing/workflows to integrate primary/behavioral health." },
    ],
    metrics: [
      { label: "Treat-on-Site", status: "Pending", target: "10% of Calls" },
      { label: "BH Integration", status: "In Progress", target: "Expanded" },
    ],
  },

  wisconsin: {
    id: "wisconsin",
    stateName: "Wisconsin",
    awardAmount: "$204,000,000",
    strategicFocus: "Farmer Wellness & Dental",
    description:
      "24-hour Farmer Wellness Helpline and equipment grants for rural dental clinics.",
    initiatives: [
      { title: "Farmer Wellness", description: "Helpline, counseling vouchers, and support groups for farmers." },
      { title: "Dental Grants", description: "Equipment upgrades for rural dental clinics." },
    ],
    metrics: [
      { label: "Helpline Volume", status: "In Progress", target: "Active" },
      { label: "Dental Procedures", status: "Pending", target: "+10%" },
    ],
  },

  minnesota: {
    id: "minnesota",
    stateName: "Minnesota",
    awardAmount: "$193,000,000",
    strategicFocus: "Mental Health Urgent Care & Cardio",
    description:
      "Establishing Mental Health Urgent Care centers and regional cardiometabolic collaboratives.",
    initiatives: [
      { title: "Mental Health Urgent Care", description: "Centers for crisis intervention to divert from EDs." },
      { title: "Regional Care Models", description: "Collaboratives to improve cardiometabolic health outcomes." },
    ],
    metrics: [
      { label: "ED Psych Diversion", status: "Pending", target: "High" },
      { label: "Cardio Outcomes", status: "In Progress", target: "Improved" },
    ],
  },

  iowa: {
    id: "iowa",
    stateName: "Iowa",
    awardAmount: "$209,000,000",
    strategicFocus: "Skin Cancer & Digital Literacy",
    description:
      "Distributing dermatoscopes for melanoma detection and improving digital health literacy.",
    initiatives: [
      { title: "Dermatoscopes", description: "Equipping rural providers to detect melanoma." },
      { title: "Connections to Care", description: "Improving digital health literacy to boost telehealth usage." },
    ],
    metrics: [
      { label: "Melanoma Screening", status: "In Progress", target: "Expanded" },
      { label: "Telehealth Usage", status: "Pending", target: "+20%" },
    ],
  },

  missouri: {
    id: "missouri",
    stateName: "Missouri",
    awardAmount: "$216,000,000",
    strategicFocus: "ToRCH Care & Value-Based Payment",
    description:
      "Hub-and-spoke 'ToRCH' networks and an APM incentivizing reduced ED visits.",
    initiatives: [
      { title: "ToRCH Care", description: "Transformation of Rural Community Health hub-and-spoke model." },
      { title: "ED Reduction APM", description: "Alternative Payment Model incentivizing reduced ED utilization." },
    ],
    metrics: [
      { label: "Network Participation", status: "Pending", target: "High" },
      { label: "ED Reduction", status: "In Progress", target: "-10%" },
    ],
  },

  kansas: {
    id: "kansas",
    stateName: "Kansas",
    awardAmount: "$222,000,000",
    strategicFocus: "PACE Expansion & Back-Office Support",
    description:
      "Expanding PACE for the elderly and providing centralized back-office services for clinics.",
    initiatives: [
      { title: "PACE Expansion", description: "Expanding 'Program of All-Inclusive Care for the Elderly' to rural regions." },
      { title: "Centralized Back-Office", description: "State-level service for credentialing and contract negotiation." },
    ],
    metrics: [
      { label: "PACE Enrollment", status: "Pending", target: "Growth" },
      { label: "Admin Cost", status: "In Progress", target: "Reduced" },
    ],
  },

  nebraska: {
    id: "nebraska",
    stateName: "Nebraska",
    awardAmount: "$219,000,000",
    strategicFocus: "School Food & VR Training",
    description:
      "'School Food Learning Labs' connecting farms to schools, and VR/AR training for providers.",
    initiatives: [
      { title: "School Food Lab", description: "Connecting schools with farms for 'Food as Medicine'." },
      { title: "VR/AR Training", description: "Using virtual reality to train rural providers." },
    ],
    metrics: [
      { label: "Student Obesity", status: "Pending", target: "Reduced" },
      { label: "VR Training Hours", status: "In Progress", target: "1,000" },
    ],
  },

  north_dakota: {
    id: "north_dakota",
    stateName: "North Dakota",
    awardAmount: "$199,000,000",
    strategicFocus: "Drones & Kiosks",
    description:
      "Automated pharmacy kiosks and drone delivery for supplies/labs in frontier areas.",
    initiatives: [
      { title: "Pharmacy Kiosks", description: "Self-service medication access points." },
      { title: "Drone Delivery", description: "Rapid delivery of supplies and lab samples." },
    ],
    metrics: [
      { label: "Kiosk Transactions", status: "Pending", target: "Active" },
      { label: "Drone Flights", status: "In Progress", target: "Successful" },
    ],
  },

  south_dakota: {
    id: "south_dakota",
    stateName: "South Dakota",
    awardAmount: "$189,000,000",
    strategicFocus: "Maternal Hubs & Medicaid APM",
    description:
      "Regional Maternal/Infant Hubs and a capitated Medicaid Primary Care model.",
    initiatives: [
      { title: "Maternal Hubs", description: "Clinical care plus social support network." },
      { title: "Medicaid Transformation", description: "Flexible, capitated payments for rural primary care." },
    ],
    metrics: [
      { label: "Maternal Outcomes", status: "Pending", target: "Improved" },
      { label: "Capitation Adoption", status: "In Progress", target: "30 Practices" },
    ],
  },

  // ── WEST ──────────────────────────────────────────────────────────────────────

  california: {
    id: "california",
    stateName: "California",
    awardAmount: "$234,000,000",
    status: "At Risk",
    strategicFocus: "Hub-and-Spoke Resilience",
    description:
      "California's RHT plan focuses on formalizing regional networks to ensure rural hospital survival amidst climate risks and payer consolidation. The state is establishing a 'Hub and Spoke' model where financially stronger rural hospitals support smaller clinics and Tribal health programs.",
    initiatives: [
      {
        title: "Transformative Care Model",
        description:
          "Formalizing 'Hub and Spoke' networks where rural hospitals serve as hubs for FQHCs and Tribal health programs, sharing administrative burdens and clinical resources.",
      },
      {
        title: "Statewide Workforce Mapping",
        description:
          "Development and deployment of a live GIS tool to track workforce gaps in real-time and direct 'Train-the-Trainer' resources to the counties with the highest vacancy rates.",
      },
      {
        title: "Infrastructure Hardening",
        description:
          "Modernizing connectivity and facility resilience against climate and wildfire risks, ensuring rural hospitals remain operational during natural disasters.",
      },
    ],
    metrics: [
      { label: "Spokes Integrated", status: "Pending", target: "25 FQHCs" },
      { label: "Workforce Map Users", status: "In Progress", target: "58 Counties" },
      { label: "Climate Retrofits", status: "Pending", target: "15 Facilities" },
    ],
  },

  washington: {
    id: "washington",
    stateName: "Washington",
    awardAmount: "$181,000,000",
    strategicFocus: "Hospital Solvency & Native Families",
    description:
      "Value-based models for hospital solvency and dedicated funding for Tribal health.",
    initiatives: [
      { title: "Ignite Innovation", description: "Value-based models to support hospital financial health." },
      { title: "Invest in Native Families", description: "Dedicated funding for Tribal workforce and coordination." },
    ],
    metrics: [
      { label: "Hospital Margins", status: "Pending", target: "Neutral/Positive" },
      { label: "Tribal Providers", status: "In Progress", target: "Trained" },
    ],
  },

  oregon: {
    id: "oregon",
    stateName: "Oregon",
    awardAmount: "$197,000,000",
    strategicFocus: "Provider Exchange & Pharmacy Lockers",
    description:
      "Rural-Urban provider exchange program and secure pharmacy pickup lockers.",
    initiatives: [
      { title: "Provider Exchange", description: "Rural providers training in urban centers, and vice-versa." },
      { title: "Pharmacy Lockers", description: "Secure pickup lockers to expand access." },
    ],
    metrics: [
      { label: "Exchange Participants", status: "In Progress", target: "50 Providers" },
      { label: "Locker Usage", status: "Pending", target: "High" },
    ],
  },

  idaho: {
    id: "idaho",
    stateName: "Idaho",
    awardAmount: "$186,000,000",
    strategicFocus: "Tele-Pharmacy & Compliance",
    description:
      "Remote tele-pharmacy dispensing and facility renovations for code compliance.",
    initiatives: [
      { title: "Remote Tele-Pharmacy", description: "Dispensing units to expand medication access." },
      { title: "Facility Compliance", description: "Renovations to bring aging facilities into safety code compliance." },
    ],
    metrics: [
      { label: "Scripts Dispensed", status: "Pending", target: "Volume" },
      { label: "Code Citations", status: "In Progress", target: "Resolved" },
    ],
  },

  montana: {
    id: "montana",
    stateName: "Montana",
    awardAmount: "$234,000,000",
    strategicFocus: "Center of Excellence & Restructuring",
    description:
      "A 'Rural Center of Excellence' to oversee system restructuring and eliminate negative margins.",
    initiatives: [
      { title: "Center of Excellence", description: "Body to oversee restructuring of care availability." },
      { title: "Pharmacist Access", description: "Extending access to lower-cost care from pharmacists." },
    ],
    metrics: [
      { label: "Restructuring Plans", status: "Pending", target: "Implemented" },
      { label: "Pharmacist Services", status: "In Progress", target: "Expanded" },
    ],
  },

  wyoming: {
    id: "wyoming",
    stateName: "Wyoming",
    awardAmount: "$205,000,000",
    strategicFocus: "CAH Incentives & Telepsychiatry",
    description:
      "Incentivizing CAHs to limit elective services and focus on essentials (ED/Ambulance), plus statewide telepsych.",
    initiatives: [
      { title: "CAH Basic Incentive", description: "Incentivizing hospitals to focus on essentials." },
      { title: "Statewide Telepsychiatry", description: "Crisis intervention services." },
    ],
    metrics: [
      { label: "Incentive Participation", status: "Pending", target: "High" },
      { label: "Crisis Response", status: "In Progress", target: "Faster" },
    ],
  },

  colorado: {
    id: "colorado",
    stateName: "Colorado",
    awardAmount: "$200,000,000",
    strategicFocus: "Regional Partnerships & Mobile Health",
    description:
      "Formalizing regional partnerships to diversify revenue and expanding mobile health tools.",
    initiatives: [
      { title: "Mobile Health", description: "Increasing adoption of mobile tools and dashboards." },
      { title: "Regional Partnerships", description: "Legal structures to bind rural hospitals together." },
    ],
    metrics: [
      { label: "Partnerships Signed", status: "Pending", target: "Executed" },
      { label: "Mobile Usage", status: "In Progress", target: "Increased" },
    ],
  },

  utah: {
    id: "utah",
    stateName: "Utah",
    awardAmount: "$196,000,000",
    strategicFocus: "PATH & SUPPORT",
    description:
      "'PATH' for preventive built environments and 'SUPPORT' for AI tools to reduce admin burden.",
    initiatives: [
      { title: "PATH Initiative", description: "Nutrition, physical activity, and built environment." },
      { title: "SUPPORT Tools", description: "Reducing admin burden via AI." },
    ],
    metrics: [
      { label: "Obesity Rates", status: "Pending", target: "Reduced" },
      { label: "Admin Hours", status: "In Progress", target: "Reduced" },
    ],
  },

  nevada: {
    id: "nevada",
    stateName: "Nevada",
    awardAmount: "$180,000,000",
    strategicFocus: "Outcomes Accelerator & Incentives",
    description:
      "$30M Accelerator for value-based care and $80M in provider incentives.",
    initiatives: [
      { title: "Outcomes Accelerator", description: "Investing in value-based care models and AI." },
      { title: "Provider Incentives", description: "$80M investment for living/serving in rural areas." },
    ],
    metrics: [
      { label: "Accelerator Adoption", status: "Pending", target: "High" },
      { label: "Provider Count", status: "In Progress", target: "Increased" },
    ],
  },

  arizona: {
    id: "arizona",
    stateName: "Arizona",
    awardAmount: "$167,000,000",
    strategicFocus: "Mobile Access & Workforce Pipeline",
    description:
      "New rural residency slots and mobile satellite clinics to close the '20-mile gap'.",
    initiatives: [
      { title: "Rural Clinical Rotations", description: "Establishing new residency slots for rural placement." },
      { title: "Mobile & Satellite Clinics", description: "Deploying units to close the travel gap." },
    ],
    metrics: [
      { label: "Student Retention", status: "Pending", target: "High" },
      { label: "Patient Volume", status: "In Progress", target: "Increased" },
    ],
  },

  new_mexico: {
    id: "new_mexico",
    stateName: "New Mexico",
    awardAmount: "$211,000,000",
    strategicFocus: "Specialty Networks & Workforce",
    description:
      "'Healthy Horizons' specialty networks and housing/mentorship for workforce.",
    initiatives: [
      { title: "Healthy Horizons", description: "Regionalized specialty and maternal care networks." },
      { title: "Rooted in New Mexico", description: "Housing and mentorship for rural workforce." },
    ],
    metrics: [
      { label: "Specialty Wait Times", status: "Pending", target: "Reduced" },
      { label: "Workforce Retention", status: "In Progress", target: "Improved" },
    ],
  },

  alaska: {
    id: "alaska",
    stateName: "Alaska",
    awardAmount: "$272,000,000",
    strategicFocus: "Frontier Logistics & Pharmacy Innovation",
    description:
      "Drone delivery pilots and remote fetal monitoring for off-road communities.",
    initiatives: [
      { title: "Drone Delivery", description: "Utilizing drones and remote pharmacy dispensing units." },
      { title: "Remote Fetal Monitoring", description: "Devices for high-risk pregnancies in frontier areas." },
    ],
    metrics: [
      { label: "Drone Deliveries", status: "In Progress", target: "Successful" },
      { label: "Med Evacuations", status: "Pending", target: "Reduced" },
    ],
  },

  hawaii: {
    id: "hawaii",
    stateName: "Hawaii",
    awardAmount: "$189,000,000",
    strategicFocus: "Digital Backbone & Respite",
    description:
      "Statewide Rural Health Information Network (RHIN) and medical respite for the unhoused.",
    initiatives: [
      { title: "RHIN", description: "Statewide digital backbone connecting all rural entities." },
      { title: "Rural Respite Network", description: "Medical respite for unhoused patients." },
    ],
    metrics: [
      { label: "RHIN Integration", status: "Pending", target: "100%" },
      { label: "ALOS (Unhoused)", status: "In Progress", target: "Reduced" },
    ],
  },
};