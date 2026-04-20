// ─── Skill Data Service ───────────────────────────────────────────────────────
// Data access layer — reads from localStorage, shares types with CareerAI module.
// All functions are pure/synchronous; React state lives in the hook.

import type { ResumeData } from "./careerAIEngine";
import type { UserProfile, GapAnalysis, ExperienceLevel } from "./skillEngine";

export const STORAGE_RESUME     = "devflow_career_ai_resume";   // shared with CareerAI
export const STORAGE_SKILL_PROF = "devflow_skill_gap_profile";
export const STORAGE_SKILL_GAP  = "devflow_skill_gap_analysis";

// ─── Loaders ─────────────────────────────────────────────────────────────────
export function loadResume(): ResumeData | null {
  try { return JSON.parse(localStorage.getItem(STORAGE_RESUME) ?? "null"); }
  catch { return null; }
}

export function loadProfile(): UserProfile | null {
  try { return JSON.parse(localStorage.getItem(STORAGE_SKILL_PROF) ?? "null"); }
  catch { return null; }
}

export function loadCachedAnalysis(): GapAnalysis | null {
  try { return JSON.parse(localStorage.getItem(STORAGE_SKILL_GAP) ?? "null"); }
  catch { return null; }
}

// ─── Savers ──────────────────────────────────────────────────────────────────
export function saveProfile(profile: UserProfile): void {
  try { localStorage.setItem(STORAGE_SKILL_PROF, JSON.stringify(profile)); } catch { /* ignore */ }
}

export function saveAnalysis(analysis: GapAnalysis): void {
  try { localStorage.setItem(STORAGE_SKILL_GAP, JSON.stringify(analysis)); } catch { /* ignore */ }
}

// ─── Derive profile from resume ───────────────────────────────────────────────
export function profileFromResume(resume: ResumeData, targetRole: string, experienceLevel: ExperienceLevel): UserProfile {
  return {
    skills: resume.skills,
    experienceLevel,
    targetRole,
  };
}

// ─── Infer experience level from resume ──────────────────────────────────────
export function inferExperienceLevel(resume: ResumeData | null): ExperienceLevel {
  if (!resume) return "mid";
  const text = resume.rawText.toLowerCase();
  const expEntries = resume.experience.length;

  // Count year spans mentioned in raw text
  const yearMatches = text.match(/\d{4}/g) ?? [];
  const years = yearMatches.map(Number).filter((y) => y > 2000 && y <= 2026);
  if (years.length >= 2) {
    const span = Math.max(...years) - Math.min(...years);
    if (span >= 7) return "senior";
    if (span >= 3) return "mid";
    return "junior";
  }

  // Fallback: count experience entries
  if (expEntries >= 3 || resume.skills.length > 12) return "senior";
  if (expEntries >= 2 || resume.skills.length > 6)  return "mid";
  return "junior";
}

// ─── Mock fallback profile (no resume) ───────────────────────────────────────
export const MOCK_PROFILE: UserProfile = {
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "Git"],
  experienceLevel: "mid",
  targetRole: "Senior Full Stack Engineer",
};
