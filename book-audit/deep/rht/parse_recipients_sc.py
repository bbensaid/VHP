"""South Carolina SCDHHS "Year One Award List" (PDF, rev. Nov 20, 2026; contracts awarded Sept 15, 2026).
Source: https://www.scdhhs.gov/sites/dhhs/files/SC%20RHTP%20Year%201%20Award%20List%20to%20CMS.pdf
(archived: book-audit/deep/sources/rht_recipients/sc_award_list.pdf)
Columns: Organization Name | Funded Amount | Brief Description, under 'Initiative:' and 'Project:' headings. Text is rebuilt from
positioned fragments (the layout-mode text has spacing artifacts). Rows are vertically centred on their amount, so each fragment
is assigned to the nearest amount line. Check: count and sum vs the figures reported for the state's announcement (228 grants, $167,299,900.69)."""
import json, re, sys
import pypdf

SRC = 'book-audit/deep/sources/rht_recipients/sc_award_list.pdf'
FOOT = ('The RHTP is supported', 'award totaling', 'endorsement, by CMS', 'Rev. 11', 'Year One Award List')
reader = pypdf.PdfReader(SRC)

def frags_of(page):
    out = []
    def v(t, cm, tm, fd, fs):
        if t.strip():
            out.append((cm[5] + tm[5], cm[4] + tm[4], t.strip()))
    page.extract_text(visitor_text=v)
    return out

def join(parts):
    """parts: [(x, text)] sorted by x -> string; a 1-letter fragment directly followed (gap < 7.5pt) by a lowercase fragment is one word."""
    s = ''
    for i, (x, t) in enumerate(parts):
        if i and not (len(parts[i - 1][1]) == 1 and parts[i - 1][1].isalpha() and t[:1].islower() and x - parts[i - 1][0] < 7.5):
            s += ' '
        s += t
    return re.sub(r'\s+', ' ', s).strip()

# column boundaries from the header on page 1
hdr = {t: x for y, x, t in frags_of(reader.pages[0]) if t in ('Organization Name', 'Funded Amount', 'Brief Description')}
# amount digits start at x~295 (just left of the 'Funded Amount' header at 302); descriptions start at x~401, left of the 'Brief Description' header
C_AMT, C_DESC = hdr['Funded Amount'] - 12, 395
print('column starts: amount', C_AMT, 'desc', C_DESC, file=sys.stderr)

def squash(x):
    return re.sub(r'\s+', '', x)

def restore(text, plain):
    """If `text` (ignoring whitespace) occurs in the page's plain text, return that plain-text spelling; else `text` unchanged."""
    if not text:
        return text
    cp, idx = '', []
    for i, ch in enumerate(plain):
        if not ch.isspace():
            cp += ch; idx.append(i)
    k = cp.find(squash(text))
    if k < 0:
        return text
    return re.sub(r'\s+', ' ', plain[idx[k]: idx[k + len(squash(text)) - 1] + 1]).strip()

rows, init, proj = [], None, None
GAP = 16.0  # within a row, successive text lines are ~14.6pt apart; between rows there is >= ~17.5pt of cell padding
amt_re = re.compile(r'\$\s*([\d,]+(?:\.\d\d)?)')
stats = {'blocks_no_amount': 0, 'blocks_multi_amount': 0}

def build(items):
    byy = {}
    for y, x, t in sorted(items, key=lambda i: (-i[0], i[1])):
        k = next((k for k in byy if abs(k - y) < 1.0), y)
        byy.setdefault(k, []).append((x, t))
    return ' '.join(join(sorted(v)) for k, v in sorted(byy.items(), key=lambda kv: -kv[0]))

