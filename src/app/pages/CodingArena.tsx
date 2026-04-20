import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  Search,
  X,
  MonitorPlay,
  CheckCircle2,
  Clock,
  Zap,
  Filter,
  ChevronDown,
  PlayCircle,
  RotateCcw,
  Trophy,
  Flame,
  TrendingUp,
  Code2,
  Star,
  Target,
} from "lucide-react";
import { CHALLENGES } from "../data/challenges";
import type { Difficulty, Status, Category } from "../data/challenges";
import { useChallengeStore } from "../hooks/useChallengeStore";
import { ChallengeModal } from "../components/ChallengeModal";

// ─── Constants ────────────────────────────────────────────────────────────────
const DIFFICULTIES: ("All" | Difficulty)[] = ["All", "Easy", "Medium", "Hard"];
const STATUSES: ("All" | Status)[] = ["All", "Not Started", "In Progress", "Completed"];
const CATEGORIES: ("All" | Category)[] = [
  "All", "Arrays", "Graphs", "Dynamic Programming", "Trees",
  "Strings", "Recursion", "Sorting", "System Design",
];

const DIFF_STYLES: Record<Difficulty, { bg: string; border: string; text: string; glow: string }> = {
  Easy:   { bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.28)",  text: "#34D399", glow: "rgba(52,211,153,0.15)"  },
  Medium: { bg: "rgba(234,179,8,0.08)",  border: "rgba(234,179,8,0.25)",   text: "#EAB308", glow: "rgba(234,179,8,0.12)"   },
  Hard:   { bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.25)",   text: "#EF4444", glow: "rgba(239,68,68,0.12)"   },
};

