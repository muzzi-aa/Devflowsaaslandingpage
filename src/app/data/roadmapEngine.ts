// ─── Roadmap Engine ────────────────────────────────────────────────────────────
// Pure calculation logic — no React, no side effects.

export type RoadmapStatus = "completed" | "current" | "todo" | "planned";
export type RoadmapCategory = "core" | "infrastructure" | "architecture" | "soft";

export interface RoadmapStep {
  id: number;
  title: string;
  status: RoadmapStatus;
  description: string;
  skill?: string;              // linked skill (from SkillGap)
  category: RoadmapCategory;
  startDate?: string;          // ISO date string — when started
  endDate?: string;            // ISO date string — when completed
  progress: number;            // 0-100 (only meaningful for "current")
  arenaQuery?: string;         // pre-filter for Coding Arena
  isFromSkillGap?: boolean;
}

// ─── Status helpers ───────────────────────────────────────────────────────────
export function statusLabel(status: RoadmapStatus): string {
  switch (status) {
    case "completed": return "Finished";
    case "current":   return "Working on it";
    case "todo":      return "Next";
    case "planned":   return "Planned";
  }
}

export function statusDotColor(status: RoadmapStatus): string {
  switch (status) {
    case "completed": return "#4ADE80";
    case "current":   return "#60A5FA";
    case "todo":      return "#9AA4B2";
    case "planned":   return "#4B5563";
  }
}

export function statusRingClass(status: RoadmapStatus): string {
  switch (status) {
    case "completed": return "border-green-400 bg-green-400/20 text-green-400";
    case "current":   return "border-blue-400 bg-blue-400/20 text-blue-400";
    case "todo":      return "border-gray-600 bg-gray-800 text-gray-400";
    case "planned":   return "border-gray-700 bg-gray-900 text-gray-600";
  }
}

export function connectorColor(status: RoadmapStatus): string {
  switch (status) {
    case "completed": return "#4ADE80";
    case "current":   return "#3B82F6";
    default:          return "#2A2F35";
  }
}

export function titleColor(status: RoadmapStatus): string {
  switch (status) {
    case "completed": return "#FFFFFF";
    case "current":   return "#FFFFFF";
    case "todo":      return "#9AA4B2";
    case "planned":   return "#4B5563";
  }
}

// ─── Date formatting ──────────────────────────────────────────────────────────
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function todayISO(): string {
  return new Date().toISOString();
}

// ─── Progress calculation ─────────────────────────────────────────────────────
export interface ProgressStats {
  total: number;
  completed: number;
  inProgress: number;
  remaining: number;
  percent: number;
}

export function calculateProgress(steps: RoadmapStep[]): ProgressStats {
  const total = steps.length;
  const completed = steps.filter((s) => s.status === "completed").length;
  const inProgress = steps.filter((s) => s.status === "current").length;
  const remaining = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, inProgress, remaining, percent };
}

// ─── Transition logic ─────────────────────────────────────────────────────────

/** Mark a step as complete. Advances the next todo→current automatically. */
export function markStepComplete(steps: RoadmapStep[], id: number): RoadmapStep[] {
  let updated = steps.map((s) =>
    s.id === id
      ? { ...s, status: "completed" as RoadmapStatus, endDate: todayISO(), progress: 100 }
      : s
  );

  // If there's no current step left, promote the first todo to current
  const hasCurrent = updated.some((s) => s.status === "current");
  if (!hasCurrent) {
    const firstTodoIdx = updated.findIndex((s) => s.status === "todo");
    if (firstTodoIdx !== -1) {
      updated = updated.map((s, i) =>
        i === firstTodoIdx ? { ...s, status: "current" as RoadmapStatus, startDate: todayISO() } : s
      );
    }
  }
  return updated;
}

