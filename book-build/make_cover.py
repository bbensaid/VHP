#!/usr/bin/env python3
"""
make_cover.py — the cover diagram, drawn from the book's own tables.

WHY A MATRIX AND NOT A RING
---------------------------
The book states fifteen directed dependencies. A ring diagram has to route
fifteen curved arrows between six nodes and label each one along its curve;
that is what produced the unreadable, mirrored labels in the original art. A
matrix shows the same fifteen relationships with every label set horizontally
at full size, and it is the form the book itself uses (Figure 1.3: "read each
row as a source pillar and each column as the pillar it acts on").

Every value here is taken verbatim from HTR_Book_v42.md:
  * the fifteen dependencies from the Figure 1.3 matrix
  * each pillar's diagnostic question and structural role from the six-pillar
    table

so the cover cannot drift from the text it illustrates.

    python3 book-build/make_cover.py
"""
from PIL import Image, ImageDraw, ImageFont
import os

SCALE = 4
NAVY = (27, 58, 107)
INK = (26, 26, 26)
GREY = (105, 112, 124)
RULE = (208, 215, 226)
BAND = (243, 246, 251)

# Relationship colours — one per verb, matching the book's four types.
VERB = {
    'ENABLES':    (176, 106, 12),
    'REQUIRES':   (24, 104, 90),
    'DRIVES':     (52, 70, 168),
    'CONSTRAINS': (150, 40, 70),
}

PILLARS = ['POLICY', 'TECHNOLOGY', 'ECONOMICS', 'CLINICAL', 'EQUITY', 'OPERATIONS']

# The diagnostic question for each pillar (six-pillar table).
QUESTION = {
    'POLICY':     'Is it permissible?',
    'TECHNOLOGY': 'Is it possible?',
    'ECONOMICS':  'Is it sustainable?',
    'CLINICAL':   'Is it effective?',
    'EQUITY':     'Is it just?',
    'OPERATIONS': 'Is it executable?',
}

# The structural role, condensed from the same table row.
ROLE = {
    'POLICY':     'The mandatory architecture',
    'TECHNOLOGY': 'The data substrate',
    'ECONOMICS':  'The incentive architecture',
    'CLINICAL':   'The mechanism of change',
    'EQUITY':     'The cross-cutting lens',
    'OPERATIONS': 'The execution layer',
}

# The fifteen directed dependencies, verbatim from the Figure 1.3 matrix.
# (from, to) -> (VERB, what it carries)
DEPS = {
    ('POLICY', 'ECONOMICS'):      ('ENABLES', 'mandatory authority'),
    ('POLICY', 'EQUITY'):         ('ENABLES', 'accountability mandates'),
    ('POLICY', 'OPERATIONS'):     ('REQUIRES', 'statutory deadlines'),
    ('TECHNOLOGY', 'ECONOMICS'):  ('ENABLES', 'VBC financial management'),
    ('TECHNOLOGY', 'CLINICAL'):   ('ENABLES', 'risk stratification'),
    ('TECHNOLOGY', 'EQUITY'):     ('ENABLES', 'demographic stratification'),
    ('ECONOMICS', 'TECHNOLOGY'):  ('REQUIRES', 'data infrastructure'),
    ('ECONOMICS', 'CLINICAL'):    ('DRIVES', 'financial rationality'),
    ('ECONOMICS', 'EQUITY'):      ('REQUIRES', 'social risk adjustment'),
    ('CLINICAL', 'EQUITY'):       ('ENABLES', 'access expansion'),
    ('CLINICAL', 'OPERATIONS'):   ('REQUIRES', 'execution infrastructure'),
    ('EQUITY', 'POLICY'):         ('CONSTRAINS', 'with justice reviews'),
    ('EQUITY', 'CLINICAL'):       ('CONSTRAINS', 'with cultural competency'),
    ('OPERATIONS', 'POLICY'):     ('ENABLES', 'data feedback loops'),
    ('OPERATIONS', 'TECHNOLOGY'): ('REQUIRES', 'workforce to run infrastructure'),
}
assert len(DEPS) == 15, f"expected 15 dependencies, have {len(DEPS)}"


def font(sz, bold=False):
    names = (['/System/Library/Fonts/Supplemental/Arial Bold.ttf']
             if bold else ['/System/Library/Fonts/Supplemental/Arial.ttf'])
    names.append('/System/Library/Fonts/Helvetica.ttc')
    for n in names:
        if os.path.exists(n):
            try:
                return ImageFont.truetype(n, sz * SCALE)
            except Exception:
                pass
    return ImageFont.load_default()


f_title = font(19, bold=True)
f_sub = font(11)
f_hdr = font(11, bold=True)
f_row = font(11, bold=True)
f_q = font(9)
f_verb = font(8, bold=True)
f_cell = font(9)
f_leg = font(9, bold=True)
f_legd = font(9)

# ── geometry ────────────────────────────────────────────────────────────────
PAD = 34 * SCALE
ROWHDR_W = 132 * SCALE
COL_W = 128 * SCALE
HDR_H = 54 * SCALE
ROW_H = 74 * SCALE
TITLE_H = 74 * SCALE
LEG_H = 56 * SCALE

