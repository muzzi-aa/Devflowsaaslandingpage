import { Link } from 'react-router';
import { Code2 } from 'lucide-react';

const E = { bright: '#10B981', light: '#34D399' };

const cols = [
  { label: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
  { label: 'Resources', links: ['Docs', 'Blog', 'Community', 'Status'] },
  { label: 'Company', links: ['About', 'Careers', 'Privacy', 'Terms'] },
];

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(16,185,129,0.08)', padding: '60px 24px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }} className="grid-cols-2 md:grid-cols-4">
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${E.light}, ${E.bright})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code2 size={15} color="#0F172A" strokeWidth={2.5} />
              </div>
              <span style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em' }}>
                Dev<span style={{ color: E.light }}>Flow</span>
              </span>
            </Link>
            <p style={{ color: '#334155', fontSize: 13, lineHeight: 1.8, maxWidth: 240 }}>
              The productivity platform built for developers who care about their craft.
            </p>
          </div>
          {cols.map(c => (
            <div key={c.label}>
              <p style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 13, marginBottom: 18, letterSpacing: '0.04em' }}>{c.label}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.links.map(l => (
                  <Link key={l} to="/" style={{ color: '#334155', fontSize: 13, textDecoration: 'none', transition: 'color 200ms' }}
                    onMouseEnter={e => (e.currentTarget.style.color = E.light)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#334155')}
                  >{l}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(16,185,129,0.06)', paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#1E293B', fontSize: 12 }}>© 2026 DevFlow. All rights reserved.</p>
          <p style={{ color: '#1E293B', fontSize: 12 }}>Built with ❤️ for developers</p>
        </div>
      </div>
    </footer>
  );
}
