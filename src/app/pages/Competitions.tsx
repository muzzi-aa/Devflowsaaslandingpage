import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Trophy,
  Clock,
  Users,
  Search,
  X,
  Calendar,
  Zap,
  CheckCircle2,
  Medal,
  PlayCircle,
  Star,
  Target,
  ChevronDown,
  ChevronUp,
  Flame,
  Award,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Competition {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: number;
  prize: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
}

type ComputedStatus = "upcoming" | "active" | "completed";

interface RichCompetition extends Competition {
  status: ComputedStatus;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const COMPETITIONS_DATA: Competition[] = [
  {
    id: 1,
    title: "Spring Code Sprint",
    description:
      "A 10-day intensive coding challenge covering algorithms, data structures, and system design problems across 5 difficulty tiers.",
    startDate: "2026-03-25T00:00:00",
    endDate: "2026-04-03T23:59:59",
    participants: 2847,
    prize: "$5,000",
    difficulty: "Intermediate",
    tags: ["algorithms", "data-structures"],
  },
  {
    id: 2,
    title: "Algorithm Blitz",
    description:
      "Speed-code classic algorithm challenges under time pressure. Top 100 participants win exclusive DevFlow merch and cash prizes.",
    startDate: "2026-03-28T08:00:00",
    endDate: "2026-04-01T20:00:00",
    participants: 1203,
    prize: "$2,500",
    difficulty: "Advanced",
    tags: ["algorithms", "competitive"],
  },
  {
    id: 3,
    title: "Global Hackathon 2026",
    description:
      "Build an AI-powered developer tool in 72 hours. Teams of 2–4. Judged on innovation, code quality, and real-world impact.",
    startDate: "2026-04-05T09:00:00",
    endDate: "2026-04-12T18:00:00",
    participants: 512,
    prize: "$15,000",
    difficulty: "Advanced",
    tags: ["hackathon", "ai", "teams"],
  },
  {
    id: 4,
    title: "System Design Championship",
    description:
      "Design scalable distributed systems under real interview conditions. Ideal for senior engineers looking to sharpen architecture skills.",
    startDate: "2026-04-15T10:00:00",
    endDate: "2026-04-20T18:00:00",
    participants: 324,
    prize: "$8,000",
    difficulty: "Advanced",
    tags: ["system-design", "architecture"],
  },
  {
    id: 5,
    title: "ML Challenge Cup",
    description:
      "Train machine learning models on novel datasets and compete for the highest accuracy. Beginner-friendly with starter notebooks provided.",
    startDate: "2026-05-01T00:00:00",
    endDate: "2026-05-07T23:59:59",
    participants: 189,
    prize: "$3,000",
    difficulty: "Beginner",
    tags: ["machine-learning", "data-science"],
  },
  {
    id: 6,
    title: "Winter Code Wars",
    description:
      "The ultimate coding tournament of Q1 2026. 500+ problems, 30-day marathon format. Climb the global leaderboard.",
    startDate: "2026-03-01T00:00:00",
    endDate: "2026-03-15T23:59:59",
    participants: 4210,
    prize: "$10,000",
    difficulty: "Advanced",
    tags: ["competitive", "marathon"],
  },
  {
    id: 7,
    title: "Debugging Masters",
    description:
      "Find and fix 50 progressively harder bugs across 5 language tracks: JavaScript, Python, Go, Rust, and C++.",
    startDate: "2026-02-15T00:00:00",
    endDate: "2026-03-10T23:59:59",
    participants: 1876,
    prize: "$4,000",
    difficulty: "Beginner",
    tags: ["debugging", "multi-language"],
  },
];

// ─── LocalStorage ─────────────────────────────────────────────────────────────
const STORAGE_KEY = "devflow_joined_competitions";

function loadJoined(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set<number>();
  } catch {
    return new Set<number>();
  }
}

