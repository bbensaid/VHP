#!/usr/bin/env python3
"""
ingest_book_to_rag.py — put the manuscript into the AI Analyst's RAG index.
================================================================================

WHY THIS EXISTS
---------------
The Introduction tells readers the AI Analyst is "grounded in this book". It was
not. `backend/services/indexing.py` has a metadata entry for `htr_book_v42.pdf`
(pillar "HTR Framework", source_type "htr_book"), but that PDF was added to
`backend/data/` after the last successful `/api/ingest` run, so the live vector
table contained ZERO book rows (verified 2026-09-28 by direct SQL). Even once it
is ingested, a PDF gives page-number chunks: the Analyst can quote the book but
cannot say "Chapter 7, §7.4.2", because a PDF page has no section identity.

This script ingests `HTR_Book_v42.md` — the .docx's disposable text mirror —
DIRECTLY into the same pgvector table the Analyst already queries. No Sanity
content type, no second authoring of the book anywhere. Truth still flows one
way: .docx -> .md -> vector index.

RE-RUN THIS ANY TIME THE BOOK CHANGES:

    python3 book-build/refresh_md.py          # .docx -> .md  (do this first)
    python3 book-build/ingest_book_to_rag.py  # .md -> pgvector

It is idempotent: every run deletes all rows whose metadata `source` is
`htr_book_md` and reinserts from scratch. Re-running twice in a row leaves the
same row count. It never touches the .docx and never touches Sanity.

    --dry-run          print what would be embedded/inserted; touches nothing
    --chapters 1,7     restrict to some units (1..16, preface, introduction,
                       conclusion, appendix-a ...). Useful with --dry-run.
    --limit N          stop after N chunks (dry-run sanity checks)

WHERE IT WRITES
---------------
Table `public.data_rag_documents` — that is LlamaIndex's PGVectorStore table for
`table_name="rag_documents"` (the library prefixes `data_`). This is the table
the live system reads. NOTE: the hand-written `public.rag_documents` table from
migration 005 is empty and `hybrid_search_rag` (migration 007) does not exist in
the live database, so `HybridRetriever` always fails and `routers/chat.py` falls
back to `index.as_retriever(...)` — plain vector search over data_rag_documents.
That fallback is the path these chunks are retrieved by.

Nodes are written through PGVectorStore itself rather than by raw INSERT, so the
`_node_content` blob LlamaIndex needs to rebuild a TextNode is produced by
LlamaIndex, exactly as the Sanity/PDF path produces it.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path
from typing import Iterator

REPO = Path(__file__).resolve().parent.parent
BACKEND = REPO / "backend"
MD_PATH = REPO / "HTR_Book_v42.md"

sys.path.insert(0, str(BACKEND))

# ── Chunking knobs ────────────────────────────────────────────────────────────
# A section is the retrieval unit. Sections that overflow are split on paragraph
# boundaries only — never mid-sentence.
MAX_CHARS = 6000
MIN_CHARS = 250          # shorter tail is merged back into the previous chunk

SOURCE_KEY = "htr_book_md"   # idempotency delete key (metadata `source`)
SOURCE_TYPE = "htr_book"     # taxonomy value, matches indexing.py's PDF entry
PILLAR = "HTR Framework"     # matches indexing.py's PDF entry
BOOK_URL = "/book"           # verified route: frontend/app/book/page.tsx
BOOK_EDITION = "v42"

TAGS = (
    "htr,book,framework,five pillars,equity imperative,policy,technology,"
    "economics,clinical,operations,dependencies,execution sequence,vermont,"
    "act167,act68,onecare,ahead,global budgets,reference-based pricing"
)

# Units we do NOT index: pure navigation/reference apparatus. They are lists of
# pointers, not prose, and they retrieve as noise against every query.
SKIP_UNITS = {"Figure Index", "Bibliography and Source Notes", "Index (Selected)",
              "Table of Contents"}


# ── Parsing ───────────────────────────────────────────────────────────────────

def _detitle(s: str) -> str:
    """Strip markdown bold/emphasis markers from a heading's text."""
    s = s.strip()
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = re.sub(r"\*(.+?)\*", r"\1", s)
    return s.strip().strip("*").strip()


