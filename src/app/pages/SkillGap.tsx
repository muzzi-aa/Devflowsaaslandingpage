import { useState, useRef, useEffect } from "react";
import {
  TrendingUp,
  Target,
  ChevronDown,
  Plus,
  X,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Clock,
  Zap,
  FileText,
  Info,
  BarChart2,
  Award,
} from "lucide-react";
import { useSkillGap, ROLE_NAMES } from "../hooks/useSkillGap";
import type { SkillResult, Recommendation } from "../data/skillEngine";
import type { ExperienceLevel } from "../data/skillEngine";

// ─── Design tokens ────────────────────────────────────────────────────────────
const E = {
  bright: "#10B981",
  light:  "#34D399",
  mid:    "#166534",
  dark:   "#14532D",
};

// ─── Colour helpers ───────────────────────────────────────────────────────────
function barColor(current: number, required: number): string {
  const pct = required > 0 ? current / required : 1;
  if (pct >= 0.7) return E.bright;
  if (pct >= 0.45) return "#EAB308";
  if (pct >= 0.2) return "#F97316";
  return "#EF4444";
}

function priorityStyle(p: Recommendation["priority"]): { color: string; bg: string; border: string; label: string } {
  switch (p) {
    case "critical": return { color: "#EF4444", bg: "rgba(239,68,68,0.09)",  border: "rgba(239,68,68,0.22)",  label: "Critical" };
    case "high":     return { color: "#EAB308", bg: "rgba(234,179,8,0.09)",  border: "rgba(234,179,8,0.22)",  label: "High"     };
    default:         return { color: "#818CF8", bg: "rgba(129,140,248,0.09)", border: "rgba(129,140,248,0.22)", label: "Medium"   };
  }
}

const EXP_LABELS: Record<ExperienceLevel, string> = {
  junior: "Junior",
  mid:    "Mid",
  senior: "Senior",
};

const STATUS_DOT: Record<SkillResult["status"], string> = {
  strong:  E.bright,
  partial: "#EAB308",
  weak:    "#F97316",
  missing: "#EF4444",
};

const READINESS_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  "Not Ready":     { color: "#EF4444", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.22)"  },
  "Learning":      { color: "#F97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.22)" },
  "Almost There":  { color: "#EAB308", bg: "rgba(234,179,8,0.08)",  border: "rgba(234,179,8,0.22)"  },
  "Ready":         { color: E.bright,  bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.22)" },
  "Overqualified": { color: "#818CF8", bg: "rgba(129,140,248,0.08)", border: "rgba(129,140,248,0.22)" },
};

// ─── Animated progress bar ────────────────────────────────────────────────────
function ProgressBar({ current, required, animate = true }: { current: number; required: number; animate?: boolean }) {
  const [width, setWidth] = useState(0);
  const color = barColor(current, required);
  const pct   = Math.min(100, Math.round((current / Math.max(required, 1)) * 100));
  const reqPct = Math.min(100, required);

  useEffect(() => {
    if (!animate) { setWidth(pct); return; }
    const id = setTimeout(() => setWidth(pct), 80);
    return () => clearTimeout(id);
  }, [pct, animate]);

  const isGood = pct >= 70;

  return (
    <div style={{ width: "100%", height: 8, borderRadius: 99, background: "rgba(255,255,255,0.04)", position: "relative", overflow: "visible" }}>
      {/* Ghost "required" track */}
      <div style={{
        position: "absolute", left: 0, top: 0, height: "100%",
        width: `${reqPct}%`, borderRadius: 99,
        background: "rgba(255,255,255,0.05)",
      }} />
      {/* Filled progress */}
      <div
        style={{
          position: "absolute", left: 0, top: 0,
          height: "100%", borderRadius: 99,
          transition: "width 800ms cubic-bezier(0.4,0,0.2,1)",
          width: `${width}%`,
          background: isGood
            ? `linear-gradient(90deg, ${E.dark}, ${E.bright})`
            : color === "#EAB308"
            ? "linear-gradient(90deg, #854D0E, #EAB308)"
            : color === "#F97316"
            ? "linear-gradient(90deg, #7C2D12, #F97316)"
            : "linear-gradient(90deg, #7F1D1D, #EF4444)",
          boxShadow: isGood ? `0 0 10px rgba(16,185,129,0.45)` : `0 0 8px ${color}55`,
        }}
      />
      {/* Required marker line */}
      <div style={{
        position: "absolute", top: -2, bottom: -2,
        left: `${reqPct}%`,
        width: 2, background: "rgba(255,255,255,0.2)",
        borderRadius: 99,
        transform: "translateX(-50%)",
        boxShadow: "0 0 4px rgba(255,255,255,0.1)",
      }} />
    </div>
  );
}

