import { useState } from 'react';
import BriefForm from './components/BriefForm';
import BriefsList from './components/BriefsList';
import { FileText, List, PlusCircle } from 'lucide-react';

function App() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setView('list');
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestion des Briefs</h1>
                <p className="text-gray-600 mt-1">Système de brief pour création de sites web</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setView('list')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  view === 'list'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
                Liste des briefs
              </button>
              <button
                onClick={() => setView('form')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  view === 'form'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <PlusCircle className="w-5 h-5" />
                Nouveau brief
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'form' ? (
          <BriefForm onSuccess={handleSuccess} />
        ) : (
          <BriefsList refresh={refreshKey} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            Formulaire basé sur le modèle de brief pour la création de sites internet
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
