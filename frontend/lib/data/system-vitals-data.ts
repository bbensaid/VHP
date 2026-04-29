// Single source of truth for Vermont hospital bed capacity data.
// Used by: app/system-vitals/page.tsx (capacity grid + transfer routing + repatriation)
//          lib/ticker.ts (vitals.csv bed rows are derived from this via scripts/sync-vitals-csv.ts)

export type BedKey = "icu" | "medsurg" | "behavioral" | "snf";

export interface BedCounts {
  total: number;
  avail: number;
}

export interface VTHospital {
  id: string;
  name: string;
  short: string;
  type: "tertiary" | "regional" | "critical";
  region: string;
  beds: Record<BedKey, BedCounts>;
  specialties: string[];
  transfer_center: boolean;
}

export interface RepatPatient {
  id: string;
  name: string;
  age: number;
  dx: string;
  at: string;
  home: string;
  los: number;
  target_los: number;
  days_over: number;
  acuity: BedKey;
  specialty: string;
  blocker: string;
}

export const VT_HOSPITALS: VTHospital[] = [
  { id: "uvmmc", name: "UVM Medical Center", short: "UVMMC", type: "tertiary", region: "Chittenden",
    beds: { icu: { total: 32, avail: 1 }, medsurg: { total: 180, avail: 12 }, behavioral: { total: 24, avail: 4 }, snf: { total: 0, avail: 0 } },
    specialties: ["cardiac", "neuro", "ortho", "psych", "peds", "oncology"], transfer_center: true },
  { id: "dhmc", name: "Dartmouth-Hitchcock (VT pts)", short: "DHMC", type: "tertiary", region: "Upper Valley",
    beds: { icu: { total: 40, avail: 6 }, medsurg: { total: 160, avail: 22 }, behavioral: { total: 18, avail: 2 }, snf: { total: 0, avail: 0 } },
    specialties: ["cardiac", "neuro", "ortho", "psych", "oncology"], transfer_center: true },
  { id: "cvmc", name: "Central VT Medical Center", short: "CVMC", type: "regional", region: "Washington",
    beds: { icu: { total: 12, avail: 4 }, medsurg: { total: 68, avail: 18 }, behavioral: { total: 10, avail: 3 }, snf: { total: 20, avail: 7 } },
    specialties: ["cardiac", "ortho"], transfer_center: false },
  { id: "svmc", name: "Southwestern VT Medical Center", short: "SVMC", type: "regional", region: "Bennington",
    beds: { icu: { total: 8, avail: 3 }, medsurg: { total: 52, avail: 11 }, behavioral: { total: 6, avail: 1 }, snf: { total: 14, avail: 5 } },
    specialties: ["cardiac", "ortho"], transfer_center: false },
  { id: "rrmc", name: "Rutland Regional Medical Center", short: "RRMC", type: "regional", region: "Rutland",
    beds: { icu: { total: 10, avail: 2 }, medsurg: { total: 72, avail: 9 }, behavioral: { total: 8, avail: 0 }, snf: { total: 18, avail: 4 } },
    specialties: ["cardiac", "ortho", "neuro"], transfer_center: false },
  { id: "nvrh", name: "Northeastern VT Regional", short: "NVRH", type: "critical", region: "Caledonia",
    beds: { icu: { total: 4, avail: 2 }, medsurg: { total: 25, avail: 6 }, behavioral: { total: 4, avail: 1 }, snf: { total: 10, avail: 3 } },
    specialties: ["any"], transfer_center: false },
  { id: "nch", name: "North Country Hospital", short: "NCH", type: "critical", region: "Orleans",
    beds: { icu: { total: 4, avail: 1 }, medsurg: { total: 25, avail: 9 }, behavioral: { total: 4, avail: 2 }, snf: { total: 8, avail: 2 } },
    specialties: ["any"], transfer_center: false },
  { id: "pmh", name: "Porter Medical Center", short: "PMH", type: "critical", region: "Addison",
    beds: { icu: { total: 4, avail: 3 }, medsurg: { total: 25, avail: 11 }, behavioral: { total: 0, avail: 0 }, snf: { total: 10, avail: 6 } },
    specialties: ["any"], transfer_center: false },
  { id: "sph", name: "Springfield Hospital", short: "SPH", type: "critical", region: "Windsor South",
    beds: { icu: { total: 2, avail: 0 }, medsurg: { total: 25, avail: 3 }, behavioral: { total: 0, avail: 0 }, snf: { total: 6, avail: 1 } },
    specialties: ["any"], transfer_center: false },
  { id: "gifford", name: "Gifford Medical Center", short: "GMC", type: "critical", region: "Orange",
    beds: { icu: { total: 4, avail: 2 }, medsurg: { total: 25, avail: 8 }, behavioral: { total: 4, avail: 2 }, snf: { total: 12, avail: 5 } },
    specialties: ["any"], transfer_center: false },
  { id: "mah", name: "Mt. Ascutney Hospital", short: "MAH", type: "critical", region: "Windsor North",
    beds: { icu: { total: 2, avail: 1 }, medsurg: { total: 18, avail: 5 }, behavioral: { total: 0, avail: 0 }, snf: { total: 14, avail: 7 } },
    specialties: ["any"], transfer_center: false },
  { id: "bmh", name: "Brattleboro Memorial", short: "BMH", type: "critical", region: "Windham",
    beds: { icu: { total: 4, avail: 2 }, medsurg: { total: 37, avail: 7 }, behavioral: { total: 8, avail: 1 }, snf: { total: 0, avail: 0 } },
    specialties: ["psych", "any"], transfer_center: false },
  { id: "gcottage", name: "Grace Cottage Hospital", short: "GCH", type: "critical", region: "Windham North",
    beds: { icu: { total: 0, avail: 0 }, medsurg: { total: 19, avail: 6 }, behavioral: { total: 0, avail: 0 }, snf: { total: 10, avail: 4 } },
    specialties: ["any"], transfer_center: false },
  { id: "copley", name: "Copley Hospital", short: "CPH", type: "critical", region: "Lamoille",
    beds: { icu: { total: 4, avail: 2 }, medsurg: { total: 25, avail: 9 }, behavioral: { total: 4, avail: 1 }, snf: { total: 8, avail: 3 } },
    specialties: ["any"], transfer_center: false },
];

