#!/usr/bin/env python3
"""
Figure 1.4 companion graphic: five parallel failure cascades, one per pillar.

Content is taken VERBATIM-derived (condensed, no new claims) from the Figure 1.4
table in HTR_Book_v42.docx: columns Pillar removed / Immediate failure /
Second-order failure / System-level outcome.

Pillow, supersampled 3x, white background. Palette from book-build/docx_build.py.
"""
from PIL import Image, ImageDraw, ImageFont
import os

SCALE = 3
W, H = 1700 * SCALE, 1055 * SCALE

# ── palette (book-build/docx_build.py) ───────────────────────────────────────
NAVY      = (0x1b, 0x3a, 0x6b)
INK       = (0x11, 0x11, 0x11)
PALE      = (0xed, 0xf2, 0xf9)   # framework box fill
PALE_EDGE = (0xc9, 0xd2, 0xdd)   # table border grey
BAND      = (0xe8, 0xf0, 0xfb)   # stat strip
AMBER     = (0xff, 0xf6, 0xe5)
AMBER_INK = (0x8a, 0x5a, 0x00)
GREY_INK  = (0x2c, 0x3e, 0x55)
MUTED     = (0x55, 0x55, 0x55)   # caption grey used in the manuscript

def font(sz, bold=False):
    base = '/System/Library/Fonts/Supplemental/'
    name = 'Arial Bold.ttf' if bold else 'Arial.ttf'
    for p in (base + name, '/Library/Fonts/' + name):
        try:
            return ImageFont.truetype(p, sz * SCALE)
        except Exception:
            pass
    return ImageFont.load_default()

F_TITLE  = font(21, bold=True)
F_SUB    = font(13)
F_HEAD   = font(13, bold=True)
F_PILLAR = font(16, bold=True)
F_BODY   = font(12)
F_FOOT   = font(11)
F_OUT    = font(14, bold=True)

# ── content, condensed from the live table ───────────────────────────────────
ROWS = [
    ("POLICY",
     "Payment reform stays voluntary;\nhighest-cost actors opt out;\nrate benchmarks unenforced.",
     "Clinical runs without aligned\nfinancial incentives; technology\nbuilt but not used to manage cost.",
     "Incremental gains among the\nwilling; no system-level change;\npremium inflation continues."),
    ("TECHNOLOGY",
     "VBC contracts signed but not\nmanaged; attribution errors\nundetected; TCOC unreliable.",
     "Economics contracts produce\nunexpected losses; Clinical cannot\nfind high-risk patients in time.",
     "Providers exit VBC; payment\nreform stalls; equity gaps\nwiden invisibly."),
    ("ECONOMICS",
     "Clinical continues under\nfee-for-service; hospitals still\nrewarded for volume, not value.",
     "Primary care produces outcomes\nbut cannot capture the return —\nthe 5.8:1 ROI accrues to payers.",
     "Quality improves at the margin;\ncosts keep rising; the financial\ncase cannot be made."),
    ("CLINICAL",
     "Payment reform has nothing to\nincentivize; global budgets create\npressure without cost-reducing programs.",
     "Operations absorbs the pressure\nthrough service cuts rather than\ncare redesign.",
     "Hospital financial crisis\naccelerates under global budgets;\nrural hospitals close."),
    ("OPERATIONS",
     "Mandates on paper; programs\ndesigned; platforms procured —\nnothing implemented.",
     "Policy accountability fails without\ncapacity; platforms unused;\ncontracts unmanaged.",
     "Transformation documents\naccumulate; deadlines slip;\nthe deficit trajectory continues."),
]
EXAMPLES = [
    "Vermont 2013–2025: OneCare voluntary ACO — modest results; 9 of 14 hospitals in losses by 2023.",
    "Early-CMMI ACO failures: organizations entered models without analytics and produced unexpected losses.",
    "U.S. national experience: 20+ years of quality improvement without payment reform.",
    "Maryland HSCRC early period: global budgets without adequate primary care.",
    "Most state reform efforts of the 2010s: correct policy, adequate financing — capacity insufficient.",
]

img = Image.new('RGB', (W, H), 'white')
d = ImageDraw.Draw(img)

def S(v):
    return int(v * SCALE)

