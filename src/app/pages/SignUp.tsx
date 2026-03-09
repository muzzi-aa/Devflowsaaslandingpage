import { Code2, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: '#111418' }}
    >
      {/* Left panel — decorative */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{ backgroundColor: '#1A1F24', borderRight: '1px solid #2A2F35' }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(74,222,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(74,222,128,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Brand */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)' }}
            >
              <Code2 className="w-5 h-5" style={{ color: '#111418' }} strokeWidth={2.5} />
            </div>
            <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.2rem' }}>DevFlow</span>
          </Link>
        </div>

        {/* Testimonial / feature highlight */}
        <div className="relative z-10">
          <div
            className="rounded-2xl p-6 border mb-6"
            style={{ backgroundColor: 'rgba(17,20,24,0.6)', borderColor: '#2A2F35' }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#4ADE80' }}>★</span>
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#9AA4B2' }}>
              "DevFlow completely changed how I organize my dev knowledge. My interview prep went from chaotic to structured in a week."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)', color: '#111418', fontWeight: 700 }}>
                JD
              </div>
              <div>
                <p className="text-sm" style={{ color: '#FFFFFF', fontWeight: 600 }}>James D.</p>
                <p className="text-xs" style={{ color: '#9AA4B2' }}>Senior Engineer @ Stripe</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-sm" style={{ color: '#9AA4B2' }}>
            <span>✓ Free 14-day trial</span>
            <span>✓ No credit card</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center justify-center gap-2.5 mb-10 lg:hidden">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)' }}
            >
              <Code2 className="w-4 h-4" style={{ color: '#111418' }} strokeWidth={2.5} />
            </div>
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>DevFlow</span>
          </Link>

          <div className="mb-8">
            <h1 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.75rem' }}>Create your account</h1>
            <p className="mt-2 text-sm" style={{ color: '#9AA4B2' }}>
              Start building your development library today
            </p>
          </div>

          {/* Google Sign Up */}
          <button
            className="w-full py-3 rounded-xl border text-sm flex items-center justify-center gap-2.5 mb-6 transition-all hover:opacity-80"
            style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35', color: '#FFFFFF' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: '1px solid #2C3238' }} />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3" style={{ backgroundColor: '#111418', color: '#9AA4B2' }}>
                OR CONTINUE WITH EMAIL
              </span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm mb-2" style={{ color: '#9AA4B2' }}>
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9AA4B2' }} />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    backgroundColor: '#1A1F24',
                    borderColor: '#2A2F35',
                    color: '#FFFFFF',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#4ADE80')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#2A2F35')}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2" style={{ color: '#9AA4B2' }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9AA4B2' }} />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    backgroundColor: '#1A1F24',
                    borderColor: '#2A2F35',
                    color: '#FFFFFF',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#4ADE80')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#2A2F35')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-2" style={{ color: '#9AA4B2' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9AA4B2' }} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    backgroundColor: '#1A1F24',
                    borderColor: '#2A2F35',
                    color: '#FFFFFF',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#4ADE80')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#2A2F35')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: '#9AA4B2' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs mt-1.5" style={{ color: '#9AA4B2' }}>
                Must be at least 8 characters
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm mt-2 transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                color: '#111418',
                fontWeight: 700,
                boxShadow: '0 0 20px rgba(74,222,128,0.2)',
              }}
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm mt-7" style={{ color: '#9AA4B2' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#4ADE80', fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
