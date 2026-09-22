"use client";

import { useState, useMemo } from "react";
import { CheckCircle, AlertTriangle, XCircle, TrendingDown, BadgeCheck, FlaskConical } from "lucide-react";

type PeerGroup = "cah" | "rural_pps" | "urban_community" | "urban_tertiary";

// ─── VERMONT PRESET SCENARIOS ─────────────────────────────────────────────────
//
// DATA SOURCING (queue item #11 — all 14 Vermont hospitals, 2026-09-22)
// ──────────────────────────────────────────────────────────────────────────
// totalRevenue / operatingExpense: REAL, SOURCED. Pulled directly from the
// "Operating Margin Growth" and "Operating Revenue / Operating Expense" tables
// in the Green Mountain Care Board's FY2025 Hospital Budget Review decks
// (the GMCB's own FY2024 actual-or-projected figures — the latest year GMCB
// has audited/near-final numbers for every hospital). Sources:
//   - GMCB, "Hospital Budget Review: Review of Hospital Budget Requests & Key
//     Metrics" (Sept 6 & 9, 2024) — Day 1 (SVMC, Copley, RRMC, Grace Cottage,
//     Gifford, North Country, Mt. Ascutney) and Day 2 (NMC, Brattleboro,
//     NVRH, Springfield, UVMMC, CVMC, Porter) decks.
//     https://gmcboard.vermont.gov/sites/gmcb/files/documents/
//     FY25%20Hospital%20Budget%20Review%20-%20SEPT%20-%20Hospital%20Budget%20
//     Details%20(PART%201).pdf  and  ...(PART%202).pdf
//   - GMCB, "Impact of FY25 Budget Requests & Summary of Staff
//     Recommendations" (Sept 4, 2024) — system-wide NPR/margin/DCOH summary
//     tables cross-checked against the per-hospital decks above.
//     https://gmcboard.vermont.gov/sites/gmcb/files/documents/
//     FY25%20Hospital%20Budget%20Review%20-%20SEPT%20-%20Staff%20Analysis%20
//     and%20Recommendations.pdf
//   - GMCB Press Release, "Green Mountain Care Board Announces FY2025
//     Hospital Budget Decisions and Enforcement of FY2023 Hospital Budgets"
//     (Sept 13, 2024) — confirms the official 14-hospital roster.
// laborCost: SOURCED-DERIVED. Real GMCB "Top Expenses as % of Total Operating
//     Expense" labor share for FY2024, applied to the real FY2024 expense $.
// cashOnHand: SOURCED-DERIVED. Real GMCB "Days Cash on Hand" (FY24 Projected)
//     ratio, converted to a dollar figure via (DCOH × FY24 daily expense).
// currentAssets / currentLiabilities / annualDebtService: ESTIMATED. GMCB
//     publishes Current Ratio and Debt Service Coverage Ratio as charted
//     RATIOS only — never as the underlying dollar figures — so no real $
//     figure exists to cite for these three fields. They are modeled as
//     (a) current liabilities = 10% of FY24 operating revenue, scaled to
//     current assets using this same tool's own peer-benchmark current
//     ratio (see PEER_BENCHMARKS below, itself sourced to the AHA Annual
//     Survey / Kaufman Hall), and (b) annual debt service = 2.5% (CAH),
//     3.0% (Rural PPS) or 1.5% (academic tertiary) of FY24 operating
//     revenue — the same rough ratio the tool's original 3 presets used.
//     Flagged ESTIMATED in the UI (grey "E" chip) wherever shown.
//
// Peer-group / Critical Access Hospital (CAH) designation verified against:
//   - VAHHS, "Critical Access Hospital Overview" (2018): "Eight of Vermont's
//     14 acute-care hospitals are designated CAHs."
//   - Individual GMCB budget narratives, each explicitly stating CAH
//     cost-based Medicare reimbursement for: NVRH, Copley, Springfield,
//     Grace Cottage, Gifford, Mt. Ascutney.
//   - North Country Hospital: confirmed CAH, 25 licensed beds (Vermont
//     hospital directory / CMS).
//   - Porter Medical Center: confirmed CAH (UVM Health Network CAH roster).
//   - Northwestern Medical Center: NOT a CAH — licensed for 70 beds, over
//     the 25-bed federal CAH cap.
//   - Brattleboro Memorial Hospital: NOT currently a CAH — 61 licensed
//     beds; VTDigger/WCAX (2026) report BMH is actively *pursuing* CAH
//     designation (would require cutting its bed count), confirming it is
//     not one of the 8 today.
//   That yields the 8 CAHs used below: NVRH, Copley, Springfield, Grace
//   Cottage, Gifford, Mt. Ascutney, Porter, North Country. The remaining 5
//   non-academic hospitals (Brattleboro, CVMC, Northwestern, Rutland,
//   Southwestern VT) are Rural PPS. UVMMC is the state's only academic
//   tertiary center, mapped to "urban_tertiary" (the closest of this tool's
//   4 peer categories — Vermont has no "urban" hospital in the literal
//   sense).
//
// NOTE ON PRE-EXISTING NVRH / CVMC FIGURES: the tool's original NVRH preset
// used a totalRevenue of $48.2M and CVMC used $185M. Real GMCB FY2024
// figures are $127.4M (NVRH) and $307.7M (CVMC) — both were unsourced
// placeholders, off by more than 2x. They are corrected below using the same
// GMCB deck citations as the 11 newly-added hospitals. Gifford's original
// preset ($58.5M) was reasonably close to its real FY2024 NPR trajectory and
// is replaced here with the exact sourced GMCB figure for consistency.
const VERMONT_PRESETS = [
  {
    id: "bmh",
    label: "Brattleboro Memorial Hospital",
    badge: "Rural PPS · GMCB FY24",
    peerGroup: "rural_pps" as PeerGroup,
    totalRevenue: 117_763_464,
    operatingExpense: 117_935_458,
    cashOnHand: 36_220_845,
    annualDebtService: 3_532_904,
    currentAssets: 24_730_327,
    currentLiabilities: 11_776_346,
    laborCost: 67_223_211,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "cvmc",
    label: "Central VT Medical Center",
    badge: "Rural PPS · GMCB FY24",
    peerGroup: "rural_pps" as PeerGroup,
    totalRevenue: 307_720_295,
    operatingExpense: 305_635_372,
    cashOnHand: 60_792_113,
    annualDebtService: 9_231_609,
    currentAssets: 64_621_262,
    currentLiabilities: 30_772_030,
    laborCost: 195_606_638,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "copley",
    label: "Copley Hospital",
    badge: "CAH · GMCB FY24",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 111_709_076,
    operatingExpense: 111_672_475,
    cashOnHand: 17_714_621,
    annualDebtService: 2_792_727,
    currentAssets: 20_107_634,
    currentLiabilities: 11_170_908,
    laborCost: 60_303_137,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "grace_cottage",
    label: "Grace Cottage Hospital",
    badge: "CAH · GMCB FY24",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 30_075_634,
    operatingExpense: 32_085_830,
    cashOnHand: 7_472_095,
    annualDebtService: 751_891,
    currentAssets: 5_413_614,
    currentLiabilities: 3_007_563,
    laborCost: 22_780_939,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "gifford",
    label: "Gifford Medical Center",
    badge: "CAH · GMCB FY24",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 63_100_782,
    operatingExpense: 65_825_042,
    cashOnHand: 18_232_576,
    annualDebtService: 1_577_520,
    currentAssets: 11_358_140,
    currentLiabilities: 6_310_078,
    laborCost: 34_887_272,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "mt_ascutney",
    label: "Mt. Ascutney Hospital & Health Ctr",
    badge: "CAH · GMCB FY24",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 72_931_426,
    operatingExpense: 72_839_678,
    cashOnHand: 44_801_547,
    annualDebtService: 1_823_286,
    currentAssets: 13_127_657,
    currentLiabilities: 7_293_143,
    laborCost: 43_703_807,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "north_country",
    label: "North Country Hospital",
    badge: "CAH · GMCB FY24",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 107_590_732,
    operatingExpense: 107_987_646,
    cashOnHand: 59_108_051,
    annualDebtService: 2_689_768,
    currentAssets: 19_366_331,
    currentLiabilities: 10_759_073,
    laborCost: 65_872_464,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "nvrh",
    label: "NVRH — Northeastern VT Regional",
    badge: "CAH · GMCB FY24",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 127_353_530,
    operatingExpense: 128_298_007,
    cashOnHand: 34_236_197,
    annualDebtService: 3_183_838,
    currentAssets: 22_923_635,
    currentLiabilities: 12_735_353,
    laborCost: 82_110_724,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "nmc",
    label: "Northwestern Medical Center",
    badge: "Rural PPS · GMCB FY24",
    peerGroup: "rural_pps" as PeerGroup,
    totalRevenue: 134_223_302,
    operatingExpense: 135_270_258,
    cashOnHand: 89_500_644,
    annualDebtService: 4_026_699,
    currentAssets: 28_186_893,
    currentLiabilities: 13_422_330,
    laborCost: 82_514_857,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "porter",
    label: "Porter Medical Center",
    badge: "CAH · GMCB FY24",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 124_316_772,
    operatingExpense: 119_344_460,
    cashOnHand: 36_522_594,
    annualDebtService: 3_107_919,
    currentAssets: 22_377_019,
    currentLiabilities: 12_431_677,
    laborCost: 68_026_342,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "rutland",
    label: "Rutland Regional Medical Center",
    badge: "Rural PPS · GMCB FY24",
    peerGroup: "rural_pps" as PeerGroup,
    totalRevenue: 352_732_684,
    operatingExpense: 345_558_192,
    cashOnHand: 191_808_371,
    annualDebtService: 10_581_981,
    currentAssets: 74_073_863,
    currentLiabilities: 35_273_268,
    laborCost: 193_512_588,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "springfield",
    label: "Springfield Hospital",
    badge: "CAH · GMCB FY24",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 63_902_963,
    operatingExpense: 63_826_600,
    cashOnHand: 8_760_836,
    annualDebtService: 1_597_574,
    currentAssets: 11_502_533,
    currentLiabilities: 6_390_296,
    laborCost: 36_381_162,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "svmc",
    label: "Southwestern VT Medical Center",
    badge: "Rural PPS · GMCB FY24",
    peerGroup: "rural_pps" as PeerGroup,
    totalRevenue: 216_314_408,
    operatingExpense: 213_938_841,
    cashOnHand: 25_614_043,
    annualDebtService: 6_489_432,
    currentAssets: 45_426_026,
    currentLiabilities: 21_631_441,
    laborCost: 130_502_693,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "uvmmc",
    label: "UVM Medical Center",
    badge: "Academic Tertiary · GMCB FY24",
    peerGroup: "urban_tertiary" as PeerGroup,
    totalRevenue: 2_267_584_149,
    operatingExpense: 2_199_398_007,
    cashOnHand: 709_231_552,
    annualDebtService: 34_013_762,
    currentAssets: 634_923_562,
    currentLiabilities: 226_758_415,
    laborCost: 1_253_656_864,
    medicaidCutPct: 0,
    volumeChangePct: 0,
    travelNurseIncreasePct: 0,
    sourced: true,
  },
  {
    id: "act68_rbp",
    label: "Act 68 RBP Scenario (FY2027)",
    badge: "Stress Test · RBP at Medicare +15%",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 127_353_530,
    operatingExpense: 128_298_007,
    cashOnHand: 34_236_197,
    annualDebtService: 3_183_838,
    currentAssets: 22_923_635,
    currentLiabilities: 12_735_353,
    laborCost: 82_110_724,
    medicaidCutPct: 0,
    volumeChangePct: -8,   // RBP compression: commercial revenue at Medicare +15%
    travelNurseIncreasePct: 0,
    sourced: false,
  },
  {
    id: "act68_global_budget",
    label: "Act 68 Global Budget (FY2028–30)",
    badge: "Stress Test · Mandatory Global Hospital Budget",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 127_353_530,
    operatingExpense: 128_298_007,
    cashOnHand: 34_236_197,
    annualDebtService: 3_183_838,
    currentAssets: 22_923_635,
    currentLiabilities: 12_735_353,
    laborCost: 82_110_724,
    medicaidCutPct: 0,
    // A global budget caps total revenue regardless of volume growth, so
    // volume gains that would normally add revenue are modeled as lost
    // upside (negative volumeChangePct), while labor/inflation pressure
    // continues to build against the capped budget (Act 68 §9456; FY2028-30
    // mandatory global hospital budgets, per the book's Ch.6/Ch.15 account).
    volumeChangePct: -3,
    travelNurseIncreasePct: 10,
    sourced: false,
  },
  {
    id: "hr1_cliff",
    label: "H.R. 1 Medicaid Cliff (Post-2030)",
    badge: "Stress Test · $911B Cuts",
    peerGroup: "cah" as PeerGroup,
    totalRevenue: 127_353_530,
    operatingExpense: 128_298_007,
    cashOnHand: 34_236_197,
    annualDebtService: 3_183_838,
    currentAssets: 22_923_635,
    currentLiabilities: 12_735_353,
    laborCost: 82_110_724,
    medicaidCutPct: 12,
    volumeChangePct: -5,
    travelNurseIncreasePct: 15,
    sourced: false,
  },
];

