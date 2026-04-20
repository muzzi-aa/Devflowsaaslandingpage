import { useState, useEffect, useCallback } from "react";
import type { Status } from "../data/challenges";

export interface ChallengeProgress {
  status: Status;
  startedAt?: string;
  completedAt?: string;
  timeSpentSeconds: number;
  code?: string;
}

export type ProgressMap = Record<string, ChallengeProgress>;

const STORAGE_KEY = "devflow_coding_arena_progress";

function loadFromStorage(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(map: ProgressMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore quota errors
  }
}

export function useChallengeStore() {
  const [progress, setProgress] = useState<ProgressMap>(loadFromStorage);

  // Persist to localStorage on every change
  useEffect(() => {
    saveToStorage(progress);
  }, [progress]);

  const getProgress = useCallback(
    (id: string): ChallengeProgress =>
      progress[id] ?? { status: "Not Started", timeSpentSeconds: 0 },
    [progress]
  );

  const startChallenge = useCallback((id: string) => {
    setProgress((prev) => {
      const existing = prev[id];
      if (existing?.status === "Completed") return prev;
      return {
        ...prev,
        [id]: {
          ...(existing ?? { timeSpentSeconds: 0 }),
          status: "In Progress",
          startedAt: existing?.startedAt ?? new Date().toISOString(),
        },
      };
    });
  }, []);

  const completeChallenge = useCallback((id: string, code?: string) => {
    setProgress((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? { timeSpentSeconds: 0 }),
        status: "Completed",
        completedAt: new Date().toISOString(),
        code,
      },
    }));
  }, []);

  const saveCode = useCallback((id: string, code: string) => {
    setProgress((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? { status: "In Progress", timeSpentSeconds: 0 }),
        code,
      },
    }));
  }, []);

  const resetChallenge = useCallback((id: string) => {
    setProgress((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  // Aggregate stats
  const stats = {
    total: 0, // will be set by caller
    notStarted: Object.values(progress).filter((p) => p.status === "Not Started").length,
    inProgress: Object.values(progress).filter((p) => p.status === "In Progress").length,
    completed: Object.values(progress).filter((p) => p.status === "Completed").length,
  };

  return { progress, getProgress, startChallenge, completeChallenge, saveCode, resetChallenge, stats };
}
