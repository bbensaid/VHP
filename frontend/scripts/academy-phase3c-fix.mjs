// Phase 3c: finish the phase-3b LEFT items (author authorized corrections of fabrications).
//  - remove every audio block pointing at the nonexistent podcast.htr.com (fabricated episodes, many
//    with fabricated guest attributions) from Sanity academyModule + policyAnalysis docs and Supabase fallbacks
//  - mirror the verified phase-3b module-2 fixes into the policyAnalysis twin doc
//  - Texas "DSRIP ... successor pending" -> current state
//  - stale Vermont-as-AHEAD-participant wording in Supabase fallback rows; "eight participating states"
// Block structure and _keys are kept; only targeted text is changed or a single audio block removed.
// Usage: node scripts/academy-phase3c-fix.mjs [--commit]
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .split('\n').filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const COMMIT = process.argv.includes('--commit');
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const P = env.NEXT_PUBLIC_SANITY_PROJECT_ID, TOKEN = env.SANITY_API_TOKEN;
const BK = new URL('../../sanity-backups/academy-phase3c-2026-10-07/', import.meta.url);
const LOG = new URL('../../docs/audits/academy_phase3c_2026-10.jsonl', import.meta.url);
const H = { Authorization: `Bearer ${TOKEN}` };
const getDoc = async id => (await fetch(`https://${P}.api.sanity.io/v2023-10-01/data/doc/production/${id}`, { headers: H }).then(r => r.json())).documents[0];

const S_POD = 'DNS lookup of podcast.htr.com on 2026-10-07: no record (curl gets no response); web searches for each episode and guest pairing: no results';
const S_TX = 'Sellers Dorsey, "Texas 1115 Waiver Demonstration Extension & State Directed Payment Programs"; Texas Hospital Association, "DPP Approval: The First Step in Securing Texas\' Safety Net" (2022); CMS letter to Texas HHSC, 2021-09-07 (medicaid.gov)';
const S_AHEAD = 'WCAX, "Vermont drops AHEAD healthcare model" (2026-07-28); Vermont Public, "Vermont ends another healthcare reform experiment" (2026-07-28); Vermont Business Magazine, "Vermont withdraws from AHEAD"; CMS AHEAD model page (cohorts run through 2035; up to $12M cooperative agreement per state); CMS Sept 2025 AHEAD redesign (AHCA/NCAL summary)';

const TX_OLD = 'Section 1115 — DSRIP (expired 2021, successor pending)';
const TX_NEW = 'Section 1115 — Texas Healthcare Transformation and Quality Improvement Program (extended through 2030); DSRIP ended 2021, succeeded by CMS-approved state directed payment programs (e.g., CHIRP, TIPPS) in 2022';
const EIGHT_OLD = 'the AHEAD funding is geographically limited to eight participating states';
const EIGHT_NEW = 'the AHEAD funding is geographically limited to the participating states (currently Maryland, Connecticut, Hawaii, Rhode Island and downstate New York)';