for pno, page in enumerate(reader.pages):
    plain_page = re.sub(r'\s+', ' ', page.extract_text())
    fr = []
    for y, x, t in frags_of(page):
        if re.match(r'^(The RHTP is supported|award totaling|endorsement, by CMS|Rev\. 11|Year One Award List)', t.strip()) or re.fullmatch(r'\d{1,3}', t.strip()):
            continue  # page footer / page number
        m = re.match(r'^(.*?)\s*(\$\s*[\d,]+(?:\.\d\d)?)\s*(.*)$', t) if x < C_DESC else None
        if m and m.group(1) == '' and C_AMT <= x < C_DESC and m.group(3).strip():
            fr.append((y, x, m.group(2)))
            fr.append((y, C_DESC + 1, m.group(3).strip()))
        elif m and m.group(1) and x < C_AMT:
            fr.append((y, x, m.group(1)))
            fr.append((y, C_AMT + 5, m.group(2)))
            if m.group(3).strip():
                fr.append((y, C_DESC + 1, m.group(3).strip()))
        else:
            fr.append((y, x, t))
    fr.sort(key=lambda f: (-f[0], f[1]))
    lines = []
    for y, x, t in fr:
        if lines and abs(lines[-1][0] - y) < 1.0:
            lines[-1][1].append((x, t))
        else:
            lines.append([y, [(x, t)]])
    blocks = []
    for y, parts in lines:
        parts.sort()
        if blocks and blocks[-1][-1][0] - y <= GAP:
            blocks[-1].append((y, parts))
        else:
            blocks.append([(y, parts)])
    for blk in blocks:
        # peel heading lines (Initiative:/Project:) off the top of a block; the rest, if any, is a data row
        while blk:
            text0 = join(blk[0][1])
            sq = re.sub(r'\s+', '', text0)
            if any(text0.startswith(f) for f in FOOT) or re.fullmatch(r'\d{1,3}', text0) or text0.startswith('Organization Name'):
                blk = blk[1:]; continue
            if sq.startswith('Initiative:') and not any(x >= C_AMT for x, _ in blk[0][1]):
                init, proj = re.sub(r'^\s*I\s*n\s*i\s*t\s*i\s*a\s*t\s*i\s*v\s*e\s*:\s*', '', text0), None
                blk = blk[1:]; continue
            if sq.startswith('Project:') and not any(x >= C_AMT for x, _ in blk[0][1]):
                proj = re.sub(r'^\s*P\s*r\s*o\s*j\s*e\s*c\s*t\s*:\s*', '', text0)
                blk = blk[1:]; continue
            break
        if not blk:
            continue
        text0 = join(blk[0][1])
        amts = [(y, x, t) for y, parts in blk for x, t in parts if C_AMT <= x < C_DESC]
        if not amts:
            stats['blocks_no_amount'] += 1
            print('NO-AMOUNT BLOCK p%d:' % (pno + 1), text0[:90], file=sys.stderr)
            continue
        joined_amt = ''.join(t for _, _, t in sorted(amts, key=lambda a: (-a[0], a[1])))
        mm = amt_re.findall(joined_amt)
        if len(mm) != 1:
            stats['blocks_multi_amount'] += 1
            print('MULTI-AMOUNT BLOCK p%d:' % (pno + 1), joined_amt[:80], file=sys.stderr)
            continue
        name = restore(build([(y, x, t) for y, parts in blk for x, t in parts if x < C_AMT]), plain_page)
        desc = restore(build([(y, x, t) for y, parts in blk for x, t in parts if x >= C_DESC]), plain_page)
        tidy = lambda x: re.sub(r'\s+\)', ')', re.sub(r'\(\s+', '(', x))
        name, desc = tidy(name), tidy(desc)
        rows.append({'program': f"{init}: {proj}" if proj else init, 'n': len(rows) + 1, 'recipient': name, 'county': 'Not stated',
                     'amount': float(mm[0].replace(',', '')), 'purpose': desc})
print(stats, file=sys.stderr)

tot = sum(r['amount'] for r in rows)
print(len(rows), 'rows; sum', f'{tot:,.2f}', '| reported by news coverage of the state announcement: 228 grants, $167,299,900.69')
from collections import Counter
print(Counter(r['program'].split(':')[0] for r in rows))
empty = [r['n'] for r in rows if not r['recipient'] or not r['purpose']]
print('rows missing name/description:', empty)
for r in rows[:6] + rows[100:104] + rows[-4:]:
    print(f"{r['n']:3} {r['amount']:>12,.2f} {r['recipient'][:50]:50} | {r['purpose'][:70]}")
json.dump({'state': 'South Carolina', 'slug': 'south-carolina', 'asOf': '2026-11-20',
           'source': {'label': 'South Carolina Department of Health and Human Services, "Year One Award List" (contracts awarded Sept 15, 2026; rev. Nov 20, 2026)',
                      'url': 'https://www.scdhhs.gov/sites/dhhs/files/SC%20RHTP%20Year%201%20Award%20List%20to%20CMS.pdf'},
           'announcedTotal': None, 'areaLabel': None, 'rows': rows,
           'note': 'SCDHHS lists each organization\'s funded amount and a brief description, grouped by RHTP initiative and project; the list prints no total. News coverage of the state\'s September announcement reported 228 grants totaling $167,299,900.69; the state\'s November list has 223 entries (the difference is not explained in the document, which notes some statements of work were revised).'},
          open('frontend/lib/data/rht-review/recipients/south-carolina.json', 'w'), indent=1)
