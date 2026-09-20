# -*- coding: utf-8 -*-
import re, zipfile, collections

x = zipfile.ZipFile('/Users/baba/Vermont-Health-Platform/HTR_Book_v42.docx').read(
    'word/document.xml').decode('utf8')
TXT = re.compile(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', re.S)
heads = []
for m in re.finditer(r'<w:pStyle w:val="Heading1"/>', x):
    a = x.rfind('<w:p ', 0, m.start()); b = x.find('</w:p>', m.start())
    heads.append((a, ''.join(TXT.findall(x[a:b]))))
A = [o for o, t in heads if 'Chapter 1: The Five-Pillar' in t][0]
B = [o for o, t in heads if o > A][0]
seg = x[A:B]


def tables(s, off=0):
    out, k = [], 0
    while True:
        i = s.find('<w:tbl>', k)
        if i == -1: break
        j = s.find('</w:tbl>', i)
        if j == -1: break
        j += 8
        out.append((off + i, s[i:j])); k = j
    return out


print('### 1. LIGHT-FILL CELLS WITH NO EXPLICIT TEXT COLOUR (white-on-light risk)')
LIGHT = {'edf2f9', 'fff6e5', 'e7f4f2', 'eaf3ea', 'eceefb', 'f0f1f4', 'e8f0fb'}
bad = 0
for off, t in tables(seg, A):
    for r in re.findall(r'<w:tr\b.*?</w:tr>', t, re.S):
        for c in re.findall(r'<w:tc>.*?</w:tc>', r, re.S):
            fills = set(re.findall(r'<w:shd[^>]*w:fill="([0-9a-fA-F]{6})"', c))
            txt = ''.join(TXT.findall(c)).strip()
            if fills & LIGHT and txt and '<w:color' not in c:
                bad += 1
                print('   @%-8d %-8s %r' % (off, ','.join(fills), txt[:66]))
print('   total:', bad)

print('\n### 2. BODY PARAGRAPH FONT SIZES (half-points; 21 = 10.5pt)')
sizes = collections.Counter()
big = []
k = 0
while True:
    i = seg.find('<w:p ', k)
    if i == -1: break
    j = seg.find('</w:p>', i)
    if j == -1: break
    blk = seg[i:j + 6]; k = j + 6
    if '<w:tc>' in blk or '<w:pStyle' in blk:
        continue
    txt = ''.join(TXT.findall(blk)).strip()
    if len(txt) < 40:
        continue
    for s_ in set(re.findall(r'<w:sz w:val="(\d+)"', blk)) or {'(inherit)'}:
        sizes[s_] += 1
        if s_ not in ('21', '(inherit)'):
            big.append((A + i, s_, txt[:70]))
print('  ', dict(sizes))
for off, s_, t in big[:14]:
    print('   @%-8d sz=%-4s %r' % (off, s_, t))
print('   non-21 body paragraphs:', len(big))

print('\n### 3. FULLY-ITALIC PARAGRAPHS OUTSIDE TABLES')
k = 0
it = []
while True:
    i = seg.find('<w:p ', k)
    if i == -1: break
    j = seg.find('</w:p>', i)
    if j == -1: break
    blk = seg[i:j + 6]; k = j + 6
    if '<w:tc>' in blk: continue
    txt = ''.join(TXT.findall(blk)).strip()
    runs = re.findall(r'<w:rPr>(.*?)</w:rPr>', blk, re.S)
    if len(txt) > 80 and runs and all('<w:i w:val="1"/>' in r for r in runs):
        it.append((A + i, len(txt), txt[:70]))
for off, n, t in it:
    print('   @%-8d len=%-4d %r' % (off, n, t))
print('   total fully-italic paragraphs:', len(it))

print('\n### 4. TABLES WHOSE FIRST ROW IS BOLD BUT NOT A HEADER')
for off, t in tables(seg, A):
    rows = re.findall(r'<w:tr\b.*?</w:tr>', t, re.S)
    if len(rows) < 2: continue
    r0 = rows[0]
    hdr = 'w:tblHeader w:val="1"' in r0
    shaded = bool(re.findall(r'<w:shd[^>]*w:fill="(?!auto)[0-9a-fA-F]{6}"', r0))
    c0 = re.findall(r'<w:tc>.*?</w:tc>', r0, re.S)
    allbold = c0 and all('<w:b w:val="1"/>' in c for c in c0 if ''.join(TXT.findall(c)).strip())
    # a real header row is marked tblHeader or shaded; bold alone is not
    if allbold and not hdr and not shaded:
        print('   @%-8d %r' % (off, ' | '.join(''.join(TXT.findall(c))[:26] for c in c0)))
