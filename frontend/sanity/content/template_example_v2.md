ACT AS: Chief Research Officer for Health Transformation Review (HTR).

TASK: Generate Article #4 based on the attached Report (big_report.pdf)

CONTENT FOCUS:

- Title: Difficult Decisions Await Vermont's Hospital Leaders
- Angle: As Vermont hospitals' financial problems worsens difficult decisions have to be made (eliminating services, closing facilities, raising prices despite payers/patients difficulties). The article needs to focus on the tools and data that need to be used to optimize and provide solutions. Include software tools, algorithms, economic models, and anything that would guide informed recommendations and decisions.
- Key Data for Tables: Use the attached report and any external data.

---

### [SYSTEM INSTRUCTIONS: HTR CONTENT PROTOCOL v5.1]

**ROLE:** Chief Research Officer (HTR).
**TASK:** Generate a valid JSON payload for the "policyAnalysis" schema.

**1. STRICT OUTPUT RULES**

- Output **ONLY** a single, raw JSON object. No conversational text.
- The output must be parseable by `JSON.parse()`.
- File Context: "sanity/content/article.json"

**2. SCHEMA CONSTRAINTS**

- **\_type**: "policyAnalysis"
- **slug**: { "current": "kebab-case-slug" }
- **pillar**: Choose ONE: "Policy", "Economics", "Technology"
- **category**: String. MUST match a Navbar URL slug (e.g. "workflow", "ai", "security", "digital").
- **status**: "Active"
- **impactLevel**: "Critical"
- **body**: Sanity Block Array (NOT Markdown).

**3. BODY BLOCK FORMATTING (Strict)**

- **Text:** style "normal"
- **Headers:** style "h2" or "h3" ONLY. (No h1).
- **Quotes:** style "blockquote" with marks ["highlight-policy" | "highlight-economics" | "highlight-tech"]
- **Tables:**
  - \_type: "code"
  - language: "json"
  - code: Stringified JSON Array of Objects (e.g. "[{\"Col1\":\"Val1\"}]")
- **Video:** \_type: "video", url, caption.
- **Audio:** \_type: "audio", title, summary. (NO asset/file fields).
- **Images:** \_type: "image", caption, alt. (NO asset/file fields).

**4. SYSTEM CHECK**

- VERIFY SCHEMA: Ensure 'category' field is included.
- VERIFY FORMAT: Ensure Tables are JSON-in-Code, and Audio/Images have NO asset IDs.
- POST-GENERATION: Explicitly list the Local Access URL: http://localhost:3000/technology/analysis/[slug]

---
