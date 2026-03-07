export type PerformanceIndexProfile = {
  id: string;
  stateName: string;
  performanceScore: number;
  status: "Leading" | "Improving" | "Stable" | "At Risk";
  metrics: {
    policy: {
      vbpAdoption: number;
      telehealth: number;
      scopeOfPractice: number;
    };
    economics: {
      spendingPerCapita: number;
      workforceGaps: number;
      insuranceCoverage: number;
    };
    technology: {
      hieAdoption: number;
      broadbandAccess: number;
      ehrAdoption: number;
    };
  };
  narrative: {
    title: string;
    summary: string;
  };
};

export const performanceIndexData: Record<string, PerformanceIndexProfile> = {

  // ── NORTHEAST ────────────────────────────────────────────────────────────────

  vermont: {
    id: "vermont",
    stateName: "Vermont",
    performanceScore: 82,
    status: "Leading",
    metrics: {
      policy: { vbpAdoption: 90, telehealth: 85, scopeOfPractice: 78 },
      economics: { spendingPerCapita: 75, workforceGaps: 80, insuranceCoverage: 95 },
      technology: { hieAdoption: 88, broadbandAccess: 70, ehrAdoption: 92 },
    },
    narrative: {
      title: "Pioneering State-Wide Value Models",
      summary:
        "Vermont leads the nation in its aggressive adoption of All-Payer and Value-Based Care models, though rural broadband access remains a key challenge for telehealth expansion.",
    },
  },

  maine: {
    id: "maine",
    stateName: "Maine",
    performanceScore: 69,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 65, telehealth: 72, scopeOfPractice: 70 },
      economics: { spendingPerCapita: 72, workforceGaps: 60, insuranceCoverage: 88 },
      technology: { hieAdoption: 74, broadbandAccess: 62, ehrAdoption: 85 },
    },
    narrative: {
      title: "AI Innovation Bridging a Dispersed Population",
      summary:
        "Maine's aging, geographically dispersed population places significant pressure on its rural hospital network. Investment in AI-driven rural hubs and expanded paramedicine aims to close critical access gaps.",
    },
  },

  new_hampshire: {
    id: "new_hampshire",
    stateName: "New Hampshire",
    performanceScore: 65,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 62, telehealth: 68, scopeOfPractice: 72 },
      economics: { spendingPerCapita: 68, workforceGaps: 58, insuranceCoverage: 88 },
      technology: { hieAdoption: 70, broadbandAccess: 65, ehrAdoption: 82 },
    },
    narrative: {
      title: "Addressing Polypharmacy and Prevention Gaps",
      summary:
        "New Hampshire's RHT strategy targets high-risk senior populations through pharmacy transformation and prevention-first access points, reflecting a proactive approach to its opioid and chronic disease burden.",
    },
  },

  massachusetts: {
    id: "massachusetts",
    stateName: "Massachusetts",
    performanceScore: 85,
    status: "Leading",
    metrics: {
      policy: { vbpAdoption: 88, telehealth: 90, scopeOfPractice: 82 },
      economics: { spendingPerCapita: 60, workforceGaps: 85, insuranceCoverage: 97 },
      technology: { hieAdoption: 92, broadbandAccess: 80, ehrAdoption: 95 },
    },
    narrative: {
      title: "National Leader with High-Value Technology Focus",
      summary:
        "Massachusetts consistently outperforms peers on coverage rates and technology adoption. Its focus on mobile health ROI and real-time behavioral health bed tracking pushes the frontier of system efficiency.",
    },
  },

  connecticut: {
    id: "connecticut",
    stateName: "Connecticut",
    performanceScore: 79,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 78, telehealth: 80, scopeOfPractice: 76 },
      economics: { spendingPerCapita: 65, workforceGaps: 72, insuranceCoverage: 93 },
      technology: { hieAdoption: 82, broadbandAccess: 78, ehrAdoption: 88 },
    },
    narrative: {
      title: "Behavioral Health Infrastructure as a Strategic Priority",
      summary:
        "Connecticut's investment in 23-hour crisis stabilization centers and universal nurse home-visiting reflects a mature behavioral health strategy designed to prevent unnecessary hospitalizations.",
    },
  },

  rhode_island: {
    id: "rhode_island",
    stateName: "Rhode Island",
    performanceScore: 77,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 76, telehealth: 78, scopeOfPractice: 74 },
      economics: { spendingPerCapita: 70, workforceGaps: 74, insuranceCoverage: 94 },
      technology: { hieAdoption: 80, broadbandAccess: 74, ehrAdoption: 86 },
    },
    narrative: {
      title: "Island and Tribal Access as Unique Infrastructure Challenge",
      summary:
        "Rhode Island's compact geography masks significant equity gaps for Block Island and Narragansett communities. Its Hospital-at-Home initiative offers a scalable model for acute care outside traditional facilities.",
    },
  },

  new_york: {
    id: "new_york",
    stateName: "New York",
    performanceScore: 72,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 74, telehealth: 76, scopeOfPractice: 70 },
      economics: { spendingPerCapita: 55, workforceGaps: 68, insuranceCoverage: 92 },
      technology: { hieAdoption: 80, broadbandAccess: 68, ehrAdoption: 88 },
    },
    narrative: {
      title: "Addressing Maternal Deserts Through Workforce Reform",
      summary:
        "New York's 'Rural Roots' model directly confronts obstetric care deserts in its vast non-metropolitan regions. The statewide eConsult platform is among the most ambitious specialty access initiatives in the country.",
    },
  },

  pennsylvania: {
    id: "pennsylvania",
    stateName: "Pennsylvania",
    performanceScore: 69,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 68, telehealth: 72, scopeOfPractice: 66 },
      economics: { spendingPerCapita: 70, workforceGaps: 65, insuranceCoverage: 90 },
      technology: { hieAdoption: 75, broadbandAccess: 66, ehrAdoption: 84 },
    },
    narrative: {
      title: "Regional Hub Model Anchoring Value-Based Transition",
      summary:
        "Pennsylvania's 8-hub regional architecture provides critical IT and workflow support to small rural providers, accelerating VBC adoption in a state with a large and dispersed rural hospital network.",
    },
  },

  new_jersey: {
    id: "new_jersey",
    stateName: "New Jersey",
    performanceScore: 73,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 72, telehealth: 76, scopeOfPractice: 74 },
      economics: { spendingPerCapita: 62, workforceGaps: 70, insuranceCoverage: 90 },
      technology: { hieAdoption: 78, broadbandAccess: 75, ehrAdoption: 88 },
    },
    narrative: {
      title: "Behavioral Health System Modernization Underway",
      summary:
        "New Jersey's CCBHC transition strategy addresses a fragmented mental health system, while public telehealth access points aim to close equity gaps for low-income rural residents.",
    },
  },

  delaware: {
    id: "delaware",
    stateName: "Delaware",
    performanceScore: 62,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 60, telehealth: 65, scopeOfPractice: 62 },
      economics: { spendingPerCapita: 68, workforceGaps: 58, insuranceCoverage: 88 },
      technology: { hieAdoption: 68, broadbandAccess: 62, ehrAdoption: 80 },
    },
    narrative: {
      title: "Compact State, Complex Access Gaps",
      summary:
        "Delaware's small footprint belies significant rural access disparities in Sussex County. Behavioral health co-location and FQHC expansion are the primary levers for closing gaps in primary and preventive care.",
    },
  },

  maryland: {
    id: "maryland",
    stateName: "Maryland",
    performanceScore: 75,
    status: "Improving",
    metrics: {
      policy: { vbpAdoption: 82, telehealth: 78, scopeOfPractice: 72 },
      economics: { spendingPerCapita: 70, workforceGaps: 68, insuranceCoverage: 91 },
      technology: { hieAdoption: 80, broadbandAccess: 70, ehrAdoption: 88 },
    },
    narrative: {
      title: "Global Budget Model Expanding to Rural Hospitals",
      summary:
        "Maryland's unique all-payer global budget system is a national policy benchmark. The RHT program extends this financial reform to rural and Eastern Shore hospitals that have not yet been integrated, pairing it with equity investments.",
    },
  },

  // ── SOUTH ─────────────────────────────────────────────────────────────────────

  texas: {
    id: "texas",
    stateName: "Texas",
    performanceScore: 65,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 55, telehealth: 70, scopeOfPractice: 60 },
      economics: { spendingPerCapita: 68, workforceGaps: 50, insuranceCoverage: 62 },
      technology: { hieAdoption: 75, broadbandAccess: 65, ehrAdoption: 80 },
    },
    narrative: {
      title: "Addressing Scale and Disparity",
      summary:
        "Texas faces significant challenges in workforce distribution and insurance coverage across its vast rural areas. However, recent investments in its Lone Star AI telehealth network and community wellness infrastructure show significant promise.",
    },
  },

  florida: {
    id: "florida",
    stateName: "Florida",
    performanceScore: 55,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 52, telehealth: 62, scopeOfPractice: 58 },
      economics: { spendingPerCapita: 72, workforceGaps: 48, insuranceCoverage: 75 },
      technology: { hieAdoption: 65, broadbandAccess: 58, ehrAdoption: 76 },
    },
    narrative: {
      title: "Paramedicine and Regional Collaboratives Targeting Fragmentation",
      summary:
        "Florida's high uninsured rate and fragmented rural hospital landscape create recurring access gaps. Community paramedicine for post-discharge care and formalized regional collaboratives represent the core transformation strategy.",
    },
  },

  georgia: {
    id: "georgia",
    stateName: "Georgia",
    performanceScore: 44,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 42, telehealth: 50, scopeOfPractice: 48 },
      economics: { spendingPerCapita: 75, workforceGaps: 38, insuranceCoverage: 62 },
      technology: { hieAdoption: 55, broadbandAccess: 44, ehrAdoption: 68 },
    },
    narrative: {
      title: "Obstetric Crisis Driving Urgent Structural Reform",
      summary:
        "Georgia has among the nation's highest maternal mortality rates. Obstetric cart deployment to rural EDs and preparation for the CMS AHEAD global budget model are urgent priorities for a system under acute financial and clinical stress.",
    },
  },

  north_carolina: {
    id: "north_carolina",
    stateName: "North Carolina",
    performanceScore: 57,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 56, telehealth: 62, scopeOfPractice: 58 },
      economics: { spendingPerCapita: 70, workforceGaps: 50, insuranceCoverage: 72 },
      technology: { hieAdoption: 65, broadbandAccess: 52, ehrAdoption: 75 },
    },
    narrative: {
      title: "ROOTS Hubs Building Regional Integration Capacity",
      summary:
        "North Carolina's 6 ROOTS regional hubs aim to break down siloes between medical, social, and behavioral services. Mobile opioid treatment units address the state's persistent SUD crisis in rural counties.",
    },
  },

  virginia: {
    id: "virginia",
    stateName: "Virginia",
    performanceScore: 68,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 66, telehealth: 72, scopeOfPractice: 68 },
      economics: { spendingPerCapita: 68, workforceGaps: 62, insuranceCoverage: 86 },
      technology: { hieAdoption: 74, broadbandAccess: 64, ehrAdoption: 82 },
    },
    narrative: {
      title: "Tech Investment and Food-as-Medicine Defining Reform",
      summary:
        "Virginia's CareIQ initiative takes a startup-investment approach to health system innovation, complemented by produce prescription programs that address food insecurity as a driver of chronic disease.",
    },
  },

  west_virginia: {
    id: "west_virginia",
    stateName: "West Virginia",
    performanceScore: 31,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 30, telehealth: 42, scopeOfPractice: 38 },
      economics: { spendingPerCapita: 82, workforceGaps: 28, insuranceCoverage: 82 },
      technology: { hieAdoption: 48, broadbandAccess: 35, ehrAdoption: 62 },
    },
    narrative: {
      title: "SUD Crisis and Hospital Distress Demand Systemic Response",
      summary:
        "West Virginia carries the nation's most acute opioid burden alongside pervasive rural hospital financial distress. Recovery community networks, CAH shared service collaboratives, and primary care prospective payment are the three pillars of its transformation strategy.",
    },
  },

  alabama: {
    id: "alabama",
    stateName: "Alabama",
    performanceScore: 32,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 30, telehealth: 40, scopeOfPractice: 35 },
      economics: { spendingPerCapita: 78, workforceGaps: 28, insuranceCoverage: 72 },
      technology: { hieAdoption: 48, broadbandAccess: 38, ehrAdoption: 62 },
    },
    narrative: {
      title: "Maternal Mortality and Cancer Burden Requiring Targeted Investment",
      summary:
        "Alabama faces severe health disparities, particularly in maternal outcomes and cancer mortality rates in its Black Belt region. Telerobotic ultrasound and cancer prevention hubs represent targeted digital infrastructure investments in historically underserved communities.",
    },
  },

  mississippi: {
    id: "mississippi",
    stateName: "Mississippi",
    performanceScore: 48,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 40, telehealth: 55, scopeOfPractice: 50 },
      economics: { spendingPerCapita: 80, workforceGaps: 35, insuranceCoverage: 58 },
      technology: { hieAdoption: 60, broadbandAccess: 45, ehrAdoption: 70 },
    },
    narrative: {
      title: "Significant Headwinds in Workforce and Access",
      summary:
        "Mississippi faces critical challenges, particularly in its healthcare workforce supply and low rates of broadband access, which hinder technology-driven transformation efforts. The CRIS regional district model is its most ambitious structural reform.",
    },
  },

  louisiana: {
    id: "louisiana",
    stateName: "Louisiana",
    performanceScore: 33,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 32, telehealth: 42, scopeOfPractice: 36 },
      economics: { spendingPerCapita: 76, workforceGaps: 30, insuranceCoverage: 74 },
      technology: { hieAdoption: 50, broadbandAccess: 38, ehrAdoption: 62 },
    },
    narrative: {
      title: "Digital Equity as the Foundation for Health Transformation",
      summary:
        "Louisiana's RHT strategy treats smartphone access and digital literacy as a prerequisite for all other health system improvements. Paired with clinician tax-credit incentives, it aims to address both supply-side workforce gaps and demand-side access barriers.",
    },
  },

  tennessee: {
    id: "tennessee",
    stateName: "Tennessee",
    performanceScore: 43,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 42, telehealth: 50, scopeOfPractice: 44 },
      economics: { spendingPerCapita: 74, workforceGaps: 36, insuranceCoverage: 72 },
      technology: { hieAdoption: 55, broadbandAccess: 42, ehrAdoption: 65 },
    },
    narrative: {
      title: "Memory Care and Transportation Barriers Defining Rural Gaps",
      summary:
        "Tennessee's hub-and-spoke dementia care network addresses a rapidly growing elderly population in rural counties, while its NEMT system tackles the transportation barriers that prevent patients from accessing any care at all.",
    },
  },

  kentucky: {
    id: "kentucky",
    stateName: "Kentucky",
    performanceScore: 38,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 36, telehealth: 45, scopeOfPractice: 40 },
      economics: { spendingPerCapita: 76, workforceGaps: 32, insuranceCoverage: 84 },
      technology: { hieAdoption: 52, broadbandAccess: 38, ehrAdoption: 65 },
    },
    narrative: {
      title: "Maternal Health and Diabetes Disparities Driving Reform",
      summary:
        "Kentucky faces severe chronic disease burdens amplified by rural access gaps. The PoWERing Maternal Health initiative's full year of postpartum support and community diabetes hubs are high-priority interventions in one of the nation's most health-distressed states.",
    },
  },

  south_carolina: {
    id: "south_carolina",
    stateName: "South Carolina",
    performanceScore: 45,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 44, telehealth: 52, scopeOfPractice: 46 },
      economics: { spendingPerCapita: 72, workforceGaps: 40, insuranceCoverage: 73 },
      technology: { hieAdoption: 55, broadbandAccess: 42, ehrAdoption: 65 },
    },
    narrative: {
      title: "Digital Literacy as the Entry Point for Rural Transformation",
      summary:
        "South Carolina's Connections to Care digital literacy program recognizes that technology adoption cannot precede technology fluency. Its Tech Catalyst Fund supports homegrown rural health startups as a longer-term system innovation strategy.",
    },
  },

  arkansas: {
    id: "arkansas",
    stateName: "Arkansas",
    performanceScore: 34,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 32, telehealth: 42, scopeOfPractice: 36 },
      economics: { spendingPerCapita: 74, workforceGaps: 30, insuranceCoverage: 78 },
      technology: { hieAdoption: 50, broadbandAccess: 36, ehrAdoption: 60 },
    },
    narrative: {
      title: "Hospital Stabilization and Upstream Prevention as Twin Priorities",
      summary:
        "Arkansas faces significant hospital financial distress alongside deep chronic disease burdens. The SAFE shared service model targets financial stabilization while the HEART initiative addresses cardiovascular disease through food access and community infrastructure.",
    },
  },

  oklahoma: {
    id: "oklahoma",
    stateName: "Oklahoma",
    performanceScore: 36,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 34, telehealth: 44, scopeOfPractice: 38 },
      economics: { spendingPerCapita: 72, workforceGaps: 32, insuranceCoverage: 60 },
      technology: { hieAdoption: 50, broadbandAccess: 38, ehrAdoption: 62 },
    },
    narrative: {
      title: "Microgrants and Consumer Tech Targeting Prevention at Scale",
      summary:
        "Oklahoma's Moving Upstream program deploys consumer-facing technology for remote monitoring, while wellness microgrants empower local health departments to launch county-specific prevention programs in a state with high uninsured rates and critical chronic disease burden.",
    },
  },

  // ── MIDWEST ───────────────────────────────────────────────────────────────────

  ohio: {
    id: "ohio",
    stateName: "Ohio",
    performanceScore: 58,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 58, telehealth: 62, scopeOfPractice: 60 },
      economics: { spendingPerCapita: 70, workforceGaps: 52, insuranceCoverage: 84 },
      technology: { hieAdoption: 68, broadbandAccess: 58, ehrAdoption: 78 },
    },
    narrative: {
      title: "School-Based Health Anchoring Pediatric Access Strategy",
      summary:
        "Ohio's OH SEE mobile screening program and school-based health center expansion directly address pediatric access gaps in rural communities, building a preventive foundation that reduces downstream acute care costs.",
    },
  },

  michigan: {
    id: "michigan",
    stateName: "Michigan",
    performanceScore: 66,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 65, telehealth: 70, scopeOfPractice: 65 },
      economics: { spendingPerCapita: 68, workforceGaps: 58, insuranceCoverage: 90 },
      technology: { hieAdoption: 72, broadbandAccess: 62, ehrAdoption: 82 },
    },
    narrative: {
      title: "Upper Peninsula Aging-in-Place as the Defining Rural Challenge",
      summary:
        "Michigan's Upper Peninsula faces acute workforce shortages and a rapidly aging population. High school-to-healthcare pipelines and a community-based aging blueprint aim to build a sustainable local workforce for a geographically isolated region.",
    },
  },

  indiana: {
    id: "indiana",
    stateName: "Indiana",
    performanceScore: 52,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 50, telehealth: 58, scopeOfPractice: 54 },
      economics: { spendingPerCapita: 72, workforceGaps: 46, insuranceCoverage: 82 },
      technology: { hieAdoption: 62, broadbandAccess: 52, ehrAdoption: 74 },
    },
    narrative: {
      title: "Transfer Coordination and Medication Adherence as System Levers",
      summary:
        "Indiana's centralized Medical Operations Coordination Center takes a logistics-engineering approach to rural care. Paired with post-discharge medication dispensing, it addresses two of the most reliable predictors of avoidable readmissions.",
    },
  },

  illinois: {
    id: "illinois",
    stateName: "Illinois",
    performanceScore: 71,
    status: "Improving",
    metrics: {
      policy: { vbpAdoption: 72, telehealth: 78, scopeOfPractice: 75 },
      economics: { spendingPerCapita: 70, workforceGaps: 68, insuranceCoverage: 85 },
      technology: { hieAdoption: 80, broadbandAccess: 72, ehrAdoption: 88 },
    },
    narrative: {
      title: "Balanced Progress with Focus on VBC",
      summary:
        "Illinois demonstrates solid progress in adopting value-based care models and has a stable technology infrastructure. The Treat-Not-Transport EMS model and behavioral health integration initiative are accelerating rural system efficiency.",
    },
  },

  wisconsin: {
    id: "wisconsin",
    stateName: "Wisconsin",
    performanceScore: 70,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 68, telehealth: 72, scopeOfPractice: 70 },
      economics: { spendingPerCapita: 68, workforceGaps: 65, insuranceCoverage: 88 },
      technology: { hieAdoption: 75, broadbandAccess: 68, ehrAdoption: 84 },
    },
    narrative: {
      title: "Agricultural Community Health as a Unique Focus",
      summary:
        "Wisconsin's farmer wellness helpline and rural dental grant programs reflect the distinct health challenges of an agricultural workforce. Mental health and oral health gaps in farm communities are often invisible in national data but significant in rural Wisconsin.",
    },
  },

  minnesota: {
    id: "minnesota",
    stateName: "Minnesota",
    performanceScore: 80,
    status: "Improving",
    metrics: {
      policy: { vbpAdoption: 82, telehealth: 84, scopeOfPractice: 78 },
      economics: { spendingPerCapita: 65, workforceGaps: 75, insuranceCoverage: 92 },
      technology: { hieAdoption: 85, broadbandAccess: 74, ehrAdoption: 90 },
    },
    narrative: {
      title: "Mental Health Urgent Care Reducing Crisis-Driven ED Load",
      summary:
        "Minnesota's strong health system foundation is being extended through Mental Health Urgent Care centers designed to divert crisis patients from emergency departments, while regional cardiometabolic collaboratives address the state's most prevalent chronic diseases.",
    },
  },

  iowa: {
    id: "iowa",
    stateName: "Iowa",
    performanceScore: 71,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 68, telehealth: 72, scopeOfPractice: 70 },
      economics: { spendingPerCapita: 66, workforceGaps: 66, insuranceCoverage: 92 },
      technology: { hieAdoption: 76, broadbandAccess: 65, ehrAdoption: 84 },
    },
    narrative: {
      title: "Skin Cancer Detection and Digital Access Driving Rural Innovation",
      summary:
        "Iowa's creative use of dermatoscopes for rural melanoma screening and its Connections to Care digital literacy initiative reflect a pragmatic approach to closing access gaps with cost-effective tools.",
    },
  },

  missouri: {
    id: "missouri",
    stateName: "Missouri",
    performanceScore: 49,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 48, telehealth: 55, scopeOfPractice: 50 },
      economics: { spendingPerCapita: 72, workforceGaps: 44, insuranceCoverage: 75 },
      technology: { hieAdoption: 60, broadbandAccess: 48, ehrAdoption: 70 },
    },
    narrative: {
      title: "ToRCH Networks Building Hub-and-Spoke Integration",
      summary:
        "Missouri's Transformation of Rural Community Health (ToRCH) model creates hub-and-spoke networks that integrate fragmented rural providers. An alternative payment model incentivizing ED reduction completes a dual-track transformation strategy.",
    },
  },

  kansas: {
    id: "kansas",
    stateName: "Kansas",
    performanceScore: 59,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 56, telehealth: 62, scopeOfPractice: 60 },
      economics: { spendingPerCapita: 68, workforceGaps: 52, insuranceCoverage: 80 },
      technology: { hieAdoption: 65, broadbandAccess: 58, ehrAdoption: 76 },
    },
    narrative: {
      title: "PACE Expansion and Admin Efficiency Anchoring Rural Sustainability",
      summary:
        "Kansas extends PACE elder care to rural regions while centralizing administrative functions across small rural clinics, addressing two of the most consistent barriers to rural health system viability: elder care capacity and prohibitive overhead.",
    },
  },

  nebraska: {
    id: "nebraska",
    stateName: "Nebraska",
    performanceScore: 68,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 65, telehealth: 68, scopeOfPractice: 66 },
      economics: { spendingPerCapita: 66, workforceGaps: 62, insuranceCoverage: 84 },
      technology: { hieAdoption: 72, broadbandAccess: 62, ehrAdoption: 80 },
    },
    narrative: {
      title: "Farm-to-School and VR Training Reflecting Rural Innovation",
      summary:
        "Nebraska's School Food Learning Labs connect agricultural identity with preventive health, while VR/AR clinical training offers a scalable solution to rural provider education gaps in a state where simulation centers are prohibitively distant.",
    },
  },

  north_dakota: {
    id: "north_dakota",
    stateName: "North Dakota",
    performanceScore: 67,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 62, telehealth: 70, scopeOfPractice: 64 },
      economics: { spendingPerCapita: 64, workforceGaps: 62, insuranceCoverage: 84 },
      technology: { hieAdoption: 70, broadbandAccess: 65, ehrAdoption: 80 },
    },
    narrative: {
      title: "Frontier Logistics Innovation Through Drones and Kiosks",
      summary:
        "North Dakota's frontier geography makes conventional access models economically unviable. Automated pharmacy kiosks and drone delivery of lab samples and supplies represent genuinely novel solutions to last-mile healthcare logistics.",
    },
  },

  south_dakota: {
    id: "south_dakota",
    stateName: "South Dakota",
    performanceScore: 64,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 60, telehealth: 66, scopeOfPractice: 62 },
      economics: { spendingPerCapita: 62, workforceGaps: 60, insuranceCoverage: 78 },
      technology: { hieAdoption: 68, broadbandAccess: 60, ehrAdoption: 78 },
    },
    narrative: {
      title: "Capitated Medicaid and Maternal Hubs Reorienting Rural Care",
      summary:
        "South Dakota's capitated Medicaid primary care model offers rural practices the financial stability needed to invest in quality improvement, while Regional Maternal/Infant Hubs address a persistent obstetric access gap.",
    },
  },

  // ── WEST ──────────────────────────────────────────────────────────────────────

  california: {
    id: "california",
    stateName: "California",
    performanceScore: 78,
    status: "Improving",
    metrics: {
      policy: { vbpAdoption: 80, telehealth: 90, scopeOfPractice: 85 },
      economics: { spendingPerCapita: 65, workforceGaps: 70, insuranceCoverage: 88 },
      technology: { hieAdoption: 85, broadbandAccess: 75, ehrAdoption: 90 },
    },
    narrative: {
      title: "Leader in Policy and Tech, Faces Cost Pressures",
      summary:
        "California's progressive policies on telehealth and scope of practice are a model for the nation. The Hub-and-Spoke resilience model extends this sophistication to rural and Tribal communities facing climate-driven infrastructure risk.",
    },
  },

  washington: {
    id: "washington",
    stateName: "Washington",
    performanceScore: 75,
    status: "Improving",
    metrics: {
      policy: { vbpAdoption: 76, telehealth: 80, scopeOfPractice: 76 },
      economics: { spendingPerCapita: 64, workforceGaps: 70, insuranceCoverage: 88 },
      technology: { hieAdoption: 80, broadbandAccess: 72, ehrAdoption: 88 },
    },
    narrative: {
      title: "Tribal Health Investment and Value-Based Hospital Solvency",
      summary:
        "Washington's Ignite Innovation program pairs financial sustainability modeling with dedicated Tribal health workforce investment, reflecting the state's dual obligation to rural hospital solvency and Native community health equity.",
    },
  },

  oregon: {
    id: "oregon",
    stateName: "Oregon",
    performanceScore: 70,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 72, telehealth: 76, scopeOfPractice: 74 },
      economics: { spendingPerCapita: 66, workforceGaps: 66, insuranceCoverage: 88 },
      technology: { hieAdoption: 76, broadbandAccess: 65, ehrAdoption: 82 },
    },
    narrative: {
      title: "Provider Exchange and Pharmacy Access as Dual Levers",
      summary:
        "Oregon's rural-urban provider exchange program builds cross-sectoral clinical knowledge while expanding pharmacy locker infrastructure addresses the medication access gap that affects a disproportionate share of rural residents.",
    },
  },

  idaho: {
    id: "idaho",
    stateName: "Idaho",
    performanceScore: 58,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 54, telehealth: 60, scopeOfPractice: 60 },
      economics: { spendingPerCapita: 66, workforceGaps: 54, insuranceCoverage: 78 },
      technology: { hieAdoption: 62, broadbandAccess: 55, ehrAdoption: 74 },
    },
    narrative: {
      title: "Tele-Pharmacy and Facility Modernization Targeting Rural Gaps",
      summary:
        "Idaho's aging Critical Access Hospital infrastructure and significant pharmacy deserts in rural counties are addressed through remote tele-pharmacy dispensing and capital investment in facility code compliance.",
    },
  },

  montana: {
    id: "montana",
    stateName: "Montana",
    performanceScore: 54,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 50, telehealth: 58, scopeOfPractice: 56 },
      economics: { spendingPerCapita: 68, workforceGaps: 48, insuranceCoverage: 80 },
      technology: { hieAdoption: 60, broadbandAccess: 52, ehrAdoption: 72 },
    },
    narrative: {
      title: "Center of Excellence Driving Structural Restructuring",
      summary:
        "Montana's 'Rural Center of Excellence' takes a centralized oversight approach to a highly fragmented frontier health system, coordinating restructuring efforts and pharmacist scope expansion to address the state's negative-margin hospital crisis.",
    },
  },

  wyoming: {
    id: "wyoming",
    stateName: "Wyoming",
    performanceScore: 51,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 48, telehealth: 56, scopeOfPractice: 54 },
      economics: { spendingPerCapita: 66, workforceGaps: 46, insuranceCoverage: 76 },
      technology: { hieAdoption: 58, broadbandAccess: 50, ehrAdoption: 70 },
    },
    narrative: {
      title: "CAH Refocusing and Telepsychiatry Addressing Frontier Realities",
      summary:
        "Wyoming's CAH Basic Incentive program encourages Critical Access Hospitals to concentrate on ED and ambulance services, reducing unsustainable service sprawl. Statewide telepsychiatry addresses mental health access in one of the nation's most sparsely populated states.",
    },
  },

  colorado: {
    id: "colorado",
    stateName: "Colorado",
    performanceScore: 76,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 76, telehealth: 80, scopeOfPractice: 76 },
      economics: { spendingPerCapita: 62, workforceGaps: 72, insuranceCoverage: 88 },
      technology: { hieAdoption: 80, broadbandAccess: 72, ehrAdoption: 86 },
    },
    narrative: {
      title: "Regional Partnerships and Mobile Health Diversifying Revenue",
      summary:
        "Colorado's formal regional partnership structures give rural hospitals the legal and financial scaffolding to survive consolidation pressure. Mobile health tool expansion complements a strong existing telehealth infrastructure.",
    },
  },

  utah: {
    id: "utah",
    stateName: "Utah",
    performanceScore: 78,
    status: "Improving",
    metrics: {
      policy: { vbpAdoption: 76, telehealth: 80, scopeOfPractice: 78 },
      economics: { spendingPerCapita: 60, workforceGaps: 74, insuranceCoverage: 80 },
      technology: { hieAdoption: 82, broadbandAccess: 74, ehrAdoption: 88 },
    },
    narrative: {
      title: "Built Environment and AI Admin Tools Reducing System Friction",
      summary:
        "Utah's PATH initiative takes a population health approach to chronic disease prevention through built environment intervention, while the SUPPORT AI toolkit reduces the administrative burden that drives rural provider burnout and turnover.",
    },
  },

  nevada: {
    id: "nevada",
    stateName: "Nevada",
    performanceScore: 56,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 54, telehealth: 62, scopeOfPractice: 58 },
      economics: { spendingPerCapita: 68, workforceGaps: 48, insuranceCoverage: 72 },
      technology: { hieAdoption: 62, broadbandAccess: 55, ehrAdoption: 72 },
    },
    narrative: {
      title: "Accelerator Investment and Provider Incentives Rebuilding Workforce",
      summary:
        "Nevada's $30M Outcomes Accelerator and $80M rural provider incentive package represent a significant financial commitment to rebuilding a rural workforce that has been chronically underpowered relative to the state's growing rural population.",
    },
  },

  arizona: {
    id: "arizona",
    stateName: "Arizona",
    performanceScore: 58,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 56, telehealth: 64, scopeOfPractice: 62 },
      economics: { spendingPerCapita: 68, workforceGaps: 50, insuranceCoverage: 74 },
      technology: { hieAdoption: 65, broadbandAccess: 56, ehrAdoption: 76 },
    },
    narrative: {
      title: "Closing the 20-Mile Gap Through Residency and Mobile Clinics",
      summary:
        "Arizona's mobile satellite clinics and rural residency expansion target the geographic access barrier that defines health outcomes in its vast rural and tribal regions, where the nearest care is often more than 20 miles away.",
    },
  },

  new_mexico: {
    id: "new_mexico",
    stateName: "New Mexico",
    performanceScore: 48,
    status: "At Risk",
    metrics: {
      policy: { vbpAdoption: 46, telehealth: 55, scopeOfPractice: 52 },
      economics: { spendingPerCapita: 74, workforceGaps: 40, insuranceCoverage: 76 },
      technology: { hieAdoption: 58, broadbandAccess: 44, ehrAdoption: 68 },
    },
    narrative: {
      title: "Specialty Deserts and Workforce Instability Drive Urgent Reform",
      summary:
        "New Mexico's Healthy Horizons specialty network addresses one of the most acute specialty access crises in the West, while its Rooted in New Mexico workforce housing and mentorship program targets the root cause of persistent rural clinician vacancy.",
    },
  },

  alaska: {
    id: "alaska",
    stateName: "Alaska",
    performanceScore: 45,
    status: "Stable",
    metrics: {
      policy: { vbpAdoption: 44, telehealth: 60, scopeOfPractice: 55 },
      economics: { spendingPerCapita: 55, workforceGaps: 42, insuranceCoverage: 72 },
      technology: { hieAdoption: 60, broadbandAccess: 42, ehrAdoption: 68 },
    },
    narrative: {
      title: "Frontier Logistics Innovation as an Existential Necessity",
      summary:
        "Alaska's off-road communities face healthcare logistics challenges unmatched anywhere in the country. Drone delivery, remote pharmacy dispensing, and fetal monitoring devices are not incremental improvements — they are existential requirements for frontier community health.",
    },
  },

  hawaii: {
    id: "hawaii",
    stateName: "Hawaii",
    performanceScore: 84,
    status: "Leading",
    metrics: {
      policy: { vbpAdoption: 82, telehealth: 86, scopeOfPractice: 80 },
      economics: { spendingPerCapita: 60, workforceGaps: 80, insuranceCoverage: 94 },
      technology: { hieAdoption: 88, broadbandAccess: 78, ehrAdoption: 90 },
    },
    narrative: {
      title: "Digital Backbone and Respite Network Defining Island Health",
      summary:
        "Hawaii's Rural Health Information Network (RHIN) creates the digital integration layer for a geographically fragmented island system. Medical respite for the unhoused population addresses a social determinant that drives disproportionate acute care utilization.",
    },
  },
};