// ─── MULTI-YEAR PROJECTION MODE ───────────────────────────────────────────────
//
// Reproduces the book's cited Oliver Wyman methodology (HTR_Book_v42 §6.9):
// "Under the conservative scenario — 3.5% annual non-340B revenue growth and
// 5% annual expense growth — 13 of 14 hospitals are projected to report
// losses by 2028, with a cumulative 5-year system-wide deficit of $700
// million against break-even." Ch.1's platform table and Ch.15 §H.4 both cite
// this tool as where a reader "reproduces" / makes that finding "your own
// number." The defaults below are exactly those two Oliver Wyman rates,
// applied here to compound forward from THIS tool's own real, sourced FY2024
// per-hospital baselines (see VERMONT_PRESETS above) — not from Oliver
// Wyman's own underlying dataset, which is not public at the hospital level.
// A reader can drag either rate to run their own scenario, which is the
// literal mechanic Ch.15 §H.4 is describing.
const REAL_HOSPITALS = VERMONT_PRESETS.filter(p => p.sourced);
const PROJECTION_BASE_YEAR = 2024; // FY2024 — this tool's real baseline year
const BOOK_DEFAULT_REVENUE_GROWTH = 3.5; // Oliver Wyman conservative scenario, non-340B revenue
const BOOK_DEFAULT_EXPENSE_GROWTH = 5;   // Oliver Wyman conservative scenario, expense growth
const BOOK_DEFAULT_HORIZON_YEARS = 4;    // FY2024 -> FY2028, matching the book's cited endpoint
//
// HONEST RE-RUN RESULT (verified 2026-09-22, at these exact defaults against
// the 14-hospital FY2024 baseline above): 14/14 hospitals in operating loss
// by FY2028 (all 14 already by FY2027), cumulative FY2025-28 system deficit
// ≈ $317M against break-even (≈$581M if the horizon is extended to FY2029,
// a literal 5-year window). This does NOT match the book's cited "13 of 14
// by 2028 / $700M cumulative 5-year deficit" — the hospital count is worse
// (14, not 13) and reached a year earlier, while the dollar figure is lower.
// This is expected, not a bug: this baseline is FY2024 GMCB actuals, while
// Oliver Wyman's published figures were modeled from FY2023 data with
// different 340B treatment and payer-mix assumptions this tool cannot see.
// Do not "fix" the output to land on 13/$700M — see the file's top-of-file
// sourcing note and flag the discrepancy to the book side instead.

