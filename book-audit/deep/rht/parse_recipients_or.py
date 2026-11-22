"""Oregon RHTP Catalyst Awards, from OHA's dashboard data file (sheet "Data").
Source page: https://www.oregon.gov/oha/hpa/hp/pages/rhtp-awards.aspx
File: https://www.oregon.gov/oha/HPA/HP/Documents/RHTP-Awards-Data.xlsx (archived: book-audit/deep/sources/rht_recipients/or_awards_data.xlsx)
Check: 103 projects, Year 1 approved total = $80.1M (the file's own SummaryStatistics sheet).
Only Catalyst Awards are in the file; Immediate Impact Awards (estimates, some printed as ranges) and the
$21.7M Tribal Initiative set-aside are on the page but not itemised with final amounts, so they are left out."""
import json, sys
sys.path.insert(0, 'book-audit/deep/rht')
from xlsx_rows import sheets

s = sheets('book-audit/deep/sources/rht_recipients/or_awards_data.xlsx')
hdr = s['Data'][2]
assert hdr[0].startswith('Ogranization') and hdr[6] == 'Budget Year 1 (Approved)', hdr
rows = []
for r in s['Data'][3:]:
    r = (r + [None] * 10)[:10]
    if not r[0] or r[0] == 'End of worksheet' or not isinstance(r[6], float):
        continue
    if r[2] is None:  # the file's own total row
        print('skipping total row:', r[0], r[6]); continue
    rows.append({'program': r[2], 'n': len(rows) + 1, 'recipient': r[0].strip(), 'county': r[3] or 'Not stated',
                 'amount': round(r[6], 2), 'purpose': f"{r[5]}. Year 2 expected: ${r[7]:,.0f}" if isinstance(r[7], float) else str(r[5]),
                 'entityType': r[5], 'year2Expected': r[7], 'regions': r[4]})
summary = {row[0]: row for row in s['SummaryStatistics'][3:] if row and row[0]}
tot = sum(r['amount'] for r in rows)
print(len(rows), 'projects (file says', summary['Total'][1], '); Y1', f'{tot:,.2f}', '(file says', summary['Total'][2], 'M)')
assert len(rows) == summary['Total'][1] and abs(tot / 1e6 - summary['Total'][2]) < 0.06
json.dump({'state': 'Oregon', 'slug': 'oregon', 'asOf': '2026-11',
           'source': {'label': 'Oregon Health Authority, RHTP Catalyst Awards dashboard data file (RHTP-Awards-Data.xlsx)',
                      'url': 'https://www.oregon.gov/oha/hpa/hp/pages/rhtp-awards.aspx'},
           'announcedTotal': 80100000, 'areaLabel': 'Counties served', 'rows': rows,
           'note': 'Catalyst Awards only: Year 1 approved budgets for 103 projects (the file reports $80.1 million). The same page also lists Immediate Impact Awards as tentative estimates, some printed as ranges, and a $21.7 million Year 1 Tribal Initiative set-aside for the nine federally recognized Tribes; those are not itemised with approved amounts and are not included here.'},
          open('frontend/lib/data/rht-review/recipients/oregon.json', 'w'), indent=1)
