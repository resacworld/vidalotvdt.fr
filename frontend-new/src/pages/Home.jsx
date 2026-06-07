import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FiGithub, FiMail, FiArrowRight } from 'react-icons/fi';
import api from '../lib/api';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then((r) => r.data),
  });

  const { data: cv } = useQuery({
    queryKey: ['cv'],
    queryFn: () => api.get('/cv').then((r) => r.data),
  });

  const profile = cv?.profile || {};

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary-600 font-medium text-sm mb-3 block">
              Bonjour, je suis
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {profile.name || 'Victor VIDALOT'}
            </h1>
            <p className="text-xl text-gray-500 mb-3 font-medium">
              {profile.title || 'Développeur Full-Stack'}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
              {profile.bio ||
                "Passionné par la programmation, je crée des applications web modernes et des logiciels industriels."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/projects" className="btn-primary">
                Voir mes projets <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Me contacter
              </Link>
            </div>
            <div className="flex items-center gap-4 mt-8">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-700 transition-colors">
                  <FiGithub className="w-5 h-5" />
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`}
                  className="text-gray-400 hover:text-gray-700 transition-colors">
                  <FiMail className="w-5 h-5" />
                </a>
              )}
            </div>
          </motion.div>

          {profile.photo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-xl"
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Recent projects */}
      {projects.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Projets récents</h2>
              <Link to="/projects" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                Tous les projets <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills teaser */}
      {cv?.skills?.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Compétences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cv.skills.map((group) => (
              <div key={group.category} className="card p-5">
                <h3 className="font-semibold text-gray-700 mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span key={s.name} className="tag">{s.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/cv" className="btn-secondary">
              Voir mon CV complet
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
