// Phase 8b part 2 — structural edit of a quiz question inside local course JSON (matched by question "id", e.g. "q-rcm-coding-002-2"),
// for quiz rewrites whose short option strings ("Less than 1%") recur elsewhere and cannot be string-replaced safely.
// spec: { qid, expectText, set:{ text?, explanation?, options?:[{id,text}], correctId? }, files:[...], claim, verdict, src, note }
// Every match must have text === expectText; each file must contain exactly one match. Backup (no overwrite), re-read, ledger line.
// Usage: node scripts/_phase8b_localquiz.mjs <spec.json> [--commit]
import fs from 'fs';
import { COMMIT, ROOT, bkSafe, append, detectFmt, emit } from './_phase8b_lib.mjs';
const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
for (const f of spec.files) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); const fmt = detectFmt(t);
  const d = JSON.parse(t); let hits = 0, bad = 0;
  const visit = o => {
    if (Array.isArray(o)) return o.forEach(visit);
    if (o && typeof o === 'object') {
      if (o.id === spec.qid && Array.isArray(o.options)) {
        if (o.text !== spec.expectText) { bad++; return; }
        hits++; Object.assign(o, structuredClone(spec.set));
      }
      Object.values(o).forEach(visit);
    }
  };
  visit(d);
  console.log('LOCAL', f, 'hits', hits, 'expect-mismatch', bad);
  if (hits !== 1 || bad) continue;
  let nt;
  if (fmt) nt = emit(d, fmt);
  else { // non-reproducible serializer: rewrite only the question object's raw text span, then prove it equals the structural edit
    const encs = [s => JSON.stringify(s).slice(1, -1), s => JSON.stringify(s).slice(1, -1).replace(/[\u0080-￿]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))];
    const enc = encs.find(e => t.split('"' + e(spec.expectText) + '"').length === 2);
    if (!enc) { console.log('  raw: question text not uniquely found — NOT written'); continue; }
    const qi = t.indexOf('"' + enc(spec.expectText) + '"'); const a = t.lastIndexOf('{', t.lastIndexOf('"id"', qi));
    let depth = 0, b = a, inStr = false;
    for (; b < t.length; b++) { const c = t[b]; if (inStr) { if (c === '\\') b++; else if (c === '"') inStr = false; continue; } if (c === '"') inStr = true; else if (c === '{') depth++; else if (c === '}') { depth--; if (!depth) { b++; break; } } }
    const obj = JSON.parse(t.slice(a, b)); if (obj.id !== spec.qid) { console.log('  raw: span is not the question object — NOT written'); continue; }
    Object.assign(obj, structuredClone(spec.set));
    const ind = (t.slice(0, a).match(/\n([ \t]*)[^\n]*$/) || ['', ''])[1];
    const inner = JSON.stringify(obj, null, 2).split('\n').map((l, i) => i ? ind + l : l).join('\n');
    nt = t.slice(0, a) + (enc === encs[1] ? inner.replace(/[\u0080-￿]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')) : inner) + t.slice(b);
    let got; try { got = JSON.parse(nt); } catch { got = null; }
    if (!got || JSON.stringify(got) !== JSON.stringify(d)) { console.log('  raw edit does not equal structural edit — NOT written'); continue; }
    console.log('  raw span edit verified equal to structural edit');
  }
  if (!COMMIT) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt);
  const back = fs.readFileSync(new URL(f, ROOT), 'utf8'); let ok = back === nt; try { JSON.parse(back); } catch { ok = false; }
  append({ doc: `local ${f}`, block_key: `quiz ${spec.qid}`, claim: spec.claim, verdict: spec.verdict || 'UNVERIFIABLE', action: `set ${JSON.stringify(spec.set).slice(0, 600)}`, sources: spec.src, status: ok ? 'FIXED' : 'LEFT', note: `${spec.note || ''} Backup ${bk}; ${ok ? 're-read and verified' : 'VERIFY FAILED'}.` });
}
