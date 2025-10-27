/*
  # Update all fields to support choice-based selections

  This migration adds new array columns for all the choice-based fields
  and detail fields for additional information.
*/

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
