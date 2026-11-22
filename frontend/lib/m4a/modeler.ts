/**
 * Single-Payer Modeler engine: pure functions, no React. Tested by scripts/test-m4a-modeler.cjs.
 *
 * Two Vermont lenses, both applied to each hospital's FY2027 budget:
 *
 *  A. RATE-BASED single payer (the design CBO analyzed): every patient is paid one rate, set as a percent
 *     of Medicare. Commercial revenue is repriced from today's commercial price (R% of Medicare) to the new
 *     rate (P%): commercial × P / R. Non-commercial revenue is treated as paid at Medicare rates today, so it
 *     scales by P / 100. That is a simplification: Medicaid pays less than Medicare, so the model UNDERSTATES
 *     the gain for Medicaid-heavy hospitals. Optionally, the cost of uncompensated care is paid, because
 *     everyone is covered.
 *
 *  B. S.1506 § 611 GLOBAL BUDGET: an institution's quarterly lump sum is "payment in full for all operating
 *     expenses", negotiated from its costs and volume, and § 615(a) bars payments for "the profit or net
 *     revenue of the provider". HTR models this as operating revenue equal to operating expense: margin 0.
 *     Capital is budgeted separately (§ 615(b)), so it is outside this comparison.
 */
import { VT_HOSPITALS, type VtHospitalInput } from "./vermont-hospitals";

export interface RateParams {
  /** Commercial price today, % of Medicare (e.g. 283). */
  commercialPct: number;
  /** Single-payer rate, % of Medicare (e.g. 100). */
  ratePct: number;
  /** Pay the cost of uncompensated care (everyone covered). */
  payUncompensated: boolean;
  /**
   * Pay critical access hospitals at cost (operating revenue = operating expense), as Medicare largely does today
   * (CMS MLN006400: CAHs are paid 101% of reasonable costs). Off by default.
   */
  cahAtCost?: boolean;
  /**
   * What Medicaid pays today, as % of Medicare (sensitivity; review nice-to-have 15). Default 100 = the original
   * simplification that all non-commercial revenue is Medicare-rate. Medicaid's share of each hospital's
   * non-commercial revenue is proxied by its Medicaid share of Medicare+Medicaid inpatient days (CMS cost report).
   */
  medicaidPctOfMedicare?: number;
}

export interface GlobalParams {
  /** Remove depreciation (CMS cost report, FY ending 2024) from the budget: S.1506 funds capital separately. */
  excludeDepreciation?: boolean;
}

export interface HospitalResult {
  id: string;
  short: string;
  name: string;
  cah: boolean;
  totalNpr: number;
  commercialShare: number;
  revenueChange: number;
  /** Change as a share of FY27 approved NPR. */
  changePctOfNpr: number;
  /** Operating revenue implied by FY27 submitted expense and margin; null for BMH. */
  opRevenue: number | null;
  marginBefore: number | null;
  marginAfter: number | null;
  note?: string;
}

export interface Totals {
  totalNpr: number;
  revenueChange: number;
  changePctOfNpr: number;
  /** Hospitals (with margin data) whose operating margin is negative after the change. */
  inDeficitAfter: number;
  inDeficitBefore: number;
  withMargin: number;
}

/** FY27 submitted operating revenue = submitted expense + submitted operating income (GMCB pp. 27, 25). */
export function impliedOpRevenue(h: VtHospitalInput): number | null {
  if (h.opExpense === null || h.opIncome === null) return null;
  return h.opExpense + h.opIncome;
}

/** FY27 submitted operating margin, exact (income / revenue). */
export function marginBeforeOf(h: VtHospitalInput): number | null {
  const rev = impliedOpRevenue(h);
  return rev === null || h.opIncome === null ? null : h.opIncome / rev;
}

/** Medicaid share of a hospital's non-commercial revenue, proxied by Medicaid / (Medicare + Medicaid) inpatient days. */
export function medicaidShare(h: VtHospitalInput): number {
  const d = h.medicareDays + h.medicaidDays;
  return d > 0 ? h.medicaidDays / d : 0;
}

function marginAfter(h: VtHospitalInput, change: number): number | null {
  const rev = impliedOpRevenue(h);
  if (rev === null || h.opExpense === null) return null;
  const after = rev + change;
  return after <= 0 ? -Infinity : (after - h.opExpense) / after;
}

function result(h: VtHospitalInput, change: number): HospitalResult {
  return {
    id: h.id, short: h.short, name: h.name, cah: h.cah, totalNpr: h.totalNpr,
    commercialShare: h.commercialNpr / h.totalNpr,
    revenueChange: change, changePctOfNpr: change / h.totalNpr,
    opRevenue: impliedOpRevenue(h), marginBefore: marginBeforeOf(h), marginAfter: marginAfter(h, change),
    ...(h.note ? { note: h.note } : {}),
  };
}

