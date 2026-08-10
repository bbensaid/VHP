#!/usr/bin/env python3
"""
prepare_cover.py — install the author's supplied cover art as book-build/cover.png.

Source: "Book_potential_slides/Architecture_of_Healthcare_Reform_Cover.png"
(installed 2026-08-05). This is the corrected art — the earlier slide had
"Ie it just?" in the EQUITY circle.

The folder offers the same slide as .png/.jpg/.svg/.pptx/.odp. The PNG is the
one to use: the SVG is not vector art but a single base64 bitmap in an <svg>
wrapper (zero <text> elements), so it carries no resolution advantage, and the
pptx/odp embed that same bitmap. PNG over JPG because this is line art on flat
white, where JPEG ringing shows on the circle strokes.

The slide carries its own title block and a "Bechir BenSaid" / NotebookLM
byline baked into the pixels; both are cropped away here so the page's own
title block is the only title.

One further thing needs doing before it can be embedded: RGBA -> RGB on white.
Word/Docs handle a transparent PNG inconsistently, and the .docx round-trip
through Google Docs can flatten it onto black.

Run again any time the author replaces the source file.

    python3 book-build/prepare_cover.py
"""
from PIL import Image
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'Book_potential_slides',
                   'Architecture_of_Healthcare_Reform_Cover.png')
OUT = os.path.join(HERE, 'cover.png')

im = Image.open(SRC)
if im.mode in ('RGBA', 'LA', 'P'):
    flat = Image.new('RGB', im.size, 'white')
    rgba = im.convert('RGBA')
    flat.paste(rgba, mask=rgba.split()[-1])
    im = flat
else:
    im = im.convert('RGB')

w, h = im.size

# Isolate the diagram from the slide's own title block and byline.
#
# Both sit on flat white and are separated from the artwork by full-width bands
# of blank rows, so we find them rather than hard-coding fractions — the earlier
# version's measurements were tied to one specific export and broke silently
# when the source changed. On the 1376x768 slide the bands come out as:
#
#     41-74, 90-123, 129-158   the three title lines
#     171-700                  the diagram          <- tallest, the one we want
#     720-742, 748-757         "Bechir BenSaid" / NotebookLM
#
# The diagram is reliably the tallest band: it is the artwork, and the text
# lines are single rows of type by comparison.
gray = im.convert('L')
px = gray.load()
row_has_ink = [any(px[x, y] < 240 for x in range(w)) for y in range(h)]

bands, start = [], None
for y, inked in enumerate(row_has_ink):
    if inked and start is None:
        start = y
    elif not inked and start is not None:
        bands.append((start, y - 1)); start = None
if start is not None:
    bands.append((start, h - 1))

top, bot = max(bands, key=lambda b: b[1] - b[0])

# Column bounds measured inside the diagram band only, so the wider title text
# above it cannot drag the left/right edges out.
cols = [x for x in range(w)
        if any(px[x, y] < 240 for y in range(top, bot + 1))]
left, right = cols[0], cols[-1]

pad = 12
im = im.crop((max(0, left - pad), max(0, top - pad),
              min(w, right + 1 + pad), min(h, bot + 1 + pad)))

# The slide is a 1376px-wide export, so the diagram is only ~560px of real
# pixels — soft at print size. Lanczos to 4x is interpolation, not detail, but
# it stops the .docx renderer doing its own cruder scaling on the way to PDF.
im = im.resize((im.width * 4, im.height * 4), Image.LANCZOS)

# Line art on flat white: a 256-colour palette is visually lossless here and
# roughly halves the file, which matters because the image is embedded in the
# .docx and round-trips through Google Docs.
im = im.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.NONE)
im.save(OUT, optimize=True, dpi=(300, 300))

print(f"wrote {OUT} {im.size}  "
      f"({im.size[0]/6.30:.0f} DPI at 6.30in wide, {os.path.getsize(OUT):,} bytes)")
