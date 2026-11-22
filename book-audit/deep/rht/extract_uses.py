"""Re-extract, from CMS's RHTP Obligated Funds Report (data as of Jul 31, 2026), each state's put-to-work dollars by
CMS's standard use-of-funds CATEGORY and by state INITIATIVE, with a reconciliation check against each state's
"Total Funds Put to Work". Writes frontend/lib/data/rht-review/uses.json.

Source: book-audit/deep/sources/rht_vt/cms_obligated_2026-10-14.txt
  (https://www.medicaid.gov/resources-for-states/rural-health/rhtp-resources/RHTP-Obligated-Funds-20261014.pdf)
Run from repo root:  python3 book-audit/deep/rht/extract_uses.py
"""
import json, re

SRC = 'book-audit/deep/sources/rht_vt/cms_obligated_2026-10-14.txt'
OUT = 'frontend/lib/data/rht-review/uses.json'

# CMS's category labels as printed, mapped to one canonical name each.
CATS = {
    'program administration expense': 'Program administration',
    'program administrative expense': 'Program administration',
    'appropriate care availability': 'Appropriate care availability',
    'fostering collaboration': 'Fostering collaboration',
    'it advances': 'IT advances',
    'workforce': 'Workforce',
    'training and technical assistance': 'Training & technical assistance',
    'capital expenditures and infrastructure': 'Capital & infrastructure',
    'prevention and chronic disease': 'Prevention & chronic disease',
    'prevention of chronic disease': 'Prevention & chronic disease',
    'innovative care': 'Innovative care',
    'behavioral health': 'Behavioral health',
    'consumer tech solutions': 'Consumer tech solutions',
    'provider payments': 'Provider payments',
}
AMT = re.compile(r'^(.*?)\s*\(\$([\d,]+(?:\.\d+)?)\)\s*$')
money = lambda s: float(s.replace(',', ''))

text = open(SRC, encoding='utf-8').read()
lines = [l.rstrip() for l in text.split('\n')]

# split into state blocks on "<State> Total Budget Period 1 Award:"
starts = [i for i, l in enumerate(lines) if 'Total Budget Period 1 Award:' in l]
out = {}
for k, st in enumerate(starts):
    end = starts[k + 1] if k + 1 < len(starts) else len(lines)
    name = lines[st].split(' Total Budget Period 1 Award:')[0].strip()
    block = lines[st:end]
    ptw = None
    for l in block[:4]:
        m = re.search(r'Total Funds Put to Work: \$([\d,]+(?:\.\d+)?)', l)
        if m: ptw = money(m.group(1))
    cats, inits, unknown, typos = {}, [], [], []
    prev = ''
    # bullet sums following each amount line (to repair CMS's malformed amounts)
    body = block[1:]
    def bullets_after(idx):
        tot = 0.0
        for l2 in body[idx + 1:]:
            t = l2.strip()
            mb = re.match(r'^[▪•]\s*\$([\d,]+(?:\.\d+)?)', t)
            if mb:
                tot += money(mb.group(1)); continue
            if AMT.match(t) or re.match(r'(?i)^(initiative\s+\d+|program operations)', t):
                break
        return round(tot, 2)
    for idx, l in enumerate(body):
        s = l.strip()
        if not s or s.startswith('▪') or s.startswith('•') or s.isupper() or s.startswith('State-reported') or 'Total Funds Put to Work' in s:
            prev = '' if (not s or s.startswith('▪') or s.startswith('•')) else prev
            continue
        m = AMT.match(s)
        if not m:
            prev = s  # possible first half of a wrapped label
            continue
        label, raw = m.group(1).strip(), m.group(2)
        amt = money(raw)
        if not re.match(r'^\d{1,3}(,\d{3})*(\.\d+)?$', raw):
            fixed = bullets_after(idx)
            typos.append({'label': label, 'printed': raw, 'usedBulletSum': fixed})
            amt = fixed
        full = (prev + ' ' + label).strip() if prev else label
        prev = ''
        key = None
        for cand in (label, full):
            c = cand.lower().strip()
            if c in CATS:
                key = CATS[c]
                break
            if c.startswith(('program administration expense', 'program administrative expense')):
                key = 'Program administration'
                break
        if key:
            cats[key] = round(cats.get(key, 0) + amt, 2)
        elif re.match(r'(?i)^(initiative\s+\d+|program operations)', full) or re.match(r'(?i)^(initiative\s+\d+|program operations)', label):
            inits.append({'name': full if full.lower().startswith(('initiative', 'program')) else label, 'amount': amt})
        else:
            unknown.append({'label': full, 'amount': amt})
    total = round(sum(cats.values()), 2)
    out[name] = {
        'putToWork': ptw, 'categories': cats, 'categoryTotal': total,
        'reconciles': ptw is not None and abs(total - ptw) < 1.0,
        'initiatives': inits, 'unmatched': unknown, 'cmsTypos': typos,
        'coverage': round(total / ptw, 4) if ptw else None,
    }

json.dump({'source': SRC, 'asOf': '2026-07-31', 'states': out}, open(OUT, 'w'), indent=1)
bad = {n: (v['categoryTotal'], v['putToWork'], v['unmatched'][:3]) for n, v in out.items() if not v['reconciles']}
print(len(out), 'states;', len(out) - len(bad), 'reconcile')
for n, b in bad.items():
    print(' X', n, b)
