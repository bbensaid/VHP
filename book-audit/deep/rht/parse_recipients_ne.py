"""Nebraska DHHS public notices of award for RHTP initiatives 3.3, 4.4a, 4.4b, 5.3 (PDFs; "Applicant | Award Amount" lines).
Source index: https://dhhs.ne.gov/Pages/Rural-Health-Transformation.aspx (PDFs archived in book-audit/deep/sources/rht_recipients/ne_notices/)
Notices print no totals; each line with a name and an amount is one award. Check: every '$' line (except the CMS footer) became a row."""
import json, re, pypdf

D = 'book-audit/deep/sources/rht_recipients/ne_notices/'
FILES = [('n33', 'Initiative 3.3: Rural Health Care Workforce Incentive and Sustainability Model'),
         ('n44a', 'Initiative 4.4a: Chronic Disease Navigation and Education'),
         ('n44b', 'Initiative 4.4b: Remote Patient Monitoring in Facilities and at Home'),
         ('n53', 'Initiative 5.3: Modification of Existing Clinical Facilities for Mental Health Crisis')]
amt = re.compile(r'^(.*?)\s*\$\s*([\d,]+(?:\.\d\d?)?)\s*$')
rows = []
for f, prog in FILES:
    text = '\n'.join((p.extract_text() or '') for p in pypdf.PdfReader(D + f + '.pdf').pages)
    prev, n_dollar, n0 = '', 0, len(rows)
    for line in text.split('\n'):
        l = re.sub(r'\s+', ' ', line).strip()
        if not l:
            continue
        if 'financial assistance award totaling' in l or 'those of the Nebraska' in l:
            continue
        m = amt.match(l)
        if m and re.search(r'\d', m.group(2)):
            n_dollar += 1
            name = m.group(1).strip() or prev
            rows.append({'program': prog, 'n': len(rows) + 1, 'recipient': name, 'county': 'Not stated',
                         'amount': float(m.group(2).replace(',', '')), 'purpose': ''})
            prev = ''
        else:
            prev = l
    print(f, len(rows) - n0, 'rows;', f"{sum(r['amount'] for r in rows[n0:]):,.2f}")
bad = [r for r in rows if len(r['recipient']) < 4 or 'selected for award' in r['recipient'] or 'Applicant' in r['recipient']]
print('suspicious names:', [(r['n'], r['recipient']) for r in bad])
tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows; sum', f'{tot:,.2f}')
json.dump({'state': 'Nebraska', 'slug': 'nebraska', 'asOf': '2026-07-15',
           'source': {'label': 'Nebraska DHHS, RHTP public notices of award (initiatives 3.3, 4.4a, 4.4b, 5.3)',
                      'url': 'https://dhhs.ne.gov/Pages/Rural-Health-Transformation.aspx'},
           'announcedTotal': None, 'areaLabel': None, 'rows': rows,
           'note': 'Four initiative notices, dated May to July 2026; other Nebraska initiatives are not itemized in the published notices reviewed, and the notices print no totals.  The listed awards are only part of Nebraska\'s $218.5 million first-year award.'},
          open('frontend/lib/data/rht-review/recipients/nebraska.json', 'w'), indent=1)