// ─── Role selector ────────────────────────────────────────────────────────────
function RoleSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700,
          background: "rgba(15,23,42,0.8)", border: open ? "1px solid rgba(16,185,129,0.35)" : "1px solid rgba(16,185,129,0.12)",
          color: "#F0FDF4", minWidth: 230, cursor: "pointer", transition: "all 180ms",
          boxShadow: open ? "0 0 0 3px rgba(16,185,129,0.07)" : "none",
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)"; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = "rgba(16,185,129,0.12)"; }}
      >
        <span style={{ flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
        <ChevronDown size={14} color="#475569" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms", flexShrink: 0 }} />
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, width: "100%",
          borderRadius: 12, border: "1px solid rgba(16,185,129,0.12)", padding: "6px",
          background: "#1E293B", boxShadow: "0 16px 48px rgba(0,0,0,0.5)", zIndex: 30,
        }}>
          {ROLE_NAMES.map((r) => (
            <button
              key={r}
              onClick={() => { onChange(r); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: 8,
                fontSize: 13, fontWeight: r === value ? 700 : 500, border: "none",
                color: r === value ? E.light : "#64748B",
                background: r === value ? "rgba(16,185,129,0.1)" : "transparent",
                cursor: "pointer", transition: "all 140ms",
              }}
              onMouseEnter={(e) => { if (r !== value) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#94A3B8"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = r === value ? "rgba(16,185,129,0.1)" : "transparent"; e.currentTarget.style.color = r === value ? E.light : "#64748B"; }}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Skill input ──────────────────────────────────────────────────────────────
function SkillInput({ onAdd }: { onAdd: (s: string) => void }) {
  const [val, setVal] = useState("");
  const submit = () => { if (val.trim()) { onAdd(val.trim()); setVal(""); } };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        placeholder="Add a skill…"
        style={{
          flex: 1, padding: "7px 12px", borderRadius: 8, fontSize: 12,
          background: "rgba(15,23,42,0.8)", border: "1px solid rgba(16,185,129,0.12)",
          color: "#F0FDF4", outline: "none", caretColor: E.bright, transition: "border-color 180ms",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)")}
        onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.12)")}
      />
      <button
        onClick={submit}
        disabled={!val.trim()}
        style={{
          width: 30, height: 30, borderRadius: 8, border: "none",
          background: val.trim() ? `linear-gradient(135deg, ${E.mid}, ${E.bright})` : "rgba(255,255,255,0.05)",
          color: val.trim() ? "#F0FDF4" : "#1E293B", cursor: val.trim() ? "pointer" : "not-allowed",
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 160ms",
        }}
      >
        <Plus size={13} />
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SkillGap() {
  const {
    profile,
    analysis,
    hasResume,
    usingMock,
    setTargetRole,
    setExperienceLevel,
    addSkill,
    removeSkill,
    recalculate,
  } = useSkillGap();

  const [showAllSkills, setShowAllSkills]     = useState(false);
  const [expandedRec, setExpandedRec]         = useState<string | null>(null);
  const [showSkillManager, setShowSkillManager] = useState(false);

  const displayedSkills = showAllSkills ? analysis.skills : analysis.skills.slice(0, 5);
  const readStyle = READINESS_STYLE[analysis.readinessLabel] ?? READINESS_STYLE["Learning"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
            <BarChart2 size={13} color={E.bright} />
            <span style={{ color: E.bright, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>SKILL GAP</span>
          </div>
          <h1 style={{ color: "#F0FDF4", fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 6 }}>Skill Gap</h1>
          <p style={{ color: "#475569", fontSize: 14 }}>
            Identify missing competencies to reach your{" "}
            <span style={{ color: E.light, fontWeight: 700 }}>next level</span>.
          </p>
        </div>
        <button
          onClick={recalculate}
          style={{
            display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)",
            color: E.light, cursor: "pointer", transition: "all 200ms",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.13)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(16,185,129,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <RefreshCw size={13} />
          Refresh
        </button>
      </div>

      {/* ── Mock data notice ── */}
      {usingMock && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 12, fontSize: 13,
          background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)", color: "#818CF8",
        }}>
          <Info size={15} style={{ flexShrink: 0 }} />
          <span>
            Using sample data. Upload your resume in{" "}
            <a href="/dashboard/career-ai" style={{ color: E.bright, textDecoration: "underline", fontWeight: 700 }}>Career AI</a>{" "}
            for a personalised analysis.
          </span>
        </div>
      )}

      {/* ── Resume badge ── */}
      {hasResume && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 12, fontSize: 13,
          background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)", color: E.light,
        }}>
          <FileText size={14} style={{ flexShrink: 0 }} />
          <span>Analysis powered by your uploaded resume · <strong>{profile.skills.length}</strong> skills detected</span>
        </div>
      )}

      {/* ── Config row ── */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
        <RoleSelect value={profile.targetRole} onChange={setTargetRole} />

        {/* Level tabs */}
        <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(16,185,129,0.12)" }}>
          {(["junior", "mid", "senior"] as ExperienceLevel[]).map((lvl, i) => (
            <button
              key={lvl}
              onClick={() => setExperienceLevel(lvl)}
              style={{
                padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 160ms",
                background: profile.experienceLevel === lvl ? "rgba(16,185,129,0.12)" : "rgba(15,23,42,0.8)",
                color: profile.experienceLevel === lvl ? E.light : "#475569",
                border: "none",
                borderRight: i < 2 ? "1px solid rgba(16,185,129,0.1)" : "none",
              }}
            >
              {EXP_LABELS[lvl]}
            </button>
          ))}
        </div>

        {/* Manage skills */}
        <button
          onClick={() => setShowSkillManager((v) => !v)}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 160ms",
            background: showSkillManager ? "rgba(16,185,129,0.1)" : "rgba(15,23,42,0.7)",
            border: showSkillManager ? "1px solid rgba(16,185,129,0.28)" : "1px solid rgba(16,185,129,0.1)",
            color: showSkillManager ? E.light : "#475569",
          }}
        >
          <Plus size={12} /> Manage Skills
        </button>

        {/* Readiness badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 800, marginLeft: "auto",
          background: readStyle.bg, border: `1px solid ${readStyle.border}`, color: readStyle.color,
        }}>
          <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-0.02em" }}>{analysis.overallScore}%</span>
          {analysis.readinessLabel}
        </div>
      </div>

      {/* ── Skill manager panel ── */}
      {showSkillManager && (
        <div style={{ padding: "20px 22px", borderRadius: 14, background: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.12)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <p style={{ color: "#F0FDF4", fontWeight: 700, fontSize: 13 }}>Your Skills <span style={{ color: "#334155" }}>({profile.skills.length})</span></p>
            <SkillInput onAdd={addSkill} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {profile.skills.map((skill) => (
              <span key={skill} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "4px 11px", borderRadius: 99, fontSize: 11, fontWeight: 700,
                background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: E.light,
              }}>
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  style={{ background: "none", border: "none", color: E.light, cursor: "pointer", display: "flex", alignItems: "center", transition: "color 140ms", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = E.light)}
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Summary stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[
          { label: "Strengths",  value: analysis.strengths.length, icon: Award,      color: E.bright,  bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.18)"  },
          { label: "Gaps",       value: analysis.gaps.length,      icon: AlertCircle, color: "#EF4444", bg: "rgba(239,68,68,0.07)",   border: "rgba(239,68,68,0.18)"   },
          { label: "Skills Req", value: analysis.skills.length,    icon: BarChart2,   color: "#818CF8", bg: "rgba(129,140,248,0.07)", border: "rgba(129,140,248,0.18)" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              style={{
                display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 14,
                background: "rgba(15,23,42,0.85)", border: `1px solid ${s.border}`,
                transition: "transform 200ms ease, box-shadow 200ms ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={17} color={s.color} strokeWidth={1.75} />
              </div>
              <div>
                <p style={{ color: "#F0FDF4", fontWeight: 900, fontSize: 22, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</p>
                <p style={{ color: "#334155", fontSize: 11, marginTop: 3, fontWeight: 600 }}>{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Two-column main grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>

        {/* LEFT: Current Trajectory */}
        <div style={{ padding: "24px 26px", borderRadius: 18, background: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.1)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 16px rgba(16,185,129,0.1)" }}>
              <TrendingUp size={18} color={E.bright} strokeWidth={1.75} />
            </div>
            <div>
              <h3 style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 15, letterSpacing: "-0.01em" }}>Current Trajectory</h3>
              <p style={{ color: "#334155", fontSize: 12, marginTop: 2 }}>{analysis.role}</p>
            </div>
          </div>

          {/* Skill bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {displayedSkills.map((skill: SkillResult) => {
              const color = barColor(skill.current, skill.required);
              const isGood = color === E.bright;
              return (
                <div key={skill.skill}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "#94A3B8" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_DOT[skill.status], flexShrink: 0, boxShadow: isGood ? `0 0 6px ${STATUS_DOT[skill.status]}` : "none" }} />
                      {skill.skill}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "#1E293B", fontSize: 11 }}>need {skill.required}%</span>
                      <span style={{ color, fontWeight: 800, fontSize: 13, minWidth: 36, textAlign: "right" }}>{skill.current}%</span>
                    </div>
                  </div>
                  <ProgressBar current={skill.current} required={skill.required} />
                </div>
              );
            })}
          </div>

          {/* Show more */}
          {analysis.skills.length > 5 && (
            <button
              onClick={() => setShowAllSkills((v) => !v)}
              style={{
                marginTop: 18, width: "100%", padding: "9px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.1)",
                color: "#334155", cursor: "pointer", transition: "all 180ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.08)"; e.currentTarget.style.color = E.light; e.currentTarget.style.borderColor = "rgba(16,185,129,0.22)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.04)"; e.currentTarget.style.color = "#334155"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.1)"; }}
            >
              {showAllSkills ? "Show less" : `Show all ${analysis.skills.length} skills`}
            </button>
          )}

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(16,185,129,0.08)" }}>
            {[
              { label: "Strong",  color: E.bright  },
              { label: "Partial", color: "#EAB308" },
              { label: "Weak",    color: "#F97316" },
              { label: "Missing", color: "#EF4444" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
                <span style={{ color: "#1E293B", fontSize: 11, fontWeight: 600 }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Recommended Focus */}
        <div style={{ padding: "24px 26px", borderRadius: 18, background: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.1)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Target size={18} color="#818CF8" strokeWidth={1.75} />
            </div>
            <div>
              <h3 style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 15, letterSpacing: "-0.01em" }}>Recommended Focus</h3>
              <p style={{ color: "#334155", fontSize: 12, marginTop: 2 }}>Based on market demand</p>
            </div>
          </div>

          {analysis.gaps.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", gap: 12 }}>
              <CheckCircle2 size={40} color={E.bright} />
              <p style={{ color: "#F0FDF4", fontWeight: 700 }}>All requirements met!</p>
              <p style={{ color: "#475569", fontSize: 13 }}>Consider Staff-level roles.</p>
            </div>
          ) : (
            <>
              <p style={{ color: "#334155", fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
                To reach <strong style={{ color: E.light }}>{analysis.role}</strong>, we highly suggest filling your gaps in:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {analysis.recommendations.map((rec: Recommendation) => {
                  const ps = priorityStyle(rec.priority);
                  const isExpanded = expandedRec === rec.skill;

                  return (
                    <div key={rec.skill}>
                      <button
                        onClick={() => setExpandedRec(isExpanded ? null : rec.skill)}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                          padding: "10px 12px", borderRadius: 10, cursor: "pointer", transition: "all 160ms",
                          background: isExpanded ? "rgba(16,185,129,0.05)" : "rgba(15,23,42,0.5)",
                          border: isExpanded ? "1px solid rgba(16,185,129,0.15)" : "1px solid rgba(16,185,129,0.06)",
                        }}
                        onMouseEnter={(e) => { if (!isExpanded) { e.currentTarget.style.background = "rgba(16,185,129,0.04)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.12)"; } }}
                        onMouseLeave={(e) => { if (!isExpanded) { e.currentTarget.style.background = "rgba(15,23,42,0.5)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.06)"; } }}
                      >
                        {/* Priority dot */}
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: ps.color, flexShrink: 0, boxShadow: `0 0 6px ${ps.color}` }} />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                            <span style={{ color: "#F0FDF4", fontWeight: 700, fontSize: 13 }}>{rec.skill}</span>
                            <span style={{
                              padding: "1px 8px", borderRadius: 99, fontSize: 10, fontWeight: 800,
                              background: ps.bg, border: `1px solid ${ps.border}`, color: ps.color,
                            }}>{ps.label}</span>
                            <span style={{ color: "#1E293B", fontSize: 11, fontWeight: 700 }}>-{rec.gapPercent}%</span>
                          </div>
                        </div>

                        <ChevronDown
                          size={13}
                          color="#334155"
                          style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 200ms", flexShrink: 0 }}
                        />
                      </button>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div style={{
                          margin: "6px 0 6px 17px", padding: "14px 16px", borderRadius: 10,
                          background: "rgba(15,23,42,0.7)", border: "1px solid rgba(16,185,129,0.08)",
                          display: "flex", flexDirection: "column", gap: 10,
                        }}>
                          <p style={{ color: "#475569", fontSize: 12, lineHeight: 1.6 }}>{rec.reason}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Clock size={11} color={E.bright} />
                            <span style={{ color: E.light, fontSize: 12, fontWeight: 700 }}>~{rec.estimatedWeeks}w to close gap</span>
                          </div>
                          <div>
                            <p style={{ display: "flex", alignItems: "center", gap: 5, color: "#334155", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
                              <BookOpen size={11} /> Resources:
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              {rec.resources.map((r) => (
                                <span key={r} style={{ display: "flex", alignItems: "center", gap: 6, color: "#818CF8", fontSize: 12 }}>
                                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#818CF8", flexShrink: 0 }} />
                                  {r}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Total estimated effort */}
          {analysis.recommendations.length > 0 && (
            <div style={{
              marginTop: 18, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12,
              background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.1)",
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Zap size={14} color={E.bright} fill={E.bright} />
              </div>
              <div>
                <p style={{ color: "#F0FDF4", fontWeight: 700, fontSize: 13 }}>Estimated time to close all gaps</p>
                <p style={{ color: "#334155", fontSize: 12, marginTop: 2 }}>
                  ~{analysis.recommendations.reduce((acc, r) => acc + r.estimatedWeeks, 0)} weeks · studying 1–2 hrs/day
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Strengths breakdown ── */}
      {analysis.strengths.length > 0 && (
        <div style={{ padding: "20px 22px", borderRadius: 16, background: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <CheckCircle2 size={15} color={E.bright} />
            <h3 style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 14 }}>
              Strengths — <span style={{ color: E.light }}>{analysis.strengths.length}</span> skills at or above requirement
            </h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {analysis.strengths.map((s) => (
              <span key={s.skill} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700,
                background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)", color: E.light,
              }}>
                <CheckCircle2 size={10} />
                {s.skill}
                <span style={{ color: "rgba(52,211,153,0.5)", fontSize: 10, fontWeight: 600 }}>{s.current}%</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Coding Arena CTA ── */}
      {analysis.gaps.length > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", borderRadius: 16, flexWrap: "wrap",
          background: `linear-gradient(135deg, rgba(20,83,45,0.35) 0%, rgba(22,101,52,0.2) 100%)`,
          border: "1px solid rgba(16,185,129,0.15)",
          boxShadow: "0 0 30px rgba(16,185,129,0.04)",
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Zap size={16} color={E.bright} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 14, marginBottom: 3 }}>Practice your gaps in the Coding Arena</p>
            <p style={{ color: "#475569", fontSize: 13 }}>
              Challenges related to: <span style={{ color: E.light, fontWeight: 700 }}>{analysis.gaps.slice(0, 3).map((g) => g.skill).join(", ")}</span>
            </p>
          </div>
          <a
            href="/dashboard/coding-arena"
            style={{
              flexShrink: 0, padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 800,
              background: `linear-gradient(135deg, ${E.dark}, ${E.mid})`,
              border: "1px solid rgba(16,185,129,0.3)", color: "#F0FDF4", textDecoration: "none",
              transition: "all 200ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${E.mid}, ${E.bright})`; e.currentTarget.style.boxShadow = "0 0 20px rgba(16,185,129,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${E.dark}, ${E.mid})`; e.currentTarget.style.boxShadow = "none"; }}
          >
            Go to Coding Arena →
          </a>
        </div>
      )}
    </div>
  );
}