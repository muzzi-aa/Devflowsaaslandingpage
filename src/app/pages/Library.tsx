import { Search, Filter, Crown, Eye, FileText, BookOpen, Code2, Database, Cpu, Globe, Lock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const categoryIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  React: Code2,
  TypeScript: Code2,
  DSA: Cpu,
  CSS: Globe,
  'System Design': Database,
  'Node.js': Code2,
  DevOps: Globe,
  Git: BookOpen,
};

const tagColorMap: Record<string, string> = {
  React: '#60A5FA',
  TypeScript: '#A78BFA',
  DSA: '#4ADE80',
  Algorithms: '#4ADE80',
  CSS: '#F472B6',
  Frontend: '#F472B6',
  'System Design': '#FBBF24',
  Architecture: '#FBBF24',
  'Node.js': '#34D399',
  Backend: '#F97316',
  Docker: '#60A5FA',
  DevOps: '#94A3B8',
  Git: '#FB923C',
  Advanced: '#A78BFA',
};

export const libraryDocs = [
  {
    id: 1,
    title: 'React Hooks Complete Guide',
    description: 'Master React hooks with practical examples, custom hook patterns, and performance tips for modern React development.',
    premium: false,
    author: 'Mufiza Dev',
    date: 'Mar 8, 2026',
    type: 'PDF',
    size: '2.4 MB',
    category: 'React',
    tags: ['React', 'Frontend'],
    pages: 48,
    readTime: '25 min',
  },
  {
    id: 2,
    title: 'Advanced TypeScript Patterns',
    description: 'Deep dive into advanced TypeScript generics, conditional types, mapped types, and utility types for large-scale apps.',
    premium: true,
    author: 'DevFlow Team',
    date: 'Mar 5, 2026',
    type: 'PDF',
    size: '3.8 MB',
    category: 'TypeScript',
    tags: ['TypeScript', 'Advanced'],
    pages: 72,
    readTime: '40 min',
  },
  {
    id: 3,
    title: 'DSA Patterns for Interviews',
    description: 'Comprehensive guide covering sliding window, two pointers, BFS/DFS, dynamic programming with 150+ solved problems.',
    premium: true,
    author: 'DevFlow Team',
    date: 'Mar 3, 2026',
    type: 'PDF',
    size: '5.2 MB',
    category: 'DSA',
    tags: ['DSA', 'Algorithms'],
    pages: 120,
    readTime: '90 min',
  },
  {
    id: 4,
    title: 'CSS Grid & Flexbox Mastery',
    description: 'Visual guide to modern CSS layout with grid and flexbox, including real-world responsive design examples and patterns.',
    premium: false,
    author: 'Mufiza Dev',
    date: 'Mar 1, 2026',
    type: 'PDF',
    size: '1.8 MB',
    category: 'CSS',
    tags: ['CSS', 'Frontend'],
    pages: 36,
    readTime: '20 min',
  },
  {
    id: 5,
    title: 'System Design Fundamentals',
    description: 'Learn to design scalable systems from scratch. Covers databases, caching, load balancing, and microservices architecture.',
    premium: true,
    author: 'DevFlow Team',
    date: 'Feb 28, 2026',
    type: 'PDF',
    size: '6.1 MB',
    category: 'System Design',
    tags: ['System Design', 'Architecture'],
    pages: 156,
    readTime: '120 min',
  },
  {
    id: 6,
    title: 'Node.js Performance Guide',
    description: 'Optimize your Node.js applications with profiling, event loop mastery, clustering, streams, and production best practices.',
    premium: false,
    author: 'Mufiza Dev',
    date: 'Feb 25, 2026',
    type: 'PDF',
    size: '2.2 MB',
    category: 'Node.js',
    tags: ['Node.js', 'Backend'],
    pages: 44,
    readTime: '28 min',
  },
  {
    id: 7,
    title: 'Docker & Kubernetes Handbook',
    description: 'Complete containerization guide from Docker basics to production-grade Kubernetes deployments, Helm charts, and CI/CD.',
    premium: true,
    author: 'DevFlow Team',
    date: 'Feb 22, 2026',
    type: 'PDF',
    size: '7.4 MB',
    category: 'DevOps',
    tags: ['Docker', 'DevOps'],
    pages: 192,
    readTime: '150 min',
  },
  {
    id: 8,
    title: 'Git Workflow Strategies',
    description: 'Professional Git workflows including GitFlow, trunk-based development, PR best practices, and commit message conventions.',
    premium: false,
    author: 'Mufiza Dev',
    date: 'Feb 20, 2026',
    type: 'PDF',
    size: '1.2 MB',
    category: 'Git',
    tags: ['Git', 'Backend'],
    pages: 28,
    readTime: '15 min',
  },
];

const filters = ['All', 'Free', 'Premium', 'React', 'TypeScript', 'DSA', 'DevOps'];

