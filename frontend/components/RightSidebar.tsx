"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SparklesIcon, ArrowsPointingOutIcon, PaperAirplaneIcon, StopIcon, TrashIcon, ArrowPathIcon, ExclamationTriangleIcon, BookOpenIcon, HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";

interface Citation {
  title: string;
  url: string | null;
  pillar: string | null;
  source_type: string | null;
}

interface Message {
  role: "user" | "ai";
  text: string;
  citations?: Citation[];
  isError?: boolean;
  retryText?: string;
  id?: string;
  feedback?: "up" | "down";
}

// Detect which intelligence pillar the user is currently on
const PILLAR_PREFIXES: Record<string, string> = {
  "/policy":    "Policy",
  "/economics": "Economics",
  "/technology":"Technology",
  "/clinical":  "Clinical",
  "/equity":      "Equity",
  "/operations":  "Operations",
};

function getPillarFromPath(path: string): string | undefined {
  for (const [prefix, label] of Object.entries(PILLAR_PREFIXES)) {
    if (path.startsWith(prefix)) return label;
  }
  return undefined;
}

// Parse [CITATIONS]...[/CITATIONS] sentinel out of streamed text
function parseCitations(raw: string): { text: string; citations: Citation[] } {
  const start = raw.indexOf("[CITATIONS]");
  const end   = raw.indexOf("[/CITATIONS]");
  if (start === -1 || end === -1) return { text: raw, citations: [] };

  const jsonStr = raw.slice(start + "[CITATIONS]".length, end);
  const text    = raw.slice(0, start).trimEnd();
  try {
    const citations = JSON.parse(jsonStr) as Citation[];
    return { text, citations: Array.isArray(citations) ? citations : [] };
  } catch {
    return { text, citations: [] };
  }
}

function classifyError(status: number | null, message: string): string {
  if (status === 503 || message.includes("fetch") || message.includes("network") || message.includes("Failed to fetch")) {
    return "**AI backend is offline.**\n\nIf running locally:\n```\ncd backend\nsource venv/bin/activate\nuvicorn main:app --reload --port 8000\n```\n\nOtherwise, the backend may be restarting on Railway — try again in 30 seconds.";
  }
  if (status === 401 || status === 403) {
    return "**Authentication required.** Please [log in](/login) to use the AI Analyst.";
  }
  if (status === 429) {
    return "**Rate limit reached.** You've sent too many requests. Please wait a moment before trying again.";
  }
  if (status === 408 || message.includes("timeout") || message.includes("AbortError")) {
    return "**Request timed out.** The AI took too long to respond — this can happen with complex questions. Try rephrasing or asking a simpler question first.";
  }
  if (status && status >= 500) {
    return "**Server error.** Something went wrong on our end. Please try again in a few seconds.";
  }
  return "**Connection error.** Check your internet connection and try again.";
}

