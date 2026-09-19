#!/usr/bin/env python3
"""
fold_docx_edits.py — fold the author's Google Docs edits into the .md.

WHY THIS EXISTS
---------------
sync_from_gdocs.py compares the .docx on disk against the .docx in git. That
catches "the author downloaded a new copy and has not committed it." It does NOT
catch the case that actually bit us: a Google Docs download was committed OVER
HTR_Book_v42.docx without HTR_Book_v42.md being regenerated (commit e941903).
Disk and git agree, so sync reports "nothing to sync" — while the .md sits well
behind the book.

That matters because the .md is the BUILD INPUT. Every rebuild regenerates the
.docx from it, so an un-folded edit is not merely stale: the next build silently
destroys the author's work.

    baseline.docx  (the build the author started from — from git)
         |                                       author.docx (their download)
         |                                            |
         +---------------- paragraph diff ------------+
                                |
                     locate each changed paragraph
                       in HTR_Book_v42.md
                                |
                    write HTR_Book_v42_NNN.md

Alignment uses sync_from_gdocs.paragraphs() — the SAME normalisation, so the
same ~190 blocks of table-redraw and TOC noise are filtered here too. Getting
this wrong is not a small error: a naive normaliser mismatches the regenerated
table of contents and produces hundreds of bogus insertions.

Replacement text comes from a pandoc markdown rendering of the author's .docx,
so inline bold/italic/links survive. Everything unchanged is copied
byte-for-byte from the existing .md, which is what preserves the custom-style
markup (banners, callouts) that Google Docs drops.

CONSERVATIVE BY DESIGN. A change is applied only when its old text occurs
EXACTLY ONCE in the .md. Anything ambiguous is reported, not guessed — the
report is the deliverable for those, because picking between three similar
paragraphs is the author's call, not a script's.

It NEVER writes HTR_Book_v42.md/.docx/.pdf. Output is a numbered checkpoint for
the author to review and promote, per BOOK_WORKFLOW.md's 2026-09-08 rule.

USAGE
    python3 book-build/fold_docx_edits.py <baseline-git-rev>
"""
import difflib
import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sync_from_gdocs as S   # reuse its proven normalisation

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX = os.path.join(ROOT, "HTR_Book_v42.docx")
MD = os.path.join(ROOT, "HTR_Book_v42.md")


def sh(*args):
    return subprocess.run(args, capture_output=True, text=True).stdout


def rendered(path):
    """(raw_line, normalised) pairs for a .docx, noise dropped."""
    md = sh("pandoc", "-f", "docx", "-t", "markdown", "--wrap=none", path)
    pairs = []
    for raw in md.split("\n"):
        norm = S.paragraphs(raw)
        if norm:
            pairs.append((raw.strip(), norm[0]))
    return pairs


def table_debris(raw):
    """True for text that is a table cell, a figure caption, or a heading.

    None of these are ever safe to INSERT: tables are redrawn by Google Docs on
    every round-trip, captions and headings already exist in the manuscript, and
    dropping a stray one in the middle of a table breaks the table.
    """
    t = raw.strip()
    if "|" in t:
        return True
    if re.match(r"^\*?\*?Figure\s+[\dA-Z]", t):
        return True
    if t.startswith("#") or t.startswith(":::"):
        return True
    # Google Docs ships a GENERATED table of contents. pandoc renders each
    # entry as a blockquoted link ending in a page number. The manuscript has
    # none of these (build_docx.py generates the TOC), so folding them in
    # dumps 61 junk lines at the top of the book.
    if re.match(r"^>\s*\[.*\]\(#", t):
        return True
    if re.match(r"^\[.*\s\d{1,4}\]\(#", t):
        return True
    return False


