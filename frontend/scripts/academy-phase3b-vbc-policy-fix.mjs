// Phase 3b: remove fabricated attributions / unverifiable figures from the VBC Fundamentals
// Module 2 (Policy Pillar) lesson, in both the Sanity doc and the Supabase row
// (sanity-vbc-policy renders its content_blocks fallback). Targeted text patches only;
// block structure and _keys are preserved.
// Usage: node scripts/academy-phase3b-vbc-policy-fix.mjs [--commit]
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .split('\n').filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const COMMIT = process.argv.includes('--commit');
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const P = env.NEXT_PUBLIC_SANITY_PROJECT_ID, TOKEN = env.SANITY_API_TOKEN;
const DOC = 'academyModule-vbc-fundamentals-module-2-policy-pillar';
const ROW = 'b927de74-b607-4708-99df-1c984ff6d1fd';
const BK = new URL('../../sanity-backups/academy-phase3-2026-10-07/', import.meta.url);
const LOG = new URL('../../docs/audits/academy_phase3b_2026-10.jsonl', import.meta.url);

const S_AHEAD = 'CMS, "CMS Announces Changes to AHEAD Model" (Sept 23, 2025), as summarized by AHCA/NCAL blog "CMS Announces Major Changes to AHEAD Model Design" (all cohorts run through Dec 31, 2035; no new cohort or solicitation announced)';
const TEXT = {
  blk029: [[' — HTR Regulatory Intelligence Assessment, Q1 2026.', '',
    'No "HTR Regulatory Intelligence Assessment" exists anywhere in the platform or on the web; fabricated attribution removed, quote text kept as the lesson\'s own framing.',
    'grep of frontend/app, components, lib, backend: no such document; web search: none']],
  blk041: [['If no, monitor CMS for the next AHEAD cohort solicitation, expected in late 2026.',
    'If no, note that CMS\'s September 2025 redesign of AHEAD announced no further cohorts; the existing cohorts run through December 31, 2035.',
    'No source found for a late-2026 cohort solicitation; replaced with the verified state of the model.', S_AHEAD]],
  blk045: [
    ['In this 52-minute episode, HTR Principal Policy Analyst Dr. Sarah Chen is joined by former CMS Deputy Administrator for Innovation Andy Slavitt and health law attorney Valerie Rock to walk through',
      'This episode walks through',
      'Fabricated podcast guests removed: no record of any such episode; "Dr. Sarah Chen" is not a verifiable HTR analyst; Andy Slavitt was Acting CMS Administrator (Mar 2015-Jan 2017), never "Deputy Administrator for Innovation"; the episode URL podcast.htr.com does not resolve.',
      'en.wikipedia.org/wiki/Andy_Slavitt; healthcarefinancenews.com (Slavitt farewell); web search for the episode/guests: no results; DNS lookup of podcast.htr.com: no record'],
    ['The conversation includes', 'It includes', 'Follow-on wording after removing the named guests.', 'n/a']],
  blk025: [
    ['which places 78% of Medicaid beneficiaries in global budget arrangements,',
      'which by June 2023 enrolled more than 1.3 million members — over half of all MassHealth members — in its ACOs,',
      'Unsourced 78% figure (mischaracterised: MassHealth reported ~75-79% of managed-care-ELIGIBLE members in ACOs in 2018-19) replaced with a sourced figure.',
      'Blue Cross Blue Shield of Massachusetts Foundation, Nov 2023 (via gih.org); MassHealth Restructuring 2019 Update Report (mass.gov)'],
    ['Mississippi, which remains 89% fee-for-service Medicaid,',
      'Mississippi, where about 65% of Medicaid beneficiaries are in MississippiCAN managed care and the rest remain in fee-for-service (Division of Medicaid 2024 Annual Report),',
      '"89% fee-for-service" is false: about 65% of Mississippi Medicaid beneficiaries are in MississippiCAN managed care.',
      'Mississippi Division of Medicaid, 2024 Annual Report (medicaid.ms.gov); Mississippi Today, Aug 28 2024']],
};
// table (code block blk024) row transforms
const DROP = ['% Medicaid in VBC Contracts', 'National Leadership Rating'];
const CELL = {
  Maryland: { 'Key Waiver': ['CMS AHEAD Model + Hospital Global Budget program since 1977',
    'CMS AHEAD Model; all-payer hospital rate setting since 1977 (Medicare waiver); hospital global budgets statewide since 2014',
    'Global budgets did not exist in 1977: the 1977 Medicare waiver established all-payer rate setting; statewide global budgets began in 2014.',
    'Hilltop Institute / HSCRC history; HCTTF Assessment of the MD All-Payer Model; Sharfstein 2014 Princeton Conference slides'] },
  Mississippi: {
    'Medicaid VBC Approach': ['Fee-for-service dominant; managed care in select counties',
      'MississippiCAN managed care statewide (about 65% of beneficiaries, 2024); remainder fee-for-service',
      'MississippiCAN covers ~65% of beneficiaries statewide; "FFS dominant, select counties" is false.',
      'Mississippi Division of Medicaid, 2024 Annual Report (medicaid.ms.gov)'],
    'Key Waiver': ['Limited 1115 authority; primarily FFS', 'Limited 1115 authority',
      '"primarily FFS" removed (false; see Medicaid VBC Approach).', 'Mississippi Division of Medicaid, 2024 Annual Report'] },
};
function fixRows(rows, log) {
  return rows.map(r => {
    const o = {};
    for (const [k, v] of Object.entries(r)) {
      if (DROP.includes(k)) { log.push([`table row ${r.State}: "${k}"`, `${k}: ${v}`, '(column value removed)',
        k.startsWith('%') ? 'Unsourced state percentage; no source located (searched state VBP reports, HCP-LAN, CMS); removed rather than replaced — no invented numbers.'
          : 'Unsourced "Tier" leadership rating (no rating body exists); removed.', 'web search: no source for the figure/rating']); continue; }
      const c = CELL[r.State]?.[k];
      if (c && v === c[0]) { o[k] = c[1]; log.push([`table row ${r.State}: "${k}"`, c[0], c[1], c[2], c[3]]); }
      else o[k] = v;
    }
    return o;
  });
}
function fixBody(body, isSanity, log) {
  return body.map(b => {
    if (b._key === 'blk024') {
      const rows = isSanity ? JSON.parse(b.code) : b.code;
      if (isSanity && JSON.stringify(rows, null, 2) !== b.code) throw new Error('code roundtrip mismatch');
      const nr = fixRows(rows, log);
      return { ...b, code: isSanity ? JSON.stringify(nr, null, 2) : nr };
    }
    const reps = TEXT[b._key];
    if (!reps) return b;
    const nb = structuredClone(b);
    for (const [o, n, note, src] of reps) {
      let hit = false;
      if (b._key === 'blk045') { if (nb.summary.includes(o)) { nb.summary = nb.summary.replace(o, n); hit = true; } }
      else for (const ch of nb.children) if (ch.text.includes(o)) { ch.text = ch.text.replace(o, n); hit = true; }
      if (!hit) throw new Error(`not found in ${b._key}: ${o}`);
      log.push([`body[_key=="${b._key}"]`, o, n, note, src]);
    }
    return nb;
  });
}
// ---- Sanity
const q = await fetch(`https://${P}.api.sanity.io/v2023-10-01/data/doc/production/${DOC}`, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.json());
const doc = q.documents[0];
const sLog = [];
const newBody = fixBody(doc.body, true, sLog);
// ---- Supabase
const { data: row, error } = await db.from('lessons').select('*').eq('id', ROW).single();
if (error) throw error;
const bLog = [];
const cb = structuredClone(row.content_blocks);
cb[0].body = fixBody(cb[0].body, false, bLog);
console.log('sanity changes', sLog.length, 'supabase changes', bLog.length);
for (const l of sLog) console.log(' S', l[0], '|', String(l[1]).slice(0, 70), '=>', String(l[2]).slice(0, 70));
if (!COMMIT) process.exit(0);
const b1 = new URL(`${DOC}.phase3b.json`, BK), b2 = new URL(`supabase-lesson-${ROW}.phase3b.json`, BK);
for (const b of [b1, b2]) if (fs.existsSync(b)) throw new Error('backup exists ' + b.pathname);
fs.writeFileSync(b1, JSON.stringify(doc, null, 2));
fs.writeFileSync(b2, JSON.stringify(row, null, 2));
const sets = {};
for (const b of newBody) {
  const old = doc.body.find(x => x._key === b._key);
  if (JSON.stringify(old) !== JSON.stringify(b)) {
    if (b._key === 'blk024') sets[`body[_key=="blk024"].code`] = b.code;
    else if (b._key === 'blk045') sets[`body[_key=="blk045"].summary`] = b.summary;
    else b.children.forEach((ch, i) => { if (ch.text !== old.children[i].text) sets[`body[_key=="${b._key}"].children[_key=="${ch._key}"].text`] = ch.text; });
  }
}
const mr = await fetch(`https://${P}.api.sanity.io/v2023-10-01/data/mutate/production`, { method: 'POST',
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ mutations: [{ patch: { id: DOC, ifRevisionID: doc._rev, set: sets } }] }) }).then(r => r.json());
if (mr.error) throw new Error(JSON.stringify(mr));
const { error: ue } = await db.from('lessons').update({ content_blocks: cb }).eq('id', ROW);
if (ue) throw ue;
// verify
const d2 = (await fetch(`https://${P}.api.sanity.io/v2023-10-01/data/doc/production/${DOC}`, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.json())).documents[0];
const { data: r2 } = await db.from('lessons').select('content_blocks').eq('id', ROW).single();
const sOk = JSON.stringify(d2.body) === JSON.stringify(newBody) && d2.body.length === doc.body.length;
const bOk = JSON.stringify(r2.content_blocks) === JSON.stringify(cb);
const bad = /Sarah Chen|Slavitt|Regulatory Intelligence|cohort solicitation|Tier [1-4]|89% fee|78% of Medicaid|since 1977"/;
console.log('verify sanity', sOk, !bad.test(JSON.stringify(d2.body)), 'supabase', bOk, !bad.test(JSON.stringify(r2.content_blocks)));
for (const [tgt, lg, ok] of [[`sanity ${DOC}`, sLog, sOk], [`supabase lessons ${ROW} (sanity-vbc-policy) content_blocks[0].body`, bLog, bOk]])
  for (const [where, o, n, note, src] of lg)
    fs.appendFileSync(LOG, JSON.stringify({ file_or_doc: `${tgt} ${where}`, old: o, new: n, sources: src, status: ok ? 'FIXED' : 'LEFT', note: `${note} Backup: academy-phase3-2026-10-07/*.phase3b.json; re-fetched ${ok ? 'and verified' : 'VERIFY FAILED'}.` }) + '\n');
