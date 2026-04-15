import { supabase } from '../lib/supabase';

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  timezone: string;
  occupation: string;
  struggle: string;
}

export interface QuestionnaireData {
  mainGoal90Days: string;
  life12Months: string;
  wantBusiness: string;
  improvementArea: string;
  alreadyTried: string;
  whatStopsConsistency: string;
  disciplineRating: string;
  trainingDaysPerWeek: string;
  prayerDaysPerWeek: string;
  tryingAlone: string;
  believeBrotherhoodHelps: string;
  costOfStaying: string;
  seriousnessRating: string;
  willingToInvest: string;
  interestedPath: string;
}

export const submitLead = async (data: LeadData): Promise<{ success: boolean; leadId?: string; error?: string }> => {
  try {
    const parsedAge = parseInt(data.age);
    const ageValue = !isNaN(parsedAge) ? parsedAge : null;

    const { error } = await supabase
      .from('leads')
      .insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          age: ageValue,
          timezone: data.timezone,
          occupation: data.occupation,
          biggest_struggle: data.struggle,
        },
      ]);

    if (error) {
      console.error('Lead submission error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Lead submission error:', error);
    return { success: false, error: 'Failed to submit application. Please try again.' };
  }
};

export const submitQuestionnaire = async (
  _leadId: string | null,
  data: QuestionnaireData,
  email?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const res = await fetch(`${supabaseUrl}/functions/v1/submit-questionnaire`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Apikey': supabaseAnonKey,
      },
      body: JSON.stringify({ email: email ?? '', data }),
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      console.error('Questionnaire submission error:', json.error);
      return { success: false, error: json.error || 'Failed to submit questionnaire.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Questionnaire submission error:', error);
    return { success: false, error: 'Failed to submit questionnaire. Please try again.' };
  }
};