def house_style(raw):
    """Convert pandoc's rendering conventions to the manuscript's.

    pandoc writes `---` for an em-dash and pads list markers (`-   `, `1.  `).
    The manuscript uses a real `—` and single-space markers. Left alone, folded
    text is visually identical once built but diffs noisily against everything
    around it, and the next author edit inherits the inconsistency.
    """
    t = raw.replace("---", "—")
    t = t.replace("\\'", "'").replace("\\~", "~")
    t = re.sub(r"\\(?=[^\\])", "", t)
    t = re.sub(r"^-\s{2,}", "- ", t)
    t = re.sub(r"^(\d+)\.\s{2,}", r"\1. ", t)
    return t


def match_heading_style(old_line, new_line):
    """Keep the manuscript's heading convention when folding a retitled heading.

    The manuscript writes headings as `## **Title**`. pandoc renders them from
    the .docx as plain `## Title`, and build_docx.py styles end-of-chapter
    sections by MATCHING THEIR TEXT — so a heading that loses its bold renders
    differently and reads as a formatting bug (see CLAUDE.md).
    """
    m_old = re.match(r"^(#+)\s+\*\*(.*)\*\*\s*$", old_line.strip())
    m_new = re.match(r"^(#+)\s+(.*?)\s*$", new_line.strip())
    if not m_old or not m_new:
        return new_line
    text = m_new.group(2)
    if text.startswith("**") and text.endswith("**"):
        return new_line
    return f"{m_old.group(1)} **{text}**"


def in_table(lines, idx, radius=3):
    """True if line `idx` sits inside or beside a markdown table."""
    lo = max(0, idx - radius)
    hi = min(len(lines), idx + radius + 1)
    return any("|" in lines[k] for k in range(lo, hi))


def md_pairs():
    """(line_index, normalised) for the manuscript, noise dropped."""
    with open(MD, encoding="utf-8") as f:
        lines = f.read().split("\n")
    pairs = []
    for i, raw in enumerate(lines):
        norm = S.paragraphs(raw, from_md=True)
        if norm:
            pairs.append((i, norm[0]))
    return lines, pairs


