// Free AI integration — keyless, zero-signup OpenAI-compatible endpoints
// Primary: OpenAPIs (public free beta, shared key "admin", gpt-4o-mini / gpt-4o)
// Failover: KeylessAI worker, Pollinations anonymous, ApiAirforce free tier
import OpenAI from 'openai'
import type { AIUsageMetadata } from '@/types/ai'

const FREE_ENDPOINTS: Array<{
  name: string
  baseURL: string
  apiKey: string
  model: string
}> = [
  {
    name: 'OpenAPIs',
    baseURL: 'https://api.openapis.online/openai/v1',
    apiKey: process.env.FREE_AI_KEY || 'admin',
    model: process.env.FREE_AI_MODEL || 'gpt-4o-mini'
  },
  {
    name: 'KeylessAI',
    baseURL: 'https://keylessai.thryx.workers.dev/v1',
    apiKey: 'not-needed',
    model: 'openai-fast'
  },
  {
    name: 'Pollinations',
    baseURL: 'https://text.pollinations.ai/openai',
    apiKey: 'not-needed',
    model: 'openai-fast'
  },
  {
    name: 'ApiAirforce',
    baseURL: 'https://api.airforce/v1',
    apiKey: 'not-needed',
    model: 'llama-3.3-70b-instruct-fp8-fast:free'
  }
]

export async function generateWithFreeAI(
  prompt: string,
  model?: string
): Promise<{ content: string; usage: AIUsageMetadata }> {
  const preferredModel = process.env.FREE_AI_MODEL || model
  const endpoints =
    preferredModel && preferredModel.startsWith('gpt-')
      ? FREE_ENDPOINTS.map((e) => ({ ...e, model: preferredModel }))
      : FREE_ENDPOINTS

  const errors: string[] = []
  const startTime = Date.now()

  for (const endpoint of endpoints) {
    try {
      const client = new OpenAI({
        apiKey: endpoint.apiKey,
        baseURL: endpoint.baseURL,
        timeout: 90000,
        maxRetries: 1
      })

      const response = await client.chat.completions.create({
        model: endpoint.model,
        messages: [
          { role: 'system', content: 'You are an expert professional resume writer.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 4000
      })

      const content = response.choices[0].message.content || '{}'

      return {
        content,
        usage: {
          promptTokens: response.usage?.prompt_tokens ?? 0,
          completionTokens: response.usage?.completion_tokens ?? 0,
          totalTokens: response.usage?.total_tokens ?? 0,
          responseTimeMs: Date.now() - startTime,
          model: response.model || endpoint.model
        }
      }
    } catch (error: any) {
      errors.push(`${endpoint.name}: ${error.message || error}`)
    }
  }

  throw new Error(
    `All free AI endpoints failed. ${errors.join(' | ')}`
  )
}