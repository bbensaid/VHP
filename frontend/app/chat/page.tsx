"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/SidebarContext";
import { useVoice } from "@/components/VoiceContext";
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
  ArrowsPointingInIcon,
  BookOpenIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  BanknotesIcon,
  CpuChipIcon,
  HeartIcon,
  ScaleIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import BackendStatus from "@/components/BackendStatus";

// ── PHI Detection ────────────────────────────────────────────────────────────

function detectPHI(text: string): boolean {
  // SSN pattern: 123-45-6789
  if (/\b\d{3}-\d{2}-\d{4}\b/.test(text)) return true;

  // MRN pattern: MRN: 12345 / mrn #98765 / Medical Record 00001
  if (/\b(MRN|mrn|Medical Record)[:\s#]*\d{4,}\b/.test(text)) return true;

  // DOB or "date of birth" within 100 chars of a full name pattern
  const dobKeywordMatch = text.match(/\b(DOB|date of birth)\b/i);
  if (dobKeywordMatch) {
    const idx = dobKeywordMatch.index ?? 0;
    const window = text.slice(Math.max(0, idx - 100), idx + 100);
    if (/\b[A-Z][a-z]+ [A-Z][a-z]+\b/.test(window)) return true;
  }

  // Full name + date combination within ~80 chars
  if (/\b[A-Z][a-z]+ [A-Z][a-z]+\b.{0,80}\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/.test(text)) return true;

  return false;
}

// ── Full platform topic grid (shown when user chose "Skip — Show me everything") ──

const ALL_PLATFORM_SECTIONS = [
  {
    label: "Policy",
    color: "bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100",
    headerColor: "text-sky-700",
    icon: BuildingLibraryIcon,
    topics: [
      { label: "Regulation & Legislation",    prompt: "What are the most important health regulations and legislation I should know about?" },
      { label: "Public Health Mandates",       prompt: "What federal and state public health mandates are shaping healthcare delivery right now?" },
      { label: "Global & Comparative Policy",  prompt: "How does US health policy compare to other countries on key outcomes?" },
      { label: "Policy Feasibility Studies",   prompt: "What methodologies are used for health policy feasibility analysis?" },
      { label: "Policy Simulator",             prompt: "How can I use the platform's policy simulator to model healthcare scenarios?" },
      { label: "Work Requirements Calculator", prompt: "What is the estimated coverage impact of Medicaid work requirements in Vermont?" },
      { label: "H.R. 1 Cliff Scenario",        prompt: "Explain the H.R. 1 cliff scenario and its impact on Medicaid coverage" },
      { label: "Innovation Leaderboard",       prompt: "Which states are leading in health transformation and innovation?" },
    ],
  },
  {
    label: "Economics",
    color: "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100",
    headerColor: "text-emerald-700",
    icon: BanknotesIcon,
    topics: [
      { label: "Value-Based Care Models",        prompt: "What are the leading value-based care models and how do they differ?" },
      { label: "Market & Finance",               prompt: "What are the key financial trends shaping healthcare markets right now?" },
      { label: "Labor & Workforce Strategy",     prompt: "What workforce economics strategies are most effective for health systems?" },
      { label: "Healthcare Investment Trends",   prompt: "Where is investment flowing in healthcare and why?" },
      { label: "APM Design Lab",                 prompt: "How do I design an alternative payment model for a Vermont ACO?" },
      { label: "Shared Savings Calculator",      prompt: "How does shared savings work in an ACO and how is it calculated?" },
      { label: "CEA Calculator",                 prompt: "How do I calculate cost-effectiveness (cost per QALY) for a health intervention?" },
      { label: "Global Budget Transition",       prompt: "Model the revenue trajectory for a health system transitioning to a global budget" },
      { label: "Hospital Financial Stress Test", prompt: "Which Vermont hospitals are most financially stressed and why?" },
      { label: "HTA Studio",                     prompt: "What is Health Technology Assessment and how is it used in coverage decisions?" },
      { label: "Actuarial Lab",                  prompt: "What are the actuarial risks in Vermont's AHEAD model for payers?" },
    ],
  },
  {
    label: "Technology",
    color: "bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100",
    headerColor: "text-indigo-700",
    icon: CpuChipIcon,
    topics: [
      { label: "AI & Machine Learning",          prompt: "How is AI being used in healthcare and what are the governance requirements?" },
      { label: "Digital Health & Telemedicine",  prompt: "What are the latest developments in digital health and telemedicine reimbursement?" },
      { label: "Data Security & Governance",     prompt: "What are the HIPAA cybersecurity requirements for health systems?" },
      { label: "Tech-Enabled Workflow",          prompt: "How is technology transforming clinical and operational workflows in health systems?" },
      { label: "FHIR Interoperability Lab",      prompt: "How do I build a FHIR R4 compliant patient summary and test it against ONC requirements?" },
      { label: "AI Clinical Governance Lab",     prompt: "How do I detect and mitigate algorithmic bias in a clinical AI model?" },
      { label: "Digital Health Lab",             prompt: "What is the ROI model for a remote patient monitoring program?" },
    ],
  },
  {
    label: "Clinical",
    color: "bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100",
    headerColor: "text-rose-700",
    icon: HeartIcon,
    topics: [
      { label: "Hospital-at-Home",          prompt: "What's the latest evidence on hospital-at-home programs and reimbursement?" },
      { label: "Precision Medicine",        prompt: "How is precision medicine changing treatment protocols and what are the cost implications?" },
      { label: "Virtual Care Models",       prompt: "What are the most effective virtual care delivery models and their outcomes?" },
      { label: "Risk Stratification",       prompt: "What tools help stratify patient risk and identify high-need populations?" },
      { label: "Clinical Quality Optimizer",prompt: "How can I improve HEDIS scores and CMS Star Ratings?" },
      { label: "Workforce Modeler",         prompt: "What workforce strategies address clinical staffing shortages in Vermont?" },
    ],
  },
  {
    label: "Equity",
    color: "bg-violet-50 border-violet-200 text-violet-800 hover:bg-violet-100",
    headerColor: "text-violet-700",
    icon: ScaleIcon,
    topics: [
      { label: "SDOH Integration",          prompt: "How does SDOH integration improve clinical outcomes and reduce costs?" },
      { label: "Algorithmic Bias",          prompt: "What are the main sources of algorithmic bias in healthcare AI and how are they addressed?" },
      { label: "Access Disparity",          prompt: "What are the biggest health access disparities in Vermont and nationally?" },
      { label: "Population Health Modeler", prompt: "How do I model population health interventions and their equity impact?" },
      { label: "Health Equity Studio",      prompt: "What metrics should I track to measure health equity progress in my organization?" },
    ],
  },
  {
    label: "Operations",
    color: "bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100",
    headerColor: "text-teal-700",
    icon: Cog6ToothIcon,
    topics: [
      { label: "Revenue Cycle Management",     prompt: "What are the best revenue cycle management strategies for health systems in 2026?" },
      { label: "Workforce & Human Capital",    prompt: "What are effective workforce retention and human capital strategies in healthcare?" },
      { label: "Quality, Compliance & Risk",   prompt: "What are the key compliance and risk management priorities for health systems?" },
      { label: "Supply Chain & Infrastructure",prompt: "How are health systems modernizing supply chain and infrastructure post-pandemic?" },
      { label: "Payer & Network Operations",   prompt: "What are the key payer negotiation and network strategy trends?" },
      { label: "Transformation Scorecard",     prompt: "How do I assess my organization's overall health transformation readiness?" },
      { label: "VBC Readiness Assessment",     prompt: "How ready is a typical health system for value-based care contracts?" },
      { label: "Evidence Library",             prompt: "What are the strongest evidence-based interventions for healthcare transformation?" },
    ],
  },
  {
    label: "Tools & Simulations",
    color: "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100",
    headerColor: "text-amber-700",
    icon: WrenchScrewdriverIcon,
    topics: [
      { label: "HTR Simulator",            prompt: "What can the HTR Simulator model and how do I use it?" },
      { label: "Medicaid Eligibility",     prompt: "Am I eligible for Vermont Medicaid? Walk me through the criteria." },
      { label: "HTI Dashboard",            prompt: "What does the Health Transformation Index measure and how are states ranked?" },
      { label: "The Wire",                 prompt: "What are the most important healthcare news stories and signals right now?" },
      { label: "Investment Tracker",       prompt: "What are the biggest healthcare investment deals and trends this year?" },
      { label: "Friction Index",           prompt: "What is the Health Transformation Friction Index and which states have the most friction?" },
      { label: "Impact Simulation",        prompt: "How do I simulate the impact of a specific health policy change?" },
      { label: "Trending Topics",          prompt: "What are the most discussed topics in health transformation right now?" },
    ],
  },
  {
    label: "States & Programs",
    color: "bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100",
    headerColor: "text-orange-700",
    icon: MapPinIcon,
    topics: [
      { label: "Vermont Medicaid",           prompt: "Give me an overview of Vermont Medicaid — eligibility, benefits, and recent changes." },
      { label: "Vermont Act 167",            prompt: "Walk me through Vermont Act 167 and what it requires from providers." },
      { label: "Vermont Act 68 (2025)",      prompt: "What does Vermont Act 68 of 2025 change for health policy?" },
      { label: "Vermont AHEAD Model",        prompt: "What is Vermont's AHEAD model and how does it differ from traditional Medicaid?" },
      { label: "Vermont RHT Program",        prompt: "What is Vermont's Rural Health Transformation Program?" },
      { label: "Bed Capacity & Transfer",    prompt: "What is Vermont's current hospital bed capacity situation and how are transfers managed?" },
      { label: "All States Explorer",        prompt: "Compare Vermont to neighboring states on health transformation metrics." },
      { label: "50-State Dashboard",         prompt: "Rank all 50 states on health transformation activity and innovation." },
      { label: "California CalAIM",          prompt: "What is California's CalAIM initiative and what can other states learn from it?" },
      { label: "Oregon CCO 3.0",             prompt: "What is Oregon's CCO 3.0 model and how does it differ from traditional Medicaid managed care?" },
      { label: "CMS Rural Health",           prompt: "What is the CMS Rural Health Transformation program and who qualifies?" },
    ],
  },
  {
    label: "Academy & Learning",
    color: "bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100",
    headerColor: "text-sky-700",
    icon: AcademicCapIcon,
    topics: [
      { label: "Personalized Learning Path", prompt: "Where should I start learning about value-based care and health transformation?" },
      { label: "Learning Tracks",            prompt: "What structured learning tracks does the platform offer?" },
      { label: "Courses",                    prompt: "What courses are available on health economics, policy, and transformation?" },
      { label: "Webinars",                   prompt: "What webinars are available on health transformation topics?" },
      { label: "Case Studies",               prompt: "What are the most instructive healthcare transformation case studies?" },
      { label: "Medicaid Learning Center",   prompt: "Where can I learn the basics of how Medicaid works and its policy landscape?" },
      { label: "Key CEA Studies",            prompt: "What are the landmark cost-effectiveness studies in healthcare I should know?" },
    ],
  },
];

// ── Role-specific starter cards ───────────────────────────────────────────────

const ROLE_STARTERS: Record<string, { prompt: string; label: string; color: string }[]> = {
  executive: [
    { prompt: "What happens to our revenue if Medicaid cuts 10% in Vermont?", label: "Model Medicaid cut impact", color: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-800" },
    { prompt: "How ready is our organization for value-based care contracts?", label: "Assess VBC readiness", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800" },
    { prompt: "What does Vermont's AHEAD model mean for our health system?", label: "Understand AHEAD model", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-800" },
    { prompt: "Show me the best tools to model our hospital's financial stress scenarios", label: "Financial stress testing", color: "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800" },
  ],
  policy: [
    { prompt: "What are the most critical federal Medicaid policy changes I need to track right now?", label: "Federal Medicaid updates", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800" },
    { prompt: "Walk me through Vermont Act 167 and what it requires from providers", label: "Vermont Act 167 breakdown", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-800" },
    { prompt: "Model the coverage loss impact of H.R. 1 work requirements in Vermont", label: "H.R. 1 impact modeling", color: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-800" },
    { prompt: "What tools can I use to simulate 1115 waiver scenarios?", label: "Waiver scenario simulation", color: "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800" },
  ],
  clinician: [
    { prompt: "What's the latest evidence on hospital-at-home programs and reimbursement?", label: "Hospital-at-home evidence", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-800" },
    { prompt: "How can I improve my organization's HEDIS scores and CMS Star Ratings?", label: "Quality score improvement", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800" },
    { prompt: "What tools help me stratify patient risk and identify high-need populations?", label: "Risk stratification tools", color: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-800" },
    { prompt: "How does SDOH integration improve clinical outcomes in Vermont?", label: "SDOH & health equity", color: "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800" },
  ],
  economist: [
    { prompt: "Calculate cost-effectiveness for a hospital-at-home program — what's the cost per QALY?", label: "CEA calculation", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800" },
    { prompt: "Design an APM with shared savings for a Vermont ACO", label: "APM design & modeling", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-800" },
    { prompt: "Model the revenue trajectory during a global budget transition", label: "Global budget transition", color: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-800" },
    { prompt: "What are the actuarial risks of Vermont's AHEAD model for payers?", label: "Actuarial risk analysis", color: "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800" },
  ],
  tech: [
    { prompt: "How do I build a FHIR R4 compliant patient summary and test it against ONC requirements?", label: "FHIR compliance check", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800" },
    { prompt: "What's the ROI model for a remote patient monitoring program?", label: "RPM ROI modeling", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-800" },
    { prompt: "How do I detect algorithmic bias in a clinical AI model?", label: "AI bias detection", color: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-800" },
    { prompt: "What are the key cybersecurity requirements for health systems under HIPAA?", label: "Security & compliance", color: "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800" },
  ],
  compliance: [
    { prompt: "Am I eligible for Vermont Medicaid? Walk me through the criteria.", label: "Medicaid eligibility check", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-800" },
    { prompt: "What are the key compliance deadlines and requirements under Vermont Act 167?", label: "Act 167 compliance", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800" },
    { prompt: "What changed in Vermont Medicaid rules for 2026?", label: "2026 Medicaid updates", color: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-800" },
    { prompt: "Show me tools to track Vermont AHEAD milestone compliance", label: "AHEAD milestone tracking", color: "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800" },
  ],
  researcher: [
    { prompt: "Where should I start learning about value-based care and health transformation?", label: "Learning path", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800" },
    { prompt: "What are the landmark cost-effectiveness studies in healthcare I should know?", label: "Key CEA studies", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-800" },
    { prompt: "Explain the Vermont AHEAD model and how it differs from traditional Medicaid", label: "AHEAD model explained", color: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-800" },
    { prompt: "What simulation tools can I use for a research project on health transformation?", label: "Research tools", color: "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800" },
  ],
  investor: [
    { prompt: "What are the biggest M&A and PE trends in healthcare right now?", label: "M&A & PE trends", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800" },
    { prompt: "Which health systems are most financially stressed and why?", label: "Financial stress analysis", color: "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-800" },
    { prompt: "How do I benchmark a health system's VBC readiness before acquisition?", label: "Pre-acquisition benchmarking", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-800" },
    { prompt: "Rank all 50 states on health transformation activity and innovation", label: "50-state innovation ranking", color: "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800" },
  ],
};

const ROLE_LABELS: Record<string, string> = {
  executive: "Hospital / Health System Executive",
  policy: "Policy Analyst",
  clinician: "Clinician",
  economist: "Health Economist",
  tech: "Health Tech Professional",
  compliance: "Medicaid / Compliance Officer",
  researcher: "Student / Researcher",
  investor: "Investor / Consultant",
};

// ── Types ────────────────────────────────────────────────────────────────────

interface Citation {
  title: string;
  url: string | null;
  pillar: string | null;
  source_type: string | null;
}

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  citations?: Citation[];
  feedback?: "up" | "down";
}

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

// ── Component ────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const router = useRouter();
  const { setRightOpen } = useSidebar();
  const voice = useVoice();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [phiError, setPhiError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("all");
  const [dynamicCards, setDynamicCards] = useState<{ title: string; pillar: string; type: string; prompt: string; href: string }[] | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  // Inject voice transcript into chat textarea
  useEffect(() => {
    if (!voice.pendingInjection) return;
    setInputValue(voice.pendingInjection);
    voice.clearInjection();
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [voice.pendingInjection, voice]);

  useEffect(() => {
    setMounted(true);
    try {
      const role = localStorage.getItem("htr-user-role") ?? "all";
      setUserRole(role);

      // Fetch dynamic Sanity cards for this role
      fetch(`/api/role-content?role=${role}`)
        .then((r) => r.json())
        .then((data) => { if (data.cards?.length) setDynamicCards(data.cards); })
        .catch(() => {}); // fall back to static on error

      // If a role greeting was set by /welcome, clear history so cards show first
      const greeting = localStorage.getItem("htr-chat-greeting");
      if (greeting) {
        localStorage.removeItem("htr-chat-greeting");
        localStorage.removeItem("htr-chat-history");
        return;
      }
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
        body: JSON.stringify({
          message: userMessage,
          history: historySnapshot,
          userRole: (() => { try { return localStorage.getItem("htr-user-role") ?? "all"; } catch { return "all"; } })(),
          pageContext: "Full-screen AI Analyst chat — no specific page context",
        }),
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
      let isFirstChunk = true;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          let chunk = decoder.decode(value, { stream: true });
          if (isFirstChunk) { chunk = chunk.trimStart(); isFirstChunk = false; }
          aiText += chunk;

          // [STRIP_LAB]: backend is replacing the LLM's HTR LAB section with the
          // correct catalog-matched one. Strip everything from the LAB marker onward,
          // then discard the sentinel itself so the correct section streams in clean.
          if (aiText.includes("[STRIP_LAB]")) {
            const labMarker = "🔬 TRY IT IN THE HTR LAB";
            const stripAt = aiText.indexOf(labMarker);
            aiText = (stripAt >= 0 ? aiText.slice(0, stripAt) : aiText)
              .replace("[STRIP_LAB]", "").trimEnd();
          }

          const hasError = aiText.includes("[STREAM_ERROR]");
          const rawDisplay = hasError
            ? aiText.replace("[STREAM_ERROR]", "").trimEnd() + "\n\n*An error occurred generating this response.*"
            : aiText;
          // Strip citation sentinel while streaming — only show when complete
          const { text: displayText } = parseCitations(rawDisplay);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...updated[updated.length - 1], text: displayText };
            return updated;
          });
        }
      }

      // Final parse — attach citations to the last message
      const { text: finalText, citations } = parseCitations(aiText);
      if (citations.length > 0) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: finalText,
            citations,
          };
          return updated;
        });
      }
      voice.speakText(finalText);
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
    }
  };

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;
    if (detectPHI(trimmed)) {
      setPhiError(
        "This message may contain patient information (name, SSN, DOB, or MRN). Please remove it before sending — this platform does not support PHI."
      );
      return;
    }
    setPhiError(null);
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
    if (phiError) setPhiError(null);
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
    setMessages((prev) => {
      const updated = prev.map((msg, i) => {
        if (i !== index) return msg;
        const newRating = msg.feedback === type ? undefined : type;
        // Persist to DB (fire and forget — UI already updated optimistically)
        fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messageId: msg.id,
            rating:    newRating ?? null,
            query:     prev[index - 1]?.text ?? "",
            response:  msg.text,
          }),
        }).catch(() => {}); // Silent — feedback loss is acceptable
        return { ...msg, feedback: newRating };
      });
      return updated;
    });
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
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="shrink-0 z-(--z-sticky) bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 md:px-6 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors font-medium p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-indigo-600" />
            <span className="font-black text-slate-900 dark:text-slate-100 tracking-tight">HTR AI Analyst</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Beta
            </span>
            <BackendStatus />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleDownloadTranscript}
            disabled={messages.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Download transcript"
            aria-label="Download transcript"
          >
            <ArrowDownTrayIcon className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={messages.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Clear conversation"
            aria-label="Clear conversation"
          >
            <TrashIcon className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Clear</span>
          </button>
          <button
            onClick={() => { setRightOpen(true); router.back(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Collapse to sidebar"
            aria-label="Collapse to sidebar"
          >
            <ArrowsPointingInIcon className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Collapse</span>
          </button>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* ── Chat: full width ─────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col min-w-0 min-h-0">

          {/* Message area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto min-h-0 px-4 md:px-8 py-6 space-y-6">

            {messages.length === 0 && !isLoading && (
              userRole === "all" ? (
                /* ── Full platform grid for "Skip" users ── */
                <div className="w-full px-4 md:px-6 py-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-1">
                      HTR AI Analyst
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Pick any topic to start — or type your own question below. Want personalized suggestions?{" "}
                      <Link href="/welcome" className="text-indigo-600 hover:underline underline-offset-2">Tell us your role</Link>.
                    </p>
                  </div>

                  {/* Responsive 2-col grid on md+, 3-col on xl+ — each section is a card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {ALL_PLATFORM_SECTIONS.map((section) => {
                      const SectionIcon = section.icon;
                      return (
                        <div key={section.label} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <SectionIcon className={`w-4 h-4 shrink-0 ${section.headerColor}`} />
                            <span className={`text-[11px] font-black uppercase tracking-widest ${section.headerColor}`}>
                              {section.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {section.topics.map((topic, i) => (
                              <button
                                key={i}
                                onClick={() => askQuestion(topic.prompt)}
                                className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold transition-all ${section.color}`}
                              >
                                {topic.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* ── Role-personalized 4-card view ── */
                <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-4 py-10">
                  <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <SparklesIcon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">
                      HTR AI Analyst
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Personalized for {ROLE_LABELS[userRole] ?? "you"} — pick a topic or ask your own question
                    </p>
                  </div>

                  {/* Starter cards — dynamic from Sanity, fallback to static */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-6">
                    {dynamicCards
                      ? dynamicCards.map((card, i) => {
                          const colors = [
                            "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-900",
                            "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-900",
                            "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-900",
                            "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-900",
                          ];
                          return (
                            <button
                              key={i}
                              onClick={() => askQuestion(card.prompt)}
                              className={`flex flex-col gap-2 p-4 rounded-xl border-2 text-left transition-all shadow-sm hover:shadow-md ${colors[i % colors.length]}`}
                            >
                              <span className="text-xs font-black uppercase tracking-widest opacity-50">{card.pillar} · {card.type === "policyAnalysis" ? "Analysis" : card.type === "caseStudy" ? "Case Study" : "Article"}</span>
                              <span className="text-sm font-semibold leading-snug">{card.title}</span>
                            </button>
                          );
                        })
                      : (ROLE_STARTERS[userRole] ?? ROLE_STARTERS["all"]).map((card, i) => (
                          <button
                            key={i}
                            onClick={() => askQuestion(card.prompt)}
                            className={`flex flex-col gap-2 p-4 rounded-xl border-2 text-left transition-all shadow-sm hover:shadow-md ${card.color}`}
                          >
                            <span className="text-xs font-black uppercase tracking-widest opacity-60">{card.label}</span>
                            <span className="text-sm font-medium leading-snug">{card.prompt}</span>
                          </button>
                        ))
                    }
                  </div>

                  <Link
                    href="/welcome"
                    className="text-xs text-slate-400 hover:text-indigo-600 underline underline-offset-2 transition-colors"
                  >
                    Change my role
                  </Link>
                </div>
              )
            )}

            {messages.map((msg, i) => (
              <div key={msg.id ?? i} className={`${msg.role === "user" ? "flex justify-end" : ""}`}>
                {msg.role === "user" ? (
                  <div className="max-w-[80%] bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
                    {msg.text}
                  </div>
                ) : (
                  <div className="border-l-4 border-indigo-200 dark:border-indigo-700 pl-5 pr-2">
                    <div className="flex items-center gap-2 mb-2">
                      <SparklesIcon className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">HTR Analyst</span>
                    </div>
                    <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      <ReactMarkdown
                        components={{
                          p: ({ node, children, ...props }) => {
                            const raw = node?.children?.map((c: any) => c.value || "").join("") ?? "";
                            if (raw.includes("TRY IT IN THE HTR LAB")) {
                              const stripped = raw.replace(/^.*?TRY IT IN THE HTR LAB[:\s]*/i, "").trim();
                              return (
                                <p {...props} className="mb-3 mt-3 leading-relaxed text-slate-700 dark:text-slate-200">
                                  <span className="font-black text-emerald-600 dark:text-emerald-400">🔬 TRY IT IN THE HTR LAB: </span>
                                  {stripped}
                                </p>
                              );
                            }
                            return <p {...props} className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
                          },
                          ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 mb-3 space-y-1" />,
                          ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 mb-3 space-y-1" />,
                          li: ({ node, ...props }) => <li {...props} className="leading-relaxed" />,
                          strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-slate-900 dark:text-slate-100" />,
                          a: ({ node, ...props }) => <a {...props} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer" />,
                          h2: ({ node, ...props }) => <h2 {...props} className="text-base font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2" />,
                          h3: ({ node, ...props }) => <h3 {...props} className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-4 mb-1" />,
                          blockquote: ({ node, ...props }) => <blockquote {...props} className="border-l-4 border-slate-200 dark:border-slate-600 pl-4 italic text-slate-600 dark:text-slate-400 my-3" />,
                          code: ({ node, ...props }) => <code {...props} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs px-1.5 py-0.5 rounded font-mono" />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    {/* Source citations */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-indigo-100 dark:border-indigo-900">
                        <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                          <BookOpenIcon className="w-3 h-3" />
                          Sources
                        </p>
                        <div className="space-y-1">
                          {msg.citations.map((c, ci) => (
                            <div key={ci} className="flex items-start gap-2">
                              <span className="shrink-0 text-[10px] font-black text-indigo-400 mt-0.5 w-4">{ci + 1}.</span>
                              {c.url ? (
                                c.url.startsWith("/") ? (
                                  <Link href={c.url} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline leading-snug">
                                    {c.title}
                                  </Link>
                                ) : (
                                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline leading-snug">
                                    {c.title}
                                  </a>
                                )
                              ) : (
                                <span className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{c.title}</span>
                              )}
                              {c.pillar && (
                                <span className="shrink-0 text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">{c.pillar}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {msg.text && (
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <button onClick={() => handleCopy(msg.text, i)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 rounded" title="Copy" aria-label={copiedIndex === i ? "Copied" : "Copy message"}>
                          {copiedIndex === i ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" /> : <ClipboardDocumentIcon className="w-3.5 h-3.5" aria-hidden="true" />}
                        </button>
                        <button
                          onClick={() => handleFeedback(i, "up")}
                          className={`p-2 rounded transition-colors ${msg.feedback === "up" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : "text-slate-400 hover:text-emerald-600"}`}
                          title="Helpful"
                          aria-label="Mark as helpful"
                          aria-pressed={msg.feedback === "up"}
                        >
                          <HandThumbUpIcon className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => handleFeedback(i, "down")}
                          className={`p-2 rounded transition-colors ${msg.feedback === "down" ? "text-rose-600 bg-rose-50 dark:bg-rose-950/30" : "text-slate-400 hover:text-rose-600"}`}
                          title="Not helpful"
                          aria-label="Mark as not helpful"
                          aria-pressed={msg.feedback === "down"}
                        >
                          <HandThumbDownIcon className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        {!isLoading && i === messages.length - 1 && (
                          <button onClick={handleRegenerate} className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-colors ml-1">
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
              <div className="border-l-4 border-indigo-400 pl-5 py-2">
                <div className="flex items-center gap-2 mb-3">
                  <SparklesIcon className="w-4 h-4 text-indigo-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">HTR Analyst</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Larger, faster dots */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "0.7s" }} />
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms", animationDuration: "0.7s" }} />
                    <div className="w-3 h-3 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: "300ms", animationDuration: "0.7s" }} />
                  </div>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-pulse">
                    Analyzing — please wait…
                  </span>
                  <button
                    onClick={handleStop}
                    className="ml-2 text-xs font-bold text-slate-400 hover:text-rose-500 border border-slate-200 dark:border-slate-600 hover:border-rose-300 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Stop
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Input bar ────────────────────────────────────────────────────── */}
          <div className="shrink-0 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 md:px-8 py-4">
            <div className="relative bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus-within:border-indigo-300 dark:focus-within:border-indigo-600 focus-within:bg-white dark:focus-within:bg-slate-800 transition-colors">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask the Analyst… (Enter to send, Shift+Enter for new line)"
                rows={6}
                className="w-full min-h-[7.5rem] max-h-[7.5rem] bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none resize-none leading-relaxed px-4 pt-2 pb-10 pr-10"
                aria-label="Chat message input"
              />
              {isLoading ? (
                <div className="absolute bottom-2 right-2 flex items-center gap-2 pr-1">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "0.7s" }} />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms", animationDuration: "0.7s" }} />
                    <span className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: "300ms", animationDuration: "0.7s" }} />
                  </div>
                  <button
                    onClick={handleStop}
                    className="text-[10px] font-bold text-slate-400 hover:text-rose-500 border border-slate-200 dark:border-slate-600 hover:border-rose-300 transition-colors px-2 py-0.5 rounded-md"
                    aria-label="Stop generating"
                  >
                    Stop
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="absolute bottom-2 right-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <PaperAirplaneIcon className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
            {phiError && (
              <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 mt-2">
                {phiError}
              </p>
            )}
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Do not submit patient data (names, SSNs, DOBs)
              </p>
              <p className="text-center text-[10px] text-slate-400 dark:text-slate-500">
                AI responses may contain errors. Verify clinical or policy information with primary sources.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* ── Clear confirm ────────────────────────────────────────────────────── */}
      {showClearConfirm && (
        /* Backdrop — pressing Escape or clicking outside closes the dialog */
        <div
          role="presentation"
          className="fixed inset-0 z-(--z-modal) bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowClearConfirm(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowClearConfirm(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="clear-dialog-title"
            aria-describedby="clear-dialog-desc"
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon className="w-8 h-8 text-rose-500 mx-auto mb-3" aria-hidden="true" />
            <h3 id="clear-dialog-title" className="font-black text-slate-900 dark:text-slate-100 mb-2">Clear conversation?</h3>
            <p id="clear-dialog-desc" className="text-sm text-slate-600 dark:text-slate-400 mb-5">This will delete all messages from your local history.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
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