const STATUS_STYLES: Record<Status, { bg: string; border: string; text: string; dot: string }> = {
  "Not Started": { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", text: "#475569",  dot: "#334155"  },
  "In Progress":  { bg: "rgba(234,179,8,0.08)",  border: "rgba(234,179,8,0.22)",   text: "#EAB308",  dot: "#EAB308"  },
  "Completed":    { bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.28)",  text: "#10B981",  dot: "#10B981"  },
};

const E = { bright: "#10B981", light: "#34D399", mid: "#166534", dark: "#14532D" };

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CodingArena() {
  const { progress, getProgress, startChallenge, completeChallenge, saveCode, resetChallenge } =
    useChallengeStore();

  const [rawSearch,         setRawSearch]         = useState("");
  const [diffFilter,        setDiffFilter]        = useState<"All" | Difficulty>("All");
  const [statusFilter,      setStatusFilter]      = useState<"All" | Status>("All");
  const [catFilter,         setCatFilter]         = useState<"All" | Category>("All");
  const [catOpen,           setCatOpen]           = useState(false);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);
  const catRef = useRef<HTMLDivElement>(null);

  const search = useDebounce(rawSearch, 300);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return CHALLENGES.filter((c) => {
      const matchSearch =
        !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.tags.some((t) => t.includes(q));
      const matchDiff   = diffFilter   === "All" || c.difficulty === diffFilter;
      const matchCat    = catFilter    === "All" || c.category   === catFilter;
      const status      = getProgress(c.id).status;
      const matchStatus = statusFilter === "All" || status === statusFilter;
      return matchSearch && matchDiff && matchCat && matchStatus;
    });
  }, [search, diffFilter, statusFilter, catFilter, getProgress]);

  const completedCount  = Object.values(progress).filter((p) => p.status === "Completed").length;
  const inProgressCount = Object.values(progress).filter((p) => p.status === "In Progress").length;
  const totalXP         = CHALLENGES.filter((c) => getProgress(c.id).status === "Completed")
    .reduce((sum, c) => sum + c.xp, 0);
  const completionPct   = Math.round((completedCount / CHALLENGES.length) * 100);

  const activeChallenge = activeChallengeId
    ? CHALLENGES.find((c) => c.id === activeChallengeId) ?? null
    : null;

  const handleSolveClick = useCallback((id: string) => setActiveChallengeId(id), []);
  const handleStart      = useCallback(() => { if (activeChallengeId) startChallenge(activeChallengeId); }, [activeChallengeId, startChallenge]);
  const handleComplete   = useCallback((code: string) => { if (activeChallengeId) completeChallenge(activeChallengeId, code); }, [activeChallengeId, completeChallenge]);
  const handleSaveCode   = useCallback((code: string) => { if (activeChallengeId) saveCode(activeChallengeId, code); }, [activeChallengeId, saveCode]);
  const handleReset      = useCallback(() => { if (activeChallengeId) resetChallenge(activeChallengeId); }, [activeChallengeId, resetChallenge]);

  const clearFilters = () => { setRawSearch(""); setDiffFilter("All"); setStatusFilter("All"); setCatFilter("All"); };
  const hasActiveFilters = rawSearch || diffFilter !== "All" || statusFilter !== "All" || catFilter !== "All";

  const getButtonLabel = (status: Status) => {
    if (status === "Not Started") return { label: "Start Challenge", icon: PlayCircle };
    if (status === "In Progress") return { label: "Continue", icon: MonitorPlay };
    return { label: "View Solution", icon: Trophy };
  };

  return (
    <>
      {activeChallenge && (
        <ChallengeModal
          challenge={activeChallenge}
          progress={getProgress(activeChallenge.id)}
          onClose={() => setActiveChallengeId(null)}
          onStart={handleStart}
          onComplete={handleComplete}
          onSaveCode={handleSaveCode}
          onReset={handleReset}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        {/* ── PAGE HEADER ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <Code2 size={13} color={E.bright} />
              <span style={{ color: E.bright, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>CODING ARENA</span>
            </div>
            <h1 style={{ color: "#F0FDF4", fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 6 }}>
              Coding Arena
            </h1>
            <p style={{ color: "#475569", fontSize: 14 }}>
              Sharpen your skills with{" "}
              <span style={{ color: E.light, fontWeight: 700 }}>{CHALLENGES.length}</span>{" "}
              real-world technical challenges.
            </p>
          </div>

          {/* XP badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 18px",
            borderRadius: 12, background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.22)",
            boxShadow: "0 0 20px rgba(16,185,129,0.06)",
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={14} color={E.bright} fill={E.bright} />
            </div>
            <div>
              <p style={{ color: E.light, fontWeight: 900, fontSize: 17, lineHeight: 1 }}>{totalXP.toLocaleString()} XP</p>
              <p style={{ color: "#334155", fontSize: 11, marginTop: 2 }}>earned so far</p>
            </div>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            { label: "Total",       value: CHALLENGES.length, icon: MonitorPlay, color: E.bright,   iconBg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.15)"  },
            { label: "Completed",   value: completedCount,    icon: CheckCircle2, color: E.light,   iconBg: "rgba(52,211,153,0.1)",   border: "rgba(52,211,153,0.18)"  },
            { label: "In Progress", value: inProgressCount,   icon: Flame,        color: "#EAB308", iconBg: "rgba(234,179,8,0.08)",  border: "rgba(234,179,8,0.15)"   },
            { label: "Completion",  value: `${completionPct}%`, icon: Target,     color: E.light,   iconBg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.15)"  },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 18px", borderRadius: 14,
                  background: "rgba(15,23,42,0.8)",
                  border: `1px solid ${stat.border}`,
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, background: stat.iconBg, border: `1px solid ${stat.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={17} color={stat.color} strokeWidth={1.75} />
                </div>
                <div>
                  <p style={{ color: "#F0FDF4", fontWeight: 900, fontSize: 22, letterSpacing: "-0.03em", lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ color: "#334155", fontSize: 11, marginTop: 3, fontWeight: 600 }}>{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── SEARCH & FILTERS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search
              size={15}
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#334155", pointerEvents: "none" }}
            />
            <input
              type="text"
              value={rawSearch}
              onChange={(e) => setRawSearch(e.target.value)}
              placeholder="Search challenges by title, description, or tag…"
              style={{
                width: "100%", paddingLeft: 42, paddingRight: rawSearch ? 40 : 16,
                paddingTop: 11, paddingBottom: 11,
                borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(15,23,42,0.8)",
                color: "#F0FDF4", fontSize: 14, outline: "none",
                transition: "border-color 200ms ease, background 200ms ease, box-shadow 200ms ease",
                boxSizing: "border-box", caretColor: E.bright,
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)"; e.currentTarget.style.background = "rgba(16,185,129,0.03)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.07)"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(15,23,42,0.8)"; e.currentTarget.style.boxShadow = "none"; }}
            />
            {rawSearch && (
              <button
                onClick={() => setRawSearch("")}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#475569", cursor: "pointer", padding: 2, display: "flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F0FDF4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#334155" }}>
              <Filter size={12} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Filter</span>
            </div>

            {/* Difficulty pills */}
            <div style={{ display: "flex", gap: 5 }}>
              {DIFFICULTIES.map((d) => {
                const isActive = diffFilter === d;
                const ds = d !== "All" ? DIFF_STYLES[d as Difficulty] : null;
                return (
                  <button
                    key={d}
                    onClick={() => setDiffFilter(d)}
                    style={{
                      padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700,
                      background: isActive ? (ds ? ds.bg : "rgba(16,185,129,0.12)") : "rgba(255,255,255,0.03)",
                      border: isActive
                        ? `1px solid ${ds ? ds.border : "rgba(16,185,129,0.3)"}`
                        : "1px solid rgba(255,255,255,0.06)",
                      color: isActive ? (ds ? ds.text : E.light) : "#475569",
                      cursor: "pointer", transition: "all 150ms ease",
                    }}
                    onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"; } }}
                    onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.color = "#475569"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.06)"; } }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.07)" }} />

            {/* Status pills */}
            <div style={{ display: "flex", gap: 5 }}>
              {STATUSES.map((s) => {
                const isActive = statusFilter === s;
                const ss = s !== "All" ? STATUS_STYLES[s as Status] : null;
                return (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    style={{
                      padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700,
                      background: isActive ? (ss ? ss.bg : "rgba(16,185,129,0.12)") : "rgba(255,255,255,0.03)",
                      border: isActive
                        ? `1px solid ${ss ? ss.border : "rgba(16,185,129,0.3)"}`
                        : "1px solid rgba(255,255,255,0.06)",
                      color: isActive ? (ss ? ss.text : E.light) : "#475569",
                      cursor: "pointer", transition: "all 150ms ease",
                    }}
                  >
                    {s === "All" ? "All Status" : s}
                  </button>
                );
              })}
            </div>

            <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.07)" }} />

            {/* Category dropdown */}
            <div style={{ position: "relative" }} ref={catRef}>
              <button
                onClick={() => setCatOpen((v) => !v)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700,
                  background: catFilter !== "All" ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.03)",
                  border: catFilter !== "All" ? "1px solid rgba(16,185,129,0.28)" : "1px solid rgba(255,255,255,0.06)",
                  color: catFilter !== "All" ? E.light : "#475569",
                  cursor: "pointer", transition: "all 150ms ease",
                }}
              >
                {catFilter === "All" ? "Category" : catFilter}
                <ChevronDown size={11} style={{ transform: catOpen ? "rotate(180deg)" : "none", transition: "transform 200ms" }} />
              </button>
              {catOpen && (
                <div
                  style={{
                    position: "absolute", top: "calc(100% + 8px)", left: 0,
                    borderRadius: 12, overflow: "hidden", zIndex: 20, padding: "6px",
                    background: "#1E293B", border: "1px solid rgba(16,185,129,0.12)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.5)", minWidth: 190,
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCatFilter(cat); setCatOpen(false); }}
                      style={{
                        display: "block", width: "100%", padding: "8px 12px", textAlign: "left",
                        fontSize: 13, fontWeight: 600, borderRadius: 8, border: "none",
                        color: catFilter === cat ? E.light : "#64748B",
                        background: catFilter === cat ? "rgba(16,185,129,0.1)" : "transparent",
                        cursor: "pointer", transition: "all 150ms",
                      }}
                      onMouseEnter={(e) => { if (catFilter !== cat) { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8"; } }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = catFilter === cat ? "rgba(16,185,129,0.1)" : "transparent"; (e.currentTarget as HTMLButtonElement).style.color = catFilter === cat ? E.light : "#64748B"; }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: "auto", fontSize: 12, fontWeight: 600, color: "#475569", background: "none", border: "none", cursor: "pointer", transition: "color 150ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F87171")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                <RotateCcw size={11} /> Clear filters
              </button>
            )}
          </div>

          {/* Result count */}
          <p style={{ color: "#1E293B", fontSize: 12 }}>
            Showing{" "}
            <span style={{ color: "#64748B", fontWeight: 700 }}>{filtered.length}</span>{" "}
            of {CHALLENGES.length} challenges
            {search && <> for <span style={{ color: E.light }}>"{search}"</span></>}
          </p>
        </div>

        {/* ── CHALLENGE GRID ── */}
        {filtered.length === 0 ? (
          <div
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "80px 24px", borderRadius: 18,
              background: "rgba(15,23,42,0.6)", border: "1px solid rgba(16,185,129,0.08)",
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Search size={22} color="#334155" />
            </div>
            <p style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 17, marginBottom: 6 }}>No challenges found</p>
            <p style={{ color: "#475569", fontSize: 13, marginBottom: 24 }}>Try adjusting your search or filters.</p>
            <button
              onClick={clearFilters}
              style={{
                padding: "10px 22px", borderRadius: 10,
                background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
                color: E.light, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 200ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(16,185,129,0.14)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(16,185,129,0.08)")}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
            {filtered.map((challenge) => {
              const cp      = getProgress(challenge.id);
              const status  = cp.status;
              const ds      = DIFF_STYLES[challenge.difficulty];
              const ss      = STATUS_STYLES[status];
              const btn     = getButtonLabel(status);
              const BtnIcon = btn.icon;

              const cardBorder =
                status === "Completed"  ? "1px solid rgba(16,185,129,0.22)" :
                status === "In Progress" ? "1px solid rgba(234,179,8,0.22)" :
                "1px solid rgba(16,185,129,0.08)";

              const accentBarBg =
                status === "In Progress" ? "linear-gradient(90deg, #EAB308, #F97316)" :
                status === "Completed"   ? `linear-gradient(90deg, ${E.mid}, ${E.bright})` :
                null;

              return (
                <div
                  key={challenge.id}
                  style={{
                    display: "flex", flexDirection: "column",
                    borderRadius: 16, overflow: "hidden",
                    background: "rgba(15,23,42,0.85)",
                    border: cardBorder,
                    transition: "all 280ms ease",
                    cursor: "pointer",
                    boxShadow: status === "Completed" ? "0 0 20px rgba(16,185,129,0.06)" : "0 2px 12px rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = status === "Completed"
                      ? "0 16px 40px rgba(0,0,0,0.3), 0 0 28px rgba(16,185,129,0.1)"
                      : "0 16px 40px rgba(0,0,0,0.3)";
                    if (status === "Not Started") el.style.borderColor = "rgba(16,185,129,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "none";
                    el.style.boxShadow = status === "Completed" ? "0 0 20px rgba(16,185,129,0.06)" : "0 2px 12px rgba(0,0,0,0.2)";
                    el.style.borderColor =
                      status === "Completed"  ? "rgba(16,185,129,0.22)" :
                      status === "In Progress" ? "rgba(234,179,8,0.22)" :
                      "rgba(16,185,129,0.08)";
                  }}
                  onClick={() => handleSolveClick(challenge.id)}
                >
                  {/* Top accent line */}
                  {accentBarBg && (
                    <div style={{ height: 2, width: "100%", background: accentBarBg, flexShrink: 0 }} />
                  )}

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 22px", gap: 16 }}>
                    {/* Header row: icon + badges */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                      {/* Icon */}
                      <div style={{
                        width: 42, height: 42, borderRadius: 11,
                        background: ds.bg, border: `1px solid ${ds.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        boxShadow: `0 0 16px ${ds.glow}`,
                        transition: "transform 250ms ease",
                      }}>
                        {status === "Completed"
                          ? <CheckCircle2 size={19} color={E.bright} />
                          : <MonitorPlay  size={19} color={ds.text} strokeWidth={1.75} />
                        }
                      </div>

                      {/* Badges */}
                      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", justifyContent: "flex-end" }}>
                        {/* Difficulty badge */}
                        <span style={{
                          padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 800,
                          background: ds.bg, border: `1px solid ${ds.border}`, color: ds.text,
                          letterSpacing: "0.04em",
                        }}>
                          {challenge.difficulty}
                        </span>
                        {/* Status badge */}
                        <span style={{
                          display: "flex", alignItems: "center", gap: 5,
                          padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700,
                          background: ss.bg, border: `1px solid ${ss.border}`, color: ss.text,
                        }}>
                          <span style={{
                            width: 5, height: 5, borderRadius: "50%", background: ss.dot, flexShrink: 0,
                            boxShadow: status === "In Progress" ? `0 0 6px ${ss.dot}` : status === "Completed" ? `0 0 6px ${ss.dot}` : "none",
                          }} />
                          {status}
                        </span>
                      </div>
                    </div>

                    {/* Title & description */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 15, letterSpacing: "-0.01em", lineHeight: 1.3, marginBottom: 8 }}>
                        {challenge.title}
                      </h3>
                      <p style={{
                        color: "#475569", fontSize: 13, lineHeight: 1.7,
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {challenge.description}
                      </p>
                    </div>

                    {/* Tags */}
                    {challenge.tags && challenge.tags.length > 0 && (
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {challenge.tags.slice(0, 3).map((tag) => (
                          <span key={tag} style={{
                            padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700,
                            background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)",
                            color: "#334155",
                          }}>{tag}</span>
                        ))}
                      </div>
                    )}

                    {/* Meta row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#334155", fontSize: 12 }}>
                        <Clock size={12} color="#334155" />
                        {challenge.timeEstimate}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
                        <Star size={12} color={E.bright} fill={E.bright} />
                        <span style={{ color: E.bright, fontWeight: 800 }}>+{challenge.xp}</span>
                        <span style={{ color: "#334155" }}>XP</span>
                      </span>
                      <span style={{
                        marginLeft: "auto", padding: "2px 10px", borderRadius: 99, fontSize: 10, fontWeight: 700,
                        background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.1)",
                        color: "#334155",
                      }}>
                        {challenge.category}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSolveClick(challenge.id); }}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "11px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                        cursor: "pointer", transition: "all 220ms ease",
                        ...(status === "Completed"
                          ? { background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)", color: E.bright }
                          : status === "In Progress"
                          ? { background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.22)", color: "#EAB308" }
                          : { background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", color: E.light }
                        ),
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        if (status === "Not Started") {
                          el.style.background = `linear-gradient(135deg, ${E.mid}, ${E.bright})`;
                          el.style.color = "#F0FDF4";
                          el.style.borderColor = "transparent";
                          el.style.boxShadow = "0 0 20px rgba(16,185,129,0.25)";
                        } else if (status === "In Progress") {
                          el.style.background = "rgba(234,179,8,0.14)";
                          el.style.boxShadow = "0 0 16px rgba(234,179,8,0.12)";
                        } else {
                          el.style.background = "rgba(16,185,129,0.14)";
                          el.style.boxShadow = "0 0 16px rgba(16,185,129,0.12)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.boxShadow = "none";
                        if (status === "Not Started") {
                          el.style.background = "rgba(16,185,129,0.06)";
                          el.style.color = E.light;
                          el.style.borderColor = "rgba(16,185,129,0.15)";
                        } else if (status === "In Progress") {
                          el.style.background = "rgba(234,179,8,0.08)";
                        } else {
                          el.style.background = "rgba(16,185,129,0.08)";
                        }
                      }}
                    >
                      <BtnIcon size={15} strokeWidth={2} />
                      {btn.label}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
