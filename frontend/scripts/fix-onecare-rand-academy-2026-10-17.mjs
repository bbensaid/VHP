// 2026-10-17: OneCare 36%/18% figures are OneCare's own peer-ACO benchmarking filed with GMCB (not the State Auditor; VTDigger 11/16/2022; OCV FY23 benchmarking exec summary 3/31/2023). RAND 358% is RAND's 2020 study (not 2018-2020 data). Quiz updated to VDH BRFSS 2023-2024.
// 2026-10-17 Preface/Introduction deep pass, carried into the Academy and platform.
// Vermont Department of Health, BRFSS 2024 Population in Focus: Race & Ethnicity (March 2026; BRFSS 2023-2024):
// personal health care provider — VT 91, White 91, Hispanic 78* (only group statistically below VT), Black 85,
// AIAN 82. The "BIPOC ~80% / 11-point gap" mixed groups and survey years (VDH June 2024 report gave Black 80,
// Asian/NHPI 81, other race 79 — single groups, not BIPOC). Research Lab: 35 tools in tools.ts. HSAs: VDH counts 13.
// Findings: book-audit/deep/fix_preface_intro_2026-10-17.py, fix_pcp_gap_2026-10-17.py
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const DRY = process.argv.includes('--dry');
const R = [
  ['Vermont State Auditor performance audit', 'OneCare Vermont benchmarking report filed with the GMCB'],
  ["The State Auditor's performance audits document what that looked like in outcomes.", "OneCare's own benchmarking against peer ACOs, filed with the Green Mountain Care Board, documented what that looked like in outcomes."],
  ["On utilization, the State Auditor's 2021 report found that Vermonters attributed to OneCare", "On utilization, OneCare's own benchmarking against 20 peer ACOs, filed with the Green Mountain Care Board, found that Vermonters attributed to OneCare"],
  ['36% higher ED visit rate than peer ACOs nationally (VT State Auditor, 2021)', '36% higher ED visit rate than peer ACOs nationally (OneCare benchmarking filed with the GMCB)'],
  ['the State Auditor found OneCare-attributed patients had about 36% higher', "OneCare's own benchmarking found its attributed patients had about 36% higher"],
  ["The State Auditor's finding of roughly 36% higher ED use", "OneCare's own benchmarking finding of roughly 36% higher ED use"],
  ["is among the most extreme in the country: UVMMC's commercial prices run 358% of Medicare (RAND, 2018-2020 data)", "sits well above the national average: UVMMC's commercial prices ran 358% of Medicare in RAND's 2020 study"],
  ['RAND Hospital Price Transparency Study, 2018-2020 data', 'RAND hospital price study (2020)'],
  ["According to the Vermont Department of Health's January 2025 Health Equity Data Report, what is the approximate gap between Vermont's overall primary care access rate and the rate for BIPOC Vermont adults?", "According to the Vermont Department of Health's 2023–2024 survey data (BRFSS, published March 2026), how many percentage points separate white adults and Hispanic adults in having a personal health care provider?"],
  ['statewide vs. BIPOC adults — the gap stratification exists to surface', 'white vs. Hispanic adults (BRFSS 2023–2024) — the gap stratification exists to surface'],
  ['91% vs. 79–81%', '91% vs. 78%'],
  ['Vermont Department of Health, Health Equity Data Report, January 2025', 'Vermont Department of Health, BRFSS 2024 Population in Focus: Race & Ethnicity (March 2026)'],
  ['About 11 percentage points (roughly 91% overall vs. 79–81% for BIPOC adults)', 'About 13 percentage points (91% of white adults vs. 78% of Hispanic adults)'],
];
const LEFT = /State Auditor performance audit|2018-2020 data|most extreme in the country|79–81%/gi;
const js = (s) => JSON.stringify(s).slice(1, -1);
const hits = new Map(R.map(([o]) => [o, 0]));
const fix = (t) => { let n = 0; const seen = new Set(); for (const [o, w] of R) for (const [a, b] of [[o, w], [js(o), js(w)]]) { if (seen.has(a)) continue; seen.add(a); const c = t.split(a).length - 1; if (c) { t = t.split(a).join(b); n += c; hits.set(o, hits.get(o) + c); } } return [t, n]; };
const residue = (where, t) => { for (const m of t.matchAll(LEFT)) console.log('  RESIDUE', where, '|', t.slice(Math.max(0, m.index - 90), m.index + 70).replace(/\s+/g, ' ')); };

const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}`, 'Content-Type': 'application/json' };
const nd = await (await fetch(`${API}/export/production`, { headers: H })).text();
for (const doc of nd.split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((d) => !d._id.startsWith('drafts.') && !d._type.startsWith('sanity.'))) {
  const raw = JSON.stringify(doc);
  const [t, n] = fix(raw);
  residue('sanity ' + doc._id, t);
  if (!n) continue;
  console.log('sanity', doc._id, n);
  if (DRY) continue;
  fs.writeFileSync(`../sanity-backups/onecare-rand-${doc._id}-${Date.now()}.json`, raw);
  const { _id, _type, _rev, _createdAt, _updatedAt, ...fields } = JSON.parse(t);
  console.log('  ->', (await fetch(`${API}/mutate/production`, { method: 'POST', headers: H, body: JSON.stringify({ mutations: [{ patch: { id: _id, set: fields } }] }) })).status);
}
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
for (const table of ['lessons', 'quiz_questions', 'quiz_options', 'quizzes', 'tracks', 'courses']) {
  const fetchAll = async (t) => { let out = [], from = 0; for (;;) { const { data, error } = await sb.from(t).select('*').range(from, from + 999); if (error) return { data: null, error }; out = out.concat(data); if (data.length < 1000) return { data: out, error: null }; from += 1000; } };
  const { data, error } = await fetchAll(table);
  if (error) { console.log('skip', table, error.message); continue; }
  for (const row of data) {
    const upd = {};
    for (const [k, v] of Object.entries(row)) {
      if (v == null || k === 'id') continue;
      const isStr = typeof v === 'string';
      const [t, n] = fix(isStr ? JSON.stringify(v) : JSON.stringify(v));
      residue(`${table}.${k} ${row.slug ?? row.id}`, t);
      if (n) upd[k] = JSON.parse(t);
    }
    if (!Object.keys(upd).length) continue;
    console.log('supabase', table, row.slug ?? row.id, Object.keys(upd));
    if (DRY) continue;
    const { error: e2 } = await sb.from(table).update(upd).eq('id', row.id);
    console.log('  ->', e2?.message ?? 'ok');
  }
}
for (const f of [...fs.readdirSync('content').filter((x) => /\.(json|py)$/.test(x)).map((x) => 'content/' + x),
                 ...fs.readdirSync('content/_lesson_drafts').filter((x) => x.endsWith('.py')).map((x) => 'content/_lesson_drafts/' + x),
                 'components/FivePillarFrameworkMap.tsx']) {
  const src = fs.readFileSync(f, 'utf8');
  const [out, n] = fix(src);
  if (!n) continue;
  console.log('file', f, n);
  if (!DRY) { if (f.endsWith('.json')) JSON.parse(out); fs.writeFileSync(f, out); }
}
for (const [o, c] of hits) if (!c) console.log('NO HIT:', o.slice(0, 80));
