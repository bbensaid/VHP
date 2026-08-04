#!/usr/bin/env python3
"""
prepare_cover.py — install the author's supplied cover art as book-build/cover.png.

Source: "Six-Pillar_Healthcare_Transformation_Framework cover.png" in the repo
root. Its content is correct — all fifteen dependencies match Figure 1.3 exactly
(verb and payload), and all six diagnostic questions match the six-pillar table.
Only two mechanical things need doing before it can be embedded:

  1. RGBA -> RGB on white. Word/Docs handle a transparent PNG inconsistently,
     and the .docx round-trip through Google Docs can flatten it onto black.
  2. Remove the NotebookLM watermark, bottom right. It sits on flat white in the
     corner, clear of the diagram, so a white rectangle is enough — no pixel
     surgery on the artwork itself.

Run again any time the author replaces the source file.

    python3 book-build/prepare_cover.py
"""
from PIL import Image
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..',
                   'Six-Pillar_Healthcare_Transformation_Framework cover.png')
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
# Watermark box, measured on the 2752x1536 source and expressed as fractions so
# it still lands correctly if the author re-exports at a different size.
from PIL import ImageDraw
ImageDraw.Draw(im).rectangle(
    [int(w * 0.855), int(h * 0.945), w, h], fill='white')

# Line art on flat white: a 256-colour palette is visually lossless here and
# roughly halves the file, which matters because the image is embedded in the
# .docx and round-trips through Google Docs.
im = im.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.NONE)
im.save(OUT, optimize=True, dpi=(300, 300))

print(f"wrote {OUT} {im.size}  "
      f"({im.size[0]/6.30:.0f} DPI at 6.30in wide, {os.path.getsize(OUT):,} bytes)")
