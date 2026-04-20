import { Link } from 'react-router';
import { useState } from 'react';
import { Code2, Menu, X } from 'lucide-react';

const E = { bright: '#10B981', light: '#34D399', dark: '#166534' };

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      background: 'rgba(15,23,42,0.82)',
      borderBottom: '1px solid rgba(16,185,129,0.1)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: `linear-gradient(135deg, ${E.light}, ${E.bright})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 16px rgba(16,185,129,0.3)`,
          }}>
            <Code2 size={17} color="#0F172A" strokeWidth={2.5} />
          </div>
          <span style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
            Dev<span style={{ color: E.light }}>Flow</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
          {['Features', 'Solutions', 'Pricing', 'Blog'].map(l => (
            <Link key={l} to={l === 'Pricing' ? '/pricing' : '/'} style={{ color: '#94A3B8', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = E.light)}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
            >{l}</Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 12 }}>
          <Link to="/login" style={{ color: '#94A3B8', fontSize: 14, fontWeight: 500, textDecoration: 'none', padding: '8px 16px', borderRadius: 8, transition: 'color 200ms' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F0FDF4')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
          >Sign in</Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '9px 20px', borderRadius: 9,
              background: `linear-gradient(135deg, ${E.dark}, ${E.bright})`,
              color: '#F0FDF4', fontSize: 14, fontWeight: 700,
              border: 'none', cursor: 'pointer',
              boxShadow: `0 0 20px rgba(16,185,129,0.25)`,
              transition: 'opacity 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >Get Started Free</button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(v => !v)}
          style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: '1px solid rgba(16,185,129,0.1)', background: 'rgba(15,23,42,0.98)', padding: '16px 24px 24px' }}>
          {['Features', 'Solutions', 'Pricing', 'Blog'].map(l => (
            <div key={l} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <Link to="/" style={{ color: '#94A3B8', fontSize: 15, textDecoration: 'none' }}>{l}</Link>
            </div>
          ))}
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/login" style={{ color: '#94A3B8', fontSize: 14, textDecoration: 'none', textAlign: 'center', padding: '10px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9 }}>Sign in</Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '11px', borderRadius: 9, background: `linear-gradient(135deg, ${E.dark}, ${E.bright})`, color: '#F0FDF4', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>Get Started Free</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
