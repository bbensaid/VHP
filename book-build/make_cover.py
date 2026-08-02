#!/usr/bin/env python3
"""
make_cover.py — generate the cover diagram: the six pillars in a ring, each with
its diagnostic question and structural role.

WHY THIS EXISTS
---------------
The previous book-build/cover.png was an AI-generated image (NotebookLM
watermark, bottom right) that could not be corrected because it was raster art,
not data. It carried real errors:

  * Technology and Economics were given the SAME description ("Determines
    whether organizations have a financial reason to behave differently") —
    that is Economics' role; Technology is the data substrate.
  * "Is it effective?" was labelled the cross-cutting accountability lens.
    That is Equity's role ("Is it just?"), and Equity said it too.
  * Garbled words rendered into the art: "Paymecial logic", "cliurrertity lens",
    "Requiree statdory deadlines", "Constrains with jublos revisions",
    "clinical measurement,, and clinical".

Every label below is taken from the book's own six-pillar table (the
"Diagnostic question" and "Structural role" columns, HTR_Book_v42.md), so the
cover cannot drift from the text it illustrates.

Rendering follows make_dependency_diagram.py: draw at 3x and downsample with
LANCZOS, save at 300 DPI, so type stays crisp in print.

    python3 book-build/make_cover.py
"""
from PIL import Image, ImageDraw, ImageFont
import math, os, textwrap

SCALE = 3
W, H = 1500 * SCALE, 830 * SCALE
NAVY = (27, 58, 107)
INK = (34, 34, 34)
GREY = (95, 105, 120)
RING = (196, 208, 224)

img = Image.new('RGB', (W, H), 'white')
d = ImageDraw.Draw(img)


def font(sz, bold=False):
    """Match the book's type: Garamond-family serif, falling back gracefully."""
    names = ([
        '/System/Library/Fonts/Supplemental/GaramondPremrPro-Smbd.otf',
        '/System/Library/Fonts/Supplemental/Georgia Bold.ttf',
        '/Library/Fonts/Georgia Bold.ttf',
        '/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf',
    ] if bold else [
        '/System/Library/Fonts/Supplemental/GaramondPremrPro.otf',
        '/System/Library/Fonts/Supplemental/Georgia.ttf',
        '/Library/Fonts/Georgia.ttf',
        '/System/Library/Fonts/Supplemental/Times New Roman.ttf',
    ])
    for n in names:
        if os.path.exists(n):
            try:
                return ImageFont.truetype(n, sz * SCALE)
            except Exception:
                pass
    return ImageFont.load_default()


# ── the six pillars, verbatim from the book's six-pillar table ───────────────
# (pillar, diagnostic question, structural role — condensed from the same row)
PILLARS = [
    ("POLICY", "Is it permissible?", "The mandatory architecture. Converts "
     "aspirational reform into binding requirements. Without mandatory "
     "authority, the highest-cost actors opt out."),
    ("TECHNOLOGY", "Is it possible?", "The data substrate. Makes population "
     "health management, VBC execution, equity measurement, and strategic "
     "planning analytically feasible."),
    ("ECONOMICS", "Is it sustainable?", "The incentive architecture. Payment "
     "reform does not change clinical behavior directly — it changes the "
     "financial logic that shapes clinical decisions over time."),
    ("CLINICAL", "Is it effective?", "The mechanism of change. Payment reform "
     "changes incentives; clinical redesign changes behavior and delivers the "
     "utilization reduction that produces savings."),
    ("EQUITY", "Is it just?", "The cross-cutting constraint and accountability "
     "lens. Not a separate program — a dimension applied to every decision in "
     "every other pillar."),
    ("OPERATIONS", "Is it executable?", "The execution layer. Translates "
     "statutory mandates, payment models, data platforms, and clinical "
     "programs into organizational reality."),
]

CX, CY = W // 2, int(H * 0.50)
RING_R = int(min(W, H) * 0.255)
NODE_R = int(min(W, H) * 0.088)

# faint guide ring the pillars sit on
d.ellipse([CX - RING_R, CY - RING_R, CX + RING_R, CY + RING_R],
          outline=RING, width=2 * SCALE)

# positions, clockwise from top
pos = {}
for i, (name, _, _) in enumerate(PILLARS):
    a = -math.pi / 2 + i * (2 * math.pi / 6)
    pos[name] = (CX + RING_R * math.cos(a), CY + RING_R * math.sin(a))


def arrow(x1, y1, x2, y2, color, width, head=13):
    d.line([x1, y1, x2, y2], fill=color, width=width)
    ang = math.atan2(y2 - y1, x2 - x1)
    h = head * SCALE
    d.polygon([
        (x2, y2),
        (x2 - h * math.cos(ang - 0.42), y2 - h * math.sin(ang - 0.42)),
        (x2 - h * math.cos(ang + 0.42), y2 - h * math.sin(ang + 0.42)),
    ], fill=color)


