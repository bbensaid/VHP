// 2026-10-12, author's decisions: (1) delete the EAST Fund "$150M a year" figure — no source ties that amount to the
// EAST Fund; (2) use the Department of Health's 13 Hospital Service Areas (Townshend sits inside Brattleboro).
// Scans the full Sanity export, Supabase lessons + quiz tables, and the course source files.
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const DRY = process.argv.includes('--dry');
const R = [
  ["(EAST) Fund, intended to provide up to $150 million annually beginning in 2027 for primary care", "(EAST) Fund for primary care"],
  ["; the EAST Fund, once expected at about $150M a year, fell away when Vermont left AHEAD in July 2026)", ")"],
  ["developed in the open across fourteen hospital service areas", "developed in the open across all of Vermont's hospital service areas"],
  ["after two rounds of engagement across all 14 hospital service areas", "after two rounds of engagement across all of Vermont's hospital service areas"],
  ["facilitator in each of its 14 Hospital Service Areas", "facilitator in each of its 13 Hospital Service Areas"],
  ["3,100+ participants, all 14 hospital service areas)", "3,100+ participants, all of Vermont's hospital service areas)"],
];
const LEFT = /(\b14|fourteen) (HSAs?|hospital service areas?|HSA-level)|EAST Fund[^."]{0,80}\$150/gi;
const js = (s) => JSON.stringify(s).slice(1, -1);
const hits = new Map(R.map(([o]) => [o, 0]));
const fix = (t) => { let n = 0; for (const [o, w] of R) for (const [a, b] of [[o, w], [js(o), js(w)]]) { if (a === o && js(o) === o && b !== w) continue; const c = t.split(a).length - 1; if (c) { t = t.split(a).join(b); n += c; hits.set(o, hits.get(o) + c); } } return [t, n]; };
const residue = (where, t) => { for (const m of t.matchAll(LEFT)) console.log('  RESIDUE', where, '|', t.slice(Math.max(0, m.index - 90), m.index + 60).replace(/\s+/g, ' ')); };

const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`;
const H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}`, 'Content-Type': 'application/json' };
const nd = await (await fetch(`${API}/export/production`, { headers: H })).text();
const docs = nd.split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((d) => !d._id.startsWith('drafts.') && !d._type.startsWith('sanity.'));
console.log('sanity docs scanned:', docs.length);
for (const doc of docs) {
  const raw = JSON.stringify(doc);
  const [t, n] = fix(raw);
  residue('sanity ' + doc._id, t);
  if (!n) continue;
  console.log('sanity', doc._id, n);
  if (DRY) continue;
  fs.writeFileSync(`../sanity-backups/east-hsa-${doc._id}-${Date.now()}.json`, raw);
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
      const s = typeof v === 'string' ? v : JSON.stringify(v);
      const [t, n] = typeof v === 'string' ? (() => { let x = v, c = 0; for (const [o, w] of R) { const k2 = x.split(o).length - 1; if (k2) { x = x.split(o).join(w); c += k2; hits.set(o, hits.get(o) + k2); } } return [x, c]; })() : fix(s);
      residue(`${table}.${k} ${row.slug ?? row.id}`, t);
      if (n) upd[k] = typeof v === 'string' ? t : JSON.parse(t);
    }
    if (!Object.keys(upd).length) continue;
    console.log('supabase', table, row.slug ?? row.id, Object.keys(upd));
    if (DRY) continue;
    const { error: e2 } = await sb.from(table).update(upd).eq('id', row.id);
    console.log('  ->', e2?.message ?? 'ok');
  }
}
for (const f of fs.readdirSync('content').filter((x) => /\.json$/.test(x)).map((x) => 'content/' + x)) {
  const src = fs.readFileSync(f, 'utf8');
  const [out, n] = fix(src);
  if (!n) continue;
  console.log('file', f, n);
  if (!DRY) { JSON.parse(out); fs.writeFileSync(f, out); }
}
for (const [o, c] of hits) if (!c) console.log('NO HIT:', o.slice(0, 80));
