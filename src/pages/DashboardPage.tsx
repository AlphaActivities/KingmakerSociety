import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, UserCheck, Phone, Star, CheckCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchLeads, Lead, LeadStatus } from '../services/dashboardService';
import LeadsTable from '../components/dashboard/LeadsTable';

type FilterState = LeadStatus | 'all';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  borderClass: string;
  bgClass: string;
  isActive: boolean;
  isSuccess?: boolean;
  onClick: () => void;
}

function StatCard({ label, value, icon, borderClass, bgClass, isActive, isSuccess, onClick }: StatCardProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'text-left rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 cursor-pointer w-full',
        bgClass,
        'border',
        borderClass,
        isActive
          ? isSuccess
            ? 'ring-1 ring-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.12)]'
            : 'ring-1 ring-white/20 shadow-[0_4px_20px_rgba(255,255,255,0.06)]'
          : 'hover:brightness-110',
      ].join(' ')}
    >
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white leading-none">{value}</p>
        <p className="text-xs text-gray-500 mt-1 tracking-wide">{label}</p>
      </div>
    </button>
  );
}

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterState>('all');

  const loadLeads = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);

    const { data, error: fetchError } = await fetchLeads();

    if (fetchError) {
      setError(fetchError);
    } else if (data) {
      setLeads(data);
    }

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const countByStatus = (status: LeadStatus) => leads.filter((l) => l.status === status).length;

  const filteredLeads = activeFilter === 'all'
    ? leads
    : leads.filter((l) => l.status === activeFilter);

  const handleLeadUpdate = (updated: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  };

  const handleFilterClick = (filter: FilterState) => {
    setActiveFilter((prev) => (prev === filter ? 'all' : filter));
  };

  const tableHeading = activeFilter === 'all'
    ? 'All Applications'
    : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Applications`;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <header className="bg-[#0B0B0B]/95 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/logos/logo.PNG"
              alt="Kingmaker Society"
              className="w-8 h-8 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-sm font-bold text-white leading-none">KingmakerSociety</h1>
              <p className="text-xs text-gray-500 mt-0.5">Applications Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 hidden sm:block">{user?.email}</span>
            <button
              onClick={() => loadLeads(true)}
              disabled={refreshing}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Refresh leads"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={async () => { await signOut(); navigate('/login', { replace: true }); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard
            label="Total Leads"
            value={leads.length}
            icon={<Users className="w-5 h-5 text-gray-400" />}
            borderClass={activeFilter === 'all' ? 'border-white/20' : 'border-white/8'}
            bgClass="bg-[#141414]"
            isActive={activeFilter === 'all'}
            onClick={() => handleFilterClick('all')}
          />
          <StatCard
            label="New"
            value={countByStatus('new')}
            icon={<Star className="w-5 h-5 text-blue-400" />}
            borderClass={activeFilter === 'new' ? 'border-blue-500/50' : 'border-blue-500/20'}
            bgClass={activeFilter === 'new' ? 'bg-blue-500/[0.05]' : 'bg-[#141414] hover:bg-blue-500/[0.02]'}
            isActive={activeFilter === 'new'}
            onClick={() => handleFilterClick('new')}
          />
          <StatCard
            label="Contacted"
            value={countByStatus('contacted')}
            icon={<Phone className="w-5 h-5 text-amber-400" />}
            borderClass={activeFilter === 'contacted' ? 'border-amber-500/50' : 'border-amber-500/25'}
            bgClass={activeFilter === 'contacted' ? 'bg-amber-500/[0.05]' : 'bg-[#141414] hover:bg-amber-500/[0.02]'}
            isActive={activeFilter === 'contacted'}
            onClick={() => handleFilterClick('contacted')}
          />
          <StatCard
            label="Qualified"
            value={countByStatus('qualified')}
            icon={<UserCheck className="w-5 h-5 text-[#FFC300]" />}
            borderClass={activeFilter === 'qualified' ? 'border-[#FFC300]/60' : 'border-[#FFC300]/30'}
            bgClass={activeFilter === 'qualified' ? 'bg-[#FFC300]/[0.05]' : 'bg-[#141414] hover:bg-[#FFC300]/[0.02]'}
            isActive={activeFilter === 'qualified'}
            onClick={() => handleFilterClick('qualified')}
          />
          <div className="col-span-2 sm:col-span-1">
            <StatCard
              label="Converted"
              value={countByStatus('converted')}
              icon={<CheckCircle className="w-5 h-5 text-green-400" />}
              borderClass={activeFilter === 'converted' ? 'border-green-500/70' : 'border-green-500/35'}
              bgClass={
                activeFilter === 'converted'
                  ? 'bg-green-500/[0.07] shadow-[0_0_28px_rgba(34,197,94,0.10)]'
                  : 'bg-[#141414] hover:bg-green-500/[0.03] hover:shadow-[0_0_20px_rgba(34,197,94,0.06)]'
              }
              isActive={activeFilter === 'converted'}
              isSuccess
              onClick={() => handleFilterClick('converted')}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-white">{tableHeading}</h2>
              {activeFilter !== 'all' && (
                <button
                  onClick={() => setActiveFilter('all')}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
                >
                  Clear filter
                </button>
              )}
            </div>
            <span className="text-sm text-gray-500">{filteredLeads.length} of {leads.length}</span>
          </div>

          {loading ? (
            <div className="bg-[#141414] border border-white/8 rounded-2xl p-16 flex items-center justify-center">
              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-5 h-5 border-2 border-[#FFC300] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Loading leads...</span>
              </div>
            </div>
          ) : error ? (
            <div className="bg-[#141414] border border-[#D11F2A]/30 rounded-2xl p-8 text-center">
              <p className="text-[#D11F2A] text-sm">{error}</p>
              <button
                onClick={() => loadLeads()}
                className="mt-4 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg hover:border-white/30 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <LeadsTable leads={filteredLeads} onLeadUpdate={handleLeadUpdate} />
          )}
        </div>
      </main>
    </div>
  );
}
