import { useState } from 'react';
import { Lead } from '../../services/dashboardService';
import LeadRow, { LeadCard } from './LeadRow';
import LeadDetailModal from './LeadDetailModal';

interface LeadsTableProps {
  leads: Lead[];
  onLeadUpdate: (updated: Lead) => void;
}

export default function LeadsTable({ leads, onLeadUpdate }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleLeadUpdate = (updated: Lead) => {
    onLeadUpdate(updated);
    setSelectedLead(updated);
    setTimeout(() => setSelectedLead(null), 900);
  };

  return (
    <>
      <div className="bg-[#141414] border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="sm:hidden">
          {leads.length === 0 ? (
            <div className="px-4 py-14 text-center text-gray-600 text-sm">No applications yet.</div>
          ) : (
            leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} onClick={setSelectedLead} />
            ))
          )}
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.07] bg-[#191919]">
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em]">Name</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em] hidden sm:table-cell">Email</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em] hidden md:table-cell">Phone</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em] hidden lg:table-cell">Stage</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em]">Status</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em] hidden xl:table-cell">Applied</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center text-gray-600 text-sm">
                    No applications yet.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <LeadRow key={lead.id} lead={lead} onClick={setSelectedLead} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={handleLeadUpdate}
      />
    </>
  );
}
