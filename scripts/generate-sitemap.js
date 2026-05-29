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

  // Market detail pages
  const marketSlugs = [
    // South Africa
    '/markets/will-lagos-toll-gate-reopen-before-august-31-2025',
    '/markets/will-kenya-implement-fuel-subsidy-june-2026',
    '/markets/will-cape-town-water-restrictions-ease-december-2025',
    '/markets/will-ghanas-inflation-drop-below-15-september-2025',
    '/markets/will-nairobi-expressway-toll-removed-year-end',
    '/markets/will-south-africa-host-2027-rugby-world-cup',
    '/markets/will-eskom-be-privatized-before-2027',
    '/markets/will-nigeria-hold-gubernatorial-elections-without-postponement',
    '/markets/will-kenya-sgr-extend-uganda-december-2026',
    '/markets/will-south-africa-load-shedding-end-march-2026',
    '/markets/will-gautrain-expand-soweto-2027',
    '/markets/will-nigeria-naira-stabilize-1500-usd-october',
    // Philippines
    '/markets/ph-will-manila-metro-expand-2026',
    '/markets/ph-will-philippines-inflation-below-3-2026',
    '/markets/ph-will-marcos-approval-rating-above-50-2026',
    '/markets/ph-will-philippines-gdp-exceed-6-percent-2026',
    '/markets/ph-will-pogo-ban-fully-enforced-2026',
    '/markets/ph-will-philippines-win-sea-games-gold-2026',
    '/markets/ph-will-cebu-pacific-expand-international-routes-2026',
    '/markets/ph-will-maharlika-fund-post-positive-returns-2026',
    '/markets/ph-will-davao-become-ph-second-city-gdp-2026',
    '/markets/ph-will-bbi-pass-senate-2026',
    '/markets/ph-will-philippines-join-brics-2026',
    '/markets/ph-will-manila-bay-reclamation-approved-2026',
    // Poland
    '/markets/pl-will-tusk-coalition-survive-2027-elections',
    '/markets/pl-will-nawrocki-veto-10-bills-2026',
    '/markets/pl-will-poland-gdp-exceed-3-5-percent-2026',
    '/markets/pl-will-poland-inflation-below-3-december-2026',
    '/markets/pl-will-poland-defence-spending-5-percent-gdp-2026',
    '/markets/pl-will-us-troops-stationed-poland-2026',
    '/markets/pl-will-cpk-airport-construction-begin-2026',
    '/markets/pl-will-poland-approve-nuclear-plant-2026',
    '/markets/pl-will-zloty-strengthen-4-euro-2026',
    '/markets/pl-will-pis-poll-above-30-2026',
    '/markets/pl-will-warsaw-metro-third-line-open-2026',
    '/markets/pl-will-poland-receive-full-kpo-disbursement-2026',
  ];

  for (const url of marketSlugs) {
    sitemap.write({ url, changefreq: 'weekly', priority: 0.7 });
  }

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
