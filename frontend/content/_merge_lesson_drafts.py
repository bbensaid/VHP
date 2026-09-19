#!/usr/bin/env python3
"""
_merge_lesson_drafts.py — rebuild _build_five_pillars_course.py cleanly from
the pristine backup plus every draft in _lesson_drafts/.

Always regenerates from `_build_five_pillars_course.py.bak-pre-merge` (the
original, pre-merge file — Track 1 only, Track 2 thin, Tracks 3-8 empty), never
from the current (possibly already-merged) file. This makes re-running the
merge idempotent and safe: no accumulation, no duplicate variable definitions,
because each run starts from the same known-clean base rather than patching
whatever is currently on disk.
"""
import ast
import pprint
from pathlib import Path

HERE = Path(__file__).parent
BASE = HERE / "_build_five_pillars_course.py.bak-pre-merge"
BUILD = HERE / "_build_five_pillars_course.py"
DRAFTS = HERE / "_lesson_drafts"

TRACK_VAR = {
    "track_5p_foundations": "FOUNDATIONS",
    "track_5p_policy": "POLICY",
    "track_5p_technology": "TECHNOLOGY",
    "track_5p_economics": "ECONOMICS",
    "track_5p_clinical": "CLINICAL",
    "track_5p_operations": "OPERATIONS",
    "track_5p_equity": "EQUITY",
    "track_5p_sustain": "SUSTAIN",
}
TRACK_ORDER = list(TRACK_VAR)  # foundations, policy, technology, ... sustain

BOOK_REF_TEXT = {
    "data-infrastructure-as-the-gate": (
        "Chapter 4", "chapter-04",
        "Chapter 4 lays out Vermont's three-layer data architecture — VHCURES, "
        "VITL/HIE, and the UHDS plan — and the structural limitations that make "
        "Technology the gate Economics has to wait on."),
    "fhir-interoperability-compliance-path": (
        "Chapter 5", "chapter-05",
        "Chapter 5 covers the FHIR compliance landscape and the interoperability "
        "rules this lesson works through in practice."),
    "ai-governance-clinical-decision-support": (
        "Chapter 5", "chapter-05",
        "Chapter 5 covers AI governance and clinical decision support as part of "
        "the Technology substrate a transformed system depends on."),
    "care-model-redesign-under-global-budgets": (
        "Chapter 8", "chapter-08",
        "Chapter 8 is the Clinical pillar in full — care models redesigned once "
        "revenue is capped rather than volume-driven."),
    "quality-mechanics-hedis-hcc": (
        "Chapter 9", "chapter-09",
        "Chapter 9 works the measurement mechanics — HEDIS, HCC, and the Vermont "
        "Clinical Transformation Toolkit — that make care redesign visible."),
    "regionalization-right-sizing-hospital-system": (
        "Chapter 11", "chapter-11",
        "Chapter 11 is the Operations pillar in full — the RHRC methodology and "
        "the regionalization tiers this lesson teaches."),
    "workforce-as-the-binding-constraint": (
        "Chapter 11", "chapter-11",
        "Chapter 11 develops Vermont's workforce crisis as its most binding "
        "operational constraint, with the RHT Program's supply-side response."),
    "global-budgets-reference-based-pricing": (
        "Chapter 6", "chapter-06",
        "Chapter 6 is the Economics pillar in full — global budgets and "
        "reference-based pricing as Vermont's financial reform architecture."),
    "apm-readiness-vbc-financial-modeling": (
        "Chapter 7", "chapter-07",
        "Chapter 7 works the APM financial modeling and VBC readiness mechanics "
        "this lesson teaches."),
    "economics-as-design-vs-management": (
        "Chapters 6 and 7", "chapter-06",
        "Chapters 6 and 7 together make the case this lesson distills: designing "
        "a payment model is not the same as being able to manage one."),
    "calibrate-for-the-gap-not-the-average": (
        "Chapter 10", "chapter-10",
        "Chapter 10 is the Equity Imperative in full — closing gaps rather than "
        "averaging them, with Vermont's own 11-point access gap as the anchor."),
    "heroi-stratified-hedis-vbc-safeguards": (
        "Chapter 10", "chapter-10",
        "Chapter 10 introduces the HEROI Index and the stratified-measurement "
        "toolkit this lesson teaches in depth."),
    "transformation-as-portfolio-management": (
        "Chapter 15", "chapter-15",
        "Chapter 15 applies PMI portfolio-management standards to five-pillar "
        "reform — the source for this lesson's method."),
    "political-sustainability-across-election-cycles": (
        "Chapter 14", "chapter-14",
        "Chapter 14 covers political sustainability across election cycles, "
        "including the UVMMC challenge to GMCB enforcement."),
    "knowledge-infrastructure-technical-assistance": (
        "Chapter 12", "chapter-12",
        "Chapter 12 argues that knowledge without implementation infrastructure "
        "produces nothing — the RHRC technical-assistance model is its case."),
    "capstone-apply-the-framework": (
        "Chapters 13 and 16", "chapter-13",
        "Chapters 13 and 16 are this capstone's source — applying the framework "
        "to your own system and to AHS's own restructuring."),
}


