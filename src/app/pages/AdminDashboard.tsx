import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';

interface PostRow {
  id: string;
  title: string;
  category: string | null;
  published: boolean;
  created_at: string;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);

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
      .select('id, title, category, published, created_at')
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
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
        <h1
          className="text-[#1D1D1D] text-[28px] font-[800] mb-8"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Posts
        </h1>

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
          <div
            className="bg-white border border-[#F0F0F0] rounded-[12px] overflow-hidden"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            {/* Desktop header row */}
            <div className="hidden md:grid grid-cols-[1fr_140px_110px_120px_140px] gap-4 px-6 py-3.5 bg-[#FAFAFA] border-b border-[#F0F0F0]">
              {['Title', 'Category', 'Status', 'Date', 'Actions'].map((h, i) => (
                <span key={h} className={`text-[11px] font-[700] uppercase tracking-[1px] text-[#9CA3AF] ${i === 4 ? 'text-right' : ''}`}>{h}</span>
              ))}
            </div>

            {posts.map(post => (
              <div
                key={post.id}
                className="px-4 md:px-6 py-4 border-b border-[#F3F4F6] last:border-0 flex flex-col gap-2 md:grid md:grid-cols-[1fr_140px_110px_120px_140px] md:gap-4 md:items-center hover:bg-[#FAFAFA] transition-colors"
              >
                <div className="text-[#1D1D1D] text-[14px] font-[600] truncate">{post.title}</div>
                <div className="text-[#6B6B6B] text-[13px]">{post.category || '—'}</div>
                <div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-[700] ${post.published ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#F3F4F6] text-[#6B6B6B]'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="text-[#9CA3AF] text-[12px]">{formatDate(post.created_at)}</div>
                <div className="flex items-center gap-4 md:justify-end">
                  <button
                    onClick={() => navigate(`/admin/posts/${post.id}`)}
                    className="text-[#7C3AED] text-[13px] font-[600] bg-transparent border-0 cursor-pointer hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="text-[#DC2626] text-[13px] font-[600] bg-transparent border-0 cursor-pointer hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
