"""
backend/services/medicaid_parser.py
─────────────────────────────────────
Specialized parser for Vermont Medicaid eligibility PDFs.

Standard sentence-window chunking fails on government regulatory documents because:
  - Tables (income charts, FPL thresholds) become garbled text with pypdf
  - Section-level conditional logic ("IF age >= 65 AND income <= X THEN...") gets
    split across chunk boundaries, breaking the if/then reasoning
  - Heading hierarchies (Part → Section → Subsection) are lost

This module uses pdfplumber for extraction and applies section-aware chunking:
  - Tables → converted to markdown, kept as intact chunks
  - Sections → chunked at heading boundaries, not sentence boundaries
  - Every chunk carries metadata: part, section, program_type, source_file
"""

from __future__ import annotations

import logging
import re
from pathlib import Path
from typing import List, Optional

from llama_index.core.schema import Document

log = logging.getLogger("htr-brain")

# ── Heading patterns found in HBEE and DVHA documents ─────────────────────────
# e.g. "Part 1", "Section 2.3", "2.3.1", "A.", "I. DEFINITIONS"
_HEADING_PATTERNS = [
    re.compile(r"^(Part\s+\d+)", re.IGNORECASE),
    re.compile(r"^(Section\s+[\d.]+)", re.IGNORECASE),
    re.compile(r"^(\d{1,2}\.\d{1,2}(?:\.\d{1,2})?)\s+\S"),   # 2.3 or 2.3.1
    re.compile(r"^([A-Z][A-Z\s]{3,50})$"),                     # ALL-CAPS headings
    re.compile(r"^(CHAPTER\s+\d+|SUBCHAPTER\s+\w+)", re.IGNORECASE),
]

# Max characters per chunk (not a hard split — we won't split inside a section)
_MAX_CHUNK_CHARS = 4000
# Minimum content to bother keeping a chunk
_MIN_CHUNK_CHARS = 80


def _is_heading(line: str) -> bool:
    line = line.strip()
    if not line or len(line) > 120:
        return False
    return any(p.match(line) for p in _HEADING_PATTERNS)


def _clean(text: str) -> str:
    """Remove NUL bytes and other characters PostgreSQL cannot store."""
    return text.replace("\x00", "").replace("\u0000", "")


def _table_to_markdown(table: list) -> str:
    """Convert a pdfplumber table (list of rows) to markdown."""
    if not table:
        return ""
    rows = [[_clean(str(cell or "")).strip() for cell in row] for row in table]
    # Filter out completely empty rows
    rows = [r for r in rows if any(c for c in r)]
    if not rows:
        return ""

    col_count = max(len(r) for r in rows)
    # Pad rows to same width
    rows = [r + [""] * (col_count - len(r)) for r in rows]

    header = "| " + " | ".join(rows[0]) + " |"
    separator = "| " + " | ".join(["---"] * col_count) + " |"
    body = "\n".join("| " + " | ".join(r) + " |" for r in rows[1:])
    return "\n".join(filter(None, [header, separator, body]))


def _extract_pages(pdf_path: Path) -> List[dict]:
    """
    Extract text and tables from each page using pdfplumber.
    Returns list of {page_num, text, tables} dicts.
    """
    try:
        import pdfplumber
    except ImportError:
        log.error("pdfplumber not installed — run: pip install pdfplumber")
        return []

    pages = []
    try:
        with pdfplumber.open(str(pdf_path)) as pdf:
            for i, page in enumerate(pdf.pages, start=1):
                # Extract tables first so we can mark their bounding boxes
                tables = page.extract_tables()
                markdown_tables = [_table_to_markdown(t) for t in (tables or []) if t]
                markdown_tables = [t for t in markdown_tables if t]

                # Extract text — pdfplumber handles multi-column better than pypdf
                text = _clean(page.extract_text(x_tolerance=3, y_tolerance=3) or "")

                pages.append({
                    "page_num": i,
                    "text": text,
                    "tables": markdown_tables,
                })
    except Exception as e:
        log.error(f"pdfplumber failed on {pdf_path.name}: {e}")

    return pages


def _infer_program_type(path: Path, text_sample: str) -> str:
    """Infer the Medicaid program type from filename and early text."""
    name = path.name.lower()
    sample = text_sample.lower()

    if "choices" in name or "long-term" in name or "ltc" in name:
        return "Long-Term Care / Choices for Care"
    if "magi" in name or "magi" in sample:
        return "MAGI Medicaid"
    if "mabd" in name or "mabd" in sample:
        return "MABD Medicaid"
    if "vpharm" in name:
        return "VPharm"
    if "provider" in name:
        return "Provider Rules"
    if "42-cfr" in name or "cfr" in name:
        return "Federal Rules (42 CFR 435)"
    if "fpl" in name or "threshold" in name:
        return "Income Thresholds"
    if "hbee" in name or "health benefits" in sample:
        return "HBEE Rules"
    return "Vermont Medicaid"


def _infer_part(filename: str, heading: str) -> Optional[str]:
    """Extract Part number from filename or current heading."""
    m = re.search(r"part[-_\s]?(\d+)", filename, re.IGNORECASE)
    if m:
        return f"Part {m.group(1)}"
    m = re.search(r"part\s+(\d+)", heading, re.IGNORECASE)
    if m:
        return f"Part {m.group(1)}"
    return None


