import { Brain, Zap, GitBranch, Terminal, TrendingUp, Shield } from 'lucide-react';
import { useState } from 'react';

const E = { bright: '#10B981', light: '#34D399', mid: '#166534', dark: '#14532D' };

const features = [
  {
    icon: Brain,
    title: 'AI Focus Assistant',
    desc: 'Smart task decomposition, distraction blocking, and real-time coaching that learns your workflow patterns.',
    tag: 'AI-Powered',
    stats: '8min avg. time-to-flow',
  },
  {
    icon: Zap,
    title: 'Deep Work Sessions',
    desc: 'Pomodoro, flow state timers, and energy-aware scheduling that adapts to your peak productivity windows.',
    tag: 'Focus',
    stats: '3.4× more focused hours',
  },
  {
    icon: GitBranch,
    title: 'Coding Arena',
    desc: '1,500+ curated challenges ranked by real-world relevance. Practice the patterns that actually get used in production.',
    tag: 'Practice',
    stats: '1,500+ challenges',
  },
  {
    icon: Terminal,
    title: 'Career Roadmaps',
    desc: 'AI-generated learning paths tailored to your target role, skill gaps, and preferred learning style.',
    tag: 'Career AI',
    stats: '94% interview pass rate',
  },
  {
    icon: TrendingUp,
    title: 'Skill Analytics',
    desc: 'Detailed gap analysis comparing your skills against job requirements, with weekly improvement reports.',
    tag: 'Analytics',
    stats: 'Weekly gap reports',
  },
  {
    icon: Shield,
    title: 'Knowledge Vault',
    desc: 'Store and instantly retrieve your notes, docs, and code snippets with AI-powered semantic search.',
    tag: 'Knowledge',
    stats: '< 200ms search',
  },
];

const testimonials = [
  { name: 'Alex Chen', role: 'Senior SWE @ Google', text: 'DevFlow doubled my daily output. The focus sessions alone are worth 10x the price.', avatar: 'A' },
  { name: 'Priya Sharma', role: 'Staff Engineer @ Stripe', text: 'The career roadmap was scary accurate. Got promoted 4 months after following it.', avatar: 'P' },
  { name: 'Marcus Liu', role: 'Founder @ YC W25', text: "We shipped our MVP in 3 weeks. DevFlow's coding arena prepped our whole team.", avatar: 'M' },
];

export function Features() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {/* Features */}
      <section style={{ padding: '100px 24px', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, transparent 0%, rgba(14,28,22,0.4) 50%, transparent 100%)',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 99, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', fontSize: 12, color: E.light, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 18 }}>
              FEATURES
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#F0FDF4', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Everything you need to<br />
              <span style={{ background: `linear-gradient(135deg, ${E.bright}, ${E.light})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                reach your peak
              </span>
            </h2>
            <p style={{ color: '#64748B', fontSize: 17, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              Built by developers, for developers. Every feature is designed to remove friction and maximize your coding output.
            </p>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '28px 26px',
                  borderRadius: 16,
                  background: hovered === i
                    ? 'linear-gradient(145deg, rgba(20,83,45,0.3), rgba(15,23,42,0.95))'
                    : 'rgba(15,23,42,0.6)',
                  border: hovered === i ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(16,185,129,0.08)',
                  transition: 'all 250ms ease',
                  cursor: 'default',
                  transform: hovered === i ? 'translateY(-3px)' : 'none',
                  boxShadow: hovered === i ? '0 20px 60px rgba(0,0,0,0.3)' : 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Glow */}
                {hovered === i && (
                  <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: hovered === i ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.08)',
                    border: `1px solid rgba(16,185,129,${hovered === i ? '0.3' : '0.12'})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 250ms ease',
                  }}>
                    <f.icon size={20} color={hovered === i ? E.light : E.bright} strokeWidth={1.75} />
                  </div>
                  <span style={{ fontSize: 10, color: E.bright, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 9px', borderRadius: 99, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                    {f.tag}
                  </span>
                </div>

                <h3 style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 17, marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>{f.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: E.light }} />
                  <span style={{ fontSize: 12, color: E.light, fontWeight: 600 }}>{f.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 24px 100px', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900, color: '#F0FDF4', letterSpacing: '-0.03em', marginBottom: 12 }}>
              Loved by engineering teams
            </h2>
            <p style={{ color: '#64748B', fontSize: 16 }}>Real results from real developers</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="grid-cols-1 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={t.name} style={{
                padding: '28px',
                borderRadius: 16,
                background: 'rgba(15,23,42,0.7)',
                border: '1px solid rgba(16,185,129,0.1)',
                position: 'relative',
              }}>
                <div style={{ fontSize: 36, color: 'rgba(16,185,129,0.2)', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: 16 }}>"</div>
                <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${E.dark}, ${E.bright})`,
                    color: '#0F172A', fontWeight: 800, fontSize: 15,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, boxShadow: `0 0 12px rgba(16,185,129,0.25)`,
                  }}>{t.avatar}</div>
                  <div>
                    <p style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 14 }}>{t.name}</p>
                    <p style={{ color: '#475569', fontSize: 12, marginTop: 2 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
