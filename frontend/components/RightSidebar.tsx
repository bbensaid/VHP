"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  SparklesIcon,
  PaperAirplaneIcon,
  TrashIcon,
  ChevronDownIcon,
  StopIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowDownTrayIcon,
  MicrophoneIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";

export const ALL_SECTIONS: string[] = [];

const SUGGESTED_QUESTIONS = [
  "Summarize the latest RHTP guidelines.",
  "How do global budgets impact rural hospitals?",
  "Explain the workforce gap trends in 2024.",
];

const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_SYSTEM_PROMPT =
  "You are an expert AI Analyst for the Health Transformation Review (HTR).\nYour audience consists of healthcare executives, policy makers, and economists.\nAnswer the following question concisely (under 3 sentences if possible) and professionally.\nFocus on policy, economics, and technology implications.";

interface RightSidebarProps {
  openSections: string[];
  onToggleSection: (section: string) => void;
}

export default function RightSidebar({
  openSections,
  onToggleSection,
}: RightSidebarProps) {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { role: string; text: string; feedback?: "up" | "down" }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);

  const abortControllerRef = useRef<AbortController | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen]);

  useEffect(() => {
    setMounted(true);

    const savedHistory = localStorage.getItem("htr-chat-history");
    if (savedHistory) {
      try {
        setChatMessages(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("htr-chat-history", JSON.stringify(chatMessages));
    }
  }, [chatMessages, mounted]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const streamResponse = async (userMessage: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setChatMessages((prev) => [...prev, { role: "ai", text: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          temperature,
          systemPrompt,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) throw new Error("Network response was not ok");
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiResponseText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          aiResponseText += chunk;
          setChatMessages((prev) => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1].text = aiResponseText;
            return newMsgs;
          });
        }
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Stream aborted");
      } else {
        console.error("Chat Error:", error);
        setChatMessages((prev) => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].text =
            "Sorry, there was an error processing your request. Please try again.";
          return newMsgs;
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setChatMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
    }

    streamResponse(userMessage);
  };

  const handleSuggestedClick = (question: string) => {
    if (isLoading) return;
    setChatMessages((prev) => [...prev, { role: "user", text: question }]);
    streamResponse(question);
  };

  const handleRegenerate = () => {
    if (isLoading) return;
    const lastUserMessage = [...chatMessages]
      .reverse()
      .find((m) => m.role === "user");
    if (lastUserMessage) {
      setChatMessages((prev) => prev.slice(0, -1)); // Remove the last AI response
      streamResponse(lastUserMessage.text);
    }
  };

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setInputValue((prev) => prev + " (Voice Input Simulation... )");
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFeedback = (index: number, type: "up" | "down") => {
    setChatMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? { ...msg, feedback: msg.feedback === type ? undefined : type }
          : msg,
      ),
    );
  };

  const handleClearChat = () => {
    setChatMessages([]);
    setShowClearConfirm(false);
  };

  const handleResetSettings = () => {
    setTemperature(DEFAULT_TEMPERATURE);
    setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
  };

  const handleDownloadTranscript = () => {
    if (chatMessages.length === 0) return;

    const content = chatMessages
      .map((m) => `[${m.role === "user" ? "USER" : "AI ANALYST"}]\n${m.text}`)
      .join("\n\n-------------------\n\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `htr-transcript-${new Date().toISOString().split("T")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    alert(
      "PDF Export initiated. (Requires PDF generation library like jspdf in production)",
    );
  };

  if (!mounted) {
    return (
      <div className="w-full h-64 bg-slate-50 animate-pulse rounded-xl"></div>
    );
  }

  const chatInterface = (
    <div
      className={`bg-white border-slate-200 flex flex-col transition-all duration-300 relative
        ${isMaximized ? "w-full max-w-4xl mx-auto h-[85vh] rounded-2xl shadow-2xl border" : "w-full border-t lg:border-t-0 lg:border-x lg:border-b lg:rounded-xl lg:shadow-xl lg:h-[600px] h-full"}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Dynamic Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-white lg:rounded-t-xl z-20">
        <button
          onClick={() => !isMaximized && setIsChatOpen(!isChatOpen)}
          className={`flex items-center gap-2 focus:outline-none ${!isMaximized ? "cursor-pointer" : "cursor-default"}`}
        >
          <SparklesIcon className="w-5 h-5 text-slate-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700">
            AI Analyst
          </h3>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded hover:bg-slate-100"
            title="Configure Model"
          >
            <Cog6ToothIcon className="w-4 h-4" />
          </button>
          {isMaximized && chatMessages.length > 0 && (
            <>
              <button
                onClick={handleDownloadTranscript}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded hover:bg-slate-100"
                title="Download TXT"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleExportPDF}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded hover:bg-slate-100 mr-1"
                title="Export PDF"
              >
                <DocumentTextIcon className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={() => {
              if (!isMaximized) setIsChatOpen(true);
              setIsMaximized(!isMaximized);
            }}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded hover:bg-slate-100"
            title={isMaximized ? "Minimize" : "Maximize"}
          >
            {isMaximized ? (
              <ArrowsPointingInIcon className="w-4 h-4" />
            ) : (
              <ArrowsPointingOutIcon className="w-4 h-4" />
            )}
          </button>
          {!isMaximized && (
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded hover:bg-slate-100"
            >
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-300 ${isChatOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      </div>

      {!isChatOpen && !isMaximized && (
        <p className="text-xs text-slate-500 mb-4 relative z-10 leading-relaxed font-medium animate-in fade-in">
          Ask questions about policy impact, reimbursement models, or workforce
          trends.
        </p>
      )}

      {(isChatOpen || isMaximized) && (
        <div
          className={`mb-4 relative animate-in fade-in slide-in-from-bottom-2 duration-300 ${isMaximized ? "flex-1 min-h-0" : "h-56"}`}
        >
          {showSettings && (
            <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur px-4 py-4 flex flex-col animate-in fade-in">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  Model Configuration
                </h4>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Temperature Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Temperature: {temperature}
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>

              {/* System Prompt */}
              <div className="mb-6 flex-1 flex flex-col">
                <label className="text-xs font-bold text-slate-700 uppercase mb-2">
                  System Prompt
                </label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full flex-1 min-h-[150px] p-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-slate-50 resize-none leading-relaxed"
                  placeholder="Define how the AI should behave..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleResetSettings}
                  className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Reset Default
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          <div
            ref={chatContainerRef}
            className="absolute inset-0 overflow-y-auto px-4 pb-2 flex flex-col custom-scrollbar overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent pt-6"
          >
            <div className="flex flex-col gap-2">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`self-${msg.role === "user" ? "end" : "start"} ${
                    msg.role === "user"
                      ? "bg-slate-100 text-slate-900 rounded-tr-none"
                      : "bg-slate-100 text-slate-700 border border-slate-200 rounded-tl-none"
                  } rounded-lg py-2 px-3 text-xs max-w-[90%]`}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p {...props} className="mb-2 last:mb-0" />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          {...props}
                          className="list-disc pl-4 mb-2 last:mb-0"
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          {...props}
                          className="list-decimal pl-4 mb-2 last:mb-0"
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li {...props} className="mb-1" />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong {...props} className="font-bold" />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-indigo-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                  {msg.role === "ai" && (
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/50">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(msg.text, i)}
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedIndex === i ? (
                            <CheckIcon className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <ClipboardDocumentIcon className="w-3 h-3" />
                          )}
                        </button>
                        <div className="w-px h-3 bg-slate-200 mx-1"></div>
                        <button
                          onClick={() => handleFeedback(i, "up")}
                          className={`${
                            msg.feedback === "up"
                              ? "text-emerald-600 bg-emerald-50"
                              : "text-slate-400 hover:text-emerald-600 hover:bg-slate-50"
                          } p-0.5 rounded transition-colors`}
                          title="Helpful"
                        >
                          <HandThumbUpIcon className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(i, "down")}
                          className={`p-0.5 rounded transition-colors ${
                            msg.feedback === "down"
                              ? "text-rose-600 bg-rose-50"
                              : "text-slate-400 hover:text-rose-600 hover:bg-slate-50"
                          }`}
                          title="Not Helpful"
                        >
                          <HandThumbDownIcon className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        {!isLoading && i === chatMessages.length - 1 && (
                          <button
                            onClick={handleRegenerate}
                            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-indigo-600 transition-colors"
                            title="Regenerate response"
                          >
                            <ArrowPathIcon className="w-3 h-3" />
                            <span>Regenerate</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* NEW ADDITION: Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3 text-sm text-slate-700 animate-in fade-in self-start px-3 py-2 bg-transparent">
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {chatMessages.length === 0 && !isLoading && (
                <div className="h-full flex flex-col justify-center animate-in fade-in duration-500">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
                    Suggested Questions
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestedClick(q)}
                        className="text-left text-xs text-slate-600 hover:text-indigo-600 hover:bg-slate-50 border border-slate-100 hover:border-indigo-100 rounded-lg p-2.5 transition-all duration-200 shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 mt-auto">
        <div className="relative flex items-end">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask the Analyst..."
            className="w-full bg-slate-100 border-0 rounded-xl pl-4 pr-16 py-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none shadow-inner"
            style={{ minHeight: "56px", maxHeight: "150px" }}
            onFocus={() => setIsChatOpen(true)}
          />
          <button
            onClick={toggleVoiceInput}
            className={`absolute right-10 bottom-3 p-1.5 rounded-md transition-colors shadow-sm ${
              isListening
                ? "bg-red-100 text-red-600 animate-pulse"
                : "text-slate-400 hover:bg-slate-200 hover:text-slate-600"
            }`}
            title="Voice Input"
          >
            <MicrophoneIcon className="w-4 h-4" />
          </button>
          {isLoading ? (
            <button
              onClick={handleStopGenerating}
              className="absolute right-2 bottom-3 p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-sm animate-pulse"
              title="Stop Generating"
            >
              <StopIcon className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="absolute right-2 bottom-3 p-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <aside className="w-full flex flex-col gap-6">
      {/* AI ANALYST (CHATBOX) */}
      {isMaximized && mounted ? (
        <>
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center bg-slate-50/50">
            <SparklesIcon className="w-6 h-6 text-slate-300 mb-2" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Analyst Maximized
            </p>
            <button
              onClick={() => setIsMaximized(false)}
              className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Restore View
            </button>
          </div>
          {createPortal(
            <div
              className="fixed inset-0 z- bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
              onClick={() => setIsMaximized(false)}
            >
              {chatInterface}
            </div>,
            document.body,
          )}
        </>
      ) : (
        chatInterface
      )}
    </aside>
  );
}