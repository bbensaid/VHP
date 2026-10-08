// Phase 7a (VBC Fundamentals family source-integrity pass) — apply one ops file.
// Usage: node scripts/_phase7a_apply.mjs scripts/_phase7a_ops/<file>.json [--commit]
// Ops file: { "ops": [ { "docs": ["<sanity _id>", ...], "key": "<block _key>", "old": "...", "new": "...",
//                        "claim", "verdict": "REAL|FABRICATED|UNVERIFIABLE", "sources", "note",
//                        "mirror": true  (also apply old->new to Supabase lessons.content_blocks / quiz tables / local JSON) },
//                      { "docs": [...], "key": "...", "remove": true, ... },
//                      { "docs": [...], "after": "<key>", "insert": {<block>}, ... },
//                      { "log_only": true, "doc", "block_key", ... "status": "LEFT" } ] }
// Guards: a replacement must match exactly once in the block (or already be applied -> skipped, never doubled);
// every doc/row/file is backed up (no overwrite) before its first write and re-fetched/re-read to verify.
import fs from 'fs';
import { db, getDoc, mutate, bkSafe, append, walk, same, detectFmt, emit, ROOT, COMMIT } from './_phase7a_lib.mjs';

const opsFile = process.argv.find(a => a.endsWith('.json'));
const { ops } = JSON.parse(fs.readFileSync(opsFile, 'utf8'));
const LOCAL = ['frontend/content', 'frontend/sanity'];
const countIn = (v, s) => JSON.stringify(v).split(JSON.stringify(s).slice(1, -1)).length - 1;
const rec = (o, status, extra = '') => append({ doc: o.doc, block_key: o.block_key, claim: o.claim, verdict: o.verdict, action: o.action, sources: o.sources, status, note: (o.note || '') + extra });

// ---------- Sanity
const byDoc = {};
for (const op of ops) if (!op.log_only) for (const id of op.docs) (byDoc[id] ||= []).push(op);
const results = new Map(); // op -> [{doc, ok, msg}]
const note = (op, doc, ok, msg) => { if (!results.has(op)) results.set(op, []); results.get(op).push({ doc, ok, msg }); };

for (const [id, list] of Object.entries(byDoc)) {
  const doc = await getDoc(id); if (!doc) { list.forEach(op => note(op, id, false, 'doc missing')); continue; }
  let body = structuredClone(doc.body), changed = false;
  for (const op of list) {
    if (op.remove) {
      const i = body.findIndex(b => b._key === op.key);
      if (i < 0) { note(op, id, true, 'already removed'); continue; }
      body.splice(i, 1); changed = true; note(op, id, true, 'removed'); continue;
    }
    if (op.insert) {
      if (body.some(b => b._key === op.insert._key)) { note(op, id, true, 'already inserted'); continue; }
      const i = body.findIndex(b => b._key === op.after); if (i < 0) { note(op, id, false, 'anchor missing'); continue; }
      body.splice(i + 1, 0, op.insert); changed = true; note(op, id, true, 'inserted'); continue;
    }
    const i = body.findIndex(b => b._key === op.key); if (i < 0) { note(op, id, false, 'key missing'); continue; }
    const n = countIn(body[i], op.old);
    if (n === 0 && countIn(body[i], op.new) > 0) { note(op, id, true, 'already applied'); continue; }
    if (n !== 1) { note(op, id, false, `old matched ${n}x`); continue; }
    body[i] = walk(body[i], [[op.old, op.new]], null, {}); changed = true; note(op, id, true, 'replaced');
  }
  console.log('SANITY', id, changed ? 'CHANGES' : 'no change', 'blocks', doc.body.length, '->', body.length);
  if (body.length < 20) console.log('  WARNING body below 20 blocks');
  if (!changed || !COMMIT) continue;
  const bk = bkSafe(`sanity-${id}.json`, JSON.stringify(doc, null, 2));
  await mutate([{ patch: { id, ifRevisionID: doc._rev, set: { body } } }]);
  const back = await getDoc(id);
  const ok = same(back.body, body);
  console.log('  verify', ok, bk);
  for (const op of list) for (const r of results.get(op) || []) if (r.doc === id) { r.bk = bk; r.verified = ok; }
}

