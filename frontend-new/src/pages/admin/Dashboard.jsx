import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiFolder, FiMessageSquare, FiEye, FiPlus } from 'react-icons/fi';
import api from '../../lib/api';

export default function Dashboard() {
  const { data: projects = [] } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => api.get('/projects/all').then((r) => r.data),
  });
  const { data: messages = [] } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: () => api.get('/contact').then((r) => r.data),
  });

  const unread = messages.filter((m) => !m.read).length;
  const published = projects.filter((p) => p.published).length;
  const drafts = projects.filter((p) => !p.published).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">Bienvenue dans l'espace d'administration.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Stat icon={FiFolder} label="Projets publiés" value={published} color="blue" />
        <Stat icon={FiEye} label="Brouillons" value={drafts} color="gray" />
        <Stat icon={FiMessageSquare} label="Messages non lus" value={unread} color="green" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickAction
          to="/admin/projects/new"
          icon={FiPlus}
          label="Nouveau projet"
          desc="Ajouter un projet au portfolio"
        />
        <QuickAction
          to="/admin/cv"
          icon={FiFolder}
          label="Modifier le CV"
          desc="Mettre à jour vos informations"
        />
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, color }) {
  const colors = { blue: 'bg-blue-50 text-blue-600', gray: 'bg-gray-100 text-gray-600', green: 'bg-green-50 text-green-600' };
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function QuickAction({ to, icon: Icon, label, desc }) {
  return (
    <Link to={to} className="card p-5 flex items-center gap-4 hover:border-primary-300 hover:shadow-md transition-all group">
      <div className="p-3 rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </Link>
  );
}
