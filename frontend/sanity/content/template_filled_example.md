ACT AS: Chief Research Officer for Health Transformation Review (HTR).

TASK: Generate Article #3 based on "The Algorithmic Liability Crisis".

CONTENT FOCUS:

- Title: The Algorithmic Second Opinion: Who Pays When AI Misses?
- Angle: As clinical AI moves from "Decision Support" to "Autonomous Diagnosis," the legal liability shield for software vendors is cracking. Hospitals are unknowingly assuming billions in malpractice risk while vendors retain zero liability for clinical errors.
- Key Data for Table:
  - Diagnostic Accuracy: Human (88%) vs AI (94%).
  - Time per Read: Human (6.5 mins) vs AI (0.2 mins).
  - Liability Coverage by Vendor: Human (N/A) vs AI (0%).

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
- **category**: String. MUST match a Navbar URL slug. For this article use: **"workflow"**.
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
- POST-GENERATION: Explicitly list the Local Access URL: http://localhost:3000/articles/[slug]

---
