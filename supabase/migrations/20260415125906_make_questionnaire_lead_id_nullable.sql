/*
  # Make questionnaire_responses.lead_id nullable and update INSERT policy

  ## Changes
  - Makes lead_id nullable so questionnaire can be submitted without a linked lead
  - Updates the INSERT policy to allow submissions with or without a lead_id
  - When lead_id is provided it must still be a valid lead
*/

ALTER TABLE questionnaire_responses
  ALTER COLUMN lead_id DROP NOT NULL;

DROP POLICY IF EXISTS "Allow questionnaire submissions for existing leads" ON questionnaire_responses;

CREATE POLICY "Allow questionnaire submissions"
  ON questionnaire_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    lead_id IS NULL
    OR (EXISTS (
      SELECT 1 FROM leads WHERE leads.id = questionnaire_responses.lead_id
    ))
  );
