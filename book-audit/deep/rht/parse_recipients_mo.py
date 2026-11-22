"""Missouri DSS RHTP award lists, two published rounds:
  1) Smart Growth and Service Line Modernization (Oct 30, 2026): table lists 25 contingent awardees (release text says 26), printed Total $39,400,820.55
     https://dss.mo.gov/mhd/rhtp-modernize-rural-healthcare-services (archived: mo_modernize.html)
  2) Strategic Minor Renovations Program (Sep 22, 2026): 20 projects, "approximately $35 million" per the release
     https://dss.mo.gov/rhtp-strategic-minor-renovations-program (archived: mo_minor.html)
All awards are contingent on CMS approval (some rows are marked 'approved by CMS' in the source)."""
import html as _h
import json, re

S = 'book-audit/deep/sources/rht_recipients/'
txt = lambda c: re.sub(r'\s+', ' ', _h.unescape(re.sub(r'<[^>]+>', '', c))).strip()
money = lambda x: float(x.replace('$', '').replace(',', ''))

def table_rows(f):
    t = re.search(r'(?is)<table.*?</table>', open(S + f, encoding='utf-8').read()).group(0)
    return [[txt(x) for x in re.findall(r'(?is)<t[hd][^>]*>(.*?)</t[hd]>', tr)] for tr in re.findall(r'(?is)<tr.*?</tr>', t)]

rows = []
printed = None
for c in table_rows('mo_modernize.html')[1:]:
    if c[0] == 'Total':
        printed = money(c[2]); continue
    name = c[0]
    ok = bool(re.search(r'\(\s*approved by CMS\s*\)', name, re.I))
    name = re.sub(r'\s*\(\s*approved by CMS\s*\)', '', name, flags=re.I).strip()
    rows.append({'program': 'Smart Growth and Service Line Modernization (Oct 2026)', 'n': len(rows) + 1, 'recipient': name,
                 'county': c[1], 'amount': money(c[2]), 'purpose': 'Approved by CMS' if ok else 'Contingent on CMS approval'})
n1, s1 = len(rows), sum(r['amount'] for r in rows)
print('Smart Growth', n1, 'rows', f'{s1:,.2f}', 'printed', f'{printed:,.2f}')
assert abs(s1 - printed) < 0.5  # the release text says 26 providers; the table lists 25 and ties to the printed total to the cent
for c in table_rows('mo_minor.html')[1:]:
    rows.append({'program': 'Strategic Minor Renovations (Sep 2026)', 'n': len(rows) + 1, 'recipient': c[0], 'county': 'Not stated',
                 'amount': money(c[1]), 'purpose': ''})
n2 = len(rows) - n1
s2 = sum(r['amount'] for r in rows[n1:])
print('Minor Renovations', n2, 'rows', f'{s2:,.2f}', '(release: 20 projects, ~$35M)')
assert n2 == 20
json.dump({'state': 'Missouri', 'slug': 'missouri', 'asOf': '2026-10-30',
           'source': {'label': 'Missouri Department of Social Services, RHTP award lists: Smart Growth and Service Line Modernization (Oct 30, 2026) and Strategic Minor Renovations (Sep 22, 2026)',
                      'url': 'https://dss.mo.gov/mhd/rhtp-modernize-rural-healthcare-services'},
           'announcedTotal': None, 'areaLabel': 'City (county)', 'rows': rows,
           'note': f'Two published rounds: Smart Growth and Service Line Modernization (the table lists 25 awardees and prints a total of ${printed:,.2f}, which these rows match to the cent; the state\'s release text says 26 providers and does not explain the difference) and Strategic Minor Renovations (20 projects, announced as approximately $35 million; the list prints no total). Missouri says all awards are contingent on CMS approval. Other Missouri RHTP money (for example workforce childcare and program enablement) is not itemized on these lists. The Strategic Minor Renovations list gives no city or county.'},
          open('frontend/lib/data/rht-review/recipients/missouri.json', 'w'), indent=1)
