import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../lib/api';

export default function Messages() {
  const qc = useQueryClient();
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: () => api.get('/contact').then((r) => r.data),
  });

  const readMutation = useMutation({
    mutationFn: (id) => api.patch(`/contact/${id}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-messages'] }),
    onError: () => toast.error('Erreur'),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : messages.length === 0 ? (
        <p className="text-gray-500 text-center py-16">Aucun message reçu.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`card p-5 ${!m.read ? 'border-primary-200 bg-primary-50/30' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`mt-0.5 flex-shrink-0 ${m.read ? 'text-gray-300' : 'text-primary-600'}`}>
                    {m.read ? <FiCheckCircle className="w-5 h-5" /> : <FiMail className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900">{m.name}</span>
                      <a href={`mailto:${m.email}`} className="text-sm text-gray-500 hover:text-gray-800">{m.email}</a>
                      {!m.read && (
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">Nouveau</span>
                      )}
                    </div>
                    {m.subject && <p className="text-sm font-medium text-gray-700 mt-0.5">{m.subject}</p>}
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{m.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(m.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
                {!m.read && (
                  <button
                    onClick={() => readMutation.mutate(m._id)}
                    className="btn-secondary text-xs flex-shrink-0"
                  >
                    Marquer lu
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
