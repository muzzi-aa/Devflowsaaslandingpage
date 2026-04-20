import { Link } from 'react-router';
import { ArrowRight, Terminal } from 'lucide-react';

const E = { bright: '#10B981', light: '#34D399', mid: '#166534', dark: '#14532D' };

export function CTA() {
  return (
    <section style={{ padding: '80px 24px 100px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          borderRadius: 24,
          background: `linear-gradient(135deg, rgba(20,83,45,0.6) 0%, rgba(22,101,52,0.3) 50%, rgba(15,23,42,0.9) 100%)`,
          border: '1px solid rgba(16,185,129,0.22)',
          padding: '64px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(16,185,129,0.08)',
        }}>
          {/* Grid bg */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,185,129,0.04) 1px,transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px,transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />
          {/* Glow orb */}
          <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <Terminal size={14} color={E.light} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: E.light }}>
                devflow.init() → ready
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 900, color: '#F0FDF4', letterSpacing: '-0.04em', marginBottom: 18, lineHeight: 1.1 }}>
              Start your flow state today
            </h2>
            <p style={{ color: '#64748B', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 36px', }}>
              Join 12,000+ developers who've reclaimed their focus and doubled their output with DevFlow.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '14px 32px', borderRadius: 12,
                  background: `linear-gradient(135deg, ${E.mid}, ${E.bright})`,
                  color: '#F0FDF4', fontSize: 15, fontWeight: 700,
                  border: 'none', cursor: 'pointer',
                  boxShadow: `0 0 32px rgba(16,185,129,0.3)`,
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'opacity 200ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.86')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Get started — it's free
                  <ArrowRight size={15} />
                </button>
              </Link>
              <p style={{ color: '#334155', fontSize: 13 }}>No credit card required · Free forever</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
