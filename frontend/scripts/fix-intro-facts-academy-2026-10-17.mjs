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
  ['Vermont adults with a personal primary care provider, statewide vs. BIPOC adults — an 11-point gap concealed by the statewide figure',
   'Vermont adults with a personal health care provider: statewide vs. Hispanic adults, the one group statistically below the state rate (BRFSS 2023–2024)'],
  ['91% vs. 80%', '91% vs. 78%'],
  ['Vermont Department of Health, Health Equity Data Report, January 2025', 'Vermont Department of Health, BRFSS 2024 Population in Focus: Race & Ethnicity (March 2026)'],
  ["with Vermont's own 11-point access gap as the anchor", "with Vermont's own access gaps by race and ethnicity as the anchor"],
  ['an 11-point primary-care access gap between white and BIPOC Vermonters is the number',
   'a 13-point gap in having a personal health care provider between white (91%) and Hispanic (78%) Vermonters is the number'],
  ['A state can hold a documented 11-point gap between white and BIPOC Vermonters on a 91% overall access measure',
   'A state can hold a documented 13-point gap between white and Hispanic Vermonters on a 91% overall access measure'],
  ['Nearly forty interactive tools in the Research Lab', 'More than thirty interactive tools in the Research Lab'],
  ['It also conceals an 11-point gap between white Vermont adults and BIPOC Vermont adults.',
   "It also conceals gaps: in the Health Department's 2023–2024 survey data, 78% of Hispanic adults have a personal health care provider, against 91% of white adults."],
  ['Yet that aggregate conceals an 11-point gap between white and BIPOC Vermont adults',
   'Yet that aggregate conceals a 13-point gap between white (91%) and Hispanic (78%) Vermont adults'],
  ["Vermont's 91% primary care access rate conceals an 11-point white–BIPOC gap.",
   "Vermont's 91% primary care access rate conceals a 13-point white–Hispanic gap."],
  ['but conceals an 11-point gap between white and BIPOC adults.', 'but conceals a 13-point gap between white and Hispanic adults.'],
  ['while the rate for BIPOC adults runs 79–81% — an 11-point gap concealed by the statewide average.',
   'while the rate for Hispanic adults is 78% — a 13-point gap concealed by the statewide average.'],
  ["all 14 of Vermont's Hospital Service Areas", "all of Vermont's Hospital Service Areas"],
  ["all 14 of Vermont's hospital service areas", "all of Vermont's hospital service areas"],
  ["hides an 11-point white/BIPOC gap.", "hides a 13-point white/Hispanic gap."],
];
const LEFT = /11-point|nearly forty|all 14 of Vermont|BIPOC adults runs/gi;
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
  fs.writeFileSync(`../sanity-backups/intro-${doc._id}-${Date.now()}.json`, raw);
  const { _id, _type, _rev, _createdAt, _updatedAt, ...fields } = JSON.parse(t);
  console.log('  ->', (await fetch(`${API}/mutate/production`, { method: 'POST', headers: H, body: JSON.stringify({ mutations: [{ patch: { id: _id, set: fields } }] }) })).status);
}
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
for (const table of ['lessons', 'quiz_questions', 'quiz_options', 'quizzes', 'tracks', 'courses']) {
  const { data, error } = await sb.from(table).select('*');
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