export default function Library() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = libraryDocs.filter((doc) => {
    const matchesQuery =
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.description.toLowerCase().includes(query.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Free' && !doc.premium) ||
      (activeFilter === 'Premium' && doc.premium) ||
      doc.category === activeFilter ||
      doc.tags.includes(activeFilter);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5" style={{ color: '#4ADE80' }} />
          <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.6rem' }}>Content Library</h2>
        </div>
        <p className="text-sm" style={{ color: '#9AA4B2' }}>
          Browse and access developer resources · {libraryDocs.filter((d) => !d.premium).length} free,{' '}
          {libraryDocs.filter((d) => d.premium).length} premium
        </p>
      </div>

      {/* Search Bar */}
      <div
        className="flex gap-3 mb-5 p-3 rounded-2xl border"
        style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9AA4B2' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, topics, tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
            style={{ backgroundColor: '#111418', borderColor: '#2A2F35', color: '#FFFFFF' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#4ADE80')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#2A2F35')}
          />
        </div>
        <button
          className="px-4 py-2.5 rounded-xl border text-sm flex items-center gap-2 transition-all hover:opacity-80"
          style={{ borderColor: '#2A2F35', color: '#9AA4B2', backgroundColor: '#111418' }}
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-7">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="px-3.5 py-1.5 rounded-full text-xs border transition-all"
            style={
              activeFilter === f
                ? {
                    backgroundColor: 'rgba(74,222,128,0.15)',
                    borderColor: '#4ADE80',
                    color: '#4ADE80',
                    fontWeight: 600,
                  }
                : {
                    backgroundColor: 'transparent',
                    borderColor: '#2A2F35',
                    color: '#9AA4B2',
                  }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs mb-5" style={{ color: '#9AA4B2' }}>
        Showing{' '}
        <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{filtered.length}</span>{' '}
        {filtered.length === 1 ? 'document' : 'documents'}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: '#2A2F35' }} />
          <p style={{ color: '#9AA4B2' }}>No documents match your search</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((doc) => {
            const IconComp = categoryIcons[doc.category] || FileText;
            return (
              <div
                key={doc.id}
                className="group relative flex flex-col rounded-2xl border overflow-hidden transition-all hover:scale-[1.02]"
                style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = doc.premium ? 'rgba(251,191,36,0.4)' : 'rgba(74,222,128,0.4)')
                }
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2A2F35')}
              >
                {/* Premium Badge */}
                {doc.premium && (
                  <div className="absolute top-3 right-3 z-10">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                      style={{
                        background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.08))',
                        border: '1px solid rgba(251,191,36,0.3)',
                        color: '#FBBF24',
                        fontWeight: 600,
                      }}
                    >
                      <Crown className="w-2.5 h-2.5" />
                      Pro
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div
                  className="px-5 pt-5 pb-4"
                  style={{
                    background: doc.premium
                      ? 'linear-gradient(135deg, rgba(251,191,36,0.04) 0%, transparent 60%)'
                      : 'linear-gradient(135deg, rgba(74,222,128,0.04) 0%, transparent 60%)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: doc.premium ? 'rgba(251,191,36,0.1)' : 'rgba(74,222,128,0.1)',
                      border: `1px solid ${doc.premium ? 'rgba(251,191,36,0.2)' : 'rgba(74,222,128,0.2)'}`,
                    }}
                  >
                    <IconComp
                      className="w-5 h-5"
                      style={{ color: doc.premium ? '#FBBF24' : '#4ADE80' }}
                    />
                  </div>

                  <h3
                    className="mb-2 pr-8 line-clamp-2"
                    style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.4 }}
                  >
                    {doc.title}
                  </h3>
                  <p
                    className="text-xs line-clamp-2"
                    style={{ color: '#9AA4B2', lineHeight: 1.6 }}
                  >
                    {doc.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="px-5 pb-3 flex flex-wrap gap-1">
                  {doc.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: (tagColorMap[tag] || '#4ADE80') + '18',
                        color: tagColorMap[tag] || '#4ADE80',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Divider + Meta */}
                <div
                  className="px-5 py-3 flex items-center justify-between text-xs"
                  style={{ borderTop: '1px solid #2C3238', color: '#9AA4B2' }}
                >
                  <span>{doc.pages} pages · {doc.readTime}</span>
                  <span>{doc.size}</span>
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                  {doc.premium ? (
                    <Link to={`/dashboard/library/${doc.id}`}>
                      <button
                        className="w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all border"
                        style={{
                          borderColor: 'rgba(251,191,36,0.3)',
                          color: '#FBBF24',
                          backgroundColor: 'rgba(251,191,36,0.08)',
                          fontWeight: 600,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(251,191,36,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(251,191,36,0.08)';
                        }}
                      >
                        <Lock className="w-3 h-3" />
                        Unlock with Pro
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/dashboard/library/${doc.id}`}>
                      <button
                        className="w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                          color: '#111418',
                          fontWeight: 700,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        <Eye className="w-3 h-3" />
                        View Document
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pro upsell banner */}
      <div
        className="mt-10 relative rounded-2xl border p-6 overflow-hidden"
        style={{ backgroundColor: '#1A1F24', borderColor: 'rgba(251,191,36,0.3)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at left, rgba(251,191,36,0.06) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4" style={{ color: '#FBBF24' }} />
              <span className="text-sm" style={{ color: '#FBBF24', fontWeight: 600 }}>
                Unlock {libraryDocs.filter((d) => d.premium).length} Premium Documents
              </span>
            </div>
            <p className="text-xs" style={{ color: '#9AA4B2' }}>
              Get full access to all premium content, including System Design, Advanced TypeScript, DSA Patterns and more.
            </p>
          </div>
          <Link to="/dashboard/subscription">
            <button
              className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                color: '#111418',
                fontWeight: 700,
              }}
            >
              <Crown className="w-4 h-4" />
              Upgrade to Pro
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
