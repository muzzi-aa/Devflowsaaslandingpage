import { useState, useRef } from "react";
import {
  Map,
  Flag,
  CheckCircle2,
  Search,
  Plus,
  X,
  ChevronDown,
  Zap,
  RotateCcw,
  RefreshCw,
  SlidersHorizontal,
  Trophy,
  Clock,
  BookOpen,
  Navigation,
  Layers,
} from "lucide-react";
import { useRoadmap } from "../hooks/useRoadmap";
import {
  statusLabel,
  connectorColor,
  titleColor,
  formatDate,
  highlightMatch,
  CATEGORY_META,
  type RoadmapStep,
  type RoadmapCategory,
} from "../data/roadmapEngine";

// ─── Design tokens ────────────────────────────────────────────────────────────
const E = {
  bright: "#10B981",
  light:  "#34D399",
  mid:    "#166534",
  dark:   "#14532D",
};

// ─── Highlighted search text ──────────────────────────────────────────────────
function Highlighted({ text, query }: { text: string; query: string }) {
  const parts = highlightMatch(text, query);
  return (
    <>
      {parts.map((p, i) =>
        p.isMatch ? (
          <mark key={i} style={{ background: "rgba(16,185,129,0.22)", color: E.light, borderRadius: 3, padding: "0 2px" }}>
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </>
  );
}

// ─── Add step modal ───────────────────────────────────────────────────────────
function AddStepModal({ onAdd, onClose }: { onAdd: (t: string, d: string, c: RoadmapCategory) => void; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc]   = useState("");
  const [cat, setCat]     = useState<RoadmapCategory>("core");

  const submit = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), desc.trim() || `Study and practice ${title.trim()}.`, cat);
    onClose();
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: "100%", maxWidth: 460, borderRadius: 20, border: "1px solid rgba(16,185,129,0.15)", padding: 28, background: "#0F1929", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(16,185,129,0.08)" }}>
        {/* Modal header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plus size={15} color={E.bright} />
            </div>
            <h3 style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em" }}>Add Roadmap Step</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#334155", cursor: "pointer", display: "flex", alignItems: "center", transition: "color 150ms", padding: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Title */}
          <div>
            <label style={{ display: "block", color: "#475569", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 7 }}>TITLE *</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              placeholder="e.g. Master GraphQL"
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 13, outline: "none", transition: "border-color 180ms", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(16,185,129,0.12)", color: "#F0FDF4", caretColor: E.bright, boxSizing: "border-box" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.12)")}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: "block", color: "#475569", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 7 }}>DESCRIPTION</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What will you learn or build?"
              rows={3}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 13, outline: "none", resize: "none", transition: "border-color 180ms", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(16,185,129,0.12)", color: "#F0FDF4", caretColor: E.bright, boxSizing: "border-box" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.12)")}
            />
          </div>

          {/* Category */}
          <div>
            <label style={{ display: "block", color: "#475569", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 7 }}>CATEGORY</label>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {(["core", "infrastructure", "architecture", "soft"] as RoadmapCategory[]).map((c) => {
                const m = CATEGORY_META[c];
                return (
                  <button key={c} onClick={() => setCat(c)} style={{
                    padding: "6px 13px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 150ms",
                    background: cat === c ? m.bg : "rgba(255,255,255,0.03)",
                    border: cat === c ? `1px solid ${m.color}` : "1px solid rgba(255,255,255,0.07)",
                    color: cat === c ? m.color : "#475569",
                  }}>
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 160ms",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#475569",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#94A3B8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#475569"; }}
          >
            Cancel
          </button>
          <button onClick={submit} disabled={!title.trim()} style={{
            flex: 1, padding: "11px", borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: title.trim() ? "pointer" : "not-allowed", transition: "all 160ms",
            background: title.trim() ? `linear-gradient(135deg, ${E.dark}, ${E.bright})` : "rgba(255,255,255,0.04)",
            border: title.trim() ? "1px solid rgba(16,185,129,0.3)" : "1px solid transparent",
            color: title.trim() ? "#F0FDF4" : "#334155",
            boxShadow: title.trim() ? "0 4px 16px rgba(16,185,129,0.2)" : "none",
          }}
            onMouseEnter={(e) => { if (title.trim()) { e.currentTarget.style.background = `linear-gradient(135deg, ${E.mid}, ${E.light})`; e.currentTarget.style.boxShadow = "0 4px 24px rgba(16,185,129,0.3)"; } }}
            onMouseLeave={(e) => { if (title.trim()) { e.currentTarget.style.background = `linear-gradient(135deg, ${E.dark}, ${E.bright})`; e.currentTarget.style.boxShadow = "0 4px 16px rgba(16,185,129,0.2)"; } }}
          >
            Add Step
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Progress slider ──────────────────────────────────────────────────────────
function ProgressSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, position: "relative" }}>
        <input
          type="range" min={0} max={100} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ width: "100%", accentColor: E.bright, cursor: "pointer" }}
        />
      </div>
      <span style={{ color: E.light, fontSize: 12, fontWeight: 800, minWidth: 36, textAlign: "right" }}>{value}%</span>
    </div>
  );
}

