// Phase 7 shared helpers (copied from _phase6_lib.mjs; phase-7 backup dir + ledger): env, Sanity read/patch, Supabase, no-overwrite backups, JSONL log,
// string-walker replacements, and format-preserving local JSON rewrite.
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

export const env = Object.fromEntries(fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .split('\n').filter(l => l.includes('=') && !l.trim().startsWith('#'))
  .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
export const COMMIT = process.argv.includes('--commit');
export const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const P = env.NEXT_PUBLIC_SANITY_PROJECT_ID, H = { Authorization: `Bearer ${env.SANITY_API_TOKEN}` };
export const ROOT = new URL('../../', import.meta.url);
const BK = new URL('sanity-backups/phase7-2026-10-07/', ROOT);
const LOG = new URL('docs/audits/phase7_sources_2026-10.jsonl', ROOT);

export const getDoc = async id => (await fetch(`https://${P}.api.sanity.io/v2023-10-01/data/doc/production/${encodeURIComponent(id)}`, { headers: H }).then(r => r.json())).documents?.[0];
export const query = async q => (await fetch(`https://${P}.api.sanity.io/v2023-10-01/data/query/production?query=${encodeURIComponent(q)}`, { headers: H }).then(r => r.json())).result;
export const mutate = async mutations => {
  const r = await fetch(`https://${P}.api.sanity.io/v2023-10-01/data/mutate/production?returnIds=true`, {
    method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify({ mutations }) });
  const j = await r.json(); if (!r.ok) throw new Error(JSON.stringify(j)); return j;
};

export function bkSafe(name, content) {
  fs.mkdirSync(BK, { recursive: true });
  let u = new URL(name, BK), n = 1;
  while (fs.existsSync(u)) u = new URL(name.replace(/(\.json)?$/, `.${n++}$1`), BK);
  fs.writeFileSync(u, content, { flag: 'wx' });
  return 'sanity-backups/phase7-2026-10-07/' + u.pathname.split('/').pop();
}
export function append(o) {
  fs.mkdirSync(new URL('docs/audits/', ROOT), { recursive: true });
  fs.appendFileSync(LOG, JSON.stringify(o) + '\n');
}

// Apply [old,new] string pairs to every string in a JSON value; also lets a hook replace whole nodes.
export function walk(v, pairs, hook, counts) {
  if (hook) { const h = hook(v); if (h !== undefined) { counts.__hook = (counts.__hook || 0) + 1; return h; } }
  if (typeof v === 'string') {
    let s = v;
    for (const [o, n] of pairs) { if (n.includes(o) && s.includes(n)) continue; const k = s.split(o).length - 1; if (k) { counts[o] = (counts[o] || 0) + k; s = s.split(o).join(n); } }
    return s;
  }
  if (Array.isArray(v)) return v.map(x => walk(x, pairs, hook, counts));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, pairs, hook, counts)]));
  return v;
}

