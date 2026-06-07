import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiPlus, FiTrash2, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../lib/api';

export default function CVEditor() {
  const qc = useQueryClient();
  const { data: cv } = useQuery({
    queryKey: ['cv'],
    queryFn: () => api.get('/cv').then((r) => r.data),
  });

  const [profile, setProfile] = useState({ name: '', title: '', bio: '', email: '', phone: '', location: '', linkedin: '', github: '' });
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [interests, setInterests] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    if (cv) {
      setProfile({ ...{ name: '', title: '', bio: '', email: '', phone: '', location: '', linkedin: '', github: '' }, ...cv.profile });
      setExperiences(cv.experiences || []);
      setEducations(cv.educations || []);
      setSkills(cv.skills || []);
      setLanguages(cv.languages || []);
      setInterests(cv.interests || []);
    }
  }, [cv]);

  const mutation = useMutation({
    mutationFn: () => {
      const fd = new FormData();
      fd.append('data', JSON.stringify({ profile, experiences, educations, skills, languages, interests }));
      if (photoFile) fd.append('photo', photoFile);
      return api.put('/cv', fd);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cv'] });
      toast.success('CV mis à jour');
    },
    onError: () => toast.error('Erreur lors de la sauvegarde'),
  });

  const setP = (k) => (e) => setProfile((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Modifier le CV</h1>
        <button onClick={() => mutation.mutate()} className="btn-primary" disabled={mutation.isPending}>
          <FiSave className="w-4 h-4" /> {mutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {/* Profile */}
      <Section title="Profil">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nom" value={profile.name} onChange={setP('name')} />
          <Field label="Titre" value={profile.title} onChange={setP('title')} />
          <Field label="Email" value={profile.email} onChange={setP('email')} type="email" />
          <Field label="Téléphone" value={profile.phone} onChange={setP('phone')} />
          <Field label="Localisation" value={profile.location} onChange={setP('location')} />
          <Field label="GitHub" value={profile.github} onChange={setP('github')} />
          <Field label="LinkedIn" value={profile.linkedin} onChange={setP('linkedin')} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
          <textarea className="input resize-none" rows={3} value={profile.bio} onChange={setP('bio')} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo de profil</label>
          {cv?.profile?.photo && !photoFile && (
            <img src={cv.profile.photo} alt="Photo actuelle" className="w-16 h-16 rounded-full object-cover mb-2" />
          )}
          <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])}
            className="block text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
        </div>
      </Section>

      {/* Experiences */}
      <Section title="Expériences">
        {experiences.map((e, i) => (
          <ExperienceItem key={i} exp={e} onChange={(v) => setExperiences((arr) => arr.map((x, j) => j === i ? v : x))} onDelete={() => setExperiences((arr) => arr.filter((_, j) => j !== i))} />
        ))}
        <button type="button" onClick={() => setExperiences((arr) => [...arr, { title: '', company: '', period: '', description: '', technologies: [] }])} className="btn-secondary mt-2">
          <FiPlus className="w-4 h-4" /> Ajouter
        </button>
      </Section>

      {/* Educations */}
      <Section title="Formation">
        {educations.map((e, i) => (
          <div key={i} className="card p-4 mb-3 space-y-3">
            <div className="flex justify-end">
              <button type="button" onClick={() => setEducations((arr) => arr.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-600">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Diplôme" value={e.degree} onChange={(ev) => setEducations((arr) => arr.map((x, j) => j === i ? { ...x, degree: ev.target.value } : x))} />
              <Field label="École" value={e.school} onChange={(ev) => setEducations((arr) => arr.map((x, j) => j === i ? { ...x, school: ev.target.value } : x))} />
              <Field label="Période" value={e.period} onChange={(ev) => setEducations((arr) => arr.map((x, j) => j === i ? { ...x, period: ev.target.value } : x))} />
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setEducations((arr) => [...arr, { degree: '', school: '', period: '', description: '' }])} className="btn-secondary mt-2">
          <FiPlus className="w-4 h-4" /> Ajouter
        </button>
      </Section>

      {/* Skills */}
      <Section title="Compétences">
        {skills.map((group, i) => (
          <div key={i} className="card p-4 mb-3">
            <div className="flex items-center gap-3 mb-3">
              <input className="input" placeholder="Catégorie" value={group.category} onChange={(e) => setSkills((arr) => arr.map((x, j) => j === i ? { ...x, category: e.target.value } : x))} />
              <button type="button" onClick={() => setSkills((arr) => arr.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-600 flex-shrink-0">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
            {group.items.map((s, si) => (
              <div key={si} className="flex gap-2 mb-2">
                <input className="input" placeholder="Compétence" value={s.name} onChange={(e) => setSkills((arr) => arr.map((x, j) => j === i ? { ...x, items: x.items.map((it, k) => k === si ? { ...it, name: e.target.value } : it) } : x))} />
                <input className="input w-36" placeholder="Niveau" value={s.level} onChange={(e) => setSkills((arr) => arr.map((x, j) => j === i ? { ...x, items: x.items.map((it, k) => k === si ? { ...it, level: e.target.value } : it) } : x))} />
                <button type="button" onClick={() => setSkills((arr) => arr.map((x, j) => j === i ? { ...x, items: x.items.filter((_, k) => k !== si) } : x))} className="text-gray-400 hover:text-red-600 flex-shrink-0">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setSkills((arr) => arr.map((x, j) => j === i ? { ...x, items: [...x.items, { name: '', level: '' }] } : x))} className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-1">
              + Ajouter une compétence
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setSkills((arr) => [...arr, { category: '', items: [] }])} className="btn-secondary mt-2">
          <FiPlus className="w-4 h-4" /> Ajouter une catégorie
        </button>
      </Section>

      {/* Languages */}
      <Section title="Langues">
        {languages.map((l, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className="input" placeholder="Langue" value={l.name} onChange={(e) => setLanguages((arr) => arr.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} />
            <input className="input" placeholder="Niveau" value={l.level} onChange={(e) => setLanguages((arr) => arr.map((x, j) => j === i ? { ...x, level: e.target.value } : x))} />
            <button type="button" onClick={() => setLanguages((arr) => arr.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-600">
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setLanguages((arr) => [...arr, { name: '', level: '' }])} className="btn-secondary mt-2">
          <FiPlus className="w-4 h-4" /> Ajouter
        </button>
      </Section>

      {/* Interests */}
      <Section title="Centres d'intérêt">
        <div className="flex flex-wrap gap-2 mb-3">
          {interests.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {item}
              <button type="button" onClick={() => setInterests((arr) => arr.filter((_, j) => j !== i))} className="hover:text-red-600">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="input"
            placeholder="Ajouter un intérêt…"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const v = e.target.value.trim();
                if (v) { setInterests((arr) => [...arr, v]); e.target.value = ''; }
              }
            }}
          />
        </div>
      </Section>

      <div className="mt-6">
        <button onClick={() => mutation.mutate()} className="btn-primary" disabled={mutation.isPending}>
          <FiSave className="w-4 h-4" /> {mutation.isPending ? 'Sauvegarde...' : 'Sauvegarder le CV'}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input className="input" type={type} value={value} onChange={onChange} />
    </div>
  );
}

function ExperienceItem({ exp, onChange, onDelete }) {
  const set = (k) => (e) => onChange({ ...exp, [k]: e.target.value });
  const [techInput, setTechInput] = useState('');

  const addTech = () => {
    const t = techInput.trim();
    if (t && !exp.technologies?.includes(t)) onChange({ ...exp, technologies: [...(exp.technologies || []), t] });
    setTechInput('');
  };

  return (
    <div className="card p-4 mb-3 space-y-3">
      <div className="flex justify-end">
        <button type="button" onClick={onDelete} className="text-gray-400 hover:text-red-600"><FiTrash2 className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Intitulé" value={exp.title} onChange={set('title')} />
        <Field label="Entreprise" value={exp.company} onChange={set('company')} />
        <Field label="Période" value={exp.period} onChange={set('period')} />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
        <textarea className="input resize-none" rows={2} value={exp.description} onChange={set('description')} />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Technologies</label>
        <div className="flex gap-2 mb-2">
          <input className="input" value={techInput} onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }} placeholder="ex. React…" />
          <button type="button" onClick={addTech} className="btn-secondary text-xs flex-shrink-0">Ajouter</button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(exp.technologies || []).map((t) => (
            <span key={t} className="inline-flex items-center gap-1 tag">
              {t}
              <button type="button" onClick={() => onChange({ ...exp, technologies: exp.technologies.filter((x) => x !== t) })} className="hover:text-red-600">×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
