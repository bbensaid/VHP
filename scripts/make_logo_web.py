"""Re-ink logo-option-2.png to the Five-Pillar Map palette and add the dependency web.

Run from the repo root:
  python3 scripts/make_logo_web.py frontend/public/logo-htr-web.png 0.34 2.2 "#c084fc"
args: output, web-line opacity, web-line width (px at 512), Equity ring colour.
Also writes <output>_preview.png (full size + 128/92/46px); delete it after checking.
"""
import sys, math
from PIL import Image, ImageDraw

SRC = "frontend/public/logo-option-2.png"
OUT = sys.argv[1]
LINE_ALPHA = float(sys.argv[2]) if len(sys.argv) > 2 else 0.30
LINE_W = float(sys.argv[3]) if len(sys.argv) > 3 else 2.0

# lib/taxonomy/pillars.ts hex — the Five-Pillar Map palette
HEX = {"policy": "#3b82f6", "technology": "#6366f1", "economics": "#10b981",
       "clinical": "#ef4444", "operations": "#f59e0b"}
ROUGH = {"policy": (257, 48), "technology": (460, 192), "economics": (392, 437),
         "clinical": (122, 439), "operations": (55, 192)}
# The Five-Pillar Map's nine arrows, as undirected pairs (Policy<->Operations runs both ways).
PAIRS = [("policy", "technology"), ("policy", "economics"), ("policy", "operations"),
         ("operations", "technology"), ("technology", "clinical"),
         ("technology", "economics"), ("economics", "clinical"), ("clinical", "operations")]

def rgb(h): return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))

src = Image.open(SRC).convert("RGBA")
px = src.load()
W, H = src.size

# Refine each dot centre: centroid of solid, non-white pixels within 30px of the rough seed.
centres, radius = {}, 0
for k, (cx, cy) in ROUGH.items():
    for _ in range(3):
        sx = sy = n = 0
        for y in range(cy - 40, cy + 41):
            for x in range(cx - 40, cx + 41):
                if (x - cx) ** 2 + (y - cy) ** 2 > 38 ** 2: continue
                r, g, b, a = px[x, y]
                if a > 240 and min(r, g, b) < 150:
                    sx += x; sy += y; n += 1
        cx, cy = round(sx / n), round(sy / n)
    centres[k] = (sx / n, sy / n)
    radius = max(radius, math.sqrt(n / math.pi))
print("centres", {k: tuple(round(v, 1) for v in c) for k, c in centres.items()}, "r", round(radius, 1))

R = radius            # dot radius
HALO = 4.5            # white ring around each dot, as in the original
ERASE = R + 7         # clears old dot + its halo + antialias fringe

# 1. Erase the old dots.
base = src.copy()
bp = base.load()
for (cx, cy) in centres.values():
    for y in range(int(cy - ERASE) - 1, int(cy + ERASE) + 2):
        for x in range(int(cx - ERASE) - 1, int(cx + ERASE) + 2):
            if (x - cx) ** 2 + (y - cy) ** 2 <= ERASE ** 2:
                bp[x, y] = (0, 0, 0, 0)

RING = sys.argv[4] if len(sys.argv) > 4 else None
if RING:
    # Ring arcs: fit the circle through the five dot centres, then re-ink every pixel in the band
    # around it. Edges in this artwork are blended toward white (not alpha), so keep each pixel's
    # coverage t = darkness relative to the darkest ring pixel at that angle, and re-blend.
    ccx = sum(c[0] for c in centres.values()) / 5
    ccy = sum(c[1] for c in centres.values()) / 5
    rr = sum(math.hypot(c[0] - ccx, c[1] - ccy) for c in centres.values()) / 5
    lum = lambda p: 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]
    # Solid ring pixels (dots are already erased, letters sit well inside the band).
    pts = [(x, y) for y in range(H) for x in range(W)
           if abs(math.hypot(x - ccx, y - ccy) - rr) <= 30 and bp[x, y][3] > 200 and lum(bp[x, y]) < 170]
    # Kasa least-squares circle fit: x^2+y^2 + D x + E y + F = 0.
    Sx = sum(p[0] for p in pts); Sy = sum(p[1] for p in pts); n = len(pts)
    Sxx = sum(p[0] ** 2 for p in pts); Syy = sum(p[1] ** 2 for p in pts); Sxy = sum(p[0] * p[1] for p in pts)
    Sz = [p[0] ** 2 + p[1] ** 2 for p in pts]
    Szx = sum(z * p[0] for z, p in zip(Sz, pts)); Szy = sum(z * p[1] for z, p in zip(Sz, pts)); Szs = sum(Sz)
    A = [[Sxx, Sxy, Sx], [Sxy, Syy, Sy], [Sx, Sy, n]]; bvec = [-Szx, -Szy, -Szs]
    def det(m): return (m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]))
    d = det(A); sol = []
    for i in range(3):
        m = [row[:] for row in A]
        for r_ in range(3): m[r_][i] = bvec[r_]
        sol.append(det(m) / d)
    D, E, F = sol
    fx, fy = -D / 2, -E / 2
    fr = math.sqrt(fx * fx + fy * fy - F)
    dists = sorted(math.hypot(x - fx, y - fy) for x, y in pts)
    thick = dists[int(len(dists) * 0.97)] - dists[int(len(dists) * 0.03)]
    covered = set(int((math.degrees(math.atan2(y - fy, x - fx)) + 360) % 360) for x, y in pts)
    # Erase the old ring band entirely.
    for y in range(H):
        for x in range(W):
            if abs(math.hypot(x - fx, y - fy) - fr) <= thick / 2 + 8:
                bp[x, y] = (0, 0, 0, 0)
    # Arc runs = contiguous covered degrees.
    runs, start = [], None
    order = list(range(360))
    first_gap = next(a for a in order if a not in covered)
    seq = order[first_gap:] + order[:first_gap]
    for a in seq + [first_gap]:
        if a in covered and start is None: start = a
        if a not in covered and start is not None:
            runs.append((start, prev + 1)); start = None
        prev = a
    runs = [r_ for r_ in runs if (r_[1] - r_[0]) % 360 > 4]
    print("ring fit", round(fx, 1), round(fy, 1), "r", round(fr, 1), "thick", round(thick, 1), "arcs", runs)
    RING_GEOM = (fx, fy, fr, 6.5, runs)

