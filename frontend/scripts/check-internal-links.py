#!/usr/bin/env python3
"""Static internal-link check: every href="/..." in app/, components/, lib/ must resolve to a
route in app/ (page.tsx, route.ts, a dynamic segment, a public/ file, or a next.config redirect).
    python3 scripts/check-internal-links.py        (run from frontend/)
Exit 1 if any link is dead. Query strings and #anchors are ignored."""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

routes = []
for dp, dn, fn in os.walk("app"):
    if any(f in fn for f in ("page.tsx", "page.ts", "page.jsx", "route.ts", "route.tsx")):
        segs = [s for s in dp.split(os.sep)[1:] if not (s.startswith("(") and s.endswith(")"))]
        routes.append(segs)

_cfg = open("next.config.ts").read()
_rb = _cfg[_cfg.find("async redirects()"):_cfg.find("async headers()")]
redirects = re.findall(r'source:\s*"([^"]+)"', _rb)


def seg_match(pattern, part):
    if pattern.startswith("[[...") or pattern.startswith("[..."):
        return "rest"
    if pattern.startswith("["):
        return True
    return pattern == part


def resolves(path):
    parts = [p for p in path.strip("/").split("/") if p]
    if os.path.exists(os.path.join("public", *parts)) and parts:
        return True
    if len(parts) == 1 and os.path.exists(os.path.join("app", parts[0])):
        return True   # app-level metadata files (favicon.ico, icon.png, robots.txt ...)
    for r in routes:
        ok, i = True, 0
        for j, pat in enumerate(r):
            m = seg_match(pat, parts[i] if i < len(parts) else None)
            if m == "rest":
                i = len(parts); break
            if i >= len(parts) or not m:
                ok = False; break
            i += 1
        if ok and i == len(parts) and (len(r) == len(parts) or (r and r[-1].startswith("[["))):
            return True
        if ok and i == len(parts) and len(r) >= len(parts) and r[len(parts):] and all(x.startswith("[[") for x in r[len(parts):]):
            return True
    if not parts:
        return True
    for src in redirects:
        rx = "^" + re.sub(r":[a-zA-Z]+\*?", "[^/]+(?:/.*)?", src) + "$"
        if re.match(rx, "/" + "/".join(parts)):
            return True
    return False


HREF = re.compile(r'''(?:href|to|link|url)\s*[=:]\s*\{?\s*["'`](/[a-zA-Z0-9_\-/\[\].]*)(?:[?#][^"'`]*)?["'`]''')
dead = {}
seen = set()
for base in ("app", "components", "lib"):
    for dp, dn, fn in os.walk(base):
        for f in fn:
            if not f.endswith((".tsx", ".ts")):
                continue
            p = os.path.join(dp, f)
            txt = open(p, encoding="utf-8", errors="ignore").read()
            for m in HREF.finditer(txt):
                h = m.group(1)
                if h.startswith(("/api/", "/_next", "/studio")) or "${" in h or h == "/":
                    continue
                seen.add(h)
                if not resolves(h.split("?")[0].split("#")[0]):
                    dead.setdefault(h, []).append(p)
for h, ps in sorted(dead.items()):
    print(f"DEAD {h}  <- {', '.join(sorted(set(ps))[:3])}")
print(f"{len(dead)} dead internal link targets (of {len(seen)} distinct checked)")
sys.exit(1 if dead else 0)
