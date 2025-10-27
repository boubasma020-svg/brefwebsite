/*
  # Create briefs table for website project briefs

  1. New Tables
    - `briefs`
      - `id` (uuid, primary key)
      - `company_name` (text) - Nom de l'entreprise
      - `activity_sector` (text) - Secteur d'activité
      - `history_positioning` (text) - Historique et positionnement
      - `site_objectives` (text) - Objectifs du site
      - `expected_results` (text) - Résultats attendus
      - `kpis` (text) - Indicateurs de succès
      - `target_audience` (text) - Public cible
      - `target_needs` (text) - Besoins du public
      - `user_experience` (text) - Expérience utilisateur recherchée
      - `main_pages` (text) - Pages principales
      - `specific_features` (text) - Fonctionnalités spécifiques
      - `competitor_examples` (text) - Exemples de sites concurrents
      - `visual_identity` (text) - Logo et charte graphique
      - `colors_typography` (text) - Couleurs et typographies
      - `brand_tone` (text) - Tonalité et image de marque
      - `content_types` (text) - Types de contenus
      - `content_provider` (text) - Qui fournit le contenu
      - `seo_optimization` (boolean) - Optimisation SEO
      - `domain_name` (text) - Nom de domaine
      - `hosting` (text) - Hébergement
      - `cms_preference` (text) - CMS souhaité
      - `budget` (text) - Budget disponible
      - `deadline` (date) - Deadline de livraison
      - `validation_phases` (text) - Phases de validation
      - `maintenance` (text) - Maintenance technique
      - `training_needed` (boolean) - Formation du client
      - `future_evolutions` (text) - Évolutions futures
      - `team_member_name` (text) - Nom du membre de l'équipe
      - `team_member_email` (text) - Email du membre de l'équipe
      - `created_at` (timestamptz) - Date de création
      - `updated_at` (timestamptz) - Date de mise à jour

  2. Security
    - Enable RLS on `briefs` table
    - Add policies for authenticated users to manage briefs
*/

CREATE TABLE IF NOT EXISTS briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  activity_sector text,
  history_positioning text,
  site_objectives text,
  expected_results text,
  kpis text,
  target_audience text,
  target_needs text,
  user_experience text,
  main_pages text,
  specific_features text,
  competitor_examples text,
  visual_identity text,
  colors_typography text,
  brand_tone text,
  content_types text,
  content_provider text,
  seo_optimization boolean DEFAULT false,
  domain_name text,
  hosting text,
  cms_preference text,
  budget text,
  deadline date,
  validation_phases text,
  maintenance text,
  training_needed boolean DEFAULT false,
  future_evolutions text,
  team_member_name text NOT NULL,
  team_member_email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE briefs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create briefs"
  ON briefs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view briefs"
  ON briefs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can update briefs"
  ON briefs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete briefs"
  ON briefs FOR DELETE
  TO authenticated
  USING (true);