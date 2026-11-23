"""Connecticut: Governor Lamont's Sept 2026 release "Rural Health Transformation Program Invests $50 Million in Rural Hospital Right-Sizing and Infrastructure".
https://portal.ct.gov/governor/news/press-releases/2026/09-2026/governor-lamont-announces-rural-health-transformation-program-invests-50-million
(archived: book-audit/deep/sources/rht_recipients/ct_50m_release.html). The release itemizes the finalized grant agreements in its text;
amounts are printed in millions to two decimals ($20.23M etc.). Check: the three hospital awards sum to the stated $46 million."""
import json, re, html as _h

s = open('book-audit/deep/sources/rht_recipients/ct_50m_release.html', encoding='utf-8', errors='ignore').read()
text = re.sub(r'\s+', ' ', _h.unescape(re.sub(r'<[^>]+>', ' ', re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', '', s))))
want = [('Day Kimball Hospital (Putnam)', r'\$20\.23 million for Day Kimball Hospital', 20.23e6, 'Rural hospital transformation (Year 1)'),
        ('Sharon Hospital (Sharon)', r'\$13\.12 million for Sharon Hospital', 13.12e6, 'Rural hospital transformation (Year 1)'),
        ('Hartford HealthCare: Windham Hospital (Willimantic) and Charlotte Hungerford Hospital (Torrington)', r'\$12\.65 million for Hartford HealthCare', 12.65e6, 'Rural hospital transformation (Year 1)'),
        ('Mathematica', r'Mathematica was awarded \$3\.98 million', 3.98e6, 'Technical assistance to the rural hospitals')]
rows = []
for name, rx, amt, purpose in want:
    assert re.search(rx, text), f'not found in release: {name}'
    rows.append({'program': 'Rural Health Transformation Project grant agreements (Sept 2026)', 'n': len(rows) + 1, 'recipient': name,
                 'county': 'Not stated', 'amount': amt, 'purpose': purpose})
hosp = sum(r['amount'] for r in rows[:3])
assert round(hosp) == 46_000_000, hosp
assert re.search(r'finalized \$50 million', text) and re.search(r'\$46 million going to four critical rural hospital', text)
print(len(rows), 'rows; sum', f"{sum(r['amount'] for r in rows):,.0f}", '(release: $50 million; hospitals $46 million)')
json.dump({'state': 'Connecticut', 'slug': 'connecticut', 'asOf': '2026-09',
           'source': {'label': 'Office of Gov. Ned Lamont, "Governor Lamont Announces Connecticut\'s Rural Health Transformation Program Invests $50 Million in Rural Hospital Right-Sizing and Infrastructure" (Sept 2026)',
                      'url': 'https://portal.ct.gov/governor/news/press-releases/2026/09-2026/governor-lamont-announces-rural-health-transformation-program-invests-50-million'},
           'announcedTotal': 50000000, 'areaLabel': None, 'rows': rows,
           'note': 'The governor\'s release describes $50 million in finalized grant agreements: $46 million to four rural hospitals (Hartford HealthCare\'s two hospitals share one award) and a technical-assistance vendor. Amounts are as printed in millions, so the listed sum ($49.98 million) is $20,000 below the rounded $50 million. This is only part of Connecticut\'s $154 million first-year award.'},
          open('frontend/lib/data/rht-review/recipients/connecticut.json', 'w'), indent=1)
