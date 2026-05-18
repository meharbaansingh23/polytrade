import { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string) => void;
}

export function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleGoogleSignIn = () => {
    onLogin('google-user@example.com');
    onClose();
  };

  const handleSendOTP = () => {
    if (email) {
      setStep('otp');
    }
  };

  const handleVerify = () => {
    onLogin(email);
    onClose();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: 'rgba(29, 29, 29, 0.4)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="bg-white border border-[#F0F0F0] rounded-[24px] p-10 w-full max-w-[440px] relative"
        style={{ boxShadow: '0 20px 64px rgba(0,0,0,0.12)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#6B6B6B] hover:text-[#1D1D1D] bg-transparent border-0 p-0 cursor-pointer transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'email' ? (
          <>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9L9 4L14 9L9 14L4 9Z" fill="#FF4C00" />
                  <path d="M6 9L9 6L12 9L9 12L6 9Z" fill="#FF824F" />
                </svg>
              </div>
              <h2 className="text-[#1D1D1D] mb-2 text-[26px] font-[900]">Create your account</h2>
              <p className="text-[#6B6B6B] text-[14px] font-[400]">
                Start trading in under 2 minutes
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-[#1D1D1D] py-3 rounded-[10px] flex items-center justify-center gap-3 mb-4 border border-[#F0F0F0] cursor-pointer hover:bg-[#FAFAFA] transition-colors duration-200 h-12 text-[14px] font-[600]"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#F0F0F0]" />
              <span className="text-[#6B6B6B] text-[13px] font-[400]">or</span>
              <div className="flex-1 h-px bg-[#F0F0F0]" />
            </div>

            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#F0F0F0] rounded-[10px] px-4 py-3 text-[#1D1D1D] mb-4 focus:outline-none focus:border-[#FF4C00] focus:shadow-[0_0_0_3px_rgba(255,76,0,0.12)] transition-all duration-200 h-11 text-[14px] placeholder:text-[#6B6B6B]"
            />

            <button
              onClick={handleSendOTP}
              className="w-full bg-[#FF4C00] text-white py-3 rounded-[10px] border-0 cursor-pointer hover:bg-[#E64400] transition-all duration-200 h-12 text-[14px] font-[700]"
            >
              Send OTP
            </button>

            <p className="text-[13px] font-[400] text-[#6B6B6B] text-center mt-5">
              Already have an account?{' '}
              <span className="text-[#FF4C00] font-[600] cursor-pointer hover:underline">Log in</span>
            </p>
          </>
        ) : (
          <>
            <button
              onClick={() => setStep('email')}
              className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#1D1D1D] mb-6 bg-transparent border-0 p-0 cursor-pointer text-[14px] font-[500] transition-colors duration-200"
            >
              ← Back
            </button>

            <h2 className="text-[#1D1D1D] mb-2 text-[26px] font-[800] text-center">
              Verify your email
            </h2>

            <div className="text-center mb-8">
              <p className="text-[#6B6B6B] text-[14px] font-[400] mb-1">
                We sent a 6-digit code to
              </p>
              <p className="text-[#FF4C00] text-[14px] font-[600]">{email}</p>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className={`w-12 h-14 text-center text-[#1D1D1D] text-[22px] font-[800] rounded-[10px] focus:outline-none transition-all duration-200 ${
                    digit
                      ? 'bg-white border border-[#FFD4C2]'
                      : 'bg-[#FAFAFA] border border-[#F0F0F0]'
                  } focus:bg-white focus:border-2 focus:border-[#FF4C00]`}
                  style={{
                    boxShadow: document.activeElement?.id === `otp-${index}`
                      ? '0 0 0 4px rgba(255,76,0,0.08)'
                      : 'none'
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={!isOtpComplete}
              className={`w-full py-3.5 rounded-[12px] border-0 transition-all duration-200 text-[15px] font-[700] ${
                isOtpComplete
                  ? 'bg-[#FF4C00] text-white cursor-pointer hover:bg-[#E64400]'
                  : 'bg-[#FFF0EB] text-[#FFD4C2] cursor-not-allowed'
              }`}
              style={{
                boxShadow: isOtpComplete ? '0 4px 16px rgba(255,76,0,0.3)' : 'none',
              }}
            >
              Verify & Continue
            </button>

            <button
              className="w-full text-[#FF4C00] bg-transparent border-0 cursor-pointer hover:underline text-[13px] font-[600] mt-4"
            >
              Resend code
            </button>
          </>
        )}
      </div>
    </div>
  );
}
