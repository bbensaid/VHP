"""
backend/eval/validate_dataset.py
─────────────────────────────────
Structural validator for the RAG golden dataset in evaluate_rag.py.

WHY: evaluate_rag.py needs live LLM keys + Supabase to run (and spends API
credits), so it can't gate CI. Worse, simply importing it pulls in dotenv /
llama_index / ragas. This validator therefore reads GOLDEN_DATASET via the
standard-library `ast` module — NO import of evaluate_rag, NO third-party
deps, NO API call, NO network. It runs on a bare Python (incl. CI) and
catches dataset regressions early: malformed entries, duplicate questions,
empty fields, unknown pillars, and pillar-coverage gaps.

It does NOT author or judge content — only shape and coverage.

Usage:
  cd backend
  python -m eval.validate_dataset          # report; exit 1 on hard errors
  python -m eval.validate_dataset --strict # also fail on coverage warnings

Exit codes: 0 = OK, 1 = structural error (CI-blocking), 2 = strict warnings.
"""

import ast
import os
import sys

# The six framework pillars. Operations/Technology are currently under-covered;
# this validator surfaces that without fabricating content.
PILLARS = {"Policy", "Economics", "Technology", "Clinical", "Equity", "Operations"}
REQUIRED_FIELDS = ("question", "ground_truth", "pillar")
TARGET_SIZE = 50  # evaluate_rag.py's own stated goal ("Aim for 50+ Q/A pairs")

_SOURCE = os.path.join(os.path.dirname(__file__), "evaluate_rag.py")


def load_golden_dataset() -> list:
    """Extract the GOLDEN_DATASET literal from evaluate_rag.py via AST.

    Avoids importing the module (which would require dotenv/llama_index/ragas).
    Only handles a module-level `GOLDEN_DATASET = [ ... ]` literal assignment.
    """
    with open(_SOURCE, "r", encoding="utf-8") as fh:
        tree = ast.parse(fh.read(), filename=_SOURCE)
    for node in tree.body:
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name) and target.id == "GOLDEN_DATASET":
                    # literal_eval handles the list-of-dicts with string concatenation
                    # inside parens (Python folds adjacent string literals at parse time).
                    return ast.literal_eval(node.value)
    raise ValueError("GOLDEN_DATASET assignment not found in evaluate_rag.py")


def validate(strict: bool = False) -> int:
    try:
        dataset = load_golden_dataset()
    except Exception as e:  # noqa: BLE001 — surface any parse failure as a hard error
        print(f"ERROR: could not load GOLDEN_DATASET: {e}")
        return 1

    errors: list[str] = []
    warnings: list[str] = []

    if not isinstance(dataset, list) or not dataset:
        print("ERROR: GOLDEN_DATASET is empty or not a list")
        return 1

    seen_questions: set[str] = set()
    pillar_counts: dict[str, int] = {}

    for i, item in enumerate(dataset):
        loc = f"entry[{i}]"
        if not isinstance(item, dict):
            errors.append(f"{loc}: not a dict")
            continue

        for field in REQUIRED_FIELDS:
            val = item.get(field)
            if not val or not str(val).strip():
                errors.append(f"{loc}: missing/empty '{field}'")

        q = (item.get("question") or "").strip()
        if q:
            key = q.lower()
            if key in seen_questions:
                errors.append(f"{loc}: duplicate question: {q[:60]!r}")
            seen_questions.add(key)

        pillar = item.get("pillar")
        if pillar and pillar not in PILLARS:
            errors.append(f"{loc}: unknown pillar {pillar!r} (expected one of {sorted(PILLARS)})")
        if pillar:
            pillar_counts[pillar] = pillar_counts.get(pillar, 0) + 1

        gt = (item.get("ground_truth") or "").strip()
        if gt and len(gt) < 40:
            warnings.append(f"{loc}: ground_truth looks too short ({len(gt)} chars)")

    # Coverage checks (warnings, not hard errors — content growth is the user's domain)
    n = len(dataset)
    if n < TARGET_SIZE:
        warnings.append(f"dataset has {n} Q/A pairs; evaluate_rag.py targets {TARGET_SIZE}+")
    missing_pillars = sorted(PILLARS - set(pillar_counts))
    if missing_pillars:
        warnings.append(f"pillars with no coverage: {missing_pillars}")

    # Report
    print(f"Golden dataset: {n} entries")
    print("Pillar coverage: " + ", ".join(f"{p}={pillar_counts.get(p, 0)}" for p in sorted(PILLARS)))
    for w in warnings:
        print(f"  WARN: {w}")
    for e in errors:
        print(f"  ERROR: {e}")

    if errors:
        print(f"\nFAIL: {len(errors)} structural error(s).")
        return 1
    if strict and warnings:
        print(f"\nSTRICT FAIL: {len(warnings)} warning(s).")
        return 2
    print("\nOK: dataset is structurally valid.")
    return 0


if __name__ == "__main__":
    sys.exit(validate(strict="--strict" in sys.argv))
