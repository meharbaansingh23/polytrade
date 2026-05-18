import { useState } from 'react';
import { ChevronDown, Bell } from 'lucide-react';
import { AvatarDropdown } from './AvatarDropdown';

export function Header({
  isLoggedIn,
  balance,
  onWaitlistClick,
  onBalanceClick,
  onWalletClick,
  onProfileClick,
  onTransactionHistory,
  onLogout,
  userInitials,
}: HeaderProps) {
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

  return (
    <header
      className="h-[52px] md:h-[68px] px-4 md:px-8 flex items-center justify-between border-b border-[#F0F0F0] bg-white sticky top-0 z-50 relative"
      style={{ boxShadow: '0 1px 0 #F0F0F0' }}
    >
      <div className="flex items-center">
        <img src="/polytrade_logo_new.svg" alt="PolyTrade" height="32" className="block" />
      </div>

      {isLoggedIn ? (
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onBalanceClick}
            className="flex items-center gap-2 md:gap-2.5 px-3 md:px-4.5 py-2 bg-[#FFF0EB] border border-[#FFD4C2] rounded-[10px] hover:bg-[#FFE8DE] transition-all duration-200 cursor-pointer min-h-[44px]"
          >
            <span className="text-[15px] md:text-[17px] font-[800] text-[#1D1D1D]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              ${balance.toFixed(2)}
            </span>
            <span className="text-[12px] font-[600] text-[#FF4C00]">USDC</span>
            <ChevronDown className="w-4 h-4 text-[#6B6B6B] md:ml-1.5" />
          </button>

          <button className="w-11 h-11 flex items-center justify-center text-[#6B6B6B] cursor-pointer border-0 bg-transparent hover:text-[#1D1D1D] transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowAvatarDropdown(!showAvatarDropdown)}
            className="w-9 h-9 rounded-full bg-[#FF4C00] flex items-center justify-center text-white cursor-pointer border-0 hover:bg-[#E64400] transition-colors text-[13px] font-[700]"
          >
            {userInitials}
          </button>

          {showAvatarDropdown && (
            <AvatarDropdown
              onMyPositions={() => {
                setShowAvatarDropdown(false);
                onProfileClick();
              }}
              onTransactionHistory={() => {
                setShowAvatarDropdown(false);
                onTransactionHistory();
              }}
              onLogout={() => {
                setShowAvatarDropdown(false);
                onLogout();
              }}
              onClose={() => setShowAvatarDropdown(false)}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={onWaitlistClick}
            className="px-[14px] md:px-5 py-[8px] md:py-2 min-h-[44px] bg-[#FF4C00] text-white rounded-[8px] hover:bg-[#E64400] transition-all duration-200 cursor-pointer border-0 text-[13px] md:text-[14px]"
            style={{
              boxShadow: '0 2px 8px rgba(255, 76, 0, 0.3)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            Join Waitlist
          </button>
        </div>
      )}
    </header>
  );
}
