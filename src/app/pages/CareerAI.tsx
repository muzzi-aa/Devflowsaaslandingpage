import { useRef, useState } from "react";
import {
  Lightbulb,
  Sparkles,
  Upload,
  FileText,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
  TrendingUp,
  Target,
  DollarSign,
  Zap,
  RotateCcw,
  MessageSquare,
  ChevronRight,
  Brain,
  Map,
  Star,
  Briefcase,
} from "lucide-react";
import { useCareerAI } from "../hooks/useCareerAI";
import { CareerChatModal } from "../components/CareerChatModal";
import { SUGGESTED_PROMPTS } from "../data/careerAIEngine";

// ─── Design tokens ────────────────────────────────────────────────────────────
const E = {
  bright: "#10B981",
  light:  "#34D399",
  mid:    "#166534",
  dark:   "#14532D",
};

const INSIGHT_ICONS = [TrendingUp, Target, DollarSign, Zap];

// ─── Quick question icons ─────────────────────────────────────────────────────
const QUICK_ICONS = [Star, DollarSign, Map, Brain, Briefcase, FileText];

export default function CareerAI() {
  const {
    messages,
    resume,
    insights,
    uploadState,
    uploadError,
    aiState,
    aiError,
    streamingId,
    usageCount,
    freeLimit,
    sendMessage,
    uploadResume,
    clearResume,
    clearChat,
    resetUsage,
  } = useCareerAI();

  const [chatOpen, setChatOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    uploadResume(files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const openChatWith = (prompt?: string) => {
    setChatOpen(true);
    if (prompt) setTimeout(() => sendMessage(prompt), 50);
  };

  const remaining = freeLimit - usageCount;
  const isLimited = usageCount >= freeLimit;

  return (
    <>
      {/* Global styles */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(16,185,129,0.2); }
          50% { box-shadow: 0 0 40px rgba(16,185,129,0.4); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {chatOpen && (
        <CareerChatModal
          messages={messages}
          aiState={aiState}
          aiError={aiError}
          streamingId={streamingId}
          usageCount={usageCount}
          freeLimit={freeLimit}
          onSend={sendMessage}
          onClear={clearChat}
          onClose={() => setChatOpen(false)}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        {/* ── Page header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <Lightbulb size={13} color={E.bright} />
              <span style={{ color: E.bright, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>CAREER AI</span>
            </div>
            <h1 style={{ color: "#F0FDF4", fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 6, display: "flex", alignItems: "center", gap: 12 }}>
              Career AI
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 800, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: E.bright }}>
                <Sparkles size={11} />
                Pro
              </span>
            </h1>
            <p style={{ color: "#475569", fontSize: 14 }}>
              Get personalized insights on your{" "}
              <span style={{ color: E.light, fontWeight: 700 }}>engineering career</span> path.
            </p>
          </div>

          {/* Usage counter */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 10,
              background: isLimited ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.07)",
              border: isLimited ? "1px solid rgba(239,68,68,0.22)" : "1px solid rgba(16,185,129,0.18)",
            }}>
              <Sparkles size={13} color={isLimited ? "#EF4444" : E.bright} />
              <span style={{ color: isLimited ? "#EF4444" : E.light, fontSize: 12, fontWeight: 700 }}>
                {isLimited ? "Limit reached" : `${remaining}/${freeLimit} free queries`}
              </span>
            </div>
            {usageCount > 0 && (
              <button
                onClick={resetUsage}
                title="Reset usage (demo)"
                style={{
                  width: 36, height: 36, borderRadius: 9, border: "1px solid rgba(16,185,129,0.12)",
                  background: "rgba(16,185,129,0.05)", color: "#475569",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 180ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.1)"; e.currentTarget.style.color = E.bright; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.05)"; e.currentTarget.style.color = "#475569"; }}
              >
                <RotateCcw size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ── Main grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }}>

          {/* ════ LEFT: Main card ════ */}
          <div
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "56px 48px", borderRadius: 20,
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(16,185,129,0.12)",
              minHeight: 420,
              boxShadow: "0 4px 32px rgba(0,0,0,0.3), 0 0 60px rgba(16,185,129,0.04)",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Subtle background glow */}
            <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

            {uploadState === "idle" || uploadState === "error" ? (
              <>
                {/* Lightbulb icon */}
                <div style={{
                  width: 72, height: 72, borderRadius: 20, marginBottom: 24, flexShrink: 0,
                  background: `linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.08))`,
                  border: "1px solid rgba(16,185,129,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "float 4s ease-in-out infinite",
                  boxShadow: "0 0 32px rgba(16,185,129,0.15)",
                }}>
                  <Lightbulb size={34} color={E.bright} strokeWidth={1.75} />
                </div>

                <h3 style={{ color: "#F0FDF4", fontWeight: 900, fontSize: 22, letterSpacing: "-0.02em", marginBottom: 10, textAlign: "center" }}>
                  AI Career Coach
                </h3>
                <p style={{ color: "#475569", fontSize: 14, textAlign: "center", maxWidth: 420, lineHeight: 1.7, marginBottom: 28 }}>
                  Upload your resume and get AI-driven suggestions for the next tech stack to learn to optimize your compensation and job title.
                </p>

                {/* Upload error */}
                {uploadState === "error" && uploadError && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 10, fontSize: 13, marginBottom: 20, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", color: "#EF4444" }}>
                    <AlertCircle size={14} style={{ flexShrink: 0 }} />
                    {uploadError}
                  </div>
                )}

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
                  <button
                    onClick={() => openChatWith()}
                    style={{
                      padding: "12px 26px", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer",
                      background: `linear-gradient(135deg, ${E.mid}, ${E.bright})`,
                      border: "1px solid rgba(16,185,129,0.4)", color: "#F0FDF4",
                      transition: "all 220ms ease",
                      display: "flex", alignItems: "center", gap: 8,
                      boxShadow: "0 0 24px rgba(16,185,129,0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${E.bright}, ${E.light})`;
                      e.currentTarget.style.boxShadow = "0 0 36px rgba(16,185,129,0.35)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${E.mid}, ${E.bright})`;
                      e.currentTarget.style.boxShadow = "0 0 24px rgba(16,185,129,0.2)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <MessageSquare size={15} strokeWidth={2} />
                    Chat with Career AI
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: "12px 26px", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer",
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#94A3B8",
                      transition: "all 220ms ease",
                      display: "flex", alignItems: "center", gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(16,185,129,0.06)";
                      e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)";
                      e.currentTarget.style.color = E.light;
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.color = "#94A3B8";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <Upload size={15} strokeWidth={2} />
                    Upload Resume
                  </button>
                </div>

                {/* Drag-and-drop zone */}
                <div
                  style={{
                    width: "100%", maxWidth: 440,
                    border: `2px dashed ${dragOver ? E.bright : "rgba(16,185,129,0.2)"}`,
                    borderRadius: 14, padding: "24px 16px", textAlign: "center",
                    cursor: "pointer", transition: "all 220ms ease",
                    background: dragOver ? "rgba(16,185,129,0.05)" : "transparent",
                    boxShadow: dragOver ? "0 0 24px rgba(16,185,129,0.1)" : "none",
                  }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={20} style={{ margin: "0 auto 10px", color: dragOver ? E.bright : "#334155", transition: "color 200ms" }} />
                  <p style={{ color: dragOver ? E.light : "#475569", fontSize: 13, fontWeight: 600, marginBottom: 5, transition: "color 200ms" }}>
                    {dragOver ? "Drop your resume here" : "or drag & drop your resume"}
                  </p>
                  <p style={{ color: "#1E293B", fontSize: 11 }}>Supports PDF, DOCX, TXT · Max 5 MB</p>
                </div>
              </>
            ) : uploadState === "uploading" ? (
              /* ── Uploading state ── */
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center", animation: "glow-pulse 2s ease-in-out infinite" }}>
                  <Loader2 size={30} color={E.bright} style={{ animation: "spin 1s linear infinite" }} />
                </div>
                <p style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 16 }}>Analyzing your resume…</p>
                <p style={{ color: "#475569", fontSize: 13, textAlign: "center" }}>Extracting skills, experience, and education data</p>
              </div>
            ) : (
              /* ── Resume loaded ── */
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                {/* File pill */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderRadius: 12, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.22)" }}>
                  <FileText size={18} color={E.bright} style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "#F0FDF4", fontWeight: 700, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resume?.fileName}</p>
                    <p style={{ color: "#334155", fontSize: 12, marginTop: 2 }}>
                      {resume?.skills.length} skills · {resume?.experience.length} exp · uploaded{" "}
                      {resume?.uploadedAt ? new Date(resume.uploadedAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                  <button
                    onClick={clearResume}
                    title="Remove resume"
                    style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.06)", border: "none", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 160ms" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.color = "#EF4444"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#475569"; }}
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* Skill chips */}
                {resume && resume.skills.length > 0 && (
                  <div style={{ width: "100%" }}>
                    <p style={{ color: "#334155", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8 }}>DETECTED SKILLS</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {resume.skills.slice(0, 14).map((skill) => (
                        <span key={skill} style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: E.light }}>{skill}</span>
                      ))}
                      {resume.skills.length > 14 && (
                        <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, color: "#334155" }}>+{resume.skills.length - 14} more</span>
                      )}
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                  <button
                    onClick={() => openChatWith("Analyze my resume and give feedback")}
                    style={{
                      padding: "12px 24px", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer",
                      background: `linear-gradient(135deg, ${E.mid}, ${E.bright})`,
                      border: "1px solid rgba(16,185,129,0.4)", color: "#F0FDF4",
                      display: "flex", alignItems: "center", gap: 8, transition: "all 220ms",
                      boxShadow: "0 0 20px rgba(16,185,129,0.2)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${E.bright}, ${E.light})`; e.currentTarget.style.boxShadow = "0 0 32px rgba(16,185,129,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${E.mid}, ${E.bright})`; e.currentTarget.style.boxShadow = "0 0 20px rgba(16,185,129,0.2)"; }}
                  >
                    <CheckCircle2 size={15} strokeWidth={2.5} />
                    Get Full Analysis
                  </button>
                  <button
                    onClick={() => openChatWith()}
                    style={{
                      padding: "12px 24px", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer",
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#94A3B8",
                      display: "flex", alignItems: "center", gap: 8, transition: "all 220ms",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.06)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.22)"; e.currentTarget.style.color = E.light; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#94A3B8"; }}
                  >
                    <MessageSquare size={15} strokeWidth={2} />
                    Chat with Career AI
                  </button>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{ fontSize: 12, color: "#334155", background: "none", border: "none", cursor: "pointer", transition: "color 160ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#64748B")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
                >
                  Replace resume
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              style={{ display: "none" }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {/* ════ RIGHT: Sidebar ════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Insight cards — shown after upload */}
            {insights.length > 0 && (
              <div style={{ padding: "20px", borderRadius: 16, background: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.12)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
                  <Sparkles size={12} color={E.bright} />
                  <span style={{ color: "#334155", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em" }}>PERSONALIZED INSIGHTS</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {insights.map((ins, i) => {
                    const Icon = INSIGHT_ICONS[i] ?? TrendingUp;
                    return (
                      <div key={ins.title} style={{ padding: "12px", borderRadius: 10, background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.1)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                          <Icon size={12} color={ins.color} />
                          <span style={{ fontSize: 10, fontWeight: 700, color: "#334155", letterSpacing: "0.05em" }}>{ins.title}</span>
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 800, color: ins.color, lineHeight: 1.2, marginBottom: 3 }}>{ins.value}</p>
                        <p style={{ fontSize: 10, color: "#1E293B" }}>{ins.sub}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Questions panel */}
            <div style={{ padding: "20px", borderRadius: 16, background: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.12)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
              {/* Panel header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MessageSquare size={13} color={E.bright} />
                  </div>
                  <span style={{ color: "#F0FDF4", fontSize: 13, fontWeight: 800 }}>Quick Questions</span>
                </div>
                <span style={{ padding: "2px 9px", borderRadius: 99, fontSize: 10, fontWeight: 800, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)", color: E.bright }}>
                  {SUGGESTED_PROMPTS.length}
                </span>
              </div>

              {/* Prompt cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {SUGGESTED_PROMPTS.map((p, i) => {
                  const Icon = QUICK_ICONS[i % QUICK_ICONS.length];
                  return (
                    <button
                      key={p}
                      onClick={() => openChatWith(p)}
                      disabled={isLimited}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "11px 13px", borderRadius: 10, textAlign: "left",
                        background: "rgba(15,23,42,0.7)",
                        border: "1px solid rgba(16,185,129,0.08)",
                        color: isLimited ? "#1E293B" : "#475569",
                        cursor: isLimited ? "not-allowed" : "pointer",
                        fontSize: 13, fontWeight: 500, lineHeight: 1.4,
                        transition: "all 160ms ease", width: "100%",
                      }}
                      onMouseEnter={(e) => {
                        if (!isLimited) {
                          e.currentTarget.style.borderColor = "rgba(16,185,129,0.22)";
                          e.currentTarget.style.background = "rgba(16,185,129,0.05)";
                          e.currentTarget.style.color = "#94A3B8";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(16,185,129,0.08)";
                        e.currentTarget.style.background = "rgba(15,23,42,0.7)";
                        e.currentTarget.style.color = isLimited ? "#1E293B" : "#475569";
                      }}
                    >
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: isLimited ? "rgba(255,255,255,0.02)" : "rgba(16,185,129,0.08)", border: `1px solid ${isLimited ? "rgba(255,255,255,0.04)" : "rgba(16,185,129,0.14)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={12} color={isLimited ? "#1E293B" : E.bright} strokeWidth={1.75} />
                      </div>
                      <span style={{ flex: 1 }}>{p}</span>
                      {!isLimited && (
                        <ChevronRight size={12} color="#1E293B" style={{ flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Limit reached notice */}
              {isLimited && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", fontSize: 12, color: "#EF4444" }}>
                  <AlertCircle size={13} style={{ flexShrink: 0 }} />
                  Free limit reached. Upgrade to Pro or reset for demo.
                </div>
              )}
            </div>

            {/* Continue conversation badge */}
            {messages.length > 0 && (
              <button
                onClick={() => setChatOpen(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14,
                  background: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.12)",
                  cursor: "pointer", transition: "all 200ms", width: "100%", textAlign: "left",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.28)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(16,185,129,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MessageSquare size={16} color={E.bright} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "#F0FDF4", fontWeight: 700, fontSize: 13 }}>Continue conversation</p>
                  <p style={{ color: "#334155", fontSize: 11, marginTop: 2 }}>
                    {messages.length} message{messages.length !== 1 ? "s" : ""} · {usageCount}/{freeLimit} used
                  </p>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: E.bright, flexShrink: 0 }}>
                  {messages.filter((m) => m.role === "assistant").length}
                </div>
              </button>
            )}

            {/* Bottom tip card */}
            <div style={{
              padding: "16px 18px", borderRadius: 14,
              background: `linear-gradient(135deg, rgba(20,83,45,0.4) 0%, rgba(22,101,52,0.2) 100%)`,
              border: "1px solid rgba(16,185,129,0.15)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                <Sparkles size={12} color={E.bright} />
                <span style={{ color: E.bright, fontSize: 11, fontWeight: 800, letterSpacing: "0.06em" }}>PRO TIP</span>
              </div>
              <p style={{ color: "#64748B", fontSize: 12, lineHeight: 1.6 }}>
                Upload your resume first — Career AI can give much more targeted advice when it knows your experience and current tech stack.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
