// ─────────────────────────────────────────────────────────────────────────────
// ACT 167 POLICY SIMULATION ENGINE — Synthetic Data Module
// Based on Oliver Wyman Report "Act 167 Community Engagement: Recommendations"
// Aug 2024 | Synthetic data used where actuals unavailable
// ─────────────────────────────────────────────────────────────────────────────

export type HospitalUrgency = "urgent" | "major" | "significant" | "modest";
export type PillarKey = "policy" | "technology" | "financial" | "equity" | "clinical";

export interface Hospital {
  id: string;
  name: string;
  shortName: string;
  city: string;
  hsa: string; // Hospital Service Area (Vermont Department of Health)
  hospitalType: "Acute Care" | "Critical Access";
  urgency: HospitalUrgency; // HTR rule: Oliver Wyman at-risk list -> urgent; else 2023 margin < -3% major, < 0 significant, >= 0 modest
  lat: number;
  lng: number;
  beds: number; // CMS cost report FY2023
  annualAdmissions: number; // total discharges, CMS cost report FY2023
  annualEDVisits: number; // 2022, Oliver Wyman hospital pages
  edAvoidablePct: number; // % of 2022 ED visits potentially avoidable, Oliver Wyman
  operatingMarginPct: number; // FY2023, Oliver Wyman (negative = loss)
  annualLossM: number; // $M FY2023 operating loss, Oliver Wyman (0 if profitable)
  projectedLoss2028M: number; // $M FY2028 loss, Oliver Wyman, 5% expense-growth scenario
  projectedLoss2028HighM: number; // $M FY2028 loss, Oliver Wyman, 7-8% expense-growth scenario
  coes: string[]; // Oliver Wyman recommended Centers of Excellence (empty = "further discussion")
  affiliation: string;
  populationHSA: number; // Vermont Department of Health, July 1 2025
  popOver65Pct: number; // same source
  fteCount: number; // FTE employees on payroll, CMS cost report FY2023
  cmsStarRating: number | null; // CMS overall hospital star rating (Care Compare); null = not rated
}

export const HOSPITAL_DATA_SOURCES = [
  "Oliver Wyman, Act 167 Community Engagement: Recommendations (rev. Oct 21, 2024), hospital pages — FY2023 margins and losses, 2022 ED visits, FY2028 projections, COEs",
  "CMS Hospital Provider Cost Report, FY2023 — beds, discharges, FTEs",
  "Vermont Department of Health, population by Hospital Service Area, July 1, 2025",
  "CMS Care Compare, Hospital General Information — hospital type and overall star rating",
];

/** Straight-line distance (km) to the nearest other hospital, computed from coordinates. */
export function kmToNearestHospital(h: Hospital): number {
  const R = 6371, rad = (d: number) => (d * Math.PI) / 180;
  let best = Infinity;
  for (const o of HOSPITALS) {
    if (o.id === h.id) continue;
    const dLat = rad(o.lat - h.lat), dLng = rad(o.lng - h.lng);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(h.lat)) * Math.cos(rad(o.lat)) * Math.sin(dLng / 2) ** 2;
    best = Math.min(best, 2 * R * Math.asin(Math.sqrt(a)));
  }
  return Math.round(best);
}

export const HOSPITALS: Hospital[] = [
  {
    id: "uvmmc", name: "UVM Medical Center", shortName: "UVMMC", city: "Burlington", hsa: "Burlington",
    hospitalType: "Acute Care", urgency: "modest",
    lat: 44.4759, lng: -73.2121,
    beds: 448, annualAdmissions: 20252, annualEDVisits: 34314, edAvoidablePct: 26.9,
    operatingMarginPct: 3.1, annualLossM: 0, projectedLoss2028M: 105, projectedLoss2028HighM: 486.4,
    coes: ["Cancer Surgery (Complex)", "Cancer Surgery (Non-Complex)", "Robotic Surgery", "Minimally Invasive Surgery", "Infusion Therapy Clinic", "Neurology", "Radiation Therapy", "Orthopedics", "Rheumatology", "Obstetrics", "Psych-Adolescent", "Psych-Adult", "Geriatric Care", "Hospice", "Memory Care", "Rehabilitation"],
    affiliation: "UVM Health Network", populationHSA: 189898, popOver65Pct: 19.5, fteCount: 7475,
    cmsStarRating: 4,
  },
  {
    id: "rrmc", name: "Rutland Regional Medical Center", shortName: "RRMC", city: "Rutland", hsa: "Rutland",
    hospitalType: "Acute Care", urgency: "modest",
    lat: 43.6106, lng: -72.9726,
    beds: 142, annualAdmissions: 5482, annualEDVisits: 18216, edAvoidablePct: 28.4,
    operatingMarginPct: 2.1, annualLossM: 0, projectedLoss2028M: 20.6, projectedLoss2028HighM: 79.9,
    coes: ["Acute General Surgery", "Geriatric Care", "Minimally Invasive Surgery", "Neurology", "Psych-Adult"],
    affiliation: "Independent", populationHSA: 60368, popOver65Pct: 28.0, fteCount: 1306,
    cmsStarRating: 3,
  },
  {
    id: "svmc", name: "Southwestern Vermont Medical Center", shortName: "SVMC", city: "Bennington", hsa: "Bennington",
    hospitalType: "Acute Care", urgency: "major",
    lat: 42.8734, lng: -73.1971,
    beds: 53, annualAdmissions: 2828, annualEDVisits: 22272, edAvoidablePct: 25.4,
    operatingMarginPct: -3.8, annualLossM: 7.4, projectedLoss2028M: 24.5, projectedLoss2028HighM: 58.0,
    coes: ["Cancer Surgery (Non-Complex)", "Geriatric Care", "Infusion Therapy Clinic", "Minimally Invasive Surgery", "Orthopedics", "Psych-Adult", "Psych-Adolescent", "Radiation Therapy", "Rheumatology"],
    affiliation: "Dartmouth Health", populationHSA: 40237, popOver65Pct: 28.1, fteCount: 823,
    cmsStarRating: 3,
  },
  {
    id: "cvmc", name: "Central Vermont Medical Center", shortName: "CVMC", city: "Berlin", hsa: "Barre",
    hospitalType: "Acute Care", urgency: "major",
    lat: 44.1951, lng: -72.58,
    beds: 88, annualAdmissions: 3514, annualEDVisits: 16376, edAvoidablePct: 31.2,
    operatingMarginPct: -6.5, annualLossM: 17.8, projectedLoss2028M: 44.0, projectedLoss2028HighM: 74.3,
    coes: ["Geriatric Care", "Infusion Therapy Clinic", "Neurology", "Psych-Adult", "Radiation Therapy"],
    affiliation: "UVM Health Network", populationHSA: 67856, popOver65Pct: 23.8, fteCount: 1297,
    cmsStarRating: 3,
  },
  {
    id: "bmh", name: "Brattleboro Memorial Hospital", shortName: "BMH", city: "Brattleboro", hsa: "Brattleboro",
    hospitalType: "Acute Care", urgency: "significant",
    lat: 42.8509, lng: -72.5579,
    beds: 47, annualAdmissions: 2010, annualEDVisits: 7540, edAvoidablePct: 29.4,
    operatingMarginPct: -1.7, annualLossM: 1.9, projectedLoss2028M: 12.4, projectedLoss2028HighM: 29.8,
    coes: ["Acute General Surgery", "Cancer Surgery (Non-Complex)", "Geriatric Care", "Orthopedics", "Rheumatology", "Robotic Surgery"],
    affiliation: "Independent", populationHSA: 33290, popOver65Pct: 27.8, fteCount: 519,
    cmsStarRating: 3,
  },
  {
    id: "nmc", name: "Northwestern Medical Center", shortName: "NMC", city: "St. Albans", hsa: "St. Albans",
    hospitalType: "Acute Care", urgency: "major",
    lat: 44.812, lng: -73.0832,
    beds: 53, annualAdmissions: 2301, annualEDVisits: 15719, edAvoidablePct: 32.7,
    operatingMarginPct: -6.6, annualLossM: 8.2, projectedLoss2028M: 20.9, projectedLoss2028HighM: 44.4,
    coes: ["Cancer Surgery (Non-Complex)", "Infusion Therapy Clinic", "Neurology", "Radiation Therapy"],
    affiliation: "Independent", populationHSA: 46985, popOver65Pct: 21.4, fteCount: 566,
    cmsStarRating: 4,
  },
  {
    id: "nvrh", name: "Northeastern Vermont Regional Hospital", shortName: "NVRH", city: "St. Johnsbury", hsa: "St. Johnsbury",
    hospitalType: "Critical Access", urgency: "modest",
    lat: 44.422, lng: -72.0156,
    beds: 25, annualAdmissions: 1331, annualEDVisits: 9128, edAvoidablePct: 32.7,
    operatingMarginPct: 0.5, annualLossM: 0, projectedLoss2028M: 5.2, projectedLoss2028HighM: 19.2,
    coes: ["Cancer Surgery (Non-Complex)", "Infusion Therapy Clinic", "Minimally Invasive Surgery", "Radiation Therapy"],
    affiliation: "Independent", populationHSA: 27742, popOver65Pct: 25.7, fteCount: 390,
    cmsStarRating: 3,
  },
  {
    id: "copley", name: "Copley Hospital", shortName: "Copley", city: "Morrisville", hsa: "Morrisville",
    hospitalType: "Critical Access", urgency: "significant",
    lat: 44.5537, lng: -72.6243,
    beds: 25, annualAdmissions: 1380, annualEDVisits: 8783, edAvoidablePct: 32.8,
    operatingMarginPct: -1.8, annualLossM: 1.7, projectedLoss2028M: 7.0, projectedLoss2028HighM: 16.5,
    coes: ["Orthopedics", "Rheumatology"],
    affiliation: "Independent", populationHSA: 27986, popOver65Pct: 23.6, fteCount: 404,
    cmsStarRating: 2,
  },
  {
    id: "springfield", name: "Springfield Hospital", shortName: "SRH", city: "Springfield", hsa: "Springfield",
    hospitalType: "Critical Access", urgency: "urgent",
    lat: 43.2937, lng: -72.4812,
    beds: 25, annualAdmissions: 584, annualEDVisits: 13191, edAvoidablePct: 30.5,
    operatingMarginPct: -0.9, annualLossM: 0.6, projectedLoss2028M: 5.0, projectedLoss2028HighM: 10.4,
    coes: ["Memory Care", "Psych-Adult"],
    affiliation: "Independent", populationHSA: 27880, popOver65Pct: 29.5, fteCount: 244,
    cmsStarRating: null,
  },
  {
    id: "grace-cottage", name: "Grace Cottage Family Health & Hospital", shortName: "GCH", city: "Townshend", hsa: "Brattleboro (Townshend)",
    hospitalType: "Critical Access", urgency: "urgent",
    lat: 43.0537, lng: -72.6654,
    beds: 19, annualAdmissions: 102, annualEDVisits: 3637, edAvoidablePct: 31.0,
    operatingMarginPct: -8.9, annualLossM: 2.3, projectedLoss2028M: 4.6, projectedLoss2028HighM: 9.9,
    coes: [],
    affiliation: "Independent", populationHSA: 33290, popOver65Pct: 27.8, fteCount: 133,
    cmsStarRating: null,
  },
  {
    id: "gifford", name: "Gifford Medical Center", shortName: "GMC", city: "Randolph", hsa: "Randolph",
    hospitalType: "Critical Access", urgency: "urgent",
    lat: 43.9248, lng: -72.6618,
    beds: 25, annualAdmissions: 815, annualEDVisits: 5146, edAvoidablePct: 28.5,
    operatingMarginPct: -8.3, annualLossM: 4.7, projectedLoss2028M: 1.3, projectedLoss2028HighM: 6.0,
    coes: [],
    affiliation: "Independent", populationHSA: 14550, popOver65Pct: 28.4, fteCount: 310,
    cmsStarRating: 5,
  },
  {
    id: "north-country", name: "North Country Hospital", shortName: "NCH", city: "Newport", hsa: "Newport",
    hospitalType: "Critical Access", urgency: "urgent",
    lat: 44.937, lng: -72.2046,
    beds: 25, annualAdmissions: 1363, annualEDVisits: 10748, edAvoidablePct: 37.0,
    operatingMarginPct: -8.9, annualLossM: 8.8, projectedLoss2028M: 17.3, projectedLoss2028HighM: 28.9,
    coes: [],
    affiliation: "Independent", populationHSA: 28148, popOver65Pct: 26.3, fteCount: 349,
    cmsStarRating: 1,
  },
  {
    id: "mt-ascutney", name: "Mt. Ascutney Hospital and Health Center", shortName: "MAHHC", city: "Windsor", hsa: "White River Junction",
    hospitalType: "Critical Access", urgency: "modest",
    lat: 43.4793, lng: -72.3898,
    beds: 25, annualAdmissions: 319, annualEDVisits: 3666, edAvoidablePct: 36.1,
    operatingMarginPct: 2.0, annualLossM: 0, projectedLoss2028M: 1.4, projectedLoss2028HighM: 8.2,
    coes: ["Rehabilitation"],
    affiliation: "Dartmouth Health", populationHSA: 50236, popOver65Pct: 26.6, fteCount: 317,
    cmsStarRating: null,
  },
  {
    id: "porter", name: "Porter Medical Center", shortName: "PMC", city: "Middlebury", hsa: "Middlebury",
    hospitalType: "Critical Access", urgency: "modest",
    lat: 44.0159, lng: -73.1673,
    beds: 25, annualAdmissions: 1545, annualEDVisits: 11876, edAvoidablePct: 31.2,
    operatingMarginPct: 7.6, annualLossM: 0, projectedLoss2028M: 3.5, projectedLoss2028HighM: 10.8,
    coes: [],
    affiliation: "UVM Health Network", populationHSA: 29487, popOver65Pct: 26.1, fteCount: 467,
    cmsStarRating: 3,
  },
];

