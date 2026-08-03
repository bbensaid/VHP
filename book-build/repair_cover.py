#!/usr/bin/env python3
"""
repair_cover.py — repair the author's original cover art in place.

The author's original (book-build/cover_original.png) has better typography than
anything regenerated from scratch: clean Helvetica, confident hierarchy, good
spacing. Its only faults are fixable ones:

  * garbled words rendered into the art ("cliurrertity lens", "Paymecial logic")
  * Economics and Technology given the SAME description — that text is
    Economics' role; Technology is the data substrate
  * "Is it effective?" labelled the cross-cutting accountability lens, which is
    Equity's role
  * a NotebookLM watermark, bottom right
  * 1024x565 at 163 DPI — under print resolution

The text sits on pure white (255,255,255) with pure black glyphs, so each bad
block can be painted out and re-set cleanly rather than the whole image being
redrawn. Wording comes from the book's own six-pillar table, so the cover
cannot drift from the text it illustrates.

Resolution is raised by rendering the replacement text at the FINAL scale (not
upscaling bitmap text), so the repaired blocks are genuinely sharp even though
the surrounding art is an upscale of the original.

    python3 book-build/repair_cover.py
"""
from PIL import Image, ImageDraw, ImageFont
import os, textwrap

HERE = os.path.dirname(os.path.abspath(__file__))
# The author's untouched original. Tracked in git (book-archive/ is
# gitignored, so the source of truth for this repair lives here).
SRC = os.path.join(HERE, 'cover_original.png')
OUT = os.path.join(HERE, 'cover.png')

# 3x upscale: 1024x565 -> 3072x1695, i.e. ~490 DPI at 6.3in wide.
UP = 3

# A greyscale copy of the untouched original at 1x, used to tell TEXT from
# artwork: the labels are near-black, the ring and arrows are lighter tinted
# line work. Erasing by pixel value rather than by rectangle is what keeps a
# clearing box from slicing through the ring.
src1x = Image.open(SRC).convert('L')
sp = src1x.load()
TEXT_MAX = 110      # glyphs run ~0-40; ring line work is well above this
DILATE = 2          # grow each erased pixel to catch antialiased edges

im = Image.open(SRC).convert('RGB')
im = im.resize((im.width * UP, im.height * UP), Image.LANCZOS)
d = ImageDraw.Draw(im)


def font(sz, bold=False):
    for n in (['/System/Library/Fonts/Supplemental/Arial Bold.ttf',
               '/System/Library/Fonts/Helvetica.ttc']
              if bold else
              ['/System/Library/Fonts/Supplemental/Arial.ttf',
               '/System/Library/Fonts/Helvetica.ttc']):
        if os.path.exists(n):
            try:
                return ImageFont.truetype(n, sz)
            except Exception:
                pass
    return ImageFont.load_default()


# Blocks to repaint. Coordinates are in ORIGINAL pixels, measured from the art;
# they are scaled by UP below. Each is (x0, y0, x1, y1) of the area to clear,
# then the heading and body to re-set inside it.
# Boxes are the MEASURED extent of each block in the original art, padded a
# few px. Measured rather than eyeballed: an earlier pass under-covered the
# Operations block and left a stranded "reality." line below the repaint.
BLOCKS = [
    # Operations — "clinical measurement,, and clinical"
    dict(box=(57, 168, 296, 323),
         head='"Is it executable?" — The',
         body="execution layer. Translates mandates, payment models, "
              "data platforms, and clinical programs into "
              "organizational reality.",
         wrap=26),
    # Equity — "cliurrertity lens" was nonsense
    dict(box=(64, 346, 296, 465),
         head='"Is it just?" — The',
         body="cross-cutting constraint and accountability lens "
              "applied to every decision.",
         wrap=26),
    # Technology — had ECONOMICS' description; restore the data substrate
    dict(box=(783, 110, 1003, 238),
         head='"Is it possible?" — The',
         body="data substrate. Makes population health management, "
              "VBC execution, equity measurement, and strategic "
              "planning analytically feasible.",
         wrap=26),
    # Economics — "Paymecial logic"; keep its real role
    dict(box=(783, 349, 1003, 446),
         head='"Is it sustainable?" — The',
         body="incentive architecture. Payment reform changes the "
              "financial logic that shapes clinical decisions over "
              "time.",
         wrap=26),
    # Clinical — was labelled the cross-cutting lens (that is Equity's role)
    dict(box=(658, 484, 1019, 563),
         head='"Is it effective?" — The',
         body="mechanism of change. Clinical redesign converts "
              "payment incentives into changed care.",
         wrap=30),
]

HEAD_PT = 11 * UP
BODY_PT = 11 * UP
LEAD = int(13.2 * UP)

