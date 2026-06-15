#!/usr/bin/env python3
"""
Generate a crisp high-res 6-stage execution-sequence graphic (Example #8) with
Pillow. Numbered 1->6 connector across the top, then six color-coded pillar
cards: pillar name (white on color), diagnostic question (italic), key action.
Colors match the author's example image3.png.
"""
from PIL import Image, ImageDraw, ImageFont
import os

SCALE = 3  # supersample for crispness, then downscale
W, H = 1680*SCALE, 320*SCALE
img = Image.new('RGB', (W, H), 'white')
d = ImageDraw.Draw(img)

# pillar colors (header bars) — sampled to match the example
STAGES = [
    ("1", "POLICY",     "Is it permissible?", "Establish enforceable authority, mandate participation, secure transformation capital", (45,45,45)),
    ("2", "TECHNOLOGY", "Is it possible?",    "Build integrated clinical + claims data infrastructure BEFORE financial risk is assumed", (46,58,107)),
    ("3", "ECONOMICS",  "Is it sustainable?", "Deploy global budgets and reference-based pricing onto a system that can already see itself", (29,107,93)),
    ("4", "CLINICAL",   "Is it effective?",   "Redesign care delivery and transform clinical practice on aligned incentives", (138,38,40)),
    ("5", "EQUITY",     "Is it just?",        "Audit, calibrate, correct — with social risk adjustment embedded in payment design", (120,38,74)),
    ("6", "OPERATIONS", "Is it executable?",  "Close the administrative cost gap and translate strategy into implemented programs", (124,79,38)),
]

def font(sz, bold=False, italic=False):
    base="/System/Library/Fonts/Supplemental/"
    name = ("Arial Bold.ttf" if bold else "Arial Italic.ttf" if italic else "Arial.ttf")
    try: return ImageFont.truetype(base+name, sz*SCALE)
    except Exception:
        try: return ImageFont.truetype("/Library/Fonts/"+name, sz*SCALE)
        except Exception: return ImageFont.load_default()

def wrap(text, fnt, maxw):
    words=text.split(); lines=[]; cur=""
    for w in words:
        t=(cur+" "+w).strip()
        if d.textlength(t, font=fnt)<=maxw: cur=t
        else: lines.append(cur); cur=w
    if cur: lines.append(cur)
    return lines

def ctext(cx, y, text, fnt, fill, anchor="mm"):
    d.text((cx, y), text, font=fnt, fill=fill, anchor=anchor)

margin=40*SCALE
gap=18*SCALE
n=len(STAGES)
card_w=(W-2*margin-(n-1)*gap)//n
top_circle_cy=46*SCALE
card_top=96*SCALE
card_bottom=H-40*SCALE

f_num=font(20,bold=True); f_pill=font(15,bold=True); f_q=font(11,italic=True); f_act=font(10)

# top connector line
line_y=top_circle_cy
d.line([(margin+card_w//2, line_y),(W-margin-card_w//2, line_y)], fill=(150,150,150), width=3*SCALE)

for i,(num,pill,q,act,color) in enumerate(STAGES):
    x0=margin+i*(card_w+gap); x1=x0+card_w; cx=(x0+x1)//2
    # numbered circle on the connector
    r=26*SCALE
    d.ellipse([cx-r, line_y-r, cx+r, line_y+r], fill=color)
    ctext(cx, line_y, num, f_num, 'white')
    # card
    hdr_h=46*SCALE
    d.rectangle([x0, card_top, x1, card_bottom], fill=(252,252,253), outline=(210,210,210), width=1*SCALE)
    d.rectangle([x0, card_top, x1, card_top+hdr_h], fill=color)
    ctext(cx, card_top+hdr_h//2, pill, f_pill, 'white')
    # diagnostic question
    qy=card_top+hdr_h+26*SCALE
    ctext(cx, qy, q, f_q, color)
    # divider
    d.line([(x0+16*SCALE, qy+22*SCALE),(x1-16*SCALE, qy+22*SCALE)], fill=(225,225,225), width=1*SCALE)
    # key action (wrapped, left-aligned)
    ay=qy+40*SCALE
    for ln in wrap(act, f_act, card_w-32*SCALE):
        d.text((x0+16*SCALE, ay), ln, font=f_act, fill=(40,40,40))
        ay+=16*SCALE

# downscale for crisp anti-aliased result
out = img.resize((W//SCALE, H//SCALE), Image.LANCZOS)
os.makedirs('book-build', exist_ok=True)
out.save('book-build/sequence_graphic.png', dpi=(300,300))
print("wrote book-build/sequence_graphic.png", out.size)
