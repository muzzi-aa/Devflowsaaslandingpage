import { Link } from 'react-router';
import { Play, ArrowRight, GitBranch, Terminal, Zap } from 'lucide-react';

const E = { bright: '#10B981', light: '#34D399', mid: '#166534', dark: '#14532D' };

const codeLines = [
  { text: 'const flow = await devflow.focus({', indent: 0, color: '#34D399' },
  { text: '  task: "Implement auth module",', indent: 1, color: '#86EFAC' },
  { text: '  duration: "2h",', indent: 1, color: '#86EFAC' },
  { text: '  blockers: ["twitter.com", "reddit.com"],', indent: 1, color: '#6EE7B7' },
  { text: '  ai: { suggestions: true }', indent: 1, color: '#86EFAC' },
  { text: '});', indent: 0, color: '#34D399' },
  { text: '', indent: 0, color: '' },
  { text: '// ✓ Flow state achieved in 8 minutes', indent: 0, color: '#065F46' },
  { text: 'flow.productivity // → 340%', indent: 0, color: '#10B981' },
];

export function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 24px 80px', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(16,185,129,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />
      {/* Radial glows */}
      <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,83,45,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: -50, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
              <span style={{
                padding: '5px 14px', borderRadius: 99,
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
                fontSize: 12, color: E.light, fontWeight: 700, letterSpacing: '0.06em',
                display: 'flex', alignItems: 'center', gap: 7,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: E.light, boxShadow: `0 0 8px ${E.light}` }} />
                NOW IN PUBLIC BETA · 12,000+ DEVELOPERS
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(38px, 5vw, 64px)', fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.04em', color: '#F0FDF4', marginBottom: 24 }}>
              Flow State<br />
              <span style={{ background: `linear-gradient(135deg, ${E.bright} 0%, ${E.light} 60%, #6EE7B7 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                for Developers
              </span>
            </h1>

            <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Build faster, focus deeper, and ship more with AI-powered productivity tools designed for engineers who value their flow state.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }} className="flex-col sm:flex-row">
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '14px 28px', borderRadius: 12,
                    background: `linear-gradient(135deg, ${E.mid}, ${E.bright})`,
                    color: '#F0FDF4', fontSize: 15, fontWeight: 700,
                    border: 'none', cursor: 'pointer',
                    boxShadow: `0 0 30px rgba(16,185,129,0.28)`,
                    display: 'flex', alignItems: 'center', gap: 8,
                    transition: 'all 220ms ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 40px rgba(16,185,129,0.42)`; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 30px rgba(16,185,129,0.28)`; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
                  >
                    <Zap size={16} />
                    Start Focusing Now
                    <ArrowRight size={15} />
                  </button>
                </Link>

                <button style={{
                  padding: '14px 24px', borderRadius: 12,
                  background: 'rgba(16,185,129,0.07)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  color: E.light, fontSize: 15, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9,
                  transition: 'all 220ms ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(16,185,129,0.13)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(16,185,129,0.07)'; }}
                >
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: `rgba(16,185,129,0.15)`, border: `1px solid rgba(16,185,129,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={11} color={E.light} fill={E.light} />
                  </div>
                  Watch 1:42 Demo
                </button>
              </div>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ display: 'flex' }}>
                {['A','B','C','D','E'].map((l, i) => (
                  <div key={l} style={{
                    width: 32, height: 32, borderRadius: '50%', marginLeft: i === 0 ? 0 : -10,
                    background: `linear-gradient(135deg, ${E.dark}, ${E.bright})`,
                    border: '2px solid #0F172A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#0F172A',
                  }}>{l}</div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#FBBF24', fontSize: 13 }}>★</span>)}
                </div>
                <p style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>Loved by 12,000+ developers</p>
              </div>
            </div>
          </div>

          {/* Right — terminal card */}
          <div style={{ position: 'relative' }}>
            {/* Glow behind card */}
            <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{
              background: 'rgba(10,20,35,0.85)',
              border: '1px solid rgba(16,185,129,0.18)',
              borderRadius: 18,
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.05)',
              backdropFilter: 'blur(12px)',
              position: 'relative',
            }}>
              {/* Terminal header */}
              <div style={{ padding: '14px 18px', background: 'rgba(15,23,42,0.9)', borderBottom: '1px solid rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', gap: 7 }}>
                  {['#F87171','#FBBF24','#34D399'].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.9 }} />)}
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#475569' }}>devflow.config.ts</span>
                </div>
                <Terminal size={13} color="#475569" />
              </div>

              {/* Code */}
              <div style={{ padding: '24px 24px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.8 }}>
                {codeLines.map((line, i) => (
                  <div key={i} style={{ display: 'flex' }}>
                    <span style={{ color: '#1E3A4A', width: 24, flexShrink: 0, userSelect: 'none', fontSize: 11 }}>{line.text ? i + 1 : ''}</span>
                    <span style={{ color: line.color, paddingLeft: line.indent * 16 }}>{line.text}</span>
                  </div>
                ))}
                {/* Cursor */}
                <div style={{ display: 'flex', marginTop: 4 }}>
                  <span style={{ color: '#1E3A4A', width: 24, fontSize: 11 }}>10</span>
                  <span style={{ color: E.bright, animation: 'blink 1.2s infinite' }}>█</span>
                </div>
              </div>

              {/* Status bar */}
              <div style={{ padding: '10px 18px', background: 'rgba(5,46,22,0.4)', borderTop: '1px solid rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: E.light, boxShadow: `0 0 6px ${E.light}` }} />
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: E.light }}>Focus active · 47m 12s</span>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#475569' }}>TypeScript · UTF-8</span>
              </div>
            </div>

            {/* Floating stat cards */}
            <div style={{ position: 'absolute', top: -20, right: -24, background: 'rgba(15,23,42,0.92)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: '12px 16px', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={14} color={E.bright} />
                </div>
                <div>
                  <p style={{ color: '#F0FDF4', fontSize: 16, fontWeight: 800 }}>340%</p>
                  <p style={{ color: '#64748B', fontSize: 10, marginTop: 1 }}>Productivity boost</p>
                </div>
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: 60, left: -28, background: 'rgba(15,23,42,0.92)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: '12px 16px', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GitBranch size={14} color={E.light} />
                </div>
                <div>
                  <p style={{ color: '#F0FDF4', fontSize: 15, fontWeight: 800 }}>87 PRs</p>
                  <p style={{ color: '#64748B', fontSize: 10, marginTop: 1 }}>Merged this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by */}
        <div style={{ marginTop: 80, textAlign: 'center' }}>
          <p style={{ color: '#334155', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 28 }}>TRUSTED BY ENGINEERS AT</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {['GitHub', 'Vercel', 'Linear', 'Supabase', 'Stripe', 'Figma', 'Notion'].map(name => (
              <span key={name} style={{ color: '#334155', fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', transition: 'color 200ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#6EE7B7')}
                onMouseLeave={e => (e.currentTarget.style.color = '#334155')}
              >{name}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}
