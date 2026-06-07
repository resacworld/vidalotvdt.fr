import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Convert relative URL → absolute so the PDF renderer can fetch it
function abs(url) {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  try { return new URL(url, window.location.href).href; } catch { return url; }
}

const DARK   = '#0f2444';   // sidebar bg
const MID    = '#1a3a6b';   // sidebar section divider
const ACCENT = '#7cb9f4';   // sidebar accent text
const WHITE  = '#ffffff';
const INK    = '#1c2b3a';   // main text
const MUTED  = '#5a6a7a';   // secondary text
const BLUE   = '#1e4d9b';   // main section titles
const PILL   = '#eaf1fb';   // tag bg

const SIDEBAR = 185;        // points (~35% of 595)

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    flexDirection: 'row',
    backgroundColor: WHITE,
  },

  /* ── Sidebar background (absolute, full-height) ── */
  sidebarBg: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    width: SIDEBAR,
    backgroundColor: DARK,
  },

  /* ── Sidebar content ── */
  sidebar: {
    width: SIDEBAR,
    paddingTop: 32,
    paddingBottom: 28,
    paddingHorizontal: 18,
    color: WHITE,
  },

  photoWrap: { alignItems: 'center', marginBottom: 14 },
  photo: {
    width: 80, height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#7cb9f4',
    borderStyle: 'solid',
  },
  sName:  { fontSize: 13, fontFamily: 'Helvetica-Bold', textAlign: 'center', marginTop: 10, lineHeight: 1.3 },
  sTitle: { fontSize: 8.5, color: ACCENT, textAlign: 'center', marginTop: 3, marginBottom: 20, lineHeight: 1.4 },

  sDivider: { borderBottomWidth: 1, borderBottomColor: MID, marginBottom: 12 },

  sSection: { marginBottom: 16 },
  sSectionTitle: {
    fontSize: 6.5, fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase', letterSpacing: 1.5,
    color: ACCENT, marginBottom: 8,
  },

  sContactRow:  { flexDirection: 'row', marginBottom: 5 },
  sContactLabel:{ fontSize: 7, color: ACCENT, width: 40, flexShrink: 0 },
  sContactVal:  { fontSize: 7.5, color: WHITE, flex: 1, lineHeight: 1.4 },

  sSkillGroup:  { marginBottom: 10 },
  sSkillCat:    { fontSize: 7, fontFamily: 'Helvetica-Bold', color: ACCENT, marginBottom: 4 },
  sSkillRow:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  sSkillName:   { fontSize: 7.5, color: WHITE },
  sSkillLevel:  { fontSize: 7, color: '#a0bfe0' },

  sLangRow:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  sLangName:  { fontSize: 7.5, color: WHITE },
  sLangLevel: { fontSize: 7, color: '#a0bfe0' },

  sInterest: { fontSize: 7.5, color: '#c5d9f0', marginBottom: 3 },

  /* ── Main content ── */
  main: {
    flex: 1,
    paddingTop: 36,
    paddingBottom: 28,
    paddingLeft: 24,
    paddingRight: 30,
  },

  mSection: { marginBottom: 16 },
  mSectionTitle: {
    fontSize: 8, fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase', letterSpacing: 1,
    color: BLUE, paddingBottom: 4,
    borderBottomWidth: 1, borderBottomColor: PILL,
    marginBottom: 10,
  },

  bio: { fontSize: 8.5, color: INK, lineHeight: 1.65 },

  expBlock:   { marginBottom: 11 },
  expTop:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 1 },
  expTitle:   { fontFamily: 'Helvetica-Bold', fontSize: 9, color: INK },
  expCompany: { fontSize: 8, color: BLUE, marginTop: 1 },
  expPill:    {
    fontSize: 7, color: BLUE,
    backgroundColor: PILL,
    paddingVertical: 2, paddingHorizontal: 7,
    borderRadius: 10,
  },
  expDesc: { fontSize: 8, color: MUTED, lineHeight: 1.55, marginTop: 4, marginBottom: 5 },

  tagsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: {
    backgroundColor: PILL, color: BLUE,
    paddingVertical: 2, paddingHorizontal: 6,
    borderRadius: 3, fontSize: 7,
    marginRight: 4, marginBottom: 3,
  },

  eduBlock:  { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  eduLeft:   { flex: 1 },
  eduDegree: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: INK },
  eduSchool: { fontSize: 8, color: MUTED, marginTop: 1 },
  eduPeriod: { fontSize: 7.5, color: MUTED, marginTop: 2 },
});

