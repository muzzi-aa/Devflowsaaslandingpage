import {
  Upload,
  FileText,
  CreditCard,
  ArrowUpRight,
  File,
  TrendingUp,
  Clock,
  Zap,
  Code2,
  FolderOpen,
} from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

const stats = [
  {
    icon: FileText,
    title: 'Total Uploads',
    value: '24',
    change: '+3 this week',
    link: '/dashboard/uploads',
    accent: '#4ADE80',
  },
  {
    icon: TrendingUp,
    title: 'Problems Solved',
    value: '87',
    change: '+12 this month',
    link: '/dashboard/uploads',
    accent: '#60A5FA',
  },
  {
    icon: Clock,
    title: 'Time Saved',
    value: '14h',
    change: 'est. this month',
    link: '/dashboard/uploads',
    accent: '#A78BFA',
  },
  {
    icon: Zap,
    title: 'Searches Made',
    value: '342',
    change: '+28 today',
    link: '/dashboard/uploads',
    accent: '#FBBF24',
  },
];

const quickActions = [
  {
    icon: Upload,
    title: 'Upload Content',
    description: 'Add new notes and resources',
    link: '/dashboard/upload',
    accent: '#4ADE80',
  },
  {
    icon: FileText,
    title: 'My Uploads',
    description: '24 items in your library',
    link: '/dashboard/uploads',
    accent: '#60A5FA',
  },
  {
    icon: CreditCard,
    title: 'Upgrade to Pro',
    description: 'Unlimited uploads & AI search',
    link: '/dashboard/subscription',
    accent: '#A78BFA',
  },
];

const recentUploads = [
  { id: 1, title: 'React Hooks Cheatsheet', type: 'PDF', date: 'Mar 8, 2026', size: '2.4 MB', tag: 'React' },
  { id: 2, title: 'Algorithm Solutions', type: 'PDF', date: 'Mar 7, 2026', size: '1.8 MB', tag: 'DSA' },
  { id: 3, title: 'TypeScript Best Practices', type: 'PDF', date: 'Mar 6, 2026', size: '3.1 MB', tag: 'TypeScript' },
  { id: 4, title: 'Node.js Performance Tips', type: 'PDF', date: 'Mar 5, 2026', size: '2.2 MB', tag: 'Backend' },
  { id: 5, title: 'CSS Grid Examples', type: 'PDF', date: 'Mar 4, 2026', size: '1.5 MB', tag: 'CSS' },
];

const tagColors: Record<string, string> = {
  React: '#60A5FA',
  DSA: '#4ADE80',
  TypeScript: '#A78BFA',
  Backend: '#F97316',
  CSS: '#F472B6',
};

