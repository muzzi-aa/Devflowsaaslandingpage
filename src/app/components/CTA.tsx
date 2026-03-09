import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router';

export function CTA() {
  return (
    <section className="py-28 px-6" style={{ backgroundColor: '#111418' }}>
      <div className="max-w-5xl mx-auto">
        <div
          className="relative rounded-3xl p-16 text-center overflow-hidden border"
          style={{
            backgroundColor: '#1A1F24',
            borderColor: '#2A2F35',
          }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center top, rgba(74,222,128,0.12) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            {/* Terminal badge */}
            <div className="flex justify-center mb-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-mono"
                style={{
                  backgroundColor: 'rgba(74,222,128,0.08)',
                  borderColor: 'rgba(74,222,128,0.25)',
                  color: '#4ADE80',
                }}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>$ devflow start --free</span>
              </div>
            </div>

            <h2
              className="tracking-tight mb-5"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}
            >
              Start building your library
            </h2>
            <p className="max-w-xl mx-auto mb-10" style={{ color: '#9AA4B2' }}>
              Join thousands of developers organizing their knowledge with DevFlow. 
              Spend less time searching, more time building.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                    color: '#111418',
                    fontWeight: 700,
                    boxShadow: '0 0 30px rgba(74,222,128,0.3)',
                  }}
                >
                  Get Started for Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm border transition-all hover:opacity-80"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#2A2F35',
                  color: '#9AA4B2',
                }}
              >
                Contact Sales
              </button>
            </div>

            <p className="text-xs mt-6" style={{ color: '#9AA4B2' }}>
              No credit card required · Free 14-day trial · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
