import { Code2, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

const navLinks = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Changelog', href: '#' },
      { name: 'Roadmap', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'GitHub', href: '#' },
      { name: 'Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#111418', borderTop: '1px solid #2C3238' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)' }}
              >
                <Code2 className="w-4 h-4" style={{ color: '#111418' }} strokeWidth={2.5} />
              </div>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>DevFlow</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#9AA4B2' }}>
              Your personal development library for code snippets, problems, and resources.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all"
                  style={{ borderColor: '#2A2F35', color: '#9AA4B2' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#4ADE80';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#4ADE80';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#2A2F35';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#9AA4B2';
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {navLinks.map((section) => (
            <div key={section.title}>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#4ADE80', fontWeight: 600 }}>
                {section.title}
              </p>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: '#9AA4B2' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9AA4B2')}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid #2C3238' }}
        >
          <p className="text-sm" style={{ color: '#9AA4B2' }}>
            © 2026 DevFlow. All rights reserved.
          </p>
          <p className="font-mono text-xs" style={{ color: '#2A2F35' }}>
            v1.0.0 · Built with ❤️ for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
