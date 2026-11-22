"""Michigan MDHHS "Subrecipients of Michigan's Rural Health Transformation Program (RHTP)" — award notices as of Oct 1, 2026.
Source: https://www.michigan.gov/mdhhs/assistance-programs/medicaid/rural-health-transformation-program/rhtp-subrecipients
(archived: book-audit/deep/sources/rht_recipients/mi_subs.html)
Five tables (Subrecipient Organization | Award Amount* | Fund), one per initiative in page order; amounts contingent on CMS review.
The page prints no total, so each table's row count is checked against the HTML itself."""
import html as _h
import json, re

s = open('book-audit/deep/sources/rht_recipients/mi_subs.html', encoding='utf-8').read()
INITS = ['Interoperability in Action', 'Transforming Rural Health Through Partnerships', 'Workforce for Wellness',
         'Care Closer to Home', 'Tribal Government']
txt = lambda c: re.sub(r'\s+', ' ', _h.unescape(re.sub(r'<[^>]+>', '', c))).strip()
plain = txt(re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', '', s))
tables = re.findall(r'(?is)<table.*?</table>', s)
assert len(tables) == 5
rows = []
for init, t in zip(INITS, tables):
    n0 = len(rows)
    for tr in re.findall(r'(?is)<tr.*?</tr>', t):
        c = [txt(x) for x in re.findall(r'(?is)<t[hd][^>]*>(.*?)</t[hd]>', tr)]
        if len(c) != 3 or not c[1].startswith('$'):
            continue
        rows.append({'program': init, 'n': len(rows) + 1, 'recipient': c[0], 'county': 'Not stated',
                     'amount': float(c[1].replace('$', '').replace(',', '')), 'purpose': c[2]})
    print(init, len(rows) - n0, 'rows, header+data rows in html:', len(re.findall(r'(?is)<tr', t)))
tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows; sum', f'{tot:,.2f}')
json.dump({'state': 'Michigan', 'slug': 'michigan', 'asOf': '2026-10-01',
           'source': {'label': 'Michigan Department of Health and Human Services, "Subrecipients of Michigan\'s Rural Health Transformation Program (RHTP)" (award notices as of Oct 1, 2026)',
                      'url': 'https://www.michigan.gov/mdhhs/assistance-programs/medicaid/rural-health-transformation-program/rhtp-subrecipients'},
           'announcedTotal': None, 'areaLabel': None, 'rows': rows,
           'note': 'Award notices as of October 1, 2026, grouped by Michigan\'s RHTP initiative; the "Fund" each award draws on is shown in the purpose column. MDHHS states each amount is contingent on CMS review and may be adjusted, and the page prints no total. A few organizations appear more than once, and two spellings of one Upper Peninsula organization appear as listed.'},
          open('frontend/lib/data/rht-review/recipients/michigan.json', 'w'), indent=1)
