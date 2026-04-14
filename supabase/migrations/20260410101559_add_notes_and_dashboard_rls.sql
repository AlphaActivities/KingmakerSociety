/*
  # Dashboard Access: Notes Column + RLS Policies

  ## Summary
  Prepares the leads table for internal dashboard use.

  ## Changes

  ### 1. New Column
  - `notes` (text) on `leads` table — stores internal admin notes per lead, defaults to empty string

  ### 2. RLS Policies for Authenticated Users
  - SELECT: Authenticated users can read all leads
  - UPDATE: Authenticated users can update all leads

  ### Notes
  - These policies are intended for internal admin users only
  - The approved-email allowlist is enforced at the application layer (ProtectedRoute)
  - Existing anon INSERT policy is untouched — public form submissions continue to work
*/

ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes text DEFAULT '';

CREATE POLICY "Authenticated users can read all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update all leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