def parse_units(lines: list[str]) -> list[dict]:
    """
    Split the manuscript at its `# ` headings into units:
    PREFACE, INTRODUCTION, Chapter N, Conclusion, Appendix X.
    Mirrors make_transcripts.py's heading_kind(), extended to the units that
    script deliberately skips (it only narrates preface/intro/ch1-16).
    """
    marks: list[tuple[int, str]] = []
    for i, line in enumerate(lines):
        if line.startswith("# "):
            marks.append((i, _detitle(line[2:])))

    units = []
    for idx, (start, raw_title) in enumerate(marks):
        end = marks[idx + 1][0] if idx + 1 < len(marks) else len(lines)
        if raw_title in SKIP_UNITS:
            continue

        m = re.match(r"^Chapter (\d+):\s*(.*)$", raw_title)
        if m:
            units.append({
                "unit_type": "chapter",
                "unit_id": f"ch{int(m.group(1)):02d}",
                "chapter_number": int(m.group(1)),
                "chapter_title": m.group(2).strip(),
                "label": f"Chapter {int(m.group(1))}",
                "start": start, "end": end,
            })
            continue

        m = re.match(r"^Appendix ([A-H])\s*---?\s*(.*)$", raw_title)
        if m:
            units.append({
                "unit_type": "appendix",
                "unit_id": f"appendix-{m.group(1).lower()}",
                "chapter_number": None,
                "chapter_title": m.group(2).strip(),
                "label": f"Appendix {m.group(1)}",
                "start": start, "end": end,
            })
            continue

        key = raw_title.split("---")[0].strip()
        units.append({
            "unit_type": "front" if key in ("PREFACE", "INTRODUCTION") else "back",
            "unit_id": key.lower().replace(" ", "-"),
            "chapter_number": None,
            "chapter_title": _detitle(raw_title.split("---", 1)[-1]) if "---" in raw_title else key.title(),
            "label": key.title() if key.isupper() else key,
            "start": start, "end": end,
        })
    return units


_SEC_RE = re.compile(r"^(#{2,3})\s+(.*)$")
_NUM_RE = re.compile(r"^(\d+(?:\.\d+)+)\s*(.*)$")


def parse_sections(lines: list[str], unit: dict) -> list[dict]:
    """
    Split one unit's body into sections at `## ` / `### ` headings.
    Text under a `##` before its first `###` becomes its own section, so no prose
    is dropped. A unit with no headings at all yields one section.
    """
    body = lines[unit["start"] + 1:unit["end"]]
    marks = [(i, m.group(1), _detitle(m.group(2)))
             for i, l in enumerate(body) if (m := _SEC_RE.match(l))]

    if not marks:
        return [{"number": None, "title": unit["label"], "lines": body}]

    sections = []
    if marks[0][0] > 0:
        lead = body[: marks[0][0]]
        if any(l.strip() for l in lead):
            sections.append({"number": None, "title": f"{unit['label']} (opening)", "lines": lead})

    for idx, (i, _hashes, title) in enumerate(marks):
        end = marks[idx + 1][0] if idx + 1 < len(marks) else len(body)
        num = None
        if (nm := _NUM_RE.match(title)):
            num, title = nm.group(1), _detitle(nm.group(2))
        sections.append({"number": num, "title": title or "(untitled)",
                         "lines": body[i + 1: end]})
    return sections


def split_long(text: str) -> list[str]:
    """Split oversized section text on blank-line paragraph boundaries only."""
    if len(text) <= MAX_CHARS:
        return [text]
    parts, cur = [], ""
    for para in text.split("\n\n"):
        if cur and len(cur) + len(para) + 2 > MAX_CHARS:
            parts.append(cur.strip())
            cur = para
        else:
            cur = f"{cur}\n\n{para}" if cur else para
    if cur.strip():
        parts.append(cur.strip())
    # Fold a runt tail back into its predecessor. (Pop first: evaluating
    # parts.pop() inside `parts[-2] = ...` shifts the index out of range when
    # there are exactly two parts.) This can push one chunk slightly over
    # MAX_CHARS, which is a soft cap — the hard limit is the embedding model's.
    if len(parts) > 1 and len(parts[-1]) < MIN_CHARS:
        tail = parts.pop()
        parts[-1] = parts[-1] + "\n\n" + tail
    return parts


def build_chunks(md_text: str, only: set[str] | None = None) -> Iterator[dict]:
    lines = md_text.split("\n")
    for unit in parse_units(lines):
        if only and unit["unit_id"] not in only:
            continue
        for sec in parse_sections(lines, unit):
            raw = "\n".join(sec["lines"]).strip()
            if len(raw) < 40:
                continue

            if sec["number"]:
                cite = f"{unit['label']} §{sec['number']}"
            else:
                cite = unit["label"]
            if sec["title"] in (unit["label"], f"{unit['label']} (opening)"):
                heading = sec["title"]
            else:
                heading = f"{cite} — {sec['title']}"

            parts = split_long(raw)
            for n, part in enumerate(parts):
                sec_key = sec["number"] or re.sub(r"[^a-z0-9]+", "-", sec["title"].lower())[:40]
                yield {
                    "doc_id": f"book:{BOOK_EDITION}:{unit['unit_id']}:{sec_key}:{n}",
                    "citation": cite,
                    "heading": heading,
                    # The heading is prepended to the embedded text so the section's
                    # identity is part of the vector, not just the metadata.
                    "text": f"{heading}\n\n{part}",
                    "unit": unit, "section": sec, "part": n, "n_parts": len(parts),
                }


