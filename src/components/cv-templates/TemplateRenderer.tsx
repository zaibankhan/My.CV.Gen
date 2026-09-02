'use client'

import { DEFAULT_DESIGN_CONFIG } from '@/lib/constants/templates'
import type { CvContent, DesignConfig } from '@/types/cv'

interface TemplateRendererProps {
  content: CvContent
  designConfig: DesignConfig
  mode?: 'preview' | 'print'
}

export function TemplateRenderer({
  content,
  designConfig,
  mode = 'preview'
}: TemplateRendererProps) {
  const template = designConfig.template || DEFAULT_DESIGN_CONFIG.template
  const fonts = designConfig.typography || DEFAULT_DESIGN_CONFIG.typography
  const colors = designConfig.colors || DEFAULT_DESIGN_CONFIG.colors

  // Prepare data
  const { personal, summary, experience, education, skills } = content
  const showSections = designConfig.showSections

  const sectionStyles: Record<string, React.CSSProperties> = {
    modern: {
      fontFamily: fonts.headingFont,
      color: colors.primary
    },
    classic: {
      fontFamily: fonts.headingFont,
      color: colors.secondary,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.1em'
    },
    minimal: {
      fontFamily: fonts.headingFont,
      color: colors.text,
      fontWeight: 600
    },
    creative: {
      fontFamily: fonts.headingFont,
      color: colors.primary,
      borderBottom: `3px solid ${colors.accent}`
    }
  }

  const styles = {
    container: {
      fontFamily: fonts.bodyFont,
      fontSize: fonts.fontSize,
      lineHeight: fonts.lineHeight,
      color: colors.text,
      maxWidth: '210mm',
      margin: '0 auto',
      background: colors.background
    }
  }

  return (
    <div style={styles.container} className="bg-white">
      {/* Header */}
      <div
        style={{
          background: colors.primary,
          color: '#fff',
          padding: '24px 32px'
        }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 style={{ fontFamily: fonts.headingFont }} className="text-3xl font-bold mb-1">
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-lg opacity-90">
            {personal.jobTitle || 'Professional Title'}
          </p>
        </div>
      </div>

      {/* Contact bar */}
      <div
        style={{
          background: colors.secondary,
          color: '#fff',
          padding: '8px 32px'
        }}
        className="flex flex-wrap gap-4 text-sm"
      >
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.location && <span>{personal.location}</span>}
        {personal.website && <span>{personal.website}</span>}
        {personal.linkedin && <span>linkedin.com/in/{personal.linkedin}</span>}
        {personal.github && <span>github.com/{personal.github}</span>}
      </div>

      {/* Body */}
      <div style={{ padding: '24px 32px' }}>
        {showSections.summary && summary && (
          <Section style={sectionStyles[template]} title="Professional Summary">
            <p className="text-sm">{summary}</p>
          </Section>
        )}

        {showSections.experience && experience.length > 0 && (
          <Section style={sectionStyles[template]} title="Experience">
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-base">{exp.jobTitle}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    {(exp.bullets || []).map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="text-sm ml-2">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {showSections.education && education.length > 0 && (
          <Section style={sectionStyles[template]} title="Education">
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={edu.id || idx}>
                  <h3 className="font-semibold text-base">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                  {edu.description && (
                    <p className="text-sm mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {showSections.skills && (
          <Section style={sectionStyles[template]} title="Skills">
            <div className="grid grid-cols-2 gap-4">
              {skills.technical?.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-1 text-gray-700">
                    Technical
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft?.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-1 text-gray-700">
                    Soft Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.soft.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>
        )}

        {showSections.projects && content.projects?.length > 0 && (
          <Section style={sectionStyles[template]} title="Projects">
            <div className="space-y-3">
              {content.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold text-base">{project.name}</h3>
                  <p className="text-sm">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {showSections.certifications && content.certifications?.length > 0 && (
          <Section style={sectionStyles[template]} title="Certifications">
            <div className="space-y-2">
              {content.certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-semibold text-sm">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  {cert.date && (
                    <span className="text-xs text-gray-500">{cert.date}</span>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {showSections.languages && content.languages?.length > 0 && (
          <Section style={sectionStyles[template]} title="Languages">
            <div className="flex flex-wrap gap-4">
              {content.languages.map((lang) => (
                <span key={lang.id} className="text-sm">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-gray-500"> - {lang.proficiency}</span>
                </span>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  )
}

function Section({
  title,
  children,
  style
}: {
  title: string
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <section className="mb-6">
      <h2
        style={style}
        className="text-lg font-semibold border-b border-gray-200 pb-1.5 mb-3"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
