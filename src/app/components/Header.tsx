import { useState } from 'react';
import { ChevronDown, Bell } from 'lucide-react';
import { AvatarDropdown } from './AvatarDropdown';

interface HeaderProps {
  isLoggedIn: boolean;
  balance: number;
  onWaitlistClick: () => void;
  onBalanceClick: () => void;
  onWalletClick: () => void;
  onProfileClick: () => void;
  onTransactionHistory: () => void;
  onLogout: () => void;
  userInitials: string;
}

function LogoMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2">
      <path d="M4 8L8 4L12 8L8 12L4 8Z" fill="#FF4C00" />
      <path d="M6 8L8 6L10 8L8 10L6 8Z" fill="#FF824F" />
    </svg>
  );
}

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
      className="h-[68px] px-8 flex items-center justify-between border-b border-[#F0F0F0] bg-white sticky top-0 z-50 relative"
      style={{ boxShadow: '0 1px 0 #F0F0F0' }}
    >
      <div className="flex items-center">
        <LogoMark />
        <h1 className="text-[#1D1D1D] m-0 p-0 text-[20px] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
          PolyTrade
        </h1>
      </div>

      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <button
            onClick={onBalanceClick}
            className="flex items-center gap-2.5 px-4.5 py-2 bg-[#FFF0EB] border border-[#FFD4C2] rounded-[10px] hover:bg-[#FFE8DE] transition-all duration-200 cursor-pointer"
          >
            <span className="text-[17px] font-[800] text-[#1D1D1D]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              ${balance.toFixed(2)}
            </span>
            <span className="text-[12px] font-[600] text-[#FF4C00]">USDC</span>
            <ChevronDown className="w-4 h-4 text-[#6B6B6B] ml-1.5" />
          </button>

          <button className="w-8 h-8 flex items-center justify-center text-[#6B6B6B] cursor-pointer border-0 bg-transparent hover:text-[#1D1D1D] transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowAvatarDropdown(!showAvatarDropdown)}
            className="w-8 h-8 rounded-full bg-[#FF4C00] flex items-center justify-center text-white cursor-pointer border-0 hover:bg-[#E64400] transition-colors text-[13px] font-[700]"
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
            className="px-5 py-2 h-9 bg-[#FF4C00] text-white rounded-[8px] hover:bg-[#E64400] transition-all duration-200 cursor-pointer border-0 text-[14px]"
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
