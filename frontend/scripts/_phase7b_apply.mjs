// Phase 7b — apply OPS from _phase7b_ops.mjs (non-VBC Academy lessons) to Sanity, then mirror the same edits into
// Supabase lessons.content_blocks/summary, quiz rows, and local source copies (frontend/content, frontend/sanity, lesson drafts).
// Usage: node scripts/_phase7b_apply.mjs [--commit] [--only=<docId>]
// Guards: each text pair must match exactly once in its block, or its replacement must already be present (skipped,
// never doubled). Stat edits are skipped when the stat already carries the new values. Every doc/row/file is backed up
// (no overwrite) before its first write, then re-fetched / re-read and compared. One JSONL line per op per target.
import fs from 'fs';
import { db, getDoc, mutate, bkSafe, append, walk, same, detectFmt, emit, ROOT, COMMIT } from './_phase7b_lib.mjs';
import { OPS } from './_phase7b_ops.mjs';

const ONLY = process.argv.find(a => a.startsWith('--only='))?.slice(7);
const VBC = s => !!s && (/vbc-fundamentals-module-|vbc-social-risk|capitation-mechanics|vbc-bundled-|aco-/.test(s) || /^vbc-/.test(s));
const countIn = (v, s) => JSON.stringify(v).split(JSON.stringify(s).slice(1, -1)).length - 1;
const DROP = Symbol('drop');
const LOGDOC = {}; // per-op log lines collected then written

// ---------- 1. Sanity
const statEdits = []; // {op, old, set|remove}
const textPairs = []; // {op, old, new}
const results = []; // {op, doc, ok, msg}
const ids = [...new Set(OPS.map(o => o.id))].filter(id => !ONLY || id === ONLY);
for (const id of ids) {
  if (VBC(id)) { console.log('SKIP VBC-owned', id); continue; }
  const doc = await getDoc(id); if (!doc) { console.log('MISSING', id); continue; }
  const body = structuredClone(doc.body); let changed = false; const mine = [];
  for (const op of OPS.filter(o => o.id === id)) {
    const i = body.findIndex(b => b._key === op.key);
    if (i < 0) { mine.push({ op, ok: false, msg: 'block key missing' }); continue; }
    const msgs = []; let bad = false;
    for (const [o, n] of op.pairs || []) {
      if (o == null || n == null) continue;
      textPairs.push({ op, old: o, new: n });
      const k = countIn(body[i], o);
      const applied = k === 0 ? (!n || countIn(body[i], n) > 0) : (n.includes(o) && countIn(body[i], n) >= k);
      if (applied) { msgs.push('pair already applied'); continue; }
      if (k !== 1) { msgs.push(`pair old matched ${k}x`); bad = true; continue; }
      body[i] = walk(body[i], [[o, n]], null, {}); changed = true; msgs.push('pair replaced');
    }
    const stats = body[i].stats;
    const setStat = (s, fields, how) => {
      if (!s) { msgs.push(`stat ${how} not found`); bad = true; return; }
      if (Object.entries(fields).every(([k, v]) => s[k] === v)) { msgs.push(`stat ${how} already applied`); return; }
      statEdits.push({ op, old: { ...s }, set: fields });
      Object.assign(s, fields); changed = true; msgs.push(`stat ${how} set`);
    };
    for (const [sk, fields] of Object.entries(op.stats || {})) {
      if (sk === '__byLabel') {
        for (const [lab, f] of Object.entries(fields)) setStat(stats.find(s => s.label === lab) || stats.find(s => f.label && s.label === f.label), f, `label "${lab}"`);
      } else setStat(stats.find(s => s._key === sk), fields, sk);
    }
    for (const [ix, fields] of Object.entries(op.statsByIndex || {})) setStat(stats[+ix], fields, `index ${ix}`);
    for (const sk of op.removeStats || []) {
      const j = stats.findIndex(s => s._key === sk);
      if (j < 0) { msgs.push(`stat ${sk} already removed`); continue; }
      statEdits.push({ op, old: { ...stats[j] }, remove: true });
      stats.splice(j, 1); changed = true; msgs.push(`stat ${sk} removed`);
    }
    mine.push({ op, ok: !bad, msg: msgs.join('; ') });
  }
  console.log('SANITY', id, changed ? 'CHANGES' : 'no change', 'blocks', body.length, body.length < 20 ? 'WARNING <20' : '');
  mine.forEach(r => console.log('  ', r.ok ? 'ok ' : 'ERR', r.op.key, r.msg));
  let bk = '', verified = null;
  if (changed && COMMIT && mine.every(r => r.ok)) {
    bk = bkSafe(`sanity-${id}.json`, JSON.stringify(doc, null, 2));
    await mutate([{ patch: { id, ifRevisionID: doc._rev, set: { body } } }]);
    const back = await getDoc(id); verified = same(back.body, body);
    console.log('  verify', verified, bk);
  } else if (changed && COMMIT) console.log('  NOT WRITTEN (an op failed its guard)');
  mine.forEach(r => results.push({ ...r, doc: id, bk, verified, changed }));
}

