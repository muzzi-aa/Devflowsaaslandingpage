import { useState, useRef } from 'react';
import { CloudUpload, FileText, X, Tag, ChevronDown, Upload, Check, Folder } from 'lucide-react';

// ─── Theme tokens ───────────────────────────────────────────────────────────
const E = {
  accent:  '#34D399',
  accentB: '#10B981',
  glow:    'rgba(52,211,153,0.18)',
  glowSm:  'rgba(52,211,153,0.08)',
};

const bg    = '#0F172A';
const card  = '#131C2E';
const input = '#0D1526';
const bdr   = 'rgba(255,255,255,0.07)';
const bdrFocus = 'rgba(52,211,153,0.45)';
const textPrimary   = '#F1F5F9';
const textSecondary = '#CBD5E1';
const textMuted     = '#475569';

const categories = ['React', 'TypeScript', 'Node.js', 'DSA', 'CSS / Styling', 'DevOps', 'API Design', 'System Design', 'Other'];
const fileTypes  = ['PDF', 'DOCX', 'Markdown (.md)', 'TXT', 'HTML'];

// ─── Field wrapper ──────────────────────────────────────────────────────────
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', color: textSecondary, fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: '0.01em' }}>
        {label}
        {required && <span style={{ color: E.accent, marginLeft: 4 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Input style helper ─────────────────────────────────────────────────────
const baseInputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  background: input, border: `1px solid ${bdr}`,
  color: textPrimary, fontSize: 14, outline: 'none',
  transition: 'border-color 200ms, box-shadow 200ms',
  boxSizing: 'border-box',
};

function useFieldFocus() {
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = bdrFocus;
    e.currentTarget.style.boxShadow   = `0 0 0 3px ${E.glowSm}`;
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = bdr;
    e.currentTarget.style.boxShadow   = 'none';
  };
  return { onFocus, onBlur };
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function UploadContent() {
  const focus = useFieldFocus();

  const [title,       setTitle]       = useState('');
  const [desc,        setDesc]        = useState('');
  const [category,    setCategory]    = useState('');
  const [fileType,    setFileType]    = useState('');
  const [tags,        setTags]        = useState<string[]>([]);
  const [tagInput,    setTagInput]    = useState('');
  const [dragActive,  setDragActive]  = useState(false);
  const [file,        setFile]        = useState<File | null>(null);
  const [uploading,   setUploading]   = useState(false);
  const [uploaded,    setUploaded]    = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => { setUploading(false); setUploaded(true); }, 1600);
  };

  // ── Success Screen ─────────────────────────────────────────────────────
  if (uploaded) {
    return (
      <div style={{ maxWidth: 560, margin: '40px auto', textAlign: 'center' }}>
        <div style={{
          background: card, border: `1px solid rgba(52,211,153,0.15)`,
          borderRadius: 20, padding: '56px 48px',
          boxShadow: `0 0 80px rgba(52,211,153,0.06)`,
        }}>
          {/* Ring + check */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: `radial-gradient(circle, rgba(52,211,153,0.18) 0%, transparent 70%)`,
              border: `1px solid rgba(52,211,153,0.25)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 48px rgba(52,211,153,0.15)`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `linear-gradient(135deg, ${E.accentB}, ${E.accent})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={22} color="#0F172A" strokeWidth={3} />
              </div>
            </div>
          </div>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 99, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', color: E.accent, fontSize: 12, fontWeight: 700, marginBottom: 18 }}>
            <FileText size={12} /> Document Ready
          </span>

          <h2 style={{ color: textPrimary, fontSize: 26, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.02em' }}>Upload Successful!</h2>
          <p style={{ color: textMuted, fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
            Your document has been added to the library and is ready to access.
          </p>

          {file && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
              background: input, border: `1px solid ${bdr}`, borderRadius: 12, marginBottom: 32, textAlign: 'left',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={18} color={E.accent} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ color: textPrimary, fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</p>
                <p style={{ color: textMuted, fontSize: 12, marginTop: 2 }}>{(file.size / 1024 / 1024).toFixed(2)} MB · Uploaded just now</p>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <a href="/dashboard/library" style={{ flex: 1, textDecoration: 'none' }}>
              <button style={{
                width: '100%', padding: '12px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${E.accentB}, ${E.accent})`,
                color: '#0F172A', fontSize: 14, fontWeight: 700,
                boxShadow: `0 0 24px ${E.glow}`,
              }}>Go to Library</button>
            </a>
            <button
              onClick={() => { setUploaded(false); setFile(null); setTitle(''); setDesc(''); setTags([]); setCategory(''); setFileType(''); }}
              style={{
                flex: 1, padding: '12px 0', borderRadius: 10, cursor: 'pointer',
                background: 'transparent', border: `1px solid ${bdr}`, color: textSecondary, fontSize: 14,
              }}
            >Upload Another</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Form ──────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>

      {/* Page heading */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.08))`,
            border: '1px solid rgba(52,211,153,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 20px rgba(52,211,153,0.1)`,
          }}>
            <CloudUpload size={22} color={E.accent} />
          </div>
          <div>
            <h1 style={{ color: textPrimary, fontSize: 22, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1 }}>
              Upload Content
            </h1>
            <p style={{ color: textMuted, fontSize: 13, marginTop: 4 }}>
              Add new documents to your development library
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Card */}
        <div style={{
          background: card,
          border: `1px solid ${bdr}`,
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 4px 48px rgba(0,0,0,0.3)',
        }}>

          {/* Top accent stripe */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${E.accentB}, ${E.accent}, transparent)` }} />

          <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Document Title */}
            <Field label="Document Title" required>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. React Hooks Cheatsheet 2026"
                required
                style={{ ...baseInputStyle }}
                onFocus={focus.onFocus as React.FocusEventHandler<HTMLInputElement>}
                onBlur={focus.onBlur as React.FocusEventHandler<HTMLInputElement>}
              />
            </Field>

            {/* Description */}
            <Field label="Description">
              <textarea
                value={desc}
                onChange={e => setDesc(e.target.value)}
                rows={4}
                placeholder="Brief description of the document — what it covers, who it's for..."
                style={{ ...baseInputStyle, resize: 'vertical', lineHeight: 1.65 }}
                onFocus={focus.onFocus as React.FocusEventHandler<HTMLTextAreaElement>}
                onBlur={focus.onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
              />
            </Field>

            {/* Category + File Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Field label="Category" required>
                <div style={{ position: 'relative' }}>
                  <Folder size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: textMuted, pointerEvents: 'none' }} />
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required
                    style={{
                      ...baseInputStyle, paddingLeft: 38,
                      appearance: 'none', cursor: 'pointer',
                      color: category ? textPrimary : textMuted,
                    }}
                    onFocus={focus.onFocus as React.FocusEventHandler<HTMLSelectElement>}
                    onBlur={focus.onBlur as React.FocusEventHandler<HTMLSelectElement>}
                  >
                    <option value="" disabled style={{ background: '#131C2E', color: textMuted }}>Select category</option>
                    {categories.map(c => <option key={c} value={c} style={{ background: '#131C2E', color: textPrimary }}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: textMuted, pointerEvents: 'none' }} />
                </div>
              </Field>

              <Field label="File Type" required>
                <div style={{ position: 'relative' }}>
                  <FileText size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: textMuted, pointerEvents: 'none' }} />
                  <select
                    value={fileType}
                    onChange={e => setFileType(e.target.value)}
                    required
                    style={{
                      ...baseInputStyle, paddingLeft: 38,
                      appearance: 'none', cursor: 'pointer',
                      color: fileType ? textPrimary : textMuted,
                    }}
                    onFocus={focus.onFocus as React.FocusEventHandler<HTMLSelectElement>}
                    onBlur={focus.onBlur as React.FocusEventHandler<HTMLSelectElement>}
                  >
                    <option value="" disabled style={{ background: '#131C2E', color: textMuted }}>Select file type</option>
                    {fileTypes.map(t => <option key={t} value={t} style={{ background: '#131C2E', color: textPrimary }}>{t}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: textMuted, pointerEvents: 'none' }} />
                </div>
              </Field>
            </div>

            {/* Tags */}
            <Field label="Tags">
              <div
                style={{
                  display: 'flex', flexWrap: 'wrap', gap: 8, padding: '10px 14px',
                  borderRadius: 10, background: input, border: `1px solid ${bdr}`,
                  minHeight: 48, alignItems: 'center', cursor: 'text',
                  transition: 'border-color 200ms',
                }}
                onClick={() => document.getElementById('tag-input')?.focus()}
              >
                {tags.map(tag => (
                  <span key={tag} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '3px 10px', borderRadius: 99,
                    background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)',
                    color: E.accent, fontSize: 12, fontWeight: 600,
                  }}>
                    <Tag size={10} />
                    {tag}
                    <button type="button" onClick={(e) => { e.stopPropagation(); setTags(prev => prev.filter(t => t !== tag)); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: E.accent, display: 'flex', padding: 0, lineHeight: 1 }}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
                <input
                  id="tag-input"
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder={tags.length === 0 ? 'Add tags (press Enter) — e.g. hooks, performance...' : ''}
                  style={{ flex: 1, minWidth: 160, outline: 'none', background: 'transparent', border: 'none', color: textPrimary, fontSize: 14 }}
                />
              </div>
            </Field>

            {/* ── Dropzone ── */}
            <Field label="Upload File" required>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{
                  position: 'relative',
                  border: `2px dashed ${dragActive ? E.accent : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 16,
                  padding: '48px 32px',
                  textAlign: 'center',
                  background: dragActive ? 'rgba(52,211,153,0.04)' : 'rgba(13,21,38,0.6)',
                  transition: 'border-color 200ms, background 200ms',
                  cursor: 'pointer',
                }}
                onClick={() => !file && fileRef.current?.click()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md"
                  onChange={e => e.target.files?.[0] && setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />

                {!file ? (
                  <>
                    {/* Cloud icon */}
                    <div style={{
                      width: 76, height: 76, borderRadius: 20, margin: '0 auto 20px',
                      background: `radial-gradient(circle, rgba(52,211,153,0.15) 0%, rgba(52,211,153,0.04) 70%)`,
                      border: `1px solid rgba(52,211,153,0.25)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 40px rgba(52,211,153,0.1)`,
                    }}>
                      <CloudUpload size={34} color={E.accent} strokeWidth={1.5} />
                    </div>

                    <p style={{ color: textPrimary, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                      Drag &amp; drop your file here<br />
                      <span style={{ color: textMuted, fontSize: 14, fontWeight: 400 }}>or click to browse from your computer</span>
                    </p>

                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
                      style={{
                        marginTop: 20, padding: '10px 26px', borderRadius: 10,
                        background: 'rgba(52,211,153,0.08)', border: `1px solid rgba(52,211,153,0.25)`,
                        color: E.accent, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        transition: 'background 200ms',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(52,211,153,0.14)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(52,211,153,0.08)')}
                    >
                      Browse Files
                    </button>

                    <p style={{ color: textMuted, fontSize: 12, marginTop: 16, lineHeight: 1.6 }}>
                      Supported: <span style={{ color: textSecondary }}>PDF, DOCX, Markdown, TXT</span> &nbsp;·&nbsp; Max <span style={{ color: textSecondary }}>50 MB</span>
                    </p>
                  </>
                ) : (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: input, border: `1px solid rgba(52,211,153,0.2)`,
                    borderRadius: 12, padding: '14px 18px', textAlign: 'left',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <FileText size={20} color={E.accent} />
                      </div>
                      <div>
                        <p style={{ color: textPrimary, fontWeight: 600, fontSize: 14 }}>{file.name}</p>
                        <p style={{ color: textMuted, fontSize: 12, marginTop: 3 }}>{(file.size / 1024 / 1024).toFixed(2)} MB · Ready to upload</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); setFile(null); }}
                      style={{
                        width: 34, height: 34, borderRadius: 8, background: 'rgba(248,113,113,0.07)',
                        border: '1px solid rgba(248,113,113,0.18)', color: '#F87171',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      }}
                    >
                      <X size={15} />
                    </button>
                  </div>
                )}
              </div>
            </Field>
          </div>

          {/* Footer */}
          <div style={{
            padding: '20px 36px',
            borderTop: `1px solid rgba(255,255,255,0.05)`,
            background: 'rgba(9,15,27,0.5)',
            display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <button
              type="submit"
              disabled={uploading}
              style={{
                flex: 1, padding: '13px 0', borderRadius: 11, border: 'none', cursor: 'pointer',
                background: uploading ? 'rgba(52,211,153,0.2)' : `linear-gradient(135deg, ${E.accentB}, ${E.accent})`,
                color: uploading ? E.accent : '#0F172A',
                fontSize: 14, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                boxShadow: uploading ? 'none' : `0 0 28px ${E.glow}`,
                transition: 'all 300ms',
              }}
            >
              {uploading ? (
                <>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${E.accent}`, borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Upload Document
                </>
              )}
            </button>

            <button
              type="button"
              style={{
                padding: '13px 28px', borderRadius: 11, cursor: 'pointer',
                background: 'transparent', border: `1px solid ${bdr}`,
                color: textMuted, fontSize: 14,
                transition: 'border-color 200ms, color 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = textSecondary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = bdr; e.currentTarget.style.color = textMuted; }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #334155; }
      `}</style>
    </div>
  );
}