// Local JSON files: detect the serializer (python indent/ensure_ascii vs compact) and re-emit identically.
const asciiEsc = s => s.replace(/[\u0080-\uffff]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
export function detectFmt(text) {
  const d = JSON.parse(text);
  for (const indent of [2, undefined, 1, 4]) for (const ascii of [true, false]) {
    let s = JSON.stringify(d, null, indent); if (ascii) s = asciiEsc(s);
    if (s === text) return { indent, ascii, nl: '' };
    if (s + '\n' === text) return { indent, ascii, nl: '\n' };
  }
  return null;
}
export function emit(d, f) { let s = JSON.stringify(d, null, f.indent); if (f.ascii) s = asciiEsc(s); return s + f.nl; }

// Key-order-insensitive deep compare (Postgres jsonb reorders object keys).
export const canon = v => Array.isArray(v) ? v.map(canon) : (v && typeof v === 'object') ? Object.fromEntries(Object.keys(v).sort().map(k => [k, canon(v[k])])) : v;
export const same = (a, b) => JSON.stringify(canon(a)) === JSON.stringify(canon(b));

// Apply string pairs (each {old,new,src,note}) to Sanity docs (patch changed body blocks by _key + listed top fields),
// Supabase rows (table/col/ids), and local JSON files; back up, verify by re-fetch, log one line per pair per target.
export async function applyEverywhere({ pairs, sanityIds = [], sanityFields = ['body'], supa = [], files = [], residue = [] }) {
  const P2 = pairs.map(p => [p.old, p.new]);
  const res = s => residue.filter(x => s.includes(x));
  const log = (target, counts, ok, bk, keys = '') => pairs.forEach(p => { if (counts[p.old]) append({ doc: target, block_key: keys, claim: p.claim || p.old, verdict: ok ? 'FIXED' : (p.verdict || 'FABRICATED'), finding: p.verdict || 'FABRICATED', sources: p.src, action: `replaced: ${JSON.stringify(p.old).slice(0, 400)} -> ${JSON.stringify(p.new).slice(0, 400)}`, note: `${p.note} ${counts[p.old]} occurrence(s). Backup: ${bk}; re-fetched ${ok ? 'and verified' : 'VERIFY FAILED'}.` }); });
  const summary = (label, c) => console.log(label, pairs.map((p, i) => `${i}:${c[p.old] || 0}`).join(' '));
  for (const id of sanityIds) {
    const doc = await getDoc(id); if (!doc) { console.log('MISSING', id); continue; }
    const counts = {}, sets = {};
    for (const f of sanityFields) {
      if (doc[f] === undefined) continue;
      const nv = walk(doc[f], P2, null, counts);
      if (f === 'body' && Array.isArray(doc.body)) doc.body.forEach((b, i) => { if (!same(b, nv[i])) sets[b._key ? `body[_key=="${b._key}"]` : `body[${i}]`] = nv[i]; });
      else if (!same(doc[f], nv)) sets[f] = nv;
    }
    summary(`SANITY ${doc._type} ${id}`, counts);
    if (!Object.keys(sets).length || !COMMIT) continue;
    const bk = bkSafe(`sanity-${id}.json`, JSON.stringify(doc, null, 2));
    await mutate([{ patch: { id, ifRevisionID: doc._rev, set: sets } }]);
    const back = await getDoc(id);
    const ok = Object.entries(sets).every(([k, v]) => k.startsWith('body[') ? same(back.body.find(b => b._key === v._key) ?? back.body[+k.slice(5, -1)], v) : same(back[k], v)) && res(JSON.stringify(back)).length === 0;
    console.log('  verify', ok);
    log(`sanity ${doc._type} ${id}`, counts, ok, bk, Object.keys(sets).join(', '));
  }
  for (const { table, col, ids, idCol = 'id' } of supa) {
    const { data: rows, error } = await db.from(table).select('*').in(idCol, ids); if (error) throw error;
    for (const row of rows) {
      const counts = {}; const nv = walk(row[col], P2, null, counts);
      summary(`SUPABASE ${table} ${row[idCol]}`, counts);
      if (same(nv, row[col]) || !COMMIT) continue;
      const bk = bkSafe(`supabase-${table}-${row[idCol]}.json`, JSON.stringify(row, null, 2));
      const { error: ue } = await db.from(table).update({ [col]: nv }).eq(idCol, row[idCol]); if (ue) throw ue;
      const { data: r2 } = await db.from(table).select(col).eq(idCol, row[idCol]).single();
      const ok = same(r2[col], nv) && res(JSON.stringify(r2[col])).length === 0;
      console.log('  verify', ok);
      log(`supabase ${table} ${row[idCol]} ${col}`, counts, ok, bk);
    }
  }
  for (const f of files) {
    const t = fs.readFileSync(new URL(f, ROOT), 'utf8');
    const fmt = detectFmt(t); if (!fmt) throw new Error('format not reproducible: ' + f);
    const counts = {}; const nt = emit(walk(JSON.parse(t), P2, null, counts), fmt);
    summary(`LOCAL ${f}`, counts);
    if (nt === t || !COMMIT) continue;
    const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
    fs.writeFileSync(new URL(f, ROOT), nt);
    const back = fs.readFileSync(new URL(f, ROOT), 'utf8');
    let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
    log(`local ${f}`, counts, ok, bk);
  }
}