// ─── Status ring styles ───────────────────────────────────────────────────────
function StatusNode({ status, onClick }: { status: RoadmapStep["status"]; onClick: () => void }) {
  const styles: Record<string, { border: string; bg: string; glow: string; icon: React.ReactNode }> = {
    completed: {
      border: E.bright,
      bg: "rgba(16,185,129,0.15)",
      glow: "0 0 16px rgba(16,185,129,0.35)",
      icon: <CheckCircle2 size={14} color={E.bright} />,
    },
    current: {
      border: "#60A5FA",
      bg: "rgba(96,165,250,0.12)",
      glow: "0 0 14px rgba(96,165,250,0.3)",
      icon: <Map size={14} color="#60A5FA" />,
    },
    todo: {
      border: "rgba(255,255,255,0.1)",
      bg: "rgba(255,255,255,0.03)",
      glow: "none",
      icon: <Flag size={13} color="#334155" />,
    },
    planned: {
      border: "rgba(255,255,255,0.07)",
      bg: "rgba(255,255,255,0.02)",
      glow: "none",
      icon: <Flag size={13} color="#1E293B" />,
    },
  };
  const s = styles[status] ?? styles.planned;
  return (
    <button
      onClick={onClick}
      style={{
        width: 34, height: 34, borderRadius: "50%", border: `2px solid ${s.border}`,
        background: s.bg, boxShadow: s.glow, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 200ms", flexShrink: 0,
      }}
    >
      {s.icon}
    </button>
  );
}

