// Phase 8b — field-level fixes to quiz rows (quiz_questions / quiz_options) and local quiz copies.
// spec: { edits:[{ table, id, set:{col:value}, expect:{col:value}, claim, verdict, src, note }],
//         localPairs:[{file, old, new}] }   (expect guards the current value; mismatch = not written)
// Usage: node scripts/_phase8b_quizfix.mjs <spec.json> [--commit]
import fs from 'fs';
import { db, COMMIT, ROOT, bkSafe, append, detectFmt, emit, walk } from './_phase8b_lib.mjs';
const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
for (const e of spec.edits || []) {
  const { data: row, error } = await db.from(e.table).select('*').eq('id', e.id).single(); if (error) throw error;
  const bad = Object.entries(e.expect || {}).filter(([k, v]) => row[k] !== v);
  const done = Object.entries(e.set).every(([k, v]) => row[k] === v);
  console.log(e.table, e.id, done ? 'already set' : bad.length ? 'EXPECT MISMATCH ' + JSON.stringify(bad.map(([k]) => [k, row[k]])) : 'will set ' + Object.keys(e.set));
  if (done || bad.length || !COMMIT) continue;
  const bk = bkSafe(`supabase-${e.table}-${e.id}.json`, JSON.stringify(row, null, 2));
  const { error: ue } = await db.from(e.table).update(e.set).eq('id', e.id); if (ue) throw ue;
  const { data: r2 } = await db.from(e.table).select('*').eq('id', e.id).single();
  const ok = Object.entries(e.set).every(([k, v]) => r2[k] === v);
  append({ doc: `supabase ${e.table} ${e.id}`, block_key: 'quiz', claim: e.claim, verdict: e.verdict || 'FABRICATED', action: `set ${JSON.stringify(e.set).slice(0, 500)}`, sources: e.src, status: ok ? 'FIXED' : 'LEFT', note: `${e.note || ''} Backup ${bk}; ${ok ? 're-fetched and verified' : 'VERIFY FAILED'}.` });
}
const byFile = {}; for (const p of spec.localPairs || []) (byFile[p.file] ||= []).push(p);
for (const [f, ps] of Object.entries(byFile)) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); const fmt = detectFmt(t); const counts = {};
  let nt;
  if (fmt) nt = emit(walk(JSON.parse(t), ps.map(p => [p.old, p.new]), null, counts), fmt);
  else { nt = t; for (const p of ps) for (const e of [s => JSON.stringify(s).slice(1, -1)]) { const k = nt.split(e(p.old)).length - 1; if (k) { counts[p.old] = k; nt = nt.split(e(p.old)).join(e(p.new)); } } JSON.parse(nt); }
  console.log('LOCAL', f, JSON.stringify(Object.values(counts)));
  if (Object.values(counts).some(c => c > 1)) { console.log('  multiple hits — NOT written'); continue; }
  if (nt === t || !COMMIT) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt);
  const back = fs.readFileSync(new URL(f, ROOT), 'utf8'); let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
  ps.forEach(p => counts[p.old] && append({ doc: `local ${f}`, block_key: 'quiz mirror', claim: p.claim || p.old.slice(0, 200), verdict: p.verdict || 'FABRICATED', action: `replaced ${JSON.stringify(p.old).slice(0, 250)} -> ${JSON.stringify(p.new).slice(0, 250)}`, sources: p.src || 'see matching supabase quiz line', status: ok ? 'FIXED' : 'LEFT', note: `Backup ${bk}; ${ok ? 're-read and verified' : 'VERIFY FAILED'}.` }));
}
