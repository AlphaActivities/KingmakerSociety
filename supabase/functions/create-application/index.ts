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
    const { first_name, last_name, email, phone, age, timezone, occupation, biggest_struggle } = body;

    if (!first_name || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "first_name and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check for an existing incomplete application with this email
    const { data: existingLead, error: lookupError } = await supabase
      .from("leads")
      .select("application_token, application_stage, completed_at")
      .eq("email", normalizedEmail)
      .is("completed_at", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lookupError) {
      console.error("Lookup error:", lookupError);
      return new Response(
        JSON.stringify({ success: false, error: "Database error during lookup" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Resume existing incomplete application
    if (existingLead) {
      return new Response(
        JSON.stringify({
          success: true,
          application_token: existingLead.application_token,
          application_stage: existingLead.application_stage,
          resumed: true,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse age safely
    const parsedAge = age ? parseInt(String(age)) : null;
    const ageValue = parsedAge !== null && !isNaN(parsedAge) ? parsedAge : null;

    // Create new lead record
    const { data: newLead, error: insertError } = await supabase
      .from("leads")
      .insert({
        first_name: first_name.trim(),
        last_name: last_name ? last_name.trim() : "",
        email: normalizedEmail,
        phone: phone || null,
        age: ageValue,
        timezone: timezone || null,
        occupation: occupation || null,
        biggest_struggle: biggest_struggle || null,
        application_stage: "intro",
      })
      .select("application_token, application_stage")
      .single();

    if (insertError || !newLead) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to create application" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        application_token: newLead.application_token,
        application_stage: newLead.application_stage,
        resumed: false,
      }),
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
