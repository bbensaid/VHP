#!/usr/bin/env python3
"""
Generate a crisp high-res dependency diagram for Figure 1.B: the six pillars in a
ring with the 15 directed dependency relationships drawn as color-coded arrows
(ENABLES / REQUIRES / DRIVES / CONSTRAINS), plus a legend. Pillow, supersampled.
"""
from PIL import Image, ImageDraw, ImageFont
import math, os

SCALE = 3
W, H = 1500*SCALE, 1120*SCALE
img = Image.new('RGB', (W, H), 'white')
d = ImageDraw.Draw(img)

# ── pillar palette (matches the book's pillar colors) ────────────────────────
PILLARS = ['POLICY','TECHNOLOGY','ECONOMICS','CLINICAL','EQUITY','OPERATIONS']
PCOLOR = {
    'POLICY':(45,45,45), 'TECHNOLOGY':(46,58,107), 'ECONOMICS':(29,107,93),
    'CLINICAL':(138,38,40), 'EQUITY':(120,38,74), 'OPERATIONS':(124,79,38),
}
TYPE_COLOR = {
    'ENABLES':(201,122,15), 'REQUIRES':(31,107,93),
    'DRIVES':(62,79,176), 'CONSTRAINS':(154,42,72),
}
# the 15 directed relationships: (from, to, type)
EDGES = [
    ('POLICY','ECONOMICS','ENABLES'), ('POLICY','EQUITY','ENABLES'), ('POLICY','OPERATIONS','REQUIRES'),
    ('TECHNOLOGY','ECONOMICS','ENABLES'), ('TECHNOLOGY','CLINICAL','ENABLES'), ('TECHNOLOGY','EQUITY','ENABLES'),
    ('ECONOMICS','TECHNOLOGY','REQUIRES'), ('ECONOMICS','CLINICAL','DRIVES'), ('ECONOMICS','EQUITY','REQUIRES'),
    ('CLINICAL','EQUITY','ENABLES'), ('CLINICAL','OPERATIONS','REQUIRES'),
    ('EQUITY','POLICY','CONSTRAINS'), ('EQUITY','CLINICAL','CONSTRAINS'),
    ('OPERATIONS','POLICY','ENABLES'), ('OPERATIONS','TECHNOLOGY','REQUIRES'),
]

def font(sz, bold=False):
    base='/System/Library/Fonts/Supplemental/'
    name='Arial Bold.ttf' if bold else 'Arial.ttf'
    try: return ImageFont.truetype(base+name, sz*SCALE)
    except Exception:
        try: return ImageFont.truetype('/Library/Fonts/'+name, sz*SCALE)
        except Exception: return ImageFont.load_default()

# ── layout: six pillar nodes on a ring ───────────────────────────────────────
cx, cy = W//2, int(H*0.47)
R = int(min(W,H)*0.34)
node_r = 92*SCALE
pos = {}
for i,p in enumerate(PILLARS):
    ang = -math.pi/2 + i*(2*math.pi/6)   # start at top, clockwise
    pos[p] = (cx + R*math.cos(ang), cy + R*math.sin(ang))

def edge_endpoints(a, b, offset=0.0):
    """Points on the rims of node a and b, with a small perpendicular offset so
    the two directions between a pair don't overlap."""
    ax,ay = pos[a]; bx,by = pos[b]
    dx,dy = bx-ax, by-ay
    L = math.hypot(dx,dy) or 1
    ux,uy = dx/L, dy/L
    px,py = -uy, ux   # perpendicular
    off = offset*22*SCALE
    sx = ax + ux*node_r + px*off
    sy = ay + uy*node_r + py*off
    ex = bx - ux*node_r + px*off
    ey = by - uy*node_r + py*off
    return sx,sy,ex,ey

def arrow(sx,sy,ex,ey,color,width):
    d.line([(sx,sy),(ex,ey)], fill=color, width=width)
    # arrowhead
    ang = math.atan2(ey-sy, ex-sx)
    ah = 20*SCALE
    for da in (math.pi*0.85, -math.pi*0.85):
        hx = ex - ah*math.cos(ang+da); hy = ey - ah*math.sin(ang+da)
        d.line([(ex,ey),(hx,hy)], fill=color, width=width)

# draw edges first (behind nodes). offset paired directions.
seen_pairs={}
for a,b,ty in EDGES:
    key=tuple(sorted((a,b)))
    off = seen_pairs.get(key,0)
    seen_pairs[key]=off+1
    sx,sy,ex,ey = edge_endpoints(a,b, offset=(1 if off else -1)*0.5)
    arrow(sx,sy,ex,ey, TYPE_COLOR[ty], 5*SCALE)

# draw nodes on top
f_node = font(15, bold=True)
for p in PILLARS:
    x,y = pos[p]
    col = PCOLOR[p]
    d.ellipse([x-node_r,y-node_r,x+node_r,y+node_r], fill=col)
    # wrap the label to 1-2 lines
    lines = [p] if len(p)<=9 else [p[:len(p)//2], p[len(p)//2:]]  # not used; single word fits
    tb = d.textbbox((0,0), p, font=f_node)
    d.text((x-(tb[2]-tb[0])/2, y-(tb[3]-tb[1])/2 - tb[1]), p, font=f_node, fill='white')

# ── legend (relationship types) ──────────────────────────────────────────────
f_leg = font(15, bold=True); f_desc = font(12)
ly = int(H*0.86)
lx = int(W*0.08)
legend = [('ENABLES','makes possible'),('REQUIRES','cannot function without'),
          ('DRIVES','actively forces change in'),('CONSTRAINS','imposes a design limit on')]
col_w = int((W - 2*lx)/2)
for i,(ty,desc) in enumerate(legend):
    col = i%2; row = i//2
    x = lx + col*col_w
    y = ly + row*(46*SCALE)
    d.rectangle([x, y, x+34*SCALE, y+22*SCALE], fill=TYPE_COLOR[ty])
    d.text((x+46*SCALE, y-2*SCALE), ty, font=f_leg, fill=(30,30,30))
    tb=d.textbbox((0,0),ty,font=f_leg)
    d.text((x+46*SCALE+ (tb[2]-tb[0]) + 14*SCALE, y+1*SCALE), '— '+desc, font=f_desc, fill=(90,90,90))

out = img.resize((W//SCALE, H//SCALE), Image.LANCZOS)
os.makedirs('book-build', exist_ok=True)
out.save('book-build/dependency_diagram.png', dpi=(300,300))
print("wrote book-build/dependency_diagram.png", out.size)
