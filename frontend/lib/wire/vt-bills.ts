// Vermont Legislature bill tracking for The Wire (book Ch.14: "Bills that
// would amend Act 68, GMCB appointment changes, and shifts in enforcement
// posture").
//
// HOW: there is no public RSS feed, and the Legislature's bill-data API
// (legislature.vermont.gov/docs/api/v1) is key-gated. So this reads each
// tracked bill's PUBLIC status page — legislature.vermont.gov/bill/status/
// <session>/<bill> — server-side and parses four fields: bill number (+ act
// number once signed), title (the "charge"), last recorded action, and its
// date. Nothing else is scraped.
//
// POLITENESS (robots.txt checked 2026-10-09): /bill/status/ is not
// disallowed; the file sets "Crawl-delay: 30" and disallows only the
// /bill/load* AJAX endpoints, which this never calls. Enforced here:
//   * at most ONE Legislature request per call, and only if the previous one
//     was >= 30 s ago;
//   * each bill is refreshed at most once per 24 h;
//   * results persist in Supabase `ticker_cache` (id "wire_vt_bills"), with an
//     in-process fallback when Supabase is unreachable.
// A cold cache therefore fills one bill per page regeneration (The Wire
// revalidates every 15 min); until then a bill shows "status pending".
//
// ROBUSTNESS: if the markup changes and a field cannot be parsed, the bill
// keeps its last good status (marked with its check date) or, with none,
// renders "Status unavailable — see link". Nothing is ever invented.
//
// CURATION (verified 2026-10-09 against each status page): the 2025–2026
// biennium's health-reform bills that the book's Act 68 / GMCB story turns
// on. Session "2026" is the Legislature's URL key for the 2025–2026
// biennium. Add 2027-session bills here as they are introduced.

import { createClient } from "@supabase/supabase-js";

export interface TrackedBill {
  session: number;
  bill: string;
  /** Why the book's reader should watch it. */
  why: string;
}

export const TRACKED_BILLS: TrackedBill[] = [
  { session: 2026, bill: "S.126", why: "Act 68 itself — reference-based pricing and mandatory global hospital budgets." },
  { session: 2026, bill: "S.190", why: "Would have set the reference-based-pricing details and fast-tracked it for school-employee and ACA plans." },
  { session: 2026, bill: "S.63",  why: "Modifies the Green Mountain Care Board's regulatory duties." },
  { session: 2026, bill: "H.482", why: "GMCB authority to adjust a hospital's reimbursement rates and appoint a hospital observer — enforcement posture." },
  { session: 2026, bill: "S.189", why: "Process for eliminating hospital services — the Act 167 / transformation decisions." },
  { session: 2026, bill: "S.197", why: "Primary care reform — insurer primary-care spending and regional models." },
  { session: 2026, bill: "H.266", why: "340B drug pricing protections — the hospital-revenue line Act 68 budgets lean on." },
];

export interface BillStatus {
  session: number;
  bill: string;
  why: string;
  url: string;
  /** e.g. "Act 68" once signed */
  act: string | null;
  title: string | null;
  lastAction: string | null;
  /** Date of the last action as printed (e.g. "June 12, 2025"), else the journal date. */
  lastActionDate: string | null;
  /** ISO time of the last SUCCESSFUL parse; null = never. */
  fetchedAt: string | null;
  /** ISO time of the last attempt (success or failure). */
  attemptedAt: string | null;
}

const BASE = "https://legislature.vermont.gov/bill/status";
const CACHE_KEY = "wire_vt_bills";
const DAY_MS = 24 * 60 * 60 * 1000;
const CRAWL_DELAY_MS = 30 * 1000;
const USER_AGENT = "Mozilla/5.0 (compatible; HTR-Wire/1.0; +https://healthtransformationreview.org/the-wire)";

export function billUrl(session: number, bill: string) {
  return `${BASE}/${session}/${bill}`;
}
const keyOf = (b: { session: number; bill: string }) => `${b.session}/${b.bill}`;

// ─── Parsing ──────────────────────────────────────────────────────────────────

