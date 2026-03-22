# Health Transformation Review — Coach & Instructor Guide

For Academy faculty, coaches, and learning designers who create and deliver educational content on the HTR platform.

---

## Your Role on the Platform

Coaches and instructors on HTR have two primary responsibilities:

1. **Content creation** — designing modules, courses, and case studies in Sanity Studio
2. **Learner guidance** — structuring learning tracks so learners progress from foundational to advanced content

HTR Academy is aimed at healthcare professionals learning health transformation frameworks. Your content should assume a working knowledge of healthcare delivery but not necessarily of economics, policy, or systems reform.

---

## Accessing the Studio

Log into the Sanity Studio at `https://your-domain.com/studio` (or `http://localhost:3000/studio` for local development).

You need a Sanity account with editor or administrator access to the `fxz10xl7` project.

---

## Designing a Course

A course is a sequence of academy modules organized around a single learning theme. The overall structure is:

```
Course (conceptual grouping)
  └── Module 1 (academyModule document)
  └── Module 2 (academyModule document)
  └── Module 3 (academyModule document)
  └── ...
```

There is a `course` document type in Sanity for course-level metadata. Individual modules are connected by:

- Setting `courseTitle` to the same string across all modules
- Setting `moduleNumber` (1, 2, 3...) and `totalModules` on each module
- Setting `prevModuleSlug` and `nextModuleSlug` on each module so learners can navigate forward and back

### Step-by-step: Creating a new course

**Step 1: Plan the structure**

Before opening the Studio, map out:

- Course title and one-sentence description
- Which pillar it belongs to
- Target level: Foundational, Intermediate, or Advanced
- Module list with working titles and estimated read times
- Learning objectives for each module (3–5 per module, action-oriented)

**Step 2: Create the course document**

1. In the Studio sidebar, go to Courses
2. Click New Course
3. Fill in the course title, description, pillar, level, and any other metadata
4. Publish the course document

**Step 3: Create each module**

For each module in sequence:

1. Go to Academy Module in the sidebar
2. Click New
3. Set `courseTitle` to the exact same string as your course title
4. Set `moduleNumber` (e.g., 1)
5. Set `totalModules` (e.g., 5 for a five-module course)
6. Set `pillar` and `level` consistent with the course
7. Set `estimatedReadTime`
8. Write `learningObjectives` — each one starts with an action verb ("Analyze...", "Evaluate...", "Apply...")
9. Write a 3–4 sentence `summary` — this appears on the module listing page
10. Write the full `body` content
11. Leave `prevModuleSlug` and `nextModuleSlug` blank for now
12. Publish the module
13. Note the auto-generated slug (it will appear in the slug field)

Repeat for all modules.

**Step 4: Wire up the navigation**

Once all modules are published:

1. Open Module 1 → set `nextModuleSlug` to Module 2's slug → publish
2. Open Module 2 → set `prevModuleSlug` to Module 1's slug, `nextModuleSlug` to Module 3's slug → publish
3. Continue through the sequence
4. The last module should have `prevModuleSlug` set but no `nextModuleSlug`

**Step 5: Verify**

Go to `/academy/modules/[first-module-slug]` on the site and check that:

- The module number and total display correctly ("Module 1 of 5")
- The Next button appears and leads to Module 2
- Module 2 has a Previous button back to Module 1

---

## Writing Effective Module Content

### Structure

A well-structured module follows this pattern:

1. **Opening** (2–3 paragraphs) — what this module covers, why it matters, what the learner will gain
2. **Core content** (organized by H2 sections) — the main instructional content
3. **Examples and case studies** — concrete applications of the concepts
4. **Key takeaways** (bullet list or H2 section) — what to remember
5. **Next steps** (final paragraph) — bridge to the next module

### For the AI Knowledge Base

The AI Analyst reads your module content. Writing clearly and specifically helps the AI answer questions more accurately:

- Name concepts precisely (use exact terminology like "Alternative Payment Model" not "APM" on first use)
- Include specific data points, program names, and policy references
- Use the same terminology consistently across modules in a series
- Learning objectives are indexed separately — write them in full sentences ("Analyze the financial structure of a capitated payment model")

### Content depth by level

**Foundational**: Define terms. Explain the "what" and "why." No prior knowledge of the topic assumed.

**Intermediate**: Go beyond definitions. Explain tradeoffs, mechanisms, and implementation considerations.

**Advanced**: Tackle complexity, edge cases, multi-stakeholder dynamics, and strategic decision-making frameworks.

---