// ---------- 2. Mirrors
const P2 = textPairs.map(p => [p.old, p.new]);
const statMatch = (v, e) => v && typeof v === 'object' && !Array.isArray(v) && typeof v.context === 'string' && v.context === e.old.context && v.value === e.old.value;
function walk2(v, counts, ctx = '') {
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    const own = (typeof v.slug === 'string' ? v.slug : v.slug?.current) || v.sanity_slug || '';
    if (VBC(own)) return v; // never touch VBC-owned lessons inside shared files
    for (const e of statEdits) if (statMatch(v, e)) { counts['stat:' + e.old.context] = (counts['stat:' + e.old.context] || 0) + 1; if (e.remove) return DROP; v = { ...v, ...e.set }; break; }
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk2(x, counts, own || ctx)]));
  }
  if (Array.isArray(v)) return v.map(x => walk2(x, counts, ctx)).filter(x => x !== DROP);
  if (typeof v === 'string') return walk(v, P2, null, counts);
  return v;
}
const mirrorHits = [];
const all = async (t, sel) => { let r = [], f = 0; for (;;) { const { data, error } = await db.from(t).select(sel).range(f, f + 999); if (error) throw error; r = r.concat(data); if (data.length < 1000) break; f += 1000; } return r; };
const lessons = await all('lessons', 'id,slug,sanity_slug');
const vbcLesson = new Set(lessons.filter(l => VBC(l.slug) || VBC(l.sanity_slug)).map(l => l.id));
const quizzes = await all('quizzes', 'id,lesson_id'); const vbcQuiz = new Set(quizzes.filter(q => vbcLesson.has(q.lesson_id)).map(q => q.id));
const qq = await all('quiz_questions', 'id,quiz_id'); const vbcQ = new Set(qq.filter(q => vbcQuiz.has(q.quiz_id)).map(q => q.id));
const qo = await all('quiz_options', 'id,question_id'); const vbcO = new Set(qo.filter(o => vbcQ.has(o.question_id)).map(o => o.id));
const skip = { lessons: vbcLesson, quiz_questions: vbcQ, quiz_options: vbcO };
for (const [t, col] of [['lessons', 'content_blocks'], ['lessons', 'summary'], ['quiz_questions', 'question'], ['quiz_questions', 'explanation'], ['quiz_options', 'text'], ['quiz_options', 'explanation']]) {
  const rows = await all(t, `id,${col}`);
  for (const row of rows) {
    if (skip[t].has(row.id) || row[col] == null) continue;
    const counts = {}; const nv = walk2(row[col], counts);
    if (same(nv, row[col])) continue;
    console.log('SUPABASE', t, row.id, col, Object.keys(counts).length, 'hit(s)');
    if (!COMMIT) continue;
    const { data: full } = await db.from(t).select('*').eq('id', row.id).single();
    const bk = bkSafe(`supabase-${t}-${row.id}.json`, JSON.stringify(full, null, 2));
    const { error } = await db.from(t).update({ [col]: nv }).eq('id', row.id); if (error) throw error;
    const { data: r2 } = await db.from(t).select(col).eq('id', row.id).single();
    mirrorHits.push({ target: `supabase ${t} ${row.id} ${col}`, counts, ok: same(r2[col], nv), bk });
  }
}
// local files: structured re-emit when the serializer is reproducible, else surgical text edits proven equal to the structural edit
const enc = s => JSON.stringify(s).slice(1, -1);
const encA = s => enc(s).replace(/[\u0080-￿]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
function rawEdit(t) {
  for (const [o, n] of P2) for (const e of [enc, encA]) { if (n.includes(o) && t.includes(e(n))) continue; t = t.split(e(o)).join(e(n)); }
  for (const se of statEdits) {
    const at = [enc, encA].map(e => t.indexOf(e(se.old.context))).find(i => i >= 0); if (at === undefined || at < 0) continue;
    const a = t.lastIndexOf('{', at), b = t.indexOf('}', at) + 1; let seg = t.slice(a, b);
    if (se.remove) { let s0 = a, e0 = b; const after = t.slice(e0).match(/^\s*,/); if (after) e0 += after[0].length; else { const before = t.slice(0, s0).match(/,\s*$/); if (before) s0 -= before[0].length; } t = t.slice(0, s0) + t.slice(e0); continue; }
    for (const [k, v] of Object.entries(se.set)) {
      const cur = k === 'context' ? null : se.old[k];
      if (k === 'context') { for (const e of [enc, encA]) seg = seg.split(e(se.old.context)).join(e(v)); continue; }
      if (cur === undefined) continue;
      seg = seg.replace(new RegExp(`("${k}"\\s*:\\s*)"(?:${[enc, encA].map(e => e(cur).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})"`), (_, p) => p + JSON.stringify(v));
    }
    t = t.slice(0, a) + seg + t.slice(b);
  }
  return t;
}
const files = [];
const scan = d => { for (const e of fs.readdirSync(new URL(d + '/', ROOT), { withFileTypes: true })) { const p = d + '/' + e.name; if (e.isDirectory()) { if (e.name !== 'node_modules') scan(p); } else if (/\.(json|py)$/.test(p)) files.push(p); } };
['frontend/content', 'frontend/sanity'].forEach(scan);
for (const f of files) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); let nt; const counts = {};
  if (f.endsWith('.py')) { // lesson drafts: plain-literal replacements only
    nt = t; for (const [o, n] of P2) { if (n.includes(o) && nt.includes(n)) continue; const k = nt.split(o).length - 1; if (k) { counts[o] = k; nt = nt.split(o).join(n); } }
    if (nt === t) continue;
  } else {
    let parsed; try { parsed = JSON.parse(t); } catch { continue; }
    const want = walk2(parsed, counts); if (same(want, parsed)) continue;
    const fmt = detectFmt(t);
    if (fmt) nt = emit(want, fmt);
    else { nt = rawEdit(t); let got; try { got = JSON.parse(nt); } catch { got = null; }
      if (!got || !same(got, want)) { console.log('LOCAL raw edit mismatch, NOT written', f);
        const diff = (a, b, p = '') => { if (same(a, b)) return; if (a && b && typeof a === 'object' && typeof b === 'object') { for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) if (!same(a[k], b[k])) return diff(a[k], b[k], p + '/' + k); } console.log('   first diff at', p, '\n   raw :', JSON.stringify(a)?.slice(0, 300), '\n   want:', JSON.stringify(b)?.slice(0, 300)); };
        if (got) diff(got, want); mirrorHits.push({ target: 'local ' + f, counts, ok: false, bk: 'raw edit mismatch (not written)' }); continue; } }
  }
  console.log('LOCAL', f, Object.keys(counts).length, 'hit(s)');
  if (!COMMIT) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt);
  const back = fs.readFileSync(new URL(f, ROOT), 'utf8'); let ok = back === nt; if (f.endsWith('.json')) try { JSON.parse(back); } catch { ok = false; }
  mirrorHits.push({ target: 'local ' + f, counts, ok, bk });
}
for (const h of mirrorHits) if (!h.ok) console.log('MIRROR FAIL', h.target, h.bk);

