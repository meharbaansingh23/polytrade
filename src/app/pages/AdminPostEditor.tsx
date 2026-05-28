import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { supabase } from '../../lib/supabase';
import { RichTextEditor } from '../components/RichTextEditor';
import { CoverImageUploader } from '../components/CoverImageUploader';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#6B6B6B] text-[11px] font-[700] uppercase tracking-[1px] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full h-11 bg-white border border-[#F0F0F0] rounded-[8px] px-4 text-[#1D1D1D] text-[14px] focus:outline-none focus:border-[#FF4C00] transition-all';

export default function AdminPostEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = !id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('Polytrade Team');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [body, setBody] = useState('');
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  // Controls when the editor mounts — wait for data on edit pages
  const [editorReady, setEditorReady] = useState(isNew);

  useEffect(() => {
    checkAuth();
    if (!isNew) fetchPost();
  }, [id]);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) navigate('/admin');
  };

  const fetchPost = async () => {
    const { data } = await supabase.from('blogs').select('*').eq('id', id).single();
    if (!data) return;
    setTitle(data.title);
    setSlug(data.slug);
    setCategory(data.category || '');
    setAuthor(data.author || 'Polytrade Team');
    setExcerpt(data.excerpt || '');
    setCoverImage(data.cover_image || '');
    setBody(data.body || '');
    setPublished(data.published);
    setSlugTouched(true);
    setEditorReady(true); // mount editor only after content is available
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugTouched) setSlug(generateSlug(val));
  };

  const save = async (publish: boolean) => {
    if (!title.trim() || !slug.trim()) {
      alert('Title and slug are required.');
      return;
    }
    setSaving(true);
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim() || null,
      author: author.trim() || 'Polytrade Team',
      excerpt: excerpt.trim() || null,
      cover_image: coverImage.trim() || null,
      body: body || null,
      published: publish,
      updated_at: new Date().toISOString(),
    };

    const { error } = isNew
      ? await supabase.from('blogs').insert(payload)
      : await supabase.from('blogs').update(payload).eq('id', id);

    setSaving(false);
    if (error) alert('Error saving: ' + error.message);
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header
        className="h-[60px] px-4 md:px-8 flex items-center justify-between border-b border-[#F0F0F0] bg-white sticky top-0 z-50"
        style={{ boxShadow: '0 1px 0 #F0F0F0' }}
      >
        <img src="/polytrade_logo_new.svg" alt="PolyTrade" className="h-8 w-auto" />
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="text-[#6B6B6B] text-[13px] font-[500] bg-transparent border-0 cursor-pointer hover:text-[#1D1D1D] transition-colors"
        >
          ← Back to Dashboard
        </button>
      </header>

      <main className="max-w-[860px] mx-auto px-4 md:px-8 py-10">
        <h1
          className="text-[#1D1D1D] text-[28px] font-[800] mb-8"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {isNew ? 'New Post' : 'Edit Post'}
        </h1>

        <div className="space-y-5">
          <Field label="Title *">
            <input
              type="text"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Post title"
              className={inputCls + ' text-[15px] font-[600]'}
            />
          </Field>

          <Field label="Slug *">
            <input
              type="text"
              value={slug}
              onChange={e => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              placeholder="post-url-slug"
              className={inputCls + ' font-mono'}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Category">
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="e.g. Updates, Markets"
                className={inputCls}
              />
            </Field>
            <Field label="Author">
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Cover Image">
            <CoverImageUploader value={coverImage} onChange={setCoverImage} />
          </Field>

          <Field label={`Excerpt (${excerpt.length}/200)`}>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value.slice(0, 200))}
              placeholder="Short description shown in the blog listing"
              rows={3}
              className="w-full bg-white border border-[#F0F0F0] rounded-[8px] px-4 py-3 text-[#1D1D1D] text-[14px] focus:outline-none focus:border-[#FF4C00] transition-all resize-none"
            />
          </Field>

          <Field label="Body">
            {editorReady ? (
              <RichTextEditor defaultContent={body} onChange={setBody} />
            ) : (
              <div
                className="w-full rounded-[12px] flex items-center justify-center text-[#9CA3AF] text-[14px]"
                style={{ minHeight: 400, border: '1px solid #F0F0F0' }}
              >
                Loading editor…
              </div>
            )}
          </Field>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={e => setPublished(e.target.checked)}
              className="w-4 h-4 cursor-pointer accent-[#FF4C00]"
            />
            <label
              htmlFor="published"
              className="text-[#1D1D1D] text-[14px] font-[500] cursor-pointer"
            >
              Published
            </label>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-8 pt-8 border-t border-[#F0F0F0]">
          <button
            onClick={() => save(false)}
            disabled={saving}
            className="flex-1 md:flex-none h-11 px-6 bg-white border border-[#F0F0F0] text-[#1D1D1D] rounded-[8px] cursor-pointer hover:border-[#FFD4C2] transition-all text-[14px] font-[600] disabled:opacity-60"
          >
            Save Draft
          </button>
          <button
            onClick={() => save(true)}
            disabled={saving}
            className="flex-1 md:flex-none h-11 px-8 bg-[#FF4C00] text-white rounded-[8px] border-0 cursor-pointer hover:bg-[#E64400] transition-all text-[14px] font-[600] disabled:opacity-70"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: '0 2px 8px rgba(255,76,0,0.3)',
            }}
          >
            {saving ? 'Saving…' : 'Publish'}
          </button>
        </div>
      </main>
    </div>
  );
}
