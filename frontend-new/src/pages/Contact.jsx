import { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

export default function Contact() {
  const { data: cv } = useQuery({
    queryKey: ['cv'],
    queryFn: () => api.get('/cv').then((r) => r.data),
  });

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('Message envoyé ! Je vous répondrai dès que possible.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.error;
      toast.error(typeof msg === 'string' ? msg : 'Erreur lors de l\'envoi, réessayez.');
    } finally {
      setLoading(false);
    }
  };

  const p = cv?.profile || {};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact</h1>
      <p className="text-gray-500 mb-10">Vous avez un projet ou une question ? N'hésitez pas à me contacter.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info */}
        <div className="space-y-4">
          {p.email && (
            <a href={`mailto:${p.email}`} className="flex items-center gap-3 card p-4 hover:shadow-md transition-shadow">
              <FiMail className="w-5 h-5 text-primary-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">{p.email}</p>
              </div>
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 card p-4 hover:shadow-md transition-shadow">
              <FiGithub className="w-5 h-5 text-gray-700 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">GitHub</p>
                <p className="text-sm font-medium text-gray-900">Voir le profil</p>
              </div>
            </a>
          )}
          {p.linkedin && (
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 card p-4 hover:shadow-md transition-shadow">
              <FiLinkedin className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">LinkedIn</p>
                <p className="text-sm font-medium text-gray-900">Voir le profil</p>
              </div>
            </a>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 card p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input className="input" value={form.name} onChange={set('name')} required placeholder="Votre nom" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input className="input" type="email" value={form.email} onChange={set('email')} required placeholder="votre@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
            <input className="input" value={form.subject} onChange={set('subject')} placeholder="Sujet de votre message" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
            <textarea
              className="input resize-none"
              rows={6}
              value={form.message}
              onChange={set('message')}
              required
              minLength={10}
              placeholder="Votre message..."
            />
          </div>
          <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
            {loading ? 'Envoi...' : <><FiSend className="w-4 h-4" /> Envoyer le message</>}
          </button>
        </form>
      </div>
    </div>
  );
}
