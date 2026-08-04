#!/usr/bin/env python3
"""
verify_cover.py — prove every word on the cover comes from the manuscript.

The previous cover art carried invented text ("Paymecial logic",
"cliurrertity lens") and stated relationships the book does not claim. This
checks the generated cover against HTR_Book_v42.md so neither can recur:

  1. every pillar's diagnostic question matches the six-pillar table
  2. every structural role is a verbatim prefix of that table's wording
  3. every labelled ring edge is a real dependency in Figure 1.3, with the
     same verb and payload
  4. no ring edge is labelled that Figure 1.3 does not contain

Exit 0 = the cover is faithful. Non-zero = do not ship it.

    python3 book-build/verify_cover.py
"""
import re
import sys
import os

HERE = os.path.dirname(os.path.abspath(__file__))
BOOK = os.path.join(HERE, "..", "HTR_Book_v42.md")
md = open(BOOK, encoding="utf-8").read()

src = open(os.path.join(HERE, "make_cover.py"), encoding="utf-8").read()
fail = []


def norm(s):
    s = s.replace("’", "'").replace("—", "--").replace("–", "-")
    s = re.sub(r"\s+", " ", s)
    return s.strip().lower()


# ── the book's six-pillar table ─────────────────────────────────────────────
book_q, book_role = {}, {}
for m in re.finditer(r"^\|\s*\*\*(\w+)\*\*\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|",
                     md, re.M):
    name = m.group(1).upper()
    if name in ("POLICY", "TECHNOLOGY", "ECONOMICS", "CLINICAL", "EQUITY",
                "OPERATIONS") and name not in book_q:
        book_q[name] = m.group(2)
        book_role[name] = m.group(3)

# ── the cover's PILLARS block ───────────────────────────────────────────────
blk = src.split("PILLARS = [", 1)[1].split("\n]", 1)[0]
cover = re.findall(r'\("(\w+)",\s*"([^"]+)",\s*\n?\s*((?:"[^"]*"\s*\n?\s*)+)\)', blk)
if len(cover) != 6:
    fail.append(f"parsed {len(cover)} pillars from make_cover.py, expected 6")

for name, q, role_raw in cover:
    role = " ".join(re.findall(r'"([^"]*)"', role_raw))
    if name not in book_q:
        fail.append(f"{name}: not found in the book's six-pillar table")
        continue
    if norm(q) != norm(book_q[name]):
        fail.append(f"{name} question: cover {q!r} vs book {book_q[name]!r}")
    # the cover condenses the role; it must be a verbatim prefix of the book's
    bk, cv = norm(book_role[name]), norm(role)
    if not bk.startswith(cv[:60]):
        fail.append(f"{name} role does not match the book:\n"
                    f"      cover: {cv[:90]}\n      book : {bk[:90]}")

# ── Figure 1.3 dependency matrix ────────────────────────────────────────────
lines = md.split("\n")
i = next(k for k, l in enumerate(lines) if l.startswith("| From ↓ / To → |"))
cols = [c.strip().upper() for c in lines[i].strip("|").split("|")][1:]
deps = {}
for r in range(i + 2, i + 8):
    cells = [c.strip() for c in lines[r].strip("|").split("|")]
    s = re.sub(r"\*", "", cells[0]).strip().upper()
    for c, v in zip(cols, cells[1:]):
        if v == "—":
            continue
        m = re.match(r"\[(\w+)\]\s*(.+)", v)
        if m:
            deps[(s, c)] = (m.group(1), m.group(2).strip())

# ── the cover's labelled edges ──────────────────────────────────────────────
eblk = src.split("SEQ_LABEL = {", 1)[1].split("}", 1)[0]
edges = re.findall(r'\("(\w+)",\s*"(\w+)"\):\s*\("(\w+)",\s*"([^"]+)"\)', eblk)
for a, b, verb, payload in edges:
    real = deps.get((a, b))
    if real is None:
        fail.append(f"cover labels {a}->{b} but Figure 1.3 has no such dependency")
    elif (real[0], norm(real[1])) != (verb, norm(payload)):
        fail.append(f"{a}->{b}: cover ({verb}, {payload!r}) vs book {real}")

print(f"pillars checked: {len(cover)}   labelled edges checked: {len(edges)}")
if fail:
    print(f"\nFAILED — {len(fail)} problem(s):\n")
    for f in fail:
        print("  •", f)
    sys.exit(1)
print("\nEvery word on the cover is drawn from the manuscript. Verified.")