W = PAD * 2 + ROWHDR_W + COL_W * 6
H = PAD * 2 + TITLE_H + HDR_H + ROW_H * 6 + LEG_H

img = Image.new('RGB', (W, H), 'white')
d = ImageDraw.Draw(img)


def centre(text, fnt, x0, x1, y, fill):
    tb = d.textbbox((0, 0), text, font=fnt)
    d.text((x0 + (x1 - x0 - (tb[2] - tb[0])) / 2, y), text, font=fnt, fill=fill)


def wrap_to(text, fnt, max_w):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if d.textbbox((0, 0), t, font=fnt)[2] <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


# ── title ───────────────────────────────────────────────────────────────────
y = PAD
d.text((PAD, y), 'THE SIX-PILLAR FRAMEWORK', font=f_title, fill=NAVY)
y += 26 * SCALE
d.text((PAD, y), 'Fifteen directed dependencies. Read each row as a source '
                 'pillar and each column as the pillar it acts on.',
       font=f_sub, fill=GREY)

grid_x = PAD + ROWHDR_W
grid_y = PAD + TITLE_H

# ── column headers ──────────────────────────────────────────────────────────
for i, p in enumerate(PILLARS):
    x0 = grid_x + i * COL_W
    d.rectangle([x0, grid_y, x0 + COL_W, grid_y + HDR_H], fill=BAND)
    centre(p, f_hdr, x0, x0 + COL_W, grid_y + 13 * SCALE, NAVY)
    centre(QUESTION[p], f_q, x0, x0 + COL_W, grid_y + 30 * SCALE, GREY)

# ── rows ────────────────────────────────────────────────────────────────────
for r, src in enumerate(PILLARS):
    ry = grid_y + HDR_H + r * ROW_H
    d.rectangle([PAD, ry, grid_x, ry + ROW_H], fill=BAND)
    d.text((PAD + 10 * SCALE, ry + 16 * SCALE), src, font=f_row, fill=NAVY)
    d.text((PAD + 10 * SCALE, ry + 32 * SCALE), QUESTION[src], font=f_q, fill=GREY)
    d.text((PAD + 10 * SCALE, ry + 45 * SCALE), ROLE[src], font=f_q, fill=GREY)

    for c, dst in enumerate(PILLARS):
        x0 = grid_x + c * COL_W
        if src == dst:
            d.rectangle([x0, ry, x0 + COL_W, ry + ROW_H], fill=(250, 250, 252))
            centre('—', f_cell, x0, x0 + COL_W, ry + ROW_H / 2 - 7 * SCALE, RULE)
            continue
        dep = DEPS.get((src, dst))
        if not dep:
            continue
        verb, what = dep
        col = VERB[verb]
        centre(verb, f_verb, x0, x0 + COL_W, ry + 13 * SCALE, col)
        lines = wrap_to(what, f_cell, COL_W - 16 * SCALE)
        ty = ry + 28 * SCALE
        for ln in lines[:3]:
            centre(ln, f_cell, x0, x0 + COL_W, ty, INK)
            ty += 12 * SCALE

# ── grid rules, drawn last so they sit on top ───────────────────────────────
for i in range(7):
    x = grid_x + i * COL_W
    d.line([x, grid_y, x, grid_y + HDR_H + ROW_H * 6], fill=RULE, width=1 * SCALE)
d.line([PAD, grid_y, PAD, grid_y + HDR_H + ROW_H * 6], fill=RULE, width=1 * SCALE)
for r in range(8):
    yy = grid_y + (HDR_H if r else 0) + max(0, r - 1) * ROW_H
    d.line([PAD, yy, grid_x + COL_W * 6, yy], fill=RULE, width=1 * SCALE)

# ── legend ──────────────────────────────────────────────────────────────────
ly = grid_y + HDR_H + ROW_H * 6 + 18 * SCALE
lx = PAD
for verb, desc in (('ENABLES', 'makes possible'),
                   ('REQUIRES', 'cannot function without'),
                   ('DRIVES', 'actively forces change in'),
                   ('CONSTRAINS', 'imposes a design limit on')):
    d.rectangle([lx, ly + 2 * SCALE, lx + 11 * SCALE, ly + 11 * SCALE],
                fill=VERB[verb])
    d.text((lx + 17 * SCALE, ly), verb, font=f_leg, fill=INK)
    wv = d.textbbox((0, 0), verb, font=f_leg)[2]
    d.text((lx + 17 * SCALE + wv + 6 * SCALE, ly), '— ' + desc,
           font=f_legd, fill=GREY)
    lx += 17 * SCALE + wv + d.textbbox((0, 0), '— ' + desc, font=f_legd)[2] + 26 * SCALE

out = img.resize((W // SCALE, H // SCALE), Image.LANCZOS)
out = out.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.NONE)
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cover.png')
out.save(OUT, optimize=True, dpi=(300, 300))
print(f"wrote {OUT} {out.size}  ({os.path.getsize(OUT):,} bytes)")
