Here is the precise breakdown of how to use the prompt, followed by the complete, serious `README.md` that documents this entire architecture as requested.

### Part 1: How to Use the "Golden Key" Prompt

You asked what stays constant and what changes.

- **CONSTANT (The "System Instructions"):** This is the ruleset. You paste this _every single time_ to force the AI to behave like your Content Engine. It ensures the JSON structure matches your Import Script.
- **VARIABLE (The "Task"):** This is at the very bottom. This is where you paste your specific report text, topic, or raw data for the specific article you want to generate.

#### The Workflow (Copy/Paste this into Gemini):

````text
*** SYSTEM INSTRUCTIONS: HTR CONTENT PROTOCOL v6.0 ***

ROLE: Chief Research Officer (HTR).
TASK: Generate a valid JSON payload for the "policyAnalysis" schema.

*** 1. STRICT OUTPUT RULES ***
- Output ONLY a single, raw JSON object. No markdown formatting (no ```json).
- No conversational text.
- Do NOT escape quotes inside the Data Table. Provide it as a standard JSON Array.

*** 2. SCHEMA DEFINITION ***
{
  "_type": "policyAnalysis",
  "title": "String",
  "slug": { "current": "kebab-case-slug" },
  "publishedAt": "YYYY-MM-DD",
  "status": "Active",
  "pillar": "Economics" | "Policy" | "Technology" | "Science",
  "category": "workflow" | "market" | "solvency",
  "impactLevel": "Critical" | "High" | "Medium",
  "summary": "2-3 sentence abstract.",
  "body": [
    // BLOCK TYPE 1: Standard Text
    {
      "_type": "block",
      "style": "normal",
      "children": [{ "_type": "span", "text": "Paragraph text." }]
    },
    // BLOCK TYPE 2: Headers (h2 or h3)
    {
      "_type": "block",
      "style": "h2",
      "children": [{ "_type": "span", "text": "Header Text" }]
    },
    // BLOCK TYPE 3: Highlighted Quote
    {
      "_type": "block",
      "style": "blockquote",
      "children": [{
         "_type": "span",
         "text": "The quote text.",
         "marks": ["highlight-economics"]
      }]
    },
    // BLOCK TYPE 4: Data Table (clean array)
    {
      "_type": "code",
      "title": "Table Caption",
      "language": "json",
      "code": [
        { "Metric": "Value A", "Result": "Value B" },
        { "Metric": "Value C", "Result": "Value D" }
      ]
    },
    // BLOCK TYPE 5: YouTube Video
    {
      "_type": "video",
      "url": "[https://www.youtube.com/watch?v=](https://www.youtube.com/watch?v=)...",
      "caption": "Video description"
    },
    // BLOCK TYPE 6: Audio Player
    {
      "_type": "audio",
      "title": "Episode Title",
      "summary": "Short description of the audio clip."
    }
  ]
}

*** TASK (EDIT BELOW THIS LINE) ***
Generate an article for the "Economics" pillar.
Topic: The impact of inflation on rural hospitals.
Key Data to Include: Inflation is at 8%, but reimbursement is flat.
Tone: Serious, analytical.

````

---

### Part 2: The Official README.md

This README documents the architecture, the specific data pipeline we just fixed, and the customization points you asked about.

**Action:** Overwrite your `README.md` with the following content.

````markdown
# Vermont Health Platform (VHP)

The VHP is a specialized content and analytics platform designed to visualize the economic and structural challenges of the Vermont healthcare system. It combines a Next.js frontend for interactive storytelling with a Sanity CMS backend for structured data management.

## 🏗 Architecture Overview

The project is a **Monorepo** divided into two primary domains:

1.  **Frontend (`/frontend`)**: A Next.js 14 (App Router) application.
    - **Rendering:** Server-Side Rendered (SSR) for SEO and performance.
    - **Styling:** Tailwind CSS with a custom semantic design system.
    - **Data Source:** Sanity.io (Headless CMS).
2.  **Backend (`/backend`)**: Python-based services.
    - **Core Logic:** PITS_APP (Quiz Builder, Conversation Engine).
    - **AI Integration:** Processing pipelines for generating quizzes and summaries.

---

## ⚙️ The Data Pipeline (Critical)

This project uses a unique "AI-First" content workflow. We do not manually write articles in the CMS; we generate structured JSON via LLMs (Gemini) and programmatically import them.

### 1. The Schema (`policyAnalysis`)

The core content type is **Policy Analysis**. It differs from standard blog posts by enforcing strict structured data for tables and media.

- **Location:** `frontend/sanity/schemaTypes/policyAnalysis.ts`
- **Key Fields:**
  - `pillar`: Determines the color theme (Economics, Policy, Technology).
  - `body`: A Portable Text array that supports custom blocks:
    - `code`: Renders as a Data Table (see specific handling below).
    - `video`: Embeds YouTube or local MP4s.
    - `audio`: Custom audio player block.

### 2. The Import Workflow

To prevent syntax errors when importing AI-generated content, we use a "Self-Healing" import script.

1.  **Generate:** Use `frontend/sanity/prompt_template_v2.txt` to generate an article JSON.
    - _Note:_ The AI is instructed to output Data Tables as **Clean Arrays**.
2.  **Save:** Place the JSON file in `frontend/sanity/content/`.
3.  **Import:** Run the Node.js script:
    ```bash
    cd frontend
    node scripts/import.js
    ```
4.  **Transformation Logic:** The script detects the "Clean Array" in the `code` block and automatically stringifies it into the format the Frontend expects (`JSON.stringify(array)`). It also injects unique `_key` UUIDs to satisfy Sanity's validation.

---

## 🎨 UI & Design System

The visual identity is programmatically linked to the content metadata.

### 1. Pillar Themes

The application changes its color palette based on the `pillar` field of the article. This logic is centralized in `frontend/app/themes.ts`.

- **Economics:** Blue/Slate (Represents financial data).
- **Policy:** Amber/Orange (Represents legislative action).
- **Technology:** Emerald/Green (Represents innovation).

**To modify a theme:**
Edit `frontend/app/themes.ts`:

```typescript
export const themes = {
  Economics: {
    primary: "bg-slate-900",
    secondary: "text-slate-600",
    accent: "border-slate-500",
  },
  // ... edit others here
};
```
````

### 2. Typography & Tailwind

Global styles are defined in `frontend/app/globals.css` and `frontend/tailwind.config.js`.

- **Headings:** Configured as `font-display` (Inter/Helvetica).
- **Body Text:** Configured as `font-serif` (Merriweather) for readability.

---

## 🚀 Development Guide

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- Sanity CLI (`npm install -g sanity@latest`)

### 1. Frontend Setup

```bash
cd frontend
npm install

# Required for the Import Script
npm install uuid @sanity/client dotenv

# Run Development Server
npm run dev

```

- **App:** http://localhost:3000
- **Studio:** http://localhost:3000/studio

### 2. Environment Variables

Create a `.env.local` file in `frontend/`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token  # Required for import.js

```

### 3. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r PITS_APP/requirements.txt
python main.py

```

---

## 📂 Project Structure Map

```text
/
├── frontend/
│   ├── app/                 # Next.js Pages & Layouts
│   ├── components/          # React Components (SmartTooltip, DataTables)
│   ├── sanity/
│   │   ├── content/         # JSON Storage for Articles
│   │   ├── schemaTypes/     # Schema Definitions (policyAnalysis.ts)
│   │   └── sanity.config.ts # Studio Config
│   └── scripts/             # Data Import Utilities (import.js)
│
└── backend/
    ├── PITS_APP/            # Python Application Logic
    └── data/                # Raw PDFs and Reports

```
