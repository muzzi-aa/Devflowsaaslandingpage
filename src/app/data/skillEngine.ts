// ─── Skill Engine ─────────────────────────────────────────────────────────────
// Pure calculation logic — no React, no side effects.
// All functions are deterministic given the same inputs.

export type ExperienceLevel = "junior" | "mid" | "senior";

export interface UserProfile {
  skills: string[];
  experienceLevel: ExperienceLevel;
  targetRole: string;
}

export interface RoleRequirement {
  skill: string;
  required: number; // 0-100: minimum proficiency required for this role
  weight: number;   // 1-3: importance weight for prioritisation
  category: "core" | "infrastructure" | "architecture" | "soft";
  learnUrl?: string;
}

export interface SkillResult {
  skill: string;
  required: number;
  current: number;
  gap: number;         // required - current (clamped to 0 if current >= required)
  status: "strong" | "partial" | "weak" | "missing";
  category: RoleRequirement["category"];
  weight: number;
  isGap: boolean;
}

export interface GapAnalysis {
  role: string;
  experienceLevel: ExperienceLevel;
  overallScore: number;     // 0-100
  skills: SkillResult[];
  gaps: SkillResult[];      // skills where current < required
  strengths: SkillResult[]; // skills where current >= required
  recommendations: Recommendation[];
  readinessLabel: "Not Ready" | "Learning" | "Almost There" | "Ready" | "Overqualified";
}

export interface Recommendation {
  skill: string;
  priority: "critical" | "high" | "medium";
  reason: string;
  estimatedWeeks: number;
  resources: string[];
  gapPercent: number;
}

