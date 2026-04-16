import { supabase } from '../lib/supabase';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted';
export type ApplicationStage = 'lead-form' | 'questionnaire' | 'call-booking' | 'complete';

export interface QuestionnaireResponse {
  id: string;
  main_goal_90_days: string | null;
  life_12_months: string | null;
  want_business: string | null;
  improvement_area: string | null;
  already_tried: string | null;
  what_stops_consistency: string | null;
  discipline_rating: number | null;
  training_days_per_week: number | null;
  prayer_days_per_week: number | null;
  trying_alone: boolean | null;
  believe_brotherhood_helps: boolean | null;
  cost_of_staying: string | null;
  seriousness_rating: number | null;
  willing_to_invest: string | null;
  interested_path: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number | null;
  timezone: string | null;
  occupation: string | null;
  biggest_struggle: string | null;
  status: LeadStatus;
  notes: string;
  application_stage: ApplicationStage;
  completed_at: string | null;
  created_at: string;
  questionnaire_responses?: QuestionnaireResponse[];
}

export interface LeadUpdate {
  status?: LeadStatus;
  notes?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

const LEAD_SELECT = `
  id,
  first_name,
  last_name,
  email,
  phone,
  age,
  timezone,
  occupation,
  biggest_struggle,
  status,
  notes,
  application_stage,
  completed_at,
  created_at,
  questionnaire_responses (
    id,
    main_goal_90_days,
    life_12_months,
    want_business,
    improvement_area,
    already_tried,
    what_stops_consistency,
    discipline_rating,
    training_days_per_week,
    prayer_days_per_week,
    trying_alone,
    believe_brotherhood_helps,
    cost_of_staying,
    seriousness_rating,
    willing_to_invest,
    interested_path,
    created_at
  )
`;

export const fetchLeads = async (): Promise<{ data: Lead[] | null; error: string | null }> => {
  const { data, error } = await supabase
    .from('leads')
    .select(LEAD_SELECT)
    .order('created_at', { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data: data as Lead[], error: null };
};

export const fetchLeadById = async (id: string): Promise<{ data: Lead | null; error: string | null }> => {
  const { data, error } = await supabase
    .from('leads')
    .select(LEAD_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data: data as Lead, error: null };
};

export const updateLead = async (
  id: string,
  fields: LeadUpdate
): Promise<{ data: Lead | null; error: string | null }> => {
  const { data, error } = await supabase
    .from('leads')
    .update(fields)
    .eq('id', id)
    .select(LEAD_SELECT)
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data: data as Lead, error: null };
};
