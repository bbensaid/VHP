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
# The node circles must be wide enough to CONTAIN their label and question —
# at the old R_NODE=92 the longest lines ("TECHNOLOGY", "Is it sustainable?")
# ran outside the circle and across the surrounding ring. The ring radius is
# then pulled in so every node sits comfortably inside the Equity Imperative.
R_NODE = 112.0        # pillar circle radius
R_RING = 312.0        # radius of the pillar-centre circle
R_OUTER1 = 452.0      # the Equity Imperative ring
R_OUTER2 = 442.0

# FIVE pillars, clockwise from top, in load-bearing order (book v46).
# Equity is no longer a node: it is the Equity Imperative, the test every
# pillar must pass, drawn as the ring that encloses all five.
PILLARS = [
    ('POLICY',     'Is it permissible?', -90,  TEAL),
    ('TECHNOLOGY', 'Is it possible?',    -18,  DARK),
    ('ECONOMICS',  'Is it sustainable?',  54,  GOLD),
    ('CLINICAL',   'Is it effective?',   126,  TEAL),
    ('OPERATIONS', 'Is it executable?',  198,  GOLD),
]

IMPERATIVE = ('THE EQUITY IMPERATIVE', 'Is it just?', RED)

# The nine directed dependencies, as (from, to, colour, feedback).
# Source: the v46 handoff spec / Figure 1.3. Feedback loops are dashed.
DEPS = [
    (0, 1, TEAL, False),   # Policy    -> Technology   ENABLES
    (0, 2, TEAL, False),   # Policy    -> Economics    ENABLES
    (0, 4, TEAL, False),   # Policy    -> Operations   DRIVES
    (1, 2, DARK, False),   # Technology-> Economics    ENABLES
    (1, 3, DARK, False),   # Technology-> Clinical     ENABLES
    (2, 3, GOLD, False),   # Economics -> Clinical     DRIVES
    (3, 4, TEAL, False),   # Clinical  -> Operations   REQUIRES
    (4, 0, GOLD, True),    # Operations-> Policy       feedback
    (4, 1, GOLD, True),    # Operations-> Technology   feedback
]


RECIPROCAL = {(a, b) for a, b, _, _ in DEPS if (b, a) in {(x, y) for x, y, _, _ in DEPS}}


def bow_for(i, j):
    """Neighbouring pillars sit ~72 deg apart and their connectors are short —
    bow those harder so they read as arcs rather than stubs."""
    sep = abs(PILLARS[i][2] - PILLARS[j][2]) % 360
    sep = min(sep, 360 - sep)
    return 0.26 if sep <= 80 else 0.13


def arc_points(i, j, feedback=False):
    """Start, control and end points for the connector i -> j.

    The control point is pushed AWAY from the centre of the diagram, so every
    arc bulges outward consistently. Using a fixed left/right normal instead
    made arcs bow inward or outward depending on travel direction, which is
    what tangled the reciprocal Policy/Operations pair. Where two pillars are
    joined in both directions, the feedback leg bows inward so the two do not
    sit on top of each other.
    """
    x1, y1 = pos(PILLARS[i][2])
    x2, y2 = pos(PILLARS[j][2])
    dx, dy = x2 - x1, y2 - y1
    d = math.hypot(dx, dy) or 1.0
    ux, uy = dx / d, dy / d
    sx, sy = x1 + ux * (R_NODE + 10), y1 + uy * (R_NODE + 10)
    ex, ey = x2 - ux * (R_NODE + 22), y2 - uy * (R_NODE + 22)

    mx, my = (sx + ex) / 2, (sy + ey) / 2
    ox, oy = mx - CX, my - CY                     # centre -> midpoint = outward
    on = math.hypot(ox, oy) or 1.0
    amount = d * bow_for(i, j)
    if feedback and (i, j) in RECIPROCAL:
        amount = -amount * 0.75                   # bow the feedback leg inward
    return (sx, sy), (mx + ox / on * amount, my + oy / on * amount), (ex, ey)


def pos(deg, r=R_RING):
    a = math.radians(deg)
    return CX + r * math.cos(a), CY + r * math.sin(a)


