import { supabase } from '../lib/supabase';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted';

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
  created_at: string;
}

export interface LeadUpdate {
  status?: LeadStatus;
  notes?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export const fetchLeads = async (): Promise<{ data: Lead[] | null; error: string | null }> => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data: data as Lead[], error: null };
};

export const fetchLeadById = async (id: string): Promise<{ data: Lead | null; error: string | null }> => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
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
    .select()
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data: data as Lead, error: null };
};
