/*
  # Make phone nullable on leads table

  ## Changes
  - Makes phone nullable since NOT NULL with no default causes constraint errors
    that surface as RLS violations
  - Validation is handled at the application layer
*/

ALTER TABLE leads
  ALTER COLUMN phone DROP NOT NULL;
