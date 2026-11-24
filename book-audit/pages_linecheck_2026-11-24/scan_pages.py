"""Research Lab tools line check: from every tool route, collect the files it renders (transitive
@/ and relative imports inside app/, components/, lib/), then flag every line that carries a figure
($, %, Nx, counts >= 100, years-with-claims) and has no source marker on the line or the 2 lines around it.
Usage: python3 scan_pages.py <frontend_dir> <out.json> <tools_flags.json>  (website pages, minus files already checked as tools; strict source markers)"""
import json, os, re, sys

FE, OUT = sys.argv[1], sys.argv[2]
TOOL_ROOTS = ("app/research-lab","app/hti-dashboard","app/htr-simulator","app/impact-simulation","app/investment-tracker",
  "app/medicaid-eligibility-simulator","app/policy/medicare-for-all/modeler","app/portfolio-sequencing-test","app/the-wire",
  "app/transformation-friction-index","app/admin","app/api")
ENTRIES = []
for d, _, fs in os.walk(os.path.join(FE, "app")):
    rel = os.path.relpath(d, FE)
    if rel.startswith(TOOL_ROOTS): continue
    for f in fs:
        if f.endswith((".tsx", ".ts")): ENTRIES.append(os.path.join(d, f))
DONE = set(json.load(open(sys.argv[3]))["files"])
IMP = re.compile(r"""(?:from|import)\s*\(?\s*["']([^"']+)["']""")
SKIP_DIRS = ("components/ui/", "lib/supabase", "lib/auth", "node_modules")

def resolve(src, spec):
    if spec.startswith("@/"):
        base = os.path.join(FE, spec[2:])
    elif spec.startswith("."):
        base = os.path.normpath(os.path.join(os.path.dirname(src), spec))
    else:
        return None
    for c in [base + ".tsx", base + ".ts", os.path.join(base, "index.tsx"), os.path.join(base, "index.ts"), base]:
        if os.path.isfile(c) and c.endswith((".ts", ".tsx")):
            return c
    return None

seen, stack = set(), list(ENTRIES)
while stack:
    f = stack.pop()
    if f in seen:
        continue
    seen.add(f)
    rel = os.path.relpath(f, FE)
    if any(s in rel for s in SKIP_DIRS):
        continue
    for spec in IMP.findall(open(f, encoding="utf-8", errors="ignore").read()):
        r = resolve(f, spec)
        if r and r not in seen:
            stack.append(r)

FIG = re.compile(r"\$\s?\d|\d+(?:\.\d+)?\s?%|\b\d+(?:\.\d+)?x\b|\b\d{1,3}(?:,\d{3})+\b|\b\d+(?:\.\d+)?\s?(?:million|billion|trillion|M\b|B\b)")
SRC = re.compile(r"(?i)source|cite|https?://|\(\d{4}\)|\b(19|20)\d{2}\b.*(report|study|rule|act|fact sheet)|CMS|KFF|CBO|GMCB|AHS|VDH|Chartis|NEJM|JAMA|Health Affairs|Oliver Wyman|MedPAC|AHRQ|HRSA|BLS|Census|OECD|Cochrane|PMID|doi")
TEXTY = re.compile(r"""["'`>][^"'`<>]*[A-Za-z]{3,}[^"'`<>]*["'`<]""")
CODEY = re.compile(r"^\s*(//|\*|/\*|import |export type|type |interface |case |className=|style=)")

flags = []
for f in sorted(seen):
    rel = os.path.relpath(f, FE)
    if any(s in rel for s in SKIP_DIRS) or rel.endswith((".test.ts", ".spec.ts")) or rel in DONE:
        continue
    lines = open(f, encoding="utf-8", errors="ignore").read().split("\n")
    for i, ln in enumerate(lines):
        if CODEY.match(ln) or not FIG.search(ln) or not TEXTY.search(ln):
            continue
        if re.search(r"className|tailwind|w-\[|h-\[|width:|height:|opacity|translate|%\)|calc\(", ln):
            continue
        ctx = "\n".join(lines[max(0, i - 2): i + 3])
        if SRC.search(ctx):
            continue
        flags.append([rel, i + 1, ln.strip()[:300]])

json.dump({"files": sorted(os.path.relpath(f, FE) for f in seen), "flags": flags}, open(OUT, "w"), indent=0)
from collections import Counter
c = Counter(r for r, _, _ in flags)
print(len(seen), "files reachable;", len(flags), "flagged lines in", len(c), "files")
for r, n in c.most_common(60):
    print(f"{n:4d}  {r}")