def text(xy, s, f, fill=INK, anchor=None, spacing=None, align='left'):
    d.multiline_text(xy, s, font=f, fill=fill, anchor=anchor, align=align,
                     spacing=(spacing if spacing is not None else S(5)))

def box(x0, y0, x1, y1, fill, edge, w=1):
    d.rounded_rectangle([x0, y0, x1, y1], radius=S(5), fill=fill,
                        outline=edge, width=S(w))

def arrow(x0, y, x1, color=NAVY, w=2):
    d.line([(x0, y), (x1 - S(7), y)], fill=color, width=S(w))
    d.polygon([(x1, y), (x1 - S(9), y - S(5)), (x1 - S(9), y + S(5))], fill=color)

# ── layout metrics ───────────────────────────────────────────────────────────
M      = S(38)
PW     = S(150)          # pillar box width
CW     = S(360)          # cascade box width
GAP    = S(38)
TOP    = S(150)
RH     = S(150)          # row pitch
BH     = S(100)          # box height
X0     = M
X1     = X0 + PW + GAP
X2     = X1 + CW + GAP
X3     = X2 + CW + GAP
XEND   = X3 + CW

# ── title ────────────────────────────────────────────────────────────────────
text((M, S(38)), "The Failure Cascade", F_TITLE, NAVY)
text((M, S(74)),
     "What breaks when each pillar is absent: the immediate failure, its second-order "
     "consequence, and the system-level outcome.",
     F_SUB, MUTED)
d.line([(M, S(108)), (XEND, S(108))], fill=NAVY, width=S(2))

# ── column headers ───────────────────────────────────────────────────────────
HY = TOP - S(30)
for x, w, label in ((X0, PW, "PILLAR REMOVED"), (X1, CW, "IMMEDIATE FAILURE"),
                    (X2, CW, "SECOND-ORDER FAILURE"), (X3, CW, "SYSTEM-LEVEL OUTCOME")):
    text((x + w / 2, HY), label, F_HEAD, GREY_INK, anchor="mm")

# ── rows ─────────────────────────────────────────────────────────────────────
for i, (pillar, c1, c2, c3) in enumerate(ROWS):
    y0 = TOP + i * RH
    y1 = y0 + BH
    mid = (y0 + y1) / 2

    # pillar node — solid navy, white type
    box(X0, y0, X0 + PW, y1, NAVY, NAVY)
    text((X0 + PW / 2, mid - S(9)), pillar, F_PILLAR, 'white', anchor="mm")
    text((X0 + PW / 2, mid + S(14)), "absent", F_FOOT, (0xc6, 0xd6, 0xea), anchor="mm")

    for j, (x, txt, fill, edge) in enumerate((
            (X1, c1, PALE, PALE_EDGE),
            (X2, c2, BAND, PALE_EDGE),
            (X3, c3, AMBER, (0xe2, 0xcd, 0xa4)))):
        box(x, y0, x + CW, y1, fill, edge)
        ink = AMBER_INK if j == 2 else INK
        f = F_OUT if False else F_BODY
        text((x + CW / 2, mid - S(4)), txt, f, ink, anchor="mm", align='center')
        if j < 2:
            arrow(x + CW + S(6), mid, x + CW + GAP - S(6))
    arrow(X0 + PW + S(6), mid, X1 - S(6))

    # historical example, under the row
    text((X1, y1 + S(11)), "Historical example:  " + EXAMPLES[i], F_FOOT, MUTED)

# ── convergence footer ───────────────────────────────────────────────────────
FY = TOP + len(ROWS) * RH + S(14)
d.line([(M, FY), (XEND, FY)], fill=PALE_EDGE, width=S(1))
box(X1, FY + S(20), X3 + CW, FY + S(20) + S(58), NAVY, NAVY)
text(((X1 + X3 + CW) / 2, FY + S(20) + S(29)),
     "Every cascade ends in the same place: transformation that is announced but not delivered.",
     F_OUT, 'white', anchor="mm")
text((M, FY + S(20) + S(66)),
     "Figure 1.4 companion. Sources: HTR analysis; CMMI evaluation literature; "
     "Oliver Wyman Act 167 Report; Vermont experience.",
     F_FOOT, MUTED)

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'figure_1_4_cascade.png')
img = img.resize((W // SCALE * 2, H // SCALE * 2), Image.LANCZOS)  # ~3400px wide
img.save(out, dpi=(300, 300))
print('wrote', out, img.size)
