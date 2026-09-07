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
    },
    executive: {
      fontFamily: fonts.headingFont,
      color: colors.accent,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      borderBottom: `2px solid ${colors.primary}`,
      paddingBottom: '6px'
    },
    elegant: {
      fontFamily: fonts.headingFont,
      color: colors.primary,
      fontWeight: 500,
      fontStyle: 'italic' as const,
      borderBottom: `1px solid ${colors.secondary}`
    },
    sidebar: {
      fontFamily: fonts.headingFont,
      color: colors.secondary,
      fontWeight: 600,
      borderLeft: `4px solid ${colors.primary}`,
      paddingLeft: '8px'
    },
    pro: {
      fontFamily: fonts.headingFont,
      color: colors.primary,
      fontWeight: 700
    },
    bold: {
      fontFamily: fonts.headingFont,
      color: colors.primary,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
      borderBottom: `4px solid ${colors.accent}`
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
          padding: template === 'sidebar' ? '24px 28px' : '24px 32px'
        }}
        className="flex items-center justify-between"
      >
        <div className="min-w-0">
          <h1
            style={{
              fontFamily: fonts.headingFont,
              letterSpacing: template === 'executive' ? '0.02em' : undefined
            }}
            className="text-3xl font-bold mb-1"
          >
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-lg opacity-90">
            {personal.jobTitle || 'Professional Title'}
          </p>
        </div>
        {personal.photo && (
          <img
            src={personal.photo}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow shrink-0"
          />
        )}
      </div>

      {/* Contact bar */}
      <div
        style={{
          background: colors.secondary,
          color: '#fff',
          padding: '8px 32px'
        }}
        className="flex flex-wrap items-center gap-4 text-sm"
      >
        {personal.email && (
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"
          >
            ✉️ <span>{personal.email}</span>
          </a>
        )}
        {personal.phone && (
          <a
            href={`tel:${personal.phone.replace(/[^\d+]/g, '')}`}
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"
          >
            📞 <span>{personal.phone}</span>
          </a>
        )}
        {personal.location && (
          <span className="flex items-center gap-1.5 opacity-90">
            📍 <span>{personal.location}</span>
          </span>
        )}
        {personal.website && (
          <a
            href={personal.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"
          >
            🌐 <span>{personal.website}</span>
          </a>
        )}
        {personal.linkedin && (
          <span className="flex items-center gap-1.5 opacity-90">
            💼 <span>linkedin.com/in/{personal.linkedin}</span>
          </span>
        )}
        {personal.github && (
          <span className="flex items-center gap-1.5 opacity-90">
            🐙 <span>github.com/{personal.github}</span>
          </span>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          padding: template === 'sidebar' ? '0' : '24px 32px',
          display: template === 'sidebar' ? 'flex' : undefined
        }}
      >
        {template === 'sidebar' ? (
          <SidebarLayout
            content={content}
            designConfig={designConfig}
            sectionStyles={sectionStyles[template]}
          />
        ) : (
          <>
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
                  <h3 className="font-semibold text-base flex items-center flex-wrap gap-x-2">
                    {project.name}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-normal text-primary-700 underline underline-offset-2 break-all"
                      >
                        🔗 {project.link.replace(/^https?:\/\//, '').slice(0, 40)}
                      </a>
                    )}
                  </h3>
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
        </>
        )}
      </div>
    </div>
  )
}

function SidebarLayout({
  content,
  designConfig,
  sectionStyles
}: {
  content: CvContent
  designConfig: DesignConfig
  sectionStyles: React.CSSProperties
}) {
  const { personal, summary, experience, education, skills, languages, certifications } = content
  const colors = designConfig.colors || DEFAULT_DESIGN_CONFIG.colors
  const showSections = designConfig.showSections

  const contactItems = [
    personal.email && { label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    personal.phone && { label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/[^\d+]/g, '')}` },
    personal.location && { label: 'Location', value: personal.location },
    personal.website && { label: 'Website', value: personal.website, href: personal.website },
    personal.linkedin && { label: 'LinkedIn', value: personal.linkedin },
    personal.github && { label: 'GitHub', value: personal.github }
  ].filter(Boolean) as {
    label: string
    value: string
    href?: string
  }[]

  const CONTACT_ICONS: Record<string, string> = {
    Email: '✉️',
    Phone: '📞',
    Location: '📍',
    Website: '🌐',
    LinkedIn: '💼',
    GitHub: '🐙'
  }

  return (
    <div className="flex w-full">
      {/* Sidebar */}
<aside
          style={{
            background: colors.primary,
            color: '#fff',
            width: '70mm',
            padding: '24px 20px',
            flexShrink: 0
          }}
        >
          {personal.photo && (
            <div className="flex justify-center mb-5">
              <img
                src={personal.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-white/80"
              />
            </div>
          )}
          <div className="text-[10px] uppercase tracking-wider opacity-80 mb-3">
            Contact
          </div>
        <div className="space-y-3 mb-6">
          {contactItems.map((item, i) => (
            <div key={i} className="text-xs break-words">
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('tel') || item.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="block"
                >
                  <div className="font-semibold opacity-90">
                    {CONTACT_ICONS[item.label] || ''} {item.label}
                  </div>
                  <div className="opacity-80">{item.value}</div>
                </a>
              ) : (
                <>
                  <div className="font-semibold opacity-90">
                    {CONTACT_ICONS[item.label] || ''} {item.label}
                  </div>
                  <div className="opacity-80">{item.value}</div>
                </>
              )}
            </div>
          ))}
        </div>

        {showSections.skills && (
          <>
            <div className="text-[10px] uppercase tracking-wider opacity-80 mb-3">
              Skills
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {[...(skills.technical || []), ...(skills.soft || [])].map(
                (skill, i) => (
                  <span
                    key={i}
                    className="bg-white/20 px-2 py-0.5 rounded text-[11px]"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </>
        )}

        {showSections.languages && languages?.length > 0 && (
          <>
            <div className="text-[10px] uppercase tracking-wider opacity-80 mb-3">
              Languages
            </div>
            <div className="space-y-1 mb-6">
              {languages.map((lang) => (
                <div key={lang.id} className="text-xs">
                  {lang.language}
                  {lang.proficiency && (
                    <span className="opacity-80"> - {lang.proficiency}</span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {showSections.certifications && certifications?.length > 0 && (
          <>
            <div className="text-[10px] uppercase tracking-wider opacity-80 mb-3">
              Certifications
            </div>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <div className="font-semibold">{cert.name}</div>
                  <div className="opacity-80">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </aside>

      {/* Main content */}
      <main style={{ padding: '24px 24px' }} className="flex-1 min-w-0">
        {showSections.summary && summary && (
          <Section style={sectionStyles} title="Professional Summary">
            <p className="text-sm">{summary}</p>
          </Section>
        )}

        {showSections.experience && experience.length > 0 && (
          <Section style={sectionStyles} title="Experience">
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
          <Section style={sectionStyles} title="Education">
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

        {showSections.projects && content.projects?.length > 0 && (
          <Section style={sectionStyles} title="Projects">
            <div className="space-y-3">
              {content.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold text-base flex items-center flex-wrap gap-x-2">
                    {project.name}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-normal text-primary-700 underline underline-offset-2 break-all"
                      >
                        🔗 {project.link.replace(/^https?:\/\//, '').slice(0, 40)}
                      </a>
                    )}
                  </h3>
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
      </main>
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