// ── Recommendations Data ───────────────────────────────────────────────────

export type RecommendationCategory =
  | "governance"
  | "at-risk-restructuring"
  | "coe-regionalization"
  | "cost-reduction"
  | "technology"
  | "workforce"
  | "equity-access"
  | "payment-reform"
  | "uvmmc-reform";

export interface PillarImpact {
  score: number; // 0–100 (positive impact magnitude)
  direction: "positive" | "mixed" | "negative";
  headline: string;
  actions: string[];
  timeline: string;
  investmentM?: number;
  annualSavingsM?: number;
  riskLevel: "low" | "medium" | "high";
}

export interface Recommendation {
  id: string;
  category: RecommendationCategory;
  title: string;
  shortTitle: string;
  description: string;
  sourceHospitals: string[]; // hospital IDs
  priority: "critical" | "high" | "medium";
  implementationYears: [number, number]; // start, end year from 2025
  pillars: Record<PillarKey, PillarImpact>;
  syntheticNote?: string;
}

export const RECOMMENDATIONS: Recommendation[] = [
  // ── GOVERNANCE ──────────────────────────────────────────────────────────
  {
    id: "gov-01",
    category: "governance",
    title: "Establish AHS/GMCB Project Management Office (PMO)",
    shortTitle: "AHS/GMCB PMO",
    description:
      "Clarify governance roles between AHS and GMCB, fund additional staff, and establish a Project Management Office with analytic and facilitation support to drive transformation.",
    sourceHospitals: [],
    priority: "critical",
    implementationYears: [0, 1],
    pillars: {
      policy: {
        score: 90, direction: "positive",
        headline: "Legislative mandate required to fund PMO; GMCB enabling legislation needed",
        actions: [
          "Pass enabling legislation clarifying AHS/GMCB jurisdiction boundaries",
          "Appropriate $4–6M biennially for PMO operations",
          "Hire Division of Planning and Effectiveness director",
          "Establish inter-agency MOU between AHS and GMCB",
          "Develop standardized reporting framework for all 14 hospitals",
        ],
        timeline: "Year 1 (2025–2026)", investmentM: 5.5, annualSavingsM: 0, riskLevel: "medium",
      },
      technology: {
        score: 60, direction: "positive",
        headline: "Unified analytics platform required; GMCB dashboard modernization",
        actions: [
          "Deploy secure PMO data analytics platform ($1.2M)",
          "Integrate GMCB financial data systems with AHS administrative data",
          "Develop hospital performance monitoring dashboard",
          "Automate monthly financial reporting from all hospitals",
        ],
        timeline: "Year 1–2 (2025–2027)", investmentM: 2.8, annualSavingsM: 0.4, riskLevel: "low",
      },
      financial: {
        score: 55, direction: "positive",
        headline: "Coordination savings of $12–18M annually once fully operational",
        actions: [
          "PMO investment: $5.5M setup + $3.2M/yr operating",
          "Projected system-wide savings from coordinated procurement: $8–12M/yr",
          "Reduced duplication in state agency spending: $4–6M/yr",
          "No AHEAD technical-assistance offset: Vermont withdrew from the AHEAD Model in July 2026",
        ],
        timeline: "Break-even Year 3", investmentM: 5.5, annualSavingsM: 12, riskLevel: "low",
      },
      equity: {
        score: 70, direction: "positive",
        headline: "Monitoring framework will track equity metrics across all hospitals and communities",
        actions: [
          "Mandate equity scorecards for all 14 hospitals",
          "Track access to services by income, race, geography, disability",
          "Publish quarterly public dashboard on access disparities",
          "Require hospitals to submit equity improvement plans annually",
        ],
        timeline: "Year 2 (2026–2027)", investmentM: 0.8, annualSavingsM: 0, riskLevel: "low",
      },
      clinical: {
        score: 65, direction: "positive",
        headline: "System-wide quality alignment through standardized metrics and payment linkage",
        actions: [
          "Establish Quality/Access/Equity metric set aligned across all payers",
          "Link PMO monitoring to hospital budget review process",
          "Require clinical productivity benchmarking (>60th percentile)",
          "Track low-volume procedure safety at all sites",
        ],
        timeline: "Year 2–3", investmentM: 0.5, annualSavingsM: 0, riskLevel: "low",
      },
    },
  },

  // ── AT-RISK RESTRUCTURING ────────────────────────────────────────────────
  {
    id: "atrisk-01",
    category: "at-risk-restructuring",
    title: "Springfield Hospital: Convert to Rural Emergency Hospital (REH)",
    shortTitle: "Springfield → REH",
    description:
      "Convert Springfield Hospital's 25 acute inpatient beds to a Rural Emergency Hospital model with 2 IP beds + SNF, 24-hour ED, ambulatory surgery, and free-standing diagnostic/pharmacy. Expand psychiatry and memory care.",
    sourceHospitals: ["springfield"],
    priority: "critical",
    implementationYears: [0, 2],
    pillars: {
      policy: {
        score: 75, direction: "positive",
        headline: "REH designation requires CMS approval; GMCB hospital budget renegotiation required",
        actions: [
          "Apply for CMS Rural Emergency Hospital (REH) designation per 42 CFR § 485.500",
          "Negotiate new GMCB global budget for REH operating model",
          "Amend CON (Certificate of Need) for bed reduction and service reconfiguration",
          "Establish transfer agreements with RRMC (38 min), BMH (45 min), and UVMMC",
          "Coordinate with Springfield EMS for enhanced transfer protocols",
          "Engage community stakeholders via 6-month engagement process (Act 167 mandate)",
          "Obtain state Medicaid REH carve-out payment rates",
        ],
        timeline: "Year 1–2 (2025–2027)", investmentM: 0.8, annualSavingsM: 0, riskLevel: "high",
      },
      technology: {
        score: 65, direction: "positive",
        headline: "Telehealth infrastructure and EHR upgrade critical for REH viability",
        actions: [
          "Deploy 24/7 telemedicine backup for ED physician coverage ($180K/yr)",
          "Upgrade EHR to Epic (align with UVMMC network): $1.4M",
          "Install remote patient monitoring for 2 IP beds and SNF",
          "Establish secure data link with regional center for radiology teleread",
          "Install broadband upgrade (Starlink or fiber) for rural connectivity: $85K",
          "Deploy pharmacy dispensing machine for common non-scheduled drugs",
        ],
        timeline: "Year 1–2", investmentM: 2.1, annualSavingsM: 0.3, riskLevel: "medium",
      },
      financial: {
        score: 68, direction: "positive",
        headline: "REH conversion saves $4.2M/yr vs. current trajectory; requires $6.8M transition investment",
        actions: [
          "Current annual operating loss: $6.8M → REH target: $2.6M loss (58% improvement)",
          "CMS REH supplement payment: +$1.6M/yr vs. critical access",
          "Capital investment for renovation/repurposing: $6.8M (one-time)",
          "Psychiatric expansion (15 adult + 8 adolescent beds): +$3.1M revenue/yr",
          "Joint venture ASC with Brattleboro Memorial: +$900K/yr",
          "PACE program revenue: +$1.2M/yr (150 participants at $8K/yr)",
          "Projected 2028 loss with REH vs. without: $2.6M vs. $14.1M",
        ],
        timeline: "Break-even improvement Year 3", investmentM: 6.8, annualSavingsM: 4.2, riskLevel: "medium",
      },
      equity: {
        score: 55, direction: "mixed",
        headline: "9,500 Springfield HSA residents lose acute inpatient access; psychiatric and elder care improves",
        actions: [
          "Acute IP loss: 640 admissions/yr must transfer — avg 38 min to RRMC",
          "High-risk groups: 29% of HSA population is 65+; 18% no car; 28% low income",
          "Mitigation: Fund dedicated transport for acute transfers (2 vehicles, $380K/yr)",
          "Expand PACE program to 150+ participants in Springfield catchment",
          "Mobile health unit to serve Windham County rural areas (4 days/wk)",
          "Psychiatric beds expansion improves access for historically underserved mental health population",
          "Partner with Springfield EMS for enhanced community paramedicine program",
        ],
        timeline: "Year 1–3", investmentM: 1.8, annualSavingsM: 0, riskLevel: "high",
      },
      clinical: {
        score: 52, direction: "mixed",
        headline: "Loss of 640 acute admissions creates transfer risk; psychiatric expansion improves outcomes",
        actions: [
          "Transfer protocol development: RRMC capacity to absorb 640 additional admissions/yr",
          "Stop low-volume high-risk procedures: colectomy, femoral hernia, hip replacement",
          "Expand Memory Care unit (12 dedicated beds) — aligns with COE designation",
          "Expand adult psychiatry (15 beds) and adolescent psychiatry (8 beds)",
          "Develop 24/7 telehealth ED backup to maintain diagnostic capability",
          "Monthly quality review of all ED-to-transfer cases",
          "Clinical quality benchmarking: track 30-day readmission rates post-transfer",
        ],
        timeline: "Year 2–3", investmentM: 1.2, annualSavingsM: 0, riskLevel: "high",
      },
    },
  },
  {
    id: "atrisk-02",
    category: "at-risk-restructuring",
    title: "Gifford Medical Center: Inpatient Conversion to Mental Health/Memory Care",
    shortTitle: "Gifford → Mental Health COE",
    description:
      "Convert Gifford's acute inpatient beds to mental health (geriatric psychiatry or memory care). Stop low-volume surgical procedures. Form consortium with CVMC for hospital-at-home. Change ED to non-physician model.",
    sourceHospitals: ["gifford"],
    priority: "critical",
    implementationYears: [0, 2],
    pillars: {
      policy: {
        score: 70, direction: "positive",
        headline: "Medicaid psychiatric rate waiver; GMCB budget renegotiation; CON modification needed",
        actions: [
          "Amend CON to convert acute IP beds to psychiatric/memory care",
          "Apply for Medicaid psychiatric carve-out payment rates",
          "Negotiate GMCB budget reflecting new service mix",
          "Establish formal transfer agreements: CVMC (32 min), UVMMC (65 min)",
          "Change ED staffing model to Advanced Practice Provider + physician telehealth backup",
          "Engage Randolph community via Act 167 engagement process",
          "Form New England Collaborative Network CAH consortium with Springfield, Grace Cottage, North Country",
        ],
        timeline: "Year 1–2", investmentM: 0.6, annualSavingsM: 0, riskLevel: "high",
      },
      technology: {
        score: 72, direction: "positive",
        headline: "Telehealth and remote monitoring infrastructure enables safe IP bed conversion",
        actions: [
          "Deploy telepsychiatry platform for all converted beds: $240K",
          "Establish remote monitoring for hospital-at-home program: $420K",
          "EHR integration with CVMC for seamless care coordination",
          "Broadband upgrade for EMT vehicles in Randolph area: $95K",
          "Install telehealth kiosk at Gifford community site for primary care access",
        ],
        timeline: "Year 1–2", investmentM: 1.4, annualSavingsM: 0.2, riskLevel: "medium",
      },
      financial: {
        score: 62, direction: "positive",
        headline: "Conversion reduces annual loss from $4.1M to $1.8M; $3.2M transition investment",
        actions: [
          "Current annual loss: $4.1M → target post-conversion: $1.8M (56% improvement)",
          "Psychiatric bed revenue premium: +$1.1M/yr (15 beds at $280/day vs. $180/day acute)",
          "Eliminate low-volume surgical costs: +$820K/yr savings",
          "Hospital-at-home program with CVMC: +$640K/yr new revenue",
          "CAH consortium back-office savings: +$380K/yr",
          "Capital for bed conversion: $3.2M (one-time)",
        ],
        timeline: "Break-even improvement Year 3", investmentM: 3.2, annualSavingsM: 2.3, riskLevel: "medium",
      },
      equity: {
        score: 50, direction: "mixed",
        headline: "8,000 Randolph HSA residents; 420 acute transfers needed; mental health access improves significantly",
        actions: [
          "420 acute admissions/yr transferred to CVMC (32 min avg) or UVMMC (65 min)",
          "30% of HSA is 65+; 19% no vehicle — high transport vulnerability",
          "Fund Gifford-CVMC transport shuttle ($280K/yr, 5 days/wk)",
          "Memory care expansion addresses rapidly growing elder care gap",
          "Geriatric psychiatry beds address unmet need in rural Central Vermont",
          "Community health worker program: 3 FTEs to serve complex populations",
          "PACE program development (target 80 participants by Year 3)",
        ],
        timeline: "Year 2–3", investmentM: 1.6, annualSavingsM: 0, riskLevel: "high",
      },
      clinical: {
        score: 58, direction: "mixed",
        headline: "420 acute IP transfers; psychiatric care quality improves with dedicated beds",
        actions: [
          "Stop: colectomy, lysis of adhesions, perforated peptic ulcer repair, hernia (except inguinal/femoral)",
          "Evaluate: increase OR stop total hip replacements (volume threshold 25/yr)",
          "Convert: 25 acute beds → 18 psychiatric + 7 memory care beds",
          "Hospital-at-home: serve 60 patients/yr in conjunction with CVMC",
          "Monthly transfer quality review with CVMC medical staff",
          "Maintain 24/7 Emergency Dept. capabilities with APP + telehealth backup",
        ],
        timeline: "Year 1–2", investmentM: 0.8, annualSavingsM: 0, riskLevel: "high",
      },
    },
  },
  {
    id: "atrisk-03",
    category: "at-risk-restructuring",
    title: "North Country Hospital: Community Ambulatory Care Center (CACC)",
    shortTitle: "North Country → CACC",
    description:
      "Convert North Country Hospital to a Community Ambulatory Care Center with SNF/Rehab/Mental Health beds, 16-hour urgent care, and ambulatory surgery. Free-standing diagnostics and pharmacy.",
    sourceHospitals: ["north-country"],
    priority: "critical",
    implementationYears: [1, 3],
    pillars: {
      policy: {
        score: 68, direction: "positive",
        headline: "CACC model requires new state designation; 62-min distance to next hospital is critical equity concern",
        actions: [
          "Create Vermont CACC designation legislation (no federal analog exists)",
          "Negotiate GMCB global budget for CACC model",
          "Apply for Critical Access Hospital federal supplemental payments during transition",
          "Establish air transport agreement with UVMMC for critical cases (Newport has no helipad)",
          "Fund EMS upgrade in Orleans County: 4 advanced life support units ($2.1M)",
          "Engage Newport and Orleans County communities via Act 167 process",
        ],
        timeline: "Year 2–4", investmentM: 2.1, annualSavingsM: 0, riskLevel: "high",
      },
      technology: {
        score: 68, direction: "positive",
        headline: "Remote ICU monitoring and telehealth are essential given 62-min distance to nearest hospital",
        actions: [
          "Deploy remote ICU (eICU) monitoring system: $380K",
          "24/7 telehealth physician coverage for urgent care: $210K/yr",
          "EHR integration with UVMMC network",
          "Starlink satellite broadband for all Newport-area EMS vehicles: $120K",
          "Mobile health unit for Coaticook Valley area (rural Orleans County)",
        ],
        timeline: "Year 1–2", investmentM: 1.8, annualSavingsM: 0.3, riskLevel: "medium",
      },
      financial: {
        score: 55, direction: "positive",
        headline: "CACC model reduces annual loss from $5.6M to $2.8M; $5.4M transition investment",
        actions: [
          "Current annual loss: $5.6M → CACC target: $2.8M (50% improvement)",
          "SNF/Rehab revenue: +$2.1M/yr (30 SNF/rehab beds)",
          "Ambulatory surgery revenue: +$1.4M/yr",
          "Federal CACC supplement (if designated): +$800K/yr",
          "Transition capital: $5.4M for facility renovation",
          "EMS investment partially offset by state EMS regionalization fund",
        ],
        timeline: "Break-even improvement Year 4", investmentM: 5.4, annualSavingsM: 2.8, riskLevel: "high",
      },
      equity: {
        score: 38, direction: "negative",
        headline: "HIGHEST EQUITY RISK: Newport is most isolated at 62 min; 20% no vehicle; 29% low income",
        actions: [
          "780 acute admissions/yr must transfer — avg 62 min to nearest hospital (NVRH)",
          "Critical vulnerability: no vehicle 20% + rural isolation + aging population (29% 65+)",
          "MANDATORY: Fund county medical transport program — 3 vehicles, $450K/yr",
          "MANDATORY: EMS upgrade to ALS level across all Orleans County stations",
          "Establish air medevac protocol for time-critical conditions (STEMI, stroke, major trauma)",
          "Telehealth hub at Newport Community Health Center for specialist access",
          "Implement community health worker program — 4 FTEs for complex care navigation",
          "Partner with Canadian border health services for emergency overflow (Stanstead/Coaticook)",
        ],
        timeline: "MUST precede hospital conversion", investmentM: 3.8, annualSavingsM: 0, riskLevel: "high",
      },
      clinical: {
        score: 45, direction: "mixed",
        headline: "780 acute transfers to NVRH (62 min) — pre-hospital protocols critical; SNF/MH improves",
        actions: [
          "Stop acute IP care; convert to SNF (20 beds) + Rehab (10 beds)",
          "16-hour urgent care replaces 24/7 ED — must develop after-hours telehealth protocol",
          "Maintain ambulatory surgery for low-acuity procedures",
          "Develop NVRH capacity expansion plan to absorb 780 transferred admissions",
          "Implement pre-hospital STEMI, stroke, sepsis protocols with paramedics",
          "Clinical quality monitoring: monthly review of transfer outcomes with NVRH",
          "Target readmission rate <12% for all transferred patients",
        ],
        timeline: "Year 2–3", investmentM: 1.1, annualSavingsM: 0, riskLevel: "high",
      },
    },
  },
  {
    id: "atrisk-04",
    category: "at-risk-restructuring",
    title: "Grace Cottage: Rural Emergency Hospital + Extended Primary Care",
    shortTitle: "Grace Cottage → REH+Primary",
    description:
      "Convert Grace Cottage to Rural Emergency Hospital status, preserve 24-hour ED, expand primary care and telehealth access. Develop mobile health unit for southern Windham County.",
    sourceHospitals: ["grace-cottage"],
    priority: "critical",
    implementationYears: [0, 2],
    pillars: {
      policy: {
        score: 72, direction: "positive",
        headline: "CMS REH designation; Vermont's most geographically isolated rural community",
        actions: [
          "Apply for CMS REH designation for Grace Cottage",
          "Negotiate GMCB budget for REH + FQHC co-location model",
          "Explore FQHC (Federally Qualified Health Center) designation for primary care arm",
          "Establish transfer agreements with BMH (45 min) and UVMMC (90 min)",
          "Community engagement for Townshend and southern Windham County",
          "Apply for Rural Health Transformation grants (HHS HRSA) — potential $2M",
        ],
        timeline: "Year 1–2", investmentM: 0.5, annualSavingsM: 0, riskLevel: "medium",
      },
      technology: {
        score: 78, direction: "positive",
        headline: "Telehealth is critical enabler for Grace Cottage given extreme rural isolation",
        actions: [
          "Deploy telehealth kiosk and specialist video consult platform: $160K",
          "Starlink broadband for ED and primary care: $65K setup",
          "Remote monitoring for high-risk chronic disease patients (diabetes, CHF, COPD)",
          "EHR integration with BMH for coordinated care",
          "Mobile health unit with on-board diagnostics (X-ray, ultrasound, lab): $480K",
        ],
        timeline: "Year 1", investmentM: 1.2, annualSavingsM: 0.2, riskLevel: "low",
      },
      financial: {
        score: 58, direction: "positive",
        headline: "REH + FQHC model reduces annual loss from $3.2M to $1.1M; HRSA grants key",
        actions: [
          "Current annual loss: $3.2M → REH+FQHC target: $1.1M (66% improvement)",
          "FQHC cost-based reimbursement: +$1.4M/yr revenue increase",
          "CMS REH supplement: +$600K/yr",
          "HRSA Rural Health grant funding: +$400K/yr (5-yr award)",
          "Capital conversion investment: $2.8M",
        ],
        timeline: "Break-even improvement Year 3", investmentM: 2.8, annualSavingsM: 2.1, riskLevel: "medium",
      },
      equity: {
        score: 48, direction: "mixed",
        headline: "5,500 residents; 52-min to BMH; 32% over 65; 22% no car — highest elder vulnerability",
        actions: [
          "310 acute admissions/yr transfer to BMH (52 min) or UVMMC (90 min)",
          "32% of HSA is 65+ — highest rate in Vermont — requires elder-specific transport",
          "22% no vehicle — requires ride program (partner with NCAT/VTrans rural transit)",
          "Mobile health unit covers 4 Windham County towns weekly",
          "PACE program (target 60 participants) addresses elder care gap",
          "Spanish and Bosnian language services for seasonal agricultural workers",
        ],
        timeline: "Year 1–2", investmentM: 1.4, annualSavingsM: 0, riskLevel: "high",
      },
      clinical: {
        score: 60, direction: "mixed",
        headline: "310 acute transfers; primary and preventive care quality improves through FQHC model",
        actions: [
          "Stop colectomy and other low-volume high-complexity surgeries",
          "Expand primary care panel capacity by 40% (add 2 NP/PA FTEs)",
          "Develop 24/7 telehealth specialist consult for ED cases",
          "Preventive care program: diabetes, hypertension, COPD management",
          "Track: 30-day readmission, preventable ED visits, A1c control rates",
        ],
        timeline: "Year 1–3", investmentM: 0.9, annualSavingsM: 0, riskLevel: "medium",
      },
    },
  },

  // ── COE REGIONALIZATION ──────────────────────────────────────────────────
  {
    id: "coe-01",
    category: "coe-regionalization",
    title: "Establish Regional Surgical Centers of Excellence",
    shortTitle: "Surgical COE Network",
    description:
      "Designate 6 Surgical COE sites: UVMMC (complex cancer, robotic), BMH + RRMC (acute general surgery), plus ambulatory surgery centers. Redirect surgical volumes from low-volume sites.",
    sourceHospitals: ["uvmmc", "bmh", "rrmc", "svmc", "nvrh", "nmc"],
    priority: "high",
    implementationYears: [1, 4],
    pillars: {
      policy: {
        score: 80, direction: "positive",
        headline: "COE designation requires GMCB regulatory framework; Certificate of Need modifications",
        actions: [
          "Establish GMCB COE designation regulatory process (new authority needed)",
          "Create volume thresholds for surgical COE qualification (evidence-based)",
          "Develop CON waiver process for COE expansion of surgical capacity",
          "Mandate referral pathways from non-COE EDs to COE sites",
          "Negotiate inter-hospital transfer payment rates",
          "Develop liability framework for transferred surgical patients",
        ],
        timeline: "Year 1–3", investmentM: 1.2, annualSavingsM: 0, riskLevel: "medium",
      },
      technology: {
        score: 75, direction: "positive",
        headline: "Robotic surgery at UVMMC; ambulatory surgical units with advanced imaging",
        actions: [
          "UVMMC robotic surgery expansion: $4.2M (2 additional da Vinci systems)",
          "Build 3 ambulatory surgical units (ASUs) in underserved regions: $12M total",
          "Standardize pre-op/post-op telehealth protocols across all COE sites",
          "Implement surgical outcomes data sharing platform",
          "VITL integration for surgical case data across all sites",
        ],
        timeline: "Year 2–4", investmentM: 18.4, annualSavingsM: 3.2, riskLevel: "medium",
      },
      financial: {
        score: 72, direction: "positive",
        headline: "Surgical consolidation saves $18–22M/yr system-wide; ASUs reduce cost per case 35%",
        actions: [
          "Eliminate inefficient low-volume OR costs at small hospitals: $8M/yr savings",
          "ASU cost per surgical case: 35% lower than hospital-based OR",
          "Increased COE volume improves payer mix and efficiency: $6M/yr",
          "Capital investment for ASU construction: $12M (3 sites)",
          "Payback period: 4.2 years",
          "Maryland model benchmark: 28% surgical cost reduction after COE implementation",
        ],
        timeline: "Break-even Year 4", investmentM: 18.4, annualSavingsM: 18.5, riskLevel: "medium",
      },
      equity: {
        score: 62, direction: "mixed",
        headline: "Surgical access improves for complex cases; some communities face longer travel for routine surgery",
        actions: [
          "Map surgical volume shifts: 2,400 cases/yr redirected to COE sites",
          "Identify communities where travel time to COE exceeds 60 min: 3 HSAs affected",
          "Implement surgical transport voucher program for low-income patients",
          "Mobile pre-op clinic visits to reduce travel burden",
          "Ensure ASU sites are located in underserved corridors (WRJ, Newport, Randolph)",
          "Telehealth pre-op and post-op consultations reduce total travel trips by 40%",
        ],
        timeline: "Year 2–4", investmentM: 2.4, annualSavingsM: 0, riskLevel: "medium",
      },
      clinical: {
        score: 85, direction: "positive",
        headline: "Volume-outcome correlation: COE sites project 18% lower complication rates vs. current low-volume sites",
        actions: [
          "Minimum volume thresholds: complex cancer surgery >50 cases/yr, acute general >100/yr",
          "Stop low-volume high-risk procedures at non-COE sites",
          "Implement standardized surgical protocols across all COE sites",
          "Mandatory morbidity/mortality review across COE network monthly",
          "Track: SSI rate, 30-day readmission, length of stay vs. national benchmarks",
          "Academic evidence: 20% lower mortality at high-volume vs. low-volume centers (Birkmeyer et al.)",
        ],
        timeline: "Year 2–4", investmentM: 1.8, annualSavingsM: 0, riskLevel: "low",
      },
    },
  },
  {
    id: "coe-02",
    category: "coe-regionalization",
    title: "Establish Mental Health Centers of Excellence Network",
    shortTitle: "Mental Health COE Network",
    description:
      "Designate 6 mental health COE sites. Establish mental health ED locations. Repurpose closed inpatient units for psychiatric beds. Brattleboro Retreat remains key capacity.",
    sourceHospitals: ["uvmmc", "bmh", "cvmc", "rrmc", "svmc", "springfield"],
    priority: "critical",
    implementationYears: [0, 3],
    pillars: {
      policy: {
        score: 82, direction: "positive",
        headline: "Vermont faces severe psychiatric bed shortage; AHS DMH coordination essential",
        actions: [
          "AHS DMH to designate Mental Health ED locations statewide",
          "Increase Medicaid inpatient psychiatric reimbursement rates (currently 25% below Medicare)",
          "Emergency involuntary commitment reform: reduce reliance on acute hospital beds",
          "Fund Brattleboro Retreat capacity expansion (149-bed facility, out of scope but critical)",
          "Develop forensic psychiatric unit to divert from acute hospital settings",
          "Pass Act 117 mental health licensure streamlining by Dec 2024 deadline",
        ],
        timeline: "Year 1–2", investmentM: 8.5, annualSavingsM: 0, riskLevel: "high",
      },
      technology: {
        score: 70, direction: "positive",
        headline: "Telepsychiatry reduces wait times; 988 dispatch integration with hospital EDs",
        actions: [
          "Integrate 988 crisis line dispatch with all hospital ED protocols",
          "Deploy telepsychiatry platform for all 6 COE sites + non-COE EDs",
          "Implement psychiatric bed board (statewide visibility of psychiatric beds)",
          "Electronic psychiatric referral system across all Vermont providers",
          "AI-assisted mental health triage tool for ED use ($240K)",
        ],
        timeline: "Year 1–2", investmentM: 3.2, annualSavingsM: 0.8, riskLevel: "medium",
      },
      financial: {
        score: 58, direction: "mixed",
        headline: "Psychiatric beds have higher margin than acute; mental health ED reduces boarding costs",
        actions: [
          "Psychiatric bed revenue premium: $280/day vs. $180/day acute (medical/surgical)",
          "Current cost of psychiatric boarding in EDs: estimated $18M/yr statewide",
          "COE psychiatric units: reduce boarding cost by 60% = $10.8M/yr savings",
          "Investment in new psychiatric beds (60 total system-wide): $12M",
          "Federal 1115 Medicaid waiver for psychiatric services: potential $6M/yr",
        ],
        timeline: "Year 3", investmentM: 12, annualSavingsM: 10.8, riskLevel: "medium",
      },
      equity: {
        score: 75, direction: "positive",
        headline: "Mental health access is a major equity issue; rural Vermonters face 4–8 week wait times",
        actions: [
          "Current statewide psychiatric bed shortage: 40–60 beds below minimum need",
          "Rural mental health wait times: 4–8 weeks for outpatient; 48–72 hrs for inpatient",
          "Priority: expand adolescent psychiatric beds — current capacity severely insufficient",
          "Mobile crisis response expansion (Jan 2024 program): target 24/7 statewide coverage",
          "Peer support workforce expansion: train 80 additional peer recovery specialists",
          "SUD integration with mental health services at all COE sites",
          "Culturally competent care training for all 6 COE facilities",
        ],
        timeline: "Year 1–3", investmentM: 4.2, annualSavingsM: 0, riskLevel: "medium",
      },
      clinical: {
        score: 78, direction: "positive",
        headline: "COE model improves psychiatric outcomes; adequate volume sustains clinical expertise",
        actions: [
          "Minimum volume for psychiatric COE: >500 annual psychiatric admissions",
          "Implement evidence-based inpatient psychiatric protocols (ACT, DBT, assertive community)",
          "Develop step-down residential program to reduce acute readmissions",
          "30-day psychiatric readmission target: <12% (national avg: 18%)",
          "Track: ED boarding hours, psychiatric length of stay, 30-day readmission, medication adherence",
          "Workforce: recruit 12 additional psychiatrists statewide over 3 years",
        ],
        timeline: "Year 2–4", investmentM: 2.1, annualSavingsM: 0, riskLevel: "medium",
      },
    },
  },

  // ── COST REDUCTION ────────────────────────────────────────────────────────
  {
    id: "cost-01",
    category: "cost-reduction",
    title: "Statewide Shared Services and Group Purchasing Consortium",
    shortTitle: "Shared Services / GPO",
    description:
      "Establish a Vermont Hospital Consortium for group purchasing (supplies, drugs, insurance), centralized services (laundry, kitchen, central sterile, radiology interpretation), and shared executive/HR/IT staff.",
    sourceHospitals: ["gifford", "north-country", "springfield", "grace-cottage", "copley", "nvrh", "nmc"],
    priority: "high",
    implementationYears: [0, 2],
    pillars: {
      policy: {
        score: 65, direction: "positive",
        headline: "Vermont antitrust exemption may be needed for hospital consortium pricing",
        actions: [
          "Request Vermont DOJ antitrust guidance on hospital purchasing consortium",
          "Establish Vermont Hospital Collaborative Corporation (501(c)(3))",
          "GMCB to certify consortium savings and monitor competitive effects",
          "Develop hospital membership agreement with exit provisions",
          "Link consortium participation to GMCB budget approval process",
        ],
        timeline: "Year 1", investmentM: 0.8, annualSavingsM: 0, riskLevel: "low",
      },
      technology: {
        score: 68, direction: "positive",
        headline: "Centralized IT platform for consortium management; shared EHR licensing",
        actions: [
          "Deploy shared procurement platform (e.g., Workday, Coupa): $1.8M",
          "Negotiate statewide Epic EHR licensing through UVM Health Network",
          "Centralize radiology teleread for 8 small hospitals: $2.1M infrastructure",
          "Shared IT security operations center: $1.2M/yr",
          "Centralized HR/payroll platform for consortium members",
        ],
        timeline: "Year 1–2", investmentM: 5.1, annualSavingsM: 1.8, riskLevel: "low",
      },
      financial: {
        score: 88, direction: "positive",
        headline: "Estimated $24–32M/yr in system-wide savings; highest ROI recommendation",
        actions: [
          "Group purchasing supplies/drugs savings: $8–12M/yr (11% avg savings)",
          "Centralized laundry/kitchen: $3.2M/yr savings (6 hospitals)",
          "Shared executive staff (CFO, CMO, IT director): $4.8M/yr savings",
          "Centralized radiology interpretation: $2.4M/yr savings",
          "Statewide nurse pool: reduces travel agency costs by 60% = $6M/yr savings",
          "Shared IT security: $1.8M/yr savings",
          "Maryland comparison: 22% reduction in admin costs post-consolidation",
          "Break-even: Year 2.4",
        ],
        timeline: "ROI in 2.4 years", investmentM: 8.2, annualSavingsM: 26, riskLevel: "low",
      },
      equity: {
        score: 72, direction: "positive",
        headline: "Shared services stabilize rural hospitals, protecting access in underserved communities",
        actions: [
          "Small hospital financial stabilization directly protects rural community access",
          "Shared nursing pool reduces rural nurse shortages (travel agency premium 85% vs. staff nurses)",
          "Centralized linguistic services improve access for Spanish, Somali, Bosnian communities",
          "Mobile health service expansion enabled by shared funding model",
        ],
        timeline: "Year 1–2", investmentM: 0.4, annualSavingsM: 0, riskLevel: "low",
      },
      clinical: {
        score: 70, direction: "positive",
        headline: "Shared nurse pool reduces staffing gaps; centralized radiology improves report turnaround",
        actions: [
          "Statewide nurse pool: eliminate critical staffing shortfalls at 6+ rural hospitals",
          "Centralized radiology: 24/7 teleread coverage at all consortium hospitals",
          "Shared infection control officer across consortium: systematic quality improvement",
          "Shared quality/patient safety officer: standardize protocols across consortium",
          "Track: nurse vacancy rates, radiology turnaround times, infection rates",
        ],
        timeline: "Year 1–2", investmentM: 1.4, annualSavingsM: 0, riskLevel: "low",
      },
    },
  },

  // ── TECHNOLOGY ───────────────────────────────────────────────────────────
  {
    id: "tech-01",
    category: "technology",
    title: "VITL Modernization and EMR Interoperability Initiative",
    shortTitle: "VITL / EMR Interoperability",
    description:
      "Upgrade Vermont's Health Information Exchange (VITL) by FY2026: deploy unified data space, provider single sign-on, self-help analytics, pharmacy data integration, and real-time clinical information exchange.",
    sourceHospitals: [],
    priority: "critical",
    implementationYears: [0, 2],
    pillars: {
      policy: {
        score: 78, direction: "positive",
        headline: "VITL legislation needed; mandatory participation by FY2026 target",
        actions: [
          "Pass legislation making VITL participation mandatory for all VT providers by 2026",
          "Re-evaluate VITL governance structure and funding model",
          "Collaborate with payers to obtain pharmacy claims data for VITL",
          "Modernize enrollment eligibility integration (5-year legislative runway)",
          "Establish VITL performance standards and SLA requirements",
        ],
        timeline: "Year 1–2", investmentM: 1.8, annualSavingsM: 0, riskLevel: "medium",
      },
      technology: {
        score: 95, direction: "positive",
        headline: "Unified data space is foundational to all other transformation recommendations",
        actions: [
          "Deploy 'unified data space' data aggregator: $4.2M",
          "Implement provider single sign-on across all participating facilities",
          "Build provider self-help analytics tool (prescription analytics, population health)",
          "Integrate pharmacy claims data from major PBMs",
          "Deploy master patient index with 99.8% matching accuracy",
          "Real-time ADT (admission/discharge/transfer) feeds from all hospitals",
          "API-first architecture for VITL 2.0 — enable third-party app ecosystem",
        ],
        timeline: "Year 1–2 (FY2026 target)", investmentM: 12.8, annualSavingsM: 2.4, riskLevel: "medium",
      },
      financial: {
        score: 75, direction: "positive",
        headline: "Eliminates duplicate testing, improves care coordination, reduces unnecessary admissions",
        actions: [
          "Duplicate testing elimination: estimated $14M/yr statewide savings",
          "Reduced readmissions through better care coordination: $8M/yr",
          "VITL operating cost: $4.2M/yr (vs. current $2.8M/yr — 50% increase)",
          "Net benefit: $18M/yr by Year 3",
          "Federal HIE grant funding: $6M (ONC 2024 HITECH))",
        ],
        timeline: "Full benefit Year 3", investmentM: 12.8, annualSavingsM: 18, riskLevel: "medium",
      },
      equity: {
        score: 80, direction: "positive",
        headline: "Interoperability critical for care coordination of complex rural patients with multiple providers",
        actions: [
          "Rural patients with complex conditions most harmed by care fragmentation",
          "Unified data space enables care managers to track high-risk patients across sites",
          "Pharmacy data integration prevents dangerous drug interactions in rural settings",
          "Population health analytics enables proactive outreach to underserved populations",
          "Language-accessible patient portal for all VITL-connected providers",
        ],
        timeline: "Year 2–3", investmentM: 0.8, annualSavingsM: 0, riskLevel: "low",
      },
      clinical: {
        score: 88, direction: "positive",
        headline: "Real-time clinical information exchange is a patient safety imperative",
        actions: [
          "Current state: providers lack real-time access to medications, allergies, test results",
          "VITL 2.0: real-time medication reconciliation at all care transitions",
          "Alert fatigue reduction through smart filtering of clinical notifications",
          "Population health analytics for chronic disease management (diabetes, hypertension, COPD)",
          "Track: duplicate test rate, medication error rate, care gap closure rate",
        ],
        timeline: "Year 2–3", investmentM: 1.2, annualSavingsM: 0, riskLevel: "medium",
      },
    },
  },
  {
    id: "tech-02",
    category: "technology",
    title: "Statewide Telehealth Infrastructure Expansion",
    shortTitle: "Telehealth Expansion",
    description:
      "Deploy telehealth kiosks in community sites, expand tele-pharmacy, tele-rounding for specialists, home-based monitoring, and develop 'Hospital at Home' and 'ED at Home' capabilities.",
    sourceHospitals: [],
    priority: "high",
    implementationYears: [0, 3],
    pillars: {
      policy: {
        score: 72, direction: "positive",
        headline: "Telehealth payment parity legislation; GMCB pricing review for rural telehealth",
        actions: [
          "Mandate Medicaid telehealth payment parity with in-person care",
          "GMCB review telehealth pricing for rural providers (currently undercompensated)",
          "Create telehealth reimbursement category for community kiosk visits",
          "Allow out-of-state licensed providers for telehealth specialty consults",
          "Develop telehealth prescribing standards for tele-pharmacy model",
        ],
        timeline: "Year 1", investmentM: 0.4, annualSavingsM: 0, riskLevel: "low",
      },
      technology: {
        score: 90, direction: "positive",
        headline: "Telehealth kiosks, home monitoring, and Hospital-at-Home are transformative infrastructure",
        actions: [
          "Deploy 25 telehealth kiosks in community sites (grocery stores, libraries, town halls): $1.8M",
          "Hospital-at-Home program at UVMMC + partner hospitals: $4.2M infrastructure",
          "Home remote monitoring program for 2,000 patients (CHF, COPD, diabetes): $3.4M",
          "Tele-pharmacy platform for outlying hospital pharmacies: $1.2M",
          "Specialist tele-rounding program (daily rounds via video at partner hospitals): $480K",
          "ED-at-Home pilot (modeled after Atrius Health, Boston): $1.6M",
          "Broadband prerequisite: partner with VTrans/ACCD for final-mile broadband in 18 towns",
        ],
        timeline: "Year 1–3", investmentM: 12.7, annualSavingsM: 6.8, riskLevel: "medium",
      },
      financial: {
        score: 70, direction: "positive",
        headline: "Hospital-at-Home reduces acute admission costs 38%; telehealth reduces ED utilization 22%",
        actions: [
          "Hospital-at-Home cost: $4,200/episode vs. $8,400/inpatient admission (50% savings)",
          "Estimated 800 eligible acute admissions/yr → $3.4M/yr savings",
          "Telehealth ED visits: $180 vs. $850 ED visit = $670 savings/visit",
          "Tele-pharmacy: reduces medication errors and unnecessary dispensing = $1.2M/yr",
          "Remote monitoring: 28% reduction in CHF readmissions = $2.8M/yr",
          "Total system savings: $8.4M/yr by Year 3",
        ],
        timeline: "Full benefit Year 3", investmentM: 12.7, annualSavingsM: 8.4, riskLevel: "medium",
      },
      equity: {
        score: 90, direction: "positive",
        headline: "Telehealth dramatically improves specialist access in rural Vermont — most impactful equity intervention",
        actions: [
          "Current: rural Vermonters wait 8–16 weeks for specialty appointments",
          "Telehealth specialist access: same-week appointments at community kiosks",
          "Priority deployment: Orleans, Essex, Windham, Orange counties (most isolated)",
          "Language-accessible telehealth for Spanish, Somali, Vietnamese, Bosnian communities",
          "Telehealth for homebound patients (65+, disabled) eliminates transport barrier",
          "SDOH screening tool integrated into all telehealth encounters",
        ],
        timeline: "Year 1–2", investmentM: 2.1, annualSavingsM: 0, riskLevel: "low",
      },
      clinical: {
        score: 82, direction: "positive",
        headline: "Telehealth expands specialist access; Hospital-at-Home shows equivalent outcomes to inpatient for eligible conditions",
        actions: [
          "Hospital-at-Home: evidence shows equivalent or superior outcomes for eligible conditions (Levine et al., NEJM 2020)",
          "Remote monitoring: 28% CHF readmission reduction (Desai et al., Circulation 2017)",
          "Tele-dermatology, tele-psychiatry, tele-neurology for Vermont's specialty deserts",
          "Track: telehealth utilization rate, patient satisfaction, clinical outcomes by condition",
          "Safety protocols for Hospital-at-Home: 2 daily clinician visits (Medicare requirement)",
        ],
        timeline: "Year 2–3", investmentM: 1.4, annualSavingsM: 0, riskLevel: "low",
      },
    },
  },

  // ── WORKFORCE ─────────────────────────────────────────────────────────────
  {
    id: "work-01",
    category: "workforce",
    title: "EMS Regionalization and Advanced Paramedicine",
    shortTitle: "EMS Regionalization",
    description:
      "Fund EMS regionalization across Vermont; fund broadband for EMTs; develop advanced paramedicine program; create regional EMS transport network for inter-facility transfers.",
    sourceHospitals: [],
    priority: "critical",
    implementationYears: [0, 2],
    pillars: {
      policy: {
        score: 85, direction: "positive",
        headline: "Vermont Legislature identified EMS reform as near-term legislative priority (VTDigger Dec 2024)",
        actions: [
          "Pass EMS regionalization legislation (identified as near-term 2025 priority)",
          "Fund statewide EMS regionalization: $12M capital + $4.2M/yr operating",
          "Establish Advanced Life Support (ALS) minimum standard for all regional EMS services",
          "Create Medicare Community Paramedicine waiver application",
          "Develop inter-facility transport payment model for hospital-to-hospital transfers",
          "Fund broadband (Starlink) for all Vermont EMS vehicles: $380K",
          "Establish EMS mutual aid compact for northeastern Vermont",
        ],
        timeline: "Year 1 (2025 legislative session)", investmentM: 12.4, annualSavingsM: 0, riskLevel: "medium",
      },
      technology: {
        score: 78, direction: "positive",
        headline: "Starlink broadband, ECG transmission, and telemedicine in EMS vehicles transform rural emergency care",
        actions: [
          "Starlink satellite broadband for 120 Vermont EMS vehicles: $380K setup + $180K/yr",
          "12-lead ECG transmission to receiving hospitals (STEMI alert system): $640K",
          "Field telemedicine: paramedic-to-physician video consult in ambulance",
          "GPS-integrated dispatch with hospital capacity data feed",
          "Electronic PCR (patient care record) system integrated with VITL",
        ],
        timeline: "Year 1–2", investmentM: 4.2, annualSavingsM: 0.8, riskLevel: "low",
      },
      financial: {
        score: 62, direction: "positive",
        headline: "EMS investment is prerequisite for safe hospital restructuring; also reduces costly ED admissions",
        actions: [
          "EMS regionalization investment: $12.4M capital",
          "Ongoing state operating cost: $4.2M/yr",
          "Offset: Community paramedicine reduces ED visits by 15% = $4.8M/yr system savings",
          "Avoid-transfer savings (treat in place): $2.1M/yr",
          "Federal funding: FEMA SAFER grants, CMS community paramedicine waivers",
          "Net state cost after federal offset: ~$2.4M/yr",
        ],
        timeline: "Net positive Year 3", investmentM: 12.4, annualSavingsM: 6.9, riskLevel: "medium",
      },
      equity: {
        score: 92, direction: "positive",
        headline: "EMS is the critical safety net for the most isolated Vermonters; essential for any hospital restructuring",
        actions: [
          "Current: 8+ towns in VT have average EMS response time >20 min",
          "Newport, Townshend, Randolph: nearest hospital 42–62 min; ALS EMS is life-critical",
          "Regionalization ensures 24/7 ALS coverage in all Vermont towns",
          "Community paramedicine: proactive home visits to elderly/disabled patients",
          "EMS workforce: recruit from immigrant communities with medical training",
          "Language training for EMS personnel in 5 most common non-English languages in VT",
        ],
        timeline: "Year 1–2", investmentM: 1.8, annualSavingsM: 0, riskLevel: "medium",
      },
      clinical: {
        score: 85, direction: "positive",
        headline: "ALS EMS is non-negotiable clinical prerequisite for rural hospital restructuring",
        actions: [
          "ALS EMS capability: administer 25+ medications, perform 12-lead ECG, CPAP, IO access",
          "STEMI alert: ECG transmission reduces door-to-balloon time by 30 min on average",
          "Sepsis recognition protocol in field → earlier treatment initiation",
          "Community paramedicine: CHF, COPD, diabetes monitoring prevents 28% readmissions",
          "Track: EMS response time by town, ALS capability rate, inter-facility transfer time",
        ],
        timeline: "Year 1–3", investmentM: 1.2, annualSavingsM: 0, riskLevel: "low",
      },
    },
  },

  // ── PAYMENT REFORM ────────────────────────────────────────────────────────
  {
    id: "pay-01",
    category: "payment-reform",
    title: "Reference-Based Pricing Transition (3–5 Year Runway)",
    shortTitle: "Reference-Based Pricing",
    description:
      "Move payment model for all providers to reference-based pricing over 3–5 years, aligning commercial rates with Medicare rates adjusted for Vermont cost structure. Link quality/equity metrics to payment.",
    sourceHospitals: [],
    priority: "high",
    implementationYears: [1, 5],
    pillars: {
      policy: {
        score: 72, direction: "positive",
        headline: "Reference-based pricing requires GMCB regulatory authority expansion and commercial payer agreements",
        actions: [
          "GMCB to develop reference-based pricing methodology (Medicare + 15–25% VT adjustment)",
          "Negotiate commercial payer participation through multi-payer reform initiative",
          "Act 68 requires RBP no later than hospital FY2027; GMCB sets methodology by rule in 2027, prices effective hospital FY2028 (AHEAD no longer applies — Vermont withdrew July 2026)",
          "Align Quality/Access/Equity metrics across all payers and agencies",
          "Link payments to primary care providers to hospital payments",
          "Phase-in over 3 years to minimize hospital revenue disruption",
        ],
        timeline: "Year 2–5", investmentM: 2.4, annualSavingsM: 0, riskLevel: "high",
      },
      technology: {
        score: 55, direction: "positive",
        headline: "Payment reform requires advanced claims analytics and provider performance measurement",
        actions: [
          "Deploy multi-payer claims database for reference price calculation",
          "Provider performance measurement system for quality bonus payments",
          "Patient attribution algorithm for population-based payment",
          "Real-time financial reporting for hospitals under new payment model",
        ],
        timeline: "Year 2–3", investmentM: 3.8, annualSavingsM: 0.6, riskLevel: "medium",
      },
      financial: {
        score: 80, direction: "positive",
        headline: "UVMMC commercial rate premium reduction could save $60–80M/yr for Vermont employers and patients",
        actions: [
          "Current UVMMC commercial rates: ~180% of Medicare rates",
          "Target reference price: Medicare + 20% (= 120% of Medicare)",
          "Impact on UVMMC: commercial revenue reduction of $55–75M (phased over 3 years)",
          "Impact on smaller hospitals: modest revenue increase (closer to reference price)",
          "Employer savings: $40–60M/yr reduction in premium costs",
          "Patient cost-sharing savings: $12–18M/yr reduction in out-of-pocket",
          "UVMMC must dramatically reduce costs to remain viable: 22% cost reduction needed",
        ],
        timeline: "Full impact Year 5", investmentM: 2.4, annualSavingsM: 62, riskLevel: "high",
      },
      equity: {
        score: 78, direction: "positive",
        headline: "Payment reform that ties quality to equity metrics is most direct equity intervention",
        actions: [
          "Mandate equity metrics in all quality-based payment programs",
          "Higher payment bonus for providers serving underserved populations",
          "Track and publicly report quality outcomes by race, income, geography, disability",
          "Community benefit spending requirements linked to payment",
          "Social needs screening (SDOH) as a quality metric for payment",
        ],
        timeline: "Year 2–4", investmentM: 0.8, annualSavingsM: 0, riskLevel: "medium",
      },
      clinical: {
        score: 68, direction: "mixed",
        headline: "Reference-based pricing reduces clinical variation; volume shift to lower-cost settings improves efficiency",
        actions: [
          "Payment parity for ambulatory surgery centers removes incentive for hospital-based surgery",
          "Quality bonuses incentivize evidence-based practice",
          "Risk: UVMMC revenue reduction may constrain academic/research mission",
          "Ensure payment model does not create perverse incentives for under-treatment",
          "Track: clinical outcomes by payer type, access to care by payment model",
        ],
        timeline: "Year 3–5", investmentM: 0.4, annualSavingsM: 0, riskLevel: "high",
      },
    },
  },

  // ── UVMMC REFORM ──────────────────────────────────────────────────────────
  {
    id: "uvm-01",
    category: "uvmmc-reform",
    title: "UVMMC Administrative Cost Reduction and Productivity Improvement",
    shortTitle: "UVMMC Cost Reform",
    description:
      "Engage external consultancy to drive 22% operating cost reduction at UVMMC. Target: administrative costs >400% of peer AMC benchmarks. Improve physician productivity to >60th percentile.",
    sourceHospitals: ["uvmmc"],
    priority: "critical",
    implementationYears: [0, 2],
    pillars: {
      policy: {
        score: 68, direction: "positive",
        headline: "GMCB budget review authority to mandate external consultancy engagement",
        actions: [
          "GMCB to condition FY2025 UVMMC budget approval on consultancy engagement",
          "UVMMC to engage external consultancy within 6 months of GMCB order",
          "Establish UVMMC board accountability metrics for cost reduction targets",
          "Address union negotiation complexity in implementation timeline",
          "Review and reduce administrative staff with non-patient care roles (203 of 654 physician FTEs)",
          "Critically examine low-volume procedures: kidney transplant program, small bowel resection",
        ],
        timeline: "Year 1 (FY2025)", investmentM: 3.2, annualSavingsM: 0, riskLevel: "high",
      },
      technology: {
        score: 62, direction: "positive",
        headline: "Proceed with EPIC integration; develop hospital-based heliport; state-of-the-art NICU",
        actions: [
          "Complete Epic EHR integration across UVMMC network (in progress)",
          "Develop hospital-based heliport for emergency transport ($4.2M)",
          "Develop state-of-the-art NICU for complex neonatal referrals",
          "Centralized monitoring facility for UVMMC + affiliated hospital IP beds",
          "Re-design consultant reports for referring physicians (diagnosis/medications first)",
          "Develop PACE program for metropolitan Burlington",
        ],
        timeline: "Year 1–3", investmentM: 12.4, annualSavingsM: 2.1, riskLevel: "medium",
      },
      financial: {
        score: 85, direction: "positive",
        headline: "Administrative cost reduction target: $45–65M/yr savings (22% of operating expenses)",
        actions: [
          "Administrative costs >400% of peer AMC benchmarks — primary target",
          "Physician productivity: >75% of FTEs below 50th Sullivan Cotter percentile",
          "203 of 654 physician FTEs in non-patient care roles — optimization needed",
          "UVMMC: >56% of VT commercial hospital spend; >67% of UVM network spend",
          "Target: reduce commercial rate premium from 180% to 140% of Medicare",
          "Move non-productive provider/admin staff to patient-facing roles",
          "10% cost savings through clinical protocol variation reduction",
          "Reduce operating costs to Medicare payment level (currently at 72% Medicare/cost ratio)",
        ],
        timeline: "Year 1–3", investmentM: 3.2, annualSavingsM: 52, riskLevel: "high",
      },
      equity: {
        score: 60, direction: "positive",
        headline: "UVMMC cost reduction is prerequisite for commercial premium reduction benefiting all Vermonters",
        actions: [
          "Improve access to routine specialist appointments to <4 weeks (currently often 8–16 weeks)",
          "Review telehealth pricing to make affordable for rural/community providers",
          "Expand primary care trainee rotations to rural hospitals (improve rural provider pipeline)",
          "UVM medical school: increase Vermont native residency acceptances",
          "Review residency rotation sites in rural hospitals — increase community presence",
        ],
        timeline: "Year 2–4", investmentM: 1.8, annualSavingsM: 0, riskLevel: "medium",
      },
      clinical: {
        score: 72, direction: "positive",
        headline: "Clinical productivity improvement; low-volume procedure consolidation improves outcomes",
        actions: [
          "Physician productivity target: move from <50th to >60th Sullivan Cotter percentile",
          "Evaluate low-volume specialty services: kidney transplant (<50 cases/yr), small bowel resection",
          "Consult report redesign: diagnosis/medications/plan at top for referring physicians",
          "Stop repair of perforated ulcer, small bowel resection at low volume thresholds",
          "Develop hospital-at-home program for metropolitan Burlington (800+ eligible cases/yr)",
          "Develop rural general surgery rotation program",
          "NICU development: accept all complex neonatal referrals from VT hospitals",
          "Accept all patient referrals from VT hospitals — improve transfer acceptance rate",
        ],
        timeline: "Year 1–3", investmentM: 2.4, annualSavingsM: 0, riskLevel: "medium",
      },
    },
  },

  // ── EQUITY & ACCESS ───────────────────────────────────────────────────────
  {
    id: "eq-01",
    category: "equity-access",
    title: "Statewide Medical Transportation Network",
    shortTitle: "Medical Transportation",
    description:
      "Build a coordinated statewide medical transportation network including enhanced ambulatory transport, EMS inter-facility transport, and transportation for patients without vehicles.",
    sourceHospitals: [],
    priority: "critical",
    implementationYears: [0, 3],
    pillars: {
      policy: {
        score: 80, direction: "positive",
        headline: "AHS to lead transportation coordination; VTrans integration; Medicaid NEMT reform",
        actions: [
          "Reform Medicaid Non-Emergency Medical Transportation (NEMT) program",
          "Accelerate Act 167 mandate for transportation investment",
          "Integrate AHS transportation planning with VTrans rural transit expansion",
          "Fund VTrans rural transit for medical appointment trips ($8M/yr)",
          "Establish statewide medical transport coordinator position at AHS",
          "Create EMS Medicare transport waiver for community paramedicine",
        ],
        timeline: "Year 1–2", investmentM: 24, annualSavingsM: 0, riskLevel: "medium",
      },
      technology: {
        score: 70, direction: "positive",
        headline: "Ride coordination platform; real-time EMS dispatch; transport eligibility screening",
        actions: [
          "Deploy statewide medical transportation scheduling platform (modeled after Ride Health)",
          "GPS fleet tracking for all medical transport vehicles",
          "Integration with hospital patient discharge planning systems",
          "Automated Medicaid NEMT eligibility and authorization",
          "Mobile app for patients to schedule medical transport",
        ],
        timeline: "Year 1–2", investmentM: 2.8, annualSavingsM: 0.6, riskLevel: "low",
      },
      financial: {
        score: 55, direction: "mixed",
        headline: "Transportation investment ($24M/yr) is primarily public health cost; offsets expensive ED misuse",
        actions: [
          "Statewide medical transport program: $24M/yr state investment",
          "Federal Medicaid NEMT match: ~$12M/yr federal offset (50% match)",
          "Reduced ED use for non-emergency conditions: $6M/yr savings",
          "Reduced avoidable hospitalizations from missed appointments: $4.2M/yr savings",
          "Net state cost after offsets: ~$14M/yr",
          "Alternative: without transportation, hospital restructuring creates dangerous access gaps",
        ],
        timeline: "Ongoing investment", investmentM: 24, annualSavingsM: 10.2, riskLevel: "medium",
      },
      equity: {
        score: 98, direction: "positive",
        headline: "HIGHEST EQUITY IMPACT: Transportation is the single largest determinant of rural health access",
        actions: [
          "21% of Vermont rural households have no vehicle access",
          "Transportation barriers cause 25% of missed medical appointments (Vermont rural estimate)",
          "Priority communities: Newport (20% no car), Grace Cottage (22%), Gifford (19%)",
          "Elder-specific transport: 29–34% of at-risk HSA populations are 65+",
          "Language-accessible dispatch for 5 non-English speaking communities",
          "Coordinate with Green Mountain Transit, ACTR, and rural volunteer transport",
          "Special transport for dialysis patients (3x/week trips — massive burden)",
          "Wheelchair-accessible vehicle fleet requirement for all transport contracts",
        ],
        timeline: "Year 1", investmentM: 4.2, annualSavingsM: 0, riskLevel: "low",
      },
      clinical: {
        score: 75, direction: "positive",
        headline: "Appointment adherence directly drives chronic disease management outcomes",
        actions: [
          "Study: transportation barriers → 25–42% higher chronic disease complication rates",
          "Dialysis transport: 3x/week transport is life-critical for ~1,200 Vermont dialysis patients",
          "Cancer treatment transport: chemo/radiation access for rural patients",
          "Track: appointment no-show rate by transportation status, ED visits for missed follow-up",
          "Integrate transportation screening into all discharge planning workflows",
        ],
        timeline: "Year 1–2", investmentM: 0.4, annualSavingsM: 0, riskLevel: "low",
      },
    },
  },
];

