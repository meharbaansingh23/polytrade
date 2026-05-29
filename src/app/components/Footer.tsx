import { Link } from 'react-router';

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.75" fill="none"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer style={{ background: '#1D1D1D' }}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-12 pb-8">

        {/* Top 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-8">

          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/polytrade_favicon.svg" alt="" width="24" height="24" />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#FFFFFF',
                }}
              >
                PolyTrade
              </span>
            </div>
            <p
              className="mb-5"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: '14px',
                color: '#6B6B6B',
                lineHeight: '1.6',
              }}
            >
              Your local knowledge,<br />Is real money.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/polytrade.live?igsh=MTZ4bTh1dG9oOWtveA%3D%3D&utm_source=qr"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: '#6B6B6B' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B6B6B')}
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@polytrade.live"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: '#6B6B6B' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B6B6B')}
              >
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 — Markets */}
          <div>
            <h3
              className="mb-4"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '12px',
                color: '#6B6B6B',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              Markets
            </h3>
            <ul className="space-y-3">
              {['South Africa', 'Philippines', 'Poland'].map(country => (
                <li key={country}>
                  <a
                    href="/"
                    style={{ fontSize: '14px', color: '#B0B0B0', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#B0B0B0')}
                  >
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3
              className="mb-4"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '12px',
                color: '#6B6B6B',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Blog', to: '/blog' },
                { label: 'Terms & Conditions', to: '/terms' },
                { label: 'Privacy Policy', to: '/privacy' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ fontSize: '14px', color: '#B0B0B0', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#B0B0B0')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#2D2D2D', marginBottom: '24px' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-center md:text-left">
          <p style={{ fontSize: '13px', color: '#6B6B6B' }}>
            © 2026 PolyTrade. All rights reserved.
          </p>
          <p style={{ fontSize: '13px', color: '#6B6B6B' }}>
            Not available in India, USA, or China.
          </p>
        </div>
      </div>
    </footer>
  );
}