// [old, new, note, sources]
const TX = [TX_OLD, TX_NEW, 'Stale: Texas DSRIP ended Sept 30 2021 and its successors (CHIRP, TIPPS and other directed payment programs) were approved by CMS in 2022; the 1115 waiver runs through 2030.', S_TX];
const EIGHT = [EIGHT_OLD, EIGHT_NEW, 'Wrong: "eight" was the original cap, not the participant count. AHEAD participants are MD, CT, HI, RI and downstate NY; Vermont signed Jan 2025 and withdrew July 2026.', S_AHEAD];
const ROW_TEXT = {
  '6b9ad961-': [
    ["Vermont's AHEAD model, which Vermont entered in 2024, is modeled partly on Maryland's approach.",
      "The federal AHEAD Model, which builds partly on Maryland's approach, now runs in Maryland, Connecticut, Hawaii, Rhode Island and downstate New York; Vermont signed on in January 2025 but withdrew in July 2026, and its hospital global budgets now proceed under state law (Act 68 of 2025).",
      'Vermont did not enter AHEAD in 2024 and is no longer a participant (signed Jan 2025, withdrew July 2026). Wording mirrors the live Sanity body of this lesson.', S_AHEAD],
    ['Year Vermont entered the AHEAD model with global budget elements', 'Year Vermont signed the AHEAD State Agreement (it withdrew in July 2026)', 'Stat label corrected (value changed 2024 -> 2025 in the same block).', S_AHEAD],
  ],
  '14ddb776-': [
    ["Vermont's AHEAD model (All-Payer Health Equity Approaches and Development) sets a statewide per-capita TCOC growth target across all payers. Hospitals, ACOs, and Medicaid are all held to the same target — creating alignment across payers that most states lack.",
      "The federal AHEAD Model (States Advancing All-Payer Health Equity Approaches and Development) sets a statewide per-capita total cost of care growth target across all payers in each participating state. Vermont signed on in January 2025 but withdrew in July 2026, before its performance period began; its hospital global budgets and cost-growth work now proceed under state law (Act 68 of 2025).",
      'Presented Vermont as operating under AHEAD; Vermont withdrew in July 2026 before the performance period began.', S_AHEAD],
    ["Vermont's Total Cost of Care Model", 'Vermont and All-Payer Cost Targets', 'Callout title no longer implies a live Vermont AHEAD model.', S_AHEAD],
  ],
  '2b90c148-': [
    ["Vermont's All-Payer ACO Model (AHEAD Model) depends on health information exchange infrastructure to function. OneCare Vermont — the ACO accountable for the state's population under the AHEAD Model — relies on VITL's ADT notification network",
      "Vermont's All-Payer ACO Model, which ran through 2025, depended on health information exchange infrastructure to function. OneCare Vermont — the ACO at its center until it wound down at the end of 2025 — relied on VITL's ADT notification network",
      'Conflated the All-Payer ACO Model with AHEAD (different models) and presented OneCare as operating under AHEAD; OneCare wound down at the end of 2025 and Vermont withdrew from AHEAD in July 2026.', S_AHEAD + '; HCI Innovation Group, "As OneCare Winds Down, Vermont Looks AHEAD"'],
    ["VITL and Vermont's AHEAD Model", "VITL and Vermont's Payment Reform", 'Callout title no longer names a model Vermont has left.', S_AHEAD],
  ],
  'e8dd6050-': [
    ["The AHEAD Model's health equity investment fund provides direct CHW program funding in participating states. Vermont, as an AHEAD participant, has an explicit CHW funding stream tied to the All-Payer Model performance requirements.",
      'The AHEAD Model gives each participating state up to $12 million in cooperative agreement funding and requires a state health equity plan. Vermont signed on to AHEAD in January 2025 but withdrew in July 2026, before its performance period began, so it has no AHEAD-linked CHW funding stream.',
      'Vermont is not an AHEAD participant; the "health equity investment fund" for CHWs could not be verified and was replaced with the verified cooperative-agreement funding fact.', S_AHEAD],
    ["Vermont's AHEAD Model participation is the most ambitious attempt in state history",
      "Vermont's health care reform effort — which since its July 2026 withdrawal from AHEAD proceeds under state law (Act 68 of 2025) — is the most ambitious attempt in state history",
      'Vermont withdrew from AHEAD in July 2026.', S_AHEAD],
    ["Vermont's AHEAD Model equity requirements represent the most ambitious state-level commitment to equity-centered VBC in the country — and a national model worth watching.",
      "Vermont signed on to AHEAD in January 2025 and withdrew in July 2026, before its performance period began; its reform now proceeds under state law (Act 68 of 2025), so AHEAD's equity requirements no longer apply to Vermont.",
      'Vermont withdrew from AHEAD in July 2026.', S_AHEAD],
  ],
};
const ROW_IDS = {
  'b927de74-': 'sanity-vbc-policy', 'e49bcdcd-': 'vbc-fundamentals-module-3-economics-pillar', '9c2a5663-': 'sanity-vbc-technology',
  '11ea7c99-': 'aco-basics', '6b9ad961-': 'global-budgets-hospital-finance', '14ddb776-': 'total-cost-of-care-management',
  '2b90c148-': 'vitl-vermont-hie', 'e8dd6050-': 'sanity-vbc-equity',
};

// replace `old` in every string under obj; returns count
function deepReplace(o, old, nw) {
  let n = 0;
  const walk = x => {
    if (Array.isArray(x)) x.forEach((v, i) => { if (typeof v === 'string') { if (v.includes(old)) { x[i] = v.split(old).join(nw); n++; } } else walk(v); });
    else if (x && typeof x === 'object') for (const k of Object.keys(x)) { const v = x[k]; if (typeof v === 'string') { if (v.includes(old)) { x[k] = v.split(old).join(nw); n++; } } else walk(v); }
  };
  walk(o); return n;
}
const isFakeAudio = b => b && b._type === 'audio' && String(b.url || '').includes('podcast.htr.com');
// remove fake audio blocks from any array under obj; returns removed blocks
function removeAudio(o) {
  const out = [];
  const walk = x => {
    if (Array.isArray(x)) { for (let i = x.length - 1; i >= 0; i--) if (isFakeAudio(x[i])) out.push(...x.splice(i, 1)); x.forEach(walk); }
    else if (x && typeof x === 'object') Object.values(x).forEach(walk);
  };
  walk(o); return out;
}
const audioNote = a => `Fabricated podcast episode removed (whole audio block; the renderer would otherwise show a dead player or, with no url, an empty audio section). Title: "${a.title}". Summary began: "${String(a.summary).slice(0, 160)}..."`;

