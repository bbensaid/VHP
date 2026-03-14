// frontend/lib/data/state-initiatives-data.ts

export type InitiativeType =
  | "Medicaid Waiver"
  | "State Law"
  | "Federal Program"
  | "State Program"
  | "Multi-Payer"
  | "Value-Based Care"
  | "Global Budget"
  | "ACO Model";

export type InitiativeStatus = "Active" | "In Development" | "Completed" | "Pending";

export interface StateInitiative {
  id: string;
  name: string;
  description: string;
  type: InitiativeType;
  status: InitiativeStatus;
  year: number;
  internalLink?: string;
  externalUrl?: string;
  tags: string[];
}

export interface StateInitiativesProfile {
  stateId: string;
  stateName: string;
  stateAbbr: string;
  region: "Northeast" | "South" | "Midwest" | "West";
  summary: string;
  heroColor: string;
  initiatives: StateInitiative[];
}

export const STATE_INITIATIVES: Record<string, StateInitiativesProfile> = {

  // ─── NORTHEAST ────────────────────────────────────────────────────

  vermont: {
    stateId: "vermont",
    stateName: "Vermont",
    stateAbbr: "VT",
    region: "Northeast",
    heroColor: "bg-violet-100 text-violet-800",
    summary:
      "Vermont is the national model for all-payer health system reform. The Green Mountain Care Board regulates hospital budgets and commercial insurance rates. Act 167 (2024) accelerates hospital transformation. Vermont's participation in the federal AHEAD Model ties commercial payers into statewide spending targets alongside Medicare and Medicaid.",
    initiatives: [
      {
        id: "vt-act167",
        name: "Vermont Act 167",
        description:
          "Enacted in 2024, Act 167 gives the Green Mountain Care Board explicit authority to set hospital global budgets regardless of payer mix, directs the Oliver Wyman Report's restructuring recommendations into law, and requires hospitals to file transformation plans. It is the most consequential Vermont health legislation since the creation of the GMCB in 2011.",
        type: "State Law",
        status: "Active",
        year: 2024,
        internalLink: "/vermont-act-167",
        externalUrl: "https://legislature.vermont.gov/bill/status/2024/H.867",
        tags: ["global budget", "hospitals", "Green Mountain Care Board", "Oliver Wyman"],
      },
      {
        id: "vt-ahead",
        name: "AHEAD Model (Vermont)",
        description:
          "Vermont is a founding participant in CMS's AHEAD (Adding Home Through Equity, Access, and Delivery) Model. The model sets a statewide total cost of care target for Medicare and, for the first time, brings commercial insurers into a shared accountability structure alongside Medicaid. Vermont's GMCB serves as the model's state partner.",
        type: "Federal Program",
        status: "Active",
        year: 2024,
        internalLink: "/ahead-model",
        externalUrl: "https://innovation.cms.gov/innovation-models/ahead",
        tags: ["AHEAD", "CMS", "all-payer", "total cost of care"],
      },
      {
        id: "vt-gmcb",
        name: "Green Mountain Care Board",
        description:
          "Established by Act 48 in 2011, the GMCB is Vermont's independent regulatory body with authority over hospital budgets, health insurance rate review, and health system performance monitoring. No other state has given a single body this breadth of regulatory power over both hospitals and insurers. The GMCB publishes annual hospital budget decisions and tracks per-capita spending trends.",
        type: "State Program",
        status: "Active",
        year: 2011,
        externalUrl: "https://gmcb.vermont.gov/",
        tags: ["GMCB", "rate review", "hospital budget", "regulation"],
      },
      {
        id: "vt-sash",
        name: "Support and Services at Home (SASH)",
        description:
          "SASH embeds care coordinators and wellness nurses inside affordable housing communities to proactively manage chronic conditions and prevent avoidable hospitalizations. A CMS evaluation found SASH participants had significantly slower Medicare spending growth. The program operates in over 150 housing sites statewide.",
        type: "Multi-Payer",
        status: "Active",
        year: 2011,
        externalUrl: "https://sashvt.org/",
        tags: ["housing", "SDOH", "care coordination", "Medicare"],
      },
    ],
  },

  maine: {
    stateId: "maine",
    stateName: "Maine",
    stateAbbr: "ME",
    region: "Northeast",
    heroColor: "bg-sky-100 text-sky-800",
    summary:
      "Maine voters approved Medicaid expansion via referendum in 2017 after years of gubernatorial vetoes — a watershed moment that influenced Medicaid expansion ballot strategies nationally. Maine participates in the AHEAD Model and is building integrated behavioral health infrastructure to address high rates of substance use disorder.",
    initiatives: [
      {
        id: "me-medicaid-expansion",
        name: "Maine Medicaid Expansion (MaineCare)",
        description:
          "Voters approved expansion via citizen initiative in 2017; after the governor initially refused implementation, a court order compelled it and coverage launched in January 2019. Over 100,000 adults gained coverage. Maine's referendum experience became a blueprint for ballot initiative expansion campaigns in other states.",
        type: "State Law",
        status: "Active",
        year: 2019,
        externalUrl: "https://www.maine.gov/dhhs/oms/programs-services/mainecare",
        tags: ["Medicaid expansion", "coverage", "ballot initiative"],
      },
      {
        id: "me-ahead",
        name: "AHEAD Model (Maine)",
        description:
          "Maine joined the CMS AHEAD Model to establish statewide total cost of care targets for Medicare beneficiaries, with the goal of extending the model's accountability to commercial payers over time. Maine's participation focuses heavily on rural access and the high costs of its aging population.",
        type: "Federal Program",
        status: "Active",
        year: 2024,
        internalLink: "/ahead-model",
        externalUrl: "https://innovation.cms.gov/innovation-models/ahead",
        tags: ["AHEAD", "CMS", "total cost of care", "rural"],
      },
      {
        id: "me-behavioral-health-homes",
        name: "Behavioral Health Homes",
        description:
          "Maine's Health Homes program for individuals with serious mental illness integrates behavioral health, primary care, and social supports under a single care team. Participating organizations receive enhanced per-member per-month payments. The program has expanded to cover individuals with co-occurring substance use disorders.",
        type: "State Program",
        status: "Active",
        year: 2014,
        externalUrl: "https://www.maine.gov/dhhs/oms/programs-services/mainecare/health-homes",
        tags: ["behavioral health", "health homes", "SUD", "integration"],
      },
    ],
  },

  new_hampshire: {
    stateId: "new_hampshire",
    stateName: "New Hampshire",
    stateAbbr: "NH",
    region: "Northeast",
    heroColor: "bg-slate-100 text-slate-800",
    summary:
      "New Hampshire restructured its Medicaid program under managed care and has been a national leader in behavioral health access reform, particularly around the opioid epidemic. Its low-barrier Doorways hub network has been studied as a model for other states.",
    initiatives: [
      {
        id: "nh-medicaid-managed-care",
        name: "NH Medicaid Care Management",
        description:
          "New Hampshire launched statewide Medicaid managed care in 2014 through a single managed care organization (initially Meridian, now Granite Advantage). The program covers physical health, behavioral health, and pharmacy under a unified contract, replacing a fragmented fee-for-service system.",
        type: "State Program",
        status: "Active",
        year: 2014,
        externalUrl: "https://www.dhhs.nh.gov/programs-services/medicaid/granite-advantage-health-care-program",
        tags: ["Medicaid", "managed care", "Granite Advantage"],
      },
      {
        id: "nh-doorways",
        name: "Doorways — Statewide Hub Network",
        description:
          "New Hampshire's Doorways program created a statewide network of hubs providing low-barrier access to addiction treatment, recovery support, and mental health services. Located in hospitals and community settings, Doorways hubs reduced emergency department utilization for SUD-related visits and connected patients to peer recovery coaches.",
        type: "State Program",
        status: "Active",
        year: 2018,
        externalUrl: "https://www.dhhs.nh.gov/programs-services/mental-health/doorways",
        tags: ["SUD", "opioids", "hubs", "peer support", "behavioral health"],
      },
      {
        id: "nh-10year-mental-health",
        name: "10-Year Mental Health Plan",
        description:
          "New Hampshire's legislatively mandated ten-year plan addresses the state's persistent shortage of inpatient psychiatric beds, community mental health workforce gaps, and inadequate crisis services. Key benchmarks include Medicaid reimbursement parity for behavioral health and expansion of community crisis stabilization capacity.",
        type: "State Law",
        status: "Active",
        year: 2019,
        externalUrl: "https://www.dhhs.nh.gov/programs-services/mental-health/10-year-mental-health-plan",
        tags: ["mental health", "workforce", "crisis stabilization", "beds"],
      },
    ],
  },

  massachusetts: {
    stateId: "massachusetts",
    stateName: "Massachusetts",
    stateAbbr: "MA",
    region: "Northeast",
    heroColor: "bg-red-100 text-red-800",
    summary:
      "Massachusetts pioneered near-universal coverage with Chapter 58 in 2006 — the direct model for the ACA. It now leads nationally in value-based care maturity: MassHealth ACOs integrate behavioral health with primary care for 1M+ Medicaid members, Chapter 224 enforces a statewide cost growth benchmark, and the Health Policy Commission monitors the entire health system.",
    initiatives: [
      {
        id: "ma-masshealth-aco",
        name: "MassHealth ACO Program",
        description:
          "Launched in 2018, Massachusetts restructured its entire Medicaid managed care system around accountable care organizations. MCOs were replaced by three model types — ACO-A (partner plan), ACO-B (PCC plan), and Community Partners — providing integrated physical health, behavioral health, and social services for 850,000+ members. The program was reauthorized under a new 1115 waiver in 2022.",
        type: "ACO Model",
        status: "Active",
        year: 2018,
        externalUrl: "https://www.mass.gov/info-details/masshealth-aco-program",
        tags: ["ACO", "Medicaid", "behavioral health", "integration", "1115 waiver"],
      },
      {
        id: "ma-chapter224",
        name: "Chapter 224 — Health Care Cost Benchmark",
        description:
          "Massachusetts's 2012 health cost control law established a legally binding statewide health care cost growth benchmark (tied to state GDP growth), created the independent Health Policy Commission with authority to review significant provider and payer transactions, and required annual performance improvement plans from entities exceeding the benchmark.",
        type: "State Law",
        status: "Active",
        year: 2012,
        externalUrl: "https://www.mass.gov/orgs/health-policy-commission",
        tags: ["cost benchmark", "HPC", "market oversight", "transparency"],
      },
      {
        id: "ma-chapter260",
        name: "Chapter 260 — Behavioral Health Access Law",
        description:
          "Enacted in 2021, Chapter 260 requires parity in coverage and reimbursement for behavioral health services, mandates timely access standards for mental health appointments, and creates new oversight mechanisms for behavioral health network adequacy.",
        type: "State Law",
        status: "Active",
        year: 2021,
        externalUrl: "https://malegislature.gov/Laws/SessionLaws/Acts/2021/Chapter260",
        tags: ["behavioral health", "parity", "access", "network adequacy"],
      },
      {
        id: "ma-covered-lives-assessment",
        name: "Community Benefits / Covered Lives Assessment",
        description:
          "Massachusetts assesses a per-member fee on health insurers and HMOs, funding the Health Safety Net Trust Fund which reimburses hospitals and community health centers for uncompensated care. This mechanism pre-dates the ACA and continues to fill coverage gaps.",
        type: "State Program",
        status: "Active",
        year: 2006,
        externalUrl: "https://www.mass.gov/guides/health-safety-net",
        tags: ["safety net", "uncompensated care", "community health centers"],
      },
    ],
  },

  connecticut: {
    stateId: "connecticut",
    stateName: "Connecticut",
    stateAbbr: "CT",
    region: "Northeast",
    heroColor: "bg-blue-100 text-blue-800",
    summary:
      "Connecticut operates one of the nation's most mature multi-payer primary care reform programs through PCMH+, which aligns Medicaid, state employee, and commercial payers around patient-centered medical homes. Connecticut also restructured its Medicaid managed care program and is expanding behavioral health integration.",
    initiatives: [
      {
        id: "ct-pcmhplus",
        name: "PCMH+ Multi-Payer Program",
        description:
          "Connecticut's Patient-Centered Medical Home Plus program runs a shared savings model across Medicaid (HUSKY), state employee plans, and commercial carriers simultaneously. Practices earn shared savings for reducing total cost of care below a risk-adjusted benchmark. The program covers 600,000+ attributed lives and has demonstrated reductions in ED visits and inpatient utilization.",
        type: "Multi-Payer",
        status: "Active",
        year: 2016,
        externalUrl: "https://portal.ct.gov/DSS/Health-And-Home-Care/Medicaid/PCMH-Plus",
        tags: ["PCMH", "primary care", "multi-payer", "shared savings"],
      },
      {
        id: "ct-husky-reform",
        name: "HUSKY Medicaid Managed Care",
        description:
          "Connecticut redesigned its HUSKY Medicaid program in 2012 to integrate physical health, behavioral health, and pharmacy under managed care organizations, replacing the former administrative services organization model. The state subsequently added behavioral health homes for high-cost, high-need members.",
        type: "State Program",
        status: "Active",
        year: 2012,
        externalUrl: "https://portal.ct.gov/DSS/Health-And-Home-Care/Medicaid/HUSKY-Health",
        tags: ["Medicaid", "managed care", "HUSKY", "behavioral health"],
      },
      {
        id: "ct-ctnext",
        name: "Health Care Cost Growth Benchmark",
        description:
          "Connecticut enacted a health care cost growth benchmark law in 2021, establishing a target tied to median household income growth and creating an Office of Health Strategy with authority to investigate drivers of cost growth.",
        type: "State Law",
        status: "Active",
        year: 2021,
        externalUrl: "https://portal.ct.gov/OHS",
        tags: ["cost benchmark", "Office of Health Strategy", "cost growth"],
      },
    ],
  },

  rhode_island: {
    stateId: "rhode_island",
    stateName: "Rhode Island",
    stateAbbr: "RI",
    region: "Northeast",
    heroColor: "bg-cyan-100 text-cyan-800",
    summary:
      "Rhode Island pioneered the nation's first global Medicaid waiver in 2009, capping total federal Medicaid spending in exchange for program design flexibility — a landmark that influenced national Medicaid policy. Rhode Island continues to be a laboratory for integrated care models, including a Medicare-Medicaid dual eligible alignment program.",
    initiatives: [
      {
        id: "ri-global-waiver",
        name: "Global Medicaid Waiver",
        description:
          "Rhode Island's 2009 Section 1115 waiver was the first in the nation to establish a single aggregate cap on all federal Medicaid spending — $12.075B over five years — in exchange for authority to redesign any aspect of the program. The waiver enabled consolidation of multiple waiver programs and shifted the state toward a managed long-term services and supports model. CMS has cited it as a model for value-based flexibility.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2009,
        externalUrl: "https://www.medicaid.gov/medicaid/section-1115-demonstrations/approved-and-pending-waivers/index.html",
        tags: ["global waiver", "1115", "spending cap", "LTSS"],
      },
      {
        id: "ri-integrated-care",
        name: "Integrated Care Initiative (ICI)",
        description:
          "Rhode Island's ICI program aligns Medicare and Medicaid financing for dual-eligible individuals through a capitated payment model. Care is coordinated through a single integrated care organization covering physical health, behavioral health, and long-term services and supports. RI was an early CMS Financial Alignment Initiative demonstration state.",
        type: "Multi-Payer",
        status: "Active",
        year: 2013,
        externalUrl: "https://eohhs.ri.gov/consumer-information/rhode-island-integrated-care-initiative",
        tags: ["dual eligible", "integrated care", "Medicare-Medicaid", "FAI"],
      },
      {
        id: "ri-neighborhood-health-stations",
        name: "Neighborhood Health Stations",
        description:
          "Rhode Island's Community Health Teamwork initiative places integrated community health teams in high-need neighborhoods to reduce preventable ED visits, provide chronic disease management, and connect residents to social services. The model focuses on the highest-cost Medicaid and uninsured populations.",
        type: "State Program",
        status: "Active",
        year: 2015,
        externalUrl: "https://health.ri.gov/",
        tags: ["community health", "SDOH", "high-need populations", "ED avoidance"],
      },
    ],
  },

  new_york: {
    stateId: "new_york",
    stateName: "New York",
    stateAbbr: "NY",
    region: "Northeast",
    heroColor: "bg-indigo-100 text-indigo-800",
    summary:
      "New York launched the largest DSRIP program in the nation ($8 billion over 5 years), transforming its safety-net delivery system through Performing Provider Systems. Post-DSRIP, New York is shifting Medicaid managed care to value-based payment and addressing persistent health disparities through a dedicated equity framework.",
    initiatives: [
      {
        id: "ny-dsrip",
        name: "DSRIP Program (2014–2020)",
        description:
          "New York's Delivery System Reform Incentive Payment program invested $7.4 billion in Medicaid savings to create 25 Performing Provider Systems — regional alliances of hospitals, physicians, and community organizations — each required to meet clinical transformation milestones. The program generated documented reductions in preventable hospitalizations and established a new integration infrastructure that survived DSRIP's sunset.",
        type: "Medicaid Waiver",
        status: "Completed",
        year: 2014,
        externalUrl: "https://www.health.ny.gov/health_care/medicaid/redesign/dsrip/",
        tags: ["DSRIP", "1115 waiver", "Performing Provider Systems", "safety net"],
      },
      {
        id: "ny-vbp",
        name: "Medicaid Value-Based Payment Roadmap",
        description:
          "New York's Medicaid VBP Roadmap — the successor to DSRIP — requires Medicaid managed care plans and their contracted providers to move specified percentages of spending into value-based arrangements. The 2021 update targets 80%+ VBP adoption by 2024 and introduces new performance standards for behavioral health and LTSS integration.",
        type: "Value-Based Care",
        status: "Active",
        year: 2021,
        externalUrl: "https://www.health.ny.gov/health_care/medicaid/redesign/vbp/",
        tags: ["VBP", "Medicaid", "managed care", "behavioral health"],
      },
      {
        id: "ny-health-equity",
        name: "Medicaid Health Equity Improvement Initiative",
        description:
          "New York's initiative requires Medicaid managed care plans to stratify quality data by race and ethnicity, identify their largest disparities, and submit plans to close them within two years. Plans face financial consequences for failure to improve on selected equity metrics. The program focuses on maternal mortality, diabetes control, and mental health access.",
        type: "State Program",
        status: "Active",
        year: 2022,
        externalUrl: "https://www.health.ny.gov/health_care/medicaid/redesign/equity/",
        tags: ["health equity", "racial disparities", "maternal health", "managed care"],
      },
      {
        id: "ny-1115-social-care",
        name: "Social Care Networks 1115 Waiver (2024)",
        description:
          "New York's 2024 1115 waiver amendment authorizes funding for health-related social needs services — food, housing, transportation, and economic support — delivered through a new Social Care Network infrastructure operated by Medicaid managed care plans in partnership with community organizations.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2024,
        externalUrl: "https://www.health.ny.gov/health_care/medicaid/redesign/social_care_networks/",
        tags: ["SDOH", "social care networks", "1115 waiver", "food", "housing"],
      },
    ],
  },

  new_jersey: {
    stateId: "new_jersey",
    stateName: "New Jersey",
    stateAbbr: "NJ",
    region: "Northeast",
    heroColor: "bg-orange-100 text-orange-800",
    summary:
      "New Jersey has restructured its Medicaid contracts around value-based payment, launched a nationally prominent maternal health equity initiative, and is expanding behavioral health integration across its managed care program.",
    initiatives: [
      {
        id: "nj-familycare",
        name: "NJ FamilyCare Value-Based Care Reform",
        description:
          "New Jersey's 2021 Medicaid managed care contract renewal required all four MCOs to accelerate value-based payment adoption, implement social needs screening for all members, and invest in behavioral health network expansion. Contracts include financial penalties for failure to meet VBP transition milestones.",
        type: "Value-Based Care",
        status: "Active",
        year: 2021,
        externalUrl: "https://www.state.nj.us/humanservices/dmahs/home/njfamilycare.html",
        tags: ["Medicaid", "managed care", "VBP", "behavioral health"],
      },
      {
        id: "nj-nurture-nj",
        name: "Nurture NJ Maternal Health Initiative",
        description:
          "Governor Murphy's flagship health initiative targets New Jersey's maternal mortality crisis — particularly the 4x higher rate of Black maternal mortality. Nurture NJ includes Medicaid postpartum extension to 12 months, doula coverage, hospital equity reporting requirements, and training for implicit bias. New Jersey was one of the first states to extend Medicaid coverage for 12 months postpartum.",
        type: "State Program",
        status: "Active",
        year: 2021,
        externalUrl: "https://www.nj.gov/health/nurturenj/",
        tags: ["maternal health", "Black maternal mortality", "postpartum", "doulas", "equity"],
      },
      {
        id: "nj-public-option-study",
        name: "NJ State Health Benefits Reform",
        description:
          "New Jersey has pursued state-level individual market reforms including a state-based exchange (GetCoveredNJ), a reinsurance program (which cut premiums by 15%+), and expanded short-term plan restrictions. The reinsurance program is among the strongest-performing state reinsurance programs under ACA Section 1332.",
        type: "State Law",
        status: "Active",
        year: 2019,
        externalUrl: "https://www.getcovered.nj.gov/",
        tags: ["insurance market", "reinsurance", "state exchange", "ACA"],
      },
    ],
  },

  pennsylvania: {
    stateId: "pennsylvania",
    stateName: "Pennsylvania",
    stateAbbr: "PA",
    region: "Northeast",
    heroColor: "bg-sky-100 text-sky-800",
    summary:
      "Pennsylvania expanded Medicaid in 2015 and operates one of the nation's most complex Medicaid programs through HealthChoices managed care. Pennsylvania participates in the AHEAD Model and has been expanding LTSS managed care through Community HealthChoices, serving over 400,000 physically disabled and older adult enrollees.",
    initiatives: [
      {
        id: "pa-healthchoices",
        name: "HealthChoices Medicaid Managed Care",
        description:
          "Pennsylvania's HealthChoices program has been one of the nation's largest Medicaid managed care programs since 1997. Physical health and behavioral health are managed under separate contracts in each of the state's five geographic zones. The program covers 3 million+ Medicaid enrollees. Pennsylvania is mid-transition toward integrated contracts that combine physical and behavioral health.",
        type: "State Program",
        status: "Active",
        year: 1997,
        externalUrl: "https://www.dhs.pa.gov/Services/Assistance/Pages/Medical-Assistance-HealthChoices.aspx",
        tags: ["Medicaid", "managed care", "behavioral health carve-out"],
      },
      {
        id: "pa-community-healthchoices",
        name: "Community HealthChoices (LTSS Waiver)",
        description:
          "Pennsylvania's Community HealthChoices program moved long-term services and supports — including personal care, home and community-based services, and nursing facility coverage — into managed care for dual-eligible and physically disabled individuals. The program covers 430,000+ enrollees and is one of the nation's largest LTSS managed care programs.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2018,
        externalUrl: "https://www.dhs.pa.gov/Services/Assistance/Pages/Community-HealthChoices.aspx",
        tags: ["LTSS", "HCBS", "dual eligible", "managed care", "disability"],
      },
      {
        id: "pa-ahead",
        name: "AHEAD Model (Pennsylvania)",
        description:
          "Pennsylvania joined the CMS AHEAD Model with a focus on rural communities and underserved populations. Pennsylvania's participation is structured around total cost of care targets for Medicare beneficiaries statewide, with a goal of extending the accountability framework to commercial and Medicaid payers over the model's performance period.",
        type: "Federal Program",
        status: "Active",
        year: 2024,
        internalLink: "/ahead-model",
        externalUrl: "https://innovation.cms.gov/innovation-models/ahead",
        tags: ["AHEAD", "CMS", "total cost of care", "rural"],
      },
    ],
  },

  district_of_columbia: {
    stateId: "district_of_columbia",
    stateName: "District of Columbia",
    stateAbbr: "DC",
    region: "Northeast",
    heroColor: "bg-slate-100 text-slate-800",
    summary:
      "DC Health operates as a state-level health department with unique authorities as a federal district. DC has one of the nation's most comprehensive Medicaid programs — DC Medicaid covers adults up to 215% FPL — and has aggressively expanded behavioral health and social determinant interventions.",
    initiatives: [
      {
        id: "dc-amerihealth",
        name: "DC Medicaid Managed Care (AmeriHealth Caritas DC)",
        description:
          "DC Medicaid operates through a single managed care organization with an integrated physical and behavioral health contract. The program covers 270,000+ members and includes enhanced payments for community health workers, housing navigation, and social needs screenings for all members at enrollment and annually.",
        type: "State Program",
        status: "Active",
        year: 2013,
        externalUrl: "https://dhcf.dc.gov/service/medicaid-managed-care",
        tags: ["Medicaid", "managed care", "behavioral health", "SDOH"],
      },
      {
        id: "dc-dc-health-link",
        name: "DC Health Link (State Exchange + Medicaid Integration)",
        description:
          "DC Health Link is the District's state-based insurance exchange and the only exchange in the nation where members of Congress must purchase coverage. DC operates a unique no-wrong-door enrollment system that automatically routes applicants between Medicaid, CHIP, and exchange plans.",
        type: "State Program",
        status: "Active",
        year: 2014,
        externalUrl: "https://dchealthlink.com/",
        tags: ["state exchange", "ACA", "enrollment", "no-wrong-door"],
      },
    ],
  },

  // ─── SOUTH ────────────────────────────────────────────────────────

  texas: {
    stateId: "texas",
    stateName: "Texas",
    stateAbbr: "TX",
    region: "South",
    heroColor: "bg-red-100 text-red-800",
    summary:
      "Texas has the nation's highest uninsured rate and has declined Medicaid expansion. Despite this, Texas has negotiated the nation's largest DSRIP program ($11B+), operates a sophisticated STAR+PLUS managed LTSS program, and has invested in rural hospital stabilization — all within a non-expansion framework.",
    initiatives: [
      {
        id: "tx-dsrip",
        name: "Texas Healthcare Transformation / DSRIP Waiver",
        description:
          "Texas's Section 1115 waiver has funded $11+ billion in Delivery System Reform Incentive Payments to safety-net hospitals since 2011. These payments require measurable delivery system reforms in exchange for supplemental funding. The waiver has sustained Texas's large public hospital systems (Harris Health, Parkland, University Health) and been the subject of repeated high-stakes renewal negotiations with CMS.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2011,
        externalUrl: "https://www.hhs.texas.gov/about/process/1115-healthcare-transformation-quality-improvement-program-waiver",
        tags: ["DSRIP", "1115 waiver", "safety net", "supplemental payments"],
      },
      {
        id: "tx-starplus",
        name: "STAR+PLUS Managed LTSS",
        description:
          "Texas's STAR+PLUS program integrates acute care and long-term services and supports for Medicaid members with disabilities and chronic conditions under a single managed care contract. It covers 530,000+ members and has been an influential national model for managed LTSS, with CMS and other states studying its capitation and care coordination structures.",
        type: "State Program",
        status: "Active",
        year: 1998,
        externalUrl: "https://www.hhs.texas.gov/providers/medicaid-managed-care-portal/star-plus",
        tags: ["managed LTSS", "Medicaid", "disability", "care coordination"],
      },
      {
        id: "tx-rural-hospital",
        name: "Rural Hospital Support / Certified Medicaid Programs",
        description:
          "Texas established the Rural Hospital Support program and Certified Medicaid Rural Hospitals designation to provide supplemental Medicaid payments to qualifying rural hospitals, many of which operate with negative margins. The program is a partial substitute for the coverage gains that Medicaid expansion would provide.",
        type: "State Program",
        status: "Active",
        year: 2021,
        externalUrl: "https://www.hhs.texas.gov/providers/medicaid-managed-care-portal/rural-hospitals",
        tags: ["rural health", "critical access", "hospital closure", "supplemental payments"],
      },
    ],
  },

  florida: {
    stateId: "florida",
    stateName: "Florida",
    stateAbbr: "FL",
    region: "South",
    heroColor: "bg-orange-100 text-orange-800",
    summary:
      "Florida implemented statewide Medicaid managed care in 2014 — one of the largest such transitions in history. Florida has not expanded Medicaid, relying instead on a Low Income Pool to support safety-net hospitals. Florida has also pursued a controversial 1115 waiver seeking to restructure federal hospital funding.",
    initiatives: [
      {
        id: "fl-smmc",
        name: "Statewide Medicaid Managed Care (SMMC)",
        description:
          "Florida's 2014 SMMC program consolidated its Medicaid population into managed care plans statewide — the largest managed care expansion in state history. The program has two components: Managed Medical Assistance (physical health, behavioral health, pharmacy) and Long-Term Care (HCBS and nursing facility). It covers 4 million+ members.",
        type: "State Program",
        status: "Active",
        year: 2014,
        externalUrl: "https://ahca.myflorida.com/medicaid/statewide-medicaid-managed-care",
        tags: ["Medicaid", "managed care", "LTSS", "statewide"],
      },
      {
        id: "fl-low-income-pool",
        name: "Low Income Pool (LIP) Waiver",
        description:
          "Florida's LIP program provides supplemental Medicaid payments to safety-net hospitals and providers that serve uninsured and underinsured patients. The $1.5B+ annual LIP has been the subject of contentious negotiations with CMS, which has repeatedly pressured Florida to expand Medicaid as a condition of LIP renewal.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2006,
        externalUrl: "https://ahca.myflorida.com/medicaid/1115-waiver",
        tags: ["1115 waiver", "safety net", "uninsured", "hospital financing"],
      },
      {
        id: "fl-live-healthy",
        name: "Live Healthy Florida (2023)",
        description:
          "Florida's 2023 Live Healthy package of legislation established a Graduate Medical Education fund, created a new rural hospital assistance program, expanded scope of practice for non-physician providers, and created a new Rural Emergency Hospital designation to prevent closures.",
        type: "State Law",
        status: "Active",
        year: 2023,
        externalUrl: "https://www.floridahealth.gov/",
        tags: ["GME", "rural health", "rural emergency hospitals", "workforce"],
      },
    ],
  },

  georgia: {
    stateId: "georgia",
    stateName: "Georgia",
    stateAbbr: "GA",
    region: "South",
    heroColor: "bg-emerald-100 text-emerald-800",
    summary:
      "Georgia implemented the nation's most restrictive Medicaid expansion in 2023 — the Georgia Pathways program requires 80 hours of monthly qualifying activities. Enrollment has been far below projections. Georgia also operates a unique rural hospital tax credit program that has become a national model.",
    initiatives: [
      {
        id: "ga-pathways",
        name: "Georgia Pathways to Coverage (1115 Waiver)",
        description:
          "Launched July 2023, Pathways is the only active Medicaid expansion with work/activity requirements in the US. Adults 19–64 must document 80 hours/month of qualifying activities (work, education, job training, or community service). Only 5,000 people enrolled in the first year — far below the 50,000 projected — due to administrative complexity. The program costs more to administer per enrollee than a standard expansion.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2023,
        externalUrl: "https://dch.georgia.gov/georgia-pathways-coverage",
        tags: ["1115 waiver", "work requirements", "partial Medicaid expansion"],
      },
      {
        id: "ga-rural-tax-credit",
        name: "Georgia Rural Hospital Tax Credit Program",
        description:
          "Georgia allows individuals and corporations to redirect state income taxes to qualifying rural hospitals, receiving a 100% state tax credit. Since 2017, the program has generated $300M+ for rural hospitals. Over 50 rural hospitals participate. Multiple other states have studied or adopted similar programs, making Georgia's version the national template.",
        type: "State Program",
        status: "Active",
        year: 2016,
        externalUrl: "https://dch.georgia.gov/rural-hospital-tax-credit",
        tags: ["rural health", "hospital financing", "tax credit", "rural closures"],
      },
    ],
  },

  north_carolina: {
    stateId: "north_carolina",
    stateName: "North Carolina",
    stateAbbr: "NC",
    region: "South",
    heroColor: "bg-sky-100 text-sky-800",
    summary:
      "North Carolina is executing one of the most ambitious Medicaid transformations in the South — expanding coverage to 600,000+ adults in 2023, completing the shift to managed care with Tailored Plans for behavioral health populations, and operating the first CMS-approved waiver to fund non-medical social needs interventions (Healthy Opportunities).",
    initiatives: [
      {
        id: "nc-medicaid-expansion",
        name: "NC Medicaid Expansion (2023)",
        description:
          "After years of legislative standoffs, North Carolina's Republican-controlled legislature passed Medicaid expansion in March 2023 and coverage launched December 1, 2023. The legislation tied expansion to Medicaid transformation being 'substantially complete.' Over 600,000 adults are eligible, and enrollment surpassed 400,000 within the first year.",
        type: "State Law",
        status: "Active",
        year: 2023,
        externalUrl: "https://www.ncdhhs.gov/divisions/health-benefits/nc-medicaid/nc-medicaid-expansion",
        tags: ["Medicaid expansion", "coverage", "ACA"],
      },
      {
        id: "nc-tailored-plans",
        name: "NC Medicaid Managed Care / Tailored Care",
        description:
          "North Carolina transitioned to Medicaid managed care in 2021 through Standard Plans (physical health) and Tailored Plans (integrated care for individuals with serious mental illness, intellectual/developmental disabilities, and TBI). The Tailored Plans — launched 2023 — are unique nationally: they carve behavioral health back IN to managed care with specialized, capitated organizations.",
        type: "State Program",
        status: "Active",
        year: 2021,
        externalUrl: "https://www.ncdhhs.gov/divisions/health-benefits/nc-medicaid/nc-medicaid-managed-care",
        tags: ["managed care", "Tailored Plans", "behavioral health", "IDD", "serious mental illness"],
      },
      {
        id: "nc-healthy-opportunities",
        name: "Healthy Opportunities Pilots",
        description:
          "North Carolina's Healthy Opportunities Pilots — funded by a 2020 Section 1115 waiver — are the first CMS-approved initiative to pay Medicaid funds for non-medical services: food (medically tailored meals), housing (eviction prevention, transitional housing), transportation, and interpersonal violence services. Three regional pilots serve 50,000 high-need members, and early data shows reduced ED visits and inpatient stays.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2022,
        externalUrl: "https://www.ncdhhs.gov/about/department-initiatives/healthy-opportunities",
        tags: ["SDOH", "food", "housing", "1115 waiver", "non-medical services"],
      },
    ],
  },

  south_carolina: {
    stateId: "south_carolina",
    stateName: "South Carolina",
    stateAbbr: "SC",
    region: "South",
    heroColor: "bg-indigo-100 text-indigo-800",
    summary:
      "South Carolina has not expanded Medicaid and has the nation's second-highest Black maternal mortality rate. Recent reforms target perinatal care quality, telehealth access, and rural hospital sustainability.",
    initiatives: [
      {
        id: "sc-maternal-mortality",
        name: "SC Perinatal Quality Collaborative",
        description:
          "South Carolina's statewide perinatal quality collaborative implements hospital-level bundles for obstetric hemorrhage and hypertension — the two leading causes of maternal death — using the AIM (Alliance for Innovation on Maternal Health) framework. The SCPQC has achieved measurable reductions in severe maternal morbidity at participating hospitals.",
        type: "State Program",
        status: "Active",
        year: 2020,
        externalUrl: "https://www.scdhec.gov/health/maternal-child-health/perinatal-quality-collaborative",
        tags: ["maternal health", "perinatal quality", "AIM", "hemorrhage", "hypertension"],
      },
      {
        id: "sc-telehealth-alliance",
        name: "SC Telehealth Alliance",
        description:
          "SCTA is a statewide network connecting rural hospitals and providers to urban specialists through real-time video consultation, telestroke, telepsychiatry, and store-and-forward platforms. Anchored by the Medical University of South Carolina, SCTA covers 40+ rural hospitals and has become a national model for state telehealth network development.",
        type: "State Program",
        status: "Active",
        year: 2015,
        externalUrl: "https://www.sctelehealthalliance.org/",
        tags: ["telehealth", "rural health", "specialist access", "telestroke", "telepsychiatry"],
      },
    ],
  },

  virginia: {
    stateId: "virginia",
    stateName: "Virginia",
    stateAbbr: "VA",
    region: "South",
    heroColor: "bg-blue-100 text-blue-800",
    summary:
      "Virginia expanded Medicaid in 2019 and is implementing one of the most sophisticated LTSS managed care programs in the nation — CCC Plus — which integrates physical health, behavioral health, and long-term supports under a single managed care contract for dual-eligible and disabled individuals.",
    initiatives: [
      {
        id: "va-medicaid-expansion",
        name: "Virginia Medicaid Expansion (2019)",
        description:
          "Virginia expanded Medicaid under the ACA on January 1, 2019, covering 600,000+ adults. The bipartisan expansion came after several failed legislative attempts and was enacted alongside a workforce development training requirement (which CMS never approved). Virginia's expansion extended to individuals reentering from incarceration.",
        type: "State Law",
        status: "Active",
        year: 2019,
        externalUrl: "https://www.dmas.virginia.gov/for-members/medicaid-expansion/",
        tags: ["Medicaid expansion", "coverage", "justice-involved"],
      },
      {
        id: "va-ccc-plus",
        name: "Commonwealth Coordinated Care Plus (CCC Plus)",
        description:
          "Virginia's CCC Plus program integrates physical health, behavioral health, pharmacy, and LTSS under a single managed care contract for duals, individuals with disabilities, and those needing nursing facility or HCBS. Five managed care organizations operate the program across five geographic regions. CCC Plus is considered a high-functioning managed LTSS model nationally, with strong continuity-of-care protections.",
        type: "State Program",
        status: "Active",
        year: 2017,
        externalUrl: "https://www.dmas.virginia.gov/for-members/managed-care/ccc-plus/",
        tags: ["managed LTSS", "dual eligible", "HCBS", "behavioral health", "integration"],
      },
      {
        id: "va-behavioral-health-reform",
        name: "Marcus Alert / Behavioral Health Emergency Reform",
        description:
          "Following the 2018 death of Marcus-David Peters — a teacher shot by police during a mental health crisis — Virginia enacted the Marcus Alert law requiring all localities to develop alternative response systems for behavioral health emergencies. The law phases in a statewide 988/behavioral health crisis dispatch network to replace police responses to mental health calls.",
        type: "State Law",
        status: "Active",
        year: 2021,
        externalUrl: "https://dbhds.virginia.gov/crisis-services/marcus-alert/",
        tags: ["crisis response", "behavioral health", "988", "mental health emergencies"],
      },
    ],
  },

  alabama: {
    stateId: "alabama",
    stateName: "Alabama",
    stateAbbr: "AL",
    region: "South",
    heroColor: "bg-red-100 text-red-800",
    summary:
      "Alabama has not expanded Medicaid and has one of the nation's leanest Medicaid programs. The state has seen 8 rural hospital closures since 2010. Alabama operates a patient-centered medical home model through Regional Care Organizations as an alternative path to managed care.",
    initiatives: [
      {
        id: "al-rco-pcmh",
        name: "Regional Care Organizations (PCMH Model)",
        description:
          "Alabama's Regional Care Organizations operate a patient-centered medical home model for Medicaid that stops short of full managed care capitation. Participating practices receive enhanced primary care payments in exchange for quality reporting and care coordination. The state has pursued this path to avoid the full risk-bearing model used in most other states.",
        type: "State Program",
        status: "Active",
        year: 2014,
        externalUrl: "https://medicaid.alabama.gov/",
        tags: ["PCMH", "Medicaid", "primary care", "care coordination"],
      },
      {
        id: "al-rural-health-initiative",
        name: "Alabama Rural Health Initiative",
        description:
          "Alabama established supplemental Medicaid payments for critical access hospitals and rural providers through the Alabama Rural Health Initiative. The program prioritizes Alabama's 33 rural counties, many of which have no obstetrician or psychiatrist within 50 miles.",
        type: "State Program",
        status: "Active",
        year: 2020,
        externalUrl: "https://www.arh.org/",
        tags: ["rural health", "critical access hospitals", "workforce", "obstetrics"],
      },
    ],
  },

  mississippi: {
    stateId: "mississippi",
    stateName: "Mississippi",
    stateAbbr: "MS",
    region: "South",
    heroColor: "bg-emerald-100 text-emerald-800",
    summary:
      "Mississippi consistently ranks last or near-last on national health outcome rankings. It has not expanded Medicaid and has experienced 9 rural hospital closures since 2010. Recent investments in behavioral health and rural infrastructure represent targeted responses to acute crises.",
    initiatives: [
      {
        id: "ms-behavioral-health-system",
        name: "Mississippi Community Mental Health System",
        description:
          "Mississippi's Department of Mental Health operates a statewide community mental health center network — one of the few remaining purely public behavioral health delivery systems in the South. The state has invested in crisis stabilization units and mobile crisis teams to provide alternatives to emergency department psychiatric holds.",
        type: "State Program",
        status: "Active",
        year: 1974,
        externalUrl: "https://www.dmh.ms.gov/",
        tags: ["behavioral health", "community mental health", "crisis stabilization", "mobile crisis"],
      },
      {
        id: "ms-rural-physician-incentives",
        name: "Rural Physicians Incentive Program",
        description:
          "Mississippi's Rural Physicians Incentive Program provides student loan repayment to physicians who commit to practice in rural or underserved communities. The program is tied to National Health Service Corps match requirements and targets primary care, OB/GYN, and psychiatry — the specialties with the most severe rural shortages.",
        type: "State Program",
        status: "Active",
        year: 2005,
        externalUrl: "https://www.msdh.ms.gov/msdhsite/_static/30,0,82.html",
        tags: ["rural health", "workforce", "loan repayment", "physician shortage"],
      },
    ],
  },

  louisiana: {
    stateId: "louisiana",
    stateName: "Louisiana",
    stateAbbr: "LA",
    region: "South",
    heroColor: "bg-violet-100 text-violet-800",
    summary:
      "Louisiana expanded Medicaid in 2016 and has used its managed care program (Healthy Louisiana) to drive behavioral health integration, value-based payment adoption, and social needs interventions. Louisiana also has a unique partnership with LSU Health to operate public hospital systems.",
    initiatives: [
      {
        id: "la-medicaid-expansion",
        name: "Louisiana Medicaid Expansion (2016)",
        description:
          "Governor John Bel Edwards expanded Medicaid by executive action on July 1, 2016, covering 500,000+ adults and reducing Louisiana's uninsured rate from 22% to 11%. Expansion was associated with significant improvements in cancer detection, diabetes management, and behavioral health access in the state's most underserved parishes.",
        type: "State Law",
        status: "Active",
        year: 2016,
        externalUrl: "https://ldh.la.gov/Medicaid-Expansion",
        tags: ["Medicaid expansion", "coverage", "uninsured rate"],
      },
      {
        id: "la-healthy-louisiana",
        name: "Healthy Louisiana Managed Care",
        description:
          "Louisiana's Healthy Louisiana program covers 1.7 million Medicaid members through five managed care organizations. The 2019 contract renewal introduced enhanced requirements for social needs screening, value-based payment adoption, and behavioral health network adequacy — with financial withhold provisions tied to performance.",
        type: "State Program",
        status: "Active",
        year: 2012,
        externalUrl: "https://ldh.la.gov/page/1504",
        tags: ["Medicaid", "managed care", "behavioral health", "VBP"],
      },
      {
        id: "la-1115-social-needs",
        name: "Louisiana 1115 SDOH Waiver",
        description:
          "Louisiana secured a 1115 waiver amendment to fund health-related social needs services — food, housing, utilities, and transportation — for high-risk Medicaid members. The program operates through community health workers embedded in Federally Qualified Health Centers and managed care organizations.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2023,
        externalUrl: "https://ldh.la.gov/page/1115-demonstration-waiver",
        tags: ["SDOH", "1115 waiver", "community health workers", "food", "housing"],
      },
    ],
  },

  tennessee: {
    stateId: "tennessee",
    stateName: "Tennessee",
    stateAbbr: "TN",
    region: "South",
    heroColor: "bg-sky-100 text-sky-800",
    summary:
      "Tennessee's TennCare program has been a comprehensive Medicaid managed care program since 1994 — one of the oldest in the nation. Tennessee has not expanded Medicaid, arguing TennCare already covers more than a standard program. Tennessee has pursued a block grant concept and is dealing with significant behavioral health reform pressures.",
    initiatives: [
      {
        id: "tn-tenncare",
        name: "TennCare Medicaid Managed Care",
        description:
          "Launched in 1994, TennCare replaced Tennessee's traditional Medicaid fee-for-service program with statewide managed care, covering 1.9 million enrollees. TennCare's three MCOs (BlueCare Tennessee, United Healthcare, and Amerigroup) operate under a comprehensive contract covering physical health, behavioral health, and pharmacy. TennCare's mature infrastructure has made it a reference program for other states designing comprehensive managed care.",
        type: "State Program",
        status: "Active",
        year: 1994,
        externalUrl: "https://www.tn.gov/tenncare.html",
        tags: ["Medicaid", "managed care", "TennCare", "behavioral health"],
      },
      {
        id: "tn-behavioral-health",
        name: "Tennessee Behavioral Health Safety Net",
        description:
          "Tennessee's Department of Mental Health operates a statewide safety net of community mental health agencies and has expanded mobile crisis services to all 95 counties. The 2023 legislative session funded new crisis stabilization units and expanded TDMHSAS grant funding for SUD residential treatment.",
        type: "State Program",
        status: "Active",
        year: 2022,
        externalUrl: "https://www.tn.gov/behavioral-health.html",
        tags: ["behavioral health", "crisis services", "SUD", "residential treatment"],
      },
    ],
  },

  kentucky: {
    stateId: "kentucky",
    stateName: "Kentucky",
    stateAbbr: "KY",
    region: "South",
    heroColor: "bg-blue-100 text-blue-800",
    summary:
      "Kentucky expanded Medicaid in 2014 and operates one of the nation's highest Medicaid enrollment rates relative to population. Kentucky has seen significant reductions in uninsured rates and cancer screening gaps since expansion. Behavioral health reform — particularly around opioids — is central to Kentucky's health agenda.",
    initiatives: [
      {
        id: "ky-medicaid-managed-care",
        name: "Kentucky Medicaid Managed Care (Medicaid MCO Program)",
        description:
          "Kentucky covers 1.5 million Medicaid members through five managed care organizations. After a controversial early managed care rollout, Kentucky restructured its contracts in 2018 to require value-based payment adoption, SDOH screening, and behavioral health integration. Contracts now require MCOs to invest 0.5% of premiums in community benefit activities.",
        type: "State Program",
        status: "Active",
        year: 2011,
        externalUrl: "https://chfs.ky.gov/agencies/dms/dca/Pages/mco.aspx",
        tags: ["Medicaid", "managed care", "VBP", "behavioral health"],
      },
      {
        id: "ky-opioid-settlement",
        name: "Kentucky Opioid Abatement Advisory Commission",
        description:
          "Kentucky established the Opioid Abatement Advisory Commission to govern its share of the national opioid litigation settlements — projected to yield $900M+ over 15 years. The Commission directs funding to treatment, harm reduction, recovery housing, and prevention, with a statutory requirement that funds supplement rather than replace existing behavioral health spending.",
        type: "State Program",
        status: "Active",
        year: 2022,
        externalUrl: "https://chfs.ky.gov/agencies/dbhdid/Pages/OpioidAbatementAdvisoryCommission.aspx",
        tags: ["opioids", "SUD", "settlement funds", "harm reduction", "recovery housing"],
      },
    ],
  },

  arkansas: {
    stateId: "arkansas",
    stateName: "Arkansas",
    stateAbbr: "AR",
    region: "South",
    heroColor: "bg-emerald-100 text-emerald-800",
    summary:
      "Arkansas pioneered a 'private option' approach to Medicaid expansion in 2014, using premium assistance to buy private insurance for Medicaid-eligible adults — the first state to do so. Arkansas has since evolved to the ARHOME model and has been a national leader in episode-of-care payment reform.",
    initiatives: [
      {
        id: "ar-arhome",
        name: "ARHOME (Arkansas Health and Opportunity for Me)",
        description:
          "ARHOME is Arkansas's 2021 evolution of the 'private option' Medicaid expansion waiver. It directs expansion enrollees into marketplace or employer-sponsored plans using Medicaid premium assistance, adds a population health program with financial incentives for healthy behaviors, and includes an employer-sponsored insurance premium assistance pilot. ARHOME covers 320,000+ enrollees.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2021,
        externalUrl: "https://www.dhs.arkansas.gov/dhs-divisions/medicaid/medicaid-new-adult-eligibility/",
        tags: ["Medicaid expansion", "premium assistance", "ARHOME", "private option"],
      },
      {
        id: "ar-episode-based-payments",
        name: "Arkansas Episode-Based Payment Initiative",
        description:
          "Arkansas's multi-payer episode-of-care program — operated since 2012 — is one of the most mature episode-based payment models in the country. Physicians are held accountable for all spending (including hospital, specialist, and pharmacy) within defined clinical episodes for conditions like joint replacement, perinatal care, COPD, and ADHD. The program operates across Medicaid, state employees, and commercial payers simultaneously.",
        type: "Multi-Payer",
        status: "Active",
        year: 2012,
        externalUrl: "https://www.paymentinitiative.org/",
        tags: ["episodes of care", "multi-payer", "shared savings", "physician accountability"],
      },
    ],
  },

  oklahoma: {
    stateId: "oklahoma",
    stateName: "Oklahoma",
    stateAbbr: "OK",
    region: "South",
    heroColor: "bg-orange-100 text-orange-800",
    summary:
      "Oklahoma voters approved Medicaid expansion via State Question 802 in June 2020 — by a razor-thin margin — and SoonerCare expansion launched July 2021. Oklahoma subsequently launched SoonerSelect, its first statewide Medicaid managed care program, in 2023.",
    initiatives: [
      {
        id: "ok-soonercare-expansion",
        name: "SoonerCare Medicaid Expansion (SQ 802)",
        description:
          "Oklahoma voters approved Medicaid expansion via State Question 802 on June 30, 2020, by a 50.5%–49.5% margin — the narrowest ballot initiative expansion in the country. SoonerCare expansion launched July 1, 2021, covering 200,000+ adults. The constitutional amendment prevents the legislature from restricting the expansion without a three-fourths supermajority.",
        type: "State Law",
        status: "Active",
        year: 2021,
        externalUrl: "https://oklahoma.gov/content/oklahoma/en/dchs-home/programs/soonercare/eligibility.html",
        tags: ["Medicaid expansion", "SoonerCare", "ballot initiative", "constitutional amendment"],
      },
      {
        id: "ok-soonerselect",
        name: "SoonerSelect Managed Care",
        description:
          "Oklahoma launched SoonerSelect — its first statewide Medicaid managed care program — in October 2023, replacing a fee-for-service system that had been in place for decades. Four managed care organizations operate in six regions. SoonerSelect integrates physical health, behavioral health, and pharmacy under a single contract.",
        type: "State Program",
        status: "Active",
        year: 2023,
        externalUrl: "https://oklahoma.gov/dchs/soonerselect.html",
        tags: ["Medicaid", "managed care", "SoonerSelect", "behavioral health"],
      },
    ],
  },

  maryland: {
    stateId: "maryland",
    stateName: "Maryland",
    stateAbbr: "MD",
    region: "South",
    heroColor: "bg-red-100 text-red-800",
    summary:
      "Maryland is unique in American health care: it operates the nation's only all-payer hospital rate regulation system, enforced by the Health Services Cost Review Commission (HSCRC) since 1977. No other state has maintained this level of hospital rate regulation. The system has evolved into a total cost of care model with CMS and now underpins Maryland's participation in the federal AHEAD Model.",
    initiatives: [
      {
        id: "md-hscrc",
        name: "Health Services Cost Review Commission (HSCRC)",
        description:
          "Maryland's HSCRC — established in 1971 and fully operational since 1977 — sets the rates that ALL payers (Medicare, Medicaid, commercial insurance, and self-pay) must pay to Maryland hospitals. No other state has maintained this authority. The HSCRC sets global budgets for each hospital annually and has kept Maryland's per-admission hospital costs below national averages. It is the direct predecessor and operational backbone of the Maryland Total Cost of Care Model.",
        type: "State Program",
        status: "Active",
        year: 1977,
        externalUrl: "https://hscrc.maryland.gov/",
        tags: ["all-payer rate setting", "global budget", "hospital regulation", "HSCRC"],
      },
      {
        id: "md-total-cost-of-care",
        name: "Maryland Total Cost of Care Model",
        description:
          "Building on the HSCRC infrastructure, Maryland's TCOC Model (launched 2019 with CMS) extends hospital global budgets and adds a Medicare total cost of care target. Under the model, Maryland must keep Medicare per-beneficiary spending growth below the national rate AND demonstrate improvement on population health metrics. The model includes a $1.1B investment in care transformation.",
        type: "Federal Program",
        status: "Active",
        year: 2019,
        externalUrl: "https://innovation.cms.gov/innovation-models/md-tcc",
        tags: ["all-payer", "global budget", "total cost of care", "Medicare", "CMS CMMI"],
      },
      {
        id: "md-ahead",
        name: "AHEAD Model (Maryland)",
        description:
          "Maryland participates in the CMS AHEAD Model as an extension of its TCOC Model — deepening commercial payer engagement and extending total cost accountability beyond hospitals. Maryland is leveraging its unique HSCRC infrastructure to bring commercial insurers into the statewide spending target framework for the first time.",
        type: "Federal Program",
        status: "Active",
        year: 2024,
        internalLink: "/ahead-model",
        externalUrl: "https://innovation.cms.gov/innovation-models/ahead",
        tags: ["AHEAD", "CMS", "all-payer", "commercial payers"],
      },
      {
        id: "md-healthchoice",
        name: "HealthChoice Medicaid Managed Care",
        description:
          "Maryland HealthChoice is the state's Medicaid managed care program, covering 1.4 million members through six managed care organizations. HealthChoice contracts require MCOs to align with HSCRC hospital global budgets and participate in the TCOC Model's population health improvement activities. Maryland has also added enhanced behavioral health integration requirements to its 2023 MCO contracts.",
        type: "State Program",
        status: "Active",
        year: 1997,
        externalUrl: "https://mmcp.health.maryland.gov/pages/home.aspx",
        tags: ["Medicaid", "managed care", "HealthChoice", "behavioral health"],
      },
    ],
  },

  west_virginia: {
    stateId: "west_virginia",
    stateName: "West Virginia",
    stateAbbr: "WV",
    region: "South",
    heroColor: "bg-slate-100 text-slate-800",
    summary:
      "West Virginia has the nation's highest drug overdose mortality rate and expanded Medicaid in 2014, significantly reducing the uninsured rate. The state has made SUD treatment expansion a legislative priority and is investing in harm reduction, recovery housing, and peer support networks.",
    initiatives: [
      {
        id: "wv-medicaid-managed-care",
        name: "WV Medicaid Managed Care",
        description:
          "West Virginia's Medicaid program covers 540,000+ members through managed care organizations that are required to integrate behavioral health and physical health benefits. The state has required MCOs to expand medication-assisted treatment network capacity and eliminate prior authorization requirements for MAT initiation.",
        type: "State Program",
        status: "Active",
        year: 2017,
        externalUrl: "https://dhhr.wv.gov/bms/Pages/default.aspx",
        tags: ["Medicaid", "managed care", "behavioral health", "MAT"],
      },
      {
        id: "wv-harm-reduction",
        name: "WV Harm Reduction and Recovery Network",
        description:
          "West Virginia has expanded syringe service programs, naloxone distribution, and peer recovery coaching through a network of community-based organizations. The state's Bureau for Behavioral Health has funded mobile SUD treatment units that bring medication-assisted treatment to rural counties with no local treatment providers.",
        type: "State Program",
        status: "Active",
        year: 2018,
        externalUrl: "https://dhhr.wv.gov/bbh/Pages/default.aspx",
        tags: ["harm reduction", "naloxone", "syringe services", "MAT", "peer recovery"],
      },
    ],
  },

  delaware: {
    stateId: "delaware",
    stateName: "Delaware",
    stateAbbr: "DE",
    region: "South",
    heroColor: "bg-sky-100 text-sky-800",
    summary:
      "Delaware is a small state with a comprehensive Medicaid managed care program and an active health innovation agenda. Delaware operates the Diamond State Health Plan, which integrates behavioral health with physical health, and has pursued significant maternal health and opioid reform.",
    initiatives: [
      {
        id: "de-diamond-state",
        name: "Diamond State Health Plan (Medicaid Managed Care)",
        description:
          "Delaware's Diamond State Health Plan is a comprehensive Medicaid managed care program integrating physical health, behavioral health, and pharmacy for 250,000+ members. The state has required its single MCO (Highmark BCBS Delaware / AmeriHealth) to implement social needs screening and care management for high-risk members.",
        type: "State Program",
        status: "Active",
        year: 1996,
        externalUrl: "https://dhss.delaware.gov/dhss/dmma/diamond_state.html",
        tags: ["Medicaid", "managed care", "behavioral health integration"],
      },
      {
        id: "de-hub-spoke",
        name: "Delaware Opioid Treatment Hub-and-Spoke",
        description:
          "Delaware implemented a hub-and-spoke model for opioid use disorder treatment — specialized addiction treatment hubs provide intensive services and stabilization while primary care 'spokes' provide ongoing MAT maintenance. The model significantly increased MAT access in primary care settings and has been replicated by Vermont and other states.",
        type: "State Program",
        status: "Active",
        year: 2017,
        externalUrl: "https://dhss.delaware.gov/dhss/dsamh/",
        tags: ["opioids", "MAT", "hub-and-spoke", "SUD", "primary care integration"],
      },
    ],
  },

  // ─── MIDWEST ──────────────────────────────────────────────────────

  ohio: {
    stateId: "ohio",
    stateName: "Ohio",
    stateAbbr: "OH",
    region: "Midwest",
    heroColor: "bg-red-100 text-red-800",
    summary:
      "Ohio expanded Medicaid in 2013 under Governor Kasich and has been among the most active Medicaid reform states in the Midwest. Ohio redesigned its managed care program in 2022 with integrated physical-behavioral health contracts, and has invested over $1 billion in opioid treatment and harm reduction.",
    initiatives: [
      {
        id: "oh-medicaid-redesign",
        name: "Ohio Medicaid Managed Care Redesign (2022)",
        description:
          "Ohio's 2022 managed care redesign replaced its prior managed care structure with six statewide MCOs — down from five regional programs — under new integrated contracts requiring behavioral health and physical health to be managed as a single benefit for the first time. The redesign introduced shared savings for MCOs that improve quality metrics and created a new MyCare Ohio program for dual-eligible members.",
        type: "State Program",
        status: "Active",
        year: 2022,
        externalUrl: "https://medicaid.ohio.gov/managed-care",
        tags: ["Medicaid", "managed care", "behavioral health integration", "dual eligible"],
      },
      {
        id: "oh-opioid-response",
        name: "Ohio Opioid Settlement & Treatment Investments",
        description:
          "Ohio has recovered $1.6B+ from opioid litigation settlements and established the OneOhio Recovery Foundation to govern distribution. Funding priorities include community-based treatment, harm reduction programs, recovery housing, peer support, and training for first responders. Ohio's opioid response has been nationally recognized for its scale and coordination.",
        type: "State Program",
        status: "Active",
        year: 2021,
        externalUrl: "https://oneohio.org/",
        tags: ["opioids", "SUD", "settlement funds", "harm reduction", "OneOhio"],
      },
      {
        id: "oh-ahead-adjacent",
        name: "OhioRISE — Serious Behavioral Health Managed Care",
        description:
          "OhioRISE (Resilience Through Integrated Systems and Excellence) is Ohio's dedicated managed care program for children and youth with serious behavioral health needs, launched in 2022. A single specialized managed care organization coordinates wraparound care across behavioral health, child welfare, education, and juvenile justice systems.",
        type: "State Program",
        status: "Active",
        year: 2022,
        externalUrl: "https://medicaid.ohio.gov/managed-care/ohiorise",
        tags: ["behavioral health", "children", "serious mental illness", "wraparound", "multi-system"],
      },
    ],
  },

  michigan: {
    stateId: "michigan",
    stateName: "Michigan",
    stateAbbr: "MI",
    region: "Midwest",
    heroColor: "bg-blue-100 text-blue-800",
    summary:
      "Michigan expanded Medicaid in 2014 through the bipartisan Healthy Michigan Plan and has one of the most sophisticated integrated behavioral health systems in the country — operated through Community Mental Health Service Programs (CMHSPs) that are now being integrated with physical health managed care.",
    initiatives: [
      {
        id: "mi-healthy-michigan",
        name: "Healthy Michigan Plan (1115 Waiver)",
        description:
          "Michigan expanded Medicaid via a bipartisan 1115 waiver in 2014, with healthy behaviors incentives (MY Health Account) that required enrollees to engage with primary care. The program covers 750,000+ adults. A CMS evaluation found significant improvements in chronic disease management, cancer screening, and substance use treatment access among enrollees.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2014,
        externalUrl: "https://www.michigan.gov/mdhhs/assistance-programs/medicaid/beneficiaries/healthy-michigan-plan",
        tags: ["Medicaid expansion", "1115 waiver", "healthy behaviors", "coverage"],
      },
      {
        id: "mi-integrated-care",
        name: "Integrated Care for Kids (InCK) and Behavioral Health Integration",
        description:
          "Michigan is integrating its historically separate physical health MCOs and Community Mental Health (CMHSP) systems through a new integrated behavioral health model. CMHSPs have long operated behavioral health services for Medicaid members under a carve-out arrangement; Michigan is transitioning toward integrated contracts while preserving the CMHSP public system.",
        type: "State Program",
        status: "In Development",
        year: 2023,
        externalUrl: "https://www.michigan.gov/mdhhs/assistance-programs/medicaid/behavioral-health-transformation",
        tags: ["behavioral health", "CMHSP", "integration", "managed care", "children"],
      },
      {
        id: "mi-mihealth-link",
        name: "MI Health Link — Dual Eligible Alignment",
        description:
          "Michigan's MI Health Link program integrates Medicare and Medicaid benefits for dual-eligible individuals through capitated integrated care organizations. Enrollees receive coordinated physical health, behavioral health, and LTSS through a single care plan and care manager.",
        type: "Multi-Payer",
        status: "Active",
        year: 2015,
        externalUrl: "https://www.michigan.gov/mdhhs/assistance-programs/medicaid/dualeligiblemembers/mihealthlink",
        tags: ["dual eligible", "integrated care", "Medicare-Medicaid", "LTSS"],
      },
    ],
  },

  indiana: {
    stateId: "indiana",
    stateName: "Indiana",
    stateAbbr: "IN",
    region: "Midwest",
    heroColor: "bg-orange-100 text-orange-800",
    summary:
      "Indiana expanded Medicaid through the Healthy Indiana Plan 2.0 — a conservative 1115 waiver model with personal health accounts and cost-sharing — that became a blueprint for other states seeking an alternative to standard expansion. Indiana's approach was the most watched Medicaid expansion design of the ACA era.",
    initiatives: [
      {
        id: "in-hip-plus",
        name: "Healthy Indiana Plan (HIP) 2.0",
        description:
          "Indiana's 1115 waiver expanded Medicaid coverage via POWER Accounts — health savings account-like structures funded by both state Medicaid dollars and enrollee contributions (typically $1–$10/month). Members who contribute get 'HIP Plus' coverage with dental and vision; those who don't are placed in 'HIP Basic' with limited benefits. The model covers 400,000+ adults and has been studied extensively for its impact on enrollment barriers and cost-sharing effects.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2015,
        externalUrl: "https://www.in.gov/medicaid/members/current-members/healthy-indiana-plan/",
        tags: ["Medicaid expansion", "1115 waiver", "POWER Accounts", "cost-sharing", "HIP Plus"],
      },
      {
        id: "in-ihcp-managed-care",
        name: "Indiana Health Coverage Programs (IHCP)",
        description:
          "Indiana's Medicaid managed care program covers 1.7 million members through three MCOs: Anthem, MDwise, and Managed Health Services. The program integrates physical health, behavioral health, and pharmacy. Indiana is implementing a new Pathways to Independence initiative that pairs enhanced care management with employment supports for working-age Medicaid members.",
        type: "State Program",
        status: "Active",
        year: 2007,
        externalUrl: "https://www.in.gov/medicaid/members/",
        tags: ["Medicaid", "managed care", "behavioral health", "employment supports"],
      },
    ],
  },

  illinois: {
    stateId: "illinois",
    stateName: "Illinois",
    stateAbbr: "IL",
    region: "Midwest",
    heroColor: "bg-sky-100 text-sky-800",
    summary:
      "Illinois expanded Medicaid early and operates a large, complex managed care program. The state has prioritized health equity — requiring MCOs to stratify quality data by race — and is implementing a comprehensive behavioral health strategy to address high rates of gun violence, trauma, and SUD.",
    initiatives: [
      {
        id: "il-medicaid-managed-care",
        name: "Illinois Medicaid Managed Care Reform",
        description:
          "Illinois's Managed Care Organizations cover 3.4 million Medicaid members. The 2021 contract renewal introduced requirements for value-based payment adoption, social needs screening, and health equity action plans. Illinois requires its MCOs to submit annual reports stratifying quality measures by race, ethnicity, and language — and to reduce identified disparities within three years.",
        type: "Value-Based Care",
        status: "Active",
        year: 2021,
        externalUrl: "https://hfs.illinois.gov/medicalprograms/managedcare.html",
        tags: ["Medicaid", "managed care", "health equity", "VBP", "disparities"],
      },
      {
        id: "il-behavioral-health-transformation",
        name: "Illinois Behavioral Health Crisis System",
        description:
          "Illinois is building a statewide behavioral health crisis continuum under its 1115 waiver and ARPA funding — including 988 call centers with mobile crisis response teams, crisis stabilization units, and a network of crisis receiving centers. The transformation addresses longstanding gaps in Illinois's behavioral health infrastructure, particularly in rural areas and communities of color.",
        type: "State Program",
        status: "Active",
        year: 2022,
        externalUrl: "https://www.dhs.state.il.us/page.aspx?item=138232",
        tags: ["behavioral health", "crisis system", "988", "mobile crisis", "stabilization"],
      },
    ],
  },

  wisconsin: {
    stateId: "wisconsin",
    stateName: "Wisconsin",
    stateAbbr: "WI",
    region: "Midwest",
    heroColor: "bg-red-100 text-red-800",
    summary:
      "Wisconsin has not expanded Medicaid and is the only Midwest state in this category alongside Kansas and South Dakota (prior to 2023). BadgerCare Plus covers children and some adults, but coverage for non-disabled adults without children is capped. Wisconsin has a strong integrated care history through Family Care, its managed LTSS program.",
    initiatives: [
      {
        id: "wi-family-care",
        name: "Wisconsin Family Care (Managed LTSS)",
        description:
          "Wisconsin's Family Care program is one of the nation's oldest managed LTSS models, covering adults with disabilities and frail elderly individuals through capitated managed care organizations called care management organizations (CMOs). Enrollees direct their own care plans with support from a care management team. Family Care covers 60,000+ enrollees and has been a national HCBS managed care reference program.",
        type: "State Program",
        status: "Active",
        year: 1999,
        externalUrl: "https://www.dhs.wisconsin.gov/familycare/index.htm",
        tags: ["managed LTSS", "HCBS", "disability", "elderly", "care management"],
      },
      {
        id: "wi-iris",
        name: "IRIS — Include, Respect, I Self-Direct",
        description:
          "Wisconsin's IRIS program is a self-directed LTSS option for adults with disabilities — an alternative to Family Care managed care. Participants receive a monthly budget allocation and hire their own workers and purchase their own services with support from an IRIS consultant agency. IRIS is one of the largest self-directed LTSS programs in the country.",
        type: "State Program",
        status: "Active",
        year: 2008,
        externalUrl: "https://www.dhs.wisconsin.gov/iris/index.htm",
        tags: ["self-directed care", "LTSS", "disability", "HCBS", "consumer direction"],
      },
    ],
  },

  minnesota: {
    stateId: "minnesota",
    stateName: "Minnesota",
    stateAbbr: "MN",
    region: "Midwest",
    heroColor: "bg-indigo-100 text-indigo-800",
    summary:
      "Minnesota is a consistent national leader in health system quality and value-based care. Its Integrated Health Partnerships (IHP) program is one of the nation's most mature state-operated ACO programs. Minnesota also operates MinnesotaCare as a Basic Health Program — one of only two states using this ACA option — and participates in the federal AHEAD Model.",
    initiatives: [
      {
        id: "mn-ihp",
        name: "Integrated Health Partnerships (IHP) — Medicaid ACO",
        description:
          "Minnesota's IHP program is a statewide Medicaid shared savings model in which provider organizations take downside financial risk for total cost of care for attributed Medicaid and MinnesotaCare members. The program covers 500,000+ attributed lives across 22 IHP organizations and has generated documented reductions in preventable hospitalizations and ED visits. IHP is among the longest-running, largest-scale state Medicaid ACO programs nationally.",
        type: "ACO Model",
        status: "Active",
        year: 2013,
        externalUrl: "https://mn.gov/dhs/partners-and-providers/policies-procedures/medical-assistance/integrated-health-partnerships/",
        tags: ["ACO", "shared savings", "Medicaid", "downside risk", "population health"],
      },
      {
        id: "mn-minnesotacare",
        name: "MinnesotaCare — Basic Health Program",
        description:
          "Minnesota operates MinnesotaCare as an ACA Section 1331 Basic Health Program — one of only two states (with New York) using this option. BHP allows states to provide coverage to individuals 138–200% FPL with lower premiums and cost-sharing than exchange plans, funded by federal pass-through dollars. MinnesotaCare covers 90,000+ adults.",
        type: "State Program",
        status: "Active",
        year: 2015,
        externalUrl: "https://mn.gov/dhs/minnesotacare/",
        tags: ["Basic Health Program", "BHP", "coverage", "ACA Section 1331"],
      },
      {
        id: "mn-ahead",
        name: "AHEAD Model (Minnesota)",
        description:
          "Minnesota joined the CMS AHEAD Model building on its IHP ACO infrastructure. The model establishes a Medicare total cost of care growth target for the state and provides infrastructure funding to extend population health accountability into commercial markets. Minnesota's deep ACO infrastructure makes it one of the AHEAD states best positioned to achieve statewide spending target compliance.",
        type: "Federal Program",
        status: "Active",
        year: 2024,
        internalLink: "/ahead-model",
        externalUrl: "https://innovation.cms.gov/innovation-models/ahead",
        tags: ["AHEAD", "CMS", "total cost of care", "ACO", "commercial payers"],
      },
    ],
  },

  iowa: {
    stateId: "iowa",
    stateName: "Iowa",
    stateAbbr: "IA",
    region: "Midwest",
    heroColor: "bg-blue-100 text-blue-800",
    summary:
      "Iowa privatized its Medicaid program under managed care in 2016 — a controversial transition that generated significant quality concerns and led to MCO exits. Iowa has restructured its managed care contracts twice since and is pursuing behavioral health integration improvements.",
    initiatives: [
      {
        id: "ia-iowa-total-care",
        name: "Iowa Medicaid Managed Care",
        description:
          "Iowa's managed care program launched in 2016 with three MCOs under Governor Branstad, replacing a fee-for-service system. After Amerigroup exited and quality problems emerged, the state restructured contracts in 2019 and 2023. The current program operates through two MCOs — Iowa Total Care and UnitedHealthcare — covering 800,000+ members. Iowa has required enhanced behavioral health network standards and care coordination requirements in its current contracts.",
        type: "State Program",
        status: "Active",
        year: 2016,
        externalUrl: "https://dhs.iowa.gov/medicaid/member-information",
        tags: ["Medicaid", "managed care", "behavioral health", "restructuring"],
      },
      {
        id: "ia-behavioral-health-redesign",
        name: "Iowa Behavioral Health System Redesign",
        description:
          "Iowa's 2021 behavioral health redesign is consolidating fragmented county-based mental health regions into four statewide service regions with integrated funding. The redesign aims to standardize the service array across counties, address HCBS waitlist backlogs, and integrate behavioral health into the Medicaid managed care benefit.",
        type: "State Program",
        status: "Active",
        year: 2021,
        externalUrl: "https://hhs.iowa.gov/programs/programs-and-services/behavioral-health",
        tags: ["behavioral health", "mental health redesign", "HCBS", "regional", "integration"],
      },
    ],
  },

  missouri: {
    stateId: "missouri",
    stateName: "Missouri",
    stateAbbr: "MO",
    region: "Midwest",
    heroColor: "bg-orange-100 text-orange-800",
    summary:
      "Missouri voters approved Medicaid expansion via Amendment 2 in August 2020; after a legislative standoff over funding, federal courts ordered implementation in October 2021. Missouri has since launched managed care for its expanded population and is addressing significant rural hospital sustainability challenges.",
    initiatives: [
      {
        id: "mo-medicaid-expansion",
        name: "Missouri Medicaid Expansion (Amendment 2)",
        description:
          "Missouri voters approved Medicaid expansion via ballot initiative in August 2020 by a 53%-47% margin. The Republican-controlled legislature refused to appropriate funds, leading to a court battle; expansion ultimately launched October 2021 covering 275,000+ adults. Amendment 2 amended the state constitution, making legislative rollback extremely difficult.",
        type: "State Law",
        status: "Active",
        year: 2021,
        externalUrl: "https://mydss.mo.gov/healthcare/mo-healthnet",
        tags: ["Medicaid expansion", "coverage", "ballot initiative", "constitutional amendment"],
      },
      {
        id: "mo-rural-hospital-sustainability",
        name: "Missouri Rural Health Association Access Programs",
        description:
          "Missouri has pursued rural hospital sustainability through state-funded rural health programs, Medicaid disproportionate share hospital payments, and telemedicine network grants. Fifteen Missouri rural hospitals have closed since 2010, creating urgent access challenges in agricultural communities.",
        type: "State Program",
        status: "Active",
        year: 2020,
        externalUrl: "https://www.mrha.com/",
        tags: ["rural health", "hospital closure", "critical access", "telemedicine"],
      },
    ],
  },

  kansas: {
    stateId: "kansas",
    stateName: "Kansas",
    stateAbbr: "KS",
    region: "Midwest",
    heroColor: "bg-yellow-100 text-yellow-800",
    summary:
      "Kansas has not expanded Medicaid and has one of the highest rural hospital closure rates in the Midwest. The state has pursued targeted rural health incentives and Medicaid managed care improvements within its non-expansion framework.",
    initiatives: [
      {
        id: "ks-kancare",
        name: "KanCare Medicaid Managed Care",
        description:
          "Kansas's KanCare program has integrated physical health, behavioral health, and LTSS under managed care contracts since 2013. The program covers 400,000+ members through three MCOs. Kansas has implemented a KanCare 2.0 redesign with enhanced behavioral health requirements and HCBS managed care protections, responding to litigation over HCBS access and quality.",
        type: "State Program",
        status: "Active",
        year: 2013,
        externalUrl: "https://www.kancare.ks.gov/",
        tags: ["Medicaid", "managed care", "LTSS", "HCBS", "behavioral health"],
      },
      {
        id: "ks-rural-opportunity-zones",
        name: "Rural Opportunity Zones (ROZ)",
        description:
          "Kansas's Rural Opportunity Zones program offers student loan repayment (up to $15,000) and state income tax waivers for healthcare workers and other professionals who relocate to qualifying rural counties. Over 90 counties participate. The program has been credited with attracting physicians, pharmacists, and nurses to underserved rural areas and has been replicated by other states.",
        type: "State Program",
        status: "Active",
        year: 2012,
        externalUrl: "https://www.kansascommerce.gov/the-kansas-advantage/rural-opportunity-zones/",
        tags: ["rural health", "workforce", "loan repayment", "tax incentives", "recruitment"],
      },
    ],
  },

  nebraska: {
    stateId: "nebraska",
    stateName: "Nebraska",
    stateAbbr: "NE",
    region: "Midwest",
    heroColor: "bg-red-100 text-red-800",
    summary:
      "Nebraska voters approved Medicaid expansion via Initiative 427 in November 2018; expansion launched October 2020 after legislative delays over income verification requirements. Nebraska covers its expanded population through fee-for-service rather than managed care.",
    initiatives: [
      {
        id: "ne-medicaid-expansion",
        name: "Heritage Health (Medicaid Expansion & Managed Care)",
        description:
          "Nebraska expanded Medicaid via Initiative 427 in 2018 by a 53%–47% margin and launched coverage in October 2020. Nebraska simultaneously launched Heritage Health, its first comprehensive Medicaid managed care program, integrating physical health, behavioral health, and pharmacy for 340,000+ members through a single MCO (UnitedHealthcare).",
        type: "State Law",
        status: "Active",
        year: 2020,
        externalUrl: "https://dhhs.ne.gov/medicaid",
        tags: ["Medicaid expansion", "Heritage Health", "managed care", "ballot initiative"],
      },
    ],
  },

  north_dakota: {
    stateId: "north_dakota",
    stateName: "North Dakota",
    stateAbbr: "ND",
    region: "Midwest",
    heroColor: "bg-slate-100 text-slate-800",
    summary:
      "North Dakota expanded Medicaid in 2014 with strong bipartisan support and has maintained expansion consistently since. The state has pursued behavioral health integration and is investing in rural hospital infrastructure.",
    initiatives: [
      {
        id: "nd-medicaid-managed-care",
        name: "ND Medicaid Managed Care",
        description:
          "North Dakota's Medicaid program transitioned to managed care for physical health and behavioral health in 2019 through two regional MCOs. The transition was designed to improve care coordination and reduce fragmentation between physical and behavioral health services. North Dakota's managed care approach includes enhanced rural network adequacy requirements.",
        type: "State Program",
        status: "Active",
        year: 2019,
        externalUrl: "https://www.hhs.nd.gov/healthcare/medicaid",
        tags: ["Medicaid", "managed care", "behavioral health", "rural"],
      },
    ],
  },

  south_dakota: {
    stateId: "south_dakota",
    stateName: "South Dakota",
    stateAbbr: "SD",
    region: "Midwest",
    heroColor: "bg-amber-100 text-amber-800",
    summary:
      "South Dakota was the last holdout state to expand Medicaid, with voters approving Amendment D in November 2022 — and constitutionally mandating it. Coverage launched July 2023. South Dakota also operates a significant Indian Health Service system for its large Native American population.",
    initiatives: [
      {
        id: "sd-medicaid-expansion",
        name: "SD Medicaid Expansion (Amendment D, 2023)",
        description:
          "South Dakota voters approved Amendment D in November 2022 by a 56% margin, constitutionally requiring Medicaid expansion. Coverage for 42,000+ adults launched July 1, 2023 — making South Dakota the 40th state to expand. The constitutional amendment means the legislature cannot restrict expansion without a referendum.",
        type: "State Law",
        status: "Active",
        year: 2023,
        externalUrl: "https://dss.sd.gov/medicaid/",
        tags: ["Medicaid expansion", "coverage", "Amendment D", "constitutional mandate"],
      },
      {
        id: "sd-ihs",
        name: "Indian Health Service Integration",
        description:
          "South Dakota has worked to integrate Indian Health Service facilities and tribal health programs into its Medicaid billing system, improving reimbursement for care delivered to the state's large Lakota, Dakota, and Nakota populations. Tribal health authorities serve as unique Medicaid providers under federal-state compacts.",
        type: "State Program",
        status: "Active",
        year: 2019,
        externalUrl: "https://www.ihs.gov/greatplains/",
        tags: ["tribal health", "Indian Health Service", "Native American", "Medicaid", "compacts"],
      },
    ],
  },

  // ─── WEST ─────────────────────────────────────────────────────────

  california: {
    stateId: "california",
    stateName: "California",
    stateAbbr: "CA",
    region: "West",
    heroColor: "bg-teal-100 text-teal-800",
    summary:
      "California's $6.7B+ CalAIM Medi-Cal transformation is the largest single Medicaid reform in US history. CalAIM integrates whole-person care, funds housing and social needs for the first time under Medicaid, and launches community health worker and justice re-entry programs at unprecedented scale. California is also reshaping its behavioral health system through Proposition 1 and BHCIP.",
    initiatives: [
      {
        id: "ca-calaim",
        name: "CalAIM — California Advancing and Innovating Medi-Cal",
        description:
          "CalAIM launched in January 2022 with a 1115 waiver and ILOS (In Lieu of Services) authority to fund housing navigation, recuperative care, sobering centers, and community health workers for high-need Medi-Cal members. By 2024, enhanced care management is required for all high-risk members, and community supports (non-medical social services) are available statewide. CalAIM also includes a major behavioral health integration initiative and a justice re-entry program.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2022,
        internalLink: "/california-calaim",
        externalUrl: "https://www.dhcs.ca.gov/calaim",
        tags: ["CalAIM", "whole-person care", "housing", "1115 waiver", "ILOS", "community health workers"],
      },
      {
        id: "ca-bhcip",
        name: "Behavioral Health Continuum Infrastructure Program (BHCIP)",
        description:
          "BHCIP is California's $2.2 billion grant program to build a full continuum of behavioral health facilities — from outpatient wellness to crisis stabilization to long-term residential treatment. Funded by Proposition 1 (2024) and ARPA, BHCIP addresses California's severe shortage of mental health and SUD treatment beds through capital grants to counties, non-profits, and tribal entities.",
        type: "State Program",
        status: "Active",
        year: 2022,
        externalUrl: "https://www.dhcs.ca.gov/bhcip",
        tags: ["behavioral health", "infrastructure", "crisis stabilization", "residential", "capital grants"],
      },
      {
        id: "ca-proposition1",
        name: "Proposition 1 — MHSA Reform & Behavioral Health Bond",
        description:
          "California voters narrowly approved Proposition 1 in March 2024 (50.2%–49.8%), restructuring the Mental Health Services Act to prioritize the most severely mentally ill and authorizing a $6.38 billion bond for behavioral health housing and treatment facilities. The reforms shift MHSA funding from a broad population wellness focus toward acute treatment and housing for those with serious mental illness.",
        type: "State Law",
        status: "Active",
        year: 2024,
        externalUrl: "https://www.dhcs.ca.gov/proposition-1",
        tags: ["MHSA", "behavioral health", "housing", "bonds", "serious mental illness"],
      },
    ],
  },

  oregon: {
    stateId: "oregon",
    stateName: "Oregon",
    stateAbbr: "OR",
    region: "West",
    heroColor: "bg-emerald-100 text-emerald-800",
    summary:
      "Oregon has pioneered Medicaid reform for over a decade through its Coordinated Care Organization model — a global-budget, locally governed approach to integrating physical, behavioral, and oral health. Oregon's HEAL waiver (2022) adds SDOH interventions. Oregon also attempted drug decriminalization through Measure 110, then partially reversed it in 2024 amid a fentanyl crisis.",
    initiatives: [
      {
        id: "or-cco",
        name: "Coordinated Care Organizations (CCO) — Global Budget Model",
        description:
          "Oregon's CCO model replaced traditional managed care in 2012 with locally governed organizations that operate under a global budget — a fixed per-member per-month amount covering ALL Medicaid services including physical health, behavioral health, and oral health. CCOs are accountable to a Community Advisory Council with majority consumer representation. Oregon's global budget approach has generated documented savings while reducing preventable ED visits.",
        type: "State Program",
        status: "Active",
        year: 2012,
        externalUrl: "https://www.oregon.gov/oha/hsd/ohp/pages/coordinated-care-organizations.aspx",
        tags: ["CCO", "global budget", "Medicaid", "oral health integration", "local governance"],
      },
      {
        id: "or-heal-waiver",
        name: "Oregon HEAL Waiver (Health, Equity, Accountability & Learning)",
        description:
          "Oregon's 2022 1115 HEAL waiver extends CCO flexibility and adds new authorities to fund health-related social needs, including housing (transitional housing, tenancy support), food (medically tailored meals), utilities, and a housing-to-health pilot for individuals experiencing unsheltered homelessness who cycle through Medicaid services.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2022,
        externalUrl: "https://www.oregon.gov/oha/hsd/ohp/pages/waiver.aspx",
        tags: ["1115 waiver", "SDOH", "housing", "food", "homelessness", "health equity"],
      },
      {
        id: "or-measure110",
        name: "Measure 110 / Drug Decriminalization",
        description:
          "Oregon's Measure 110, passed in 2020, decriminalized personal possession of small amounts of controlled substances and directed cannabis tax revenue to a statewide treatment fund. Implementation was difficult — the Behavioral Health Resource Networks were slow to stand up. In 2024, the legislature recriminalized drug possession (HB 4002) while preserving Measure 110's treatment funding mechanism.",
        type: "State Law",
        status: "Active",
        year: 2021,
        externalUrl: "https://www.oregon.gov/oha/pages/ors430-a-701-715-measure-110-behavioral-health.aspx",
        tags: ["drug decriminalization", "SUD", "cannabis revenue", "treatment funding"],
      },
    ],
  },

  washington: {
    stateId: "washington",
    stateName: "Washington",
    stateAbbr: "WA",
    region: "West",
    heroColor: "bg-sky-100 text-sky-800",
    summary:
      "Washington State is executing multiple landmark health reforms simultaneously: Apple Health managed care transformation with SDOH integration, the first implemented state public option (Cascade Care, launched 2021), and a complete behavioral health integration that eliminated its historic behavioral health carve-out in 2020.",
    initiatives: [
      {
        id: "wa-apple-health-transformation",
        name: "Apple Health Managed Care Transformation",
        description:
          "Washington's Apple Health (Medicaid) transformation restructured its managed care program through Accountable Communities of Health — regional multi-sector collaboratives — and value-based payment requirements. MCOs must transition 90% of spending to VBP arrangements and invest in social needs interventions. Washington also integrates behavioral health through managed care contracts that cover mental health and SUD alongside physical health.",
        type: "State Program",
        status: "Active",
        year: 2017,
        externalUrl: "https://www.hca.wa.gov/apple-health",
        tags: ["Medicaid", "ACH", "SDOH", "VBP", "behavioral health integration"],
      },
      {
        id: "wa-cascade-care",
        name: "Cascade Care — Public Option",
        description:
          "Washington launched Cascade Care in January 2021 — the first implemented public option in US history. Cascade Care plans are standardized benefit designs offered by private insurers on the exchange, with standardized cost-sharing. A state-contracted public option is available through Kaiser Foundation Health Plan and a network of provider-sponsored organizations. Premium targets are set below average benchmark plan prices.",
        type: "State Law",
        status: "Active",
        year: 2021,
        externalUrl: "https://www.hca.wa.gov/cascade-care",
        tags: ["public option", "state exchange", "standardized plans", "premium reduction"],
      },
      {
        id: "wa-behavioral-health-integration",
        name: "Behavioral Health Integration (2020)",
        description:
          "Washington eliminated its behavioral health carve-out in January 2020, integrating mental health and SUD treatment into Apple Health managed care for the first time. The integration required two years of phased implementation including network development, rate negotiations with behavioral health providers, and redesign of crisis services. Washington's integration is considered one of the most complex managed care behavioral health integrations in the country.",
        type: "State Program",
        status: "Active",
        year: 2020,
        externalUrl: "https://www.hca.wa.gov/about-hca/behavioral-health-integration",
        tags: ["behavioral health", "integration", "managed care", "crisis services", "SUD"],
      },
    ],
  },

  colorado: {
    stateId: "colorado",
    stateName: "Colorado",
    stateAbbr: "CO",
    region: "West",
    heroColor: "bg-indigo-100 text-indigo-800",
    summary:
      "Colorado has launched the nation's most developed state public option, runs one of the largest state-operated Medicaid ACO models through Regional Accountable Entities, and operates CIVHC — one of the nation's most powerful all-payer claims databases. Colorado is testing multiple reform models simultaneously.",
    initiatives: [
      {
        id: "co-colorado-option",
        name: "Colorado Option (State Public Option)",
        description:
          "Colorado enacted the Colorado Option in 2021 and launched it in 2023. Unlike a government-run plan, Colorado requires private insurers to offer a standardized 'Colorado Option' plan on and off exchange, with mandated premium reductions of 15% by 2025 relative to 2021 benchmarks. Insurers that cannot meet targets must file alternative compliance plans. As of 2024, Colorado Option plans have the largest provider networks in the state.",
        type: "State Law",
        status: "Active",
        year: 2023,
        externalUrl: "https://doi.colorado.gov/insurance-products/colorado-option",
        tags: ["public option", "standardized plans", "premium reduction", "insurance market"],
      },
      {
        id: "co-rae",
        name: "Regional Accountable Entities (RAE)",
        description:
          "Colorado's RAE model coordinates primary care and behavioral health for Health First Colorado (Medicaid) members through seven regional organizations. RAEs receive per-member per-month care coordination payments and share in savings generated from reducing total cost of care. Unlike managed care MCOs, RAEs do not bear insurance risk — they are care coordination entities that work alongside fee-for-service payments.",
        type: "State Program",
        status: "Active",
        year: 2018,
        externalUrl: "https://hcpf.colorado.gov/accountable-care-collaborative",
        tags: ["Medicaid", "primary care", "behavioral health", "RAE", "ACC"],
      },
      {
        id: "co-civhc",
        name: "CIVHC All-Payer Claims Database",
        description:
          "Colorado's Center for Improving Value in Health Care (CIVHC) operates CO APCD — one of the nation's most comprehensive all-payer claims databases, with data from commercial insurers, Medicaid, Medicare, and self-insured employers. The database enables public reporting on price variation, population health, and quality — and has been used to identify areas of unnecessary variation that the Colorado Option targets.",
        type: "Multi-Payer",
        status: "Active",
        year: 2010,
        externalUrl: "https://www.civhc.org/",
        tags: ["APCD", "all-payer claims", "price transparency", "population health"],
      },
    ],
  },

  nevada: {
    stateId: "nevada",
    stateName: "Nevada",
    stateAbbr: "NV",
    region: "West",
    heroColor: "bg-violet-100 text-violet-800",
    summary:
      "Nevada expanded Medicaid in 2014 and passed the nation's first Medicaid buy-in public option bill in 2021 — though implementation awaits federal waiver approval. Nevada faces significant rural provider shortages despite being one of the fastest-growing states.",
    initiatives: [
      {
        id: "nv-medicaid-managed-care",
        name: "Nevada Medicaid Managed Care",
        description:
          "Nevada's Medicaid managed care program covers 900,000+ members through two MCOs (Anthem and Nevada Health Cooperative). The 2023 contract renewal introduced enhanced behavioral health integration, social needs screening requirements, and VBP adoption targets. Nevada has also added requirements for MCOs to expand provider networks in rural counties.",
        type: "State Program",
        status: "Active",
        year: 2012,
        externalUrl: "https://dhcfp.nv.gov/Programs/Healthcare/HMO/HMO_Home/",
        tags: ["Medicaid", "managed care", "behavioral health", "VBP"],
      },
      {
        id: "nv-medicaid-buyin",
        name: "Nevada Medicaid Buy-In (SB420)",
        description:
          "Nevada's SB420 (2021) authorizes a Medicaid buy-in program allowing individuals not otherwise eligible for Medicaid to purchase Medicaid coverage at cost. The program requires a federal Section 1332 waiver from CMS. Nevada's approach — buying directly into Medicaid rather than a new state plan — is considered the most administratively simple public option model.",
        type: "State Law",
        status: "Pending",
        year: 2021,
        externalUrl: "https://dhcfp.nv.gov/",
        tags: ["public option", "Medicaid buy-in", "1332 waiver", "uninsured"],
      },
    ],
  },

  arizona: {
    stateId: "arizona",
    stateName: "Arizona",
    stateAbbr: "AZ",
    region: "West",
    heroColor: "bg-orange-100 text-orange-800",
    summary:
      "Arizona has operated AHCCCS — the nation's first fully capitated Medicaid managed care program — since 1982. Arizona expanded Medicaid via Proposition 204 in 2000 and again under the ACA in 2013. Arizona's 2023 SDOH waiver is one of the most comprehensive social needs Medicaid waivers in the country.",
    initiatives: [
      {
        id: "az-ahcccs",
        name: "AHCCCS — Arizona's Medicaid Managed Care",
        description:
          "Arizona Health Care Cost Containment System (AHCCCS) has been a fully capitated managed care Medicaid program since 1982 — the nation's first — and is the operational template that most states have followed when designing managed care programs. AHCCCS covers 2.2 million members through multiple MCOs by geographic service area, integrating physical health, behavioral health (for most populations), and LTSS.",
        type: "State Program",
        status: "Active",
        year: 1982,
        externalUrl: "https://www.azahcccs.gov/",
        tags: ["Medicaid", "managed care", "AHCCCS", "capitation", "national model"],
      },
      {
        id: "az-sdoh-waiver",
        name: "Arizona SDOH 1115 Waiver (2023)",
        description:
          "Arizona secured one of the most comprehensive SDOH 1115 waivers in the country in 2023, adding Medicaid-funded services for housing (tenancy support, utility assistance, temporary housing), food insecurity (food vouchers, medically tailored meals), and caregiver support. The waiver also expands AHCCCS community health worker services for high-risk members.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 2023,
        externalUrl: "https://www.azahcccs.gov/Resources/Federal/waiver.html",
        tags: ["SDOH", "1115 waiver", "housing", "food", "community health workers"],
      },
    ],
  },

  utah: {
    stateId: "utah",
    stateName: "Utah",
    stateAbbr: "UT",
    region: "West",
    heroColor: "bg-red-100 text-red-800",
    summary:
      "Utah voters approved Proposition 3 in 2018 for full Medicaid expansion; the legislature passed a limited expansion first, then switched to full expansion in January 2020 under court and public pressure. Utah has also been a leader in Medicaid LTSS reform through its waiver programs.",
    initiatives: [
      {
        id: "ut-medicaid-expansion",
        name: "Medicaid Expansion (Proposition 3)",
        description:
          "Utah voters approved Proposition 3 for full Medicaid expansion in November 2018. The legislature initially enacted a partial expansion; after the courts ruled Proposition 3's implementation must proceed, full expansion launched January 1, 2020 covering 40,000+ adults. The expansion has been associated with significant reductions in uncompensated care at Utah's rural hospitals.",
        type: "State Law",
        status: "Active",
        year: 2020,
        externalUrl: "https://medicaid.utah.gov/medicaid-expansion/",
        tags: ["Medicaid expansion", "coverage", "Proposition 3", "rural hospitals"],
      },
      {
        id: "ut-choices-program",
        name: "Medicaid LTSS Waiver / Choices Program",
        description:
          "Utah's HCBS waivers provide home and community-based long-term services and supports for elderly individuals and adults with physical disabilities as an alternative to nursing facility placement. Utah has invested in rebalancing its LTSS system toward home-based care, significantly expanding HCBS capacity over the past decade.",
        type: "Medicaid Waiver",
        status: "Active",
        year: 1998,
        externalUrl: "https://medicaid.utah.gov/choices-program/",
        tags: ["LTSS", "HCBS", "waiver", "elderly", "community-based care"],
      },
    ],
  },

  new_mexico: {
    stateId: "new_mexico",
    stateName: "New Mexico",
    stateAbbr: "NM",
    region: "West",
    heroColor: "bg-amber-100 text-amber-800",
    summary:
      "New Mexico has one of the highest Medicaid enrollment rates in the country — over 40% of its population is enrolled — due to its high poverty rate and early expansion. New Mexico's Centennial Care program integrates managed care with tribal health provisions and has been a model for Native American health care integration.",
    initiatives: [
      {
        id: "nm-centennial-care",
        name: "Centennial Care 2.0 — Integrated Medicaid Managed Care",
        description:
          "New Mexico's Centennial Care program integrates physical health, behavioral health, LTSS, and pharmacy for 900,000+ Medicaid members through four MCOs. The 2022 Centennial Care 2.0 contract adds enhanced behavioral health requirements, social needs screening, community health worker services, and strengthened tribal consultation provisions. New Mexico has also developed SDOH waiver authorities to fund food, housing, and transportation.",
        type: "State Program",
        status: "Active",
        year: 2014,
        externalUrl: "https://www.hsd.state.nm.us/mad/centennial-care/",
        tags: ["Medicaid", "managed care", "tribal health", "LTSS", "SDOH"],
      },
      {
        id: "nm-intergovernmental-agreements",
        name: "Tribal Health Authority Agreements",
        description:
          "New Mexico has developed intergovernmental agreements with 19 federally recognized tribes and pueblos, allowing Indian Health Service and tribal facilities to bill Medicaid without the federal third-party liability limitations. This increases Medicaid reimbursement flowing to tribal health programs and reduces cost-shifting to IHS.",
        type: "Multi-Payer",
        status: "Active",
        year: 2014,
        externalUrl: "https://www.ihs.gov/",
        tags: ["tribal health", "Native American", "IHS", "Medicaid billing", "intergovernmental"],
      },
    ],
  },

  idaho: {
    stateId: "idaho",
    stateName: "Idaho",
    stateAbbr: "ID",
    region: "West",
    heroColor: "bg-slate-100 text-slate-800",
    summary:
      "Idaho voters approved Proposition 2 for Medicaid expansion in 2018 and expansion launched in 2020 after the legislature attempted to add work requirements. Idaho's program is fee-for-service rather than managed care, and the state has focused on telehealth expansion to address rural provider shortages.",
    initiatives: [
      {
        id: "id-medicaid-expansion",
        name: "Idaho Medicaid Expansion (Proposition 2)",
        description:
          "Idaho voters approved Proposition 2 for full Medicaid expansion in November 2018 by a 61% margin. The legislature initially passed an expansion bill with work requirements; after CMS refused to approve them, standard expansion launched January 1, 2020 covering 100,000+ adults. Idaho's expansion reduced the uninsured rate significantly in rural Magic Valley and Panhandle communities.",
        type: "State Law",
        status: "Active",
        year: 2020,
        externalUrl: "https://healthandwelfare.idaho.gov/services-programs/medicaid",
        tags: ["Medicaid expansion", "coverage", "Proposition 2", "rural"],
      },
      {
        id: "id-telehealth-expansion",
        name: "Idaho Telehealth Program",
        description:
          "Idaho has expanded Medicaid telehealth coverage to nearly all services that can be appropriately delivered remotely — maintaining COVID-era flexibilities permanently. Idaho's rural geography and provider shortage make telehealth a critical access strategy, particularly for behavioral health services in the state's many frontier counties.",
        type: "State Program",
        status: "Active",
        year: 2021,
        externalUrl: "https://healthandwelfare.idaho.gov/services-programs/medicaid/providers/telehealth",
        tags: ["telehealth", "rural health", "behavioral health", "access", "frontier"],
      },
    ],
  },

  montana: {
    stateId: "montana",
    stateName: "Montana",
    stateAbbr: "MT",
    region: "West",
    heroColor: "bg-blue-100 text-blue-800",
    summary:
      "Montana expanded Medicaid through the HELP Act in 2016 with healthy behavior incentives, and voters permanently extended expansion via LR-128 in 2018. Montana operates a unique primary care case management model rather than full managed care, and has significant tribal health partnerships.",
    initiatives: [
      {
        id: "mt-help-act",
        name: "HELP Act Medicaid Expansion",
        description:
          "Montana's Healthcare for Montana Families (HELP Act) expanded Medicaid in 2016 with a workforce development component requiring able-bodied enrollees to complete skills training. Voters permanently extended expansion via LR-128 in 2018 (with strong bipartisan support), and the legislature made it permanent in 2019. The expansion covers 95,000+ adults.",
        type: "State Law",
        status: "Active",
        year: 2016,
        externalUrl: "https://dphhs.mt.gov/MontanaHealthcarePrograms/HELP",
        tags: ["Medicaid expansion", "HELP Act", "workforce", "coverage"],
      },
      {
        id: "mt-tribal-medicaid",
        name: "Montana Tribal Medicaid Partnership",
        description:
          "Montana has developed one of the strongest state-tribal Medicaid partnerships in the country, with enhanced intergovernmental transfer arrangements that increase federal Medicaid reimbursement to the seven federally recognized tribes' health programs. Montana also funds Tribal Epidemiology Centers to address health disparities in Native communities.",
        type: "Multi-Payer",
        status: "Active",
        year: 2010,
        externalUrl: "https://dphhs.mt.gov/MontanaHealthcarePrograms/BillersProviders/TribalProvider.aspx",
        tags: ["tribal health", "Native American", "IHS", "intergovernmental transfer", "Medicaid"],
      },
    ],
  },

  wyoming: {
    stateId: "wyoming",
    stateName: "Wyoming",
    stateAbbr: "WY",
    region: "West",
    heroColor: "bg-amber-100 text-amber-800",
    summary:
      "Wyoming is the only state that has not expanded Medicaid and has resisted expansion bills multiple legislative sessions. It operates one of the smallest Medicaid programs in the country. Wyoming's geographic challenges — a state with more antelope than people per square mile — make telehealth and critical access hospital sustainability essential.",
    initiatives: [
      {
        id: "wy-critical-access-hospitals",
        name: "Wyoming Critical Access Hospital Support",
        description:
          "Wyoming has 18 critical access hospitals covering a state larger than Colorado but with only 580,000 residents. The state provides supplemental Medicaid payments and has worked with the Flex Program to prevent closures. Wyoming's CAHs provide the only emergency and obstetric care within 100+ miles for many communities.",
        type: "State Program",
        status: "Active",
        year: 2005,
        externalUrl: "https://health.wyo.gov/publichealth/rural-health/",
        tags: ["critical access hospitals", "rural health", "emergency care", "obstetrics"],
      },
      {
        id: "wy-telehealth",
        name: "Wyoming Medicaid Telehealth Expansion",
        description:
          "Wyoming permanently expanded Medicaid telehealth coverage post-COVID to include behavioral health, primary care, and specialty visits delivered via video. Given Wyoming's vast rural geography, telehealth is particularly critical for behavioral health access — the state has a severe shortage of psychiatrists and psychologists.",
        type: "State Program",
        status: "Active",
        year: 2021,
        externalUrl: "https://health.wyo.gov/healthcarefin/medicaid/",
        tags: ["telehealth", "rural health", "behavioral health", "psychiatric access"],
      },
    ],
  },

  alaska: {
    stateId: "alaska",
    stateName: "Alaska",
    stateAbbr: "AK",
    region: "West",
    heroColor: "bg-sky-100 text-sky-800",
    summary:
      "Alaska expanded Medicaid by executive action in 2015 and has maintained expansion through multiple gubernatorial transitions. Alaska is a pioneer in telehealth and store-and-forward medical technology — out of necessity, given that hundreds of communities are only accessible by air or water and have no year-round road access.",
    initiatives: [
      {
        id: "ak-medicaid-expansion",
        name: "Alaska Medicaid Expansion (2015)",
        description:
          "Governor Walker expanded Medicaid by executive action on September 1, 2015, covering 40,000+ Alaskans. The expansion significantly improved access to behavioral health treatment, dental care, and preventive services for Alaska Native communities. Alaska's uninsured rate dropped from 18% to 11% following expansion.",
        type: "State Law",
        status: "Active",
        year: 2015,
        externalUrl: "https://dhss.alaska.gov/dpa/Pages/medicaid/default.aspx",
        tags: ["Medicaid expansion", "coverage", "Alaska Native", "behavioral health"],
      },
      {
        id: "ak-store-forward",
        name: "Alaska Telehealth & Store-and-Forward Program",
        description:
          "Alaska has been a global pioneer in store-and-forward telehealth — digital transmission of medical images, patient records, and clinical data to specialists for asynchronous review — since the late 1990s. Community health aides in remote villages transmit clinical data to hub hospitals for specialist review, enabling specialty care without air transport. The Alaska Native Tribal Health Consortium's telehealth system is internationally recognized.",
        type: "State Program",
        status: "Active",
        year: 1999,
        externalUrl: "https://www.anthc.org/community-health-aides/",
        tags: ["telehealth", "store-and-forward", "remote access", "Alaska Native", "community health aides"],
      },
    ],
  },

  hawaii: {
    stateId: "hawaii",
    stateName: "Hawaii",
    stateAbbr: "HI",
    region: "West",
    heroColor: "bg-emerald-100 text-emerald-800",
    summary:
      "Hawaii has had near-universal health coverage since 1974 — the earliest state mandate in the country. Hawaii's Prepaid Health Care Act requires employer coverage, QUEST Integration provides comprehensive Medicaid managed care, and the state has among the nation's lowest uninsured rates (2.5%). Hawaii's challenge is cost containment, not access.",
    initiatives: [
      {
        id: "hi-prepaid-healthcare",
        name: "Hawaii Prepaid Health Care Act (1974)",
        description:
          "Hawaii's Prepaid Health Care Act requires employers to provide health insurance to employees working 20+ hours per week — enacted in 1974, 36 years before the ACA. The law was grandfathered from ERISA preemption. It has maintained Hawaii's near-universal coverage for working-age adults and their dependents for five decades, making Hawaii the first 'universal coverage' state in the country.",
        type: "State Law",
        status: "Active",
        year: 1974,
        externalUrl: "https://labor.hawaii.gov/dcd/home/about-prepaid-health-care/",
        tags: ["employer mandate", "universal coverage", "ERISA grandfathering", "national first"],
      },
      {
        id: "hi-quest-integration",
        name: "QUEST Integration Medicaid Managed Care",
        description:
          "Hawaii's QUEST Integration program provides comprehensive managed care for 370,000+ Medicaid members through two managed care organizations (UnitedHealthcare and WellCare). QUEST Integration is notable for covering physical health, behavioral health, oral health, and LTSS under a single integrated contract. Hawaii's Medicaid program operates with one of the highest managed care penetration rates nationally.",
        type: "State Program",
        status: "Active",
        year: 2014,
        externalUrl: "https://medquest.hawaii.gov/",
        tags: ["Medicaid", "managed care", "QUEST", "oral health", "LTSS integration"],
      },
    ],
  },
};

// Convenience helpers
export function getStateInitiatives(stateId: string): StateInitiativesProfile | null {
  return STATE_INITIATIVES[stateId] ?? null;
}

export function getAllStateInitiatives(): StateInitiativesProfile[] {
  return Object.values(STATE_INITIATIVES)
    .filter((s) => s.initiatives.length > 0)
    .sort((a, b) => a.stateName.localeCompare(b.stateName));
}
