"""Parse Mississippi's Sept 14, 2026 announcement of 167 RHT awards into structured rows.
Source: https://governorreeves.ms.gov/governor-reeves-announces-167-rural-health-transformation-program-awards-totaling-more-than-104-million/
(archived: book-audit/deep/sources/rht_recipients/ms_governor_2026_167_awards.html)
Check: 167 rows; sum = $104,115,146 (the announced total)."""
import html, json, re

SRC = 'book-audit/deep/sources/rht_recipients/ms_governor_2026_167_awards.html'
raw = open(SRC, encoding='utf-8').read()
text = html.unescape(re.sub(r'<[^>]+>', '\n', raw))
text = re.sub(r'[ \t]+', ' ', text)
lines = [l.strip() for l in text.split('\n') if l.strip()]

rows, program = [], None
item = re.compile(r'^(\d+)\.\s+(.+?)\s+[–-]\s+(.+?)\s+(?:County|Counties|Parish)?\s*[–-]\s+\$([\d,]+(?:\.\d+)?)\s+[–-]\s+(.+)$')
for l in lines:
    if l.endswith('Awards') or re.search(r'(Program|Grant)\s+Awards$', l):
        program = l.replace(' Awards', '').strip()
        continue
    m = re.match(r'^(.*?(?:Program|Grant)) Awards (\d+)\.\s+(.*)$', l)
    if m:  # heading glued to first item
        program = m.group(1).strip()
        l = f"{m.group(2)}. {m.group(3)}"
    m = item.match(l)
    if m:
        rows.append({'program': program, 'n': int(m.group(1)), 'recipient': m.group(2).strip(),
                     'county': re.sub(r'\s+(County|Counties)$', '', m.group(3).strip()),
                     'amount': float(m.group(4).replace(',', '')), 'purpose': m.group(5).strip()})

total = sum(r['amount'] for r in rows)
progs = {}
for r in rows:
    progs.setdefault(r['program'], [0, 0])
    progs[r['program']][0] += 1; progs[r['program']][1] += r['amount']
print(len(rows), 'rows; total', f'{total:,}', '(announced 104,115,146)')
print({k: (v[0], f'{v[1]:,}') for k, v in progs.items()})
json.dump({'state': 'Mississippi', 'slug': 'mississippi', 'asOf': '2026-09-14',
           'source': {'label': 'Office of Gov. Tate Reeves, "Governor Reeves Announces 167 Rural Health Transformation Program Awards Totaling More Than $104 Million" (Sept 14, 2026)',
                      'url': 'https://governorreeves.ms.gov/governor-reeves-announces-167-rural-health-transformation-program-awards-totaling-more-than-104-million/'},
           'announcedTotal': 104115146, 'rows': rows},
          open('frontend/lib/data/rht-review/recipients/mississippi.json', 'w'), indent=1)
