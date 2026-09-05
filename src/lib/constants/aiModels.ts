import type { AIProvider } from '@/types/ai'

export interface AIModelInfo {
  id: string
  name: string
  provider: AIProvider
  description: string
  recommended?: boolean
}

export const AI_MODELS: AIModelInfo[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    description: 'Fastest, most capable OpenAI model for resume writing',
    recommended: true
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    description: 'Powerful reasoning with 128K context window'
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    description: 'Original flagship GPT-4, great for complex rewrites'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    description: 'Fast and cost-effective for quick drafts'
  },
  {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    description: 'Anthropic\u2019s smartest, most balanced model',
    recommended: true
  },
  {
    id: 'claude-3-opus-20240229',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    description: 'Most powerful Claude model for nuanced writing'
  },
  {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    description: 'Fast, lightweight model for quick iterations'
  },
  {
    id: 'openai/gpt-oss-20b',
    name: 'GPT-OSS 20B (FREE)',
    provider: 'groq',
    description: 'Fast, free, high-quality model by OpenAI via Groq',
    recommended: true
  },
  {
    id: 'openai/gpt-oss-120b',
    name: 'GPT-OSS 120B (FREE)',
    provider: 'groq',
    description: 'Larger, more capable free model for detailed CVs'
  },
  {
    id: 'qwen/qwen3.8-27b',
    name: 'Qwen 3.8 27B (FREE)',
    provider: 'groq',
    description: 'Open-source Qwen model, free on Groq'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini (FREE — No Key)',
    provider: 'free',
    description: 'Free AI via OpenAPIs gateway — no API key or signup needed',
    recommended: true
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o (FREE — No Key)',
    provider: 'free',
    description: 'Full GPT-4o through the free member gateway, no key required'
  },
  {
    id: 'openai-fast',
    name: 'GPT-OSS 20B (FREE — No Key)',
    provider: 'free',
    description: 'Free anonymous model via Pollinations, automatic fallback'
  }
]

export const DEFAULT_MODEL: Record<AIProvider, string> = {
  openai: 'gpt-4o',
  anthropic: 'claude-3-5-sonnet-20241022',
  groq: 'openai/gpt-oss-20b',
  free: 'gpt-4o-mini'
}

export function modelsForProvider(provider: AIProvider): AIModelInfo[] {
  return AI_MODELS.filter((m) => m.provider === provider)
}