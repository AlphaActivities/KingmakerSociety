import { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { Lead, LeadStatus, updateLead } from '../../services/dashboardService';
import StatusBadge from './StatusBadge';

const STATUS_OPTIONS: LeadStatus[] = ['new', 'contacted', 'qualified', 'converted'];

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdate: (updated: Lead) => void;
}

export default function LeadDetailModal({ lead, onClose, onUpdate }: LeadDetailModalProps) {
  const [status, setStatus] = useState<LeadStatus>('new');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (lead) {
      setStatus(lead.status);
      setNotes(lead.notes ?? '');
      setSaved(false);
      setSaveError('');
    }
  }, [lead]);

  if (!lead) return null;

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    setSaved(false);

    const { data, error } = await updateLead(lead.id, { status, notes });

    setSaving(false);
    if (error) {
      setSaveError(error);
    } else if (data) {
      onUpdate(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const createdAt = new Date(lead.created_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div
        className="relative bg-[#141414] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white">{lead.first_name} {lead.last_name}</h2>
            <p className="text-sm text-gray-500 mt-0.5">Applied {createdAt}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Email" value={lead.email} />
            <InfoField label="Phone" value={lead.phone || '—'} />
            <InfoField label="Age" value={lead.age ? String(lead.age) : '—'} />
            <InfoField label="Timezone" value={lead.timezone || '—'} />
            <InfoField label="Occupation" value={lead.occupation || '—'} />
            <InfoField label="Biggest Struggle" value={lead.biggest_struggle || '—'} />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Status</label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    status === s
                      ? 'border-[#FFC300] bg-[#FFC300]/10 text-[#FFC300]'
                      : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div className="mt-1">
              <StatusBadge status={status} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Internal Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Add notes about this lead..."
              className="w-full bg-[#1B1B1B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/30 resize-none transition-colors"
            />
          </div>

          {saveError && (
            <p className="text-sm text-[#D11F2A]">{saveError}</p>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] text-[#0B0B0B] font-bold rounded-xl hover:from-[#FFD033] hover:to-[#E5B100] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(255,195,0,0.3)]"
          >
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : saved ? (
              <><span>Saved</span></>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1B1B1B] rounded-xl px-4 py-3">
      <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm text-white">{value}</p>
    </div>
  );
}
