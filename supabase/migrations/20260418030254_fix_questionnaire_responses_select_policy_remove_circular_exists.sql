/*
  # Fix questionnaire_responses SELECT policy — remove circular EXISTS clause

  ## Problem
  The "Approved users can read questionnaire responses" SELECT policy contained:
    EXISTS (SELECT 1 FROM leads WHERE leads.id = questionnaire_responses.lead_id)
  
  This sub-query fires the leads SELECT RLS policy recursively during PostgREST
  join evaluation, causing a circular permission check that PostgREST reports as
  a relationship/permission error on any embedded join query from the dashboard.

  ## Change
  - DROP the existing "Approved users can read questionnaire responses" SELECT policy
  - RECREATE it with only the approved-email check (no EXISTS sub-query)
  - The FK constraint already guarantees referential integrity — the EXISTS check
    is redundant and harmful here
  - All other policies (INSERT, service_role SELECT) are left untouched

  ## Security impact
  None — approved emails still must match the allowlist. Unauthenticated users
  and non-approved authenticated users still cannot read any rows.
*/

DROP POLICY IF EXISTS "Approved users can read questionnaire responses" ON public.questionnaire_responses;

CREATE POLICY "Approved users can read questionnaire responses"
  ON public.questionnaire_responses
  FOR SELECT
  TO authenticated
  USING (
    (SELECT (auth.jwt() ->> 'email')) = ANY (ARRAY[
      'yourcustomerflowguy@gmail.com',
      'jordanaliwork@gmail.com',
      'heberherrera92@gmail.com'
    ])
  );
