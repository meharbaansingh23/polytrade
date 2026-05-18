import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Market } from './MarketCard';

interface ResolvedMarketProps {
  market: Market;
  userPosition?: {
    side: 'YES' | 'NO';
    shares: number;
  };
  onBack: () => void;
}

export function ResolvedMarket({ market, userPosition, onBack }: ResolvedMarketProps) {
  const isWinner = userPosition && userPosition.side === market.winner;
  const payout = isWinner ? userPosition.shares * 0.98 : 0;

  return (
    <div className="min-h-screen bg-[#0A0E1A] pb-20">
      <div className="px-4 py-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white bg-transparent border-0 p-0 cursor-pointer mb-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            {market.country === 'southafrica' ? '🇿🇦 South Africa' : '🇵🇭 Philippines'} Markets
          </span>
        </button>
      </div>

      <div className="px-4 py-6">
        <div className="bg-[#161D2E] border border-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-white">{market.question}</h2>
            <div className="px-2 py-1 bg-gray-600 rounded text-xs text-white whitespace-nowrap ml-2">
              RESOLVED
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-400 mb-6">
            <p className="m-0">Source: {market.resolutionSource}</p>
            <p className="m-0">Resolved {market.closesDate}</p>
            <p className="m-0">Final Volume: ${market.volume.toLocaleString()}</p>
          </div>

          <div
            className={`rounded-xl p-6 text-center mb-6 ${
              market.winner === 'YES'
                ? 'bg-[#10B981]/20 border-2 border-[#10B981]'
                : 'bg-[#EF4444]/20 border-2 border-[#EF4444]'
            }`}
          >
            {market.winner === 'YES' ? (
              <>
                <CheckCircle className="w-16 h-16 text-[#10B981] mx-auto mb-3" />
                <p className="text-2xl text-[#10B981] m-0">YES Won</p>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-[#EF4444] mx-auto mb-3" />
                <p className="text-2xl text-[#EF4444] m-0">NO Won</p>
              </>
            )}
          </div>

          {userPosition ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              {isWinner ? (
                <>
                  <p className="text-[#00D4AA] mb-2">🎉 Congratulations!</p>
                  <p className="text-white m-0">
                    You held {userPosition.shares} {userPosition.side} shares → Paid out $
                    {payout.toFixed(2)} USDC (after 2% fee)
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-400 mb-2">Your Position</p>
                  <p className="text-white m-0">
                    You held {userPosition.shares} {userPosition.side} shares → No payout
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 m-0">This market has closed</p>
            </div>
          )}
        </div>

        <div className="bg-[#161D2E] border border-white/10 rounded-xl p-4">
          <h3 className="text-white mb-3">Final Results</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">YES shares</span>
              <span className="text-white">{Math.round(market.yesPrice * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">NO shares</span>
              <span className="text-white">{Math.round(market.noPrice * 100)}%</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/10">
              <span className="text-gray-400">Winning side</span>
              <span
                className={
                  market.winner === 'YES' ? 'text-[#10B981]' : 'text-[#EF4444]'
                }
              >
                {market.winner}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
