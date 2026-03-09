import { CheckCircle, Zap, ArrowRight, BookOpen, Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';

const perks = [
  { icon: BookOpen, label: 'Full premium library access', color: '#4ADE80' },
  { icon: Crown, label: 'Unlimited uploads', color: '#FBBF24' },
  { icon: Zap, label: 'AI-powered search', color: '#A78BFA' },
  { icon: Sparkles, label: 'Priority support (24h)', color: '#60A5FA' },
];

export default function PaymentSuccess() {
  const [visible, setVisible] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setCheckVisible(true), 100);
    setTimeout(() => setVisible(true), 400);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center px-6 py-12 overflow-hidden rounded-2xl"
      style={{ backgroundColor: '#111418', minHeight: 'calc(100vh - 120px)' }}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(74,222,128,0.12) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(74,222,128,0.08) 0%, transparent 65%)',
        }}
      />

      <div
        className="relative z-10 w-full max-w-md text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05))',
              border: '1px solid rgba(74,222,128,0.3)',
              boxShadow: '0 0 60px rgba(74,222,128,0.2)',
              transform: checkVisible ? 'scale(1)' : 'scale(0.5)',
              opacity: checkVisible ? 1 : 0,
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
            }}
          >
            <CheckCircle className="w-12 h-12" style={{ color: '#4ADE80' }} strokeWidth={1.5} />

            {/* Pulse ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '1px solid rgba(74,222,128,0.2)',
                transform: 'scale(1.3)',
                opacity: 0.5,
              }}
            />
          </div>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border"
            style={{
              backgroundColor: 'rgba(74,222,128,0.08)',
              borderColor: 'rgba(74,222,128,0.25)',
              color: '#4ADE80',
              fontWeight: 600,
            }}
          >
            <Sparkles className="w-3 h-3" />
            Pro Plan Activated
          </span>
        </div>

        {/* Heading */}
        <h1 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '2rem', marginBottom: '0.75rem' }}>
          Payment Successful
        </h1>
        <p style={{ color: '#9AA4B2', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          Your subscription is now active.{' '}
          <span style={{ color: '#4ADE80', fontWeight: 500 }}>Welcome to DevFlow Pro!</span>
          <br />
          You now have access to the full premium library.
        </p>

        {/* Perks */}
        <div
          className="rounded-2xl border p-5 mb-6 text-left"
          style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
        >
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#9AA4B2', opacity: 0.7 }}>
            What you unlocked
          </p>
          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk.label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: perk.color + '18' }}
                >
                  <perk.icon className="w-3.5 h-3.5" style={{ color: perk.color }} />
                </div>
                <span className="text-sm" style={{ color: '#FFFFFF', fontWeight: 500 }}>{perk.label}</span>
                <div
                  className="ml-auto w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(74,222,128,0.15)' }}
                >
                  <span style={{ color: '#4ADE80', fontSize: '0.6rem', fontWeight: 700 }}>✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div
          className="rounded-2xl border p-4 mb-6"
          style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
        >
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: '#9AA4B2' }}>Plan</span>
            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>Pro Monthly</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span style={{ color: '#9AA4B2' }}>Amount charged</span>
            <span style={{ color: '#4ADE80', fontWeight: 600 }}>₹299</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span style={{ color: '#9AA4B2' }}>Next billing date</span>
            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>Apr 9, 2026</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link to="/dashboard">
            <button
              className="w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                color: '#111418',
                fontWeight: 700,
                boxShadow: '0 0 30px rgba(74,222,128,0.2)',
              }}
            >
              Return to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link to="/dashboard/library">
            <button
              className="w-full py-3 rounded-xl text-sm border flex items-center justify-center gap-2 transition-all hover:opacity-80"
              style={{
                borderColor: '#2A2F35',
                color: '#9AA4B2',
                backgroundColor: 'transparent',
              }}
            >
              <BookOpen className="w-4 h-4" />
              Explore Premium Library
            </button>
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-xs" style={{ color: '#9AA4B2' }}>
          A confirmation email has been sent to your inbox · Cancel anytime from Settings
        </p>
      </div>
    </div>
  );
}