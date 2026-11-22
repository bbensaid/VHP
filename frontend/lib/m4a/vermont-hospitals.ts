/**
 * Vermont hospital inputs for the Single-Payer Modeler. Every number is copied from a saved source.
 *
 *  - Total and commercial net patient revenue (NPR), FY2027 as approved: GMCB FY27 budget decisions
 *    (lib/data/gmcb-fy27-budget-orders.ts; press release Sept 15, 2026).
 *  - FY2027 submitted operating expense: GMCB, "FY27 – AUG – Staff Overview (Final)", page 27, expense table
 *    (book-audit/deep/sources/gmcb_fy27_staff_overview_2026-08.txt, lines 534–548).
 *  - FY2027 submitted operating margin: same document, page 31, "Operating Margin" table (lines 674–683).
 *    GMCB excludes Brattleboro Memorial Hospital from both tables, so BMH has no expense or margin here.
 *  - Cost of uncompensated care (charity care + bad debt, at cost): CMS Hospital Provider Cost Report,
 *    fiscal years ending in 2024 (book-audit/deep/sources/m4a/cms_cost_report_2024_vt.json).
 *  - Critical access status: CMS certification number 4713xx.
 *
 * Basis caveat: NPR is the approved budget; expense and margin are the hospital's submission. GMCB's
 * orders changed commercial rates, so the two bases differ slightly. The Modeler says so on screen.
 */
import { GMCB_FY27_ORDERS } from "../data/gmcb-fy27-budget-orders";

export interface VtHospitalInput {
  id: string;
  name: string;
  short: string;
  cah: boolean;
  totalNpr: number;
  commercialNpr: number;
  /** FY27 submitted operating expense; null where GMCB does not report it (BMH). */
  opExpense: number | null;
  /** FY27 submitted operating margin, as a fraction (−0.017 = −1.7%); null for BMH. */
  opMargin: number | null;
  /** Cost of uncompensated care, cost-report FY ending 2024. */
  uncompensatedCost: number;
  ccn: string;
}

const EXTRA: Record<string, { short: string; cah: boolean; opExpense: number | null; opMarginPct: number | null; uncomp: number; ccn: string }> = {
  bmh:           { short: "BMH",     cah: false, opExpense: null,          opMarginPct: null, uncomp: 2_919_457, ccn: "470011" },
  cvmc:          { short: "CVMC",    cah: false, opExpense: 344_674_967,   opMarginPct: -1.0, uncomp: 2_258_721, ccn: "470001" },
  copley:        { short: "Copley",  cah: true,  opExpense: 130_659_875,   opMarginPct: 2.0,  uncomp: 2_284_191, ccn: "471305" },
  gifford:       { short: "Gifford", cah: true,  opExpense: 67_501_089,    opMarginPct: 1.2,  uncomp: 353_991,   ccn: "471301" },
  grace_cottage: { short: "Grace Cottage", cah: true, opExpense: 32_996_706, opMarginPct: 0.2, uncomp: 847_801, ccn: "471300" },
  mt_ascutney:   { short: "Mt. Ascutney", cah: true, opExpense: 82_552_173, opMarginPct: 0.0, uncomp: 1_598_782, ccn: "471302" },
  north_country: { short: "North Country", cah: true, opExpense: 115_880_395, opMarginPct: -3.1, uncomp: 3_538_515, ccn: "471304" },
  nvrh:          { short: "NVRH",    cah: true,  opExpense: 138_973_288,   opMarginPct: 0.7,  uncomp: 3_337_662, ccn: "471303" },
  nmc:           { short: "NMC",     cah: false, opExpense: 158_089_419,   opMarginPct: -2.9, uncomp: 4_060_102, ccn: "470024" },
  porter:        { short: "Porter",  cah: true,  opExpense: 131_285_449,   opMarginPct: 8.6,  uncomp: 1_391_772, ccn: "471307" },
  rutland:       { short: "Rutland", cah: false, opExpense: 382_974_456,   opMarginPct: -2.3, uncomp: 7_729_878, ccn: "470005" },
  svmc:          { short: "SVMC",    cah: false, opExpense: 240_278_762,   opMarginPct: 0.0,  uncomp: 3_789_334, ccn: "470012" },
  springfield:   { short: "Springfield", cah: true, opExpense: 74_801_591, opMarginPct: 1.5, uncomp: 2_686_474, ccn: "471306" },
  uvmmc:         { short: "UVMMC",   cah: false, opExpense: 2_534_546_075, opMarginPct: -1.7, uncomp: 22_650_227, ccn: "470003" },
};

