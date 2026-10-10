# Phase 8b — exact-literal fixes to local Python lesson sources (whose implicit string concatenation defeats the
# apply.mjs mirror). spec: {"file": "frontend/content/x.py", "claim":..., "verdict":..., "src":..., "pairs": [[old, new], ...]}
# Each old must occur exactly once (or its new already present -> skipped). File must still compile.
# Backup (never overwrite) to sanity-backups/phase8b-2026-10-09/, ledger line to docs/audits/phase8b_sources_2026-10.jsonl.
# Usage: python3 scripts/_phase8b_pyfix.py <spec.json> [--commit]
import json, os, sys, py_compile
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
BK = os.path.join(ROOT, 'sanity-backups', 'phase8b-2026-10-09')
LOG = os.path.join(ROOT, 'docs', 'audits', 'phase8b_sources_2026-10.jsonl')
spec = json.load(open(sys.argv[1])); commit = '--commit' in sys.argv
path = os.path.join(ROOT, spec['file']); t = open(path, encoding='utf-8').read(); nt = t; done = []
for old, new in spec['pairs']:
    k = nt.count(old)
    if k == 1: nt = nt.replace(old, new); done.append(old); print('  ok', old[:70])
    elif k == 0 and new and new in nt: print('  already', old[:70])
    else: print('  COUNT', k, old[:70]); sys.exit(1)
if nt == t or not commit: print('changed' if nt != t else 'no change', '(dry run)' if not commit else ''); sys.exit(0)
os.makedirs(BK, exist_ok=True)
base = os.path.join(BK, 'local-' + spec['file'].replace('/', '__')); b = base; n = 1
while os.path.exists(b): b = f'{base}.{n}'; n += 1
open(b, 'x', encoding='utf-8').write(t)
open(path, 'w', encoding='utf-8').write(nt)
back = open(path, encoding='utf-8').read(); py_compile.compile(path, doraise=True)
ok = back == nt and all(o not in back or o in n_ for o, n_ in spec['pairs'] if o in done)
with open(LOG, 'a') as f:
    f.write(json.dumps({'doc': 'local ' + spec['file'], 'block_key': 'python source', 'claim': spec['claim'], 'verdict': spec['verdict'],
        'action': f'{len(done)} exact literal replacement(s): ' + ' | '.join(json.dumps(o[:120]) for o in done), 'sources': spec['src'],
        'status': 'FIXED' if ok else 'LEFT', 'note': f'Backup {os.path.relpath(b, ROOT)}; re-read, compiles, {"verified" if ok else "VERIFY FAILED"}.'}) + '\n')
print('written, verify', ok)
