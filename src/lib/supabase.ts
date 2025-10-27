import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Brief {
  id: string;
  company_name: string;
  activity_sector?: string;
  history_positioning?: string;
  site_objectives?: string;
  site_objectives_choices?: string[];
  expected_results?: string;
  kpis?: string;
  target_audience?: string;
  target_age_ranges?: string[];
  target_gender?: string[];
  target_locations?: string[];
  target_professions?: string[];
  target_digital_habits?: string[];
  target_needs?: string;
  user_experience?: string;
  main_pages?: string;
  specific_features?: string;
  competitor_examples?: string;
  visual_identity?: string;
  colors_typography?: string;
  brand_tone?: string;
  content_types?: string;
  content_provider?: string;
  seo_optimization: boolean;
  domain_name?: string;
  hosting?: string;
  cms_preference?: string;
  budget?: string;
  deadline?: string;
  validation_phases?: string;
  maintenance?: string;
  training_needed: boolean;
  future_evolutions?: string;
  team_member_name: string;
  team_member_email?: string;
  created_at: string;
  updated_at: string;
}

export const AGE_RANGES = [
  '18-24 ans',
  '25-34 ans',
  '35-44 ans',
  '45-54 ans',
  '55-64 ans',
  '65+ ans'
];

export const GENDERS = [
  'Homme',
  'Femme',
  'Non-binaire',
  'Tous'
];

export const LOCATIONS = [
  'Local (ville/région)',
  'National',
  'International',
  'Europe',
  'Amérique du Nord',
  'Afrique',
  'Asie',
  'Autre'
];

export const PROFESSIONS = [
  'Étudiant',
  'Employé',
  'Cadre',
  'Dirigeant',
  'Entrepreneur',
  'Profession libérale',
  'Artisan/Commerçant',
  'Retraité',
  'Sans emploi',
  'Autre'
];

export const DIGITAL_HABITS = [
  'Utilise principalement mobile',
  'Utilise principalement desktop',
  'Actif sur les réseaux sociaux',
  'Achète en ligne régulièrement',
  'Recherche d\'informations en ligne',
  'Utilise des applications mobiles',
  'Consomme du contenu vidéo',
  'Lit des blogs/articles',
  'Participe à des forums/communautés'
];

export const SITE_OBJECTIVES = [
  'Visibilité',
  'E-commerce',
  'Vitrine',
  'Génération de leads',
  'Blog/Contenu',
  'Portfolio',
  'Réservation en ligne',
  'Plateforme communautaire',
  'Formation en ligne',
  'Support client'
];

export const MAIN_PAGES = [
  'Accueil',
  'À propos',
  'Services',
  'Produits',
  'Contact',
  'Blog',
  'FAQ',
  'Témoignages',
  'Portfolio',
  'Équipe',
  'Tarifs',
  'Mentions légales',
  'Politique de confidentialité',
  'Conditions générales'
];

export const SPECIFIC_FEATURES = [
  'Formulaire de contact',
  'Espace client / membre',
  'Système de réservation',
  'Paiement en ligne',
  'Site multilingue',
  'Chat en direct',
  'Newsletter',
  'Recherche avancée',
  'Filtres de produits',
  'Système de notation / avis',
  'Calendrier',
  'Galerie photos / vidéos',
  'Téléchargement de fichiers',
  'Carte interactive',
  'Intégration réseaux sociaux',
  'Forum / Communauté',
  'Tableau de bord analytique'
];

export const BRAND_TONES = [
  'Sérieux et professionnel',
  'Ludique et créatif',
  'Premium et luxueux',
  'Accessible et convivial',
  'Moderne et innovant',
  'Traditionnel et élégant',
  'Jeune et dynamique',
  'Minimaliste et épuré',
  'Chaleureux et humain'
];

export const CONTENT_TYPES = [
  'Textes',
  'Photos',
  'Vidéos',
  'Infographies',
  'Illustrations',
  'Icônes',
  'Documents PDF',
  'Podcasts / Audio',
  'Animations',
  'Présentations'
];

export const DOMAIN_STATUS = [
  'Domaine existant',
  'À acheter',
  'Besoin d\'aide pour choisir',
  'Pas encore décidé'
];

export const HOSTING_OPTIONS = [
  'Hébergement existant',
  'À mettre en place',
  'Besoin de recommandations',
  'Inclus dans la prestation'
];

export const CMS_OPTIONS = [
  'WordPress',
  'Shopify',
  'Wix',
  'Webflow',
  'PrestaShop',
  'Joomla',
  'Drupal',
  'Sur-mesure (développement custom)',
  'Pas de préférence',
  'Besoin de conseils'
];

export const MAINTENANCE_OPTIONS = [
  'Maintenance complète (mises à jour, sécurité, hébergement)',
  'Mises à jour uniquement',
  'Support technique ponctuel',
  'Autonomie complète du client',
  'À définir ultérieurement'
];
