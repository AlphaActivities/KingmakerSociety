/*
  # Fix leads table INSERT policy

  1. Changes
    - Remove restrictive INSERT policy that requires valid email validation
    - Add permissive INSERT policy allowing anonymous lead submissions
  
  2. Security
    - RLS remains enabled on leads table
    - Policy allows INSERT for both anon and authenticated roles
    - All other policies remain unchanged
*/

DROP POLICY IF EXISTS "Allow lead submissions with valid email" ON leads;

CREATE POLICY "Allow anonymous lead submissions"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);