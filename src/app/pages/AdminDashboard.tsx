/*
 * SUPABASE MIGRATION — run in SQL Editor before using drag-to-reorder:
 * ALTER TABLE blogs ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface PostRow {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  published: boolean;
  created_at: string;
  sort_order: number;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Sortable row ──────────────────────────────────────────────────────────────
function SortableRow({
  post,
  onEdit,
  onDelete,
  onVisit,
}: {
  post: PostRow;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  onVisit: (slug: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: post.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        background: isDragging ? '#FFF0EB' : undefined,
        boxShadow: isDragging ? '0 4px 16px rgba(0,0,0,0.12)' : undefined,
        position: isDragging ? 'relative' : undefined,
        zIndex: isDragging ? 10 : undefined,
        opacity: isDragging ? 0.95 : 1,
      }}
      className="px-4 md:px-6 py-4 border-b border-[#F3F4F6] last:border-0 flex flex-col gap-2 md:grid md:grid-cols-[40px_1fr_140px_110px_120px_190px] md:gap-4 md:items-center hover:bg-[#FAFAFA] transition-colors"
    >
      {/* Drag handle — desktop only */}
      <div
        {...attributes}
        {...listeners}
        className="hidden md:flex items-center justify-center touch-none select-none"
        style={{ color: '#B0B0B0', cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <div className="text-[#1D1D1D] text-[14px] font-[600] truncate">{post.title}</div>
      <div className="text-[#6B6B6B] text-[13px]">{post.category || '—'}</div>
      <div>
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-[700] ${
            post.published ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#F3F4F6] text-[#6B6B6B]'
          }`}
        >
          {post.published ? 'Published' : 'Draft'}
        </span>
      </div>
      <div className="text-[#9CA3AF] text-[12px]">{formatDate(post.created_at)}</div>
      <div className="flex items-center gap-4 md:justify-end">
        <button
          onClick={() => onVisit(post.slug)}
          className="text-[#6B6B6B] text-[13px] font-[600] bg-transparent border-0 cursor-pointer hover:text-[#1D1D1D] transition-colors"
        >
          Visit
        </button>
        <button
          onClick={() => onEdit(post.id)}
          className="text-[#7C3AED] text-[13px] font-[600] bg-transparent border-0 cursor-pointer hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(post.id, post.title)}
          className="text-[#DC2626] text-[13px] font-[600] bg-transparent border-0 cursor-pointer hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) navigate('/admin');
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('blogs')
      .select('id, slug, title, category, published, created_at, sort_order')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = posts.findIndex(p => p.id === active.id);
    const newIndex = posts.findIndex(p => p.id === over.id);
    const reordered = arrayMove(posts, oldIndex, newIndex);

    // Update UI immediately
    setPosts(reordered);
    setSaveStatus('saving');

    // Persist new sort_order for every row
    for (const [index, post] of reordered.entries()) {
      await supabase.from('blogs').update({ sort_order: index }).eq('id', post.id);
    }

    setSaveStatus('saved');
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await supabase.from('blogs').delete().eq('id', id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header
        className="h-[60px] px-4 md:px-8 flex items-center justify-between border-b border-[#F0F0F0] bg-white sticky top-0 z-50"
        style={{ boxShadow: '0 1px 0 #F0F0F0' }}
      >
        <img src="/polytrade_logo_new.svg" alt="PolyTrade" className="h-8 w-auto" />
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => navigate('/admin/posts/new')}
            className="h-9 px-4 bg-[#FF4C00] text-white rounded-[8px] border-0 cursor-pointer hover:bg-[#E64400] transition-colors text-[13px] font-[600]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            + New Post
          </button>
          <button
            onClick={handleSignOut}
            className="text-[#6B6B6B] text-[13px] font-[500] bg-transparent border-0 cursor-pointer hover:text-[#DC2626] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 md:px-8 py-10">
        {/* Title + save-status indicator */}
        <div className="flex items-center gap-4 mb-8">
          <h1
            className="text-[#1D1D1D] text-[28px] font-[800]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Posts
          </h1>
          {saveStatus === 'saving' && (
            <span className="text-[13px]" style={{ color: '#B0B0B0' }}>Saving order…</span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-[13px]" style={{ color: '#16A34A' }}>Saved ✓</span>
          )}
        </div>

        {loading ? (
          <p className="text-[#6B6B6B] text-[14px]">Loading…</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#6B6B6B] text-[15px] mb-4">No posts yet.</p>
            <button
              onClick={() => navigate('/admin/posts/new')}
              className="text-[#FF4C00] font-[600] text-[14px] bg-transparent border-0 cursor-pointer"
            >
              Create your first post →
            </button>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={posts.map(p => p.id)} strategy={verticalListSortingStrategy}>
              <div
                className="bg-white border border-[#F0F0F0] rounded-[12px] overflow-hidden"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
              >
                {/* Desktop header row */}
                <div className="hidden md:grid grid-cols-[40px_1fr_140px_110px_120px_190px] gap-4 px-6 py-3.5 bg-[#FAFAFA] border-b border-[#F0F0F0]">
                  <span />
                  {['Title', 'Category', 'Status', 'Date', 'Actions'].map((h, i) => (
                    <span
                      key={h}
                      className={`text-[11px] font-[700] uppercase tracking-[1px] text-[#9CA3AF] ${i === 4 ? 'text-right' : ''}`}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {posts.map(post => (
                  <SortableRow
                    key={post.id}
                    post={post}
                    onEdit={id => navigate(`/admin/posts/${id}`)}
                    onDelete={handleDelete}
                    onVisit={slug => window.open(`/blog/${slug}`, '_blank')}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </main>
    </div>
  );
}