// ---------- 3. Ledger (commit only): one line per Sanity op, one per mirror target per op that hit it
if (COMMIT) {
  for (const r of results) {
    const fixed = r.ok && (r.changed ? r.verified === true : true);
    append({ doc: `sanity academyModule ${r.doc}`, block_key: r.op.key, claim: r.op.claim || '(see earlier FABRICATED/UNVERIFIABLE line for this block)', verdict: r.op.verdict || 'FABRICATED',
      action: [...(r.op.pairs || []).filter(p => p[0] && p[1] != null).map(([o, n]) => `replaced ${JSON.stringify(o).slice(0, 250)} -> ${JSON.stringify(n).slice(0, 250)}`),
        ...Object.keys(r.op.stats || {}).map(k => `stat ${k} fields set ${JSON.stringify(r.op.stats[k]).slice(0, 300)}`),
        ...Object.keys(r.op.statsByIndex || {}).map(k => `stat index ${k} set ${JSON.stringify(r.op.statsByIndex[k]).slice(0, 300)}`),
        ...(r.op.removeStats || []).map(k => `removed stat ${k}`)].join(' | '),
      sources: r.op.sources || 'see the matching LEFT line earlier in this log', status: fixed ? 'FIXED' : 'LEFT',
      note: `[${r.msg}${r.bk ? '; backup ' + r.bk : ''}${r.verified === true ? '; re-fetched and verified' : r.verified === false ? '; VERIFY FAILED' : ''}]` });
  }
  for (const h of mirrorHits) append({ doc: h.target, block_key: 'mirror', claim: 'mirror of the Sanity corrections above (fallback / re-seed source)', verdict: 'FABRICATED',
    action: `mirrored ${Object.keys(h.counts).length} edit(s): ${Object.keys(h.counts).map(k => JSON.stringify(k.slice(0, 80))).join('; ').slice(0, 900)}`,
    sources: 'see Sanity lines above', status: h.ok ? 'FIXED' : 'LEFT', note: `backup ${h.bk}${h.ok ? '; re-read and verified' : '; VERIFY FAILED'}` });
}
