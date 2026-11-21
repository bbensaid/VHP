"""Build new golden Q/A pairs whose ground truth is VERBATIM book text (HTR_Book_v42.md).
Each entry: question (written here), pillar, and 1-3 anchors; each anchor must match exactly one
sentence in the cleaned book text, and those sentences become the ground truth."""
import re, json, sys
t = open('HTR_Book_v42.md').read()
t = re.sub(r'\\([$\-*_\[\]\'"])', r'\1', t).replace('---', '—').replace('--', '–').replace('**', '').replace('*', '')
sents = []
for p in t.split('\n\n'):
    p = ' '.join(p.split())
    if len(p) < 100 or p.startswith(('|', '+', '#', '>')) or 'Figure ' in p[:12]: continue
    sents += [s for s in re.split(r'(?<=[.!?])\s+(?=[A-Z"“])', p) if 40 < len(s) < 600]
E = json.load(open(sys.argv[1]))
out, bad = [], []
for e in E:
    gt = []
    for a in e['anchors']:
        m = sorted({s for s in sents if a in s})
        if len(m) != 1: bad.append((a, len(m), [x[:120] for x in m[:3]])); break
        gt.append(m[0])
    else:
        out.append({'question': e['q'], 'ground_truth': ' '.join(gt), 'pillar': e['pillar']})
for b in bad: print('BAD', b)
json.dump(out, open(sys.argv[2], 'w'), indent=1, ensure_ascii=False)
print('built', len(out), 'of', len(E))
