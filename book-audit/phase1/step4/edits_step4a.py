# Phase 1, step 4a — book errors surfaced by the promise-delivery audit (2026-10-07).
# Preface: chapters end with 'Work This Chapter on the Platform' (15 sections); no 'Explore on the Platform' or
#   'Go Deeper — Academy' sections exist (only 1 of 15 links the Academy). Name the real section; point to the
#   companion course (Introduction: Five Pillars, One Imperative follows the book's sequence).
# Appendix F.6: AHEAD participants are MD, CT, HI, RI, downstate NY; Vermont withdrew July 2026 (/ahead-model page).
EDITS = [
 {
  "op": "raw",
  "find": "Each chapter ends with two doorways: an </w:t></w:r><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:i w:val=\"1\"/><w:iCs w:val=\"1\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">“Explore on the Platform”</w:t></w:r><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\"> guide that maps the chapter’s argument to the specific tools that let you manipulate it, and a </w:t></w:r><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:i w:val=\"1\"/><w:iCs w:val=\"1\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">“Go Deeper — Academy”</w:t></w:r><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\"> guide pointing to the lessons that teach it hands-on.",
  "replace": "Each chapter ends with a </w:t></w:r><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:i w:val=\"1\"/><w:iCs w:val=\"1\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">“Work This Chapter on the Platform”</w:t></w:r><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\"> guide that maps the chapter’s argument to the specific tools that let you manipulate it; the Academy’s companion course follows the same sequence and teaches it hands-on."
 },
 {
  "op": "raw",
  "find": "the AHEAD Model analysis (six states including Vermont)",
  "replace": "the AHEAD Model analysis (five participating states, and why Vermont withdrew)"
 }
]
# Introduction (after the Preface edit leaves it the only occurrence): same section name.
EDITS.append({"op": "raw", "find": "“Explore on the Platform”", "replace": "“Work This Chapter on the Platform”"})
