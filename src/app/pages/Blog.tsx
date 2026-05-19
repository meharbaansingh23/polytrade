import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { PublicHeader } from '../components/PublicHeader';
import { supabase } from '../../lib/supabase';

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  author: string;
  created_at: string;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('blogs')
      .select('id, title, slug, excerpt, cover_image, category, author, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => { setPosts(data || []); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <PublicHeader />
      <main className="max-w-[1100px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <h1
          className="text-[#1D1D1D] text-[36px] md:text-[52px] font-[800] tracking-[-2px] mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Blog
        </h1>

        {loading ? (
          <p className="text-[#6B6B6B] text-[14px]">Loading…</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#6B6B6B] text-[16px]">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white border border-[#F0F0F0] rounded-[12px] overflow-hidden hover:border-[#FFD4C2] hover:-translate-y-[3px] transition-all duration-200 group block"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textDecoration: 'none' }}
              >
                {post.cover_image && (
                  <img src={post.cover_image} alt={post.title} className="w-full h-[200px] object-cover" />
                )}
                <div className="p-5 md:p-6">
                  {post.category && (
                    <span className="text-[11px] font-[700] tracking-[1.5px] text-[#FF4C00] uppercase">
                      {post.category}
                    </span>
                  )}
                  <h2
                    className="text-[#1D1D1D] text-[18px] font-[700] mt-2 mb-2 leading-snug group-hover:text-[#FF4C00] transition-colors"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-[#6B6B6B] text-[14px] leading-[1.6] mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-[#9CA3AF] text-[12px]">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
