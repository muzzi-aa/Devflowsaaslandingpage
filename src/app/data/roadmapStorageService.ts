// ─── Roadmap Storage Service ──────────────────────────────────────────────────
// All localStorage CRUD for the Roadmap feature.

import type { RoadmapStep } from "./roadmapEngine";
import { DEFAULT_STEPS, generateStepsFromGaps } from "./roadmapEngine";

export const STORAGE_ROADMAP     = "devflow_roadmap_steps";
export const STORAGE_SKILL_GAP   = "devflow_skill_gap_analysis"; // read-only, written by SkillGap
export const STORAGE_SNAPSHOTS   = "devflow_roadmap_snapshots";

// ─── Steps ────────────────────────────────────────────────────────────────────
export function loadSteps(): RoadmapStep[] {
  try {
    const raw = localStorage.getItem(STORAGE_ROADMAP);
    if (raw) return JSON.parse(raw) as RoadmapStep[];
  } catch { /* ignore */ }
  return [];
}

export function saveSteps(steps: RoadmapStep[]): void {
  try { localStorage.setItem(STORAGE_ROADMAP, JSON.stringify(steps)); } catch { /* ignore */ }
}

export function clearSteps(): void {
  try { localStorage.removeItem(STORAGE_ROADMAP); } catch { /* ignore */ }
}

// ─── Skill gap integration ────────────────────────────────────────────────────
interface StoredGapAnalysis {
  recommendations?: Array<{
    skill: string;
    priority: "critical" | "high" | "medium";
    estimatedWeeks: number;
    gapPercent: number;
  }>;
}

export function loadGapRecommendations(): StoredGapAnalysis["recommendations"] {
  try {
    const raw = localStorage.getItem(STORAGE_SKILL_GAP);
    if (!raw) return undefined;
    const parsed: StoredGapAnalysis = JSON.parse(raw);
    return parsed.recommendations;
  } catch { return undefined; }
}

// ─── Initialise roadmap ───────────────────────────────────────────────────────
// Priority: saved steps → skill gap generated → defaults
export function initialiseSteps(): RoadmapStep[] {
  const saved = loadSteps();
  if (saved.length > 0) return saved;

  const gaps = loadGapRecommendations();
  if (gaps && gaps.length > 0) {
    const generated = generateStepsFromGaps(gaps);
    saveSteps(generated);
    return generated;
  }

  saveSteps(DEFAULT_STEPS);
  return DEFAULT_STEPS;
}

// ─── Progress snapshots ───────────────────────────────────────────────────────
export interface ProgressSnapshot {
  date: string;  // ISO
  percent: number;
  completed: number;
  total: number;
}

export function loadSnapshots(): ProgressSnapshot[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_SNAPSHOTS) ?? "[]"); }
  catch { return []; }
}

export function saveSnapshot(snapshot: ProgressSnapshot): void {
  try {
    const snaps = loadSnapshots();
    // Only save if a new day or first snapshot
    const today = new Date().toDateString();
    const lastSnap = snaps[snaps.length - 1];
    if (lastSnap && new Date(lastSnap.date).toDateString() === today) {
      snaps[snaps.length - 1] = snapshot;
    } else {
      snaps.push(snapshot);
    }
    localStorage.setItem(STORAGE_SNAPSHOTS, JSON.stringify(snaps.slice(-90))); // keep 90 days
  } catch { /* ignore */ }
}