// ---------------- Sanity ----------------
const AM2 = 'academyModule-vbc-fundamentals-module-2-policy-pillar', PA2 = 'vbc-fundamentals-module-2-policy-pillar';
const SANITY = [AM2, 'academyModule-vbc-fundamentals-module-3-economics-pillar', 'academyModule-vbc-fundamentals-module-4-technology-pillar',
  PA2, 'vbc-fundamentals-module-3-economics-pillar', 'vbc-fundamentals-module-4-technology-pillar', 'vbc-fundamentals-module-5-clinical-equity-pillars'];
const docs = {}; for (const id of SANITY) docs[id] = await getDoc(id);
const plans = {}; // id -> {set, unset, log, expected}
const am2 = docs[AM2];
for (const id of SANITY) {
  const doc = docs[id], log = [], set = {}, unset = [];
  const body = structuredClone(doc.body);
  // mirror verified phase-3b module-2 fixes into the policyAnalysis twin
  if (id === PA2) {
    for (const k of ['blk024', 'blk025', 'blk027', 'blk029', 'blk041']) {
      const src = am2.body.find(b => b._key === k), dst = body.find(b => b._key === k);
      if (k === 'blk024') { if (dst.code !== src.code) { log.push([`body[_key=="${k}"].code`, '(table with "% Medicaid in VBC Contracts" / "National Leadership Rating" columns, 1977 global-budget and Mississippi FFS claims)', '(table as corrected in the academyModule twin in phase 3b)', 'Mirror of the phase-3b verified fixes (unsourced % column and invented Tier ratings removed; Maryland/Mississippi corrected).', 'phase-3b ledger docs/audits/academy_phase3b_2026-10.jsonl']); dst.code = src.code; } continue; }
      if (dst.children.length !== 1 || src.children.length !== 1) throw new Error('child count ' + k);
      if (dst.children[0].text !== src.children[0].text) {
        log.push([`body[_key=="${k}"].children[0].text`, dst.children[0].text, src.children[0].text, k === 'blk027' ? 'AHEAD state list corrected (phase-3 fix mirrored).' : 'Mirror of the phase-3b verified fix in the academyModule twin.', k === 'blk027' ? S_AHEAD : 'phase-3b ledger']);
        dst.children[0].text = src.children[0].text;
      }
    }
  }
  for (const [o, n, note, srcs] of [TX, EIGHT]) {
    const before = JSON.stringify(body);
    if (deepReplace(body, o, n)) log.push([`body (string containing "${o.slice(0, 40)}")`, o, n, note, srcs]);
    if (before === JSON.stringify(body) && JSON.stringify(doc.body).includes(o)) throw new Error('replace failed ' + id);
  }
  for (const a of removeAudio(body)) { unset.push(`body[_key=="${a._key}"]`); log.push([`body[_key=="${a._key}"] (audio)`, `url ${a.url}; summary: ${a.summary}`, '(block removed)', audioNote(a), S_POD]); }
  // build set paths for changed blocks (whole-block set by _key keeps the key and position)
  for (const b of body) {
    const old = doc.body.find(x => x._key === b._key);
    if (JSON.stringify(old) !== JSON.stringify(b)) set[`body[_key=="${b._key}"]`] = b;
  }
  plans[id] = { set, unset, log, expected: body };
}
// ---------------- Supabase ----------------
const rows = {};
for (const pre of Object.keys(ROW_IDS)) {
  const { data, error } = await db.from('lessons').select('*').eq('slug', ROW_IDS[pre]);
  if (error) throw error; if (data.length !== 1 || !data[0].id.startsWith(pre)) throw new Error('row lookup ' + pre);
  rows[pre] = data[0];
}
const rplans = {};
for (const [pre, row] of Object.entries(rows)) {
  const cb = structuredClone(row.content_blocks), log = [];
  for (const [o, n, note, srcs] of [TX, EIGHT, ...(ROW_TEXT[pre] || [])]) {
    const c = deepReplace(cb, o, n);
    if (c) log.push(['content_blocks', o, n, note, srcs]);
    else if (ROW_TEXT[pre]?.some(r => r[0] === o)) throw new Error(`not found in ${row.slug}: ${o}`);
  }
  if (pre === '6b9ad961-') { const st = cb[2].stats[2]; if (st.value !== '2024') throw new Error('stat'); st.value = '2025'; st.source = 'Vermont GMCB / AHS'; log.push(['content_blocks[2].stats[2].value/source', '2024 / CMS', '2025 / Vermont GMCB / AHS', 'Vermont signed the AHEAD State Agreement in January 2025, not 2024.', S_AHEAD]); }
  for (const a of removeAudio(cb)) log.push([`content_blocks audio _key ${a._key}`, `url ${a.url}; summary: ${a.summary}`, '(block removed)', audioNote(a), S_POD]);
  rplans[pre] = { cb, log };
}
for (const [id, p] of Object.entries(plans)) { console.log('SANITY', id, 'changes', p.log.length, 'set', Object.keys(p.set).length, 'unset', p.unset.length); for (const l of p.log) console.log('   ', l[0], '|', String(l[1]).slice(0, 80), '=>', String(l[2]).slice(0, 80)); }
for (const [pre, p] of Object.entries(rplans)) { console.log('SUPABASE', rows[pre].slug, 'changes', p.log.length); for (const l of p.log) console.log('   ', l[0], '|', String(l[1]).slice(0, 80), '=>', String(l[2]).slice(0, 80)); }
const bad = /podcast\.htr|Sarah Chen|eight participating|successor pending|entered in 2024|as an AHEAD participant|AHEAD Model participation is|Vermont's AHEAD Model equity|\(AHEAD Model\)|under the AHEAD Model|Regulatory Intelligence|Tier [1-4] \(/;
for (const [id, p] of Object.entries(plans)) if (bad.test(JSON.stringify(p.expected))) console.log('RESIDUAL in', id, JSON.stringify(p.expected).match(bad)[0]);
for (const [pre, p] of Object.entries(rplans)) if (bad.test(JSON.stringify(p.cb))) console.log('RESIDUAL in', rows[pre].slug, JSON.stringify(p.cb).match(bad)[0]);
if (!COMMIT) process.exit(0);