export const REPAT_PATIENTS: RepatPatient[] = [
  { id: "p1", name: "Patient A", age: 72, dx: "Post-CABG recovery", at: "UVMMC", home: "CVMC", los: 8, target_los: 5, days_over: 3, acuity: "medsurg", specialty: "cardiac", blocker: "Transport coordination pending" },
  { id: "p2", name: "Patient B", age: 58, dx: "Hip replacement rehab", at: "UVMMC", home: "RRMC", los: 6, target_los: 4, days_over: 2, acuity: "snf", specialty: "ortho", blocker: "SNF bed confirmed at RRMC" },
  { id: "p3", name: "Patient C", age: 81, dx: "Stroke — stable", at: "DHMC", home: "NVRH", los: 11, target_los: 7, days_over: 4, acuity: "medsurg", specialty: "neuro", blocker: "Family consent pending" },
  { id: "p4", name: "Patient D", age: 45, dx: "Pneumonia — resolving", at: "UVMMC", home: "NCH", los: 5, target_los: 3, days_over: 2, acuity: "medsurg", specialty: "any", blocker: "Discharge orders placed" },
  { id: "p5", name: "Patient E", age: 67, dx: "Behavioral health stabilization", at: "DHMC", home: "BMH", los: 14, target_los: 10, days_over: 4, acuity: "behavioral", specialty: "psych", blocker: "Bed confirmed at BMH" },
  { id: "p6", name: "Patient F", age: 54, dx: "CHF management", at: "UVMMC", home: "PMH", los: 9, target_los: 6, days_over: 3, acuity: "medsurg", specialty: "cardiac", blocker: "Outpatient cardiology f/u needed" },
];

export function totalAvail(h: VTHospital): number {
  return Object.values(h.beds).reduce((s, b) => s + b.avail, 0);
}

export function totalBeds(h: VTHospital): number {
  return Object.values(h.beds).reduce((s, b) => s + b.total, 0);
}