/** Explicitly start a step (demotes any existing current → todo first). */
export function startStep(steps: RoadmapStep[], id: number): RoadmapStep[] {
  return steps.map((s) => {
    if (s.id === id) return { ...s, status: "current" as RoadmapStatus, startDate: todayISO() };
    if (s.status === "current") return { ...s, status: "todo" as RoadmapStatus };
    return s;
  });
}

/** Update in-progress percentage for the current step. */
export function updateProgress(steps: RoadmapStep[], id: number, progress: number): RoadmapStep[] {
  return steps.map((s) => (s.id === id ? { ...s, progress: Math.min(100, Math.max(0, progress)) } : s));
}

/** Add a new step at the end with planned status. */
export function addStep(steps: RoadmapStep[], title: string, description: string, category: RoadmapCategory): RoadmapStep[] {
  const maxId = steps.reduce((acc, s) => Math.max(acc, s.id), 0);
  const newStep: RoadmapStep = {
    id: maxId + 1,
    title,
    description,
    status: "planned",
    category,
    progress: 0,
  };
  return [...steps, newStep];
}

/** Remove a step. */
export function removeStep(steps: RoadmapStep[], id: number): RoadmapStep[] {
  return steps.filter((s) => s.id !== id);
}

// ─── Default roadmap (when no data exists) ───────────────────────────────────
export const DEFAULT_STEPS: RoadmapStep[] = [
  {
    id: 1,
    title: "Master React Hooks",
    description: "Deep dive into useState, useEffect, useContext, useReducer, useMemo, useCallback, and custom hooks. Build 3 projects.",
    status: "completed",
    category: "core",
    skill: "React",
    endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 100,
    arenaQuery: "react",
  },
  {
    id: 2,
    title: "Advanced Node.js & Express",
    description: "REST API design, middleware patterns, authentication, rate limiting, and performance optimisation.",
    status: "current",
    category: "core",
    skill: "Node.js",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 45,
    arenaQuery: "node",
  },
  {
    id: 3,
    title: "System Design Patterns",
    description: "Load balancing, caching strategies, message queues, microservices, and API gateway patterns.",
    status: "todo",
    category: "architecture",
    skill: "System Design",
    progress: 0,
    arenaQuery: "system design",
  },
  {
    id: 4,
    title: "Cloud Architecture (AWS)",
    description: "EC2, S3, Lambda, RDS, CloudFront, IAM, and infrastructure as code with Terraform.",
    status: "planned",
    category: "infrastructure",
    skill: "Cloud Infrastructure",
    progress: 0,
    arenaQuery: "aws",
  },
  {
    id: 5,
    title: "Distributed Systems",
    description: "Consensus algorithms, distributed transactions, CAP theorem, and eventual consistency.",
    status: "planned",
    category: "architecture",
    skill: "Distributed Systems",
    progress: 0,
    arenaQuery: "distributed",
  },
];

// ─── Generate steps from Skill Gap analysis ───────────────────────────────────
interface GapRec {
  skill: string;
  priority: "critical" | "high" | "medium";
  estimatedWeeks: number;
  gapPercent: number;
}

const SKILL_DESCRIPTIONS: Record<string, string> = {
  "System Design":        "Master distributed systems architecture, scalability patterns, and high-level design interviews.",
  "TypeScript":           "Advanced type system, generics, utility types, declaration files, and strict mode patterns.",
  "React":                "Hooks deep-dive, performance optimisation, concurrent features, and component patterns.",
  "Node.js":              "Event loop mastery, streams, worker threads, clustering, and production best practices.",
  "PostgreSQL":           "Query optimisation, indexing strategies, transactions, CTEs, and connection pooling.",
  "Cloud Infrastructure": "AWS core services, IaC with Terraform, cost optimisation, and well-architected framework.",
  "Docker":               "Multi-stage builds, networking, volumes, compose, and container security hardening.",
  "Kubernetes":           "Pod lifecycle, services, ingress, HPA, rolling updates, and Helm chart creation.",
  "Distributed Systems":  "CAP theorem, Raft/Paxos, eventual consistency, CQRS, and event sourcing.",
  "Database Scaling":     "Sharding, replication, read replicas, connection pooling, and cache strategies.",
  "Leadership":           "Engineering leadership frameworks, 1:1s, giving feedback, and driving technical vision.",
  "GraphQL":              "Schema design, resolvers, dataloaders, subscriptions, and federation.",
  "Redis":                "Data structures, pub/sub, caching patterns, Lua scripting, and cluster mode.",
  "Python":               "Advanced Python patterns, async/await, type hints, packaging, and performance.",
  "PyTorch":              "Tensor operations, autograd, custom layers, training loops, and model deployment.",
  "LangChain":            "LLM chains, RAG pipelines, agents, tools, and production AI application patterns.",
  "Terraform":            "Provider configurations, modules, state management, workspaces, and CI/CD integration.",
  "CI/CD":                "Pipeline design, automated testing, deployment strategies, and GitOps workflows.",
  "Golang":               "Goroutines, channels, interfaces, error handling idioms, and Go module system.",
};

