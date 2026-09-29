# -*- coding: utf-8 -*-
"""Third instance of the Ch6 primacy overclaim, caught by reading the render.

fix_final_five.py corrected the §6.1 italic lead and the heading, but §6.1's
body paragraph restates the same claim in a different construction, so the
anchor did not catch it. Found by looking at rendered page 102, not by grep.

Scoped to "the other four pillars' results", which is what the same paragraph
already says in its opening sentence ("the one that determines whether the
other four actually produce results") — and consistent with Ch1's Figure 1.3,
where Policy, not Economics, is the only pillar with zero preconditions.
"""

EDITS = [
    {"op": "raw",
     "find": "It is the precondition on which all other transformation depends.",
     "replace": "It is a precondition on which the other four pillars’ results depend."},
]
