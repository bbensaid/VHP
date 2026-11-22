"""West Virginia DoH "WV RHTP – Released Awards" (PDF, Nov 2026).
Source: https://health.wv.gov/sites/default/files/2026-11/RHTP%20Released%20Awards_1.pdf
(archived: book-audit/deep/sources/rht_recipients/wv_released_awards.pdf; layout text in wv_layout.txt)
Columns: Activity | Organization Name | Awarded Amount | Service Area | Summary, grouped under "Initiative: ..." headings.
A row = one '$' amount line; wrapped lines under it belong to it; a blank Activity carries the previous Activity forward.
The PDF prints 'Total Announced (67 awards): $108,261,312.68'; rows and sum are asserted against it."""
import json, re, sys
import pypdf

SRC = 'book-audit/deep/sources/rht_recipients/wv_released_awards.pdf'
pages = [p.extract_text(extraction_mode='layout') or '' for p in pypdf.PdfReader(SRC).pages]
lines = [l.rstrip() for t in pages for l in t.split('\n')]
hdr = next(l for l in lines if 'Organization Name' in l and 'Awarded Amount' in l)
c_org, c_amt, c_area, c_sum = hdr.index('Organization Name'), hdr.index('Awarded Amount'), hdr.index('Service Area'), hdr.index('Summary')
money = re.compile(r'\$[\d,]+(?:\.\d\d)?')

def cut(l):
    l = l.ljust(c_sum + 1)
    f = lambda a, b: re.sub(r'\s+', ' ', l[a:b]).strip()
    return f(0, c_org), f(c_org, c_amt), f(c_amt, c_area), f(c_area, c_sum), f(c_sum, None)

# 1) split into blocks: an "Initiative:" heading line starts a section; each '$' line starts a record
recs, init, cur, printed_n, printed_total = [], None, None, None, None
for l in lines:
    if not l.strip() or 'Released Awards' in l or ('Organization Name' in l and 'Awarded Amount' in l):
        continue
    tm = re.match(r'^Total Announced \((\d+) awards\):\s*(\$[\d,]+\.\d\d)', l.strip())
    if tm:
        printed_n, printed_total = int(tm.group(1)), float(tm.group(2).replace('$', '').replace(',', ''))
        break
    m = re.match(r'^Initiative:\s*(.+)$', l.strip())
    if m:
        init, cur = m.group(1).strip(), None
        continue
    act, org, amt, area, summ = cut(l)
    if money.fullmatch(amt):
        cur = {'init': init, 'act': [act] if act else [], 'org': [org] if org else [], 'amt': amt, 'area': [area] if area else [], 'sum': [summ] if summ else []}
        recs.append(cur)
    elif cur is not None:
        if act: cur['act'].append(act)
        if org: cur['org'].append(org)
        if area: cur['area'].append(area)
        if summ: cur['sum'].append(summ)
        if amt: print('STRAY AMOUNT TEXT', repr(amt), file=sys.stderr)
    else:
        print('UNATTACHED', repr(l[:100]), file=sys.stderr)

rows, last_act = [], {}
for r in recs:
    act = ' '.join(r['act'])
    # Activity can sit on the lines ABOVE the '$' row (vertically offset); a blank activity carries forward within the initiative
    if not act:
        act = last_act.get(r['init'], '')
    else:
        last_act[r['init']] = act
    rows.append({'program': r['init'], 'n': len(rows) + 1, 'recipient': ' '.join(r['org']), 'county': ' '.join(r['area']) or 'Not stated',
                 'amount': float(r['amt'].replace('$', '').replace(',', '')),
                 'purpose': (act + ': ' if act else '') + ' '.join(r['sum']), 'activity': act})
tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows; sum', f'{tot:,.2f}', '| printed:', printed_n, 'awards', f'{printed_total:,.2f}')
assert len(rows) == printed_n and abs(tot - printed_total) < 0.5, 'rows/sum != printed total'
from collections import Counter
print(Counter(r['program'] for r in rows))
for r in rows:
    print(f"{r['amount']:>12,.0f} {r['recipient'][:42]:42} | {r['activity'][:38]:38} | {r['county'][:30]}")
json.dump({'state': 'West Virginia', 'slug': 'west-virginia', 'asOf': '2026-11',
           'source': {'label': 'West Virginia Department of Health, "WV RHTP – Released Awards" (Nov 2026)',
                      'url': 'https://health.wv.gov/funding-opportunities'},
           'announcedTotal': round(printed_total), 'areaLabel': 'Service area', 'rows': rows,
           'note': 'The state\'s list of released awards, by initiative and activity; the document prints "Total Announced (67 awards): $108,261,312.68" (the rows here match that count and amount) and awards are added as they are released. The first-year federal award is $199,476,099 per CMS; this list covers only awards released so far.'},
          open('frontend/lib/data/rht-review/recipients/west-virginia.json', 'w'), indent=1)
