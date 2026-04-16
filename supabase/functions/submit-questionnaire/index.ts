import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );

    const body = await req.json();
    const { application_token, ...questionnaireFields } = body;

    if (!application_token) {
      return new Response(
        JSON.stringify({ success: false, error: "application_token is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Resolve internal lead.id from application_token — never exposed to client
    const { data: lead, error: lookupError } = await supabase
      .from("leads")
      .select("id")
      .eq("application_token", application_token)
      .is("completed_at", null)
      .maybeSingle();

    if (lookupError) {
      console.error("Token lookup error:", lookupError);
      return new Response(
        JSON.stringify({ success: false, error: "Database error during token lookup" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!lead) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid or already completed application token" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const {
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
    } = questionnaireFields;

    // Insert questionnaire response using the internal lead.id (never sent to client)
    const { error: insertError } = await supabase
      .from("questionnaire_responses")
      .insert({
        lead_id: lead.id,
        main_goal_90_days: main_goal_90_days || null,
        life_12_months: life_12_months || null,
        want_business: want_business || null,
        improvement_area: improvement_area || null,
        already_tried: already_tried || null,
        what_stops_consistency: what_stops_consistency || null,
        discipline_rating: discipline_rating ? parseInt(String(discipline_rating)) : null,
        training_days_per_week: training_days_per_week ? parseInt(String(training_days_per_week)) : null,
        prayer_days_per_week: prayer_days_per_week ? parseInt(String(prayer_days_per_week)) : null,
        trying_alone: trying_alone === true || trying_alone === "yes",
        believe_brotherhood_helps: believe_brotherhood_helps === true || believe_brotherhood_helps === "yes",
        cost_of_staying: cost_of_staying || null,
        seriousness_rating: seriousness_rating ? parseInt(String(seriousness_rating)) : null,
        willing_to_invest: willing_to_invest || null,
        interested_path: interested_path || null,
      });

    if (insertError) {
      console.error("Questionnaire insert error:", insertError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to submit questionnaire" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mark lead as complete — set completed_at and application_stage
    const { error: updateError } = await supabase
      .from("leads")
      .update({
        application_stage: "complete",
        completed_at: new Date().toISOString(),
      })
      .eq("application_token", application_token);

    if (updateError) {
      console.error("Stage update error:", updateError);
      // Non-fatal: questionnaire was saved, just stage update failed
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