function persistJoined(set: Set<number>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function computeStatus(c: Competition): ComputedStatus {
  const now = Date.now();
  const start = new Date(c.startDate).getTime();
  const end = new Date(c.endDate).getTime();
  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "active";
}

function msUntil(dateStr: string): number {
  return new Date(dateStr).getTime() - Date.now();
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function daysUntil(dateStr: string): number {
  return Math.ceil(msUntil(dateStr) / (1000 * 60 * 60 * 24));
}

function hoursUntil(dateStr: string): number {
  return Math.ceil(msUntil(dateStr) / (1000 * 60 * 60));
}

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtParticipants(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

// ─── Design Tokens ───────────────────────────────────────────────────────────
const E = {
  bright: "#10B981",
  light:  "#34D399",
  mid:    "#166534",
  dark:   "#14532D",
  glow:   "rgba(16,185,129,0.18)",
};

const DIFF_STYLES = {
  Beginner:     { bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.28)",  text: "#34D399", glow: "rgba(52,211,153,0.14)"  },
  Intermediate: { bg: "rgba(234,179,8,0.1)",   border: "rgba(234,179,8,0.28)",   text: "#EAB308", glow: "rgba(234,179,8,0.12)"   },
  Advanced:     { bg: "rgba(239,68,68,0.09)",  border: "rgba(239,68,68,0.26)",   text: "#EF4444", glow: "rgba(239,68,68,0.10)"   },
};

const STATUS_STYLES = {
  active:    { bg: "rgba(16,185,129,0.1)",   border: "rgba(16,185,129,0.28)",  text: E.bright, dot: E.bright },
  upcoming:  { bg: "rgba(99,102,241,0.1)",   border: "rgba(99,102,241,0.25)",  text: "#818CF8", dot: "#818CF8" },
  completed: { bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.18)", text: "#64748B", dot: "#475569" },
};

// ─── LiveCountdown ─────────────────────────────────────────────────────────
function LiveCountdown({ endDate, urgent }: { endDate: string; urgent?: boolean }) {
  const [ms, setMs] = useState(() => msUntil(endDate));
  useEffect(() => {
    const id = setInterval(() => setMs(msUntil(endDate)), 1000);
    return () => clearInterval(id);
  }, [endDate]);

  const isUrgent = ms < 3_600_000;

  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontWeight: 800,
        fontSize: urgent ? 22 : 17,
        letterSpacing: "0.06em",
        color: isUrgent ? "#EF4444" : E.light,
        textShadow: isUrgent ? "0 0 16px rgba(239,68,68,0.4)" : `0 0 16px rgba(52,211,153,0.3)`,
      }}
    >
      {formatCountdown(ms)}
    </span>
  );
}

// ─── StartsIn ────────────────────────────────────────────────────────────────
function StartsIn({ startDate }: { startDate: string }) {
  const days = daysUntil(startDate);
  const hours = hoursUntil(startDate);
  if (days > 1) return <span>Starts in <strong style={{ color: "#818CF8" }}>{days} days</strong></span>;
  if (hours > 0) return <span>Starts in <strong style={{ color: "#EAB308" }}>{hours}h</strong></span>;
  return <span style={{ color: E.bright }}>Starting soon</span>;
}

