import { ChevronRight } from 'lucide-react';

export interface Market {
  id: string;
  question: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  closesDate: string;
  country: 'southafrica' | 'philippines';
  category: string;
  resolved?: boolean;
  winner?: 'YES' | 'NO';
  resolutionSource: string;
}

interface MarketCardProps {
  market: Market;
  onClick: () => void;
}

export function MarketCard({ market, onClick }: MarketCardProps) {
  const yesPercent = market.yesPrice * 100;

  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#F0F0F0] rounded-[16px] px-[22px] pt-[22px] pb-4 cursor-pointer hover:border-[#FFD4C2] hover:-translate-y-[3px] transition-all duration-200 relative group"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 76, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      }}
    >
      <div className="flex items-start justify-between mb-1.5">
        <span className="text-[10px] font-[700] tracking-[1.5px] text-[#6B6B6B] uppercase">
          {market.category}
        </span>
        <ChevronRight className="w-4 h-4 text-[#D0D0D0] group-hover:text-[#FF4C00] transition-colors duration-200" />
      </div>

      <h3 className="text-[#1D1D1D] m-0 mb-3.5 text-[15px] font-[700] tracking-[-0.3px] leading-[1.45] line-clamp-2 min-h-[43px]">
        {market.question}
      </h3>

      <div className="flex gap-2 mb-2.5">
        <div className="bg-[#ECFDF5] border border-[#6EE7B7] text-[#059669] px-3 py-1 rounded-full text-[13px] font-[700]">
          YES {Math.round(market.yesPrice * 100)}¢
        </div>
        <div className="bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] px-3 py-1 rounded-full text-[13px] font-[700]">
          NO {Math.round(market.noPrice * 100)}¢
        </div>
      </div>

      <div className="w-full h-1 rounded-full overflow-hidden bg-[#F3F4F6]">
        <div
          className="h-full bg-[#059669]"
          style={{
            width: `${yesPercent}%`,
          }}
        />
      </div>
    </div>
  );
}
