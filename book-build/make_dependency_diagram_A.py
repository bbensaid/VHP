#!/usr/bin/env python3
"""
Figure 1.B — Version A: six-pillar ring with CURVED, clearly directional arrows.
Each of the 15 dependencies is a quadratic-bezier arc with a large arrowhead that
lands short of the target node, so direction reads at a glance. Paired opposite
edges curve opposite ways so they separate. Pillow, supersampled for crispness.
"""
from PIL import Image, ImageDraw, ImageFont
import math, os

SCALE = 3
W, H = 1500*SCALE, 1180*SCALE
img = Image.new('RGB', (W, H), 'white')
d = ImageDraw.Draw(img)

PILLARS = ['POLICY','TECHNOLOGY','ECONOMICS','CLINICAL','EQUITY','OPERATIONS']
PCOLOR = {'POLICY':(45,45,45),'TECHNOLOGY':(46,58,107),'ECONOMICS':(29,107,93),
          'CLINICAL':(138,38,40),'EQUITY':(120,38,74),'OPERATIONS':(124,79,38)}
TYPE_COLOR = {'ENABLES':(201,122,15),'REQUIRES':(31,107,93),'DRIVES':(62,79,176),'CONSTRAINS':(154,42,72)}
EDGES = [
    ('POLICY','ECONOMICS','ENABLES'),('POLICY','EQUITY','ENABLES'),('POLICY','OPERATIONS','REQUIRES'),
    ('TECHNOLOGY','ECONOMICS','ENABLES'),('TECHNOLOGY','CLINICAL','ENABLES'),('TECHNOLOGY','EQUITY','ENABLES'),
    ('ECONOMICS','TECHNOLOGY','REQUIRES'),('ECONOMICS','CLINICAL','DRIVES'),('ECONOMICS','EQUITY','REQUIRES'),
    ('CLINICAL','EQUITY','ENABLES'),('CLINICAL','OPERATIONS','REQUIRES'),
    ('EQUITY','POLICY','CONSTRAINS'),('EQUITY','CLINICAL','CONSTRAINS'),
    ('OPERATIONS','POLICY','ENABLES'),('OPERATIONS','TECHNOLOGY','REQUIRES'),
]

def font(sz, bold=False):
    base='/System/Library/Fonts/Supplemental/'; name='Arial Bold.ttf' if bold else 'Arial.ttf'
    try: return ImageFont.truetype(base+name, sz*SCALE)
    except Exception:
        try: return ImageFont.truetype('/Library/Fonts/'+name, sz*SCALE)
        except Exception: return ImageFont.load_default()

cx, cy = W//2, int(H*0.44)
R = int(min(W,H)*0.33); node_r = 96*SCALE
pos={}
for i,p in enumerate(PILLARS):
    ang=-math.pi/2 + i*(2*math.pi/6)
    pos[p]=(cx+R*math.cos(ang), cy+R*math.sin(ang))

def bezier(p0,p1,p2,n=40):
    pts=[]
    for k in range(n+1):
        t=k/n; mt=1-t
        x=mt*mt*p0[0]+2*mt*t*p1[0]+t*t*p2[0]
        y=mt*mt*p0[1]+2*mt*t*p1[1]+t*t*p2[1]
        pts.append((x,y))
    return pts

def draw_arrow(a,b,color,bend):
    ax,ay=pos[a]; bx,by=pos[b]
    dx,dy=bx-ax,by-ay; L=math.hypot(dx,dy) or 1
    ux,uy=dx/L,dy/L; px,py=-uy,ux
    # start/end on rims, end lands a bit before target so arrowhead is clear
    sx,sy = ax+ux*node_r, ay+uy*node_r
    ex,ey = bx-ux*(node_r+10*SCALE), by-uy*(node_r+10*SCALE)
    mx,my = (sx+ex)/2 + px*bend, (sy+ey)/2 + py*bend   # control point -> curve
    pts=bezier((sx,sy),(mx,my),(ex,ey))
    for i in range(len(pts)-1):
        d.line([pts[i],pts[i+1]], fill=color, width=6*SCALE)
    # arrowhead at end, oriented along last segment
    x2,y2=pts[-1]; x1,y1=pts[-3]
    ang=math.atan2(y2-y1,x2-x1); ah=28*SCALE; sp=0.5
    p1=(x2-ah*math.cos(ang-sp), y2-ah*math.sin(ang-sp))
    p2=(x2-ah*math.cos(ang+sp), y2-ah*math.sin(ang+sp))
    d.polygon([ (x2,y2), p1, p2 ], fill=color)

pair_dir={}
for a,b,ty in EDGES:
    key=tuple(sorted((a,b))); c=pair_dir.get(key,0); pair_dir[key]=c+1
    bend = (1 if c else -1) * 70*SCALE
    draw_arrow(a,b,TYPE_COLOR[ty],bend)

f_node=font(15,bold=True)
for p in PILLARS:
    x,y=pos[p]; d.ellipse([x-node_r,y-node_r,x+node_r,y+node_r], fill=PCOLOR[p])
    tb=d.textbbox((0,0),p,font=f_node)
    d.text((x-(tb[2]-tb[0])/2, y-(tb[3]-tb[1])/2 - tb[1]), p, font=f_node, fill='white')

# legend
f_leg=font(15,bold=True); f_desc=font(12)
ly=int(H*0.88); lx=int(W*0.08); col_w=int((W-2*lx)/2)
legend=[('ENABLES','makes possible'),('REQUIRES','cannot function without'),
        ('DRIVES','actively forces change in'),('CONSTRAINS','imposes a design limit on')]
for i,(ty,desc) in enumerate(legend):
    col=i%2; row=i//2; x=lx+col*col_w; y=ly+row*46*SCALE
    d.rectangle([x,y,x+34*SCALE,y+22*SCALE], fill=TYPE_COLOR[ty])
    d.text((x+46*SCALE, y-2*SCALE), ty, font=f_leg, fill=(30,30,30))
    tb=d.textbbox((0,0),ty,font=f_leg)
    d.text((x+46*SCALE+(tb[2]-tb[0])+14*SCALE, y+1*SCALE), '— '+desc, font=f_desc, fill=(90,90,90))

out=img.resize((W//SCALE,H//SCALE), Image.LANCZOS)
out.save('book-build/dependency_diagram_A.png', dpi=(300,300))
print("wrote book-build/dependency_diagram_A.png", out.size)
