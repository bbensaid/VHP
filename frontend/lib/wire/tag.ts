// Pillar tagging + impact scoring for Wire headlines. Pure functions, safe to
// import from server and client code. Used by The Wire page and the home
// page's Wire section, so both tag a headline the same way.

export interface WireItem {
  title: string;
  url: string;
  source: string;
  label: string;
  published_at: string | null;
}

export interface UnavailableSource {
  label: string;
  reason: string;
  url: string;
}

export interface EnrichedWireItem extends WireItem {
  pillar: string;
  impact: number;
  // The Equity Imperative is a cross-cutting test, not a pillar — so it is a
  // flag set ALONGSIDE the pillar, never a value that wins the pillar slot.
  // Previously "Equity" competed in the same scoring bucket, which meant an
  // item about, say, rural access got tagged Equity INSTEAD of Clinical.
  equityFlag: boolean;
}

const PILLAR_KEYWORDS: Record<string, string[]> = {
  Policy: [
    "medicaid", "medicare", "cms", "waiver", "legislation", "congress", "senate", "house", "bill",
    "regulation", "rule", "policy", "fda", "hhs", "aca", "affordable care", "prior auth",
    "mandate", "compliance", "federal", "state plan", "1115", "h.r.", "act", "law", "budget",
    "work requirement", "eligibility", "enrollment", "coverage", "uninsured",
  ],
  Economics: [
    "cost", "spending", "revenue", "financial", "profit", "margin", "payment", "reimbursement",
    "value-based", "vbc", "apm", "bundled", "capitation", "global budget", "shared savings",
    "price", "affordability", "insurance", "premium", "deductible", "drug pricing",
    "investment", "merger", "acquisition", "market", "payer", "employer", "actuarial",
  ],
  Technology: [
    "ai", "artificial intelligence", "machine learning", "algorithm", "digital health",
    "telehealth", "telemedicine", "ehr", "electronic health", "interoperability", "fhir",
    "health it", "data", "cybersecurity", "app", "wearable", "remote monitoring", "rpm",
    "automation", "robot", "chatbot", "generative", "llm", "software", "platform",
  ],
  Clinical: [
    "patient", "clinical", "hospital", "physician", "nurse", "care", "treatment", "therapy",
    "cancer", "diabetes", "heart", "mental health", "behavioral", "surgery", "drug", "vaccine",
    "trial", "fda approval", "safety", "quality", "outcome", "readmission", "mortality",
    "chronic", "primary care", "specialist", "emergency", "icu", "genomic", "precision",
  ],
  Operations: [
    "workforce", "staffing", "burnout", "shortage", "supply chain", "revenue cycle",
    "billing", "coding", "prior authorization", "denial", "network", "consolidation",
    "merger", "acquisition", "private equity", "administrator", "executive", "ceo",
    "hospital operations", "efficiency", "throughput", "capacity", "discharge",
  ],
};

// Scored separately from PILLAR_KEYWORDS, and additively: an item can be
// Clinical AND carry the Equity Imperative flag. It is the justice test
// ("is it just?") applied to whichever pillar the item belongs to.
const EQUITY_KEYWORDS = [
  "equity", "disparity", "social determinant", "sdoh", "rural", "underserved", "minority",
  "racial", "ethnic", "low-income", "poverty", "housing", "food", "transportation",
  "access", "barrier", "community health", "vulnerable", "maternal", "infant mortality",
  "language", "disability", "lgbtq", "indigenous", "tribal",
];

const SOURCE_AUTHORITY: Record<string, number> = {
  cms: 5, fda: 5, vt_gmcb: 5, vt_ahs: 5, policy: 4, stat: 4, industry: 3, tech: 3,
};

export function tagItem(item: WireItem): EnrichedWireItem {
  const text = item.title.toLowerCase();
  const scores: Record<string, number> = {};
  for (const [pillar, keywords] of Object.entries(PILLAR_KEYWORDS)) {
    scores[pillar] = keywords.filter(kw => text.includes(kw)).length;
  }
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const pillar = best[1] > 0 ? best[0] : "General";

  // Impact: source authority (1-5) + recency boost
  const authority = SOURCE_AUTHORITY[item.source] ?? 2;
  const ageHours = item.published_at
    ? (Date.now() - new Date(item.published_at).getTime()) / 3600000
    : 48;
  const recencyBoost = ageHours < 6 ? 2 : ageHours < 24 ? 1 : 0;
  const impact = Math.min(5, authority + recencyBoost - (best[1] === 0 ? 1 : 0));

  const equityFlag = EQUITY_KEYWORDS.some(kw => text.includes(kw));

  return { ...item, pillar, impact, equityFlag };
}

export function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
