-- ============================================
-- COMPLETE DATABASE MIGRATION
-- Copy and paste this ENTIRE file into Supabase SQL Editor
-- ============================================

-- Migration 2: Add Choice Fields for Target Audience
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

-- Migration 3: Add All New Choice Fields
DO $$
BEGIN
  -- Main pages as array
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'main_pages_array'
  ) THEN
    ALTER TABLE briefs ADD COLUMN main_pages_array text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'main_pages_other'
  ) THEN
    ALTER TABLE briefs ADD COLUMN main_pages_other text;
  END IF;

  -- Specific features as array
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'specific_features_array'
  ) THEN
    ALTER TABLE briefs ADD COLUMN specific_features_array text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'specific_features_other'
  ) THEN
    ALTER TABLE briefs ADD COLUMN specific_features_other text;
  END IF;

  -- Brand tone as array
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'brand_tone_array'
  ) THEN
    ALTER TABLE briefs ADD COLUMN brand_tone_array text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'brand_tone_other'
  ) THEN
    ALTER TABLE briefs ADD COLUMN brand_tone_other text;
  END IF;

  -- Content types as array
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'content_types_array'
  ) THEN
    ALTER TABLE briefs ADD COLUMN content_types_array text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'content_types_other'
  ) THEN
    ALTER TABLE briefs ADD COLUMN content_types_other text;
  END IF;

  -- Domain name details
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'domain_name_details'
  ) THEN
    ALTER TABLE briefs ADD COLUMN domain_name_details text;
  END IF;

  -- Hosting details
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'hosting_details'
  ) THEN
    ALTER TABLE briefs ADD COLUMN hosting_details text;
  END IF;

  -- CMS preference details
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'cms_preference_details'
  ) THEN
    ALTER TABLE briefs ADD COLUMN cms_preference_details text;
  END IF;

  -- Maintenance as array
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'maintenance_array'
  ) THEN
    ALTER TABLE briefs ADD COLUMN maintenance_array text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'maintenance_other'
  ) THEN
    ALTER TABLE briefs ADD COLUMN maintenance_other text;
  END IF;

END $$;

-- Migration 4: Update RLS Policies for Public Access
DROP POLICY IF EXISTS "Anyone can create briefs" ON briefs;
DROP POLICY IF EXISTS "Anyone can view briefs" ON briefs;
DROP POLICY IF EXISTS "Anyone can update briefs" ON briefs;
DROP POLICY IF EXISTS "Anyone can delete briefs" ON briefs;

CREATE POLICY "Public can create briefs"
  ON briefs FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can view briefs"
  ON briefs FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can update briefs"
  ON briefs FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete briefs"
  ON briefs FOR DELETE
  TO anon
  USING (true);
