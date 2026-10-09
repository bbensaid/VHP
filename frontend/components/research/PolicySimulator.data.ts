/**
 * Static data and formatting helpers for PolicySimulator.
 *
 * Pure data + pure functions only — no React, no hooks. Imported by the shell
 * and by every tab file. Adding/editing a state, waiver type, or procedure?
 * Edit this file.
 */

export type Tab = "waiver" | "apm" | "expansion" | "transparency";

export const STATE_DATA: Record<
  string,
  {
    enrollees: number;
    perCapitaSpending: number;
    fmap: number;
    budgetPct: number;
    uninsuredRate: number;
    population: number;
  }
> = {
  Vermont: {
    enrollees: 218000,
    perCapitaSpending: 9800,
    fmap: 56.87,
    budgetPct: 28.4,
    uninsuredRate: 4.2,
    population: 647000,
  },
  "New York": {
    enrollees: 7800000,
    perCapitaSpending: 11200,
    fmap: 50.0,
    budgetPct: 35.1,
    uninsuredRate: 5.8,
    population: 19800000,
  },
  California: {
    enrollees: 14500000,
    perCapitaSpending: 7900,
    fmap: 50.0,
    budgetPct: 21.3,
    uninsuredRate: 7.2,
    population: 39200000,
  },
  Texas: {
    enrollees: 4900000,
    perCapitaSpending: 5600,
    fmap: 58.77,
    budgetPct: 18.9,
    uninsuredRate: 18.4,
    population: 30000000,
  },
  Ohio: {
    enrollees: 3100000,
    perCapitaSpending: 7200,
    fmap: 63.18,
    budgetPct: 26.7,
    uninsuredRate: 6.5,
    population: 11800000,
  },
  Michigan: {
    enrollees: 2800000,
    perCapitaSpending: 7800,
    fmap: 67.42,
    budgetPct: 29.8,
    uninsuredRate: 5.6,
    population: 10000000,
  },
};

export const WAIVER_TYPES = [
  {
    id: "global_commitment",
    label: "Global Commitment to Health (Vermont)",
    approvalBase: 0.82,
    cmsAlignment: "High",
  },
  {
    id: "dsrip",
    label: "DSRIP (NY/NJ/TX model)",
    approvalBase: 0.68,
    cmsAlignment: "Moderate",
  },
  {
    id: "community_engagement",
    label: "Community Engagement Requirements",
    approvalBase: 0.35,
    cmsAlignment: "Low",
  },
  {
    id: "expansion_premium",
    label: "Expansion with Premium",
    approvalBase: 0.55,
    cmsAlignment: "Moderate",
  },
  {
    id: "managed_care",
    label: "Managed Care",
    approvalBase: 0.72,
    cmsAlignment: "High",
  },
  {
    id: "behavioral_health",
    label: "Behavioral Health Focus",
    approvalBase: 0.78,
    cmsAlignment: "High",
  },
  {
    id: "global_budget",
    label: "Global Budget",
    approvalBase: 0.6,
    cmsAlignment: "Moderate",
  },
];

export const NON_EXPANSION_STATES: Record<
  string,
  {
    uninsuredRate: number;
    coverageGap: number;
    uncomp: number;
    population: number;
    fmap: number;
    label: string;
  }
> = {
  Texas: {
    uninsuredRate: 18.4,
    coverageGap: 1200000,
    uncomp: 5800000000,
    population: 30000000,
    fmap: 58.77,
    label: "Texas",
  },
  Florida: {
    uninsuredRate: 13.2,
    coverageGap: 780000,
    uncomp: 3900000000,
    population: 22600000,
    fmap: 55.14,
    label: "Florida",
  },
  Georgia: {
    uninsuredRate: 13.8,
    coverageGap: 410000,
    uncomp: 2100000000,
    population: 10900000,
    fmap: 67.19,
    label: "Georgia",
  },
  Tennessee: {
    uninsuredRate: 11.0,
    coverageGap: 190000,
    uncomp: 1200000000,
    population: 7100000,
    fmap: 66.57,
    label: "Tennessee",
  },
  Alabama: {
    uninsuredRate: 11.5,
    coverageGap: 165000,
    uncomp: 890000000,
    population: 5100000,
    fmap: 77.96,
    label: "Alabama",
  },
  Mississippi: {
    uninsuredRate: 13.4,
    coverageGap: 143000,
    uncomp: 720000000,
    population: 2960000,
    fmap: 77.96,
    label: "Mississippi",
  },
  SouthCarolina: {
    uninsuredRate: 12.1,
    coverageGap: 170000,
    uncomp: 980000000,
    population: 5300000,
    fmap: 70.54,
    label: "South Carolina",
  },
  Kansas: {
    uninsuredRate: 9.0,
    coverageGap: 96000,
    uncomp: 540000000,
    population: 2940000,
    fmap: 56.95,
    label: "Kansas",
  },
  Wisconsin: {
    uninsuredRate: 6.8,
    coverageGap: 89000,
    uncomp: 470000000,
    population: 5900000,
    fmap: 59.9,
    label: "Wisconsin",
  },
  Wyoming: {
    uninsuredRate: 10.8,
    coverageGap: 21000,
    uncomp: 130000000,
    population: 581000,
    fmap: 50.0,
    label: "Wyoming",
  },
};

