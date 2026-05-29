import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

// Node 20 lacks native WebSocket — supply the ws package to supabase-js
const supabase = createClient(
  'https://ihdufrgbnekvlmbgtxxo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZHVmcmdibmVrdmxtYmd0eHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDI4NzYsImV4cCI6MjA5NDY3ODg3Nn0.CPMV8WZupG9bGmqAHFIp9A4ITaDL5RaSxzG3HTPTL94',
  { realtime: { transport: ws } }
);

async function generateSitemap() {
  const { data: posts, error } = await supabase
    .from('blogs')
    .select('slug, updated_at')
    .eq('published', true);

  if (error) {
    console.error('⚠️  Supabase error fetching posts:', error.message);
    console.log('   Generating sitemap with static pages only.');
  }

  const sitemap = new SitemapStream({ hostname: 'https://www.polytrade.live' });
  const writeStream = createWriteStream('./public/sitemap.xml');
  sitemap.pipe(writeStream);

  // Static pages
  sitemap.write({ url: '/',        changefreq: 'daily',   priority: 1.0 });
  sitemap.write({ url: '/blog',    changefreq: 'daily',   priority: 0.9 });
  sitemap.write({ url: '/terms',   changefreq: 'monthly', priority: 0.3 });
  sitemap.write({ url: '/privacy', changefreq: 'monthly', priority: 0.3 });

  // Published blog posts
  for (const post of posts || []) {
    sitemap.write({
      url:        `/blog/${post.slug}`,
      changefreq: 'weekly',
      priority:   0.8,
      lastmod:    post.updated_at,
    });
  }

  sitemap.end();

  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  const count = (posts || []).length;
  console.log(`✅  sitemap.xml generated — ${count} blog post${count === 1 ? '' : 's'} + 4 static pages`);
}

generateSitemap().catch(err => {
  console.error('❌  sitemap generation failed:', err);
  process.exit(1);
});
