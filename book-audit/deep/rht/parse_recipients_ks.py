"""Kansas: Sen. Jerry Moran release, "Sen. Moran Applauds Nearly $80 Million in Federal Investments for 39 Kansas Hospitals & Providers" (May 29, 2026),
https://www.moran.senate.gov/public/index.cfm/2026/5/sen-moran-applauds-nearly-80-million-in-federal-investments-for-39-kansas-hospitals-providers
(archived: book-audit/deep/sources/rht_recipients/ks_moran_2026-05-29.html). It itemizes KDHE's first-round awards in two programs:
REH Conversion / Transformative Capital Investment (17) and Regional Partnerships Grant Program (22). kdhe.ks.gov itself returns 403 to automated requests."""
import html as _h
import json, re

s = open('book-audit/deep/sources/rht_recipients/ks_moran_2026-05-29.html', encoding='utf-8', errors='ignore').read()
t = _h.unescape(re.sub(r'<[^>]+>', '\n', re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', '', s)))
assert '39 Kansas hospitals and health care providers will receive $79.1 million' in re.sub(r'\s+', ' ', t)
body = t[t.find('Rural Emergency Hospital Conversion'):t.find('# # #')]
prog, rows, cur = None, [], []
for line in [l.strip() for l in body.split('\n') if l.strip()]:
    if line.startswith('Rural Emergency Hospital Conversion'):
        prog, cur = 'REH Conversion / Transformative Capital Investment Grant Program (May 2026)', []; continue
    if line.startswith('Regional Partnerships Grant Program'):
        prog, cur = 'Regional Partnerships Grant Program (May 2026)', []; continue
    m = re.search(r'\$([\d,]+(?:\.\d+)?)', line)
    if m:
        name = ' '.join(x.strip('– ').strip() for x in cur + [line[:m.start()]] if x.strip('– ').strip())
        rows.append({'program': prog, 'n': len(rows) + 1, 'recipient': name, 'county': 'Not stated',
                     'amount': float(m.group(1).replace(',', '')), 'purpose': 'Not stated in the release'})
        cur = []
    else:
        cur.append(line)
assert len(rows) == 39, len(rows)
assert sum(1 for r in rows if r['program'].startswith('REH')) == 17
total = sum(r['amount'] for r in rows)
print(len(rows), 'rows; sum', f'{total:,.2f}')
json.dump({'state': 'Kansas', 'slug': 'kansas', 'asOf': '2026-05-29',
           'source': {'label': 'U.S. Sen. Jerry Moran, "Sen. Moran Applauds Nearly $80 Million in Federal Investments for 39 Kansas Hospitals & Providers" (May 29, 2026), itemizing KDHE\'s first-round awards',
                      'url': 'https://www.moran.senate.gov/public/index.cfm/2026/5/sen-moran-applauds-nearly-80-million-in-federal-investments-for-39-kansas-hospitals-providers'},
           'announcedTotal': 79.1e6, 'areaLabel': None, 'rows': rows,
           'note': (f'The 39 first-round awards KDHE made on May 29, 2026, as itemized in Senator Moran\'s release (17 REH conversion / capital grants, 22 regional partnership grants). '
                    f'The itemized amounts sum to ${total/1e6:.2f} million against the release\'s "$79.1 million"; the difference is stated, not reconciled. '
                    'Greeley County Health Services and InterHab each hold two awards, so the 39 awards go to 37 organizations. '
                    'Later Kansas rounds (Community Health Worker and Food is Medicine, Aug 2026; Emerging Technology, 14 providers and $16 million, and Interfacility Transport, Sept 2026) '
                    'are announced on kdhe.ks.gov, which refuses automated requests, so they are not itemized here.')},
          open('frontend/lib/data/rht-review/recipients/kansas.json', 'w'), indent=1)
