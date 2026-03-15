"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "academy_progress_v1";

export type ModuleProgress = {
  completed: boolean;
  quizPassed: boolean;
  completedAt?: string; // ISO date string
};

type ProgressStore = Record<string, ModuleProgress>; // keyed by slug

function readStore(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressStore) : {};
  } catch {
    return {};
  }
}

function writeStore(store: ProgressStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Ignore storage errors (private browsing quota)
  }
}

export function useModuleProgress(slug: string) {
  const [store, setStore] = useState<ProgressStore>({});

  useEffect(() => {
    setStore(readStore());
  }, []);

  const progress = store[slug] ?? { completed: false, quizPassed: false };

  const markCompleted = useCallback(() => {
    setStore(prev => {
      const next = {
        ...prev,
        [slug]: { ...prev[slug], completed: true, completedAt: new Date().toISOString() },
      };
      writeStore(next);
      return next;
    });
  }, [slug]);

  const markQuizPassed = useCallback(() => {
    setStore(prev => {
      const next = {
        ...prev,
        [slug]: { ...prev[slug], quizPassed: true, completed: true, completedAt: new Date().toISOString() },
      };
      writeStore(next);
      return next;
    });
  }, [slug]);

  const isSlugCompleted = useCallback(
    (s: string) => (store[s]?.completed ?? false),
    [store]
  );

  const getCompletedCount = useCallback(
    (slugs: string[]) => slugs.filter(s => store[s]?.completed).length,
    [store]
  );

  return { progress, markCompleted, markQuizPassed, isSlugCompleted, getCompletedCount };
}
