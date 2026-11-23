"""Delaware: Governor Meyer / DHSS release "Governor Meyer Awards Nearly $23 Million to FQHCs Through Rural Health Transformation Program" (Sept 24, 2026).
https://news.delaware.gov/2026/09/24/governor-meyer-awards-nearly-23-million-to-fqhcs-through-rural-health-transformation-program/
(archived, scripts removed: book-audit/deep/sources/rht_recipients/de_fqhc_release.html). Amounts printed in millions: $11.3M, $10.1M, $1.29M (total 22.69M = 'nearly $23 million')."""
import html as _h
import json, re

s = open('book-audit/deep/sources/rht_recipients/de_fqhc_release.html', encoding='utf-8', errors='ignore').read()
text = re.sub(r'\s+', ' ', _h.unescape(re.sub(r'<[^>]+>', ' ', re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', '', s))))
want = [('Westside Family Healthcare', r'Westside Family Healthcare will receive \$11\.3 million', 11.3e6, 'Epic electronic medical record, care coordination, chronic disease technology, cybersecurity, workforce, two mobile health units and a passenger van'),
        ('La Red Health Center', r'La Red Health Center will receive \$10\.1 million', 10.1e6, 'Value-based care infrastructure in Sussex County: Epic Community Connect, care coordination, remote patient monitoring, chronic disease management, cybersecurity, transportation'),
        ('Henrietta Johnson Medical Center', r'Henrietta Johnson Medical Center will receive \$1\.29 million', 1.29e6, 'Technology, workforce, care coordination and chronic disease management capabilities')]
rows = []
for n, (name, rx, amt, why) in enumerate(want, 1):
    assert re.search(rx, text), name
    rows.append({'program': 'Federally Qualified Health Centers (Sept 2026)', 'n': n, 'recipient': name, 'county': 'Not stated', 'amount': amt, 'purpose': why})
assert re.search(r'nearly \$23 million', text)
print(len(rows), 'rows; sum', f"{sum(r['amount'] for r in rows):,.0f}")
json.dump({'state': 'Delaware', 'slug': 'delaware', 'asOf': '2026-09-24',
           'source': {'label': 'Delaware Governor and DHSS, "Governor Meyer Awards Nearly $23 Million to FQHCs Through Rural Health Transformation Program" (Sept 24, 2026)',
                      'url': 'https://news.delaware.gov/2026/09/24/governor-meyer-awards-nearly-23-million-to-fqhcs-through-rural-health-transformation-program/'},
           'announcedTotal': None, 'areaLabel': None, 'rows': rows,
           'note': 'The three federally qualified health centers named in the state\'s release (amounts as printed in millions; together $22.69 million, "nearly $23 million"). Delaware\'s program has 15 projects and about $157.4 million in first-year federal funding; other Delaware awards (for example the physician-workforce funding announced October 14, 2026) are not itemized here, so this list covers only part of the program.'},
          open('frontend/lib/data/rht-review/recipients/delaware.json', 'w'), indent=1)
