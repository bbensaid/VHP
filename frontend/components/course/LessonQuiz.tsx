"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, ChevronRight } from "lucide-react";
import type { Quiz, QuizQuestion } from "@/types/course";

interface QuizState {
  answers: Record<string, string>;
  submitted: boolean;
  score: number | null;
  passed: boolean | null;
}

export function LessonQuiz({
  quiz,
  onPass,
}: {
  quiz: Quiz;
  onPass?: (score: number) => void;
}) {
  const [state, setState] = useState<QuizState>({
    answers: {}, submitted: false, score: null, passed: null,
  });

  function selectOption(questionId: string, optionId: string) {
    if (state.submitted) return;
    setState((prev) => ({ ...prev, answers: { ...prev.answers, [questionId]: optionId } }));
  }

  function submit() {
    if (Object.keys(state.answers).length < quiz.questions.length) return;
    let earned = 0, total = 0;
    quiz.questions.forEach((q) => {
      total += q.points;
      const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
      if (correctIds.includes(state.answers[q.id])) earned += q.points;
    });
    const score = Math.round((earned / total) * 100);
    const passed = score >= quiz.passingScore;
    setState((prev) => ({ ...prev, submitted: true, score, passed }));
    if (passed) onPass?.(score);
  }

  function reset() {
    setState({ answers: {}, submitted: false, score: null, passed: null });
  }

  const allAnswered = Object.keys(state.answers).length === quiz.questions.length;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
        <HelpCircle className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-medium text-slate-900">{quiz.title ?? "Knowledge check"}</h3>
        <span className="ml-auto text-xs text-slate-400">Passing score: {quiz.passingScore}%</span>
      </div>

      <div className="p-4 space-y-6">
        {quiz.questions.map((q, qi) => (
          <QuizQuestionRenderer
            key={q.id}
            question={q}
            questionNumber={qi + 1}
            selectedOptionId={state.answers[q.id]}
            submitted={state.submitted}
            onSelect={(optId) => selectOption(q.id, optId)}
          />
        ))}
      </div>

      <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
        {!state.submitted ? (
          <button
            onClick={submit}
            disabled={!allAnswered}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Submit answers <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <>
            <div className={`flex items-center gap-2 text-sm font-medium ${state.passed ? "text-emerald-700" : "text-red-700"}`}>
              {state.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {state.passed ? `Passed — ${state.score}%` : `${state.score}% — review and try again`}
            </div>
            {!state.passed && (
              <button onClick={reset} className="ml-auto text-xs px-3 py-1.5 border border-slate-200 rounded hover:bg-white transition-colors">
                Retry
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function QuizQuestionRenderer({
  question, questionNumber, selectedOptionId, submitted, onSelect,
}: {
  question: QuizQuestion;
  questionNumber: number;
  selectedOptionId: string | undefined;
  submitted: boolean;
  onSelect: (optId: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-900 leading-relaxed">
        <span className="font-medium text-slate-400 mr-1.5">{questionNumber}.</span>
        {question.question}
      </p>
      <div className="space-y-2">
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let cls = "border-slate-200 bg-white hover:bg-slate-50 cursor-pointer";
          if (submitted) {
            if (opt.isCorrect) cls = "border-emerald-400 bg-emerald-50 text-emerald-900 cursor-default";
            else if (isSelected) cls = "border-red-300 bg-red-50 text-red-800 cursor-default";
            else cls = "border-slate-200 bg-white opacity-60 cursor-default";
          } else if (isSelected) {
            cls = "border-sky-400 bg-sky-50 text-sky-900 cursor-pointer";
          }
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              disabled={submitted}
              className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg border text-xs text-left transition-colors ${cls}`}
            >
              <span className="w-4 h-4 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center border-current">
                {(isSelected || (submitted && opt.isCorrect)) && <span className="w-2 h-2 rounded-full bg-current" />}
              </span>
              <span className="leading-relaxed">{opt.text}</span>
              {submitted && opt.isCorrect && opt.explanation && (
                <span className="ml-auto text-[10px] text-emerald-700 pl-2 flex-shrink-0">✓ {opt.explanation}</span>
              )}
            </button>
          );
        })}
      </div>
      {submitted && question.explanation && (
        <p className="text-xs text-slate-500 bg-slate-50 rounded px-3 py-2 leading-relaxed">
          <span className="font-medium">Explanation: </span>{question.explanation}
        </p>
      )}
    </div>
  );
}