// ---------- mirrors (Supabase lessons/quiz text, local JSON) for replacement ops flagged mirror
const mirrorOps = ops.filter(o => o.mirror && o.old);
const P2 = mirrorOps.map(o => [o.old, o.new]);
const mirrorHits = [];
if (P2.length) {
  const all = async (t, sel) => { let r = [], f = 0; for (;;) { const { data, error } = await db.from(t).select(sel).range(f, f + 999); if (error) throw error; r = r.concat(data); if (data.length < 1000) break; f += 1000; } return r; };
  const targets = [['lessons', 'content_blocks'], ['lessons', 'summary'], ['quiz_questions', 'question'], ['quiz_questions', 'explanation'], ['quiz_options', 'text'], ['quiz_options', 'explanation']];
  for (const [t, col] of (process.argv.includes('--no-supa') ? [] : targets)) {
    let rows; try { rows = await all(t, `id,${col}`); } catch (e) { console.log('skip', t, col, e.message); continue; }
    for (const row of rows) {
      const counts = {}; const nv = walk(row[col], P2, null, counts);
      if (same(nv, row[col])) continue;
      console.log('SUPABASE', t, row.id, col, JSON.stringify(counts).slice(0, 200));
      if (!COMMIT) continue;
      const { data: full } = await db.from(t).select('*').eq('id', row.id).single();
      const bk = bkSafe(`supabase-${t}-${row.id}.json`, JSON.stringify(full, null, 2));
      const { error } = await db.from(t).update({ [col]: nv }).eq('id', row.id); if (error) throw error;
      const { data: r2 } = await db.from(t).select(col).eq('id', row.id).single();
      mirrorHits.push({ target: `supabase ${t} ${row.id} ${col}`, counts, ok: same(r2[col], nv), bk });
    }
  }
  const files = [];
  const scan = d => { for (const e of fs.readdirSync(new URL(d + '/', ROOT), { withFileTypes: true })) { const p = d + '/' + e.name; if (e.isDirectory()) { if (e.name !== 'node_modules') scan(p); } else if (p.endsWith('.json')) files.push(p); } };
  LOCAL.forEach(scan);
  for (const f of files) {
    const t = fs.readFileSync(new URL(f, ROOT), 'utf8');
    let parsed; try { parsed = JSON.parse(t); } catch { continue; }
    { const c0 = {}; walk(parsed, P2, null, c0); if (!Object.keys(c0).length) continue; }
    const fmt = detectFmt(t); if (!fmt) { console.log('LOCAL format not reproducible, skipped', f); mirrorHits.push({ target: 'local ' + f, counts: {}, ok: false, bk: 'format not reproducible' }); continue; }
    const counts = {}; const nt = emit(walk(JSON.parse(t), P2, null, counts), fmt);
    if (nt === t) continue;
    console.log('LOCAL', f, JSON.stringify(counts).slice(0, 200));
    if (!COMMIT) continue;
    const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
    fs.writeFileSync(new URL(f, ROOT), nt);
    const back = fs.readFileSync(new URL(f, ROOT), 'utf8'); let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
    mirrorHits.push({ target: 'local ' + f, counts, ok, bk });
  }
}

// ---------- report + ledger
for (const op of ops) {
  if (op.log_only) { console.log('LOG', op.doc, op.block_key, op.status); if (COMMIT) rec(op, op.status || 'LEFT'); continue; }
  const rs = results.get(op) || [];
  for (const r of rs) console.log(' ', r.ok ? 'ok ' : 'ERR', r.doc, op.key || op.after, r.msg);
  if (!COMMIT) continue;
  for (const r of rs) {
    const fixed = r.ok && (r.msg === 'already applied' || r.msg === 'already removed' || r.msg === 'already inserted' || r.verified);
    rec({ ...op, doc: `sanity ${r.doc}`, block_key: op.key || op.insert?._key, action: op.action || (op.remove ? 'removed block' : op.insert ? `inserted block after ${op.after}` : `replaced ${JSON.stringify(op.old).slice(0, 300)} -> ${JSON.stringify(op.new).slice(0, 300)}`) },
      fixed ? 'FIXED' : 'LEFT', ` [${r.msg}${r.bk ? '; backup ' + r.bk : ''}${r.verified === false ? '; VERIFY FAILED' : ''}]`);
  }
  if (op.mirror) for (const h of mirrorHits) if (h.counts[op.old]) rec({ ...op, doc: h.target, block_key: op.key, action: `mirror replace ${JSON.stringify(op.old).slice(0, 200)}` }, h.ok ? 'FIXED' : 'LEFT', ` [${h.counts[op.old]} occurrence(s); backup ${h.bk}${h.ok ? '' : '; VERIFY FAILED'}]`);
}
for (const h of mirrorHits) if (!h.ok) console.log('MIRROR FAIL', h.target, h.bk);
