"use client";

import { useState } from "react";
import { CheckCircle, XCircle, RefreshCw, Award } from "lucide-react";

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

interface Props {
  moduleTitle: string;
  questions: Question[];
  onPass: () => void;   // called when user achieves passing score
  passingScore?: number; // 0–100, default 70
}

type AnswerState = "unanswered" | "correct" | "wrong";

export default function KnowledgeCheck({
  moduleTitle,
  questions,
  onPass,
  passingScore = 70,
}: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);

  const answerStates: AnswerState[] = questions.map((q, i) => {
    if (!submitted || answers[i] === null) return "unanswered";
    return answers[i] === q.correctIndex ? "correct" : "wrong";
  });

  const correctCount = submitted
    ? answerStates.filter(s => s === "correct").length
    : 0;
  const scorePercent = submitted
    ? Math.round((correctCount / questions.length) * 100)
    : 0;
  const passed = submitted && scorePercent >= passingScore;

  const allAnswered = answers.every(a => a !== null);

  function handleSelect(qIdx: number, optIdx: number) {
    if (submitted) return;
    setAnswers(prev => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  }

  function handleSubmit() {
    setSubmitted(true);
    if (scorePercent >= passingScore) {
      onPass();
    }
  }

  function handleRetry() {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
    setShowExplanations(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-indigo-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 text-white px-6 py-5">
        <div className="flex items-center gap-3">
          <Award size={20} className="text-indigo-200" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-0.5">Knowledge Check</p>
            <h3 className="font-black text-lg leading-tight">{moduleTitle}</h3>
          </div>
        </div>
        <p className="text-indigo-200 text-sm mt-2">
          {questions.length} questions · Passing score: {passingScore}% · Select the best answer for each question.
        </p>
      </div>

      {/* Result banner */}
      {submitted && (
        <div className={`flex items-center justify-between gap-4 px-6 py-4 border-b ${passed ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
          <div className="flex items-center gap-3">
            {passed
              ? <CheckCircle size={22} className="text-emerald-600 shrink-0" />
              : <XCircle size={22} className="text-rose-500 shrink-0" />
            }
            <div>
              <p className={`font-black text-lg ${passed ? "text-emerald-800" : "text-rose-700"}`}>
                {passed ? "Passed!" : "Keep studying"}
              </p>
              <p className={`text-sm ${passed ? "text-emerald-600" : "text-rose-500"}`}>
                {correctCount} / {questions.length} correct ({scorePercent}%)
                {!passed && ` — Need ${passingScore}% to pass`}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowExplanations(v => !v)}
              className="text-xs font-bold px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            >
              {showExplanations ? "Hide" : "Show"} Explanations
            </button>
            {!passed && (
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                <RefreshCw size={12} /> Retry
              </button>
            )}
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="divide-y divide-slate-100">
        {questions.map((q, qIdx) => {
          const state = answerStates[qIdx];
          return (
            <div key={q.id} className={`px-6 py-6 ${state === "wrong" ? "bg-rose-50/30" : state === "correct" ? "bg-emerald-50/30" : ""}`}>
              <div className="flex gap-3 mb-4">
                <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black border ${
                  state === "correct" ? "bg-emerald-500 text-white border-emerald-500" :
                  state === "wrong"   ? "bg-rose-500 text-white border-rose-500" :
                  "bg-indigo-100 text-indigo-700 border-indigo-200"
                }`}>
                  {state === "correct" ? "✓" : state === "wrong" ? "✗" : qIdx + 1}
                </span>
                <p className="font-semibold text-slate-800 leading-snug">{q.question}</p>
              </div>

              <div className="ml-9 space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[qIdx] === optIdx;
                  const isCorrect  = q.correctIndex === optIdx;
                  let optStyle = "border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50";
                  if (submitted) {
                    if (isCorrect) optStyle = "border-emerald-400 bg-emerald-50 text-emerald-800 font-semibold";
                    else if (isSelected && !isCorrect) optStyle = "border-rose-400 bg-rose-50 text-rose-700";
                    else optStyle = "border-slate-200 text-slate-400";
                  } else if (isSelected) {
                    optStyle = "border-indigo-500 bg-indigo-50 text-indigo-800 font-semibold";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-start gap-3 ${optStyle} ${submitted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <span className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-black mt-0.5 ${
                        submitted && isCorrect ? "border-emerald-500 bg-emerald-500 text-white" :
                        submitted && isSelected ? "border-rose-400 bg-rose-400 text-white" :
                        isSelected ? "border-indigo-500 bg-indigo-500 text-white" :
                        "border-slate-300"
                      }`}>
                        {submitted && isCorrect ? "✓" : submitted && isSelected && !isCorrect ? "✗" : isSelected ? "●" : ""}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {submitted && showExplanations && (
                <div className={`ml-9 mt-4 p-4 rounded-xl text-sm leading-relaxed border ${
                  state === "correct" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"
                }`}>
                  <span className="font-bold mr-2">{state === "correct" ? "✓ Correct:" : "💡 Explanation:"}</span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit / Passed footer */}
      <div className="px-6 py-5 bg-slate-50 border-t border-slate-200">
        {!submitted ? (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {answers.filter(a => a !== null).length} / {questions.length} answered
            </p>
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                allAnswered
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              Submit Answers
            </button>
          </div>
        ) : passed ? (
          <div className="flex items-center gap-3 text-sm text-emerald-700 font-semibold">
            <CheckCircle size={16} className="text-emerald-600" />
            Module marked as complete! Continue to the next module.
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Review the explanations above, then retry when ready.
          </p>
        )}
      </div>
    </div>
  );
}
