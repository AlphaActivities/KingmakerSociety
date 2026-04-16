/*
  # Fix Application Token Resume RLS

  ## Summary
  The previous migration added a SELECT policy that used JWT claims to gate
  token-based resume access. Anonymous applicants do not have JWT app_token
  claims, so that policy will never match for public clients.

  This migration replaces that approach with a Postgres security-definer RPC
  function that accepts an application_token and returns only the
  application_stage for that token. The function runs with elevated privileges
  but returns no PII — only the stage string. This is the correct pattern for
  exposing minimal resume data to anonymous public clients without granting
  any direct table SELECT access.

  ## Changes
  - Drops the JWT-claim-based SELECT policy (it was unreachable for anon clients)
  - Creates get_application_stage(token uuid) RETURNS text as a
    SECURITY DEFINER function accessible to anon and authenticated roles
  - The function returns NULL if the token does not match any row
  - lead.id and all PII columns remain inaccessible to the client

  ## Security Notes
  - The function is SECURITY DEFINER so it bypasses RLS to do the lookup
  - It returns ONLY the application_stage text — no id, no email, no PII
  - Callers cannot enumerate leads; a non-matching token returns NULL silently
  - Direct table SELECT on leads by anon/authenticated remains blocked
    (only the approved admin email policy allows SELECT)
*/

-- Drop the unreachable JWT-claim SELECT policy from the previous migration
DROP POLICY IF EXISTS "Applicants can read own stage by token" ON leads;

-- Create a security-definer function for resume stage lookup
CREATE OR REPLACE FUNCTION get_application_stage(token uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stage_result text;
BEGIN
  SELECT application_stage INTO stage_result
  FROM leads
  WHERE application_token = token
  LIMIT 1;

  RETURN stage_result;
END;
$$;

-- Grant execute to anon and authenticated roles
GRANT EXECUTE ON FUNCTION get_application_stage(uuid) TO anon, authenticated;
