This is your **Master Operational Manual (v2.0)**. It covers the complete lifecycle of the VHP (Vermont Health Platform), from generating content with AI to publishing it on the live site.

**Prerequisites:**
1.  **Terminal:** Open your terminal and navigate to your project root:
    ```bash
    cd ~/Vermont-Health-Platform
    ```
2.  **Sanity Token:** Ensure you have a valid API token in `frontend/.env.local` (See **Appendix A** if setting up for the first time).

---

### Phase 1: Content Generation (Gemini)

**Goal:** Generate a valid JSON article using the strict v9 protocol.

**1. The "Golden Key" Prompt (v9)**
Copy the **entire block** below into Gemini. This template enforces strict JSON rules to prevent errors.

*   **Source File:** `frontend/sanity/prompt_template_v9.txt`

```text
*** SYSTEM INSTRUCTIONS: HTR CONTENT PROTOCOL v9 (STRICT) ***

ROLE: Chief Research Officer (HTR).
TASK: Generate a valid JSON payload for the "policyAnalysis" schema.

*** 1. STRICT OUTPUT RULES ***
- Output ONLY a single, raw JSON object.
- Do NOT wrap the output in markdown code blocks (no ```json).
- No conversational text.
- Do NOT escape quotes inside the Data Table. Provide it as a standard JSON Array.
- VIDEO URL: Must be a raw string (e.g., "https://..."). Do NOT use Markdown links (e.g., url).

*** 2. SCHEMA DEFINITION ***
{
  "_type": "policyAnalysis",
  "title": "String",
  "slug": { "current": "kebab-case-slug" },
  "publishedAt": "YYYY-MM-DD",
  "status": "Active",
  "pillar": "Economics" | "Policy" | "Technology",
  "category": "workflow" | "market" | "solvency",
  "impactLevel": "Critical" | "High" | "Medium",
  "summary": "2-3 sentence abstract.",
  "body": [
    // BLOCK TYPE 1: Standard Text
    {
      "_type": "block",
      "style": "normal",
      "children": [{ "_type": "span", "text": "Paragraph text.", "marks": [] }]
    },
    // BLOCK TYPE 2: Headers (h2 or h3)
    {
      "_type": "block",
      "style": "h2",
      "children": [{ "_type": "span", "text": "Header Text", "marks": [] }]
    },
    // BLOCK TYPE 3: Quote (Standard)
    {
      "_type": "block",
      "style": "blockquote",
      "children": [{
         "_type": "span",
         "text": "The quote text.",
         "marks": [] 
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
      "url": "https://www.youtube.com/watch?v=...",
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
Topic: [Insert Topic]
Key Data to Include: [Insert Data]
Tone: Serious, analytical.
```

**2. Saving the Output**
1.  Copy the JSON output from Gemini.
2.  Create a new file in: `frontend/sanity/content/`.
3.  **Naming Convention:** `article_name.json` (e.g., `telehealth_report.json`).
4.  **Action:** Paste the JSON and save.

---

### Phase 2: Importing to CMS (Sanity)

**Goal:** Upload the JSON file to the Sanity database. The script will **automatically fix** common AI errors (like Data Table formatting).

**1. The Command**
Open your terminal in the project root:

```bash
# 1. Enter Frontend
cd frontend

# 2. Run Import (Replace 'filename.json' with your actual file)
node scripts/import.js telehealth_report.json
```

**2. Success Indicator**
You should see:

> `✅ Imported: "Your Article Title"`

**Troubleshooting:**

- _Error: "Insufficient permissions"_ -> Your token in `.env.local` is Viewer, not Editor.
- _Error: "File not found"_ -> You typed the wrong filename or didn't save it in `sanity/content/`.

---

### Phase 3: Editing & Publishing (Sanity Studio)

**Goal:** Finalize the content and make it live.

**1. Launch the Studio**
While still in `frontend/`:

```bash
npm run dev

```

**2. Access the Interface**

- Open Browser: [http://localhost:3000/studio](https://www.google.com/search?q=http://localhost:3000/studio)
- Login (if asked) using your Sanity credentials.

**3. The Publishing Workflow**

1. Click **"Policy Analysis"** on the left menu.
2. Click your new article (it will be in the list).
3. **Check for Validation Errors (Red Icons):**

- **Audio:** If you don't have an MP3, delete the empty Audio block (trash can icon).
- **Video:** Ensure the URL is valid.
- **Date:** Ensure a date is selected.

4. **Hit "Publish"** (Green button at bottom right).

---

### Phase 4: The Frontend (User View)

**Goal:** Verify the article looks correct on the website.

**1. Access the Site**
The site runs on the same server you just started (`npm run dev`).

- **URL:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

**2. Navigation**

- Click the **Menu** (Hamburger icon) or the **Pillar Dropdowns** (Policy, Economics, Tech).
- Find your article under the category you assigned (e.g., "Economics -> Value-Based Care").
- Click to read. Verify the **Data Table** renders correctly and the **Video** plays.

---

### Phase 5: The Chat Application (Backend)

**Goal:** Interact with your RAG (Retrieval-Augmented Generation) Chatbot.

**1. Setup (New Terminal)**
Open a **new** terminal window (keep the frontend running in the first one).

```bash
# 1. Go to project root
cd ~/Vermont-Health-Platform

# 2. Activate Python Virtual Environment
source backend/venv/bin/activate
# (You should see (venv) in your prompt)

# 3. Enter Backend Directory
cd backend

# 4. Start the Python App
python main.py

```

_(Note: If your entry file is named differently, use `python PITS_APP/main.py` or similar. Based on our history, `python main.py` is standard)._

**2. Access the Chat**

- **URL:** Typically [http://127.0.0.1:5000](https://www.google.com/url?sa=E&source=gmail&q=http://127.0.0.1:5000) (Check terminal output for exact port).

**3. The Workflow**

- **Upload:** Use the UI to upload PDFs (Policy documents, Reports).
- **Process:** Click "Process" to let the backend vectorize the text.
- **Chat:** Ask questions like _"Summarize the impact of inflation on rural hospitals"_ to test against your own data.

---

### Summary Checklist

| Component    | Key File Location                        | Command to Run                         | Local URL        |
| ------------ | ---------------------------------------- | -------------------------------------- | ---------------- |
| **Prompt**   | `frontend/sanity/prompt_template_v7.txt` | _Copy/Paste to AI_                     | N/A              |
| **Import**   | `frontend/scripts/import.js`             | `node scripts/import.js <file>`        | N/A              |
| **Studio**   | `frontend/sanity/schemaTypes/`           | `npm run dev`                          | `/studio`        |
| **Frontend** | `frontend/app/`                          | `npm run dev`                          | `localhost:3000` |
| **Backend**  | `backend/PITS_APP/`                      | `source venv...` then `python main.py` | `localhost:5000` |
