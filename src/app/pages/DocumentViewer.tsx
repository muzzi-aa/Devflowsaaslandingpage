import {
  ArrowLeft,
  Crown,
  Lock,
  FileText,
  User,
  Calendar,
  HardDrive,
  BookOpen,
  Clock,
  Download,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useState } from 'react';
import { libraryDocs } from './Library';

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

// Simulated PDF page content blocks
const pdfContentBlocks = [
  { type: 'heading', width: '55%' },
  { type: 'subheading', width: '40%' },
  { type: 'text', width: '95%' },
  { type: 'text', width: '88%' },
  { type: 'text', width: '92%' },
  { type: 'text', width: '70%' },
  { type: 'code', lines: 5 },
  { type: 'text', width: '94%' },
  { type: 'text', width: '80%' },
  { type: 'subheading', width: '35%' },
  { type: 'text', width: '91%' },
  { type: 'text', width: '86%' },
  { type: 'text', width: '74%' },
  { type: 'list', items: 4 },
  { type: 'text', width: '89%' },
  { type: 'text', width: '96%' },
  { type: 'text', width: '60%' },
];

function PdfViewer({ title, currentPage, totalPages }: { title: string; currentPage: number; totalPages: number }) {
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: '#2A2F35', backgroundColor: '#0D1117' }}
    >
      {/* PDF toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
      >
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" style={{ color: '#4ADE80' }} />
          <span className="text-xs truncate max-w-48" style={{ color: '#9AA4B2' }}>{title}.pdf</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded-lg transition-all hover:opacity-80" style={{ color: '#9AA4B2' }}>
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs" style={{ color: '#9AA4B2' }}>100%</span>
          <button className="p-1.5 rounded-lg transition-all hover:opacity-80" style={{ color: '#9AA4B2' }}>
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Page */}
      <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(100vh - 280px)', minHeight: '500px' }}>
        <div
          className="mx-auto rounded-lg p-10 shadow-2xl"
          style={{ backgroundColor: '#FAFAFA', maxWidth: '600px', minHeight: '750px' }}
        >
          {/* PDF header */}
          <div className="mb-8 pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
            <div
              className="inline-block px-2.5 py-1 rounded text-xs mb-3"
              style={{ backgroundColor: '#111418', color: '#4ADE80', fontFamily: 'JetBrains Mono, monospace' }}
            >
              devflow.dev/docs
            </div>
            <div className="h-4 rounded mb-2" style={{ backgroundColor: '#1A1F24', width: '65%' }} />
            <div className="h-2.5 rounded" style={{ backgroundColor: '#D1D5DB', width: '40%' }} />
          </div>

          {/* Content blocks */}
          <div className="space-y-3">
            {pdfContentBlocks.map((block, i) => {
              if (block.type === 'heading') {
                return (
                  <div key={i} className="h-5 rounded mb-2" style={{ backgroundColor: '#1A1F24', width: block.width }} />
                );
              }
              if (block.type === 'subheading') {
                return (
                  <div key={i} className="h-3.5 rounded mt-5 mb-1" style={{ backgroundColor: '#374151', width: block.width }} />
                );
              }
              if (block.type === 'text') {
                return (
                  <div key={i} className="h-2 rounded" style={{ backgroundColor: '#D1D5DB', width: block.width }} />
                );
              }
              if (block.type === 'code') {
                return (
                  <div
                    key={i}
                    className="rounded-lg p-3 my-4 space-y-2"
                    style={{ backgroundColor: '#111418' }}
                  >
                    {Array.from({ length: block.lines || 4 }).map((_, li) => (
                      <div
                        key={li}
                        className="h-2 rounded"
                        style={{
                          backgroundColor: '#4ADE8030',
                          width: `${60 + Math.sin(li * 1.3) * 20}%`,
                        }}
                      />
                    ))}
                  </div>
                );
              }
              if (block.type === 'list') {
                return (
                  <div key={i} className="my-3 space-y-1.5 pl-4">
                    {Array.from({ length: block.items || 3 }).map((_, li) => (
                      <div key={li} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#4ADE80' }} />
                        <div
                          className="h-2 rounded"
                          style={{ backgroundColor: '#D1D5DB', width: `${55 + li * 8}%` }}
                        />
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Page number */}
          <div className="mt-8 pt-4 border-t text-center" style={{ borderColor: '#E5E7EB' }}>
            <span style={{ color: '#9CA3AF', fontSize: '0.7rem' }}>Page {currentPage} of {totalPages}</span>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-between px-5 py-3 border-t"
        style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
      >
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all hover:opacity-80"
          style={{ borderColor: '#2A2F35', color: '#9AA4B2' }}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Prev
        </button>
        <span className="text-xs" style={{ color: '#9AA4B2' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all hover:opacity-80"
          style={{ borderColor: '#2A2F35', color: '#9AA4B2' }}
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function PremiumLockedScreen({ title }: { title: string }) {
  return (
    <div
      className="rounded-xl border flex flex-col items-center justify-center text-center p-12"
      style={{
        borderColor: 'rgba(251,191,36,0.3)',
        backgroundColor: '#1A1F24',
        minHeight: '550px',
        background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.04) 0%, #1A1F24 70%)',
      }}
    >
      {/* Lock icon */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative"
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))',
          border: '1px solid rgba(251,191,36,0.3)',
          boxShadow: '0 0 40px rgba(251,191,36,0.1)',
        }}
      >
        <Lock className="w-9 h-9" style={{ color: '#FBBF24' }} />
        <div
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FBBF24, #F59E0B)' }}
        >
          <Crown className="w-3 h-3" style={{ color: '#111418' }} />
        </div>
      </div>

      <div
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs mb-4"
        style={{
          backgroundColor: 'rgba(251,191,36,0.1)',
          border: '1px solid rgba(251,191,36,0.2)',
          color: '#FBBF24',
        }}
      >
        <Crown className="w-3 h-3" />
        Pro Content
      </div>

      <h3 className="mb-2" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.2rem' }}>
        This content requires a Pro subscription
      </h3>
      <p className="mb-2 max-w-xs" style={{ color: '#9AA4B2', fontSize: '0.875rem' }}>
        <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{title}</span> is part of the DevFlow Pro library.
        Unlock it and 100+ premium resources with a Pro plan.
      </p>

      <div className="my-6 space-y-2 text-left">
        {[
          'Access all premium documents',
          'Full library with 100+ resources',
          'New content every week',
          'Download for offline reading',
        ].map((benefit) => (
          <div key={benefit} className="flex items-center gap-2.5">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(251,191,36,0.15)' }}
            >
              <span style={{ color: '#FBBF24', fontSize: '0.55rem', fontWeight: 700 }}>✓</span>
            </div>
            <span className="text-sm" style={{ color: '#9AA4B2' }}>{benefit}</span>
          </div>
        ))}
      </div>

      <Link to="/dashboard/subscription">
        <button
          className="px-8 py-3 rounded-xl text-sm flex items-center gap-2 transition-all hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
            color: '#111418',
            fontWeight: 700,
            boxShadow: '0 0 30px rgba(251,191,36,0.2)',
          }}
        >
          <Crown className="w-4 h-4" />
          Upgrade Now — ₹299/mo
        </button>
      </Link>

      <p className="mt-3 text-xs" style={{ color: '#9AA4B2' }}>
        Cancel anytime · No hidden fees
      </p>
    </div>
  );
}

export default function DocumentViewer() {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarked, setBookmarked] = useState(false);

  const doc = libraryDocs.find((d) => d.id === Number(id));

  if (!doc) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FileText className="w-12 h-12 mb-4" style={{ color: '#2A2F35' }} />
        <p style={{ color: '#9AA4B2' }}>Document not found</p>
        <Link to="/dashboard/library" className="mt-4 text-sm" style={{ color: '#4ADE80' }}>
          ← Back to Library
        </Link>
      </div>
    );
  }

  // Simulate: user is on Free plan, so premium docs are locked
  const isLocked = doc.premium;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back nav */}
      <Link
        to="/dashboard/library"
        className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors group"
        style={{ color: '#9AA4B2' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#4ADE80')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#9AA4B2')}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Library
      </Link>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Left — PDF Viewer */}
        <div>
          {isLocked ? (
            <PremiumLockedScreen title={doc.title} />
          ) : (
            <PdfViewer title={doc.title} currentPage={currentPage} totalPages={doc.pages} />
          )}
        </div>

        {/* Right — Details Panel */}
        <div className="space-y-5">
          {/* Title & Actions */}
          <div
            className="rounded-2xl border p-5"
            style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
          >
            {/* Status badge */}
            <div className="flex items-center justify-between mb-3">
              {doc.premium ? (
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: 'rgba(251,191,36,0.1)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    color: '#FBBF24',
                    fontWeight: 600,
                  }}
                >
                  <Crown className="w-2.5 h-2.5" />
                  Pro
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: 'rgba(74,222,128,0.1)',
                    border: '1px solid rgba(74,222,128,0.2)',
                    color: '#4ADE80',
                    fontWeight: 600,
                  }}
                >
                  Free
                </span>
              )}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all"
                  style={{
                    borderColor: bookmarked ? 'rgba(74,222,128,0.4)' : '#2A2F35',
                    color: bookmarked ? '#4ADE80' : '#9AA4B2',
                    backgroundColor: bookmarked ? 'rgba(74,222,128,0.08)' : 'transparent',
                  }}
                >
                  <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? '#4ADE80' : 'none'} />
                </button>
                <button
                  className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:opacity-80"
                  style={{ borderColor: '#2A2F35', color: '#9AA4B2' }}
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
              {doc.title}
            </h2>
            <p className="text-sm" style={{ color: '#9AA4B2', lineHeight: 1.6 }}>
              {doc.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {doc.tags.map((tag) => (
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

          {/* Document Metadata */}
          <div
            className="rounded-2xl border divide-y overflow-hidden"
            style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35', divideColor: '#2C3238' }}
          >
            <div className="px-5 py-3.5 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(74,222,128,0.1)' }}
              >
                <User className="w-3.5 h-3.5" style={{ color: '#4ADE80' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: '#9AA4B2' }}>Author</p>
                <p className="text-sm" style={{ color: '#FFFFFF', fontWeight: 500 }}>{doc.author}</p>
              </div>
            </div>
            <div className="px-5 py-3.5 flex items-center gap-3" style={{ borderColor: '#2C3238' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(96,165,250,0.1)' }}
              >
                <Calendar className="w-3.5 h-3.5" style={{ color: '#60A5FA' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: '#9AA4B2' }}>Upload Date</p>
                <p className="text-sm" style={{ color: '#FFFFFF', fontWeight: 500 }}>{doc.date}</p>
              </div>
            </div>
            <div className="px-5 py-3.5 flex items-center gap-3" style={{ borderColor: '#2C3238' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(167,139,250,0.1)' }}
              >
                <BookOpen className="w-3.5 h-3.5" style={{ color: '#A78BFA' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: '#9AA4B2' }}>Pages</p>
                <p className="text-sm" style={{ color: '#FFFFFF', fontWeight: 500 }}>{doc.pages} pages</p>
              </div>
            </div>
            <div className="px-5 py-3.5 flex items-center gap-3" style={{ borderColor: '#2C3238' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(251,191,36,0.1)' }}
              >
                <Clock className="w-3.5 h-3.5" style={{ color: '#FBBF24' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: '#9AA4B2' }}>Read Time</p>
                <p className="text-sm" style={{ color: '#FFFFFF', fontWeight: 500 }}>{doc.readTime}</p>
              </div>
            </div>
            <div className="px-5 py-3.5 flex items-center gap-3" style={{ borderColor: '#2C3238' }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}
              >
                <HardDrive className="w-3.5 h-3.5" style={{ color: '#F97316' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: '#9AA4B2' }}>File Size</p>
                <p className="text-sm" style={{ color: '#FFFFFF', fontWeight: 500 }}>{doc.size}</p>
              </div>
            </div>
          </div>

          {/* Download / Actions */}
          {!isLocked && (
            <button
              className="w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 border transition-all hover:opacity-80"
              style={{
                borderColor: '#2A2F35',
                color: '#9AA4B2',
                backgroundColor: '#111418',
              }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          )}

          {/* Reading progress (for free docs) */}
          {!isLocked && (
            <div
              className="rounded-2xl border p-4"
              style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: '#9AA4B2' }}>Reading Progress</span>
                <span className="text-xs" style={{ color: '#4ADE80' }}>
                  {Math.round((currentPage / doc.pages) * 100)}%
                </span>
              </div>
              <div className="w-full rounded-full h-1.5" style={{ backgroundColor: '#2A2F35' }}>
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${(currentPage / doc.pages) * 100}%`,
                    background: 'linear-gradient(90deg, #4ADE80, #22C55E)',
                  }}
                />
              </div>
              <p className="text-xs mt-2" style={{ color: '#9AA4B2' }}>
                Page {currentPage} of {doc.pages}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
