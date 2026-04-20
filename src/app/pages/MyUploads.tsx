import { useState } from 'react';
import { Search, Upload, Filter, Grid, List, File, MoreHorizontal, Download, Trash2, Eye, Tag, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

const E = { bright: '#10B981', light: '#34D399', mid: '#166534', dark: '#14532D' };

const tagColorMap: Record<string, string> = {
  React:        '#60A5FA',
  Frontend:     '#F472B6',
  Algorithms:   E.bright,
  DSA:          E.light,
  TypeScript:   '#818CF8',
  'Best Practices': '#FBBF24',
  'Node.js':    '#FB923C',
  Backend:      '#FB923C',
  CSS:          '#F472B6',
  Docker:       '#38BDF8',
  DevOps:       '#38BDF8',
  API:          '#A78BFA',
  Git:          '#F97316',
  'Version Control': '#F97316',
};

const allUploads = [
  { id: 1, title: 'React Hooks Cheatsheet',   type: 'PDF', date: 'Mar 8, 2026', size: '2.4 MB', tags: ['React', 'Frontend'],          views: 142, emoji: '⚛️' },
  { id: 2, title: 'Algorithm Solutions',       type: 'PDF', date: 'Mar 7, 2026', size: '1.8 MB', tags: ['Algorithms', 'DSA'],          views: 89,  emoji: '🧮' },
  { id: 3, title: 'TypeScript Best Practices', type: 'PDF', date: 'Mar 6, 2026', size: '3.1 MB', tags: ['TypeScript', 'Best Practices'], views: 231, emoji: '📘' },
  { id: 4, title: 'Node.js Performance Tips',  type: 'PDF', date: 'Mar 5, 2026', size: '2.2 MB', tags: ['Node.js', 'Backend'],          views: 67,  emoji: '⚡' },
  { id: 5, title: 'CSS Grid Examples',         type: 'PDF', date: 'Mar 4, 2026', size: '1.5 MB', tags: ['CSS', 'Frontend'],             views: 110, emoji: '🎨' },
  { id: 6, title: 'Docker Compose Guide',      type: 'PDF', date: 'Mar 3, 2026', size: '2.8 MB', tags: ['Docker', 'DevOps'],           views: 55,  emoji: '🐳' },
  { id: 7, title: 'REST API Design Patterns',  type: 'PDF', date: 'Mar 2, 2026', size: '2.0 MB', tags: ['API', 'Backend'],             views: 198, emoji: '🔗' },
  { id: 8, title: 'Git Workflow Strategies',   type: 'PDF', date: 'Mar 1, 2026', size: '1.2 MB', tags: ['Git', 'Version Control'],     views: 77,  emoji: '🌿' },
];

const allTags = Array.from(new Set(allUploads.flatMap(u => u.tags)));

export default function MyUploads() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchFocus, setSearchFocus] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState('Newest');

  const filtered = allUploads.filter(u => {
    const matchSearch = u.title.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag ? u.tags.includes(selectedTag) : true;
    return matchSearch && matchTag;
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ color: '#F0FDF4', fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6 }}>My Uploads</h1>
          <p style={{ color: '#475569', fontSize: 13 }}>{allUploads.length} documents · {allUploads.reduce((a, u) => a + parseFloat(u.size), 0).toFixed(1)} MB total</p>
        </div>
        <Link to="/dashboard/upload" style={{ textDecoration: 'none' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10,
            background: `linear-gradient(135deg, ${E.mid}, ${E.bright})`,
            color: '#F0FDF4', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: `0 0 20px rgba(16,185,129,0.22)`,
            transition: 'opacity 200ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.87')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Upload size={15} /> New Upload
          </button>
        </Link>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#334155', pointerEvents: 'none' }} />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)}
            placeholder="Search documents..."
            style={{
              width: '100%', padding: '10px 12px 10px 36px', borderRadius: 10,
              background: searchFocus ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.02)',
              border: searchFocus ? '1px solid rgba(16,185,129,0.35)' : '1px solid rgba(255,255,255,0.07)',
              color: '#F0FDF4', fontSize: 13, outline: 'none', boxSizing: 'border-box',
              transition: 'all 200ms', boxShadow: searchFocus ? '0 0 0 3px rgba(16,185,129,0.07)' : 'none',
            }}
          />
        </div>

        {/* Tag filter chips */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={() => setSelectedTag(null)} style={{
            padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
            background: !selectedTag ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
            border: !selectedTag ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.07)',
            color: !selectedTag ? E.light : '#475569', cursor: 'pointer', transition: 'all 150ms',
          }}>All</button>
          {allTags.slice(0, 5).map(tag => (
            <button key={tag} onClick={() => setSelectedTag(selectedTag === tag ? null : tag)} style={{
              padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
              background: selectedTag === tag ? (tagColorMap[tag] || E.bright) + '1A' : 'rgba(255,255,255,0.03)',
              border: selectedTag === tag ? `1px solid ${(tagColorMap[tag] || E.bright)}40` : '1px solid rgba(255,255,255,0.07)',
              color: selectedTag === tag ? (tagColorMap[tag] || E.bright) : '#475569',
              cursor: 'pointer', transition: 'all 150ms',
            }}>{tag}</button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          {/* Sort */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setSortOpen(v => !v)} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 9,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              color: '#64748B', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>
              <Filter size={12} /> {sort} <ChevronDown size={11} style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
            </button>
            {sortOpen && (
              <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 6px)', background: '#1E293B', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 10, overflow: 'hidden', zIndex: 10, minWidth: 130 }}>
                {['Newest', 'Oldest', 'Name', 'Size', 'Most Viewed'].map(s => (
                  <button key={s} onClick={() => { setSort(s); setSortOpen(false); }} style={{
                    display: 'block', width: '100%', padding: '9px 14px', textAlign: 'left',
                    background: sort === s ? 'rgba(16,185,129,0.1)' : 'transparent',
                    color: sort === s ? E.light : '#94A3B8', fontSize: 13, border: 'none', cursor: 'pointer',
                    transition: 'background 150ms',
                  }}>{s}</button>
                ))}
              </div>
            )}
          </div>

          {/* View toggle */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, overflow: 'hidden' }}>
            {[{ id: 'grid', Icon: Grid }, { id: 'list', Icon: List }].map(({ id, Icon }) => (
              <button key={id} onClick={() => setView(id as 'grid' | 'list')} style={{
                padding: '8px 11px', background: view === id ? 'rgba(16,185,129,0.12)' : 'transparent',
                border: 'none', cursor: 'pointer', color: view === id ? E.light : '#475569', transition: 'all 150ms',
              }}>
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p style={{ color: '#334155', fontSize: 12, marginBottom: 16 }}>
        Showing {filtered.length} of {allUploads.length} documents{selectedTag ? ` tagged "${selectedTag}"` : ''}
      </p>

      {/* Grid view */}
      {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {filtered.map(u => (
            <div
              key={u.id}
              onMouseEnter={() => setHoveredId(u.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderRadius: 14, overflow: 'hidden',
                background: hoveredId === u.id
                  ? 'linear-gradient(145deg, rgba(20,83,45,0.22), rgba(15,23,42,0.95))'
                  : 'rgba(15,23,42,0.7)',
                border: hoveredId === u.id ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(16,185,129,0.08)',
                transition: 'all 220ms ease',
                transform: hoveredId === u.id ? 'translateY(-2px)' : 'none',
                boxShadow: hoveredId === u.id ? '0 16px 40px rgba(0,0,0,0.3)' : 'none',
                cursor: 'pointer',
              }}
            >
              {/* Thumbnail */}
              <div style={{
                height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `linear-gradient(145deg, rgba(20,83,45,0.3), rgba(15,23,42,0.8))`,
                borderBottom: '1px solid rgba(16,185,129,0.08)',
                position: 'relative',
              }}>
                <span style={{ fontSize: 48 }}>{u.emoji}</span>
                {/* Action overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(5,46,22,0.85)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  opacity: hoveredId === u.id ? 1 : 0,
                  transition: 'opacity 200ms',
                }}>
                  {[{ Icon: Eye, title: 'View' }, { Icon: Download, title: 'Download' }, { Icon: Trash2, title: 'Delete' }].map(({ Icon, title }) => (
                    <button key={title} title={title} style={{
                      width: 36, height: 36, borderRadius: 9,
                      background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)',
                      color: E.light, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 150ms',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.22)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.12)')}
                    >
                      <Icon size={15} />
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ padding: '14px 16px' }}>
                <p style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 13, marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                  {u.tags.map(t => (
                    <span key={t} style={{
                      padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700,
                      background: (tagColorMap[t] || E.bright) + '1A',
                      color: tagColorMap[t] || E.bright,
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#334155', fontSize: 11 }}>{u.date}</span>
                  <span style={{ color: '#334155', fontSize: 11 }}>{u.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        <div style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(16,185,129,0.08)', borderRadius: 14, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 80px 40px', gap: 0, padding: '10px 20px', borderBottom: '1px solid rgba(16,185,129,0.08)' }}>
            {['Name', 'Size', 'Date', 'Views', ''].map(h => (
              <span key={h} style={{ color: '#334155', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>

          {filtered.map((u, idx) => (
            <div
              key={u.id}
              onMouseEnter={() => setHoveredId(u.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 100px 120px 80px 40px',
                alignItems: 'center', padding: '12px 20px',
                borderBottom: idx < filtered.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                background: hoveredId === u.id ? 'rgba(16,185,129,0.04)' : 'transparent',
                transition: 'background 150ms', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>
                  {u.emoji}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ color: '#F0FDF4', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.title}</p>
                  <div style={{ display: 'flex', gap: 5, marginTop: 3, flexWrap: 'wrap' }}>
                    {u.tags.map(t => (
                      <span key={t} style={{ padding: '1px 6px', borderRadius: 99, fontSize: 9, fontWeight: 700, background: (tagColorMap[t] || E.bright) + '18', color: tagColorMap[t] || E.bright }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <span style={{ color: '#475569', fontSize: 12 }}>{u.size}</span>
              <span style={{ color: '#475569', fontSize: 12 }}>{u.date}</span>
              <span style={{ color: '#475569', fontSize: 12 }}>{u.views}</span>
              <button style={{ background: 'none', border: 'none', color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={e => (e.currentTarget.style.color = E.light)}
                onMouseLeave={e => (e.currentTarget.style.color = '#334155')}
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <span style={{ fontSize: 48 }}>🔍</span>
          <p style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 16, marginTop: 16 }}>No results found</p>
          <p style={{ color: '#475569', fontSize: 13, marginTop: 6 }}>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
