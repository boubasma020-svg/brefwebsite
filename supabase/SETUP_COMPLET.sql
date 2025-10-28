-- ============================================
-- CONFIGURATION COMPLETE DE SUPABASE
-- Exécutez ce script dans Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/orgesnuldglanqzveloi/sql
-- ============================================

-- ÉTAPE 1: Vérifier si la table briefs existe
-- Si elle n'existe pas, créez-la d'abord avec la structure de base

-- ÉTAPE 2: Ajouter toutes les colonnes nécessaires
DO $$
BEGIN
  -- Colonnes de base
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'company_name'
  ) THEN
    ALTER TABLE briefs ADD COLUMN company_name text NOT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'activity_sector'
  ) THEN
    ALTER TABLE briefs ADD COLUMN activity_sector text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'history_positioning'
  ) THEN
    ALTER TABLE briefs ADD COLUMN history_positioning text;
  END IF;

  -- Objectifs
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'site_objectives'
  ) THEN
    ALTER TABLE briefs ADD COLUMN site_objectives text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'site_objectives_choices'
  ) THEN
    ALTER TABLE briefs ADD COLUMN site_objectives_choices text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'expected_results'
  ) THEN
    ALTER TABLE briefs ADD COLUMN expected_results text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'kpis'
  ) THEN
    ALTER TABLE briefs ADD COLUMN kpis text;
  END IF;

  -- Cibles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'target_audience'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_audience text;
  END IF;

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
    WHERE table_name = 'briefs' AND column_name = 'target_needs'
  ) THEN
    ALTER TABLE briefs ADD COLUMN target_needs text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'user_experience'
  ) THEN
    ALTER TABLE briefs ADD COLUMN user_experience text;
  END IF;

  -- Pages et fonctionnalités
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

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'competitor_examples'
  ) THEN
    ALTER TABLE briefs ADD COLUMN competitor_examples text;
  END IF;

  -- Identité visuelle
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'visual_identity'
  ) THEN
    ALTER TABLE briefs ADD COLUMN visual_identity text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'visual_identity_text'
  ) THEN
    ALTER TABLE briefs ADD COLUMN visual_identity_text text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'visual_identity_document_url'
  ) THEN
    ALTER TABLE briefs ADD COLUMN visual_identity_document_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'colors_typography'
  ) THEN
    ALTER TABLE briefs ADD COLUMN colors_typography text;
  END IF;

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

  -- Contenus
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

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'content_text'
  ) THEN
    ALTER TABLE briefs ADD COLUMN content_text text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'content_document_url'
  ) THEN
    ALTER TABLE briefs ADD COLUMN content_document_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'content_provider'
  ) THEN
    ALTER TABLE briefs ADD COLUMN content_provider text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'seo_optimization'
  ) THEN
    ALTER TABLE briefs ADD COLUMN seo_optimization boolean DEFAULT false;
  END IF;

  -- Contraintes techniques
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'domain_name'
  ) THEN
    ALTER TABLE briefs ADD COLUMN domain_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'domain_name_details'
  ) THEN
    ALTER TABLE briefs ADD COLUMN domain_name_details text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'hosting'
  ) THEN
    ALTER TABLE briefs ADD COLUMN hosting text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'hosting_details'
  ) THEN
    ALTER TABLE briefs ADD COLUMN hosting_details text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'cms_preference'
  ) THEN
    ALTER TABLE briefs ADD COLUMN cms_preference text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'cms_preference_details'
  ) THEN
    ALTER TABLE briefs ADD COLUMN cms_preference_details text;
  END IF;

  -- Budget et délais
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'budget'
  ) THEN
    ALTER TABLE briefs ADD COLUMN budget text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'deadline'
  ) THEN
    ALTER TABLE briefs ADD COLUMN deadline text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'validation_phases'
  ) THEN
    ALTER TABLE briefs ADD COLUMN validation_phases text;
  END IF;

  -- Maintenance
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

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'training_needed'
  ) THEN
    ALTER TABLE briefs ADD COLUMN training_needed boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'future_evolutions'
  ) THEN
    ALTER TABLE briefs ADD COLUMN future_evolutions text;
  END IF;

  -- Informations équipe
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'team_member_name'
  ) THEN
    ALTER TABLE briefs ADD COLUMN team_member_name text NOT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'team_member_email'
  ) THEN
    ALTER TABLE briefs ADD COLUMN team_member_email text;
  END IF;

END $$;

-- Vérifier que toutes les colonnes ont été créées
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'briefs'
ORDER BY column_name;

-- Message de confirmation
SELECT 'Configuration de la base de données terminée avec succès!' as message;
