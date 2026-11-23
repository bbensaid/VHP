"""Wisconsin DHS Rural Health Transformation Program pages with "Organization | Amount" award tables:
  Coordinated Care (https://www.dhs.wisconsin.gov/node/154236), Technology (node/154076: Rural Technology Transformation funds; Rural Dental Efficiency and Access grants),
  Workforce (node/153621: Community Health Worker grants and training-provider grants), Implementation (node/154421: Budget Year 1 funds to implementation partners).
Saved (scripts removed) as wi_*.html in book-audit/deep/sources/rht_recipients/. Check: the Dental grants table = 37 organizations / $9,500,722 as the page states."""
import html as _h
import json, re

D = 'book-audit/deep/sources/rht_recipients/'
txt = lambda c: re.sub(r'\s+', ' ', _h.unescape(re.sub(r'<[^>]+>', '', c))).strip()
rows, by = [], {}
for f, page in [('wi_coordinated_care', 'Coordinated Care'), ('wi_technology', 'Technology'), ('wi_workforce', 'Workforce'), ('wi_implementation', 'Implementation')]:
    s = open(D + f + '.html', encoding='utf-8', errors='ignore').read()
    for m in re.finditer(r'(?is)<table.*?</table>', s):
        heads = re.findall(r'(?is)<h[2-4][^>]*>(.*?)</h[2-4]>', s[:m.start()])
        label = f"{page}: {txt(heads[-1])}" if heads else page
        for tr in re.findall(r'(?is)<tr.*?</tr>', m.group(0)):
            c = [txt(x) for x in re.findall(r'(?is)<t[hd][^>]*>(.*?)</t[hd]>', tr)]
            if len(c) != 2 or not re.fullmatch(r'\$[\d,]+(?:\.\d\d)?', c[1]):
                continue
            rows.append({'program': label, 'n': len(rows) + 1, 'recipient': c[0], 'county': 'Not stated',
                         'amount': float(c[1].replace('$', '').replace(',', '')), 'purpose': ''})
            by.setdefault(label, [0, 0.0]); by[label][0] += 1; by[label][1] += rows[-1]['amount']
for k, (n, v) in by.items():
    print(f'{k}: {n} rows, ${v:,.0f}')
dental = next(v for k, v in by.items() if 'Dental' in k)
assert dental[0] == 37 and round(dental[1]) == 9_500_722, dental
print(len(rows), 'rows; sum', f"{sum(r['amount'] for r in rows):,.0f}")
json.dump({'state': 'Wisconsin', 'slug': 'wisconsin', 'asOf': '2026-11',
           'source': {'label': 'Wisconsin Department of Health Services, Rural Health Transformation Program pages (Coordinated Care, Technology, Workforce, Implementation)',
                      'url': 'https://dhs.wisconsin.gov/rhtp/index.htm'},
           'announcedTotal': None, 'areaLabel': None, 'rows': rows,
           'note': 'Award tables published on the state\'s program pages by program area. The Dental Efficiency and Access table matches the page\'s own statement ($9,500,722 to 37 organizations). The Implementation table lists the Budget Year 1 funds awarded to implementation partners (state agencies and other partners). The state\'s Implementation page says DHS awarded $69.9 million in competitive grants to organizations; the competitive-grant tables here (Technology, Dental, Community Health Worker, training-provider and Sources of Strength) add to $69.96 million. Other Wisconsin allocations (for example tribal nations) are not itemized in these tables, and the pages print no overall total. Amounts as printed.'},
          open('frontend/lib/data/rht-review/recipients/wisconsin.json', 'w'), indent=1)
