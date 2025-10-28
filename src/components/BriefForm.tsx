import { useState, FormEvent } from 'react';
import { supabase, AGE_RANGES, GENDERS, LOCATIONS, PROFESSIONS, DIGITAL_HABITS, SITE_OBJECTIVES, MAIN_PAGES, SPECIFIC_FEATURES, BRAND_TONES, CONTENT_TYPES, DOMAIN_STATUS, HOSTING_OPTIONS, CMS_OPTIONS, MAINTENANCE_OPTIONS } from '../lib/supabase';
import { FileText } from 'lucide-react';
import MultiSelect from './MultiSelect';
import FileUpload from './FileUpload';

interface BriefFormProps {
  onSuccess: () => void;
}

export default function BriefForm({ onSuccess }: BriefFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    activity_sector: '',
    history_positioning: '',
    site_objectives: '',
    site_objectives_choices: [] as string[],
    expected_results: '',
    kpis: '',
    target_audience: '',
    target_age_ranges: [] as string[],
    target_gender: [] as string[],
    target_locations: [] as string[],
    target_professions: [] as string[],
    target_digital_habits: [] as string[],
    target_needs: '',
    user_experience: '',
    main_pages: [] as string[],
    main_pages_other: '',
    specific_features: [] as string[],
    specific_features_other: '',
    competitor_examples: '',
    visual_identity: '',
    visual_identity_text: '',
    visual_identity_document_url: '',
    colors_typography: '',
    brand_tone: [] as string[],
    brand_tone_other: '',
    content_types: [] as string[],
    content_types_other: '',
    content_text: '',
    content_document_url: '',
    content_provider: '',
    seo_optimization: false,
    domain_name: '',
    domain_name_details: '',
    hosting: '',
    hosting_details: '',
    cms_preference: '',
    cms_preference_details: '',
    budget: '',
    deadline: '',
    validation_phases: '',
    maintenance: [] as string[],
    maintenance_other: '',
    training_needed: false,
    future_evolutions: '',
    team_member_name: '',
    team_member_email: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Transform form data to match database schema
      const dbData = {
        company_name: formData.company_name,
        activity_sector: formData.activity_sector,
        history_positioning: formData.history_positioning,
        site_objectives: formData.site_objectives,
        site_objectives_choices: formData.site_objectives_choices,
        expected_results: formData.expected_results,
        kpis: formData.kpis,
        target_audience: formData.target_audience,
        target_age_ranges: formData.target_age_ranges,
        target_gender: formData.target_gender,
        target_locations: formData.target_locations,
        target_professions: formData.target_professions,
        target_digital_habits: formData.target_digital_habits,
        target_needs: formData.target_needs,
        user_experience: formData.user_experience,
        main_pages_array: formData.main_pages,
        main_pages_other: formData.main_pages_other,
        specific_features_array: formData.specific_features,
        specific_features_other: formData.specific_features_other,
        competitor_examples: formData.competitor_examples,
        visual_identity: formData.visual_identity,
        visual_identity_text: formData.visual_identity_text,
        visual_identity_document_url: formData.visual_identity_document_url,
        colors_typography: formData.colors_typography,
        brand_tone_array: formData.brand_tone,
        brand_tone_other: formData.brand_tone_other,
        content_types_array: formData.content_types,
        content_types_other: formData.content_types_other,
        content_text: formData.content_text,
        content_document_url: formData.content_document_url,
        content_provider: formData.content_provider,
        seo_optimization: formData.seo_optimization,
        domain_name: formData.domain_name,
        domain_name_details: formData.domain_name_details,
        hosting: formData.hosting,
        hosting_details: formData.hosting_details,
        cms_preference: formData.cms_preference,
        cms_preference_details: formData.cms_preference_details,
        budget: formData.budget,
        deadline: formData.deadline,
        validation_phases: formData.validation_phases,
        maintenance_array: formData.maintenance,
        maintenance_other: formData.maintenance_other,
        training_needed: formData.training_needed,
        future_evolutions: formData.future_evolutions,
        team_member_name: formData.team_member_name,
        team_member_email: formData.team_member_email,
      };

      console.log('Submitting brief data:', dbData);

      const { data, error } = await supabase.from('briefs').insert([dbData]);

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      console.log('Brief submitted successfully:', data);
      alert('Brief soumis avec succès!');
      onSuccess();
    } catch (error: any) {
      console.error('Error submitting brief:', error);

      // More detailed error message
      let errorMessage = 'Erreur lors de la soumission du brief';

      if (error?.message) {
        errorMessage += `:\n${error.message}`;
      }

      if (error?.details) {
        errorMessage += `\nDétails: ${error.details}`;
      }

      if (error?.hint) {
        errorMessage += `\nSuggestion: ${error.hint}`;
      }

      // Check for specific errors
      if (error?.message?.includes('column') && error?.message?.includes('does not exist')) {
        errorMessage += '\n\nIl semble que certaines colonnes manquent dans la base de données. Veuillez exécuter les scripts de migration SQL dans Supabase.';
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Formulaire de Brief - Site Web</h1>
      </div>

      {/* Informations du membre de l'équipe */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          Informations du membre de l'équipe
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du membre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="team_member_name"
              value={formData.team_member_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="team_member_email"
              value={formData.team_member_email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* 1. Présentation du projet */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          1. Présentation du projet
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'entreprise / organisation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
            <input
              type="text"
              name="activity_sector"
              value={formData.activity_sector}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Historique et positionnement
            </label>
            <textarea
              name="history_positioning"
              value={formData.history_positioning}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* 2. Objectifs du site internet */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          2. Objectifs du site internet
        </h2>
        <div className="space-y-6">
          <MultiSelect
            label="Objectifs du site (sélection multiple)"
            options={SITE_OBJECTIVES}
            selected={formData.site_objectives_choices}
            onChange={(selected) => setFormData({ ...formData, site_objectives_choices: selected })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autres précisions sur les objectifs
            </label>
            <textarea
              name="site_objectives"
              value={formData.site_objectives}
              onChange={handleChange}
              rows={3}
              placeholder="Ajoutez des détails supplémentaires si nécessaire..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Résultats attendus (ventes, contacts, notoriété, fidélisation, etc.)
            </label>
            <textarea
              name="expected_results"
              value={formData.expected_results}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Indicateurs de succès (KPI)
            </label>
            <input
              type="text"
              name="kpis"
              value={formData.kpis}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* 3. Public cible */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          3. Public cible
        </h2>
        <div className="space-y-6">
          <MultiSelect
            label="Tranches d'âge"
            options={AGE_RANGES}
            selected={formData.target_age_ranges}
            onChange={(selected) => setFormData({ ...formData, target_age_ranges: selected })}
          />
          <MultiSelect
            label="Genre"
            options={GENDERS}
            selected={formData.target_gender}
            onChange={(selected) => setFormData({ ...formData, target_gender: selected })}
          />
          <MultiSelect
            label="Localisation géographique"
            options={LOCATIONS}
            selected={formData.target_locations}
            onChange={(selected) => setFormData({ ...formData, target_locations: selected })}
          />
          <MultiSelect
            label="Professions / Catégories socioprofessionnelles"
            options={PROFESSIONS}
            selected={formData.target_professions}
            onChange={(selected) => setFormData({ ...formData, target_professions: selected })}
          />
          <MultiSelect
            label="Habitudes digitales"
            options={DIGITAL_HABITS}
            selected={formData.target_digital_habits}
            onChange={(selected) => setFormData({ ...formData, target_digital_habits: selected })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autres précisions sur la cible
            </label>
            <textarea
              name="target_audience"
              value={formData.target_audience}
              onChange={handleChange}
              rows={3}
              placeholder="Ajoutez des détails supplémentaires si nécessaire..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Besoins et attentes du public
            </label>
            <textarea
              name="target_needs"
              value={formData.target_needs}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expérience utilisateur recherchée
            </label>
            <textarea
              name="user_experience"
              value={formData.user_experience}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* 4. Fonctionnalités souhaitées */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          4. Fonctionnalités souhaitées
        </h2>
        <div className="space-y-6">
          <MultiSelect
            label="Pages principales"
            options={MAIN_PAGES}
            selected={formData.main_pages}
            onChange={(selected) => setFormData({ ...formData, main_pages: selected })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autres pages spécifiques
            </label>
            <textarea
              name="main_pages_other"
              value={formData.main_pages_other}
              onChange={handleChange}
              rows={2}
              placeholder="Décrivez d'autres pages non listées..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <MultiSelect
            label="Fonctionnalités spécifiques"
            options={SPECIFIC_FEATURES}
            selected={formData.specific_features}
            onChange={(selected) => setFormData({ ...formData, specific_features: selected })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autres fonctionnalités
            </label>
            <textarea
              name="specific_features_other"
              value={formData.specific_features_other}
              onChange={handleChange}
              rows={2}
              placeholder="Décrivez d'autres fonctionnalités non listées..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exemples de sites concurrents ou inspirants
            </label>
            <textarea
              name="competitor_examples"
              value={formData.competitor_examples}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* 5. Identité visuelle */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          5. Identité visuelle
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo et charte graphique existants
            </label>
            <textarea
              name="visual_identity"
              value={formData.visual_identity}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Identité visuelle - Description
            </label>
            <input
              type="text"
              name="visual_identity_text"
              value={formData.visual_identity_text}
              onChange={handleChange}
              placeholder="Décrivez votre identité visuelle..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <FileUpload
            label="Document d'identité visuelle"
            value={formData.visual_identity_document_url}
            onChange={(url) => setFormData({ ...formData, visual_identity_document_url: url })}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleurs, typographies, styles visuels préférés
            </label>
            <input
              type="text"
              name="colors_typography"
              value={formData.colors_typography}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <MultiSelect
            label="Tonalité et image de marque"
            options={BRAND_TONES}
            selected={formData.brand_tone}
            onChange={(selected) => setFormData({ ...formData, brand_tone: selected })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autres précisions sur la tonalité
            </label>
            <input
              type="text"
              name="brand_tone_other"
              value={formData.brand_tone_other}
              onChange={handleChange}
              placeholder="Ajoutez d'autres descriptions..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* 6. Contenus */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          6. Contenus
        </h2>
        <div className="space-y-6">
          <MultiSelect
            label="Types de contenus à fournir"
            options={CONTENT_TYPES}
            selected={formData.content_types}
            onChange={(selected) => setFormData({ ...formData, content_types: selected })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autres types de contenus
            </label>
            <input
              type="text"
              name="content_types_other"
              value={formData.content_types_other}
              onChange={handleChange}
              placeholder="Ajoutez d'autres types de contenus..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenus - Description
            </label>
            <input
              type="text"
              name="content_text"
              value={formData.content_text}
              onChange={handleChange}
              placeholder="Décrivez vos contenus..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <FileUpload
            label="Document de contenus"
            value={formData.content_document_url}
            onChange={(url) => setFormData({ ...formData, content_document_url: url })}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qui fournit le contenu ?
            </label>
            <select
              name="content_provider"
              value={formData.content_provider}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner</option>
              <option value="client">Client</option>
              <option value="agence">Agence</option>
              <option value="mixte">Mixte</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="seo_optimization"
              checked={formData.seo_optimization}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Optimisation SEO prévue
            </label>
          </div>
        </div>
      </section>

      {/* 7. Contraintes techniques */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          7. Contraintes techniques
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de domaine
            </label>
            <select
              name="domain_name"
              value={formData.domain_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner</option>
              {DOMAIN_STATUS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Détails du nom de domaine
            </label>
            <input
              type="text"
              name="domain_name_details"
              value={formData.domain_name_details}
              onChange={handleChange}
              placeholder="Ex: monsite.com ou idées de noms..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hébergement
            </label>
            <select
              name="hosting"
              value={formData.hosting}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner</option>
              {HOSTING_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Détails de l'hébergement
            </label>
            <input
              type="text"
              name="hosting_details"
              value={formData.hosting_details}
              onChange={handleChange}
              placeholder="Nom de l'hébergeur, détails techniques..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CMS souhaité
            </label>
            <select
              name="cms_preference"
              value={formData.cms_preference}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner</option>
              {CMS_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Précisions sur le CMS
            </label>
            <input
              type="text"
              name="cms_preference_details"
              value={formData.cms_preference_details}
              onChange={handleChange}
              placeholder="Version, plugins spécifiques, besoins particuliers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* 8. Budget et délais */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          8. Budget et délais
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget disponible (fourchette estimative)
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deadline de livraison
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phases de validation intermédiaires
            </label>
            <textarea
              name="validation_phases"
              value={formData.validation_phases}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* 9. Maintenance et évolution */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          9. Maintenance et évolution
        </h2>
        <div className="space-y-6">
          <MultiSelect
            label="Maintenance technique"
            options={MAINTENANCE_OPTIONS}
            selected={formData.maintenance}
            onChange={(selected) => setFormData({ ...formData, maintenance: selected })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Précisions sur la maintenance
            </label>
            <textarea
              name="maintenance_other"
              value={formData.maintenance_other}
              onChange={handleChange}
              rows={2}
              placeholder="Ajoutez des détails sur vos besoins de maintenance..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="training_needed"
              checked={formData.training_needed}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Formation du client à l'utilisation du site nécessaire
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Évolutions futures possibles
            </label>
            <textarea
              name="future_evolutions"
              value={formData.future_evolutions}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      <div className="flex gap-4 justify-end pt-6 border-t">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Envoi en cours...' : 'Soumettre le brief'}
        </button>
      </div>
    </form>
  );
}
