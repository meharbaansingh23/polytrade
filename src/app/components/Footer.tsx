import { Link } from 'react-router';
import { Twitter, Send, Linkedin } from 'lucide-react';

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
                href="#"
                aria-label="Twitter / X"
                className="transition-colors"
                style={{ color: '#6B6B6B' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B6B6B')}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="transition-colors"
                style={{ color: '#6B6B6B' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B6B6B')}
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="transition-colors"
                style={{ color: '#6B6B6B' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B6B6B')}
              >
                <Linkedin className="w-5 h-5" />
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
