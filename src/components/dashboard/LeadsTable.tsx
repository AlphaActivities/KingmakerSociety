import { useState } from 'react';
import { Lead } from '../../services/dashboardService';
import LeadRow from './LeadRow';
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
      <div className="bg-[#141414] border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8 bg-[#1B1B1B]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest hidden sm:table-cell">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest hidden md:table-cell">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest hidden lg:table-cell">Struggle</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest hidden xl:table-cell">Applied</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center text-gray-500">
                    No leads yet.
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