// ── Benchmark Data ─────────────────────────────────────────────────────────

export interface StateBenchmark {
  state: string;
  model: string;
  year: number;
  scope: string;
  results: string[]; // each sourced; no derived scores
  source: string;
}

// Rebuilt 2026-10-17 from sources only (earlier numeric "impact scores" and lessons had no source and were removed).
export const STATE_BENCHMARKS: StateBenchmark[] = [
  {
    state: "Maryland",
    model: "All-Payer Model — hospital global budgets",
    year: 2014,
    scope: "All 46 general acute care hospitals under global budgets by July 2014; all payers.",
    results: [
      "Medicare spending grew 2.8% more slowly than in a comparison group over the first 4.5 years (about $975M), driven by 4.1% slower growth in hospital spending ($796M)",
      "Admissions for ambulatory-care-sensitive conditions fell 6.7% more than in the comparison group (Medicare)",
      "The model was not associated with population health improvement",
    ],
    source: "RTI International, Evaluation of the Maryland All-Payer Model, Final Report (CMS, November 2019)",
  },
  {
    state: "Oregon",
    model: "State employee plan hospital price cap",
    year: 2019,
    scope: "State employee plan only; 200% of Medicare in-network, 185% out-of-network; exemptions for rural and critical access hospitals.",
    results: ["Savings of more than $100M in the first 27 months"],
    source: "Green Mountain Care Board, Act 68 update on reference-based pricing (February 17, 2026)",
  },
  {
    state: "Montana",
    model: "State employee plan reference-based pricing",
    year: 2016,
    scope: "State employee plan; direct contracting with hospitals at a percentage of Medicare.",
    results: ["About $48M in savings", "Initial success, but politically fragile without a statutory mandate"],
    source: "Green Mountain Care Board, Act 68 update on reference-based pricing (February 17, 2026)",
  },
  {
    state: "Washington",
    model: "Cascade Care public option",
    year: 2021,
    scope: "Public option plans; hospital reimbursement capped at 160% of Medicare for participating networks; voluntary participation.",
    results: ["Participation voluntary; expanding to state employee plans"],
    source: "Green Mountain Care Board, Act 68 update on reference-based pricing (February 17, 2026)",
  },
  {
    state: "Vermont",
    model: "Act 68 reference-based pricing and global budgets",
    year: 2025,
    scope: "Mandatory statewide maximum allowable commercial payment rates for all hospitals, set by GMCB rule in 2027 and effective hospital FY2028; global budgets for one or more non-CAH hospitals by FY2028 and all by FY2030, as resources allow.",
    results: ["Act 68 signed June 12, 2025; GMCB FY2027 budget orders cut commercial rates 2.9% statewide (September 2026)"],
    source: "Act 68 of 2025; GMCB Act 68 update (February 17, 2026); GMCB FY27 hospital budget decisions (September 15, 2026)",
  },
];

