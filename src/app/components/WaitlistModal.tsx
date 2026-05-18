import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface WaitlistModalProps {
  onClose: () => void;
  tradeContext?: {
    side: 'YES' | 'NO';
    marketQuestion: string;
  };
}

export function WaitlistModal({ onClose, tradeContext }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setInlineError(null);

    const source = tradeContext ? tradeContext.marketQuestion : 'header';

    // RLS must be DISABLED on the waitlist table in Supabase for anon inserts to work.
    // Table → Authentication → Policies → disable RLS, or add an INSERT policy for anon role.
    const { error } = await supabase
      .from('waitlist')
      .insert({ email, source });

    if (!error) {
      setSubmitted(true);
    } else {
      console.log('Supabase error:', error);
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      if (error.message.toLowerCase().includes('duplicate') || error.code === '23505') {
        setInlineError("You're already on the list!");
      } else {
        setInlineError('Something went wrong, try again');
      }
    }

    setLoading(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useState(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  });

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
      <div
        className="bg-white rounded-[16px] md:rounded-[20px] p-7 md:p-10 w-full max-w-[460px] relative"
        style={{
          boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
          animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAFAFA] flex items-center justify-center text-[#6B6B6B] hover:bg-[#F0F0F0] transition-colors border-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {!submitted ? (
          <>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-14 h-14 rounded-[14px] bg-[#FFF0EB] flex items-center justify-center mb-4"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 12L12 6L18 12L12 18L6 12Z" fill="#FF4C00" />
                  <path d="M9 12L12 9L15 12L12 15L9 12Z" fill="#FF824F" />
                </svg>
              </div>

              <div
                className="text-[#FF4C00] text-[11px] mb-3 tracking-[2px] uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
              >
                {tradeContext ? 'YOU\'RE EARLY' : 'COMING SOON'}
              </div>

              <h2
                className="text-[#1D1D1D] text-[26px] mb-3"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                }}
              >
                {tradeContext ? 'Trading opens soon' : 'Be first to trade on Polytrade'}
              </h2>

              <p className="text-[#6B6B6B] text-[14px] leading-[1.65] mb-6">
                {tradeContext
                  ? "Polytrade isn't live yet — but you clearly have good instincts. Join the waitlist and be first to place this trade when we launch."
                  : "We're launching hyperlocal prediction markets across Africa and the Philippines. Join the waitlist and get early access + 10 USDC trading credit when we go live."}
              </p>

              {tradeContext && (
                <div className="w-full bg-[#FAFAFA] border border-[#F0F0F0] rounded-[10px] px-4 py-3 mb-5 flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-[700] uppercase shrink-0 ${
                      tradeContext.side === 'YES'
                        ? 'bg-[#F0FDF4] text-[#16A34A]'
                        : 'bg-[#FEF2F2] text-[#DC2626]'
                    }`}
                  >
                    {tradeContext.side}
                  </span>
                  <span className="text-[#1D1D1D] text-[13px] font-[500] line-clamp-2 text-left">
                    {tradeContext.marketQuestion}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="w-full mb-3">
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full md:flex-1 h-12 bg-[#FAFAFA] border-[1.5px] border-[#F0F0F0] rounded-[8px] px-4 text-[#1D1D1D] text-[14px] focus:outline-none focus:border-[#FF4C00] transition-all disabled:opacity-60"
                    style={{
                      boxShadow: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 76, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto md:shrink-0 h-12 bg-[#FF4C00] text-white px-6 rounded-[8px] border-0 cursor-pointer hover:bg-[#E64400] transition-colors text-[14px] disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                  >
                    {loading ? 'Joining...' : tradeContext ? 'Notify Me When Live' : 'Join Waitlist'}
                  </button>
                </div>
                {inlineError ? (
                  <p className="text-[13px] text-center font-[500]" style={{ color: inlineError.includes('already') ? '#FF4C00' : '#DC2626' }}>
                    {inlineError}
                  </p>
                ) : (
                  <p className="text-[#B0B0B0] text-[12px] text-center">
                    No spam. We'll only email you about the launch.
                  </p>
                )}
              </form>

              <div className="flex items-center gap-3 w-full my-5">
                <div className="flex-1 h-px bg-[#F0F0F0]" />
                <span className="text-[#6B6B6B] text-[13px]">or</span>
                <div className="flex-1 h-px bg-[#F0F0F0]" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div
                    className="w-[26px] h-[26px] rounded-full bg-[#FF824F] flex items-center justify-center text-white text-[11px] font-[700] border-2 border-white"
                  >
                    O
                  </div>
                  <div
                    className="w-[26px] h-[26px] rounded-full bg-[#FFA07A] flex items-center justify-center text-white text-[11px] font-[700] border-2 border-white"
                  >
                    K
                  </div>
                  <div
                    className="w-[26px] h-[26px] rounded-full bg-[#FF6B6B] flex items-center justify-center text-white text-[11px] font-[700] border-2 border-white"
                  >
                    A
                  </div>
                </div>
                <span className="text-[#6B6B6B] text-[13px]">
                  2,400+ people already on the list
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-6">
            <div
              className="w-14 h-14 rounded-full mb-5 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FF4C00 0%, #FF824F 100%)',
              }}
            >
              <Check className="w-7 h-7 text-white" strokeWidth={3} />
            </div>

            <h2
              className="text-[#1D1D1D] text-[22px] mb-3"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
              }}
            >
              You're on the list 🎉
            </h2>

            <p className="text-[#6B6B6B] text-[14px] leading-[1.65] mb-6 max-w-[340px]">
              We'll email you at <span className="font-[600]">{email}</span> when Polytrade goes
              live. You'll get 10 USDC trading credit on us.
            </p>

            <button
              onClick={onClose}
              className="text-[#B0B0B0] text-[13px] bg-transparent border-0 cursor-pointer hover:text-[#6B6B6B] transition-colors underline"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