# sequence arrows around the ring: Policy -> Technology -> ... -> Operations
for i in range(len(PILLARS)):
    a_name = PILLARS[i][0]
    b_name = PILLARS[(i + 1) % len(PILLARS)][0]
    ax, ay = pos[a_name]
    bx, by = pos[b_name]
    ang = math.atan2(by - ay, bx - ax)
    gap = NODE_R + 10 * SCALE
    arrow(ax + gap * math.cos(ang), ay + gap * math.sin(ang),
          bx - gap * math.cos(ang), by - gap * math.sin(ang),
          RING, 3 * SCALE)

# ── nodes ────────────────────────────────────────────────────────────────────
f_node = font(15, bold=True)
f_name = font(12, bold=True)
f_q = font(11, bold=True)
f_body = font(11)

for name, q, role in PILLARS:
    x, y = pos[name]
    d.ellipse([x - NODE_R, y - NODE_R, x + NODE_R, y + NODE_R],
              fill='white', outline=NAVY, width=3 * SCALE)
    tb = d.textbbox((0, 0), name, font=f_node)
    d.text((x - (tb[2] - tb[0]) / 2, y - (tb[3] - tb[1]) / 2 - tb[1]),
           name, font=f_node, fill=NAVY)

# ── callout text blocks, outside the ring ────────────────────────────────────
# Anchoring each block at its node's y crowds the two lower pillars on each
# side, whose nodes sit close together. Instead, split the pillars into a left
# and a right column and distribute each column's blocks evenly down the page,
# then run a connector across to the node it belongs to.
COL_W = int(W * 0.235)
WRAP = 42
LINE_H = int(15 * SCALE)

# Split 3/3 by name rather than by x. Policy sits at the top of the ring and
# Clinical at the bottom, so both are near the centre line; a purely
# geometric split puts four blocks in one column and two in the other.
LEFT_NAMES = {"POLICY", "OPERATIONS", "EQUITY"}
left_col = [p for p in PILLARS if p[0] in LEFT_NAMES]
right_col = [p for p in PILLARS if p[0] not in LEFT_NAMES]
# order each column top-to-bottom by node position
left_col.sort(key=lambda p: pos[p[0]][1])
right_col.sort(key=lambda p: pos[p[0]][1])

for col, items in (('L', left_col), ('R', right_col)):
    # measure so the column can be centred vertically as a group
    heights = [int(17 * SCALE) + int(19 * SCALE)
               + len(textwrap.wrap(r, width=WRAP)) * LINE_H
               for _, _, r in items]
    gap = int(30 * SCALE)
    total = sum(heights) + gap * (len(items) - 1)
    ty = int(CY - total / 2)

    for (name, q, role), h in zip(items, heights):
        tx = int(W * 0.035) if col == 'L' else int(W * 0.965 - COL_W)
        block_mid = ty + h / 2

        # pillar name first — this is what pairs the block to its node
        d.text((tx, ty), name, font=f_name, fill=NAVY)
        yy = ty + int(17 * SCALE)
        d.text((tx, yy), q, font=f_q, fill=GREY)
        yy += int(19 * SCALE)
        for line in textwrap.wrap(role, width=WRAP):
            d.text((tx, yy), line, font=f_body, fill=INK)
            yy += LINE_H

        # No connector line. Earlier versions drew one from each block to its
        # node; with the blocks distributed evenly and the nodes on a ring, the
        # lines to the top and bottom pillars became long diagonals that crossed
        # the figure and added noise. The pillar name appears in bold at the head
        # of each block, so the pairing is already unambiguous.
        _ = block_mid

        ty += h + gap

# ── centre label ─────────────────────────────────────────────────────────────
f_c1 = font(13, bold=True)
f_c2 = font(10)
c1 = "THE EXECUTION SEQUENCE"
tb = d.textbbox((0, 0), c1, font=f_c1)
d.text((CX - (tb[2] - tb[0]) / 2, CY - 12 * SCALE), c1, font=f_c1, fill=NAVY)
c2 = "each pillar gates the next"
tb = d.textbbox((0, 0), c2, font=f_c2)
d.text((CX - (tb[2] - tb[0]) / 2, CY + 8 * SCALE), c2, font=f_c2, fill=GREY)

out = img.resize((W // SCALE, H // SCALE), Image.LANCZOS)
os.makedirs('book-build', exist_ok=True)
out.save('book-build/cover.png', dpi=(300, 300))
print("wrote book-build/cover.png", out.size, "@300dpi")
