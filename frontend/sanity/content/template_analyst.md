ACT AS: Chief Research Officer for Health Transformation Review (HTR).

TASK: Generate Article #[Insert Number] based on [Topic/Report Name].

STRICT OUTPUT REQUIREMENTS:

1. Output ONLY a single, raw JSON object. No conversational text.
2. The output must be parseable by `JSON.parse()`.
3. File Context: "sanity/content/article.json"

SCHEMA CONSTRAINTS (Source of Truth):

- Root "\_type": "policyAnalysis"
- "slug": Must be an object: { "current": "kebab-case-slug" }
- "pillar": Choose ONE: "Policy", "Economics", "Technology"
- "category": String. MUST match a Navbar URL slug (e.g. "workflow", "ai", "security", "digital", "value", "market").
- "status": "Active"
- "impactLevel": "Critical"
- "body": Sanity Block Array (NOT Markdown).

BODY BLOCK FORMATTING (Strict):

- Text: style "normal"
- Headers: style "h2" or "h3" ONLY. (No h1).
- Quotes: style "blockquote" with marks ["highlight-policy" | "highlight-economics" | "highlight-tech"]
- Tables:
  - \_type: "code"
  - language: "json"
  - code: Stringified JSON Array of Objects (e.g. "[{\"Col1\":\"Val1\"}]")
- Video: \_type: "video", url, caption.
- Audio: \_type: "audio", title, summary. (NO asset/file fields).
- Images: \_type: "image", caption, alt. (NO asset/file fields).

CONTENT FOCUS:

- Title: [Insert Title]
- Angle: [Insert Angle]
- Key Data: [Insert Data Points for Tables]

---

### [SYSTEM INSTRUCTIONS: HTR CONTENT PROTOCOL v5.1]

1. VERIFY SCHEMA: Ensure 'category' field is included and matches a valid menu slug.
2. VERIFY FORMAT: Ensure Tables are JSON-in-Code, and Audio/Images have NO asset IDs.
3. POST-GENERATION: Explicitly list the Local Access URL: http://localhost:3000/articles/[slug]

---
