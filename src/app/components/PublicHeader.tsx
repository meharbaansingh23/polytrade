import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { WaitlistModal } from './WaitlistModal';

export function PublicHeader() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const { pathname } = useLocation();
  const onBlog = pathname.startsWith('/blog');

  return (
    <>
      <header
        className="h-[52px] md:h-[68px] px-4 md:px-8 flex items-center justify-between border-b border-[#F0F0F0] bg-white sticky top-0 z-50"
        style={{ boxShadow: '0 1px 0 #F0F0F0' }}
      >
        <div className="flex items-center gap-5 md:gap-8">
          <Link to="/"><img src="/polytrade_logo_new.svg" alt="PolyTrade" className="h-8 w-auto" /></Link>
          <Link
            to="/blog"
            className="text-[13px] md:text-[14px] font-[500] transition-colors"
            style={{ textDecoration: 'none', color: onBlog ? '#FF4C00' : '#1D1D1D' }}
          >
            Blog
          </Link>
        </div>
        <button
          onClick={() => setShowWaitlist(true)}
          className="px-[14px] md:px-5 py-[8px] md:py-2 min-h-[44px] bg-[#FF4C00] text-white rounded-[8px] hover:bg-[#E64400] transition-all duration-200 cursor-pointer border-0 text-[13px] md:text-[14px]"
          style={{ boxShadow: '0 2px 8px rgba(255, 76, 0, 0.3)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
        >
          Join Waitlist
        </button>
      </header>
      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}
    </>
  );
}
