import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div
        className="bg-white border border-[#F0F0F0] rounded-[20px] p-8 md:p-10 w-full max-w-[400px]"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
      >
        <div className="text-center mb-8">
          <img src="/polytrade_logo_new.svg" alt="PolyTrade" className="h-8 w-auto mx-auto mb-6" />
          <h1
            className="text-[#1D1D1D] text-[22px] font-[800]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Admin Sign In
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#6B6B6B] text-[11px] font-[700] uppercase tracking-[1px] mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full h-11 bg-[#FAFAFA] border border-[#F0F0F0] rounded-[8px] px-4 text-[#1D1D1D] text-[14px] focus:outline-none focus:border-[#FF4C00] transition-all"
            />
          </div>
          <div>
            <label className="block text-[#6B6B6B] text-[11px] font-[700] uppercase tracking-[1px] mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full h-11 bg-[#FAFAFA] border border-[#F0F0F0] rounded-[8px] px-4 text-[#1D1D1D] text-[14px] focus:outline-none focus:border-[#FF4C00] transition-all"
            />
          </div>

          {error && (
            <p className="text-[#DC2626] text-[13px] font-[500]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-[#FF4C00] text-white rounded-[8px] border-0 cursor-pointer hover:bg-[#E64400] transition-colors text-[14px] font-[600] disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 2px 8px rgba(255,76,0,0.3)' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
