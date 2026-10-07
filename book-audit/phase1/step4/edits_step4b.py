# Phase 1, step 4b (2026-10-07).
# 1. EAST Fund "$138M per year / annually" — WRONG. Primary source: GMCB, "AHEAD" December 2024 Board
#    Meeting deck (12.6.24), slide 34: "VT receives a portion of these savings via a Medicare payment
#    'bump' (estimated $138.9M increase in 2026)" = increase in Vermont's Medicare FFS TCOC target in PY1;
#    2-3% of participating hospitals' Medicare FFS NPR to care transformation, remainder to the EAST Fund.
#    Vermont Public 2026-07-28 (Sec. Samuelson): "an extra $138 million … capped additional payments at
#    $10 million." A first-performance-year estimate, not an annual EAST Fund amount.
# 2. Ch16 "Work This Chapter" HTR Simulator row promised a composite "collapse" for weak Operations.
#    The engine (lib/framework/sequence-engine.ts) implements Chapter 1's model: Operations is last in
#    the build sequence, so nothing waits behind it (Ops 60→10 moves the composite 65.6→57.8). The book
#    yields to Chapter 1: describe what the reader actually sees and why.

EDITS = [
    {"op": "raw", "find": "from ~$138M/year to a ~$10M cap",
     "replace": "from an estimated ~$138M in the first performance year to a ~$10M cap"},
    {"op": "raw", "find": "providing up to $138 million in additional Medicare funds annually starting in 2027",
     "replace": "funded from an estimated $138.9 million first-year increase in Vermont’s Medicare spending target"},
    {"op": "raw", "find": "that was to provide up to $138M annually in additional Medicare funds",
     "replace": "that was to receive most of an estimated $138.9M first-year increase in Vermont’s Medicare spending target"},
    {"op": "raw", "find": "was to provide another $138 million annually in Medicare performance funds",
     "replace": "was to draw on an estimated $138.9 million first-year increase in Vermont’s Medicare spending target"},
    {"op": "raw", "find": "was to provide up to $138M per year to Vermont",
     "replace": "was to draw on an estimated $138.9M first-year increase in Vermont’s Medicare spending target"},
    {"op": "raw",
     "find": "Score a state with strong Policy and Economics but weak Operations. The composite collapse is the argument for this chapter in one number.",
     "replace": "Score a state with strong Policy and Economics but weak Operations. The composite barely moves — Operations is last in the sequence, so nothing waits behind it. What weak Operations costs is execution, not score: that gap is this chapter’s argument."},
]