## Writing Case Studies

Case studies appear in `/academy/case-studies` and are indexed by the AI Analyst.

A case study should:

- Be based on a real organization or program (named specifically where public)
- Follow a clear problem → approach → outcome structure
- Include specific metrics where available (e.g., "reduced ED utilization by 18% over 24 months")
- Connect explicitly to one or more of the five pillars
- End with lessons learned or transferable insights

Set `pillar` and `summary` carefully — these are what learners see before clicking through.

---

## Webinars and Events

When scheduling a webinar:

1. Create the `webinar` document before the event with `date` set to the event time
2. Add a `registrationLink` so learners can sign up
3. After the event, update the document — you can leave it live as "On Demand" content by changing the description to indicate it's a recording
4. Add a video link in the description or body if the recording is hosted externally

Webinars are sorted chronologically — upcoming events appear first.

---

## Learning Tracks

Learning tracks (`/academy/tracks`) are curated learning paths that guide learners through content in a structured sequence. Tracks typically span multiple courses and content types.

Learning track data may live in `lib/data/learning-tracks-data.ts` (static) or in a Supabase table (dynamic). Check with the development team about which is active.

A track typically has:

- A name and description (e.g., "Policy Analyst Track")
- A target audience (e.g., "Healthcare policy professionals entering the field")
- An ordered list of content items (modules, case studies, webinars)
- Recommended time to complete

---

## The Academy Glossary

The glossary at `/academy/glossary` is searchable and is also indexed by the AI Analyst.

As a coach, you should add new definitions whenever you introduce a new term in a module. This creates a consistent vocabulary across the platform.

Best practices:

- Define the term in plain language first ("Social Determinants of Health refers to...")
- Include the acronym expansion in the first sentence
- Keep it under 150 words
- Tag all relevant pillars (a SDOH definition should be tagged Equity AND Policy AND Clinical)
- After adding new definitions, ask the technical team to trigger a RAG re-index

---

## The AI Analyst and Your Content

The AI Analyst (available at `/chat` and in the right sidebar) can answer questions based on content you publish. After you publish significant new content, the technical team should trigger a re-index (`POST /api/ingest`) to bring your content into the AI's knowledge base.

What helps the AI answer well:

- **Specific titles and proper nouns** — the AI cites document titles explicitly ("According to the Value-Based Care Fundamentals module...")
- **Clear structure** — H2 headings help the AI understand what each section covers
- **Concrete data** — specific statistics are more useful to the AI than vague generalizations
- **Consistent terminology** — if you call something "AHEAD Model" in one module, don't call it "All-Payer Claims Database model" in another

---

## Pillar and Level Consistency

When publishing content, use pillar and level values consistently:

**Pillar values** (exact strings, case-sensitive):
- `Policy`
- `Economics`
- `Technology`
- `Clinical`
- `Equity`

**Level values:**
- `Foundational`
- `Intermediate`
- `Advanced`

**Impact levels** (for policy analysis articles):
- `Critical`
- `High`
- `Medium`

---

## Managing Active Analyst Notes (The Signal)

Analyst Notes appear in the left sidebar on all pages. These are short editorial notes attributed to a named analyst.

As a coach or subject matter expert, you may be asked to contribute Signal notes.

Guidelines:

- Maximum two active at a time
- Keep to 2–3 sentences
- Write for a senior executive audience — skip basic definitions
- Lead with the finding, not the background
- Bold 1–2 key phrases
- Keep the headline under 50 characters
- When a note is no longer current, uncheck "Is Active?" to hide it (do not delete)

---

## Checking Your Work

Before publishing any content:

- Preview the content in Sanity Studio using the Preview button (if configured)
- Verify the slug is clean and descriptive (edit it if the auto-generated version is awkward)
- Confirm the pillar and level are set correctly
- Read the summary — this is what learners see before clicking through
- For modules, verify `courseTitle`, `moduleNumber`, and `totalModules` match the rest of the series
- For webinars, confirm the `date` field is set to the correct datetime

After publishing:

- Navigate to the URL on the live site to confirm it appears correctly
- For new modules in a series, test the prev/next navigation
- For new glossary terms, do a search on `/academy/glossary` to confirm it appears
- Notify the technical team if you want new content added to the AI knowledge base

---

## Questions and Support

For content-related questions: contact the editorial team or chief editor.

For technical issues (content not appearing on the site, Studio access problems): contact the development team.

For AI Analyst questions (content not showing up in AI responses after re-indexing): contact the development team and reference this guide's AI section.
