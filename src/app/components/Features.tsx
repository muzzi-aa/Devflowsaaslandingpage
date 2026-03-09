import { Upload, Code2, Library, ArrowUpRight, Search, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Upload Notes',
    description:
      'Quickly save code snippets, documentation, and technical notes. Tag, organize, and find everything instantly.',
    tag: 'Organize',
    accent: '#4ADE80',
  },
  {
    icon: Code2,
    title: 'Coding Problems',
    description:
      'Track algorithms, interview questions, and solutions. Build your problem-solving arsenal with detailed explanations.',
    tag: 'Practice',
    accent: '#60A5FA',
  },
  {
    icon: Library,
    title: 'Developer Library',
    description:
      'Create your personal reference library. Access best practices, patterns, and resources whenever you need them.',
    tag: 'Reference',
    accent: '#A78BFA',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description:
      'Full-text search across all your content. Find exactly what you need with intelligent filtering and sorting.',
    tag: 'Discovery',
    accent: '#F97316',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description:
      'End-to-end encrypted storage. Your intellectual property stays yours — always private, always protected.',
    tag: 'Security',
    accent: '#34D399',
  },
  {
    icon: Zap,
    title: 'Instant Access',
    description:
      'Lightning-fast retrieval with global CDN. Access your library from anywhere, on any device, at any time.',
    tag: 'Performance',
    accent: '#FBBF24',
  },
];

export function Features() {
  return (
    <section id="features" className="py-28 px-6" style={{ backgroundColor: '#111418' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm mb-4 tracking-widest uppercase" style={{ color: '#4ADE80' }}>
            Platform Features
          </p>
          <h2
            className="tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}
          >
            Everything you need
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: '#9AA4B2' }}>
            Powerful features designed for developers who take their craft seriously.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl p-7 border transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                backgroundColor: '#1A1F24',
                borderColor: '#2A2F35',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = feature.accent + '55';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#2A2F35';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Subtle glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${feature.accent}0A 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: feature.accent + '18' }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: feature.accent }} strokeWidth={2} />
                  </div>
                  <span
                    className="text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: feature.accent, backgroundColor: feature.accent + '15' }}
                  >
                    {feature.tag}
                  </span>
                </div>

                <h3 className="mb-2.5" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#9AA4B2' }}>
                  {feature.description}
                </p>

                <div
                  className="inline-flex items-center gap-1 text-sm transition-all group-hover:gap-2"
                  style={{ color: feature.accent }}
                >
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