def arc_path(i, j, feedback=False):
    """Curved connector between two pillar circles, trimmed to their edges."""
    (sx, sy), (cx_, cy_), (ex, ey) = arc_points(i, j, feedback)
    return f'M {sx:.1f},{sy:.1f} Q {cx_:.1f},{cy_:.1f} {ex:.1f},{ey:.1f}'


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

    # The Equity Imperative: the ring enclosing every pillar. It is not a node —
    # it is the test all five must pass, so it is drawn as the boundary itself.
    out.append(f'<circle cx="{CX}" cy="{CY}" r="{R_OUTER1}" fill="none" '
               f'stroke="{RED}" stroke-width="3.2" opacity="0.9"/>')
    out.append(f'<circle cx="{CX}" cy="{CY}" r="{R_OUTER2}" fill="none" '
               f'stroke="{RED}" stroke-width="1.4" opacity="0.45"/>')

    # label curved along the top of the ring, and its question along the bottom
    r_txt = (R_OUTER1 + R_OUTER2) / 2
    out.append(f'<path id="eq-top" fill="none" '
               f'd="M {CX - r_txt},{CY} A {r_txt},{r_txt} 0 0 1 {CX + r_txt},{CY}"/>')
    out.append(f'<path id="eq-bot" fill="none" '
               f'd="M {CX - r_txt},{CY} A {r_txt},{r_txt} 0 0 0 {CX + r_txt},{CY}"/>')
    out.append(
        f'<text font-family="Helvetica Neue, Helvetica, Arial, sans-serif" '
        f'font-size="30" font-weight="700" letter-spacing="3" fill="{RED}">'
        f'<textPath href="#eq-top" startOffset="50%" text-anchor="middle">'
        f'{IMPERATIVE[0]}</textPath></text>')
    out.append(
        f'<text font-family="Helvetica Neue, Helvetica, Arial, sans-serif" '
        f'font-size="26" font-style="italic" fill="{RED}">'
        f'<textPath href="#eq-bot" startOffset="50%" text-anchor="middle">'
        f'{IMPERATIVE[1]}</textPath></text>')

    # dependency arcs, under the nodes
    name_for = {TEAL: 'teal', GOLD: 'gold', RED: 'red', DARK: 'dark'}
    for i, j, col, feedback in DEPS:
        dash = ' stroke-dasharray="16 11"' if feedback else ''
        out.append(
            f'<path d="{arc_path(i, j, feedback)}" fill="none" stroke="{col}" '
            f'stroke-width="5" stroke-linecap="round"{dash} '
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
    except Exception:
        # No SVG toolchain on this machine (rsvg/inkscape/cairosvg all absent,
        # and pip is PEP-668 locked). Pillow is already a hard dependency of
        # build_docx.py, so draw the same geometry directly instead of leaving
        # the pipeline unable to produce a cover at all.
        from PIL import Image, ImageDraw, ImageFont

        S = SIZE / 1000.0                      # user-space -> pixel scale
        def px(v): return v * S

        img = Image.new('RGB', (SIZE, SIZE), 'white')
        dr = ImageDraw.Draw(img)

        def fnt(sz, bold=False, italic=False):
            base = '/System/Library/Fonts/Supplemental/'
            name = ('Arial Bold Italic.ttf' if (bold and italic) else
                    'Arial Bold.ttf' if bold else
                    'Arial Italic.ttf' if italic else 'Arial.ttf')
            try:
                return ImageFont.truetype(base + name, int(px(sz)))
            except Exception:
                return ImageFont.load_default()

        def centered(x, y, text, font, fill):
            b = dr.textbbox((0, 0), text, font=font)
            dr.text((px(x) - (b[2] - b[0]) / 2 - b[0],
                     px(y) - (b[3] - b[1]) / 2 - b[1]), text, font=font, fill=fill)

        # ── the Equity Imperative ring, broken at top and bottom for its label.
        # PIL angles: 0 deg = 3 o'clock, increasing clockwise. The two arcs below
        # cover the right and left flanks, leaving gaps centred on 270 (top) and
        # 90 (bottom) for the label to sit in.
        R1, R2 = R_OUTER1, R_OUTER2
        for r, w in ((R1, 5), (R2, 2)):
            box = [px(CX - r), px(CY - r), px(CX + r), px(CY + r)]
            for a0, a1 in ((292, 75), (105, 248)):
                dr.arc(box, a0, a1, fill=RED, width=int(px(w)))

        r_txt = (R1 + R2) / 2
        centered(CX, CY - r_txt, IMPERATIVE[0], fnt(30, bold=True), RED)
        centered(CX, CY + r_txt, IMPERATIVE[1], fnt(28, italic=True), RED)

        # ── dependency arrows (quadratic bezier, sampled)
        def bez(p0, p1, p2, n=64):
            return [((1-t)**2*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0],
                     (1-t)**2*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1])
                    for t in (i/n for i in range(n+1))]

        for i, j, col, feedback in DEPS:
            p0, cp, p2 = arc_points(i, j, feedback)
            pts = [(px(a), px(b)) for a, b in bez(p0, cp, p2)]
            if feedback:                       # dashed = feedback loop
                for a in range(0, len(pts)-1, 6):
                    dr.line(pts[a:a+4], fill=col, width=int(px(5)), joint='curve')
            else:
                dr.line(pts, fill=col, width=int(px(5)), joint='curve')
            (hx, hy), (tx, ty) = pts[-1], pts[-6]
            ang = math.atan2(hy-ty, hx-tx)
            L, Wd = px(30), px(13)
            dr.polygon([(hx, hy),
                        (hx - L*math.cos(ang) + Wd*math.sin(ang),
                         hy - L*math.sin(ang) - Wd*math.cos(ang)),
                        (hx - L*math.cos(ang) - Wd*math.sin(ang),
                         hy - L*math.sin(ang) + Wd*math.cos(ang))], fill=col)

        # ── the five pillar nodes, over the arrows
        for label, question, deg, col in PILLARS:
            x, y = pos(deg)
            dr.ellipse([px(x-R_NODE), px(y-R_NODE), px(x+R_NODE), px(y+R_NODE)],
                       fill='white', outline=col, width=int(px(5)))
            centered(x, y - 20, label, fnt(26, bold=True), TEXT)
            centered(x, y + 22, question, fnt(20), TEXT)

        img.save(png_path)
        print('rendered with Pillow ->', png_path)
