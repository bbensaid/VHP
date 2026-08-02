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

# Canvas geometry is driven by how the cover actually lands on the page.
# Usable text width is 6.3in (8.5in page, 1.1in margins). A wide 1.81:1 canvas
# rendered only ~3.1in tall — a short strip with unreadably small type. A near
# square fills the lower half of the page properly: at 6.3in wide it stands
# ~5.7in tall. Drawn at 4x and downsampled, that is ~950 effective DPI.
SCALE = 6
W, H = 1900 * SCALE, 1500 * SCALE
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
RING_R = int(min(W, H) * 0.200)
NODE_R = int(min(W, H) * 0.075)

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
f_node = font(17, bold=True)
f_name = font(14, bold=True)
f_q = font(13, bold=True)
f_body = font(12)

for name, q, role in PILLARS:
    x, y = pos[name]
    d.ellipse([x - NODE_R, y - NODE_R, x + NODE_R, y + NODE_R],
              fill='white', outline=NAVY, width=3 * SCALE)
    tb = d.textbbox((0, 0), name, font=f_node)
    d.text((x - (tb[2] - tb[0]) / 2, y - (tb[3] - tb[1]) / 2 - tb[1]),
           name, font=f_node, fill=NAVY)

# ── callout text blocks, placed radially around the ring ─────────────────────
# On a near-square canvas each block sits just outside its own node, on the same
# radius — so the pairing is positional and needs no connector line. Blocks at
# the top and bottom centre themselves over/under their node; blocks on the
# sides hang off the left or right edge.
WRAP = 30
LINE_H = int(17 * SCALE)
BLOCK_W = int(W * 0.225)

for name, q, role in PILLARS:
    nx, ny = pos[name]
    lines = textwrap.wrap(role, width=WRAP)
    h = int(19 * SCALE) + int(21 * SCALE) + len(lines) * LINE_H

    # Anchor side blocks to the OUTERMOST extent of the whole figure, not to the
    # node centre — the ring reaches further out than any single node, so
    # measuring from the node let text overlap the circles on the right.
    outer = RING_R + NODE_R
    near_centre_x = abs(nx - CX) < NODE_R          # true only for top & bottom
    if near_centre_x and ny < CY:                  # top of ring (Policy)
        tx = int(nx - BLOCK_W / 2)
        ty = int(ny - NODE_R - h - 26 * SCALE)
    elif near_centre_x:                            # bottom of ring (Clinical)
        tx = int(nx - BLOCK_W / 2)
        ty = int(ny + NODE_R + 26 * SCALE)
    elif nx < CX:                                  # left side
        tx = int(CX - outer - BLOCK_W - 26 * SCALE)
        ty = int(ny - h / 2)
    else:                                          # right side
        tx = int(CX + outer + 26 * SCALE)
        ty = int(ny - h / 2)

    tx = max(int(W * 0.022), min(tx, int(W * 0.978 - BLOCK_W)))
    ty = max(int(H * 0.020), min(ty, int(H * 0.980 - h)))

    d.text((tx, ty), name, font=f_name, fill=NAVY)
    yy = ty + int(19 * SCALE)
    d.text((tx, yy), q, font=f_q, fill=GREY)
    yy += int(21 * SCALE)
    for line in lines:
        d.text((tx, yy), line, font=f_body, fill=INK)
        yy += LINE_H

# ── centre label ─────────────────────────────────────────────────────────────
f_c1 = font(13, bold=True)
f_c2 = font(10)
c1 = "THE EXECUTION SEQUENCE"
tb = d.textbbox((0, 0), c1, font=f_c1)
d.text((CX - (tb[2] - tb[0]) / 2, CY - 12 * SCALE), c1, font=f_c1, fill=NAVY)
c2 = "each pillar gates the next"
tb = d.textbbox((0, 0), c2, font=f_c2)
d.text((CX - (tb[2] - tb[0]) / 2, CY + 8 * SCALE), c2, font=f_c2, fill=GREY)

# Trim to the drawn content, then re-pad evenly. Placement is computed from the
# ring, so the used area is rarely centred in the canvas and leaves uneven dead
# margins — which on the page reads as the figure being small and off-centre.
bbox = Image.new('RGB', img.size, 'white')
from PIL import ImageChops
diff = ImageChops.difference(img, bbox)
box = diff.getbbox()
if box:
    pad = 26 * SCALE
    box = (max(0, box[0] - pad), max(0, box[1] - pad),
           min(W, box[2] + pad), min(H, box[3] + pad))
    img = img.crop(box)

cw, ch = img.size
out = img.resize((int(cw / 3.6), int(ch / 3.6)), Image.LANCZOS)
os.makedirs('book-build', exist_ok=True)
out.save('book-build/cover.png', dpi=(300, 300))
print("wrote book-build/cover.png", out.size, "@300dpi")
