#!/usr/bin/env python3
"""
make_cover.py — the cover diagram: six pillars in a ring, drawn from the book.

EDITABLE. Everything shown is data in this file (PILLARS, SEQ_LABEL) and is
verified against HTR_Book_v42.md by book-build/verify_cover.py. Change a label
here, re-run, and the cover updates — no image editing, no re-drawing.

WHY THE ARROWS ARE MOSTLY UNLABELLED
------------------------------------
The ring shows the EXECUTION SEQUENCE (the order the pillars must be built).
Figure 1.3 shows DEPENDENCIES, which is a different relation. Two of the six
ring edges — Policy→Technology and Equity→Operations — are NOT dependencies in
Figure 1.3 at all. Labelling every ring arrow with a dependency verb, as the
previous cover art did, states relationships the book does not claim.

So: all six arrows show sequence; only the four edges that ARE dependencies in
Figure 1.3 carry their verb and payload, quoted exactly.

    python3 book-build/make_cover.py
"""
from PIL import Image, ImageDraw, ImageFont
import math
import os
import textwrap

# ── render scale ────────────────────────────────────────────────────────────
# Draw large, downsample once. The cover is placed 6.30in wide on the page, so
# the output must clear 300 DPI: 6.30 x 400 = 2520px. (A previous version
# divided the canvas back down by SCALE and shipped 154 DPI, which printed
# fuzzy.)
SCALE = 4
TARGET_W = 2520
W, H = 1560 * SCALE, 1150 * SCALE

NAVY = (27, 58, 107)
INK = (26, 26, 26)
GREY = (104, 112, 124)
RING = (176, 192, 214)
FAINT = (222, 230, 241)

# ── content: verbatim from the book's six-pillar table ──────────────────────
# (name, diagnostic question, structural role)
PILLARS = [
    ("POLICY", "Is it permissible?",
     "The mandatory architecture. Converts aspirational reform into binding "
     "requirements. Without mandatory authority, the highest-cost actors opt out."),
    ("TECHNOLOGY", "Is it possible?",
     "The data substrate. Makes population health management, VBC contract "
     "execution, equity measurement, and strategic planning analytically feasible."),
    ("ECONOMICS", "Is it sustainable?",
     "The incentive architecture. Determines whether organizations have a "
     "financial reason to behave differently. Payment reform does not change "
     "clinical behavior directly — it changes the financial logic that shapes "
     "clinical decisions over time."),
    ("CLINICAL", "Is it effective?",
     "The mechanism of change. Payment reform changes incentives; clinical "
     "redesign changes behavior and delivers the utilization reduction that "
     "produces savings."),
    ("EQUITY", "Is it just?",
     "The cross-cutting constraint and accountability lens. Not a separate "
     "program — a dimension applied to every decision in every other pillar."),
    ("OPERATIONS", "Is it executable?",
     "The execution layer. Translates statutory mandates, payment models, data "
     "platforms, and clinical programs into organizational reality."),
]

# Ring edges that ARE dependencies in Figure 1.3 — verb and payload verbatim.
# The two omitted edges (Policy→Technology, Equity→Operations) are sequence
# steps, not dependencies; see the module docstring.
SEQ_LABEL = {
    ("TECHNOLOGY", "ECONOMICS"): ("ENABLES", "VBC financial management"),
    ("ECONOMICS", "CLINICAL"): ("DRIVES", "financial rationality"),
    ("CLINICAL", "EQUITY"): ("ENABLES", "access expansion"),
    ("OPERATIONS", "POLICY"): ("ENABLES", "data feedback loops"),
}
VERB_COLOR = {"ENABLES": (176, 106, 12), "DRIVES": (52, 70, 168),
              "REQUIRES": (24, 104, 90), "CONSTRAINS": (150, 40, 70)}

img = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(img)


def font(sz, bold=False):
    for n in (["/System/Library/Fonts/Supplemental/Arial Bold.ttf"] if bold
              else ["/System/Library/Fonts/Supplemental/Arial.ttf"]) + \
             ["/System/Library/Fonts/Helvetica.ttc"]:
        if os.path.exists(n):
            try:
                return ImageFont.truetype(n, sz * SCALE)
            except Exception:
                pass
    return ImageFont.load_default()


f_node = font(15, bold=True)
f_name = font(11, bold=True)
f_q = font(10, bold=True)
f_body = font(10)
f_edge = font(8, bold=True)
f_edge2 = font(8)
f_ctr = font(12, bold=True)
f_ctr2 = font(9)

CX, CY = W // 2, int(H * 0.50)
RING_R = int(min(W, H) * 0.250)
NODE_R = int(min(W, H) * 0.090)

pos = {}
for i, (name, _, _) in enumerate(PILLARS):
    a = -math.pi / 2 + i * (2 * math.pi / 6)
    pos[name] = (CX + RING_R * math.cos(a), CY + RING_R * math.sin(a))

# guide ring
d.ellipse([CX - RING_R, CY - RING_R, CX + RING_R, CY + RING_R],
          outline=FAINT, width=2 * SCALE)


