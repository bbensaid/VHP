#!/usr/bin/env python3
"""Build Figure 1.11 — the five-stage execution sequence as a Gantt timeline.

Data is taken verbatim from HTR_Book_v42.docx:
  - Figure 1.8 "Vermont's transformation timeline, by pillar" (Status (timeframe))
  - Figure 1.6 "The Five-Stage Execution Sequence" (Key action / Vermont anchor)
Palette follows the platform's own per-pillar convention in
frontend/app/impact-simulation/page.tsx (PILLAR_COLORS bar values), framed in
the book's navy #1b3a6b (book-build/docx_build.py).
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

OUT = "/Users/baba/Vermont-Health-Platform/book-audit/figure_1_11_gantt.png"

NAVY = "#1b3a6b"
BAND = "#e8f0fb"
INK = "#161b22"
GREY = "#5b6673"

# name, start, end, colour, status label, key action (short), anchor
STAGES = [
    ("1 · POLICY", 2022.0, 2025.6, "#0284c7",
     "Completed (2022–2025)",
     "Enforceable authority, mandated participation, transformation capital",
     "Acts 167, 51, 68 · $195M first-year RHT award"),
    ("2 · TECHNOLOGY", 2025.0, 2027.0, "#4f46e5",
     "In progress (2025–2026)",
     "Integrated clinical + claims data, near real time, before risk is assumed",
     "VHCURES · VITL/VHIE · AHS–GMCB analytics · Vermont CIN"),
    ("3 · ECONOMICS", 2027.0, 2029.0, "#059669",
     "Staged (2027–2028)",
     "Global budgets and RBP deployed on a system that can already see itself",
     "RBP mandatory FY2027 · global budgets mandatory FY2028"),
    ("4 · CLINICAL", 2024.0, 2028.8, "#e11d48",
     "Parallel (2024–2028)",
     "Care redesigned on aligned incentives",
     "PCMH · CoCM · CCBHC · Blueprint 5.8:1 ROI"),
    ("5 · OPERATIONS", 2025.0, 2028.8, "#0d9488",
     "Building (2025–2028) — closes last",
     "Close the administrative cost gap; strategy into implemented programs",
     "RHRC methodology · shared services · 14-hospital planning"),
]

# design-phase (dashed) leaders: work that begins before the bar goes live
DESIGN = {2: (2025.0, 2027.0)},  # Economics-as-design runs during Stage 2

X0, X1 = 2022.0, 2030.0

fig, ax = plt.subplots(figsize=(13.2, 7.4), dpi=200)
fig.patch.set_facecolor("white")
ax.set_facecolor("white")

BAR_H = 0.42
ys = list(range(len(STAGES)))[::-1]

# gridlines by year
for yr in range(int(X0), int(X1) + 1):
    ax.axvline(yr, color="#dde5f0", lw=0.9, zorder=0)

# Equity band across every stage
ax.add_patch(FancyBboxPatch(
    (X0, -0.92), X1 - X0, 0.42, boxstyle="round,pad=0,rounding_size=0.06",
    fc="#f3efff", ec="#8b5cf6", lw=1.0, zorder=1))
ax.text(X0 + 0.12, -0.71,
        "EQUITY IMPERATIVE — a constraint applied across every stage, never a final add-on "
        "(§1.11.6; Vermont's 11-point primary-care access gap)",
        va="center", ha="left", fontsize=9.0, color="#5b21b6", style="italic", zorder=2)

for (name, s, e, col, status, action, anchor), y in zip(STAGES, ys):
    # design-phase leader for Economics
    if name.startswith("3"):
        ax.plot([2025.0, 2027.0], [y, y], color=col, lw=1.6, ls=(0, (3, 2)), zorder=2)
        ax.text(2025.1, y + 0.34, "payment design runs in parallel during Stage 2",
                fontsize=7.8, color=col, style="italic", va="bottom")
    ax.add_patch(FancyBboxPatch(
        (s, y - BAR_H / 2), e - s, BAR_H,
        boxstyle="round,pad=0,rounding_size=0.08",
        fc=col, ec="none", alpha=0.92, zorder=3))
    ax.text(s + 0.10, y, status, va="center", ha="left",
            fontsize=8.6, color="white", fontweight="bold", zorder=4)
    ax.text(e + 0.10, y + 0.10, action, va="center", ha="left",
            fontsize=8.4, color=INK, zorder=4)
    if name.startswith('2'):
        ax.text(s + 0.10, y - 0.34, 'current bottleneck', fontsize=7.8, color=col, style='italic', va='center')
    ax.text(e + 0.10, y - 0.17, anchor, va="center", ha="left",
            fontsize=7.6, color=GREY, zorder=4)

# gate arrows: each stage opens the next
for (a, b) in [(0, 1), (1, 2), (2, 3), (3, 4)]:
    ya, yb = ys[a], ys[b]
    xg = STAGES[b][1]
    ax.annotate("", xy=(xg, yb + BAR_H / 2 + 0.02), xytext=(xg, ya - BAR_H / 2 - 0.02),
                arrowprops=dict(arrowstyle="-|>", color=NAVY, lw=1.1,
                                shrinkA=0, shrinkB=0, alpha=0.55), zorder=2)

ax.set_xlim(X0, X1 + 3.35)
ax.set_ylim(-1.15, len(STAGES) - 0.30)
ax.set_yticks(ys)
ax.set_yticklabels([s[0] for s in STAGES], fontsize=10.5, fontweight="bold", color=NAVY)
ax.set_xticks(range(int(X0), int(X1) + 1))
ax.set_xticklabels([str(y) for y in range(int(X0), int(X1) + 1)], fontsize=9, color=GREY)
ax.tick_params(axis="both", length=0)
for side in ("top", "right", "left"):
    ax.spines[side].set_visible(False)
ax.spines["bottom"].set_color("#c3cfe0")
ax.spines["bottom"].set_bounds(X0, X1)

ax.set_title("The Five-Stage Execution Sequence — Vermont, 2022–2030",
             fontsize=14, fontweight="bold", color=NAVY, loc="left", pad=30)
ax.text(0, 1.008,
        "Each gate must open before the next stage can carry weight; Clinical runs in parallel and Operations closes last.",
        transform=ax.transAxes, fontsize=9.2, color=GREY, va="bottom")

fig.tight_layout(rect=(0, 0.015, 1, 1))
fig.savefig(OUT, dpi=200, facecolor="white")
print("wrote", OUT)
