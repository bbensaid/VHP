#!/usr/bin/env python3
"""
ingest_briefings_to_rag.py — put the 2026 pillar briefings into the AI Analyst's RAG index.
=========================================================================================

USAGE
-----
    backend/venv/bin/python book-build/ingest_briefings_to_rag.py --dry-run   # show, touch nothing
    backend/venv/bin/python book-build/ingest_briefings_to_rag.py             # embed + replace

Re-run whenever frontend/lib/briefings/briefings.ts or sources.ts changes.

SOURCE OF TRUTH
---------------
The briefings live in code (frontend/lib/briefings/briefings.ts + sources.ts) and
drive the homepage hero and /briefings/<slug>. This script never keeps a copy:
it runs `npx tsx scripts/export-briefings.ts` in frontend/ and reads the JSON it
prints, so the index cannot drift from the pages.

CHUNKS
------
Per briefing:
    briefing:<slug>:0     overview — headline, dek, the three key facts, equity line
    briefing:<slug>:<n>   one chunk per section (n = 1-based section index)
Every chunk opens with the briefing's identity (pillar, headline, as-of date) so
that identity is part of the vector. `{source-id}` markers are resolved to
readable citations, e.g. "(Source: KFF, 23 Jul 2025)", so retrieved text stays
sourced.

WHERE IT WRITES — and what it never touches
-------------------------------------------
public.data_rag_documents (LlamaIndex PGVectorStore table, see
ingest_book_to_rag.py for why that is the live table). Same embedding model
(config.EMBEDDING_MODEL) and the same write path (PGVectorStore.add) as the
book ingest. Idempotent: embeds FIRST, then deletes only rows with
metadata source='htr_briefing' AND chunk_id LIKE 'briefing:%', then inserts.
Book rows (source='htr_book_md') and everything else are counted before and
after and the run fails loudly if any of them changed.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
BACKEND = REPO / "backend"
FRONTEND = REPO / "frontend"
sys.path.insert(0, str(BACKEND))

SOURCE_KEY = "htr_briefing"        # idempotency key (metadata `source`)
SOURCE_TYPE = "briefing"           # taxonomy value surfaced in citations
CHUNK_PREFIX = "briefing:"
BRIEFING_SERIES = "The 2026 Briefings"

_MARKER_RUN = re.compile(r"\s*((?:\{[a-z0-9-]+\})+)")
_MARKER = re.compile(r"\{([a-z0-9-]+)\}")
_MONTHS = {m: m[:3] for m in ("January", "February", "March", "April", "June", "July",
                              "August", "September", "October", "November", "December")}


# ── Load from the TS source ──────────────────────────────────────────────────

def load_briefings() -> dict:
    proc = subprocess.run(["npx", "tsx", "scripts/export-briefings.ts"], cwd=FRONTEND,
                          capture_output=True, text=True, check=False)
    if proc.returncode != 0:
        sys.exit(f"export-briefings.ts failed:\n{proc.stderr}")
    data = json.loads(proc.stdout)
    if not data.get("briefings"):
        sys.exit("export-briefings.ts returned no briefings")
    return data


# ── Citation resolution ──────────────────────────────────────────────────────

def _short_date(d: str) -> str:
    for full, abbr in _MONTHS.items():
        d = d.replace(full, abbr)
    return d


def cite_label(src: dict) -> str:
    """Readable short citation for one source."""
    if src["id"].startswith("book-"):
        # "Chapter 1: The Five-Pillar Framework..." -> "Transforming Healthcare, Chapter 1"
        return f"{src['publisher']}, {src['title'].split(':')[0]}"
    pub = re.sub(r"\s*\(summary:[^)]*\)", "", src["publisher"]).strip()
    return f"{pub}, {_short_date(src['date'])}"


def resolve_markers(text: str, sources: dict, used: list[str]) -> str:
    """Replace each run of {id}{id} markers with one '(Source: ...; ...)' note."""
    def repl(m: re.Match) -> str:
        ids = _MARKER.findall(m.group(1))
        labels = []
        for sid in ids:
            if sid not in sources:
                raise KeyError(f"unknown source id {{{sid}}}")
            if sid not in used:
                used.append(sid)
            labels.append(cite_label(sources[sid]))
        word = "Source" if len(labels) == 1 else "Sources"
        return f" ({word}: {'; '.join(labels)})"
    out = _MARKER_RUN.sub(repl, text)
    if "{" in out and _MARKER.search(out):
        raise ValueError(f"unresolved marker left in: {out[:120]}")
    return out


# ── Chunking ─────────────────────────────────────────────────────────────────

def build_chunks(data: dict) -> list[dict]:
    sources = data["sources"]
    chunks = []
    for b in data["briefings"]:
        slug, pillar = b["slug"], b["pillarLabel"]
        url = f"/briefings/{slug}"
        ident = (f"{BRIEFING_SERIES} — {pillar} pillar briefing, as of {b['asOf']}: "
                 f"\"{b['headline']}\"")

        units = []
        # 0: overview
        used: list[str] = []
        facts = "\n".join(
            f"- {f['value']}: {f['label']}" + resolve_markers("".join(f"{{{c}}}" for c in f["cite"]), sources, used)
            for f in b["facts"])
        overview = (f"{resolve_markers(b['dek'], sources, used)}\n\n"
                    f"Key facts:\n{facts}\n\n"
                    f"Equity question: {b['equityLine']}")
        units.append((0, "Overview", overview, used))
        # 1..N: sections
        for i, s in enumerate(b["sections"], start=1):
            used = []
            body = "\n\n".join(resolve_markers(p, sources, used) for p in s["paragraphs"])
            units.append((i, s["heading"], body, used))

        for idx, heading, body, used in units:
            title = f"{pillar} Briefing: {b['headline']} — {heading}"
            text = f"{ident}\nSection: {heading}\n\n{body}"
            chunks.append({
                "text": text,
                "meta": {
                    "source": SOURCE_KEY,
                    "source_type": SOURCE_TYPE,
                    "chunk_id": f"{CHUNK_PREFIX}{slug}:{idx}",
                    "title": title,
                    "pillar": pillar,
                    "pillar_id": b["pillar"],
                    "url": url,
                    "slug": slug,
                    "asOf": b["asOf"],
                    "headline": b["headline"],
                    "section_index": idx,
                    "section_title": heading,
                    "citation": f"{BRIEFING_SERIES}: {b['headline']} ({pillar}, as of {b['asOf']})",
                    "book_chapters": ",".join(b["chapters"]),
                    "cited_sources": json.dumps([
                        {"id": sid, "label": cite_label(sources[sid]),
                         "title": sources[sid]["title"], "url": sources[sid]["url"]}
                        for sid in used]),
                    "tags": f"briefing,2026,{b['pillar']},{pillar.lower()},vermont,hero",
                },
            })
    ids = [c["meta"]["chunk_id"] for c in chunks]
    assert len(ids) == len(set(ids)), "duplicate chunk ids"
    return chunks


# ── Main ─────────────────────────────────────────────────────────────────────

def _counts(cur) -> dict:
    cur.execute("""
        SELECT
          count(*) FILTER (WHERE metadata_->>'source' = %s
                             AND metadata_->>'chunk_id' LIKE 'briefing:%%')  AS mine,
          count(*) FILTER (WHERE metadata_->>'chunk_id' LIKE 'briefing:%%'
                             AND metadata_->>'source' IS DISTINCT FROM %s)   AS foreign_briefing_ids,
          count(*) FILTER (WHERE metadata_->>'source' = 'htr_book_md')       AS book,
          count(*)                                                           AS total
        FROM public.data_rag_documents""", (SOURCE_KEY, SOURCE_KEY))
    r = cur.fetchone()
    return {"mine": r[0], "foreign_briefing_ids": r[1], "book": r[2], "total": r[3]}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    chunks = build_chunks(load_briefings())
    sizes = sorted(len(c["text"]) for c in chunks)
    print(f"{len(chunks)} chunks | chars min {sizes[0]} median {sizes[len(sizes)//2]} max {sizes[-1]}")

    from dotenv import load_dotenv
    load_dotenv(BACKEND / ".env")
    import psycopg2
    from config import EMBEDDING_MODEL, SUPABASE_DB_URL
    db_url = SUPABASE_DB_URL

    conn = psycopg2.connect(db_url)
    with conn.cursor() as cur:
        before = _counts(cur)
        cur.execute("SELECT metadata_->>'chunk_id' FROM public.data_rag_documents "
                    "WHERE metadata_->>'source' = %s", (SOURCE_KEY,))
        existing = {r[0] for r in cur.fetchall()}
    conn.close()
    if before["foreign_briefing_ids"]:
        sys.exit(f"ABORT: {before['foreign_briefing_ids']} rows use a briefing: chunk_id "
                 f"under another source — refusing to guess which to delete.")

    new_ids = {c["meta"]["chunk_id"] for c in chunks}
    print(f"DB now: {before}")
    print(f"Would delete {before['mine']} existing briefing rows and insert {len(chunks)}.")
    print(f"  new ids    : {sorted(new_ids - existing)}")
    print(f"  replaced   : {len(new_ids & existing)}")
    print(f"  retired ids: {sorted(existing - new_ids)}")

    if args.dry_run:
        for c in chunks:
            m = c["meta"]
            print("\n" + "=" * 78)
            print(f"chunk_id: {m['chunk_id']}  pillar={m['pillar']}  asOf={m['asOf']}  url={m['url']}")
            print(f"title   : {m['title']}")
            print("-" * 78)
            print(c["text"])
        print(f"\nDRY RUN — nothing embedded, nothing written. {len(chunks)} chunks.")
        return 0

    from llama_index.core import Settings
    from llama_index.core.schema import TextNode
    from llama_index.embeddings.openai import OpenAIEmbedding
    from llama_index.vector_stores.postgres import PGVectorStore

    # 1. Embed FIRST, so a failed embedding call leaves the previous ingest intact.
    Settings.embed_model = OpenAIEmbedding(model=EMBEDDING_MODEL)
    print(f"Embedding model: {EMBEDDING_MODEL}")
    nodes = []
    for c in chunks:
        meta = c["meta"]
        node = TextNode(text=c["text"], metadata=meta)
        node.excluded_embed_metadata_keys = list(meta.keys())
        node.excluded_llm_metadata_keys = [
            k for k in meta if k not in ("title", "url", "asOf", "citation")]
        nodes.append(node)
    vecs = Settings.embed_model.get_text_embedding_batch([n.get_content() for n in nodes])
    for n, v in zip(nodes, vecs):
        n.embedding = v
    print(f"  embedded {len(nodes)}")

    # 2. Delete only this script's rows.
    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    with conn.cursor() as cur:
        cur.execute("DELETE FROM public.data_rag_documents "
                    "WHERE metadata_->>'source' = %s AND metadata_->>'chunk_id' LIKE 'briefing:%%'",
                    (SOURCE_KEY,))
        print(f"Deleted {cur.rowcount} pre-existing briefing rows.")
    conn.close()

    # 3. Insert through PGVectorStore, exactly as the book ingest does.
    store = PGVectorStore.from_params(
        connection_string=str(db_url),
        async_connection_string=db_url.replace("postgresql://", "postgresql+asyncpg://", 1),
        table_name="rag_documents",
        embed_dim=1536,
    )
    ids = store.add(nodes)
    print(f"Inserted {len(ids)} rows.")

    # 4. Verify.
    conn = psycopg2.connect(db_url)
    with conn.cursor() as cur:
        after = _counts(cur)
        cur.execute("SELECT count(DISTINCT metadata_->>'chunk_id'), count(*) FILTER "
                    "(WHERE content_fts IS NULL OR embedding IS NULL) "
                    "FROM public.data_rag_documents WHERE metadata_->>'source' = %s", (SOURCE_KEY,))
        distinct_ids, missing = cur.fetchone()
    conn.close()
    print(f"DB after: {after}")
    ok = (after["mine"] == len(chunks) and distinct_ids == len(chunks) and missing == 0
          and after["book"] == before["book"]
          and after["total"] - after["mine"] == before["total"] - before["mine"])
    print("VERIFIED" if ok else "VERIFICATION FAILED")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
