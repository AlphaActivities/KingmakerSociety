import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, UserCheck, Phone, Star, CheckCircle, RefreshCw, ClipboardList, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchLeads, Lead, LeadStatus, ApplicationStage } from '../services/dashboardService';
import LeadsTable from '../components/dashboard/LeadsTable';

type FilterState = LeadStatus | 'all';

const STAGE_ORDER: ApplicationStage[] = ['lead-form', 'questionnaire', 'call-booking', 'complete'];
const STAGE_LABELS: Record<ApplicationStage, string> = {
  'lead-form': 'Lead Only',
  'questionnaire': 'Questionnaire',
  'call-booking': 'Call Booked',
  'complete': 'Fully Complete',
};
const STAGE_COLORS: Record<ApplicationStage, { text: string; dot: string }> = {
  'lead-form': { text: 'text-gray-300', dot: 'bg-gray-500' },
  'questionnaire': { text: 'text-blue-300', dot: 'bg-blue-400' },
  'call-booking': { text: 'text-amber-300', dot: 'bg-amber-400' },
  'complete': { text: 'text-green-300', dot: 'bg-green-400' },
};

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
        'text-left rounded-2xl p-4 sm:p-5 flex items-start gap-3 transition-all duration-200 cursor-pointer w-full',
        bgClass,
        'border',
        borderClass,
        isActive
          ? isSuccess
            ? 'ring-1 ring-green-500/30 shadow-[0_0_24px_rgba(34,197,94,0.10)]'
            : 'ring-1 ring-white/15 shadow-[0_4px_24px_rgba(255,255,255,0.05)]'
          : 'hover:brightness-110 hover:scale-[1.01]',
      ].join(' ')}
    >
      <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xl sm:text-2xl font-bold text-white leading-none tabular-nums">{value}</p>
        <p className="text-[11px] text-gray-500 mt-1.5 tracking-wide leading-snug">{label}</p>
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
  const countByStage = (stage: ApplicationStage) => leads.filter((l) => l.application_stage === stage).length;
  const countWithQuestionnaire = leads.filter((l) => (l.questionnaire_responses?.length ?? 0) > 0).length;

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
      <header className="bg-[#0D0D0D]/98 sticky top-0 z-40 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/logos/logo.PNG"
              alt="Kingmaker Society"
              className="w-8 h-8 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-sm font-bold text-white leading-none tracking-wide">Kingmaker Society</h1>
              <p className="text-[10px] text-gray-600 mt-0.5 tracking-[0.12em] uppercase">Applications</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs text-gray-500 hidden sm:block truncate max-w-[200px]">{user?.email}</span>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <button
              onClick={() => loadLeads(true)}
              disabled={refreshing}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-all"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={async () => { await signOut(); navigate('/login', { replace: true }); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-white/8 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          <StatCard
            label="Total Leads"
            value={leads.length}
            icon={<Users className="w-4 h-4 text-gray-400" />}
            borderClass={activeFilter === 'all' ? 'border-white/20' : 'border-white/[0.07]'}
            bgClass="bg-[#141414]"
            isActive={activeFilter === 'all'}
            onClick={() => handleFilterClick('all')}
          />
          <StatCard
            label="New"
            value={countByStatus('new')}
            icon={<Star className="w-4 h-4 text-blue-400" />}
            borderClass={activeFilter === 'new' ? 'border-blue-500/50' : 'border-blue-500/15'}
            bgClass={activeFilter === 'new' ? 'bg-blue-500/[0.06]' : 'bg-[#141414]'}
            isActive={activeFilter === 'new'}
            onClick={() => handleFilterClick('new')}
          />
          <StatCard
            label="Contacted"
            value={countByStatus('contacted')}
            icon={<Phone className="w-4 h-4 text-amber-400" />}
            borderClass={activeFilter === 'contacted' ? 'border-amber-500/50' : 'border-amber-500/15'}
            bgClass={activeFilter === 'contacted' ? 'bg-amber-500/[0.06]' : 'bg-[#141414]'}
            isActive={activeFilter === 'contacted'}
            onClick={() => handleFilterClick('contacted')}
          />
          <StatCard
            label="Qualified"
            value={countByStatus('qualified')}
            icon={<UserCheck className="w-4 h-4 text-[#FFC300]" />}
            borderClass={activeFilter === 'qualified' ? 'border-[#FFC300]/60' : 'border-[#FFC300]/20'}
            bgClass={activeFilter === 'qualified' ? 'bg-[#FFC300]/[0.06]' : 'bg-[#141414]'}
            isActive={activeFilter === 'qualified'}
            onClick={() => handleFilterClick('qualified')}
          />
          <div className="col-span-2 sm:col-span-1">
            <StatCard
              label="Converted"
              value={countByStatus('converted')}
              icon={<CheckCircle className="w-4 h-4 text-green-400" />}
              borderClass={activeFilter === 'converted' ? 'border-green-500/60' : 'border-green-500/20'}
              bgClass={
                activeFilter === 'converted'
                  ? 'bg-green-500/[0.07] shadow-[0_0_28px_rgba(34,197,94,0.08)]'
                  : 'bg-[#141414]'
              }
              isActive={activeFilter === 'converted'}
              isSuccess
              onClick={() => handleFilterClick('converted')}
            />
          </div>
        </div>

        <div className="bg-[#141414] border border-white/[0.07] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[#FFC300]" />
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.12em]">Application Pipeline</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {STAGE_ORDER.map((stage) => {
              const colors = STAGE_COLORS[stage];
              const count = countByStage(stage);
              return (
                <div key={stage} className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                    <span className="text-[11px] text-gray-500 truncate">{STAGE_LABELS[stage]}</span>
                  </div>
                  <span className={`text-2xl font-bold tabular-nums ${colors.text}`}>{count}</span>
                </div>
              );
            })}
          </div>
          {countWithQuestionnaire > 0 && (
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
              <ClipboardList className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
              <p className="text-xs text-gray-600">
                <span className="text-green-400 font-semibold">{countWithQuestionnaire}</span> of {leads.length} completed the questionnaire
              </p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 min-w-0">
              <h2 className="text-base font-bold text-white">{tableHeading}</h2>
              {activeFilter !== 'all' && (
                <button
                  onClick={() => setActiveFilter('all')}
                  className="text-xs text-gray-600 hover:text-gray-300 transition-colors whitespace-nowrap underline underline-offset-2"
                >
                  Clear
                </button>
              )}
            </div>
            <span className="text-xs text-gray-600 flex-shrink-0 ml-4 tabular-nums">
              {filteredLeads.length} / {leads.length}
            </span>
          </div>

          {loading ? (
            <div className="bg-[#141414] border border-white/[0.07] rounded-2xl p-16 flex items-center justify-center">
              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-4 h-4 border-2 border-[#FFC300] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Loading applications...</span>
              </div>
            </div>
          ) : error ? (
            <div className="bg-[#141414] border border-[#D11F2A]/25 rounded-2xl p-8 text-center">
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
