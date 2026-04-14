/*
  # Fix RLS Security and Performance Issues

  ## Overview
  This migration addresses critical security and performance issues in RLS policies:
  - Fixes performance degradation from repeated auth function calls
  - Replaces insecure policies that bypass RLS with proper validation
  - Ensures data integrity for lead submissions

  ## Changes Made

  ### 1. Performance Improvements
  - Updated service role policies to use `(select auth.jwt())` instead of `auth.jwt()`
  - Prevents re-evaluation of auth functions for each row at scale
  - Applies to both `leads` and `questionnaire_responses` tables

  ### 2. Security Fixes for leads table
  - Removed policies with `WITH CHECK (true)` that bypass RLS
  - Replaced with secure policies that validate:
    - Required fields are present (first_name, last_name, email)
    - Email format is valid (contains @)
    - Prevents empty or null critical data
  - Maintains support for both anonymous and authenticated users

  ## Security Notes
  - RLS remains enabled on all tables
  - Service role policies now perform efficiently at scale
  - Lead submission policies enforce data integrity
  - All existing SELECT policies remain unchanged
*/

-- Fix performance issue in service role policies
-- Replace auth.jwt() with (select auth.jwt()) to prevent per-row evaluation

DROP POLICY IF EXISTS "Service role can read all leads" ON leads;
CREATE POLICY "Service role can read all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (((select auth.jwt()) ->> 'role'::text) = 'service_role'::text);

DROP POLICY IF EXISTS "Service role can read all questionnaire responses" ON questionnaire_responses;
CREATE POLICY "Service role can read all questionnaire responses"
  ON questionnaire_responses
  FOR SELECT
  TO authenticated
  USING (((select auth.jwt()) ->> 'role'::text) = 'service_role'::text);

-- Fix security issue: Replace WITH CHECK (true) with proper validation
-- Remove insecure policies

DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON leads;
DROP POLICY IF EXISTS "Allow authenticated lead submissions" ON leads;

-- Create secure lead submission policy with validation
CREATE POLICY "Allow validated lead submissions"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    first_name IS NOT NULL AND 
    first_name != '' AND
    last_name IS NOT NULL AND 
    last_name != '' AND
    email IS NOT NULL AND 
    email != '' AND
    email ~ '^[^@]+@[^@]+\.[^@]+$'
  );
