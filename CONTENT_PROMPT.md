# HTR Academy — Autonomous Lesson Writing Prompt

Use this prompt when instructing Claude (or another AI agent) to write and post a lesson autonomously.

---

## HOW TO USE THE TEMPLATE

**Always start your script with this exact line:**

```python
exec(open('/Users/baba/Vermont-Health-Platform/CONTENT_TEMPLATE.py').read())
```

This imports all block helpers (`blk`, `h2`, `h3`, `callout`, `highlight`, `quote`, `analogy`, `stat_grid`, `example`, `steps`, `compare`, `warning`, `takeaway`, `quiz`) and the `post()` function with the correct `_type` names and field shapes. **Do NOT reimplement these functions.** Do NOT copy-paste the signatures and write your own versions — that is how wrong `_type` names get into Sanity.

After the `exec()` line, use the helpers directly:

```python
exec(open('/Users/baba/Vermont-Health-Platform/CONTENT_TEMPLATE.py').read())

body = [
    h2('s1h1', 'Section Title'),
    blk('s1p1', 'Paragraph text.'),
    stat_grid('s1sg1', [
        ('42%', 'Some Statistic', 'Source: Organization Name 2024'),
    ]),
    # ... more blocks ...
    takeaway('tw', ['Point one.', 'Point two.']),
    quiz('qz', 'Question?', [
        ('Wrong A', False), ('Correct', True), ('Wrong B', False), ('Wrong C', False)
    ], 'Explanation of correct answer.'),
    h2('src', 'Sources'),
    blk('src1', '[1] Title — https://url.com — claim this supports'),
]

post('lesson-slug', 'Lesson Title', body, course_slug='course-slug', order=1)
```

The `post()` function reads the Sanity token from `frontend/.env.local` automatically — **never hardcode or print the token**.

---

## BLOCK REFERENCE (do not reimplement — use via exec())

| Helper | Sanity `_type` | Key fields |
| --- | --- | --- |
| `blk(k, text, style='normal')` | `block` | style: normal/h2/h3/callout/highlight/quote/blockquote |
| `h2(k, text)` | `block` | style: h2 |
| `h3(k, text)` | `block` | style: h3 |
| `callout(k, text)` | `block` | style: callout |
| `highlight(k, text)` | `block` | style: highlight |
| `quote(k, text)` | `block` | style: quote |
| `analogy(k, text, concept)` | `analogyBlock` | analogy, concept |
| `stat_grid(k, stats)` | `statGrid` | stats: [(value, label, context)] |
| `example(k, title, content)` | `exampleBlock` | title, content |
| `steps(k, title, items)` | `stepBlock` | title, steps: [(title, desc)] |
| `compare(k, title, ll, lp, rl, rp)` | `comparisonBlock` | left/right: {label, points[]} |
| `warning(k, title, message)` | `warningBlock` | title, message |
| `takeaway(k, points)` | `takeawayBlock` | points: [str] |
| `quiz(k, question, options, explanation)` | `knowledgeCheck` | question, options: [(text, isCorrect)], explanation |

**WRONG names that must never appear in your output:**

- `quiz` · `takeaway` · `analogy` · `example` · `warning` · `compare` · `steps`
- `callout` (as `_type`) · `highlight` (as `_type`) · `quoteBlock` · `bodyText` · `sectionHeading`

---

## NON-NEGOTIABLE CONTENT RULES

### Accuracy

- **Web search every specific claim** before writing it: legislation names, act numbers, statistics, dollar amounts, dates, named programs, organizations.
- If you cannot find a source, do not write the claim. "Approximately" is not a substitute for a source.
- A slow accurate lesson is infinitely better than a fast hallucinated one.

### Length

- Minimum 5 × h2 sections
- Minimum 2–3 `blk()` paragraphs per section
- Minimum ~1,500 words of prose total
- At least 1 visual block per section (`stat_grid`, `example`, `steps`, `compare`, `warning`, or `analogy`)
- `takeaway`: 6–8 points
- `quiz`: exactly 4 options, exactly 1 correct, explanation ≥ 2 sentences
- Minimum 4 sources

### Structure — every lesson must end with this exact sequence

```text
takeaway() → quiz() → h2('src','Sources') → blk() per source
```

### Key constraints

- `analogy()` — use **at most once** per lesson
- `stat_grid()` — 2–4 stats max; all `value` fields must be **strings**, not numbers
- `example()` — real named organizations only, never invented cases
- All `_key` values must be **unique** across the entire lesson
- `table()` column header keys must not contain spaces — use underscores

---

## LESSON PROMPT TEMPLATE

Fill this in when assigning a lesson:

```text
LESSON SLUG:    [e.g. vbc-aco-evidence]
LESSON TITLE:   [display title]
COURSE SLUG:    [e.g. value-based-care]
ORDER:          [integer position in course]

TOPIC / LEARNING GOAL:
  [What should the learner know or be able to do after this lesson?]

SUB-TOPICS TO COVER:
  - [topic 1]
  - [topic 2]
  - [topic 3]

TONE: Textbook-quality but readable. No jargon without definition.
      Written for a smart non-clinical reader (health IT professional,
      policy analyst, MBA student).
```

---

*Template file: `/Users/baba/Vermont-Health-Platform/CONTENT_TEMPLATE.py`*
*Sanity project: `fxz10xl7` · dataset: `production`*
*Token: auto-read from `frontend/.env.local` by `post()` — never hardcode*
