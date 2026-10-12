#!/usr/bin/env python3
"""Figure 15.7 — the Chapter 15 portfolio risk register (Figure 15.6) as a
probability x impact map.

Every value is read off Figure 15.6 as it stands in HTR_Book_v42.docx: the five
probability bands and four impact bands with the scores its caption defines
(Low=1, Low-Med=2.5, Medium=3, Med-High=3.75, High=4; impact Low=1, Medium=3,
High=4, Critical=5). Nothing is re-scored here.
Palette: book navy (book-build/docx_build.py) + a 4-step warm ramp by score.
"""
import sys
import textwrap
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

OUT = sys.argv[1] if len(sys.argv) > 1 else "book-audit/figure_15_7_risk_map.png"
NAVY, INK, GREY = "#1b3a6b", "#161b22", "#5b6673"

PROB = [("Low–Med", 2.5), ("Medium", 3), ("Med–High", 3.75), ("High", 4)]
IMPACT = [("Medium", 3), ("High", 4), ("Critical", 5)]

# id, short label, probability band, impact band  (Figure 15.6)
RISKS = [
    ("R-01", "Analytics not live by Jan 2027", "High", "Critical"),
    ("R-02", "RBP hollowed in rulemaking", "Medium", "Critical"),
    ("R-03", "Non-binding Strategic Plan", "High", "High"),
    ("R-04", "Act 68 modified after 2026 election", "Low–Med", "Critical"),
    ("R-05", "H.R. 1 Medicaid cuts", "Med–High", "High"),
    ("R-06", "VITL connectivity gaps persist", "High", "High"),
    ("R-07", "RHRC successor inadequate", "Med–High", "High"),
    ("R-08", "Social-risk adjustment late", "Medium", "High"),
    ("R-09", "Weak clinical engagement", "High", "Medium"),
    ("R-10", "No portfolio infrastructure", "High", "Critical"),
]


def fill(score):
    if score >= 20:
        return "#e8836f"
    if score >= 15:
        return "#f6b8a8"
    if score >= 12:
        return "#fde8c8"
    return "#edf2f9"


fig, ax = plt.subplots(figsize=(7.4, 5.0), dpi=200)
ax.set_xlim(-0.62, len(IMPACT) + 0.02)
ax.set_ylim(-0.75, len(PROB) + 0.2)
ax.axis("off")

pv = dict(PROB)
iv = dict(IMPACT)
for r, (pn, p) in enumerate(PROB):
    ax.text(-0.06, r + 0.5, pn, ha="right", va="center", fontsize=10.8, color=INK)
    for c, (im, i) in enumerate(IMPACT):
        s = p * i
        ax.add_patch(Rectangle((c, r), 1, 1, fc=fill(s), ec="white", lw=2.5))
        ax.text(c + 0.96, r + 0.9, ("%g" % s), ha="right", va="top", fontsize=8.6, color=GREY)
        here = [x for x in RISKS if x[2] == pn and x[3] == im]
        for k, (rid, lab, _, _) in enumerate(here):
            x0 = c + 0.05 + (0.48 if len(here) == 2 and k == 1 else 0)
            ax.text(x0, r + 0.66, rid, ha="left", va="center", fontsize=10.3, weight="bold", color=NAVY)
            ax.text(x0, r + 0.5, textwrap.fill(lab, 13 if len(here) == 2 else 24, break_long_words=False), ha="left", va="top",
                    fontsize=7.8, color=INK, linespacing=1.15)
for c, (im, _) in enumerate(IMPACT):
    ax.text(c + 0.5, -0.2, im, ha="center", va="top", fontsize=10.8, color=INK)
ax.text(len(IMPACT) / 2, -0.62, "IMPACT  →", ha="center", fontsize=10.8, weight="bold", color=NAVY)
ax.text(-0.57, len(PROB) / 2, "PROBABILITY  →", rotation=90, ha="center", va="center",
        fontsize=10.8, weight="bold", color=NAVY)

fig.suptitle("Vermont's portfolio risk register, by probability and impact",
             x=0.03, y=0.975, ha="left", fontsize=13, weight="bold", color=NAVY)
fig.text(0.03, 0.84, "Cell number = risk score (probability × impact), as defined in Figure 15.6.\n"
         "No risk is rated Low on either axis, so those bands are omitted.", fontsize=9.7, color=GREY)
plt.subplots_adjust(left=0.02, right=0.99, top=0.80, bottom=0.03)
fig.savefig(OUT, facecolor="white")
print(OUT)
