"""Tennessee Dept of Health "2026 Awarded Projects of Tennessee's Rural Health Transformation Program" (HTML table).
Source: https://www.tn.gov/health/rural/grants (archived: book-audit/deep/sources/rht_recipients/tn_try.html)
Rows: section heading (priority area) rows with one cell; project rows (Grant Recipient | Project | Amount); 'Total' subtotal rows.
Check: project rows sum = the page's 'Grand Total of Awarded Projects' ($422,241,081.71) and each section = its printed 'Total'.
Amounts are multi-year totals per the state's Nov 9, 2026 release ('Amount Awarded or Requested')."""
import html as _h
import json, re

s = open('book-audit/deep/sources/rht_recipients/tn_try.html', encoding='utf-8').read()
tab = re.search(r'(?is)<table.*?</table>', s).group(0)
txt = lambda c: re.sub(r'\s+', ' ', _h.unescape(re.sub(r'<[^>]+>', '', c))).strip()
money = lambda x: float(x.replace('$', '').replace(',', ''))
rows, section, sub, grand, bad = [], None, 0.0, None, []
for tr in re.findall(r'(?is)<tr.*?</tr>', tab):
    c = [txt(x) for x in re.findall(r'(?is)<t[hd][^>]*>(.*?)</t[hd]>', tr)]
    c = [x for x in c]
    if not c or c[0] == 'Grant Recipient':
        continue
    if len(c) == 1:
        section, sub = c[0], 0.0
    elif len(c) >= 3 and c[0] == '' and c[1] == 'Total':
        if abs(money(c[2]) - sub) > 1:
            bad.append((section, money(c[2]), sub))
    elif len(c) >= 3 and 'Grand Total' in c[1]:
        grand = money(c[2])
    elif len(c) >= 3 and c[2].startswith('$'):
        rows.append({'program': section, 'n': len(rows) + 1, 'recipient': c[0], 'county': 'Not stated',
                     'amount': money(c[2]), 'purpose': c[1]})
        sub += money(c[2])
    else:
        print('SKIP', c)
tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows; sum', f'{tot:,.2f}', '| page grand total', f'{grand:,.2f}', '| subtotal mismatches:', bad)
assert abs(tot - grand) < 1, 'sum != grand total'
json.dump({'state': 'Tennessee', 'slug': 'tennessee', 'asOf': '2026-11-09',
           'source': {'label': 'Tennessee Department of Health, "2026 Awarded Projects of Tennessee\'s Rural Health Transformation Program"',
                      'url': 'https://www.tn.gov/health/rural/grants'},
           'announcedTotal': round(grand), 'areaLabel': None, 'multiYear': True, 'rows': rows,
           'note': 'The state\'s Nov 9, 2026 release describes the listed amounts as the total investment in each project over the five-year program (not a single year\'s funding); the table is headed "Amount Awarded or Requested". Programs shown are Tennessee\'s RHTP priority areas.'},
          open('frontend/lib/data/rht-review/recipients/tennessee.json', 'w'), indent=1)
