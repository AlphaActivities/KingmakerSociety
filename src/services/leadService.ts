const FUNCTIONS_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const edgeFetch = (slug: string, body: Record<string, unknown>) =>
  fetch(`${FUNCTIONS_BASE}/${slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });

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

export const submitLead = async (
  data: LeadData
): Promise<{ success: boolean; applicationToken?: string; resumed?: boolean; error?: string }> => {
  try {
    const res = await edgeFetch('create-application', {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      age: data.age || null,
      timezone: data.timezone || null,
      occupation: data.occupation || null,
      biggest_struggle: data.struggle || null,
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      return { success: false, error: json.error || 'Failed to submit application. Please try again.' };
    }

    return {
      success: true,
      applicationToken: json.application_token,
      resumed: json.resumed ?? false,
    };
  } catch {
    return { success: false, error: 'Failed to submit application. Please try again.' };
  }
};

export const submitQuestionnaire = async (
  applicationToken: string,
  data: QuestionnaireData
): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await edgeFetch('submit-questionnaire', {
      application_token: applicationToken,
      main_goal_90_days: data.mainGoal90Days,
      life_12_months: data.life12Months,
      want_business: data.wantBusiness,
      improvement_area: data.improvementArea,
      already_tried: data.alreadyTried,
      what_stops_consistency: data.whatStopsConsistency,
      discipline_rating: data.disciplineRating,
      training_days_per_week: data.trainingDaysPerWeek,
      prayer_days_per_week: data.prayerDaysPerWeek,
      trying_alone: data.tryingAlone,
      believe_brotherhood_helps: data.believeBrotherhoodHelps,
      cost_of_staying: data.costOfStaying,
      seriousness_rating: data.seriousnessRating,
      willing_to_invest: data.willingToInvest,
      interested_path: data.interestedPath,
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      return { success: false, error: json.error || 'Failed to submit questionnaire. Please try again.' };
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to submit questionnaire. Please try again.' };
  }
};
