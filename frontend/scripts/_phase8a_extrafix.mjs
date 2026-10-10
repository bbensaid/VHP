// Phase 8a part 3 — apply the pairs/mirrorPairs of the --only doc(s) from _phase8a_ops2.mjs to extra source files that
// _phase8a_apply2.mjs does not scan (e.g. frontend/scripts/generate_course5.py). Tries the plain text and the
// Python-escaped (\') variant of each pair. For .py files the result must still pass python3 ast.parse, else nothing is
// written. Backup (no overwrite), re-read, one ledger line per file. Usage:
//   node scripts/_phase8a_extrafix.mjs --only=<docId>[,..] [--commit] <repo-relative file>...
import fs from 'fs';
import { execFileSync } from 'child_process';
import { bkSafe, append, ROOT, COMMIT } from './_phase8a_lib.mjs';
import { OPS } from './_phase8a_ops2.mjs';
const only = process.argv.find(a => a.startsWith('--only='))?.slice(7).split(',') || [];
const files = process.argv.slice(2).filter(a => !a.startsWith('--'));
const esc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const base = OPS.filter(o => only.includes(o.id)).flatMap(o => [...(o.pairs || []), ...(o.mirrorPairs || [])]).filter(([o, n]) => o && n != null);
for (const f of files) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); let nt = t; const hits = [];
  for (const [o, n] of base) for (const [a, b] of [[o, n], [esc(o), esc(n)]]) {
    if (b.includes(a) && nt.includes(b)) continue; const k = nt.split(a).length - 1;
    if (k) { hits.push(`${k}x ${a.slice(0, 70)}`); nt = nt.split(a).join(b); }
  }
  let ok = true;
  if (f.endsWith('.py') && nt !== t) { const tmp = new URL('../.phase8a_extrafix_tmp.py', import.meta.url); fs.writeFileSync(tmp, nt);
    try { execFileSync('python3', ['-c', 'import ast,sys;ast.parse(open(sys.argv[1]).read())', tmp.pathname]); } catch { ok = false; } fs.unlinkSync(tmp); }
  console.log('EXTRA', f, hits.length, 'pair(s)', ok ? '' : 'PY SYNTAX WOULD BREAK - not written'); hits.forEach(h => console.log('   ', h));
  if (!COMMIT || nt === t || !ok) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt); const back = fs.readFileSync(new URL(f, ROOT), 'utf8') === nt;
  append({ part: '8a', doc: `local ${f}`, block_key: 'mirror', claim: `generator-source copies of the ${only.join(',')} corrections`, verdict: 'FABRICATED', action: `replaced ${hits.length} pair(s): ${hits.join(' ; ').slice(0, 800)}`, sources: 'see the Sanity lines for ' + only.join(','), status: back ? 'FIXED' : 'LEFT', note: `backup ${bk}; ${back ? 're-read and verified' : 'VERIFY FAILED'}${f.endsWith('.py') ? '; python ast.parse OK' : ''}` });
}
