import { User, TrendingUp, List, Settings, LogOut } from 'lucide-react';

interface AvatarDropdownProps {
  onMyPositions: () => void;
  onTransactionHistory: () => void;
  onLogout: () => void;
  onClose: () => void;
}

export function AvatarDropdown({
  onMyPositions,
  onTransactionHistory,
  onLogout,
  onClose,
}: AvatarDropdownProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div
        className="absolute top-14 right-4 z-50 bg-white border border-[#F0F0F0] rounded-[16px] p-2 w-[220px]"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      >
        <div className="px-4 py-3 border-b border-[#F3F4F6]">
          <div className="text-[#1D1D1D] text-[14px] font-[700]">Mehar B.</div>
          <div className="text-[#6B6B6B] text-[12px] font-[400] mt-0.5">mehar@email.com</div>
        </div>

        <div className="py-1">
          <button
            onClick={onMyPositions}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[10px] hover:bg-[#FFF0EB] transition-colors duration-200 cursor-pointer bg-transparent border-0 text-left"
          >
            <TrendingUp className="w-4 h-4 text-[#FF4C00]" />
            <span className="text-[#1D1D1D] text-[14px] font-[600]">My Positions</span>
          </button>

          <button
            onClick={onTransactionHistory}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[10px] hover:bg-[#FFF0EB] transition-colors duration-200 cursor-pointer bg-transparent border-0 text-left"
          >
            <List className="w-4 h-4 text-[#FF4C00]" />
            <span className="text-[#1D1D1D] text-[14px] font-[600]">Transaction History</span>
          </button>

          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[10px] hover:bg-[#FFF0EB] transition-colors duration-200 cursor-pointer bg-transparent border-0 text-left"
          >
            <Settings className="w-4 h-4 text-[#6B6B6B]" />
            <span className="text-[#6B6B6B] text-[14px] font-[600]">Settings</span>
          </button>
        </div>

        <div className="h-px bg-[#F3F4F6] my-1" />

        <div className="py-1">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[10px] hover:bg-[#FEF2F2] transition-colors duration-200 cursor-pointer bg-transparent border-0 text-left"
          >
            <LogOut className="w-4 h-4 text-[#DC2626]" />
            <span className="text-[#DC2626] text-[14px] font-[600]">Log out</span>
          </button>
        </div>
      </div>
    </>
  );
}
