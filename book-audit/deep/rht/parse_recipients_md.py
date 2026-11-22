"""Maryland RHTP Pillar 2 award offers, Budget Period 1 (two PDFs linked from
https://health.maryland.gov/pophealth/Pages/Rural-Health-Transformation-Program.aspx):
  - "Expand Primary Care Access" (issuing partner: Maryland Health Care Commission), 8 practices
  - "Transformation Funds" (issuing partners: MDH and HSCRC), 33 lead organizations
Archived in book-audit/deep/sources/rht_recipients/md_p2_*.pdf. Rows are award OFFERS; the PDFs print no totals.
Layout: name line, "$amount" (sometimes inline), summary lines, then the counties/region served; page numbers interleave."""
import json, re, sys
import pypdf

COUNTIES = {"Allegany", "Anne Arundel", "Baltimore", "Calvert", "Caroline", "Carroll", "Cecil", "Charles", "Dorchester", "Frederick",
            "Garrett", "Harford", "Howard", "Kent", "Montgomery", "Prince George's", "Queen Anne's", "St. Mary's", "Somerset",
            "Talbot", "Washington", "Wicomico", "Worcester", "18 rural"}
REGIONS = {"Western", "Eastern Shore", "Northern", "Southern", "Northern and Southern"}
MONEY = re.compile(r'\$([\d,]+)')


def lines_of(pdf):
    t = '\n'.join(p.extract_text() for p in pypdf.PdfReader(pdf).pages)
    return [re.sub(r'\s+', ' ', l).strip() for l in t.split('\n') if l.strip()]


def is_area(l):
    parts = [p.strip() for p in l.rstrip(',').split(',') if p.strip()]
    return parts and all(p in COUNTIES or p in REGIONS for p in parts)


def parse(pdf, program, area_words_inline=False):
    L = lines_of(pdf)
    start = next(i for i, l in enumerate(L) if l.startswith('Region Served') or l.startswith('Lead Organization')) + 1
    L = L[start:]
    idx = [i for i, l in enumerate(L) if MONEY.search(l)]
    rows = []
    for k, i in enumerate(idx):
        before, amt, after = L[i].partition(MONEY.search(L[i]).group(0))
        name = before.strip() or L[i - 1]
        stop = (idx[k + 1] - (0 if MONEY.match(L[idx[k + 1]]) is None else 1)) if k + 1 < len(idx) else len(L)
        body = ([after.strip()] if after.strip() else []) + L[i + 1:stop]
        desc, area = [], []
        for b in body:
            if re.fullmatch(r'\d{1,2}', b):
                continue  # page number
            if is_area(b):
                area.append(b.rstrip(','))
                continue
            # primary-care PDF prints the region at the end of the summary line
            m = re.search(r'\s(Western|Eastern Shore|Northern and Southern|Northern|Southern)$', b) if area_words_inline else None
            if m:
                area.append(m.group(1)); b = b[:m.start()]
            desc.append(b)
        rows.append({'program': program, 'recipient': name, 'county': ', '.join(area) or 'Not stated',
                     'amount': float(MONEY.search(L[i]).group(1).replace(',', '')), 'purpose': ' '.join(desc).strip()})
    print(pdf, len(rows), 'rows; $ lines', len(idx), 'sum', f"{sum(r['amount'] for r in rows):,.0f}")
    return rows


S = 'book-audit/deep/sources/rht_recipients/'
rows = parse(S + 'md_p2_primary.pdf', 'Pillar 2: Expand Primary Care Access', area_words_inline=True)
rows += parse(S + 'md_p2_transform.pdf', 'Pillar 2: Transformation Funds')
for n, r in enumerate(rows, 1):
    r['n'] = n
    if r['county'] == 'Not stated' or not r['purpose']:
        print('CHECK', r, file=sys.stderr)
for r in rows:
    print(f"{r['amount']:>12,.0f} {r['recipient'][:40]:40} | {r['county'][:40]:40} | {r['purpose'][:50]}")
json.dump({'state': 'Maryland', 'slug': 'maryland', 'asOf': '2026',
           'source': {'label': 'Maryland Department of Health, RHTP Pillar 2 award offers, Budget Period 1 (Expand Primary Care Access; Transformation Funds)',
                      'url': 'https://health.maryland.gov/pophealth/Pages/Rural-Health-Transformation-Program.aspx'},
           'announcedTotal': None, 'areaLabel': 'Counties or region served', 'rows': rows,
           'note': 'Two published lists of award offers under Pillar 2 for Budget Period 1: 8 practices to expand primary care access (region served) and 33 Transformation Fund lead organizations (rural counties served; "18 rural" means all 18 of the state\'s designated rural counties). These are offers, not executed agreements, and the lists print no totals. Maryland\'s other pillars are not itemized on the page.'},
          open('frontend/lib/data/rht-review/recipients/maryland.json', 'w'), indent=1)