// ─── Role requirement database ────────────────────────────────────────────────
export const ROLE_REQUIREMENTS: Record<string, RoleRequirement[]> = {
  "Senior Full Stack Engineer": [
    { skill: "System Design",        required: 80, weight: 3, category: "architecture" },
    { skill: "TypeScript",           required: 85, weight: 3, category: "core" },
    { skill: "React",                required: 80, weight: 3, category: "core" },
    { skill: "Node.js",              required: 80, weight: 3, category: "core" },
    { skill: "PostgreSQL",           required: 70, weight: 2, category: "infrastructure" },
    { skill: "Cloud Infrastructure", required: 70, weight: 2, category: "infrastructure" },
    { skill: "Docker",               required: 65, weight: 2, category: "infrastructure" },
    { skill: "Distributed Systems",  required: 75, weight: 3, category: "architecture" },
    { skill: "Database Scaling",     required: 70, weight: 2, category: "architecture" },
    { skill: "Leadership",           required: 60, weight: 2, category: "soft" },
    { skill: "GraphQL",              required: 60, weight: 1, category: "core" },
    { skill: "Redis",                required: 60, weight: 1, category: "infrastructure" },
  ],
  "Frontend Engineer": [
    { skill: "TypeScript",           required: 85, weight: 3, category: "core" },
    { skill: "React",                required: 90, weight: 3, category: "core" },
    { skill: "Next.js",              required: 75, weight: 3, category: "core" },
    { skill: "CSS / Tailwind",       required: 80, weight: 2, category: "core" },
    { skill: "GraphQL",              required: 65, weight: 2, category: "core" },
    { skill: "Performance Tuning",   required: 70, weight: 2, category: "architecture" },
    { skill: "Testing (Playwright)", required: 60, weight: 1, category: "core" },
    { skill: "Web Accessibility",    required: 55, weight: 1, category: "core" },
    { skill: "State Management",     required: 75, weight: 2, category: "architecture" },
  ],
  "Backend Engineer": [
    { skill: "Go / Node.js",         required: 85, weight: 3, category: "core" },
    { skill: "PostgreSQL",           required: 80, weight: 3, category: "infrastructure" },
    { skill: "Redis",                required: 75, weight: 2, category: "infrastructure" },
    { skill: "Docker",               required: 80, weight: 3, category: "infrastructure" },
    { skill: "Kubernetes",           required: 70, weight: 2, category: "infrastructure" },
    { skill: "gRPC",                 required: 65, weight: 2, category: "core" },
    { skill: "System Design",        required: 80, weight: 3, category: "architecture" },
    { skill: "API Design",           required: 75, weight: 2, category: "architecture" },
    { skill: "Database Scaling",     required: 70, weight: 2, category: "architecture" },
    { skill: "Kafka",                required: 60, weight: 1, category: "infrastructure" },
  ],
  "ML / AI Engineer": [
    { skill: "Python",               required: 90, weight: 3, category: "core" },
    { skill: "PyTorch",              required: 80, weight: 3, category: "core" },
    { skill: "LangChain",            required: 70, weight: 2, category: "core" },
    { skill: "Vector DBs",           required: 65, weight: 2, category: "infrastructure" },
    { skill: "FastAPI",              required: 65, weight: 2, category: "core" },
    { skill: "Statistics & Math",    required: 75, weight: 3, category: "architecture" },
    { skill: "MLOps",                required: 65, weight: 2, category: "infrastructure" },
    { skill: "AWS SageMaker",        required: 60, weight: 2, category: "infrastructure" },
    { skill: "Data Engineering",     required: 60, weight: 1, category: "infrastructure" },
    { skill: "Prompt Engineering",   required: 70, weight: 2, category: "core" },
  ],
  "DevOps / Platform Engineer": [
    { skill: "Terraform",            required: 85, weight: 3, category: "infrastructure" },
    { skill: "Kubernetes",           required: 85, weight: 3, category: "infrastructure" },
    { skill: "AWS / GCP",            required: 80, weight: 3, category: "infrastructure" },
    { skill: "Prometheus / Grafana", required: 70, weight: 2, category: "infrastructure" },
    { skill: "CI/CD",                required: 80, weight: 3, category: "infrastructure" },
    { skill: "Docker",               required: 80, weight: 2, category: "infrastructure" },
    { skill: "Golang",               required: 65, weight: 2, category: "core" },
    { skill: "Security (DevSecOps)", required: 65, weight: 2, category: "architecture" },
    { skill: "ArgoCD",               required: 60, weight: 1, category: "infrastructure" },
    { skill: "Incident Response",    required: 65, weight: 2, category: "soft" },
  ],
  "Engineering Manager": [
    { skill: "System Design",        required: 75, weight: 2, category: "architecture" },
    { skill: "Leadership",           required: 90, weight: 3, category: "soft" },
    { skill: "OKR / Goal Setting",   required: 80, weight: 3, category: "soft" },
    { skill: "Hiring & Interviews",  required: 75, weight: 2, category: "soft" },
    { skill: "Stakeholder Mgmt",     required: 80, weight: 3, category: "soft" },
    { skill: "Roadmapping",          required: 75, weight: 2, category: "soft" },
    { skill: "Technical Mentoring",  required: 80, weight: 3, category: "soft" },
    { skill: "Agile / Scrum",        required: 70, weight: 2, category: "soft" },
    { skill: "Cross-team Collab",    required: 75, weight: 2, category: "soft" },
  ],
};

export const ROLE_NAMES = Object.keys(ROLE_REQUIREMENTS);

