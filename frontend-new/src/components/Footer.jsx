import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Victor VIDALOT
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/vidalotvdt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          <a
            href="mailto:vidalotvictor@gmail.com"
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Email"
          >
            <FiMail className="w-5 h-5" />
          </a>
          <Link to="/admin" className="text-xs text-gray-300 hover:text-gray-500 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
