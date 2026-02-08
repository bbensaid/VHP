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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);

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
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const streamResponse = async (userText: string) => {
    setIsLoading(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, temperature, systemPrompt }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) throw new Error(res.statusText);

      // Add placeholder for AI response
      setChatMessages((prev) => [...prev, { role: "ai", text: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        aiText += text;

        setChatMessages((prev) => {
          const newMsgs = [...prev];
          const lastMsgIndex = newMsgs.length - 1;
          newMsgs[lastMsgIndex] = { ...newMsgs[lastMsgIndex], text: aiText };
          return newMsgs;
        });
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        setChatMessages((prev) => [
          ...prev,
          { role: "ai", text: "Connection error. Please try again." },
        ]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setChatMessages((prev) => [...prev, { role: "user", text: userText }]);
    await streamResponse(userText);
  };

  const handleRegenerate = () => {
    if (isLoading || chatMessages.length === 0) return;

    const lastMsg = chatMessages[chatMessages.length - 1];
    if (lastMsg.role !== "ai") return;

    // Find the last user message
    const messagesReversed = [...chatMessages].reverse();
    const lastUserMsg = messagesReversed.find((m) => m.role === "user");

    if (!lastUserMsg) return;

    // Remove the last AI message
    setChatMessages((prev) => prev.slice(0, -1));

    // Trigger stream
    streamResponse(lastUserMsg.text);
  };

  const handleSuggestedClick = async (question: string) => {
    if (isLoading) return;
    setChatMessages((prev) => [...prev, { role: "user", text: question }]);
    await streamResponse(question);
  };

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
    a.download = `HTR-Analyst-Transcript-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = async () => {
    if (chatMessages.length === 0) return;

    try {
      // Dynamically import jspdf to ensure it's loaded only on client side when needed
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const maxLineWidth = pageWidth - margin * 2;
      let y = 20;

      doc.setFontSize(18);
      doc.text("HTR Analyst Transcript", margin, y);
      y += 10;

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
      y += 15;

      chatMessages.forEach((msg) => {
        if (y > doc.internal.pageSize.getHeight() - 30) {
          doc.addPage();
          y = 20;
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        const role = msg.role === "user" ? "USER" : "AI ANALYST";
        doc.setTextColor(msg.role === "user" ? "#4f46e5" : "#0f172a");
        doc.text(role, margin, y);
        y += 6;

        doc.setFont("helvetica", "normal");
        doc.setTextColor(50);
        doc.setFontSize(10);

        const lines = doc.splitTextToSize(msg.text, maxLineWidth);

        if (y + lines.length * 5 > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = 20;
        }

        doc.text(lines, margin, y);
        y += lines.length * 5 + 10;
      });

      doc.save(`HTR-Transcript-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Please ensure 'jspdf' is installed to use this feature.");
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const chatInterface = (
    <div
      className={`bg-white border border-slate-200 rounded-xl p-5 text-slate-900 shadow-sm relative overflow-hidden group transition-all duration-500 ease-in-out flex flex-col ${
        isMaximized
          ? "w-full max-w-5xl h-[80vh] shadow-2xl"
          : isChatOpen
            ? "h-96"
            : "h-auto"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-slate-50 rounded-full blur-2xl"></div>

      <div className="flex items-center justify-between w-full mb-3 relative z-10">
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
            <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm flex flex-col p-6 animate-in fade-in duration-200 rounded-lg border border-slate-100 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Cog6ToothIcon className="w-4 h-4 text-slate-500" />
                  Model Settings
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Temperature Slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
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

          {chatMessages.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="absolute top-0 right-0 z-10 flex items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded transition-colors"
            >
              <TrashIcon className="w-3 h-3" /> Clear
            </button>
          )}
          {showClearConfirm && (
            <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-200 rounded-lg border border-slate-100">
              <div className="bg-red-50 p-2 rounded-full mb-2">
                <TrashIcon className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-sm font-bold text-slate-800 mb-1">
                Clear Chat History?
              </p>
              <p className="text-xs text-slate-500 mb-4 max-w-[200px]">
                This will permanently delete your conversation history.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearChat}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          <div
            ref={chatContainerRef}
            className="h-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pt-6"
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
                    <div className="mt-2 flex items-center justify-between border-t border-slate-200/50 pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleFeedback(i, "up")}
                          className={`p-1 rounded transition-colors ${
                            msg.feedback === "up"
                              ? "text-emerald-600 bg-emerald-50"
                              : "text-slate-400 hover:text-emerald-600 hover:bg-slate-50"
                          }`}
                          title="Helpful"
                        >
                          <HandThumbUpIcon className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(i, "down")}
                          className={`p-1 rounded transition-colors ${
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
                        <button
                          onClick={() => handleCopy(msg.text, i)}
                          className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-indigo-600 transition-colors"
                          title="Copy response"
                        >
                          {copiedIndex === i ? (
                            <>
                              <CheckIcon className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500 font-medium">
                                Copied
                              </span>
                            </>
                          ) : (
                            <>
                              <ClipboardDocumentIcon className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* Only show analyzing pulse if we are loading AND haven't started streaming the AI response yet */}
              {isLoading &&
                chatMessages[chatMessages.length - 1]?.role === "user" && (
                  <div className="self-start bg-slate-100 border border-slate-200 rounded-lg rounded-tl-none py-3 px-4 max-w-[90%] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  </div>
                )}
              {chatMessages.length === 0 && !isLoading && (
                <div className="mt-8 px-1">
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
            rows={1}
            placeholder="Ask HTR Intelligence..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-20 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 transition-all resize-none overflow-hidden min-h-[38px] max-h-32"
            onFocus={() => setIsChatOpen(true)}
          />
          <button
            onClick={toggleVoiceInput}
            className={`absolute right-10 bottom-1.5 p-1.5 rounded-md transition-colors shadow-sm ${
              isListening
                ? "bg-red-100 text-red-600 animate-pulse"
                : "text-slate-400 hover:bg-slate-200 hover:text-slate-600"
            }`}
            title="Voice Input"
          >
            <MicrophoneIcon className="w-3 h-3" />
          </button>
          {isLoading ? (
            <button
              onClick={handleStopGenerating}
              className="absolute right-1.5 bottom-1.5 p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-sm animate-pulse"
              title="Stop Generating"
            >
              <StopIcon className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="absolute right-1.5 bottom-1.5 p-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-3 h-3" />
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
              className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
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
