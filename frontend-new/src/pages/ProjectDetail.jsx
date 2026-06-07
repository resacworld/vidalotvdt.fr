import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiExternalLink, FiGithub, FiArrowLeft, FiCalendar } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import api from '../lib/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: project, isLoading, isError } = useQuery({
    queryKey: ['project', id],
    queryFn: () => api.get(`/projects/${id}`).then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-64 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-gray-500 mb-4">Projet introuvable.</p>
        <Link to="/projects" className="btn-primary">Retour aux projets</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors">
        <FiArrowLeft className="w-4 h-4" /> Retour aux projets
      </Link>

      <div className="mb-6">
        {project.category && (
          <span className="text-primary-600 text-sm font-medium">{project.category}</span>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-3">{project.title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiCalendar className="w-4 h-4" />
          <span>{new Date(project.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>
        </div>
      </div>

      {project.coverImage && (
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full rounded-xl mb-8 object-cover max-h-96"
        />
      )}

      <div className="flex flex-wrap gap-1.5 mb-8">
        {project.technologies?.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div className="flex gap-3 mb-10">
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <FiExternalLink className="w-4 h-4" /> Voir la démo
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <FiGithub className="w-4 h-4" /> Code source
          </a>
        )}
      </div>

      <div className="prose prose-gray max-w-none mb-10">
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </div>

      {project.images?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Galerie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.title} — ${i + 1}`}
                className="rounded-lg w-full object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
