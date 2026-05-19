import { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Market } from './MarketCard';
import { PriceChart } from './PriceChart';

interface MarketDetailProps {
  market: Market;
  onBack: () => void;
  onWaitlistClick: (side: 'YES' | 'NO', marketQuestion: string) => void;
}

export function MarketDetail({ market, onBack, onWaitlistClick }: MarketDetailProps) {
  const [selectedSide, setSelectedSide] = useState<'YES' | 'NO'>('YES');
  const [amount, setAmount] = useState(10);
  const [showAbout, setShowAbout] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);

  const price = selectedSide === 'YES' ? market.yesPrice : market.noPrice;
  const shares = amount / price;
  const payout = shares;
  const odds = Math.round(price * 100);

  return (
    <div className="min-h-screen relative z-10">
      <div className="px-4 md:px-8 py-4 md:py-6 border-b border-[#F0F0F0] bg-white/80 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#1D1D1D] bg-transparent border-0 p-0 cursor-pointer text-[13px] font-[400] transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            Markets / {market.country === 'southafrica' ? 'South Africa' : 'Philippines'}
          </span>
        </button>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-5 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-6 lg:gap-10">
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-[700] tracking-[1.5px] text-[#FF4C00] uppercase">
                {market.category}
              </span>

              <h1 className="text-[#1D1D1D] text-[24px] md:text-[32px] lg:text-[40px] tracking-[-0.5px] md:tracking-[-1px] lg:tracking-[-1.5px] leading-[1.2] mt-2 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                {market.question}
              </h1>

              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[12px] md:text-[13px] font-[400] text-[#6B6B6B]">
                <span>Vol ${market.volume.toLocaleString()}</span>
                <span>·</span>
                <span>Resolves {market.closesDate}</span>
                <span>·</span>
                <span>Source: {market.resolutionSource}</span>
              </div>
            </div>

            <PriceChart currentPrice={market.yesPrice} change={3.2} />

            <div className="space-y-3 mt-6">
              <div className="bg-white border border-[#F0F0F0] rounded-[16px] overflow-hidden">
                <button
                  onClick={() => setShowAbout(!showAbout)}
                  className="w-full flex items-center justify-between p-5 text-[#1D1D1D] bg-transparent border-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors duration-200 text-[14px] font-[600]"
                >
                  <span>About this market</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B6B6B] transition-transform duration-200 ${
                      showAbout ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {showAbout && (
                  <div className="px-5 pb-5 text-[#6B6B6B] text-[14px] font-[400] leading-[1.6]">
                    This market tracks whether the specified event will occur before the resolution
                    date. Shares pay out $1.00 USDT if the outcome matches your position.
                  </div>
                )}
              </div>

              <div className="bg-white border border-[#F0F0F0] rounded-[16px] overflow-hidden">
                <button
                  onClick={() => setShowCriteria(!showCriteria)}
                  className="w-full flex items-center justify-between p-5 text-[#1D1D1D] bg-transparent border-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors duration-200 text-[14px] font-[600]"
                >
                  <span>Resolution criteria</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B6B6B] transition-transform duration-200 ${
                      showCriteria ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {showCriteria && (
                  <div className="px-5 pb-5 text-[#6B6B6B] text-[14px] font-[400] leading-[1.6]">
                    This market will resolve based on official announcements from{' '}
                    {market.resolutionSource}. The market resolves YES if the event occurs before{' '}
                    {market.closesDate}, otherwise NO.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-[88px] h-fit">
            <div
              className="bg-white border border-[#F0F0F0] rounded-[20px] p-4 md:p-7"
              style={{ boxShadow: '0 4px 24px rgba(255, 76, 0, 0.08)' }}
            >
              <div className="mb-4">
                <div className="text-[#6B6B6B] text-[13px] font-[400] line-clamp-2 leading-tight">
                  {market.question}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setSelectedSide('YES')}
                  className={`py-3 rounded-[10px] text-[15px] font-[800] transition-all duration-200 cursor-pointer ${
                    selectedSide === 'YES'
                      ? 'bg-[#ECFDF5] border-2 border-[#16A34A] text-[#16A34A]'
                      : 'bg-[#FAFAFA] border border-[#F0F0F0] text-[#6B6B6B]'
                  }`}
                >
                  YES · {Math.round(market.yesPrice * 100)}¢
                </button>
                <button
                  onClick={() => setSelectedSide('NO')}
                  className={`py-3 rounded-[10px] text-[15px] font-[800] transition-all duration-200 cursor-pointer ${
                    selectedSide === 'NO'
                      ? 'bg-[#FEF2F2] border-2 border-[#DC2626] text-[#DC2626]'
                      : 'bg-[#FAFAFA] border border-[#F0F0F0] text-[#6B6B6B]'
                  }`}
                >
                  NO · {Math.round(market.noPrice * 100)}¢
                </button>
              </div>

              <div className="bg-[#FAFAFA] border border-[#F0F0F0] rounded-[12px] p-5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#6B6B6B] text-[11px] font-[700] uppercase tracking-[1px]">
                    Amount
                  </label>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full bg-transparent border-0 text-[#1D1D1D] text-[28px] font-[900] text-right focus:outline-none mb-1"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                />
                <div className="text-[#6B6B6B] text-[12px] font-[400] text-right">
                  = {shares.toFixed(1)} shares
                </div>
              </div>

              <div className="space-y-0 mb-6">
                <div className="flex items-center justify-between py-3 border-t border-[#F3F4F6] text-[14px]">
                  <span className="text-[#6B6B6B] font-[400]">Odds</span>
                  <span className="text-[#1D1D1D] font-[600]">{odds}% chance</span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-[#F3F4F6]">
                  <span className="text-[#6B6B6B] text-[14px] font-[400]">
                    Payout if {selectedSide === 'YES' ? 'YES' : 'NO'} wins
                  </span>
                  <span className="text-[#16A34A] text-[20px] font-[800]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    ${payout.toFixed(2)} USDT
                  </span>
                </div>
              </div>

              <button
                onClick={() => onWaitlistClick(selectedSide, market.question)}
                className="w-full bg-[#FF4C00] text-white py-4 rounded-[12px] border-0 cursor-pointer hover:bg-[#E64400] transition-all duration-200 text-[16px] font-[700] h-[56px]"
                style={{ boxShadow: '0 4px 16px rgba(255, 76, 0, 0.35)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(255, 76, 0, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 76, 0, 0.35)';
                }}
              >
                Buy
              </button>

              <div className="text-[#6B6B6B] text-[11px] font-[400] text-center mt-3">
                By trading you agree to our Terms
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
