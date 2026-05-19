import { useState } from 'react';
import { ArrowLeft, Download, Copy } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRADE' | 'PAYOUT';
  title: string;
  subtitle: string;
  amount: number;
  status: 'Confirmed' | 'Pending' | 'Failed';
  txId: string;
}

const allTransactions: Transaction[] = [
  {
    id: '1',
    date: 'May 11, 2025',
    type: 'DEPOSIT',
    title: 'USDT Deposit via Polygon',
    subtitle: 'Wallet 0x742d...3F4A',
    amount: 100.0,
    status: 'Confirmed',
    txId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  },
  {
    id: '2',
    date: 'May 10, 2025',
    type: 'TRADE',
    title: 'Bought YES — Lagos toll gate',
    subtitle: '50 shares @ 67¢',
    amount: -33.5,
    status: 'Confirmed',
    txId: 'TRD-10042',
  },
  {
    id: '3',
    date: 'May 10, 2025',
    type: 'TRADE',
    title: 'Bought NO — Kenya fuel subsidy',
    subtitle: '30 shares @ 64¢',
    amount: -19.2,
    status: 'Confirmed',
    txId: 'TRD-10041',
  },
  {
    id: '4',
    date: 'May 9, 2025',
    type: 'PAYOUT',
    title: 'Won — Cape Town water restrictions',
    subtitle: '40 YES shares resolved',
    amount: 39.2,
    status: 'Confirmed',
    txId: 'PAY-9831',
  },
  {
    id: '5',
    date: 'May 8, 2025',
    type: 'TRADE',
    title: 'Bought YES — SA load shedding',
    subtitle: '20 shares @ 38¢',
    amount: -7.6,
    status: 'Confirmed',
    txId: 'TRD-10038',
  },
  {
    id: '6',
    date: 'May 7, 2025',
    type: 'WITHDRAWAL',
    title: 'USDT Withdrawal to Polygon',
    subtitle: 'Wallet 0xA3f1...9B2C',
    amount: -50.0,
    status: 'Confirmed',
    txId: '0xA3f1B8c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0',
  },
  {
    id: '7',
    date: 'May 5, 2025',
    type: 'TRADE',
    title: 'Bought YES — SA Rugby World Cup',
    subtitle: '80 shares @ 81¢',
    amount: -64.8,
    status: 'Confirmed',
    txId: 'TRD-10029',
  },
  {
    id: '8',
    date: 'May 3, 2025',
    type: 'PAYOUT',
    title: 'Won — Nairobi expressway toll',
    subtitle: '60 NO shares resolved',
    amount: 58.8,
    status: 'Confirmed',
    txId: 'PAY-9814',
  },
  {
    id: '9',
    date: 'Apr 28, 2025',
    type: 'DEPOSIT',
    title: 'USDT Deposit via Polygon',
    subtitle: 'Wallet 0x742d...3F4A',
    amount: 200.0,
    status: 'Confirmed',
    txId: '0x9Bc2F3a4B5c6D7e8F9a0B1c2D3e4F5a6B7c8D9e0',
  },
  {
    id: '10',
    date: 'Apr 20, 2025',
    type: 'TRADE',
    title: 'Bought NO — Ghana inflation',
    subtitle: '25 shares @ 45¢',
    amount: -11.25,
    status: 'Confirmed',
    txId: 'TRD-9987',
  },
  {
    id: '11',
    date: 'Apr 15, 2025',
    type: 'DEPOSIT',
    title: 'USDT Deposit via Polygon',
    subtitle: 'Wallet 0x742d...3F4A',
    amount: 200.0,
    status: 'Pending',
    txId: '0xD4e8F9a0B1c2D3e4F5a6B7c8D9e0F1a2B3c4D5e6',
  },
  {
    id: '12',
    date: 'Apr 10, 2025',
    type: 'WITHDRAWAL',
    title: 'USDT Withdrawal to Polygon',
    subtitle: 'Wallet 0xA3f1...9B2C',
    amount: -100.0,
    status: 'Failed',
    txId: '0xF2a1B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0',
  },
];

interface TransactionHistoryProps {
  onBack: () => void;
}

