import { useState, useCallback, useEffect } from "react";
import {
  generateAIResponse,
  parseResumeText,
  generateInsights,
  type ResumeData,
  type ChatMessage,
  type InsightCard,
} from "../data/careerAIEngine";

const STORAGE_CHAT    = "devflow_career_ai_chat";
const STORAGE_RESUME  = "devflow_career_ai_resume";
const STORAGE_USAGE   = "devflow_career_ai_usage";
const FREE_LIMIT      = 5;

function loadChat(): ChatMessage[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_CHAT) ?? "[]"); } catch { return []; }
}
function loadResume(): ResumeData | null {
  try { return JSON.parse(localStorage.getItem(STORAGE_RESUME) ?? "null"); } catch { return null; }
}
function loadUsage(): number {
  try { return parseInt(localStorage.getItem(STORAGE_USAGE) ?? "0", 10); } catch { return 0; }
}

export type UploadState = "idle" | "uploading" | "success" | "error";
export type AIState     = "idle" | "thinking" | "streaming" | "error";

export function useCareerAI() {
  const [messages,       setMessages]       = useState<ChatMessage[]>(loadChat);
  const [resume,         setResume]         = useState<ResumeData | null>(loadResume);
  const [insights,       setInsights]       = useState<InsightCard[]>(() => {
    const r = loadResume();
    return r ? generateInsights(r) : [];
  });
  const [uploadState,    setUploadState]    = useState<UploadState>("idle");
  const [uploadError,    setUploadError]    = useState<string | null>(null);
  const [aiState,        setAIState]        = useState<AIState>("idle");
  const [aiError,        setAIError]        = useState<string | null>(null);
  const [streamingId,    setStreamingId]    = useState<string | null>(null);
  const [usageCount,     setUsageCount]     = useState<number>(loadUsage);

  // Persist whenever state changes
  useEffect(() => {
    try { localStorage.setItem(STORAGE_CHAT, JSON.stringify(messages)); } catch { /* ignore */ }
  }, [messages]);

  useEffect(() => {
    if (resume) {
      try { localStorage.setItem(STORAGE_RESUME, JSON.stringify(resume)); } catch { /* ignore */ }
    }
  }, [resume]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_USAGE, String(usageCount)); } catch { /* ignore */ }
  }, [usageCount]);

  // ── Resume upload ─────────────────────────────────────────────────────────
  const uploadResume = useCallback(async (file: File) => {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!allowed.includes(file.type) && !["pdf", "docx", "txt"].includes(ext ?? "")) {
      setUploadError("Invalid file type. Please upload a PDF, DOCX, or TXT file.");
      setUploadState("error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File too large. Maximum size is 5 MB.");
      setUploadState("error");
      return;
    }

    setUploadState("uploading");
    setUploadError(null);

    try {
      let text = "";

      if (file.type === "text/plain" || ext === "txt") {
        // Real text extraction
        text = await file.text();
      } else {
        // For PDF/DOCX: simulate extraction with a placeholder message
        // In production, use pdfjs-dist or a server-side parser
        await new Promise((r) => setTimeout(r, 1200)); // simulate processing
        text = `${file.name}\n\nSkills: JavaScript, TypeScript, React, Node.js, PostgreSQL, Docker\n\nExperience:\n2022 - Present: Senior Frontend Engineer at TechCorp\n2020 - 2022: Software Engineer at StartupXYZ\n\nEducation:\nB.S. Computer Science, University of Technology, 2020`;
      }

      const parsed = parseResumeText(text, file.name);

      // Ensure we have at least some skills for binary files
      if (parsed.skills.length === 0 && (ext === "pdf" || ext === "docx")) {
        // Fallback simulated skills for demo
        parsed.skills = ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "Git"];
        parsed.experience = ["2022 - Present: Software Engineer"];
      }

      setResume(parsed);
      setInsights(generateInsights(parsed));
      setUploadState("success");

      // Auto-add assistant message about the upload
      const sysMsg: ChatMessage = {
        id: `sys-${Date.now()}`,
        role: "assistant",
        content: `I've loaded your resume **${file.name}**.\n\nHere's what I found:\n• **${parsed.skills.length} skills** detected: ${parsed.skills.slice(0, 5).join(", ")}${parsed.skills.length > 5 ? `, +${parsed.skills.length - 5} more` : ""}\n• **Experience entries:** ${parsed.experience.length}\n• **Education:** ${parsed.education.length} records\n\nI'll use this context for all future responses. What would you like to explore first — skill gaps, salary benchmarks, or a career roadmap?`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, sysMsg]);
    } catch (err) {
      setUploadError("Failed to read the file. Please try again.");
      setUploadState("error");
    }
  }, []);

  const clearResume = useCallback(() => {
    setResume(null);
    setInsights([]);
    setUploadState("idle");
    setUploadError(null);
    try { localStorage.removeItem(STORAGE_RESUME); } catch { /* ignore */ }
  }, []);

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || aiState === "streaming" || aiState === "thinking") return;

    // Usage limit check
    if (usageCount >= FREE_LIMIT) {
      setAIError(`You've used all ${FREE_LIMIT} free queries. Upgrade to Pro for unlimited Career AI access.`);
      return;
    }

    setAIError(null);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Placeholder assistant message for streaming
    const assistantId = `a-${Date.now()}`;
    setStreamingId(assistantId);
    setAIState("thinking");

    // Short "thinking" delay
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    const placeholderMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, placeholderMsg]);
    setAIState("streaming");

    try {
      await generateAIResponse(
        content,
        resume,
        messages,
        (streamedText) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: streamedText } : m))
          );
        }
      );

      setUsageCount((u) => u + 1);
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "I encountered an error processing your request. Please try again." }
            : m
        )
      );
      setAIState("error");
    } finally {
      setAIState("idle");
      setStreamingId(null);
    }
  }, [aiState, resume, messages, usageCount]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setAIState("idle");
    setAIError(null);
    try { localStorage.removeItem(STORAGE_CHAT); } catch { /* ignore */ }
  }, []);

  const resetUsage = useCallback(() => {
    setUsageCount(0);
    setAIError(null);
  }, []);

  return {
    messages,
    resume,
    insights,
    uploadState,
    uploadError,
    aiState,
    aiError,
    streamingId,
    usageCount,
    freeLimit: FREE_LIMIT,
    sendMessage,
    uploadResume,
    clearResume,
    clearChat,
    resetUsage,
  };
}
