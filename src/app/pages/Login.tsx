import { Link } from 'react-router';
import { useState } from 'react';
import { Eye, EyeOff, Code2, ChevronRight, ArrowRight } from 'lucide-react';

const E = { bright: '#10B981', light: '#34D399', mid: '#166534', dark: '#14532D' };

// ── Google SVG icon ────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ── GitHub SVG icon ────────────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#E2E8F0">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]               = useState('mufiza@devflow.dev');
  const [password, setPassword]         = useState('mypassword123');
  const [emailFocus, setEmailFocus]     = useState(false);
  const [passFocus, setPassFocus]       = useState(false);
  const [googleHover, setGoogleHover]   = useState(false);
  const [githubHover, setGithubHover]   = useState(false);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#080E1A', position: 'relative', overflow: 'hidden',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>

      {/* ── Layered background ── */}
      {/* Deep grid */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(rgba(16,185,129,0.04) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      {/* Large ambient emerald glow — top center */}
      <div style={{ position: 'fixed', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
      {/* Bottom left glow */}
      <div style={{ position: 'fixed', bottom: '-15%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,83,45,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
      {/* Top right subtle */}
      <div style={{ position: 'fixed', top: '0', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* ── Main card ── */}
      <div style={{
        width: '100%', maxWidth: 440, margin: '0 auto', padding: '0 20px',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          background: 'rgba(10,16,30,0.85)',
          border: '1px solid rgba(16,185,129,0.12)',
          borderRadius: 20,
          padding: '40px 36px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}>

          {/* ── Logo ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${E.mid} 0%, ${E.bright} 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 24px rgba(16,185,129,0.35), 0 4px 16px rgba(0,0,0,0.4)`,
              }}>
                <Code2 size={22} color="#F0FDF4" strokeWidth={2.5} />
              </div>
              <span style={{ color: '#F0FDF4', fontWeight: 800, fontSize: 20, letterSpacing: '-0.03em' }}>
                Dev<span style={{ color: E.light }}>Flow</span>
              </span>
            </Link>
          </div>

          {/* ── Headings ── */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ color: '#F0FDF4', fontSize: 26, fontWeight: 900, letterSpacing: '-0.035em', marginBottom: 6, lineHeight: 1.2 }}>
              Welcome back
            </h1>
            <p style={{ color: '#475569', fontSize: 14, fontWeight: 500 }}>
              Sign in to your developer workspace
            </p>
          </div>

          {/* ── Social login buttons ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {/* Google */}
            <button
              onMouseEnter={() => setGoogleHover(true)}
              onMouseLeave={() => setGoogleHover(false)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11,
                background: googleHover ? 'rgba(66,133,244,0.1)' : 'rgba(255,255,255,0.03)',
                border: googleHover ? '1px solid rgba(66,133,244,0.35)' : '1px solid rgba(255,255,255,0.08)',
                color: googleHover ? '#94A3B8' : '#64748B', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 200ms ease',
                boxShadow: googleHover ? '0 0 20px rgba(66,133,244,0.06)' : 'none',
              }}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* GitHub */}
            <button
              onMouseEnter={() => setGithubHover(true)}
              onMouseLeave={() => setGithubHover(false)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11,
                background: githubHover ? 'rgba(226,232,240,0.06)' : 'rgba(255,255,255,0.03)',
                border: githubHover ? '1px solid rgba(226,232,240,0.2)' : '1px solid rgba(255,255,255,0.08)',
                color: githubHover ? '#94A3B8' : '#64748B', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 200ms ease',
              }}
            >
              <GitHubIcon />
              Continue with GitHub
            </button>
          </div>

          {/* ── Divider ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span style={{ color: '#1E293B', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* ── Form ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 24 }}>

            {/* Email */}
            <div>
              <label style={{ display: 'block', color: '#334155', fontSize: 11, fontWeight: 800, letterSpacing: '0.07em', marginBottom: 8 }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10, fontSize: 14, outline: 'none',
                  transition: 'all 200ms ease', boxSizing: 'border-box',
                  background: emailFocus ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.025)',
                  border: emailFocus ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  color: '#F0FDF4',
                  boxShadow: emailFocus ? '0 0 0 3px rgba(16,185,129,0.08)' : 'none',
                  caretColor: E.bright,
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ color: '#334155', fontSize: 11, fontWeight: 800, letterSpacing: '0.07em' }}>
                  PASSWORD
                </label>
                <Link to="/" style={{ color: E.bright, fontSize: 12, fontWeight: 700, textDecoration: 'none', transition: 'color 150ms' }}
                  onMouseEnter={e => (e.currentTarget.style.color = E.light)}
                  onMouseLeave={e => (e.currentTarget.style.color = E.bright)}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  style={{
                    width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, fontSize: 14, outline: 'none',
                    transition: 'all 200ms ease', boxSizing: 'border-box',
                    background: passFocus ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.025)',
                    border: passFocus ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.07)',
                    color: '#F0FDF4',
                    boxShadow: passFocus ? '0 0 0 3px rgba(16,185,129,0.08)' : 'none',
                    caretColor: E.bright,
                  }}
                />
                <button
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#334155', cursor: 'pointer', padding: 2, display: 'flex', transition: 'color 150ms' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#64748B')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#334155')}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>

          {/* ── Sign in button ── */}
          <Link to="/dashboard" style={{ textDecoration: 'none', display: 'block', marginBottom: 20 }}>
            <button style={{
              width: '100%', padding: '13px', borderRadius: 11,
              background: `linear-gradient(135deg, ${E.dark} 0%, ${E.mid} 40%, ${E.bright} 100%)`,
              color: '#F0FDF4', fontSize: 15, fontWeight: 800, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: `0 4px 24px rgba(16,185,129,0.28), 0 1px 0 rgba(255,255,255,0.1) inset`,
              transition: 'all 220ms ease',
              letterSpacing: '-0.01em',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 32px rgba(16,185,129,0.42)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 24px rgba(16,185,129,0.28)`; (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
            >
              Sign in to DevFlow
              <ArrowRight size={16} />
            </button>
          </Link>

          {/* ── Sign up link ── */}
          <p style={{ textAlign: 'center', color: '#1E293B', fontSize: 13 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: E.light, textDecoration: 'none', fontWeight: 800 }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
              Sign up free
            </Link>
          </p>
        </div>

        {/* ── Footer ── */}
        <p style={{ textAlign: 'center', color: '#0F172A', fontSize: 11, marginTop: 20 }}>
          By signing in, you agree to our{' '}
          <Link to="/" style={{ color: '#1E293B', textDecoration: 'underline' }}>Terms</Link>
          {' '}and{' '}
          <Link to="/" style={{ color: '#1E293B', textDecoration: 'underline' }}>Privacy Policy</Link>
        </p>
      </div>

      <style>{`
        input::placeholder { color: #1E293B !important; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #080E1A inset !important;
          -webkit-text-fill-color: #F0FDF4 !important;
        }
      `}</style>
    </div>
  );
}
