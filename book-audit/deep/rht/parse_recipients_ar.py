"""Arkansas RHTP per-organization award totals by initiative (two one-page PDFs on arkansasrhtp.com).
  Round 1 (announced Aug 2026, "nearly $150 million"): THRIVE / PACT  — ar_thrive_pact.pdf, Total $149,177,618.45
  Round 2 (announced Sep 24, 2026, $54.6 million):     RISE / HEART   — ar_year1_totals.pdf, Total $54,685,068.84
Sources: https://arkansasrhtp.com/wp-content/uploads/2026/08/ada_RHTP.YR1_.THRIVE.PACT_.pdf and
         https://arkansasrhtp.com/wp-content/uploads/2026/09/ada_Year-1-Award-totals.pdf (archived in book-audit/deep/sources/rht_recipients/)
One row per (organization, initiative) with a non-zero amount. Check: column sums == each PDF's printed 'Total:' row."""
import json, re
import pypdf

S = 'book-audit/deep/sources/rht_recipients/'
FILES = [('ar_thrive_pact.pdf', 'Round 1 (Aug 2026)', ('THRIVE', 'PACT')),
         ('ar_year1_totals.pdf', 'Round 2 (Sep 2026)', ('RISE', 'HEART'))]
tri = re.compile(r'^(.*?)\s*\$([\d,]+\.\d\d)\s+\$([\d,]+\.\d\d)\s+\$([\d,]+\.\d\d)\s*$')
v = lambda x: float(x.replace(',', ''))
rows = []
for f, rnd, (ia, ib) in FILES:
    text = '\n'.join(p.extract_text() or '' for p in pypdf.PdfReader(S + f).pages)
    pend, sa, sb, printed = '', 0.0, 0.0, None
    n0 = len(rows)
    for line in text.split('\n')[1:]:
        line = re.sub(r'\s+', ' ', line).strip()
        if not line:
            continue
        m = tri.match(line)
        if not m:
            pend = (pend + ' ' + line).strip()
            continue
        name = (pend + ' ' + m.group(1)).strip().rstrip(',')
        pend = ''
        a, b, c = v(m.group(2)), v(m.group(3)), v(m.group(4))
        if name.startswith('Total:'):
            printed = (a, b, c); continue
        assert abs(a + b - c) < 0.01, (name, a, b, c)
        for init, amt in ((ia, a), (ib, b)):
            if amt > 0:
                rows.append({'program': f'{init} ({rnd})', 'n': len(rows) + 1, 'recipient': name, 'county': 'Not stated',
                             'amount': amt, 'purpose': ''})
        sa += a; sb += b
    got = (round(sa, 2), round(sb, 2), round(sa + sb, 2))
    print(rnd, len(rows) - n0, 'rows; columns', got, 'printed Total', printed)
    assert printed and all(abs(g - p) < 0.5 for g, p in zip(got, printed)), 'column sums != printed total'
tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows; sum', f'{tot:,.2f}')
json.dump({'state': 'Arkansas', 'slug': 'arkansas', 'asOf': '2026-09-24',
           'source': {'label': 'Arkansas Rural Health Transformation Program (arkansasrhtp.com), Year 1 award totals by organization: THRIVE/PACT (Aug 2026) and RISE/HEART (Sep 2026)',
                      'url': 'https://arkansasrhtp.com/'},
           'announcedTotal': round(149177618.45 + 54685068.84), 'areaLabel': None, 'rows': rows,
           'note': 'Two published rounds: THRIVE and PACT (printed total $149,177,618.45; announced by the governor as nearly $150 million) and RISE and HEART (printed total $54,685,068.84; announced as $54.6 million). The PDFs give each organization\'s total per initiative, not individual projects, so an organization can appear under several initiatives; the announced total shown is the sum of the two printed totals.'},
          open('frontend/lib/data/rht-review/recipients/arkansas.json', 'w'), indent=1)
