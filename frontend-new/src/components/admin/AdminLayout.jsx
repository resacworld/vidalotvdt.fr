import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiFolder, FiFileText, FiMessageSquare, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', label: 'Tableau de bord', icon: FiGrid, end: true },
  { to: '/admin/projects', label: 'Projets', icon: FiFolder },
  { to: '/admin/cv', label: 'CV', icon: FiFileText },
  { to: '/admin/messages', label: 'Messages', icon: FiMessageSquare },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-4 py-5 border-b border-gray-100">
          <span className="font-semibold text-gray-900">Admin<span className="text-primary-600">.</span></span>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-colors"
          >
            <FiLogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
