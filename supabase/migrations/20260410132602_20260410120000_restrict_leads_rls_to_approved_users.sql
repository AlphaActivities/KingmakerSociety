/*
  # Restrict Leads RLS to Approved Dashboard Users

  ## Summary
  Replaces the two overly broad authenticated policies on public.leads
  (unrestricted SELECT and unrestricted UPDATE) with narrowly scoped
  policies that only permit access for three approved internal dashboard users,
  identified by their JWT email claim.

  ## Changes

  ### Dropped Policies
  - "Authenticated users can read all leads" (SELECT, USING true) — too broad
  - "Authenticated users can update all leads" (UPDATE, USING true / WITH CHECK true) — too broad

  ### New Policies
  - "Approved users can read leads" (SELECT) — restricted to approved email list
  - "Approved users can update leads" (UPDATE) — restricted to approved email list in both USING and WITH CHECK

  ### Unchanged Policies
  - "Allow validated lead submissions" (INSERT, anon + authenticated) — untouched
  - "Service role can read all leads" (SELECT) — untouched

  ## Security Notes
  - Approved emails are enforced at the database layer via auth.jwt() ->> 'email'
  - No authenticated user outside the approved list can SELECT or UPDATE leads
  - Public form submissions via anonymous INSERT remain fully functional
  - app-layer ProtectedRoute guard remains complementary to this database-layer restriction
*/

DROP POLICY IF EXISTS "Authenticated users can read all leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can update all leads" ON leads;

CREATE POLICY "Approved users can read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (
    (SELECT auth.jwt() ->> 'email') = ANY (ARRAY[
      'yourcustomerflowguy@gmail.com',
      'jordanaliwork@gmail.com',
      'heberherrera92@gmail.com'
    ])
  );

CREATE POLICY "Approved users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (
    (SELECT auth.jwt() ->> 'email') = ANY (ARRAY[
      'yourcustomerflowguy@gmail.com',
      'jordanaliwork@gmail.com',
      'heberherrera92@gmail.com'
    ])
  )
  WITH CHECK (
    (SELECT auth.jwt() ->> 'email') = ANY (ARRAY[
      'yourcustomerflowguy@gmail.com',
      'jordanaliwork@gmail.com',
      'heberherrera92@gmail.com'
    ])
  );