// ─── Single roadmap item ──────────────────────────────────────────────────────
function RoadmapItem({
  step, index, isLast, searchQuery,
  onMarkComplete, onStart, onProgressChange, onRemove,
}: {
  step: RoadmapStep; index: number; isLast: boolean; searchQuery: string;
  onMarkComplete: (id: number) => void; onStart: (id: number) => void;
  onProgressChange: (id: number, pct: number) => void; onRemove: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const catMeta = CATEGORY_META[step.category];

  const dateLabel =
    step.status === "completed" && step.endDate ? formatDate(step.endDate)
    : step.status === "current" ? "In Progress"
    : step.status === "todo" ? "Up Next"
    : "Planned";

  const lineColor = connectorColor(step.status);

  const isCurrent   = step.status === "current";
  const isCompleted = step.status === "completed";
  const isTodo      = step.status === "todo" || step.status === "planned";

  return (
    <div style={{ display: "flex", gap: 0 }}>
      {/* ── Left timeline column ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 50, flexShrink: 0 }}>
        <StatusNode status={step.status} onClick={() => setExpanded((v) => !v)} />
        {!isLast && (
          <div style={{
            width: 2, flexGrow: 1, minHeight: 28, marginTop: 4, marginBottom: 4,
            background: isCompleted
              ? `linear-gradient(180deg, ${E.bright}55, ${E.bright}22)`
              : isCurrent
              ? "linear-gradient(180deg, rgba(96,165,250,0.4), rgba(96,165,250,0.1))"
              : "rgba(255,255,255,0.05)",
            borderRadius: 99,
          }} />
        )}
      </div>

      {/* ── Right content column ── */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 24, paddingTop: 3 }}>
        {/* Header row */}
        <button style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: 0 }} onClick={() => setExpanded((v) => !v)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                <h3 style={{
                  fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em",
                  color: isCompleted ? E.bright : isCurrent ? "#F0FDF4" : "#475569",
                  textDecoration: isCompleted ? "none" : "none",
                }}>
                  <Highlighted text={step.title} query={searchQuery} />
                </h3>
                {/* Category badge */}
                <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 800, background: catMeta.bg, color: catMeta.color, border: `1px solid ${catMeta.color}33`, letterSpacing: "0.04em" }}>
                  {catMeta.label}
                </span>
                {/* Status badge */}
                {isCompleted && (
                  <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 800, background: "rgba(16,185,129,0.1)", color: E.bright, border: "1px solid rgba(16,185,129,0.25)" }}>
                    ✓ Finished
                  </span>
                )}
                {isCurrent && (
                  <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 800, background: "rgba(96,165,250,0.1)", color: "#60A5FA", border: "1px solid rgba(96,165,250,0.25)", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#60A5FA", display: "inline-block", boxShadow: "0 0 6px #60A5FA" }} />
                    Working on it
                  </span>
                )}
              </div>
              <p style={{ color: "#1E293B", fontSize: 12 }}>{statusLabel(step.status)}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <span style={{
                fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                color: isCompleted ? E.light : isCurrent ? "#60A5FA" : "#1E293B",
                padding: "3px 8px", borderRadius: 6,
                background: isCompleted ? "rgba(16,185,129,0.08)" : isCurrent ? "rgba(96,165,250,0.08)" : "transparent",
              }}>
                {dateLabel}
              </span>
              <ChevronDown size={13} color="#1E293B" style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 200ms", flexShrink: 0 }} />
            </div>
          </div>
        </button>

        {/* Inline mini progress bar for current */}
        {isCurrent && (
          <div style={{ marginTop: 10 }}>
            <div style={{ width: "100%", height: 5, borderRadius: 99, background: "rgba(96,165,250,0.08)", position: "relative", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, width: `${step.progress}%`, background: "linear-gradient(90deg, #1D4ED8, #60A5FA)", boxShadow: "0 0 8px rgba(96,165,250,0.4)", transition: "width 500ms ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ color: "#1E293B", fontSize: 10 }}>Progress</span>
              <span style={{ color: "#60A5FA", fontSize: 10, fontWeight: 700 }}>{step.progress}%</span>
            </div>
          </div>
        )}

        {/* Expanded detail panel */}
        {expanded && (
          <div style={{ marginTop: 12, padding: "16px 18px", borderRadius: 12, background: "rgba(15,23,42,0.8)", border: "1px solid rgba(16,185,129,0.08)", display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Description */}
            <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7 }}>
              <Highlighted text={step.description} query={searchQuery} />
            </p>

            {/* Dates */}
            {(step.startDate || step.endDate) && (
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {step.startDate && (
                  <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#334155", fontSize: 12 }}>
                    <Clock size={11} />
                    Started {formatDate(step.startDate)}
                  </span>
                )}
                {step.endDate && (
                  <span style={{ display: "flex", alignItems: "center", gap: 5, color: E.light, fontSize: 12, fontWeight: 700 }}>
                    <CheckCircle2 size={11} />
                    Completed {formatDate(step.endDate)}
                  </span>
                )}
              </div>
            )}

            {/* Progress slider (current only) */}
            {isCurrent && (
              <div>
                <p style={{ color: "#334155", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>PROGRESS</p>
                <ProgressSlider value={step.progress} onChange={(v) => onProgressChange(step.id, v)} />
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 4 }}>
              {isCurrent && (
                <button onClick={() => onMarkComplete(step.id)} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 800,
                  background: `linear-gradient(135deg, ${E.dark}, ${E.bright})`, color: "#F0FDF4", border: "none",
                  cursor: "pointer", transition: "all 160ms", boxShadow: "0 4px 12px rgba(16,185,129,0.2)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(16,185,129,0.35)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(16,185,129,0.2)"; }}
                >
                  <CheckCircle2 size={12} />
                  Mark Complete
                </button>
              )}
              {isTodo && (
                <button onClick={() => onStart(step.id)} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 800,
                  background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)", color: "#60A5FA",
                  cursor: "pointer", transition: "all 160ms",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(96,165,250,0.18)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(96,165,250,0.1)"; }}
                >
                  <Zap size={12} />
                  Start Now
                </button>
              )}
              {step.arenaQuery && (
                <a href={`/dashboard/coding-arena?q=${encodeURIComponent(step.arenaQuery)}`} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#334155",
                  textDecoration: "none", cursor: "pointer", transition: "all 160ms",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)"; e.currentTarget.style.color = E.light; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#334155"; }}
                >
                  <BookOpen size={12} />
                  Practice in Arena
                </a>
              )}
              <button onClick={() => onRemove(step.id)} style={{
                display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 8, fontSize: 12,
                background: "none", border: "none", color: "#1E293B", cursor: "pointer", transition: "all 140ms", marginLeft: "auto",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#EF4444"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#1E293B"; }}
                title="Remove step"
              >
                <X size={12} /> Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Roadmap() {
  const {
    filteredSteps, stats, searchQuery, setSearchQuery,
    markComplete, start, setProgress, addNewStep, remove,
    syncFromSkillGap, resetToDefaults, isAllDone,
  } = useRoadmap();

  const [showAddModal, setShowAddModal]   = useState(false);
  const [showControls, setShowControls]   = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {showAddModal && <AddStepModal onAdd={addNewStep} onClose={() => setShowAddModal(false)} />}

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <Navigation size={13} color={E.bright} />
              <span style={{ color: E.bright, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>ROADMAP</span>
            </div>
            <h1 style={{ color: "#F0FDF4", fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 6 }}>Roadmap</h1>
            <p style={{ color: "#475569", fontSize: 14 }}>
              Track your <span style={{ color: E.light, fontWeight: 700 }}>learning journey</span> and upcoming milestones.
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={syncFromSkillGap} style={{
              display: "flex", alignItems: "center", gap: 7, padding: "9px 15px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 180ms",
              background: "rgba(15,23,42,0.8)", border: "1px solid rgba(16,185,129,0.12)", color: "#475569",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)"; e.currentTarget.style.color = E.light; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.12)"; e.currentTarget.style.color = "#475569"; }}
            >
              <RefreshCw size={12} /> <span>Sync Gaps</span>
            </button>

            <button onClick={() => setShowControls((v) => !v)} style={{
              display: "flex", alignItems: "center", gap: 7, padding: "9px 15px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 180ms",
              background: showControls ? "rgba(16,185,129,0.08)" : "rgba(15,23,42,0.8)",
              border: showControls ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(16,185,129,0.1)",
              color: showControls ? E.light : "#475569",
            }}>
              <SlidersHorizontal size={12} /> <span>Options</span>
            </button>

            <button onClick={() => setShowAddModal(true)} style={{
              display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: "pointer", transition: "all 180ms",
              background: `linear-gradient(135deg, ${E.dark}, ${E.bright})`,
              border: "1px solid rgba(16,185,129,0.3)", color: "#F0FDF4",
              boxShadow: "0 4px 16px rgba(16,185,129,0.2)",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 24px rgba(16,185,129,0.35)"; e.currentTarget.style.background = `linear-gradient(135deg, ${E.mid}, ${E.light})`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(16,185,129,0.2)"; e.currentTarget.style.background = `linear-gradient(135deg, ${E.dark}, ${E.bright})`; }}
            >
              <Plus size={13} /> Add Step
            </button>
          </div>
        </div>

        {/* ── Options panel ── */}
        {showControls && (
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 12, background: "rgba(15,23,42,0.85)", border: "1px solid rgba(16,185,129,0.1)" }}>
            <button onClick={resetToDefaults} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 150ms",
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.14)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
            >
              <RotateCcw size={11} /> Reset to defaults
            </button>
            <span style={{ color: "#1E293B", fontSize: 12 }}>Progress is saved automatically to localStorage</span>
          </div>
        )}

        {/* ── Stats bar ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            { label: "Total",     value: stats.total,      color: "#94A3B8", bg: "rgba(148,163,184,0.07)", border: "rgba(148,163,184,0.15)", icon: Layers },
            { label: "Done",      value: stats.completed,  color: E.bright,  bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.18)",  icon: CheckCircle2 },
            { label: "Active",    value: stats.inProgress, color: "#60A5FA", bg: "rgba(96,165,250,0.07)", border: "rgba(96,165,250,0.18)",  icon: Map },
            { label: "Remaining", value: stats.remaining,  color: "#EAB308", bg: "rgba(234,179,8,0.07)",  border: "rgba(234,179,8,0.18)",   icon: Flag },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14, background: "rgba(15,23,42,0.85)", border: `1px solid ${s.border}`, transition: "transform 200ms, box-shadow 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 9, background: s.bg, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={15} color={s.color} strokeWidth={1.75} />
                </div>
                <div>
                  <p style={{ color: "#F0FDF4", fontWeight: 900, fontSize: 20, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: "#1E293B", fontSize: 11, marginTop: 3, fontWeight: 700 }}>{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Overall progress ── */}
        <div style={{ padding: "18px 22px", borderRadius: 16, background: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.1)", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div>
              <span style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 14 }}>Overall Progress</span>
              {stats.percent > 0 && stats.percent < 100 && (
                <span style={{ color: "#334155", fontSize: 12, marginLeft: 10 }}>{stats.remaining} step{stats.remaining !== 1 ? "s" : ""} remaining</span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: E.bright, fontWeight: 900, fontSize: 18, letterSpacing: "-0.02em" }}>{stats.percent}%</span>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 25, 50, 75].map((tick) => (
                  <div key={tick} style={{ width: 3, height: 14, borderRadius: 2, background: stats.percent > tick ? E.bright : "rgba(255,255,255,0.07)" }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ width: "100%", height: 10, borderRadius: 99, background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 99, transition: "width 800ms cubic-bezier(0.4,0,0.2,1)",
              width: `${stats.percent}%`,
              background: stats.percent === 100
                ? `linear-gradient(90deg, ${E.dark}, ${E.bright})`
                : `linear-gradient(90deg, ${E.dark}, ${E.bright}, #60A5FA)`,
              boxShadow: stats.percent > 0 ? "0 0 14px rgba(16,185,129,0.4)" : "none",
            }} />
            {/* Milestone ticks */}
            {[25, 50, 75].map((tick) => (
              <div key={tick} style={{
                position: "absolute", top: 0, bottom: 0, left: `${tick}%`,
                width: 1, background: "rgba(255,255,255,0.12)", transform: "translateX(-50%)",
              }} />
            ))}
          </div>
        </div>

        {/* ── Search bar ── */}
        <div style={{ position: "relative" }}>
          <Search size={15} color="#334155" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roadmap steps…"
            style={{
              width: "100%", paddingLeft: 42, paddingRight: 40, paddingTop: 11, paddingBottom: 11,
              borderRadius: 11, fontSize: 13, outline: "none", transition: "border-color 180ms", boxSizing: "border-box",
              background: "rgba(15,23,42,0.85)", border: "1px solid rgba(16,185,129,0.1)", color: "#F0FDF4", caretColor: E.bright,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.1)")}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#334155", cursor: "pointer", display: "flex", alignItems: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* ── All done celebration ── */}
        {isAllDone && !searchQuery && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "48px 24px", borderRadius: 20, background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)", boxShadow: "0 0 40px rgba(16,185,129,0.05)" }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(16,185,129,0.15)" }}>
              <Trophy size={28} color={E.bright} />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#F0FDF4", fontWeight: 900, fontSize: 20, letterSpacing: "-0.02em", marginBottom: 6 }}>Roadmap Complete! 🎉</p>
              <p style={{ color: "#475569", fontSize: 14 }}>You've finished all {stats.total} steps. Time to set new goals!</p>
            </div>
            <button onClick={() => setShowAddModal(true)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "11px 24px", borderRadius: 11, fontSize: 13, fontWeight: 800, cursor: "pointer", transition: "all 180ms",
              background: `linear-gradient(135deg, ${E.dark}, ${E.bright})`, border: "1px solid rgba(16,185,129,0.3)", color: "#F0FDF4",
              boxShadow: "0 4px 20px rgba(16,185,129,0.25)",
            }}>
              <Plus size={14} /> Add New Goals
            </button>
          </div>
        )}

        {/* ── No search results ── */}
        {searchQuery && filteredSteps.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "48px 24px", borderRadius: 16, background: "rgba(15,23,42,0.85)", border: "1px solid rgba(16,185,129,0.08)" }}>
            <Search size={28} color="#1E293B" />
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#F0FDF4", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>No steps match "{searchQuery}"</p>
              <p style={{ color: "#334155", fontSize: 13 }}>Try a different keyword or add a new step</p>
            </div>
            <button onClick={() => setSearchQuery("")} style={{ color: E.bright, fontSize: 13, fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>
              Clear search
            </button>
          </div>
        )}

        {/* ── Main roadmap card ── */}
        {(!isAllDone || searchQuery) && filteredSteps.length > 0 && (
          <div style={{ padding: "28px 28px 20px", borderRadius: 20, background: "rgba(15,23,42,0.92)", border: "1px solid rgba(16,185,129,0.1)", boxShadow: "0 4px 32px rgba(0,0,0,0.25)", position: "relative", overflow: "hidden" }}>
            {/* Ambient glow blob */}
            <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

            {/* Search filter notice */}
            {searchQuery && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, fontSize: 12, color: "#334155" }}>
                <Search size={13} color={E.bright} />
                Showing <strong style={{ color: "#F0FDF4" }}>{filteredSteps.length}</strong> of {stats.total} steps matching{" "}
                <span style={{ color: E.bright }}>"{searchQuery}"</span>
                <button onClick={() => setSearchQuery("")} style={{ color: E.bright, background: "none", border: "none", cursor: "pointer", fontWeight: 700, marginLeft: 2, fontSize: 12 }}>
                  Clear
                </button>
              </div>
            )}

            {/* Steps list */}
            <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
              {filteredSteps.map((step, index) => (
                <RoadmapItem
                  key={step.id}
                  step={step}
                  index={index}
                  isLast={index === filteredSteps.length - 1}
                  searchQuery={searchQuery}
                  onMarkComplete={markComplete}
                  onStart={start}
                  onProgressChange={setProgress}
                  onRemove={remove}
                />
              ))}
            </div>

            {/* Add milestone inline */}
            <button onClick={() => setShowAddModal(true)} style={{
              marginTop: 18, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 11, fontSize: 12, fontWeight: 700,
              background: "rgba(16,185,129,0.02)", border: "1px dashed rgba(16,185,129,0.12)", color: "#1E293B", cursor: "pointer", transition: "all 180ms",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)"; e.currentTarget.style.color = E.light; e.currentTarget.style.background = "rgba(16,185,129,0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.12)"; e.currentTarget.style.color = "#1E293B"; e.currentTarget.style.background = "rgba(16,185,129,0.02)"; }}
            >
              <Plus size={13} /> Add milestone
            </button>
          </div>
        )}

        {/* ── Coding Arena CTA ── */}
        {filteredSteps.some((s) => s.status === "current") && (
          <div style={{
            display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", borderRadius: 16, flexWrap: "wrap",
            background: "linear-gradient(135deg, rgba(20,83,45,0.3) 0%, rgba(22,101,52,0.15) 100%)",
            border: "1px solid rgba(16,185,129,0.15)",
            boxShadow: "0 0 30px rgba(16,185,129,0.04)",
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Zap size={17} color={E.bright} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 14, marginBottom: 3 }}>Practice your current step in Coding Arena</p>
              <p style={{ color: "#475569", fontSize: 13 }}>
                {(() => {
                  const cur = filteredSteps.find((s) => s.status === "current");
                  return cur ? <>Challenges related to: <span style={{ color: E.light, fontWeight: 700 }}>{cur.title}</span></> : "";
                })()}
              </p>
            </div>
            <a
              href={`/dashboard/coding-arena${(() => {
                const cur = filteredSteps.find((s) => s.status === "current");
                return cur?.arenaQuery ? `?q=${encodeURIComponent(cur.arenaQuery)}` : "";
              })()}`}
              style={{
                flexShrink: 0, padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 800,
                background: `linear-gradient(135deg, ${E.dark}, ${E.mid})`,
                border: "1px solid rgba(16,185,129,0.3)", color: "#F0FDF4", textDecoration: "none", transition: "all 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${E.mid}, ${E.bright})`; e.currentTarget.style.boxShadow = "0 0 20px rgba(16,185,129,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${E.dark}, ${E.mid})`; e.currentTarget.style.boxShadow = "none"; }}
            >
              Go to Arena →
            </a>
          </div>
        )}
      </div>
    </>
  );
}
