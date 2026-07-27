#!/usr/bin/env python3
"""
sync_from_gdocs.py — pull the author's Google Docs edits back into the manuscript.

WHY THIS EXISTS
---------------
The author edits the book in Google Docs. The VISUAL formatting survives that
round-trip fine — shading, borders, callout colours and the navy palette all
come back intact. What Google Docs drops is only the *style NAMES* (the
invisible `custom-style="Banner"` labels). A reader sees no difference; this
script is the only thing that cares.

It matters because the build pipeline regenerates the .docx from the .md, and
the .md is what needs the author's edits folded back into it. Finding those
edits by hand means wading through ~190 diff blocks, nearly all of it noise
from tables being redrawn by the converter.

    Google Docs  ──download──>  HTR_Book_v42.docx
         ^                              |
         |                         THIS SCRIPT  (finds what the author changed)
         |                              v
    upload  <──build──  HTR_Book_v42.docx  <──  HTR_Book_v42.md

THE AUTHOR NEVER RUNS THIS. It is Claude's bookkeeping tool, invoked after the
author says "I made some edits". Verified on the 2026-07-26 download: 14 real
edits surfaced, 116 noise blocks discarded.

USAGE
-----
    python3 book-build/sync_from_gdocs.py

It REPORTS; it does not rewrite the manuscript. Applying a prose change is a
judgement call (which of three similar paragraphs did the author mean?), so the
script surfaces exactly what changed and leaves the edit itself to a human.

The report separates:
    REWORDED    a paragraph's wording changed — shown as before/after
    STRUCTURAL  moved, split, merged, or brand-new sections
    IGNORED     conversion noise (TOC page numbers, table redraws)
"""
import re, sys, os, shutil, subprocess, difflib, datetime

ROOT   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX   = os.path.join(ROOT, 'HTR_Book_v42.docx')
MD     = os.path.join(ROOT, 'HTR_Book_v42.md')
ARCH   = os.path.join(ROOT, 'book-archive')

def sh(*a):
    return subprocess.run(a, capture_output=True, text=True).stdout

def docx_to_text(path):
    """Flatten a .docx to plain paragraphs via pandoc."""
    out = sh('pandoc', '-f', 'docx', '-t', 'markdown', '--wrap=none', path)
    return out

def paragraphs(text, from_md=False):
    """Normalise to comparable prose paragraphs, dropping formatting noise."""
    out = []
    for ln in text.split('\n'):
        t = ln.strip()
        if not t:                        continue
        if set(t) <= set('+=-| '):       continue      # table rules
        t = t.strip('|').strip()
        t = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', t)  # links -> text
        t = re.sub(r'\{[^}]*\}', '', t)                 # {custom-style=...}
        t = re.sub(r'\\', '', t)
        t = re.sub(r'[*_#`>|]+', ' ', t)
        t = t.replace('‘', "'").replace('’', "'")
        t = t.replace('“', '"').replace('”', '"')
        t = re.sub(r'-{2,}', '—', t)
        t = re.sub(r'^\d+(\.\d+)*\s+', '', t)           # auto heading numbers
        t = re.sub(r'\s+', ' ', t).strip()
        if not t or re.fullmatch(r'[\d\s.]+', t):
            continue
        # Drop TOC lines ("Chapter Title 137") — they are regenerated every
        # build and are pure noise. Everything else is kept REGARDLESS of
        # length: a 10-character line like "April 2026" on the cover is a real
        # edit, and a >40-char filter silently swallowed exactly that one
        # (2026-07-27).
        if re.search(r'\s\d{1,3}$', t) and len(t) < 70:
            continue
        out.append(t)
    return out

def words(s):
    return re.findall(r"[A-Za-z0-9$%']+", s.lower())

