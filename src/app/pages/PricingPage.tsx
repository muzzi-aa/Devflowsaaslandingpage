import { Check, Zap, Star, ArrowRight, Code2, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const plans = [
  {
    name: 'Free',
    priceMonthly: 0,
    priceYearly: 0,
    currency: '₹',
    description: 'Everything you need to get started',
    features: [
      'Upload your own notes',
      'Access free content library',
      '50 uploads per month',
      'Basic search & filters',
      '5 GB storage',
      'Community support',
    ],
    cta: 'Get Started Free',
    highlighted: false,
    accent: '#9AA4B2',
    badge: null,
  },
  {
    name: 'Pro',
    priceMonthly: 299,
    priceYearly: 224,
    currency: '₹',
    description: 'Full access for serious developers',
    features: [
      'Everything in Free',
      'Premium content library',
      'Full library access (100+ docs)',
      'Unlimited uploads',
      'Advanced AI-powered search',
      'Download for offline reading',
      '100 GB storage',
      'Priority support (24h)',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
    accent: '#4ADE80',
    badge: 'Most Popular',
  },
];

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, you can cancel your Pro subscription at any time. You\'ll retain access until the end of your billing period.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major credit/debit cards, UPI, and net banking via Stripe\'s secure payment gateway.',
  },
  {
    q: 'Is there a free trial for Pro?',
    a: 'Yes! New users get a 7-day free trial of Pro features. No credit card required.',
  },
  {
    q: 'What is included in the premium library?',
    a: 'Premium library includes System Design guides, Advanced TypeScript, DSA patterns, Docker & Kubernetes, and more — all curated by expert developers.',
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(74,222,128,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-xs"
            style={{
              backgroundColor: 'rgba(74,222,128,0.08)',
              borderColor: 'rgba(74,222,128,0.2)',
              color: '#4ADE80',
            }}
          >
            <Sparkles className="w-3 h-3" />
            Simple, transparent pricing
          </div>

          <h1 className="mb-4" style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}>
            Start free,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              upgrade when ready
            </span>
          </h1>
          <p className="mx-auto max-w-lg" style={{ color: '#9AA4B2', fontSize: '1.125rem', lineHeight: 1.7 }}>
            Everything you need to learn, organize, and grow as a developer — with no hidden fees.
          </p>

          {/* Billing toggle */}
          <div className="flex justify-center mt-8">
            <div
              className="flex items-center gap-1 p-1 rounded-xl border"
              style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
            >
              {(['monthly', 'yearly'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className="px-5 py-2 rounded-lg text-sm capitalize transition-all"
                  style={
                    billing === b
                      ? { backgroundColor: '#2A2F35', color: '#FFFFFF', fontWeight: 600 }
                      : { color: '#9AA4B2' }
                  }
                >
                  {b}
                  {b === 'yearly' && (
                    <span className="ml-2 text-xs" style={{ color: '#4ADE80' }}>Save 25%</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {plans.map((plan) => {
            const price = billing === 'yearly' ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={plan.name}
                className="relative rounded-2xl border overflow-hidden"
                style={{
                  backgroundColor: '#1A1F24',
                  borderColor: plan.highlighted ? '#4ADE80' : '#2A2F35',
                  boxShadow: plan.highlighted ? '0 0 60px rgba(74,222,128,0.12)' : 'none',
                }}
              >
                {/* Background glow for Pro */}
                {plan.highlighted && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at top, rgba(74,222,128,0.06) 0%, transparent 60%)',
                    }}
                  />
                )}

                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <div
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs"
                      style={{
                        background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                        color: '#111418',
                        fontWeight: 700,
                        borderRadius: '0 0 10px 10px',
                      }}
                    >
                      <Star className="w-3 h-3" fill="#111418" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="relative z-10 p-8">
                  {/* Plan name */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{
                          background: plan.highlighted
                            ? 'linear-gradient(135deg, #4ADE80, #22C55E)'
                            : '#2A2F35',
                        }}
                      >
                        {plan.highlighted ? (
                          <Zap className="w-3.5 h-3.5" style={{ color: '#111418' }} />
                        ) : (
                          <Code2 className="w-3.5 h-3.5" style={{ color: '#9AA4B2' }} />
                        )}
                      </div>
                      <h3 style={{ color: '#FFFFFF', fontWeight: 700 }}>{plan.name}</h3>
                    </div>
                    <p className="text-sm" style={{ color: '#9AA4B2' }}>{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span style={{ color: '#9AA4B2', fontSize: '1.2rem' }}>{plan.currency}</span>
                    <span
                      style={{
                        color: plan.highlighted ? '#4ADE80' : '#FFFFFF',
                        fontSize: '3.5rem',
                        fontWeight: 800,
                        lineHeight: 1,
                      }}
                    >
                      {price}
                    </span>
                    <span style={{ color: '#9AA4B2' }}>/mo</span>
                  </div>
                  {billing === 'yearly' && plan.highlighted && (
                    <p className="text-xs mb-6" style={{ color: '#4ADE80' }}>
                      Billed annually · Save ₹{(plan.priceMonthly - plan.priceYearly) * 12}/yr
                    </p>
                  )}
                  {(billing === 'monthly' || !plan.highlighted) && <div className="mb-6" />}

                  {/* CTA */}
                  <Link to={plan.highlighted ? '/dashboard/subscription' : '/signup'}>
                    <button
                      className="w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 mb-8"
                      style={
                        plan.highlighted
                          ? {
                              background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                              color: '#111418',
                              fontWeight: 700,
                              boxShadow: '0 0 30px rgba(74,222,128,0.25)',
                            }
                          : {
                              backgroundColor: '#2A2F35',
                              color: '#FFFFFF',
                              fontWeight: 600,
                            }
                      }
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>

                  {/* Divider */}
                  <div className="mb-6" style={{ borderTop: '1px solid #2C3238' }} />

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: plan.highlighted
                              ? 'rgba(74,222,128,0.15)'
                              : 'rgba(154,164,178,0.15)',
                          }}
                        >
                          <Check
                            className="w-3 h-3"
                            style={{ color: plan.highlighted ? '#4ADE80' : '#9AA4B2' }}
                            strokeWidth={2.5}
                          />
                        </div>
                        <span className="text-sm" style={{ color: '#9AA4B2' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust signals */}
        <div className="max-w-4xl mx-auto mt-10">
          <div
            className="rounded-2xl border p-5 flex flex-wrap items-center justify-center gap-8"
            style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
          >
            {[
              { label: 'No credit card required', icon: '🔒' },
              { label: '7-day free trial on Pro', icon: '✨' },
              { label: 'Cancel anytime', icon: '↩️' },
              { label: 'Secure payments via Stripe', icon: '💳' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                <span className="text-sm" style={{ color: '#9AA4B2' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-center mb-8"
            style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.5rem' }}
          >
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden"
                style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between transition-all"
                >
                  <span className="text-sm" style={{ color: '#FFFFFF', fontWeight: 500 }}>
                    {faq.q}
                  </span>
                  <span
                    className="text-sm flex-shrink-0 ml-4 transition-transform"
                    style={{
                      color: '#4ADE80',
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4" style={{ borderTop: '1px solid #2C3238' }}>
                    <p className="text-sm pt-3" style={{ color: '#9AA4B2', lineHeight: 1.7 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
