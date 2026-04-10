# HTR Platform — Project Brief
*Paste this at the start of every new Claude session. Upload repomix-output.txt for code sessions.*

## Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **CMS**: Sanity (Studio at `/studio`), dataset: production
- **DB**: Supabase (secondary)
- **Hosting**: (deploy target TBD)
- **Working dir**: `frontend/`

## Key File Paths
| What | Path |
|---|---|
| Sanity schema types | `frontend/sanity/schemaTypes/` |
| Schema index | `frontend/sanity/schemaTypes/index.ts` |
| Sanity client | `frontend/sanity/lib/client.ts` |
| Article renderer | `frontend/components/ArticleContent.tsx` |
| Article page template | `frontend/components/templates/ArticleEngine.tsx` |
| Academy module template | `frontend/components/templates/AcademyModuleEngine.tsx` |
| Article route | `frontend/app/analysis/[slug]/page.tsx` |
| Academy module route | `frontend/app/academy/modules/[slug]/page.tsx` |
| Import script (articles) | `frontend/scripts/import_one.js` |
| Import script (academy) | `frontend/scripts/import_academy.js` |
| Content staging (articles) | `frontend/sanity/content/` |
| Content staging (academy) | `frontend/sanity/content/academy/` |

## Content Types in Sanity
| Type | Used For |
|---|---|
| `policyAnalysis` | Pillar articles (Policy/Economics/Technology/Clinical/Equity/Operations) |
| `academyModule` | HTR Academy course modules |
| `course` | Course listing pages (existing) |
| `caseStudy`, `webinar`, `report` | Other academy content (existing) |

## The 6 HTR Pillars
Policy · Economics · Technology · Clinical · Equity · Operations
Pillar colors: Policy=orange, Economics=emerald, Technology=indigo, Clinical=rose, Equity=violet, Operations=teal

## Article Generation
- Prompt: `ultimate_prompt_v3.txt` (in outputs/htr-content/)
- CONTENT_MODE: `POLICY_BRIEF` | `ACADEMY_MODULE` | `RESEARCH_REPORT`
- Min 35 body blocks, 60+ word paragraphs, mandatory audio + video blocks
- Import articles: `node scripts/import_one.js <file>.json`
- Import academy modules: `node scripts/import_academy.js <file>.json`
- Block types: block (normal/h2/h3/quote/callout/bullet/number), code (json tables), image, audio, video

## Key Decisions Made
- Image blocks have NO asset ref in JSON — must upload image manually in Sanity Studio after import
- GROQ queries must use `asset->{ _id, _ref, url }` to dereference image assets (not plain `body`)
- ArticleContent.tsx has explicit Tailwind classes on all block styles (no prose wrapper dependency)
- ArticleEngine.tsx uses `{ cache: "no-store" }` to bypass CDN cache after publishing
- Academy modules use separate `academyModule` schema with courseTitle, moduleNumber, learningObjectives, prevModuleSlug/nextModuleSlug navigation fields
- policyAnalysis schema has all 6 pillars in dropdown (was only 3 — fixed, Operations added later)

## Content Generated So Far
- 20 policyAnalysis articles (all pillars, in outputs/htr-content/articles/)
- 5 academyModule VBC Fundamentals course modules (in outputs/htr-academy-modules/)
- 1 long-form test article: medicaid-dsh-rural-hospital-fiscal-collapse-2026.json
- Company pages: About, Mission, Methodology, FAQ, Footer (in outputs/htr-company-pages/)

## Current Status / What Was Last Worked On
[UPDATE THIS EACH SESSION with what you're working on]
- Academy module schema, import script, and AcademyModuleEngine template: BUILT, not yet deployed
- All 5 VBC modules: ready to import as academyModule type from outputs/htr-academy-modules/
