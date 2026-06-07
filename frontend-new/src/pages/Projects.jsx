import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then((r) => r.data),
  });

  const [selectedTech, setSelectedTech] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const allTechs = useMemo(() => {
    const s = new Set();
    projects.forEach((p) => p.technologies?.forEach((t) => s.add(t)));
    return [...s].sort();
  }, [projects]);

  const allCategories = useMemo(() => {
    const s = new Set(projects.map((p) => p.category).filter(Boolean));
    return [...s].sort();
  }, [projects]);

  const filtered = projects.filter((p) => {
    if (selectedTech && !p.technologies?.includes(selectedTech)) return false;
    if (selectedCategory && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Projets</h1>
      <p className="text-gray-500 mb-8">Mes réalisations et projets personnels.</p>

      {/* Filters */}
      {(allTechs.length > 0 || allCategories.length > 0) && (
        <div className="flex flex-wrap gap-3 mb-8">
          {allCategories.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Catégorie :</span>
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  !selectedCategory ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                Tous
              </button>
              {allCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c === selectedCategory ? '' : c)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    selectedCategory === c ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          {allTechs.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Techno :</span>
              {allTechs.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTech(t === selectedTech ? '' : t)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    selectedTech === t ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse h-80 bg-gray-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-16">Aucun projet trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
