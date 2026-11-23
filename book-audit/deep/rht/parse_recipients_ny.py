"""New York DOH "Rural Community Health Integration Awardees List" (Rural Community Health Integration Initiative, announced Sept 4, 2026).
Source: https://www.health.ny.gov/facilities/transforming_rural_healthcare/awardees.htm (fetched via healthweb-back.health.ny.gov; archived: ny_awardees.html)
Columns: Lead Applicant Name | Project Title | Lead Applicant County | Type | Fund Amount | Summary.
Check vs the governor's release: $76.2M total, ~$22.7M planning and ~$53.5M implementation (rows match); the release says 90 awards to 56 organizations while the table has 107 rows / 55 lead applicants."""
import html as _h
import json, re
from collections import Counter

s = open('book-audit/deep/sources/rht_recipients/ny_awardees.html', encoding='utf-8', errors='ignore').read()
txt = lambda c: re.sub(r'\s+', ' ', _h.unescape(re.sub(r'<[^>]+>', '', c))).strip()
rows = []
for tr in re.findall(r'(?is)<tr.*?</tr>', re.search(r'(?is)<table.*?</table>', s).group(0)):
    c = [txt(x) for x in re.findall(r'(?is)<t[hd][^>]*>(.*?)</t[hd]>', tr)]
    if len(c) >= 5 and re.fullmatch(r'\$[\d,]+(?:\.\d\d)?', c[4]):
        rows.append({'program': f'Rural Community Health Integration: {c[3]} awards', 'n': len(rows) + 1, 'recipient': c[0], 'county': c[2] or 'Not stated',
                     'amount': float(c[4].replace('$', '').replace(',', '')), 'purpose': f'{c[1]}. {c[5]}' if len(c) > 5 and c[5] else c[1]})
by = Counter()
for r in rows:
    by[r['program'].split(': ')[1].split(' ')[0]] += r['amount']
tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows;', len({r['recipient'] for r in rows}), 'lead applicants; sum', f'{tot:,.2f}', {k: f'{v:,.0f}' for k, v in by.items()})
assert round(tot / 1e6, 1) == 76.2 and round(by['Planning'] / 1e6, 1) == 22.7 and round(by['Implementation'] / 1e6, 1) == 53.5
json.dump({'state': 'New York', 'slug': 'new-york', 'asOf': '2026-09-04',
           'source': {'label': 'New York State Department of Health, "Rural Community Health Integration Awardees List" (Rural Community Health Integration Initiative)',
                      'url': 'https://www.health.ny.gov/facilities/transforming_rural_healthcare/awardees.htm'},
           'announcedTotal': None, 'areaLabel': 'Lead applicant county', 'rows': rows,
           'note': 'The state\'s awardee table for the first Rural Community Health Integration round: planning awards (about $22.7 million) and implementation awards (about $53.5 million), matching the governor\'s September 4, 2026 release ($76.2 million). The release says 90 awards to 56 organizations; the table lists 107 rows for 55 lead applicants, and the state does not explain the difference (an organization can appear more than once). This is one initiative; New York\'s other initiatives (technology-enhanced primary care, workforce, technology and cybersecurity) are not itemized here.'},
          open('frontend/lib/data/rht-review/recipients/new-york.json', 'w'), indent=1)