def main():
    if len(sys.argv) < 2:
        sys.exit(f"usage: {sys.argv[0]} <baseline-git-rev>")
    rev = sys.argv[1]

    base_path = os.path.join(ROOT, ".fold-baseline.docx")
    data = subprocess.run(
        ["git", "-C", ROOT, "show", f"{rev}:HTR_Book_v42.docx"], capture_output=True
    ).stdout
    if not data:
        sys.exit(f"could not read HTR_Book_v42.docx at {rev}")
    with open(base_path, "wb") as f:
        f.write(data)
    try:
        base = rendered(base_path)
        new = rendered(DOCX)
    finally:
        os.remove(base_path)

    lines, mdp = md_pairs()

    # Normalised text -> the single .md line it came from (ambiguous ones dropped).
    index = {}
    for i, norm in mdp:
        index.setdefault(norm, []).append(i)
    unique = {k: v[0] for k, v in index.items() if len(v) == 1}

    bn = [n for _, n in base]
    nn = [n for _, n in new]
    sm = difflib.SequenceMatcher(None, bn, nn, autojunk=False)

    edits, inserts, skipped = {}, {}, []
    replaced = added = 0

    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        old_raw = [base[k][0] for k in range(i1, i2)]
        old_n = bn[i1:i2]
        new_raw = [new[k][0] for k in range(j1, j2)]
        new_n = nn[j1:j2]

        # 1:1 reword — the common case, and the safe one.
        if len(old_n) == len(new_n):
            for o_n, n_raw, n_n in zip(old_n, new_raw, new_n):
                if o_n == n_n:
                    continue
                # GUARD: the matcher pairs blocks by position, so after an
                # insertion it will happily pair two UNRELATED paragraphs and
                # present them as a rewording. The book repeats every figure
                # caption (once at the figure, once in the Figure Index), which
                # makes this failure mode common and destructive — it would
                # overwrite Figure 1.2's caption with Figure 1.3's. A real
                # rewording keeps most of its words; an accidental pairing does
                # not.
                if difflib.SequenceMatcher(None, o_n, n_n).ratio() < 0.6:
                    continue
                if o_n in unique:
                    idx = unique[o_n]
                    edits[idx] = match_heading_style(lines[idx], n_raw)
                    replaced += 1
                elif n_n not in index:
                    # Only worth the author's time if the new wording is not
                    # already somewhere in the manuscript. If it is, this pair
                    # is matcher drift across a repeated block, not an edit.
                    skipped.append(("reworded", n_raw[:110]))
            continue

        # Deletions we can pin exactly.
        deleted_at = []
        for o_n in old_n:
            if o_n not in new_n and o_n in unique:
                edits[unique[o_n]] = None
                deleted_at.append(unique[o_n])

        # Additions: anchor on the nearest preceding block that is unique in
        # BOTH documents, so we know exactly where the author put them.
        anchor = None
        for k in range(i1 - 1, max(-1, i1 - 60), -1):
            if bn[k] in unique:
                anchor = unique[bn[k]]
                break
        # GUARD: never insert text the manuscript already contains. Repeated
        # blocks (figure captions, recurring section headings) otherwise get
        # duplicated every time the matcher drifts.
        fresh = [
            r for r, n in zip(new_raw, new_n)
            if n not in old_n and n not in index and not table_debris(r)
        ]
        # A REWRITE, not an addition: we just deleted paragraphs we pinned
        # exactly, so the replacement belongs in the hole we made. Refusing it
        # here is the one outcome worse than doing nothing — it strips a
        # section's prose and leaves the heading bare, which is exactly what
        # happened to "Sequencing Failure 2" on an earlier run.
        if deleted_at and fresh and not in_table(lines, min(deleted_at)):
            inserts.setdefault(min(deleted_at) - 1, []).extend(fresh)
            added += len(fresh)
            continue
        if deleted_at and fresh:
            # The hole is inside a table. Google Docs renders grid tables as
            # SPACE-ALIGNED text with no pipes, so this debris walks straight
            # past the pipe filter and lands mid-table. Restore what we removed
            # and leave the table exactly as the manuscript had it.
            for i in deleted_at:
                edits.pop(i, None)
            skipped.extend(("rewrite inside table", r[:110]) for r in fresh)
            continue

        # GUARD: never insert INTO a table. Google Docs redraws tables on every
        # round-trip, so pandoc renders their cells as loose paragraphs that
        # look exactly like new prose. Inserting those shreds the markdown table
        # that was already there — it produced a duplicated Figure 1.1 caption
        # and a headerless separator row on the first run of this script.
        if anchor is not None and in_table(lines, anchor):
            skipped.extend(("added near table", r[:110]) for r in fresh)
            fresh = []
        if anchor is not None and fresh:
            inserts.setdefault(anchor, []).extend(fresh)
            added += len(fresh)
        else:
            skipped.extend(("added", r[:110]) for r in fresh)

    out = []
    for i, line in enumerate(lines):
        if i in edits:
            if edits[i] is None:
                continue
            out.append(house_style(edits[i]))
        else:
            out.append(line)          # untouched lines stay byte-for-byte
        for extra in inserts.get(i, []):
            out.append("")
            out.append(house_style(extra))

    n = 6
    while os.path.exists(os.path.join(ROOT, f"HTR_Book_v42_{n:03d}.md")):
        n += 1
    dest = os.path.join(ROOT, f"HTR_Book_v42_{n:03d}.md")
    with open(dest, "w", encoding="utf-8") as f:
        f.write("\n".join(out))

    print(f"baseline paragraphs : {len(base)}")
    print(f"download paragraphs : {len(new)}")
    print(f"reworded, applied   : {replaced}")
    print(f"added, applied      : {added}")
    print(f"needs author review : {len(skipped)}")
    for kind, text in skipped[:25]:
        print(f"    [{kind}] {text}")
    if len(skipped) > 25:
        print(f"    ... and {len(skipped) - 25} more")
    print(f"\nwrote {os.path.relpath(dest, ROOT)}")
    print("HTR_Book_v42.md was NOT modified.")


if __name__ == "__main__":
    main()