// ─── Recommendation resources ─────────────────────────────────────────────────
const SKILL_RESOURCES: Record<string, string[]> = {
  "System Design":         ["Designing Data-Intensive Applications", "System Design Interview (Alex Xu)", "ByteByteGo"],
  "TypeScript":            ["TypeScript Handbook", "Matt Pocock's Total TypeScript", "Execute Program"],
  "React":                 ["React Docs (react.dev)", "Josh Comeau's Joy of React", "Epicreact.dev"],
  "Node.js":               ["Node.js Docs", "Fastify / Express guides", "Node.js Design Patterns book"],
  "Cloud Infrastructure":  ["AWS Solutions Architect course", "A Cloud Guru", "Cloud Resume Challenge"],
  "Distributed Systems":   ["DDIA", "Martin Kleppmann lectures", "MIT 6.824"],
  "Docker":                ["Docker Docs", "Play With Docker", "KodeKloud Docker course"],
  "Kubernetes":            ["k8s Docs", "KodeKloud CKA", "Kubernetes in Action book"],
  "PostgreSQL":            ["Postgres Tutorial", "Use The Index, Luke", "pgexercises.com"],
  "Python":                ["Python Docs", "Real Python", "FastAI course"],
  "PyTorch":               ["PyTorch Tutorials", "fast.ai", "Deep Learning Specialization"],
  "Leadership":            ["The Manager's Path", "An Elegant Puzzle", "Staff Engineer book"],
  "CI/CD":                 ["GitHub Actions Docs", "CircleCI University", "Jenkins Handbook"],
  "Terraform":             ["HashiCorp Learn", "Terraform Up & Running book", "KodeKloud Terraform"],
  "GraphQL":               ["GraphQL.org", "The Guild tutorials", "Apollo Odyssey"],
  "Redis":                 ["Redis University", "Redis in Action book", "Redis Docs"],
};

function getResources(skill: string): string[] {
  const key = Object.keys(SKILL_RESOURCES).find(
    (k) => k.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(k.toLowerCase())
  );
  return key ? SKILL_RESOURCES[key] : ["Official documentation", "YouTube tutorials", "Udemy / Coursera"];
}

// ─── Proficiency scoring ──────────────────────────────────────────────────────
// Given a user's skill list and a required skill name, compute a 0-100 proficiency.
const EXPERIENCE_MULTIPLIER: Record<ExperienceLevel, number> = {
  junior: 0.65,
  mid:    0.80,
  senior: 1.00,
};

// Canonical skill aliases — maps variant names to canonical key
const SKILL_ALIASES: Record<string, string[]> = {
  "TypeScript":           ["typescript", "ts"],
  "React":                ["react", "reactjs", "react.js"],
  "Node.js":              ["node", "nodejs", "node.js"],
  "PostgreSQL":           ["postgres", "postgresql", "pg"],
  "Docker":               ["docker", "containerization"],
  "Kubernetes":           ["kubernetes", "k8s"],
  "Python":               ["python", "py"],
  "AWS":                  ["aws", "amazon web services"],
  "Cloud Infrastructure": ["aws", "gcp", "azure", "cloud"],
  "Go / Node.js":         ["go", "golang", "node", "nodejs"],
  "CI/CD":                ["ci/cd", "cicd", "github actions", "jenkins", "gitlab ci"],
  "MongoDB":              ["mongo", "mongodb"],
  "Redis":                ["redis"],
  "GraphQL":              ["graphql", "gql"],
  "System Design":        ["system design"],
  "Terraform":            ["terraform"],
  "Leadership":           ["leadership", "management", "mentoring", "team lead"],
  "PyTorch":              ["pytorch", "torch"],
  "LangChain":            ["langchain", "lang chain"],
};

function matchSkill(required: string, userSkills: string[]): boolean {
  const reqLower = required.toLowerCase();
  // Direct match
  if (userSkills.some((s) => s.toLowerCase() === reqLower)) return true;
  // Partial match
  if (userSkills.some((s) => s.toLowerCase().includes(reqLower) || reqLower.includes(s.toLowerCase()))) return true;
  // Alias match
  const aliases = Object.entries(SKILL_ALIASES).find(([canonical]) =>
    canonical.toLowerCase() === reqLower ||
    canonical.toLowerCase().includes(reqLower) ||
    reqLower.includes(canonical.toLowerCase())
  );
  if (aliases) {
    return userSkills.some((s) =>
      aliases[1].some((a) => s.toLowerCase().includes(a) || a.includes(s.toLowerCase()))
    );
  }
  return false;
}

