/*
  # Add approved user read policy for questionnaire_responses

  ## Summary
  The questionnaire_responses table currently only allows service_role to SELECT.
  The dashboard runs as an authenticated user (not service_role), so it cannot
  read linked questionnaire data via the Supabase JS client.

  ## Change
  - Add a SELECT policy that mirrors the leads table approved-user allowlist,
    restricted to responses whose lead_id belongs to a lead the approved user
    can already read.

  ## Security
  - Only the same approved email allowlist used on the leads table can read responses.
  - Responses are further scoped: the lead_id must exist in the leads table
    (ensuring no orphan response leakage if that were ever possible).
  - RLS remains ON. No weakening of existing policies.
*/

CREATE POLICY "Approved users can read questionnaire responses"
  ON questionnaire_responses
  FOR SELECT
  TO authenticated
  USING (
    (SELECT auth.jwt() ->> 'email') = ANY (
      ARRAY[
        'yourcustomerflowguy@gmail.com',
        'jordanaliwork@gmail.com',
        'heberherrera92@gmail.com'
      ]
    )
    AND EXISTS (
      SELECT 1 FROM leads WHERE leads.id = questionnaire_responses.lead_id
    )
  );
