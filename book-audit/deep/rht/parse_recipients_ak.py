"""Alaska DOH RHTP "Notice of Intent to Award" list (xlsx served under a .pdf name).
Linked from the Aug 7, 2026 release https://health.alaska.gov/media/jtmfo30a/260704_pr_rhtp-award-announcements.pdf
File: https://health.alaska.gov/media/ngll3fu1/ak_rhtp_awardsnotice_2026.pdf (archived: book-audit/deep/sources/rht_recipients/ak_awardsnotice.xlsx)
Amounts are the file's "Award Amount (Preliminary)"; the release says final amounts depend on budget review and grant agreements."""
import datetime, json, sys
sys.path.insert(0, 'book-audit/deep/rht')
from xlsx_rows import sheets

s = sheets('book-audit/deep/sources/rht_recipients/ak_awardsnotice.xlsx')
data = s['Notice of Intent to Award']
hdr = data[0]
assert hdr[2] == 'Org Name' and hdr[6] == 'Award Amount (Preliminary)', hdr
rows, dates = [], []
for r in data[1:]:
    r = (r + [None] * 11)[:11]
    if not r[2] or not isinstance(r[6], float):
        if any(r):
            print('SKIP', r[:7], file=sys.stderr)
        continue
    d = (datetime.date(1899, 12, 30) + datetime.timedelta(days=int(r[9]))).isoformat() if isinstance(r[9], float) else None
    dates.append(d)
    rows.append({'program': r[5], 'n': len(rows) + 1, 'recipient': r[2].strip(), 'county': (r[8] or 'Not stated').replace(';', '; '),
                 'amount': round(r[6], 2), 'purpose': f"{r[3].strip()}: {' '.join(r[4].split())}" if r[4] else r[3],
                 'appId': r[0], 'projectType': r[1], 'orgType': r[7], 'noticeDate': d})
tot = sum(r['amount'] for r in rows)
from collections import Counter
print(len(rows), 'rows; total', f'{tot:,.2f}', 'dates', min(x for x in dates if x), '..', max(x for x in dates if x))
print(Counter(r['program'] for r in rows)); print(Counter(r['projectType'] for r in rows))
json.dump({'state': 'Alaska', 'slug': 'alaska', 'asOf': max(x for x in dates if x),
           'source': {'label': 'Alaska Department of Health, RHTP Notice of Intent to Award list (linked from its Aug 7, 2026 release)',
                      'url': 'https://health.alaska.gov/media/ngll3fu1/ak_rhtp_awardsnotice_2026.pdf'},
           'announcedTotal': None, 'areaLabel': 'Service area', 'rows': rows,
           'note': 'Amounts are preliminary notices of intent to award, added weekly; the department says final amounts depend on budget review, award conditions and an executed grant agreement. Programs shown are Alaska\'s RHTP initiatives.'},
          open('frontend/lib/data/rht-review/recipients/alaska.json', 'w'), indent=1)
