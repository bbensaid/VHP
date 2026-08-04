#!/usr/bin/env python3
"""
check_manuscript.py — one structural sweep over the whole manuscript.

Finds, in a single pass, the classes of defect that have surfaced one at a time
by eye: malformed tables, orphaned or missing figure captions, figure/index
mismatches, broken cross-references, duplicate paragraphs, and the
style-critical rules from CLAUDE.md.

Exits non-zero if anything is found, so it can gate a build.

    python3 book-build/check_manuscript.py
"""
import re
import sys
import collections

BOOK = '/Users/baba/Vermont-Health-Platform/HTR_Book_v42.md'
raw = open(BOOK, encoding='utf-8').read()
lines = raw.split('\n')
findings = []


def report(sev, title, detail):
    findings.append((sev, title, detail))


# ── 1. malformed tables ─────────────────────────────────────────────────────
# A separator row must be followed by at least one data row. If it is the last
# line of its table, the rows above it were parsed as headers (the all-navy,
# uncaptioned block found in ch 10).
for i, l in enumerate(lines):
    if l.strip().startswith('| :---'):
        nxt = lines[i + 1].strip() if i + 1 < len(lines) else ''
        if not nxt.startswith('|'):
            report('ERROR', 'Malformed table (separator is the last row)',
                   f'line {i+1}: rows above will render as header cells')
        prev = lines[i - 1].strip() if i else ''
        if not prev.startswith('|'):
            report('ERROR', 'Malformed table (separator has no header row)',
                   f'line {i+1}')

# column-count consistency within each table
i = 0
while i < len(lines):
    if lines[i].strip().startswith('|') and i + 1 < len(lines) \
            and lines[i + 1].strip().startswith('| :---'):
        hdr = i
        ncol = len([c for c in lines[i].strip().strip('|').split('|')])
        j = i + 2
        while j < len(lines) and lines[j].strip().startswith('|'):
            n = len([c for c in lines[j].strip().strip('|').split('|')])
            if n != ncol:
                report('WARN', 'Table row has a different column count',
                       f'line {j+1}: {n} cells vs {ncol} in header (line {hdr+1})')
            j += 1
        i = j
    else:
        i += 1

# ── 2. figures: captions, orphans, index ────────────────────────────────────
if '# **Figure Index**' not in raw:
    report('ERROR', 'Figure Index missing', '')
    head, tail = raw, ''
else:
    head, tail = raw.split('# **Figure Index**', 1)

body_caps = re.findall(r'^\*Figure ([0-9]+\.[0-9A-Za-z]+)', head, re.M)
idx_caps = re.findall(r'^Figure ([0-9]+\.[0-9A-Za-z]+)', tail, re.M)

for num, n in collections.Counter(body_caps).items():
    if n > 1:
        report('ERROR', 'Duplicate figure number in body', f'Figure {num} appears {n}x')
for num, n in collections.Counter(idx_caps).items():
    if n > 1:
        report('ERROR', 'Duplicate figure number in index', f'Figure {num} appears {n}x')

for num in sorted(set(body_caps) - set(idx_caps)):
    report('ERROR', 'Figure in body but not in the Figure Index', f'Figure {num}')
for num in sorted(set(idx_caps) - set(body_caps)):
    report('ERROR', 'Figure in the index but not in the body', f'Figure {num}')
if body_caps and idx_caps and body_caps != idx_caps:
    report('WARN', 'Figure Index order does not match body order', '')

# ORPHANED caption: a caption with no table, list or image directly above it.
head_lines = head.split('\n')
for i, l in enumerate(head_lines):
    if not l.startswith('*Figure '):
        continue
    k = i - 1
    while k >= 0 and head_lines[k].strip() == '':
        k -= 1
    if k < 0:
        continue
    prev = head_lines[k].strip()
    if not (prev.startswith('|') or prev.startswith('+') or prev.startswith('- ')
            or prev.startswith('![') or prev.startswith(':::')):
        report('ERROR', 'Orphaned figure caption (nothing above it)',
               f'line {i+1}: {l[:80]}')

# UNCAPTIONED table: a table whose next non-blank line is not a caption.
i = 0
while i < len(head_lines):
    if head_lines[i].strip().startswith('|') and i + 1 < len(head_lines) \
            and head_lines[i + 1].strip().startswith('| :---'):
        j = i + 2
        while j < len(head_lines) and head_lines[j].strip().startswith('|'):
            j += 1
        k = j
        while k < len(head_lines) and head_lines[k].strip() == '':
            k += 1
        nxt = head_lines[k].strip() if k < len(head_lines) else ''
        if not nxt.startswith('*Figure ') and not nxt.startswith('*Table '):
            report('WARN', 'Table with no caption',
                   f'line {i+1}: {head_lines[i][:70]}')
        i = j
    else:
        i += 1