export function TransactionHistory({ onBack }: TransactionHistoryProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'deposits' | 'withdrawals' | 'trades' | 'payouts'>('all');
  const [copiedTxId, setCopiedTxId] = useState<string | null>(null);

  const filteredTransactions = allTransactions.filter((tx) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'deposits') return tx.type === 'DEPOSIT';
    if (activeTab === 'withdrawals') return tx.type === 'WITHDRAWAL';
    if (activeTab === 'trades') return tx.type === 'TRADE';
    if (activeTab === 'payouts') return tx.type === 'PAYOUT';
    return true;
  });

  const handleCopyTxId = (txId: string, id: string) => {
    navigator.clipboard.writeText(txId);
    setCopiedTxId(id);
    setTimeout(() => setCopiedTxId(null), 2000);
  };

  const truncateTxId = (txId: string) => {
    if (txId.startsWith('0x') && txId.length > 20) {
      return `${txId.slice(0, 6)}...${txId.slice(-4)}`;
    }
    return txId;
  };

  const getTypeBadge = (type: Transaction['type']) => {
    switch (type) {
      case 'DEPOSIT':
        return 'bg-[#EDE9FE] text-[#7C3AED]';
      case 'WITHDRAWAL':
        return 'bg-[#FEF2F2] text-[#DC2626]';
      case 'TRADE':
        return 'bg-[#F0F9FF] text-[#0284C7]';
      case 'PAYOUT':
        return 'bg-[#ECFDF5] text-[#059669]';
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-[#ECFDF5] border-[#6EE7B7] text-[#059669]';
      case 'Pending':
        return 'bg-[#FEF9EC] border-[#FDE68A] text-[#D97706]';
      case 'Failed':
        return 'bg-[#FEF2F2] border-[#FCA5A5] text-[#DC2626]';
    }
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'Confirmed':
        return '✓ ';
      case 'Pending':
        return '⏱ ';
      case 'Failed':
        return '✗ ';
    }
  };

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'deposits', label: 'Deposits' },
    { key: 'withdrawals', label: 'Withdrawals' },
    { key: 'trades', label: 'Trades' },
    { key: 'payouts', label: 'Payouts' },
  ];

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-16">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#0D0D1A] bg-transparent border-0 p-0 cursor-pointer text-[13px] font-[400] transition-colors duration-200 mb-6 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Markets</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[#0D0D1A] text-[22px] md:text-[32px] font-[800]">Transaction History</h1>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-[#E4DFF5] rounded-[10px] hover:border-[#C9C0EC] transition-colors cursor-pointer text-[#6B7280] text-[13px] font-[600]">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Filter tabs — horizontally scrollable on mobile */}
        <div className="overflow-x-auto pb-1 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="bg-white border border-[#E4DFF5] rounded-[12px] p-1 inline-flex gap-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 md:px-5 py-2 rounded-[8px] text-[13px] font-[600] transition-all duration-200 border-0 cursor-pointer min-h-[40px] ${
                  activeTab === tab.key
                    ? 'bg-[#7C3AED] text-white'
                    : 'bg-transparent text-[#6B7280]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="bg-white border border-[#E4DFF5] rounded-[14px] p-4 md:p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="text-[#9CA3AF] text-[10px] md:text-[11px] font-[600] uppercase tracking-[1px] mb-2">
              Total Deposited
            </div>
            <div className="text-[#0D0D1A] text-[18px] md:text-[22px] font-[800]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              $500.00 USDT
            </div>
          </div>

          <div className="bg-white border border-[#E4DFF5] rounded-[14px] p-4 md:p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="text-[#9CA3AF] text-[10px] md:text-[11px] font-[600] uppercase tracking-[1px] mb-2">
              Total Withdrawn
            </div>
            <div className="text-[#0D0D1A] text-[18px] md:text-[22px] font-[800]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              $250.00 USDT
            </div>
          </div>

          <div className="bg-white border border-[#E4DFF5] rounded-[14px] p-4 md:p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="text-[#9CA3AF] text-[10px] md:text-[11px] font-[600] uppercase tracking-[1px] mb-2">
              Total Won
            </div>
            <div className="text-[#059669] text-[18px] md:text-[22px] font-[800]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              $98.00 USDT
            </div>
          </div>

          <div className="bg-white border border-[#E4DFF5] rounded-[14px] p-4 md:p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="text-[#9CA3AF] text-[10px] md:text-[11px] font-[600] uppercase tracking-[1px] mb-2">
              Net P&L
            </div>
            <div className="text-[#059669] text-[18px] md:text-[22px] font-[800]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              +$87.40 USDT
            </div>
          </div>
        </div>

        {/* Transaction list */}
        <div className="bg-white border border-[#E4DFF5] rounded-[16px] overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>

          {/* Desktop table header */}
          <div className="hidden md:flex bg-[#F7F5FF] border-b border-[#E4DFF5] px-6 py-3.5 items-center gap-4">
            <div className="text-[#9CA3AF] text-[11px] font-[700] uppercase tracking-[1px]" style={{ flex: '1.2' }}>Date</div>
            <div className="text-[#9CA3AF] text-[11px] font-[700] uppercase tracking-[1px]" style={{ flex: '0.8' }}>Type</div>
            <div className="text-[#9CA3AF] text-[11px] font-[700] uppercase tracking-[1px]" style={{ flex: '3' }}>Description</div>
            <div className="text-[#9CA3AF] text-[11px] font-[700] uppercase tracking-[1px] text-right" style={{ flex: '1' }}>Amount</div>
            <div className="text-[#9CA3AF] text-[11px] font-[700] uppercase tracking-[1px] text-center" style={{ flex: '1.2' }}>Status</div>
            <div className="text-[#9CA3AF] text-[11px] font-[700] uppercase tracking-[1px] text-right" style={{ flex: '1.5' }}>TxID / Reference</div>
          </div>

          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="border-b border-[#F3F4F6] last:border-0">

              {/* Desktop row */}
              <div className="hidden md:flex px-6 py-4 items-center gap-4 hover:bg-[#F9F8FF] transition-colors group">
                <div className="text-[#6B7280] text-[13px] font-[500]" style={{ flex: '1.2' }}>{tx.date}</div>
                <div style={{ flex: '0.8' }}>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-[700] ${getTypeBadge(tx.type)}`}>
                    {tx.type}
                  </span>
                </div>
                <div style={{ flex: '3' }}>
                  <div className="text-[#0D0D1A] text-[14px] font-[600]">{tx.title}</div>
                  <div className="text-[#9CA3AF] text-[12px] font-[400] mt-0.5">{tx.subtitle}</div>
                </div>
                <div
                  className={`text-[15px] font-[700] text-right ${tx.amount >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'}`}
                  style={{ flex: '1', fontVariantNumeric: 'tabular-nums' }}
                >
                  {tx.amount >= 0 ? '+' : ''}${tx.amount.toFixed(2)}
                </div>
                <div className="flex justify-center" style={{ flex: '1.2' }}>
                  <span className={`border px-2.5 py-1 rounded-full text-[11px] font-[600] ${getStatusBadge(tx.status)}`}>
                    {getStatusIcon(tx.status)}{tx.status}
                  </span>
                </div>
                <div className="text-right" style={{ flex: '1.5' }}>
                  <button
                    onClick={() => handleCopyTxId(tx.txId, tx.id)}
                    className="text-[#9CA3AF] text-[12px] font-[500] font-mono hover:text-[#7C3AED] transition-colors bg-transparent border-0 cursor-pointer flex items-center gap-2 ml-auto"
                  >
                    <span>{truncateTxId(tx.txId)}</span>
                    {copiedTxId === tx.id ? (
                      <span className="text-[#7C3AED] text-[11px] font-[600]">Copied!</span>
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile card */}
              <div className="md:hidden px-4 py-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="text-[#0D0D1A] text-[14px] font-[600]">{tx.title}</div>
                    <div className="text-[#9CA3AF] text-[12px] font-[400] mt-0.5">{tx.subtitle}</div>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-[700] ${getTypeBadge(tx.type)}`}>
                    {tx.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-[17px] font-[800] ${tx.amount >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'}`}
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {tx.amount >= 0 ? '+' : ''}${tx.amount.toFixed(2)}
                    </div>
                    <span className={`border px-2 py-0.5 rounded-full text-[11px] font-[600] ${getStatusBadge(tx.status)}`}>
                      {getStatusIcon(tx.status)}{tx.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-right">
                    <span className="text-[#9CA3AF] text-[11px] font-[400]">{tx.date}</span>
                    <button
                      onClick={() => handleCopyTxId(tx.txId, tx.id)}
                      className="flex items-center gap-1 text-[#9CA3AF] hover:text-[#7C3AED] transition-colors bg-transparent border-0 cursor-pointer p-0 min-h-[44px]"
                    >
                      <span className="text-[11px] font-[500] font-mono">{truncateTxId(tx.txId)}</span>
                      {copiedTxId === tx.id ? (
                        <span className="text-[#7C3AED] text-[11px] font-[600]">✓</span>
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t border-[#E4DFF5] px-4 md:px-6 py-4 flex items-center justify-between mt-0 rounded-b-[16px]">
          <div className="text-[#9CA3AF] text-[13px] font-[500]">
            Showing {filteredTransactions.length} of {allTransactions.length}
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[#6B7280] text-[13px] font-[600] px-3 py-1 bg-transparent border-0 cursor-pointer hover:text-[#0D0D1A] min-h-[44px]">
              ← Prev
            </button>
            <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-[13px] font-[600]">
              1
            </div>
            <button className="text-[#6B7280] text-[13px] font-[600] px-3 py-1 bg-transparent border-0 cursor-pointer hover:text-[#0D0D1A] min-h-[44px]">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