const PEER_BENCHMARKS: Record<PeerGroup, {
  label: string;
  operatingMargin: number;
  dayCashOnHand: number;
  debtServiceCoverage: number;
  currentRatio: number;
  laborCostPct: number;
}> = {
  cah: {
    label: "Critical Access Hospital (CAH)",
    operatingMargin: 0.8,
    dayCashOnHand: 45,
    debtServiceCoverage: 2.0,
    currentRatio: 1.8,
    laborCostPct: 52,
  },
  rural_pps: {
    label: "Rural PPS Hospital",
    operatingMargin: 1.2,
    dayCashOnHand: 58,
    debtServiceCoverage: 2.5,
    currentRatio: 2.1,
    laborCostPct: 50,
  },
  urban_community: {
    label: "Urban Community Hospital",
    operatingMargin: 2.0,
    dayCashOnHand: 90,
    debtServiceCoverage: 3.2,
    currentRatio: 2.4,
    laborCostPct: 48,
  },
  urban_tertiary: {
    label: "Urban Tertiary / Academic",
    operatingMargin: 3.1,
    dayCashOnHand: 142,
    debtServiceCoverage: 4.0,
    currentRatio: 2.8,
    laborCostPct: 45,
  },
};

function scoreMetric(value: number, benchmark: number, direction: "higher" | "lower") {
  const ratio = direction === "higher" ? value / benchmark : benchmark / value;
  if (ratio >= 1.15) return "strong";
  if (ratio >= 0.85) return "adequate";
  if (ratio >= 0.60) return "weak";
  return "critical";
}