const ENTITIES: Record<string, string> = {
  amp: "&", apos: "'", quot: '"', lt: "<", gt: ">", nbsp: " ",
  ldquo: "“", rdquo: "”", lsquo: "‘", rsquo: "’", ndash: "–", mdash: "—",
};
function text(html: string): string {
  return html
    .replace(/<span class="sr-only">[\s\S]*?<\/span>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

const MONTH_DATE = /(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}/;

/** Parses one status page. Returns only the fields it could find. Exported for tests. */
export function parseBillStatusPage(html: string): Pick<BillStatus, "act" | "title" | "lastAction" | "lastActionDate"> {
  const h1 = html.match(/<h1>([\s\S]*?)<\/h1>/);
  const charge = html.match(/<h2 class="charge">([\s\S]*?)<\/h2>/);
  const last = html.match(/Last Recorded Action\s*<\/dt>\s*<dd>([\s\S]*?)<\/dd>/);

  const act = h1 ? (text(h1[1]).match(/\(?(Act \d+)\)?/)?.[1] ?? null) : null;
  const title = charge ? text(charge[1]) || null : null;

  let lastAction: string | null = null;
  let lastActionDate: string | null = null;
  if (last) {
    const raw = text(last[1]); // "House 6/13/2025 - Senate Message: Signed by Governor June 12, 2025"
    const journal = raw.match(/^(House|Senate)\s+(\d{1,2}\/\d{1,2}\/\d{4})\s*-\s*/);
    const body = journal ? raw.slice(journal[0].length) : raw;
    const printed = body.match(MONTH_DATE)?.[0] ?? null;
    const withoutDate = printed ? body.replace(new RegExp(`\\s*(on\\s+)?${printed}\\s*$`), "") : body;
    lastAction = withoutDate.trim() || null;
    lastActionDate = printed ?? journal?.[2] ?? null;
  }
  return { act, title, lastAction, lastActionDate };
}

// ─── Cache (Supabase ticker_cache, in-process fallback) ───────────────────────

interface CacheShape { bills: Record<string, BillStatus>; lastRequestAt: string | null }

const memory: { value: CacheShape } = { value: { bills: {}, lastRequestAt: null } };

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key) : null;
}

async function readCache(): Promise<CacheShape> {
  try {
    const sb = supabase();
    if (!sb) return memory.value;
    const { data } = await sb.from("ticker_cache").select("headlines").eq("id", CACHE_KEY).maybeSingle();
    const v = data?.headlines as CacheShape | undefined;
    if (v && typeof v === "object" && v.bills) return v;
  } catch { /* fall through */ }
  return memory.value;
}

async function writeCache(value: CacheShape) {
  memory.value = value;
  try {
    const sb = supabase();
    if (!sb) return;
    await sb.from("ticker_cache").upsert({ id: CACHE_KEY, headlines: value, fetched_at: new Date().toISOString() });
  } catch { /* non-fatal */ }
}

// ─── Public entry point ───────────────────────────────────────────────────────

function emptyStatus(t: TrackedBill): BillStatus {
  return {
    session: t.session, bill: t.bill, why: t.why, url: billUrl(t.session, t.bill),
    act: null, title: null, lastAction: null, lastActionDate: null, fetchedAt: null, attemptedAt: null,
  };
}

/**
 * Returns every tracked bill's latest known status, refreshing at most one
 * stale bill from the Legislature per call (see POLITENESS above).
 */
export async function getTrackedBills(): Promise<BillStatus[]> {
  const cache = await readCache();
  const now = Date.now();
  const merged = TRACKED_BILLS.map(t => {
    const prev = cache.bills[keyOf(t)];
    // `why` always comes from the curated list, never from the cache.
    return prev ? { ...prev, why: t.why, url: billUrl(t.session, t.bill) } : emptyStatus(t);
  });

  const lastReq = cache.lastRequestAt ? Date.parse(cache.lastRequestAt) : 0;
  const stale = merged
    .filter(b => !b.attemptedAt || now - Date.parse(b.attemptedAt) >= DAY_MS)
    .sort((a, b) => (a.attemptedAt ? Date.parse(a.attemptedAt) : 0) - (b.attemptedAt ? Date.parse(b.attemptedAt) : 0));

  if (stale.length > 0 && now - lastReq >= CRAWL_DELAY_MS) {
    const target = stale[0];
    const attemptedAt = new Date(now).toISOString();
    let updated: BillStatus = { ...target, attemptedAt };
    try {
      const res = await fetch(target.url, {
        headers: { "User-Agent": USER_AGENT },
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(15000),
      });
      if (res.ok) {
        const parsed = parseBillStatusPage(await res.text());
        // Only accept a parse that found the essentials; otherwise keep the
        // last good values so a markup change degrades to "stale", not "blank".
        if (parsed.title && parsed.lastAction) {
          updated = { ...updated, ...parsed, fetchedAt: attemptedAt };
        }
      }
    } catch { /* keep previous values */ }
    const idx = merged.findIndex(b => keyOf(b) === keyOf(target));
    merged[idx] = updated;
    await writeCache({
      bills: Object.fromEntries(merged.map(b => [keyOf(b), b])),
      lastRequestAt: attemptedAt,
    });
  }

  return merged;
}