export default function Dashboard() {
  const [isEmpty, setIsEmpty] = useState(false);

  // ── Empty State ──────────────────────────────────────────────────────────────
  if (isEmpty) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Toggle back button (demo) */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsEmpty(false)}
            className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: '#2A2F35', color: '#9AA4B2' }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Empty state container */}
        <div
          className="relative rounded-2xl border overflow-hidden"
          style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
        >
          {/* Dot-grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(74,222,128,0.1) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
          {/* Radial fade overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, #1A1F24 80%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-8">
            {/* Illustration */}
            <div
              className="relative w-24 h-24 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(74,222,128,0.1), rgba(74,222,128,0.03))',
                border: '1px solid rgba(74,222,128,0.2)',
                boxShadow: '0 0 40px rgba(74,222,128,0.08)',
              }}
            >
              <FolderOpen className="w-10 h-10" style={{ color: '#4ADE80' }} />
              {/* Corner dots */}
              <div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2"
                style={{ backgroundColor: '#111418', borderColor: '#4ADE80' }}
              />
              <div
                className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full"
                style={{ backgroundColor: 'rgba(74,222,128,0.3)' }}
              />
            </div>

            {/* Terminal-style label */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-5 text-xs"
              style={{
                backgroundColor: '#111418',
                borderColor: '#2A2F35',
                color: '#4ADE80',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <span style={{ color: '#9AA4B2' }}>$</span> ls ./uploads
              <span className="animate-pulse" style={{ color: '#4ADE80' }}>_</span>
            </div>

            <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              No uploads yet
            </h2>
            <p className="max-w-sm mb-8" style={{ color: '#9AA4B2', lineHeight: 1.7 }}>
              Start by uploading your first document. Your notes, guides, and resources will appear here.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/dashboard/upload">
                <button
                  className="px-6 py-3 rounded-xl text-sm flex items-center gap-2 transition-all hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                    color: '#111418',
                    fontWeight: 700,
                  }}
                >
                  <Upload className="w-4 h-4" />
                  Upload Now
                </button>
              </Link>
              <Link to="/dashboard/library">
                <button
                  className="px-6 py-3 rounded-xl text-sm flex items-center gap-2 border transition-all hover:opacity-80"
                  style={{ borderColor: '#2A2F35', color: '#9AA4B2', backgroundColor: 'transparent' }}
                >
                  <FileText className="w-4 h-4" />
                  Browse Library
                </button>
              </Link>
            </div>

            {/* Tips */}
            <div className="mt-10 grid sm:grid-cols-3 gap-4 w-full max-w-xl">
              {[
                { icon: FileText, label: 'Upload PDFs', desc: 'Notes, guides, cheatsheets', color: '#4ADE80' },
                { icon: Code2, label: 'Organize by tags', desc: 'React, DSA, TypeScript…', color: '#60A5FA' },
                { icon: Zap, label: 'Access anywhere', desc: 'Your knowledge base, always ready', color: '#A78BFA' },
              ].map((tip) => (
                <div
                  key={tip.label}
                  className="rounded-xl p-4 border text-left"
                  style={{ backgroundColor: '#111418', borderColor: '#2A2F35' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: tip.color + '18' }}
                  >
                    <tip.icon className="w-3.5 h-3.5" style={{ color: tip.color }} />
                  </div>
                  <p className="text-xs" style={{ color: '#FFFFFF', fontWeight: 600 }}>{tip.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9AA4B2' }}>{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome banner */}
      <div
        className="relative rounded-2xl px-8 py-7 overflow-hidden border"
        style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-1/3 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at right, rgba(74,222,128,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4ADE80' }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: '#4ADE80' }}>Online</span>
            </div>
            <h2 className="mb-1" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.4rem' }}>
              Good morning, Mufiza 👋
            </h2>
            <p className="text-sm" style={{ color: '#9AA4B2' }}>
              You have <span style={{ color: '#4ADE80', fontWeight: 600 }}>3 new items</span> to review and{' '}
              <span style={{ color: '#4ADE80', fontWeight: 600 }}>26 slots</span> remaining on your Free plan.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsEmpty(true)}
              className="px-4 py-2 rounded-xl text-xs border transition-all hover:opacity-80"
              style={{ borderColor: '#2A2F35', color: '#9AA4B2', backgroundColor: 'transparent' }}
            >
              Preview Empty State
            </button>
            <Link to="/dashboard/subscription">
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                  color: '#111418',
                  fontWeight: 700,
                }}
              >
                <Zap className="w-4 h-4" />
                Upgrade to Pro
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="group rounded-2xl p-5 border transition-all hover:scale-[1.02]"
            style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = stat.accent + '55')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2F35')}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: stat.accent + '18' }}
              >
                <stat.icon className="w-4 h-4" style={{ color: stat.accent }} strokeWidth={2} />
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: stat.accent }} />
            </div>
            <p className="text-2xl mb-0.5" style={{ color: '#FFFFFF', fontWeight: 700 }}>{stat.value}</p>
            <p className="text-xs" style={{ color: '#9AA4B2' }}>{stat.title}</p>
            <p className="text-xs mt-1" style={{ color: stat.accent }}>{stat.change}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm mb-4 uppercase tracking-widest" style={{ color: '#9AA4B2' }}>Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="group flex items-center gap-4 p-5 rounded-2xl border transition-all hover:scale-[1.01]"
              style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = action.accent + '55')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2F35')}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: action.accent + '18' }}
              >
                <action.icon className="w-5 h-5" style={{ color: action.accent }} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: '#FFFFFF', fontWeight: 600 }}>{action.title}</p>
                <p className="text-xs" style={{ color: '#9AA4B2' }}>{action.description}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: action.accent }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Uploads */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
      >
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #2C3238' }}>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4" style={{ color: '#4ADE80' }} />
            <h3 className="text-sm" style={{ color: '#FFFFFF', fontWeight: 600 }}>Recent Uploads</h3>
          </div>
          <Link
            to="/dashboard/uploads"
            className="text-xs transition-colors"
            style={{ color: '#4ADE80' }}
          >
            View all →
          </Link>
        </div>

        <div>
          {recentUploads.map((upload, idx) => (
            <div
              key={upload.id}
              className="px-6 py-4 flex items-center gap-4 cursor-pointer transition-all hover:opacity-80"
              style={{
                borderBottom: idx < recentUploads.length - 1 ? '1px solid #2C3238' : 'none',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#111418', border: '1px solid #2A2F35' }}
              >
                <File className="w-4 h-4" style={{ color: '#9AA4B2' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate" style={{ color: '#FFFFFF', fontWeight: 500 }}>{upload.title}</p>
                <p className="text-xs" style={{ color: '#9AA4B2' }}>
                  {upload.type} · {upload.size}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="hidden sm:block px-2.5 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: (tagColors[upload.tag] || '#4ADE80') + '18',
                    color: tagColors[upload.tag] || '#4ADE80',
                  }}
                >
                  {upload.tag}
                </span>
                <p className="text-xs whitespace-nowrap" style={{ color: '#9AA4B2' }}>{upload.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}