export interface CountyData {
  county: string;
  population: number;
  over65Pct: number;
  noVehiclePct: number;
  belowPovertyPct: number;
  minorityPct: number;
  uninsuredPct: number;
  primaryHospital: string;
  travelTimeToHospitalMin: number;
}

export const COUNTY_DATA: CountyData[] = [
  { county: "Addison", population: 37000, over65Pct: 23, noVehiclePct: 8, belowPovertyPct: 12, minorityPct: 5, uninsuredPct: 4.2, primaryHospital: "porter", travelTimeToHospitalMin: 18 },
  { county: "Bennington", population: 37500, over65Pct: 27, noVehiclePct: 12, belowPovertyPct: 15, minorityPct: 6, uninsuredPct: 5.1, primaryHospital: "svmc", travelTimeToHospitalMin: 22 },
  { county: "Caledonia", population: 30000, over65Pct: 26, noVehiclePct: 14, belowPovertyPct: 16, minorityPct: 4, uninsuredPct: 5.8, primaryHospital: "nvrh", travelTimeToHospitalMin: 25 },
  { county: "Chittenden", population: 168000, over65Pct: 14, noVehiclePct: 11, belowPovertyPct: 11, minorityPct: 14, uninsuredPct: 3.2, primaryHospital: "uvmmc", travelTimeToHospitalMin: 14 },
  { county: "Essex", population: 6200, over65Pct: 29, noVehiclePct: 18, belowPovertyPct: 22, minorityPct: 2, uninsuredPct: 8.1, primaryHospital: "north-country", travelTimeToHospitalMin: 45 },
  { county: "Franklin", population: 49000, over65Pct: 20, noVehiclePct: 9, belowPovertyPct: 13, minorityPct: 7, uninsuredPct: 4.4, primaryHospital: "nmc", travelTimeToHospitalMin: 20 },
  { county: "Grand Isle", population: 7200, over65Pct: 25, noVehiclePct: 7, belowPovertyPct: 8, minorityPct: 3, uninsuredPct: 3.8, primaryHospital: "nmc", travelTimeToHospitalMin: 32 },
  { county: "Lamoille", population: 26000, over65Pct: 22, noVehiclePct: 10, belowPovertyPct: 12, minorityPct: 4, uninsuredPct: 4.6, primaryHospital: "copley", travelTimeToHospitalMin: 24 },
  { county: "Orange", population: 29000, over65Pct: 27, noVehiclePct: 15, belowPovertyPct: 14, minorityPct: 3, uninsuredPct: 5.4, primaryHospital: "gifford", travelTimeToHospitalMin: 28 },
  { county: "Orleans", population: 27500, over65Pct: 28, noVehiclePct: 18, belowPovertyPct: 18, minorityPct: 4, uninsuredPct: 6.2, primaryHospital: "north-country", travelTimeToHospitalMin: 30 },
  { county: "Rutland", population: 62000, over65Pct: 25, noVehiclePct: 10, belowPovertyPct: 14, minorityPct: 5, uninsuredPct: 4.8, primaryHospital: "rrmc", travelTimeToHospitalMin: 19 },
  { county: "Washington", population: 59000, over65Pct: 20, noVehiclePct: 9, belowPovertyPct: 12, minorityPct: 6, uninsuredPct: 4.1, primaryHospital: "cvmc", travelTimeToHospitalMin: 17 },
  { county: "Windham", population: 44000, over65Pct: 26, noVehiclePct: 14, belowPovertyPct: 16, minorityPct: 7, uninsuredPct: 5.6, primaryHospital: "bmh", travelTimeToHospitalMin: 22 },
  { county: "Windsor", population: 56000, over65Pct: 28, noVehiclePct: 12, belowPovertyPct: 13, minorityPct: 4, uninsuredPct: 4.9, primaryHospital: "mt-ascutney", travelTimeToHospitalMin: 26 },
];

