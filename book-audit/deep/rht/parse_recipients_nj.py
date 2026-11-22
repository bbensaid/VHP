"""Parse New Jersey's "Rural Health Transformation Program Funding Allocations – July 31, 2026" (NJ DOH PDF).
Source: https://nj.gov/rural-health-transformation/documents/njrht-funding-allocations-2026.pdf
(archived: book-audit/deep/sources/rht_recipients/nj_allocations.pdf)
Three-column table (Applicant Name | Award Amount | Activities) under program headings; parsed by x/y position
because names and activities wrap over several lines. The PDF prints no grand total."""
import json, re, sys
import pypdf

SRC = 'book-audit/deep/sources/rht_recipients/nj_allocations.pdf'
SECTIONS = ['Advancing Access to Care, EMS, and Dispatch Capability in Rural New Jersey',
            'Advancing Technology, Prevention, and Workforce Capacity in Rural New Jersey',
            'Building Rural Hospital Capacity', 'Community Health Workers in Rural New Jersey',
            'Doula Integration in Rural New Jersey', 'Improving Chronic Disease Outcomes']
SKIP = {'Grant information', 'Applicant Name', 'Award Amount', 'Activities', 'Activity', 'Rural Health Transformation Program',
        'Funding Allocations – July 31, 2026', 'New Jersey', 'Rural New Jersey'}
MONEY = re.compile(r'^\$([\d,]+)\s*(.*)$')

frags = []  # (page, y, x, text)
for pi, page in enumerate(pypdf.PdfReader(SRC).pages):
    def v(t, cm, tm, fd, fs, pi=pi):
        if t.strip():
            frags.append((pi, tm[5], tm[4], t.strip()))
    page.extract_text(visitor_text=v)
frags.sort(key=lambda f: (f[0], -f[1], f[2]))

# zones = runs of fragments on one page not interrupted by a heading
zones, cur, section, reset = [], None, None, False
for p, y, x, t in frags:
    head = next((s for s in SECTIONS if s.startswith(t.rstrip()) and len(t.rstrip()) >= min(len(s), 25)), None)
    if head:
        section = head; cur = None; reset = True; continue
    if re.fullmatch(r'\d{1,2}', t):
        continue  # page number
    if t in SKIP and not (x < 150 and t == 'New Jersey'):
        cur = None; reset = True; continue
    if cur is None or cur['page'] != p:
        cur = {'page': p, 'section': section, 'f': [], 'cont': not reset}; zones.append(cur); reset = False
    cur['f'].append((y, x, t))

rows, carry = [], None
for z in zones:
    amts = []
    for y, x, t in z['f']:
        m = MONEY.match(t)
        if m and 150 < x < 250:
            amts.append({'y': y, 'amount': float(m.group(1).replace(',', '')), 'name': [], 'desc': [m.group(2)] if m.group(2) else [], 'section': z['section']})
    for y, x, t in z['f']:
        if MONEY.match(t) and 150 < x < 250:
            continue
        if not amts or (z['cont'] and y > amts[0]['y'] + 30 and x >= 250 and carry):  # activities continued from previous page
            carry['desc'].append(t); continue
        tgt = min(amts, key=lambda a: abs(a['y'] - y))
        (tgt['name'] if x < 150 else tgt['desc']).append(t)
    rows += amts
    if amts:
        carry = amts[-1]

out = []
for i, r in enumerate(rows, 1):
    name = re.sub(r'\s+', ' ', ' '.join(r['name'])).strip()
    desc = re.sub(r'\s*ew J ?ersey$', '', re.sub(r'\s+([,.])', r'\1', re.sub(r'\s+', ' ', ' '.join(r['desc']))).replace(' -', '-').strip())
    out.append({'program': r['section'], 'n': i, 'recipient': name, 'county': 'Not stated', 'amount': r['amount'], 'purpose': desc})
    if not name:
        print('NO NAME', r, file=sys.stderr)
for r in out:
    print(f"{r['n']:3} {r['amount']:>12,.0f}  {r['recipient'][:45]:45} | {r['program'][:30]} | {r['purpose'][:60]}")
print(len(out), 'rows; total', f"{sum(r['amount'] for r in out):,.0f}")
json.dump({'state': 'New Jersey', 'slug': 'new-jersey', 'asOf': '2026-07-31',
           'source': {'label': 'New Jersey Department of Health, "Rural Health Transformation Program Funding Allocations – July 31, 2026" (PDF)',
                      'url': 'https://nj.gov/rural-health-transformation/documents/njrht-funding-allocations-2026.pdf'},
           'announcedTotal': None, 'areaLabel': None, 'rows': out,
           'note': 'The document lists each grant under its program with the activities funded; it prints no grand total and no county column (counties appear in the activity text where given).'},
          open('frontend/lib/data/rht-review/recipients/new-jersey.json', 'w'), indent=1)