const SKILL_CATEGORIES: Record<string, RoadmapCategory> = {
  "System Design": "architecture", "TypeScript": "core", "React": "core",
  "Node.js": "core", "PostgreSQL": "infrastructure", "Cloud Infrastructure": "infrastructure",
  "Docker": "infrastructure", "Kubernetes": "infrastructure", "Distributed Systems": "architecture",
  "Database Scaling": "architecture", "Leadership": "soft", "GraphQL": "core",
  "Redis": "infrastructure", "Python": "core", "PyTorch": "core",
  "LangChain": "core", "Terraform": "infrastructure", "CI/CD": "infrastructure",
  "Golang": "core", "Go / Node.js": "core",
};

export function generateStepsFromGaps(recs: GapRec[]): RoadmapStep[] {
  const sorted = [...recs].sort((a, b) => {
    const pOrder = { critical: 0, high: 1, medium: 2 };
    return pOrder[a.priority] - pOrder[b.priority];
  });

  return sorted.map((rec, idx) => {
    const isFirst = idx === 0;
    const description = SKILL_DESCRIPTIONS[rec.skill] ?? `Develop proficiency in ${rec.skill} to meet role requirements.`;
    const category = SKILL_CATEGORIES[rec.skill] ?? "core";
    const arenaQuery = rec.skill.toLowerCase().split(" ")[0];

    return {
      id: idx + 1,
      title: `Learn ${rec.skill}`,
      description,
      status: isFirst ? "current" : idx === 1 ? "todo" : "planned",
      category,
      skill: rec.skill,
      progress: isFirst ? 0 : 0,
      startDate: isFirst ? todayISO() : undefined,
      arenaQuery,
      isFromSkillGap: true,
    } as RoadmapStep;
  });
}

// ─── Search filtering ─────────────────────────────────────────────────────────
export function filterSteps(steps: RoadmapStep[], query: string): RoadmapStep[] {
  if (!query.trim()) return steps;
  const q = query.toLowerCase();
  return steps.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.skill ?? "").toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  );
}

export function highlightMatch(text: string, query: string): { text: string; isMatch: boolean }[] {
  if (!query.trim()) return [{ text, isMatch: false }];
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((p) => ({ text: p, isMatch: p.toLowerCase() === query.toLowerCase() }));
}

// ─── Category metadata ────────────────────────────────────────────────────────
export const CATEGORY_META: Record<RoadmapCategory, { label: string; color: string; bg: string }> = {
  core:           { label: "Core",           color: "#4ADE80", bg: "rgba(74,222,128,0.08)"  },
  infrastructure: { label: "Infrastructure", color: "#60A5FA", bg: "rgba(96,165,250,0.08)"  },
  architecture:   { label: "Architecture",   color: "#FBbf24", bg: "rgba(251,191,36,0.08)"  },
  soft:           { label: "Soft Skills",    color: "#C084FC", bg: "rgba(192,132,252,0.08)" },
};
