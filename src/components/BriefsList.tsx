import { useEffect, useState } from 'react';
import { supabase, Brief } from '../lib/supabase';
import { FileText, Calendar, User, Trash2 } from 'lucide-react';

interface BriefsListProps {
  refresh: number;
}

export default function BriefsList({ refresh }: BriefsListProps) {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null);

  useEffect(() => {
    fetchBriefs();
  }, [refresh]);

  const fetchBriefs = async () => {
    try {
      const { data, error } = await supabase
        .from('briefs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBriefs(data || []);
    } catch (error) {
      console.error('Error fetching briefs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBrief = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce brief?')) return;

    try {
      const { error } = await supabase.from('briefs').delete().eq('id', id);

      if (error) throw error;

      setBriefs(briefs.filter((brief) => brief.id !== id));
      if (selectedBrief?.id === id) {
        setSelectedBrief(null);
      }
    } catch (error) {
      console.error('Error deleting brief:', error);
      alert('Erreur lors de la suppression du brief');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (briefs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Aucun brief pour le moment</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Liste des briefs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Briefs soumis ({briefs.length})</h2>
        {briefs.map((brief) => (
          <div
            key={brief.id}
            className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedBrief?.id === brief.id ? 'ring-2 ring-blue-600' : ''
            }`}
            onClick={() => setSelectedBrief(brief)}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-900">{brief.company_name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBrief(brief.id);
                }}
                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            {brief.activity_sector && (
              <p className="text-gray-600 mb-2">{brief.activity_sector}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{brief.team_member_name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(brief.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Détails du brief sélectionné */}
      {selectedBrief && (
        <div className="bg-white rounded-lg shadow-lg p-6 lg:sticky lg:top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails du brief</h2>

          <div className="space-y-6">
            <Section title="Informations du membre">
              <DetailItem label="Nom" value={selectedBrief.team_member_name} />
              {selectedBrief.team_member_email && (
                <DetailItem label="Email" value={selectedBrief.team_member_email} />
              )}
            </Section>

            <Section title="1. Présentation du projet">
              <DetailItem label="Entreprise" value={selectedBrief.company_name} />
              {selectedBrief.activity_sector && (
                <DetailItem label="Secteur d'activité" value={selectedBrief.activity_sector} />
              )}
              {selectedBrief.history_positioning && (
                <DetailItem
                  label="Historique et positionnement"
                  value={selectedBrief.history_positioning}
                />
              )}
            </Section>

            {(selectedBrief.site_objectives_choices?.length ||
              selectedBrief.site_objectives ||
              selectedBrief.expected_results ||
              selectedBrief.kpis) && (
              <Section title="2. Objectifs du site">
                {selectedBrief.site_objectives_choices && selectedBrief.site_objectives_choices.length > 0 && (
                  <DetailTags label="Objectifs sélectionnés" values={selectedBrief.site_objectives_choices} />
                )}
                {selectedBrief.site_objectives && (
                  <DetailItem label="Autres précisions" value={selectedBrief.site_objectives} />
                )}
                {selectedBrief.expected_results && (
                  <DetailItem label="Résultats attendus" value={selectedBrief.expected_results} />
                )}
                {selectedBrief.kpis && <DetailItem label="KPI" value={selectedBrief.kpis} />}
              </Section>
            )}

            {(selectedBrief.target_age_ranges?.length ||
              selectedBrief.target_gender?.length ||
              selectedBrief.target_locations?.length ||
              selectedBrief.target_professions?.length ||
              selectedBrief.target_digital_habits?.length ||
              selectedBrief.target_audience ||
              selectedBrief.target_needs ||
              selectedBrief.user_experience) && (
              <Section title="3. Public cible">
                {selectedBrief.target_age_ranges && selectedBrief.target_age_ranges.length > 0 && (
                  <DetailTags label="Tranches d'âge" values={selectedBrief.target_age_ranges} />
                )}
                {selectedBrief.target_gender && selectedBrief.target_gender.length > 0 && (
                  <DetailTags label="Genre" values={selectedBrief.target_gender} />
                )}
                {selectedBrief.target_locations && selectedBrief.target_locations.length > 0 && (
                  <DetailTags label="Localisation" values={selectedBrief.target_locations} />
                )}
                {selectedBrief.target_professions && selectedBrief.target_professions.length > 0 && (
                  <DetailTags label="Professions" values={selectedBrief.target_professions} />
                )}
                {selectedBrief.target_digital_habits && selectedBrief.target_digital_habits.length > 0 && (
                  <DetailTags label="Habitudes digitales" values={selectedBrief.target_digital_habits} />
                )}
                {selectedBrief.target_audience && (
                  <DetailItem label="Autres précisions" value={selectedBrief.target_audience} />
                )}
                {selectedBrief.target_needs && (
                  <DetailItem label="Besoins" value={selectedBrief.target_needs} />
                )}
                {selectedBrief.user_experience && (
                  <DetailItem label="Expérience utilisateur" value={selectedBrief.user_experience} />
                )}
              </Section>
            )}

            {(selectedBrief.main_pages ||
              selectedBrief.specific_features ||
              selectedBrief.competitor_examples) && (
              <Section title="4. Fonctionnalités">
                {selectedBrief.main_pages && (
                  <DetailItem label="Pages principales" value={selectedBrief.main_pages} />
                )}
                {selectedBrief.specific_features && (
                  <DetailItem
                    label="Fonctionnalités spécifiques"
                    value={selectedBrief.specific_features}
                  />
                )}
                {selectedBrief.competitor_examples && (
                  <DetailItem
                    label="Sites de référence"
                    value={selectedBrief.competitor_examples}
                  />
                )}
              </Section>
            )}

            {(selectedBrief.visual_identity ||
              selectedBrief.colors_typography ||
              selectedBrief.brand_tone) && (
              <Section title="5. Identité visuelle">
                {selectedBrief.visual_identity && (
                  <DetailItem label="Identité visuelle" value={selectedBrief.visual_identity} />
                )}
                {selectedBrief.colors_typography && (
                  <DetailItem label="Couleurs & typographies" value={selectedBrief.colors_typography} />
                )}
                {selectedBrief.brand_tone && (
                  <DetailItem label="Tonalité" value={selectedBrief.brand_tone} />
                )}
              </Section>
            )}

            {(selectedBrief.content_types ||
              selectedBrief.content_provider ||
              selectedBrief.seo_optimization) && (
              <Section title="6. Contenus">
                {selectedBrief.content_types && (
                  <DetailItem label="Types de contenus" value={selectedBrief.content_types} />
                )}
                {selectedBrief.content_provider && (
                  <DetailItem label="Fournisseur de contenu" value={selectedBrief.content_provider} />
                )}
                <DetailItem
                  label="Optimisation SEO"
                  value={selectedBrief.seo_optimization ? 'Oui' : 'Non'}
                />
              </Section>
            )}

            {(selectedBrief.domain_name ||
              selectedBrief.hosting ||
              selectedBrief.cms_preference) && (
              <Section title="7. Contraintes techniques">
                {selectedBrief.domain_name && (
                  <DetailItem label="Nom de domaine" value={selectedBrief.domain_name} />
                )}
                {selectedBrief.hosting && (
                  <DetailItem label="Hébergement" value={selectedBrief.hosting} />
                )}
                {selectedBrief.cms_preference && (
                  <DetailItem label="CMS souhaité" value={selectedBrief.cms_preference} />
                )}
              </Section>
            )}

            {(selectedBrief.budget || selectedBrief.deadline || selectedBrief.validation_phases) && (
              <Section title="8. Budget et délais">
                {selectedBrief.budget && <DetailItem label="Budget" value={selectedBrief.budget} />}
                {selectedBrief.deadline && (
                  <DetailItem
                    label="Deadline"
                    value={new Date(selectedBrief.deadline).toLocaleDateString('fr-FR')}
                  />
                )}
                {selectedBrief.validation_phases && (
                  <DetailItem
                    label="Phases de validation"
                    value={selectedBrief.validation_phases}
                  />
                )}
              </Section>
            )}

            {(selectedBrief.maintenance ||
              selectedBrief.training_needed ||
              selectedBrief.future_evolutions) && (
              <Section title="9. Maintenance et évolution">
                {selectedBrief.maintenance && (
                  <DetailItem label="Maintenance" value={selectedBrief.maintenance} />
                )}
                <DetailItem
                  label="Formation nécessaire"
                  value={selectedBrief.training_needed ? 'Oui' : 'Non'}
                />
                {selectedBrief.future_evolutions && (
                  <DetailItem
                    label="Évolutions futures"
                    value={selectedBrief.future_evolutions}
                  />
                )}
              </Section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-gray-900 mt-1 whitespace-pre-wrap">{value}</p>
    </div>
  );
}

function DetailTags({ label, values }: { label: string; values: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
