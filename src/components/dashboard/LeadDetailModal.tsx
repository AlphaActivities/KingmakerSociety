import { useState, useEffect } from 'react';
import { X, Save, Loader2, ClipboardList } from 'lucide-react';
import { Lead, LeadStatus, QuestionnaireResponse, updateLead } from '../../services/dashboardService';
import StatusBadge from './StatusBadge';
import { StageBadge } from './LeadRow';

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

  const completedAt = lead.completed_at
    ? new Date(lead.completed_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const questionnaire: QuestionnaireResponse | null = lead.questionnaire_responses?.[0] ?? null;

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
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Application Stage</span>
              <StageBadge stage={lead.application_stage ?? 'lead-form'} />
            </div>
            {completedAt && (
              <div className="flex flex-col gap-1 ml-6">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Completed</span>
                <span className="text-xs text-green-400 font-semibold">{completedAt}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Email" value={lead.email} />
            <InfoField label="Phone" value={lead.phone || '—'} />
            <InfoField label="Age" value={lead.age ? String(lead.age) : '—'} />
            <InfoField label="Timezone" value={lead.timezone || '—'} />
            <InfoField label="Occupation" value={lead.occupation || '—'} />
            <InfoField label="Biggest Struggle" value={lead.biggest_struggle || '—'} />
          </div>

          {questionnaire ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[#FFC300]" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Questionnaire Answers</span>
              </div>
              <div className="bg-[#1A1A1A] border border-white/8 rounded-xl divide-y divide-white/5">
                <QuestionField label="Main Goal in 90 Days" value={questionnaire.main_goal_90_days} />
                <QuestionField label="Life in 12 Months" value={questionnaire.life_12_months} />
                <QuestionField label="Wants to Build a Business" value={questionnaire.want_business} />
                <QuestionField label="Primary Improvement Area" value={questionnaire.improvement_area} />
                <QuestionField label="Already Tried" value={questionnaire.already_tried} />
                <QuestionField label="What Stops Consistency" value={questionnaire.what_stops_consistency} />
                <QuestionField label="Cost of Staying the Same" value={questionnaire.cost_of_staying} />
                <QuestionField label="Interested Path" value={questionnaire.interested_path} />
                <QuestionField label="Willing to Invest" value={questionnaire.willing_to_invest} />
                <QuestionField label="Discipline Rating" value={questionnaire.discipline_rating != null ? `${questionnaire.discipline_rating}/10` : null} />
                <QuestionField label="Seriousness Rating" value={questionnaire.seriousness_rating != null ? `${questionnaire.seriousness_rating}/10` : null} />
                <QuestionField label="Training Days/Week" value={questionnaire.training_days_per_week != null ? String(questionnaire.training_days_per_week) : null} />
                <QuestionField label="Prayer Days/Week" value={questionnaire.prayer_days_per_week != null ? String(questionnaire.prayer_days_per_week) : null} />
                <QuestionField label="Trying Alone" value={questionnaire.trying_alone != null ? (questionnaire.trying_alone ? 'Yes' : 'No') : null} />
                <QuestionField label="Brotherhood Helps" value={questionnaire.believe_brotherhood_helps != null ? (questionnaire.believe_brotherhood_helps ? 'Yes' : 'No') : null} />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 bg-[#1A1A1A] border border-white/8 rounded-xl">
              <ClipboardList className="w-4 h-4 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">Questionnaire not yet completed</span>
            </div>
          )}

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
              rows={4}
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
              <span>Saved</span>
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

function QuestionField({ label, value }: { label: string; value: string | null | undefined }) {
  if (value == null || value === '') return null;
  return (
    <div className="px-4 py-3">
      <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm text-white leading-relaxed">{value}</p>
    </div>
  );
}
