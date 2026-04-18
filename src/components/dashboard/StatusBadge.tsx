import { LeadStatus } from '../../services/dashboardService';

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: {
    label: 'New',
    className: 'bg-blue-500/10 text-blue-300 border border-blue-500/25',
  },
  contacted: {
    label: 'Contacted',
    className: 'bg-amber-500/10 text-amber-300 border border-amber-500/25',
  },
  qualified: {
    label: 'Qualified',
    className: 'bg-[#FFC300]/10 text-[#FFC300] border border-[#FFC300]/25',
  },
  converted: {
    label: 'Converted',
    className: 'bg-green-500/10 text-green-400 border border-green-500/25',
  },
};

interface StatusBadgeProps {
  status: LeadStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.new;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap ${config.className}`}>
      {config.label}
    </span>
  );
}
