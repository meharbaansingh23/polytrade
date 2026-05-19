import { X } from 'lucide-react';

interface BuyConfirmationProps {
  marketName: string;
  side: 'YES' | 'NO';
  amount: number;
  shares: number;
  payout: number;
  currentBalance: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function BuyConfirmationModal({
  marketName,
  side,
  amount,
  shares,
  payout,
  currentBalance,
  onConfirm,
  onCancel,
}: BuyConfirmationProps) {
  const balanceAfter = currentBalance - amount;
  const profit = payout - amount;
  const returnPercent = (profit / amount) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: 'rgba(29, 29, 29, 0.4)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="bg-white border border-[#F0F0F0] rounded-[24px] p-9 w-full max-w-[440px] relative"
        style={{ boxShadow: '0 20px 64px rgba(0,0,0,0.12)' }}
      >
        <button
          onClick={onCancel}
          className="absolute top-6 right-6 text-[#6B6B6B] hover:text-[#1D1D1D] bg-transparent border-0 p-0 cursor-pointer transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-[#1D1D1D] mb-2 text-[22px] font-[800]">Confirm your trade</h2>
        <p className="text-[#6B6B6B] text-[13px] font-[400] mb-6 line-clamp-2 leading-tight">
          {marketName}
        </p>

        <div className="bg-[#FAFAFA] rounded-[12px] p-5 mb-4 space-y-0">
          <div className="flex justify-between items-center py-3">
            <span className="text-[#6B6B6B] text-[14px] font-[400]">Position</span>
            <span
              className={`px-3 py-1 rounded-full text-[12px] font-[700] ${
                side === 'YES'
                  ? 'bg-[#ECFDF5] border border-[#6EE7B7] text-[#16A34A]'
                  : 'bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626]'
              }`}
            >
              {side}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-t border-[#F0F0F0]">
            <span className="text-[#6B6B6B] text-[14px] font-[400]">Amount</span>
            <span className="text-[#1D1D1D] text-[14px] font-[600]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              ${amount.toFixed(2)} USDT
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-t border-[#F0F0F0]">
            <span className="text-[#6B6B6B] text-[14px] font-[400]">Shares</span>
            <span className="text-[#1D1D1D] text-[14px] font-[600]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {shares.toFixed(1)}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-t border-[#F0F0F0]">
            <span className="text-[#6B6B6B] text-[14px] font-[400]">Payout if correct</span>
            <span className="text-[#16A34A] text-[16px] font-[700]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              ${payout.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-t border-[#F0F0F0]">
            <span className="text-[#6B6B6B] text-[14px] font-[400]">Profit</span>
            <span className="text-[#1D1D1D] text-[16px] font-[700]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              +${profit.toFixed(2)} (+{Math.round(returnPercent)}%)
            </span>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-[14px] font-[400] text-[#6B6B6B] m-0">
            Balance after: <span className="text-[#1D1D1D] font-[600]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              ${balanceAfter.toFixed(2)} USDT
            </span>
          </p>
        </div>

        <button
          onClick={onConfirm}
          className="w-full bg-[#FF4C00] text-white py-3 rounded-[10px] border-0 cursor-pointer hover:bg-[#E64400] transition-all duration-200 mb-3 text-[16px] font-[700]"
        >
          Confirm Trade
        </button>

        <button
          onClick={onCancel}
          className="w-full text-[#6B6B6B] bg-transparent border-0 cursor-pointer hover:text-[#1D1D1D] text-[14px] font-[500] transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
