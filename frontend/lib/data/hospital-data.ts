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

  // ── NORTHEAST ────────────────────────────────────────────────────────────────

  vermont: [
    { id: "vt-1", name: "North Country Hospital", city: "Newport", type: "Rural PPS", totalDischarges: 2100, avgLengthOfStay: 4.1, qualityScore: 88 },
    { id: "vt-2", name: "Brattleboro Memorial Hospital", city: "Brattleboro", type: "Rural PPS", totalDischarges: 3200, avgLengthOfStay: 3.9, qualityScore: 91 },
    { id: "vt-3", name: "Gifford Medical Center", city: "Randolph", type: "Critical Access", totalDischarges: 850, avgLengthOfStay: 3.2, qualityScore: 94 },
    { id: "vt-4", name: "Copley Hospital", city: "Morrisville", type: "Critical Access", totalDischarges: 950, avgLengthOfStay: 3.5, qualityScore: 85 },
  ],

  maine: [
    { id: "me-1", name: "Calais Regional Hospital", city: "Calais", type: "Critical Access", totalDischarges: 780, avgLengthOfStay: 3.4, qualityScore: 82 },
    { id: "me-2", name: "Penobscot Bay Medical Center", city: "Rockport", type: "Rural PPS", totalDischarges: 4100, avgLengthOfStay: 4.2, qualityScore: 88 },
    { id: "me-3", name: "Down East Community Hospital", city: "Machias", type: "Critical Access", totalDischarges: 620, avgLengthOfStay: 3.1, qualityScore: 79 },
  ],

  new_hampshire: [
    { id: "nh-1", name: "Androscoggin Valley Hospital", city: "Berlin", type: "Critical Access", totalDischarges: 1100, avgLengthOfStay: 3.6, qualityScore: 83 },
    { id: "nh-2", name: "Huggins Hospital", city: "Wolfeboro", type: "Critical Access", totalDischarges: 920, avgLengthOfStay: 3.3, qualityScore: 86 },
    { id: "nh-3", name: "Littleton Regional Healthcare", city: "Littleton", type: "Critical Access", totalDischarges: 1050, avgLengthOfStay: 3.5, qualityScore: 84 },
  ],

  massachusetts: [
    { id: "ma-1", name: "Heywood Hospital", city: "Gardner", type: "Rural PPS", totalDischarges: 5200, avgLengthOfStay: 4.0, qualityScore: 89 },
    { id: "ma-2", name: "Fairview Hospital", city: "Great Barrington", type: "Critical Access", totalDischarges: 1400, avgLengthOfStay: 3.2, qualityScore: 92 },
    { id: "ma-3", name: "Nantucket Cottage Hospital", city: "Nantucket", type: "Critical Access", totalDischarges: 480, avgLengthOfStay: 2.8, qualityScore: 91 },
  ],

  connecticut: [
    { id: "ct-1", name: "Sharon Hospital", city: "Sharon", type: "Critical Access", totalDischarges: 1200, avgLengthOfStay: 3.5, qualityScore: 85 },
    { id: "ct-2", name: "Johnson Memorial Hospital", city: "Stafford Springs", type: "Rural PPS", totalDischarges: 3800, avgLengthOfStay: 4.1, qualityScore: 82 },
    { id: "ct-3", name: "Windham Hospital", city: "Willimantic", type: "Rural PPS", totalDischarges: 4500, avgLengthOfStay: 4.3, qualityScore: 80 },
  ],

  rhode_island: [
    { id: "ri-1", name: "Westerly Hospital", city: "Westerly", type: "Rural PPS", totalDischarges: 3600, avgLengthOfStay: 3.9, qualityScore: 88 },
    { id: "ri-2", name: "Landmark Medical Center", city: "Woonsocket", type: "Rural PPS", totalDischarges: 5100, avgLengthOfStay: 4.2, qualityScore: 83 },
  ],

  new_york: [
    { id: "ny-1", name: "Canton-Potsdam Hospital", city: "Potsdam", type: "Rural PPS", totalDischarges: 3900, avgLengthOfStay: 4.4, qualityScore: 84 },
    { id: "ny-2", name: "O'Connor Hospital", city: "Delhi", type: "Critical Access", totalDischarges: 750, avgLengthOfStay: 3.2, qualityScore: 81 },
    { id: "ny-3", name: "Lewis County General Hospital", city: "Lowville", type: "Critical Access", totalDischarges: 820, avgLengthOfStay: 3.4, qualityScore: 83 },
    { id: "ny-4", name: "Adirondack Medical Center", city: "Saranac Lake", type: "Rural PPS", totalDischarges: 2800, avgLengthOfStay: 4.0, qualityScore: 87 },
  ],

  pennsylvania: [
    { id: "pa-1", name: "Lock Haven Hospital", city: "Lock Haven", type: "Rural PPS", totalDischarges: 3200, avgLengthOfStay: 4.1, qualityScore: 83 },
    { id: "pa-2", name: "Bucktail Medical Center", city: "Renovo", type: "Critical Access", totalDischarges: 440, avgLengthOfStay: 3.0, qualityScore: 78 },
    { id: "pa-3", name: "Miners Medical Center", city: "Hastings", type: "Critical Access", totalDischarges: 680, avgLengthOfStay: 3.3, qualityScore: 80 },
    { id: "pa-4", name: "Geisinger Jersey Shore Hospital", city: "Jersey Shore", type: "Rural PPS", totalDischarges: 2600, avgLengthOfStay: 3.8, qualityScore: 86 },
  ],

  new_jersey: [
    { id: "nj-1", name: "Inspira Medical Center Elmer", city: "Elmer", type: "Rural PPS", totalDischarges: 4200, avgLengthOfStay: 4.3, qualityScore: 84 },
    { id: "nj-2", name: "Cape Regional Medical Center", city: "Cape May Court House", type: "Rural PPS", totalDischarges: 3800, avgLengthOfStay: 4.0, qualityScore: 82 },
  ],

  delaware: [
    { id: "de-1", name: "Nanticoke Memorial Hospital", city: "Seaford", type: "Rural PPS", totalDischarges: 5400, avgLengthOfStay: 4.5, qualityScore: 80 },
    { id: "de-2", name: "Beebe Healthcare", city: "Lewes", type: "Rural PPS", totalDischarges: 7200, avgLengthOfStay: 4.2, qualityScore: 84 },
  ],

  maryland: [
    { id: "md-1", name: "University of Maryland Shore Medical Center at Easton", city: "Easton", type: "Rural PPS", totalDischarges: 6800, avgLengthOfStay: 4.6, qualityScore: 86 },
    { id: "md-2", name: "Garrett Regional Medical Center", city: "Oakland", type: "Critical Access", totalDischarges: 1100, avgLengthOfStay: 3.4, qualityScore: 83 },
    { id: "md-3", name: "Meritus Medical Center", city: "Hagerstown", type: "Urban", totalDischarges: 14500, avgLengthOfStay: 5.1, qualityScore: 81 },
  ],

  // ── SOUTH ─────────────────────────────────────────────────────────────────────

  texas: [
    { id: "tx-1", name: "Childress Regional Medical Center", city: "Childress", type: "Critical Access", totalDischarges: 980, avgLengthOfStay: 2.9, qualityScore: 85 },
    { id: "tx-2", name: "Yoakum Community Hospital", city: "Yoakum", type: "Rural PPS", totalDischarges: 1500, avgLengthOfStay: 3.8, qualityScore: 81 },
    { id: "tx-3", name: "Big Bend Regional Medical Center", city: "Alpine", type: "Rural PPS", totalDischarges: 2000, avgLengthOfStay: 4.0, qualityScore: 78 },
    { id: "tx-4", name: "Pecos County Memorial Hospital", city: "Fort Stockton", type: "Critical Access", totalDischarges: 860, avgLengthOfStay: 3.1, qualityScore: 76 },
  ],

  florida: [
    { id: "fl-1", name: "Calhoun-Liberty Hospital", city: "Blountstown", type: "Critical Access", totalDischarges: 540, avgLengthOfStay: 3.0, qualityScore: 74 },
    { id: "fl-2", name: "Putnam Community Medical Center", city: "Palatka", type: "Rural PPS", totalDischarges: 4800, avgLengthOfStay: 4.6, qualityScore: 78 },
    { id: "fl-3", name: "Lake City Medical Center", city: "Lake City", type: "Rural PPS", totalDischarges: 5200, avgLengthOfStay: 4.4, qualityScore: 76 },
  ],

  georgia: [
    { id: "ga-1", name: "Appling Healthcare System", city: "Baxley", type: "Critical Access", totalDischarges: 820, avgLengthOfStay: 3.6, qualityScore: 72 },
    { id: "ga-2", name: "Dodge County Hospital", city: "Eastman", type: "Critical Access", totalDischarges: 740, avgLengthOfStay: 3.3, qualityScore: 69 },
    { id: "ga-3", name: "Upson Regional Medical Center", city: "Thomaston", type: "Rural PPS", totalDischarges: 3200, avgLengthOfStay: 4.5, qualityScore: 74 },
  ],

  north_carolina: [
    { id: "nc-1", name: "Maria Parham Medical Center", city: "Henderson", type: "Rural PPS", totalDischarges: 4400, avgLengthOfStay: 4.6, qualityScore: 79 },
    { id: "nc-2", name: "Ashe Memorial Hospital", city: "Jefferson", type: "Critical Access", totalDischarges: 860, avgLengthOfStay: 3.4, qualityScore: 82 },
    { id: "nc-3", name: "Onslow Memorial Hospital", city: "Jacksonville", type: "Rural PPS", totalDischarges: 7200, avgLengthOfStay: 4.2, qualityScore: 80 },
  ],

  virginia: [
    { id: "va-1", name: "Russell County Medical Center", city: "Lebanon", type: "Critical Access", totalDischarges: 1100, avgLengthOfStay: 3.8, qualityScore: 78 },
    { id: "va-2", name: "Dickenson Community Hospital", city: "Clintwood", type: "Critical Access", totalDischarges: 640, avgLengthOfStay: 3.2, qualityScore: 75 },
    { id: "va-3", name: "Carilion Giles Community Hospital", city: "Pearisburg", type: "Critical Access", totalDischarges: 980, avgLengthOfStay: 3.5, qualityScore: 82 },
  ],

  west_virginia: [
    { id: "wv-1", name: "Grafton City Hospital", city: "Grafton", type: "Critical Access", totalDischarges: 620, avgLengthOfStay: 3.8, qualityScore: 68 },
    { id: "wv-2", name: "Summers County ARH Hospital", city: "Hinton", type: "Critical Access", totalDischarges: 540, avgLengthOfStay: 3.5, qualityScore: 70 },
    { id: "wv-3", name: "Minnie Hamilton Health System", city: "Grantsville", type: "Critical Access", totalDischarges: 480, avgLengthOfStay: 3.2, qualityScore: 73 },
    { id: "wv-4", name: "Webster County Memorial Hospital", city: "Webster Springs", type: "Critical Access", totalDischarges: 420, avgLengthOfStay: 3.6, qualityScore: 66 },
  ],

  alabama: [
    { id: "al-1", name: "Florala Memorial Hospital", city: "Florala", type: "Critical Access", totalDischarges: 480, avgLengthOfStay: 3.2, qualityScore: 69 },
    { id: "al-2", name: "Coosa Valley Medical Center", city: "Sylacauga", type: "Rural PPS", totalDischarges: 4200, avgLengthOfStay: 5.0, qualityScore: 72 },
    { id: "al-3", name: "Bullock County Hospital", city: "Union Springs", type: "Critical Access", totalDischarges: 360, avgLengthOfStay: 3.0, qualityScore: 65 },
  ],

  mississippi: [
    { id: "ms-1", name: "Sharkey-Issaquena Community Hospital", city: "Rolling Fork", type: "Critical Access", totalDischarges: 450, avgLengthOfStay: 2.5, qualityScore: 75 },
    { id: "ms-2", name: "Southwest Mississippi Regional Med Center", city: "McComb", type: "Rural PPS", totalDischarges: 6000, avgLengthOfStay: 5.1, qualityScore: 79 },
    { id: "ms-3", name: "Jefferson County Hospital", city: "Fayette", type: "Critical Access", totalDischarges: 320, avgLengthOfStay: 2.8, qualityScore: 63 },
  ],

  louisiana: [
    { id: "la-1", name: "Sabine Medical Center", city: "Many", type: "Critical Access", totalDischarges: 680, avgLengthOfStay: 3.5, qualityScore: 70 },
    { id: "la-2", name: "Abbeville General Hospital", city: "Abbeville", type: "Rural PPS", totalDischarges: 3600, avgLengthOfStay: 4.8, qualityScore: 73 },
    { id: "la-3", name: "Tensas Parish Hospital", city: "St. Joseph", type: "Critical Access", totalDischarges: 380, avgLengthOfStay: 3.0, qualityScore: 64 },
  ],

  tennessee: [
    { id: "tn-1", name: "Jellico Community Hospital", city: "Jellico", type: "Critical Access", totalDischarges: 780, avgLengthOfStay: 3.8, qualityScore: 72 },
    { id: "tn-2", name: "Harton Hospital", city: "Tullahoma", type: "Rural PPS", totalDischarges: 4600, avgLengthOfStay: 4.5, qualityScore: 76 },
    { id: "tn-3", name: "Hardeman County Medical Center", city: "Bolivar", type: "Critical Access", totalDischarges: 520, avgLengthOfStay: 3.3, qualityScore: 68 },
  ],

  kentucky: [
    { id: "ky-1", name: "McDowell ARH Hospital", city: "McDowell", type: "Critical Access", totalDischarges: 620, avgLengthOfStay: 3.9, qualityScore: 70 },
    { id: "ky-2", name: "Logan Memorial Hospital", city: "Russellville", type: "Rural PPS", totalDischarges: 3400, avgLengthOfStay: 4.6, qualityScore: 73 },
    { id: "ky-3", name: "Bourbon Community Hospital", city: "Paris", type: "Critical Access", totalDischarges: 980, avgLengthOfStay: 3.5, qualityScore: 75 },
  ],

  south_carolina: [
    { id: "sc-1", name: "Barnwell County Hospital", city: "Barnwell", type: "Critical Access", totalDischarges: 560, avgLengthOfStay: 3.4, qualityScore: 71 },
    { id: "sc-2", name: "Marlboro Park Hospital", city: "Bennettsville", type: "Rural PPS", totalDischarges: 3200, avgLengthOfStay: 4.7, qualityScore: 74 },
    { id: "sc-3", name: "Colleton Medical Center", city: "Walterboro", type: "Rural PPS", totalDischarges: 4100, avgLengthOfStay: 4.5, qualityScore: 76 },
  ],

  arkansas: [
    { id: "ar-1", name: "Drew Memorial Health System", city: "Monticello", type: "Critical Access", totalDischarges: 860, avgLengthOfStay: 3.6, qualityScore: 72 },
    { id: "ar-2", name: "Ashley County Medical Center", city: "Crossett", type: "Critical Access", totalDischarges: 740, avgLengthOfStay: 3.4, qualityScore: 70 },
    { id: "ar-3", name: "Baxter Regional Medical Center", city: "Mountain Home", type: "Rural PPS", totalDischarges: 5800, avgLengthOfStay: 4.8, qualityScore: 78 },
  ],

  oklahoma: [
    { id: "ok-1", name: "McCurtain Memorial Hospital", city: "Idabel", type: "Rural PPS", totalDischarges: 2800, avgLengthOfStay: 4.5, qualityScore: 68 },
    { id: "ok-2", name: "Pushmataha Hospital", city: "Antlers", type: "Critical Access", totalDischarges: 460, avgLengthOfStay: 3.1, qualityScore: 65 },
    { id: "ok-3", name: "Memorial Hospital of Texas County", city: "Guymon", type: "Critical Access", totalDischarges: 820, avgLengthOfStay: 3.4, qualityScore: 72 },
  ],

  // ── MIDWEST ───────────────────────────────────────────────────────────────────

  ohio: [
    { id: "oh-1", name: "Holzer Medical Center", city: "Gallipolis", type: "Rural PPS", totalDischarges: 5400, avgLengthOfStay: 4.8, qualityScore: 79 },
    { id: "oh-2", name: "Hocking Valley Community Hospital", city: "Logan", type: "Critical Access", totalDischarges: 1100, avgLengthOfStay: 3.5, qualityScore: 82 },
    { id: "oh-3", name: "Wayne Healthcare", city: "Greenville", type: "Rural PPS", totalDischarges: 4200, avgLengthOfStay: 4.2, qualityScore: 80 },
  ],

  michigan: [
    { id: "mi-1", name: "Baraga County Memorial Hospital", city: "L'Anse", type: "Critical Access", totalDischarges: 580, avgLengthOfStay: 3.3, qualityScore: 78 },
    { id: "mi-2", name: "Aspirus Ontonagon Hospital", city: "Ontonagon", type: "Critical Access", totalDischarges: 340, avgLengthOfStay: 3.0, qualityScore: 75 },
    { id: "mi-3", name: "Munising Memorial Hospital", city: "Munising", type: "Critical Access", totalDischarges: 620, avgLengthOfStay: 3.4, qualityScore: 80 },
    { id: "mi-4", name: "Hillsdale Hospital", city: "Hillsdale", type: "Rural PPS", totalDischarges: 3800, avgLengthOfStay: 4.3, qualityScore: 83 },
  ],

  indiana: [
    { id: "in-1", name: "Jay County Hospital", city: "Portland", type: "Critical Access", totalDischarges: 980, avgLengthOfStay: 3.6, qualityScore: 79 },
    { id: "in-2", name: "Greene County General Hospital", city: "Linton", type: "Critical Access", totalDischarges: 860, avgLengthOfStay: 3.4, qualityScore: 77 },
    { id: "in-3", name: "Wabash County Hospital", city: "Wabash", type: "Rural PPS", totalDischarges: 3600, avgLengthOfStay: 4.2, qualityScore: 80 },
  ],

  illinois: [
    { id: "il-1", name: "Sarah Bush Lincoln Health Center", city: "Mattoon", type: "Rural PPS", totalDischarges: 7500, avgLengthOfStay: 4.8, qualityScore: 82 },
    { id: "il-2", name: "Massac Memorial Hospital", city: "Metropolis", type: "Critical Access", totalDischarges: 1200, avgLengthOfStay: 3.1, qualityScore: 89 },
    { id: "il-3", name: "Gibson Area Hospital", city: "Gibson City", type: "Critical Access", totalDischarges: 1100, avgLengthOfStay: 3.3, qualityScore: 92 },
    { id: "il-4", name: "St. Joseph's Hospital", city: "Highland", type: "Rural PPS", totalDischarges: 4100, avgLengthOfStay: 4.2, qualityScore: 88 },
  ],

  wisconsin: [
    { id: "wi-1", name: "Grant Regional Health Center", city: "Lancaster", type: "Critical Access", totalDischarges: 720, avgLengthOfStay: 3.2, qualityScore: 86 },
    { id: "wi-2", name: "Memorial Medical Center", city: "Ashland", type: "Rural PPS", totalDischarges: 3400, avgLengthOfStay: 4.1, qualityScore: 83 },
    { id: "wi-3", name: "Rusk County Memorial Hospital", city: "Ladysmith", type: "Critical Access", totalDischarges: 640, avgLengthOfStay: 3.3, qualityScore: 80 },
  ],

  minnesota: [
    { id: "mn-1", name: "Kittson Healthcare", city: "Hallock", type: "Critical Access", totalDischarges: 380, avgLengthOfStay: 3.0, qualityScore: 84 },
    { id: "mn-2", name: "Sanford Worthington Medical Center", city: "Worthington", type: "Rural PPS", totalDischarges: 4200, avgLengthOfStay: 4.0, qualityScore: 88 },
    { id: "mn-3", name: "Cook County Health", city: "Grand Marais", type: "Critical Access", totalDischarges: 480, avgLengthOfStay: 3.1, qualityScore: 87 },
  ],

  iowa: [
    { id: "ia-1", name: "Guttenberg Municipal Hospital", city: "Guttenberg", type: "Critical Access", totalDischarges: 540, avgLengthOfStay: 3.2, qualityScore: 85 },
    { id: "ia-2", name: "Keosauqua Area Care Center", city: "Keosauqua", type: "Critical Access", totalDischarges: 380, avgLengthOfStay: 2.9, qualityScore: 80 },
    { id: "ia-3", name: "Mercy Medical Center - North Iowa", city: "Mason City", type: "Urban", totalDischarges: 9200, avgLengthOfStay: 4.6, qualityScore: 86 },
  ],

  missouri: [
    { id: "mo-1", name: "Ozarks Healthcare", city: "West Plains", type: "Rural PPS", totalDischarges: 5600, avgLengthOfStay: 5.0, qualityScore: 75 },
    { id: "mo-2", name: "Texas County Memorial Hospital", city: "Houston", type: "Critical Access", totalDischarges: 780, avgLengthOfStay: 3.6, qualityScore: 72 },
    { id: "mo-3", name: "Scotland County Hospital", city: "Memphis", type: "Critical Access", totalDischarges: 440, avgLengthOfStay: 3.2, qualityScore: 70 },
  ],

  kansas: [
    { id: "ks-1", name: "Greeley County Health Services", city: "Tribune", type: "Critical Access", totalDischarges: 280, avgLengthOfStay: 2.8, qualityScore: 76 },
    { id: "ks-2", name: "Kiowa District Healthcare", city: "Kiowa", type: "Critical Access", totalDischarges: 360, avgLengthOfStay: 3.0, qualityScore: 74 },
    { id: "ks-3", name: "Via Christi Hospital Pittsburg", city: "Pittsburg", type: "Rural PPS", totalDischarges: 5200, avgLengthOfStay: 4.6, qualityScore: 80 },
  ],

  nebraska: [
    { id: "ne-1", name: "Dundy County Hospital", city: "Benkelman", type: "Critical Access", totalDischarges: 320, avgLengthOfStay: 2.9, qualityScore: 78 },
    { id: "ne-2", name: "Kimball Health Services", city: "Kimball", type: "Critical Access", totalDischarges: 420, avgLengthOfStay: 3.1, qualityScore: 76 },
    { id: "ne-3", name: "Faith Regional Health Services", city: "Norfolk", type: "Rural PPS", totalDischarges: 5800, avgLengthOfStay: 4.4, qualityScore: 83 },
  ],

  north_dakota: [
    { id: "nd-1", name: "Mountrail County Medical Center", city: "Stanley", type: "Critical Access", totalDischarges: 360, avgLengthOfStay: 3.0, qualityScore: 80 },
    { id: "nd-2", name: "Towner County Medical Center", city: "Cando", type: "Critical Access", totalDischarges: 280, avgLengthOfStay: 2.8, qualityScore: 77 },
    { id: "nd-3", name: "CHI St. Alexius Health - Bismarck", city: "Bismarck", type: "Urban", totalDischarges: 11200, avgLengthOfStay: 5.0, qualityScore: 85 },
  ],

  south_dakota: [
    { id: "sd-1", name: "Lookout Memorial Hospital", city: "Spearfish", type: "Critical Access", totalDischarges: 920, avgLengthOfStay: 3.3, qualityScore: 82 },
    { id: "sd-2", name: "Avera Gregory Healthcare Center", city: "Gregory", type: "Critical Access", totalDischarges: 400, avgLengthOfStay: 3.0, qualityScore: 78 },
    { id: "sd-3", name: "Sanford USD Medical Center", city: "Sioux Falls", type: "Urban", totalDischarges: 18600, avgLengthOfStay: 5.2, qualityScore: 88 },
  ],

  // ── WEST ──────────────────────────────────────────────────────────────────────

  california: [
    { id: "ca-1", name: "Adventist Health Howard Memorial", city: "Willits", type: "Critical Access", totalDischarges: 1300, avgLengthOfStay: 3.0, qualityScore: 93 },
    { id: "ca-2", name: "Pioneers Memorial Healthcare District", city: "Brawley", type: "Rural PPS", totalDischarges: 5500, avgLengthOfStay: 4.5, qualityScore: 84 },
    { id: "ca-3", name: "Feather River Hospital", city: "Paradise", type: "Rural PPS", totalDischarges: 3000, avgLengthOfStay: 4.1, qualityScore: 88 },
    { id: "ca-4", name: "Sutter Lakeside Hospital", city: "Lakeport", type: "Critical Access", totalDischarges: 1100, avgLengthOfStay: 3.2, qualityScore: 86 },
  ],

  washington: [
    { id: "wa-1", name: "Garfield County Public Hospital", city: "Pomeroy", type: "Critical Access", totalDischarges: 280, avgLengthOfStay: 2.8, qualityScore: 79 },
    { id: "wa-2", name: "Columbia County Health System", city: "Dayton", type: "Critical Access", totalDischarges: 480, avgLengthOfStay: 3.1, qualityScore: 82 },
    { id: "wa-3", name: "Confluence Health Central Campus", city: "Wenatchee", type: "Rural PPS", totalDischarges: 7400, avgLengthOfStay: 4.5, qualityScore: 86 },
  ],

  oregon: [
    { id: "or-1", name: "Harney District Hospital", city: "Burns", type: "Critical Access", totalDischarges: 420, avgLengthOfStay: 3.1, qualityScore: 80 },
    { id: "or-2", name: "Lake District Hospital", city: "Lakeview", type: "Critical Access", totalDischarges: 380, avgLengthOfStay: 2.9, qualityScore: 78 },
    { id: "or-3", name: "Sky Lakes Medical Center", city: "Klamath Falls", type: "Rural PPS", totalDischarges: 6200, avgLengthOfStay: 4.4, qualityScore: 84 },
  ],

  idaho: [
    { id: "id-1", name: "Bear Lake Memorial Hospital", city: "Montpelier", type: "Critical Access", totalDischarges: 520, avgLengthOfStay: 3.2, qualityScore: 79 },
    { id: "id-2", name: "Clearwater Valley Hospital", city: "Orofino", type: "Critical Access", totalDischarges: 640, avgLengthOfStay: 3.4, qualityScore: 77 },
    { id: "id-3", name: "St. Luke's Magic Valley Medical Center", city: "Twin Falls", type: "Rural PPS", totalDischarges: 8400, avgLengthOfStay: 4.6, qualityScore: 85 },
  ],

  montana: [
    { id: "mt-1", name: "Daniels Memorial Healthcare Center", city: "Scobey", type: "Critical Access", totalDischarges: 240, avgLengthOfStay: 2.7, qualityScore: 75 },
    { id: "mt-2", name: "Garfield County Health Center", city: "Jordan", type: "Critical Access", totalDischarges: 180, avgLengthOfStay: 2.5, qualityScore: 72 },
    { id: "mt-3", name: "Billings Clinic", city: "Billings", type: "Urban", totalDischarges: 13400, avgLengthOfStay: 5.2, qualityScore: 87 },
  ],

  wyoming: [
    { id: "wy-1", name: "Platte County Memorial Hospital", city: "Wheatland", type: "Critical Access", totalDischarges: 620, avgLengthOfStay: 3.3, qualityScore: 77 },
    { id: "wy-2", name: "Niobrara Health and Life Center", city: "Lusk", type: "Critical Access", totalDischarges: 320, avgLengthOfStay: 2.9, qualityScore: 73 },
    { id: "wy-3", name: "Wyoming Medical Center", city: "Casper", type: "Urban", totalDischarges: 10800, avgLengthOfStay: 5.0, qualityScore: 84 },
  ],

  colorado: [
    { id: "co-1", name: "Prowers Medical Center", city: "Lamar", type: "Critical Access", totalDischarges: 820, avgLengthOfStay: 3.4, qualityScore: 82 },
    { id: "co-2", name: "Rio Grande Hospital", city: "Del Norte", type: "Critical Access", totalDischarges: 560, avgLengthOfStay: 3.1, qualityScore: 80 },
    { id: "co-3", name: "Valley View Hospital", city: "Glenwood Springs", type: "Rural PPS", totalDischarges: 4400, avgLengthOfStay: 4.2, qualityScore: 86 },
  ],

  utah: [
    { id: "ut-1", name: "Garfield Memorial Hospital", city: "Panguitch", type: "Critical Access", totalDischarges: 380, avgLengthOfStay: 2.9, qualityScore: 84 },
    { id: "ut-2", name: "Sanpete Valley Hospital", city: "Mount Pleasant", type: "Critical Access", totalDischarges: 660, avgLengthOfStay: 3.2, qualityScore: 82 },
    { id: "ut-3", name: "Intermountain Fillmore Community Hospital", city: "Fillmore", type: "Critical Access", totalDischarges: 480, avgLengthOfStay: 3.0, qualityScore: 86 },
  ],

  nevada: [
    { id: "nv-1", name: "Grover C. Dils Medical Center", city: "Caliente", type: "Critical Access", totalDischarges: 320, avgLengthOfStay: 3.0, qualityScore: 74 },
    { id: "nv-2", name: "Banner Churchill Community Hospital", city: "Fallon", type: "Critical Access", totalDischarges: 1100, avgLengthOfStay: 3.4, qualityScore: 78 },
    { id: "nv-3", name: "Renown Regional Medical Center", city: "Reno", type: "Urban", totalDischarges: 16200, avgLengthOfStay: 5.1, qualityScore: 82 },
  ],

  arizona: [
    { id: "az-1", name: "Copper Queen Community Hospital", city: "Bisbee", type: "Critical Access", totalDischarges: 680, avgLengthOfStay: 3.3, qualityScore: 78 },
    { id: "az-2", name: "Yuma Regional Medical Center", city: "Yuma", type: "Urban", totalDischarges: 11400, avgLengthOfStay: 4.9, qualityScore: 80 },
    { id: "az-3", name: "White Mountain Regional Medical Center", city: "Springerville", type: "Critical Access", totalDischarges: 540, avgLengthOfStay: 3.1, qualityScore: 75 },
  ],

  new_mexico: [
    { id: "nm-1", name: "Roosevelt General Hospital", city: "Portales", type: "Critical Access", totalDischarges: 740, avgLengthOfStay: 3.4, qualityScore: 72 },
    { id: "nm-2", name: "Guadalupe County Hospital", city: "Santa Rosa", type: "Critical Access", totalDischarges: 360, avgLengthOfStay: 3.0, qualityScore: 68 },
    { id: "nm-3", name: "San Juan Regional Medical Center", city: "Farmington", type: "Urban", totalDischarges: 9600, avgLengthOfStay: 4.8, qualityScore: 78 },
  ],

  alaska: [
    { id: "ak-1", name: "Yukon-Kuskokwim Delta Regional Hospital", city: "Bethel", type: "Rural PPS", totalDischarges: 2400, avgLengthOfStay: 4.8, qualityScore: 74 },
    { id: "ak-2", name: "Sitka Community Hospital", city: "Sitka", type: "Critical Access", totalDischarges: 780, avgLengthOfStay: 3.6, qualityScore: 77 },
    { id: "ak-3", name: "Bartlett Regional Hospital", city: "Juneau", type: "Urban", totalDischarges: 4200, avgLengthOfStay: 4.5, qualityScore: 82 },
  ],

  hawaii: [
    { id: "hi-1", name: "Molokai General Hospital", city: "Kaunakakai", type: "Critical Access", totalDischarges: 480, avgLengthOfStay: 3.0, qualityScore: 84 },
    { id: "hi-2", name: "Lanai Community Hospital", city: "Lanai City", type: "Critical Access", totalDischarges: 280, avgLengthOfStay: 2.6, qualityScore: 82 },
    { id: "hi-3", name: "Maui Memorial Medical Center", city: "Wailuku", type: "Urban", totalDischarges: 9800, avgLengthOfStay: 4.6, qualityScore: 87 },
  ],
};