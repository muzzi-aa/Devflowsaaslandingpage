import { Link } from 'react-router';
import { useState } from 'react';
import { Check, Zap, ArrowRight, Code2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const E = { bright: '#10B981', light: '#34D399', mid: '#166534', dark: '#14532D' };

const plans = [
  {
    id: 'free',
    name: 'Free',
    monthly: 0, yearly: 0,
    desc: 'Start building your flow',
    features: [
      '50 uploads / month',
      '5 GB secure storage',
      'Basic focus timer (Pomodoro)',
      '100 coding challenges',
      'Community support',
      'Public roadmaps',
    ],
    notIncluded: ['AI focus assistant', 'Career AI roadmap', 'Skill gap analytics'],
    cta: 'Get started free', link: '/signup', highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 19, yearly: 15,
    desc: 'For serious developers',
    badge: 'MOST POPULAR',
    features: [
      'Unlimited uploads',
      '50 GB secure storage',
      'AI focus assistant & coach',
      'All 1,500+ coding challenges',
      'Career AI roadmap generator',
      'Skill gap analytics & reports',
      'Advanced focus sessions',
      'Priority support (< 4h)',
      'Custom learning paths',
    ],
    notIncluded: [],
    cta: 'Start 14-day free trial', link: '/signup', highlight: true,
  },
  {
    id: 'team',
    name: 'Team',
    monthly: 49, yearly: 39,
    desc: 'For engineering teams',
    features: [
      'Everything in Pro',
      'Up to 20 team members',
      'Team analytics dashboard',
      'Shared knowledge vault',
      'Custom team roadmaps',
      'Manager insights & reports',
      'SSO & SAML integration',
      'Dedicated success manager',
      'SLA & uptime guarantee',
    ],
    notIncluded: [],
    cta: 'Contact sales', link: '/signup', highlight: false,
  },
];

const faqs = [
  { q: 'Can I switch plans at any time?', a: 'Yes! Upgrade or downgrade at any time. Upgrades take effect immediately, downgrades at the end of your billing cycle.' },
  { q: 'Is there a free trial for Pro?', a: 'Absolutely. The Pro plan comes with a 14-day free trial, no credit card required.' },
  { q: 'What happens to my data if I downgrade?', a: 'Your data is always safe. If you exceed free plan limits after downgrading, you\'ll be prompted to upgrade to access new features.' },
  { q: 'Do you offer student or non-profit discounts?', a: 'Yes! Students get 50% off Pro. Non-profits get 40% off. Contact us with verification to claim your discount.' },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <Navbar />

      {/* Dot grid */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(16,185,129,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 99, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', fontSize: 12, color: E.light, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 20 }}>
              PRICING
            </span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#F0FDF4', letterSpacing: '-0.04em', lineHeight: 1.06, marginBottom: 18 }}>
              Simple, transparent<br />
              <span style={{ background: `linear-gradient(135deg, ${E.bright}, ${E.light})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                pricing
              </span>
            </h1>
            <p style={{ color: '#64748B', fontSize: 17, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
              Start free. Scale as you grow. No hidden fees, no lock-in, cancel anytime.
            </p>

            {/* Annual toggle */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0, background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 99, padding: '5px 6px' }}>
              <button onClick={() => setYearly(false)} style={{
                padding: '7px 22px', borderRadius: 99, fontSize: 13, fontWeight: 700,
                background: !yearly ? 'rgba(16,185,129,0.12)' : 'transparent',
                color: !yearly ? E.light : '#475569',
                border: 'none', cursor: 'pointer', transition: 'all 200ms',
              }}>Monthly</button>
              <button onClick={() => setYearly(true)} style={{
                padding: '7px 22px', borderRadius: 99, fontSize: 13, fontWeight: 700,
                background: yearly ? 'rgba(16,185,129,0.12)' : 'transparent',
                color: yearly ? E.light : '#475569',
                border: 'none', cursor: 'pointer', transition: 'all 200ms',
                display: 'flex', alignItems: 'center', gap: 9,
              }}>
                Annual
                <span style={{ padding: '2px 9px', borderRadius: 99, background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', fontSize: 10, color: E.light, fontWeight: 900 }}>SAVE 20%</span>
              </button>
            </div>
          </div>

          {/* Plan cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'stretch', marginBottom: 80 }}>
            {plans.map((plan) => (
              <div key={plan.id} style={{
                borderRadius: 20,
                border: plan.highlight ? `1px solid rgba(16,185,129,0.4)` : '1px solid rgba(16,185,129,0.1)',
                background: plan.highlight
                  ? `linear-gradient(160deg, rgba(22,101,52,0.55) 0%, rgba(15,23,42,0.96) 55%)`
                  : 'rgba(15,23,42,0.65)',
                padding: '32px 28px',
                position: 'relative',
                display: 'flex', flexDirection: 'column',
                boxShadow: plan.highlight ? `0 0 80px rgba(16,185,129,0.1), inset 0 1px 0 rgba(52,211,153,0.1)` : 'none',
                transform: plan.highlight ? 'scale(1.02)' : 'none',
              }}>
                {/* Popular badge */}
                {plan.badge && (
                  <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 16px', borderRadius: '0 0 12px 12px', background: `linear-gradient(135deg, ${E.mid}, ${E.bright})`, fontSize: 10, color: '#F0FDF4', fontWeight: 900, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                      <Zap size={9} fill="#F0FDF4" /> {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name & price */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 12, color: E.light, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{plan.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 4 }}>
                    <span style={{ color: '#F0FDF4', fontSize: 50, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1 }}>
                      ${yearly ? plan.yearly : plan.monthly}
                    </span>
                    {(yearly ? plan.yearly : plan.monthly) > 0 && (
                      <div>
                        <span style={{ color: '#475569', fontSize: 14 }}>/mo</span>
                        {yearly && <p style={{ color: '#334155', fontSize: 11, marginTop: 2 }}>billed ${(yearly ? plan.yearly : plan.monthly) * 12}/yr</p>}
                      </div>
                    )}
                  </div>
                  <p style={{ color: '#475569', fontSize: 13 }}>{plan.desc}</p>
                </div>

                {/* CTA */}
                <Link to={plan.link} style={{ textDecoration: 'none', display: 'block', marginBottom: 28 }}>
                  <button style={{
                    width: '100%', padding: '13px', borderRadius: 12,
                    background: plan.highlight ? `linear-gradient(135deg, ${E.mid}, ${E.bright})` : 'transparent',
                    border: plan.highlight ? 'none' : '1px solid rgba(16,185,129,0.22)',
                    color: plan.highlight ? '#F0FDF4' : E.light,
                    fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    boxShadow: plan.highlight ? `0 0 28px rgba(16,185,129,0.24)` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'opacity 200ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {plan.cta} <ArrowRight size={14} />
                  </button>
                </Link>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(16,185,129,0.08)', marginBottom: 24 }} />

                {/* Features */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: `rgba(16,185,129,0.15)`, border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <Check size={10} color={E.bright} strokeWidth={3} />
                      </div>
                      <span style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise banner */}
          <div style={{
            borderRadius: 18, padding: '36px 40px',
            background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(16,185,129,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
            marginBottom: 80,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code2 size={22} color={E.bright} />
              </div>
              <div>
                <h3 style={{ color: '#F0FDF4', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', marginBottom: 6 }}>Need an enterprise plan?</h3>
                <p style={{ color: '#475569', fontSize: 14 }}>Custom pricing, unlimited seats, dedicated infrastructure, SLA, and white-glove onboarding.</p>
              </div>
            </div>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '12px 26px', borderRadius: 10, flexShrink: 0,
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                color: E.light, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8, transition: 'all 200ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(16,185,129,0.18)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(16,185,129,0.1)'; }}
              >
                Talk to sales <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ color: '#F0FDF4', fontWeight: 900, fontSize: 28, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 36 }}>Frequently asked questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {faqs.map((f, i) => (
                <div key={i} style={{ borderRadius: 12, border: '1px solid rgba(16,185,129,0.1)', background: 'rgba(15,23,42,0.6)', overflow: 'hidden', transition: 'border-color 200ms' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: '100%', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}>
                    <span style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 15 }}>{f.q}</span>
                    <span style={{ color: E.bright, fontSize: 20, fontWeight: 300, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 200ms', flexShrink: 0 }}>+</span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 22px 18px' }}>
                      <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
