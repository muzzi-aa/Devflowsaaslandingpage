import { useState } from "react";
import { Trophy, Star, Zap, TrendingUp, ArrowUp } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const USER_SCORE = 12850;

const ALL_USERS = {
  "This Week": [
    { rank: 1, name: "Alex Chen",       initials: "A", score: 3420, tier: "Diamond",  gap: +920  },
    { rank: 2, name: "Sarah Jenkins",   initials: "S", score: 2980, tier: "Diamond",  gap: +480  },
    { rank: 3, name: "Mufiza Dev",      initials: "M", score: 2500, tier: "Platinum", gap: null, isYou: true },
    { rank: 4, name: "David Kim",       initials: "D", score: 2210, tier: "Platinum", gap: -290  },
    { rank: 5, name: "Elena Rodriguez", initials: "E", score: 1890, tier: "Gold",     gap: -610  },
  ],
  "This Month": [
    { rank: 1, name: "Alex Chen",       initials: "A", score: 14500, tier: "Diamond",  gap: +1650 },
    { rank: 2, name: "Sarah Jenkins",   initials: "S", score: 13200, tier: "Diamond",  gap: +350  },
    { rank: 3, name: "Mufiza Dev",      initials: "M", score: USER_SCORE, tier: "Platinum", gap: null, isYou: true },
    { rank: 4, name: "David Kim",       initials: "D", score: 11900, tier: "Platinum", gap: -950  },
    { rank: 5, name: "Elena Rodriguez", initials: "E", score: 10500, tier: "Gold",     gap: -2350 },
  ],
  "All Time": [
    { rank: 1, name: "Alex Chen",       initials: "A", score: 98400, tier: "Diamond",  gap: +22600 },
    { rank: 2, name: "Elena Rodriguez", initials: "E", score: 89100, tier: "Diamond",  gap: +13300 },
    { rank: 3, name: "Sarah Jenkins",   initials: "S", score: 81500, tier: "Diamond",  gap: +5700  },
    { rank: 4, name: "David Kim",       initials: "D", score: 79200, tier: "Platinum", gap: +3400  },
    { rank: 5, name: "Mufiza Dev",      initials: "M", score: 75800, tier: "Platinum", gap: null, isYou: true },
  ],
};

type FilterKey = keyof typeof ALL_USERS;

// ─── Tier config ──────────────────────────────────────────────────────────────
const TIER_CONFIG: Record<string, { color: string; bg: string; border: string; glow: string; icon: string }> = {
  Diamond: {
    color:  "#60A5FA",
    bg:     "rgba(96,165,250,0.12)",
    border: "rgba(96,165,250,0.3)",
    glow:   "rgba(96,165,250,0.15)",
    icon:   "💎",
  },
  Platinum: {
    color:  "#C084FC",
    bg:     "rgba(192,132,252,0.12)",
    border: "rgba(192,132,252,0.3)",
    glow:   "rgba(192,132,252,0.15)",
    icon:   "⬡",
  },
  Gold: {
    color:  "#FBbf24",
    bg:     "rgba(251,191,36,0.12)",
    border: "rgba(251,191,36,0.3)",
    glow:   "rgba(251,191,36,0.15)",
    icon:   "★",
  },
};

// ─── Trophy icons ─────────────────────────────────────────────────────────────
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="relative flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full blur-md opacity-60"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.6), transparent)" }}
        />
        <div
          className="relative w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #FBbf24, #F59E0B, #D97706)", boxShadow: "0 0 16px rgba(251,191,36,0.5)" }}
        >
          <Trophy className="w-4 h-4" style={{ color: "#111418" }} />
        </div>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="relative flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40"
          style={{ background: "radial-gradient(circle, rgba(148,163,184,0.5), transparent)" }}
        />
        <div
          className="relative w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #CBD5E1, #94A3B8, #64748B)", boxShadow: "0 0 12px rgba(148,163,184,0.4)" }}
        >
          <Trophy className="w-4 h-4" style={{ color: "#111418" }} />
        </div>
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="relative flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40"
          style={{ background: "radial-gradient(circle, rgba(180,83,9,0.5), transparent)" }}
        />
        <div
          className="relative w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #D97706, #B45309, #92400E)", boxShadow: "0 0 12px rgba(180,83,9,0.35)" }}
        >
          <Trophy className="w-4 h-4" style={{ color: "#FDE68A" }} />
        </div>
      </div>
    );
  }
  return (
    <span
      className="font-mono text-sm font-semibold tabular-nums"
      style={{ color: "#4B5563" }}
    >
      #{rank}
    </span>
  );
}

