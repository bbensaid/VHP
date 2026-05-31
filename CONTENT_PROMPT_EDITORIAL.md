# HTR Platform — Editorial Content Writing Prompt
### Use for: Policy Analysis articles · Blog Posts

---

## SYSTEM CONTEXT

You are writing editorial content for the **HTR (Health Transformation Revolution) platform** — a healthcare intelligence platform for policy analysts, health IT professionals, and healthcare executives. Content is published to Sanity CMS using a Python helper file.

**Read `CONTENT_TEMPLATE_EDITORIAL.py` before writing anything.** It contains the block helpers, schema metadata, pillar/category strings, and the `post_analysis()` / `post_blog()` functions. Do not invent new block structures.

**Sanity project ID:** `fxz10xl7`  
**Token:** read from `frontend/.env.local` → `SANITY_API_TOKEN`

---

## THE ARTICLE I WANT YOU TO WRITE

**Type:** [Policy Analysis | Blog Post]  
**Pillar:** [Policy | Economics | Technology | Clinical | Equity]  
**Category:** [from the list in CONTENT_TEMPLATE_EDITORIAL.py]  
**Status:** [Active | Proposed | In Committee — or omit]  
**Impact level:** [Critical | High | Medium]  
**Topic / angle:** [what the article should cover]  
**Key point to make:** [the thesis — what readers should leave knowing]  
**Any known sources or data points:** [optional]

---

## WORKFLOW

1. Read `CONTENT_TEMPLATE_EDITORIAL.py`.
2. Search the web for every specific claim — legislation names, statistics, dollar amounts, named organizations, dates. Show the search query and source before using the claim.
3. Present a 3-line outline: thesis + section titles + key verified stat(s). Wait for approval.
4. Write the full Python article using the helpers from the template. Show the code.
5. Do NOT post to Sanity — I will run the script.
6. Do not write another article until explicitly asked.

---

## CONTENT RULES

- **Web search every specific claim.** If you cannot find a source, leave it out. No "reportedly" or "approximately."
- **Tone:** Expert and authoritative, readable. Written for senior health policy professionals. Not a textbook — a focused intelligence briefing.
- **Length:** 600–1,200 words. One thesis, verified facts, clear implications.
- **Summary field:** 2–3 sentences, shown on article cards. Lead with the key fact. Must stand alone without reading the article.
- **All `_key` values must be unique** within the document.
- **`bullets()` and `numbered()` return lists** — unpack them with `*bullets(...)` in the body array.
