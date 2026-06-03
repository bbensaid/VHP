// §5 — remove HTR self-attributed UNVERIFIABLE stat claims from briefs.
// action: "deleteBlock" removes the whole block; "setText" replaces it with
// neutral/sourced text (used where the block has salvageable real content).
// Backups in /sanity-backups/. DRY RUN unless --commit.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
for (const line of env.split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const TOKEN = process.env.SANITY_API_TOKEN;
const PID = "fxz10xl7";
const COMMIT = process.argv.includes("--commit");

// id -> { key -> action }
const ACTIONS = {
  // Pure fabricated HTR model — no salvageable content. DELETE.
  "glp1-employer-solvency-crisis": { "block-6": { del: true } },

  // eco-003: drop the fabricated 450k/$86k HTR projection sentence-block entirely.
  "policyAnalysis-eco-003": { "k115": { del: true } },

  // eco-005: "HTR audit of 500 price files" — fabricated. DELETE block.
  "policyAnalysis-eco-005": { "k139": { del: true } },

  // equ-001: "HTR's analysis of three studies → $2.40/$1" — unverifiable. DELETE.
  "policyAnalysis-equ-001": { "k295": { del: true } },

  // equ-005: "An HTR financial model … ROI 3.1:1" — fabricated. DELETE.
  "policyAnalysis-equ-005": { "k355": { del: true } },

  // rural-nurse-retention blk001: keep the sourced IHS Markit sentence, drop the
  // "HTR estimates $1.8M-$3.2M" house figure.
  "rural-nurse-retention-economic-model-2026": {
    "blk001": {
      text: "Workforce analysts have warned that nursing shortages could cost the U.S. economy on the order of $1.2 trillion in lost output by 2030 (an IHS Markit projection of nationwide economic impact, not a rural-hospital-specific figure). Rural hospitals, which rely disproportionately on costly agency and travel staffing to fill vacancies, are among the most exposed to that pressure.",
    },
  },

  // module-2 blk029: opinion is fine; strip the fake "— HTR Regulatory Intelligence
  // Assessment, Q1 2026" attribution signature only.
  "vbc-fundamentals-module-2-policy-pillar": {
    "blk029": {
      text: "The AHEAD Model is not a pilot. It is a policy architecture for what the American healthcare payment system could look like at scale — one where no payer is an island, where primary care is funded as infrastructure rather than as a commodity, and where health equity is a contractual obligation rather than an aspiration. Whether it works depends entirely on whether the participating states build the administrative and data infrastructure to make the targets meaningful.",
    },
  },

  // module-4: blk019b is really Ziad Obermeyer's NEJM/Science algorithmic-bias finding;
  // drop the fake "we audited our ACO network" wrapper, cite the real work.
  "vbc-fundamentals-module-4-technology-pillar": {
    "blk019b": {
      text: "Algorithmic bias in risk stratification is a documented, real-world problem. Obermeyer and colleagues (Science, 2019) showed that a widely used commercial risk-prediction algorithm systematically underestimated the health needs of Black patients, because it was trained on historical cost data shaped by unequal access — the model learned to encode access barriers as lower predicted need. The lesson for VBC: a risk model trained on fee-for-service utilization in a world with documented access barriers will reproduce those barriers unless it is explicitly audited and recalibrated for equity.",
    },
    // blk025: strip the unverifiable "highest-performing … in HTR's research, based on
    // analysis of MSSP ACO performance data correlated with technology adoption" tail.
    "blk025": {
      text: "For healthcare leaders assessing their organization’s VBC technology readiness, the most common mistake is attempting to deploy advanced analytics capabilities before the foundational data quality and connectivity infrastructure is in place. A population health platform fed by an EHR with poorly configured structured data will generate inaccurate risk scores. A care gap reporting system connected to an EHR that does not have standardized problem list coding will miss a significant proportion of the gaps it is supposed to identify. Technology investment in VBC should follow a deliberate sequence, with each layer validated before the next is added.",
    },
  },
};

async function groq(query, params) {
  const u = `https://${PID}.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(query)}${params ? "&" + params : ""}`;
  const r = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const j = await r.json();
  if (!r.ok) { console.error(JSON.stringify(j)); process.exit(1); }
  return j.result;
}

const ids = Object.keys(ACTIONS);
const docs = await groq(`*[_id in $ids]{ _id, body }`, `%24ids=${encodeURIComponent(JSON.stringify(ids))}`);
const byId = Object.fromEntries(docs.map((d) => [d._id, d]));

const patches = [];
for (const [id, acts] of Object.entries(ACTIONS)) {
  const doc = byId[id];
  if (!doc) { console.log(`MISSING ${id}`); continue; }
  let body = doc.body.map((b) => ({ ...b }));
  for (const [key, act] of Object.entries(acts)) {
    const idx = body.findIndex((b) => b._key === key);
    if (idx < 0) { console.log(`  ${id} {${key}} NOT FOUND (already removed?)`); continue; }
    if (act.del) {
      body[idx] = null;
      console.log(`  ${id} {${key}} DELETE`);
    } else {
      body[idx] = { ...body[idx], children: [{ _type: "span", _key: `${key}-s`, text: act.text, marks: [] }], markDefs: [] };
      console.log(`  ${id} {${key}} REWRITE`);
    }
  }
  body = body.filter(Boolean);
  patches.push({ patch: { id, set: { body } } });
}

console.log(`\n${patches.length} docs to patch.`);
if (!COMMIT) { console.log("DRY RUN — re-run with --commit."); process.exit(0); }

const res = await fetch(
  `https://${PID}.api.sanity.io/v2021-06-07/data/mutate/production?returnIds=true`,
  { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify({ mutations: patches }) }
);
const out = await res.json();
if (!res.ok) { console.error("FAILED:", JSON.stringify(out)); process.exit(1); }
console.log(`✅ Applied ${patches.length} patches.`);