S = 8  # supersample
def layer(): return Image.new("RGBA", (W * S, H * S), (0, 0, 0, 0))

# 2. Hairline web: gradient from one pillar's colour to the other's, drawn in short steps.
lines = layer()
ld = ImageDraw.Draw(lines)
for a, b in PAIRS:
    (x0, y0), (x1, y1) = centres[a], centres[b]
    c0, c1 = rgb(HEX[a]), rgb(HEX[b])
    steps = 120
    for i in range(steps):
        t0, t1 = i / steps, (i + 1) / steps
        tm = (t0 + t1) / 2
        col = tuple(round(c0[j] + (c1[j] - c0[j]) * tm) for j in range(3)) + (255,)
        ld.line([((x0 + (x1 - x0) * t0) * S, (y0 + (y1 - y0) * t0) * S),
                 ((x0 + (x1 - x0) * t1) * S, (y0 + (y1 - y0) * t1) * S)],
                fill=col, width=max(1, round(LINE_W * S)))
lines = lines.resize((W, H), Image.LANCZOS)
if RING:
    fx, fy, fr, thick, runs = RING_GEOM
    ring = layer()
    rd = ImageDraw.Draw(ring)
    w = round(thick * S)
    for a0, a1 in runs:
        a1 = a1 if a1 > a0 else a1 + 360
        box = [(fx - fr - thick / 2) * S, (fy - fr - thick / 2) * S, (fx + fr + thick / 2) * S, (fy + fr + thick / 2) * S]
        rd.arc(box, a0, a1, fill=rgb(RING) + (255,), width=w)
        for a in (a0, a1):  # round caps, as in the original
            ex, ey = fx + fr * math.cos(math.radians(a)), fy + fr * math.sin(math.radians(a))
            rd.ellipse([(ex - thick / 2) * S, (ey - thick / 2) * S, (ex + thick / 2) * S, (ey + thick / 2) * S], fill=rgb(RING) + (255,))
    ring = ring.resize((W, H), Image.LANCZOS)
    base = Image.alpha_composite(base, ring)
la = lines.split()[3].point(lambda v: round(v * LINE_ALPHA))
lines.putalpha(la)

# 3. New dots with the white halo.
dots = layer()
dd = ImageDraw.Draw(dots)
for k, (cx, cy) in centres.items():
    h = R + HALO
    dd.ellipse([(cx - h) * S, (cy - h) * S, (cx + h) * S, (cy + h) * S], fill=(255, 255, 255, 255))
    dd.ellipse([(cx - R) * S, (cy - R) * S, (cx + R) * S, (cy + R) * S], fill=rgb(HEX[k]) + (255,))
dots = dots.resize((W, H), Image.LANCZOS)

out = Image.alpha_composite(base, lines)
out = Image.alpha_composite(out, dots)
out.save(OUT, optimize=True)

# Preview sheet: full size on white, plus the header size (~46px) and a 2x of it.
sheet = Image.new("RGB", (512 + 20 + 128 + 20 + 92 + 20 + 46 + 20, 512), "white")
for i, (img, sz, x) in enumerate([(src, 256, 0), (out, 512, 0)]):
    pass
sheet.paste(out, (0, 0), out)
x = 532
for sz in (128, 92, 46):
    t = out.resize((sz, sz), Image.LANCZOS)
    sheet.paste(t, (x, 10), t)
    x += sz + 20
sheet.save(OUT.replace(".png", "_preview.png"))
