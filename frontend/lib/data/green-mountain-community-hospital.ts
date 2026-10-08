// lib/data/green-mountain-community-hospital.ts
//
// "Green Mountain Community Hospital" (GMCH) — the FICTIONAL worked example of
// HTR_Book_v42 Appendix H ("The HTR Lab Workbook: A Five-Pillar Practicum"):
//   "Use a real organization if you have the data, or 'Green Mountain Community
//    Hospital,' a fictional 25-bed critical-access hospital, as the worked
//    example throughout."
//
// The book gives GMCH no financial inputs, so nothing here is "the book's
// number". To keep the example honest rather than invented, every dollar figure
// is the FIELD-WISE MEDIAN of the eight Vermont Critical Access Hospitals'
// baselines already carried in HospitalFinancialScorecard.tsx (GMCB FY2025
// Hospital Budget Review filings, FY2024 actual-or-projected; see that file's
// header for per-hospital sourcing and for which fields are GMCB-reported vs
// estimated). The eight CAHs: Copley, Grace Cottage, Gifford, Mt. Ascutney,
// North Country, NVRH, Porter, Springfield. Each field's median is taken
// independently, so GMCH is a "typical Vermont CAH" composite, not any one
// hospital. 25 beds is the federal CAH bed cap (42 CFR 485.620), which every
// Vermont CAH sits at or under.
//
// It is NOT a real hospital and NOT real data. Every tool that exposes this
// preset must label it as the book's fictional/illustrative example.

export const GMCH_LABEL = "Green Mountain Community Hospital";
export const GMCH_BADGE = "FICTIONAL · Appendix H worked example";
export const GMCH_DISCLAIMER =
  "Fictional example from the book's Appendix H practicum — not a real hospital and not real data. " +
  "Figures are the median of Vermont's eight Critical Access Hospitals (GMCB FY2024 baselines), " +
  "so the example behaves like a typical Vermont 25-bed CAH.";

export const GMCH = {
  beds: 25,
  peerGroup: "cah" as const,
  // Medians of the 8 Vermont CAH baselines (USD, FY2024).
  totalRevenue: 90_261_079,
  operatingExpense: 90_413_662,
  cashOnHand: 26_234_386,
  annualDebtService: 2_256_527, // estimated field in the source rows (see scorecard header)
  currentAssets: 16_246_994, // estimated field in the source rows
  currentLiabilities: 9_026_108, // estimated field in the source rows
  laborCost: 52_003_472,
  // Payer mix: Vermont statewide share of gross patient revenue (GMCB Hospital
  // Community Report), the same mix the Global Budget Transition Modeler's
  // "Vermont (All-Payer TCOC)" preset uses. No per-CAH payer mix is published.
  medicaidPct: 17,
  medicarePct: 45,
  commercialPct: 37,
  selfPayPct: 1,
  // FTEs: statewide ~17,000 hospital employees (VAHHS) scaled by GMCH's share of
  // statewide NPR (~$2.89B, GMCB FY2023) — an apportionment, not a count.
  fteCount: Math.round((17_000 * 90_261_079) / 2_890_000_000),
} as const;

/** Operating margin implied by the median revenue and expense (≈ −0.2%). */
export const GMCH_OPERATING_MARGIN_PCT =
  ((GMCH.totalRevenue - GMCH.operatingExpense) / GMCH.totalRevenue) * 100;
