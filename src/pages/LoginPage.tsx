import { useState, FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { session, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFC300] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const { error: signInError } = await signIn(email, password);

    setIsSubmitting(false);

    if (signInError) {
      setError('Invalid email or password. Please try again.');
    } else {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/images/logos/logo.PNG" alt="KingmakerSociety" className="h-12 w-auto mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-500 text-sm">Kingmaker Society — Internal Dashboard</p>
        </div>

        <div className="bg-[#141414] border border-white/8 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 px-4 py-3 bg-[#D11F2A]/10 border border-[#D11F2A]/30 rounded-xl text-[#D11F2A] text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="w-full bg-[#1B1B1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/30 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-[#1B1B1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/30 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 px-6 py-3.5 bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] text-[#0B0B0B] font-bold rounded-xl hover:from-[#FFD033] hover:to-[#E5B100] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(255,195,0,0.3)] hover:shadow-[0_8px_32px_rgba(255,195,0,0.5)] hover:-translate-y-0.5 transform"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-8">
          Restricted to authorized personnel only
        </p>
      </div>
    </div>
  );
}
