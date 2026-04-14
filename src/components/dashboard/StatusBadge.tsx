import { LeadStatus } from '../../services/dashboardService';

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: {
    label: 'New',
    className: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  },
  contacted: {
    label: 'Contacted',
    className: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
  },
  qualified: {
    label: 'Qualified',
    className: 'bg-[#FFC300]/15 text-[#FFC300] border border-[#FFC300]/30',
  },
  converted: {
    label: 'Converted',
    className: 'bg-green-500/15 text-green-400 border border-green-500/30',
  },
};

interface StatusBadgeProps {
  status: LeadStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.new;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${config.className}`}>
      {config.label}
    </span>
  );
}
