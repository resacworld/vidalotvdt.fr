import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  const { _id, title, summary, technologies, coverImage, demoUrl, repoUrl, category } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card group overflow-hidden flex flex-col"
    >
      <Link to={`/projects/${_id}`} className="block overflow-hidden aspect-video bg-gray-100">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl font-bold">
            {title[0]}
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        {category && <span className="text-xs text-primary-600 font-medium mb-1">{category}</span>}
        <Link to={`/projects/${_id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">{summary}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {technologies?.slice(0, 4).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
          {technologies?.length > 4 && (
            <span className="tag">+{technologies.length - 4}</span>
          )}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          <Link
            to={`/projects/${_id}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Voir le projet →
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Démo">
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}
            {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Dépôt">
                <FiGithub className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
