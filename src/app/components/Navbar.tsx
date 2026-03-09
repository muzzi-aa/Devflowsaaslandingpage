import { Code2, Menu, X } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
      style={{
        backgroundColor: 'rgba(17,20,24,0.85)',
        borderColor: '#2A2F35',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)', boxShadow: '0 0 0 0 rgba(74,222,128,0)' }}
          >
            <Code2 className="w-4 h-4" style={{ color: '#111418' }} strokeWidth={2.5} />
          </div>
          <span className="text-lg tracking-tight" style={{ color: '#FFFFFF', fontWeight: 600 }}>DevFlow</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="#features"
            className="px-4 py-2 text-sm rounded-lg transition-colors"
            style={{ color: '#9AA4B2' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9AA4B2')}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="px-4 py-2 text-sm rounded-lg transition-colors"
            style={{ color: '#9AA4B2' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9AA4B2')}
          >
            Pricing
          </a>
          <a
            href="#"
            className="px-4 py-2 text-sm rounded-lg transition-colors"
            style={{ color: '#9AA4B2' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9AA4B2')}
          >
            Docs
          </a>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <button
              className="px-4 py-2 text-sm rounded-lg transition-all"
              style={{ color: '#9AA4B2' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9AA4B2')}
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              className="px-4 py-2 text-sm rounded-lg transition-all"
              style={{
                background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                color: '#111418',
                fontWeight: 600,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: '#9AA4B2' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-2" style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}>
          <a href="#features" className="block px-3 py-2 text-sm rounded-lg" style={{ color: '#9AA4B2' }}>Features</a>
          <a href="#pricing" className="block px-3 py-2 text-sm rounded-lg" style={{ color: '#9AA4B2' }}>Pricing</a>
          <a href="#" className="block px-3 py-2 text-sm rounded-lg" style={{ color: '#9AA4B2' }}>Docs</a>
          <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: '#2C3238' }}>
            <Link to="/login">
              <button className="w-full px-4 py-2 text-sm rounded-lg border" style={{ color: '#9AA4B2', borderColor: '#2A2F35' }}>
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="w-full px-4 py-2 text-sm rounded-lg" style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)', color: '#111418', fontWeight: 600 }}>
                Get Started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