export const VT_HOSPITALS: VtHospitalInput[] = GMCB_FY27_ORDERS.map((o) => {
  const x = EXTRA[o.id];
  if (!x) throw new Error(`No modeler inputs for ${o.id}`);
  return {
    id: o.id, name: o.hospital, short: x.short, cah: x.cah, ccn: x.ccn,
    totalNpr: o.totalNpr, commercialNpr: o.commercialNpr,
    opExpense: x.opExpense, opMargin: x.opMarginPct === null ? null : x.opMarginPct / 100,
    uncompensatedCost: x.uncomp,
  };
});

export interface PricePreset { id: string; label: string; pct: number; source: string; url: string }

/** Commercial hospital prices as a percent of Medicare: three published measures. They differ in method. */
export const COMMERCIAL_PRICE_PRESETS: PricePreset[] = [
  { id: "rand", label: "RAND (2022 claims)", pct: 283, source: "RAND Hospital Price Transparency Project, Vermont findings for the GMCB (Aug 2024): inpatient + outpatient facility prices, 14 hospitals", url: "https://gmcboard.vermont.gov/sites/gmcb/files/documents/RAND%20hospital_August-2024-VT.pdf" },
  { id: "vsea", label: "State employee & teacher plans (2018–Q3 2023)", pct: 289, source: "GMCB, Reference-Based Pricing Data Analysis Report (Dec 16, 2024): VSEA and VEHI hospital payments, claims from 2018 through the third quarter of 2023", url: "https://gmcboard.vermont.gov/sites/gmcb/files/documents/GMCB_RBP_Report_Draft_12_16_24_PDFA.pdf" },
  { id: "gmcb", label: "GMCB price tool (2025; not like-for-like)", pct: 453, source: "GMCB FY27 Staff Overview (Aug 2026), p. 77, citing the GMCB Hospital Price Transparency Tool, Release 2: average commercial price across all hospital services. Its method differs from RAND's (outpatient 503% vs RAND 311%), so it is shown as a sensitivity, not a like-for-like measure", url: "https://gmcboard.vermont.gov/sites/gmcb/files/documents/FY27%20-%20AUG%20-%20Staff%20Overview%20(Final).pdf" },
];

export const SOURCE_LINKS = {
  orders: { label: "GMCB, FY27 Hospital Budget Decisions (Sept 15, 2026)", url: "https://gmcboard.vermont.gov/sites/gmcb/files/documents/Press%20Release%20-%20FY27%20Hospital%20Budget%20Review%20Decisions%20-%2009.14.2026%281%29.pdf" },
  staff: { label: "GMCB, FY27 Hospital Budget Review: Staff Overview (Aug 2026), pp. 27, 31, 77", url: "https://gmcboard.vermont.gov/sites/gmcb/files/documents/FY27%20-%20AUG%20-%20Staff%20Overview%20(Final).pdf" },
  cms: { label: "CMS, Hospital Provider Cost Report, 2024 release (Vermont rows)", url: "https://data.cms.gov/provider-compliance/cost-reports/hospital-provider-cost-report" },
  rbp200: { label: "GMCB RBP report (Dec 2024), citing Oliver Wyman's Act 167 recommendation: \"ideally at 200% of Medicare or less for PPS hospitals\"", url: "https://gmcboard.vermont.gov/sites/gmcb/files/documents/GMCB_RBP_Report_Draft_12_16_24_PDFA.pdf" },
};
