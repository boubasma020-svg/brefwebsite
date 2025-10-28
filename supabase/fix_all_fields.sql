-- ============================================
-- FIX: Ensure all fields exist in the database
-- Run this SQL in Supabase SQL Editor
-- ============================================

-- First, let's see what columns we have
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'briefs' ORDER BY column_name;

-- Ensure we keep the old text fields AND add the new array fields
DO $$
BEGIN
  -- Keep main_pages as text field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'main_pages'
  ) THEN
    ALTER TABLE briefs ADD COLUMN main_pages text;
  END IF;

  -- Add main_pages_array for multi-select
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

  -- Keep specific_features as text field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'specific_features'
  ) THEN
    ALTER TABLE briefs ADD COLUMN specific_features text;
  END IF;

  -- Add specific_features_array for multi-select
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

  -- Keep brand_tone as text field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'brand_tone'
  ) THEN
    ALTER TABLE briefs ADD COLUMN brand_tone text;
  END IF;

  -- Add brand_tone_array for multi-select
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

  -- Keep content_types as text field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'content_types'
  ) THEN
    ALTER TABLE briefs ADD COLUMN content_types text;
  END IF;

  -- Add content_types_array for multi-select
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

  -- Keep maintenance as text field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'maintenance'
  ) THEN
    ALTER TABLE briefs ADD COLUMN maintenance text;
  END IF;

  -- Add maintenance_array for multi-select
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

  -- Target audience fields
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_age_ranges'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_age_ranges text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_gender'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_gender text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_locations'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_locations text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_professions'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_professions text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_digital_habits'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_digital_habits text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'site_objectives_choices'
  ) THEN
    ALTER TABLE briefs ADD COLUMN site_objectives_choices text[] DEFAULT '{}';
  END IF;

END $$;

-- Verify all columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'briefs'
ORDER BY column_name;
