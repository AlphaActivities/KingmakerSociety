import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const body = await req.json();
    const { email, data } = body;

    if (!email || !data) {
      return new Response(JSON.stringify({ error: 'Missing email or data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (leadError || !lead) {
      return new Response(JSON.stringify({ error: 'Lead not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { error: insertError } = await supabase
      .from('questionnaire_responses')
      .insert([{
        lead_id: lead.id,
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
      }]);

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
