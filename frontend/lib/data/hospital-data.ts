export interface Hospital {
  id: string;
  name: string;
  city: string;
  type: "Critical Access" | "Rural PPS" | "Urban";
  totalDischarges: number;
  avgLengthOfStay: number;
  qualityScore: number;
}

export const hospitalData: Record<string, Hospital[]> = {
  vermont: [
    { id: "vt-1", name: "North Country Hospital", city: "Newport", type: "Rural PPS", totalDischarges: 2100, avgLengthOfStay: 4.1, qualityScore: 88 },
    { id: "vt-2", name: "Brattleboro Memorial Hospital", city: "Brattleboro", type: "Rural PPS", totalDischarges: 3200, avgLengthOfStay: 3.9, qualityScore: 91 },
    { id: "vt-3", name: "Gifford Medical Center", city: "Randolph", type: "Critical Access", totalDischarges: 850, avgLengthOfStay: 3.2, qualityScore: 94 },
    { id: "vt-4", name: "Copley Hospital", city: "Morrisville", type: "Critical Access", totalDischarges: 950, avgLengthOfStay: 3.5, qualityScore: 85 },
  ],
  illinois: [
    { id: "il-1", name: "Sarah Bush Lincoln Health Center", city: "Mattoon", type: "Rural PPS", totalDischarges: 7500, avgLengthOfStay: 4.8, qualityScore: 82 },
    { id: "il-2", name: "Massac Memorial Hospital", city: "Metropolis", type: "Critical Access", totalDischarges: 1200, avgLengthOfStay: 3.1, qualityScore: 89 },
    { id: "il-3", name: "Gibson Area Hospital", city: "Gibson City", type: "Critical Access", totalDischarges: 1100, avgLengthOfStay: 3.3, qualityScore: 92 },
    { id: "il-4", name: "St. Joseph's Hospital", city: "Highland", type: "Rural PPS", totalDischarges: 4100, avgLengthOfStay: 4.2, qualityScore: 88 },
  ],
  texas: [
      { id: "tx-1", name: "Childress Regional Medical Center", city: "Childress", type: "Critical Access", totalDischarges: 980, avgLengthOfStay: 2.9, qualityScore: 85},
      { id: "tx-2", name: "Yoakum Community Hospital", city: "Yoakum", type: "Rural PPS", totalDischarges: 1500, avgLengthOfStay: 3.8, qualityScore: 81},
      { id: "tx-3", name: "Big Bend Regional Medical Center", city: "Alpine", type: "Rural PPS", totalDischarges: 2000, avgLengthOfStay: 4.0, qualityScore: 78},
  ],
  california: [
    { id: "ca-1", name: "Adventist Health Howard Memorial", city: "Willits", type: "Critical Access", totalDischarges: 1300, avgLengthOfStay: 3.0, qualityScore: 93},
    { id: "ca-2", name: "Pioneers Memorial Healthcare District", city: "Brawley", type: "Rural PPS", totalDischarges: 5500, avgLengthOfStay: 4.5, qualityScore: 84},
    { id: "ca-3", name: "Feather River Hospital", city: "Paradise", type: "Rural PPS", totalDischarges: 3000, avgLengthOfStay: 4.1, qualityScore: 88},
  ],
  mississippi: [
      { id: "ms-1", name: "Sharkey-Issaquena Community Hospital", city: "Rolling Fork", type: "Critical Access", totalDischarges: 450, avgLengthOfStay: 2.5, qualityScore: 75},
      { id: "ms-2", name: "Southwest Mississippi Regional Med Center", city: "McComb", type: "Rural PPS", totalDischarges: 6000, avgLengthOfStay: 5.1, qualityScore: 79},
  ]
};