// ─── Schedule Modal ───────────────────────────────────────────────────────────
function ScheduleModal({
  competitions,
  joinedIds,
  onJoin,
  onClose,
}: {
  competitions: RichCompetition[];
  joinedIds: Set<number>;
  onJoin: (id: number) => void;
  onClose: () => void;
}) {
  const upcoming = competitions.filter((c) => c.status === "upcoming");

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: "100%", maxWidth: 640, maxHeight: "88vh",
          display: "flex", flexDirection: "column", overflow: "hidden",
          background: "#0F172A", border: "1px solid rgba(16,185,129,0.15)",
          borderRadius: 20, boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(16,185,129,0.05)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(16,185,129,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Calendar size={17} color={E.bright} />
            </div>
            <div>
              <h2 style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 15 }}>Upcoming Schedule</h2>
              <p style={{ color: "#334155", fontSize: 12, marginTop: 1 }}>{upcoming.length} competitions coming up</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(16,185,129,0.1)", background: "rgba(16,185,129,0.05)", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 150ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.1)"; e.currentTarget.style.color = E.light; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.05)"; e.currentTarget.style.color = "#475569"; }}
          >
            <X size={14} />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {upcoming.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 24px", gap: 10 }}>
              <Calendar size={36} color="#1E293B" />
              <p style={{ color: "#F0FDF4", fontWeight: 700 }}>No upcoming competitions</p>
              <p style={{ color: "#334155", fontSize: 13 }}>Check back soon for new events.</p>
            </div>
          ) : (
            upcoming.map((c) => {
              const joined = joinedIds.has(c.id);
              const ds = DIFF_STYLES[c.difficulty];
              return (
                <div
                  key={c.id}
                  style={{
                    padding: "16px 18px", borderRadius: 12,
                    background: "rgba(16,23,42,0.8)", border: "1px solid rgba(16,185,129,0.08)",
                    transition: "border-color 200ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.18)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.08)")}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, flexWrap: "wrap" }}>
                        <span style={{ padding: "2px 9px", borderRadius: 99, fontSize: 11, fontWeight: 800, background: ds.bg, border: `1px solid ${ds.border}`, color: ds.text }}>{c.difficulty}</span>
                        <span style={{ color: "#334155", fontSize: 11 }}>{fmtDate(c.startDate)} → {fmtDate(c.endDate)}</span>
                      </div>
                      <p style={{ color: "#F0FDF4", fontWeight: 700, fontSize: 14 }}>{c.title}</p>
                    </div>
                    <span style={{ color: E.bright, fontWeight: 900, fontSize: 15, flexShrink: 0 }}>{c.prize}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, color: "#334155" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Users size={12} />{fmtParticipants(c.participants)} registered</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} /><StartsIn startDate={c.startDate} /></span>
                    </div>
                    <button
                      onClick={() => onJoin(c.id)}
                      style={{
                        padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 180ms",
                        ...(joined
                          ? { background: "rgba(16,185,129,0.1)", color: E.bright, border: "1px solid rgba(16,185,129,0.25)" }
                          : { background: "rgba(16,185,129,0.07)", color: E.light, border: "1px solid rgba(16,185,129,0.18)" }
                        ),
                      }}
                      onMouseEnter={(e) => { if (!joined) { e.currentTarget.style.background = "rgba(16,185,129,0.14)"; } }}
                      onMouseLeave={(e) => { if (!joined) { e.currentTarget.style.background = "rgba(16,185,129,0.07)"; } }}
                    >
                      {joined ? "✓ Registered" : "Register"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Active Card ─────────────────────────────────────────────────────────────
function ActiveCard({ comp, joined, onJoin }: { comp: RichCompetition; joined: boolean; onJoin: (id: number) => void }) {
  const ds = DIFF_STYLES[comp.difficulty];

  return (
    <div
      style={{
        display: "flex", flexDirection: "column", gap: 0,
        borderRadius: 18, overflow: "hidden",
        background: "rgba(15,23,42,0.9)",
        border: joined ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(16,185,129,0.12)",
        boxShadow: joined ? `0 0 30px rgba(16,185,129,0.08), 0 4px 24px rgba(0,0,0,0.3)` : "0 4px 24px rgba(0,0,0,0.25)",
        transition: "all 280ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = joined
          ? "0 20px 48px rgba(0,0,0,0.35), 0 0 36px rgba(16,185,129,0.12)"
          : "0 20px 48px rgba(0,0,0,0.35), 0 0 24px rgba(16,185,129,0.06)";
        el.style.borderColor = "rgba(16,185,129,0.25)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "none";
        el.style.boxShadow = joined ? "0 0 30px rgba(16,185,129,0.08), 0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.25)";
        el.style.borderColor = joined ? "rgba(16,185,129,0.3)" : "rgba(16,185,129,0.12)";
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${E.dark}, ${E.bright}, ${E.light})`, flexShrink: 0 }} />

      <div style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 20px rgba(16,185,129,0.1)" }}>
            <Trophy size={21} color={E.bright} strokeWidth={1.75} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {/* Difficulty badge */}
            <span style={{ padding: "3px 11px", borderRadius: 99, fontSize: 11, fontWeight: 800, background: ds.bg, border: `1px solid ${ds.border}`, color: ds.text, letterSpacing: "0.04em" }}>
              {comp.difficulty}
            </span>
            {/* Live badge */}
            <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 11px", borderRadius: 99, fontSize: 11, fontWeight: 800, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.28)", color: E.bright }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: E.bright, boxShadow: `0 0 8px ${E.bright}`, animation: "pulse 1.5s ease-in-out infinite" }} />
              Live
            </span>
          </div>
        </div>

        {/* Title & description */}
        <div>
          <h3 style={{ color: "#F0FDF4", fontWeight: 900, fontSize: 19, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.2 }}>
            {comp.title}
          </h3>
          <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {comp.description}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {comp.tags.map((tag) => (
            <span key={tag} style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.14)", color: "#334155" }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#475569" }}>
            <Users size={13} color="#334155" />
            <span><strong style={{ color: "#64748B", fontWeight: 700 }}>{fmtParticipants(comp.participants)}</strong> participants</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            <Star size={13} color={E.bright} fill={E.bright} />
            <strong style={{ color: E.light, fontWeight: 900 }}>{comp.prize}</strong>
            <span style={{ color: "#334155" }}>prize</span>
          </span>
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#334155" }}>
            <Calendar size={12} />
            Ends {fmtDate(comp.endDate)}
          </span>
        </div>

        {/* Countdown */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderRadius: 12, background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Clock size={13} color={E.bright} />
            <span style={{ color: "#334155", fontSize: 12, fontWeight: 600 }}>Time remaining</span>
          </div>
          <LiveCountdown endDate={comp.endDate} urgent />
        </div>

        {/* CTA */}
        <button
          onClick={() => onJoin(comp.id)}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "13px", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: "pointer",
            transition: "all 220ms ease",
            ...(joined
              ? { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.28)", color: E.bright }
              : { background: `linear-gradient(135deg, ${E.dark}, ${E.mid})`, border: "1px solid rgba(16,185,129,0.3)", color: "#F0FDF4" }
            ),
          }}
          onMouseEnter={(e) => {
            if (!joined) {
              e.currentTarget.style.background = `linear-gradient(135deg, ${E.mid}, ${E.bright})`;
              e.currentTarget.style.boxShadow = "0 0 28px rgba(16,185,129,0.3)";
              e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)";
            } else {
              e.currentTarget.style.background = "rgba(16,185,129,0.16)";
            }
          }}
          onMouseLeave={(e) => {
            if (!joined) {
              e.currentTarget.style.background = `linear-gradient(135deg, ${E.dark}, ${E.mid})`;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
            } else {
              e.currentTarget.style.background = "rgba(16,185,129,0.1)";
            }
          }}
        >
          {joined ? (
            <><CheckCircle2 size={16} strokeWidth={2.5} /> Joined</>
          ) : (
            <><PlayCircle size={16} strokeWidth={2} /> Join Competition</>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Compact Row ─────────────────────────────────────────────────────────────
function CompactRow({ comp, joined, onJoin, showJoin }: { comp: RichCompetition; joined: boolean; onJoin: (id: number) => void; showJoin: boolean }) {
  const ss = STATUS_STYLES[comp.status];
  const ds = DIFF_STYLES[comp.difficulty];

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 12,
        background: "rgba(15,23,42,0.7)", border: "1px solid rgba(16,185,129,0.08)",
        transition: "all 180ms ease",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(16,185,129,0.18)"; el.style.background = "rgba(15,23,42,0.9)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(16,185,129,0.08)"; el.style.background = "rgba(15,23,42,0.7)"; }}
    >
      {/* Status dot */}
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: ss.dot, flexShrink: 0, boxShadow: comp.status === "active" ? `0 0 8px ${ss.dot}` : "none" }} />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "#F0FDF4", fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{comp.title}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#334155" }}>
          <span>{fmtDate(comp.startDate)} → {fmtDate(comp.endDate)}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={11} />{fmtParticipants(comp.participants)}</span>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{ padding: "2px 9px", borderRadius: 99, fontSize: 11, fontWeight: 800, background: ds.bg, border: `1px solid ${ds.border}`, color: ds.text }}>{comp.difficulty}</span>
        <span style={{ color: E.bright, fontWeight: 900, fontSize: 13 }}>{comp.prize}</span>
        {comp.status === "upcoming" && (
          <span style={{ fontSize: 12, color: "#818CF8", fontWeight: 700 }}>{daysUntil(comp.startDate) > 0 ? `In ${daysUntil(comp.startDate)}d` : "Soon"}</span>
        )}
        {comp.status === "completed" && (
          <span style={{ fontSize: 12, color: "#475569" }}>Ended</span>
        )}
        {showJoin && (
          <button
            onClick={() => onJoin(comp.id)}
            style={{
              padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 160ms",
              ...(joined
                ? { background: "rgba(16,185,129,0.1)", color: E.bright, border: "1px solid rgba(16,185,129,0.25)" }
                : { background: "rgba(16,185,129,0.06)", color: E.light, border: "1px solid rgba(16,185,129,0.16)" }
              ),
            }}
            onMouseEnter={(e) => { if (!joined) e.currentTarget.style.background = "rgba(16,185,129,0.12)"; }}
            onMouseLeave={(e) => { if (!joined) e.currentTarget.style.background = "rgba(16,185,129,0.06)"; }}
          >
            {joined ? "✓ Joined" : "Register"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Competitions() {
  const [joinedIds, setJoinedIds] = useState<Set<number>>(loadJoined);
  const [search, setSearch] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const allCompetitions = useMemo<RichCompetition[]>(() =>
    COMPETITIONS_DATA.map((c) => ({ ...c, status: computeStatus(c) })),
    []
  );

  const handleJoin = useCallback((id: number) => {
    setJoinedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      persistJoined(next);
      return next;
    });
  }, []);

  const q = search.toLowerCase().trim();
  const filtered = useMemo(() =>
    allCompetitions.filter((c) =>
      !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.tags.some((t) => t.includes(q))
    ),
    [allCompetitions, q]
  );

  const activeComps    = filtered.filter((c) => c.status === "active");
  const upcomingComps  = filtered.filter((c) => c.status === "upcoming");
  const completedComps = filtered.filter((c) => c.status === "completed");

  const stats = [
    { label: "Active",    value: allCompetitions.filter((c) => c.status === "active").length,    icon: Flame,    color: E.bright,  bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.18)" },
    { label: "Upcoming",  value: allCompetitions.filter((c) => c.status === "upcoming").length,  icon: Calendar, color: "#818CF8", bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.18)" },
    { label: "Completed", value: allCompetitions.filter((c) => c.status === "completed").length, icon: Award,    color: "#64748B", bg: "rgba(100,116,139,0.07)", border: "rgba(100,116,139,0.15)" },
    { label: "Joined",    value: joinedIds.size,                                                  icon: Medal,    color: "#EAB308", bg: "rgba(234,179,8,0.08)",   border: "rgba(234,179,8,0.18)" },
  ];

  return (
    <>
      {/* Global keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>

      {showSchedule && (
        <ScheduleModal competitions={allCompetitions} joinedIds={joinedIds} onJoin={handleJoin} onClose={() => setShowSchedule(false)} />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <Trophy size={13} color={E.bright} />
              <span style={{ color: E.bright, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>COMPETITIONS</span>
            </div>
            <h1 style={{ color: "#F0FDF4", fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 6 }}>
              Competitions
            </h1>
            <p style={{ color: "#475569", fontSize: 14 }}>
              Compete globally and climb the{" "}
              <span style={{ color: E.light, fontWeight: 700 }}>DevFlow</span> ranks.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {joinedIds.size > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 10, background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)" }}>
                <Medal size={14} color="#EAB308" />
                <span style={{ color: "#EAB308", fontWeight: 700, fontSize: 13 }}>{joinedIds.size} joined</span>
              </div>
            )}
            <button
              onClick={() => setShowSchedule(true)}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 10,
                background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
                color: E.light, fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.14)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(16,185,129,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <Calendar size={14} />
              View Schedule
            </button>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {stats.map((s) => {
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

        {/* ── Search ── */}
        <div style={{ position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#334155", pointerEvents: "none" }} />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search competitions by title, description, or tag…"
            style={{
              width: "100%", paddingLeft: 42, paddingRight: search ? 40 : 16,
              paddingTop: 11, paddingBottom: 11, borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.07)", background: "rgba(15,23,42,0.8)",
              color: "#F0FDF4", fontSize: 14, outline: "none", caretColor: E.bright,
              transition: "border-color 200ms ease, background 200ms ease, box-shadow 200ms ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)"; e.currentTarget.style.background = "rgba(16,185,129,0.03)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.07)"; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(15,23,42,0.8)"; e.currentTarget.style.boxShadow = "none"; }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F0FDF4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* ── Active Competitions ── */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <h2 style={{ color: "#F0FDF4", fontWeight: 900, fontSize: 17, letterSpacing: "-0.02em" }}>Active Competitions</h2>
            <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 800, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: E.bright }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: E.bright, boxShadow: `0 0 8px ${E.bright}`, animation: "pulse 1.5s ease-in-out infinite" }} />
              {activeComps.length} live
            </span>
          </div>

          {activeComps.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px", borderRadius: 16, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(16,185,129,0.08)", gap: 10 }}>
              <Trophy size={32} color="#1E293B" />
              <p style={{ color: "#64748B", fontWeight: 700 }}>No active competitions right now</p>
              {search && <p style={{ color: "#334155", fontSize: 13 }}>Try clearing your search filter.</p>}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 18 }}>
              {activeComps.map((comp) => (
                <ActiveCard key={comp.id} comp={comp} joined={joinedIds.has(comp.id)} onJoin={handleJoin} />
              ))}
            </div>
          )}
        </section>

        {/* ── Upcoming Competitions ── */}
        {upcomingComps.length > 0 && (
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <h2 style={{ color: "#F0FDF4", fontWeight: 900, fontSize: 17, letterSpacing: "-0.02em" }}>Upcoming</h2>
              <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 800, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.22)", color: "#818CF8" }}>
                {upcomingComps.length} scheduled
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {upcomingComps.map((comp) => (
                <CompactRow key={comp.id} comp={comp} joined={joinedIds.has(comp.id)} onJoin={handleJoin} showJoin />
              ))}
            </div>
          </section>
        )}

        {/* ── Completed Competitions ── */}
        {completedComps.length > 0 && (
          <section>
            <button
              onClick={() => setShowCompleted((v) => !v)}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: showCompleted ? 14 : 0, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <h2 style={{ color: "#F0FDF4", fontWeight: 900, fontSize: 17, letterSpacing: "-0.02em" }}>Completed</h2>
              <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 800, background: "rgba(100,116,139,0.07)", border: "1px solid rgba(100,116,139,0.15)", color: "#475569" }}>
                {completedComps.length} past
              </span>
              {showCompleted ? <ChevronUp size={14} color="#475569" /> : <ChevronDown size={14} color="#475569" />}
            </button>
            {showCompleted && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {completedComps.map((comp) => (
                  <CompactRow key={comp.id} comp={comp} joined={joinedIds.has(comp.id)} onJoin={handleJoin} showJoin={false} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── Empty state (all filtered away) ── */}
        {filtered.length === 0 && search && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "72px 24px", borderRadius: 18, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(16,185,129,0.08)", gap: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Search size={22} color="#334155" />
            </div>
            <p style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 16 }}>No results for "{search}"</p>
            <p style={{ color: "#475569", fontSize: 13 }}>Try different keywords or clear the search.</p>
            <button
              onClick={() => setSearch("")}
              style={{ padding: "9px 22px", borderRadius: 10, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)", color: E.light, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 180ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(16,185,129,0.14)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(16,185,129,0.08)")}
            >
              Clear search
            </button>
          </div>
        )}

        {/* ── Promo banner ── */}
        <div style={{
          padding: "22px 28px", borderRadius: 16,
          background: `linear-gradient(135deg, rgba(20,83,45,0.5) 0%, rgba(22,101,52,0.3) 50%, rgba(15,23,42,0.6) 100%)`,
          border: "1px solid rgba(16,185,129,0.18)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap",
          boxShadow: "0 0 40px rgba(16,185,129,0.05)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
              <Target size={14} color={E.bright} />
              <span style={{ color: E.bright, fontSize: 12, fontWeight: 800, letterSpacing: "0.06em" }}>PRO TIP</span>
            </div>
            <p style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Register early for better seeding</p>
            <p style={{ color: "#475569", fontSize: 13 }}>Early registrants earn bonus XP and priority matchmaking in upcoming competitions.</p>
          </div>
          <button
            onClick={() => setShowSchedule(true)}
            style={{
              padding: "11px 22px", borderRadius: 10,
              background: `linear-gradient(135deg, ${E.dark}, ${E.mid})`,
              border: "1px solid rgba(16,185,129,0.3)", color: "#F0FDF4",
              fontWeight: 800, fontSize: 13, cursor: "pointer", transition: "all 200ms", flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${E.mid}, ${E.bright})`; e.currentTarget.style.boxShadow = "0 0 24px rgba(16,185,129,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${E.dark}, ${E.mid})`; e.currentTarget.style.boxShadow = "none"; }}
          >
            Browse Schedule →
          </button>
        </div>

      </div>
    </>
  );
}
