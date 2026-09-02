// OpenAI integration
import OpenAI from 'openai'
import type { AIUsageMetadata } from '@/types/ai'

export async function generateWithOpenAI(
  prompt: string,
  model = 'gpt-4'
): Promise<{ content: string; usage: AIUsageMetadata }> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  const startTime = Date.now()

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || model,
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
    throw new Error(`OpenAI API error: ${error.message}`)
  }
}
