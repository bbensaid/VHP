"""Parse Florida's "Florida Rural Health Transformation Program | Year 1 Awardees" PDF (Executive Office of the Governor).
Source: https://flgov.com/eog/sites/default/files/shared/2026/08/RHTP%20-%20PDF.pdf
(archived: book-audit/deep/sources/rht_recipients/fl_awards.pdf)
Layout: Region heading > category heading > numbered rows "<#> <Organization> <$amount>".
The list is numbered 1-82 but has no #66 (as published). The PDF prints no grand total."""
import json, re, sys
import pypdf

SRC = 'book-audit/deep/sources/rht_recipients/fl_awards.pdf'
row = re.compile(r'^\s*(\d+)\s+(.+?)\s+\$([\d,]+\.\d\d)\s*$')
rows, region, cat = [], None, None
for page in pypdf.PdfReader(SRC).pages:
    for l in page.extract_text(extraction_mode='layout').split('\n'):
        s = re.sub(r'\s+', ' ', l).strip()
        if not s or s.startswith('Florida Rural Health') or s.startswith('# Organization'):
            continue
        m = row.match(l)
        if m:
            rows.append({'program': cat, 'n': int(m.group(1)), 'recipient': re.sub(r'\s+', ' ', m.group(2)).strip(),
                         'county': region, 'amount': float(m.group(3).replace(',', '')), 'purpose': ''})
        elif s.endswith('Region'):
            region = s
        elif '$' not in s and not s[0].isdigit():
            cat = s
        else:
            print('UNPARSED', s, file=sys.stderr)

nums = [r['n'] for r in rows]
print(len(rows), 'rows; numbers missing:', sorted(set(range(1, max(nums) + 1)) - set(nums)),
      'dupes:', len(nums) - len(set(nums)), 'total', f"{sum(r['amount'] for r in rows):,.2f}")
print(sorted({(r['county'], r['program']) for r in rows}))
json.dump({'state': 'Florida', 'slug': 'florida', 'asOf': '2026-08',
           'source': {'label': 'Executive Office of the Governor of Florida, "Florida Rural Health Transformation Program | Year 1 Awardees" (PDF, Aug 2026)',
                      'url': 'https://flgov.com/eog/sites/default/files/shared/2026/08/RHTP%20-%20PDF.pdf'},
           'announcedTotal': None, 'areaLabel': 'Region', 'rows': rows,
           'note': 'The list groups awards by region and program area; it prints no grand total and no project descriptions, and its numbering skips #66. An organization can appear more than once (one row per award).'},
          open('frontend/lib/data/rht-review/recipients/florida.json', 'w'), indent=1)
