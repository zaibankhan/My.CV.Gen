export type AIProvider = 'openai' | 'anthropic' | 'groq' | 'free'

export interface GenerateOptions {
  cvData: any
  jobDescription?: string
  tone?: string
  industries?: string[]
  provider?: AIProvider
  model?: string
  referenceText?: string
  referenceFileName?: string
}

export interface GenerateResult {
  summary: string
  experience: Array<{
    jobTitle: string
    company: string
    startDate: string
    endDate: string
    location: string
    bullets: string[]
  }>
  skills: {
    technical: string[]
    soft: string[]
  }
  education: Array<{
    degree: string
    institution: string
    startDate: string
    endDate: string
    description: string
  }>
}

export interface AIUsageMetadata {
  promptTokens: number
  completionTokens: number
  totalTokens: number
  responseTimeMs: number
  model: string
}

export interface AIResponse<T> {
  data: T
  metadata: AIUsageMetadata
}