def arrow(x1, y1, x2, y2, color, width, head=12):
    d.line([x1, y1, x2, y2], fill=color, width=width)
    ang = math.atan2(y2 - y1, x2 - x1)
    h = head * SCALE
    d.polygon([(x2, y2),
               (x2 - h * math.cos(ang - .40), y2 - h * math.sin(ang - .40)),
               (x2 - h * math.cos(ang + .40), y2 - h * math.sin(ang + .40))],
              fill=color)


def centre(txt, fnt, cx, y, fill):
    tb = d.textbbox((0, 0), txt, font=fnt)
    d.text((cx - (tb[2] - tb[0]) / 2, y), txt, font=fnt, fill=fill)


# ── sequence arrows, with labels only where Figure 1.3 has a dependency ─────
for i in range(6):
    a_name = PILLARS[i][0]
    b_name = PILLARS[(i + 1) % 6][0]
    ax, ay = pos[a_name]
    bx, by = pos[b_name]
    ang = math.atan2(by - ay, bx - ax)
    gap = NODE_R + 12 * SCALE
    sx, sy = ax + gap * math.cos(ang), ay + gap * math.sin(ang)
    ex, ey = bx - gap * math.cos(ang), by - gap * math.sin(ang)

    lab = SEQ_LABEL.get((a_name, b_name))
    arrow(sx, sy, ex, ey, RING if lab else FAINT, 4 * SCALE)
    if not lab:
        continue

    verb, payload = lab
    mx, my = (sx + ex) / 2, (sy + ey) / 2
    # push the label outward, away from the ring centre
    ux, uy = mx - CX, my - CY
    n = math.hypot(ux, uy) or 1
    lx, ly = mx + ux / n * 30 * SCALE, my + uy / n * 30 * SCALE
    centre(verb, f_edge, lx, ly - 11 * SCALE, VERB_COLOR[verb])
    centre(payload, f_edge2, lx, ly + 1 * SCALE, GREY)

# ── nodes ───────────────────────────────────────────────────────────────────
for name, q, role in PILLARS:
    x, y = pos[name]
    d.ellipse([x - NODE_R, y - NODE_R, x + NODE_R, y + NODE_R],
              fill="white", outline=NAVY, width=3 * SCALE)
    tb = d.textbbox((0, 0), name, font=f_node)
    d.text((x - (tb[2] - tb[0]) / 2, y - (tb[3] - tb[1]) / 2 - tb[1]),
           name, font=f_node, fill=NAVY)

# ── outer callouts: pillar name, question, structural role ──────────────────
WRAP = 34
LINE_H = int(14 * SCALE)
BLOCK_W = int(W * 0.235)

for name, q, role in PILLARS:
    nx, ny = pos[name]
    lines = textwrap.wrap(role, width=WRAP)
    h = int(16 * SCALE) + int(17 * SCALE) + len(lines) * LINE_H
    outer = RING_R + NODE_R
    near_cx = abs(nx - CX) < NODE_R          # top and bottom of the ring
    if near_cx and ny < CY:
        tx, ty = int(nx - BLOCK_W / 2), int(ny - NODE_R - h - 26 * SCALE)
    elif near_cx:
        tx, ty = int(nx - BLOCK_W / 2), int(ny + NODE_R + 26 * SCALE)
    elif nx < CX:
        tx, ty = int(CX - outer - BLOCK_W - 30 * SCALE), int(ny - h / 2)
    else:
        tx, ty = int(CX + outer + 30 * SCALE), int(ny - h / 2)
    tx = max(int(W * 0.018), min(tx, int(W * 0.982 - BLOCK_W)))
    ty = max(int(H * 0.015), min(ty, int(H * 0.985 - h)))

    d.text((tx, ty), name, font=f_name, fill=NAVY)
    yy = ty + int(16 * SCALE)
    d.text((tx, yy), q, font=f_q, fill=GREY)
    yy += int(17 * SCALE)
    for ln in lines:
        d.text((tx, yy), ln, font=f_body, fill=INK)
        yy += LINE_H

# ── centre label ────────────────────────────────────────────────────────────
centre("THE EXECUTION SEQUENCE", f_ctr, CX, CY - 14 * SCALE, NAVY)
centre("each pillar gates the next", f_ctr2, CX, CY + 4 * SCALE, GREY)

# ── crop to drawn content, pad evenly, then downsample once ─────────────────
from PIL import ImageChops
diff = ImageChops.difference(img, Image.new("RGB", img.size, "white"))
box = diff.getbbox()
if box:
    pad = 24 * SCALE
    img = img.crop((max(0, box[0] - pad), max(0, box[1] - pad),
                    min(W, box[2] + pad), min(H, box[3] + pad)))

cw, ch = img.size
out = img.resize((TARGET_W, int(ch * TARGET_W / cw)), Image.LANCZOS)
out = out.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.NONE)
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cover.png")
out.save(OUT, optimize=True, dpi=(300, 300))
print(f"wrote {OUT} {out.size}  "
      f"({out.size[0]/6.30:.0f} DPI at 6.30in, {os.path.getsize(OUT):,} bytes)")
