import { AIProvider } from './ai'

// ==================== CV Content Types ====================

export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
}

export interface ExperienceItem {
  id: string
  jobTitle: string
  company: string
  startDate: string
  endDate: string
  location?: string
  bullets: string[]
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  startDate: string
  endDate: string
  description?: string
}

export interface ProjectItem {
  id: string
  name: string
  description: string
  link?: string
  technologies: string[]
}

export interface LanguageItem {
  id: string
  language: string
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native'
}

export interface CertificationItem {
  id: string
  name: string
  issuer: string
  date?: string
  link?: string
}

export interface AwardItem {
  id: string
  title: string
  issuer: string
  date: string
  description?: string
}

export interface VolunteerItem {
  id: string
  role: string
  organization: string
  startDate: string
  endDate: string
  description?: string
}

export interface ReferenceItem {
  id: string
  name: string
  relationship: string
  company: string
  email: string
  phone: string
}

export interface InterestItem {
  id: string
  name: string
}

export interface PublicationItem {
  id: string
  title: string
  authors: string
  date: string
  venue: string
  link?: string
}

export interface CourseItem {
  id: string
  name: string
  provider: string
  completedDate: string
  certificateUrl?: string
}

export interface CvContent {
  personal: PersonalInfo
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: {
    technical: string[]
    soft: string[]
  }
  projects: ProjectItem[]
  certifications: CertificationItem[]
  languages: LanguageItem[]
  awards: AwardItem[]
  volunteering: VolunteerItem[]
  interests: InterestItem[]
  references: ReferenceItem[]
  publications: PublicationItem[]
  courses: CourseItem[]
}

// ==================== Design Types ====================

export interface DesignColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export interface DesignTypography {
  headingFont: string
  bodyFont: string
  fontSize: string
  lineHeight: string
}

export interface DesignLayout {
  columns: 'single-column' | 'two-column'
  margins: {
    top: string
    bottom: string
    left: string
    right: string
  }
  sectionSpacing: string
}

export interface DesignConfig {
  template: string
  colors: DesignColors
  typography: DesignTypography
  layout: DesignLayout
  showSections: Record<string, boolean>
}

// ==================== CV Document Types ====================

export type CVStatus = 'draft' | 'in_progress' | 'completed'

export interface CvDocument {
  id: string
  userId: string
  title: string
  templateId: string
  designConfig: DesignConfig
  content: CvContent
  aiProvider: AIProvider
  status: CVStatus
  isArchived: boolean
  createdAt: string
  updatedAt: string
}

export interface CvVersion {
  id: string
  cvDocumentId: string
  contentSnapshot: CvContent
  designSnapshot: DesignConfig
  createdAt: string
  label?: string
}

// ==================== Request/Response Types ====================

export interface CreateCvRequest {
  title?: string
  templateId?: string
  aiProvider?: AIProvider
}

export interface UpdateCvRequest {
  title?: string
  content?: Partial<CvContent>
  designConfig?: Partial<DesignConfig>
  status?: CVStatus
}

export interface GenerateCvRequest {
  cvData: Partial<CvContent>
  jobDescription?: string
  tone?: 'professional' | 'concise' | 'detailed' | 'enthusiastic' | 'formal'
  industries?: string[]
  aiProvider?: AIProvider
}

export interface RegenerateSectionRequest {
  section: string
  currentContent: any
  jobDescription?: string
  aiProvider?: AIProvider
}

export interface ATSAnalysisRequest {
  content: CvContent
  jobDescription: string
}

export interface ATSAnalysisResult {
  score: number
  missingKeywords: string[]
  formattingIssues: string[]
  recommendations: string[]
  keywordMatchRate: number
}

export interface AIRequestMetadata {
  aiCallsUsed: number
  aiCallsLimit: number
  provider: AIProvider
  model: string
  responseTimeMs: number
}
