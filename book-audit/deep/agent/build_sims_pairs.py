"""Build sims_pairs.json. Each pair's `old` is taken verbatim from the file
(by line range or literal) and verified to occur exactly once."""
import json, os, sys

ROOT = '/Users/baba/Vermont-Health-Platform/'
OUT = ROOT + 'book-audit/deep/agent/sims_pairs.json'


def lines(f, a, b):
    with open(ROOT + f) as fh:
        L = fh.read().split('\n')
    return '\n'.join(L[a - 1:b])


def src(f):
    with open(ROOT + f) as fh:
        return fh.read()


pairs = []


def add(f, old, new):
    n = src(f).count(old)
    if n != 1:
        sys.exit(f'NOT UNIQUE ({n}): {f}: {old[:80]!r}')
    pairs.append({'file': f, 'old': old, 'new': new})


exec(open(ROOT + 'book-audit/deep/agent/pairs_oregon.py').read())
if os.path.exists(ROOT + 'book-audit/deep/agent/pairs_calaim.py'):
    exec(open(ROOT + 'book-audit/deep/agent/pairs_calaim.py').read())

# Pairs in the same file must not overlap each other.
for i, p in enumerate(pairs):
    for q in pairs[i + 1:]:
        if p['file'] == q['file'] and (p['old'] in q['old'] or q['old'] in p['old']):
            sys.exit('OVERLAP: ' + p['old'][:60])

json.dump(pairs, open(OUT, 'w'), indent=1, ensure_ascii=False)
print(len(pairs), 'pairs written')
