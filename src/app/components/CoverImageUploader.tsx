/**
 * SUPABASE STORAGE SETUP (one-time, manual):
 * Dashboard → Storage → New Bucket
 *   Name: blog-images
 *   Public bucket: YES  ← toggle ON
 *   Click Create
 */

import { useRef, useState } from 'react';
import { ImageIcon, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface CoverImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export function CoverImageUploader({ value, onChange }: CoverImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [urlMode, setUrlMode] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.match(/^image\/(png|jpeg|webp)$/)) {
      setUploadError('Only PNG, JPG, and WebP files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File must be under 5 MB.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error || !data) {
      setUploadError('Upload failed, try again');
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(data.path);

    onChange(urlData.publicUrl);
    setUploading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange('');
    setUploadError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  // ── Preview state ────────────────────────────────────────────────────────
  if (value && !urlMode) {
    return (
      <div>
        <img
          src={value}
          alt="Cover preview"
          className="w-full rounded-[12px] object-cover"
          style={{ height: '200px' }}
        />
        <div className="flex items-center gap-4 mt-2">
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1.5 text-[13px] font-[500] bg-transparent border-0 cursor-pointer transition-colors"
            style={{ color: '#DC2626' }}
          >
            <X className="w-3.5 h-3.5" />
            Remove image
          </button>
          <button
            type="button"
            onClick={() => setUrlMode(true)}
            className="text-[13px] font-[500] bg-transparent border-0 cursor-pointer transition-colors"
            style={{ color: '#6B6B6B' }}
          >
            Edit URL
          </button>
        </div>
      </div>
    );
  }

  // ── URL fallback mode ────────────────────────────────────────────────────
  if (urlMode) {
    return (
      <div>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full h-11 bg-white border border-[#F0F0F0] rounded-[8px] px-4 text-[#1D1D1D] text-[14px] focus:outline-none focus:border-[#FF4C00] transition-all"
        />
        <button
          type="button"
          onClick={() => setUrlMode(false)}
          className="mt-2 text-[13px] bg-transparent border-0 cursor-pointer"
          style={{ color: '#6B6B6B' }}
        >
          ← Back to upload
        </button>
      </div>
    );
  }

  // ── Upload dropzone ──────────────────────────────────────────────────────
  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={e => e.key === 'Enter' && !uploading && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className="w-full flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
        style={{
          border: `2px dashed ${dragging ? '#FF4C00' : '#E0E0E0'}`,
          borderRadius: '12px',
          background: dragging ? '#FFF8F5' : '#FAFAFA',
          padding: '36px 24px',
          minHeight: '140px',
          outline: 'none',
        }}
      >
        {uploading ? (
          <>
            <svg className="animate-spin w-6 h-6 text-[#FF4C00]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
            </svg>
            <span style={{ fontSize: '14px', color: '#6B6B6B' }}>Uploading…</span>
          </>
        ) : (
          <>
            <ImageIcon className="w-8 h-8" style={{ color: '#C0C0C0' }} />
            <span style={{ fontSize: '14px', color: '#6B6B6B', fontWeight: 500 }}>
              Click to upload or drag and drop
            </span>
            <span style={{ fontSize: '12px', color: '#B0B0B0' }}>PNG, JPG, WebP up to 5MB</span>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />

      {uploadError && (
        <p className="mt-2 text-[13px] font-[500]" style={{ color: '#DC2626' }}>
          {uploadError}
        </p>
      )}

      <button
        type="button"
        onClick={() => setUrlMode(true)}
        className="mt-2 text-[13px] bg-transparent border-0 cursor-pointer underline"
        style={{ color: '#9CA3AF' }}
      >
        Or paste image URL
      </button>
    </div>
  );
}
