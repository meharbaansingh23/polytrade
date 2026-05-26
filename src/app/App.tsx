import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MarketCard, Market } from './components/MarketCard';
import { WalletModal, Position } from './components/WalletModal';
import { MarketDetail } from './components/MarketDetail';
import { Profile } from './components/Profile';
import { TransactionHistory } from './components/TransactionHistory';
import { WaitlistModal } from './components/WaitlistModal';
import { Footer } from './components/Footer';

const mockMarkets: Market[] = [
  {
    id: '1',
    question: 'Will the Lagos toll gate reopen before August 31, 2025?',
    yesPrice: 0.67,
    noPrice: 0.33,
    volume: 4200,
    closesDate: 'Aug 31, 2025',
    country: 'southafrica',
    category: 'Infrastructure',
    resolutionSource: 'Lagos State Government',
  },
  {
    id: '2',
    question: 'Will Kenya implement a fuel subsidy by June 2026?',
    yesPrice: 0.45,
    noPrice: 0.55,
    volume: 8500,
    closesDate: 'Jun 30, 2026',
    country: 'southafrica',
    category: 'Energy',
    resolutionSource: 'Kenya Ministry of Energy',
  },
  {
    id: '3',
    question: 'Will Cape Town water restrictions ease by December 2025?',
    yesPrice: 0.72,
    noPrice: 0.28,
    volume: 3100,
    closesDate: 'Dec 31, 2025',
    country: 'southafrica',
    category: 'Environment',
    resolutionSource: 'City of Cape Town',
  },
  {
    id: '4',
    question: "Will South Africa's load shedding end before March 2026?",
    yesPrice: 0.38,
    noPrice: 0.62,
    volume: 11200,
    closesDate: 'Mar 31, 2026',
    country: 'southafrica',
    category: 'Energy',
    resolutionSource: 'Eskom Official Reports',
  },
  {
    id: '5',
    question: 'Will the Gautrain expand to Soweto by 2027?',
    yesPrice: 0.29,
    noPrice: 0.71,
    volume: 2800,
    closesDate: 'Dec 31, 2027',
    country: 'southafrica',
    category: 'Infrastructure',
    resolutionSource: 'Gautrain Management',
  },
  {
    id: '6',
    question: "Will Nigeria's naira stabilize below ₦1,500/USD by October?",
    yesPrice: 0.41,
    noPrice: 0.59,
    volume: 6700,
    closesDate: 'Oct 31, 2026',
    country: 'southafrica',
    category: 'Economy',
    resolutionSource: 'Central Bank of Nigeria',
  },
  {
    id: '7',
    question: "Will Ghana's inflation drop below 15% by September 2025?",
    yesPrice: 0.55,
    noPrice: 0.45,
    volume: 4900,
    closesDate: 'Sep 30, 2025',
    country: 'southafrica',
    category: 'Economy',
    resolutionSource: 'Ghana Statistical Service',
  },
  {
    id: '8',
    question: 'Will the Nairobi expressway toll be removed by year end?',
    yesPrice: 0.22,
    noPrice: 0.78,
    volume: 3300,
    closesDate: 'Dec 31, 2026',
    country: 'southafrica',
    category: 'Infrastructure',
    resolutionSource: 'Kenya National Highways',
  },
  {
    id: '9',
    question: 'Will South Africa host the 2027 Rugby World Cup?',
    yesPrice: 0.81,
    noPrice: 0.19,
    volume: 9400,
    closesDate: 'Jun 30, 2026',
    country: 'southafrica',
    category: 'Sports',
    resolutionSource: 'World Rugby',
  },
  {
    id: '10',
    question: 'Will Eskom be privatized before 2027?',
    yesPrice: 0.18,
    noPrice: 0.82,
    volume: 7600,
    closesDate: 'Dec 31, 2026',
    country: 'southafrica',
    category: 'Politics',
    resolutionSource: 'SA Government',
  },
  {
    id: '11',
    question: 'Will Nigeria hold gubernatorial elections without postponement?',
    yesPrice: 0.63,
    noPrice: 0.37,
    volume: 5100,
    closesDate: 'Nov 30, 2026',
    country: 'southafrica',
    category: 'Politics',
    resolutionSource: 'INEC Nigeria',
  },
  {
    id: '12',
    question: "Will Kenya's SGR extend to Uganda by December 2026?",
    yesPrice: 0.34,
    noPrice: 0.66,
    volume: 4400,
    closesDate: 'Dec 31, 2026',
    country: 'southafrica',
    category: 'Infrastructure',
    resolutionSource: 'Kenya Railways',
  },
  // Poland
  {
    id: 'pl1',
    question: "Will PM Donald Tusk's coalition survive until the 2027 parliamentary elections without collapse?",
    yesPrice: 0.58,
    noPrice: 0.42,
    volume: 7800,
    closesDate: 'Dec 31, 2026',
    country: 'poland',
    category: 'Politics',
    resolutionSource: 'Polish Parliament Records',
  },
  {
    id: 'pl2',
    question: 'Will President Nawrocki veto more than 10 government bills before the end of 2026?',
    yesPrice: 0.71,
    noPrice: 0.29,
    volume: 5400,
    closesDate: 'Dec 31, 2026',
    country: 'poland',
    category: 'Politics',
    resolutionSource: 'Polish Presidential Office',
  },
  {
    id: 'pl3',
    question: "Will Poland's GDP growth exceed 3.5% in 2026?",
    yesPrice: 0.52,
    noPrice: 0.48,
    volume: 6200,
    closesDate: 'Mar 31, 2027',
    country: 'poland',
    category: 'Economy',
    resolutionSource: 'Polish Statistical Office (GUS)',
  },
  {
    id: 'pl4',
    question: 'Will inflation in Poland fall below 3% by December 2026?',
    yesPrice: 0.61,
    noPrice: 0.39,
    volume: 4900,
    closesDate: 'Jan 15, 2027',
    country: 'poland',
    category: 'Economy',
    resolutionSource: 'National Bank of Poland',
  },
  {
    id: 'pl5',
    question: "Will Poland's defence spending reach 5% of GDP by end of 2026?",
    yesPrice: 0.67,
    noPrice: 0.33,
    volume: 8100,
    closesDate: 'Mar 31, 2027',
    country: 'poland',
    category: 'Defence',
    resolutionSource: 'Polish Ministry of National Defence',
  },
  {
    id: 'pl6',
    question: 'Will US troops be permanently stationed in Poland by end of 2026?',
    yesPrice: 0.44,
    noPrice: 0.56,
    volume: 9300,
    closesDate: 'Dec 31, 2026',
    country: 'poland',
    category: 'Defence',
    resolutionSource: 'US Department of Defense',
  },
  {
    id: 'pl7',
    question: 'Will construction begin on the Central Communication Port (CPK) airport before October 2026?',
    yesPrice: 0.38,
    noPrice: 0.62,
    volume: 5700,
    closesDate: 'Oct 31, 2026',
    country: 'poland',
    category: 'Infrastructure',
    resolutionSource: 'CPK Official Authority',
  },
  {
    id: 'pl8',
    question: 'Will Poland approve a nuclear power plant construction contract before end of 2026?',
    yesPrice: 0.29,
    noPrice: 0.71,
    volume: 7200,
    closesDate: 'Dec 31, 2026',
    country: 'poland',
    category: 'Energy',
    resolutionSource: 'Polish Ministry of Climate',
  },
  {
    id: 'pl9',
    question: 'Will the Polish zloty strengthen past 4.0 per Euro by September 2026?',
    yesPrice: 0.33,
    noPrice: 0.67,
    volume: 4400,
    closesDate: 'Sep 30, 2026',
    country: 'poland',
    category: 'Economy',
    resolutionSource: 'National Bank of Poland',
  },
  {
    id: 'pl10',
    question: 'Will PiS poll above 30% nationally before the end of 2026?',
    yesPrice: 0.41,
    noPrice: 0.59,
    volume: 6600,
    closesDate: 'Dec 31, 2026',
    country: 'poland',
    category: 'Politics',
    resolutionSource: 'Aggregated Polish Polling Data',
  },
  {
    id: 'pl11',
    question: "Will Warsaw's third Metro line open its first station before December 2026?",
    yesPrice: 0.45,
    noPrice: 0.55,
    volume: 3800,
    closesDate: 'Dec 31, 2026',
    country: 'poland',
    category: 'Infrastructure',
    resolutionSource: 'Warsaw Metro Authority',
  },
  {
    id: 'pl12',
    question: 'Will Poland receive full KPO EU recovery fund disbursement before end of 2026?',
    yesPrice: 0.73,
    noPrice: 0.27,
    volume: 8900,
    closesDate: 'Dec 31, 2026',
    country: 'poland',
    category: 'Economy',
    resolutionSource: 'European Commission',
  },
  // Philippines
  {
    id: '13',
    question: 'Will the Manila subway Line 1 extension open before March 2027?',
    yesPrice: 0.38,
    noPrice: 0.62,
    volume: 6700,
    closesDate: 'Mar 31, 2027',
    country: 'philippines',
    category: 'Infrastructure',
    resolutionSource: 'DOTr Philippines',
  },
  {
    id: '14',
    question: 'Will Cebu City complete the BRT project by July 2026?',
    yesPrice: 0.55,
    noPrice: 0.45,
    volume: 2900,
    closesDate: 'Jul 31, 2026',
    country: 'philippines',
    category: 'Infrastructure',
    resolutionSource: 'Cebu City Transport',
  },
  {
    id: '15',
    question: 'Will Manila Bay cleanup reach 80% compliance by 2026?',
    yesPrice: 0.47,
    noPrice: 0.53,
    volume: 3800,
    closesDate: 'Dec 31, 2026',
    country: 'philippines',
    category: 'Environment',
    resolutionSource: 'DENR Philippines',
  },
  {
    id: '16',
    question: 'Will Mindanao achieve 24/7 power by December 2026?',
    yesPrice: 0.31,
    noPrice: 0.69,
    volume: 5200,
    closesDate: 'Dec 31, 2026',
    country: 'philippines',
    category: 'Energy',
    resolutionSource: 'DOE Philippines',
  },
  {
    id: '17',
    question: 'Will the Bataan nuclear plant restart before 2028?',
    yesPrice: 0.24,
    noPrice: 0.76,
    volume: 4100,
    closesDate: 'Dec 31, 2027',
    country: 'philippines',
    category: 'Energy',
    resolutionSource: 'PNRI',
  },
  {
    id: '18',
    question: 'Will Philippine peso stabilize below ₱55/USD by June 2026?',
    yesPrice: 0.58,
    noPrice: 0.42,
    volume: 7300,
    closesDate: 'Jun 30, 2026',
    country: 'philippines',
    category: 'Economy',
    resolutionSource: 'BSP Philippines',
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(124.5);
  const [selectedCountry, setSelectedCountry] = useState<'southafrica' | 'philippines' | 'poland'>(
    'southafrica'
  );
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [waitlistTradeContext, setWaitlistTradeContext] = useState<{
    side: 'YES' | 'NO';
    marketQuestion: string;
  } | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [depositJustVerified, setDepositJustVerified] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  const [positions] = useState<Position[]>([
    {
      marketName: 'Lagos toll gate...',
      side: 'YES',
      shares: 50,
      value: 33.5,
    },
    {
      marketName: 'Kenya fuel subsidy...',
      side: 'NO',
      shares: 30,
      value: 19.2,
    },
    {
      marketName: 'SA load shedding...',
      side: 'YES',
      shares: 20,
      value: 7.6,
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedMarket, showProfile, showTransactionHistory]);

  const filteredMarkets = mockMarkets.filter((m) => m.country === selectedCountry);

  const handleWaitlistClick = (tradeContext?: { side: 'YES' | 'NO'; marketQuestion: string }) => {
    setWaitlistTradeContext(tradeContext || null);
    setShowWaitlistModal(true);
  };

  const handleWaitlistClose = () => {
    setShowWaitlistModal(false);
    setWaitlistTradeContext(null);
  };

  const handleViewMarket = (marketId: string) => {
    const market = mockMarkets.find((m) => m.id === marketId);
    if (market) {
      setSelectedMarket(market);
      setShowProfile(false);
    }
  };

  const handleBalanceUpdate = (newBalance: number) => {
    setBalance(newBalance);
    setDepositJustVerified(true);
  };

  const handleWalletModalClose = () => {
    setShowWalletModal(false);
    setDepositJustVerified(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfile(false);
    setShowTransactionHistory(false);
    setSelectedMarket(null);
  };

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] relative"
      style={{
        backgroundImage: `radial-gradient(circle, #FFE8DE 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(800px circle at 50% 120px, rgba(255, 76, 0, 0.03), transparent),
            radial-gradient(400px circle at 90% 10%, rgba(255, 130, 79, 0.02), transparent),
            radial-gradient(500px circle at 10% 90%, rgba(255, 76, 0, 0.02), transparent)
          `,
        }}
      />

      <Header
        isLoggedIn={isLoggedIn}
        balance={balance}
        onWaitlistClick={() => handleWaitlistClick()}
        onBalanceClick={() => setShowWalletModal(true)}
        onWalletClick={() => setShowWalletModal(true)}
        onProfileClick={() => {
          setShowProfile(true);
          setShowTransactionHistory(false);
        }}
        onTransactionHistory={() => {
          setShowTransactionHistory(true);
          setShowProfile(false);
        }}
        onLogout={handleLogout}
        userInitials="MB"
      />

      {showTransactionHistory ? (
        <TransactionHistory onBack={() => setShowTransactionHistory(false)} />
      ) : showProfile ? (
        <Profile onBack={() => setShowProfile(false)} onViewMarket={handleViewMarket} />
      ) : selectedMarket ? (
        <MarketDetail
          market={selectedMarket}
          onBack={() => setSelectedMarket(null)}
          onWaitlistClick={(side, marketQuestion) =>
            handleWaitlistClick({ side, marketQuestion })
          }
        />
      ) : (
        <main className="relative z-10">
          <div className="pt-[68px] md:pt-24 pb-10 md:pb-14">
            <div className="max-w-[840px] mx-auto text-center px-4 md:px-8">
              <div className="inline-block px-3.5 py-1.5 bg-[#FFF0EB] border border-[#FFD4C2] rounded-full mb-5">
                <span className="text-[12px] font-[600] text-[#FF4C00]">✦ PREDICTION MARKETS · LIVE NOW</span>
              </div>
              <h1 className="text-[#1D1D1D] text-[36px] md:text-[52px] lg:text-[64px] tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px] leading-[1.1] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                Your local knowledge,
                <br />
                <span className="relative inline-block">
                  Is real money.
                  <svg
                    className="absolute left-0 right-0 bottom-0"
                    style={{ height: '8px', width: '100%' }}
                    viewBox="0 0 300 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,4 Q75,0 150,4 T300,4"
                      stroke="#FF4C00"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-[16px] font-[400] text-[#6B6B6B] max-w-[480px] mx-auto leading-[1.6]">
                Trade YES or NO on real events in your city. Win USDT if you're right.
              </p>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <div className="flex justify-center mb-3 px-2">
              <div
                className="bg-white border border-[#F0F0F0] rounded-full p-1 flex flex-nowrap overflow-x-auto"
                style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none' }}
              >
                {(
                  [
                    { key: 'southafrica', label: '🇿🇦 South Africa' },
                    { key: 'philippines', label: '🇵🇭 Philippines' },
                    { key: 'poland',      label: '🇵🇱 Poland' },
                  ] as const
                ).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCountry(key)}
                    className={`px-3 py-2 md:px-5 md:py-2 rounded-full transition-all duration-200 border-0 cursor-pointer text-[13px] md:text-[14px] shrink-0 whitespace-nowrap ${
                      selectedCountry === key
                        ? 'bg-[#FF4C00] text-white font-[600] shadow-[0_2px_8px_rgba(255,76,0,0.25)]'
                        : 'bg-transparent text-[#6B6B6B] font-[500]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-[1280px] mx-auto pb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMarkets.map((market) => (
                  <MarketCard
                    key={market.id}
                    market={market}
                    onClick={() => setSelectedMarket(market)}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {showWaitlistModal && (
        <WaitlistModal
          onClose={handleWaitlistClose}
          tradeContext={waitlistTradeContext || undefined}
        />
      )}

      {showWalletModal && (
        <WalletModal
          balance={balance}
          positions={positions}
          onClose={handleWalletModalClose}
          onBalanceUpdate={handleBalanceUpdate}
          depositJustVerified={depositJustVerified}
        />
      )}

      <Footer />
    </div>
  );
}