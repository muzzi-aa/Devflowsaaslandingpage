// ─── Career AI Mock Engine ────────────────────────────────────────────────────
// A deterministic, context-aware mock AI engine for career coaching.
// Swap generateAIResponse() for a real OpenAI/Gemini fetch when an API key is available.

export interface ResumeData {
  rawText: string;
  skills: string[];
  experience: string[];
  education: string[];
  fileName: string;
  uploadedAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// ─── Skill / Role databases ───────────────────────────────────────────────────
const MODERN_SKILLS = [
  "TypeScript", "React", "Next.js", "Node.js", "GraphQL", "Docker", "Kubernetes",
  "AWS", "GCP", "Azure", "Redis", "PostgreSQL", "MongoDB", "Rust", "Go",
  "Python", "FastAPI", "LangChain", "Vector DBs", "Terraform", "CI/CD", "gRPC",
  "WebSockets", "Kafka", "Elasticsearch", "System Design",
];

const ROLE_STACKS: Record<string, { stack: string[]; salary: string; demand: string }> = {
  "Frontend Engineer": {
    stack: ["TypeScript", "React", "Next.js", "GraphQL", "Tailwind CSS", "Playwright"],
    salary: "$110k – $165k",
    demand: "High",
  },
  "Backend Engineer": {
    stack: ["Go / Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "gRPC"],
    salary: "$120k – $180k",
    demand: "Very High",
  },
  "Full-Stack Engineer": {
    stack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    salary: "$115k – $175k",
    demand: "High",
  },
  "ML / AI Engineer": {
    stack: ["Python", "PyTorch", "LangChain", "Vector DBs", "FastAPI", "AWS SageMaker"],
    salary: "$150k – $250k",
    demand: "Explosive",
  },
  "DevOps / Platform Engineer": {
    stack: ["Terraform", "Kubernetes", "AWS / GCP", "Prometheus", "ArgoCD", "Golang"],
    salary: "$130k – $195k",
    demand: "Very High",
  },
  "Engineering Manager": {
    stack: ["System Design", "OKR frameworks", "Roadmapping", "Hiring", "Stakeholder mgmt"],
    salary: "$160k – $240k",
    demand: "Moderate",
  },
};

// ─── Simple NLP keyword classifier ───────────────────────────────────────────
type Intent =
  | "salary"
  | "skills"
  | "roadmap"
  | "resume_analysis"
  | "role_suggestion"
  | "interview"
  | "general"
  | "greeting";

function detectIntent(msg: string): Intent {
  const m = msg.toLowerCase();
  if (/\b(hi|hello|hey|sup|howdy)\b/.test(m)) return "greeting";
  if (/\b(salary|compensation|pay|money|earn|income)\b/.test(m)) return "salary";
  if (/\b(skill|learn|study|course|technology|stack|missing|gap)\b/.test(m)) return "skills";
  if (/\b(roadmap|path|journey|plan|steps|how to become|career path)\b/.test(m)) return "roadmap";
  if (/\b(resume|cv|experience|upload|profile|background)\b/.test(m)) return "resume_analysis";
  if (/\b(role|job|position|title|switch|change|transition|hire)\b/.test(m)) return "role_suggestion";
  if (/\b(interview|leetcode|system design|question|prep|practice)\b/.test(m)) return "interview";
  return "general";
}

// Extract skills from raw resume text
export function parseResumeText(text: string, fileName: string): ResumeData {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  // Detect skills by matching against known list + common patterns
  const foundSkills: Set<string> = new Set();
  const skillKeywords = [
    "javascript", "typescript", "python", "java", "go", "golang", "rust", "c++", "c#",
    "ruby", "php", "swift", "kotlin", "react", "vue", "angular", "next.js", "nuxt",
    "node.js", "express", "fastapi", "django", "flask", "spring", "rails",
    "postgresql", "mysql", "mongodb", "redis", "elasticsearch", "kafka",
    "docker", "kubernetes", "aws", "gcp", "azure", "terraform", "ansible",
    "graphql", "rest", "grpc", "websocket",
    "machine learning", "deep learning", "pytorch", "tensorflow", "langchain",
    "git", "github", "gitlab", "jira", "figma",
    "linux", "bash", "ci/cd", "jenkins", "github actions",
  ];
  const textLower = text.toLowerCase();
  skillKeywords.forEach((sk) => {
    if (textLower.includes(sk)) {
      foundSkills.add(sk.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "));
    }
  });

  // Heuristic: lines that look like experience entries (contain year ranges)
  const expPattern = /(\d{4})\s*[-–]\s*(\d{4}|present|current)/i;
  const experience = lines.filter((l) => expPattern.test(l)).slice(0, 5);

  // Heuristic: lines with common degree keywords
  const eduKeywords = ["bachelor", "master", "phd", "b.s.", "m.s.", "b.e.", "b.tech", "m.tech", "mba", "degree", "university", "college"];
  const education = lines
    .filter((l) => eduKeywords.some((k) => l.toLowerCase().includes(k)))
    .slice(0, 3);

  return {
    rawText: text.slice(0, 3000),
    skills: [...foundSkills].slice(0, 20),
    experience: experience.length > 0 ? experience : ["Experience details not extracted — plain text parsing only"],
    education: education.length > 0 ? education : ["Education details not extracted"],
    fileName,
    uploadedAt: new Date().toISOString(),
  };
}

// ─── Response generators ──────────────────────────────────────────────────────
function generateGreeting(resume: ResumeData | null): string {
  if (resume) {
    return `Hey! Great to have your resume here. I can see you have experience with **${resume.skills.slice(0, 3).join(", ")}** — solid foundation. What would you like to work on today? I can help with skill gaps, role transitions, salary benchmarks, or interview prep.`;
  }
  return `Hey! I'm your AI Career Coach. I specialize in helping software engineers level up their careers. You can ask me about:\n\n• **Skill gaps** and what to learn next\n• **Salary benchmarks** for your target role\n• **Career roadmaps** and role transitions\n• **Interview prep** strategy\n\nFor personalized advice, upload your resume using the button on the left. What's on your mind?`;
}

function generateSkillsResponse(msg: string, resume: ResumeData | null): string {
  const targetRole = Object.keys(ROLE_STACKS).find((r) => msg.toLowerCase().includes(r.toLowerCase()));
  const roleInfo = targetRole ? ROLE_STACKS[targetRole] : ROLE_STACKS["Full-Stack Engineer"];

  if (resume && resume.skills.length > 0) {
    const userSkills = resume.skills.map((s) => s.toLowerCase());
    const missing = roleInfo.stack.filter((s) => !userSkills.some((u) => s.toLowerCase().includes(u) || u.includes(s.toLowerCase())));
    const hasAlready = roleInfo.stack.filter((s) => userSkills.some((u) => s.toLowerCase().includes(u) || u.includes(s.toLowerCase())));

    return `Based on your resume, here's a skill gap analysis for **${targetRole ?? "Full-Stack Engineer"}**:\n\n✅ **You already have:**\n${hasAlready.map((s) => `• ${s}`).join("\n") || "• Need to review your skills more closely"}\n\n🚀 **Priority skills to add:**\n${missing.slice(0, 5).map((s, i) => `${i + 1}. **${s}** — high demand in this role`).join("\n")}\n\n💡 **My recommendation:** Focus on **${missing[0] ?? roleInfo.stack[0]}** first — it'll have the highest ROI for job applications in the next 3 months.`;
  }

  return `Here are the most in-demand skills for 2026:\n\n🔥 **Hottest skills right now:**\n${MODERN_SKILLS.slice(0, 8).map((s) => `• **${s}**`).join("\n")}\n\n📈 **Highest salary multiplier:**\n• AI/ML tooling (+$40-60k)\n• Kubernetes / Platform Engineering (+$30-50k)\n• TypeScript at scale (+$20-30k)\n\nUpload your resume for a **personalized** gap analysis tailored to your background.`;
}

function generateSalaryResponse(msg: string, resume: ResumeData | null): string {
  const targetRole = Object.keys(ROLE_STACKS).find((r) => msg.toLowerCase().includes(r.toLowerCase()));

  if (targetRole) {
    const info = ROLE_STACKS[targetRole];
    return `**Salary Benchmarks — ${targetRole} (2026)**\n\n💰 **Total compensation range:** ${info.salary}\n📊 **Market demand:** ${info.demand}\n\n**By level:**\n• Junior (0-2 yrs): $85k – $115k\n• Mid (2-5 yrs): $115k – $155k\n• Senior (5+ yrs): $155k – $220k\n• Staff/Principal: $200k – $300k+\n\n**Top-paying companies:** Meta, Google, Stripe, Figma, OpenAI\n\n💡 **Tip:** Negotiating equity (RSUs) can add $30-80k/yr to your effective comp. Always negotiate base + equity + signing bonus separately.`;
  }

  const skills = resume?.skills ?? [];
  const hasMLSkills = skills.some((s) => ["Python", "PyTorch", "TensorFlow", "LangChain"].includes(s));
  const recommendedRole = hasMLSkills ? "ML / AI Engineer" : "Full-Stack Engineer";
  const info = ROLE_STACKS[recommendedRole];

  return `**2026 Software Engineer Salary Benchmarks**\n\n${Object.entries(ROLE_STACKS)
    .slice(0, 4)
    .map(([role, data]) => `• **${role}:** ${data.salary} (demand: ${data.demand})`)
    .join("\n")}\n\n${resume ? `Based on your resume skills, I'd target **${recommendedRole}** roles — range is **${info.salary}**.` : "Upload your resume for a personalized salary estimate based on your specific skills and experience."}\n\n💡 **Key lever:** Switching companies (not getting promotions) is statistically the fastest way to grow compensation by 20-40%.`;
}

function generateRoadmapResponse(msg: string, resume: ResumeData | null): string {
  const targetRole = Object.keys(ROLE_STACKS).find((r) => msg.toLowerCase().includes(r.toLowerCase()))
    ?? "Full-Stack Engineer";
  const info = ROLE_STACKS[targetRole];

  return `**12-Month Roadmap → ${targetRole}**\n\n📅 **Months 1-3: Foundation**\n• Master: ${info.stack.slice(0, 2).join(", ")}\n• Complete 2 portfolio projects\n• Solve 50 LeetCode problems (Easy/Medium)\n\n📅 **Months 4-6: Depth**\n• Learn: ${info.stack.slice(2, 4).join(", ")}\n• Contribute to 1 open-source project\n• Build a production-grade side project\n\n📅 **Months 7-9: Applications**\n• Polish resume + LinkedIn\n• Apply to 5-10 companies/week\n• Do 15+ mock interviews\n\n📅 **Months 10-12: Negotiation**\n• Target ${info.salary} compensation\n• Evaluate 2+ offers simultaneously\n• Negotiate all 3: base, equity, signing\n\n${resume ? `Based on your current skills, I estimate you're **already 30-40% of the way there**. Let's focus on the gaps.` : "Share your resume and I'll customize this timeline based on your current experience."}`;
}

function generateResumeAnalysis(resume: ResumeData | null): string {
  if (!resume) {
    return `No resume uploaded yet. Click **"Upload Resume"** on the left panel and I'll give you a detailed analysis of your skills, experience level, and career positioning. I support PDF and DOCX files.`;
  }

  const skillCount = resume.skills.length;
  const level = skillCount > 12 ? "Senior" : skillCount > 6 ? "Mid-level" : "Junior";
  const topSkills = resume.skills.slice(0, 5);
  const missingModern = MODERN_SKILLS.filter((s) => !resume.skills.some((r) => r.toLowerCase().includes(s.toLowerCase()))).slice(0, 4);

  return `**Resume Analysis — ${resume.fileName}**\n\n📊 **Detected level:** ${level} Engineer\n✅ **Skills found (${skillCount}):** ${topSkills.join(", ")}${skillCount > 5 ? `, +${skillCount - 5} more` : ""}\n\n🎯 **Suggested roles:**\n• ${level === "Senior" ? "Staff Engineer / Engineering Manager" : level === "Mid-level" ? "Senior Software Engineer" : "Software Engineer II"}\n• ${resume.skills.some((s) => s.toLowerCase().includes("python") || s.toLowerCase().includes("ml")) ? "ML Engineer / AI Engineer" : "Backend / Full-Stack Engineer"}\n\n⚡ **Quick wins to improve your profile:**\n${missingModern.map((s, i) => `${i + 1}. Add **${s}** — featured on 60%+ of job descriptions`).join("\n")}\n\n📝 **Resume tips:**\n• Quantify impact ("reduced latency by 40%", not "improved performance")\n• Add GitHub links with active contributions\n• Highlight system scale (users, requests/sec, data volume)`;
}

function generateInterviewResponse(): string {
  return `**Interview Prep Strategy — 2026**\n\n🧠 **Coding interviews (Weeks 1-3):**\n• Arrays & Hashing → 15 problems\n• Two Pointers / Sliding Window → 10 problems\n• Trees & Graphs → 20 problems\n• Dynamic Programming → 10 problems\n\n📐 **System Design (Weeks 3-5):**\nMust-know designs:\n• URL Shortener, Rate Limiter, Chat App\n• News Feed, Distributed Cache\n• Read: *Designing Data-Intensive Applications*\n\n💬 **Behavioral (ongoing):**\n• Prep 6-8 STAR stories (conflict, leadership, failure, impact)\n• Research company values + recent eng blog posts\n\n🏆 **Companies by difficulty:**\n• Easier: Atlassian, Shopify, Twilio\n• Medium: Stripe, Airbnb, LinkedIn\n• Hard: Google, Meta, OpenAI, Jane Street\n\n💡 **Secret weapon:** After every interview, immediately write down every question asked. Build a personal question bank.`;
}

function generateGeneralResponse(msg: string, resume: ResumeData | null): string {
  const topics = [
    "skill gaps and what to learn next",
    "salary benchmarks for your target role",
    "a 12-month career roadmap",
    "interview preparation strategy",
    "resume analysis and improvements",
    "role transition planning",
  ];
  return `Good question! Here's what I can help you with as your career coach:\n\n${topics.map((t) => `• **${t}**`).join("\n")}\n\n${resume ? `I have your resume (${resume.fileName}) context loaded — just ask me anything specific and I'll tailor my response to your background.` : "For the most personalized advice, upload your resume so I can give you context-aware recommendations."}\n\nWhat specific aspect of your career would you like to focus on?`;
}

// ─── Main response generator ──────────────────────────────────────────────────
export async function generateAIResponse(
  message: string,
  resume: ResumeData | null,
  history: ChatMessage[],
  onChunk: (chunk: string) => void
): Promise<string> {
  const intent = detectIntent(message);

  let response: string;
  switch (intent) {
    case "greeting":
      response = generateGreeting(resume);
      break;
    case "salary":
      response = generateSalaryResponse(message, resume);
      break;
    case "skills":
      response = generateSkillsResponse(message, resume);
      break;
    case "roadmap":
      response = generateRoadmapResponse(message, resume);
      break;
    case "resume_analysis":
      response = generateResumeAnalysis(resume);
      break;
    case "interview":
      response = generateInterviewResponse();
      break;
    case "role_suggestion": {
      const role = Object.keys(ROLE_STACKS)[Math.floor(Math.random() * 3)];
      const info = ROLE_STACKS[role];
      response = `Based on your question, here's a role I'd suggest exploring:\n\n🎯 **${role}**\n💰 Salary: ${info.salary}\n📈 Demand: ${info.demand}\n\n**Core stack:**\n${info.stack.map((s) => `• ${s}`).join("\n")}\n\n${resume ? `Given your skills in ${resume.skills.slice(0, 3).join(", ")}, you'd likely qualify for mid-level positions immediately and could reach senior in 12-18 months.` : "Upload your resume for a more targeted role match."}`;
      break;
    }
    default:
      response = generateGeneralResponse(message, resume);
  }

  // Simulate streaming: emit chunks character by character with variable delay
  const words = response.split(" ");
  let fullText = "";
  for (let i = 0; i < words.length; i++) {
    const chunk = (i === 0 ? "" : " ") + words[i];
    fullText += chunk;
    onChunk(fullText);
    // Variable delay — faster for short words, slightly slower for long ones
    await new Promise((r) => setTimeout(r, 18 + Math.random() * 12));
  }

  return response;
}

// ─── Quick insight cards (generated after resume upload) ──────────────────────
export interface InsightCard {
  title: string;
  value: string;
  sub: string;
  color: string;
}

export function generateInsights(resume: ResumeData): InsightCard[] {
  const skillCount = resume.skills.length;
  const level = skillCount > 12 ? "Senior" : skillCount > 6 ? "Mid-level" : "Junior";
  const hasML = resume.skills.some((s) => ["Python", "PyTorch", "TensorFlow", "LangChain", "Machine Learning"].includes(s));
  const hasFrontend = resume.skills.some((s) => ["React", "Vue", "Angular", "Next.Js", "Typescript"].includes(s));
  const suggestedRole = hasML ? "ML / AI Engineer" : hasFrontend ? "Full-Stack Engineer" : "Backend Engineer";
  const roleInfo = ROLE_STACKS[suggestedRole] ?? ROLE_STACKS["Full-Stack Engineer"];
  const missingCount = MODERN_SKILLS.filter((s) => !resume.skills.some((r) => r.toLowerCase().includes(s.toLowerCase()))).length;

  return [
    {
      title: "Detected Level",
      value: level,
      sub: `${skillCount} skills identified`,
      color: "#4ADE80",
    },
    {
      title: "Best Role Match",
      value: suggestedRole,
      sub: `Demand: ${roleInfo.demand}`,
      color: "#60A5FA",
    },
    {
      title: "Salary Target",
      value: roleInfo.salary,
      sub: "Based on skills",
      color: "#FBbf24",
    },
    {
      title: "Skill Gaps",
      value: `${Math.min(missingCount, 8)} missing`,
      sub: "High-demand skills",
      color: "#F87171",
    },
  ];
}

// ─── Suggested prompts ────────────────────────────────────────────────────────
export const SUGGESTED_PROMPTS = [
  "What skills am I missing for a senior role?",
  "What's the salary range for a Full-Stack Engineer?",
  "Give me a 12-month career roadmap",
  "How should I prepare for system design interviews?",
  "Which role should I transition to next?",
  "Analyze my resume and give feedback",
];
