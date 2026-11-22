"""Pennsylvania DHS "Rural Health Eligible Projects" table (Name | Total | Project Description | Region | Initiative | Funding Opportunity).
Source: https://www.pa.gov/agencies/dhs/programs-services/healthcare/rural-health/rural-health-eligible-projects
(archived: book-audit/deep/sources/rht_recipients/pa_projects.html). Page states "Total Awarded to Date: $43,000,000"."""
import html as _h
import json, re, sys

raw = open('book-audit/deep/sources/rht_recipients/pa_projects.html', encoding='utf-8').read()
raw = re.sub(r'(?is)<(script|style|nav|header|footer)[^>]*>.*?</\1>', '', raw)
raw = re.sub(r'(?i)<br\s*/?>|</p>|</h\d>|</li>|</tr>|</td>|</th>|</div>', '\n', raw)
L = [re.sub(r'\s+', ' ', l).strip() for l in _h.unescape(re.sub(r'<[^>]+>', '', raw)).split('\n')]
L = [l for l in L if l]
start = L.index('Funding Opportunity') + 1
end = next(i for i in range(start, len(L)) if L[i] in ('Back to top',) or L[i].startswith('Was this page')) if any(l.startswith('Was this page') or l == 'Back to top' for l in L[start:]) else len(L)
L = L[start:end]
REGIONS = {'Southern Alleghenies', 'Central', 'North Central', 'Southwest', 'South Central', 'Northwest', 'Northeast',
           'Southeast', 'Lehigh Valley', 'Statewide', 'Northern Tier', 'Southcentral'}
INITS = {'Tech & Infrastructure', 'Workforce', 'Maternal Health', 'Behavioral Health', 'Aging & Access', 'EMS & Transportation',
         'Maternal Health Services', 'Behavioral Health Services', 'Aging and Access', 'EMS and Transportation'}
money = re.compile(r'^\$([\d,]+(?:\.\d\d)?)$')
idx = [i for i, l in enumerate(L) if money.match(l)]
rows = []
for k, i in enumerate(idx):
    nxt = idx[k + 1] - 1 if k + 1 < len(idx) else len(L)
    block = L[i + 1:nxt]
    opp = block[-1]
    rest = block[:-1]
    init = rest.pop() if rest and rest[-1] in INITS else None
    region = rest.pop().replace(';', '; ').replace(';  ', '; ') if rest and all(x.strip() in REGIONS for x in rest[-1].split(';')) else None
    if region is None:
        print('NO REGION', L[i - 1], block[-3:], file=sys.stderr)
    rows.append({'program': opp, 'n': k + 1, 'recipient': L[i - 1], 'county': region or 'Not stated',
                 'amount': float(money.match(L[i]).group(1).replace(',', '')), 'purpose': ' '.join(rest), 'initiative': init})
tot = sum(r['amount'] for r in rows)
from collections import Counter
print(len(rows), 'rows; total', f'{tot:,.2f}', '(page: Total Awarded to Date $43,000,000)')
print(Counter(r['program'] for r in rows)); print(Counter(r['initiative'] for r in rows)); print(Counter(r['county'] for r in rows))
print('last row:', rows[-1]['recipient'], rows[-1]['program'])
json.dump({'state': 'Pennsylvania', 'slug': 'pennsylvania', 'asOf': '2026-11',
           'source': {'label': 'Pennsylvania Department of Human Services, "Rural Health Eligible Projects"',
                      'url': 'https://www.pa.gov/agencies/dhs/programs-services/healthcare/rural-health/rural-health-eligible-projects'},
           'announcedTotal': 43000000, 'areaLabel': 'Region', 'rows': rows,
           'note': 'The page heads the list "Total Awarded to Date: $43,000,000"; the listed project totals sum to a larger figure, shown above. The page describes the list as "authorized projects" and does not explain the difference, so the listed totals should not be read as money already paid. Region is the page\'s own; projects serving several regions list them all.'},
          open('frontend/lib/data/rht-review/recipients/pennsylvania.json', 'w'), indent=1)
