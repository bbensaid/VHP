# -*- coding: utf-8 -*-
"""Remove Unicode-fallback font overrides from the manuscript (2026-09-21).

FOUND BY RENDERING. In the §2.1 timeline table, the FY2027 row's Significance cell rendered in a
visibly different, larger typeface than every other cell. The size was not the problem — every run
in that table is sz 17. The cell carried an explicit font override:

    <w:rFonts w:ascii="Gungsuh" w:cs="Gungsuh" w:eastAsia="Gungsuh" w:hAnsi="Gungsuh"/>

Gungsuh is a Korean typeface. It is there because the editor applied a fallback font to the WHOLE
RUN when it met a character Garamond was assumed not to have. Every instance confirms the pattern:

  * all 4 Gungsuh runs contain "−" (U+2212 minus) or "≤" (U+2264)
  * all 26 Cardo runs contain "→" (U+2192)

The fallback is unnecessary: §1.4's dependency headings ("Policy → Operations: …") contain the same
arrow, carry NO font override, and render correctly in Garamond. So the override is stripped and the
runs inherit the document font like their neighbours. Per-character fallback, if any is still needed,
is then the renderer's job rather than a whole run in the wrong face.

Calibri (306 runs) and Arial (269 runs) are LEFT ALONE — they are used consistently for stat-card
figures, glossary terms and callout labels, which is design, not fallback.

check_format.py gains a rule in the same change so a new fallback font cannot ship unnoticed.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P

FALLBACK = ('Gungsuh', 'Cardo')


def transform(x):
    removed = 0
    for font in FALLBACK:
        pat = '<w:rFonts w:ascii="%s" w:cs="%s" w:eastAsia="%s" w:hAnsi="%s"/>' % ((font,) * 4)
        n = x.count(pat)
        if n == 0:
            raise SystemExit('expected to find %s overrides, found none' % font)
        x = x.replace(pat, '')
        removed += n
        print('  stripped %-8s x%d' % (font, n))

    for font in FALLBACK:
        if 'w:ascii="%s"' % font in x:
            raise SystemExit('%s survived in another rFonts shape' % font)
    # The fonts that remain must be the three the book actually uses.
    left = set(re.findall(r'w:ascii="([^"]+)"', x))
    unexpected = left - {'Garamond', 'Calibri', 'Arial'}
    if unexpected:
        raise SystemExit('unexpected fonts remain: %s' % sorted(unexpected))
    print('  fonts now in use:', sorted(left))
    return x


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
