/*
  # Fix Security Issues

  ## Changes Made
  
  1. **Add Missing Index**
     - Add index on `questionnaire_responses.lead_id` to optimize foreign key queries
  
  2. **Replace Insecure RLS Policies**
     - Remove policies with `WITH CHECK (true)` that bypass security
     - Add rate-limiting friendly policies that still allow form submissions but add basic validation
     - New policies verify that required fields are present and data looks legitimate
  
  3. **Improve Read Policies**
     - Replace overly permissive `USING (true)` policies for authenticated users
     - Add proper ownership/permission checks for reading data
  
  ## Security Notes
  
  The new INSERT policies allow anonymous submissions (necessary for public forms) but add
  basic validation to prevent abuse:
  - Require non-empty email addresses
  - Require lead_id to exist for questionnaire responses
  
  For a production system, consider:
  - Implementing rate limiting at the application or edge function level
  - Adding email verification
  - Using service role for admin access instead of broad authenticated access
*/

-- Add index for foreign key performance
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_lead_id 
  ON questionnaire_responses(lead_id);

-- Drop insecure policies
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "Anyone can insert questionnaire responses" ON questionnaire_responses;
DROP POLICY IF EXISTS "Authenticated users can read all leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can read all questionnaire responses" ON questionnaire_responses;

-- Create more secure INSERT policies with basic validation
CREATE POLICY "Allow lead submissions with valid email"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL 
    AND email != '' 
    AND email LIKE '%@%'
    AND first_name IS NOT NULL 
    AND first_name != ''
  );

CREATE POLICY "Allow questionnaire submissions for existing leads"
  ON questionnaire_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    lead_id IS NOT NULL
    AND EXISTS (SELECT 1 FROM leads WHERE leads.id = lead_id)
  );

-- Create restrictive SELECT policies
-- Only service role should read all leads, or implement proper ownership
CREATE POLICY "Service role can read all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt()->>'role' = 'service_role'
  );

CREATE POLICY "Service role can read all questionnaire responses"
  ON questionnaire_responses
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt()->>'role' = 'service_role'
  );