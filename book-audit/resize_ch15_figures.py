"""Swap re-rendered Ch15 figure PNGs into HTR_Book_v42.docx and fix their extents.
Run: python3 book-audit/resize_ch15_figures.py"""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P
W = 5669280
FIGS = [('Figure 15.7 risk map', 'word/media/image2.png', 'book-audit/figure_15_7_risk_map.png'),
        ('Figure 15.10 roadmap Gantt', 'word/media/image3.png', 'book-audit/figure_15_10_gantt.png')]


def png_size(p):
    h = open(p, 'rb').read(24)
    return int.from_bytes(h[16:20], 'big'), int.from_bytes(h[20:24], 'big')


def my_apply(x, _):
    for name, media, png in FIGS:
        i = x.find('name="%s"' % name)
        assert i != -1 and x.count('name="%s"' % name) == 1, name
        a = x.rfind('<w:drawing>', 0, i); b = x.find('</w:drawing>', i)
        w, h = png_size(os.path.join(REPO, png))
        cy = int(round(W * h / w))
        seg, n = re.subn(r'cx="\d+" cy="\d+"', 'cx="%d" cy="%d"' % (W, cy), x[a:b])
        assert n == 2, (name, n)
        x = x[:a] + seg + x[b:]
        print('  %s: %dx%d px -> %.2f x %.2f in' % (name, w, h, W / 914400, cy / 914400))
    return x


P.apply = my_apply
P.main([{'op': 'noop'}], {m: os.path.join(REPO, p) for _, m, p in FIGS})
