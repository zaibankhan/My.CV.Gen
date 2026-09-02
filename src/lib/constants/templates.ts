// Template definitions for My.CV.Gen
// These define the available CV templates, their configurations,
// and the structure of the content they render.

export interface TemplateDefinition {
  id: string
  name: string
  description: string
  style: 'clean' | 'classic' | 'creative' | 'minimal'
  layout: 'single-column' | 'two-column'
  defaultColors: string[]
  recommendedFor: string[]
  previewImage: string
  version: number
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with subtle accents and bold headers',
    style: 'clean',
    layout: 'two-column',
    defaultColors: ['#2563EB', '#1E293B', '#64748B'],
    recommendedFor: ['technology', 'startups', 'engineering', 'product'],
    previewImage: '/images/templates/modern.png',
    version: 1
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, formal design ideal for corporate and legal professions',
    style: 'classic',
    layout: 'single-column',
    defaultColors: ['#1F2937', '#374151', '#9CA3AF'],
    recommendedFor: ['corporate', 'legal', 'finance', 'academia'],
    previewImage: '/images/templates/classic.png',
    version: 1
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, spacious design with elegant typography and generous whitespace',
    style: 'minimal',
    layout: 'single-column',
    defaultColors: ['#111827', '#4B5563', '#D1D5DB'],
    recommendedFor: ['design', 'creative', 'consulting'],
    previewImage: '/images/templates/minimal.png',
    version: 1
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold, colorful design with modern accents and dynamic layouts',
    style: 'creative',
    layout: 'two-column',
    defaultColors: ['#7C3AED', '#10B981', '#F59E0B'],
    recommendedFor: ['marketing', 'media', 'arts', 'startups'],
    previewImage: '/images/templates/creative.png',
    version: 1
  }
]

// Available customizable color palettes
export const COLOR_PALETTES: { name: string; colors: string[] }[] = [
  { name: 'Professional Blue', colors: ['#2563EB', '#1E293B', '#F8FAFC'] },
  { name: 'Classic Navy', colors: ['#1F3A93', '#2C3E50', '#F5F5F5'] },
  { name: 'Forest Green', colors: ['#166534', '#14532D', '#F0FDF4'] },
  { name: 'Vibrant Purple', colors: ['#7C3AED', '#4C1D95', '#F5F3FF'] },
  { name: 'Sunset Orange', colors: ['#EA580C', '#9A3412', '#FFF7ED'] },
  { name: 'Rose Red', colors: ['#E11D48', '#881337', '#FFF1F2'] },
  { name: 'Slate Gray', colors: ['#475569', '#1E293B', '#F1F5F9'] },
  { name: 'Teal', colors: ['#0D9488', '#134E4A', '#F0FDFA'] }
]

// Available fonts
export const FONT_OPTIONS: { name: string; family: string; category: string }[] = [
  // Sans-serif
  { name: 'Inter', family: 'Inter', category: 'sans-serif' },
  { name: 'Roboto', family: 'Roboto', category: 'sans-serif' },
  { name: 'Open Sans', family: 'Open Sans', category: 'sans-serif' },
  { name: 'Lato', family: 'Lato', category: 'sans-serif' },
  { name: 'Montserrat', family: 'Montserrat', category: 'sans-serif' },
  // Serif
  { name: 'Georgia', family: 'Georgia', category: 'serif' },
  { name: 'Playfair Display', family: 'Playfair Display', category: 'serif' },
  { name: 'Merriweather', family: 'Merriweather', category: 'serif' },
  { name: 'Noto Serif', family: 'Noto Serif', category: 'serif' },
  // Display
  { name: 'Poppins', family: 'Poppins', category: 'display' },
  { name: 'Oswald', family: 'Oswald', category: 'display' },
  { name: 'Raleway', family: 'Raleway', category: 'display' }
]

// Available CV sections
export const AVAILABLE_SECTIONS = [
  { id: 'personal', name: 'Personal Info', required: true },
  { id: 'summary', name: 'Professional Summary', required: true },
  { id: 'experience', name: 'Work Experience', required: true },
  { id: 'education', name: 'Education', required: true },
  { id: 'skills', name: 'Skills', required: true },
  { id: 'projects', name: 'Projects', required: false },
  { id: 'certifications', name: 'Certifications', required: false },
  { id: 'languages', name: 'Languages', required: false },
  { id: 'awards', name: 'Awards & Honors', required: false },
  { id: 'volunteering', name: 'Volunteering', required: false },
  { id: 'interests', name: 'Interests & Hobbies', required: false },
  { id: 'references', name: 'References', required: false },
  { id: 'publications', name: 'Publications', required: false },
  { id: 'courses', name: 'Courses & Training', required: false }
]

// Default design configuration applied when a new CV is created
export const DEFAULT_DESIGN_CONFIG = {
  template: 'modern',
  colors: {
    primary: '#2563EB',
    secondary: '#1E293B',
    accent: '#64748B',
    background: '#FFFFFF',
    text: '#1F2937'
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  layout: {
    columns: 'two-column',
    margins: {
      top: '20mm',
      bottom: '20mm',
      left: '20mm',
      right: '20mm'
    },
    sectionSpacing: '16px'
  },
  showSections: {
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: false,
    languages: true,
    awards: false,
    volunteering: false,
    interests: false,
    references: false,
    publications: false,
    courses: false
  }
}

// Default empty CV content structure
export const EMPTY_CV_CONTENT = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  experience: [
    {
      id: 'exp-1',
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      bullets: ['', '', '']
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  skills: {
    technical: [''],
    soft: ['']
  },
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  volunteering: [],
  interests: [],
  references: [],
  publications: [],
  courses: []
}
