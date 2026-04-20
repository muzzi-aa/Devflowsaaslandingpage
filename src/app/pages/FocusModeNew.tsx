import {
  CheckCircle2, Circle,
  X, Brain, Shield, StickyNote, Zap, TrendingUp, ChevronRight, Play,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useFocusStore } from '../stores/useFocusStore';
import { FocusTimer } from '../components/FocusTimer';

const E = { bright: '#10B981', light: '#34D399', mid: '#166534', dark: '#14532D' };

const blockedSites = ['twitter.com', 'reddit.com', 'youtube.com', 'instagram.com', 'news.ycombinator.com'];

const aiSuggestions = [
  'Break "auth module" into 3 smaller subtasks',
  'You\'re most focused at 9–11am based on history',
  'Take a 5-min break after this session',
  'Similar task took 47m last Tuesday',
];

export default function FocusMode() {
  const { session, startSession, toggleTaskDone, getElapsedTime } = useFocusStore();
  const [noteText, setNoteText] = useState('Remember to check the refresh token expiry — JWT_EXPIRES_IN=7d in .env');
  const [aiIdx, setAiIdx] = useState(0);
  const [targetDuration, setTargetDuration] = useState(90); // minutes

  const handleStartSession = () => {
    startSession(targetDuration * 60, 'Implement authentication module');
  };

  const elapsed = getElapsedTime();
  const donePct = session ? (session.tasks.filter(t => t.done).length / session.tasks.length) * 100 : 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F172A', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Background grid */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(16,185,129,0.04) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      {/* Center glow */}
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* ── Top bar ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', height: 58,
        background: 'rgba(15,23,42,0.9)',
        borderBottom: '1px solid rgba(16,185,129,0.1)',
        backdropFilter: 'blur(12px)',
        position: 'relative', zIndex: 10, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${E.light}, ${E.bright})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={13} color="#0F172A" strokeWidth={2.5} />
          </div>
          <span style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>Dev<span style={{ color: E.light }}>Flow</span></span>
          <span style={{ color: '#334155', marginLeft: 4, fontSize: 13 }}>/</span>
          <span style={{ color: E.light, fontSize: 13, fontWeight: 600 }}>Focus Mode</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Session indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99, background: session?.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${session?.isActive ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.07)'}`, transition: 'all 300ms' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: session?.isActive ? E.light : '#475569', boxShadow: session?.isActive ? `0 0 6px ${E.light}` : 'none', transition: 'all 300ms' }} />
            <span style={{ fontSize: 12, color: session?.isActive ? E.light : '#475569', fontWeight: 600 }}>{session?.isActive ? 'Session active' : session ? 'Paused' : 'Not started'}</span>
          </div>
          <Link to="/dashboard/coding-arena" style={{ textDecoration: 'none' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8,
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              color: E.light, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(16,185,129,0.14)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(16,185,129,0.08)'; }}
            >
              Go to Coding Arena →
            </button>
          </Link>
        </div>
      </header>

      {/* ── Main three-column layout ── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr 300px', gap: 0, position: 'relative', zIndex: 1, minHeight: 0 }}>

        {/* ── Left panel: Stats ── */}
        <div style={{ borderRight: '1px solid rgba(16,185,129,0.08)', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
          <div>
            <p style={{ color: '#334155', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Session Stats</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Focus Streak', value: '7 days', icon: TrendingUp, up: true },
                { label: 'Deep Work Today', value: '3h 14m', icon: Zap, up: false },
                { label: 'Deep Work This Week', value: '14h', icon: Brain, up: true },
                { label: 'Tasks Done', value: session ? `${session.tasks.filter(t => t.done).length}/${session.tasks.length}` : '0/0', icon: CheckCircle2, up: false },
              ].map(s => (
                <div key={s.label} style={{
                  padding: '12px 14px', borderRadius: 10,
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(16,185,129,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <s.icon size={13} color={E.bright} />
                    </div>
                    <span style={{ color: '#64748B', fontSize: 12 }}>{s.label}</span>
                  </div>
                  <span style={{ color: '#F0FDF4', fontWeight: 800, fontSize: 13 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task progress */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ color: '#334155', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Task Progress</p>
              <span style={{ color: E.light, fontSize: 11, fontWeight: 700 }}>{Math.round(donePct)}%</span>
            </div>
            <div style={{ height: 4, borderRadius: 99, background: 'rgba(16,185,129,0.1)', marginBottom: 14 }}>
              <div style={{ height: '100%', borderRadius: 99, width: `${donePct}%`, background: `linear-gradient(90deg, ${E.mid}, ${E.bright})`, transition: 'width 400ms ease', boxShadow: `0 0 8px rgba(16,185,129,0.3)` }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {session?.tasks.map(t => (
                <button key={t.id} onClick={() => toggleTaskDone(t.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 8,
                  background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                  transition: 'background 150ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {t.done
                    ? <CheckCircle2 size={14} color={E.bright} />
                    : <Circle size={14} color="#334155" />}
                  <span style={{ color: t.done ? '#475569' : '#94A3B8', fontSize: 12, textDecoration: t.done ? 'line-through' : 'none', lineHeight: 1.4 }}>{t.label}</span>
                </button>
              )) || <p style={{ color: '#475569', fontSize: 12, fontStyle: 'italic' }}>No tasks yet. Start a session!</p>}
            </div>
          </div>
        </div>

        {/* ── Center: Timer ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', gap: 32 }}>
          {session ? (
            <FocusTimer variant="full" showControls={true} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#F0FDF4', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Start a Focus Session</h2>
                <p style={{ color: '#475569', fontSize: 14 }}>Choose your target duration and begin deep work</p>
              </div>

              {/* Duration picker */}
              <div style={{ display: 'flex', gap: 10 }}>
                {[30, 60, 90, 120].map(m => (
                  <button key={m} onClick={() => setTargetDuration(m)} style={{
                    padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700,
                    background: targetDuration === m ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
                    border: targetDuration === m ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    color: targetDuration === m ? E.light : '#64748B',
                    cursor: 'pointer', transition: 'all 150ms',
                  }}>{m}m</button>
                ))}
              </div>

              {/* Start button */}
              <button onClick={handleStartSession} style={{
                padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 700,
                background: `linear-gradient(135deg, ${E.mid}, ${E.bright})`,
                border: 'none', color: '#0F172A', cursor: 'pointer',
                boxShadow: '0 0 32px rgba(16,185,129,0.3)',
                transition: 'all 200ms',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Play size={16} fill="currentColor" /> Start Focus Session
              </button>
            </div>
          )}
        </div>

        {/* ── Right panel ── */}
        <div style={{ borderLeft: '1px solid rgba(16,185,129,0.08)', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
          {/* Quick notes */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
              <StickyNote size={13} color={E.bright} />
              <p style={{ color: '#334155', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Quick Notes</p>
            </div>
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Capture thoughts without breaking flow..."
              style={{
                width: '100%', minHeight: 96, padding: '11px 12px', borderRadius: 10,
                background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)',
                color: '#94A3B8', fontSize: 12, lineHeight: 1.6,
                resize: 'vertical', outline: 'none', fontFamily: 'JetBrains Mono, monospace',
                boxSizing: 'border-box', transition: 'border-color 200ms',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(16,185,129,0.3)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(16,185,129,0.12)')}
            />
          </div>

          {/* Blocked sites */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
              <Shield size={13} color={E.bright} />
              <p style={{ color: '#334155', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Blocked Sites</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {blockedSites.map(site => (
                <div key={site} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '7px 10px', borderRadius: 8,
                  background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#475569' }}>{site}</span>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#F87171', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>

          {/* AI Focus assistant */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
              <Brain size={13} color={E.bright} />
              <p style={{ color: '#334155', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI Focus Assistant</p>
            </div>
            <div style={{
              padding: '14px', borderRadius: 10,
              background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)',
            }}>
              <p style={{ color: '#6EE7B7', fontSize: 12, lineHeight: 1.6, marginBottom: 12, fontStyle: 'italic' }}>
                "{aiSuggestions[aiIdx % aiSuggestions.length]}"
              </p>
              <button onClick={() => setAiIdx(v => v + 1)} style={{
                display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: E.light, fontWeight: 600,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}>
                Next suggestion <ChevronRight size={11} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
