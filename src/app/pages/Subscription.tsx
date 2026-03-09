import { Check, Zap, CreditCard, ArrowRight, Shield, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const plans = [
  {
    name: 'Free',
    price: { monthly: '0', yearly: '0' },
    currency: '',
    description: 'Perfect for getting started',
    features: [
      'Upload your own notes',
      'Access free content library',
      'Basic search & filters',
      '50 uploads per month',
      '5 GB storage',
      'Community support',
    ],
    cta: 'Current Plan',
    highlighted: false,
    current: true,
    accent: '#9AA4B2',
  },
  {
    name: 'Pro',
    price: { monthly: '299', yearly: '224' },
    currency: '₹',
    description: 'Full access for serious developers',
    features: [
      'Everything in Free',
      'Premium content library',
      'Full library access (100+ docs)',
      'Unlimited uploads',
      'Advanced AI-powered search',
      '100 GB storage',
      'Download for offline reading',
      'Priority support (24h)',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
    current: false,
    accent: '#4ADE80',
  },
];

export default function Subscription() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [upgrading, setUpgrading] = useState(false);
  const navigate = useNavigate();

  const currentPlan = { name: 'Free', uploads: 24, maxUploads: 50 };

  const handleUpgrade = () => {
    setUpgrading(true);
    setTimeout(() => {
      setUpgrading(false);
      navigate('/dashboard/payment-success');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.6rem' }}>Subscription</h2>
        <p className="mt-1 text-sm" style={{ color: '#9AA4B2' }}>
          Manage your plan and billing information
        </p>
      </div>

      {/* Current Plan Card */}
      <div
        className="relative rounded-2xl border p-6 mb-8 overflow-hidden"
        style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
      >
        <div
          className="absolute right-0 top-0 w-64 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at right, rgba(74,222,128,0.06) 0%, transparent 70%)' }}
        />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm" style={{ color: '#9AA4B2' }}>Current Plan</span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs"
                  style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}
                >
                  Active
                </span>
              </div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.2rem' }}>
                Free Plan
              </h3>
            </div>
            <Shield className="w-8 h-8" style={{ color: '#4ADE80' }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs mb-1" style={{ color: '#9AA4B2' }}>Monthly Uploads</p>
              <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.5rem' }}>
                {currentPlan.uploads}
                <span className="text-sm" style={{ color: '#9AA4B2', fontWeight: 400 }}>
                  /{currentPlan.maxUploads}
                </span>
              </p>
              <div className="w-full rounded-full h-1.5 mt-2" style={{ backgroundColor: '#2A2F35' }}>
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${(currentPlan.uploads / currentPlan.maxUploads) * 100}%`,
                    background: 'linear-gradient(90deg, #4ADE80, #22C55E)',
                  }}
                />
              </div>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: '#9AA4B2' }}>Monthly Cost</p>
              <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.5rem' }}>$0</p>
              <p className="text-xs mt-2" style={{ color: '#9AA4B2' }}>Forever free</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: '#9AA4B2' }}>Renewal</p>
              <p style={{ color: '#FFFFFF', fontWeight: 700 }}>Apr 1, 2026</p>
              <p className="text-xs mt-2" style={{ color: '#9AA4B2' }}>Auto-renews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h3 style={{ color: '#FFFFFF', fontWeight: 700 }}>Available Plans</h3>
        <div
          className="flex items-center gap-1 p-1 rounded-xl border"
          style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
        >
          {(['monthly', 'yearly'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className="px-4 py-2 rounded-lg text-sm capitalize transition-all"
              style={
                billing === b
                  ? { backgroundColor: '#2A2F35', color: '#FFFFFF', fontWeight: 600 }
                  : { color: '#9AA4B2' }
              }
            >
              {b}
              {b === 'yearly' && (
                <span className="ml-1.5 text-xs" style={{ color: '#4ADE80' }}>-25%</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative rounded-2xl p-8 border transition-all"
            style={{
              backgroundColor: '#1A1F24',
              borderColor: plan.highlighted ? '#4ADE80' : '#2A2F35',
              boxShadow: plan.highlighted ? '0 0 40px rgba(74,222,128,0.1)' : 'none',
            }}
          >
            {plan.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{
                    background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                    color: '#111418',
                    fontWeight: 700,
                  }}
                >
                  <Star className="w-3 h-3" />
                  Recommended
                </div>
              </div>
            )}

            <div className="mb-7">
              <h3 className="mb-1" style={{ color: '#FFFFFF', fontWeight: 700 }}>{plan.name}</h3>
              <p className="text-sm mb-5" style={{ color: '#9AA4B2' }}>{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span style={{ color: '#9AA4B2' }}>{plan.currency || '$'}</span>
                <span style={{ color: '#FFFFFF', fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>
                  {plan.price[billing]}
                </span>
                <span style={{ color: '#9AA4B2' }}>/mo</span>
                {billing === 'yearly' && plan.highlighted && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}>
                    Save ₹900/yr
                  </span>
                )}
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: plan.highlighted ? 'rgba(74,222,128,0.15)' : 'rgba(154,164,178,0.15)' }}
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

            <button
              onClick={plan.current ? undefined : handleUpgrade}
              disabled={plan.current || upgrading}
              className="w-full py-3.5 rounded-xl text-sm inline-flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
              style={
                plan.current
                  ? { backgroundColor: '#2A2F35', color: '#9AA4B2', cursor: 'default' }
                  : plan.highlighted
                  ? {
                      background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                      color: '#111418',
                      fontWeight: 700,
                      boxShadow: '0 0 20px rgba(74,222,128,0.2)',
                    }
                  : { backgroundColor: '#2A2F35', color: '#FFFFFF', fontWeight: 600 }
              }
            >
              {plan.current ? (
                'Current Plan'
              ) : upgrading ? (
                <>
                  <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: '#111418', borderTopColor: 'transparent' }} />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Method */}
      <div
        className="rounded-2xl border p-6"
        style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="mb-1" style={{ color: '#FFFFFF', fontWeight: 600 }}>Payment Method</h3>
            <p className="text-sm" style={{ color: '#9AA4B2' }}>
              No payment method added yet
            </p>
          </div>
          <button
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all hover:opacity-80"
            style={{ borderColor: '#4ADE80', color: '#4ADE80', backgroundColor: 'rgba(74,222,128,0.08)' }}
          >
            <CreditCard className="w-4 h-4" />
            Add Card
          </button>
        </div>

        <div className="mt-6 pt-5 border-t" style={{ borderColor: '#2C3238' }}>
          <p className="text-xs" style={{ color: '#9AA4B2' }}>
            Payments are securely processed by Stripe. We never store your card details.
          </p>
        </div>
      </div>
    </div>
  );
}