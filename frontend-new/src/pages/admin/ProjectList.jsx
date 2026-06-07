import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiMenu } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../lib/api';

export default function ProjectList() {
  const qc = useQueryClient();
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => api.get('/projects/all').then((r) => r.data),
  });

  const [items, setItems] = useState([]);
  useEffect(() => { setItems(projects); }, [projects]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const reorderMutation = useMutation({
    mutationFn: (ordered) =>
      api.patch('/projects/reorder', { items: ordered.map((p, i) => ({ id: p._id, order: i })) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      qc.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => toast.error('Erreur lors de la sauvegarde de l\'ordre'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/projects/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      qc.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projet supprimé');
    },
    onError: () => toast.error('Erreur lors de la suppression'),
  });

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((p) => p._id === active.id);
    const newIndex = items.findIndex((p) => p._id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);
    reorderMutation.mutate(reordered);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Supprimer "${title}" ?`)) deleteMutation.mutate(id);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projets</h1>
          <p className="text-sm text-gray-500 mt-0.5">Glissez les lignes pour changer l'ordre d'affichage.</p>
        </div>
        <Link to="/admin/projects/new" className="btn-primary">
          <FiPlus className="w-4 h-4" /> Nouveau projet
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="mb-4">Aucun projet pour l'instant.</p>
          <Link to="/admin/projects/new" className="btn-primary">Créer un projet</Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-8 px-3 py-3" />
                <th className="text-left px-4 py-3 font-medium text-gray-600">Titre</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Statut</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map((p) => p._id)} strategy={verticalListSortingStrategy}>
                <tbody className="divide-y divide-gray-100">
                  {items.map((p) => (
                    <SortableRow
                      key={p._id}
                      project={p}
                      onDelete={() => handleDelete(p._id, p.title)}
                    />
                  ))}
                </tbody>
              </SortableContext>
            </DndContext>
          </table>
        </div>
      )}
    </div>
  );
}

function SortableRow({ project: p, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: p._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    background: isDragging ? '#f0f9ff' : undefined,
    zIndex: isDragging ? 10 : undefined,
    position: isDragging ? 'relative' : undefined,
  };

  return (
    <tr ref={setNodeRef} style={style} className="hover:bg-gray-50">
      <td className="px-3 py-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 touch-none"
          aria-label="Déplacer"
        >
          <FiMenu className="w-4 h-4" />
        </button>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {p.coverImage && (
            <img src={p.coverImage} alt="" className="w-9 h-9 rounded object-cover flex-shrink-0" />
          )}
          <span className="font-medium text-gray-900 line-clamp-1">{p.title}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{p.category || '—'}</td>
      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
        {new Date(p.date).toLocaleDateString('fr-FR')}
      </td>
      <td className="px-4 py-3">
        {p.published ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
            <FiEye className="w-3 h-3" /> Publié
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            <FiEyeOff className="w-3 h-3" /> Brouillon
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/admin/projects/${p._id}/edit`}
            className="p-1.5 text-gray-400 hover:text-primary-600 rounded hover:bg-primary-50 transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
          </Link>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
