"""Grep Sanity export: python3 sgrep.py export.json 'regex' [more regex...]
Prints doc _id, _type, title and the matching sentence for every hit."""
import json, re, sys

docs = json.load(open(sys.argv[1]))
pats = [re.compile(p, re.I) for p in sys.argv[2:]]


def strings(o):
    if isinstance(o, str):
        yield o
    elif isinstance(o, dict):
        for k, v in o.items():
            if k in ("_key", "_ref", "_type", "style", "markDefs", "marks"):
                continue
            yield from strings(v)
    elif isinstance(o, list):
        for v in o:
            yield from strings(v)


for d in docs:
    title = d.get("title") or d.get("name") or ""
    seen = set()
    for s in strings(d):
        for p in pats:
            for m in p.finditer(s):
                a = max(0, s.rfind(". ", 0, m.start()) + 2)
                b = s.find(". ", m.end())
                b = len(s) if b < 0 else b + 1
                snip = s[a:b].strip()[:300]
                if snip in seen:
                    continue
                seen.add(snip)
                print(f"{d['_id']} [{d['_type']}] {title[:50]!r}: {snip}")
