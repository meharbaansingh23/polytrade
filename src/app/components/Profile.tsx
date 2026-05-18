import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Position {
  id: string;
  category: string;
  question: string;
  resolvesDate: string;
  side: 'YES' | 'NO';
  shares: number;
  pricePerShare: number;
  cost: number;
  currentValue?: number;
  outcome?: 'WON' | 'LOST';
  payout?: number;
  profit?: number;
}

interface ProfileProps {
  onBack: () => void;
  onViewMarket: (marketId: string) => void;
}

const activePositions: Position[] = [
  {
    id: '1',
    category: 'INFRASTRUCTURE',
    question: 'Will the Lagos toll gate reopen before August 31, 2025?',
    resolvesDate: 'Aug 31, 2025',
    side: 'YES',
    shares: 50,
    pricePerShare: 0.67,
    cost: 33.5,
    currentValue: 36.2,
    profit: 2.7,
  },
  {
    id: '2',
    category: 'ENERGY',
    question: 'Will Kenya implement a fuel subsidy by June 2026?',
    resolvesDate: 'Jun 30, 2026',
    side: 'NO',
    shares: 30,
    pricePerShare: 0.64,
    cost: 19.2,
    currentValue: 17.8,
    profit: -1.4,
  },
  {
    id: '4',
    category: 'ENERGY',
    question: "Will South Africa's load shedding end before March 2026?",
    resolvesDate: 'Mar 31, 2026',
    side: 'YES',
    shares: 20,
    pricePerShare: 0.38,
    cost: 7.6,
    currentValue: 8.1,
    profit: 0.5,
  },
  {
    id: '9',
    category: 'SPORTS',
    question: 'Will South Africa host the 2027 Rugby World Cup?',
    resolvesDate: 'Jun 30, 2026',
    side: 'YES',
    shares: 80,
    pricePerShare: 0.81,
    cost: 64.8,
    currentValue: 71.2,
    profit: 6.4,
  },
];

const settledPositions: Position[] = [
  {
    id: 's1',
    category: 'ENVIRONMENT',
    question: 'Will Cape Town water restrictions ease by December 2025?',
    resolvesDate: 'Aug 31, 2025',
    side: 'YES',
    shares: 40,
    pricePerShare: 0.72,
    cost: 28.8,
    outcome: 'WON',
    payout: 39.2,
    profit: 10.4,
  },
  {
    id: 's2',
    category: 'ECONOMY',
    question: "Will Ghana's inflation drop below 15% by September 2025?",
    resolvesDate: 'Sep 30, 2025',
    side: 'NO',
    shares: 25,
    pricePerShare: 0.45,
    cost: 11.25,
    outcome: 'LOST',
    payout: 0,
    profit: -11.25,
  },
  {
    id: 's3',
    category: 'INFRASTRUCTURE',
    question: 'Will the Nairobi expressway toll be removed by year end?',
    resolvesDate: 'Dec 31, 2025',
    side: 'NO',
    shares: 60,
    pricePerShare: 0.78,
    cost: 46.8,
    outcome: 'WON',
    payout: 58.8,
    profit: 12.0,
  },
  {
    id: 's4',
    category: 'ECONOMY',
    question: "Will Nigeria's naira stabilize below ₦1,500/USD by October?",
    resolvesDate: 'Oct 31, 2025',
    side: 'YES',
    shares: 15,
    pricePerShare: 0.41,
    cost: 6.15,
    outcome: 'LOST',
    payout: 0,
    profit: -6.15,
  },
];

