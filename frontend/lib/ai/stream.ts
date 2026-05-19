/**
 * Shared streaming helpers for the AI Analyst.
 *
 * The Python backend currently emits the response as plain text with a
 * trailing sentinel:
 *
 *     <answer text>[CITATIONS][{"title":"...","url":"...","pillar":"...","source_type":"..."}, ...][/CITATIONS]
 *
 * That format is fragile — if a user types `[CITATIONS]` into their question
 * and the model echoes it back, the parser misbehaves. The long-term goal is
 * to switch the backend to NDJSON (newline-delimited JSON), where each chunk
 * is a typed event:
 *
 *     {"type":"text","chunk":"Hello, "}
 *     {"type":"text","chunk":"world"}
 *     {"type":"citations","items":[{...}]}
 *
 * This helper supports BOTH formats during the transition. It picks based on
 * the response `Content-Type` header:
 *   - "application/x-ndjson" → NDJSON path (new format)
 *   - everything else        → sentinel path (legacy format)
 *
 * Used by both /chat and the RightSidebar AI Analyst.
 */

export interface Citation {
  title: string;
  url: string | null;
  pillar: string | null;
  source_type: string | null;
}

export interface StreamEvent {
  /** Cumulative visible text so far (citations stripped). */
  text: string;
  /** Citations once they're available; undefined while still streaming. */
  citations?: Citation[];
  /** True when the stream has ended cleanly. */
  done: boolean;
  /** True if the stream emitted an error sentinel (legacy format only). */
  hadError: boolean;
}

const STREAM_ERROR_SENTINEL = "[STREAM_ERROR]";

// ─── Sentinel format (legacy) ──────────────────────────────────────────────

export function parseCitationsSentinel(raw: string): { text: string; citations: Citation[] } {
  const start = raw.indexOf("[CITATIONS]");
  const end = raw.indexOf("[/CITATIONS]");
  if (start === -1 || end === -1) return { text: raw, citations: [] };

  const jsonStr = raw.slice(start + "[CITATIONS]".length, end);
  const text = raw.slice(0, start).trimEnd();
  try {
    const citations = JSON.parse(jsonStr) as Citation[];
    return { text, citations: Array.isArray(citations) ? citations : [] };
  } catch {
    return { text, citations: [] };
  }
}

// ─── NDJSON format (forward-looking) ───────────────────────────────────────

type NdjsonEvent =
  | { type: "text"; chunk: string }
  | { type: "citations"; items: Citation[] }
  | { type: "error"; message?: string };

function parseNdjsonLine(line: string): NdjsonEvent | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as NdjsonEvent;
  } catch {
    return null;
  }
}

// ─── Unified consumer ──────────────────────────────────────────────────────

/**
 * Consume a streaming chat response. Yields a StreamEvent per visible update.
 * Caller renders `event.text` (already citation-stripped) and, on the final
 * event, attaches `event.citations`.
 */
export async function* consumeChatStream(
  response: Response
): AsyncGenerator<StreamEvent> {
  if (!response.body) {
    throw new Error("Response has no body");
  }
  const contentType = response.headers.get("Content-Type") ?? "";
  const isNdjson = contentType.includes("application/x-ndjson");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let accumulatedText = "";
  let citations: Citation[] | undefined;
  let buffer = "";
  let hadError = false;
  let isFirstChunk = true;

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      let chunk = decoder.decode(value, { stream: true });

      if (isNdjson) {
        // Process complete lines; keep the rest buffered.
        buffer += chunk;
        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          const evt = parseNdjsonLine(line);
          if (!evt) continue;
          if (evt.type === "text") {
            accumulatedText += evt.chunk;
            yield { text: accumulatedText, done: false, hadError };
          } else if (evt.type === "citations") {
            citations = evt.items;
            yield { text: accumulatedText, citations, done: false, hadError };
          } else if (evt.type === "error") {
            hadError = true;
            yield { text: accumulatedText, done: false, hadError };
          }
        }
      } else {
        // Sentinel format: strip the leading keepalive whitespace the backend
        // sends before retrieval finishes, then accumulate, then yield with
        // citations parsed out for display.
        if (isFirstChunk) {
          chunk = chunk.trimStart();
          isFirstChunk = false;
        }
        buffer += chunk;
        if (buffer.includes(STREAM_ERROR_SENTINEL)) {
          hadError = true;
        }
        const visible = hadError
          ? buffer.replace(STREAM_ERROR_SENTINEL, "").trimEnd() + "\n\n*Error generating response.*"
          : buffer;
        const { text } = parseCitationsSentinel(visible);
        accumulatedText = text;
        yield { text: accumulatedText, done: false, hadError };
      }
    }
  } finally {
    reader.releaseLock();
  }

  // Final pass — for sentinel format, citations live in the trailing JSON.
  if (!isNdjson) {
    const final = parseCitationsSentinel(buffer);
    accumulatedText = final.text;
    citations = final.citations.length > 0 ? final.citations : undefined;
  }

  yield { text: accumulatedText, citations, done: true, hadError };
}
