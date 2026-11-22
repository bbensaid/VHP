"""Illinois: 'Active Awards' tables on the state's Grant Accountability and Transparency Act (GATA) CSFA program pages for each
Rural Health Transformation Program sub-program (CSFA 478-00-3950, -3951, -3979 ... -3987).
Pages: https://omb.illinois.gov/PUBLIC/GATA/CSFA/Program.aspx?csfa=<n>  (archived: book-audit/deep/sources/rht_recipients/il_csfa/<n>.html)
Table columns: Agency ID | Grantee Name | Comptroller Name | Start Date | End Date | Amount.
These are the awards recorded in the state's grants portal; the portal prints no total."""
import glob, html as _h, json, os, re

D = 'book-audit/deep/sources/rht_recipients/il_csfa/'
txt = lambda c: re.sub(r'\s+', ' ', _h.unescape(re.sub(r'<[^>]+>', '', c))).strip()
rows, seen = [], set()
for f in sorted(glob.glob(D + '*.html')):
    s = open(f, errors='ignore').read()
    L = [re.sub(r'\s+', ' ', l).strip() for l in _h.unescape(re.sub(r'<[^>]+>', '\n', re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', '', s))).split('\n') if l.strip()]
    title = next((l for l in L if l.startswith('Rural Health Transformation Program - ')), None)
    if not title:
        continue
    prog = title.replace('Rural Health Transformation Program - ', '')
    for t in re.findall(r'(?is)<table.*?</table>', s):
        trs = re.findall(r'(?is)<tr.*?</tr>', t)
        if not trs or 'Grantee Name' not in trs[0]:
            continue
        for tr in trs[1:]:
            c = [txt(x) for x in re.findall(r'(?is)<t[hd][^>]*>(.*?)</t[hd]>', tr)]
            if len(c) < 6 or not re.fullmatch(r'[\d,]+(?:\.\d\d)?', c[5]):
                continue
            key = (os.path.basename(f), c[0])
            if key in seen:
                continue
            seen.add(key)
            rows.append({'program': prog, 'n': len(rows) + 1, 'recipient': c[1], 'county': 'Not stated',
                         'amount': float(c[5].replace(',', '')), 'purpose': f'Agreement {c[0]}, {c[3]} to {c[4]}'})
print(len(rows), 'rows; sum', f"{sum(r['amount'] for r in rows):,.0f}")
from collections import Counter
print(Counter(r['program'] for r in rows))
json.dump({'state': 'Illinois', 'slug': 'illinois', 'asOf': '2026-11',
           'source': {'label': 'Illinois Governor\'s Office of Management and Budget, Grant Accountability and Transparency Act (CSFA) listings: Rural Health Transformation Program sub-programs, "Active Awards"',
                      'url': 'https://omb.illinois.gov/PUBLIC/GATA/CSFA/Program.aspx?csfa=3979'},
           'announcedTotal': None, 'areaLabel': None, 'rows': rows,
           'note': 'These are the awards recorded in the state\'s grants-transparency portal for each RHTP sub-program (agreement IDs and project dates shown in the purpose column); the portal prints no total. Illinois\' first-year federal award is $193,418,216 per CMS; the listed agreements add up to the amount shown above, but the portal does not say whether every sub-program agreement has been entered yet.'},
          open('frontend/lib/data/rht-review/recipients/illinois.json', 'w'), indent=1)
