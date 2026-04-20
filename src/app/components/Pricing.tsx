import { Link } from 'react-router';
import { Check, Zap } from 'lucide-react';
import { useState } from 'react';

const E = { bright: '#10B981', light: '#34D399', mid: '#166534', dark: '#14532D' };

const plans = [
  {
    name: 'Free',
    monthly: 0, yearly: 0,
    desc: 'Perfect to get started',
    features: ['50 uploads / month', '5 GB storage', 'Basic focus timer', '100 coding challenges', 'Community support'],
    cta: 'Get Started Free', ctaLink: '/signup', highlight: false,
  },
  {
    name: 'Pro',
    monthly: 19, yearly: 15,
    desc: 'For serious developers',
    features: ['Unlimited uploads', '50 GB storage', 'AI focus assistant', 'All 1,500+ challenges', 'Career AI roadmap', 'Skill gap analytics', 'Priority support'],
    cta: 'Start Pro Trial', ctaLink: '/signup', highlight: true,
  },
  {
    name: 'Team',
    monthly: 49, yearly: 39,
    desc: 'For engineering teams',
    features: ['Everything in Pro', 'Up to 20 members', 'Team analytics dashboard', 'Shared knowledge vault', 'Custom roadmaps', 'Dedicated CSM', 'SSO & SAML'],
    cta: 'Contact Sales', ctaLink: '/signup', highlight: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 99, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', fontSize: 12, color: E.light, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 18 }}>
            PRICING
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 900, color: '#F0FDF4', letterSpacing: '-0.03em', marginBottom: 16 }}>
            Simple, transparent pricing
          </h2>
          <p style={{ color: '#64748B', fontSize: 16, maxWidth: 480, margin: '0 auto', marginBottom: 32 }}>
            Start free. Upgrade when you're ready. No hidden fees, cancel anytime.
          </p>

          {/* Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 99, padding: '6px 10px' }}>
            <button onClick={() => setYearly(false)} style={{
              padding: '6px 18px', borderRadius: 99, fontSize: 13, fontWeight: 600,
              background: !yearly ? 'rgba(16,185,129,0.12)' : 'transparent',
              color: !yearly ? E.light : '#64748B', border: 'none', cursor: 'pointer', transition: 'all 200ms',
            }}>Monthly</button>
            <button onClick={() => setYearly(true)} style={{
              padding: '6px 18px', borderRadius: 99, fontSize: 13, fontWeight: 600,
              background: yearly ? 'rgba(16,185,129,0.12)' : 'transparent',
              color: yearly ? E.light : '#64748B', border: 'none', cursor: 'pointer', transition: 'all 200ms',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              Annual
              <span style={{ padding: '2px 8px', borderRadius: 99, background: `rgba(16,185,129,0.2)`, border: `1px solid rgba(16,185,129,0.3)`, fontSize: 10, color: E.light, fontWeight: 800 }}>SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }} className="grid-cols-1 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} style={{
              borderRadius: 18,
              border: p.highlight ? `1px solid rgba(16,185,129,0.4)` : '1px solid rgba(16,185,129,0.1)',
              background: p.highlight
                ? `linear-gradient(145deg, rgba(22,101,52,0.5) 0%, rgba(15,23,42,0.95) 100%)`
                : 'rgba(15,23,42,0.6)',
              padding: '32px 28px',
              position: 'relative',
              boxShadow: p.highlight ? `0 0 60px rgba(16,185,129,0.12)` : 'none',
              transform: p.highlight ? 'scale(1.03)' : 'none',
            }}>
              {p.highlight && (
                <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 14px', borderRadius: '0 0 10px 10px', background: `linear-gradient(135deg, ${E.mid}, ${E.bright})`, fontSize: 11, color: '#F0FDF4', fontWeight: 800, letterSpacing: '0.06em' }}>
                    <Zap size={10} fill="#F0FDF4" /> MOST POPULAR
                  </span>
                </div>
              )}

              <p style={{ color: E.light, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>{p.name.toUpperCase()}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                <span style={{ color: '#F0FDF4', fontSize: 44, fontWeight: 900, letterSpacing: '-0.04em' }}>${yearly ? p.yearly : p.monthly}</span>
                {(yearly ? p.yearly : p.monthly) > 0 && <span style={{ color: '#475569', fontSize: 14 }}>/mo</span>}
              </div>
              <p style={{ color: '#475569', fontSize: 13, marginBottom: 28 }}>{p.desc}{yearly && p.yearly > 0 ? ' · billed annually' : ''}</p>

              <Link to={p.ctaLink} style={{ textDecoration: 'none', display: 'block', marginBottom: 28 }}>
                <button style={{
                  width: '100%', padding: '12px', borderRadius: 10,
                  background: p.highlight ? `linear-gradient(135deg, ${E.mid}, ${E.bright})` : 'transparent',
                  border: p.highlight ? 'none' : `1px solid rgba(16,185,129,0.25)`,
                  color: p.highlight ? '#F0FDF4' : E.light,
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  boxShadow: p.highlight ? `0 0 24px rgba(16,185,129,0.2)` : 'none',
                  transition: 'opacity 200ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >{p.cta}</button>
              </Link>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={10} color={E.bright} strokeWidth={3} />
                    </div>
                    <span style={{ color: '#94A3B8', fontSize: 13 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
