import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { PublicHeader } from '../components/PublicHeader';
import { Footer } from '../components/Footer';
import { supabase } from '../../lib/supabase';
import '../components/RichTextEditor.css';

interface BlogPostType {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  cover_image: string | null;
  category: string | null;
  author: string;
  excerpt: string | null;
  created_at: string;
  meta_title: string | null;
  meta_description: string | null;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Inject per-post meta tags into <head>
  useEffect(() => {
    if (!post) return;
    const pageTitle = `${post.meta_title || post.title} | Polytrade Blog`;
    document.title = pageTitle;

    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    const desc = post.meta_description || post.excerpt || '';
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', desc);

    return () => {
      document.title = 'Polytrade | Prediction Market for South Africa and the Philippines';
    };
  }, [post]);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true);
        else setPost(data);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <PublicHeader />
      <main className="max-w-[760px] mx-auto px-4 md:px-8 py-10 md:py-14">
        {loading ? (
          <p className="text-[#6B6B6B] text-[14px]">Loading…</p>
        ) : notFound ? (
          <div className="text-center py-24">
            <h1
              className="text-[#1D1D1D] text-[32px] font-[800] mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Post not found
            </h1>
            <p className="text-[#6B6B6B] text-[15px] mb-6">
              This post doesn't exist or has been removed.
            </p>
            <Link to="/blog" className="text-[#FF4C00] font-[600] text-[14px]" style={{ textDecoration: 'none' }}>
              ← Back to Blog
            </Link>
          </div>
        ) : post ? (
          <>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[#6B6B6B] hover:text-[#1D1D1D] text-[13px] mb-8 transition-colors"
              style={{ textDecoration: 'none' }}
            >
              ← Back to Blog
            </Link>

            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full rounded-[12px] mb-8 max-h-[420px] object-cover"
              />
            )}

            {post.category && (
              <span className="text-[11px] font-[700] tracking-[1.5px] text-[#FF4C00] uppercase">
                {post.category}
              </span>
            )}

            <h1
              className="text-[#1D1D1D] text-[28px] md:text-[42px] font-[800] tracking-[-1px] md:tracking-[-1.5px] leading-[1.2] mt-2 mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-[#9CA3AF] text-[13px] mb-8 pb-8 border-b border-[#F0F0F0]">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.created_at)}</span>
            </div>

            {post.body && (
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            )}
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
