import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Single-column, no images, no colors — optimized for ATS parsers
const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#111827',
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 52,
    lineHeight: 1.45,
  },

  name:    { fontSize: 20, fontFamily: 'Helvetica-Bold', marginBottom: 3 },
  jobTitle:{ fontSize: 11, color: '#374151', marginBottom: 6 },
  contact: { fontSize: 9, color: '#374151', marginBottom: 16 },

  sectionTitle: {
    fontSize: 10, fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase', letterSpacing: 0.8,
    color: '#111827', marginTop: 14, marginBottom: 6,
    borderBottomWidth: 1, borderBottomColor: '#9ca3af',
    paddingBottom: 3,
  },

  // Bio
  bio: { fontSize: 9.5, color: '#374151', lineHeight: 1.6, marginBottom: 2 },

  // Experience block
  expBlock:   { marginBottom: 10 },
  expTopRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  expCompany: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  expPeriod:  { fontSize: 9, color: '#6b7280' },
  expRole:    { fontSize: 9.5, color: '#374151', marginTop: 1, marginBottom: 3 },
  expDesc:    { fontSize: 9, color: '#374151', lineHeight: 1.55, marginBottom: 3 },
  expTechs:   { fontSize: 8.5, color: '#4b5563' },

  // Education
  eduBlock:  { marginBottom: 8 },
  eduTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  eduDegree: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  eduPeriod: { fontSize: 9, color: '#6b7280' },
  eduSchool: { fontSize: 9.5, color: '#374151', marginTop: 1 },

  // Skills: one line per category
  skillRow:  { flexDirection: 'row', marginBottom: 4 },
  skillCat:  { fontFamily: 'Helvetica-Bold', fontSize: 9, width: 80, flexShrink: 0 },
  skillList: { fontSize: 9, color: '#374151', flex: 1 },

  // Languages
  langRow:  { flexDirection: 'row', marginBottom: 3 },
  langName: { fontFamily: 'Helvetica-Bold', fontSize: 9, width: 80, flexShrink: 0 },
  langLvl:  { fontSize: 9, color: '#374151' },

  // Interests
  interests: { fontSize: 9, color: '#374151' },
});

export default function CVDocumentATS({ cv }) {
  const p       = cv?.profile     || {};
  const exps    = cv?.experiences || [];
  const edus    = cv?.educations  || [];
  const skills  = cv?.skills      || [];
  const langs   = cv?.languages   || [];
  const interests = cv?.interests || [];

  // Build contact string
  const contactParts = [p.email, p.phone, p.location, p.github, p.linkedin].filter(Boolean);

  return (
    <Document title={`CV ATS — ${p.name || 'Portfolio'}`} author={p.name}>
      <Page size="A4" style={s.page}>

        {/* Header */}
        <Text style={s.name}>{p.name}</Text>
        {p.title   && <Text style={s.jobTitle}>{p.title}</Text>}
        {contactParts.length > 0 && (
          <Text style={s.contact}>{contactParts.join('  |  ')}</Text>
        )}

        {/* Summary / Bio */}
        {p.bio && (
          <>
            <Text style={s.sectionTitle}>Profil</Text>
            <Text style={s.bio}>{p.bio}</Text>
          </>
        )}

        {/* Experience */}
        {exps.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Expérience professionnelle</Text>
            {exps.map((e, i) => (
              <View key={i} style={s.expBlock}>
                <View style={s.expTopRow}>
                  <Text style={s.expCompany}>{e.company}</Text>
                  <Text style={s.expPeriod}>{e.period}</Text>
                </View>
                <Text style={s.expRole}>{e.title}</Text>
                {e.description && <Text style={s.expDesc}>{e.description}</Text>}
                {e.technologies?.length > 0 && (
                  <Text style={s.expTechs}>
                    Technologies : {e.technologies.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </>
        )}

        {/* Education */}
        {edus.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Formation</Text>
            {edus.map((e, i) => (
              <View key={i} style={s.eduBlock}>
                <View style={s.eduTopRow}>
                  <Text style={s.eduDegree}>{e.degree}</Text>
                  <Text style={s.eduPeriod}>{e.period}</Text>
                </View>
                <Text style={s.eduSchool}>{e.school}</Text>
                {e.description && <Text style={[s.expDesc, { marginTop: 2 }]}>{e.description}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Compétences</Text>
            {skills.map((group) => (
              <View key={group.category} style={s.skillRow}>
                <Text style={s.skillCat}>{group.category} :</Text>
                <Text style={s.skillList}>
                  {group.items.map((it) => it.level ? `${it.name} (${it.level})` : it.name).join(', ')}
                </Text>
              </View>
            ))}
          </>
        )}

        {/* Languages */}
        {langs.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Langues</Text>
            {langs.map((l) => (
              <View key={l.name} style={s.langRow}>
                <Text style={s.langName}>{l.name}</Text>
                {l.level && <Text style={s.langLvl}>{l.level}</Text>}
              </View>
            ))}
          </>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Centres d'intérêt</Text>
            <Text style={s.interests}>{interests.join(' · ')}</Text>
          </>
        )}

      </Page>
    </Document>
  );
}
