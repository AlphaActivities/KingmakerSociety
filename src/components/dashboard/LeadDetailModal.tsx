import { useState, useEffect } from 'react';
import { X, Save, Loader2, ClipboardList, User, Target, AlertTriangle, Flame } from 'lucide-react';
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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
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
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div
        className="relative bg-[#141414] border border-white/10 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl lg:max-w-3xl max-h-[95dvh] sm:max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}
      >
        <div className="flex items-start justify-between px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-white/[0.07] flex-shrink-0">
          <div className="min-w-0 flex-1 pr-4">
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight truncate">
              {lead.first_name} {lead.last_name}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Applied {createdAt}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-colors mt-0.5"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="px-5 sm:px-7 pt-5 pb-2 flex items-center gap-3 flex-wrap flex-shrink-0">
          <StageBadge stage={lead.application_stage ?? 'lead-form'} />
          <StatusBadge status={lead.status} />
          {completedAt && (
            <span className="text-[11px] text-green-400 font-medium bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full">
              Completed {completedAt}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-7 pb-6 space-y-6 mt-4">

          <QSection icon={<User className="w-3.5 h-3.5" />} title="Basic Info">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <InfoField label="Email" value={lead.email} />
              <InfoField label="Phone" value={lead.phone || '—'} />
              <InfoField label="Age" value={lead.age ? String(lead.age) : '—'} />
              <InfoField label="Timezone" value={lead.timezone || '—'} />
              <InfoField label="Occupation" value={lead.occupation || '—'} />
              <InfoField label="Biggest Struggle" value={lead.biggest_struggle || '—'} />
            </div>
          </QSection>

          {questionnaire ? (
            <>
              <QSection icon={<Target className="w-3.5 h-3.5" />} title="Vision &amp; Goals">
                <div className="space-y-0 divide-y divide-white/[0.05] border border-white/[0.07] rounded-xl overflow-hidden">
                  <QuestionField label="Main Goal in 90 Days" value={questionnaire.main_goal_90_days} />
                  <QuestionField label="Life in 12 Months" value={questionnaire.life_12_months} />
                  <QuestionField label="Wants to Build a Business" value={questionnaire.want_business} />
                  <QuestionField label="Primary Improvement Area" value={questionnaire.improvement_area} />
                  <QuestionField label="Interested Path" value={questionnaire.interested_path} />
                </div>
              </QSection>

              <QSection icon={<AlertTriangle className="w-3.5 h-3.5" />} title="Obstacles &amp; Self-Awareness">
                <div className="space-y-0 divide-y divide-white/[0.05] border border-white/[0.07] rounded-xl overflow-hidden">
                  <QuestionField label="Already Tried" value={questionnaire.already_tried} />
                  <QuestionField label="What Stops Consistency" value={questionnaire.what_stops_consistency} />
                  <QuestionField label="Cost of Staying the Same" value={questionnaire.cost_of_staying} />
                  <QuestionField label="Trying Alone" value={questionnaire.trying_alone != null ? (questionnaire.trying_alone ? 'Yes' : 'No') : null} />
                  <QuestionField label="Brotherhood Helps" value={questionnaire.believe_brotherhood_helps != null ? (questionnaire.believe_brotherhood_helps ? 'Yes' : 'No') : null} />
                </div>
              </QSection>

              <QSection icon={<Flame className="w-3.5 h-3.5" />} title="Commitment &amp; Readiness">
                <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                  <InfoField
                    label="Discipline Rating"
                    value={questionnaire.discipline_rating != null ? `${questionnaire.discipline_rating} / 10` : '—'}
                  />
                  <InfoField
                    label="Seriousness Rating"
                    value={questionnaire.seriousness_rating != null ? `${questionnaire.seriousness_rating} / 10` : '—'}
                  />
                  <InfoField
                    label="Training Days / Week"
                    value={questionnaire.training_days_per_week != null ? String(questionnaire.training_days_per_week) : '—'}
                  />
                  <InfoField
                    label="Prayer Days / Week"
                    value={questionnaire.prayer_days_per_week != null ? String(questionnaire.prayer_days_per_week) : '—'}
                  />
                </div>
                <div className="divide-y divide-white/[0.05] border border-white/[0.07] rounded-xl overflow-hidden">
                  <QuestionField label="Willing to Invest" value={questionnaire.willing_to_invest} />
                </div>
              </QSection>
            </>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3.5 bg-[#1A1A1A] border border-white/[0.07] rounded-xl">
              <ClipboardList className="w-4 h-4 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">Questionnaire not yet completed</span>
            </div>
          )}

          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-2 pb-1">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em]">Update Status</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    status === s
                      ? 'border-[#FFC300]/60 bg-[#FFC300]/10 text-[#FFC300]'
                      : 'border-white/[0.08] text-gray-500 hover:border-white/25 hover:text-white bg-[#1A1A1A]'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <span className="block text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em]">Internal Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add notes about this applicant..."
              className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FFC300]/40 focus:ring-1 focus:ring-[#FFC300]/20 resize-none transition-colors leading-relaxed"
            />
          </div>

          {saveError && (
            <p className="text-sm text-[#D11F2A] bg-[#D11F2A]/8 border border-[#D11F2A]/20 rounded-lg px-4 py-2.5">{saveError}</p>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFC300] via-[#FFD033] to-[#D4A000] text-[#0B0B0B] text-sm font-bold rounded-xl hover:from-[#FFD033] hover:to-[#E5B100] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(255,195,0,0.25)]"
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

function QSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-[#FFC300]">{icon}</span>
        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em]">{title}</span>
      </div>
      {children}
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1A1A1A] border border-white/[0.06] rounded-xl px-4 py-3">
      <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-[0.1em] mb-1">{label}</p>
      <p className="text-sm text-white leading-snug break-words">{value}</p>
    </div>
  );
}

function QuestionField({ label, value }: { label: string; value: string | null | undefined }) {
  if (value == null || value === '') return null;
  return (
    <div className="px-4 py-3.5 bg-[#1A1A1A]">
      <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-[0.1em] mb-1.5">{label}</p>
      <p className="text-sm text-gray-100 leading-relaxed">{value}</p>
    </div>
  );
}
