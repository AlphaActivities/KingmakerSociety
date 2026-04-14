import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ALLOWED_EMAILS = [
  'yourcustomerflowguy@gmail.com',
  'jordanaliwork@gmail.com',
  'heberherrera92@gmail.com',
];

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, user, loading, signOut } = useAuth();

  const isAllowed = user?.email && ALLOWED_EMAILS.includes(user.email.toLowerCase());

  useEffect(() => {
    if (!loading && session && !isAllowed) {
      signOut();
    }
  }, [loading, session, isAllowed, signOut]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFC300] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4">
        <div className="bg-[#1B1B1B] border border-[#D11F2A]/40 rounded-2xl p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-[#D11F2A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#D11F2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Access Denied</h2>
          <p className="text-gray-400 mb-8">Your account is not authorized to access this dashboard.</p>
          <button
            onClick={() => signOut()}
            className="px-6 py-3 bg-[#D11F2A] text-white rounded-lg font-semibold hover:bg-[#B01828] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
