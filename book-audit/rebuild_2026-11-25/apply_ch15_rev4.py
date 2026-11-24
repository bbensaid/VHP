# -*- coding: utf-8 -*-
"""Replace Chapter 15 of HTR_Book_v42.docx with the rev-4 rebuild (UHDS as the spine).

Source text: book-audit/rebuild_2026-11-25/ch15_new.md
Templates for headings, body, captions, callouts, Key Concepts and Sources are
copied from the chapter's own existing paragraphs at run time; tables are built
with book-build/docx_build (never hand-written).

Also: replaces the eleven Chapter 15 entries in the List of Figures with the new
captions, and fixes Chapter 12's cross-reference to the old "Transformation PMO".

    python3 book-audit/rebuild_2026-11-25/apply_ch15_rev4.py --dry   # build + validate only
    python3 book-audit/rebuild_2026-11-25/apply_ch15_rev4.py         # apply via patch_docx (backs up)
"""
import os, re, sys, zipfile, html
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P
from docx_build import run, para, cell, row, table, NAVY, NAVY_INK, INK, TEAL, TEAL_INK

MD = os.path.join(REPO, 'book-audit/rebuild_2026-11-25/ch15_new.md')
TXT = re.compile(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', re.S)
T = lambda it: ''.join(TXT.findall(it))
def smart(s):
    s = re.sub(r'(^|[\s(\[—–-])"', lambda m: m.group(1) + '\u201c', s)
    s = s.replace('"', '\u201d')
    s = re.sub(r"(^|[\s(\[—–-])'", lambda m: m.group(1) + '\u2018', s)
    return s.replace("'", '\u2019')


esc = lambda s: html.escape(smart(s), quote=False)


def items_of(seg):
    return re.findall(r'<w:tbl>.*?</w:tbl>|<w:p[ >].*?</w:p>', seg, re.S)


def templates(x):
    a, b = P._chapter_span(x, 'Chapter 15')
    it = items_of(x[a:b])
    find = lambda pred: next(i for i in it if pred(i))
    tp = {}
    tp['h1'] = it[0]
    tp['lead'] = it[1]
    tp['h2'] = find(lambda i: 'Heading2' in i and T(i).startswith('15.1 '))
    tp['body'] = find(lambda i: 'w:sz w:val="21"' in i and 'Garamond' in i and 'w:color w:val="1a1a1a"' in i
                      and 'w:pBdr><w:top w:space="0"' in i and 'w:after="120" w:before="0"' in i)
    tp['cap'] = find(lambda i: T(i).startswith('Figure 15.1 '))
    tp['beyond'] = find(lambda i: i.startswith('<w:tbl') and T(i).startswith('BEYOND VERMONT'))
    tp['spacer'] = find(lambda i: not T(i) and 'w:sz w:val="16"' in i and i.startswith('<w:p'))
    tp['kc'] = find(lambda i: T(i).startswith('Portfolio · Portfolio Manager'))
    tp['src'] = find(lambda i: T(i).startswith('Sources: PMI Standard'))
    # Heading3 from Chapter 16 (Chapter 15 has none)
    a16, b16 = P._chapter_span(x, 'Chapter 16')
    tp['h3'] = next(i for i in items_of(x[a16:b16]) if 'Heading3' in i)
    return tp, (a, b)


def ppr(p):
    return re.search(r'<w:pPr>.*?</w:pPr>', p, re.S).group(0)


def first_rpr(p):
    """rPr of the first text-bearing run."""
    for r in re.findall(r'<w:r [^>]*>(.*?)</w:r>', p, re.S):
        if '<w:t' in r:
            return re.search(r'<w:rPr>(.*?)</w:rPr>', r, re.S).group(1)
    raise SystemExit('template has no text run')


P_OPEN = ('<w:p w:rsidR="00000000" w:rsidDel="00000000" w:rsidP="00000000" '
          'w:rsidRDefault="00000000" w:rsidRPr="00000000">')
R_OPEN = '<w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000">'


def mk_run(rpr, text, bold=None, italic=None):
    if bold is not None:
        rpr = re.sub(r'<w:b w:val="[01]"/><w:bCs w:val="[01]"/>', '', rpr)
        if bold:
            rpr = '<w:b w:val="1"/><w:bCs w:val="1"/>' + rpr
    if italic is not None:
        rpr = re.sub(r'<w:i w:val="[01]"/><w:iCs w:val="[01]"/>', '', rpr)
        if italic:
            rpr = '<w:i w:val="1"/><w:iCs w:val="1"/>' + rpr
    if '<w:rtl' not in rpr:
        rpr += '<w:rtl w:val="0"/>'
    return '%s<w:rPr>%s</w:rPr><w:t xml:space="preserve">%s</w:t></w:r>' % (R_OPEN, rpr, esc(text))


def inline_runs(rpr, text):
    """**bold** spans inside a line -> runs."""
    out = []
    for k, part in enumerate(re.split(r'\*\*', text)):
        if part:
            out.append(mk_run(rpr, part, bold=(k % 2 == 1)))
    return ''.join(out)


def mk_para(tpl, text, inline=True, pfx_ppr=None):
    pp = pfx_ppr or ppr(tpl)
    rpr = first_rpr(tpl)
    body = inline_runs(rpr, text) if inline else mk_run(rpr, text)
    return P_OPEN + pp + body + '</w:p>'


def mk_heading(tpl, num, title):
    pp = ppr(tpl)
    runs = re.findall(r'<w:r [^>]*>.*?</w:r>', tpl, re.S)
    num_rpr = re.search(r'<w:rPr>(.*?)</w:rPr>', runs[0], re.S).group(1)
    ttl_rpr = re.search(r'<w:rPr>(.*?)</w:rPr>', runs[1], re.S).group(1)
    return (P_OPEN + pp + mk_run(num_rpr, num + '  ') + mk_run(ttl_rpr, title) + '</w:p>')


def mk_h1(tpl, title):
    # keep the existing bookmark (TOC hyperlink target), swap the text only
    return P.set_para(tpl, T(tpl)[:40], esc(title)) if False else re.sub(
        r'(<w:t xml:space="preserve">)[^<]*(</w:t>)', lambda m: m.group(1) + esc(title) + m.group(2), tpl, count=1)


def mk_bullet(tpl_body, text):
    pp = ppr(tpl_body).replace('<w:ind w:left="0" w:right="0" w:firstLine="0"/>',
                               '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="8"/></w:numPr>'
                               '<w:ind w:left="720" w:hanging="360"/>')
    assert 'numPr' in pp
    return mk_para(tpl_body, text, pfx_ppr=pp)


def mk_numbered(tpl_body, n, text):
    pp = ppr(tpl_body).replace('<w:ind w:left="0" w:right="0" w:firstLine="0"/>',
                               '<w:ind w:left="720" w:hanging="360"/>')
    return mk_para(tpl_body, '**%s.** ' % n + text, pfx_ppr=pp)


def mk_beyond(tpl, text):
    title, body = text.split(' — ', 1)
    title = title.replace('**', '').strip()
    paras = re.findall(r'<w:p [^>]*>.*?</w:p>', tpl, re.S)
    t_p = re.sub(r'(<w:t xml:space="preserve">)[^<]*(</w:t>)',
                 lambda m: m.group(1) + esc(title) + m.group(2), paras[0], count=1)
    b_p = re.sub(r'(<w:t xml:space="preserve">)[^<]*(</w:t>)',
                 lambda m: m.group(1) + esc(body) + m.group(2), paras[1], count=1)
    return tpl.replace(paras[0], t_p).replace(paras[1], b_p)


def widths(head, body):
    n = len(head)
    w = []
    for c in range(n):
        lens = [len(head[c])] + [len(r[c]) for r in body]
        w.append(max(8, sum(lens) / len(lens)) ** 0.8)
    tot = sum(w)
    cols = [int(9075 * v / tot) for v in w]
    cols[-1] += 9075 - sum(cols)
    return cols


def mk_table(head, body):
    sz = 17 if len(head) >= 4 else 18
    hdr = row([cell(para(run(esc(h), bold=True, color=NAVY_INK, sz=sz), sz=sz, after=40), fill=NAVY)
               for h in head], header=True)
    rows = [hdr]
    for r in body:
        cs = []
        for k, v in enumerate(r):
            rs = []
            for j, part in enumerate(re.split(r'\*\*', v)):
                if part:
                    rs.append(run(esc(part), bold=(k == 0 or j % 2 == 1), color=INK, sz=sz))
            cs.append(cell(para(''.join(rs) or run('', color=INK, sz=sz), sz=sz, after=40)))
        rows.append(row(cs))
    return table(widths(head, body), rows)


def build_chapter(tp, md):
    lines = md.split('\n')
    out = []
    i = 0
    while i < len(lines):
        l = lines[i].rstrip()
        if not l:
            i += 1; continue
        if l.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                rows.append(lines[i]); i += 1
            cells = [r.strip().strip('|').split('|') for r in rows if not re.match(r'^\|[\s:|-]+\|$', r.strip())]
            cells = [[c.strip() for c in r] for r in cells]
            out.append(mk_table(cells[0], cells[1:]))
            continue
        m = re.match(r'^# (.*)', l)
        if m:
            out.append(mk_h1(tp['h1'], m.group(1).replace('**', '')))
        elif re.match(r'^## ', l):
            num, title = re.match(r'^## ([\d.]+) \*\*(.*)\*\*$', l).groups()
            out.append(mk_heading(tp['h2'], num, title))
        elif re.match(r'^### ', l):
            num, title = re.match(r'^### ([\d.]+) \*\*(.*)\*\*$', l).groups()
            out.append(mk_heading(tp['h3'], num, title))
        elif l.startswith('> **BEYOND VERMONT**'):
            out.append(mk_beyond(tp['beyond'], l[2:]))
            out.append(tp['spacer'])
        elif re.match(r'^> \*(.*)\*$', l):
            out.append(mk_para(tp['lead'], re.match(r'^> \*(.*)\*$', l).group(1), inline=False))
        elif l.startswith('- '):
            out.append(mk_bullet(tp['body'], l[2:]))
        elif re.match(r'^\d+\. ', l):
            n, t = re.match(r'^(\d+)\. (.*)', l).groups()
            out.append(mk_numbered(tp['body'], n, t))
        elif l.startswith('*Figure '):
            out.append(mk_para(tp['cap'], l.strip('*'), inline=False))
        elif l.startswith('*Sources: '):
            out.append(mk_para(tp['src'], l.strip('*'), inline=False))
        elif re.match(r'^\*.*\*$', l):
            raise SystemExit('unhandled italic line: %r' % l[:80])
        else:
            prev = lines[i - 2] if i >= 2 else ''
            if 'Key Concepts in This Chapter' in (lines[i - 2] if i >= 2 else ''):
                out.append(mk_para(tp['kc'], l, inline=False))
            else:
                out.append(mk_para(tp['body'], l))
        i += 1
    return ''.join(out)


NEW_CAPS = [l.strip('*') for l in open(MD, encoding='utf8').read().split('\n') if l.startswith('*Figure 15.')]

CH12_OLD = 'The Transformation PMO described in Chapter 15 is the operational spine of Vermont’s transformation program.'
CH12_NEW = ('The UHDS program office and the decision-rights charter described in Chapter 15 are the operational '
            'spine of Vermont’s transformation program.')


def my_apply(x, _edits):
    tp, (a, b) = templates(x)
    md = open(MD, encoding='utf8').read()
    new_ch = build_chapter(tp, md)
    old_n = len(items_of(x[a:b]))
    x = x[:a] + new_ch + x[b:]
    print('  ok: chapter 15 replaced (%d old blocks -> %d new blocks)' % (old_n, len(items_of(new_ch))))

    # List of Figures: the remaining (now unique) old Chapter 15 entries
    lof = []
    for m in re.finditer(r'<w:p [^>]*>(?:(?!</w:p>).)*?</w:p>', x, re.S):
        t = T(m.group(0))
        if re.match(r'^Figure 15\.\d+ — ', t) and m.start() > a + len(new_ch):
            lof.append((m.start(), m.end(), t))
    if len(lof) != 11:
        raise SystemExit('expected 11 old LoF entries for Ch15, found %d: %r' % (len(lof), [t[:40] for _, _, t in lof]))
    tpl = x[lof[0][0]:lof[0][1]]
    seps = [x[lof[k][1]:lof[k + 1][0]] for k in range(10)]
    sep = seps[0]
    assert all(s == sep for s in seps), 'LoF entries are not contiguous'
    new_lof = sep.join(mk_para(tpl, c, inline=False) for c in NEW_CAPS)
    x = x[:lof[0][0]] + new_lof + x[lof[-1][1]:]
    print('  ok: List of Figures: 11 old Ch15 entries -> %d new' % len(NEW_CAPS))

    if x.count(CH12_OLD) != 1:
        raise SystemExit('Ch12 cross-ref anchor count %d' % x.count(CH12_OLD))
    x = x.replace(CH12_OLD, CH12_NEW)
    print('  ok: Ch12 cross-reference to Chapter 15 updated')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        x = zipfile.ZipFile(P.DOCX).read('word/document.xml').decode('utf8')
        y = my_apply(x, None)
        import xml.dom.minidom
        xml.dom.minidom.parseString(y.encode('utf8'))
        a, b = P._chapter_span(y, 'Chapter 15')
        for it in items_of(y[a:b]):
            kind = 'TBL' if it.startswith('<w:tbl') else (re.search(r'w:pStyle w:val="(\w+)"', it) or [None, '-'])[1]
            print('   ', kind, T(it)[:100])
        print('DRY OK, len', len(x), '->', len(y))
    else:
        P.apply = my_apply
        P.main([{'op': 'noop'}])
