import { Upload, FileText, X, Tag, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const categories = ['React', 'TypeScript', 'Node.js', 'DSA', 'CSS', 'DevOps', 'API Design', 'Other'];
const types = ['PDF', 'DOC', 'DOCX', 'TXT', 'MD'];

export default function UploadContent() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 1500);
  };

  // ── Upload Success Confirmation Screen ──
  if (uploaded) {
    return (
      <div className="max-w-xl mx-auto">
        <div
          className="relative rounded-2xl border overflow-hidden"
          style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
        >
          {/* Top accent bar */}
          <div
            className="h-1 w-full"
            style={{ background: 'linear-gradient(90deg, #4ADE80, #22C55E)' }}
          />

          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at top center, rgba(74,222,128,0.06) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center px-8 py-14">
            {/* Success Icon */}
            <div
              className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05))',
                border: '1px solid rgba(74,222,128,0.3)',
                boxShadow: '0 0 50px rgba(74,222,128,0.15)',
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)' }}
              >
                <span style={{ color: '#111418', fontSize: '1rem', fontWeight: 800 }}>✓</span>
              </div>
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(74,222,128,0.12)',
                  transform: 'scale(1.35)',
                }}
              />
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs mb-4"
              style={{
                backgroundColor: 'rgba(74,222,128,0.08)',
                borderColor: 'rgba(74,222,128,0.2)',
                color: '#4ADE80',
                fontWeight: 600,
              }}
            >
              <FileText className="w-3 h-3" />
              Document Ready
            </div>

            <h2
              style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.75rem' }}
            >
              Upload Successful
            </h2>
            <p style={{ color: '#9AA4B2', lineHeight: 1.7, maxWidth: '340px' }}>
              Your document has been added to the library and is ready to be accessed.
            </p>

            {/* File info pill */}
            {selectedFile && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border mt-6 w-full max-w-xs"
                style={{ backgroundColor: '#111418', borderColor: '#2A2F35' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(74,222,128,0.1)' }}
                >
                  <FileText className="w-4 h-4" style={{ color: '#4ADE80' }} />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm truncate" style={{ color: '#FFFFFF', fontWeight: 500 }}>
                    {selectedFile.name}
                  </p>
                  <p className="text-xs" style={{ color: '#9AA4B2' }}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Uploaded just now
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-xs">
              <a href="/dashboard/library" className="flex-1">
                <button
                  className="w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                    color: '#111418',
                    fontWeight: 700,
                  }}
                >
                  Go to Library
                </button>
              </a>
              <button
                onClick={() => {
                  setUploaded(false);
                  setSelectedFile(null);
                  setTags([]);
                  setSelectedCategory('');
                  setSelectedType('');
                }}
                className="flex-1 py-3 rounded-xl text-sm border transition-all hover:opacity-80"
                style={{ borderColor: '#2A2F35', color: '#9AA4B2', backgroundColor: 'transparent' }}
              >
                Upload Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.6rem' }}>Upload Content</h2>
        <p className="mt-1 text-sm" style={{ color: '#9AA4B2' }}>
          Add new documents to your development library
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
        >
          <div className="px-8 py-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#9AA4B2' }}>
                Document Title <span style={{ color: '#4ADE80' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. React Hooks Cheatsheet"
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                style={{ backgroundColor: '#111418', borderColor: '#2A2F35', color: '#FFFFFF' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#4ADE80')}
                onBlur={e => (e.currentTarget.style.borderColor = '#2A2F35')}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#9AA4B2' }}>Description</label>
              <textarea
                rows={3}
                placeholder="Brief description of the document..."
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none"
                style={{ backgroundColor: '#111418', borderColor: '#2A2F35', color: '#FFFFFF' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#4ADE80')}
                onBlur={e => (e.currentTarget.style.borderColor = '#2A2F35')}
              />
            </div>

            {/* Category + Type row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: '#9AA4B2' }}>Category</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none appearance-none transition-all"
                    style={{ backgroundColor: '#111418', borderColor: '#2A2F35', color: selectedCategory ? '#FFFFFF' : '#9AA4B2' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#4ADE80')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#2A2F35')}
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map(c => <option key={c} value={c} style={{ backgroundColor: '#1A1F24' }}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#9AA4B2' }} />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: '#9AA4B2' }}>File Type</label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none appearance-none transition-all"
                    style={{ backgroundColor: '#111418', borderColor: '#2A2F35', color: selectedType ? '#FFFFFF' : '#9AA4B2' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#4ADE80')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#2A2F35')}
                  >
                    <option value="" disabled>Select type</option>
                    {types.map(t => <option key={t} value={t} style={{ backgroundColor: '#1A1F24' }}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#9AA4B2' }} />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#9AA4B2' }}>
                <Tag className="inline w-3.5 h-3.5 mr-1" />
                Tags
              </label>
              <div
                className="flex flex-wrap gap-2 px-4 py-3 rounded-xl border transition-all min-h-[48px]"
                style={{ backgroundColor: '#111418', borderColor: '#2A2F35' }}
              >
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                    style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder={tags.length === 0 ? 'Add tags (press Enter)' : ''}
                  className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
                  style={{ color: '#FFFFFF' }}
                />
              </div>
            </div>

            {/* Upload Area */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#9AA4B2' }}>
                Upload File <span style={{ color: '#4ADE80' }}>*</span>
              </label>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className="relative border-2 border-dashed rounded-2xl p-10 text-center transition-all"
                style={{
                  borderColor: dragActive ? '#4ADE80' : '#2A2F35',
                  backgroundColor: dragActive ? 'rgba(74,222,128,0.05)' : '#111418',
                }}
              >
                {!selectedFile ? (
                  <>
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}
                    >
                      <Upload className="w-7 h-7" style={{ color: '#4ADE80' }} />
                    </div>
                    <p className="text-sm mb-1" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                      Drag and drop your file here
                    </p>
                    <p className="text-xs mb-4" style={{ color: '#9AA4B2' }}>
                      or click to browse from your computer
                    </p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt,.md"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-xl text-sm border transition-all hover:opacity-80"
                      style={{ borderColor: '#4ADE80', color: '#4ADE80', backgroundColor: 'rgba(74,222,128,0.1)' }}
                    >
                      Select File
                    </button>
                    <p className="text-xs mt-3" style={{ color: '#9AA4B2' }}>
                      PDF, DOC, DOCX, TXT, MD · Max 10MB
                    </p>
                  </>
                ) : (
                  <div
                    className="flex items-center justify-between rounded-xl p-4 border"
                    style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(74,222,128,0.15)' }}
                      >
                        <FileText className="w-5 h-5" style={{ color: '#4ADE80' }} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm" style={{ color: '#FFFFFF', fontWeight: 500 }}>{selectedFile.name}</p>
                        <p className="text-xs" style={{ color: '#9AA4B2' }}>
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all"
                      style={{ borderColor: '#2A2F35', color: '#9AA4B2' }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-8 py-5 flex gap-3" style={{ borderTop: '1px solid #2C3238', backgroundColor: '#111418' }}>
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                color: '#111418',
                fontWeight: 700,
              }}
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: '#111418', borderTopColor: 'transparent' }} />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Document
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="px-6 py-3 border rounded-xl text-sm transition-all hover:opacity-80"
              style={{ borderColor: '#2A2F35', color: '#9AA4B2', backgroundColor: 'transparent' }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
