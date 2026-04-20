import {
  Upload,
  FileText,
  CreditCard,
  ArrowUpRight,
  File,
  TrendingUp,
  Clock,
  Zap,
  Code2,
  Activity,
  ChevronRight,
  Star,
  Terminal,
  GitBranch,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

// ── Emerald palette ──────────────────────────────────────────────────────────
const E = {
  darkest:  '#052E16',
  dark:     '#14532D',
  mid:      '#166534',
  base:     '#15803D',
  bright:   '#10B981',
  light:    '#34D399',
  faint:    'rgba(16,185,129,0.08)',
  faintMid: 'rgba(16,185,129,0.14)',
  faintHi:  'rgba(52,211,153,0.18)',
};

const CARD_BG   = 'rgba(15,23,42,0.8)';
const CARD_BOR  = '1px solid rgba(16,185,129,0.12)';
const CARD_BOR2 = '1px solid rgba(255,255,255,0.06)';
const TEXT_PRI  = '#F0FDF4';
const TEXT_SEC  = '#86EFAC';
const TEXT_MUT  = '#64748B';
const TEXT_DIM  = '#475569';

// ── Stats data ───────────────────────────────────────────────────────────────
const stats = [
  {
    icon: FileText,
    title: 'Total Uploads',
    value: '24',
    change: '+3 this week',
    changeUp: true,
    sub: 'Documents in library',
  },
  {
    icon: TrendingUp,
    title: 'Problems Solved',
    value: '87',
    change: '+12 this month',
    changeUp: true,
    sub: 'Coding challenges',
  },
  {
    icon: Clock,
    title: 'Time Saved',
    value: '14h',
    change: 'est. this month',
    changeUp: true,
    sub: 'AI-assisted sessions',
  },
  {
    icon: Zap,
    title: 'Searches Made',
    value: '342',
    change: '+28 today',
    changeUp: true,
    sub: 'Knowledge queries',
  },
];

// ── Quick actions ────────────────────────────────────────────────────────────
const quickActions = [
  {
    icon: Upload,
    title: 'Upload Content',
    description: 'Add notes, PDFs & resources',
    link: '/dashboard/upload',
    badge: 'New',
  },
  {
    icon: FileText,
    title: 'My Uploads',
    description: '24 items in your library',
    link: '/dashboard/uploads',
    badge: '24',
  },
  {
    icon: CreditCard,
    title: 'Upgrade to Pro',
    description: 'Unlimited uploads & AI search',
    link: '/dashboard/subscription',
    badge: '↑',
  },
];

// ── Recent uploads ───────────────────────────────────────────────────────────
const recentUploads = [
  { id: 1, title: 'React Hooks Cheatsheet',      type: 'PDF', date: 'Mar 8',  size: '2.4 MB', tag: 'React',      done: true  },
  { id: 2, title: 'Algorithm Solutions',          type: 'PDF', date: 'Mar 7',  size: '1.8 MB', tag: 'DSA',        done: true  },
  { id: 3, title: 'TypeScript Best Practices',    type: 'PDF', date: 'Mar 6',  size: '3.1 MB', tag: 'TypeScript', done: false },
  { id: 4, title: 'Node.js Performance Tips',     type: 'PDF', date: 'Mar 5',  size: '2.2 MB', tag: 'Backend',    done: false },
  { id: 5, title: 'CSS Grid Examples',            type: 'PDF', date: 'Mar 4',  size: '1.5 MB', tag: 'CSS',        done: true  },
];

// ── Activity feed ─────────────────────────────────────────────────────────────
const activity = [
  { icon: CheckCircle2, text: 'Solved "Two Sum" in Coding Arena',    time: '2m ago',  color: E.light  },
  { icon: Star,         text: 'Ranked #3 on the Leaderboard',        time: '18m ago', color: '#FBBF24'},
  { icon: GitBranch,    text: 'Career AI generated new roadmap',     time: '1h ago',  color: E.bright },
  { icon: Upload,       text: 'Uploaded "React Hooks Cheatsheet"',   time: '3h ago',  color: E.light  },
  { icon: Terminal,     text: 'Completed Focus Mode session (52m)',   time: '5h ago',  color: TEXT_MUT },
];

// ── Tag colour map ─────────────────────────────────────────────────────────────
const tagColor: Record<string, string> = {
  React:      E.bright,
  DSA:        E.light,
  TypeScript: '#818CF8',
  Backend:    '#FB923C',
  CSS:        '#F472B6',
};

// ─────────────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Global grid background ─────────────────────────────────────────── */}
      <style>{`
        .df-grid-bg {
          background-image:
            linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .stat-card:hover { transform: translateY(-2px); }
        .action-card:hover { transform: translateY(-1px); }
      `}</style>

      {/* ── Greeting banner ────────────────────────────────────────────────── */}
      <div
        className="df-grid-bg"
        style={{
          borderRadius: 16,
          border: CARD_BOR,
          background: `linear-gradient(135deg, rgba(20,83,45,0.45) 0%, rgba(15,23,42,0.9) 60%)`,
          padding: '32px 36px',
          marginBottom: 28,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow orb */}
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Bottom accent line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            {/* Status pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 99,
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.25)',
                fontSize: 11, color: E.light, fontWeight: 600, letterSpacing: '0.04em',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: E.light,
                  boxShadow: `0 0 6px ${E.light}`,
                  animation: 'pulse 2s infinite',
                }} />
                ONLINE · PRO PLAN
              </span>
            </div>

            <h1 style={{ color: TEXT_PRI, fontWeight: 700, fontSize: 26, marginBottom: 8, letterSpacing: '-0.02em' }}>
              Good morning, Mufiza 👋
            </h1>
            <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, maxWidth: 520 }}>
              You have{' '}
              <span style={{ color: E.light, fontWeight: 600 }}>3 new items</span> to review and{' '}
              <span style={{ color: E.light, fontWeight: 600 }}>26 slots</span> remaining on your Free plan.
              {' '}Upgrade to unlock unlimited access.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/dashboard/focus-mode" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '10px 20px', borderRadius: 10,
                border: '1px solid rgba(16,185,129,0.3)',
                background: 'rgba(16,185,129,0.08)',
                color: E.light, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 200ms ease',
                display: 'flex', alignItems: 'center', gap: 7,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(16,185,129,0.16)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(16,185,129,0.08)'; }}
              >
                <Activity size={14} />
                Start Focus Mode
              </button>
            </Link>
            <Link to="/dashboard/subscription" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '10px 20px', borderRadius: 10,
                background: `linear-gradient(135deg, ${E.base}, ${E.bright})`,
                color: '#052E16', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', border: 'none',
                transition: 'opacity 200ms ease',
                display: 'flex', alignItems: 'center', gap: 7,
                boxShadow: `0 0 20px rgba(16,185,129,0.25)`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
              >
                <Zap size={14} />
                Upgrade to Pro
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats row ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}
        className="grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <div
            key={s.title}
            className="stat-card"
            style={{
              background: `linear-gradient(145deg, rgba(20,83,45,0.2) 0%, rgba(15,23,42,0.85) 100%)`,
              border: CARD_BOR,
              borderRadius: 14,
              padding: '22px 22px 18px',
              cursor: 'pointer',
              transition: 'all 220ms ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={() => setHovered(s.title)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Top right glow */}
            <div style={{
              position: 'absolute', top: -20, right: -20, width: 80, height: 80,
              borderRadius: '50%',
              background: hovered === s.title
                ? 'radial-gradient(circle, rgba(52,211,153,0.18) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
              transition: 'all 220ms ease',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <s.icon size={17} color={E.bright} strokeWidth={2} />
              </div>
              <ArrowUpRight
                size={14}
                color={E.bright}
                style={{
                  opacity: hovered === s.title ? 1 : 0,
                  transition: 'opacity 200ms ease',
                  marginTop: 2,
                }}
              />
            </div>

            <div style={{ fontSize: 30, fontWeight: 800, color: TEXT_PRI, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 5 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: TEXT_MUT, marginBottom: 6, fontWeight: 500 }}>{s.title}</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 11, color: E.light, fontWeight: 600,
              background: 'rgba(52,211,153,0.1)', borderRadius: 6,
              padding: '2px 8px',
            }}>
              <TrendingUp size={10} />
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* ── Main two-column area ───────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 24, alignItems: 'start' }}>

        {/* Left: Recent Uploads table */}
        <div style={{
          background: 'rgba(15,23,42,0.85)',
          border: CARD_BOR,
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          {/* Table header */}
          <div style={{
            padding: '16px 22px',
            borderBottom: '1px solid rgba(16,185,129,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'rgba(16,185,129,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Code2 size={13} color={E.bright} />
              </div>
              <span style={{ color: TEXT_PRI, fontWeight: 700, fontSize: 13 }}>Recent Uploads</span>
              <span style={{
                padding: '2px 8px', borderRadius: 99,
                background: 'rgba(16,185,129,0.1)', fontSize: 10,
                color: E.light, fontWeight: 700,
              }}>24 total</span>
            </div>
            <Link
              to="/dashboard/uploads"
              style={{ color: E.bright, fontSize: 12, textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>

          {/* Rows */}
          {recentUploads.map((u, idx) => (
            <div
              key={u.id}
              style={{
                padding: '14px 22px',
                borderBottom: idx < recentUploads.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                display: 'flex', alignItems: 'center', gap: 14,
                cursor: 'pointer', transition: 'background 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* File icon */}
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <File size={14} color={E.bright} />
              </div>

              {/* Title + meta */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: TEXT_PRI, fontWeight: 500, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {u.title}
                </p>
                <p style={{ color: TEXT_DIM, fontSize: 11, marginTop: 2 }}>{u.type} · {u.size}</p>
              </div>

              {/* Tag */}
              <span style={{
                padding: '3px 10px', borderRadius: 99,
                fontSize: 10, fontWeight: 700,
                background: (tagColor[u.tag] || E.bright) + '18',
                color: tagColor[u.tag] || E.bright,
                flexShrink: 0,
              }}>{u.tag}</span>

              {/* Date */}
              <span style={{ color: TEXT_DIM, fontSize: 11, flexShrink: 0, minWidth: 42, textAlign: 'right' }}>{u.date}</span>

              {/* Status */}
              {u.done
                ? <CheckCircle2 size={15} color={E.bright} style={{ flexShrink: 0 }} />
                : <Circle size={15} color={TEXT_DIM} style={{ flexShrink: 0 }} />
              }
            </div>
          ))}
        </div>

        {/* Right: Activity feed */}
        <div style={{
          background: 'rgba(15,23,42,0.85)',
          border: CARD_BOR,
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(16,185,129,0.1)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'rgba(16,185,129,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Activity size={13} color={E.bright} />
            </div>
            <span style={{ color: TEXT_PRI, fontWeight: 700, fontSize: 13 }}>Activity</span>
          </div>

          <div style={{ padding: '8px 0' }}>
            {activity.map((a, idx) => (
              <div
                key={idx}
                style={{
                  padding: '11px 20px', display: 'flex', alignItems: 'flex-start', gap: 12,
                  cursor: 'default', transition: 'background 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Timeline line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: a.color + '18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <a.icon size={13} color={a.color} />
                  </div>
                  {idx < activity.length - 1 && (
                    <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.06)', marginTop: 3 }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                  <p style={{ color: '#CBD5E1', fontSize: 12, lineHeight: 1.5, fontWeight: 500 }}>{a.text}</p>
                  <p style={{ color: TEXT_DIM, fontSize: 10, marginTop: 3 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions ──────────────────────────────────────────────────── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 3, height: 14, borderRadius: 99, background: E.bright }} />
            <span style={{ color: '#64748B', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Quick Actions
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {quickActions.map((a) => (
            <Link
              key={a.title}
              to={a.link}
              className="action-card"
              style={{
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '18px 20px',
                borderRadius: 14,
                background: `linear-gradient(135deg, rgba(20,83,45,0.18) 0%, rgba(15,23,42,0.9) 100%)`,
                border: CARD_BOR,
                transition: 'all 220ms ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(16,185,129,0.35)';
                (e.currentTarget as HTMLAnchorElement).style.background = `linear-gradient(135deg, rgba(20,83,45,0.3) 0%, rgba(15,23,42,0.95) 100%)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(16,185,129,0.12)';
                (e.currentTarget as HTMLAnchorElement).style.background = `linear-gradient(135deg, rgba(20,83,45,0.18) 0%, rgba(15,23,42,0.9) 100%)`;
              }}
            >
              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <a.icon size={19} color={E.bright} strokeWidth={2} />
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: TEXT_PRI, fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{a.title}</p>
                <p style={{ color: TEXT_DIM, fontSize: 11 }}>{a.description}</p>
              </div>

              {/* Badge */}
              <span style={{
                padding: '3px 9px', borderRadius: 99, flexShrink: 0,
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: E.light, fontSize: 11, fontWeight: 700,
              }}>{a.badge}</span>

              {/* Arrow */}
              <ArrowUpRight size={14} color={E.bright} style={{ flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </div>

      {/* ── Terminal status bar ─────────────────────────────────────────────── */}
      <div style={{
        marginTop: 24,
        padding: '12px 20px',
        borderRadius: 10,
        background: 'rgba(5,46,22,0.4)',
        border: '1px solid rgba(16,185,129,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Terminal size={13} color={E.bright} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: E.light }}>
            devflow@mufiza:~${' '}
            <span style={{ color: '#94A3B8' }}>status</span>
          </span>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: TEXT_DIM, marginLeft: 8,
          }}>
            → 3 pending · 87 solved · Pro plan active
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: E.light, boxShadow: `0 0 6px ${E.light}` }} />
          <span style={{ fontSize: 11, color: E.light, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
            All systems operational
          </span>
        </div>
      </div>

    </div>
  );
}