# mixed caption vocabulary
tbl_caps = re.findall(r'^\*Table ([0-9A-Z]+\.[0-9]+)', head, re.M)
if tbl_caps:
    report('WARN', 'Captions labelled "Table" rather than "Figure"',
           f'{len(tbl_caps)} of them: {", ".join(sorted(set(tbl_caps))[:8])}'
           + ('…' if len(set(tbl_caps)) > 8 else ''))

# broken in-text references
refs = set(re.findall(r'\bFigure ([0-9]+\.[0-9A-Za-z]+)\b', raw))
for r in sorted(refs - set(body_caps)):
    report('ERROR', 'In-text reference to a figure that does not exist', f'Figure {r}')

# gaps in per-chapter numbering
by_ch = collections.defaultdict(list)
for f in body_caps:
    ch, num = f.split('.', 1)
    if num.isdigit():
        by_ch[int(ch)].append(int(num))
for ch in sorted(by_ch):
    ns = sorted(by_ch[ch])
    missing = [n for n in range(1, max(ns) + 1) if n not in ns]
    if missing:
        report('WARN', f'Chapter {ch} figure numbering has gaps',
               f'missing {missing}; present {ns}')

# ── 3. duplicate prose ──────────────────────────────────────────────────────
def norm(s):
    s = s.replace('’', "'").replace('“', '"').replace('”', '"').replace('—', '--')
    s = re.sub(r'\*\*|\*|`|\\', '', s)
    return re.sub(r'\s+', ' ', s).strip()

paras = [p.strip() for p in head.split('\n\n')]
prose = [p for p in paras if len(p) > 160
         and not p.startswith(('#', '|', '+', ':::', '*Figure', '*Table', '- ', '>', '!['))]
seen = {}
for p in prose:
    n = norm(p)
    if n in seen:
        report('WARN', 'Duplicate paragraph', p[:90])
    seen[n] = True


def sents(p):
    return set(s for s in (norm(x) for x in re.split(r'(?<=[.?!]) +', p)) if len(s) > 45)


for a in range(len(prose)):
    for b in range(a + 1, min(a + 4, len(prose))):
        sa, sb = sents(prose[a]), sents(prose[b])
        if not sa or not sb:
            continue
        common = sa & sb
        if len(common) >= 2 and len(common) / min(len(sa), len(sb)) >= 0.5:
            report('WARN', 'Near-duplicate adjacent paragraphs', prose[a][:90])

# ── 4. style-critical rules (CLAUDE.md) ─────────────────────────────────────
n_src = len(re.findall(r'^#{1,4} \*\*Sources\*\*', raw, re.M))
if n_src:
    report('ERROR', '"**Sources**" used as a heading (must be a plain paragraph)',
           f'{n_src} occurrence(s)')

n_wtc = len(re.findall(r'^## \*\*Work This Chapter on the Platform\*\*', raw, re.M))
if n_wtc != 16:
    report('ERROR', 'Work This Chapter heading count', f'{n_wtc}, expected 16')

for label, pat, want in (
        ('Key Concepts', r'Key Concepts in This Chapter', 17),
        ('Implications for You', r'^## \*\*Implications for You\*\*', 16)):
    n = len(re.findall(pat, raw, re.M))
    if n != want:
        report('WARN', f'{label} heading count', f'{n}, expected {want}')

variants = set(re.findall(r'^#{1,4}[^\n]*Key Concepts[^\n]*$', raw, re.M))
if len(variants) > 1:
    report('ERROR', 'Key Concepts heading is not byte-identical everywhere',
           f'{len(variants)} variants')

n4 = len(re.findall(r'^#### ', raw, re.M))
if n4:
    report('WARN', 'h4 headings present (pipeline has no style for them)', f'{n4}')

# unbalanced callout fences
o = len(re.findall(r'^::: \{custom-style', raw, re.M))
c = len(re.findall(r'^:::\s*$', raw, re.M))
if o != c:
    report('ERROR', 'Unbalanced callout fences', f'{o} open / {c} close')

# ── 5. chapters and appendices ──────────────────────────────────────────────
n_ch = len(re.findall(r'^# \*\*Chapter ', raw, re.M))
if n_ch != 16:
    report('ERROR', 'Chapter count', f'{n_ch}, expected 16')
n_ap = len(re.findall(r'^# \*\*Appendix ', raw, re.M))
if n_ap != 9:
    report('WARN', 'Appendix count', f'{n_ap}, expected 9')

# ── output ──────────────────────────────────────────────────────────────────
errs = [f for f in findings if f[0] == 'ERROR']
warns = [f for f in findings if f[0] == 'WARN']
print(f"Manuscript: {len(lines):,} lines | {len(body_caps)} figures | "
      f"{n_ch} chapters | {n_ap} appendices")
print(f"ERRORS: {len(errs)}   WARNINGS: {len(warns)}\n")
for sev, title, detail in errs + warns:
    grp = collections.Counter()
    print(f"[{sev}] {title}" + (f" — {detail}" if detail else ""))
if not findings:
    print("Clean.")
sys.exit(1 if errs else 0)
