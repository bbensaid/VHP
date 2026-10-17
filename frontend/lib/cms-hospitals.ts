/**
 * Hospitals by state from CMS Care Compare — "Hospital General Information" (data.cms.gov provider data,
 * dataset xubh-q36u). Fetched server-side and cached for a day.
 *
 * Replaces the earlier per-state hospital list (Sanity `hospital` docs, seeded from lib/data/hospital-data.ts),
 * whose discharges, length of stay and "quality score" for real, named hospitals had no source (removed
 * 2026-10-17 under the book's rule: a figure that cannot be confirmed is deleted).
 */

export const CMS_HOSPITAL_SOURCE = {
  label: "CMS Care Compare — Hospital General Information",
  url: "https://data.cms.gov/provider-data/dataset/xubh-q36u",
};

export type CmsHospital = {
  id: string;
  name: string;
  city: string;
  type: string;
  ownership: string;
  emergencyServices: string;
  /** CMS overall hospital quality star rating, 1–5; null when CMS reports "Not Available". */
  overallRating: number | null;
};

const STATE_CODES: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA", colorado: "CO",
  connecticut: "CT", delaware: "DE", "district-of-columbia": "DC", florida: "FL", georgia: "GA", hawaii: "HI",
  idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA", kansas: "KS", kentucky: "KY", louisiana: "LA",
  maine: "ME", maryland: "MD", massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS",
  missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV", "new-hampshire": "NH", "new-jersey": "NJ",
  "new-mexico": "NM", "new-york": "NY", "north-carolina": "NC", "north-dakota": "ND", ohio: "OH",
  oklahoma: "OK", oregon: "OR", pennsylvania: "PA", "rhode-island": "RI", "south-carolina": "SC",
  "south-dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT", virginia: "VA",
  washington: "WA", "west-virginia": "WV", wisconsin: "WI", wyoming: "WY",
};

export function stateCodeForSlug(slug: string): string | null {
  const key = slug.toLowerCase().replace(/_/g, "-");
  return STATE_CODES[key] ?? null;
}

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .replace(/\b(Va|Llc|Inc|Ii|Iii)\b/g, (m) => m.toUpperCase());
}

type CmsRow = {
  facility_id: string;
  facility_name: string;
  citytown: string;
  hospital_type: string;
  hospital_ownership: string;
  emergency_services: string;
  hospital_overall_rating: string;
};

export async function getCmsHospitals(stateSlug: string): Promise<CmsHospital[]> {
  const code = stateCodeForSlug(stateSlug);
  if (!code) return [];
  const params = new URLSearchParams({
    "conditions[0][property]": "state",
    "conditions[0][value]": code,
    "conditions[0][operator]": "=",
    limit: "500",
  });
  try {
    const res = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/query/xubh-q36u/0?${params}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { results?: CmsRow[] };
    return (json.results ?? []).map((r) => {
      const n = Number.parseInt(r.hospital_overall_rating, 10);
      return {
        id: r.facility_id,
        name: titleCase(r.facility_name),
        city: titleCase(r.citytown),
        type: r.hospital_type,
        ownership: r.hospital_ownership,
        emergencyServices: r.emergency_services,
        overallRating: Number.isFinite(n) ? n : null,
      };
    });
  } catch {
    return [];
  }
}