def chunk_metadata(c: dict) -> dict:
    u, s = c["unit"], c["section"]
    return {
        "source": SOURCE_KEY,
        "source_type": SOURCE_TYPE,
        # NOT "doc_id": LlamaIndex's node_to_metadata_dict reserves doc_id,
        # ref_doc_id and document_id and overwrites them with the node's
        # ref_doc_id (here None), which silently clobbered this to the string
        # "None" on the first real run. "chunk_id" survives the round-trip.
        "chunk_id": c["doc_id"],
        "title": c["heading"],
        "pillar": PILLAR,
        "url": BOOK_URL,
        "book_edition": BOOK_EDITION,
        "unit_type": u["unit_type"],
        "unit_id": u["unit_id"],
        "unit_label": u["label"],
        "chapter_number": u["chapter_number"],
        "chapter_title": u["chapter_title"],
        "section_number": s["number"],
        "section_title": s["title"],
        "citation": c["citation"],
        "part": c["part"],
        "n_parts": c["n_parts"],
        "tags": TAGS,
    }


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--chapters", default="")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--md", default=str(MD_PATH))
    args = ap.parse_args()

    only = None
    if args.chapters:
        only = set()
        for tok in args.chapters.split(","):
            tok = tok.strip().lower()
            only.add(f"ch{int(tok):02d}" if tok.isdigit() else tok)

    md_text = Path(args.md).read_text(encoding="utf-8")
    chunks = list(build_chunks(md_text, only))
    if args.limit:
        chunks = chunks[: args.limit]

    if not chunks:
        print("No chunks produced — check --chapters.", file=sys.stderr)
        return 1

    sizes = sorted(len(c["text"]) for c in chunks)
    print(f"{len(chunks)} chunks | chars min {sizes[0]} "
          f"median {sizes[len(sizes)//2]} max {sizes[-1]} "
          f"total {sum(sizes):,}")

    if args.dry_run:
        for c in chunks:
            m = chunk_metadata(c)
            print("\n" + "=" * 78)
            print(f"chunk_id: {m['chunk_id']}")
            print(f"title   : {m['title']}")
            print(f"meta    : unit={m['unit_id']} ch={m['chapter_number']} "
                  f"sec={m['section_number']!r} part={m['part']+1}/{m['n_parts']} "
                  f"chars={len(c['text'])}")
            print("-" * 78)
            body = c["text"]
            print(body if len(body) <= 700 else body[:400] + "\n   [...]\n" + body[-260:])
        print(f"\nDRY RUN — nothing embedded, nothing written. {len(chunks)} chunks.")
        return 0

    # ── Real run ──────────────────────────────────────────────────────────────
    from dotenv import load_dotenv
    load_dotenv(BACKEND / ".env")

    import psycopg2
    from llama_index.core import Settings
    from llama_index.core.schema import TextNode
    from llama_index.embeddings.openai import OpenAIEmbedding
    from llama_index.vector_stores.postgres import PGVectorStore

    from config import EMBEDDING_MODEL, SUPABASE_DB_URL

    db_url = SUPABASE_DB_URL or os.environ["SUPABASE_DB_URL"]
    Settings.embed_model = OpenAIEmbedding(model=EMBEDDING_MODEL)
    print(f"Embedding model: {EMBEDDING_MODEL}")

    # 1. Build nodes and embed FIRST.
    #
    # Embedding before deleting is deliberate. An earlier draft deleted the old
    # rows up front; if the embedding call then failed (it did — the OpenAI key
    # was out of credits), the book would have been removed from the index and
    # nothing put back. Embedding first means a failed run leaves the previous
    # ingest untouched.
    nodes = []
    for c in chunks:
        meta = chunk_metadata(c)
        node = TextNode(text=c["text"].replace("\x00", ""), metadata=meta)
        # Keep bookkeeping fields out of the embedded string; the heading is
        # already inside the text itself.
        node.excluded_embed_metadata_keys = list(meta.keys())
        node.excluded_llm_metadata_keys = [
            k for k in meta if k not in ("title", "citation", "chapter_title")
        ]
        nodes.append(node)

    embed = Settings.embed_model
    BATCH = 100
    for i in range(0, len(nodes), BATCH):
        batch = nodes[i: i + BATCH]
        vecs = embed.get_text_embedding_batch([n.get_content() for n in batch],
                                              show_progress=False)
        for n, v in zip(batch, vecs):
            n.embedding = v
        print(f"  embedded {min(i+BATCH, len(nodes))}/{len(nodes)}")

    # 2. Idempotency: only now drop every row this script has ever written.
    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    with conn.cursor() as cur:
        cur.execute("DELETE FROM public.data_rag_documents "
                    "WHERE metadata_->>'source' = %s", (SOURCE_KEY,))
        print(f"Deleted {cur.rowcount} pre-existing '{SOURCE_KEY}' rows.")
    conn.close()

    # 3. Insert through PGVectorStore so LlamaIndex writes its own row format.
    store = PGVectorStore.from_params(
        connection_string=str(db_url),
        async_connection_string=db_url.replace("postgresql://", "postgresql+asyncpg://", 1),
        table_name="rag_documents",
        embed_dim=1536,
    )
    ids = store.add(nodes)
    print(f"Inserted {len(ids)} rows into public.data_rag_documents.")

    # 4. Verify by reading back.
    conn = psycopg2.connect(db_url)
    with conn.cursor() as cur:
        cur.execute("SELECT count(*) FROM public.data_rag_documents "
                    "WHERE metadata_->>'source' = %s", (SOURCE_KEY,))
        print(f"Verified row count for source='{SOURCE_KEY}': {cur.fetchone()[0]}")
    conn.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
