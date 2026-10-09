// Phase 8b — object-level fixes for fallback stat/concept objects whose values are too generic for string pairs.
// spec: { edits:[{ match:{field:exactValue,...}, set:{field:newValue,...} | remove:true, claim, verdict, src, note }],
//         lessonIds:[...], files:[...] }
// Each edit's match must hit exactly one object per Supabase row it touches; local files must hit <=1 per edit
// (re-emitted with the detected serializer, or a raw in-place edit proven equal to the structural edit).
// Usage: node scripts/_phase8b_objfix.mjs <spec.json> [--commit]
import fs from 'fs';
import { db, COMMIT, ROOT, bkSafe, append, detectFmt, emit, same } from './_phase8b_lib.mjs';
const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const DROP = Symbol('drop');
const eq = (a, b) => (a && typeof a === 'object') || (b && typeof b === 'object') ? same(a, b) : a === b;
const hit = (v, m) => v && typeof v === 'object' && !Array.isArray(v) && Object.entries(m).every(([k, x]) => eq(v[k], x));
function apply(v, counts) {
  if (Array.isArray(v)) return v.map(x => apply(x, counts)).filter(x => x !== DROP);
  if (v && typeof v === 'object') {
    for (const [i, e] of spec.edits.entries()) if (hit(v, e.match)) { counts[i] = (counts[i] || 0) + 1; if (e.remove) return DROP; v = { ...v, ...e.set }; }
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, apply(x, counts)]));
  }
  return v;
}
const logE = (target, counts, ok, bk) => spec.edits.forEach((e, i) => { if (counts[i]) append({ doc: target, block_key: 'fallback object', claim: e.claim, verdict: e.verdict || 'FABRICATED',
  action: e.remove ? `removed object ${JSON.stringify(e.match).slice(0, 300)}` : `set ${JSON.stringify(e.set).slice(0, 400)} on object ${JSON.stringify(e.match).slice(0, 200)}`,
  sources: e.src, status: ok ? 'FIXED' : 'LEFT', note: `${e.note || ''} Backup ${bk}; ${ok ? 're-fetched and verified' : 'VERIFY FAILED'}.` }); });
const { data: rows, error } = await db.from('lessons').select('*').in('id', spec.lessonIds || []); if (error) throw error;
for (const row of rows) {
  const counts = {}; const nv = apply(row.content_blocks, counts);
  console.log('SUPABASE', row.slug, JSON.stringify(counts));
  if (Object.values(counts).some(c => c > 1)) { console.log('  multiple hits — NOT written'); continue; }
  if (same(nv, row.content_blocks) || !COMMIT) continue;
  const bk = bkSafe(`supabase-lessons-${row.id}.json`, JSON.stringify(row, null, 2));
  const { error: ue } = await db.from('lessons').update({ content_blocks: nv }).eq('id', row.id); if (ue) throw ue;
  const { data: r2 } = await db.from('lessons').select('content_blocks').eq('id', row.id).single();
  logE(`supabase lessons ${row.id} (${row.slug}) content_blocks`, counts, same(r2.content_blocks, nv), bk);
}
const enc = s => JSON.stringify(s), encA = s => JSON.stringify(s).replace(/[\u0080-￿]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
for (const f of spec.files || []) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); const counts = {}; const want = apply(JSON.parse(t), counts);
  console.log('LOCAL', f, JSON.stringify(counts));
  if (!Object.keys(counts).length) continue;
  if (Object.values(counts).some(c => c > 1)) { console.log('  multiple hits — NOT written'); continue; }
  const fmt = detectFmt(t); let nt;
  if (fmt) nt = emit(want, fmt);
  else { // raw: locate the object by its first match field, edit fields inside its {...}
    nt = t;
    for (const [i, e] of spec.edits.entries()) { if (!counts[i]) continue;
      const [mk, mv] = Object.entries(e.match).find(([, x]) => typeof x !== 'object') || []; let at = -1, E;
      const objAt = q => { const a0 = nt.lastIndexOf('{', q); let b0 = a0, d0 = 0, s0 = false;
        for (; b0 < nt.length; b0++) { const c = nt[b0]; if (s0) { if (c === '\\') b0++; else if (c === '"') s0 = false; continue; } if (c === '"') s0 = true; else if (c === '{' || c === '[') d0++; else if (c === '}' || c === ']') { d0--; if (d0 === 0) { b0++; break; } } }
        try { return hit(JSON.parse(nt.slice(a0, b0)), e.match); } catch { return false; } };
      for (const en of [enc, encA]) { for (const pat of [`"${mk}": ${en(mv)}`, `"${mk}":${en(mv)}`]) { let k = nt.indexOf(pat); while (k >= 0 && !objAt(k)) k = nt.indexOf(pat, k + 1); if (k >= 0) { at = k; E = en; break; } } if (at >= 0) break; }
      if (at < 0) { nt = null; break; }
      const a = nt.lastIndexOf('{', at); let b = a, dep = 0, inS = false;
      for (; b < nt.length; b++) { const ch = nt[b]; if (inS) { if (ch === '\\') b++; else if (ch === '"') inS = false; continue; }
        if (ch === '"') inS = true; else if (ch === '{' || ch === '[') dep++; else if (ch === '}' || ch === ']') { dep--; if (dep === 0) { b++; break; } } }
      if (e.remove) { let s0 = a, e0 = b; const after = nt.slice(e0).match(/^\s*,/); if (after) e0 += after[0].length; else { const before = nt.slice(0, s0).match(/,\s*$/); if (before) s0 -= before[0].length; } nt = nt.slice(0, s0) + nt.slice(e0); continue; }
      let seg = nt.slice(a, b);
      for (const [k, v] of Object.entries(e.set)) { // replace the key at depth 1 of this object only
        let d = 0, q = false, done = false;
        for (let i = 0; i < seg.length && !done; i++) { const ch = seg[i]; if (q) { if (ch === '\\') i++; else if (ch === '"') q = false; continue; }
          if (ch === '{' || ch === '[') d++; else if (ch === '}' || ch === ']') d--;
          else if (ch === '"') { if (d === 1 && seg.startsWith(`"${k}"`, i)) { let m = seg.slice(i).match(new RegExp(`^"${k}"\\s*:\\s*("(?:[^"\\\\]|\\\\.)*"|true|false|null|-?[0-9.]+)`));
              if (!m) { const h = seg.slice(i).match(new RegExp(`^"${k}"\\s*:\\s*`)); if (h && '[{'.includes(seg[i + h[0].length])) { let j = i + h[0].length, dd = 0, qq = false;
                for (; j < seg.length; j++) { const c2 = seg[j]; if (qq) { if (c2 === '\\') j++; else if (c2 === '"') qq = false; continue; } if (c2 === '"') qq = true; else if (c2 === '[' || c2 === '{') dd++; else if (c2 === ']' || c2 === '}') { dd--; if (dd === 0) { j++; break; } } }
                m = [seg.slice(i, j), seg.slice(i + h[0].length, j)]; } }
              if (m) { seg = seg.slice(0, i) + m[0].slice(0, m[0].length - m[1].length) + E(v) + seg.slice(i + m[0].length); done = true; continue; } } q = true; } } }
      nt = nt.slice(0, a) + seg + nt.slice(b);
    }
    let got = null; try { got = JSON.parse(nt); } catch {}
    if (!got || !same(got, want)) { console.log('  raw edit mismatch — NOT written'); continue; }
  }
  if (!COMMIT) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt);
  const back = fs.readFileSync(new URL(f, ROOT), 'utf8'); let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
  logE(`local ${f}`, counts, ok, bk);
}