const STATUS_CONFIG = {
  strong:   { label: "Strong",   icon: CheckCircle,   color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", bar: "bg-emerald-500" },
  adequate: { label: "Adequate", icon: CheckCircle,   color: "text-sky-600",     bg: "bg-sky-50 border-sky-200",         bar: "bg-sky-400" },
  weak:     { label: "Weak",     icon: AlertTriangle, color: "text-amber-600",   bg: "bg-amber-50 border-amber-200",     bar: "bg-amber-400" },
  critical: { label: "Critical", icon: XCircle,       color: "text-rose-600",    bg: "bg-rose-50 border-rose-200",       bar: "bg-rose-500" },
};

function fmt(n: number, dec = 1) { return n.toLocaleString("en-US", { maximumFractionDigits: dec }); }
function fmtUSD(n: number) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "M";
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function HospitalFinancialScorecard() {
  const [mode, setMode] = useState<"stress" | "projection">("stress");
  const [peerGroup, setPeerGroup] = useState<PeerGroup>("cah");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Multi-year projection parameters (default to the book's own cited
  // Oliver Wyman conservative-scenario assumptions)
  const [revenueGrowthPct, setRevenueGrowthPct] = useState(BOOK_DEFAULT_REVENUE_GROWTH);
  const [expenseGrowthPct, setExpenseGrowthPct] = useState(BOOK_DEFAULT_EXPENSE_GROWTH);
  const [horizonYears, setHorizonYears] = useState(BOOK_DEFAULT_HORIZON_YEARS);

  // Base financials
  const [totalRevenue,    setTotalRevenue]    = useState(48_200_000);
  const [operatingExpense, setOperatingExpense] = useState(47_600_000);
  const [cashOnHand,      setCashOnHand]      = useState(5_800_000);
  const [annualDebtService, setAnnualDebtService] = useState(1_200_000);
  const [currentAssets,   setCurrentAssets]   = useState(8_100_000);
  const [currentLiabilities, setCurrentLiabilities] = useState(4_300_000);
  const [laborCost,       setLaborCost]       = useState(25_100_000);

  // Stress test parameters
  const [medicaidCutPct, setMedicaidCutPct] = useState(0);
  const [volumeChangePct, setVolumeChangePct] = useState(0);
  const [travelNurseIncreasePct, setTravelNurseIncreasePct] = useState(0);

  function loadPreset(id: string) {
    const p = VERMONT_PRESETS.find(x => x.id === id);
    if (!p) return;
    setActivePreset(id);
    setPeerGroup(p.peerGroup);
    setTotalRevenue(p.totalRevenue);
    setOperatingExpense(p.operatingExpense);
    setCashOnHand(p.cashOnHand);
    setAnnualDebtService(p.annualDebtService);
    setCurrentAssets(p.currentAssets);
    setCurrentLiabilities(p.currentLiabilities);
    setLaborCost(p.laborCost);
    setMedicaidCutPct(p.medicaidCutPct);
    setVolumeChangePct(p.volumeChangePct);
    setTravelNurseIncreasePct(p.travelNurseIncreasePct);
  }

  const bench = PEER_BENCHMARKS[peerGroup];
  const activePresetData = VERMONT_PRESETS.find(x => x.id === activePreset);

  const results = useMemo(() => {
    // Stress adjustments
    const revenueAdj    = totalRevenue    * (1 + volumeChangePct / 100) * (1 - medicaidCutPct / 100 * 0.15); // Medicaid is ~15% of net rev
    const laborAdj      = laborCost       * (1 + travelNurseIncreasePct / 100 * 0.12); // Travel nurses ~12% of labor
    const expenseAdj    = operatingExpense - laborCost + laborAdj;
    const dailyExpense  = expenseAdj / 365;
    const adjustedMargin = ((revenueAdj - expenseAdj) / revenueAdj) * 100;

    return {
      operatingMargin: adjustedMargin,
      dayCashOnHand: dailyExpense > 0 ? cashOnHand / dailyExpense : 0,
      debtServiceCoverage: annualDebtService > 0
        ? (revenueAdj - expenseAdj + annualDebtService) / annualDebtService
        : 0,
      currentRatio: currentLiabilities > 0 ? currentAssets / currentLiabilities : 0,
      laborCostPct: revenueAdj > 0 ? (laborAdj / revenueAdj) * 100 : 0,
      revenueAdj,
      expenseAdj,
      netIncome: revenueAdj - expenseAdj,
    };
  }, [totalRevenue, operatingExpense, cashOnHand, annualDebtService, currentAssets, currentLiabilities,
      laborCost, medicaidCutPct, volumeChangePct, travelNurseIncreasePct]);

  // Compounds each of the 14 real FY2024 baselines forward year-by-year at
  // the two adjustable growth rates, exactly as Oliver Wyman's cited
  // methodology does (revenue and expense growing at independent constant
  // annual rates, no other stress factors applied).
  const projection = useMemo(() => {
    const targetYear = PROJECTION_BASE_YEAR + horizonYears;

    const hospitalTrajectories = REAL_HOSPITALS.map(h => {
      let revenue = h.totalRevenue;
      let expense = h.operatingExpense;
      const path = [{ year: PROJECTION_BASE_YEAR, revenue, expense, margin: ((revenue - expense) / revenue) * 100 }];
      for (let i = 0; i < horizonYears; i++) {
        revenue = revenue * (1 + revenueGrowthPct / 100);
        expense = expense * (1 + expenseGrowthPct / 100);
        path.push({ year: PROJECTION_BASE_YEAR + i + 1, revenue, expense, margin: ((revenue - expense) / revenue) * 100 });
      }
      return { id: h.id, label: h.label, path };
    });

    const yearlyAggregate = Array.from({ length: horizonYears }, (_, i) => {
      const pathIdx = i + 1; // 0 is the FY2024 baseline row
      const year = PROJECTION_BASE_YEAR + i + 1;
      const rows = hospitalTrajectories.map(h => h.path[pathIdx]);
      const hospitalsInLoss = rows.filter(r => r.margin < 0).length;
      const systemRevenue = rows.reduce((a, r) => a + r.revenue, 0);
      const systemExpense = rows.reduce((a, r) => a + r.expense, 0);
      const systemNetIncome = systemRevenue - systemExpense;
      return { year, hospitalsInLoss, systemRevenue, systemExpense, systemNetIncome, systemMargin: (systemNetIncome / systemRevenue) * 100 };
    });

    const baselineInLoss = hospitalTrajectories.filter(h => h.path[0].margin < 0).length;
    const cumulativeNetIncome = yearlyAggregate.reduce((a, y) => a + y.systemNetIncome, 0);
    const finalYear = yearlyAggregate[yearlyAggregate.length - 1];

    return { targetYear, hospitalTrajectories, yearlyAggregate, baselineInLoss, cumulativeNetIncome, finalYear };
  }, [revenueGrowthPct, expenseGrowthPct, horizonYears]);

  const metrics = [
    { label: "Operating Margin", value: results.operatingMargin, benchmark: bench.operatingMargin, unit: "%", direction: "higher" as const, format: (v: number) => fmt(v, 1) + "%" },
    { label: "Days Cash on Hand", value: results.dayCashOnHand, benchmark: bench.dayCashOnHand, unit: "days", direction: "higher" as const, format: (v: number) => fmt(v, 0) + " days" },
    { label: "Debt Service Coverage", value: results.debtServiceCoverage, benchmark: bench.debtServiceCoverage, unit: "×", direction: "higher" as const, format: (v: number) => fmt(v, 2) + "×" },
    { label: "Current Ratio", value: results.currentRatio, benchmark: bench.currentRatio, unit: "×", direction: "higher" as const, format: (v: number) => fmt(v, 2) + "×" },
    { label: "Labor Cost % of Revenue", value: results.laborCostPct, benchmark: bench.laborCostPct, unit: "%", direction: "lower" as const, format: (v: number) => fmt(v, 1) + "%" },
  ];

  const scores = metrics.map(m => scoreMetric(m.value, m.benchmark, m.direction));
  const criticalCount  = scores.filter(s => s === "critical").length;
  const weakCount      = scores.filter(s => s === "weak").length;
  const overallStatus  = criticalCount >= 2 ? "critical" : criticalCount >= 1 ? "weak" : weakCount >= 2 ? "weak" : "adequate";
  const OverallIcon    = STATUS_CONFIG[overallStatus].icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* ── MODE TOGGLE ── */}
      <div className="flex items-center gap-2 px-6 pt-5 pb-4 border-b border-slate-200 bg-slate-50">
        <button
          onClick={() => setMode("stress")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
            mode === "stress" ? "bg-indigo-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          Single-Year Stress Test
        </button>
        <button
          onClick={() => setMode("projection")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
            mode === "projection" ? "bg-indigo-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          Multi-Year Projection
        </button>
        <span className="text-[10px] text-slate-400 ml-1">
          {mode === "stress"
            ? "One hospital, one year, adjustable shocks."
            : "All 14 real FY2024 baselines, compounded forward under adjustable growth rates."}
        </span>
      </div>

      {mode === "stress" ? (
      <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">

        {/* ── INPUTS ── */}
        <div className="lg:col-span-2 p-6 space-y-5">

          {/* Vermont Presets */}
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-sky-700">Vermont&apos;s 14 Hospitals</p>
              <span className="text-[9px] font-bold text-sky-600">{VERMONT_PRESETS.filter(p => p.sourced).length}/14 GMCB-sourced</span>
            </div>
            <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
              {VERMONT_PRESETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => loadPreset(p.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs transition-all ${
                    activePreset === p.id
                      ? "bg-sky-600 border-sky-700 text-white font-bold"
                      : "bg-white border-sky-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {p.sourced ? (
                      <BadgeCheck size={12} className={activePreset === p.id ? "text-white" : "text-emerald-600"} />
                    ) : (
                      <FlaskConical size={12} className={activePreset === p.id ? "text-white" : "text-amber-600"} />
                    )}
                    {p.label}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${activePreset === p.id ? "text-sky-100" : "text-slate-400"}`}>{p.badge}</div>
                </button>
              ))}
            </div>
            <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">
              <BadgeCheck size={9} className="inline text-emerald-600 mr-0.5 -mt-0.5" />
              Revenue / expense / labor share / days-cash sourced from GMCB FY2025
              Hospital Budget Review filings (FY2024 actual or projected).
              Current assets/liabilities and annual debt service are <strong>estimated</strong>
              (GMCB charts these only as ratios, never as dollar figures) — see code comments for method.
              <FlaskConical size={9} className="inline text-amber-600 ml-1.5 mr-0.5 -mt-0.5" />
              Stress-test scenarios are modeled, not hospital filings.
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Peer Group</label>
            <div className="grid grid-cols-1 gap-2">
              {(Object.entries(PEER_BENCHMARKS) as [PeerGroup, typeof PEER_BENCHMARKS[PeerGroup]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setPeerGroup(key)}
                  className={`text-left px-3 py-2 rounded-xl border text-sm transition-all ${
                    peerGroup === key
                      ? "bg-indigo-50 border-indigo-300 text-indigo-800 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Base Financials</p>
          {[
            { label: "Total Net Revenue", value: totalRevenue, set: setTotalRevenue, min: 5_000_000, max: 2_500_000_000, step: 500_000 },
            { label: "Total Operating Expense", value: operatingExpense, set: setOperatingExpense, min: 5_000_000, max: 2_500_000_000, step: 500_000 },
            { label: "Cash & Investments", value: cashOnHand, set: setCashOnHand, min: 0, max: 800_000_000, step: 500_000 },
            { label: "Annual Debt Service (est.)", value: annualDebtService, set: setAnnualDebtService, min: 0, max: 50_000_000, step: 100_000 },
            { label: "Current Assets (est.)", value: currentAssets, set: setCurrentAssets, min: 1_000_000, max: 700_000_000, step: 500_000 },
            { label: "Current Liabilities (est.)", value: currentLiabilities, set: setCurrentLiabilities, min: 1_000_000, max: 250_000_000, step: 500_000 },
            { label: "Total Labor Costs", value: laborCost, set: setLaborCost, min: 1_000_000, max: 1_300_000_000, step: 500_000 },
          ].map(f => (
            <div key={f.label}>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-slate-600">{f.label}</label>
                <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{fmtUSD(f.value)}</span>
              </div>
              <input type="range" min={f.min} max={f.max} step={f.step} value={f.value}
                onChange={e => f.set(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-indigo-600 cursor-pointer" />
            </div>
          ))}

          {/* Stress Test */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">Stress Test Scenarios</p>
            {[
              { label: "Medicaid Rate Cut (%)", value: medicaidCutPct, set: setMedicaidCutPct, min: 0, max: 20 },
              { label: "Volume Change (%)", value: volumeChangePct, set: setVolumeChangePct, min: -30, max: 20 },
              { label: "Travel Nurse Labor Increase (%)", value: travelNurseIncreasePct, set: setTravelNurseIncreasePct, min: 0, max: 100 },
            ].map(f => (
              <div key={f.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{f.label}</span>
                  <span className={`font-bold ${f.value > 0 && f.label.includes("Cut") ? "text-rose-600" : f.value < 0 ? "text-rose-600" : f.value > 0 ? "text-amber-600" : "text-slate-400"}`}>
                    {f.value > 0 ? "+" : ""}{f.value}%
                  </span>
                </div>
                <input type="range" min={f.min} max={f.max} step={1} value={f.value}
                  onChange={e => f.set(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-rose-200 accent-rose-600 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        {/* ── SCORECARD ── */}
        <div className="lg:col-span-3 p-6 space-y-5 bg-slate-50/50">

          {activePresetData && !activePresetData.sourced && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 text-[11px] font-bold">
              <FlaskConical size={13} className="shrink-0" />
              ESTIMATED SCENARIO — not a hospital filing. This is a modeled stress test built on the
              selected hospital&apos;s real GMCB baseline, not a real reported result.
            </div>
          )}

          {/* Overall status */}
          <div className={`rounded-2xl p-5 border ${STATUS_CONFIG[overallStatus].bg}`}>
            <div className="flex items-center gap-3">
              <OverallIcon size={22} className={`shrink-0 ${STATUS_CONFIG[overallStatus].color}`} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Overall Financial Health</p>
                <p className={`text-2xl font-black ${STATUS_CONFIG[overallStatus].color}`}>
                  {STATUS_CONFIG[overallStatus].label} — {bench.label}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Net income: <strong className={results.netIncome >= 0 ? "text-emerald-600" : "text-rose-500"}>{fmtUSD(results.netIncome)}</strong>
                  {" · "}Rev: {fmtUSD(results.revenueAdj)} · Exp: {fmtUSD(results.expenseAdj)}
                </p>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="space-y-3">
            {metrics.map((m, i) => {
              const status = scores[i];
              const cfg = STATUS_CONFIG[status];
              const Icon = cfg.icon;
              const barPct = Math.min((m.value / (m.benchmark * 2)) * 100, 100);
              const benchBarPct = 50; // benchmark is always at 50%

              return (
                <div key={m.label} className={`bg-white rounded-xl border p-4 ${status === "critical" || status === "weak" ? "border-rose-200" : "border-slate-200"}`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Icon size={14} className={`shrink-0 ${cfg.color}`} />
                        <span className="text-xs font-black text-slate-700">{m.label}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-xl font-black ${cfg.color}`}>{m.format(m.value)}</span>
                      <p className="text-[10px] text-slate-400">peer median: {m.format(m.benchmark)}</p>
                    </div>
                  </div>
                  {/* Bar showing value vs benchmark */}
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`absolute h-full rounded-full transition-all duration-500 ${cfg.bar}`}
                      style={{ width: `${barPct}%` }} />
                    {/* Benchmark marker */}
                    <div className="absolute top-0 h-full w-0.5 bg-slate-400"
                      style={{ left: `${benchBarPct}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-300 mt-0.5">
                    <span>0</span>
                    <span>Peer Median</span>
                    <span>2×</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stress test impact note */}
          {(medicaidCutPct > 0 || volumeChangePct !== 0 || travelNurseIncreasePct > 0) && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              <TrendingDown size={14} className="shrink-0 mt-0.5" />
              Stress test active — results reflect a {medicaidCutPct > 0 ? `${medicaidCutPct}% Medicaid cut` : ""}
              {medicaidCutPct > 0 && volumeChangePct !== 0 ? ", " : ""}
              {volumeChangePct !== 0 ? `${volumeChangePct > 0 ? "+" : ""}${volumeChangePct}% volume change` : ""}
              {travelNurseIncreasePct > 0 ? `${medicaidCutPct > 0 || volumeChangePct !== 0 ? ", " : ""}+${travelNurseIncreasePct}% travel nurse labor increase` : ""}.
            </div>
          )}

          <p className="text-[10px] text-slate-400 leading-relaxed">
            Peer benchmarks based on AHA Annual Survey 2024 and Kaufman Hall National Hospital Flash Report.
            Hospital baselines sourced from Green Mountain Care Board FY2025 Hospital Budget Review filings
            (FY2024 actual/projected) — see source citations in the component&apos;s code comments. Stress-test
            parameters apply proportional adjustments and are modeled scenarios, not filings. For planning
            purposes only.
          </p>
        </div>
      </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">

        {/* ── PROJECTION INPUTS ── */}
        <div className="lg:col-span-2 p-6 space-y-5">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-sky-700 mb-2">Multi-Year Projection</p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Compounds all <strong>14 real, GMCB-sourced FY2024 baselines</strong> above forward
              year-by-year at the growth rates below — independent of the hospital picker and
              single-year stress sliders, which don&apos;t apply here.
            </p>
            <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">
              <BadgeCheck size={9} className="inline text-emerald-600 mr-0.5 -mt-0.5" />
              Defaults reproduce HTR_Book_v42 §6.9&apos;s cited Oliver Wyman
              &quot;conservative scenario&quot; growth rates (3.5%/yr revenue, 5%/yr expense),
              applied here to this tool&apos;s own real FY2024 baselines — not Oliver Wyman&apos;s
              underlying dataset, which isn&apos;t public at the hospital level. Drag either rate
              to run your own scenario.
            </p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-slate-600">Annual Revenue Growth</label>
              <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{revenueGrowthPct.toFixed(1)}%</span>
            </div>
            <input type="range" min={0} max={10} step={0.1} value={revenueGrowthPct}
              onChange={e => setRevenueGrowthPct(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-indigo-600 cursor-pointer" />
            <p className="text-[9px] text-slate-400 mt-1">Oliver Wyman conservative scenario: 3.5%/yr (non-340B revenue).</p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-slate-600">Annual Expense Growth</label>
              <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{expenseGrowthPct.toFixed(1)}%</span>
            </div>
            <input type="range" min={0} max={10} step={0.1} value={expenseGrowthPct}
              onChange={e => setExpenseGrowthPct(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-rose-600 cursor-pointer" />
            <p className="text-[9px] text-slate-400 mt-1">Oliver Wyman conservative scenario: 5%/yr.</p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-slate-600">Projection Horizon</label>
              <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {horizonYears} yr{horizonYears !== 1 ? "s" : ""} · FY{projection.targetYear}
              </span>
            </div>
            <input type="range" min={1} max={8} step={1} value={horizonYears}
              onChange={e => setHorizonYears(parseInt(e.target.value, 10))}
              className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-indigo-600 cursor-pointer" />
            <p className="text-[9px] text-slate-400 mt-1">Default (4 yrs) lands on FY2028, the book&apos;s cited endpoint.</p>
          </div>

          <button
            onClick={() => {
              setRevenueGrowthPct(BOOK_DEFAULT_REVENUE_GROWTH);
              setExpenseGrowthPct(BOOK_DEFAULT_EXPENSE_GROWTH);
              setHorizonYears(BOOK_DEFAULT_HORIZON_YEARS);
            }}
            className="w-full text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg py-2 hover:bg-indigo-100 transition-all"
          >
            Reset to Book&apos;s Default Assumptions
          </button>
        </div>

        {/* ── PROJECTION RESULTS ── */}
        <div className="lg:col-span-3 p-6 space-y-5 bg-slate-50/50">

          {/* Headline numbers */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-2xl p-4 border ${projection.finalYear.hospitalsInLoss >= 10 ? "bg-rose-50 border-rose-200" : "bg-amber-50 border-amber-200"}`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Hospitals in Operating Loss</p>
              <p className={`text-3xl font-black ${projection.finalYear.hospitalsInLoss >= 10 ? "text-rose-600" : "text-amber-600"}`}>
                {projection.finalYear.hospitalsInLoss} <span className="text-lg text-slate-400 font-bold">/ 14</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-1">by FY{projection.targetYear} · vs. {projection.baselineInLoss}/14 in the FY2024 baseline</p>
            </div>
            <div className={`rounded-2xl p-4 border ${projection.cumulativeNetIncome < 0 ? "bg-rose-50 border-rose-200" : "bg-emerald-50 border-emerald-200"}`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Cumulative System Result</p>
              <p className={`text-3xl font-black ${projection.cumulativeNetIncome < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                {projection.cumulativeNetIncome < 0 ? "-" : "+"}{fmtUSD(Math.abs(projection.cumulativeNetIncome))}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">
                {projection.cumulativeNetIncome < 0 ? "deficit" : "surplus"} vs. break-even, FY{PROJECTION_BASE_YEAR + 1}–FY{projection.targetYear}
              </p>
            </div>
          </div>

          {/* Year-by-year table */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">System-Wide, Year by Year</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[9px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-200">
                    <th className="py-1.5 pr-3">Fiscal Year</th>
                    <th className="py-1.5 pr-3 text-right">In Loss</th>
                    <th className="py-1.5 pr-3 text-right">System Margin</th>
                    <th className="py-1.5 text-right">System Net Income</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 text-slate-400">
                    <td className="py-1.5 pr-3 font-bold">FY{PROJECTION_BASE_YEAR} (baseline)</td>
                    <td className="py-1.5 pr-3 text-right">{projection.baselineInLoss} / 14</td>
                    <td className="py-1.5 pr-3 text-right" colSpan={2}>real, unprojected</td>
                  </tr>
                  {projection.yearlyAggregate.map(y => (
                    <tr key={y.year} className="border-b border-slate-100 last:border-0">
                      <td className="py-1.5 pr-3 font-bold text-slate-700">FY{y.year}</td>
                      <td className={`py-1.5 pr-3 text-right font-bold ${y.hospitalsInLoss >= 10 ? "text-rose-600" : y.hospitalsInLoss >= 5 ? "text-amber-600" : "text-slate-600"}`}>
                        {y.hospitalsInLoss} / 14
                      </td>
                      <td className={`py-1.5 pr-3 text-right ${y.systemMargin < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                        {fmt(y.systemMargin, 2)}%
                      </td>
                      <td className={`py-1.5 text-right font-bold ${y.systemNetIncome < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                        {y.systemNetIncome < 0 ? "-" : "+"}{fmtUSD(Math.abs(y.systemNetIncome))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Per-hospital margin trajectory */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Per-Hospital Operating Margin</p>
            <div className="overflow-x-auto max-h-[320px]">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-left text-[9px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-200 sticky top-0 bg-white">
                    <th className="py-1.5 pr-3">Hospital</th>
                    {projection.hospitalTrajectories[0].path.map(p => (
                      <th key={p.year} className="py-1.5 px-2 text-right">FY{p.year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projection.hospitalTrajectories.map(h => (
                    <tr key={h.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-1.5 pr-3 font-bold text-slate-700 whitespace-nowrap">{h.label}</td>
                      {h.path.map(p => (
                        <td key={p.year} className={`py-1.5 px-2 text-right font-bold ${p.margin < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                          {fmt(p.margin, 1)}%
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed">
            Projection compounds each hospital&apos;s real FY2024 total net revenue and total
            operating expense (Green Mountain Care Board FY2025 Hospital Budget Review filings)
            independently at the two rates above — no volume, payer-mix, or labor-market factors
            beyond what those two rates imply, matching Oliver Wyman&apos;s stated methodology.
            &quot;In loss&quot; means a negative operating margin in that fiscal year. Cumulative
            system result sums net income (profits and losses together) across all 14 hospitals
            for every projected year. This is a re-derivation from this tool&apos;s own baseline,
            not a reproduction of Oliver Wyman&apos;s published FY2023-based figures — see this
            component&apos;s file-header comment and the platform team&apos;s notes for how the
            two compare.
          </p>
        </div>
      </div>
      )}
    </div>
  );
}
