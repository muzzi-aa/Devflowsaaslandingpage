import { Search, Filter, File, Download, Trash2, Grid, List, SortAsc } from 'lucide-react';
import { useState } from 'react';

const allUploads = [
  { id: 1, title: 'React Hooks Cheatsheet', type: 'PDF', date: 'Mar 8, 2026', size: '2.4 MB', tags: ['React', 'Frontend'] },
  { id: 2, title: 'Algorithm Solutions', type: 'PDF', date: 'Mar 7, 2026', size: '1.8 MB', tags: ['Algorithms', 'DSA'] },
  { id: 3, title: 'TypeScript Best Practices', type: 'PDF', date: 'Mar 6, 2026', size: '3.1 MB', tags: ['TypeScript', 'Best Practices'] },
  { id: 4, title: 'Node.js Performance Tips', type: 'PDF', date: 'Mar 5, 2026', size: '2.2 MB', tags: ['Node.js', 'Backend'] },
  { id: 5, title: 'CSS Grid Examples', type: 'PDF', date: 'Mar 4, 2026', size: '1.5 MB', tags: ['CSS', 'Frontend'] },
  { id: 6, title: 'Docker Compose Guide', type: 'PDF', date: 'Mar 3, 2026', size: '2.8 MB', tags: ['Docker', 'DevOps'] },
  { id: 7, title: 'REST API Design Patterns', type: 'PDF', date: 'Mar 2, 2026', size: '2.0 MB', tags: ['API', 'Backend'] },
  { id: 8, title: 'Git Workflow Strategies', type: 'PDF', date: 'Mar 1, 2026', size: '1.2 MB', tags: ['Git', 'Version Control'] },
];

const tagColorMap: Record<string, string> = {
  React: '#60A5FA',
  Frontend: '#F472B6',
  Algorithms: '#4ADE80',
  DSA: '#4ADE80',
  TypeScript: '#A78BFA',
  'Best Practices': '#FBBF24',
  'Node.js': '#34D399',
  Backend: '#F97316',
  CSS: '#F472B6',
  Docker: '#60A5FA',
  DevOps: '#94A3B8',
  API: '#F97316',
  Git: '#FB923C',
  'Version Control': '#FB923C',
};

export default function MyUploads() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [uploads, setUploads] = useState(allUploads);

  const filtered = uploads.filter(
    (u) =>
      u.title.toLowerCase().includes(query.toLowerCase()) ||
      u.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const handleDelete = (id: number) => {
    setUploads(uploads.filter((u) => u.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.6rem' }}>My Uploads</h2>
          <p className="mt-1 text-sm" style={{ color: '#9AA4B2' }}>
            Manage all your documents and resources
          </p>
        </div>
        <div
          className="flex items-center gap-1 rounded-xl p-1 border"
          style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
        >
          <button
            onClick={() => setView('list')}
            className="p-2 rounded-lg transition-all"
            style={{
              backgroundColor: view === 'list' ? '#2A2F35' : 'transparent',
              color: view === 'list' ? '#FFFFFF' : '#9AA4B2',
            }}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('grid')}
            className="p-2 rounded-lg transition-all"
            style={{
              backgroundColor: view === 'grid' ? '#2A2F35' : 'transparent',
              color: view === 'grid' ? '#FFFFFF' : '#9AA4B2',
            }}
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div
        className="flex gap-3 mb-6 p-3 rounded-2xl border"
        style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9AA4B2' }} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search documents or tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
            style={{ backgroundColor: '#111418', borderColor: '#2A2F35', color: '#FFFFFF' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#4ADE80')}
            onBlur={e => (e.currentTarget.style.borderColor = '#2A2F35')}
          />
        </div>
        <button
          className="px-4 py-2.5 rounded-xl border text-sm flex items-center gap-2 transition-all hover:opacity-80"
          style={{ borderColor: '#2A2F35', color: '#9AA4B2', backgroundColor: '#111418' }}
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button
          className="px-4 py-2.5 rounded-xl border text-sm flex items-center gap-2 transition-all hover:opacity-80"
          style={{ borderColor: '#2A2F35', color: '#9AA4B2', backgroundColor: '#111418' }}
        >
          <SortAsc className="w-4 h-4" />
          Sort
        </button>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm" style={{ color: '#9AA4B2' }}>
          <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{filtered.length}</span> documents
        </p>
        <p className="text-xs" style={{ color: '#9AA4B2' }}>Sorted by date uploaded</p>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
        >
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <File className="w-10 h-10 mx-auto mb-3" style={{ color: '#2A2F35' }} />
              <p className="text-sm" style={{ color: '#9AA4B2' }}>No documents found</p>
            </div>
          ) : (
            filtered.map((upload, idx) => (
              <div
                key={upload.id}
                className="px-6 py-4 flex items-center gap-4 group transition-all hover:opacity-80 cursor-pointer"
                style={{ borderBottom: idx < filtered.length - 1 ? '1px solid #2C3238' : 'none' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#111418', border: '1px solid #2A2F35' }}
                >
                  <File className="w-4 h-4" style={{ color: '#9AA4B2' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: '#FFFFFF', fontWeight: 500 }}>
                    {upload.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs" style={{ color: '#9AA4B2' }}>
                      {upload.type} · {upload.size}
                    </span>
                    {upload.tags.map(tag => (
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
                </div>
                <p className="text-xs flex-shrink-0 hidden sm:block" style={{ color: '#9AA4B2' }}>
                  {upload.date}
                </p>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:opacity-80"
                    style={{ borderColor: '#2A2F35', color: '#9AA4B2' }}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(upload.id)}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:opacity-80"
                    style={{ borderColor: '#2A2F35', color: '#9AA4B2' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(248,113,113,0.4)';
                      (e.currentTarget as HTMLButtonElement).style.color = '#F87171';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#2A2F35';
                      (e.currentTarget as HTMLButtonElement).style.color = '#9AA4B2';
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((upload) => (
            <div
              key={upload.id}
              className="group rounded-2xl p-5 border transition-all cursor-pointer hover:scale-[1.02]"
              style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#4ADE8055')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2F35')}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: '#111418', border: '1px solid #2A2F35' }}
              >
                <File className="w-6 h-6" style={{ color: '#4ADE80' }} />
              </div>
              <p className="text-sm mb-1 truncate" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                {upload.title}
              </p>
              <p className="text-xs mb-3" style={{ color: '#9AA4B2' }}>
                {upload.size} · {upload.date}
              </p>
              <div className="flex flex-wrap gap-1">
                {upload.tags.slice(0, 2).map(tag => (
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
              <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="flex-1 py-1.5 rounded-lg text-xs border transition-all"
                  style={{ borderColor: '#2A2F35', color: '#9AA4B2' }}
                >
                  <Download className="w-3 h-3 inline mr-1" />
                  Download
                </button>
                <button
                  onClick={() => handleDelete(upload.id)}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: 'rgba(248,113,113,0.3)', color: '#F87171' }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
