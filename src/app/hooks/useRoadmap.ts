import { useState, useCallback, useEffect, useMemo } from "react";
import {
  markStepComplete,
  startStep,
  updateProgress,
  addStep,
  removeStep,
  calculateProgress,
  filterSteps,
  generateStepsFromGaps,
  DEFAULT_STEPS,
  type RoadmapStep,
  type RoadmapCategory,
  type ProgressStats,
} from "../data/roadmapEngine";
import {
  initialiseSteps,
  saveSteps,
  saveSnapshot,
  loadGapRecommendations,
} from "../data/roadmapStorageService";

export type { RoadmapStep, RoadmapCategory, ProgressStats };

export interface UseRoadmapReturn {
  steps: RoadmapStep[];
  filteredSteps: RoadmapStep[];
  stats: ProgressStats;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  markComplete: (id: number) => void;
  start: (id: number) => void;
  setProgress: (id: number, pct: number) => void;
  addNewStep: (title: string, description: string, category: RoadmapCategory) => void;
  remove: (id: number) => void;
  syncFromSkillGap: () => void;
  resetToDefaults: () => void;
  isAllDone: boolean;
}

export function useRoadmap(): UseRoadmapReturn {
  const [steps, setSteps] = useState<RoadmapStep[]>(() => initialiseSteps());
  const [searchQuery, setSearchQuery] = useState("");

  // Persist whenever steps change + record daily snapshot
  useEffect(() => {
    saveSteps(steps);
    const stats = calculateProgress(steps);
    saveSnapshot({ date: new Date().toISOString(), percent: stats.percent, completed: stats.completed, total: stats.total });
  }, [steps]);

  // Re-sync from skill gap if that data changes (user just ran SkillGap analysis)
  const syncFromSkillGap = useCallback(() => {
    const gaps = loadGapRecommendations();
    if (!gaps || gaps.length === 0) return;
    // Only add missing skill steps — don't blow away existing ones
    setSteps((prev) => {
      const existingSkills = new Set(prev.map((s) => s.skill?.toLowerCase()).filter(Boolean));
      const newGaps = gaps.filter((g) => !existingSkills.has(g.skill.toLowerCase()));
      if (newGaps.length === 0) return prev;
      const generated = generateStepsFromGaps(newGaps).map((s) => ({
        ...s,
        id: Math.max(...prev.map((p) => p.id), 0) + s.id,
        status: "planned" as const,
        startDate: undefined,
      }));
      return [...prev, ...generated];
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setSteps([...DEFAULT_STEPS]);
  }, []);

  const markComplete = useCallback((id: number) => {
    setSteps((prev) => markStepComplete(prev, id));
  }, []);

  const start = useCallback((id: number) => {
    setSteps((prev) => startStep(prev, id));
  }, []);

  const setProgress = useCallback((id: number, pct: number) => {
    setSteps((prev) => updateProgress(prev, id, pct));
  }, []);

  const addNewStep = useCallback((title: string, description: string, category: RoadmapCategory) => {
    setSteps((prev) => addStep(prev, title, description, category));
  }, []);

  const remove = useCallback((id: number) => {
    setSteps((prev) => removeStep(prev, id));
  }, []);

  const filteredSteps = useMemo(() => filterSteps(steps, searchQuery), [steps, searchQuery]);
  const stats = useMemo(() => calculateProgress(steps), [steps]);
  const isAllDone = steps.length > 0 && stats.completed === stats.total;

  return {
    steps,
    filteredSteps,
    stats,
    searchQuery,
    setSearchQuery,
    markComplete,
    start,
    setProgress,
    addNewStep,
    remove,
    syncFromSkillGap,
    resetToDefaults,
    isAllDone,
  };
}