export default function CVDocument({ cv }) {
  const p       = cv?.profile     || {};
  const exps    = cv?.experiences || [];
  const edus    = cv?.educations  || [];
  const skills  = cv?.skills      || [];
  const langs   = cv?.languages   || [];
  const interests = cv?.interests || [];

  const photoUrl = abs(p.photo);

  return (
    <Document title={`CV — ${p.name || 'Portfolio'}`} author={p.name}>
      <Page size="A4" style={s.page}>

        {/* Full-height sidebar background */}
        <View style={s.sidebarBg} />

        {/* ── SIDEBAR ── */}
        <View style={s.sidebar}>

          {/* Photo + identity */}
          <View style={s.photoWrap}>
            {photoUrl && <Image src={photoUrl} style={s.photo} />}
            <Text style={s.sName}>{p.name}</Text>
            {p.title && <Text style={s.sTitle}>{p.title}</Text>}
          </View>

          <View style={s.sDivider} />

          {/* Contact */}
          {(p.email || p.phone || p.location || p.github || p.linkedin) && (
            <View style={s.sSection}>
              <Text style={s.sSectionTitle}>Contact</Text>
              {p.email    && <ContactRow label="Email"    value={p.email} />}
              {p.phone    && <ContactRow label="Tél"      value={p.phone} />}
              {p.location && <ContactRow label="Lieu"     value={p.location} />}
              {p.github   && <ContactRow label="GitHub"   value={p.github.replace('https://', '')} />}
              {p.linkedin && <ContactRow label="LinkedIn" value={p.linkedin.replace('https://', '')} />}
            </View>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <View style={s.sSection}>
              <Text style={s.sSectionTitle}>Compétences</Text>
              {skills.map((group) => (
                <View key={group.category} style={s.sSkillGroup}>
                  <Text style={s.sSkillCat}>{group.category}</Text>
                  {group.items.map((item) => (
                    <View key={item.name} style={s.sSkillRow}>
                      <Text style={s.sSkillName}>{item.name}</Text>
                      {item.level && <Text style={s.sSkillLevel}>{item.level}</Text>}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {langs.length > 0 && (
            <View style={s.sSection}>
              <Text style={s.sSectionTitle}>Langues</Text>
              {langs.map((l) => (
                <View key={l.name} style={s.sLangRow}>
                  <Text style={s.sLangName}>{l.name}</Text>
                  {l.level && <Text style={s.sLangLevel}>{l.level}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <View style={s.sSection}>
              <Text style={s.sSectionTitle}>Intérêts</Text>
              {interests.map((item) => (
                <Text key={item} style={s.sInterest}>· {item}</Text>
              ))}
            </View>
          )}
        </View>

        {/* ── MAIN CONTENT ── */}
        <View style={s.main}>

          {/* Bio */}
          {p.bio && (
            <View style={s.mSection}>
              <Text style={s.mSectionTitle}>Profil</Text>
              <Text style={s.bio}>{p.bio}</Text>
            </View>
          )}

          {/* Experiences */}
          {exps.length > 0 && (
            <View style={s.mSection}>
              <Text style={s.mSectionTitle}>Expériences</Text>
              {exps.map((e, i) => (
                <View key={i} style={s.expBlock}>
                  <View style={s.expTop}>
                    <View style={{ flex: 1 }}>
                      <Text style={s.expTitle}>{e.title}</Text>
                      <Text style={s.expCompany}>{e.company}</Text>
                    </View>
                    {e.period && <Text style={s.expPill}>{e.period}</Text>}
                  </View>
                  {e.description && <Text style={s.expDesc}>{e.description}</Text>}
                  {e.technologies?.length > 0 && (
                    <View style={s.tagsRow}>
                      {e.technologies.map((t) => <Text key={t} style={s.tag}>{t}</Text>)}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {edus.length > 0 && (
            <View style={s.mSection}>
              <Text style={s.mSectionTitle}>Formation</Text>
              {edus.map((e, i) => (
                <View key={i} style={s.eduBlock}>
                  <View style={s.eduLeft}>
                    <Text style={s.eduDegree}>{e.degree}</Text>
                    <Text style={s.eduSchool}>{e.school}</Text>
                    {e.description ? <Text style={[s.eduSchool, { marginTop: 3 }]}>{e.description}</Text> : null}
                  </View>
                  {e.period && <Text style={s.eduPeriod}>{e.period}</Text>}
                </View>
              ))}
            </View>
          )}

        </View>
      </Page>
    </Document>
  );
}

function ContactRow({ label, value }) {
  return (
    <View style={s.sContactRow}>
      <Text style={s.sContactLabel}>{label}</Text>
      <Text style={s.sContactVal}>{value}</Text>
    </View>
  );
}
