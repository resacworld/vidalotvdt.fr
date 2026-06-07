import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiArrowLeft, FiX, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../lib/api';

const EMPTY = {
  title: '', summary: '', description: '', category: '',
  demoUrl: '', repoUrl: '', date: new Date().toISOString().split('T')[0],
  order: 0, published: true,
};

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [form, setForm] = useState(EMPTY);
  const [techs, setTechs] = useState([]);
  const [techInput, setTechInput] = useState('');

  // Cover image
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  // Gallery images: kept existing (URLs) + new files to upload
  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const { data: project } = useQuery({
    queryKey: ['project', id],
    queryFn: () => api.get(`/projects/${id}`).then((r) => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        summary: project.summary,
        description: project.description,
        category: project.category || '',
        demoUrl: project.demoUrl || '',
        repoUrl: project.repoUrl || '',
        date: project.date?.split('T')[0] || EMPTY.date,
        order: project.order ?? 0,
        published: project.published,
      });
      setTechs(project.technologies || []);
      if (project.coverImage) setCoverPreview(project.coverImage);
      setExistingImages(project.images || []);
    }
  }, [project]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setCheck = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.checked }));

  const addTech = () => {
    const t = techInput.trim();
    if (t && !techs.includes(t)) setTechs((ts) => [...ts, t]);
    setTechInput('');
  };
  const removeTech = (t) => setTechs((ts) => ts.filter((x) => x !== t));

  const handleCover = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleGalleryAdd = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setNewImageFiles((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    e.target.value = '';
  };

  const removeExisting = (url) => setExistingImages((prev) => prev.filter((u) => u !== url));
  const removeNew = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      fd.append('technologies', JSON.stringify(techs));
      if (coverFile) fd.append('coverImage', coverFile);
      newImageFiles.forEach((f) => fd.append('images', f));
      if (isEdit) fd.append('existingImages', JSON.stringify(existingImages));
      if (isEdit) return api.put(`/projects/${id}`, fd);
      return api.post('/projects', fd);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      qc.invalidateQueries({ queryKey: ['projects'] });
      toast.success(isEdit ? 'Projet mis à jour' : 'Projet créé');
      navigate('/admin/projects');
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || 'Erreur lors de la sauvegarde');
    },
  });

  const handleSubmit = (e) => { e.preventDefault(); mutation.mutate(); };

  return (
    <div className="p-6 max-w-3xl">
      <button onClick={() => navigate('/admin/projects')} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6">
        <FiArrowLeft className="w-4 h-4" /> Retour
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEdit ? 'Modifier le projet' : 'Nouveau projet'}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General info */}
        <div className="card p-5 space-y-4">
          <h2 className="font-semibold text-gray-700">Informations générales</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
            <input className="input" value={form.title} onChange={set('title')} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Résumé court * <span className="text-gray-400 font-normal">({form.summary.length}/200)</span>
            </label>
            <textarea className="input resize-none" rows={2} maxLength={200} value={form.summary} onChange={set('summary')} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description * <span className="text-gray-400 font-normal">(Markdown supporté)</span>
            </label>
            <textarea className="input resize-none font-mono text-sm" rows={8} value={form.description} onChange={set('description')} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <input className="input" value={form.category} onChange={set('category')} placeholder="ex. Web App, DevOps…" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input className="input" type="date" value={form.date} onChange={set('date')} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL démo</label>
              <input className="input" type="url" value={form.demoUrl} onChange={set('demoUrl')} placeholder="https://…" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL dépôt</label>
              <input className="input" type="url" value={form.repoUrl} onChange={set('repoUrl')} placeholder="https://github.com/…" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordre d'affichage</label>
              <input className="input" type="number" value={form.order} onChange={set('order')} />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input id="published" type="checkbox" checked={form.published} onChange={setCheck('published')} className="rounded border-gray-300 text-primary-600" />
              <label htmlFor="published" className="text-sm font-medium text-gray-700">Publié</label>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="card p-5">
          <h2 className="font-semibold text-gray-700 mb-3">Technologies</h2>
          <div className="flex gap-2 mb-3">
            <input
              className="input"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
              placeholder="ex. React, Node.js… (Entrée pour ajouter)"
            />
            <button type="button" onClick={addTech} className="btn-secondary flex-shrink-0">Ajouter</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {techs.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 tag">
                {t}
                <button type="button" onClick={() => removeTech(t)} className="ml-0.5 hover:text-red-600">
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Cover image */}
        <div className="card p-5">
          <h2 className="font-semibold text-gray-700 mb-3">Image de couverture {!isEdit && '*'}</h2>
          {coverPreview && (
            <div className="relative mb-3 inline-block">
              <img src={coverPreview} alt="Couverture" className="w-full max-h-48 object-cover rounded-lg" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleCover}
            required={!isEdit}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
        </div>

        {/* Gallery images */}
        <div className="card p-5">
          <h2 className="font-semibold text-gray-700 mb-1">Galerie d'images</h2>
          <p className="text-xs text-gray-500 mb-4">Images supplémentaires affichées dans la page du projet.</p>

          {/* Existing images (edit mode) */}
          {existingImages.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Images actuelles</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {existingImages.map((url) => (
                  <div key={url} className="relative group">
                    <img src={url} alt="" className="w-full aspect-square object-cover rounded-lg border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => removeExisting(url)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Supprimer"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New images to add */}
          {newImagePreviews.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">À ajouter</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {newImagePreviews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img src={src} alt="" className="w-full aspect-square object-cover rounded-lg border border-primary-200" />
                    <button
                      type="button"
                      onClick={() => removeNew(i)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Retirer"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload input */}
          <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-colors">
            <FiImage className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Ajouter des images (sélection multiple possible)</span>
            <input type="file" accept="image/*" multiple onChange={handleGalleryAdd} className="hidden" />
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary" disabled={mutation.isPending}>
            {mutation.isPending ? 'Sauvegarde...' : isEdit ? 'Mettre à jour' : 'Créer le projet'}
          </button>
          <button type="button" onClick={() => navigate('/admin/projects')} className="btn-secondary">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
