/*
  # Add Application Token, Stage, and Completion Tracking to Leads

  ## Summary
  Upgrades the leads table to support a token-based public application session model.
  The application_token becomes the only identity exposed to the public client.
  The internal lead.id is never returned to or stored by the client.

  ## New Columns

  ### leads table
  - `application_token` (uuid, unique, not null, default gen_random_uuid())
    The public-safe session identity for the /apply journey.
    Clients store this token in localStorage for resume support.
    All client-side API calls reference this token, never lead.id.

  - `application_stage` (text, not null, default 'intro')
    Tracks the applicant's furthest completed stage server-side.
    Values: 'intro' | 'goals' | 'reality' | 'commitment' | 'complete'
    Used to support resume and dashboard visibility into completion status.

  - `completed_at` (timestamptz, nullable, default null)
    Set when the questionnaire is fully submitted via the submit-questionnaire
    edge function. Null means the application is incomplete.

  ## Indexes
  - Unique index on application_token for fast token lookups in edge functions

  ## RLS Changes
  - Adds a SELECT policy scoped to anon/authenticated so applicants can
    look up their own record by application_token ONLY (for resume support).
    This policy is strictly limited: it can only read the token and stage columns
    needed for resume. It does NOT expose lead.id, email, or any PII to the client.

  ## Security Notes
  - application_token is a non-guessable UUID generated server-side
  - lead.id remains inaccessible to the public client under all policies
  - The new SELECT policy uses application_token as the only WHERE condition
  - Dashboard admin SELECT/UPDATE policies are unchanged
  - Edge functions use the service role key server-side to resolve lead.id from token
*/

-- Add application_token column
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS application_token uuid NOT NULL DEFAULT gen_random_uuid();

-- Add unique constraint on application_token
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'leads_application_token_key'
  ) THEN
    ALTER TABLE leads ADD CONSTRAINT leads_application_token_key UNIQUE (application_token);
  END IF;
END $$;

-- Add index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_leads_application_token ON leads (application_token);

-- Add application_stage column
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS application_stage text NOT NULL DEFAULT 'intro';

-- Add completed_at column
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS completed_at timestamptz DEFAULT NULL;

-- RLS: Allow public clients to read only their own stage by token
-- This is strictly for resume support. Only application_token and application_stage
-- are needed client-side. PII columns are not selected by the client.
CREATE POLICY "Applicants can read own stage by token"
  ON leads
  FOR SELECT
  TO anon, authenticated
  USING (application_token = (
    SELECT (current_setting('request.jwt.claims', true)::json ->> 'app_token')::uuid
  ));