def load_lessons_from_module(path, list_name="LESSONS"):
    tree = ast.parse(path.read_text(encoding="utf-8"))
    for node in tree.body:
        if isinstance(node, ast.Assign):
            for t in node.targets:
                if isinstance(t, ast.Name) and t.id == list_name:
                    return ast.literal_eval(node.value)
    raise SystemExit(f"{path}: no top-level {list_name}")


def extract_span(path, start_marker, end_marker):
    """Return (before, source-between-markers-as-text) split at column 0 markers."""
    text = path.read_text(encoding="utf-8")
    i = text.index(start_marker)
    j = text.index(end_marker, i)
    return text[:i], text[i:j]


def main():
    if not BASE.exists():
        raise SystemExit(f"missing pristine backup: {BASE}")

    base_src = BASE.read_text(encoding="utf-8")
    header, _ = extract_span(BASE, "FOUNDATIONS = [", "LESSONS_BY_TRACK = {")
    footer_start = base_src.index("\n\n\n# ── Book cross-references")
    footer_boilerplate = base_src[footer_start:base_src.index('BOOK_REFS = {\n') + len('BOOK_REFS = {\n')]
    tail = base_src[base_src.index("\ndef _with_book_ref"):]

    # FOUNDATIONS comes from the pristine base itself (never touched by drafts).
    lessons_by_track = {"track_5p_foundations": load_lessons_from_module(BASE, "FOUNDATIONS")}

    for f in sorted(DRAFTS.glob("lessons_track*.py")):
        for lesson in load_lessons_from_module(f):
            lessons_by_track.setdefault(lesson["trackId"], []).append(lesson)
    for tid in lessons_by_track:
        lessons_by_track[tid].sort(key=lambda l: l["order"])

    print("Assembled tracks:")
    for tid in TRACK_ORDER:
        n = len(lessons_by_track.get(tid, []))
        print(f"  {tid}: {n} lesson(s)")

    # ── rebuild the lesson-list section ──────────────────────────────────────
    blocks = []
    for tid in TRACK_ORDER:
        var = TRACK_VAR[tid]
        lessons = lessons_by_track.get(tid, [])
        blocks.append(f"{var} = {pprint.pformat(lessons, width=100, sort_dicts=False)}\n")

    lbt_lines = ["LESSONS_BY_TRACK = {\n"]
    for tid in TRACK_ORDER:
        lbt_lines.append(f'    "{tid}": {TRACK_VAR[tid]},\n')
    lbt_lines.append("}\n")

    # ── rebuild BOOK_REFS: originals (from the base) + one entry per new slug ─
    base_refs_src = base_src[base_src.index("BOOK_REFS = {\n"):base_src.index("\n}\n\n\ndef _with_book_ref")]
    original_ref_keys = set()
    for tid, lessons in lessons_by_track.items():
        pass  # placeholder, keys computed below from the base text directly
    import re
    original_ref_keys = set(re.findall(r'^\s*"([a-z0-9-]+)":\s*\(', base_refs_src, re.M))

    new_ref_entries = []
    for tid in TRACK_ORDER:
        for lesson in lessons_by_track.get(tid, []):
            slug = lesson["slug"]
            if slug in original_ref_keys:
                continue
            ref = BOOK_REF_TEXT.get(slug)
            if not ref:
                print(f"  ! no BOOK_REF_TEXT for {slug} — no callout added")
                continue
            chapter_label, chapter_slug, blurb = ref
            new_ref_entries.append(
                f'    "{slug}": (\n'
                f'        "{chapter_label}",\n'
                f'        "{chapter_slug}",\n'
                f'        {blurb!r},\n'
                f'    ),\n'
            )

    book_refs_block = base_refs_src.rstrip() + "\n" + "".join(new_ref_entries) + "}\n"

    out = (
        header
        + "\n".join(blocks)
        + "\n"
        + "".join(lbt_lines)
        + "\n"
        + footer_boilerplate.split("BOOK_REFS = {\n")[0]  # the comment block only
        + book_refs_block
        + tail
    )

    ast.parse(out)  # fail loudly here, not after writing
    BUILD.write_text(out, encoding="utf-8")
    total = sum(len(v) for v in lessons_by_track.values())
    print(f"\nwrote {BUILD.name}: {len(lessons_by_track)} tracks, {total} lessons")


if __name__ == "__main__":
    main()
