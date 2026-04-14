/*
  # Create Leads and Applications Tables

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `age` (integer)
      - `timezone` (text)
      - `occupation` (text)
      - `biggest_struggle` (text)
      - `status` (text) - new, contacted, qualified, converted
      - `created_at` (timestamptz)
      
    - `questionnaire_responses`
      - `id` (uuid, primary key)
      - `lead_id` (uuid, foreign key to leads)
      - `main_goal_90_days` (text)
      - `life_12_months` (text)
      - `want_business` (text)
      - `improvement_area` (text)
      - `already_tried` (text)
      - `what_stops_consistency` (text)
      - `discipline_rating` (integer)
      - `training_days_per_week` (integer)
      - `prayer_days_per_week` (integer)
      - `trying_alone` (boolean)
      - `believe_brotherhood_helps` (boolean)
      - `cost_of_staying` (text)
      - `seriousness_rating` (integer)
      - `willing_to_invest` (text)
      - `interested_path` (text)
      - `created_at` (timestamptz)
      
  2. Security
    - Enable RLS on both tables
    - Add policies for inserting new leads (public access for form submissions)
*/

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  age integer NOT NULL,
  timezone text NOT NULL,
  occupation text NOT NULL,
  biggest_struggle text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create questionnaire_responses table
CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  main_goal_90_days text,
  life_12_months text,
  want_business text,
  improvement_area text,
  already_tried text,
  what_stops_consistency text,
  discipline_rating integer,
  training_days_per_week integer,
  prayer_days_per_week integer,
  trying_alone boolean,
  believe_brotherhood_helps boolean,
  cost_of_staying text,
  seriousness_rating integer,
  willing_to_invest text,
  interested_path text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Policies for public lead submission
CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can insert questionnaire responses"
  ON questionnaire_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admin read policies (authenticated users can read their own submissions)
CREATE POLICY "Authenticated users can read all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read all questionnaire responses"
  ON questionnaire_responses
  FOR SELECT
  TO authenticated
  USING (true);