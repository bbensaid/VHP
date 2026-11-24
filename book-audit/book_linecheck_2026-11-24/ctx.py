"""Print every figure in HTR_Book_v42.md lines [a,b) with context, merging overlapping windows.
Usage: python3 ctx.py <first_line> <last_line> [width]"""
import re, sys
a, b = int(sys.argv[1]), int(sys.argv[2]); W = int(sys.argv[3]) if len(sys.argv) > 3 else 130
t = open('HTR_Book_v42.md', encoding='utf-8').read().split('\n')
FIG = re.compile(r'\\?\$\s?\d|\d+(?:\.\d+)?\s?(?:%|percent)|\b\d{1,3}(?:,\d{3})+\b|\b\d+(?:\.\d+)?\s?(?:million|billion|trillion)\b|\b\d+(?:\.\d+)?[x×]\b|\b\d+(?:\.\d+)?-fold\b')
for i in range(a - 1, min(b, len(t))):
    l = re.sub(r'\s{2,}', '  ', t[i])
    if l.startswith(('>', '[')) or not FIG.search(l): continue
    spans = []
    for m in FIG.finditer(l):
        s, e = max(0, m.start() - W), min(len(l), m.end() + W)
        if spans and s <= spans[-1][1]: spans[-1][1] = e
        else: spans.append([s, e])
    print(f'L{i+1}: ' + ' […] '.join(l[s:e] for s, e in spans))