export function rateBasedChange(h: VtHospitalInput, p: RateParams): number {
  const commercial = h.commercialNpr;
  const other = h.totalNpr - commercial;
  const newCommercial = (commercial * p.ratePct) / p.commercialPct;
  const mPct = p.medicaidPctOfMedicare ?? 100;
  const medicaid = other * medicaidShare(h);
  const newOther = ((other - medicaid) * p.ratePct) / 100 + (medicaid * p.ratePct) / mPct;
  return newCommercial - commercial + (newOther - other) + (p.payUncompensated ? h.uncompensatedCost : 0);
}

export function runRateBased(p: RateParams, hospitals: VtHospitalInput[] = VT_HOSPITALS): HospitalResult[] {
  return hospitals.map((h) => {
    if (p.cahAtCost && h.cah) {
      const rev = impliedOpRevenue(h);
      if (rev !== null && h.opExpense !== null) return result(h, h.opExpense - rev);
    }
    return result(h, rateBasedChange(h, p));
  });
}

/**
 * S.1506 § 611 global budget modeled as operating revenue = operating expense (an upper bound). With
 * excludeDepreciation, the budget covers expense minus depreciation, since § 611(b)(3) excludes capital. Operating
 * revenue here nets in other operating revenue and treats provider tax as an allowable cost (both are in GMCB's
 * figures). BMH has no data.
 */
export function runGlobalBudget(hospitals: VtHospitalInput[] = VT_HOSPITALS, g: GlobalParams = {}): HospitalResult[] {
  return hospitals.map((h) => {
    const rev = impliedOpRevenue(h);
    const budget = h.opExpense === null ? 0 : h.opExpense - (g.excludeDepreciation ? h.depreciation : 0);
    const change = rev === null || h.opExpense === null ? 0 : budget - rev;
    const r = result(h, change);
    return rev === null ? { ...r, revenueChange: NaN, changePctOfNpr: NaN, marginAfter: null } : r;
  });
}

/**
 * The single rate (% of Medicare) at which total revenue across all 14 hospitals is unchanged, given today's
 * commercial price. If uncompensated care is paid, the rate is lowered so that, together with that payment, the
 * statewide total is still unchanged (the default view; independent review 2026-11-21, must-fix 1).
 */
export function revenueNeutralRatePct(commercialPct: number, hospitals: VtHospitalInput[] = VT_HOSPITALS, payUncompensated = false, medicaidPctOfMedicare = 100): number {
  const total = hospitals.reduce((s, h) => s + h.totalNpr, 0);
  const uncomp = payUncompensated ? hospitals.reduce((s, h) => s + h.uncompensatedCost, 0) : 0;
  const medicareEquivalent = hospitals.reduce((s, h) => {
    const other = h.totalNpr - h.commercialNpr;
    const medicaid = other * medicaidShare(h);
    return s + (h.commercialNpr * 100) / commercialPct + (other - medicaid) + (medicaid * 100) / medicaidPctOfMedicare;
  }, 0);
  return (100 * (total - uncomp)) / medicareEquivalent;
}

export function totals(rows: HospitalResult[]): Totals {
  const valid = rows.filter((r) => Number.isFinite(r.revenueChange));
  // Denominator covers only the hospitals whose change is computed (13 in the global-budget lens, not 14).
  const totalNpr = valid.reduce((s, r) => s + r.totalNpr, 0);
  const change = valid.reduce((s, r) => s + r.revenueChange, 0);
  const withM = rows.filter((r) => r.marginBefore !== null);
  return {
    totalNpr, revenueChange: change, changePctOfNpr: change / totalNpr,
    inDeficitAfter: withM.filter((r) => (r.marginAfter ?? 0) < 0).length,
    inDeficitBefore: withM.filter((r) => (r.marginBefore ?? 0) < 0).length,
    withMargin: withM.length,
  };
}

/** CBO, May 12 2022 testimony: the national figures the Modeler shows. Ranges across five illustrative options. */
export const CBO_NATIONAL = {
  federalSubsidies2030: { low: 1.5, high: 3.0 },
  nationalSpending2030: { low: -0.7, high: 0.3 },
  gdp2030Pct: { low: -10, high: -1 },
  lowerVsHigherRate: { hospitals: -13, physicians: -7, drugs: -23, federalSubsidiesPct: -12, nationalSpendingPct: -9, supplyPct: -2, unmetDemandPts: 2 },
};
