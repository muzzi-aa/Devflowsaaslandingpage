import { Check, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for getting started',
    features: [
      '50 notes per month',
      'Basic search & filters',
      'Public repositories',
      'Community support',
      '5 GB storage',
    ],
    cta: 'Get Started',
    ctaLink: '/signup',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: '12',
    description: 'For serious developers',
    features: [
      'Unlimited notes & uploads',
      'Advanced AI-powered search',
      'Private repositories',
      'Priority support (24h)',
      '100 GB storage',
      'Team collaboration',
      'Full API access',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup',
    highlighted: true,
    badge: 'Most Popular',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6" style={{ backgroundColor: '#111418' }}>
      {/* Subtle divider line at top */}
      <div className="max-w-6xl mx-auto">
        <div className="h-px w-full mb-28" style={{ background: 'linear-gradient(90deg, transparent, #2A2F35, transparent)' }} />

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm mb-4 tracking-widest uppercase" style={{ color: '#4ADE80' }}>
            Pricing
          </p>
          <h2
            className="tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}
          >
            Simple, transparent pricing
          </h2>
          <p style={{ color: '#9AA4B2' }}>
            Start free. Upgrade when you're ready. No surprises.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-8 border transition-all"
              style={{
                backgroundColor: plan.highlighted ? '#1A1F24' : '#1A1F24',
                borderColor: plan.highlighted ? '#4ADE80' : '#2A2F35',
                boxShadow: plan.highlighted ? '0 0 40px rgba(74,222,128,0.12)' : 'none',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                    style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)', color: '#111418', fontWeight: 700 }}
                  >
                    <Zap className="w-3 h-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-7">
                <h3 className="mb-1" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  {plan.name}
                </h3>
                <p className="text-sm mb-5" style={{ color: '#9AA4B2' }}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span style={{ color: '#9AA4B2', fontSize: '1.1rem' }}>$</span>
                  <span style={{ color: '#FFFFFF', fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  <span style={{ color: '#9AA4B2' }}>/month</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(74,222,128,0.15)' }}
                    >
                      <Check className="w-3 h-3" style={{ color: '#4ADE80' }} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm" style={{ color: '#9AA4B2' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to={plan.ctaLink}>
                <button
                  className="w-full py-3 rounded-xl text-sm inline-flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={
                    plan.highlighted
                      ? {
                          background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                          color: '#111418',
                          fontWeight: 700,
                          boxShadow: '0 0 20px rgba(74,222,128,0.25)',
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
            </div>
          ))}
        </div>

        <p className="text-center text-sm mt-8" style={{ color: '#9AA4B2' }}>
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
