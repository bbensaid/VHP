"""Parse Alabama's Oct 2026 announcement of 34 RHT grants (round 2) into structured rows.
Source: https://governor.alabama.gov/newsroom/2026/10/governor-ivey-announces-additional-alabama-rural-health-transformation-program-grants-totaling-nearly-55-million/
(archived: book-audit/deep/sources/rht_recipients/al_gov_55M.html). Amounts are printed rounded ("$1.45 million"); stored as printed.
Check: 34 rows; sum ≈ "nearly $55 million"."""
import json, re

import html as _h
SRC = 'book-audit/deep/sources/rht_recipients/al_gov_55M.html'
raw = open(SRC, encoding='utf-8').read()
raw = re.sub(r'(?i)<br\s*/?>|</p>|</h\d>|</li>', '\n', raw)
txt = _h.unescape(re.sub(r'<[^>]+>', '', raw))
lines = [re.sub(r'\s+', ' ', l).strip() for l in txt.split('\n') if l.strip()]
amt = re.compile(r'^(.+?)\s*[–-]\s*\$([\d.,]+)( million)?\s+to\s+(.+)$')
rows, program = [], None
for l in lines:
    if l.endswith('Initiative') and '$' not in l:
        program = l
        continue
    m = amt.match(l)
    if not m or program is None:
        continue
    v = float(m.group(2).replace(',', '')) * (1e6 if m.group(3) else 1)
    purpose = m.group(4).strip()
    cm = re.search(r'\(([^()]*)\)\.?\s*$', purpose)
    area = cm.group(1) if cm else 'Not stated'
    area = re.sub(r'^\d+\s+counties?\s*', '', area).strip() or 'Not stated'
    rows.append({'program': program, 'n': len(rows) + 1, 'recipient': m.group(1).strip(), 'county': area,
                 'amount': v, 'amountPrinted': ('$' + m.group(2) + (m.group(3) or '')), 'purpose': purpose})

print(len(rows), 'rows; total', f'{sum(r["amount"] for r in rows):,.0f}')
json.dump({'state': 'Alabama', 'slug': 'alabama', 'asOf': '2026-10',
           'source': {'label': 'Office of Gov. Kay Ivey, "Governor Ivey Announces Additional Alabama Rural Health Transformation Program Grants Totaling Nearly $55 Million" (October 2026)',
                      'url': 'https://governor.alabama.gov/newsroom/2026/10/governor-ivey-announces-additional-alabama-rural-health-transformation-program-grants-totaling-nearly-55-million/'},
           'announcedTotal': 55000000, 'rows': rows,
           'note': 'This is the second round of 2026 grants only; amounts of $1 million or more are printed rounded (e.g. "$1.45 million") and the release gives the total as "nearly $55 million". The area column lists the counties served as printed.'},
          open('frontend/lib/data/rht-review/recipients/alabama.json', 'w'), indent=1)
