import { Lead } from '../../services/dashboardService';
import StatusBadge from './StatusBadge';

interface LeadRowProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

export default function LeadRow({ lead, onClick }: LeadRowProps) {
  const fullName = `${lead.first_name} ${lead.last_name}`;
  const date = new Date(lead.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <tr
      className="border-b border-white/5 hover:bg-white/[0.03] cursor-pointer transition-colors group"
      onClick={() => onClick(lead)}
    >
      <td className="px-4 py-4 text-sm font-medium text-white group-hover:text-[#FFC300] transition-colors">
        {fullName}
      </td>
      <td className="px-4 py-4 text-sm text-gray-400 hidden sm:table-cell">{lead.email}</td>
      <td className="px-4 py-4 text-sm text-gray-400 hidden md:table-cell">{lead.phone || '—'}</td>
      <td className="px-4 py-4 text-sm text-gray-400 hidden lg:table-cell">{lead.biggest_struggle || '—'}</td>
      <td className="px-4 py-4">
        <StatusBadge status={lead.status} />
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 hidden xl:table-cell">{date}</td>
    </tr>
  );
}