export function Profile({ onBack, onViewMarket }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'settled'>('active');

  const totalTraded = 1240.0;
  const positionsWon = 14;
  const totalPnL = 87.4;
  const activeCount = 4;
  const totalInvested = 125.1;
  const unrealisedPnL = 8.2;
  const unrealisedPnLPercent = 6.5;
  const totalWonAllTime = 98.0;

  const positions = activeTab === 'active' ? activePositions : settledPositions;

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-[1100px] mx-auto px-8 pt-12 pb-16">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#0D0D1A] bg-transparent border-0 p-0 cursor-pointer text-[13px] font-[400] transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Markets</span>
        </button>

        {/* User Identity Card */}
        <div
          className="bg-white border border-[#E4DFF5] rounded-[20px] p-8 mb-10"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[24px] font-[700]">
                MB
              </div>
              <div>
                <h1 className="text-[#0D0D1A] text-[22px] font-[800] mb-1">Mehar B.</h1>
                <p className="text-[#6B7280] text-[14px] font-[400] mb-2">mehar@email.com</p>
                <div className="inline-block px-3 py-1 bg-[#EDE9FE] border border-[#C9C0EC] rounded-full">
                  <span className="text-[#7C3AED] text-[11px] font-[600]">
                    ✦ Member since May 2025
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-[#9CA3AF] text-[11px] font-[600] uppercase tracking-[1px] mb-1">
                  Total Traded
                </div>
                <div className="text-[#0D0D1A] text-[22px] font-[800]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  ${totalTraded.toFixed(2)}
                </div>
              </div>

              <div className="w-px h-12 bg-[#E4DFF5]" />

              <div className="text-center">
                <div className="text-[#9CA3AF] text-[11px] font-[600] uppercase tracking-[1px] mb-1">
                  Positions Won
                </div>
                <div className="text-[#059669] text-[22px] font-[800]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {positionsWon}
                </div>
              </div>

              <div className="w-px h-12 bg-[#E4DFF5]" />

              <div className="text-center">
                <div className="text-[#9CA3AF] text-[11px] font-[600] uppercase tracking-[1px] mb-1">
                  P&L
                </div>
                <div
                  className={`text-[22px] font-[800] ${totalPnL >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'}`}
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Positions Section */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[#0D0D1A] text-[24px] font-[800]">My Positions</h2>

          <div className="bg-white border border-[#E4DFF5] rounded-full p-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-5 py-2 rounded-full transition-all duration-200 border-0 cursor-pointer text-[13px] ${
                activeTab === 'active'
                  ? 'bg-[#7C3AED] text-white font-[600] shadow-[0_2px_8px_rgba(124,58,237,0.25)]'
                  : 'bg-transparent text-[#6B7280] font-[500]'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('settled')}
              className={`px-5 py-2 rounded-full transition-all duration-200 border-0 cursor-pointer text-[13px] ${
                activeTab === 'settled'
                  ? 'bg-[#7C3AED] text-white font-[600] shadow-[0_2px_8px_rgba(124,58,237,0.25)]'
                  : 'bg-transparent text-[#6B7280] font-[500]'
              }`}
            >
              Settled
            </button>
          </div>
        </div>

        <p className="text-[#9CA3AF] text-[13px] font-[400] mb-5">
          {activeTab === 'active'
            ? 'Positions you currently hold — exit anytime before resolution'
            : 'Resolved markets — your final payouts'}
        </p>

        {/* Position Cards */}
        <div className="space-y-3 mb-6">
          {positions.map((position) => (
            <div
              key={position.id}
              className="bg-white border border-[#E4DFF5] rounded-[14px] p-6 hover:border-[#C9C0EC] transition-all duration-200"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
              }}
            >
              <div className="flex items-center gap-4">
                {/* Column 1 - Market */}
                <div className="flex-1">
                  <div className="text-[#9CA3AF] text-[10px] font-[700] uppercase tracking-[1px] mb-1">
                    {position.category}
                  </div>
                  <div className="text-[#0D0D1A] text-[15px] font-[600] mb-1 truncate">
                    {position.question}
                  </div>
                  <div className="text-[#9CA3AF] text-[12px] font-[400]">
                    Resolves {position.resolvesDate}
                  </div>
                </div>

                {/* Column 2 - Position */}
                <div>
                  <div
                    className={`px-4 py-1.5 rounded-full text-[14px] font-[700] ${
                      position.side === 'YES'
                        ? 'bg-[#ECFDF5] border border-[#6EE7B7] text-[#059669]'
                        : 'bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626]'
                    }`}
                  >
                    {position.side}
                  </div>
                </div>

                {/* Column 3 - Shares */}
                <div className="text-right" style={{ minWidth: '100px' }}>
                  <div className="text-[#0D0D1A] text-[15px] font-[600]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {position.shares} shares
                  </div>
                  <div className="text-[#9CA3AF] text-[12px] font-[400]">
                    @ {Math.round(position.pricePerShare * 100)}¢ each
                  </div>
                </div>

                {/* Column 4 - Cost */}
                <div className="text-right" style={{ minWidth: '90px' }}>
                  <div className="text-[#9CA3AF] text-[11px] font-[500] uppercase mb-1">Cost</div>
                  <div className="text-[#0D0D1A] text-[16px] font-[700]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    ${position.cost.toFixed(2)}
                  </div>
                </div>

                {/* Column 5 - Current Value or Outcome */}
                {activeTab === 'active' ? (
                  <div className="text-right" style={{ minWidth: '120px' }}>
                    <div className="text-[#9CA3AF] text-[11px] font-[500] uppercase mb-1">
                      Current Value
                    </div>
                    <div
                      className={`text-[16px] font-[700] ${
                        position.profit! >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'
                      }`}
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      ${position.currentValue!.toFixed(2)}
                    </div>
                    <div
                      className={`text-[12px] font-[500] ${
                        position.profit! >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'
                      }`}
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {position.profit! >= 0 ? '+' : ''}${position.profit!.toFixed(2)} (
                      {((position.profit! / position.cost) * 100).toFixed(0)}%)
                    </div>
                  </div>
                ) : (
                  <div style={{ minWidth: '100px' }}>
                    <div
                      className={`px-4 py-1.5 rounded-full text-[13px] font-[700] ${
                        position.outcome === 'WON'
                          ? 'bg-[#ECFDF5] border border-[#6EE7B7] text-[#059669]'
                          : 'bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626]'
                      }`}
                    >
                      {position.outcome === 'WON' ? '✓ WON' : '✗ LOST'}
                    </div>
                  </div>
                )}

                {/* Column 6 - Action or Payout */}
                {activeTab === 'active' ? (
                  <div className="text-right" style={{ minWidth: '110px' }}>
                    <button
                      onClick={() => onViewMarket(position.id)}
                      className="text-[#7C3AED] text-[13px] font-[600] bg-transparent border-0 cursor-pointer hover:underline"
                    >
                      View Market →
                    </button>
                  </div>
                ) : (
                  <div className="text-right" style={{ minWidth: '130px' }}>
                    {position.outcome === 'WON' ? (
                      <>
                        <div className="text-[#9CA3AF] text-[11px] font-[500] uppercase mb-1">
                          Paid out
                        </div>
                        <div className="text-[#059669] text-[16px] font-[700]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                          ${position.payout!.toFixed(2)} USDC
                        </div>
                        <div className="text-[#059669] text-[12px] font-[500]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                          +${position.profit!.toFixed(2)} profit
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-[#9CA3AF] text-[11px] font-[500] uppercase mb-1">
                          Expired
                        </div>
                        <div className="text-[#DC2626] text-[16px] font-[700]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                          $0.00
                        </div>
                        <div className="text-[#DC2626] text-[12px] font-[500]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                          ${Math.abs(position.profit!).toFixed(2)} lost
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Summary Bar */}
        <div
          className="bg-white border border-[#E4DFF5] rounded-[16px] p-6"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="text-[#9CA3AF] text-[11px] font-[600] uppercase tracking-[1px] mb-1">
                Active Positions
              </div>
              <div className="text-[#0D0D1A] text-[18px] font-[700]">{activeCount} open</div>
            </div>

            <div className="w-px h-12 bg-[#E4DFF5]" />

            <div className="text-center flex-1">
              <div className="text-[#9CA3AF] text-[11px] font-[600] uppercase tracking-[1px] mb-1">
                Total Invested
              </div>
              <div className="text-[#0D0D1A] text-[18px] font-[700]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                ${totalInvested.toFixed(2)} USDC
              </div>
            </div>

            <div className="w-px h-12 bg-[#E4DFF5]" />

            <div className="text-center flex-1">
              <div className="text-[#9CA3AF] text-[11px] font-[600] uppercase tracking-[1px] mb-1">
                Total Won (All time)
              </div>
              <div className="text-[#059669] text-[18px] font-[700]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                ${totalWonAllTime.toFixed(2)} USDC
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
