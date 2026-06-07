import { useQuery } from '@tanstack/react-query';
import { FiMapPin, FiMail, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CVDocument from '../components/CVDocument';
import CVDocumentATS from '../components/CVDocumentATS';
import api from '../lib/api';

export default function CVPage() {
  const { data: cv, isLoading } = useQuery({
    queryKey: ['cv'],
    queryFn: () => api.get('/cv').then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse space-y-6">
          {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-gray-100 rounded-xl" />)}
        </div>
      </div>
    );
  }

  const p = cv?.profile || {};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Page title + download */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">CV</h1>
        {cv && (
          <div className="flex flex-wrap gap-2">
            <PDFDownloadLink
              document={<CVDocument cv={cv} />}
              fileName={`cv-${(cv.profile?.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}.pdf`}
            >
              {({ loading }) => (
                <button className="btn-primary" disabled={loading}>
                  <FiDownload className="w-4 h-4" />
                  {loading ? 'Génération…' : 'Télécharger PDF'}
                </button>
              )}
            </PDFDownloadLink>

            <PDFDownloadLink
              document={<CVDocumentATS cv={cv} />}
              fileName={`cv-ats-${(cv.profile?.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}.pdf`}
            >
              {({ loading }) => (
                <button className="btn-secondary" disabled={loading} title="Version mono-colonne lisible par les logiciels RH">
                  <FiDownload className="w-4 h-4" />
                  {loading ? 'Génération…' : 'PDF (ATS)'}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
        {p.photo && (
          <img src={p.photo} alt={p.name} className="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{p.name}</h1>
          <p className="text-primary-600 font-medium mt-1">{p.title}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
            {p.location && <span className="flex items-center gap-1"><FiMapPin className="w-4 h-4" />{p.location}</span>}
            {p.email && <a href={`mailto:${p.email}`} className="flex items-center gap-1 hover:text-gray-800"><FiMail className="w-4 h-4" />{p.email}</a>}
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-800"><FiGithub className="w-4 h-4" />GitHub</a>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-800"><FiLinkedin className="w-4 h-4" />LinkedIn</a>}
          </div>
        </div>
      </div>

      {p.bio && (
        <div className="card p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">{p.bio}</p>
        </div>
      )}

      {/* Experiences */}
      {cv?.experiences?.length > 0 && (
        <Section title="Expériences">
          <div className="space-y-6">
            {cv.experiences.map((e, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                  {i < cv.experiences.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                </div>
                <div className="pb-6">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{e.title}</h3>
                      <p className="text-primary-600 text-sm">{e.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 flex-shrink-0">{e.period}</span>
                  </div>
                  {e.description && <p className="text-gray-600 text-sm mt-2">{e.description}</p>}
                  {e.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {e.technologies.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {cv?.educations?.length > 0 && (
        <Section title="Formation">
          <div className="space-y-4">
            {cv.educations.map((e, i) => (
              <div key={i} className="card p-4">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{e.degree}</h3>
                    <p className="text-gray-500 text-sm">{e.school}</p>
                  </div>
                  <span className="text-sm text-gray-500">{e.period}</span>
                </div>
                {e.description && <p className="text-gray-600 text-sm mt-1">{e.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {cv?.skills?.length > 0 && (
        <Section title="Compétences">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cv.skills.map((group) => (
              <div key={group.category} className="card p-4">
                <h3 className="font-semibold text-gray-700 text-sm mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span key={s.name} className="tag">{s.name}{s.level ? ` — ${s.level}` : ''}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Languages */}
      {cv?.languages?.length > 0 && (
        <Section title="Langues">
          <div className="flex flex-wrap gap-3">
            {cv.languages.map((l) => (
              <div key={l.name} className="card px-4 py-3">
                <span className="font-medium text-gray-900">{l.name}</span>
                {l.level && <span className="text-gray-500 text-sm ml-2">— {l.level}</span>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Interests */}
      {cv?.interests?.length > 0 && (
        <Section title="Centres d'intérêt">
          <div className="flex flex-wrap gap-2">
            {cv.interests.map((interest) => (
              <span key={interest} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">{interest}</span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{title}</h2>
      {children}
    </div>
  );
}
