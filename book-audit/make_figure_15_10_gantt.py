#!/usr/bin/env python3
"""Figure 15.10 — §15.12 Implementation Roadmap, as a dependency-aware Gantt.


Top band: the recommended PMO build-out, scheduled backward from the fixed January 2028
Strategic Plan deadline (these are the book's recommendations, not dates any agency adopted).
Bottom band: the gating components from Figure 15.3, so the roadmap shows *why* the
PMO dates matter — the analytics gate (R-01) and the FY2028 payment go-live.
Palette and style follow make_figure_1_11_gantt.py (platform PILLAR_COLORS + book navy).
"""
import sys
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

OUT = sys.argv[1] if len(sys.argv) > 1 else "book-audit/figure_15_10_gantt.png"

NAVY, INK, GREY, GRID = "#1b3a6b", "#161b22", "#5b6673", "#dfe6f0"
PILLAR = {"Policy": "#0284c7", "Technology": "#4f46e5", "Economics": "#059669",
          "Clinical": "#e11d48", "Operations": "#0d9488", "PMO": NAVY}

# label, pillar, start, end, bar text, style ("solid" | "design" | "ongoing")
PMO = [
    ("Portfolio Manager (PfMP)", "PMO", 2026.75, 2027.0, "post + recruit (in seat Jan 2027)", "solid"),
    ("Portfolio & risk registers", "PMO", 2027.0, 2027.17, "formalize", "solid"),
    ("Master schedule · 19 leads", "PMO", 2027.0, 2027.33, "integrated master schedule", "solid"),
    ("Analysts · PPM software", "PMO", 2027.17, 2027.42, "dashboard live", "solid"),
    ("Five pillar Program Mgrs", "PMO", 2027.25, 2027.5, "designated", "solid"),
    ("Governance cadence", "PMO", 2027.42, 2028.5, "monthly board · quarterly Scorecard review", "ongoing"),
]
COMPONENTS = [
    ("Analytics vendor  (R-01)", "Technology", 2026.0, 2027.0, "procurement → operational", "solid"),
    ("CIN build-out", "Technology", 2026.0, 2028.5, "design → FY2028 operational", "solid"),
    ("RBP methodology rulemaking", "Policy", 2026.0, 2027.5, "rulemaking → FY2027", "solid"),
    ("Social-risk adjustment  (R-08)", "Economics", 2026.0, 2027.75, "no upstream blocker — run now", "solid"),
    ("Global budgets + RBP rates", "Economics", 2026.0, 2027.75, "build on live analytics", "gated"),
    ("14 hospital plans", "Operations", 2026.2, 2028.5, "finals Mar 2026 → implementation", "solid"),
    ("Statewide Strategic Plan", "Policy", 2026.0, 2028.04, "drafting → due Jan 15, 2028", "solid"),
]
GATE_AT = 2027.0          # analytics operational (Fig 15.3)
TODAY = 2026.78           # Oct 2026
X0, X1 = 2026.0, 2028.6

rows = [("hdr", "PORTFOLIO BUILD-OUT (PMO)")] + [("bar", r) for r in PMO] + \
       [("gap", None), ("hdr", "GATING COMPONENTS (Figure 15.3)")] + [("bar", r) for r in COMPONENTS]
n = len(rows)

fig, ax = plt.subplots(figsize=(10.4, 7.4), dpi=200)
ax.set_xlim(X0 - 0.62, X1)
ax.set_ylim(-0.8, n - 0.2)
ax.axis("off")

quarters = [2026 + q / 4 for q in range(0, 10)]
for x in quarters:
    ax.plot([x, x], [-0.3, n - 0.6], color=GRID, lw=0.8, zorder=0)
    yr, q = int(x), int(round((x - int(x)) * 4)) + 1
    ax.text(x + 0.125, -0.55, f"Q{q}", ha="center", fontsize=8.8, color=GREY)
    if q == 1:
        ax.text(x, -0.85, str(yr), ha="left", fontsize=9.9, color=NAVY, weight="bold")

BAR_H = 0.56
ymap = {}
for i, (kind, r) in enumerate(rows):
    y = n - 1 - i
    if kind == "hdr":
        ax.text(X0 - 0.6, y, r, fontsize=10.5, weight="bold", color=NAVY, va="center")
        continue
    if kind != "bar":
        continue
    label, pillar, s, e, txt, style = r
    ymap[label] = y
    col = PILLAR[pillar]
    ax.text(X0 - 0.03, y, label, ha="right", va="center", fontsize=9.5, color=INK)
    if style == "gated":
        ax.plot([s, GATE_AT], [y, y], ls=(0, (4, 3)), color=col, lw=1.6)
        ax.text((s + GATE_AT) / 2, y + 0.22, "design only", ha="center", fontsize=8.1,
                color=col, style="italic")
        s = GATE_AT
    ax.add_patch(FancyBboxPatch((s, y - BAR_H / 2), e - s, BAR_H,
                                boxstyle="round,pad=0,rounding_size=0.03",
                                fc=col, ec="none", alpha=0.92 if style != "ongoing" else 0.55))
    inside = (e - s) > 0.45
    ax.text(s + 0.02 if inside else e + 0.05, y, txt, va="center", ha="left",
            fontsize=8.6, color="white" if inside else GREY, weight="bold" if inside else None)
    if style == "ongoing":
        ax.annotate("", xy=(X1 - 0.02, y), xytext=(X1 - 0.12, y),
                    arrowprops=dict(arrowstyle="-|>", color=NAVY, lw=1.2))

# milestones
def diamond(x, y, label, col=NAVY, dy=0.38):
    ax.plot(x, y, marker="D", ms=7, color=col, mec="white", mew=1.0, zorder=5)
    ax.text(x, y + dy, label, ha="center", fontsize=8.1, color=col, weight="bold")

ax.plot(2027.0, ymap["Portfolio Manager (PfMP)"], marker="D", ms=7, color=NAVY, mec="white", zorder=5)
diamond(GATE_AT, ymap["Analytics vendor  (R-01)"], "TECHNOLOGY GATE", PILLAR["Technology"])
diamond(2027.75, ymap["Global budgets + RBP rates"], "FY2028 go-live", PILLAR["Economics"], dy=-0.48)
diamond(2028.04, ymap["Statewide Strategic Plan"], "Jan 15, 2028", PILLAR["Policy"])

# the gate: analytics → payment go-live
ya, yg = ymap["Analytics vendor  (R-01)"], ymap["Global budgets + RBP rates"]
ax.annotate("", xy=(GATE_AT, yg + BAR_H / 2 + 0.02), xytext=(GATE_AT, ya - BAR_H / 2 - 0.02),
            arrowprops=dict(arrowstyle="-|>", color=PILLAR["Technology"], lw=1.4, ls="--"))

# reference line: when the chart was drawn
ax.plot([TODAY, TODAY], [-0.3, n - 0.6], color="#b45309", lw=1.3, ls=":")
ax.text(TODAY, n - 0.5, "as of Oct 2026", ha="center", fontsize=8.4, color="#b45309", weight="bold")

fig.suptitle("Implementation Roadmap — the PMO has to be running before the gate it protects",
             x=0.035, y=0.985, ha="left", fontsize=14.9, weight="bold", color=NAVY)
fig.text(0.035, 0.885, "Portfolio build-out (top) scheduled against the components it must sequence (bottom).\n"
         "Dashed = design work allowed before the Technology gate opens.", fontsize=9.9, color=GREY)
plt.subplots_adjust(left=0.02, right=0.985, top=0.86, bottom=0.04)
fig.savefig(OUT, facecolor="white")
print(OUT)
