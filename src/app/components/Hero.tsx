import { ArrowRight, Terminal, Sparkles, GitBranch, Zap } from 'lucide-react';
import { Link } from 'react-router';

export function Hero() {
  return (
    <section
      className="relative pt-40 pb-32 px-6 overflow-hidden"
      style={{ backgroundColor: '#111418' }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(74,222,128,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
            style={{
              backgroundColor: 'rgba(74,222,128,0.08)',
              borderColor: 'rgba(74,222,128,0.3)',
              color: '#4ADE80',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for modern developers</span>
            <span
              className="px-2 py-0.5 rounded-full text-xs"
              style={{ backgroundColor: 'rgba(74,222,128,0.2)', color: '#4ADE80' }}
            >
              v1.0
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1
            className="tracking-tight mb-6"
            style={{
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
            }}
          >
            Your personal{' '}
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 50%, #86EFAC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              development library
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: '#9AA4B2' }}>
            Store code snippets, track algorithms, and build your knowledge base.
            Everything organized, searchable, and accessible — whenever you need it.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link to="/signup">
            <button
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                color: '#111418',
                fontWeight: 700,
                boxShadow: '0 0 30px rgba(74,222,128,0.3)',
              }}
            >
              Start for Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <button
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm border transition-all hover:opacity-80"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#2A2F35',
              color: '#9AA4B2',
            }}
          >
            <Terminal className="w-4 h-4" />
            View Demo
          </button>
        </div>

        {/* Stats Row */}
        <div
          className="grid grid-cols-3 gap-0 border rounded-2xl overflow-hidden max-w-2xl mx-auto"
          style={{ borderColor: '#2A2F35', backgroundColor: '#1A1F24' }}
        >
          {[
            { value: '12K+', label: 'Developers', icon: GitBranch },
            { value: '98K+', label: 'Notes Saved', icon: Terminal },
            { value: '99.9%', label: 'Uptime', icon: Zap },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="px-6 py-5 text-center flex flex-col items-center gap-1"
              style={{ borderRight: i < 2 ? `1px solid #2C3238` : 'none' }}
            >
              <stat.icon className="w-4 h-4 mb-1" style={{ color: '#4ADE80' }} />
              <p className="text-xl" style={{ color: '#FFFFFF', fontWeight: 700 }}>{stat.value}</p>
              <p className="text-xs" style={{ color: '#9AA4B2' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
