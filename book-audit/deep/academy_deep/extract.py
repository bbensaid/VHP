import re, sys, json
src, course, out = sys.argv[1], sys.argv[2], sys.argv[3]
txt = open(src).read()
blocks = re.split(r'^######## ', txt, flags=re.M)[1:]
CLAIM = re.compile(r'\d|\$|%|\b(the first|the only|the largest|the most|the leading|the biggest|the oldest|landmark|pioneer(ed)?|studies? (found|show)|research (found|show)|evidence shows|percent|million|billion)\b', re.I)
QUIZ = re.compile(r'^(Question|Q\d|Correct|Incorrect|Explanation|A\)|B\)|C\)|D\))', re.I)
seen, rows = set(), []
for b in blocks:
    head, _, body = b.partition('\n')
    c, slug, title = [x.strip() for x in head.split(' | ', 2)]
    if c != course: continue
    for line in body.split('\n'):
        for s in re.split(r'(?<=[.!?])\s+(?=[A-Z"“(])', line):
            s = s.strip()
            if len(s) < 25 or not CLAIM.search(s) or QUIZ.match(s): continue
            if re.fullmatch(r'[\d\W]+', s): continue
            k = re.sub(r'\W+', ' ', s.lower()).strip()
            if k in seen: continue
            seen.add(k); rows.append((slug, s))
with open(out, 'w') as f:
    last = None
    for i, (slug, s) in enumerate(rows):
        if slug != last: f.write(f'\n## {slug}\n'); last = slug
        f.write(f'{i}\t{s}\n')
print(course, len(rows), 'claim sentences')
