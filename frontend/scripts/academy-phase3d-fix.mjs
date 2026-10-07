// Phase 3d: two factual corrections (author authorized corrections).
//  1. academyModule-vbc-aco-medicaid: the Vermont All-Payer ACO Model was not "renewed in 2022 as part of
//     the broader Vermont AHEAD model" — it was extended (2023, then through 2025) and was never part of AHEAD.
//  2. Supabase lesson global-budgets-hospital-finance fallback (+ 3 local content JSON sources): Maryland did
//     not enter the Total Cost of Care Model in 2014 — 2014 was the All-Payer Model; TCOC began 2019.
//     (The live Sanity body of global-budgets-hospital-finance already states this correctly; not touched.)
// Minimal text replacement by _key / exact string; structure preserved.
// Usage: node scripts/academy-phase3d-fix.mjs [--commit]
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .split('\n').filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const COMMIT = process.argv.includes('--commit');
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const P = env.NEXT_PUBLIC_SANITY_PROJECT_ID, TOKEN = env.SANITY_API_TOKEN;
const BK = new URL('../../sanity-backups/academy-phase3d-2026-10-07/', import.meta.url);
const LOG = new URL('../../docs/audits/academy_phase3d_2026-10.jsonl', import.meta.url);
const ROOT = new URL('../../', import.meta.url);
const H = { Authorization: `Bearer ${TOKEN}` };
const getDoc = async id => (await fetch(`https://${P}.api.sanity.io/v2023-10-01/data/doc/production/${id}`, { headers: H }).then(r => r.json())).documents[0];

const S_VT = 'CMS Innovation Center, "Vermont All-Payer ACO Model" page (began 2017-01-01, concluded 2025-12-31; no mention of AHEAD); GMCB, "First Amended and Restated Vermont All-Payer ACO Model Agreement" (2022-10-28/2022-11-17: one-year extension to 2023 plus optional 2024 transition year); GMCB, "VT State Agreement 2024 Amendment No. 1" (final performance year ends 2025-12-31); HCI Innovation Group, "Vermont to Seek 1-Year Extension of All-Payer ACO Model"; WCAX / Vermont Public (2026-07-28) on Vermont withdrawing from AHEAD after signing in Jan 2025';
const S_MD = 'Health Affairs Forefront, "Meaningful Value-Based Payment Reform, Part 1: Maryland Leads The Way" (2022) (All-Payer Model 2014-2018, succeeded by the TCOC Model in January 2019); HCI Innovation Group, "Maryland\'s All-Payer Model Saves Medicare Nearly $1 Billion"; Tydings, "CMS Approves Maryland\'s Total Cost of Care All-Payer Medicare Model"';

const VT_OLD = 'a federal CMMI innovation model approved in 2016 and renewed in 2022 as part of the broader Vermont AHEAD model.';
const VT_NEW = 'a federal CMMI innovation model approved in 2016 whose performance years ran 2018–2022; CMS extended it through December 31, 2023 and then, by a 2024 amendment, through December 31, 2025. It was never part of AHEAD, a separate federal model: Vermont signed an AHEAD state agreement in January 2025 and withdrew in July 2026.';
const MD_OLD = 'In 2014, Maryland entered the Total Cost of Care Model, adding a population-level global budget for Medicare spending across all care settings.';
const MD_NEW = 'In 2014, Maryland moved its hospitals to all-payer global budgets under the Maryland All-Payer Model, which ran from 2014 through 2018; in 2019 it entered the Total Cost of Care Model, adding a population-level global budget for Medicare spending across all care settings.';
const VT_NOTE = 'False: the All-Payer ACO Model was extended (2022 amended agreement to 2023 + transition year; 2024 Amendment No. 1 to 2025-12-31), not renewed as part of AHEAD; the two are separate models.';
const MD_NOTE = 'Wrong model/year: 2014 began the Maryland All-Payer Model (hospital global budgets); the Total Cost of Care Model began January 2019.';

const SANITY_ID = 'academyModule-vbc-aco-medicaid', BLOCK = 'med-aco-p4', SPAN = 's1';
const ROW_SLUG = 'global-budgets-hospital-finance';
const FILES = ['frontend/content/course_value_based_care.json', 'frontend/content/courses_tier1.json', 'frontend/content/expand_vbc.json'];

// ---- Sanity plan
const doc = await getDoc(SANITY_ID);
const blk = doc.body.find(b => b._key === BLOCK), span = blk.children.find(c => c._key === SPAN);
if (span.text.split(VT_OLD).length !== 2) throw new Error('VT_OLD not found exactly once in Sanity span');
const newSpan = span.text.replace(VT_OLD, VT_NEW);
const sPath = `body[_key=="${BLOCK}"].children[_key=="${SPAN}"].text`;
console.log('SANITY', SANITY_ID, sPath, '\n  OLD:', span.text, '\n  NEW:', newSpan);

