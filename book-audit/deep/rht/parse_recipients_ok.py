"""Oklahoma RHTP "Funding Recipients" (Oklahoma State Department of Health). The public page (https://oklahoma.gov/health/rhtp/rhtp-funding-recipients.html)
loads each program's list from a content fragment; the program index is .../rhtp-funding-recipients/.../xfdisplay.json (Budget Period 1 and Budget Period 2).
Fragments fetched as <path>.content.html and archived in book-audit/deep/sources/rht_recipients/ok_api/ (f<i>.html; urls.txt maps i -> program).
Award line = "Recipient $amount"; the next lines give 'Counties covered: ...' and a description. Microgrants are grouped under county headings.
Programs whose fragment has no recipients yet are listed in the ledger note, not here. Amounts as printed."""
import html as _h
import json, re

D = 'book-audit/deep/sources/rht_recipients/ok_api/'
prog = [l.split('|', 2) for l in open(D + 'urls.txt').read().strip().split('\n')]
award = re.compile(r'^(.+?)\s+\$([\d,]+(?:\.\d\d)?)$')
rows, unmatched, per = [], [], {}
for i, label, base in prog:
    bp = 'Budget Period 2' if '-bp2/' in base else 'Budget Period 1'
    s = open(f'{D}f{i}.html', encoding='utf-8', errors='ignore').read()
    L = [re.sub(r'\s+', ' ', l).strip() for l in _h.unescape(re.sub(r'<[^>]+>', '\n', re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', '', s))).split('\n') if l.strip()]
    k = 0
    while k < len(L):
        m = award.match(L[k])
        if not m or L[k].startswith('Applicants were eligible'):
            if '$' in L[k] and not m:
                unmatched.append((label, L[k][:90]))
            k += 1
            continue
        county, desc = None, []
        if k > 0 and '$' not in L[k - 1] and len(L[k - 1]) <= 24 and not L[k - 1].startswith('Counties') and 'Microgrants' in label:
            county = L[k - 1]
        j = k + 1
        if j < len(L) and L[j].startswith('Counties covered:'):
            county = L[j].replace('Counties covered:', '').strip(); j += 1
        if j < len(L) and not award.match(L[j]) and not (j + 1 < len(L) and award.match(L[j + 1]) and len(L[j]) <= 24):
            desc.append(L[j]); j += 1
        rows.append({'program': f'{label} ({bp})', 'n': len(rows) + 1, 'recipient': m.group(1).strip(), 'county': county or 'Not stated',
                     'amount': float(m.group(2).replace(',', '')), 'purpose': ' '.join(desc)})
        per[label] = per.get(label, 0) + 1
        k = j
tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows; sum', f'{tot:,.2f}')
print(per)
print('UNMATCHED $ lines:', unmatched)
json.dump({'state': 'Oklahoma', 'slug': 'oklahoma', 'asOf': '2026-11',
           'source': {'label': 'Oklahoma State Department of Health, RHTP Funding Recipients (Budget Period 1 and 2 program lists)',
                      'url': 'https://oklahoma.gov/health/rhtp/rhtp-funding-recipients.html'},
           'announcedTotal': None, 'areaLabel': 'Counties', 'multiYear': True, 'rows': rows,
           'note': 'The state posts a recipient list for each program as awards are made; this file holds every program whose list had recipients when checked (the others had none yet). Oklahoma notes the amounts reflect funding tied to direct services in communities and do not include all program expenditures, such as administrative costs. The page prints no total.' + f" The lists combine Budget Period 1 and Budget Period 2 awards (Budget Period 2 awards total ${sum(r['amount'] for r in rows if 'Budget Period 2' in r['program']):,.0f}); the program name shows which, so the share of the Year 1 award is not computed."},
          open('frontend/lib/data/rht-review/recipients/oklahoma.json', 'w'), indent=1)