// ─── Score display ────────────────────────────────────────────────────────────
function ScoreCell({ score, gap, isYou }: { score: number; gap: number | null; isYou?: boolean }) {
  const formatted = score.toLocaleString();
  const showGap = gap !== null && gap > 0; // only show positive gap (ahead of user)

  return (
    <div className="flex flex-col items-end gap-0.5">
      <span
        className="font-mono text-sm font-semibold tabular-nums"
        style={{ color: isYou ? "#4ADE80" : "#FFFFFF" }}
      >
        {formatted}
      </span>
      {showGap && (
        <span
          className="flex items-center gap-0.5 text-[10px] font-mono font-medium"
          style={{ color: "#F87171" }}
        >
          <ArrowUp className="w-2.5 h-2.5" />
          +{gap!.toLocaleString()}
        </span>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Leaderboard() {
  const [filter, setFilter] = useState<FilterKey>("This Month");
  const users = ALL_USERS[filter];
  const youEntry = users.find((u) => u.isYou);

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#FFFFFF" }}>Leaderboard</h1>
          <p className="mt-2 text-sm" style={{ color: "#9AA4B2" }}>
            See how you rank against other developers.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex rounded-xl p-1 self-start sm:self-auto"
          style={{ backgroundColor: "#111418", border: "1px solid #2A2F35" }}
        >
          {(Object.keys(ALL_USERS) as FilterKey[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: filter === f ? "#1A1F24" : "transparent",
                color:           filter === f ? "#4ADE80" : "#9AA4B2",
                boxShadow:       filter === f ? "0 1px 4px rgba(0,0,0,0.4)" : "none",
                border:          filter === f ? "1px solid rgba(74,222,128,0.25)" : "1px solid transparent",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Your stats card ── */}
      {youEntry && (
        <div
          className="grid grid-cols-3 gap-4"
        >
          {[
            {
              label: "Your Rank",
              value: `#${youEntry.rank}`,
              icon: <Star className="w-4 h-4" />,
              color: "#4ADE80",
              bg: "rgba(74,222,128,0.06)",
              border: "rgba(74,222,128,0.2)",
            },
            {
              label: "Your Score",
              value: youEntry.score.toLocaleString(),
              icon: <Zap className="w-4 h-4" />,
              color: "#C084FC",
              bg: "rgba(192,132,252,0.06)",
              border: "rgba(192,132,252,0.2)",
            },
            {
              label: "Your Tier",
              value: youEntry.tier,
              icon: <TrendingUp className="w-4 h-4" />,
              color: TIER_CONFIG[youEntry.tier].color,
              bg: TIER_CONFIG[youEntry.tier].bg,
              border: TIER_CONFIG[youEntry.tier].border,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="px-4 py-4 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${s.bg}`, color: s.color, border: `1px solid ${s.border}` }}
              >
                {s.icon}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: s.color, opacity: 0.7 }}>{s.label}</p>
                <p className="font-bold text-sm mt-0.5" style={{ color: s.color }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Leaderboard table (original structure preserved) ── */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "#2A2F35", backgroundColor: "#1A1F24" }}
      >
        {/* Column headers — original grid preserved */}
        <div
          className="grid grid-cols-12 gap-4 px-6 py-4 text-xs font-medium uppercase tracking-wider"
          style={{ color: "#9AA4B2", borderBottom: "1px solid #2A2F35" }}
        >
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-5">Developer</div>
          <div className="col-span-3 text-right">Score</div>
          <div className="col-span-2 text-right">Tier</div>
        </div>

        {/* Rows */}
        <div>
          {users.map((user, idx) => {
            const isYou = !!user.isYou;
            const tierCfg = TIER_CONFIG[user.tier];
            const isLast = idx === users.length - 1;

            return (
              <div
                key={`${filter}-${user.rank}`}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center relative transition-all group"
                style={{
                  borderBottom: isLast ? "none" : "1px solid #2A2F35",
                  backgroundColor: isYou
                    ? "rgba(74,222,128,0.04)"
                    : "transparent",
                  // Glowing border for the "You" row
                  boxShadow: isYou
                    ? "inset 0 0 0 1.5px rgba(74,222,128,0.35), 0 0 24px rgba(74,222,128,0.05)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isYou) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
                }}
                onMouseLeave={(e) => {
                  if (!isYou) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {/* Left accent bar for "You" row */}
                {isYou && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                    style={{ background: "linear-gradient(to bottom, transparent, #4ADE80, transparent)" }}
                  />
                )}

                {/* ── RANK col ── */}
                <div className="col-span-2 flex justify-center">
                  <RankBadge rank={user.rank} />
                </div>

                {/* ── DEVELOPER col ── */}
                <div className="col-span-5 flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 relative"
                    style={{
                      background: isYou
                        ? "linear-gradient(135deg, #4ADE80, #22C55E)"
                        : user.rank === 1
                        ? "linear-gradient(135deg, #FBbf24, #D97706)"
                        : user.rank === 2
                        ? "linear-gradient(135deg, #CBD5E1, #64748B)"
                        : "#2A2F35",
                      color: isYou || user.rank <= 2 ? "#111418" : "#FFFFFF",
                      boxShadow: isYou
                        ? "0 0 12px rgba(74,222,128,0.4)"
                        : user.rank === 1
                        ? "0 0 10px rgba(251,191,36,0.3)"
                        : "none",
                    }}
                  >
                    {user.initials}
                    {/* Online dot for you */}
                    {isYou && (
                      <span
                        className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                        style={{ backgroundColor: "#4ADE80", borderColor: "#1A1F24" }}
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span
                      className="font-medium text-sm truncate"
                      style={{ color: isYou ? "#4ADE80" : "#FFFFFF" }}
                    >
                      {user.name}
                    </span>
                    {isYou && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,197,94,0.1))",
                          border: "1px solid rgba(74,222,128,0.4)",
                          color: "#4ADE80",
                          boxShadow: "0 0 8px rgba(74,222,128,0.2)",
                        }}
                      >
                        YOU
                      </span>
                    )}
                  </div>
                </div>

                {/* ── SCORE col ── */}
                <div className="col-span-3 flex justify-end">
                  <ScoreCell score={user.score} gap={user.gap} isYou={isYou} />
                </div>

                {/* ── TIER col ── */}
                <div className="col-span-2 flex justify-end">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                    style={{
                      backgroundColor: tierCfg.bg,
                      border: `1px solid ${tierCfg.border}`,
                      color: tierCfg.color,
                      boxShadow: isYou ? `0 0 10px ${tierCfg.glow}` : "none",
                    }}
                  >
                    <span style={{ fontSize: 10 }}>{tierCfg.icon}</span>
                    {user.tier}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Gap legend ── */}
      <div
        className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 rounded-xl text-xs"
        style={{ backgroundColor: "#1A1F24", border: "1px solid #2A2F35", color: "#4B5563" }}
      >
        <span
          className="flex items-center gap-1.5"
          style={{ color: "#F87171" }}
        >
          <ArrowUp className="w-3 h-3" />
          Red gap = points ahead of you
        </span>
        <span className="hidden sm:inline" style={{ color: "#2A2F35" }}>|</span>
        <span>Scores refresh every 24 hours</span>
        <span className="hidden sm:inline" style={{ color: "#2A2F35" }}>|</span>
        <span>Top 100 shown · {filter} window</span>
      </div>
    </div>
  );
}
