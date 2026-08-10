#!/usr/bin/env python3
"""Redraw the six-pillar cover diagram as vector art.

The author's slide exports the diagram as a 1376x768 bitmap in every format
offered (png/jpg/svg/pptx/odp all carry the same 318,849-byte image), and the
diagram itself occupies only ~560px of that. Placed at 4.8in on the cover page
that is ~117 DPI of real detail, which is why the type and the curved arrows
render soft. Upscaling cannot add information back.

So the geometry is reconstructed here instead: six pillar circles on a ring,
the fifteen dependency arcs between them, drawn as paths and live text. Output
is resolution-independent, and the PNG handed to the build is rendered from it
at whatever DPI the page needs.

Palette and layout are measured from the author's art so the redraw is the same
picture, not a reinterpretation.
"""
import math
import os
import subprocess

TEAL = '#679B95'
GOLD = '#BBA472'
RED = '#C4634F'
DARK = '#2B2B2B'
RING = '#B8B8B8'
TEXT = '#111111'

# Ring geometry, in a 1000x1000 user space.
CX = CY = 500.0
R_RING = 330.0        # radius of the pillar-centre circle
R_NODE = 92.0         # pillar circle radius
R_OUTER1 = 468.0      # the two faint containing circles
R_OUTER2 = 458.0

# Pillars clockwise from top, matching the author's layout.
PILLARS = [
    ('POLICY',     'Is it permissible?', -90,  TEAL),
    ('TECHNOLOGY', 'Is it possible?',    -30,  DARK),
    ('ECONOMICS',  'Is it sustainable?',  30,  DARK),
    ('CLINICAL',   'Is it effective?',    90,  TEAL),
    ('EQUITY',     'Is it just?',        150,  RED),
    ('OPERATIONS', 'Is it executable?',  210,  GOLD),
]

# The fifteen dependencies, as (from, to, colour). Indices into PILLARS.
DEPS = [
    (0, 1, TEAL), (0, 4, TEAL), (0, 5, GOLD),
    (1, 2, GOLD), (1, 3, TEAL), (1, 4, TEAL),
    (2, 1, GOLD), (2, 3, GOLD), (2, 4, GOLD),
    (3, 4, TEAL), (3, 5, TEAL),
    (4, 0, RED), (4, 3, RED), (4, 5, RED),
    (5, 1, DARK),
]


def pos(deg, r=R_RING):
    a = math.radians(deg)
    return CX + r * math.cos(a), CY + r * math.sin(a)


def arc_path(i, j, bow=0.18):
    """Curved connector between two pillar circles, trimmed to their edges."""
    a1 = PILLARS[i][2]
    a2 = PILLARS[j][2]
    x1, y1 = pos(a1)
    x2, y2 = pos(a2)

    dx, dy = x2 - x1, y2 - y1
    d = math.hypot(dx, dy) or 1.0
    ux, uy = dx / d, dy / d

    # start and end on the circle edges, with a small gap so the arrowhead
    # does not touch the stroke
    sx, sy = x1 + ux * (R_NODE + 6), y1 + uy * (R_NODE + 6)
    ex, ey = x2 - ux * (R_NODE + 16), y2 - uy * (R_NODE + 16)

    # bow the control point away from the centre so arcs fan out like the source
    mx, my = (sx + ex) / 2, (sy + ey) / 2
    nx, ny = -(ey - sy), (ex - sx)
    n = math.hypot(nx, ny) or 1.0
    cxp = mx + nx / n * d * bow
    cyp = my + ny / n * d * bow
    return f'M {sx:.1f},{sy:.1f} Q {cxp:.1f},{cyp:.1f} {ex:.1f},{ey:.1f}'


def build_svg():
    out = []
    out.append('<svg xmlns="http://www.w3.org/2000/svg" '
               'viewBox="0 0 1000 1000" width="1000" height="1000">')
    out.append('<rect width="1000" height="1000" fill="#ffffff"/>')

    out.append('<defs>')
    for name, col in (('teal', TEAL), ('gold', GOLD),
                      ('red', RED), ('dark', DARK)):
        out.append(
            f'<marker id="ah-{name}" viewBox="0 0 10 10" refX="9" refY="5" '
            f'markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">'
            f'<path d="M 0 1 L 10 5 L 0 9 z" fill="{col}"/></marker>')
    out.append('</defs>')

    # the two faint containing circles
    for r in (R_OUTER1, R_OUTER2):
        out.append(f'<circle cx="{CX}" cy="{CY}" r="{r}" fill="none" '
                   f'stroke="{RING}" stroke-width="1.6"/>')

    # dependency arcs, under the nodes
    name_for = {TEAL: 'teal', GOLD: 'gold', RED: 'red', DARK: 'dark'}
    for k, (i, j, col) in enumerate(DEPS):
        bow = 0.16 + 0.05 * ((k % 3) - 1)
        out.append(
            f'<path d="{arc_path(i, j, bow)}" fill="none" stroke="{col}" '
            f'stroke-width="5" stroke-linecap="round" '
            f'marker-end="url(#ah-{name_for[col]})" opacity="0.95"/>')

    # pillar circles and their labels
    for label, question, deg, col in PILLARS:
        x, y = pos(deg)
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{R_NODE}" '
                   f'fill="#ffffff" stroke="{col}" stroke-width="4.5"/>')
        out.append(
            f'<text x="{x:.1f}" y="{y - 6:.1f}" text-anchor="middle" '
            f'font-family="Helvetica Neue, Helvetica, Arial, sans-serif" '
            f'font-size="27" font-weight="700" fill="{TEXT}">{label}</text>')
        out.append(
            f'<text x="{x:.1f}" y="{y + 26:.1f}" text-anchor="middle" '
            f'font-family="Helvetica Neue, Helvetica, Arial, sans-serif" '
            f'font-size="21" fill="{TEXT}">{question}</text>')

    out.append('</svg>')
    return '\n'.join(out)


HERE = os.path.dirname(os.path.abspath(__file__))
svg_path = os.path.join(HERE, 'cover_vector.svg')
open(svg_path, 'w').write(build_svg())
print('wrote', svg_path)

# Render at high resolution. rsvg-convert / cairosvg / Inkscape, whichever exists.
png_path = os.path.join(HERE, 'cover_vector.png')
SIZE = 3000
for cmd in (['rsvg-convert', '-w', str(SIZE), '-h', str(SIZE),
             svg_path, '-o', png_path],
            ['inkscape', svg_path, '--export-type=png',
             f'--export-width={SIZE}', f'--export-filename={png_path}']):
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        print('rendered with', cmd[0], '->', png_path)
        break
    except (FileNotFoundError, subprocess.CalledProcessError):
        continue
else:
    try:
        import cairosvg
        cairosvg.svg2png(url=svg_path, write_to=png_path,
                         output_width=SIZE, output_height=SIZE)
        print('rendered with cairosvg ->', png_path)
    except Exception as e:
        print('NO RENDERER AVAILABLE:', e)
