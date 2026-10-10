// GMCB FY2027 hospital budget decisions — per hospital.
//
// SOURCE (fetched and text-extracted 2026-10-09):
//   Green Mountain Care Board, "Green Mountain Care Board Approves FY27
//   Hospital Budgets" (press release, Sept 15 2026; decisions completed
//   Sept 14 2026), table "FY27 Hospital Budget Decisions" —
//   https://gmcboard.vermont.gov/sites/gmcb/files/documents/
//   Press%20Release%20-%20FY27%20Hospital%20Budget%20Review%20Decisions%20-%2009.14.2026%281%29.pdf
//   Individual budget orders were issued Oct 1 2026 (gmcboard.vermont.gov
//   RSS: "Budget Order - FY27 <hospital> - 10.01.2026").
//
// Statewide: total NPR $3,802.6M (+1.6% vs FY26 approved budgets),
// commercial NPR $1,936.9M (−1.2%), commercial reimbursement rates −2.9%.
// UVMMC commercial rate −4.4% (3–2 vote).
//
// Every number below is copied from that table. Changes are versus FY26
// APPROVED budgets (not FY26 projected actuals).

export interface Fy27BudgetOrder {
  /** HospitalFinancialScorecard preset id */
  id: string;
  hospital: string;
  totalNpr: number;
  totalNprChangePct: number;
  commercialNpr: number;
  commercialNprChangePct: number;
  commercialRateChangePct: number;
}

export const GMCB_FY27_SOURCE = {
  label: "GMCB, FY27 Hospital Budget Decisions (press release, Sept 15 2026)",
  url: "https://gmcboard.vermont.gov/sites/gmcb/files/documents/Press%20Release%20-%20FY27%20Hospital%20Budget%20Review%20Decisions%20-%2009.14.2026%281%29.pdf",
};

export const GMCB_FY27_STATEWIDE = {
  totalNpr: 3_802_585_620,
  totalNprChangePct: 1.6,
  commercialNpr: 1_936_889_939,
  commercialNprChangePct: -1.2,
  commercialRateChangePct: -2.9,
};

export const GMCB_FY27_ORDERS: Fy27BudgetOrder[] = [
  { id: "bmh",           hospital: "Brattleboro Memorial Hospital",          totalNpr: 113_490_959,   totalNprChangePct: 0.0,  commercialNpr: 60_810_430,    commercialNprChangePct: 0.0,  commercialRateChangePct: 0.0 },
  { id: "cvmc",          hospital: "Central Vermont Medical Center",         totalNpr: 316_216_073,   totalNprChangePct: 4.9,  commercialNpr: 143_120_162,   commercialNprChangePct: -1.0, commercialRateChangePct: -0.8 },
  { id: "copley",        hospital: "Copley Hospital",                        totalNpr: 127_740_089,   totalNprChangePct: -0.9, commercialNpr: 60_944_456,    commercialNprChangePct: 1.2,  commercialRateChangePct: -1.0 },
  { id: "gifford",       hospital: "Gifford Medical Center",                 totalNpr: 66_802_520,    totalNprChangePct: 2.7,  commercialNpr: 26_594_317,    commercialNprChangePct: -8.8, commercialRateChangePct: -3.7 },
  { id: "grace_cottage", hospital: "Grace Cottage Hospital",                 totalNpr: 30_827_709,    totalNprChangePct: 2.1,  commercialNpr: 7_721_373,     commercialNprChangePct: -0.7, commercialRateChangePct: -1.4 },
  { id: "mt_ascutney",   hospital: "Mt. Ascutney Hospital & Health Ctr",     totalNpr: 74_720_667,    totalNprChangePct: -0.8, commercialNpr: 25_148_794,    commercialNprChangePct: -1.0, commercialRateChangePct: -1.0 },
  { id: "north_country", hospital: "North Country Hospital",                 totalNpr: 108_528_153,   totalNprChangePct: 1.1,  commercialNpr: 50_464_549,    commercialNprChangePct: -5.0, commercialRateChangePct: -1.2 },
  { id: "nvrh",          hospital: "Northeastern VT Regional Hospital",      totalNpr: 134_120_544,   totalNprChangePct: 2.1,  commercialNpr: 63_667_747,    commercialNprChangePct: -0.6, commercialRateChangePct: -1.2 },
  { id: "nmc",           hospital: "Northwestern Medical Center",            totalNpr: 143_466_562,   totalNprChangePct: 7.1,  commercialNpr: 68_929_669,    commercialNprChangePct: 2.0,  commercialRateChangePct: 2.0 },
  { id: "porter",        hospital: "Porter Medical Center",                  totalNpr: 139_310_772,   totalNprChangePct: 3.3,  commercialNpr: 67_348_739,    commercialNprChangePct: -1.3, commercialRateChangePct: -1.0 },
  { id: "rutland",       hospital: "Rutland Regional Medical Center",        totalNpr: 335_525_891,   totalNprChangePct: -0.3, commercialNpr: 163_499_908,   commercialNprChangePct: -1.0, commercialRateChangePct: -2.6 },
  { id: "svmc",          hospital: "Southwestern VT Medical Center",         totalNpr: 219_692_732,   totalNprChangePct: 2.3,  commercialNpr: 110_943_386,   commercialNprChangePct: -1.0, commercialRateChangePct: -2.0 },
  { id: "springfield",   hospital: "Springfield Hospital",                   totalNpr: 75_697_938,    totalNprChangePct: 8.4,  commercialNpr: 32_847_055,    commercialNprChangePct: -1.8, commercialRateChangePct: 2.0 },
  { id: "uvmmc",         hospital: "The University of Vermont Medical Center", totalNpr: 1_916_445_011, totalNprChangePct: 1.0,  commercialNpr: 1_054_849_354, commercialNprChangePct: -1.3, commercialRateChangePct: -4.4 },
];

export function fy27OrderFor(id: string): Fy27BudgetOrder | undefined {
  return GMCB_FY27_ORDERS.find(o => o.id === id);
}
