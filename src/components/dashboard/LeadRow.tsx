import { Lead, ApplicationStage } from '../../services/dashboardService';
import StatusBadge from './StatusBadge';

interface LeadRowProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

const STAGE_LABELS: Record<ApplicationStage, string> = {
  'lead-form': 'Lead Only',
  'questionnaire': 'Questionnaire',
  'call-booking': 'Call Booked',
  'complete': 'Complete',
};

const STAGE_COLORS: Record<ApplicationStage, string> = {
  'lead-form': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  'questionnaire': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'call-booking': 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  'complete': 'bg-green-500/10 text-green-400 border-green-500/20',
};

export function StageBadge({ stage }: { stage: ApplicationStage }) {
  const color = STAGE_COLORS[stage] ?? STAGE_COLORS['lead-form'];
  const label = STAGE_LABELS[stage] ?? stage;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border whitespace-nowrap ${color}`}>
      {label}
    </span>
  );
}

export function LeadCard({ lead, onClick }: LeadRowProps) {
  const fullName = `${lead.first_name} ${lead.last_name}`;
  const hasQuestionnaire = (lead.questionnaire_responses?.length ?? 0) > 0;

  return (
    <div
      className="border-b border-white/[0.05] px-4 py-3.5 hover:bg-white/[0.025] cursor-pointer transition-colors active:bg-white/[0.04]"
      onClick={() => onClick(lead)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white leading-snug truncate">{fullName}</p>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{lead.email}</p>
          {hasQuestionnaire && (
            <p className="text-[10px] text-green-400 font-medium tracking-wide mt-1">Questionnaire filled</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <StatusBadge status={lead.status} />
          <StageBadge stage={lead.application_stage ?? 'lead-form'} />
        </div>
      </div>
    </div>
  );
}

export default function LeadRow({ lead, onClick }: LeadRowProps) {
  const fullName = `${lead.first_name} ${lead.last_name}`;
  const date = new Date(lead.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const hasQuestionnaire = (lead.questionnaire_responses?.length ?? 0) > 0;

  return (
    <tr
      className="border-b border-white/[0.05] hover:bg-white/[0.025] cursor-pointer transition-colors group"
      onClick={() => onClick(lead)}
    >
      <td className="px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-white group-hover:text-[#FFC300] transition-colors leading-snug">{fullName}</span>
          {hasQuestionnaire && (
            <span className="text-[10px] text-green-400 font-medium tracking-wide">Questionnaire filled</span>
          )}
        </div>
      </td>
      <td className="px-5 py-4 text-sm text-gray-400 hidden sm:table-cell">
        <span className="block max-w-[200px] truncate">{lead.email}</span>
      </td>
      <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell">{lead.phone || '—'}</td>
      <td className="px-5 py-4 hidden lg:table-cell">
        <StageBadge stage={lead.application_stage ?? 'lead-form'} />
      </td>
      <td className="px-5 py-4">
        <StatusBadge status={lead.status} />
      </td>
      <td className="px-5 py-4 text-xs text-gray-600 hidden xl:table-cell whitespace-nowrap">{date}</td>
    </tr>
  );
}
