"""For each figure in HTR_Book_v42.md lines [a,b), report whether the bare number appears in any saved source
(book-audit/deep/sources/*.txt + extra dirs). Prints only UNMATCHED figures with context.
Usage: python3 match.py a b [extra_source_dir ...]"""
import re, sys, os, glob
a, b = int(sys.argv[1]), int(sys.argv[2])
dirs = ['book-audit/deep/sources'] + sys.argv[3:]
corpus = []
for d in dirs:
    for f in glob.glob(os.path.join(d, '**', '*'), recursive=True):
        if os.path.isfile(f) and f.endswith(('.txt', '.csv', '.json', '.html', '.md')):
            try: corpus.append(open(f, encoding='utf-8', errors='ignore').read())
            except Exception: pass
C = re.sub(r'[\s ]+', ' ', ' '.join(corpus))
t = open('HTR_Book_v42.md', encoding='utf-8').read().split('\n')
FIG = re.compile(r'(\\?\$\s?)(\d[\d,]*(?:\.\d+)?)|(\d[\d,]*(?:\.\d+)?)\s?(%|percent)|\b(\d{1,3}(?:,\d{3})+)\b|\b(\d+(?:\.\d+)?)\s?(million|billion|trillion)\b')
def present(num, kind):
    n = num.replace(',', '')
    vs = {num, n}
    if '.' not in n and len(n) > 3: vs.add(f'{int(n):,}')
    if n.endswith('.0'): vs.add(n[:-2])
    for v in vs:
        e = re.escape(v)
        if kind == 'pct' and re.search(r'(?<![\d.])' + e + r'\s?(%|percent|per cent)', C): return True
        if kind == 'usd' and re.search(r'\$\s?' + e + r'(?![\d])', C): return True
        if kind == 'mag' and re.search(r'(?<![\d.])' + e + r'\s?(m|mm|mn|million|b|bn|billion|t|trillion|k)\b', C, re.I): return True
        if kind == 'mag' and re.search(r'\$\s?' + e + r'(?![\d])', C): return True
        if kind == 'count' and re.search(r'(?<![\d.,])' + e + r'(?![\d])', C): return True
    return False
for i in range(a - 1, min(b, len(t))):
    l = re.sub(r'\s{2,}', '  ', t[i])
    if l.startswith(('>', '[')): continue
    miss = []
    for m in FIG.finditer(l):
        if m.group(2): num, kind = m.group(2), ('mag' if re.match(r'\s?(million|billion|trillion|M\b|B\b|K\b)', l[m.end():m.end()+9]) else 'usd')
        elif m.group(3): num, kind = m.group(3), 'pct'
        elif m.group(5): num, kind = m.group(5), 'count'
        else: num, kind = m.group(6), 'mag'
        if num.replace(',', '').replace('.', '').isdigit() and not present(num, kind):
            s = max(0, m.start() - 90); miss.append(l[s:m.end() + 70])
    for c in miss: print(f'L{i+1}: …{c}…')
