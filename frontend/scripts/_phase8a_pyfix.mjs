// Phase 8a part 3 — the .py lesson sources escape apostrophes (\'), so _phase8a_apply2's plain-literal pass misses
// pairs containing "'". This applies the escaped variant of every pair/mirrorPair for the --only doc(s) to the given
// .py files, plus optional raw [old,new] pairs from a JSON file (--raw=<file>). Backup (no overwrite), re-read, ledger line.
// Usage: node scripts/_phase8a_pyfix.mjs --only=<docId> [--raw=spec.json] [--commit] <file.py>...
import fs from 'fs';
import { bkSafe, append, ROOT, COMMIT } from './_phase8a_lib.mjs';
import { OPS } from './_phase8a_ops2.mjs';
const only = process.argv.find(a => a.startsWith('--only='))?.slice(7).split(',') || [];
const raw = process.argv.find(a => a.startsWith('--raw='))?.slice(6);
const files = process.argv.slice(2).filter(a => !a.startsWith('--'));
const esc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const pairs = OPS.filter(o => only.includes(o.id)).flatMap(o => [...(o.pairs || []), ...(o.mirrorPairs || [])]).filter(([o, n]) => o && n != null && o.includes("'")).map(([o, n]) => [esc(o), esc(n)]);
if (raw) pairs.push(...JSON.parse(fs.readFileSync(raw, 'utf8')));
for (const f of files) {
  const t = fs.readFileSync(new URL(f, ROOT), 'utf8'); let nt = t; const hits = [];
  for (const [o, n] of pairs) { if (n.includes(o) && nt.includes(n)) continue; const k = nt.split(o).length - 1; if (k) { hits.push(`${k}x ${o.slice(0, 70)}`); nt = nt.split(o).join(n); } }
  console.log('PY', f, hits.length, 'pair(s)'); hits.forEach(h => console.log('   ', h));
  if (!COMMIT || nt === t) continue;
  const bk = bkSafe('local-' + f.replace(/\//g, '__'), t);
  fs.writeFileSync(new URL(f, ROOT), nt); const ok = fs.readFileSync(new URL(f, ROOT), 'utf8') === nt;
  append({ part: '8a', doc: `local ${f}`, block_key: 'mirror', claim: `escaped-apostrophe copies of the ${only.join(',')} corrections`, verdict: 'FABRICATED', action: `replaced ${hits.length} pair(s): ${hits.join(' ; ').slice(0, 800)}`, sources: 'see the Sanity lines for ' + only.join(','), status: ok ? 'FIXED' : 'LEFT', note: `backup ${bk}; ${ok ? 're-read and verified' : 'VERIFY FAILED'}` });
}
