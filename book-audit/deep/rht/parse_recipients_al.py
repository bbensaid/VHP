"""Parse Alabama's two 2026 RHT grant announcements into structured rows (both rounds in one file).
Round 1 (Aug 24, 2026): 138 grants, "more than $144 million"
  https://governor.alabama.gov/newsroom/2026/08/governor-ivey-announces-first-grants-in-major-new-rural-healthcare-program-totaling-more-than-144-million/
Round 2 (Oct 2026): 34 grants, "nearly $55 million"
  https://governor.alabama.gov/newsroom/2026/10/governor-ivey-announces-additional-alabama-rural-health-transformation-program-grants-totaling-nearly-55-million/
Archived in book-audit/deep/sources/rht_recipients/. Amounts of $1M+ are printed rounded ("$1.45 million"); stored as printed.
Recipients with several grants are written "X – ... including $A to ...", then "A second grant for $B ..."."""
import html as _h
import json, re

ROUNDS = [
    ('Round 1 (Aug 2026)', 'book-audit/deep/sources/rht_recipients/al_gov_144M.html', 138),
    ('Round 2 (Oct 2026)', 'book-audit/deep/sources/rht_recipients/al_gov_55M.html', 34),
]
MONEY = r'\$([\d.,]+)( million)?'
single = re.compile(r'^(.+?)\s*[–-]\s*' + MONEY + r'\s+(?:to|for)\s+(.+)$')
multi = re.compile(r'^(.+?)\s*[–-]\s*(?:This|The) .*?(?:two|three|four|five) grants.*?including (?:one )?(?:of |for )?' + MONEY + r'\s+(?:to|for|that|which)?\s*(.+)$')
nth = re.compile(r'^An? (?:second|third|fourth|fifth) grant (?:of |for |totaling )?' + MONEY + r'\s*(?:will |to |for |that )?(.+)$')

def val(num, mil):
    return float(num.replace(',', '').rstrip('.')) * (1e6 if mil else 1)

def area_of(purpose):
    cm = re.search(r'\(([^()]*)\)\.?\s*$', purpose)
    a = cm.group(1) if cm else 'Not stated'
    return re.sub(r'^\d+\s+counties?\s*', '', a).strip() or 'Not stated'

rows = []
for rnd, src, expect in ROUNDS:
    raw = open(src, encoding='utf-8').read()
    raw = re.sub(r'(?i)<br\s*/?>|</p>|</h\d>|</li>', '\n', raw)
    lines = [re.sub(r'\s+', ' ', l).strip() for l in _h.unescape(re.sub(r'<[^>]+>', '', raw)).split('\n') if l.strip()]
    program, last, n0 = None, None, len(rows)
    for l in lines:
        if l.endswith('Initiative') and '$' not in l:
            program = l; continue
        if program is None:
            continue
        for rx, kind in ((multi, 'multi'), (nth, 'nth'), (single, 'single')):
            m = rx.match(l)
            if not m:
                continue
            if kind == 'nth':
                if last is None:
                    break
                recip, num, mil, purpose = last, m.group(1), m.group(2), m.group(3)
            else:
                recip, num, mil, purpose = m.group(1).strip(), m.group(2), m.group(3), m.group(4)
                last = recip
            rows.append({'program': f'{program}', 'round': rnd, 'n': len(rows) + 1, 'recipient': recip,
                         'county': area_of(purpose), 'amount': val(num, mil),
                         'amountPrinted': '$' + num + (mil or ''), 'purpose': purpose.strip()})
            break
    got = len(rows) - n0
    print(rnd, got, 'rows (announced', expect, ') total', f'{sum(r["amount"] for r in rows[n0:]):,.0f}')

json.dump({'state': 'Alabama', 'slug': 'alabama', 'asOf': '2026-10',
           'source': {'label': 'Office of Gov. Kay Ivey, RHT grant announcements of Aug 24, 2026 (round 1) and Oct 2026 (round 2)',
                      'url': 'https://governor.alabama.gov/newsroom/2026/08/governor-ivey-announces-first-grants-in-major-new-rural-healthcare-program-totaling-more-than-144-million/'},
           'announcedTotal': 199000000, 'rows': rows,
           'note': 'Two rounds: 138 grants announced as "more than $144 million" (Aug 24, 2026) and 34 grants as "nearly $55 million" (Oct 2026; https://governor.alabama.gov/newsroom/2026/10/governor-ivey-announces-additional-alabama-rural-health-transformation-program-grants-totaling-nearly-55-million/). The announced total shown is the sum of those two rounded figures. Amounts of $1 million or more are printed rounded.'},
          open('frontend/lib/data/rht-review/recipients/alabama.json', 'w'), indent=1)
