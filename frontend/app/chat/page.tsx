"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  SparklesIcon,
  PaperAirplaneIcon,
  TrashIcon,
  StopIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import BackendStatus from "@/components/BackendStatus";

// ── Constants ────────────────────────────────────────────────────────────────


const CONTEXT_LINKS = [
  { label: "Vermont Act 167", href: "/vermont-act-167", icon: DocumentTextIcon },
  { label: "AHEAD Model", href: "/ahead-model", icon: ChartBarIcon },
  { label: "California CalAIM", href: "/california-calaim", icon: DocumentTextIcon },
  { label: "Academy Modules", href: "/academy", icon: AcademicCapIcon },
  { label: "Policy Analysis", href: "/policy", icon: BookOpenIcon },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  feedback?: "up" | "down";
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const abortControllerRef = useRef<AbortController | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("htr-chat-history");
      if (saved) setMessages(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("htr-chat-history", JSON.stringify(messages));
  }, [messages, mounted]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    textareaRef.current?.focus();
    const prefill = sessionStorage.getItem("htr-prefill-question");
    if (prefill) {
      sessionStorage.removeItem("htr-prefill-question");
      setMessages([{ id: crypto.randomUUID(), role: "user", text: prefill }]);
      streamResponse(prefill);
    }
  }, []);

  // ── Streaming ──────────────────────────────────────────────────────────────

  const streamResponse = async (userMessage: string) => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    const historySnapshot = messagesRef.current.filter((m) => m.text.trim().length > 0);
    const aiMsgId = crypto.randomUUID();
    setMessages((prev) => [...prev, { id: aiMsgId, role: "ai", text: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: historySnapshot }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Connection error. Please try again.");
      }
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          aiText += decoder.decode(value, { stream: true });
          const displayText = aiText.includes("[STREAM_ERROR]")
            ? aiText.replace("[STREAM_ERROR]", "").trimEnd() + "\n\n*An error occurred generating this response.*"
            : aiText;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...updated[updated.length - 1], text: displayText };
            return updated;
          });
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        const msg = error.message || "Sorry, there was an error. Please try again.";
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], text: msg };
          return updated;
        });
      }
    } finally {
      setIsLoading(false);
      // Fetch follow-up suggestions after response completes
      try {
        const currentMessages = messagesRef.current.filter((m) => m.text.trim().length > 0);
        const res = await fetch("/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage, history: currentMessages }),
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.suggestions)) setSuggestions(data.suggestions);
        }
      } catch { /* suggestions are non-critical */ }
    }
  };

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: trimmed }]);
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    streamResponse(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = textareaRef.current;
    if (el) { el.style.height = "auto"; el.style.height = `${Math.min(el.scrollHeight, 160)}px`; }
  };

  const handleStop = () => { abortControllerRef.current?.abort(); setIsLoading(false); };

  const handleRegenerate = () => {
    if (isLoading) return;
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) { setMessages((prev) => prev.slice(0, -1)); streamResponse(lastUser.text); }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFeedback = (index: number, type: "up" | "down") => {
    setMessages((prev) =>
      prev.map((msg, i) => i === index ? { ...msg, feedback: msg.feedback === type ? undefined : type } : msg)
    );
  };

  const handleDownloadTranscript = () => {
    if (messages.length === 0) return;
    const content = messages.map((m) => `[${m.role === "user" ? "YOU" : "HTR ANALYST"}]\n${m.text}`).join("\n\n---\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `htr-analysis-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const askQuestion = (q: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: q }]);
    streamResponse(q);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="h-full flex flex-col bg-slate-50">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="shrink-0 z-20 bg-white border-b border-slate-200 px-4 md:px-6 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-indigo-600" />
            <span className="font-black text-slate-900 tracking-tight">HTR AI Analyst</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Beta
            </span>
            <BackendStatus />
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <>
              <button onClick={handleDownloadTranscript} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Download transcript">
                <ArrowDownTrayIcon className="w-4 h-4" />
              </button>
              <button onClick={() => setShowClearConfirm(true)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Clear conversation">
                <TrashIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── Body: two-column layout ─────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* ── Left panel ───────────────────────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 border-r border-slate-200 bg-white overflow-y-auto">

          {/* Dynamic follow-up suggestions */}
          <div className="p-5 flex-1">
            {suggestions.length > 0 ? (
              <>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Follow-up Questions</p>
                <div className="space-y-2">
                  {suggestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => askQuestion(q)}
                      disabled={isLoading}
                      className="w-full text-left text-xs text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg px-3 py-2.5 transition-colors leading-snug border border-slate-100 hover:border-indigo-200 disabled:opacity-40"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400 text-center mt-8 leading-relaxed">
                Follow-up questions will appear here after your first message.
              </p>
            )}
          </div>

          {/* Context links */}
          <div className="p-5 border-t border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Related Pages</p>
            <div className="space-y-1">
              {CONTEXT_LINKS.map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href} className="flex items-center gap-2 text-xs text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg px-3 py-2 transition-colors">
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Right panel: chat ─────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col min-w-0 min-h-0">

          {/* Message area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto min-h-0 px-4 md:px-8 py-6 space-y-6">

            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-5">
                  <SparklesIcon className="w-7 h-7 text-indigo-500" />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">HTR AI Analyst</h2>
                <p className="text-sm text-slate-500 max-w-sm mb-8">
                  Ask anything about health policy, economics, or the programs indexed in the knowledge base.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={msg.id ?? i} className={`${msg.role === "user" ? "flex justify-end" : ""}`}>
                {msg.role === "user" ? (
                  <div className="max-w-[80%] bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
                    {msg.text}
                  </div>
                ) : (
                  <div className="border-l-4 border-indigo-200 pl-5 pr-2">
                    <div className="flex items-center gap-2 mb-2">
                      <SparklesIcon className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">HTR Analyst</span>
                    </div>
                    <div className="text-sm text-slate-800 leading-relaxed">
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p {...props} className="mb-3 last:mb-0 leading-relaxed" />,
                          ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 mb-3 space-y-1" />,
                          ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 mb-3 space-y-1" />,
                          li: ({ node, ...props }) => <li {...props} className="leading-relaxed" />,
                          strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-slate-900" />,
                          a: ({ node, ...props }) => <a {...props} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer" />,
                          h2: ({ node, ...props }) => <h2 {...props} className="text-base font-bold text-slate-900 mt-5 mb-2" />,
                          h3: ({ node, ...props }) => <h3 {...props} className="text-sm font-bold text-slate-900 mt-4 mb-1" />,
                          blockquote: ({ node, ...props }) => <blockquote {...props} className="border-l-4 border-slate-200 pl-4 italic text-slate-600 my-3" />,
                          code: ({ node, ...props }) => <code {...props} className="bg-slate-100 text-slate-800 text-xs px-1.5 py-0.5 rounded font-mono" />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    {msg.text && (
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                        <button onClick={() => handleCopy(msg.text, i)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded" title="Copy">
                          {copiedIndex === i ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" /> : <ClipboardDocumentIcon className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleFeedback(i, "up")}
                          className={`p-1 rounded transition-colors ${msg.feedback === "up" ? "text-emerald-600 bg-emerald-50" : "text-slate-400 hover:text-emerald-600"}`}
                          title="Helpful"
                        >
                          <HandThumbUpIcon className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleFeedback(i, "down")}
                          className={`p-1 rounded transition-colors ${msg.feedback === "down" ? "text-rose-600 bg-rose-50" : "text-slate-400 hover:text-rose-600"}`}
                          title="Not helpful"
                        >
                          <HandThumbDownIcon className="w-3.5 h-3.5" />
                        </button>
                        {!isLoading && i === messages.length - 1 && (
                          <button onClick={handleRegenerate} className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 transition-colors ml-1">
                            <ArrowPathIcon className="w-3.5 h-3.5" />
                            Regenerate
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="border-l-4 border-indigo-200 pl-5">
                <div className="flex items-center gap-2 mb-3">
                  <SparklesIcon className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">HTR Analyst</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* ── Input bar ────────────────────────────────────────────────────── */}
          <div className="border-t border-slate-200 bg-white px-4 md:px-8 py-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-indigo-300 focus-within:bg-white transition-colors">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask the Analyst… (Enter to send, Shift+Enter for new line)"
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
                  style={{ maxHeight: "160px" }}
                  aria-label="Chat message input"
                />
                {isLoading ? (
                  <button onClick={handleStop} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-colors">
                    <StopIcon className="w-3.5 h-3.5" />
                    Stop
                  </button>
                ) : (
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="w-3.5 h-3.5" />
                    Send
                  </button>
                )}
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-2">
                AI responses may contain errors. Verify clinical or policy information with primary sources.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* ── Clear confirm ────────────────────────────────────────────────────── */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowClearConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <TrashIcon className="w-8 h-8 text-rose-500 mx-auto mb-3" />
            <h3 className="font-black text-slate-900 mb-2">Clear conversation?</h3>
            <p className="text-sm text-slate-600 mb-5">This will delete all messages from your local history.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => { setMessages([]); localStorage.removeItem("htr-chat-history"); setShowClearConfirm(false); }}
                className="flex-1 py-2.5 bg-rose-600 text-white text-sm font-bold rounded-xl hover:bg-rose-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
