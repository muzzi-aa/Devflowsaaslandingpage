import { useState, useEffect, useRef } from "react";
import {
  X,
  CheckCircle2,
  Clock,
  Zap,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  PlayCircle,
  Lightbulb,
  Trophy,
  Code2,
} from "lucide-react";
import type { Challenge } from "../data/challenges";
import type { ChallengeProgress } from "../hooks/useChallengeStore";

interface Props {
  challenge: Challenge;
  progress: ChallengeProgress;
  onClose: () => void;
  onStart: () => void;
  onComplete: (code: string) => void;
  onSaveCode: (code: string) => void;
  onReset: () => void;
}

const DIFF_COLORS = {
  Easy:   { bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)",  text: "#4ADE80" },
  Medium: { bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)",  text: "#FBbf24" },
  Hard:   { bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)", text: "#F87171" },
};

const STORAGE_KEY = "coding-arena-split-width";
const DEFAULT_WIDTH = 50;
const MIN_WIDTH = 20;
const MAX_WIDTH = 80;

export function ChallengeModal({
  challenge,
  progress,
  onClose,
  onStart,
  onComplete,
  onSaveCode,
  onReset,
}: Props) {
  const [code, setCode]               = useState(progress.code ?? challenge.starterCode);
  const [hintsOpen, setHintsOpen]     = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [leftWidth, setLeftWidth]     = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseFloat(saved) : DEFAULT_WIDTH;
  });
  const [isDragging, setIsDragging]   = useState(false);
  const [isHoveringDivider, setIsHoveringDivider] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dc = DIFF_COLORS[challenge.difficulty];

  // Auto-save code
  useEffect(() => {
    const t = setTimeout(() => onSaveCode(code), 800);
    return () => clearTimeout(t);
  }, [code, onSaveCode]);

  // Focus textarea when modal opens
  useEffect(() => {
    if (progress.status !== "Not Started") textareaRef.current?.focus();
  }, [progress.status]);

  // Persist left panel width
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, leftWidth.toString());
  }, [leftWidth]);

  // Dragging logic
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      const clampedWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
      setLeftWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Tab key inside textarea
  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end   = el.selectionEnd;
      const newVal = code.substring(0, start) + "  " + code.substring(end);
      setCode(newVal);
      setTimeout(() => { el.selectionStart = el.selectionEnd = start + 2; }, 0);
    }
  };

  const handleStart = () => { onStart(); };

  const handleComplete = () => {
    onComplete(code);
    setShowSuccess(true);
  };

  const handleReset = () => {
    if (confirmReset) {
      setCode(challenge.starterCode);
      onReset();
      setConfirmReset(false);
      setShowSuccess(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
    }
  };

  const isNotStarted = progress.status === "Not Started";
  const isCompleted  = progress.status === "Completed";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full h-full flex flex-col overflow-hidden"
        style={{
          maxWidth: "96vw",
          maxHeight: "96vh",
          background: "rgba(15,19,24,0.98)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* ── SUCCESS OVERLAY ── */}
        {showSuccess && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5"
            style={{ background: "rgba(10,14,18,0.96)", borderRadius: 20 }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "rgba(74,222,128,0.12)", border: "2px solid rgba(74,222,128,0.4)" }}
            >
              <Trophy className="w-10 h-10" style={{ color: "#4ADE80" }} />
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-2xl mb-1">Challenge Completed!</p>
              <p className="text-[#9AA4B2] text-sm">+{challenge.xp} XP earned</p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm"
              style={{ background: "linear-gradient(90deg,#00FF94,#00CFFF)", color: "#0A1015" }}
            >
              Back to Arena
            </button>
          </div>
        )}

        {/* ── HEADER ── */}
        <div
          className="flex items-start justify-between px-7 py-5 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: dc.bg, border: `1px solid ${dc.border}`, color: dc.text }}
              >
                {challenge.difficulty}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9AA4B2" }}
              >
                {challenge.category}
              </span>
              {isCompleted && (
                <span
                  className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ADE80" }}
                >
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              )}
            </div>
            <h2 className="text-white font-bold" style={{ fontSize: 20 }}>{challenge.title}</h2>
            <div className="flex items-center gap-4 text-xs text-[#9AA4B2]">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{challenge.timeEstimate}</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" />+{challenge.xp} XP</span>
              {challenge.tags.map((tag) => (
                <span key={tag} className="opacity-60">#{tag}</span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 mt-0.5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
          >
            <X className="w-4 h-4 text-[#9AA4B2]" />
          </button>
        </div>

        {/* ── BODY ── */}
        <div
          ref={containerRef}
          className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0"
          style={{ cursor: isDragging ? "col-resize" : "default", userSelect: isDragging ? "none" : "auto" }}
        >
          {/* LEFT: Problem Description */}
          <div
            className="flex flex-col gap-5 px-7 py-6 overflow-y-auto shrink-0"
            style={{ width: `${leftWidth}%` }}
          >
            {/* Description */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#9AA4B2] font-semibold mb-2">Description</p>
              <p className="text-[#D1D5DB] text-sm leading-relaxed">{challenge.longDescription}</p>
            </div>

            {/* Examples */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#9AA4B2] font-semibold mb-3">Examples</p>
              <div className="flex flex-col gap-3">
                {challenge.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p className="text-xs text-[#9AA4B2] mb-1">
                      <span className="text-[#4ADE80]">Input: </span>
                      <code className="font-mono">{ex.input}</code>
                    </p>
                    <p className="text-xs text-[#9AA4B2] mb-1">
                      <span className="text-[#00CFFF]">Output: </span>
                      <code className="font-mono">{ex.output}</code>
                    </p>
                    {ex.explanation && (
                      <p className="text-xs text-[#6B7280] mt-1.5 italic">{ex.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Hints */}
            <div>
              <button
                onClick={() => setHintsOpen((v) => !v)}
                className="flex items-center gap-2 text-sm font-medium transition-colors w-full"
                style={{ color: hintsOpen ? "#FBbf24" : "#9AA4B2" }}
              >
                <Lightbulb className="w-4 h-4" />
                Hints ({challenge.hints.length})
                {hintsOpen ? <ChevronUp className="w-3.5 h-3.5 ml-auto" /> : <ChevronDown className="w-3.5 h-3.5 ml-auto" />}
              </button>
              {hintsOpen && (
                <div className="flex flex-col gap-2 mt-3">
                  {challenge.hints.map((h, i) => (
                    <div
                      key={i}
                      className="flex gap-2.5 p-3 rounded-lg text-xs text-[#D1D5DB] leading-relaxed"
                      style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}
                    >
                      <span className="text-yellow-400 font-bold shrink-0">{i + 1}.</span>
                      {h}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* DRAGGABLE DIVIDER */}
          <div
            onMouseDown={() => setIsDragging(true)}
            onMouseEnter={() => setIsHoveringDivider(true)}
            onMouseLeave={() => setIsHoveringDivider(false)}
            className="shrink-0 relative group cursor-col-resize"
            style={{
              width: 5,
              background: isHoveringDivider || isDragging
                ? "rgba(16,185,129,0.3)"
                : "rgba(255,255,255,0.05)",
              transition: "background 200ms ease",
            }}
          >
            <div
              className="absolute inset-y-0 -left-1 -right-1"
              style={{ width: 12, left: -3.5 }}
            />
            {(isHoveringDivider || isDragging) && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1.5 py-3 rounded-lg"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  border: "1px solid rgba(16,185,129,0.4)",
                  boxShadow: "0 0 20px rgba(16,185,129,0.2)",
                }}
              >
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-6 bg-white/40 rounded-full" />
                  <div className="w-0.5 h-6 bg-white/40 rounded-full" />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Code Editor */}
          <div className="flex flex-col flex-1 overflow-hidden min-h-0" style={{ width: `${100 - leftWidth}%` }}>
            {/* Editor header */}
            <div
              className="flex items-center justify-between px-5 py-3 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-[#9AA4B2]" />
                <span className="text-xs font-medium text-[#9AA4B2]">solution.js</span>
                {progress.status === "In Progress" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                )}
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                style={{ color: confirmReset ? "#F87171" : "#9AA4B2" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = confirmReset ? "#F87171" : "#E5E7EB")}
                onMouseLeave={(e) => (e.currentTarget.style.color = confirmReset ? "#F87171" : "#9AA4B2")}
              >
                <RotateCcw className="w-3 h-3" />
                {confirmReset ? "Confirm Reset?" : "Reset"}
              </button>
            </div>

            {/* Code area */}
            <div className="relative flex-1 overflow-hidden">
              {isNotStarted && (
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
                  style={{ background: "rgba(10,14,18,0.85)", backdropFilter: "blur(4px)" }}
                >
                  <PlayCircle className="w-12 h-12 text-[#4ADE80]" style={{ opacity: 0.7 }} />
                  <div className="text-center">
                    <p className="text-white font-semibold mb-1">Ready to start?</p>
                    <p className="text-[#9AA4B2] text-sm">Click the button below to begin coding.</p>
                  </div>
                </div>
              )}
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleTab}
                disabled={isNotStarted}
                spellCheck={false}
                className="w-full h-full resize-none outline-none text-sm leading-relaxed p-5"
                style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  background: "transparent",
                  color: "#E2E8F0",
                  caretColor: "#4ADE80",
                  minHeight: 220,
                }}
                placeholder={challenge.starterCode}
              />
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div
          className="flex items-center justify-between px-7 py-4 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}
        >
          <p className="text-xs text-[#4B5563]">
            {isCompleted
              ? `Completed ${progress.completedAt ? new Date(progress.completedAt).toLocaleDateString() : ""}`
              : isNotStarted
              ? "Start the challenge to unlock the code editor."
              : "Auto-saving your code…"}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{ color: "#9AA4B2" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E5E7EB")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9AA4B2")}
            >
              Close
            </button>
            {isNotStarted && (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
                style={{ background: "linear-gradient(90deg,#00FF94,#00CFFF)", color: "#0A1015" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <PlayCircle className="w-4 h-4" />
                Start Challenge
              </button>
            )}
            {progress.status === "In Progress" && (
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
                style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ADE80" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(74,222,128,0.2)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(74,222,128,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(74,222,128,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark as Completed
              </button>
            )}
            {isCompleted && (
              <div
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold"
                style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ADE80" }}
              >
                <Trophy className="w-4 h-4" />
                Solution Submitted
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
