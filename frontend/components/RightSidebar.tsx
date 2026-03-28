"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { SparklesIcon, ArrowRightIcon, PaperAirplaneIcon, StopIcon, TrashIcon, ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "ai";
  text: string;
  isError?: boolean;
  retryText?: string;
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
    setMessages((prev) => [...prev, { role: "ai", text: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
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
          const display = aiText.includes("[STREAM_ERROR]")
            ? aiText.replace("[STREAM_ERROR]", "").trimEnd() + "\n\n*Error generating response.*"
            : aiText;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "ai", text: display };
            return updated;
          });
        }
      }
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
  }, [isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <aside className="w-full pt-4" aria-label="AI Analyst panel">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-indigo-500" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">AI Analyst</h3>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors"
                title="Clear"
              >
                <TrashIcon className="w-3.5 h-3.5" />
              </button>
            )}
            <Link href="/chat" className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-indigo-600 transition-colors px-1">
              Full chat <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Messages */}
        <div ref={messagesContainerRef} className="flex flex-col gap-3 p-3 overflow-y-auto text-xs" style={{ maxHeight: "calc(100vh - 22rem)" }}>
          {messages.length === 0 && (
            <p className="text-slate-400 text-center py-4 leading-relaxed">
              Ask a quick question without leaving this page.
            </p>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "flex justify-end" : ""}>
              {msg.role === "user" ? (
                <div className="bg-indigo-600 text-white rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%] leading-relaxed">
                  {msg.text}
                </div>
              ) : msg.isError ? (
                <div className="border-l-2 border-rose-300 bg-rose-50 rounded-r-lg pl-3 pr-3 py-2.5 text-slate-700 leading-relaxed">
                  <div className="flex items-start gap-1.5 mb-1.5">
                    <ExclamationTriangleIcon className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-500">Error</span>
                  </div>
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p {...props} className="mb-1.5 last:mb-0 text-slate-600" />,
                      strong: ({ node, ...props }) => <strong {...props} className="font-bold text-slate-800" />,
                      code: ({ node, ...props }) => <code {...props} className="block bg-slate-100 rounded px-2 py-1 text-[10px] font-mono text-slate-700 mt-1 whitespace-pre-wrap" />,
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
                <div className="border-l-2 border-indigo-200 pl-3 text-slate-700 leading-relaxed">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p {...props} className="mb-1.5 last:mb-0" />,
                      ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 mb-1.5 space-y-0.5" />,
                      li: ({ node, ...props }) => <li {...props} />,
                      strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-slate-900" />,
                    }}
                  >
                    {msg.text || "…"}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-slate-100 p-3 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a quick question…"
            aria-label="Message to AI Analyst"
            rows={1}
            className="flex-1 text-xs text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-300 resize-none leading-relaxed"
            style={{ maxHeight: "80px" }}
          />
          {isLoading ? (
            <button
              onClick={() => { abortRef.current?.abort(); setIsLoading(false); }}
              className="shrink-0 p-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              <StopIcon className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="shrink-0 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
