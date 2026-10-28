// Generic Academy/platform exact-string fixer. Usage: node scripts/fix-academy-strings.mjs <pairs.json> [--dry]
// pairs.json: {"tag": "act62", "note": "...source...", "pairs": [[old, new], ...], "residue": "regex"}
// Applies to Sanity (full export; backup per doc in ../sanity-backups/), every Supabase content table (paginated),
// and frontend/content course files. Prints NO HIT for any pair that matched nothing.
// Optional "only": [sanity slugs] scopes the run to those Sanity docs + their Supabase lesson rows
// (other tables and content files are skipped unless listed in "files") — for generic strings like "~35%".
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const DRY = process.argv.includes('--dry');
const CFG = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const R = CFG.pairs;
const ONLY = CFG.only ? new Set(CFG.only) : null;
const LEFT = new RegExp(CFG.residue || '(?!x)x', 'gi');
const js = (s) => JSON.stringify(s).slice(1, -1);
const hits = new Map(R.map(([o]) => [o, 0]));
const fix = (t) => { let n = 0; const seen = new Set(); for (const [o, w] of R) for (const [a, b] of [[o, w], [js(o), js(w)]]) { if (seen.has(a)) continue; seen.add(a); const c = t.split(a).length - 1; if (c) { t = t.split(a).join(b); n += c; hits.set(o, hits.get(o) + c); } } return [t, n]; };
const residue = (where, t) => { for (const m of t.matchAll(LEFT)) console.log('  RESIDUE', where, '|', t.slice(Math.max(0, m.index - 90), m.index + 70).replace(/\s+/g, ' ')); };

const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}`, 'Content-Type': 'application/json' };
const nd = await (await fetch(`${API}/export/production`, { headers: H })).text();
for (const doc of nd.split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((d) => !d._id.startsWith('drafts.') && !d._type.startsWith('sanity.') && (!ONLY || ONLY.has(d.slug?.current)))) {
  const raw = JSON.stringify(doc);
  const [t, n] = fix(raw);
  residue('sanity ' + doc._id, t);
  if (!n) continue;
  console.log('sanity', doc._id, n);
  if (DRY) continue;
  fs.writeFileSync(`../sanity-backups/${CFG.tag}-${doc._id}-${Date.now()}.json`, raw);
  const { _id, _type, _rev, _createdAt, _updatedAt, ...fields } = JSON.parse(t);
  console.log('  ->', (await fetch(`${API}/mutate/production`, { method: 'POST', headers: H, body: JSON.stringify({ mutations: [{ patch: { id: _id, set: fields } }] }) })).status);
}
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
for (const table of ONLY ? ['lessons'] : ['lessons', 'quiz_questions', 'quiz_options', 'quizzes', 'tracks', 'courses']) {
  const fetchAll = async (t) => { let out = [], from = 0; for (;;) { const { data, error } = await sb.from(t).select('*').range(from, from + 999); if (error) return { data: null, error }; out = out.concat(data); if (data.length < 1000) return { data: out, error: null }; from += 1000; } };
  const { data, error } = await fetchAll(table);
  if (error) { console.log('skip', table, error.message); continue; }
  for (const row of data) {
    if (ONLY && !ONLY.has(row.sanity_slug)) continue;
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
for (const f of ONLY ? (CFG.files || []) : [...fs.readdirSync('content').filter((x) => /\.(json|py)$/.test(x)).map((x) => 'content/' + x),
                 ...fs.readdirSync('content/_lesson_drafts').filter((x) => x.endsWith('.py')).map((x) => 'content/_lesson_drafts/' + x),
                 ...(CFG.files || [])]) {
  const src = fs.readFileSync(f, 'utf8');
  const [out, n] = fix(src);
  if (!n) continue;
  console.log('file', f, n);
  if (!DRY) { if (f.endsWith('.json')) JSON.parse(out); fs.writeFileSync(f, out); }
}
for (const [o, c] of hits) if (!c) console.log('NO HIT:', o.slice(0, 80));
