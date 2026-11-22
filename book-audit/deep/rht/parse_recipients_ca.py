"""California (HCAI) "CalRHT Program Updates": Recommended Subrecipients for CalRHT Budget Period 1.
Source: https://hcai.ca.gov/rural-health/calrht/calrht-program-updates/ (archived: book-audit/deep/sources/rht_recipients/ca_calrht_updates.html)
Page totals: $166.72M to 108 organizations; Transformative Care Model ~$87.51M / 34 grants; Workforce ~$67.56M / 65 grants;
Technology & Tools ~$11.65M / 9 grants. Five tables (Awarded Entity | Counties Served | Recommended Funding), in page order."""
import html as _h
import json, re

SRC = 'book-audit/deep/sources/rht_recipients/ca_calrht_updates.html'
s = open(SRC, encoding='utf-8').read()
# (program, initiative) for the five tables, matched to the headings that precede them on the page
TABLES = [('Accelerator Partner Program', 'Transformative Care Model'),
          ('FM-OB Fellowship Program', 'Transformative Care Model'),
          ('Transformative Payments', 'Transformative Care Model'),
          ('Workforce Development Recruitment and Retention (WDRR)', 'Workforce Development'),
          ('Electronic Health Record Modernization (EHR)', 'Technology & Tools')]
HEADS = ['Accelerator Partner Program', 'FM-OB Fellowship Program', 'Transformative Payments',
         'Workforce Development Recruitment and Retention Program', 'Electronic Health Record Modernization']
txt = lambda c: re.sub(r'\s+', ' ', _h.unescape(re.sub(r'<[^>]+>', '', c))).strip()

tables = list(re.finditer(r'(?is)<table.*?</table>', s))
assert len(tables) == 5, len(tables)
rows = []
for (prog, init), head, t in zip(TABLES, HEADS, tables):
    before = txt(s[:t.start()])
    assert before.rfind(head) > before.rfind('Recommended Funding'), f'heading {head!r} does not precede its table'
    for r in re.findall(r'(?is)<tr.*?</tr>', t.group(0)):
        cells = [txt(c) for c in re.findall(r'(?is)<t[hd][^>]*>(.*?)</t[hd]>', r)]
        if not cells or cells[0] == 'Awarded Entity':
            continue
        name, counties, amt = cells[:3]
        rows.append({'program': prog, 'initiative': init, 'n': len(rows) + 1, 'recipient': name,
                     'county': counties or 'Not stated', 'amount': float(amt.replace('$', '').replace(',', '')), 'purpose': init})

by = {}
for r in rows:
    b = by.setdefault(r['initiative'], [0, 0.0]); b[0] += 1; b[1] += r['amount']
tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows; total', f'{tot:,.2f}', '(page: $166.72M, 108 organizations)')
for k, (n, v) in by.items():
    print(f'  {k}: {n} grants, ${v/1e6:.2f}M')
json.dump({'state': 'California', 'slug': 'california', 'asOf': '2026-11',
           'source': {'label': 'California Department of Health Care Access and Information (HCAI), "CalRHT Program Updates": Recommended Subrecipients for CalRHT Budget Period 1',
                      'url': 'https://hcai.ca.gov/rural-health/calrht/calrht-program-updates/'},
           'announcedTotal': 166720000, 'areaLabel': 'Counties served', 'rows': rows,
           'note': 'HCAI lists these as tentative, recommended Budget Period 1 awards: funding is final only once a subrecipient agreement is executed. HCAI reports $166.72 million for 108 organizations across 45 counties, in three initiatives: Transformative Care Model (about $87.51 million, 34 recommended grants plus milestone-based hospital investments and clinical training partnerships), Workforce Development (about $67.56 million, 65 grants) and Technology & Tools (about $11.65 million, 9 grants). The grant counts on this list match those figures exactly; the dollars listed are lower because, in HCAI\'s words, the list "does not yet represent all Budget Period 1 investments included in the initiative totals above." HCAI also reserves 5% of first-year funding ($11.65 million, within those initiative totals) for California\'s federally recognized Tribes, budgets $56.51 million in contract support (including the Rural Technical Assistance Center) and $10.41 million in HCAI program support, and notes one recommended applicant has since withdrawn. HCAI\'s "108 organizations" matches the 108 rows; some organizations appear on more than one row (for example Ridgecrest Regional Hospital, twice), so fewer distinct names appear.'},
          open('frontend/lib/data/rht-review/recipients/california.json', 'w'), indent=1)
