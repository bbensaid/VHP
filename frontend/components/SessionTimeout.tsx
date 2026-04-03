"use client";

/**
 * SessionTimeout — HIPAA-compliant idle session enforcement
 *
 * Watches for user activity (mouse, keyboard, touch, scroll).
 * After IDLE_WARN_MS of inactivity, shows a countdown warning dialog.
 * If ignored, signs the user out after IDLE_TIMEOUT_MS total idle time.
 *
 * Only runs when a Supabase session is present (anonymous/public users unaffected).
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const IDLE_TIMEOUT_MS  = 30 * 60 * 1000; // 30 min total idle before sign-out
const IDLE_WARN_MS     = 25 * 60 * 1000; // show warning at 25 min
const WARN_DURATION_MS = IDLE_TIMEOUT_MS - IDLE_WARN_MS; // 5-min warning window

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"] as const;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function SessionTimeout() {
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(Math.round(WARN_DURATION_MS / 1000));
  const [hasSession, setHasSession] = useState(false);

  const idleTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAllTimers = () => {
    if (idleTimer.current)   clearTimeout(idleTimer.current);
    if (warnTimer.current)   clearTimeout(warnTimer.current);
    if (countdownTimer.current) clearInterval(countdownTimer.current);
  };

  const signOut = useCallback(async () => {
    clearAllTimers();
    setShowWarning(false);
    const supabase = getSupabase();
    await supabase.auth.signOut();
    window.location.href = "/login?timeout=1";
  }, []);

  const resetTimer = useCallback(() => {
    if (!hasSession) return;
    clearAllTimers();
    setShowWarning(false);
    setSecondsLeft(Math.round(WARN_DURATION_MS / 1000));

    warnTimer.current = setTimeout(() => {
      setShowWarning(true);
      setSecondsLeft(Math.round(WARN_DURATION_MS / 1000));

      countdownTimer.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) return 0;
          return prev - 1;
        });
      }, 1000);

      idleTimer.current = setTimeout(signOut, WARN_DURATION_MS);
    }, IDLE_WARN_MS);
  }, [hasSession, signOut]);

  // Check session on mount
  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Attach activity listeners when session is present
  useEffect(() => {
    if (!hasSession) {
      clearAllTimers();
      return;
    }

    resetTimer();

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, resetTimer, { passive: true });
    }

    return () => {
      clearAllTimers();
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, resetTimer);
      }
    };
  }, [hasSession, resetTimer]);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-sm w-full p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mx-auto mb-5">
          <ExclamationTriangleIcon className="w-7 h-7 text-amber-600 dark:text-amber-400" />
        </div>

        <h2 className="text-lg font-black text-slate-900 dark:text-slate-50 mb-2">
          Session Expiring Soon
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          For security, your session will end after inactivity.
          You will be signed out in{" "}
          <span className="font-black text-amber-600 dark:text-amber-400">
            {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
          </span>.
        </p>

        <div className="flex gap-3">
          <button
            onClick={signOut}
            className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Sign Out Now
          </button>
          <button
            onClick={resetTimer}
            className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors"
          >
            Stay Signed In
          </button>
        </div>
      </div>
    </div>
  );
}
