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
  Cog6ToothIcon,
  XMarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import BackendStatus from "@/components/BackendStatus";

// ── Constants ────────────────────────────────────────────────────────────────

const SUGGESTED_QUESTIONS = [
  "What are the biggest cost drivers in U.S. healthcare today?",
  "How does value-based care improve patient outcomes?",
  "What does the evidence say about healthcare workforce shortages?",
  "What are the key provisions of Vermont's Act 167?",
  "Compare fee-for-service vs value-based care economics.",
  "How do global budgets work in the Rural Health Transformation Program?",
];

const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_SYSTEM_PROMPT =
  "You are an expert AI Analyst for the Health Transformation Review (HTR).\n" +
  "Your audience consists of healthcare executives, policy makers, and economists.\n" +
  "Answer questions thoroughly and professionally, citing specific policies and data where relevant.\n" +
  "Focus on policy, economics, and technology implications.";

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
  const [showSettings, setShowSettings] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Refs so streamResponse never closes over stale state
  const messagesRef = useRef(messages);
  const temperatureRef = useRef(temperature);
  const systemPromptRef = useRef(systemPrompt);
  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { temperatureRef.current = temperature; }, [temperature]);
  useEffect(() => { systemPromptRef.current = systemPrompt; }, [systemPrompt]);

  // Hydrate from localStorage once
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("htr-chat-history");
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("htr-chat-history", JSON.stringify(messages));
    }
  }, [messages, mounted]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus textarea on mount; also pick up any pre-filled question from the sidebar CTA.
  useEffect(() => {
    textareaRef.current?.focus();

    const prefill = sessionStorage.getItem("htr-prefill-question");
    if (prefill) {
      sessionStorage.removeItem("htr-prefill-question");
      // Fire the question automatically as if the user clicked it
      setMessages([{ id: crypto.randomUUID(), role: "user", text: prefill }]);
      streamResponse(prefill);
    }
  }, []);

  // ── Streaming ──────────────────────────────────────────────────────────────

  const streamResponse = async (userMessage: string) => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    // Snapshot history before adding the AI placeholder, so Gemini sees clean prior turns
    const historySnapshot = messagesRef.current.filter((m) => m.text.trim().length > 0);
    const aiMsgId = crypto.randomUUID();
    setMessages((prev) => [...prev, { id: aiMsgId, role: "ai", text: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          temperature: temperatureRef.current,
          systemPrompt: systemPromptRef.current,
          history: historySnapshot,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) throw new Error("Network response was not ok");
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
          // Replace backend error sentinel with a user-friendly message
          const displayText = aiText.includes("[STREAM_ERROR]")
            ? aiText.replace("[STREAM_ERROR]", "").trimEnd() +
              "\n\n*An error occurred generating this response.*"
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
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: "Sorry, there was an error processing your request. Please try again.",
          };
          return updated;
        });
      }
    } finally {
      setIsLoading(false);
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  };

  const handleRegenerate = () => {
    if (isLoading) return;
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) {
      setMessages((prev) => prev.slice(0, -1));
      streamResponse(lastUser.text);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFeedback = (index: number, type: "up" | "down") => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? { ...msg, feedback: msg.feedback === type ? undefined : type }
          : msg
      )
    );
  };

  const handleDownloadTranscript = () => {
    if (messages.length === 0) return;
    const content = messages
      .map((m) => `[${m.role === "user" ? "YOU" : "HTR ANALYST"}]\n${m.text}`)
      .join("\n\n---\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `htr-chat-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 md:px-8 h-14 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            aria-label="Back to Home"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span className="text-slate-300 select-none">|</span>
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-indigo-600" />
            <span className="font-black text-slate-900 tracking-tight">
              HTR AI Analyst
            </span>
            <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Beta
            </span>
            <BackendStatus />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <>
              <button
                onClick={handleDownloadTranscript}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Download transcript"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Clear conversation"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Model settings"
          >
            <Cog6ToothIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Main chat area ─────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 py-6 gap-4">
        {/* Message list */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto flex flex-col gap-4 pb-2"
        >
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full py-16 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <SparklesIcon className="w-8 h-8 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                HTR AI Analyst
              </h2>
              <p className="text-slate-600 text-center max-w-md mb-10">
                Ask questions about health policy, reimbursement models,
                workforce trends, or the Vermont RHTP program.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setMessages((prev) => [
                        ...prev,
                        { id: crypto.randomUUID(), role: "user", text: q },
                      ]);
                      streamResponse(q);
                    }}
                    className="text-left text-sm text-slate-700 hover:text-indigo-700 bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 rounded-xl p-4 transition-all shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`w-full rounded-2xl px-5 py-4 text-sm ${
                msg.role === "user"
                  ? "bg-slate-800 text-white self-end max-w-[85%] ml-auto"
                  : "bg-white border border-slate-200 text-slate-800 shadow-sm"
              }`}
            >
              {msg.role === "ai" && (
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                  <SparklesIcon className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                    HTR Analyst
                  </span>
                </div>
              )}
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => (
                    <p {...props} className="mb-2 last:mb-0 leading-relaxed" />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-disc pl-5 mb-2 space-y-1" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      {...props}
                      className="list-decimal pl-5 mb-2 space-y-1"
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li {...props} className="leading-relaxed" />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong {...props} className="font-bold" />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-indigo-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      {...props}
                      className="text-lg font-bold text-slate-900 mt-4 mb-2"
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      {...props}
                      className="text-base font-bold text-slate-900 mt-3 mb-1"
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      {...props}
                      className="border-l-4 border-indigo-200 pl-4 italic text-slate-600 my-3"
                    />
                  ),
                }}
              >
                {msg.text}
              </ReactMarkdown>

              {msg.role === "ai" && msg.text && (
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(msg.text, i)}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded"
                      title="Copy"
                    >
                      {copiedIndex === i ? (
                        <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <div className="w-px h-3 bg-slate-200" />
                    <button
                      onClick={() => handleFeedback(i, "up")}
                      className={`p-1 rounded transition-colors ${
                        msg.feedback === "up"
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-slate-400 hover:text-emerald-600 hover:bg-slate-50"
                      }`}
                      title="Helpful"
                    >
                      <HandThumbUpIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleFeedback(i, "down")}
                      className={`p-1 rounded transition-colors ${
                        msg.feedback === "down"
                          ? "text-rose-600 bg-rose-50"
                          : "text-slate-400 hover:text-rose-600 hover:bg-slate-50"
                      }`}
                      title="Not helpful"
                    >
                      <HandThumbDownIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {!isLoading && i === messages.length - 1 && (
                    <button
                      onClick={handleRegenerate}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 transition-colors"
                      title="Regenerate"
                    >
                      <ArrowPathIcon className="w-3.5 h-3.5" />
                      Regenerate
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 px-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm w-fit animate-in fade-in">
              <div
                className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          )}
        </div>

        {/* ── Input bar ──────────────────────────────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-3">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask the Analyst… (Enter to send, Shift+Enter for newline)"
            rows={1}
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none resize-none leading-relaxed px-1"
            style={{ maxHeight: "160px" }}
            aria-label="Chat message input"
          />
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
            <p className="text-[10px] text-slate-500 hidden sm:block">
              Shift+Enter for new line
            </p>
            <div className="flex items-center gap-2 ml-auto">
              {isLoading ? (
                <button
                  onClick={handleStop}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors animate-pulse"
                >
                  <StopIcon className="w-3.5 h-3.5" />
                  Stop
                </button>
              ) : (
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-3.5 h-3.5" />
                  Send
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-500">
          AI responses may contain errors. Always verify clinical or policy
          information with primary sources.
        </p>
      </main>

      {/* ── Settings panel ─────────────────────────────────────────────────── */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in slide-in-from-bottom-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">
                Model Configuration
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Temperature
                </label>
                <span className="text-xs font-mono text-slate-600">
                  {temperature}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
                aria-label="Model temperature"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                System Prompt
              </label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={5}
                className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 bg-slate-50 resize-none leading-relaxed"
                placeholder="Define how the AI should behave…"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setTemperature(DEFAULT_TEMPERATURE);
                  setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
                }}
                className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Reset Defaults
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Clear confirm ──────────────────────────────────────────────────── */}
      {showClearConfirm && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowClearConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon className="w-8 h-8 text-rose-500 mx-auto mb-3" />
            <h3 className="font-black text-slate-900 mb-2">Clear conversation?</h3>
            <p className="text-sm text-slate-600 mb-5">
              This will delete all messages from your local history.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setMessages([]);
                  localStorage.removeItem("htr-chat-history");
                  setShowClearConfirm(false);
                }}
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