// ---- Supabase plan
const { data: rows, error } = await db.from('lessons').select('*').eq('slug', ROW_SLUG);
if (error) throw error; if (rows.length !== 1) throw new Error('row lookup');
const row = rows[0];
const cbStr = JSON.stringify(row.content_blocks);
if (cbStr.split(MD_OLD).length !== 2) throw new Error('MD_OLD not found exactly once in Supabase row');
const cb = JSON.parse(cbStr.replace(MD_OLD, MD_NEW));
console.log('SUPABASE', row.id, row.slug, 'content_blocks: 1 replacement');
// also confirm no Supabase row carries the VT text
const { data: vtRows } = await db.from('lessons').select('id,slug,content_blocks');
const vtHits = vtRows.filter(r => JSON.stringify(r.content_blocks || '').includes('renewed in 2022'));
console.log('Supabase rows with "renewed in 2022":', vtHits.map(r => r.slug));

// ---- local files plan
const fplans = FILES.map(f => {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8');
  const n = t.split(MD_OLD).length - 1;
  if (n !== 1) throw new Error(`${f}: ${n} occurrences`);
  return { f, t, nt: t.replace(MD_OLD, MD_NEW) };
});
console.log('LOCAL files: 1 replacement each in', FILES.join(', '));
if (!COMMIT) process.exit(0);

// ---- commit
fs.mkdirSync(BK, { recursive: true });
const append = o => fs.appendFileSync(LOG, JSON.stringify(o) + '\n');
const bkSafe = (name, data) => { const u = new URL(name, BK); if (fs.existsSync(u)) throw new Error('backup exists ' + u.pathname); fs.writeFileSync(u, data); };

bkSafe(`sanity-${SANITY_ID}.json`, JSON.stringify(doc, null, 2));
const mr = await fetch(`https://${P}.api.sanity.io/v2023-10-01/data/mutate/production`, { method: 'POST', headers: { ...H, 'Content-Type': 'application/json' },
  body: JSON.stringify({ mutations: [{ patch: { id: SANITY_ID, ifRevisionID: doc._rev, set: { [sPath]: newSpan } } }] }) }).then(r => r.json());
if (mr.error) throw new Error(JSON.stringify(mr));
const d2 = await getDoc(SANITY_ID);
const exp = structuredClone(doc.body); exp.find(b => b._key === BLOCK).children.find(c => c._key === SPAN).text = newSpan;
const okS = JSON.stringify(d2.body) === JSON.stringify(exp) && !JSON.stringify(d2).includes('renewed in 2022');
console.log('verify sanity', okS);
append({ doc_or_file: `sanity academyModule ${SANITY_ID} ${sPath}`, old: VT_OLD, new: VT_NEW, sources: S_VT, status: okS ? 'FIXED' : 'LEFT',
  note: `${VT_NOTE} Backup: sanity-backups/academy-phase3d-2026-10-07/sanity-${SANITY_ID}.json; re-fetched ${okS ? 'and verified' : 'VERIFY FAILED'}.` });

bkSafe(`supabase-lesson-${row.id}.json`, JSON.stringify(row, null, 2));
const { error: ue } = await db.from('lessons').update({ content_blocks: cb }).eq('id', row.id);
if (ue) throw ue;
const { data: r2 } = await db.from('lessons').select('content_blocks').eq('id', row.id).single();
const okR = JSON.stringify(r2.content_blocks) === JSON.stringify(cb) && !JSON.stringify(r2.content_blocks).includes(MD_OLD);
console.log('verify supabase', okR);
append({ doc_or_file: `supabase lessons ${row.id} (${row.slug}) content_blocks`, old: MD_OLD, new: MD_NEW, sources: S_MD, status: okR ? 'FIXED' : 'LEFT',
  note: `${MD_NOTE} Live Sanity body of this lesson already correct (All-Payer Model 2014, TCOC 2019) and was not changed. Backup: sanity-backups/academy-phase3d-2026-10-07/supabase-lesson-${row.id}.json; re-fetched ${okR ? 'and verified' : 'VERIFY FAILED'}.` });

for (const { f, t, nt } of fplans) {
  bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt);
  const back = fs.readFileSync(new URL(f, ROOT), 'utf8');
  let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
  console.log('verify file', f, ok);
  append({ doc_or_file: `local ${f}`, old: MD_OLD, new: MD_NEW, sources: S_MD, status: ok ? 'FIXED' : 'LEFT',
    note: `${MD_NOTE} Source copy of the same lesson text. Backup: sanity-backups/academy-phase3d-2026-10-07/local-${f.replace(/\//g, '__')}; re-read, JSON parses ${ok ? 'OK' : 'FAILED'}.` });
}
