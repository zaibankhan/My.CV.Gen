// Groq integration (free tier, OpenAI-compatible API)
import OpenAI from 'openai'
import type { AIUsageMetadata } from '@/types/ai'

export async function generateWithGroq(
  prompt: string,
  model = 'openai/gpt-oss-20b'
): Promise<{ content: string; usage: AIUsageMetadata }> {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured')
  }

  const groq = new OpenAI({
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1'
  })
  const startTime = Date.now()

  try {
    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || model,
      messages: [
        { role: 'system', content: 'You are an expert professional resume writer.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4000
    })

    return {
      content: response.choices[0].message.content || '{}',
      usage: {
        promptTokens: response.usage?.prompt_tokens ?? 0,
        completionTokens: response.usage?.completion_tokens ?? 0,
        totalTokens: response.usage?.total_tokens ?? 0,
        responseTimeMs: Date.now() - startTime,
        model: response.model
      }
    }
  } catch (error: any) {
    throw new Error(`Groq API error: ${error.message}`)
  }
}