/**
 * Site-Neutral Payment Analyzer: 20 of the 70 CMS-specified shoppable services
 * (45 CFR 180.60; Table 3 of the Hospital Price Transparency final rule,
 * 84 FR 65571 — CMS "10 Steps to Making Public Standard Charges for Shoppable
 * Services"), priced by site of service from the CY2026 Medicare fee schedules.
 *
 * METHODOLOGY — Medicare allowed amount (program payment + beneficiary
 * coinsurance), NATIONAL UNADJUSTED, facility fee + professional fee, rounded
 * to whole dollars. Anesthesia, drugs and devices billed separately are excluded.
 *   HOPD   = OPPS national payment rate (Addendum B) + PFS facility rate for the
 *            professional service (imaging: PFS -26 professional component).
 *            Clinic visits: facility bills G0463 (APC 5012) at the on-campus
 *            rate; excepted off-campus PBDs are paid 40% of that (PN rate).
 *   ASC    = ASC payment rate (Addendum AA) + PFS facility rate; null when the
 *            code is not on the ASC covered-procedures list.
 *   Office = PFS non-facility rate (imaging: global); null when CMS sets the
 *            non-facility PE to "NA" (not payable in an office).
 *   Labs (80053, 85025) are paid on the CLFS national limit in every setting,
 *   and screening mammography (OPPS SI "A") on the PFS — both already
 *   site-neutral, so they show zero savings by construction.
 * PFS conversion factor $33.4009 (CY2026, non-qualifying-APM CF).
 * Vermont is one PFS locality (GPCIs work 1.000 / PE 0.990 / MP 0.506), and
 * OPPS/ASC rates are wage-adjusted per hospital, so Vermont amounts differ
 * modestly from these national figures.
 * SOURCES (downloaded 2026-10-09):
 *   PFS  https://www.cms.gov/files/zip/rvu26d.zip  (PPRRVU2026_Oct_nonQPP, released 08/26/2026)
 *   OPPS https://www.cms.gov/files/zip/October-2026-OPPS-Addendum-B.zip (09/28/26)
 *   ASC  https://www.cms.gov/files/zip/october-2026-asc-approved-hcpcs-code-payment-rates.zip (Addendum AA)
 *   CLFS https://www.cms.gov/files/zip/26clabq4.zip (PUF_CLFS_CY2026_Q4V1)
 * Each row's `basis` carries its own derivation.
 */
export interface ProcedureRate {
  id: string;
  code: string;
  label: string;
  category: "E/M" | "Lab" | "Radiology" | "Surgery";
  hopdRate: number;
  ascRate: number | null;
  officeRate: number | null;
  basis: string;
}