function computeProficiency(
  requiredSkill: string,
  userSkills: string[],
  experienceLevel: ExperienceLevel,
  requiredScore: number
): number {
  const hasSkill = matchSkill(requiredSkill, userSkills);
  const multiplier = EXPERIENCE_MULTIPLIER[experienceLevel];

  if (hasSkill) {
    // User has the skill — assign a realistic score relative to required
    // Senior devs with the skill tend to meet or exceed the bar
    const base = experienceLevel === "senior"
      ? Math.min(95, requiredScore + 10 + Math.floor(Math.random() * 8))
      : experienceLevel === "mid"
      ? Math.min(90, requiredScore + Math.floor(Math.random() * 10))
      : Math.max(40, Math.round(requiredScore * multiplier));
    return base;
  }

  // User does NOT have the skill
  // Senior engineers have baseline awareness even of skills they don't list
  const baseline = experienceLevel === "senior" ? 15
    : experienceLevel === "mid" ? 8
    : 0;
  return baseline;
}

// ─── Main calculation ─────────────────────────────────────────────────────────
export function calculateGapAnalysis(profile: UserProfile): GapAnalysis {
  const roleReqs = ROLE_REQUIREMENTS[profile.targetRole] ?? ROLE_REQUIREMENTS["Senior Full Stack Engineer"];

  const skillResults: SkillResult[] = roleReqs.map((req) => {
    const current = computeProficiency(req.skill, profile.skills, profile.experienceLevel, req.required);
    const gap = Math.max(0, req.required - current);
    const status: SkillResult["status"] =
      current >= req.required ? "strong"
      : current >= req.required * 0.7 ? "partial"
      : current >= req.required * 0.4 ? "weak"
      : "missing";

    return {
      skill: req.skill,
      required: req.required,
      current,
      gap,
      status,
      category: req.category,
      weight: req.weight,
      isGap: current < req.required,
    };
  });

  const gaps      = skillResults.filter((s) => s.isGap).sort((a, b) => (b.gap * b.weight) - (a.gap * a.weight));
  const strengths = skillResults.filter((s) => !s.isGap);

  // Overall score: weighted average of (current / required) capped at 1, scaled to 100
  const totalWeight = roleReqs.reduce((acc, r) => acc + r.weight, 0);
  const weightedScore = roleReqs.reduce((acc, req, i) => {
    const result = skillResults[i];
    return acc + (Math.min(1, result.current / req.required) * req.weight);
  }, 0);
  const overallScore = Math.round((weightedScore / totalWeight) * 100);

  const readinessLabel: GapAnalysis["readinessLabel"] =
    overallScore >= 95 ? "Overqualified"
    : overallScore >= 80 ? "Ready"
    : overallScore >= 60 ? "Almost There"
    : overallScore >= 35 ? "Learning"
    : "Not Ready";

  // Build recommendations for top gaps
  const recommendations: Recommendation[] = gaps.slice(0, 5).map((gap) => {
    const priority: Recommendation["priority"] =
      gap.weight === 3 && gap.gap > 40 ? "critical"
      : gap.weight >= 2 && gap.gap > 20 ? "high"
      : "medium";

    const estimatedWeeks = Math.ceil((gap.gap / 10) * (gap.weight === 3 ? 2.5 : gap.weight === 2 ? 1.5 : 1));

    const reason =
      gap.status === "missing"
        ? `Not found in your skill set — critical for ${profile.targetRole}`
        : gap.status === "weak"
        ? `You have surface knowledge but need deeper expertise for this role`
        : `You're ${gap.gap}% below the required proficiency threshold`;

    return {
      skill: gap.skill,
      priority,
      reason,
      estimatedWeeks,
      resources: getResources(gap.skill),
      gapPercent: gap.gap,
    };
  });

  return {
    role: profile.targetRole,
    experienceLevel: profile.experienceLevel,
    overallScore,
    skills: skillResults,
    gaps,
    strengths,
    recommendations,
    readinessLabel,
  };
}

// ─── Suggest challenges for Coding Arena ─────────────────────────────────────
export function suggestChallengeTopics(analysis: GapAnalysis): string[] {
  return analysis.gaps.slice(0, 3).map((g) => g.skill);
}
