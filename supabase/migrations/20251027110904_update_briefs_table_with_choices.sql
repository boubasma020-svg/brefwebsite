/*
  # Update briefs table with specific choice fields

  1. Changes
    - Replace `target_audience` text field with specific demographic fields:
      - `target_age_ranges` (text array) - Multiple age ranges
      - `target_gender` (text array) - Gender options
      - `target_locations` (text array) - Geographic locations
      - `target_professions` (text array) - Professional categories
      - `target_digital_habits` (text array) - Digital behavior patterns
    - Replace `site_objectives` text field with:
      - `site_objectives` (text array) - Multiple objective choices
    
  2. Notes
    - Using text arrays to allow multiple selections
    - Original text fields are being replaced with structured choices
*/

-- Add new columns for target audience with specific choices
DO $$
BEGIN
  -- Add target age ranges
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_age_ranges'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_age_ranges text[] DEFAULT '{}';
  END IF;

  -- Add target gender
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_gender'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_gender text[] DEFAULT '{}';
  END IF;

  -- Add target locations
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_locations'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_locations text[] DEFAULT '{}';
  END IF;

  -- Add target professions
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_professions'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_professions text[] DEFAULT '{}';
  END IF;

  -- Add target digital habits
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_digital_habits'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_digital_habits text[] DEFAULT '{}';
  END IF;

  -- Add site objectives as array
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'site_objectives_choices'
  ) THEN
    ALTER TABLE briefs ADD COLUMN site_objectives_choices text[] DEFAULT '{}';
  END IF;
END $$;