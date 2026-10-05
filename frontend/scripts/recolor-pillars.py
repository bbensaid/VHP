"""One-off: adopt the Five-Pillar Map palette as the platform standard (2026-10-04).

Policy     sky  -> blue   (same shade; blue is darker, so contrast only improves)
Operations teal -> amber  (same shade, with two contrast guards, see amber())
Technology stays indigo, Economics emerald, Clinical red, Equity violet.

A sky/teal class is recoloured only when the nearest pillar name above it (same
line or up to 15 lines up) is Policy / Operations, so unrelated uses of teal and
sky are left alone. Files under app/policy/ and app/operations/ are themed by
their pillar throughout, so every sky (resp. teal) class there is converted.

Usage:  python3 scripts/recolor-pillars.py          (dry run, prints changes)
        python3 scripts/recolor-pillars.py --apply
"""
import os
import re
import sys

APPLY = "--apply" in sys.argv
ROOTS = ["app", "components", "lib"]
PILLAR_WORD = re.compile(r"\b(policy|technology|tech|economics|econ|clinical|operations|operational|ops|equity)\b", re.I)
CLASS = re.compile(r"(?P<pre>(?:[a-z-]+:)*(?:bg|text|border|border-[lrtbxy]|ring|divide|from|to|via|fill|stroke|outline|decoration|shadow|accent|caret|placeholder)-)(?P<fam>sky|teal)-(?P<shade>\d{2,3})(?P<post>/\d+)?")
NAME_LITERAL = re.compile(r"""(?P<q>["'])(?P<fam>sky|teal)(?P=q)""")
LOOKBACK = 15
# Reviewed false positives from the dry run: teal/sky here is not pillar colour.
SKIP = {
    ("app/welcome/page.tsx", 89), ("app/academy/medicaid/page.tsx", 151),
    ("app/academy/medicaid/glossary/page.tsx", 375), ("app/clinical/hah/page.tsx", 260),
    ("app/california-calaim/page.tsx", 355), ("app/california-calaim/page.tsx", 356),
    ("components/UpgradePrompt.tsx", 53), ("components/UpgradePrompt.tsx", 54),
    ("components/UpgradePrompt.tsx", 55), ("components/UpgradePrompt.tsx", 56),
    ("components/research/ResearchWorkspace.atoms.tsx", 73),
    ("app/connect/ConnectHubClient.tsx", 17), ("app/connect/ConnectHubClient.tsx", 18), ("app/connect/ConnectHubClient.tsx", 19),
    ("app/connect-hub/ConnectHubClient.tsx", 17), ("app/connect-hub/ConnectHubClient.tsx", 18), ("app/connect-hub/ConnectHubClient.tsx", 19),
    # Research Lab bench badges are themed by bench, not pillar
    ("app/research-lab/ResearchLabHub.tsx", 110),
    # handled by hand (colour-name lookups need new keys)
    ("app/htr-simulator/page.tsx", 95), ("app/vermont-act-68/page.tsx", 245), ("app/vermont-act-68/page.tsx", 270),
}


def pillar_for(lines, i, upto):
    """Nearest pillar word at or above line i (on line i, only text before `upto`)."""
    m = list(PILLAR_WORD.finditer(lines[i][:upto]))
    if m:
        return m[-1].group(1).lower()
    for j in range(i - 1, max(-1, i - 1 - LOOKBACK), -1):
        m = list(PILLAR_WORD.finditer(lines[j]))
        if m:
            return m[-1].group(1).lower()
    return None


def amber(pre, shade, line):
    shade = int(shade)
    utility = pre.split(":")[-1]
    if utility == "text-" and shade in (500, 600):
        return 700  # amber-500/600 text on light grounds fails AA
    if utility == "bg-" and shade in (500, 600) and "text-white" in line:
        return 700  # white text on amber-500/600 fails AA; amber-700 passes
    if utility == "bg-" and shade == 700 and "hover:" in pre and "text-white" in line:
        return 800
    return shade


def convert_line(line, lines, i, force):
    def cls(m):
        fam = m.group("fam")
        owner = force or pillar_for(lines, i, m.start())
        if fam == "sky" and owner == "policy":
            return f"{m.group('pre')}blue-{m.group('shade')}{m.group('post') or ''}"
        if fam == "teal" and owner in ("operations", "operational", "ops"):
            return f"{m.group('pre')}amber-{amber(m.group('pre'), m.group('shade'), line)}{m.group('post') or ''}"
        return m.group(0)

    def lit(m):
        fam = m.group("fam")
        owner = force or pillar_for(lines, i, m.start())
        if fam == "sky" and owner == "policy":
            return f"{m.group('q')}blue{m.group('q')}"
        if fam == "teal" and owner in ("operations", "operational", "ops"):
            return f"{m.group('q')}amber{m.group('q')}"
        return m.group(0)

    return NAME_LITERAL.sub(lit, CLASS.sub(cls, line))


def main():
    total = 0
    for root in ROOTS:
        for dp, _, fns in os.walk(root):
            for fn in fns:
                if not fn.endswith((".ts", ".tsx")):
                    continue
                path = os.path.join(dp, fn)
                force = "policy" if path.startswith("app/policy/") else "operations" if path.startswith("app/operations/") else None
                src = open(path, encoding="utf-8").read()
                lines = src.split("\n")
                out = [l if (path, i + 1) in SKIP else convert_line(l, lines, i, force) for i, l in enumerate(lines)]
                changed = [(i, a, b) for i, (a, b) in enumerate(zip(lines, out)) if a != b]
                if not changed:
                    continue
                total += len(changed)
                print(f"== {path}  ({len(changed)} lines)")
                for i, a, b in changed[:60]:
                    print(f"  {i+1}: {b.strip()[:170]}")
                if APPLY:
                    open(path, "w", encoding="utf-8").write("\n".join(out))
    print(f"\n{total} lines {'changed' if APPLY else 'would change'}")


if __name__ == "__main__":
    main()
