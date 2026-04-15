/*
  # Make optional lead fields nullable

  ## Changes
  - Makes age, timezone, occupation, biggest_struggle nullable
  - These fields have no default values so NOT NULL causes RLS-surfaced errors
    when values are missing or invalid (e.g. age parse fails to int)
  - Data integrity is enforced at the application layer via form validation
*/

ALTER TABLE leads
  ALTER COLUMN age DROP NOT NULL,
  ALTER COLUMN timezone DROP NOT NULL,
  ALTER COLUMN occupation DROP NOT NULL,
  ALTER COLUMN biggest_struggle DROP NOT NULL;
