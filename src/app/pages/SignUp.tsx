import { useState } from 'react';
import { Link } from 'react-router';
import { Code2, Mail, Lock, User, Eye, EyeOff, ChevronRight, CheckCircle2 } from 'lucide-react';

// ─── Theme ──────────────────────────────────────────────────────────────────
const E = { accent: '#34D399', base: '#10B981', dark: '#059669' };
const bg           = '#0F172A';
const panel        = '#0B1223';
const card         = '#111827';
const inputBg      = '#0D1526';
const border       = 'rgba(255,255,255,0.07)';
const borderFocus  = 'rgba(52,211,153,0.45)';
const textPrimary  = '#F1F5F9';
const textSec      = '#CBD5E1';
const textMuted    = '#475569';

// ─── Google SVG ─────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

// ─── GitHub SVG ─────────────────────────────────────────────────────────────
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

// ─── Input component ─────────────────────────────────────────────────────────
function FormInput({
  id, label, type = 'text', placeholder, icon: Icon, rightEl,
}: {
  id: string; label: string; type?: string; placeholder: string;
  icon: typeof Mail; rightEl?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', color: textSec, fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: '0.01em' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <Icon size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused ? E.accent : textMuted, transition: 'color 200ms', pointerEvents: 'none' }} />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', paddingLeft: 42, paddingRight: rightEl ? 44 : 14,
            paddingTop: 11, paddingBottom: 11,
            background: inputBg,
            border: `1px solid ${focused ? borderFocus : border}`,
            borderRadius: 10, color: textPrimary, fontSize: 14, outline: 'none',
            boxShadow: focused ? `0 0 0 3px rgba(52,211,153,0.07)` : 'none',
            transition: 'border-color 200ms, box-shadow 200ms',
            boxSizing: 'border-box',
          }}
        />
        {rightEl && (
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
            {rightEl}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Feature bullet ──────────────────────────────────────────────────────────
function Bullet({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <CheckCircle2 size={16} color={E.accent} style={{ flexShrink: 0 }} />
      <span style={{ color: textSec, fontSize: 14 }}>{text}</span>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function SignUp() {
  const [showPw,    setShowPw]    = useState(false);
  const [showCfm,   setShowCfm]   = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: bg, fontFamily: 'Inter, sans-serif' }}>

      {/* ── Left Panel ──────────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex"
        style={{
          width: 420, flexShrink: 0,
          background: panel,
          borderRight: `1px solid ${border}`,
          flexDirection: 'column',
          padding: '40px 40px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(52,211,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.03) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 0% 100%, rgba(52,211,153,0.09) 0%, transparent 65%)',
        }} />

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: `linear-gradient(135deg, ${E.dark}, ${E.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 20px rgba(52,211,153,0.25)`,
          }}>
            <Code2 size={19} color="#0F172A" strokeWidth={2.5} />
          </div>
          <span style={{ color: textPrimary, fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
            Dev<span style={{ color: E.accent }}>Flow</span>
          </span>
        </Link>

        {/* Main copy */}
        <div style={{ position: 'relative', zIndex: 1, marginTop: 52 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 12px', borderRadius: 99,
            background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.18)',
            color: E.accent, fontSize: 12, fontWeight: 700, marginBottom: 22,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: E.accent, boxShadow: `0 0 8px ${E.accent}` }} />
            Trusted by 18,000+ developers
          </div>

          <h2 style={{ color: textPrimary, fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: 16 }}>
            Join thousands of<br />
            <span style={{ color: E.accent }}>developers</span> leveling<br />
            up their skills
          </h2>
          <p style={{ color: textMuted, fontSize: 14, lineHeight: 1.75, marginBottom: 36 }}>
            DevFlow combines an AI-powered career coach, competitive coding arena, and curated knowledge library — all in one premium dark workspace.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Bullet text="AI-powered skill gap analysis" />
            <Bullet text="Competitive coding arena with rankings" />
            <Bullet text="Personalized learning roadmaps" />
            <Bullet text="Curated dev knowledge library" />
          </div>
        </div>

        {/* Testimonial */}
        <div style={{
          position: 'relative', zIndex: 1, marginTop: 'auto',
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${border}`,
          borderRadius: 14, padding: '20px 22px',
        }}>
          <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: E.accent, fontSize: 14 }}>★</span>)}
          </div>
          <p style={{ color: textSec, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
            "DevFlow turned my scattered dev notes into a structured career plan. I landed my dream job in 6 weeks."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: `linear-gradient(135deg, ${E.dark}, ${E.accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0F172A', fontWeight: 700, fontSize: 13,
            }}>JD</div>
            <div>
              <p style={{ color: textPrimary, fontSize: 13, fontWeight: 600 }}>James D.</p>
              <p style={{ color: textMuted, fontSize: 12 }}>Senior Engineer @ Stripe</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel (Form) ───────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 460 }}>

          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, textDecoration: 'none', marginBottom: 36 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg, ${E.dark}, ${E.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code2 size={17} color="#0F172A" strokeWidth={2.5} />
            </div>
            <span style={{ color: textPrimary, fontWeight: 700, fontSize: 16 }}>Dev<span style={{ color: E.accent }}>Flow</span></span>
          </Link>

          {/* Heading */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ color: textPrimary, fontSize: 26, fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 8 }}>
              Create your free account
            </h1>
            <p style={{ color: textMuted, fontSize: 14 }}>
              Start building your development library today
            </p>
          </div>

          {/* Social buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '11px 0', borderRadius: 11,
              background: card, border: `1px solid ${border}`,
              color: textPrimary, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'border-color 200ms, background 200ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = card; }}
            >
              <GoogleIcon />
              Sign up with Google
            </button>

            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '11px 0', borderRadius: 11,
              background: card, border: `1px solid ${border}`,
              color: textPrimary, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'border-color 200ms, background 200ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = card; }}
            >
              <GitHubIcon />
              Sign up with GitHub
            </button>
          </div>

          {/* Divider */}
          <div style={{ position: 'relative', margin: '28px 0' }}>
            <div style={{ height: 1, background: border }} />
            <span style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              background: bg, padding: '0 14px',
              color: textMuted, fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
              whiteSpace: 'nowrap',
            }}>OR CONTINUE WITH EMAIL</span>
          </div>

          {/* Form */}
          <form style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <FormInput id="name"  label="Full Name"       placeholder="Mufiza Dev"       icon={User} />
            <FormInput id="email" label="Email Address"   placeholder="you@example.com"  icon={Mail} type="email" />
            <FormInput
              id="password"
              label="Password"
              placeholder="••••••••••••"
              icon={Lock}
              type={showPw ? 'text' : 'password'}
              rightEl={
                <button type="button" onClick={() => setShowPw(v => !v)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: textMuted, display: 'flex', padding: 0 }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
            <FormInput
              id="confirm"
              label="Confirm Password"
              placeholder="••••••••••••"
              icon={Lock}
              type={showCfm ? 'text' : 'password'}
              rightEl={
                <button type="button" onClick={() => setShowCfm(v => !v)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: textMuted, display: 'flex', padding: 0 }}>
                  {showCfm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />

            {/* Terms */}
            <p style={{ color: textMuted, fontSize: 12, lineHeight: 1.6, marginTop: -6 }}>
              By creating an account you agree to our{' '}
              <span style={{ color: E.accent, cursor: 'pointer' }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: E.accent, cursor: 'pointer' }}>Privacy Policy</span>.
            </p>

            {/* CTA */}
            <button
              type="submit"
              style={{
                padding: '13px 0', borderRadius: 11, border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${E.dark}, ${E.accent})`,
                color: '#0F172A', fontSize: 15, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: `0 0 32px rgba(52,211,153,0.22)`,
                transition: 'opacity 200ms, box-shadow 200ms',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.92'; e.currentTarget.style.boxShadow = `0 0 48px rgba(52,211,153,0.32)`; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.boxShadow = `0 0 32px rgba(52,211,153,0.22)`; }}
            >
              Create Account
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </form>

          {/* Sign in link */}
          <p style={{ textAlign: 'center', color: textMuted, fontSize: 14, marginTop: 28 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: E.accent, fontWeight: 700, textDecoration: 'none' }}>
              Log in
            </Link>
          </p>

          {/* Trust row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 36, paddingTop: 24, borderTop: `1px solid ${border}` }}>
            {['Free 14-day trial', 'No credit card', 'Cancel anytime'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, color: textMuted, fontSize: 12 }}>
                <CheckCircle2 size={12} color={E.base} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        input::placeholder { color: #2D3F55; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