// ---------------- commit ----------------
fs.mkdirSync(BK, { recursive: true });
const append = o => fs.appendFileSync(LOG, JSON.stringify(o) + '\n');
for (const [id, p] of Object.entries(plans)) {
  if (!p.log.length) continue;
  const bf = new URL(`sanity-${id}.json`, BK); if (fs.existsSync(bf)) throw new Error('backup exists ' + bf.pathname);
  fs.writeFileSync(bf, JSON.stringify(docs[id], null, 2));
  const patch = { id, ifRevisionID: docs[id]._rev };
  if (Object.keys(p.set).length) patch.set = p.set;
  if (p.unset.length) patch.unset = p.unset;
  const mr = await fetch(`https://${P}.api.sanity.io/v2023-10-01/data/mutate/production`, { method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify({ mutations: [{ patch }] }) }).then(r => r.json());
  if (mr.error) throw new Error(JSON.stringify(mr));
  const d2 = await getDoc(id);
  const ok = JSON.stringify(d2.body) === JSON.stringify(p.expected) && !bad.test(JSON.stringify(d2.body));
  console.log('verify sanity', id, ok, d2.body.length, '(was', docs[id].body.length + ')');
  for (const [where, o, n, note, src] of p.log)
    append({ doc_or_file: `sanity ${docs[id]._type} ${id} ${where}`, old: o, new: n, sources: src, status: ok ? 'FIXED' : 'LEFT', note: `${note} Backup: sanity-backups/academy-phase3c-2026-10-07/sanity-${id}.json; re-fetched ${ok ? 'and verified' : 'VERIFY FAILED'}.` });
}
for (const [pre, p] of Object.entries(rplans)) {
  if (!p.log.length) continue;
  const row = rows[pre];
  const bf = new URL(`supabase-lesson-${row.id}.json`, BK); if (fs.existsSync(bf)) throw new Error('backup exists ' + bf.pathname);
  fs.writeFileSync(bf, JSON.stringify(row, null, 2));
  const { error } = await db.from('lessons').update({ content_blocks: p.cb }).eq('id', row.id);
  if (error) throw error;
  const { data: r2 } = await db.from('lessons').select('content_blocks').eq('id', row.id).single();
  const ok = JSON.stringify(r2.content_blocks) === JSON.stringify(p.cb) && !bad.test(JSON.stringify(r2.content_blocks));
  console.log('verify supabase', row.slug, ok);
  for (const [where, o, n, note, src] of p.log)
    append({ doc_or_file: `supabase lessons ${row.id} (${row.slug}) ${where}`, old: o, new: n, sources: src, status: ok ? 'FIXED' : 'LEFT', note: `${note} Backup: sanity-backups/academy-phase3c-2026-10-07/supabase-lesson-${row.id}.json; re-fetched ${ok ? 'and verified' : 'VERIFY FAILED'}.` });
}