export const PROCEDURES: ProcedureRate[] = [
  { id: "99203", code: "99203", label: "New patient office visit, ~30 min", category: "E/M", hopdRate: 207, ascRate: null, officeRate: 118,
    basis: "HOPD = PFS facility $71.48 + OPPS G0463 APC 5012 $136.02; office = PFS non-facility $117.57" },
  { id: "99204", code: "99204", label: "New patient office visit, ~45 min", category: "E/M", hopdRate: 253, ascRate: null, officeRate: 177,
    basis: "HOPD = PFS facility $116.90 + OPPS G0463 APC 5012 $136.02; office = PFS non-facility $177.36" },
  { id: "90837", code: "90837", label: "Psychotherapy, 60 min", category: "E/M", hopdRate: 317, ascRate: null, officeRate: 167,
    basis: "HOPD = PFS facility $135.27 + OPPS 90837 APC 5823 $181.34; office = PFS non-facility $167.00" },
  { id: "80053", code: "80053", label: "Comprehensive metabolic panel", category: "Lab", hopdRate: 11, ascRate: null, officeRate: 11,
    basis: "CLFS national limit $10.56 in every setting (OPPS SI Q4: paid on the CLFS)" },
  { id: "85025", code: "85025", label: "Complete blood count with differential", category: "Lab", hopdRate: 8, ascRate: null, officeRate: 8,
    basis: "CLFS national limit $7.77 in every setting (OPPS SI Q4: paid on the CLFS)" },
  { id: "70553", code: "70553", label: "MRI brain, before and after contrast", category: "Radiology", hopdRate: 462, ascRate: null, officeRate: 317,
    basis: "HOPD = OPPS APC 5572 $356.43 + PFS -26 $105.21; office = PFS global $316.97" },
  { id: "72148", code: "72148", label: "MRI lumbar spine, without contrast", category: "Radiology", hopdRate: 312, ascRate: null, officeRate: 192,
    basis: "HOPD = OPPS APC 5523 $243.77 + PFS -26 $68.47; office = PFS global $191.72" },
  { id: "73721", code: "73721", label: "MRI leg joint (e.g. knee), without contrast", category: "Radiology", hopdRate: 307, ascRate: null, officeRate: 204,
    basis: "HOPD = OPPS APC 5523 $243.77 + PFS -26 $62.79; office = PFS global $204.41" },
  { id: "74177", code: "74177", label: "CT abdomen and pelvis, with contrast", category: "Radiology", hopdRate: 440, ascRate: null, officeRate: 300,
    basis: "HOPD = OPPS APC 5572 $356.43 + PFS -26 $83.84; office = PFS global $300.27" },
  { id: "76700", code: "76700", label: "Ultrasound, abdomen complete", category: "Radiology", hopdRate: 144, ascRate: null, officeRate: 114,
    basis: "HOPD = OPPS APC 5522 $106.81 + PFS -26 $37.41; office = PFS global $114.23" },
  { id: "77067", code: "77067", label: "Screening mammography, bilateral", category: "Radiology", hopdRate: 126, ascRate: null, officeRate: 126,
    basis: "Paid on the PFS in every setting (OPPS SI A): global $126.26" },
  { id: "43239", code: "43239", label: "Upper GI endoscopy with biopsy", category: "Surgery", hopdRate: 1050, ascRate: 621, officeRate: 419,
    basis: "HOPD = OPPS APC 5301 $926.63 + PFS facility $123.58; ASC = ASC $497.85 + PFS facility; office = PFS non-facility $418.85" },
  { id: "45378", code: "45378", label: "Diagnostic colonoscopy", category: "Surgery", hopdRate: 1115, ascRate: 675, officeRate: 378,
    basis: "HOPD = OPPS APC 5311 $950.10 + PFS facility $164.67; ASC = ASC $510.49 + PFS facility; office = PFS non-facility $378.10" },
  { id: "45380", code: "45380", label: "Colonoscopy with biopsy", category: "Surgery", hopdRate: 1400, ascRate: 834, officeRate: 480,
    basis: "HOPD = OPPS APC 5312 $1222.56 + PFS facility $177.69; ASC = ASC $656.75 + PFS facility; office = PFS non-facility $479.97" },
  { id: "45385", code: "45385", label: "Colonoscopy with polyp removal (snare)", category: "Surgery", hopdRate: 1446, ascRate: 880, officeRate: 500,
    basis: "HOPD = OPPS APC 5312 $1222.56 + PFS facility $223.45; ASC = ASC $656.75 + PFS facility; office = PFS non-facility $500.01" },
  { id: "64483", code: "64483", label: "Lumbar transforaminal epidural steroid injection", category: "Surgery", hopdRate: 1003, ascRate: 585, officeRate: 265,
    basis: "HOPD = OPPS APC 5443 $903.63 + PFS facility $99.53; ASC = ASC $485.51 + PFS facility; office = PFS non-facility $264.87" },
  { id: "66984", code: "66984", label: "Cataract removal with lens insertion", category: "Surgery", hopdRate: 2820, ascRate: 1718, officeRate: null,
    basis: "HOPD = OPPS APC 5491 $2357.81 + PFS facility $462.60; ASC = ASC $1255.73 + PFS facility; office = not payable (PFS non-facility NA)" },
  { id: "29881", code: "29881", label: "Knee arthroscopy with meniscectomy", category: "Surgery", hopdRate: 3859, ascRate: 2161, officeRate: null,
    basis: "HOPD = OPPS APC 5113 $3342.87 + PFS facility $515.71; ASC = ASC $1644.87 + PFS facility; office = not payable (PFS non-facility NA)" },
  { id: "49505", code: "49505", label: "Inguinal hernia repair, age 5+", category: "Surgery", hopdRate: 4166, ascRate: 2252, officeRate: null,
    basis: "HOPD = OPPS APC 5341 $3657.95 + PFS facility $508.03; ASC = ASC $1744.22 + PFS facility; office = not payable (PFS non-facility NA)" },
  { id: "47562", code: "47562", label: "Laparoscopic cholecystectomy", category: "Surgery", hopdRate: 6808, ascRate: 3663, officeRate: null,
    basis: "HOPD = OPPS APC 5361 $6176.47 + PFS facility $631.95; ASC = ASC $3030.97 + PFS facility; office = not payable (PFS non-facility NA)" },
];

export const NSA_SPECIALTIES = [
  "Emergency Medicine",
  "Anesthesiology",
  "Radiology",
  "Pathology",
  "Neonatology",
];

// ─── Formatting helpers ──────────────────────────────────────────────────────

export const fmt = (n: number, decimals = 1) =>
  n.toLocaleString("en-US", { maximumFractionDigits: decimals });

export const fmtM = (n: number) => {
  if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
};

export const fmtPct = (n: number) => `${n.toFixed(1)}%`;
