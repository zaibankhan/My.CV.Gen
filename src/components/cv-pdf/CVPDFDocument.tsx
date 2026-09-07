'use client'

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from '@react-pdf/renderer'
import type { CvContent, DesignConfig } from '@/types/cv'
import { DEFAULT_DESIGN_CONFIG } from '@/lib/constants/templates'

interface CVPDFDocumentProps {
  content: CvContent
  designConfig: DesignConfig
}

export function CVPDFDocument({ content, designConfig }: CVPDFDocumentProps) {
  const config = {
    ...DEFAULT_DESIGN_CONFIG,
    ...designConfig
  }
  const colors = {
    ...DEFAULT_DESIGN_CONFIG.colors,
    ...config.colors
  }
  const layout = {
    ...DEFAULT_DESIGN_CONFIG.layout,
    ...config.layout
  }
  const typography = {
    ...DEFAULT_DESIGN_CONFIG.typography,
    ...config.typography
  }
  const showSections = {
    ...DEFAULT_DESIGN_CONFIG.showSections,
    ...config.showSections
  }

  const { personal, summary, experience, education, skills, projects, certifications, languages } =
    content

  const bodyFontSize = parseInt(
    (typography.fontSize || '14').replace('px', ''),
    10
  )
  const headingFontSize = bodyFontSize + 4

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: bodyFontSize,
      color: colors.text,
      paddingTop: layout.margins.top || 20,
      paddingBottom: layout.margins.bottom || 20,
      paddingLeft: layout.margins.left || 20,
      paddingRight: layout.margins.right || 20,
      backgroundColor: colors.background
    },
    // Header
    header: {
      marginBottom: 16
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    headerText: {
      flex: 1,
      paddingRight: 12
    },
    photo: {
      width: 70,
      height: 70,
      borderRadius: 35,
      objectFit: 'cover',
      borderWidth: 1,
      borderColor: colors.primary
    },
    name: {
      fontSize: headingFontSize + 8,
      fontWeight: 'bold',
      color: colors.secondary,
      marginBottom: 2
    },
    title: {
      fontSize: headingFontSize + 2,
      color: colors.primary,
      marginBottom: 8
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      fontSize: 9
    },
    contactItem: {
      color: colors.accent
    },
    // Sections
    section: {
      marginBottom: 14
    },
    sectionTitle: {
      fontSize: headingFontSize,
      fontWeight: 'bold',
      color: colors.primary,
      borderBottomColor: colors.accent,
      borderBottomWidth: 1,
      paddingBottom: 3,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5
    },
    // Experience
    item: {
      marginBottom: 10
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2
    },
    itemTitle: {
      fontWeight: 'bold',
      fontSize: bodyFontSize + 1
    },
    itemSubtitle: {
      color: colors.accent,
      marginBottom: 3
    },
    itemDate: {
      fontSize: 9,
      color: colors.secondary
    },
    bullets: {
      marginTop: 3
    },
    bullet: {
      flexDirection: 'row',
      marginBottom: 2
    },
    bulletDot: {
      width: 4,
      marginRight: 4
    },
    bulletText: {
      flex: 1
    },
    // Skills
    skillsRow: {
      flexDirection: 'row',
      gap: 20
    },
    skillsCol: {
      flex: 1
    },
    skillsTitle: {
      fontWeight: 'bold',
      fontSize: bodyFontSize - 1,
      marginBottom: 4,
      color: colors.secondary
    },
    skillChip: {
      fontSize: 9,
      marginBottom: 2
    },
    // Languages
    languageItem: {
      fontSize: 10,
      marginBottom: 2
    }
  })

  return (
    <Document
      title={`${personal.fullName || 'CV'}_Resume`}
      author={personal.fullName || 'My.CV.Gen'}
      subject="Professional Resume"
      creator="My.CV.Gen"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerText}>
              <Text style={styles.name}>
                {personal.fullName || 'Your Name'}
              </Text>
              <Text style={styles.title}>
                {personal.jobTitle || 'Professional Title'}
              </Text>
            </View>
            {personal.photo && (
              <Image src={personal.photo} style={styles.photo} />
            )}
          </View>
          {(personal.email ||
            personal.phone ||
            personal.location ||
            personal.website) && (
            <View style={styles.contactRow}>
              {personal.email && (
                <Text style={styles.contactItem}>{personal.email}</Text>
              )}
              {personal.phone && (
                <Text style={styles.contactItem}>{personal.phone}</Text>
              )}
              {personal.location && (
                <Text style={styles.contactItem}>{personal.location}</Text>
              )}
              {personal.website && (
                <Text style={styles.contactItem}>{personal.website}</Text>
              )}
            </View>
          )}
        </View>

        {/* Summary */}
        {showSections.summary && summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={{ lineHeight: 1.4 }}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {showSections.experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, idx) => (
              <View key={exp.id || idx} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.itemDate}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <View style={styles.bullets}>
                  {(exp.bullets || []).map((bullet, bi) => (
                    <View key={bi} style={styles.bullet}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {showSections.education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, idx) => (
              <View key={edu.id || idx} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemDate}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                {edu.description && (
                  <Text style={{ lineHeight: 1.4 }}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {showSections.skills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {skills.technical?.length > 0 && (
                <View style={styles.skillsCol}>
                  <Text style={styles.skillsTitle}>Technical</Text>
                  {skills.technical.map((skill, idx) => (
                    <Text key={idx} style={styles.skillChip}>
                      • {skill}
                    </Text>
                  ))}
                </View>
              )}
              {skills.soft?.length > 0 && (
                <View style={styles.skillsCol}>
                  <Text style={styles.skillsTitle}>Soft Skills</Text>
                  {skills.soft.map((skill, idx) => (
                    <Text key={idx} style={styles.skillChip}>
                      • {skill}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {/* Projects */}
        {showSections.projects && projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, idx) => (
              <View key={project.id || idx} style={styles.item}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                <Text style={{ lineHeight: 1.4 }}>{project.description}</Text>
                {project.technologies?.length > 0 && (
                  <Text style={{ fontSize: 9, marginTop: 2 }}>
                    {project.technologies.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {showSections.certifications && certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, idx) => (
              <View key={cert.id || idx} style={styles.item}>
                <Text style={styles.itemTitle}>{cert.name}</Text>
                <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {showSections.languages && languages?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((lang, idx) => (
              <Text key={lang.id || idx} style={styles.languageItem}>
                {lang.language} - {lang.proficiency}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}

