"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSidebar } from "@/components/SidebarContext";
import { COMMANDS } from "@/components/CommandPalette";

// ── Types ─────────────────────────────────────────────────────────────────────

interface VoiceContextType {
  isListening: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
  fabHidden: boolean;
  transcript: string;
  pendingInjection: string | null;
  toggleListening: () => void;
  toggleFabHidden: () => void;
  clearInjection: () => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\[CITATIONS\][\s\S]*?\[\/CITATIONS\]/g, "")
    .replace(/\[STRIP_LAB\]/g, "")
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^[-*]\s/gm, "")
    .trim();
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [fabHidden, setFabHidden] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [pendingInjection, setPendingInjection] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const sidebar = useSidebar();

  // Single ref-bag — recognition callbacks always read from here, never from
  // stale closure values captured at callback-registration time.
  const bag = useRef({
    router,
    sidebar,
    pathname,
    wantListening: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition: null as any,
    setIsListening,
    setTranscript,
    setIsSpeaking,
    setPendingInjection,
  });

  useEffect(() => { bag.current.router   = router;   }, [router]);
  useEffect(() => { bag.current.sidebar  = sidebar;  }, [sidebar]);
  useEffect(() => { bag.current.pathname = pathname; }, [pathname]);

  // Detect support after mount — avoids SSR hydration mismatch
  useEffect(() => {
    setIsSupported(
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window
    );
  }, []);

  // ── TTS output ────────────────────────────────────────────────────────────

  function stopSpeaking() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    bag.current.setIsSpeaking(false);
  }

  function speakText(text: string) {
    if (!bag.current.wantListening) return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(stripMarkdown(text));
    utt.rate = 0.92;
    utt.onend  = () => bag.current.setIsSpeaking(false);
    utt.onerror = () => bag.current.setIsSpeaking(false);
    bag.current.setIsSpeaking(true);
    window.speechSynthesis.speak(utt);
  }

  // ── Command routing ───────────────────────────────────────────────────────

  function handleFinal(raw: string) {
    const text = raw.trim();
    const t = text.toLowerCase();

    if (t === "stop" || t === "cancel" || t === "never mind") {
      stopSpeaking(); return;
    }
    if (t.includes("command palette") || t === "open palette") {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
      return;
    }
    if (t.includes("open sidebar")  || t.includes("show sidebar"))  { bag.current.sidebar.setLeftOpen(true);  return; }
    if (t.includes("close sidebar") || t.includes("hide sidebar"))  { bag.current.sidebar.setLeftOpen(false); return; }
    if (t.includes("open ai") || t.includes("open analyst") || t.includes("show ai")) { bag.current.sidebar.setRightOpen(true);  return; }
    if (t.includes("close ai")      || t.includes("close analyst")) { bag.current.sidebar.setRightOpen(false); return; }

    for (const cmd of COMMANDS) {
      if (t.includes(cmd.title.toLowerCase())) {
        bag.current.router.push(cmd.href);
        return;
      }
    }

    const m = t.match(/^(?:go to|navigate to|take me to|show me|open)\s+(.+)$/);
    if (m) {
      const q = m[1].trim();
      for (const cmd of COMMANDS) {
        if (cmd.title.toLowerCase().includes(q) || q.includes(cmd.title.toLowerCase().split(" ")[0])) {
          bag.current.router.push(cmd.href);
          return;
        }
      }
    }

    bag.current.setPendingInjection(text);
  }

  // ── Recognition lifecycle ─────────────────────────────────────────────────

  function startRecognition() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR: any =
      (window as any).SpeechRecognition ??
      (window as any).webkitSpeechRecognition;
    if (!SR) return;

    if (bag.current.recognition) {
      try { bag.current.recognition.abort(); } catch { /**/ }
      bag.current.recognition = null;
    }

    const rec = new SR();
    rec.continuous      = false;
    rec.interimResults  = true;
    rec.lang            = "en-US";
    rec.maxAlternatives = 1;

    rec.onresult = (e: Event & { resultIndex: number; results: SpeechRecognitionResultList }) => {
      let interim = "", final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final   += e.results[i][0].transcript;
        else                      interim += e.results[i][0].transcript;
      }
      bag.current.setTranscript(interim || final);
      if (final) { bag.current.setTranscript(""); handleFinal(final); }
    };

    rec.onerror = (e: Event & { error: string }) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        bag.current.wantListening = false;
        bag.current.setIsListening(false);
        bag.current.recognition = null;
      }
    };

    rec.onend = () => {
      bag.current.recognition = null;
      if (bag.current.wantListening) setTimeout(startRecognition, 150);
    };

    bag.current.recognition = rec;
    rec.start();
  }

  function stopListening() {
    bag.current.wantListening = false;
    bag.current.setIsListening(false);
    bag.current.setTranscript("");
    if (bag.current.recognition) {
      try { bag.current.recognition.abort(); } catch { /**/ }
      bag.current.recognition = null;
    }
  }

  function toggleListening() {
    if (bag.current.wantListening) {
      stopListening();
    } else {
      bag.current.wantListening = true;
      bag.current.setIsListening(true);
      startRecognition();
    }
  }

  function toggleFabHidden() { setFabHidden(h => !h); }

  // Keyboard shortcuts: ⌘⇧V toggle mic, ⌘⇧H hide/show FAB
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (!(e.metaKey || e.ctrlKey) || !e.shiftKey) return;
      if (e.key === "v") { e.preventDefault(); toggleListening(); }
      if (e.key === "h") { e.preventDefault(); setFabHidden(h => !h); }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearInjection() { setPendingInjection(null); }

  return (
    <VoiceContext.Provider value={{
      isListening, isSpeaking, isSupported, fabHidden, transcript, pendingInjection,
      toggleListening, toggleFabHidden, clearInjection, speakText, stopSpeaking,
    }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error("useVoice must be used within VoiceProvider");
  return ctx;
}
