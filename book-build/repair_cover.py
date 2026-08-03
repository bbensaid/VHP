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
    x0, y0, x1, y1 = [v * UP for v in b['box']]
    d.rectangle([x0, y0, x1, y1], fill='white')

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

# NotebookLM watermark, bottom right
d.rectangle([930 * UP, 545 * UP, im.width, im.height], fill='white')

# The art is line work on flat white, so a 256-colour palette is effectively
# lossless here (measured: mean per-pixel delta 0.28, only 0.08% of pixels
# differ by more than 8) and roughly halves the file — which matters because
# the image is embedded in the .docx and the author round-trips it through
# Google Docs.
im = im.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.NONE)
im.save(OUT, optimize=True, dpi=(300, 300))
print(f"wrote {OUT} {im.size}  (~{im.width / 6.30:.0f} DPI at 6.30in wide, "
      f"{os.path.getsize(OUT):,} bytes)")
