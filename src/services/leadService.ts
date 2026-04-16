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

    const { data: inserted, error } = await supabase
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
      ])
      .select('id')
      .maybeSingle();

    if (error) {
      console.error('Lead submission error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, leadId: inserted?.id };
  } catch (error) {
    console.error('Lead submission error:', error);
    return { success: false, error: 'Failed to submit application. Please try again.' };
  }
};

export const submitQuestionnaire = async (
  leadId: string | null,
  data: QuestionnaireData,
  _email?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const payload: Record<string, unknown> = {
      main_goal_90_days: data.mainGoal90Days,
      life_12_months: data.life12Months,
      want_business: data.wantBusiness,
      improvement_area: data.improvementArea,
      already_tried: data.alreadyTried,
      what_stops_consistency: data.whatStopsConsistency,
      discipline_rating: parseInt(data.disciplineRating) || null,
      training_days_per_week: parseInt(data.trainingDaysPerWeek) || null,
      prayer_days_per_week: parseInt(data.prayerDaysPerWeek) || null,
      trying_alone: data.tryingAlone === 'yes',
      believe_brotherhood_helps: data.believeBrotherhoodHelps === 'yes',
      cost_of_staying: data.costOfStaying,
      seriousness_rating: parseInt(data.seriousnessRating) || null,
      willing_to_invest: data.willingToInvest,
      interested_path: data.interestedPath,
    };

    if (leadId) {
      payload.lead_id = leadId;
    }

    const { error } = await supabase.from('questionnaire_responses').insert([payload]);

    if (error) {
      console.error('Questionnaire submission error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Questionnaire submission error:', error);
    return { success: false, error: 'Failed to submit questionnaire. Please try again.' };
  }
};
