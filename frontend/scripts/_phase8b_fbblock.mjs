// Phase 8b — replace ONE whole fallback block (lessons.content_blocks[index]) in Supabase and every local JSON copy,
// lesson-scoped: the old block must deep-equal spec.expectOld (exactly one match per local file), so shared course files
// are never touched outside this lesson. newBlock null = remove the block.
// spec: { lessonId, index, expectOld, newBlock, anchor, files:[...], claim, verdict, src, note }
// Usage: node scripts/_phase8b_fbblock.mjs <spec.json> [--commit]
import fs from 'fs';
import { db, COMMIT, ROOT, bkSafe, append, detectFmt, emit, same } from './_phase8b_lib.mjs';
const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const { expectOld, newBlock } = spec;
const line = (doc, ok, bk) => append({ doc, block_key: `fb${spec.index}`, claim: spec.claim, verdict: spec.verdict, action: newBlock ? `replaced fallback block ${JSON.stringify(expectOld).slice(0, 300)} -> ${JSON.stringify(newBlock).slice(0, 400)}` : `removed fallback block ${JSON.stringify(expectOld).slice(0, 300)}`, sources: spec.src, status: ok ? 'FIXED' : 'LEFT', note: `${spec.note || ''} Backup ${bk}; ${ok ? 're-fetched and verified' : 'VERIFY FAILED'}.` });

// Supabase
{
  const { data: row, error } = await db.from('lessons').select('*').eq('id', spec.lessonId).single(); if (error) throw error;
  const cb = row.content_blocks; const cur = cb[spec.index];
  const done = newBlock ? same(cur, newBlock) : !cb.some(b => same(b, expectOld));
  if (done) console.log('SUPABASE already applied');
  else if (!same(cur, expectOld)) console.log('SUPABASE EXPECT MISMATCH at index', spec.index, JSON.stringify(cur).slice(0, 200));
  else {
    const nv = cb.slice(); if (newBlock) nv[spec.index] = newBlock; else nv.splice(spec.index, 1);
    console.log('SUPABASE will', newBlock ? 'replace' : 'remove', 'block', spec.index, '-> blocks', nv.length);
    if (COMMIT) {
      const bk = bkSafe(`supabase-lessons-${row.id}.json`, JSON.stringify(row, null, 2));
      const { error: ue } = await db.from('lessons').update({ content_blocks: nv }).eq('id', row.id); if (ue) throw ue;
      const { data: r2 } = await db.from('lessons').select('content_blocks').eq('id', row.id).single();
      line(`supabase lessons ${row.id} content_blocks`, same(r2.content_blocks, nv), bk);
    }
  }
}
// Local files
const enc = s => JSON.stringify(s).slice(1, -1), encA = s => enc(s).replace(/[\u0080-￿]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
function span(t, start) { // matching-brace end for an object starting at t[start] === '{'
  let d = 0, inS = false;
  for (let i = start; i < t.length; i++) { const c = t[i];
    if (inS) { if (c === '\\') i++; else if (c === '"') inS = false; continue; }
    if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}' && --d === 0) return i + 1; }
  return -1;
}
for (const f of spec.files) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); const parsed = JSON.parse(t);
  let hits = 0, already = 0;
  const rep = v => { if (same(v, expectOld)) { hits++; return newBlock ?? DROP; } if (newBlock && same(v, newBlock)) already++;
    if (Array.isArray(v)) return v.map(rep).filter(x => x !== DROP); if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, rep(x)])); return v; };
  const DROP = Symbol('drop'); const want = rep(parsed);
  if (hits !== 1) { console.log('LOCAL', f, hits ? `MATCHED ${hits}x — NOT written` : already ? 'already applied' : 'no match'); continue; }
  let nt; const fmt = detectFmt(t);
  if (fmt) nt = emit(want, fmt);
  else {
    const at = [enc, encA].map(e => t.indexOf(e(spec.anchor))).find(i => i >= 0);
    let a = at, b = -1;
    for (; a >= 0; a--) if (t[a] === '{') { const e = span(t, a); if (e > at) { try { if (same(JSON.parse(t.slice(a, e)), expectOld)) { b = e; break; } } catch {} } }
    if (b < 0) { console.log('LOCAL', f, 'span not found — NOT written'); continue; }
    if (newBlock) nt = t.slice(0, a) + JSON.stringify(newBlock) + t.slice(b);
    else { let s0 = a, e0 = b; const after = t.slice(e0).match(/^\s*,/); if (after) e0 += after[0].length; else { const before = t.slice(0, s0).match(/,\s*$/); if (before) s0 -= before[0].length; } nt = t.slice(0, s0) + t.slice(e0); }
    let got = null; try { got = JSON.parse(nt); } catch {}
    if (!got || !same(got, want)) { console.log('LOCAL', f, 'raw edit mismatch — NOT written'); continue; }
  }
  console.log('LOCAL', f, 'will', newBlock ? 'replace' : 'remove');
  if (!COMMIT) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt);
  const back = fs.readFileSync(new URL(f, ROOT), 'utf8'); let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
  line(`local ${f}`, ok, bk);
}