for b in BLOCKS:
    x0, y0, x1, y1 = b['box']
    # Erase the old glyphs by VALUE, not with a rectangle. On the left the
    # callout text and the ring overlap in x (text runs to 319, the ring reaches
    # in to 250), so a clearing rectangle cannot separate them — an earlier
    # version used one and sliced ~46px off the ring's left edge.
    for y in range(y0, y1):
        for x in range(x0, x1):
            if sp[x, y] < TEXT_MAX:
                d.rectangle([(x - DILATE) * UP, (y - DILATE) * UP,
                             (x + DILATE + 1) * UP, (y + DILATE + 1) * UP],
                            fill='white')
    x0, y0, x1, y1 = [v * UP for v in b['box']]

    f_h = font(HEAD_PT, bold=True)
    f_b = font(BODY_PT)
    y = y0
    # heading may itself wrap
    for line in textwrap.wrap(b['head'], width=b['wrap']):
        d.text((x0, y), line, font=f_h, fill=(17, 17, 17))
        y += LEAD
    for line in textwrap.wrap(b['body'], width=b['wrap']):
        d.text((x0, y), line, font=f_b, fill=(17, 17, 17))
        y += LEAD

# ── strip every label inside the artwork except the six pillar names ─────────
# The arrow labels were generated as art, and many are rendered mirrored or
# upside-down ("Enables risk stratification", "Drives financial rationality",
# "Enables demographic stratification", "Constrains with cultural competency"),
# plus four stray verbs floating on the inner ring attached to nothing. They sit
# ON the tinted curves rather than on flat white, so they cannot be re-set the
# way the outer callouts were. Per the author: remove them all, keep only the
# pillar names.
#
# Method: inside the artwork region, paint out every near-black (text) pixel,
# protecting a box around each of the six pillar labels. Ring and arrow line
# work is lighter than TEXT_MAX and survives untouched.
ART = (280, 95, 760, 500)          # bounds of the ring artwork
KEEP = [                            # measured extents of the six pillar names
    (293, 184, 421, 211),           # OPERATIONS
    (583, 186, 712, 207),           # TECHNOLOGY
    (291, 359, 421, 386),           # EQUITY
    (583, 356, 736, 381),           # ECONOMICS
    (432, 452, 572, 479),           # CLINICAL
    (432,  99, 571, 117),           # POLICY
]
PAD = 4

def protected(x, y):
    return any(x0 - PAD <= x <= x1 + PAD and y0 - PAD <= y <= y1 + PAD
               for (x0, y0, x1, y1) in KEEP)

# Darkness alone cannot separate labels from artwork: the circle strokes run as
# dark as 95-130, overlapping the glyph range, so a value threshold erases the
# circles too. Use SHAPE instead. A glyph is a small isolated blob; a circle or
# arrow is a long connected curve. Flood-fill each dark component and erase only
# those whose bounding box is glyph-sized.
ax0, ay0, ax1, ay1 = ART
INK = 200                  # anything below this is ink of some kind
seen = set()

def component(sx, sy):
    stack, pts = [(sx, sy)], []
    while stack:
        x, y = stack.pop()
        if (x, y) in seen:
            continue
        if not (ax0 <= x < ax1 and ay0 <= y < ay1):
            continue
        if sp[x, y] >= INK:
            continue
        seen.add((x, y))
        pts.append((x, y))
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                stack.append((x + dx, y + dy))
    return pts

erased = 0
for yy in range(ay0, ay1):
    for xx in range(ax0, ax1):
        if (xx, yy) in seen or sp[xx, yy] >= INK:
            continue
        pts = component(xx, yy)
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        w, h = max(xs) - min(xs), max(ys) - min(ys)
        # glyph-sized: small in BOTH directions. Circles/arrows are far larger.
        # Circles and long arrows span the figure; every LABEL — even a long
        # one like "Constrains with cultural competency." — fits inside a
        # modest box. Tuning this too tightly left half-words behind, so the
        # bound is generous and the six pillar names are protected explicitly.
        if w <= 150 and h <= 150 and len(pts) <= 4000 \
                and not any(protected(px_, py_) for px_, py_ in pts):
            erased += 1
            for (x, y) in pts:
                d.rectangle([(x - 1) * UP, (y - 1) * UP,
                             (x + 2) * UP, (y + 2) * UP], fill='white')
print(f"  erased {erased} glyph components from the artwork")

# NotebookLM watermark, bottom right
d.rectangle([930 * UP, 545 * UP, im.width, im.height], fill='white')

# A 1px grey rule runs down the far right edge of the original — column 1023 is
# non-white for all 565 rows — and reads as a stray vertical line on the page.
d.rectangle([1022 * UP, 0, im.width, im.height], fill='white')

# The art is line work on flat white, so a 256-colour palette is effectively
# lossless here (measured: mean per-pixel delta 0.28, only 0.08% of pixels
# differ by more than 8) and roughly halves the file — which matters because
# the image is embedded in the .docx and the author round-trips it through
# Google Docs.
im = im.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.NONE)
im.save(OUT, optimize=True, dpi=(300, 300))
print(f"wrote {OUT} {im.size}  (~{im.width / 6.30:.0f} DPI at 6.30in wide, "
      f"{os.path.getsize(OUT):,} bytes)")
