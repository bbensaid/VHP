# HTR AI Chatbox — Complete Documentation

**Platform:** Health Transformation Review  
**Last updated:** 2026-05-10  
**Covers:** User guide · Technical architecture · Operations · Maintenance · Sanity CMS workflow

---

## Table of Contents

1. [What the AI Chatbox Actually Is](#1-what-the-ai-chatbox-actually-is)
2. [How a User Reaches the Chatbox](#2-how-a-user-reaches-the-chatbox)
3. [The Starter Cards — What They Are and How They Work](#3-the-starter-cards--what-they-are-and-how-they-work)
4. [What Happens When a User Sends a Message](#4-what-happens-when-a-user-sends-a-message)
5. [The Full Backend Pipeline (Step by Step)](#5-the-full-backend-pipeline-step-by-step)
6. [The AI's Knowledge — What It Knows and Where It Comes From](#6-the-ais-knowledge--what-it-knows-and-where-it-comes-from)
7. [The Platform Catalog — Tools the AI Can Recommend](#7-the-platform-catalog--tools-the-ai-can-recommend)
8. [Semantic Search vs Keyword Matching](#8-semantic-search-vs-keyword-matching)
9. [Model Routing — Which AI Model Answers](#9-model-routing--which-ai-model-answers)
10. [Sanity CMS — How Content Gets Into the AI](#10-sanity-cms--how-content-gets-into-the-ai)
11. [Operations: Starting and Stopping the Backend](#11-operations-starting-and-stopping-the-backend)
12. [Maintenance: What YOU Need to Do and When](#12-maintenance-what-you-need-to-do-and-when)
13. [What Is Hardcoded vs What Is Dynamic](#13-what-is-hardcoded-vs-what-is-dynamic)
14. [File Map — Every Relevant File and Its Job](#14-file-map--every-relevant-file-and-its-job)
15. [Environment Variables Reference](#15-environment-variables-reference)
16. [Troubleshooting](#16-troubleshooting)

---

## 1. What the AI Chatbox Actually Is

The HTR AI Chatbox is a **Retrieval-Augmented Generation (RAG)** system. That means:

- It is **not** a general-purpose AI like ChatGPT
- It has been given a **knowledge base** built from your specific documents and Sanity CMS content
- When a user asks a question, the system **finds the most relevant documents** from that knowledge base and **feeds them to the AI** alongside the question
- The AI then writes an answer grounded in those documents, plus its own general training knowledge about health policy and economics

The chatbox has two surfaces:
- **Right sidebar widget** — collapsed view accessible from any page
- **Full page at `/chat`** — expanded view with full conversation interface

---

## 2. How a User Reaches the Chatbox

### From `/welcome`

```
User lands on /welcome
│
├─ Selects a ROLE (Executive, Policy Analyst, etc.)
│   → localStorage saves: htr-user-role, htr-chat-greeting
│   → Redirected to /chat
│   → Chat shows 4 personalized starter cards for that role
│
└─ Clicks "Skip — Show Me Everything"
    → Expands into two options:
    │
    ├─ "Browse with navbar & sidebar"
    │   → localStorage saves: htr-user-role = "all"
    │   → Redirected to / (home)
    │   → Standard navigation, no chatbox involved
    │
    └─ "Explore through the AI chatbox"
        → localStorage saves: htr-user-role = "all"
        → Redirected to /chat
        → Chat shows FULL platform grid (all pillars, tools, pages as chips)
```

### Returning Users

If `htr-user-role` is already in localStorage, `/welcome` redirect is skipped entirely. The user goes straight to wherever they were navigating.

---

## 3. The Starter Cards — What They Are and How They Work

This is the most important thing to understand about the chatbox. There are **three different card systems** and they work very differently.

### 3A. Full Platform Grid (role = "all" / Skip → AI chatbox)

**File:** `frontend/app/chat/page.tsx` — `ALL_PLATFORM_SECTIONS` constant (around line 59)

**What it is:** A hardcoded array of every section, sub-section, and tool on the platform, organized into 9 groups (Policy, Economics, Technology, Clinical, Equity, Operations, Tools & Simulations, States & Programs, Academy & Learning).

**How cards are generated:** 100% static. Every label and its associated prompt are hardcoded strings written by a human.

**Example:**
```typescript
{
  label: "Bed Capacity & Transfer",
  prompt: "What is Vermont's current hospital bed capacity situation and how are transfers managed?"
}
```

**When a user clicks a card:** The `prompt` string is sent to the AI exactly as written. The AI then runs the full RAG pipeline (retrieval → reranking → generation) to answer it.

**Does this change between sessions?** No. Same cards, same prompts, every time, for every user who chose Skip.

**How to update it:** Edit `ALL_PLATFORM_SECTIONS` in `frontend/app/chat/page.tsx`. Each entry needs a `label` (the chip text the user sees) and a `prompt` (the question sent to the AI).

---

### 3B. Role-Personalized Cards (Dynamic from Sanity)

**File:** `frontend/app/api/role-content/route.ts`

**What it is:** When a user selects a role on `/welcome`, on arrival at `/chat` the frontend calls `/api/role-content?role=executive` (or whatever role). This API queries Sanity CMS in real time.

**How cards are generated:**
1. Queries Sanity for articles (`policyAnalysis`, `post`, `caseStudy`) matching the role's pillars
2. Picks **2 most recent** articles published in the last 30 days
3. Picks **2 random** articles from older content (shuffled on every page load)
4. Auto-generates a prompt for each: `Tell me about "{article title}" and what it means for me as a {role label}.`

**Role → Pillar mapping:**
| Role | Pillars queried |
|------|----------------|
| executive | Operations, Economics |
| policy | Policy |
| clinician | Clinical |
| economist | Economics |
| tech | Technology |
| compliance | Policy |
| researcher | Policy, Economics, Technology, Clinical, Equity |
| investor | Economics |

**Does this change between sessions?** Yes — every time a user loads `/chat`, the 2 random older cards shuffle. New articles published in Sanity appear within minutes (as soon as the `/api/role-content` endpoint is hit again).

**The catch:** If Sanity is unreachable or returns nothing, the system falls back to the static `ROLE_STARTERS` (see 3C below).

---

### 3C. Role-Personalized Cards (Static Fallback)

**File:** `frontend/app/chat/page.tsx` — `ROLE_STARTERS` constant (around line 207)

**What it is:** 4 hardcoded prompts per role, used when Sanity returns nothing.

**Does this change between sessions?** No. Completely static.

**How to update it:** Edit `ROLE_STARTERS` in `frontend/app/chat/page.tsx`.

---

### Summary: Card Systems at a Glance

| Card type | Who sees it | Dynamic? | Source | Prompt origin |
|-----------|-------------|----------|--------|---------------|
| Full platform grid | Skip → AI chatbox users | ❌ Never | Hardcoded in `chat/page.tsx` | Human-written |
| Role cards (primary) | Role-selected users | ✅ Yes | Sanity CMS API | Auto-generated from article titles |
| Role cards (fallback) | Role-selected users (when Sanity fails) | ❌ Never | Hardcoded in `chat/page.tsx` | Human-written |

---

## 4. What Happens When a User Sends a Message

Whether the user clicks a card or types their own question, the exact same pipeline runs. Here is the complete flow:

```
User sends message
│
▼
[Frontend: chat/page.tsx]
  - Appends message to local conversation history
  - Saves history to localStorage (htr-chat-history)
  - Calls POST /api/chat with:
      { message, history (last N turns), userRole }
│
▼
[Next.js proxy: app/api/chat/route.ts]
  - Validates the request (Zod schema)
  - Forwards to Python backend at http://localhost:8000/api/chat
  - Streams response bytes back to browser as they arrive
│
▼
[Python backend: routers/chat.py]
  - Detects if question is about Medicaid eligibility
    (special system prompt + scoped retrieval if yes)
  - Detects if question needs structured output (comparison/list)
  - Assembles system prompt (see Section 5)
  - Runs retrieval pipeline (see Section 5)
  - Calls LLM and streams tokens back
  - Appends citations as [CITATIONS]...[/CITATIONS] at the end
│
▼
[Frontend receives stream]
  - Displays tokens as they arrive
  - When stream ends, parses citations out of the sentinel
  - Displays formatted citations separately
```

---

## 5. The Full Backend Pipeline (Step by Step)

**File:** `backend/routers/chat.py`

### Step 1 — Query Rewriting

If there is prior conversation history (≥ 2 messages), a fast LLM (llama-3.1-8b-instant on Groq) rewrites the user's latest message into a **standalone search query** that includes context from the conversation.

Example:
- History: "Tell me about Vermont's AHEAD model"
- New message: "What does that mean for hospitals?"
- Rewritten query: "What does Vermont's AHEAD model mean for hospital finances and operations?"

This ensures retrieval doesn't miss documents because the user asked a follow-up question.

### Step 2 — Semantic Tool Injection

Before retrieval, the user's question is **embedded** (converted to a vector) and compared against embeddings of all 59 catalog entries. The top matching tools (similarity ≥ 0.30) are prepended to the system prompt as "HIGHEST-RELEVANCE TOOLS FOR THIS SPECIFIC QUESTION."

This means the AI is explicitly told the most relevant platform tools before it reads the full catalog — it doesn't have to figure it out itself from a long list.

### Step 3 — Hybrid Document Retrieval

The rewritten query is used to search the RAG knowledge base in Supabase using **two simultaneous methods**:

- **Dense (vector):** The query is embedded → cosine similarity search against all document embeddings stored in pgvector
- **Sparse (BM25):** PostgreSQL full-text search using `tsvector` and `ts_rank_cd`
- **Merged:** Results from both methods are merged using **Reciprocal Rank Fusion (RRF)** — a formula that rewards documents appearing high in both rankings

Top 20 documents are retrieved. If a pillar filter is active, only documents from that pillar are searched (falls back to unfiltered if < 3 results).

### Step 4 — Sentence Window Expansion

Each retrieved document chunk is expanded to include the ±3 sentences surrounding it in the original document. This gives the AI more context than the narrow chunk that matched the query.

### Step 5 — Re-ranking

The top 20 chunks are re-ranked by **FlashRank** (a cross-encoder model: `ms-marco-MiniLM-L-12-v2`). This model reads the query and each chunk together and scores how well they actually match — much more accurate than embedding similarity alone. Top 5 chunks are kept.

### Step 6 — System Prompt Assembly

The system prompt is assembled in this order:
1. Semantic tool hint (most relevant platform tools for this specific question)
2. Role context (if user has a role: "You are speaking with a Hospital Executive...")
3. Base system prompt (answering rules, Vermont Context rules, tool recommendation rules)
4. Full platform catalog (all 59 tools with URLs and descriptions)
5. Format addendum (if comparison or list was detected)

### Step 7 — LLM Generation

The assembled system prompt + top 5 document chunks + conversation history + user message are sent to the LLM. Tokens stream back to the frontend as they are generated.

### Step 8 — Citation Extraction

After the stream completes, the unique source documents are extracted from the retrieved chunks and appended to the response as a JSON sentinel: `[CITATIONS][...][/CITATIONS]`. The frontend parses this, strips it from the displayed text, and renders citations separately.

---

## 6. The AI's Knowledge — What It Knows and Where It Comes From

The AI has two knowledge sources:

### Source 1: The RAG Knowledge Base (domain-specific, your content)

Built from:

| Source | What | Where |
|--------|------|-------|
| Sanity CMS | Articles, policy analyses, case studies, academy modules, definitions, analyst notes, webinars, reports | Fetched via API at index build time |
| General PDFs | Any `.pdf` file in `backend/data/` (root, not subdirectories) | Loaded from filesystem at index build time |
| Medicaid PDFs | Vermont Medicaid eligibility documents | `backend/data/medicaid_eligibility/` — special section-aware parsing |

### Source 2: LLM Training Knowledge (general, not your content)

The LLM (Groq Llama or Claude) was trained on internet-scale data up to its knowledge cutoff. It knows about:
- General health policy, economics, payment models
- Federal programs (Medicaid, Medicare, CMS programs)
- Clinical evidence and medical concepts
- National statistics and trends

**The system is designed so your RAG documents ground and override the LLM's general knowledge for specific questions.** The LLM's training knowledge fills in gaps.

---

## 7. The Platform Catalog — Tools the AI Can Recommend

### What it is

**File:** `backend/platform_catalog.py`

A structured Python list of **59 entries** covering every user-facing page, tool, simulator, and research lab tab on the platform. This is the **single source of truth** for what the AI knows the platform offers.

### Structure of each entry

```python
{
    "id": "bed-capacity",                    # unique slug, kebab-case
    "label": "Bed Capacity & Transfer",      # display name
    "url": "/bed-capacity",                  # path (relative) or full URL
    "category": "Vermont",                   # top-level group
    "subcategory": "",                       # optional sub-group
    "description": "Explore Vermont hospital bed capacity data, inpatient transfer patterns...",
    "keywords": ["bed capacity", "hospital beds", "inpatient transfer", "nvrh", ...],
}
```

### How it feeds the AI

At startup, `build_ai_catalog_text()` auto-generates a formatted text block from this list — grouped by category, with full URLs and descriptions. This text is embedded in the AI's system prompt on every request.

### How to add a new tool or page

1. Open `backend/platform_catalog.py`
2. Add a new dict to the `CATALOG` list — copy an existing entry as a template
3. Fill in `label`, `url`, `category`, `description`, and `keywords`
4. Restart the backend (see Section 11)
5. That's it — the AI immediately knows about it

**Critical: the `description` field matters.** Write it as an action sentence starting with a verb: "Explore...", "Model...", "Calculate...", "Compare...". This is what the semantic search embedds and what the AI quotes when recommending the tool.

**Critical: the `keywords` field matters.** Include every synonym and related phrase a user might say. For bed capacity: `["bed capacity", "hospital beds", "inpatient transfer", "transfer bottleneck", "patient overflow", "staffed beds", "nvrh"]`. The keywords feed the semantic search context and improve recall.

---

## 8. Semantic Search vs Keyword Matching

### The old approach (wrong, removed)

The previous `find_relevant_tools()` function did:
```python
score = sum(1 for kw in entry["keywords"] if kw in question.lower())
```
"How many patients can Vermont hospitals handle?" → score 0, Bed Capacity not found.

### The new approach (semantic, correct)

**File:** `backend/services/catalog_search.py`

At backend startup:
1. Every catalog entry's `label + description + category + keywords` is concatenated into one text blob
2. That blob is embedded using `text-embedding-3-small` (OpenAI) — the same model used for all document embeddings
3. 59 embedding vectors are stored in memory

On every chat request:
1. The user's question is embedded
2. Cosine similarity is computed between the question vector and all 59 catalog entry vectors
3. Entries with similarity ≥ 0.30 are returned, ranked highest to lowest
4. Top 4 matches are injected into the system prompt as "HIGHEST-RELEVANCE TOOLS"

**Why this works:** "How many patients can Vermont hospitals handle?" and "Vermont hospital bed capacity data, inpatient transfer patterns" land near each other in embedding space — even though they share zero words. The model understands they're about the same concept.

---

## 9. Model Routing — Which AI Model Answers

**File:** `backend/services/llm.py`

| User tier | Primary model | Fallback chain |
|-----------|--------------|----------------|
| free / student | llama-3.1-8b-instant (Groq) | gpt-4o-mini (OpenAI) |
| subscriber | llama-3.3-70b-versatile (Groq) | llama-3.1-8b-instant → gpt-4o-mini |
| advisory / admin | claude-sonnet-4-6 (Anthropic) | llama-3.3-70b-versatile → gpt-4o-mini |

**Fallback behavior:** If Groq returns a rate limit (429) or server error (5xx), the system automatically retries with the next model in the chain. The user sees no error — they just get a response from a slightly less capable model.

**Medicaid eligibility queries:** Always bumped to at least subscriber-tier model (70B), regardless of user tier. This is because Medicaid eligibility determinations require accuracy.

---

## 10. Sanity CMS — How Content Gets Into the AI

### The two ways Sanity content affects the chatbox

**Way 1: RAG knowledge base** — Article text is indexed into the vector store and used to answer questions. This requires a full reindex.

**Way 2: Starter cards** — Article titles appear as clickable cards on the chat empty state. This happens live via the `/api/role-content` endpoint — no reindex needed.

### Supported content types

| Sanity type | Where it appears | Fields indexed |
|-------------|-----------------|----------------|
| `policyAnalysis` | Policy pillar, starter cards | title, pillar, summary, body |
| `post` | Articles section, starter cards | title, body |
| `caseStudy` | Academy case studies, starter cards | title, pillar, summary, body |
| `academyModule` | Academy courses | title, pillar, summary, learningObjectives, body |
| `definition` | Glossary | term, description, pillars |
| `analystNote` | Internal | title, pillar, body |
| `webinar` | Academy webinars | title, pillar, description |
| `report` | Advisory reports | title, pillar, abstract |

### Adding new content in Sanity (step by step)

**For the content to appear in starter cards immediately (no restart needed):**

1. Log into Sanity Studio at `https://yourproject.sanity.studio` or `/studio` on your local dev
2. Create or edit a document of type `policyAnalysis`, `post`, or `caseStudy`
3. Fill in:
   - **Title** — this becomes the card label and part of the auto-generated prompt
   - **Pillar** — must match one of: `Policy`, `Economics`, `Technology`, `Clinical`, `Equity`
   - **Body** — the full article content (this is what the AI reads when answering)
   - **Summary** — a short description (also indexed)
   - **Slug** — required, auto-generated from title usually
4. Publish the document
5. The next time a user loads `/chat`, the `/api/role-content` endpoint queries Sanity live and the new article can appear as a starter card

**For the content to appear in RAG answers (requires reindex):**

After publishing in Sanity, run a reindex:
```bash
curl -X POST https://your-backend-url/api/ingest \
  -H "Authorization: Bearer YOUR_INGEST_SECRET"
```
Or locally:
```bash
curl -X POST http://localhost:8000/api/ingest \
  -H "Authorization: Bearer YOUR_INGEST_SECRET"
```

This fetches all Sanity content, re-embeds everything, and updates the vector store. Takes 2–10 minutes depending on content volume. The AI can answer questions from this content immediately after.

### Important Sanity field rules

- **Pillar must be exact** — `"Policy"` not `"policy"`, `"Economics"` not `"Econ"`. The role-content API filters by exact pillar match.
- **Slug must be set** — documents without a slug are excluded from both starter cards and RAG indexing
- **Body must have content** — documents with < 20 characters of body text are skipped during indexing

---

## 11. Operations: Starting and Stopping the Backend

### Starting the backend (local development)

```bash
# Navigate to backend
cd /Users/baba/Vermont-Health-Platform/backend

# Activate virtual environment
source venv/bin/activate

# Start the backend (auto-reloads on file changes)
uvicorn main:app --reload --port 8000
```

On startup you will see:
```
🚀 HTR AI Brain v4.2.0 starting...
✅ PG vector store (Supabase pgvector) initialized
✅ Loaded existing index from Supabase pgvector
Building semantic catalog index for 59 entries...
✅ Catalog semantic index ready (59 entries)
```

### Starting the frontend (local development)

```bash
cd /Users/baba/Vermont-Health-Platform/frontend
npm run dev
```

Frontend runs at `http://localhost:3000`

### Checking backend health

```bash
curl http://localhost:8000/health
```

Returns:
```json
{
  "status": "ok",
  "index_ready": true,
  "model_subscriber": "llama-3.3-70b-versatile",
  "embedding_model": "text-embedding-3-small",
  "vector_store": "pgvector",
  "auth_enabled": true,
  "reranker": "flashrank",
  "retrieval": "hybrid_bm25_vector_rrf"
}
```

If `index_ready` is `false`, the AI will return a 503 error on chat requests. Wait for the index to finish building.

### Triggering a full reindex

```bash
# Locally
curl -X POST http://localhost:8000/api/ingest \
  -H "Authorization: Bearer YOUR_INGEST_SECRET"

# Production
curl -X POST https://your-backend-url/api/ingest \
  -H "Authorization: Bearer YOUR_INGEST_SECRET"
```

`YOUR_INGEST_SECRET` is the `INGEST_SECRET` value in `backend/.env`.

This re-fetches all Sanity content, re-embeds all PDFs (from cache if unchanged), and rebuilds the pgvector store. Monitor backend logs to track progress.

### Stopping the backend

`Ctrl+C` in the terminal running uvicorn.

---

## 12. Maintenance: What YOU Need to Do and When

### When you add a new page or tool to the frontend

**You must:**
1. Open `backend/platform_catalog.py`
2. Add a new entry to the `CATALOG` list
3. Fill in all fields — especially `description` (action verb sentence) and `keywords` (every synonym)
4. Restart the backend: `Ctrl+C` then `uvicorn main:app --reload --port 8000`

**You do NOT need to:**
- Update any other file
- Retrain or rebuild the vector index
- Modify the system prompt strings

**Why restart?** The catalog embeddings are computed at startup. A restart re-embeds the new entry so it participates in semantic search.

### When you add a new Sanity content type

**You must:**
1. Add the GROQ query for the new type to `SANITY_QUERIES` in `backend/services/indexing.py`
2. Ensure the query returns `title`, `pillar`, and `bodyText` (or the relevant text fields)
3. Add the new type to `CONTENT_TYPES` in `frontend/app/api/role-content/route.ts` if it should appear as starter cards
4. Trigger a full reindex

### When you publish new content in Sanity

**For starter cards:** Nothing. Cards update automatically on the next page load.

**For RAG answers:** Trigger a reindex (see Section 11). Without a reindex, the AI cannot answer questions from the new content.

### When you rename a URL

1. Update the `url` field in the relevant entry in `backend/platform_catalog.py`
2. Update the corresponding entry in `ALL_PLATFORM_SECTIONS` in `frontend/app/chat/page.tsx` if it's a chip card
3. Update `HomeSidebar.tsx` if it's a sidebar nav link
4. Restart the backend

### When you change a tool's description or add capability to it

1. Update the `description` and `keywords` in `backend/platform_catalog.py`
2. Restart the backend (so the new description is re-embedded)
3. The AI will now understand and recommend the tool in new contexts

### When the AI is recommending the wrong tool for a question

1. Find the correct tool's entry in `backend/platform_catalog.py`
2. Add the terms from the user's question to that entry's `keywords` list
3. Improve the `description` to better describe what problems this tool solves
4. Restart the backend

### Scheduled maintenance (recommended monthly)

```bash
# 1. Trigger a full reindex to pick up all new Sanity content
curl -X POST http://localhost:8000/api/ingest \
  -H "Authorization: Bearer YOUR_INGEST_SECRET"

# 2. Check health after reindex
curl http://localhost:8000/health

# 3. Audit catalog — compare CATALOG entries against actual frontend routes
# Open platform_catalog.py and frontend/app directory side by side
# Look for routes in the app directory that have no corresponding catalog entry
```

---

## 13. What Is Hardcoded vs What Is Dynamic

| Feature | Hardcoded? | Dynamic? | Changes when? |
|---------|-----------|---------|--------------|
| "All" user platform grid (chip cards) | ✅ Yes | ❌ No | Only when you edit `ALL_PLATFORM_SECTIONS` in `chat/page.tsx` |
| "All" user chip prompts | ✅ Yes | ❌ No | Only when you edit the `prompt` strings in `ALL_PLATFORM_SECTIONS` |
| Role-selected starter cards (primary) | ❌ No | ✅ Yes | Every page load — 2 random older articles shuffle |
| Role-selected starter card prompts | ❌ No | ✅ Yes — auto-generated from article titles | When you publish new content in Sanity |
| Role-selected starter cards (fallback) | ✅ Yes | ❌ No | Only when you edit `ROLE_STARTERS` in `chat/page.tsx` |
| AI answers to questions | ❌ No | ✅ Yes | Varies with every query, RAG retrieves different chunks |
| Platform catalog (tool recommendations) | Structured data ✅ | Auto-built ✅ | When you edit `platform_catalog.py` + restart |
| Catalog semantic embeddings | ❌ No | ✅ At startup | Every backend restart |
| Document RAG index | ❌ No | ✅ On reindex | When you run `/api/ingest` |
| Sanity content in RAG | ❌ No | ✅ On reindex | When you run `/api/ingest` after publishing |
| System prompt (answering rules) | ✅ Yes | ❌ No | Only when you edit `BASE_SYSTEM_PROMPT` in `chat.py` |
| Semantic tool injection (per query) | ❌ No | ✅ Yes — every query | Computed fresh on every request |
| Vermont Context rule | ✅ Yes | ❌ No | Only when you edit `BASE_SYSTEM_PROMPT` in `chat.py` |
| User conversation history | ❌ No | ✅ Yes | Built up through the session, stored in localStorage |

---

## 14. File Map — Every Relevant File and Its Job

### Backend

```
backend/
├── main.py                          App factory, startup lifecycle, mounts routers
├── config.py                        All environment variable constants — read from .env
├── platform_catalog.py              ← MOST IMPORTANT FOR MAINTENANCE
│                                    Single source of truth for all platform tools/pages
│                                    Edit this when you add a new page/tool
├── routers/
│   ├── chat.py                      /api/chat and /api/suggest endpoints
│   │                                Contains: system prompts, Vermont Context rules,
│   │                                Medicaid intent detection, query rewriting logic,
│   │                                pipeline orchestration
│   └── ingest.py                    /api/ingest — triggers full reindex
├── services/
│   ├── catalog_search.py            Semantic search over platform_catalog.py
│   │                                build_catalog_index() — runs at startup
│   │                                find_relevant_tools_semantic() — runs on every query
│   ├── indexing.py                  Builds and loads the RAG vector index
│   │                                fetch_sanity_content() — queries all Sanity types
│   │                                SANITY_QUERIES dict — add new content types here
│   ├── llm.py                       LLM factory and model routing by tier
│   │                                FallbackLLM — automatic fallback chain
│   ├── retrieval.py                 HybridRetriever (BM25 + vector + RRF)
│   │                                rerank_nodes() — FlashRank cross-encoder
│   │                                extract_citations() — source attribution
│   ├── auth.py                      JWT validation, tier detection
│   └── medicaid_parser.py           Section-aware parsing of Medicaid eligibility PDFs
└── data/
    ├── *.pdf                        General PDFs indexed into RAG
    └── medicaid_eligibility/
        └── *.pdf                    Vermont Medicaid eligibility documents (special parsing)
```

### Frontend

```
frontend/
├── app/
│   ├── welcome/page.tsx             /welcome — role selection page
│   │                                skip() → goStandardNav() or goAIChat()
│   │                                pick(roleId) → stores role → /chat
│   ├── chat/page.tsx                /chat — full AI chatbox page
│   │                                ALL_PLATFORM_SECTIONS — "all" user chip cards (edit here)
│   │                                ROLE_STARTERS — static fallback cards (edit here)
│   │                                streamResponse() — sends message to backend
│   │                                askQuestion() — called when a card is clicked
│   └── api/
│       ├── chat/route.ts            Next.js proxy → Python backend /api/chat
│       └── role-content/route.ts   Sanity CMS query for role-based starter cards
│                                   ROLE_PILLARS — edit to change which pillars each role sees
│                                   CONTENT_TYPES — edit to include new Sanity doc types
├── components/
│   ├── RightSidebar.tsx             Right sidebar AI widget (collapsed chatbox)
│   ├── HomeSidebar.tsx              Left navigation sidebar — all platform routes
│   └── WelcomeRedirect.tsx          Redirects unauthenticated users to /welcome
```

---

## 15. Environment Variables Reference

### Backend (`backend/.env`)

```bash
# ── Required ──────────────────────────────────────────────────────────────────
GROQ_API_KEY=gsk_...              # Groq API — LLM inference (free + subscriber tiers)
OPENAI_API_KEY=sk-...             # OpenAI API — embeddings (text-embedding-3-small)
                                  # Also used as last-resort LLM fallback (gpt-4o-mini)

# ── Supabase ──────────────────────────────────────────────────────────────────
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Full access key — never expose to frontend
SUPABASE_JWT_SECRET=...           # For validating user auth tokens
SUPABASE_DB_URL=postgresql://...  # Direct Postgres connection for pgvector

# ── Sanity CMS ────────────────────────────────────────────────────────────────
SANITY_PROJECT_ID=abc123
SANITY_DATASET=production
SANITY_API_TOKEN=sk...            # Read token (viewer role minimum)
SANITY_API_VERSION=2023-10-01

# ── Application ───────────────────────────────────────────────────────────────
INGEST_SECRET=some-long-secret    # Required to call /api/ingest
FRONTEND_URL=http://localhost:3000 # CORS allowed origin

# ── Optional ──────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY=sk-ant-...      # Claude — advisory/admin tier users only
GROQ_MODEL=llama-3.3-70b-versatile  # Override subscriber model
SENTRY_DSN=https://...            # Error tracking (optional)
ENVIRONMENT=production            # For Sentry tagging
```

### Frontend (`frontend/.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...    # Public anon key — safe for frontend
SANITY_PROJECT_ID=abc123
SANITY_DATASET=production
SANITY_API_TOKEN=sk...
```

---

## 16. Troubleshooting

### "The AI doesn't know about [new page/tool] I just added"

1. Did you add an entry to `backend/platform_catalog.py`? Open the file and check.
2. Did you restart the backend after adding it? The catalog is embedded at startup — no restart, no update.
3. Is the `description` descriptive enough? A vague description produces a weak embedding — the semantic search won't find it.

**Test it:**
```bash
cd backend && python3 -c "
from platform_catalog import CATALOG
ids = [e['id'] for e in CATALOG]
print('Entries:', len(CATALOG))
print('Your entry present:', 'your-entry-id' in ids)
"
```

### "The AI is adding a 'Vermont Context' section to Vermont questions"

The `BASE_SYSTEM_PROMPT` in `backend/routers/chat.py` explicitly forbids this. If it's still happening, the LLM is ignoring the instruction — which can happen with smaller/faster models (free tier: llama-3.1-8b-instant).

Options:
1. Test with a subscriber or advisory account (70B or Claude model) — the instruction compliance is much better
2. Strengthen the wording in `BASE_SYSTEM_PROMPT` — make "Do NOT" even more emphatic

### "Starter cards are not showing new Sanity articles"

1. Check that the article is **Published** in Sanity (not Draft)
2. Check that it has a **Slug** set
3. Check that the **Pillar** field matches exactly (case-sensitive: `"Policy"` not `"policy"`)
4. Check that the role's pillar mapping in `frontend/app/api/role-content/route.ts` includes that pillar for the user's role

```bash
# Test the API directly
curl "http://localhost:3000/api/role-content?role=policy"
```

### "The AI can't answer questions from [content I published in Sanity]"

Sanity content must be **reindexed** before the AI can use it in answers. Publishing in Sanity does not automatically update the RAG index.

```bash
curl -X POST http://localhost:8000/api/ingest \
  -H "Authorization: Bearer YOUR_INGEST_SECRET"
```

Watch the backend logs — you'll see each Sanity content type being fetched and the total node count being embedded.

### "The backend won't start"

```bash
cd backend && source venv/bin/activate && uvicorn main:app --reload --port 8000
```

Common causes:
- Missing `.env` — copy `.env.example` if it exists, or create `.env` with the variables in Section 15
- `GROQ_API_KEY` not set — required at startup
- `OPENAI_API_KEY` not set — required for embeddings
- Port 8000 already in use: `lsof -i :8000` then `kill -9 <PID>`

### "Semantic catalog search isn't working"

Check backend startup logs for:
```
✅ Catalog semantic index ready (59 entries)
```

If you see a warning instead:
```
Catalog embedding failed — semantic search disabled: ...
```
The `OPENAI_API_KEY` is likely invalid or missing. Fix it and restart.

### "The AI is making up tool URLs that don't exist"

The LLM sometimes hallucinates URLs when it's not sure. The system prompt tells it to only recommend tools from the catalog. If this keeps happening:
1. Check that `HTR_TOOLS_CATALOG_TEXT` is actually being included in the system prompt (add a debug log temporarily)
2. The model tier may be too low — smaller models hallucinate more. Test with advisory tier.

---

*This document covers the state of the system as of 2026-05-10. Update it whenever the architecture changes.*
