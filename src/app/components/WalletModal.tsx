import { useState } from 'react';
import { X, Copy, ArrowLeft, Check } from 'lucide-react';

export interface Position {
  marketName: string;
  side: 'YES' | 'NO';
  shares: number;
  value: number;
}

interface WalletModalProps {
  balance: number;
  positions: Position[];
  onClose: () => void;
  onBalanceUpdate?: (newBalance: number) => void;
  depositJustVerified?: boolean;
}

export function WalletModal({ balance, positions, onClose, onBalanceUpdate, depositJustVerified = false }: WalletModalProps) {
  const [mode, setMode] = useState<'main' | 'deposit' | 'deposit-submitted' | 'withdraw-entry' | 'withdraw-confirm' | 'withdraw-success'>('main');
  const [txHash, setTxHash] = useState('');
  const [selectedDepositAmount, setSelectedDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [selectedWithdrawAmount, setSelectedWithdrawAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('Polygon');

  const depositWalletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
  const depositAmountValue = selectedDepositAmount === 'Custom' ? '100' : selectedDepositAmount.replace('$', '');
  const truncatedTxHash = txHash.slice(0, 6) + '...' + txHash.slice(-4);

  const handleCopy = () => {
    navigator.clipboard.writeText(depositWalletAddress);
  };

  const handleSubmitDeposit = () => {
    setMode('deposit-submitted');
  };

  const handleBackToMarkets = () => {
    const depositAmount = parseFloat(depositAmountValue);
    if (onBalanceUpdate && !isNaN(depositAmount)) {
      onBalanceUpdate(balance + depositAmount);
    }
    onClose();
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setWithdrawAddress(text);
  };

  const handleMaxWithdraw = () => {
    setWithdrawAmount(balance.toFixed(2));
    setSelectedWithdrawAmount('All');
  };

  const handleQuickWithdraw = (amount: string) => {
    setSelectedWithdrawAmount(amount);
    if (amount === 'All') {
      setWithdrawAmount(balance.toFixed(2));
    } else {
      setWithdrawAmount(amount.replace('$', ''));
    }
  };

  const isWithdrawValid = withdrawAmount && parseFloat(withdrawAmount) >= 10 && withdrawAddress;

  const withdrawAmountNum = parseFloat(withdrawAmount) || 0;
  const newBalance = balance - withdrawAmountNum;
  const truncatedAddress = withdrawAddress.slice(0, 6) + '...' + withdrawAddress.slice(-4);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: 'rgba(29, 29, 29, 0.4)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="bg-white border border-[#F0F0F0] rounded-[16px] md:rounded-[24px] p-5 md:p-9 w-full max-w-[560px] relative"
        style={{ boxShadow: '0 20px 64px rgba(0,0,0,0.12)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#6B6B6B] hover:text-[#1D1D1D] bg-transparent border-0 p-0 cursor-pointer transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {mode === 'main' && (
          <>
            <h2 className="text-[#1D1D1D] mb-4 text-[22px] font-[800]">Your Wallet</h2>

            <div className="text-center mb-5">
              <div className="text-[36px] font-[900] text-[#FF4C00] mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
                ${balance.toFixed(2)} USDT
              </div>
            </div>

            {depositJustVerified && (
              <div className="bg-[#ECFDF5] border border-[#6EE7B7] rounded-[10px] p-2.5 px-4 mb-5 flex items-center gap-2 text-left">
                <span className="text-[#16A34A] text-[18px]">✓</span>
                <div className="flex items-center gap-2 flex-wrap text-[13px]">
                  <span className="text-[#16A34A] font-[600]">Your $100.00 deposit was confirmed</span>
                  <span className="text-[#6B6B6B]">·</span>
                  <span className="text-[#6B6B6B] font-[400]">May 11, 2025</span>
                </div>
              </div>
            )}

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setMode('deposit')}
                className="flex-1 bg-[#FF4C00] text-white py-3 rounded-[10px] border-0 cursor-pointer hover:bg-[#E64400] transition-all duration-200 text-[14px] font-[600] h-11"
                style={{ boxShadow: '0 2px 8px rgba(255, 76, 0, 0.3)' }}
              >
                Deposit +
              </button>
              <button
                onClick={() => setMode('withdraw-entry')}
                className="flex-1 border border-[#F0F0F0] bg-[#FAFAFA] text-[#6B6B6B] py-3 rounded-[10px] cursor-pointer hover:bg-[#FFF0EB] hover:border-[#FFD4C2] hover:text-[#1D1D1D] transition-all duration-200 text-[14px] font-[600] h-11"
              >
                Withdraw
              </button>
            </div>

            <div className="border-t border-[#F0F0F0] pt-6">
              <div className="text-[11px] font-[700] text-[#6B6B6B] uppercase tracking-[1.5px] mb-4">
                OPEN POSITIONS
              </div>
              <div className="space-y-0">
                {positions.map((position, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3.5 border-b border-[#F3F4F6] last:border-0"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <span className="text-[#1D1D1D] truncate text-[14px] font-[600]">
                        {position.marketName}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-[700] shrink-0 ${
                          position.side === 'YES'
                            ? 'bg-[#ECFDF5] border border-[#6EE7B7] text-[#16A34A]'
                            : 'bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626]'
                        }`}
                      >
                        {position.side}
                      </span>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-[#6B6B6B] text-[13px] font-[400]">
                        {position.shares} shares
                      </div>
                      <div className="text-[#1D1D1D] text-[15px] font-[700]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        ${position.value.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {mode === 'deposit' && (
          <>
            <button
              onClick={() => setMode('main')}
              className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#1D1D1D] mb-5 bg-transparent border-0 p-0 cursor-pointer text-[14px] font-[500] transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <h2 className="text-[#1D1D1D] mb-5 text-[22px] font-[800]">Deposit USDT</h2>

            <div className="mb-6">
              <p className="text-[#6B6B6B] text-[11px] font-[700] uppercase tracking-[1px] mb-3">
                SEND TO THIS ADDRESS:
              </p>

              <div className="bg-[#FAFAFA] border border-[#F0F0F0] rounded-[12px] p-4">
                <div className="flex items-center justify-between mb-3">
                  <code className="text-[#1D1D1D] text-[13px] font-[600] font-mono break-all pr-2">
                    {depositWalletAddress}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="bg-[#FFF0EB] text-[#FF4C00] px-3 py-1.5 rounded-md text-[13px] font-[600] border-0 cursor-pointer hover:bg-[#FFE8DE] transition-colors shrink-0"
                  >
                    Copy
                  </button>
                </div>
                <div className="inline-block px-2.5 py-1 bg-[#FFF0EB] border border-[#FFD4C2] text-[#FF4C00] text-[11px] font-[600] rounded-full">
                  Polygon Network
                </div>
              </div>
            </div>

            <div className="border-t border-[#F0F0F0] pt-6 mb-6">
              <h3 className="text-[#1D1D1D] mb-4 text-[14px] font-[700]">Confirm your transfer:</h3>

              <input
                type="text"
                placeholder="Paste transaction hash (TxID)"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                className="w-full bg-white border border-[#F0F0F0] rounded-[10px] px-4 py-3 text-[#1D1D1D] mb-4 focus:outline-none focus:border-[#FF4C00] focus:shadow-[0_0_0_3px_rgba(255,76,0,0.12)] transition-all duration-200 text-[14px] placeholder:text-[#6B6B6B]"
              />

              <div className="mb-4">
                <label className="text-[#6B6B6B] text-[12px] font-[600] block mb-2">Amount sent</label>
                <div className="flex gap-2">
                  {['$10', '$25', '$50', '$100', 'Custom'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setSelectedDepositAmount(amt)}
                      className={`flex-1 py-2 rounded-full text-[13px] font-[600] transition-all duration-200 border-0 cursor-pointer ${
                        selectedDepositAmount === amt
                          ? 'bg-[#FF4C00] text-white'
                          : 'bg-[#FAFAFA] border border-[#F0F0F0] text-[#6B6B6B] hover:text-[#1D1D1D] hover:border-[#FFD4C2]'
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmitDeposit}
                className="w-full bg-[#FF4C00] text-white py-3 rounded-[10px] border-0 cursor-pointer hover:bg-[#E64400] transition-all duration-200 text-[14px] font-[700] h-12"
              >
                Submit for Verification
              </button>
            </div>

            <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-[10px] p-4 text-[12px] font-[400] text-[#78350F]">
              ⏱ Funds appear within 2 hours after manual verification
            </div>
          </>
        )}

        {mode === 'deposit-submitted' && (
          <div className="text-center py-6">
            <div
              className="w-20 h-20 mx-auto mb-5 rounded-full bg-[#FEF9EC] border-2 border-[#FDE68A] flex items-center justify-center"
            >
              <span className="text-[36px]">⏱</span>
            </div>

            <h2 className="text-[#1D1D1D] text-[26px] font-[800] mb-2">Submission Received</h2>

            <p className="text-[#6B6B6B] text-[14px] font-[400] leading-[1.6] max-w-[340px] mx-auto mb-6">
              We've received your transfer details and will verify your deposit manually.
            </p>

            <div className="bg-[#FAFAFA] border border-[#F0F0F0] rounded-[14px] p-5 mb-5">
              <div className="space-y-0">
                <div className="flex items-center justify-between py-2.5 border-b border-[#F3F4F6]">
                  <span className="text-[#6B6B6B] text-[14px] font-[400]">Amount</span>
                  <span className="text-[#1D1D1D] text-[15px] font-[700]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    ${depositAmountValue}.00 USDT
                  </span>
                </div>

                <div className="flex items-center justify-between py-2.5 border-b border-[#F3F4F6]">
                  <span className="text-[#6B6B6B] text-[14px] font-[400]">Network</span>
                  <span className="text-[#1D1D1D] text-[14px] font-[600]">Polygon</span>
                </div>

                <div className="flex items-center justify-between py-2.5 border-b border-[#F3F4F6]">
                  <span className="text-[#6B6B6B] text-[14px] font-[400]">TxID</span>
                  <code className="text-[#6B6B6B] text-[13px] font-[500] font-mono">
                    {txHash ? truncatedTxHash : '0x3a4f...7b2c'}
                  </code>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <span className="text-[#6B6B6B] text-[14px] font-[400]">Status</span>
                  <div className="bg-[#FEF9EC] border border-[#FDE68A] text-[#D97706] px-2.5 py-1 rounded-full text-[12px] font-[600]">
                    Pending Review
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF0EB] border border-[#FFD4C2] rounded-[12px] p-4 mb-6 flex gap-3 text-left">
              <div className="text-[#FF4C00] text-[20px] flex-shrink-0">ⓘ</div>
              <div>
                <div className="text-[#FF4C00] text-[13px] font-[700] mb-1">What happens next?</div>
                <div className="text-[#6B6B6B] text-[13px] font-[400] leading-[1.5]">
                  Our team reviews your transaction on-chain. Once confirmed, your USDT balance updates automatically. This usually takes under 2 hours.
                </div>
              </div>
            </div>

            <button
              onClick={handleBackToMarkets}
              className="w-full bg-[#FF4C00] text-white py-3.5 rounded-[12px] border-0 cursor-pointer hover:bg-[#E64400] transition-all duration-200 text-[15px] font-[700] mb-3"
              style={{ boxShadow: '0 4px 16px rgba(255,76,0,0.3)' }}
            >
              Back to Markets
            </button>

            <button
              onClick={() => {
                setMode('deposit');
                setTxHash('');
                setSelectedDepositAmount('');
              }}
              className="w-full text-[#FF4C00] bg-transparent border-0 cursor-pointer hover:underline text-[13px] font-[600]"
            >
              Submit another deposit
            </button>
          </div>
        )}

        {mode === 'withdraw-entry' && (
          <>
            <button
              onClick={() => setMode('main')}
              className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#1D1D1D] mb-5 bg-transparent border-0 p-0 cursor-pointer text-[14px] font-[500] transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <h2 className="text-[#1D1D1D] mb-1 text-[22px] font-[800]">Withdraw Funds</h2>
            <p className="text-[#6B6B6B] text-[14px] font-[400] mb-5">
              Withdraw USDT to your external wallet
            </p>

            <div className="bg-[#FAFAFA] border border-[#F0F0F0] rounded-[12px] p-4 mb-4 flex items-center justify-between">
              <div>
                <div className="text-[#6B6B6B] text-[12px] font-[500] mb-1">Available balance</div>
                <div className="text-[#1D1D1D] text-[20px] font-[800]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  ${balance.toFixed(2)} USDT
                </div>
              </div>
              <button
                onClick={handleMaxWithdraw}
                className="bg-[#FFF0EB] text-[#FF4C00] px-3 py-1.5 rounded-md text-[12px] font-[600] border-0 cursor-pointer hover:bg-[#FFE8DE] transition-colors"
              >
                Max
              </button>
            </div>

            <div className="mb-4">
              <label className="text-[#6B6B6B] text-[12px] font-[600] uppercase tracking-[1px] block mb-2">
                Amount to withdraw
              </label>
              <div
                className="bg-[#FAFAFA] border border-[#F0F0F0] rounded-[12px] px-5 py-4 flex items-center gap-2 focus-within:border-[#FF4C00] focus-within:bg-white transition-all duration-200"
                style={{
                  boxShadow: withdrawAmount ? '0 0 0 4px rgba(255,76,0,0.08)' : 'none',
                }}
              >
                <span className="text-[#6B6B6B] text-[24px] font-[700]">$</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => {
                    setWithdrawAmount(e.target.value);
                    setSelectedWithdrawAmount('');
                  }}
                  className="flex-1 bg-transparent border-0 text-[#1D1D1D] text-[24px] font-[800] focus:outline-none"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                  placeholder="0.00"
                />
              </div>
              <div className="text-[#6B6B6B] text-[12px] font-[400] mt-2">Min withdrawal: $10.00</div>
            </div>

            <div className="flex gap-2 mb-5">
              {['$10', '$25', '$50', '$100', 'All'].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleQuickWithdraw(amt)}
                  className={`flex-1 py-2 rounded-full text-[13px] font-[600] transition-all duration-200 border-0 cursor-pointer ${
                    selectedWithdrawAmount === amt
                      ? 'bg-[#FF4C00] text-white'
                      : 'bg-[#FAFAFA] border border-[#F0F0F0] text-[#6B6B6B] hover:text-[#1D1D1D] hover:border-[#FFD4C2]'
                  }`}
                  style={{
                    boxShadow: selectedWithdrawAmount === amt ? '0 2px 8px rgba(255,76,0,0.25)' : 'none',
                  }}
                >
                  {amt}
                </button>
              ))}
            </div>

            <div className="mb-3">
              <label className="text-[#6B6B6B] text-[12px] font-[600] uppercase tracking-[1px] block mb-2">
                Your wallet address (USDT/USDT)
              </label>
              <div className="bg-[#FAFAFA] border border-[#F0F0F0] rounded-[12px] px-4 py-3 flex items-center gap-2 focus-within:border-[#FF4C00] focus-within:bg-white transition-all">
                <input
                  type="text"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  className="flex-1 bg-transparent border-0 text-[#1D1D1D] text-[14px] font-[500] focus:outline-none placeholder:text-[#6B6B6B]"
                  placeholder="0x... or wallet address"
                />
                <button
                  onClick={handlePaste}
                  className="bg-[#FFF0EB] text-[#FF4C00] px-3 py-1.5 rounded-md text-[12px] font-[600] border-0 cursor-pointer hover:bg-[#FFE8DE] transition-colors shrink-0"
                >
                  Paste
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[#6B6B6B] text-[12px] font-[600] uppercase tracking-[1px] block mb-2">
                Network
              </label>
              <div className="flex gap-2">
                {['Polygon', 'Base', 'Ethereum'].map((network) => (
                  <button
                    key={network}
                    onClick={() => setSelectedNetwork(network)}
                    className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-[600] transition-all duration-200 border-0 cursor-pointer ${
                      selectedNetwork === network
                        ? 'bg-[#FF4C00] text-white'
                        : 'bg-[#FAFAFA] border border-[#F0F0F0] text-[#6B6B6B] hover:text-[#1D1D1D] hover:border-[#FFD4C2]'
                    }`}
                  >
                    {network}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[10px] p-3 mb-5">
              <div className="text-[#92400E] text-[13px] font-[500]">
                ⚠️ Double-check your wallet address. Withdrawals cannot be reversed.
              </div>
            </div>

            <button
              onClick={() => setMode('withdraw-confirm')}
              disabled={!isWithdrawValid}
              className={`w-full py-3.5 rounded-[12px] text-[15px] font-[700] border-0 transition-all duration-200 ${
                isWithdrawValid
                  ? 'bg-[#FF4C00] text-white cursor-pointer hover:bg-[#E64400]'
                  : 'bg-[#F0F0F0] text-[#6B6B6B] cursor-not-allowed'
              }`}
              style={{
                boxShadow: isWithdrawValid ? '0 4px 16px rgba(255,76,0,0.3)' : 'none',
              }}
            >
              Continue
            </button>
          </>
        )}

        {mode === 'withdraw-confirm' && (
          <>
            <button
              onClick={() => setMode('withdraw-entry')}
              className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#1D1D1D] mb-5 bg-transparent border-0 p-0 cursor-pointer text-[14px] font-[500] transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <h2 className="text-[#1D1D1D] mb-5 text-[22px] font-[800]">Confirm Withdrawal</h2>

            <div className="bg-[#FAFAFA] border border-[#F0F0F0] rounded-[16px] p-6 mb-4">
              <div className="space-y-0">
                <div className="flex items-center justify-between py-3 border-b border-[#F0F0F0]">
                  <span className="text-[#6B6B6B] text-[14px] font-[400]">Amount</span>
                  <span className="text-[#1D1D1D] text-[14px] font-[700]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    ${parseFloat(withdrawAmount).toFixed(2)} USDT
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#F0F0F0]">
                  <span className="text-[#6B6B6B] text-[14px] font-[400]">Network</span>
                  <span className="text-[#1D1D1D] text-[14px] font-[600]">{selectedNetwork}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#F0F0F0]">
                  <span className="text-[#6B6B6B] text-[14px] font-[400]">To address</span>
                  <code className="text-[#1D1D1D] text-[13px] font-[600] font-mono">{truncatedAddress}</code>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#F0F0F0]">
                  <span className="text-[#6B6B6B] text-[14px] font-[400]">Fee</span>
                  <span className="text-[#16A34A] text-[14px] font-[600]">No fee</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-[#6B6B6B] text-[14px] font-[400]">You receive</span>
                  <span className="text-[#FF4C00] text-[17px] font-[800]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    ${parseFloat(withdrawAmount).toFixed(2)} USDT
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-[#6B6B6B] text-[13px] font-[400]">
                ⏱ Manual processing within 4 hours
              </div>
            </div>

            <button
              onClick={() => setMode('withdraw-success')}
              className="w-full bg-[#FF4C00] text-white py-3.5 rounded-[12px] border-0 cursor-pointer hover:bg-[#E64400] transition-all duration-200 mb-2 text-[15px] font-[700]"
              style={{ boxShadow: '0 4px 16px rgba(255,76,0,0.3)' }}
            >
              Confirm Withdrawal
            </button>

            <button
              onClick={() => setMode('withdraw-entry')}
              className="w-full bg-transparent border border-[#F0F0F0] text-[#6B6B6B] py-3 rounded-[12px] cursor-pointer hover:border-[#FFD4C2] hover:text-[#1D1D1D] transition-all duration-200 text-[14px] font-[600]"
            >
              Go back
            </button>
          </>
        )}

        {mode === 'withdraw-success' && (
          <div className="text-center py-6">
            <div
              className="w-[72px] h-[72px] mx-auto mb-5 rounded-full bg-[#ECFDF5] border-2 border-[#6EE7B7] flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-[#16A34A]" strokeWidth={3} />
            </div>

            <h2 className="text-[#1D1D1D] text-[24px] font-[800] mb-3">Withdrawal Submitted</h2>

            <p className="text-[#6B6B6B] text-[14px] font-[400] leading-[1.6] max-w-[320px] mx-auto mb-5">
              Your ${parseFloat(withdrawAmount).toFixed(2)} USDT withdrawal has been submitted and will be
              processed within 4 hours.
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="bg-[#FFF0EB] border border-[#FFD4C2] text-[#FF4C00] px-3.5 py-1.5 rounded-full text-[12px] font-[600]">
                {selectedNetwork} Network
              </div>
              <div className="bg-[#FFF0EB] border border-[#FFD4C2] text-[#FF4C00] px-3.5 py-1.5 rounded-full text-[12px] font-[600]">
                To: {truncatedAddress}
              </div>
            </div>

            <div className="bg-[#FAFAFA] border border-[#F0F0F0] rounded-[12px] p-4 mb-6 inline-block min-w-[200px]">
              <div className="text-[#6B6B6B] text-[11px] font-[600] uppercase tracking-[1px] mb-1">
                New balance
              </div>
              <div className="text-[#1D1D1D] text-[22px] font-[800]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                ${newBalance.toFixed(2)} USDT
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#FF4C00] text-white py-3.5 rounded-[12px] border-0 cursor-pointer hover:bg-[#E64400] transition-all duration-200 text-[15px] font-[700]"
              style={{ boxShadow: '0 4px 16px rgba(255,76,0,0.3)' }}
            >
              Back to Markets
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