def main():
    if not os.path.exists(DOCX):
        sys.exit(f"missing {DOCX}")

    # ---- 1. what does git think the .docx was, vs what is on disk now? -------
    tracked = sh('git', '-C', ROOT, 'ls-files', '--error-unmatch',
                 'HTR_Book_v42.docx').strip()
    if not tracked:
        sys.exit("HTR_Book_v42.docx is not tracked by git — cannot diff safely.")

    changed = sh('git', '-C', ROOT, 'status', '--short', 'HTR_Book_v42.docx').strip()
    if not changed:
        print("The .docx is unchanged since the last commit — nothing to sync.")
        print("(If you just downloaded from Google Docs, make sure it replaced")
        print(" the file at the repo root.)")
        return

    # ---- 2. snapshot the download before anything touches it ----------------
    os.makedirs(ARCH, exist_ok=True)
    stamp = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
    snap  = os.path.join(ARCH, f'HTR_Book_v42.docx.gdocs-{stamp}')
    shutil.copy2(DOCX, snap)
    print(f"snapshot: {os.path.relpath(snap, ROOT)}\n")

    # ---- 3. baseline = the build the author ACTUALLY started from -----------
    # NOT simply HEAD. If Claude edited the manuscript after the author last
    # downloaded, HEAD contains work the author's copy never had, and every one
    # of those edits would show up here as something the author "deleted" —
    # which is exactly the false alarm that burned us on 2026-07-27.
    #
    # So: walk back through the committed builds and pick the one whose text is
    # CLOSEST to the download. That is the version the author was editing.
    revs = sh('git', '-C', ROOT, 'log', '--format=%H', '-12',
              '--', 'HTR_Book_v42.docx').split()
    dl_words = set(words(' '.join(paragraphs(docx_to_text(DOCX)))))

    best, best_rev, best_score = None, None, -1.0
    for rev in revs:
        blob = os.path.join(ARCH, f'.cand-{stamp}.docx')
        data = subprocess.run(['git', '-C', ROOT, 'show', f'{rev}:HTR_Book_v42.docx'],
                              capture_output=True).stdout
        if not data:
            continue
        with open(blob, 'wb') as f:
            f.write(data)
        cand = paragraphs(docx_to_text(blob))
        os.remove(blob)
        cw = set(words(' '.join(cand)))
        if not cw:
            continue
        score = len(cw & dl_words) / len(cw | dl_words)      # Jaccard
        if score > best_score:
            best, best_rev, best_score = cand, rev, score

    if best is None:
        sys.exit("could not find a committed build to compare against.")
    if best_rev != revs[0]:
        print(f"NOTE: your download matches an EARLIER build ({best_rev[:8]}), not the")
        print( "      latest. Claude has edited the manuscript since you downloaded.")
        print( "      Comparing against the version you actually started from, so")
        print( "      Claude's newer edits are not misreported as your deletions.\n")
    base_blob = None

    new_p  = paragraphs(docx_to_text(DOCX))
    base_p = best
    md_txt = open(MD, encoding='utf8').read()

    # ---- 4. diff, classifying each change ----------------------------------
    sm = difflib.SequenceMatcher(None, base_p, new_p, autojunk=False)
    applyable, review, noise = [], [], 0

    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            continue
        old, new = base_p[i1:i2], new_p[j1:j2]
        if words(' '.join(old)) == words(' '.join(new)):
            noise += 1                      # formatting-only churn
            continue
        # a clean 1:1 reword is safe to apply automatically
        if len(old) == 1 and len(new) == 1:
            applyable.append((old[0], new[0]))
        else:
            review.append((old, new))

    # ---- 5. report ----------------------------------------------------------
    print(f"{len(applyable)} reworded paragraph(s), {len(review)} structural "
          f"change(s), {noise} formatting-only block(s) ignored.\n")

    for n, (old, new) in enumerate(applyable, 1):
        d  = list(difflib.unified_diff(words(old), words(new), lineterm='', n=0))
        rm = [x[1:] for x in d if x.startswith('-') and not x.startswith('---')]
        ad = [x[1:] for x in d if x.startswith('+') and not x.startswith('+++')]
        print(f"{n:>3}. -{rm[:10]}\n     +{ad[:10]}")
        print(f"     …{old[-110:]}")
        print(f"     →  …{new[-110:]}\n")

    if review:
        print("\nSTRUCTURAL — review by hand (moved / split / merged / new):")
        for old, new in review[:20]:
            o = (old[0][:90] + '…') if old else '(nothing)'
            n = (new[0][:90] + '…') if new else '(nothing)'
            print(f"  - was: {o}\n    now: {n}")

    print("\nNext: apply the prose edits to HTR_Book_v42.md, then rebuild:")
    print("  python3 book-build/make_reference.py && \\")
    print("  python3 book-build/build_docx.py HTR_Book_v42.md HTR_Book_v42.docx "
          "--cover book-build/cover.png")

if __name__ == '__main__':
    main()
