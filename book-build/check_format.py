#!/usr/bin/env python3
"""Fail-loud formatting check on HTR_Book_v42.docx.

Exit 0 = clean. Exit 1 = defects found (listed on stderr).
Run by the post-edit hook so a reintroduced defect surfaces immediately
instead of three hours later on a page the author happens to look at.

Checks the defects that have actually recurred:
  1. text with no explicit colour inside a light-filled cell -> renders white
  2. body paragraphs off the 10.5pt (sz 21) norm at 12pt (sz 24)
  3. a first DATA row styled as a header row (shaded + both cells bold)
"""
import re, sys, zipfile, os

DOCX = (sys.argv[1] if len(sys.argv) > 1 else
        os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                     'HTR_Book_v42.docx'))
LIGHT = {'edf2f9', 'fff6e5', 'e7f4f2', 'eaf3ea', 'eceefb', 'f0f1f4', 'e8f0fb'}
TXT = re.compile(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', re.S)

if not os.path.exists(DOCX):
    sys.exit(0)
x = zipfile.ZipFile(DOCX).read('word/document.xml').decode('utf8')
problems = []

# --- tables -----------------------------------------------------------------
k = 0
while True:
    i = x.find('<w:tbl>', k)
    if i == -1:
        break
    j = x.find('</w:tbl>', i)
    if j == -1:
        break
    j += 8
    t, k = x[i:j], j
    rows = re.findall(r'<w:tr\b.*?</w:tr>', t, re.S)

    # 1. colourless text in a light-filled HEADER row of a multi-row table.
    #
    #    word/styles.xml gives Table7 a firstRow band of color=ffffff, so a run
    #    with no explicit colour there renders white. Measured against the book
    #    as it stands: multi-row header rows are 13 coloured / 0 uncoloured --
    #    the rule is absolute there, and the only violation was the one the
    #    author found. Single-row callout boxes are 134 / 180, i.e. colourless
    #    body text is the established norm and renders correctly, so they are
    #    deliberately excluded. Navy header rows are meant to be white.
    if len(rows) >= 2 and 'w:tblHeader w:val="1"' in rows[0]:
        for c in re.findall(r'<w:tc>.*?</w:tc>', rows[0], re.S):
            fills = set(re.findall(r'<w:shd[^>]*w:fill="([0-9a-fA-F]{6})"', c))
            if not (fills & LIGHT):
                continue
            for rr in re.findall(r'<w:r\s[^>]*>(.*?)</w:r>', c, re.S):
                if '<w:t' not in rr:
                    continue
                rpr = re.search(r'<w:rPr>(.*?)</w:rPr>', rr, re.S)
                if rpr and '<w:color' not in rpr.group(1):
                    txt = ''.join(TXT.findall(rr)).strip()[:52]
                    problems.append(
                        'WHITE-ON-LIGHT  header row, fill=%s  %r  -- no <w:color>, so it '
                        'takes Table7\'s firstRow band (white) on a pale fill. Build '
                        'cells with book-build/docx_build.py.' % (','.join(fills), txt))

    # 4. STYLE-PAINTED FIRST ROW. Every table style in word/styles.xml has a
    #    firstRow rule: navy 1b3a6b fill + white text. It applies whenever the
    #    table's tblLook has the firstRow bit (0x0020) and the cell carries no
    #    explicit fill of its own. Word and Google Docs honour it; LibreOffice
    #    -- the only renderer available here -- does NOT, so no render ever
    #    shows it. Two ways it goes wrong:
    #      a) row 0 is a DATA row (tblHeader=0) -> a data row painted navy;
    #      b) row 0 text has a hard-coded dark colour -> black on navy.
    #    Found by the author on 2026-09-21 in two tables, with this checker
    #    reporting clean. docx_build.table() had hardcoded tblLook=0020.
    look = re.search(r'<w:tblLook w:val="([0-9a-fA-F]+)"', t)
    if rows and look and (int(look.group(1), 16) & 0x0020):
        r0 = rows[0]
        c0 = re.findall(r'<w:tc>.*?</w:tc>', r0, re.S)
        def _explicit_fill(c):
            m = re.search(r'<w:tcPr>.*?<w:shd[^>]*w:fill="([0-9a-fA-F]{6}|auto)"', c, re.S)
            return bool(m) and m.group(1).lower() != 'auto'
        painted = [c for c in c0 if not _explicit_fill(c)]
        if painted:
            label = ' | '.join(''.join(TXT.findall(c)).strip()[:26] for c in c0)[:70]
            if 'w:tblHeader w:val="1"' not in r0:
                problems.append(
                    'STYLE-PAINTED-DATA-ROW  %r  -- tblLook has firstRow on but row 0 is '
                    'not a header, so Word/Google Docs paint it navy. Use tblLook 0600 '
                    '(docx_build.table() does this now) or mark the row header=True.'
                    % label)
            else:
                for c in painted:
                    for rr in re.findall(r'<w:r\s[^>]*>(.*?)</w:r>', c, re.S):
                        if '<w:t' not in rr:
                            continue
                        col = re.search(r'<w:color w:val="([0-9a-fA-F]{6})"', rr)
                        if col and col.group(1).lower() in (
                                '111111', '000000', '1a1a1a', '161b22', '222222', '333333'):
                            problems.append(
                                'BLACK-ON-NAVY  header %r has hard-coded dark text (%s) '
                                'but no explicit fill, so the style paints it navy.'
                                % (label, col.group(1)))
                            break

    # 3. first DATA row dressed as a header
    if len(rows) >= 3:
        def prof(r):
            cs = re.findall(r'<w:tc>.*?</w:tc>', r, re.S)
            tx = [''.join(TXT.findall(c)).strip() for c in cs]
            return [('<w:b w:val="1"/>' in c) for c, z in zip(cs, tx) if z], tx
        b0, t0 = prof(rows[0]); b1, _ = prof(rows[1]); b2, _ = prof(rows[2])
        f0 = set(re.findall(r'<w:shd[^>]*w:fill="([0-9a-fA-F]{6})"', rows[0]))
        if len(b0) == 2 and all(b0) and b1 == [True, False] and b2 == [True, False] \
                and (f0 & LIGHT):
            problems.append(
                'DATA-ROW-AS-HEADER  %r  -- rows below bold only the label, so this '
                'is a data row wearing header styling.'
                % ' | '.join(z[:30] for z in t0 if z))

# --- 2. 12pt body paragraphs ------------------------------------------------
k = 0
while True:
    i = x.find('<w:p ', k)
    if i == -1:
        break
    j = x.find('</w:p>', i)
    if j == -1:
        break
    blk, k = x[i:j + 6], j + 6
    if '<w:tc>' in blk or '<w:pStyle' in blk:
        continue
    if '<w:sz w:val="24"/>' not in blk:
        continue
    txt = ''.join(TXT.findall(blk)).strip()
    if len(txt) > 60:
        problems.append('FONT-SIZE  sz=24 (12pt) body paragraph, norm is 21 (10.5pt):  %r'
                        % txt[:58])

# --- 5. fallback fonts -------------------------------------------------------
# Editors have twice applied a Unicode-fallback font to a WHOLE run rather than
# one character, because Garamond was assumed not to have that glyph. Found by
# rendering on 2026-09-21: a §2.1 table cell rendered in Gungsuh (a Korean
# typeface) because its run contained "−"; 26 other runs carried "Cardo" for
# the same reason with "→". Both are unnecessary -- the same characters appear
# in default-font runs elsewhere in the book and render correctly -- so any
# font outside the three the book actually uses is a defect, not a style.
ALLOWED_FONTS = {'Garamond', 'Calibri', 'Arial'}
found_fonts = set(re.findall(r'w:ascii="([^"]+)"', x))
for f in sorted(found_fonts - ALLOWED_FONTS):
    n = x.count('w:ascii="%s"' % f)
    problems.append(
        'FALLBACK-FONT  %r used in %d run(s) -- likely a whole-run Unicode '
        'fallback (e.g. an arrow or minus sign) applied because Garamond was '
        'assumed not to have that glyph. Check for the same character in a '
        'default-font run elsewhere in the book; if it renders, strip the '
        'w:rFonts override instead.' % (f, n))

if problems:
    sys.stderr.write('\nBOOK FORMAT CHECK FAILED (%d):\n' % len(problems))
    for p in problems[:12]:
        sys.stderr.write('  - %s\n' % p)
    if len(problems) > 12:
        sys.stderr.write('  ...and %d more\n' % (len(problems) - 12))
    sys.stderr.write('\nFix before reporting this edit as done.\n')
    sys.exit(1)
print('book format check: clean')