// ── Pillar definitions ─────────────────────────────────────────────────────

export const PILLARS: { key: PillarKey; label: string; color: string; bgColor: string; description: string }[] = [
  { key: "policy", label: "Policy & Governance", color: "text-blue-700", bgColor: "bg-blue-100", description: "Legislative actions, regulatory approvals, governance changes required" },
  { key: "technology", label: "Technology & Infrastructure", color: "text-indigo-700", bgColor: "bg-indigo-100", description: "IT systems, capital projects, digital infrastructure needed" },
  { key: "financial", label: "Financial Impact", color: "text-emerald-700", bgColor: "bg-emerald-100", description: "Cost savings, investment required, ROI timeline" },
  { key: "equity", label: "Equity & Access", color: "text-violet-700", bgColor: "bg-violet-100", description: "Impact on vulnerable populations, travel time, demographic disparities" },
  { key: "clinical", label: "Clinical Quality", color: "text-red-700", bgColor: "bg-red-100", description: "Patient outcomes, volume thresholds, safety, quality improvement" },
];

export const CATEGORY_LABELS: Record<RecommendationCategory, string> = {
  governance: "Governance",
  "at-risk-restructuring": "At-Risk Hospital Restructuring",
  "coe-regionalization": "COE Regionalization",
  "cost-reduction": "Cost Reduction",
  technology: "Technology",
  workforce: "Workforce",
  "equity-access": "Equity & Access",
  "payment-reform": "Payment Reform",
  "uvmmc-reform": "UVMMC Reform",
};

export const CATEGORY_COLORS: Record<RecommendationCategory, string> = {
  governance: "bg-violet-100 text-violet-800",
  "at-risk-restructuring": "bg-rose-100 text-rose-800",
  "coe-regionalization": "bg-blue-100 text-blue-800",
  "cost-reduction": "bg-emerald-100 text-emerald-800",
  technology: "bg-sky-100 text-sky-800",
  workforce: "bg-orange-100 text-orange-800",
  "equity-access": "bg-amber-100 text-amber-800",
  "payment-reform": "bg-indigo-100 text-indigo-800",
  "uvmmc-reform": "bg-purple-100 text-purple-800",
};
