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
  'lead-form': 'bg-gray-500/15 text-gray-400 border-gray-500/25',
  'questionnaire': 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'call-booking': 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  'complete': 'bg-green-500/15 text-green-400 border-green-500/30',
};

export function StageBadge({ stage }: { stage: ApplicationStage }) {
  const color = STAGE_COLORS[stage] ?? STAGE_COLORS['lead-form'];
  const label = STAGE_LABELS[stage] ?? stage;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${color}`}>
      {label}
    </span>
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
      className="border-b border-white/5 hover:bg-white/[0.03] cursor-pointer transition-colors group"
      onClick={() => onClick(lead)}
    >
      <td className="px-4 py-4 text-sm font-medium text-white group-hover:text-[#FFC300] transition-colors">
        <div className="flex flex-col gap-0.5">
          <span>{fullName}</span>
          {hasQuestionnaire && (
            <span className="text-[10px] text-green-400 font-semibold tracking-wide">Questionnaire filled</span>
          )}
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-400 hidden sm:table-cell">{lead.email}</td>
      <td className="px-4 py-4 text-sm text-gray-400 hidden md:table-cell">{lead.phone || '—'}</td>
      <td className="px-4 py-4 hidden lg:table-cell">
        <StageBadge stage={lead.application_stage ?? 'lead-form'} />
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={lead.status} />
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 hidden xl:table-cell">{date}</td>
    </tr>
  );
}