export default function RightSidebar() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const pathname = usePathname() ?? "";
  const router = useRouter();
  const activePillar = getPillarFromPath(pathname);

  // On mount: restore conversation from localStorage (written by /chat page on every change,
  // and by handleExpand below). This means minimize → back → sidebar shows same conversation.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("htr-chat-history");
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  const handleExpand = useCallback(() => {
    // Sync current sidebar conversation to localStorage so /chat picks it up
    try {
      localStorage.setItem("htr-chat-history", JSON.stringify(messages));
    } catch { /* ignore */ }
    router.push("/chat");
  }, [messages, router]);

  const handleFeedback = useCallback((msgId: string, type: "up" | "down", query: string, response: string) => {
    setMessages((prev) => {
      const updated = prev.map((m) => {
        if (m.id !== msgId) return m;
        const newRating = m.feedback === type ? undefined : type;
        fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messageId: msgId, rating: newRating ?? null, query, response, pillar: activePillar }),
        }).catch(() => {});
        return { ...m, feedback: newRating };
      });
      return updated;
    });
  }, [activePillar]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const history = messagesRef.current.filter((m) => m.text.trim() && !m.isError);
    const aiMsgId = crypto.randomUUID();
    setMessages((prev) => [...prev, { role: "ai", text: "", id: aiMsgId }]);

    try {
      const body: Record<string, unknown> = { message: text, history };
      if (activePillar) body.pillar = activePillar;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        throw Object.assign(new Error("HTTP error"), { status: res.status });
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiText = "";

      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          aiText += decoder.decode(value, { stream: true });
          const hasError = aiText.includes("[STREAM_ERROR]");
          const displayRaw = hasError
            ? aiText.replace("[STREAM_ERROR]", "").trimEnd() + "\n\n*Error generating response.*"
            : aiText;
          // Strip citation sentinel from live display — only show it when stream ends
          const { text: displayText } = parseCitations(displayRaw);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "ai", text: displayText };
            return updated;
          });
        }
      }

      // Final parse — extract and attach citations
      const { text: finalText, citations } = parseCitations(aiText);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: finalText,
          id: aiMsgId,
          citations: citations.length > 0 ? citations : undefined,
        };
        return updated;
      });

    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        const status = (err as Error & { status?: number }).status ?? null;
        const errorText = classifyError(status, err.message);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "ai", text: errorText, isError: true, retryText: text };
          return updated;
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, activePillar]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <aside className="w-full h-full flex flex-col" aria-label="AI Analyst panel">
      <div className="flex-1 min-h-0 bg-white dark:bg-slate-900 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-indigo-500" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">AI Analyst</h3>
            {activePillar && (
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-1.5 py-0.5 rounded-full">
                {activePillar}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="p-2.5 text-slate-400 hover:text-rose-500 rounded transition-colors"
                title="Clear"
              >
                <TrashIcon className="w-3.5 h-3.5" />
              </button>
            )}
            <button onClick={handleExpand} className="p-2.5 text-slate-400 hover:text-indigo-600 rounded transition-colors" title="Expand to full view">
              <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 min-h-0 flex flex-col gap-3 p-3 overflow-y-auto text-xs"
        >
          {messages.length === 0 && (
            <div className="flex flex-col gap-3 py-2">
              <p className="text-slate-400 dark:text-slate-500 text-center leading-relaxed text-[11px]">
                {activePillar
                  ? `Ask about ${activePillar} topics — answers are filtered to this pillar.`
                  : "Ask a quick question without leaving this page."}
              </p>

              {/* Medicaid quick-prompt chips */}
              <div className="mt-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-600 mb-2 text-center">
                  Vermont Medicaid — Try asking:
                </p>
                <div className="flex flex-col gap-1.5">
                  {[
                    "Am I eligible for Vermont Medicaid?",
                    "What does Dr. Dynasaur cover?",
                    "What are the 2026 income limits?",
                    "How do I apply for Choices for Care?",
                    "What's the difference between MAGI and non-MAGI?",
                    "Can I have Medicare and Medicaid at the same time?",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => send(prompt)}
                      className="w-full text-left text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-700 dark:hover:text-rose-300 border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-800 rounded-lg px-3 py-2 transition-all leading-snug"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "flex justify-end" : ""}>
              {msg.role === "user" ? (
                <div className="bg-indigo-600 text-white rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%] leading-relaxed">
                  {msg.text}
                </div>
              ) : msg.isError ? (
                <div className="border-l-2 border-rose-300 bg-rose-50 dark:bg-rose-950/30 rounded-r-lg pl-3 pr-3 py-2.5 text-slate-700 dark:text-slate-200 leading-relaxed">
                  <div className="flex items-start gap-1.5 mb-1.5">
                    <ExclamationTriangleIcon className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-500">Error</span>
                  </div>
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p {...props} className="mb-1.5 last:mb-0 text-slate-600 dark:text-slate-300" />,
                      strong: ({ node, ...props }) => <strong {...props} className="font-bold text-slate-800 dark:text-slate-100" />,
                      code: ({ node, ...props }) => <code {...props} className="block bg-slate-100 dark:bg-slate-700 rounded px-2 py-1 text-[10px] font-mono text-slate-700 dark:text-slate-200 mt-1 whitespace-pre-wrap" />,
                      a: ({ node, ...props }) => <a {...props} className="text-indigo-600 underline" />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                  {msg.retryText && (
                    <button
                      onClick={() => send(msg.retryText!)}
                      className="flex items-center gap-1 mt-2 text-[10px] font-bold text-rose-600 hover:text-rose-700 transition-colors"
                    >
                      <ArrowPathIcon className="w-3 h-3" />
                      Try again
                    </button>
                  )}
                </div>
              ) : (
                <div className="border-l-2 border-indigo-200 dark:border-indigo-700 pl-3 text-slate-700 dark:text-slate-200 leading-relaxed">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p {...props} className="mb-1.5 last:mb-0" />,
                      ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 mb-1.5 space-y-0.5" />,
                      li: ({ node, ...props }) => <li {...props} />,
                      strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-slate-900 dark:text-slate-100" />,
                    }}
                  >
                    {msg.text || "…"}
                  </ReactMarkdown>

                  {/* Source citations */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-indigo-100 dark:border-indigo-900">
                      <div className="flex items-center gap-1 mb-1.5">
                        <BookOpenIcon className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Sources</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {msg.citations.map((c, ci) => (
                          <div key={ci} className="flex items-start gap-1.5">
                            <span className="shrink-0 text-[9px] font-black text-indigo-400 mt-0.5">{ci + 1}</span>
                            {c.url ? (
                              <a
                                href={c.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline leading-snug"
                              >
                                {c.title}
                              </a>
                            ) : (
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{c.title}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Feedback buttons — only on complete (non-empty) messages */}
                  {msg.id && msg.text && (
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={() => handleFeedback(msg.id!, "up", messages[i - 1]?.text ?? "", msg.text)}
                        className={`p-1 rounded transition-colors ${msg.feedback === "up" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : "text-slate-300 hover:text-emerald-500"}`}
                        title="Helpful"
                        aria-pressed={msg.feedback === "up"}
                      >
                        <HandThumbUpIcon className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id!, "down", messages[i - 1]?.text ?? "", msg.text)}
                        className={`p-1 rounded transition-colors ${msg.feedback === "down" ? "text-rose-600 bg-rose-50 dark:bg-rose-950/30" : "text-slate-300 hover:text-rose-500"}`}
                        title="Not helpful"
                        aria-pressed={msg.feedback === "down"}
                      >
                        <HandThumbDownIcon className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-slate-100 dark:border-slate-700 p-3">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a quick question…"
              aria-label="Message to AI Analyst"
              rows={6}
              className="w-full min-h-[7.5rem] max-h-[7.5rem] text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 pt-2 pb-9 focus:outline-none focus:border-indigo-300 dark:focus:border-indigo-600 resize-none leading-relaxed"
            />
            <button
              onClick={handleExpand}
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-indigo-600 transition-colors"
              title="Expand to full view"
            >
              <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
            </button>
            {isLoading ? (
              <button
                onClick={() => { abortRef.current?.abort(); setIsLoading(false); }}
                className="absolute bottom-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                <StopIcon className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="absolute bottom-2 right-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