def _section_aware_chunk(pages: List[dict], source_path: Path) -> List[dict]:
    """
    Walk pages, detect section headings, and emit chunks at section boundaries.
    Tables are emitted as separate chunks immediately after their page text.
    Returns list of {text, heading, page_num} dicts.
    """
    chunks: List[dict] = []
    current_heading = ""
    current_lines: List[str] = []
    current_page = 1

    def flush(heading: str, lines: List[str], page: int):
        text = "\n".join(lines).strip()
        if len(text) < _MIN_CHUNK_CHARS:
            return
        # If oversized, split by paragraph rather than mid-sentence
        if len(text) > _MAX_CHUNK_CHARS:
            paragraphs = re.split(r"\n{2,}", text)
            buf = ""
            for para in paragraphs:
                if len(buf) + len(para) > _MAX_CHUNK_CHARS and buf:
                    chunks.append({"text": buf.strip(), "heading": heading, "page_num": page})
                    buf = para
                else:
                    buf = (buf + "\n\n" + para).strip()
            if buf and len(buf) >= _MIN_CHUNK_CHARS:
                chunks.append({"text": buf.strip(), "heading": heading, "page_num": page})
        else:
            chunks.append({"text": text, "heading": heading, "page_num": page})

    for page_data in pages:
        lines = (page_data["text"] or "").splitlines()
        for line in lines:
            stripped = line.strip()
            if _is_heading(stripped):
                # Flush the previous section
                flush(current_heading, current_lines, current_page)
                current_heading = stripped
                current_lines = []
                current_page = page_data["page_num"]
            else:
                current_lines.append(line)

        # Emit tables from this page as separate chunks
        for table_md in page_data.get("tables", []):
            if table_md and len(table_md) >= _MIN_CHUNK_CHARS:
                label = f"{current_heading} [Table]" if current_heading else "[Table]"
                # Truncate oversized tables — OpenAI embeddings cap at 8192 tokens (~30k chars)
                text = table_md[:_MAX_CHUNK_CHARS] if len(table_md) > _MAX_CHUNK_CHARS else table_md
                chunks.append({
                    "text": text,
                    "heading": label,
                    "page_num": page_data["page_num"],
                })

    # Flush final section
    flush(current_heading, current_lines, current_page)
    return chunks


def parse_medicaid_pdf(pdf_path: Path) -> List[Document]:
    """
    Parse a single Medicaid eligibility PDF into LlamaIndex Documents.

    Each Document corresponds to one section (or table) of the source PDF,
    with metadata fields that enable filtered retrieval:
      - source_type: "medicaid_eligibility"
      - program_type: e.g. "HBEE Rules", "MAGI Medicaid", "Long-Term Care"
      - part: e.g. "Part 2" (when determinable from filename/heading)
      - section_heading: the nearest detected section heading
      - page_num: page number in the source PDF
      - file_name: source filename
      - pillar: "Medicaid Eligibility" (for compatibility with existing retriever)
    """
    log.info(f"  📄 Parsing {pdf_path.name} with medicaid parser...")

    pages = _extract_pages(pdf_path)
    if not pages:
        log.warning(f"  ⚠️  No content extracted from {pdf_path.name}")
        return []

    # Build a text sample for program type inference
    text_sample = " ".join(p["text"][:300] for p in pages[:3])
    program_type = _infer_program_type(pdf_path, text_sample)

    raw_chunks = _section_aware_chunk(pages, pdf_path)
    if not raw_chunks:
        log.warning(f"  ⚠️  No chunks produced from {pdf_path.name}")
        return []

    documents: List[Document] = []
    for chunk in raw_chunks:
        part = _infer_part(pdf_path.name, chunk["heading"])
        documents.append(Document(
            text=_clean(chunk["text"]),
            metadata={
                "source":          "pdf",
                "source_type":     "medicaid_eligibility",
                "program_type":    program_type,
                "part":            part or "",
                "section_heading": chunk["heading"],
                "page_num":        chunk["page_num"],
                "file_name":       pdf_path.name,
                "pillar":          "Medicaid Eligibility",
            },
        ))

    log.info(
        f"  ✓ {pdf_path.name}: {len(pages)} pages → {len(documents)} section chunks "
        f"({program_type})"
    )
    return documents


def parse_medicaid_directory(directory: Path) -> List[Document]:
    """Parse all PDFs in the medicaid_eligibility/ directory."""
    pdf_files = sorted(directory.glob("*.pdf"))
    if not pdf_files:
        log.warning(f"No PDFs found in {directory}")
        return []

    all_docs: List[Document] = []
    for pdf_path in pdf_files:
        try:
            docs = parse_medicaid_pdf(pdf_path)
            all_docs.extend(docs)
        except Exception as e:
            log.error(f"  ✗ Failed to parse {pdf_path.name}: {e}")

    log.info(f"✅ Medicaid parser: {len(pdf_files)} PDFs → {len(all_docs)} total chunks")
    return all_docs
