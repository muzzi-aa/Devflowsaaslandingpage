import { useState, useCallback, useEffect, useMemo } from "react";
import {
  calculateGapAnalysis,
  ROLE_NAMES,
  type UserProfile,
  type GapAnalysis,
  type ExperienceLevel,
} from "../data/skillEngine";
import {
  loadResume,
  loadProfile,
  saveProfile,
  saveAnalysis,
  profileFromResume,
  inferExperienceLevel,
  MOCK_PROFILE,
} from "../data/skillDataService";

export type { GapAnalysis, UserProfile, ExperienceLevel };
export { ROLE_NAMES };

export interface UseSkillGapReturn {
  profile: UserProfile;
  analysis: GapAnalysis;
  hasResume: boolean;
  usingMock: boolean;
  setTargetRole: (role: string) => void;
  setExperienceLevel: (level: ExperienceLevel) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  recalculate: () => void;
}

export function useSkillGap(): UseSkillGapReturn {
  const resume = useMemo(() => loadResume(), []);
  const hasResume = resume !== null;

  // Initialise profile: from resume > from saved profile > from mock
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = loadProfile();
    if (saved) return saved;
    if (resume) {
      const level = inferExperienceLevel(resume);
      return profileFromResume(resume, "Senior Full Stack Engineer", level);
    }
    return { ...MOCK_PROFILE };
  });

  // Re-sync skills from resume whenever resume changes (if user just uploaded)
  useEffect(() => {
    const freshResume = loadResume();
    if (freshResume && freshResume.skills.length > 0) {
      setProfile((prev) => ({
        ...prev,
        skills: freshResume.skills,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Compute analysis reactively whenever profile changes
  const analysis = useMemo<GapAnalysis>(() => {
    const result = calculateGapAnalysis(profile);
    saveAnalysis(result);
    return result;
  }, [profile]);

  // Persist profile on every change
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const setTargetRole = useCallback((role: string) => {
    setProfile((prev) => ({ ...prev, targetRole: role }));
  }, []);

  const setExperienceLevel = useCallback((level: ExperienceLevel) => {
    setProfile((prev) => ({ ...prev, experienceLevel: level }));
  }, []);

  const addSkill = useCallback((skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setProfile((prev) => {
      if (prev.skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return prev;
      return { ...prev, skills: [...prev.skills, trimmed] };
    });
  }, []);

  const removeSkill = useCallback((skill: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  }, []);

  const recalculate = useCallback(() => {
    // Force re-read of resume from localStorage
    const freshResume = loadResume();
    if (freshResume && freshResume.skills.length > 0) {
      setProfile((prev) => ({ ...prev, skills: freshResume.skills }));
    }
  }, []);

  return {
    profile,
    analysis,
    hasResume,
    usingMock: !hasResume,
    setTargetRole,
    setExperienceLevel,
    addSkill,
    removeSkill,
    recalculate,
  };
}
