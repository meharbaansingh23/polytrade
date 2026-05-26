import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import App from './app/App.tsx';
import Blog from './app/pages/Blog.tsx';
import BlogPost from './app/pages/BlogPost.tsx';
import Terms from './app/pages/Terms.tsx';
import Privacy from './app/pages/Privacy.tsx';
import AdminLogin from './app/pages/AdminLogin.tsx';
import AdminDashboard from './app/pages/AdminDashboard.tsx';
import AdminPostEditor from './app/pages/AdminPostEditor.tsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/posts/new" element={<AdminPostEditor />} />
        <Route path="/admin/posts/:id" element={<AdminPostEditor />} />
      </Routes>
    </>
  );
}
